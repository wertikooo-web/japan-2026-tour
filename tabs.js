(function(){
  'use strict';

  function getDay(button){
    var explicit=button.getAttribute('data-day');
    if(explicit!==null) return explicit;
    var text=(button.textContent||'').trim();
    if(text.indexOf('★')===0) return '3';
    var match=text.match(/^([0-9]+)/);
    return match ? match[1] : null;
  }

  function activateChapter(day,button){
    if(day===null||day===undefined) return;
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
      if(label) label.textContent=(button.textContent||'').replace('★ ','ДЕНЬ ');
    }

    document.querySelectorAll('.chapter video').forEach(function(video){
      var chapter=video.closest('.chapter');
      if(chapter && !chapter.hidden){
        video.muted=true;
        try{
          var p=video.play();
          if(p&&p.catch)p.catch(function(){});
        }catch(e){}
      }else{
        try{video.pause();}catch(e){}
      }
    });
  }

  function bindTabs(){
    var tabs=document.querySelectorAll('.day-tab');
    tabs.forEach(function(button,index){
      var day=getDay(button);
      if(day!==null) button.setAttribute('data-day',day);
      button.removeAttribute('onclick');
      button.addEventListener('click',function(event){
        event.preventDefault();
        activateChapter(button.getAttribute('data-day'),button);
      });
      button.setAttribute('type','button');
    });

    var selected=document.querySelector('.day-tab[aria-selected="true"]') || tabs[0];
    if(selected) activateChapter(getDay(selected),selected);
  }

  window.showChapter=activateChapter;

  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',bindTabs,{once:true});
  }else{
    bindTabs();
  }
})();
