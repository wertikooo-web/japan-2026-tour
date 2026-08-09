(function(){
  'use strict';

  var FALLBACKS = {
    '0':['assets/day-0-v2.mp4?v=4','assets/day-0.mp4?v=4'],
    '1':['assets/day-1-v2.mp4?v=4','assets/day-1.mp4?v=4'],
    '2':['assets/day-2-v2.mp4?v=4','assets/day-2.mp4?v=4'],
    '4':['assets/day-4-v2.mp4?v=4','assets/day-4.mp4?v=4'],
    '5':['assets/day-5-v2.mp4?v=4','assets/day-5.mp4?v=4'],
    '6':['assets/day-6-v2.mp4?v=4','assets/day-6.mp4?v=4'],
    '7':['assets/day-7-v2.mp4?v=4','assets/day-7.mp4?v=4'],
    '8':['assets/day-8-v2.mp4?v=4','assets/day-8.mp4?v=4'],
    '9':['assets/day-9-v2.mp4?v=4','assets/day-9-final-v2.mp4?v=4','assets/day-9.mp4?v=4']
  };

  function activeChapter(){ return document.querySelector('.chapter:not([hidden])'); }

  function soundEnabled(){
    return typeof window.siteSoundEnabled === 'boolean' ? window.siteSoundEnabled : false;
  }

  function normalizeVideo(video){
    video.setAttribute('playsinline','');
    video.setAttribute('controls','');
    video.setAttribute('preload','metadata');
    video.style.display='block';
    video.style.width='100%';
    video.style.maxWidth='100%';
    video.style.height='auto';
    video.style.minHeight='0';
    video.style.aspectRatio='16 / 9';
    video.style.objectFit='contain';
    video.style.background='#000';
  }

  function configureFallback(video){
    var chapter=video.closest('.chapter');
    if(!chapter) return;
    var day=chapter.dataset.chapter;
    var choices=FALLBACKS[day];
    if(!choices || video.dataset.fallbackReady==='1') return;
    video.dataset.fallbackReady='1';
    video.dataset.fallbackIndex='0';

    var source=video.querySelector('source');
    if(source && source.getAttribute('src')!==choices[0]){
      source.setAttribute('src',choices[0]);
      video.load();
    }

    video.addEventListener('error',function(){
      var index=parseInt(video.dataset.fallbackIndex||'0',10)+1;
      if(index>=choices.length) return;
      video.dataset.fallbackIndex=String(index);
      var current=video.querySelector('source');
      if(current){
        current.setAttribute('src',choices[index]);
        video.load();
        if(chapter===activeChapter()) safePlay(video);
      }
    });
  }

  function safePlay(video){
    if(!video) return;
    var enabled=soundEnabled();
    video.muted=!enabled;
    video.defaultMuted=!enabled;
    if(enabled) video.removeAttribute('muted'); else video.setAttribute('muted','');
    var p=video.play();
    if(p && typeof p.catch==='function') p.catch(function(){
      video.muted=true;
      video.defaultMuted=true;
      video.setAttribute('muted','');
      var retry=video.play();
      if(retry && typeof retry.catch==='function') retry.catch(function(){});
    });
  }

  function syncPlayback(){
    var active=activeChapter();
    document.querySelectorAll('.chapter video').forEach(function(video){
      normalizeVideo(video);
      configureFallback(video);
      var chapter=video.closest('.chapter');
      if(chapter===active){
        safePlay(video);
      }else{
        video.pause();
        video.muted=true;
        video.defaultMuted=true;
        video.setAttribute('muted','');
      }
    });
  }

  function removeLegacySoundtracks(){
    document.querySelectorAll('.video-soundtrack').forEach(function(track){
      try{track.pause();}catch(e){}
      track.remove();
    });
  }

  function addResilienceStyles(){
    var style=document.createElement('style');
    style.textContent='\n#chapters video{display:block!important;width:100%!important;max-width:100%!important;height:auto!important;min-height:0!important;aspect-ratio:16/9!important;object-fit:contain!important;background:#000!important}\n@media(max-width:900px){header .mx-auto{flex-wrap:wrap!important}header .flex.items-center.gap-2{margin-left:auto;max-width:100%;flex-wrap:wrap;justify-content:flex-end}#chapters .panel-grid>div:last-child{padding:0!important;overflow:hidden!important}#chapters video{width:100%!important;height:auto!important;min-height:0!important}.day-tab{scroll-snap-align:start}#route .overflow-x-auto{scroll-snap-type:x proximity}}\n@media(max-width:480px){#site-sound-toggle{order:3}.hero{overflow:hidden}.panel-grid{grid-template-columns:minmax(0,1fr)!important}}';
    document.head.appendChild(style);
  }

  function install(){
    removeLegacySoundtracks();
    addResilienceStyles();

    document.querySelectorAll('.chapter video').forEach(function(video){
      normalizeVideo(video);
      configureFallback(video);
      video.addEventListener('loadedmetadata',function(){ if(video.closest('.chapter')===activeChapter()) safePlay(video); });
      video.addEventListener('canplay',function(){ if(video.closest('.chapter')===activeChapter() && video.paused) safePlay(video); });
    });

    var previousShow=window.showChapter;
    if(typeof previousShow==='function'){
      window.showChapter=function(day,button){
        previousShow(day,button);
        requestAnimationFrame(function(){ requestAnimationFrame(syncPlayback); });
      };
    }

    var soundButton=document.getElementById('site-sound-toggle');
    if(soundButton){ soundButton.addEventListener('click',function(){ setTimeout(syncPlayback,0); }); }

    document.addEventListener('visibilitychange',function(){ if(!document.hidden) syncPlayback(); });
    window.addEventListener('pageshow',syncPlayback);
    syncPlayback();
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',install,{once:true}); else install();
})();
