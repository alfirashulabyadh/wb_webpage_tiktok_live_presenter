// Simple Cloudflare Worker to handle order ID generation and act as a minimal API
// Designed to be deployed with Wrangler. This worker handles:
// - POST /get_order_id -> returns { success: true, orderID }
// - POST /sales_receipt -> accepts sales JSON (currently logs)
// - Proxy other requests to static assets by returning a 404 placeholder

// Module-style Cloudflare Worker
// This worker reads secrets from the environment (bound via Wrangler) and
// will call the Facebook Graph API for real data when tokens/IDs are set.
// If secrets are missing or the Graph API call fails, it falls back to
// in-file sample data so the UI continues to work in dev.

// In-memory counter map as fallback (resets when worker reloads). For
// production, bind a Durable Object or KV namespace and replace storage
// accesses accordingly.
const counters = {};
// In-memory saved orders (for local testing with `wrangler dev`). Not
// persistent across worker restarts — replace with KV/DO in production.
const savedOrders = [];

// In-memory fallback store (used only when KV is not bound)
const confirmationStore = {};

const sampleIG = [
  { conversation_id: 'ig_conv_1', texter_id: 'i1', texter_name: 'reem_ig' },
  { conversation_id: 'ig_conv_2', texter_id: 'i2', texter_name: 'osama_ig' },
  { conversation_id: 'ig_conv_3', texter_id: 'i3', texter_name: 'dina_ig' },
  { conversation_id: 'ig_conv_4', texter_id: 'i4', texter_name: 'fadi_ig' }
];
const sampleFB = [
  { conversation_id: 'fb_conv_1', texter_id: 'm1', texter_name: '\u0623\u062d\u0645\u062f \u0639\u0644\u064a' },
  { conversation_id: 'fb_conv_2', texter_id: 'm2', texter_name: '\u0633\u0627\u0631\u0629 \u0645\u062d\u0645\u062f' },
  { conversation_id: 'fb_conv_3', texter_id: 'm3', texter_name: '\u062e\u0627\u0644\u062f \u064a\u0648\u0633\u0641' },
  { conversation_id: 'fb_conv_4', texter_id: 'm4', texter_name: '\u0645\u0646\u0649 \u062d\u0633\u0646' }
];

const CORS_HEADERS = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type'
};
// Try to load a local `secrets.js` module (generated from .env) as a fallback.
// This allows using a build-time injected file when you can't or don't want
// to use Wrangler secrets. The generator script below creates `secrets.js`.
async function loadLocalSecrets() {
  try {
    // dynamic import so bundlers can include it if present
    const mod = await import('./secrets.js');
  // support modules that export default or named object
  return mod && (mod.default || mod) ? (mod.default || mod) : {};
  } catch (e) {
    // missing file or import error -> return empty
    return {};
  }
}

