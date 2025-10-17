(function(){
  const startBtn = document.getElementById('start-apply');
  const form = document.getElementById('application-form');
  const modal = document.getElementById('modal');
  const modalLoader = document.getElementById('modal-loader');
  const modalSuccess = document.getElementById('modal-success');
  const formMessages = document.querySelector('.form-messages');

  startBtn.addEventListener('click', ()=>{
    startBtn.style.display='none';
    form.classList.remove('hidden');
    form.scrollIntoView({behavior:'smooth'});
  });

  // enhance file inputs to show upload info
  document.querySelectorAll('input[type=file]').forEach(input=>{
    const info = input.parentElement.querySelector('.upload-info');
    input.addEventListener('change', ()=>{
      if(!input.files || input.files.length===0){ info.textContent=''; return }
      const f = input.files[0];
      info.textContent = `${f.name} (${Math.round(f.size/1024)} KB)`;
      // client-side validation: size + mime
      const maxAudio = 20 * 1024 * 1024; // 20MB
      const maxPhoto = 5 * 1024 * 1024; // 5MB
      const errSpan = document.createElement('div');
      errSpan.className = 'error-file';
      errSpan.style.color = '#b00020';
      errSpan.style.fontSize = '13px';
      // remove old error
      const existing = input.parentElement.querySelector('.error-file');
      if(existing) existing.remove();
      if(input.name === 'audio'){
        if(f.size > maxAudio){
          errSpan.textContent = 'حجم الملف أكبر من 20 م.ب.';
          input.parentElement.appendChild(errSpan);
          info.textContent = '';
          input.value = '';
          return;
        }
        if(!f.type.startsWith('audio')){
          errSpan.textContent = 'الرجاء رفع ملف صوتي فقط.';
          input.parentElement.appendChild(errSpan);
          info.textContent = '';
          input.value = '';
          return;
        }
      }
      if(input.name === 'photo'){
        if(f.size > maxPhoto){
          errSpan.textContent = 'حجم الصورة أكبر من 5 م.ب.';
          input.parentElement.appendChild(errSpan);
          info.textContent = '';
          input.value = '';
          return;
        }
        if(!f.type.startsWith('image')){
          errSpan.textContent = 'الرجاء رفع صورة فقط.';
          input.parentElement.appendChild(errSpan);
          info.textContent = '';
          input.value = '';
          return;
        }
      }
    });
  });

  function showFieldError(field){
    const err = field.parentElement.querySelector('.error');
    if(err) err.style.display='block';
  }

  form.addEventListener('submit', e=>{
    e.preventDefault();
    formMessages.textContent='';

    // basic validation
    const required = form.querySelectorAll('[required]');
    let ok = true;
    required.forEach(r=>{
      if((r.type==='radio' || r.type==='checkbox')) return;
      if(!r.value){ ok=false; showFieldError(r); }
    });

    const confirm = document.getElementById('confirm');
    if(!confirm.checked){ formMessages.textContent='ينبغي الموافقة على الشرط أعلاه'; ok=false }

    if(!ok){
      const msgs = form.querySelectorAll('.error');
      msgs.forEach(m=>{ if(getComputedStyle(m).display==='block') m.scrollIntoView({behavior:'smooth',block:'center'}) });
      return;
    }

    // show modal loader
    modal.classList.remove('hidden');
    modalLoader.style.display='block';
    modalSuccess.style.display='none';

    // prepare form data
    const data = new FormData(form);

    // send to backend (Cloudflare Worker) - endpoint path: /api/submit
    const url = '/api/submit';

    const xhr = new XMLHttpRequest();
    xhr.open('POST', url);

    xhr.upload.onprogress = function(e){
      if(e.lengthComputable){
        const pct = Math.round((e.loaded/e.total)*100);
        formMessages.textContent = `جارٍ رفع الملفات ${pct}%`;
      }
    };

    xhr.onload = function(){
      modalLoader.style.display='none';
      try{
        const res = JSON.parse(xhr.responseText || '{}');
        if(xhr.status>=200 && xhr.status<300 && res.ok){
          modalSuccess.style.display='block';
          form.reset();
        }else{
          const msg = (res && res.error) ? (res.error + (res.detail? (': '+res.detail) : '')) : 'حدث خطأ أثناء إرسال الطلب، حاول لاحقاً.';
          formMessages.textContent = msg;
        }
      }catch(err){
        formMessages.textContent = 'استجابة الخادم غير متوقعة.';
      }
    };

    xhr.onerror = function(){
      modalLoader.style.display='none';
      formMessages.textContent = 'فشل الاتصال بالخادم.';
    };

    xhr.send(data);
  });

})();
