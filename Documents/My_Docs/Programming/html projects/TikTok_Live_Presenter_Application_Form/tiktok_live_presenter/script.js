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

  // enhance file inputs to show upload info and provide a clear (x) button
  document.querySelectorAll('input[type=file]').forEach(input=>{
    const container = input.parentElement;
    const info = container.querySelector('.upload-info');
    // create elements for name/size and clear button
    const nameSpan = document.createElement('span');
    nameSpan.className = 'file-name';
    const sizeSpan = document.createElement('span');
    sizeSpan.className = 'file-size';
    const clearBtn = document.createElement('button');
    clearBtn.type = 'button';
    clearBtn.className = 'clear-file';
    clearBtn.textContent = '×';
    clearBtn.title = 'إلغاء اختيار الملف';
    clearBtn.addEventListener('click', ()=>{
      input.value = '';
      nameSpan.textContent = '';
      sizeSpan.textContent = '';
      // hide clear button until next selection
      clearBtn.style.display = 'none';
    });
    // ensure info container is empty and append the elements
    info.innerHTML = '';
    info.appendChild(nameSpan);
    info.appendChild(sizeSpan);
    info.appendChild(clearBtn);
    // clear button hidden until a file is selected
    clearBtn.style.display = 'none';

    input.addEventListener('change', ()=>{
      // remove previous error if any
      const existing = container.querySelector('.error-file');
      if(existing) existing.remove();
  if(!input.files || input.files.length===0){ nameSpan.textContent=''; sizeSpan.textContent=''; clearBtn.style.display='none'; return }
      const f = input.files[0];
  const maxAudio = 4 * 1024 * 1024; // 4MB
  const maxPhoto = 2 * 1024 * 1024; // 2MB

  // format size nicely and follow exact requested text
  const kb = Math.round(f.size/1024);
  const mb = Math.round((f.size/1024/1024)*10)/10;
  // show single phrase: "تم اختيار الملف – الحجم: <الحجم>"
  const sizeText = mb >= 1 ? `${mb} م.ب.` : `${kb} ك.ب.`;
  nameSpan.textContent = `تم اختيار الملف – الحجم: ${sizeText}`;
  sizeSpan.textContent = '';
  // show clear button when a file is selected
  clearBtn.style.display = '';

      const errSpan = document.createElement('div');
      errSpan.className = 'error-file';
      errSpan.style.color = '#b00020';
      errSpan.style.fontSize = '13px';

      if(input.name === 'audio'){
        if(f.size > maxAudio){
          errSpan.textContent = 'حجم الملف أكبر من 4 م.ب.';
          container.appendChild(errSpan);
          input.value = '';
          // keep the info elements in DOM so they can be reused on next selection
          nameSpan.textContent = '';
          sizeSpan.textContent = '';
          clearBtn.style.display = 'none';
          return;
        }
        if(!f.type.startsWith('audio') && !/\.(mp3|wav|m4a|ogg)$/i.test(f.name)){
          errSpan.textContent = 'الرجاء رفع ملف صوتي فقط.';
          container.appendChild(errSpan);
          input.value = '';
          nameSpan.textContent = '';
          sizeSpan.textContent = '';
          clearBtn.style.display = 'none';
          return;
        }
      }
      if(input.name === 'photo'){
        if(f.size > maxPhoto){
          errSpan.textContent = 'حجم الصورة أكبر من 2 م.ب.';
          container.appendChild(errSpan);
          input.value = '';
          nameSpan.textContent = '';
          sizeSpan.textContent = '';
          clearBtn.style.display = 'none';
          return;
        }
        if(!f.type.startsWith('image') && !/\.(jpe?g|png|webp|bmp|gif)$/i.test(f.name)){
          errSpan.textContent = 'الرجاء رفع صورة فقط.';
          container.appendChild(errSpan);
          input.value = '';
          nameSpan.textContent = '';
          sizeSpan.textContent = '';
          clearBtn.style.display = 'none';
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

    // Candidate endpoints to try (relative paths and absolute fallback).
    // Adjust these if you change the Worker route in wrangler.toml.
    const candidateUrls = [
      '/tiktok_live_presenter/api/submit',
      '/api/submit',
      location.origin + '/tiktok_live_presenter/api/submit',
      'https://jobs.whitebedding.net/tiktok_live_presenter/api/submit'
    ];

    let tried = 0;

    function sendToUrl(idx){
      if(idx >= candidateUrls.length){
        modalLoader.style.display='none';
        formMessages.textContent = 'فشل إرسال الطلب — لا يوجد مسار صالح. تحقق من إعدادات الخادم/الـ Worker.';
        return;
      }

      const tryUrl = candidateUrls[idx];
      tried++;
      const xhr = new XMLHttpRequest();
      xhr.open('POST', tryUrl);

      xhr.upload.onprogress = function(e){
        if(e.lengthComputable){
          const pct = Math.round((e.loaded/e.total)*100);
          formMessages.textContent = `جارٍ رفع الملفات ${pct}%`;
        }
      };

      xhr.onload = function(){
        modalLoader.style.display='none';
        // If the endpoint responds 405 (Method Not Allowed) or another
        // server-level routing error, try the next candidate.
        if(xhr.status === 405 && idx < candidateUrls.length - 1){
          // try next candidate
          sendToUrl(idx + 1);
          return;
        }

        try{
          const res = JSON.parse(xhr.responseText || '{}');
          if(xhr.status>=200 && xhr.status<300 && res.ok){
            modalSuccess.style.display='block';
            form.reset();
            return;
          }

          // Non-2xx or worker-reported error — surface details for debugging
          const serverMsg = (res && res.error) ? (res.error + (res.detail? (': '+res.detail) : '')) : null;
          formMessages.textContent = serverMsg || `خطأ ${xhr.status} ${xhr.statusText}: ${xhr.responseText || 'لا توجد تفاصيل'}`;
        }catch(err){
          formMessages.textContent = 'استجابة الخادم غير متوقعة.';
        }
      };

      xhr.onerror = function(){
        modalLoader.style.display='none';
        // network-level error — try next candidate once, otherwise show message
        if(idx < candidateUrls.length - 1){
          sendToUrl(idx + 1);
        }else{
          formMessages.textContent = 'فشل الاتصال بالخادم.';
        }
      };

      try{
        xhr.send(data);
      }catch(e){
        modalLoader.style.display='none';
        formMessages.textContent = 'خطأ محلي أثناء محاولة الإرسال.';
      }
    }

    // start with the first candidate
    sendToUrl(0);
  });

})();
