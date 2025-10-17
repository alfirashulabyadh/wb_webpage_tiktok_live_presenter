addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request, event))
})

/**
 * This Worker expects environment bindings:
 * BOT_TOKEN (secret) and CHAT_ID (secret or binding)
 * When deploying with Wrangler, bind them under [vars] or as secrets.
 */
// Note: this script uses the service-worker runtime style (addEventListener('fetch', ...)).
// In that mode Wrangler injects `vars`/`secrets` as global bindings. Access them via
// `globalThis.BOT_TOKEN` and `globalThis.CHAT_ID` (or directly as globals).

async function handleRequest(request, event){
  if(request.method !== 'POST'){
    return new Response('Not found', {status:404})
  }

  // Read from global bindings (Wrangler will inject BOT_TOKEN and CHAT_ID)
  const BOT_TOKEN = typeof globalThis.BOT_TOKEN !== 'undefined' ? globalThis.BOT_TOKEN : '';
  const CHAT_ID = typeof globalThis.CHAT_ID !== 'undefined' ? globalThis.CHAT_ID : '';

  if(!BOT_TOKEN || !CHAT_ID){
    return new Response(JSON.stringify({error:'server misconfigured - BOT_TOKEN or CHAT_ID missing'}),{status:500,headers:{'content-type':'application/json'}})
  }

  const contentType = request.headers.get('content-type') || '';
  if(!contentType.includes('multipart/form-data')){
    return new Response(JSON.stringify({error:'wrong content-type, expected multipart/form-data'}),{status:400,headers:{'content-type':'application/json'}})
  }

  // Basic server-side size limits (note: Cloudflare Workers also have platform limits)
  const MAX_AUDIO = 20 * 1024 * 1024; // 20MB
  const MAX_PHOTO = 5 * 1024 * 1024; // 5MB

  const formData = await request.formData();

  // Build message text from fields
  const fields = {};
  for (const entry of formData.entries()){
    const [key, value] = entry;
    if(value instanceof File){
      continue;
    }
    fields[key] = value;
  }

  const lines = [];
  lines.push('نموذج تقديم - مقدم/مقدمة بث مباشر على التيك توك');
  for(const k of Object.keys(fields)){
    lines.push(`${k}: ${fields[k]}`);
  }

  // send text first
  try{
    // Debug: surface whether secrets are present (masked) so we can debug 404 from Telegram
    try{
      const masked = BOT_TOKEN ? (BOT_TOKEN.slice(0,5) + '...' + BOT_TOKEN.slice(-5)) : 'MISSING';
      console.log('BOT_TOKEN present:', !!BOT_TOKEN, 'len:', BOT_TOKEN ? BOT_TOKEN.length : 0, 'masked:', masked, 'CHAT_ID present:', !!CHAT_ID);
    }catch(e){ console.log('debug log failed', e.message) }
    const resp = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,{
      method:'POST',
      headers:{'content-type':'application/json'},
      body: JSON.stringify({chat_id: CHAT_ID, text: lines.join('\n')})
    });
    // Attempt to parse Telegram response for debugging and error handling
    let j;
    try{ j = await resp.json() }catch(e){ j = null }
    if(!resp.ok || (j && j.ok === false)){
      console.error('Telegram sendMessage failed', {status: resp.status, statusText: resp.statusText, body: j});
      return new Response(JSON.stringify({error:'failed to send message to telegram','detail': j || resp.statusText}),{status:502,headers:{'content-type':'application/json'}})
    }
  }catch(err){
    return new Response(JSON.stringify({error:'failed to send message to telegram','detail':err.message}),{status:502,headers:{'content-type':'application/json'}})
  }

  // handle files (audio then photo)
  const audio = formData.get('audio');
  const photo = formData.get('photo');

  async function sendFileToTelegram(file, type){
    if(!(file && file.size)) return {ok:true};
    // server-side check
    if(type === 'audio' && file.size > MAX_AUDIO){
      return {ok:false, error:'audio too large'};
    }
    if(type === 'photo' && file.size > MAX_PHOTO){
      return {ok:false, error:'photo too large'};
    }

    const fd = new FormData();
    fd.append('chat_id', CHAT_ID);
    fd.append(type === 'audio' ? 'audio' : 'photo', file, file.name);

    try{
      const resp = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/send${type === 'audio' ? 'Audio' : 'Photo'}`,{
        method:'POST',
        body: fd
      });
      let j;
      try{ j = await resp.json() }catch(e){ j = null }
      if(!resp.ok || (j && j.ok === false)){
        console.error('Telegram sendFile failed', {type, status: resp.status, statusText: resp.statusText, body: j});
        return {ok:false, status: resp.status, error: j || resp.statusText};
      }
      return {ok:true};
    }catch(err){
      return {ok:false, error: err.message};
    }
  }

  const audioResult = await sendFileToTelegram(audio, 'audio');
  const photoResult = await sendFileToTelegram(photo, 'photo');

  // final emoji message (best-effort)
  try{
    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,{
      method:'POST',
      headers:{'content-type':'application/json'},
      body: JSON.stringify({chat_id: CHAT_ID, text: '🤞🤞🤞🤞🤞🤞🤞🤞🤞🤞'})
    });
  }catch(err){
    // ignore
  }

  const result = {ok:true, audio: audioResult, photo: photoResult};
  return new Response(JSON.stringify(result),{status:200,headers:{'content-type':'application/json'}})
}