export default {
  async fetch(request, env) {
    // merge secrets: prefer env (wrangler secrets) then local file
    const local = await loadLocalSecrets();
  const FB_ACCESS_TOKEN = env.FB_ACCESS_TOKEN || local.FB_ACCESS_TOKEN || null;
  const FB_PAGE_ID = env.FB_PAGE_ID || local.FB_PAGE_ID || null;
  const IG_ACCESS_TOKEN = env.IG_ACCESS_TOKEN || local.IG_ACCESS_TOKEN || null;
  const IG_PAGE_ID = env.IG_PAGE_ID || local.IG_PAGE_ID || null;
  const DATASET_ID = env.DATASET_ID || local.DATASET_ID || null;
    const url = new URL(request.url);

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: CORS_HEADERS });
    }

    // Helper: KV-backed counter and confirmation storage operations
    const kv = env && env.CONFIRM_KV ? env.CONFIRM_KV : null;

    async function kvGet(key) {
      if (kv) {
        const v = await kv.get(key);
        return v ? JSON.parse(v) : null;
      }
      return confirmationStore[key] || null;
    }

    async function kvPut(key, value) {
      if (kv) {
        await kv.put(key, JSON.stringify(value));
        return;
      }
      confirmationStore[key] = value;
    }

    async function kvIncrementCounter(dateStr) {
      if (kv) {
        // Use a simple read-modify-write for KV (not atomic). For strongly consistent counters
        // consider Durable Objects. This is acceptable for low concurrency.
        const raw = await kv.get(`counter:${dateStr}`);
        let cur = raw ? parseInt(raw, 10) : 0;
        cur = cur + 1;
        await kv.put(`counter:${dateStr}`, String(cur));
        return cur;
      }
      counters[dateStr] = (counters[dateStr] || 0) + 1;
      return counters[dateStr];
    }

    // POST /get_order_id -> returns a simple daily incremental order id
    if (request.method === 'POST' && url.pathname === '/get_order_id') {
      try {
        const body = await request.json().catch(() => ({}));
        const dateStr = body.date || (new Date()).toISOString().slice(0,10).replace(/-/g,'');
        const cur = await kvIncrementCounter(dateStr);
        const orderID = `${dateStr}${String(cur).padStart(2,'0')}`;
        return new Response(JSON.stringify({ success: true, orderID }), { headers: CORS_HEADERS });
      } catch (e) {
        return new Response(JSON.stringify({ success: false, message: 'error', error: String(e) }), { headers: CORS_HEADERS, status: 500 });
      }
    }

    // GET /api/ig -> call Graph API if IG_ACCESS_TOKEN and IG_PAGE_ID are set,
    // otherwise return sample data. Logic follows the provided Python example:
    // - fetch conversations (platform=instagram)
    // - for each conversation in the requested range, fetch the latest message
    // - use the message 'from' username unless it starts with 'whitebedding',
    //   in which case use the receiver
    
    if (request.method === 'GET' && url.pathname === '/api/ig') {
      if (IG_ACCESS_TOKEN && IG_PAGE_ID) {
        try {
          const convsUrl = `https://graph.instagram.com/v22.0/${IG_PAGE_ID}/conversations?platform=instagram&limit=4&access_token=${IG_ACCESS_TOKEN}`;
          const convsRes = await fetch(convsUrl);
          const convsText = await convsRes.text().catch(()=>null);
          let convsJson;
          try { convsJson = convsText ? JSON.parse(convsText) : null; } catch (e) { convsJson = { parseError: String(e), rawText: convsText }; }
          if (!convsRes.ok) {
            console.error('IG convs non-ok', convsRes.status, convsRes.statusText, convsJson);
            return new Response(JSON.stringify({ success: false, status: convsRes.status, body: convsJson }), { headers: CORS_HEADERS, status: 502 });
          }

          const items = convsJson?.data || [];
          const rangeParam = url.searchParams.get('range') || 'first';
          const start = rangeParam === 'next' ? 2 : 0;
          const end = start + 2;

          const texters_info = [];
          for (let i = start; i < end; i++) {
            const conv = items[i];
            if (!conv) { texters_info.push({ conversation_id: null, texter_id: null, texter_name: null }); continue; }
            const convId = conv.id;
            const msgUrl = `https://graph.instagram.com/v22.0/${convId}/messages?fields=from{ id,name,username },to{ data }&limit=1&access_token=${IG_ACCESS_TOKEN}`;
            try {
              const mr = await fetch(msgUrl);
              const mtext = await mr.text().catch(()=>null);
              let mjson;
              try { mjson = mtext ? JSON.parse(mtext) : null; } catch (e) { mjson = { parseError: String(e), rawText: mtext }; }
              const messages = mjson?.data || [];
              if (messages.length > 0) {
                const msg = messages[0];
                const sender = msg.from || {};
                const toData = (msg.to && msg.to.data) || [];
                const sender_username = (sender.username || '').toLowerCase();
                const receiver_username = toData[0] && (toData[0].username || toData[0].name) ? (toData[0].username || toData[0].name) : null;

                if (!sender_username.startsWith('whitebedding')) {
                  texters_info.push({ conversation_id: convId, texter_id: sender.id || null, texter_name: sender.username || sender.name || null });
                } else {
                  const rid = toData[0] && toData[0].id ? toData[0].id : null;
                  texters_info.push({ conversation_id: convId, texter_id: rid, texter_name: receiver_username || (toData[0] && toData[0].name) || null });
                }
              } else {
                texters_info.push({ conversation_id: convId, texter_id: null, texter_name: null });
              }
            } catch (me) {
              console.error('IG message fetch error for conv', convId, me && me.stack ? me.stack : String(me));
              texters_info.push({ conversation_id: convId, texter_id: null, texter_name: null });
            }
          }

          return new Response(JSON.stringify({ success: true, data: texters_info, raw: convsJson }), { headers: CORS_HEADERS });
        } catch (e) {
          console.error('IG overall error', e && e.stack ? e.stack : String(e));
          return new Response(JSON.stringify({ success: false, error: String(e) }), { headers: CORS_HEADERS, status: 502 });
        }
      }
      // Fallback to sample data
      const range = url.searchParams.get('range') || 'first';
      const start = range === 'next' ? 2 : 0;
      const data = sampleIG.slice(start, start + 2);
      return new Response(JSON.stringify({ success: true, data, message: 'Using sample IG data; set IG_ACCESS_TOKEN and IG_PAGE_ID as secrets to fetch real data.' }), { headers: CORS_HEADERS });
    }

    // GET /api/fb -> call Graph API if FB_ACCESS_TOKEN and FB_PAGE_ID are set,
    // otherwise return sample data.
    if (request.method === 'GET' && url.pathname === '/api/fb') {
      if (FB_ACCESS_TOKEN && FB_PAGE_ID) {
        try {
          const convsUrl = `https://graph.facebook.com/v22.0/me/conversations?limit=4&access_token=${FB_ACCESS_TOKEN}`;
          const convsRes = await fetch(convsUrl);
          const convsText = await convsRes.text().catch(()=>null);
          let convsJson;
          try { convsJson = convsText ? JSON.parse(convsText) : null; } catch (e) { convsJson = { parseError: String(e), rawText: convsText }; }
          if (!convsRes.ok) {
            console.error('FB convs non-ok', convsRes.status, convsRes.statusText, convsJson);
            return new Response(JSON.stringify({ success: false, status: convsRes.status, body: convsJson }), { headers: CORS_HEADERS, status: 502 });
          }

          const items = convsJson?.data || [];
          const rangeParam = url.searchParams.get('range') || 'first';
          const start = rangeParam === 'next' ? 2 : 0;
          const end = start + 2;

          const texters_info = [];
          for (let i = start; i < end; i++) {
            const conv = items[i];
            if (!conv) { texters_info.push({ texter_id: null, texter_name: null }); continue; }
            const convId = conv.id;
            const msgUrl = `https://graph.facebook.com/v22.0/${convId}/messages?fields=from,to&limit=1&access_token=${FB_ACCESS_TOKEN}`;
            try {
              const mr = await fetch(msgUrl);
              const mtext = await mr.text().catch(()=>null);
              let mjson;
              try { mjson = mtext ? JSON.parse(mtext) : null; } catch (e) { mjson = { parseError: String(e), rawText: mtext }; }
              const messages = mjson?.data || [];
              if (messages.length > 0) {
                const msg = messages[0];
                const sender_name = (msg.from && msg.from.name) || '';
                const toData = (msg.to && msg.to.data) || [];
                const receiver_name = toData[0] && toData[0].name ? toData[0].name : '';

                const normalizedSender = sender_name.replace(/أ/g, 'ا');
                if (!normalizedSender.includes('الفراش الابيض')) {
                  texters_info.push({ texter_name: sender_name, texter_id: msg.from && msg.from.id ? msg.from.id : null });
                } else {
                  texters_info.push({ texter_name: receiver_name, texter_id: toData[0] && toData[0].id ? toData[0].id : null });
                }
              } else {
                texters_info.push({ texter_id: null, texter_name: null });
              }
            } catch (me) {
              console.error('FB message fetch error for conv', convId, me && me.stack ? me.stack : String(me));
              texters_info.push({ texter_id: null, texter_name: null });
            }
          }

          return new Response(JSON.stringify({ success: true, data: texters_info, raw: convsJson }), { headers: CORS_HEADERS });
        } catch (e) {
          console.error('FB overall error', e && e.stack ? e.stack : String(e));
          return new Response(JSON.stringify({ success: false, error: String(e) }), { headers: CORS_HEADERS, status: 502 });
        }
      }
      // Fallback to sample data
      const range = url.searchParams.get('range') || 'first';
      const start = range === 'next' ? 2 : 0;
      const data = sampleFB.slice(start, start + 2);
      return new Response(JSON.stringify({ success: true, data, message: 'Using sample FB data; set FB_ACCESS_TOKEN and FB_PAGE_ID as secrets to fetch real data.' }), { headers: CORS_HEADERS });
    }

    // POST /sales_receipt -> accept receipt payload and forward to Facebook CAPI (dataset events)
    if (request.method === 'POST' && url.pathname === '/sales_receipt') {
      // read body (support both JSON and raw text)
      let raw = await request.text().catch(()=>null);
      console.log('sales_receipt (raw):', raw);
      let payload = null;
      try {
        payload = raw ? JSON.parse(raw) : null;
      } catch (e) {
        // not JSON - keep raw
        payload = raw;
      }

      // If dataset id and access token are available, forward to FB
      if (DATASET_ID && FB_ACCESS_TOKEN) {
        // Build normalized events array and event body
        const eventsArray = Array.isArray(payload) ? payload : [payload];
        if (!Array.isArray(payload)) console.log('Normalized payload into array for CAPI, length=', eventsArray.length);
        const eventBody = {
          upload_tag: 'sales_receipt',
          upload_source: 'server',
          upload_time: Math.floor(Date.now() / 1000),
          data: eventsArray
        };

        // Use helper to send to Facebook Dataset Events API (avoid internal fetch loops)
        try {
          const sendResult = await (async function sendDatasetEvents(body) {
            const fbUrl = `https://graph.facebook.com/v22.0/${DATASET_ID}/events`;
            const maxAttempts = 3;
            let attempt = 0;
            let fbRes = null;
            let fbText = null;
            let fbJson = null;
            for (attempt = 1; attempt <= maxAttempts; attempt++) {
              try {
                console.log(`FB CAPI attempt ${attempt} -> POST ${fbUrl}`);
                console.log('FB CAPI payload:', body);
                fbRes = await fetch(fbUrl, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': `Bearer ${FB_ACCESS_TOKEN}` },
                  body: JSON.stringify(body)
                });
                fbText = await fbRes.text().catch(()=>null);
                try { fbJson = fbText ? JSON.parse(fbText) : null; } catch(e) { fbJson = { raw: fbText }; }
                console.log('FB CAPI response (attempt):', fbRes.status, fbJson);
                if (fbRes.ok) break;
                if (fbRes.status >= 400 && fbRes.status < 500) break;
              } catch (e) {
                console.error(`FB CAPI attempt ${attempt} error:`, e && e.stack ? e.stack : String(e));
              }
              if (attempt < maxAttempts) {
                try { await new Promise(res => setTimeout(res, 500)); } catch(e) { /* ignore timing errors */ }
              }
            }
            if (!fbJson) {
              try { fbJson = fbText ? JSON.parse(fbText) : null; } catch(e) { fbJson = { raw: fbText }; }
            }
            console.log('FB CAPI final result:', attempt, fbRes && fbRes.status, fbJson);
            return { ok: fbRes && fbRes.ok, status: fbRes ? fbRes.status : null, fbJson, fbText };
          })(eventBody);

          if (!sendResult.ok) {
            return new Response(JSON.stringify({ success: false, forwarded: true, fbStatus: sendResult.status, fbBody: sendResult.fbJson, fbRaw: sendResult.fbText }), { headers: CORS_HEADERS, status: 502 });
          }
          console.log('eventBody:', eventBody);
          return new Response(JSON.stringify({ success: true, forwarded: true, fbBody: sendResult.fbJson }), { headers: CORS_HEADERS });
        } catch (e) {
          console.error('Error forwarding to FB CAPI:', e && e.stack ? e.stack : String(e));
          return new Response(JSON.stringify({ success: false, forwarded: false, error: String(e) }), { headers: CORS_HEADERS, status: 500 });
        }
      }

      // If missing credentials, just acknowledge receipt and log
      return new Response(JSON.stringify({ success: true, forwarded: false, message: 'Missing DATASET_ID or FB_ACCESS_TOKEN in env/secrets; payload logged.' }), { headers: CORS_HEADERS });
    }

    // POST /create_order -> accept order JSON, store it and return a confirmation URL
    if (request.method === 'POST' && url.pathname === '/create_order') {
      try {
        const body = await request.json().catch(()=>null);
        if (!body) return new Response(JSON.stringify({ success: false, message: 'no body' }), { headers: CORS_HEADERS, status: 400 });
        // generate 6 random alphanumeric chars
        const rnd = () => Math.random().toString(36).slice(2,8);
        const now = new Date();
        const yyyy = now.getFullYear();
        const mm = String(now.getMonth()+1).padStart(2,'0');
        const dd = String(now.getDate()).padStart(2,'0');
        const dateInt = `${yyyy}${mm}${dd}`;
        const key = (rnd()+rnd()).slice(0,6) + dateInt; // ensure 6 chars + date
        // Separate preview/summary from the event payload so we don't
        // expose the internal JSON to the customer. The client sends an
        // object like { json: <eventJson>, preview: <humanString>, ts }
        const storedPayload = (body && body.json) ? body.json : (body.payload || body);
        const summary = (body && body.preview) ? body.preview : null;
  // store payload along with metadata (KV when available). Store summary
  // separately so the confirmation page can show a friendly string and
  // the actual payload remains the event data to be forwarded to CAPI.
  await kvPut(`confirm:${key}`, { payload: storedPayload, summary: summary, created: Date.now(), confirmed: false, ip: null, ua: null });
        // Build confirmation URL using requested host for orders.whitebedding.net
        const confirmHost = 'orders.whitebedding.net';
        const confirmPath = `/${key}`;
        const confirmURL = `https://${confirmHost}${confirmPath}`;
        return new Response(JSON.stringify({ success: true, key, confirmURL }), { headers: CORS_HEADERS });
      } catch (e) {
        return new Response(JSON.stringify({ success: false, error: String(e) }), { headers: CORS_HEADERS, status: 500 });
      }
    }

    // GET /{confirmation_key} on orders.whitebedding.net -> serve a small confirmation page
    // POST /{confirmation_key}/confirm -> mark as confirmed and forward to /sales_receipt
    // We'll detect the host to decide whether to serve confirmation UI or not.
    if (url.pathname.length > 1 && request.method === 'GET') {
      // If request host is orders.whitebedding.net, try to serve confirmation page
      if (request.headers.get('host') && request.headers.get('host').includes('orders.whitebedding.net')) {
        const key = url.pathname.slice(1);
  const entry = await kvGet(`confirm:${key}`);
  if (!entry) return new Response('Not Found', { status: 404 });
        // Render a confirmation page containing the order summary so the
        // customer can review it. Include the current 'confirmed' state so
        // the UI can reflect that the link was already used.
        const payload = entry.payload || {};
        // Prefer explicit stored summary; if missing, derive a minimal human
        // readable summary from a few common fields.
        let summary = entry.summary || '';
        if (!summary) {
          const name = payload.customer && payload.customer.name ? payload.customer.name : (payload.customerName || '');
          const phone = payload.customer && payload.customer.phone ? payload.customer.phone : (payload.customerPhone || '');
          const total = payload.total || payload.amount || '';
          summary = `الاسم: ${name}\nالرقم: ${phone}\nالمجموع: ${total}`;
        }
  const pretty = String(summary).replace(/</g, '&lt;');
  // compute initial customer name and gender hint for the confirmation page
  const customerNameFromPayload = payload && payload.customer && payload.customer.name ? payload.customer.name : (payload.customerName || '');
  // try to extract 'الاسم: <name>' line from the summary if payload lacks a name
  let extractedName = '';
  try {
    const m = String(summary).match(/^\s*الاسم:\s*(.+)$/m);
    if (m && m[1]) extractedName = m[1].trim();
  } catch (e) { /* ignore */ }
  const initialCustomerName = customerNameFromPayload || extractedName || '';
  const initialGenderHint = (payload && payload.customer && payload.customer.gender) ? String(payload.customer.gender) : (payload.gender || '');
  const safeCustomerName = String(initialCustomerName || '').replace(/</g, '&lt;');
    const alreadyFlag = entry.confirmed ? '1' : '0';
  // build confirm action URL for the form
  const confirmAction = `${url.pathname}/confirm`;

  const html = `<!doctype html>
  <html lang="ar">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <title>تأكيد الطلب</title>
    <!-- Use Cairo font and tidy, project-aligned colors -->
    <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800&display=swap" rel="stylesheet">
    <style>
      :root{--primary:#1282a2;--secondary:#e0ae4c;--muted:#666}
      html,body{height:100%;margin:0;font-family:'Cairo',sans-serif;background:#fff;color:#222}
      .wrap{max-width:720px;margin:22px auto;padding:20px}
      #confirmLogo{max-width:220px;display:block;margin:0 auto 14px}
      h2{color:var(--primary);text-align:center;margin:8px 0 14px}
      p.lead{color:var(--muted);text-align:center;margin:0 0 18px}
      .meta{color:var(--primary);font-weight:700;text-align:right;margin-bottom:10px}
      pre#orderPreview{background:#f6f9fa;padding:16px;border-radius:12px;white-space:pre-wrap;border:1px solid #eef6f8;font-size:1.06rem;line-height:1.5;color:#16394a}
      .order-key{color:var(--primary);font-weight:800;margin-right:6px}
      .order-value{color:#0b4b5a;font-weight:600}
      .product-header{font-weight:800;color:var(--primary);margin:8px 0;padding-bottom:6px;border-bottom:1px solid #eee}
      .actions{margin-top:14px;display:flex;gap:12px;justify-content:flex-end;align-items:center}
      /* Use primary brand color for button (solid) */
      #btn{padding:12px 20px;border-radius:10px;border:0;background:var(--primary);color:#fff;cursor:pointer;min-width:160px;box-shadow:0 6px 18px rgba(18,130,162,0.14)}
      #btn[disabled]{opacity:0.6;cursor:default}
      #btnCancel{padding:10px 14px;border-radius:8px;border:1px solid #ddd;background:#f7f7f7;color:#333}
      #status{color:var(--muted);margin-inline-start:12px}
      @media (max-width:520px){.actions{flex-direction:column;align-items:stretch}#btn{width:100%;min-width:0}}
    </style>
  </head>
  <body dir="rtl" data-confirmed="${alreadyFlag}">
    <div class="wrap">
      <img id="confirmLogo" src="https://i.ibb.co/vxdH8xQ2/Landscape-Dark-Cyan.png" alt="Logo">
      <h2>مراجعة وتأكيد الطلب</h2>
      <p class="lead">يرجى مراجعة ملخص الطلب أدناه ثم اضغط "أوافق" لتأكيد وإرسال الطلب.</p>
      ${safeCustomerName ? `<div class="meta">اسم العميل: ${safeCustomerName}</div>` : ''}
      <h3 class="product-header">ملخص الطلب</h3>
      <pre id="orderPreview">${pretty}</pre>
      <div class="actions">
        <form id="confirmForm" method="post" action="${confirmAction}" style="display:inline-block;margin:0" onsubmit="(function(){const b=this.querySelector('#btn'); if(b){ b.disabled=true; b.textContent='جاري الإرسال...'; }})()"> 
          <button id="btn" type="submit">أوافق</button>
        </form>
        <button id="btnCancel" onclick="location.reload();">إلغاء</button>
        <span id="status"></span>
      </div>
    </div>
    <!-- Inline scripts removed to avoid parsing/encoding issues; form has an onsubmit handler for basic UX -->
  </body>
  </html>`;
        return new Response(html, { headers: { 'Content-Type': 'text/html; charset=utf-8', 'Access-Control-Allow-Origin': '*' } });
      }
    }

    // POST /{key}/confirm -> called by confirmation page; record IP/UA and forward payload to /sales_receipt
    if (request.method === 'POST' && url.pathname.endsWith('/confirm')) {
      // Extract key from path
      const parts = url.pathname.split('/').filter(Boolean);
      const key = parts[0];
  const entry = await kvGet(`confirm:${key}`);
  const isFormReq = !(request.headers.get('content-type') || '').includes('application/json');
  if (!entry) {
    if (isFormReq) {
      const nf = `<!doctype html><html><head><meta charset="utf-8"><title>Not found</title></head><body dir="rtl" style="font-family:Arial,Helvetica,sans-serif;padding:18px"><h3>الرابط غير صالح أو منتهي.</h3></body></html>`;
      return new Response(nf, { headers: { 'Content-Type': 'text/html; charset=utf-8' }, status: 404 });
    }
    return new Response(JSON.stringify({ success: false, message: 'not found' }), { headers: CORS_HEADERS, status: 404 });
  }
      // If already confirmed, return an idempotent response and do not forward again
      if (entry.confirmed) {
        console.log('Confirm called but already confirmed for key', key);
        if (isFormReq) {
          const alreadyHtml = `<!doctype html><html><head><meta charset="utf-8"><title>تم التأكيد سابقاً</title></head><body dir="rtl" style="font-family:Arial,Helvetica,sans-serif;padding:18px"><h3>تم التأكيد سابقاً. شكراً.</h3></body></html>`;
          return new Response(alreadyHtml, { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
        }
        return new Response(JSON.stringify({ success: false, message: 'already_confirmed' }), { headers: CORS_HEADERS });
      }
      // record requester IP and UA
      const ua = request.headers.get('user-agent') || '';
      // Cloudflare provides CF-Connecting-IP header; fallback to x-forwarded-for or remote
      const ip = request.headers.get('cf-connecting-ip') || request.headers.get('x-forwarded-for') || null;
  entry.confirmed = true;
  entry.ip = ip;
  entry.ua = ua;
  entry.confirmed_at = Date.now();
  // persist update
  await kvPut(`confirm:${key}`, entry);
  // attach meta to payload; ensure we DO NOT include the summary/preview
  // string in the forwarded event payload.
  // Deep-clone stored payload to avoid accidental mutations and ensure nested
  // objects are preserved when forwarding. Use JSON round-trip for portability.
  const payload = entry.payload ? JSON.parse(JSON.stringify(entry.payload)) : {};
    // Log the confirmation payload details for operator debugging before forwarding
    try { console.log('Forwarding confirmation payload to sales_receipt (stringified):', JSON.stringify(payload)); } catch(e) { console.log('Forwarding confirmation payload to sales_receipt (raw):', payload); }
    try { console.log('contents: ', Array.isArray(payload.custom_data && payload.custom_data.contents) ? payload.custom_data.contents : payload.custom_data); } catch(e) { console.log('contents: <unavailable>'); }
      // Instead of calling the worker via fetch (which can trigger 522 when
      // the worker calls its own public URL), call the forwarding helper
      // inline here to post directly to Facebook Dataset Events API.
      try {
  // Normalize payload into eventBody (same shape as sales_receipt handler expects)
  // Preserve event_name sent by client (e.g., Purchase or PT-web3). Only
  // set a sensible default if the client didn't include one.
  if (!payload.event_name) payload.event_name = "PT-web3";
  payload.event_time = Math.floor(Date.now() / 1000);

        const eventsArray = Array.isArray(payload) ? payload : [payload];
    
        if (!Array.isArray(payload)) console.log('Normalized payload into array for CAPI (confirm), length=', eventsArray.length);
        const eventBody = {
          upload_tag: 'sales_receipt',
          upload_source: 'server',
          upload_time: Math.floor(Date.now() / 1000),
          data: eventsArray
        };


        console.log('eventBody (from confirm):', eventBody);

        // Inline send using the same helper logic as /sales_receipt
        const fbUrl = `https://graph.facebook.com/v22.0/${DATASET_ID}/events`;
        const maxAttempts = 3;
        let attempt = 0;
        let fbRes = null;
        let fbText = null;
        let fbJson = null;
        for (attempt = 1; attempt <= maxAttempts; attempt++) {
          try {
            console.log(`FB CAPI attempt ${attempt} (from confirm) -> POST ${fbUrl}`);
            // Log full JSON so nested objects are visible in logs (no [Object])
            try { console.log('FB CAPI payload (from confirm):', JSON.stringify(eventBody)); } catch(e) { console.log('FB CAPI payload (from confirm):', eventBody); }
            fbRes = await fetch(fbUrl, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': `Bearer ${FB_ACCESS_TOKEN}` },
              body: JSON.stringify(eventBody)
            });
            fbText = await fbRes.text().catch(()=>null);
            try { fbJson = fbText ? JSON.parse(fbText) : null; } catch(e) { fbJson = { raw: fbText }; }
            console.log('FB CAPI response (confirm attempt):', fbRes.status, fbJson);
            if (fbRes.ok) break;
            if (fbRes.status >= 400 && fbRes.status < 500) break;
          } catch (e) {
            console.error(`FB CAPI attempt ${attempt} (from confirm) error:`, e && e.stack ? e.stack : String(e));
          }
          if (attempt < maxAttempts) {
            try { await new Promise(res => setTimeout(res, 500)); } catch(e) { /* ignore timing errors */ }
          }
        }
        if (!fbJson) {
          try { fbJson = fbText ? JSON.parse(fbText) : null; } catch(e) { fbJson = { raw: fbText }; }
        }
        console.log('FB CAPI final result (from confirm):', attempt, fbRes && fbRes.status, fbJson);
        if (!fbRes || !fbRes.ok) {
          // If this request came from a browser form, return a simple HTML error page
          const isForm = !(request.headers.get('content-type') || '').includes('application/json');
          if (isForm) {
            const errHtml = `<!doctype html><html><head><meta charset="utf-8"><title>خطأ</title></head><body dir="rtl" style="font-family:Arial,Helvetica,sans-serif;padding:18px"><h3>حدث خطأ أثناء إرسال الطلب.</h3><p>فضلاً حاول لاحقاً.</p></body></html>`;
            return new Response(errHtml, { headers: { 'Content-Type': 'text/html; charset=utf-8' }, status: 502 });
          }
          return new Response(JSON.stringify({ success: false, forwarded: true, fbStatus: fbRes ? fbRes.status : null, fbBody: fbJson, fbRaw: fbText }), { headers: CORS_HEADERS, status: 502 });
        }
        // On success, respond with HTML if it was a browser form submit
        const isFormSuccess = !(request.headers.get('content-type') || '').includes('application/json');
        if (isFormSuccess) {
          const okHtml = `<!doctype html><html><head><meta charset="utf-8"><title>تم التأكيد</title></head><body dir="rtl" style="font-family:Arial,Helvetica,sans-serif;padding:18px"><h3>تم التأكيد. شكراً.</h3></body></html>`;
          return new Response(okHtml, { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
        }
        return new Response(JSON.stringify({ success: true, forwarded: true, fbBody: fbJson }), { headers: CORS_HEADERS });
      } catch (e) {
        console.error('Error forwarding confirmation to sales_receipt (inline):', e && e.stack ? e.stack : String(e));
        const isForm = !(request.headers.get('content-type') || '').includes('application/json');
        if (isForm) {
          const errHtml = `<!doctype html><html><head><meta charset="utf-8"><title>خطأ</title></head><body dir="rtl" style="font-family:Arial,Helvetica,sans-serif;padding:18px"><h3>حدث خطأ أثناء إرسال الطلب.</h3><p>فضلاً حاول لاحقاً.</p></body></html>`;
          return new Response(errHtml, { headers: { 'Content-Type': 'text/html; charset=utf-8' }, status: 500 });
        }
        return new Response(JSON.stringify({ success: false, error: String(e) }), { headers: CORS_HEADERS, status: 500 });
      }
    }

    // POST /save_order_local -> accept a copy of order for local testing
    // When running `wrangler dev` you can POST here to persist orders in
    // memory and increment the same counters used by /get_order_id.
    if (request.method === 'POST' && url.pathname === '/save_order_local') {
      try {
        const raw = await request.text().catch(()=>null);
        let payload = null;
        try { payload = raw ? JSON.parse(raw) : null; } catch(e) { payload = { raw }; }
        // store minimal info
        const entry = {
          ts: Date.now(),
          payload
        };
  savedOrders.push(entry);
  // increment today counter (KV-aware)
  const day = (new Date()).toISOString().slice(0,10).replace(/-/g,'');
  const cur = await kvIncrementCounter(day);
  return new Response(JSON.stringify({ success: true, saved: true, index: savedOrders.length-1, counters: { [day]: cur } }), { headers: CORS_HEADERS });
      } catch (e) {
        return new Response(JSON.stringify({ success: false, error: String(e) }), { headers: CORS_HEADERS, status: 500 });
      }
    }

    // GET /capi_test -> send a minimal test event to Facebook Dataset Events
    if (request.method === 'GET' && url.pathname === '/capi_test') {
      if (!DATASET_ID || !FB_ACCESS_TOKEN) {
        return new Response(JSON.stringify({ success: false, message: 'Missing DATASET_ID or FB_ACCESS_TOKEN in env/secrets' }), { headers: CORS_HEADERS, status: 400 });
      }
      // Minimal valid event for testing: event_name and user_data (with client_ip or email)
      const testEvent = {
        event_name: 'test_event',
        event_time: Math.floor(Date.now() / 1000),
        user_data: {
          // Using a placeholder client_ip_address (not hashed) for quick test — replace if your dataset requires hashing
          client_ip_address: request.headers.get('cf-connecting-ip') || request.headers.get('x-forwarded-for') || null
        },
        custom_data: { test: true }
      };
      const eventBody = { upload_tag: 'capi_test', upload_source: 'server', upload_time: Math.floor(Date.now()/1000), data: [testEvent] };
      const fbUrl = `https://graph.facebook.com/v22.0/${DATASET_ID}/events`;
      try {
        const start = Date.now();
        console.log('CAPI test payload:', eventBody);
        const fbRes = await fetch(fbUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': `Bearer ${FB_ACCESS_TOKEN}` },
          body: JSON.stringify(eventBody)
        });
        const fbText = await fbRes.text().catch(()=>null);
        const duration = Date.now() - start;
        let fbJson = null;
        try { fbJson = fbText ? JSON.parse(fbText) : null; } catch(e) { fbJson = { raw: fbText }; }
        console.log('CAPI test result:', fbRes.status, 'duration_ms:', duration, fbJson);
        return new Response(JSON.stringify({ success: true, status: fbRes.status, duration_ms: duration, body: fbJson, raw: fbText }), { headers: CORS_HEADERS });
      } catch (e) {
        console.error('CAPI test error:', e && e.stack ? e.stack : String(e));
        return new Response(JSON.stringify({ success: false, error: String(e) }), { headers: CORS_HEADERS, status: 500 });
      }
    }

    return new Response('Not Found', { status: 404 });
  }
};
