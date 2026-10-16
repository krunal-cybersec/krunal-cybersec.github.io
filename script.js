(function(){
  document.getElementById('yr').textContent=new Date().getFullYear();

  // Links still holding placeholders (or "#") do nothing and tell the visitor why.
  document.querySelectorAll('a[data-ph]').forEach(function(a){
    var h=a.getAttribute('href');
    if(h==='#'||h.indexOf('[ADD')!==-1){
      a.setAttribute('aria-disabled','true');a.title='Not added yet';
      a.addEventListener('click',function(e){e.preventDefault();});
    } else { a.removeAttribute('data-ph'); }
  });

  // Resume: a plain download link (resume.pdf). The preview below saves it through the viewer instead.
  var note=document.getElementById('resume-note'),btns=document.querySelectorAll('[data-resume]');
  if(window.RESUME_B64){ // hosted preview only: save through the viewer's download prompt
    btns.forEach(function(a){a.addEventListener('click',function(e){
      e.preventDefault();
      var raw=atob(window.RESUME_B64),u=new Uint8Array(raw.length);for(var i=0;i<raw.length;i++)u[i]=raw.charCodeAt(i);
      var blob=new Blob([u],{type:'application/pdf'});
      (window.claude?window.claude.use('downloads'):Promise.resolve(null)).then(function(d){
        if(!d){note.textContent='Downloads are not available in this preview. The deployed site downloads resume.pdf directly.';return;}
        return d.save({filename:'Krunal-Mahajan-Resume.pdf',data:blob}).then(function(){note.textContent='Resume saved.';}).catch(function(err){if(!err||err.code!=='declined')note.textContent='Could not save the resume here.';});
      });
    });});
  }

  // Certificate: open the image in an in-page viewer.
  var lb=document.getElementById('lb');
  document.querySelectorAll('a.thumb').forEach(function(a){a.addEventListener('click',function(e){
    if(!lb||!lb.showModal)return;e.preventDefault();lb.querySelector('img').src=a.querySelector('img').src;lb.showModal();});});
  if(lb){document.getElementById('lbx').addEventListener('click',function(){lb.close();});
    lb.addEventListener('click',function(e){if(e.target===lb)lb.close();});}

  // Contact form: validate, then send only if a form service is configured.
  var f=document.getElementById('form'),fn=document.getElementById('form-note');
  f.addEventListener('submit',function(e){
    e.preventDefault();var ok=true;
    f.querySelectorAll('input,textarea').forEach(function(el){
      var bad=!el.value.trim()||(el.type==='email'&&!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(el.value));
      el.setAttribute('aria-invalid',bad);if(bad)ok=false;
    });
    if(!ok){fn.textContent='Please fill in every field with a valid email address.';return;}
    if(f.action.indexOf('YOUR_FORM_ID')!==-1){fn.textContent='The form is not connected to a service yet (see README).';return;}
    fetch(f.action,{method:'POST',body:new FormData(f),headers:{Accept:'application/json'}}).then(function(r){
      if(r.ok){f.reset();fn.textContent='Message sent. Thank you.';}else throw new Error();
    }).catch(function(){fn.textContent='Message could not be sent. Please email me directly.';});
  });
})();
