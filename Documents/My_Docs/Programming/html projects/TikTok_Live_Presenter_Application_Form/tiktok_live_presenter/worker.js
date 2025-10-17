addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request, event))
})

/**
 * This Worker expects environment bindings:
 * BOT_TOKEN (secret) and CHAT_ID (secret or binding)
 * When deploying with Wrangler, bind them under [vars] or as secrets.
 */
async function handleRequest(request, event){
  if(request.method !== 'POST'){
    return new Response('Not found', {status:404})
  }

  // Read from global bindings (Wrangler will inject BOT_TOKEN and CHAT_ID)
  const BOT_TOKEN = typeof BOT_TOKEN !== 'undefined' ? BOT_TOKEN : '';
  const CHAT_ID = typeof CHAT_ID !== 'undefined' ? CHAT_ID : '';

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
    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,{
      method:'POST',
      headers:{'content-type':'application/json'},
      body: JSON.stringify({chat_id: CHAT_ID, text: lines.join('\n')})
    });
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
      return resp.ok ? {ok:true} : {ok:false, status: resp.status};
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
