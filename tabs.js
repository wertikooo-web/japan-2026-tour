(function(){
  var soundOn=false;
  var videoDays=['0','1','2','4','5','6','7','8','9'];

  function getDay(button){
    if(button.dataset.day) return button.dataset.day;
    var text=button.textContent.trim();
    return text.indexOf('★')===0?'3':((text.match(/^([0-9]+)/)||[])[1]);
  }

  function installVideos(){
    videoDays.forEach(function(day){
      var chapter=document.querySelector('.chapter[data-chapter="'+day+'"]');
      if(!chapter) return;
      var panel=chapter.querySelector('.panel-grid > div:last-child');
      if(!panel) return;
      panel.style.padding='0';panel.style.overflow='hidden';
      panel.innerHTML='<video muted loop playsinline controls preload="metadata" style="display:block;width:100%;height:auto;min-height:0;aspect-ratio:16/9;object-fit:contain;background:#000"><source src="assets/day-'+day+'-v2.mp4?v=6" type="video/mp4"><source src="assets/day-'+day+'.mp4?v=6" type="video/mp4"></video>';
    });
  }

  function syncMedia(){
    document.querySelectorAll('.chapter video').forEach(function(video){
      var active=video.closest('.chapter') && !video.closest('.chapter').hidden;
      if(active){
        video.muted=!soundOn;
        video.volume=1;
        try{var p=video.play();if(p&&p.catch)p.catch(function(){});}catch(e){}
      }else{
        video.muted=true;
        try{video.pause();}catch(e){}
      }
    });
    var sound=document.getElementById('site-sound-toggle');
    if(sound){
      sound.style.display='';
      sound.textContent=soundOn?'🔊 ЗВУК: ВКЛ':'🔇 ЗВУК: ВЫКЛ';
      sound.setAttribute('aria-pressed',String(soundOn));
    }
  }

  function activateChapter(day,button){
    day=String(day);
    document.querySelectorAll('.chapter[data-chapter]').forEach(function(ch){ch.hidden=ch.dataset.chapter!==day;});
    document.querySelectorAll('.day-tab').forEach(function(tab){tab.setAttribute('aria-selected','false');tab.classList.remove('red');});
    if(button){button.setAttribute('aria-selected','true');if(day==='3')button.classList.add('red');var label=document.getElementById('chapter-label');if(label)label.textContent=button.textContent.replace('★ ','ДЕНЬ ');}
    syncMedia();
  }

  function bindTabs(){
    document.querySelectorAll('.day-tab').forEach(function(button){
      button.dataset.day=getDay(button);
      button.onclick=function(e){if(e)e.preventDefault();activateChapter(button.dataset.day,button);return false;};
    });
  }

  function bindSound(){
    var sound=document.getElementById('site-sound-toggle');
    if(!sound)return;
    sound.style.display='';
    sound.onclick=function(e){if(e)e.preventDefault();soundOn=!soundOn;syncMedia();return false;};
  }

  function bindLanguages(){
    document.querySelectorAll('[data-site-lang]').forEach(function(button){
      button.style.display='';
      button.onclick=function(e){
        if(e)e.preventDefault();
        var lang=button.dataset.siteLang;
        if(typeof window.applySiteLanguage==='function') window.applySiteLanguage(lang);
        document.querySelectorAll('[data-site-lang]').forEach(function(b){b.classList.toggle('bg-black',b===button);b.classList.toggle('text-white',b===button);b.classList.toggle('bg-white',b!==button);});
        return false;
      };
    });
  }

  function boot(){installVideos();bindTabs();bindSound();bindLanguages();window.showChapter=activateChapter;var active=document.querySelector('.day-tab[aria-selected="true"]')||document.querySelector('.day-tab');if(active)activateChapter(getDay(active),active);}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();
