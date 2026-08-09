(function(){
  function activateChapter(day, button){
    day=String(day);
    document.querySelectorAll('.chapter[data-chapter]').forEach(function(chapter){
      chapter.hidden = chapter.dataset.chapter !== day;
    });
    document.querySelectorAll('.day-tab').forEach(function(tab){
      tab.setAttribute('aria-selected','false');
      tab.classList.remove('red');
    });
    if(button){
      button.setAttribute('aria-selected','true');
      if(day==='3') button.classList.add('red');
      var label=document.getElementById('chapter-label');
      if(label) label.textContent=button.textContent.replace('★ ','ДЕНЬ ');
    }
    document.querySelectorAll('.chapter video').forEach(function(video){
      var chapter=video.closest('.chapter');
      if(chapter && !chapter.hidden){
        video.muted=true;
        try{var p=video.play();if(p&&p.catch)p.catch(function(){});}catch(e){}
      }else{
        try{video.pause();}catch(e){}
      }
    });
  }
  window.showChapter=activateChapter;
  document.addEventListener('DOMContentLoaded',function(){
    document.querySelectorAll('.day-tab').forEach(function(button){
      button.onclick=function(e){
        if(e)e.preventDefault();
        var text=button.textContent.trim();
        var day=text.indexOf('★')===0?'3':((text.match(/^([0-9]+)/)||[])[1]);
        if(day!==undefined) activateChapter(day,button);
        return false;
      };
    });
  });
})();
