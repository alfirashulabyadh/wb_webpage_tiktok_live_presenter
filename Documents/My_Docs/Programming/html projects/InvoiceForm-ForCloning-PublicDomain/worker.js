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
        try {
          // Build request body for dataset events endpoint
          // Ensure `data` is an array as required by CAPI. If the incoming
          // payload is a single object, wrap it; if it's already an array,
          // forward as-is.
          const eventsArray = Array.isArray(payload) ? payload : [payload];
          if (!Array.isArray(payload)) console.log('Normalized payload into array for CAPI, length=', eventsArray.length);
          const eventBody = {
            upload_tag: 'sales_receipt',
            upload_source: 'server',
            upload_time: Math.floor(Date.now() / 1000),
            data: eventsArray
          };

          const fbUrl = `https://graph.facebook.com/v22.0/${DATASET_ID}/events?access_token=${encodeURIComponent(FB_ACCESS_TOKEN)}`;
          // Retry loop for transient failures (e.g., 522). We'll attempt a few
          // times and log each attempt. Keep retries short to avoid long waits.
          const maxAttempts = 3;
          let attempt = 0;
          let fbRes = null;
          let fbText = null;
          let fbJson = null;
          for (attempt = 1; attempt <= maxAttempts; attempt++) {
            try {
              console.log(`FB CAPI attempt ${attempt} -> POST ${fbUrl}`);
              fbRes = await fetch(fbUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(eventBody)
              });
              fbText = await fbRes.text().catch(()=>null);
              try { fbJson = fbText ? JSON.parse(fbText) : null; } catch(e) { fbJson = { raw: fbText }; }
              console.log('FB CAPI response (attempt):', fbRes.status, fbJson);
              // If successful (2xx) break and proceed
              if (fbRes.ok) break;
              // If client error (4xx) don't retry
              if (fbRes.status >= 400 && fbRes.status < 500) break;
            } catch (e) {
              console.error(`FB CAPI attempt ${attempt} error:`, e && e.stack ? e.stack : String(e));
            }
            // If not last attempt, wait a short interval before retrying
            if (attempt < maxAttempts) {
              try { await new Promise(res => setTimeout(res, 500)); } catch(e) { /* ignore timing errors */ }
            }
          }

          // Final parse/normalize
          if (!fbJson) {
            try { fbJson = fbText ? JSON.parse(fbText) : null; } catch(e) { fbJson = { raw: fbText }; }
          }
          console.log('FB CAPI final result:', attempt, fbRes && fbRes.status, fbJson);

          if (!fbRes || !fbRes.ok) {
            return new Response(JSON.stringify({ success: false, forwarded: true, fbStatus: fbRes ? fbRes.status : null, fbBody: fbJson }), { headers: CORS_HEADERS, status: 502 });
          }
          console.log("eventBody:", eventBody);
          return new Response(JSON.stringify({ success: true, forwarded: true, fbBody: fbJson }), { headers: CORS_HEADERS });
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
        const already = entry.confirmed ? 'true' : 'false';
        const html = `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>تأكيد الطلب</title><style>body{font-family:Arial,Helvetica,sans-serif;padding:18px}pre{background:#f6f6f6;padding:12px;border-radius:6px;white-space:pre-wrap}button{padding:10px 14px;border-radius:6px;border:0;background:#007bff;color:#fff;cursor:pointer}button[disabled]{opacity:0.6;cursor:default}</style></head><body dir="rtl"><h2>مراجعة وتأكيد الطلب</h2><p>يرجى مراجعة ملخص الطلب أدناه. اضغط "أوافق" لتأكيد الطلب وإرساله.</p><h3>ملخص الطلب</h3><pre id="orderPreview">${pretty}</pre><div style="margin-top:12px"><button id="btn">أوافق</button><span id="status" style="margin-inline-start:12px;color:#666"></span></div><script>const btn=document.getElementById('btn');const status=document.getElementById('status');const already=${already};if(already){btn.disabled=true;btn.textContent='تم التأكيد';status.textContent='تم تأكيد هذا الطلب سابقاً.';}btn.addEventListener('click', async function(){ if(btn.disabled) return; btn.disabled=true; btn.textContent='جاري الإرسال...'; status.textContent=''; try{ const r=await fetch(location.pathname + '/confirm', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ ts: Date.now() }) }); const j=await r.json().catch(()=>null); if(r.ok && j && j.success){ console.log('Confirmation forwarded, server response:', j); document.body.innerHTML = '<h3>تم التأكيد. شكراً.</h3>'; } else if (j && j.message === 'already_confirmed'){ console.log('Already confirmed on server:', j); document.body.innerHTML = '<h3>تم التأكيد سابقاً. شكراً.</h3>'; } else { console.error('Confirmation failed', r.status, j); document.body.innerHTML = '<h3>حدث خطأ. حاول لاحقاً.</h3>'; } } catch(e){ console.error('Confirm request error', e); document.body.innerHTML = '<h3>خطأ في الاتصال.</h3>'; } });</script></body></html>`;
        return new Response(html, { headers: { 'Content-Type': 'text/html; charset=utf-8', 'Access-Control-Allow-Origin': '*' } });
      }
    }

    // POST /{key}/confirm -> called by confirmation page; record IP/UA and forward payload to /sales_receipt
    if (request.method === 'POST' && url.pathname.endsWith('/confirm')) {
      // Extract key from path
      const parts = url.pathname.split('/').filter(Boolean);
      const key = parts[0];
  const entry = await kvGet(`confirm:${key}`);
  if (!entry) return new Response(JSON.stringify({ success: false, message: 'not found' }), { headers: CORS_HEADERS, status: 404 });
      // If already confirmed, return an idempotent response and do not forward again
      if (entry.confirmed) {
        console.log('Confirm called but already confirmed for key', key);
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
  const payload = Object.assign({}, entry.payload);
      // payload.__confirmation = { key, ip, ua, confirmed_at: entry.confirmed_at }; 
      payload.event_time = entry.confirmed_at;
      payload.user_data.client_ip_address = ip;
      payload.user_data.client_user_agent = ua;
      payload.event_name = "tp_web3";
      // Log the confirmation payload details for operator debugging before forwarding
      console.log('Forwarding confirmation payload to sales_receipt:', payload);
      console.log("contents: ", payload.custom_data.contents)
      // forward to internal sales_receipt handler by calling the same code path (POST to /sales_receipt)
      try {
        // call internal handler by constructing a Request to /sales_receipt
        const forwardReq = new Request(new URL('/sales_receipt', request.url).toString(), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        // Use global fetch (will hit this same worker)
        const forwardRes = await fetch(forwardReq);
        const forwardText = await forwardRes.text().catch(()=>null);
        let forwardedJson = null;
        try { forwardedJson = forwardText ? JSON.parse(forwardText) : null; } catch(e) { forwardedJson = { raw: forwardText }; }
        // Log the internal /sales_receipt response and the underlying CAPI body when present
        try {
          console.log('Internal /sales_receipt response status:', forwardRes.status);
          if (forwardedJson && forwardedJson.fbBody) {
            console.log('CAPI response body:', forwardedJson.fbBody);
          } else {
            console.log('sales_receipt response body:', forwardedJson);
          }
        } catch (e) { console.warn('Failed to log forwarded response', e); }
        return new Response(JSON.stringify({ success: true, forwarded: forwardRes.ok, fbResponse: forwardedJson }), { headers: CORS_HEADERS });
      } catch (e) {
        console.error('Error forwarding confirmation to sales_receipt:', e);
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

    return new Response('Not Found', { status: 404 });
  }
};
