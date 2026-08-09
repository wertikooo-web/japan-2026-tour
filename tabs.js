(function(){
  var soundOn=false;
  var currentLang='ru';
  var videoDays=['0','1','2','4','5','6','7','8','9'];

  var translations={
    en:{
      'маршрут':'ROUTE','проводники':'GUIDES','условия':'DETAILS','ХОЧУ В ГРУППУ':'JOIN THE GROUP',
      '7–15 СЕНТЯБРЯ 2026 • ДО 8 ЧЕЛОВЕК':'7–15 SEPTEMBER 2026 • UP TO 8 PEOPLE',
      '9 дней от храмов Токио до самурайской Камакуры, от неона Синдзюку до миров цифрового искусства, от Фудзи до океанских островов':'9 days from Tokyo temples to samurai Kamakura, from Shinjuku neon to worlds of digital art, from Fuji to ocean islands',
      'НАЧАТЬ ПРИКЛЮЧЕНИЕ →':'START THE ADVENTURE →','СМОТРЕТЬ ГЛАВЫ ↓':'VIEW THE CHAPTERS ↓',
      'ТОКИО • ФУДЗИ • КАВАГУЧИКО • ЭНОСИМА • КАМАКУРА':'TOKYO • FUJI • KAWAGUCHIKO • ENOSHIMA • KAMAKURA',
      'дней в Японии':'days in Japan','ночей в пути':'nights on the road','морских дня':'days by the sea','большая вершина':'great summit',
      'собираем историю по кадрам':'collecting the story frame by frame','ГЛАВЫ МАРШРУТА':'ITINERARY CHAPTERS',
      '0 · ПЕРЕЛЁТ':'0 · FLIGHT','1 · ТОКИО':'1 · TOKYO','2 · КАВАГУЧИКО':'2 · KAWAGUCHIKO','★ ФУДЗИ':'★ FUJI','4 · МЭЙДЗИ':'4 · MEIJI','5 · АСАКУСА':'5 · ASAKUSA','7 · ЭНОСИМА':'7 · ENOSHIMA','8 · КАМАКУРА':'8 · KAMAKURA','9 · ДОМОЙ':'9 · HOME',
      'ДЕНЬ 0 · ПЕРЕЛЁТ':'DAY 0 · FLIGHT','ПЕРЕЛЁТ: ПОРТАЛ ОТКРЫТ':'FLIGHT: THE PORTAL OPENS','Вылет в Японию':'Flight to Japan',
      'День дороги, отдыха и настройки внутреннего компаса на другой часовой пояс':'A travel day to rest and tune your inner compass to a new time zone',
      'Завтра город заговорит неоном':'Tomorrow the city will speak in neon','ТОКИО: ПЕРВЫЙ КАДР':'TOKYO: THE FIRST FRAME',
      'Прилёт → заселение → Уэно → Синдзюку':'Arrival → check-in → Ueno → Shinjuku',
      'Мягко войдём в ритм Токио: парк Уэно, торговые улочки Амэёко и вечерний Синдзюку с экранами, небоскрёбами и 3D-котом':'Ease into Tokyo: Ueno Park, Ameyoko shopping streets and evening Shinjuku with screens, towers and its 3D cat',
      'ФУДЗИ И КАВАГУЧИКО':'FUJI AND KAWAGUCHIKO','Токио → район Фудзи → озеро Кавагучико':'Tokyo → Fuji area → Lake Kawaguchiko',
      'Открыточные виды из Oishi Park, прогулка у озера, опциональная лодка и музей кукол Юки Атаэ. Ночуем у Фудзи':'Postcard views from Oishi Park, a lakeside walk, an optional boat ride and the Yuki Atae Doll Museum. Overnight near Fuji',
      'ВОСХОЖДЕНИЕ НА ФУДЗИ':'ASCENT OF MOUNT FUJI','ИДЕМ К ВЕРШИНЕ!':'WE CLIMB TO THE SUMMIT!','После возвращения: отдых и восстановление в традиционном японском доме в Кавагучико':'After the return: rest and recovery in a traditional Japanese house in Kawaguchiko',
      'ТОКИО: ТИШИНА И НЕОН':'TOKYO: QUIET AND NEON','Кавагучико → Токио → Мэйдзи → Акихабара':'Kawaguchiko → Tokyo → Meiji → Akihabara',
      'СТАРЫЙ ТОКИО / НОВЫЙ ТОКИО':'OLD TOKYO / NEW TOKYO','Асакуса → Skytree → Сибуя → Гинза':'Asakusa → Skytree → Shibuya → Ginza',
      'БУДУЩЕЕ У ЗАЛИВА':'THE FUTURE BY THE BAY','ЭНОСИМА: ОСТРОВ ДРАКОНА':'ENOSHIMA: DRAGON ISLAND','Токио → Fujisawa → Enoshima → Hase':'Tokyo → Fujisawa → Enoshima → Hase',
      'КАМАКУРА: БУДДА И МОРЕ':'KAMAKURA: BUDDHA AND SEA','ПРОВОДНИКИ':'GUIDES','ЧТО ВХОДИТ':"WHAT'S INCLUDED",'ОТДЕЛЬНО':'NOT INCLUDED',
      'ИНВЕНТАРЬ ПУТЕШЕСТВЕННИКА':"TRAVELER'S KIT",'Для города, экскурсий и пляжа':'For the city, sightseeing and the beach','Для восхождения на Фудзи':'For the Mount Fuji ascent',
      'ВАША ПОЕЗДКА В ЯПОНИЮ':'YOUR JAPAN JOURNEY','7–15 сентября 2026. Напишите нам, чтобы получить детали, стоимость и забронировать место в группе':'7–15 September 2026. Write to us for details, price and a place in the group',
      'План может меняться из-за погоды, транспорта, часов работы мест и пожеланий группы':'The plan may change due to weather, transport, opening hours and the group’s wishes'
    },
    ro:{
      'маршрут':'TRASEU','проводники':'GHIZI','условия':'DETALII','ХОЧУ В ГРУППУ':'VREAU ÎN GRUP',
      '7–15 СЕНТЯБРЯ 2026 • ДО 8 ЧЕЛОВЕК':'7–15 SEPTEMBRIE 2026 • PÂNĂ LA 8 PERSOANE',
      '9 дней от храмов Токио до самурайской Камакуры, от неона Синдзюку до миров цифрового искусства, от Фудзи до океанских островов':'9 zile de la templele din Tokyo la Kamakura samurailor, de la neonul din Shinjuku la lumile artei digitale, de la Fuji la insulele oceanului',
      'НАЧАТЬ ПРИКЛЮЧЕНИЕ →':'ÎNCEPE AVENTURA →','СМОТРЕТЬ ГЛАВЫ ↓':'VEZI CAPITOLELE ↓',
      'ТОКИО • ФУДЗИ • КАВАГУЧИКО • ЭНОСИМА • КАМАКУРА':'TOKYO • FUJI • KAWAGUCHIKO • ENOSHIMA • KAMAKURA',
      'дней в Японии':'zile în Japonia','ночей в пути':'nopți în călătorie','морских дня':'zile la mare','большая вершина':'un mare vârf',
      'собираем историю по кадрам':'adunăm povestea cadru cu cadru','ГЛАВЫ МАРШРУТА':'CAPITOLELE ITINERARULUI',
      '0 · ПЕРЕЛЁТ':'0 · ZBOR','1 · ТОКИО':'1 · TOKYO','2 · КАВАГУЧИКО':'2 · KAWAGUCHIKO','★ ФУДЗИ':'★ FUJI','4 · МЭЙДЗИ':'4 · MEIJI','5 · АСАКУСА':'5 · ASAKUSA','7 · ЭНОСИМА':'7 · ENOSHIMA','8 · КАМАКУРА':'8 · KAMAKURA','9 · ДОМОЙ':'9 · ACASĂ',
      'ДЕНЬ 0 · ПЕРЕЛЁТ':'ZIUA 0 · ZBOR','ПЕРЕЛЁТ: ПОРТАЛ ОТКРЫТ':'ZBOR: PORTALUL SE DESCHIDE','Вылет в Японию':'Zbor spre Japonia',
      'День дороги, отдыха и настройки внутреннего компаса на другой часовой пояс':'O zi de drum, odihnă și adaptare la un alt fus orar',
      'Завтра город заговорит неоном':'Mâine orașul va vorbi în neon','ТОКИО: ПЕРВЫЙ КАДР':'TOKYO: PRIMUL CADRU',
      'Прилёт → заселение → Уэно → Синдзюку':'Sosire → cazare → Ueno → Shinjuku',
      'Мягко войдём в ритм Токио: парк Уэно, торговые улочки Амэёко и вечерний Синдзюку с экранами, небоскрёбами и 3D-котом':'Intrăm ușor în ritmul Tokyo: parcul Ueno, străduțele Ameyoko și Shinjuku de seară cu ecrane, zgârie-nori și pisica 3D',
      'ФУДЗИ И КАВАГУЧИКО':'FUJI ȘI KAWAGUCHIKO','Токио → район Фудзи → озеро Кавагучико':'Tokyo → zona Fuji → lacul Kawaguchiko',
      'Открыточные виды из Oishi Park, прогулка у озера, опциональная лодка и музей кукол Юки Атаэ. Ночуем у Фудзи':'Priveliști de carte poștală din Oishi Park, plimbare pe lângă lac, barcă opțională și muzeul păpușilor Yuki Atae. Dormim lângă Fuji',
      'ВОСХОЖДЕНИЕ НА ФУДЗИ':'ASCENSIUNEA PE FUJI','ИДЕМ К ВЕРШИНЕ!':'URCĂM SPRE VÂRF!','После возвращения: отдых и восстановление в традиционном японском доме в Кавагучико':'După întoarcere: odihnă și recuperare într-o casă japoneză tradițională din Kawaguchiko',
      'ТОКИО: ТИШИНА И НЕОН':'TOKYO: LINIȘTE ȘI NEON','Кавагучико → Токио → Мэйдзи → Акихабара':'Kawaguchiko → Tokyo → Meiji → Akihabara',
      'СТАРЫЙ ТОКИО / НОВЫЙ ТОКИО':'TOKYO VECHI / TOKYO NOU','Асакуса → Skytree → Сибуя → Гинза':'Asakusa → Skytree → Shibuya → Ginza',
      'БУДУЩЕЕ У ЗАЛИВА':'VIITORUL LÂNGĂ GOLF','ЭНОСИМА: ОСТРОВ ДРАКОНА':'ENOSHIMA: INSULA DRAGONULUI','Токио → Fujisawa → Enoshima → Hase':'Tokyo → Fujisawa → Enoshima → Hase',
      'КАМАКУРА: БУДДА И МОРЕ':'KAMAKURA: BUDDHA ȘI MAREA','ПРОВОДНИКИ':'GHIZII','ЧТО ВХОДИТ':'CE ESTE INCLUS','ОТДЕЛЬНО':'SE PLĂTEȘTE SEPARAT',
      'ИНВЕНТАРЬ ПУТЕШЕСТВЕННИКА':'ECHIPAMENTUL CĂLĂTORULUI','Для города, экскурсий и пляжа':'Pentru oraș, excursii și plajă','Для восхождения на Фудзи':'Pentru ascensiunea pe Fuji',
      'ВАША ПОЕЗДКА В ЯПОНИЮ':'CĂLĂTORIA VOASTRĂ ÎN JAPONIA','7–15 сентября 2026. Напишите нам, чтобы получить детали, стоимость и забронировать место в группе':'7–15 septembrie 2026. Scrieți-ne pentru detalii, preț și rezervarea unui loc în grup',
      'План может меняться из-за погоды, транспорта, часов работы мест и пожеланий группы':'Planul se poate schimba în funcție de vreme, transport, programul locurilor și dorințele grupului'
    }
  };

  function normalize(s){return String(s||'').replace(/\s+/g,' ').trim();}

  function getDay(button){
    if(button.dataset.day) return button.dataset.day;
    var text=button.dataset.ruText||button.textContent.trim();
    return text.indexOf('★')===0?'3':((text.match(/^([0-9]+)/)||[])[1]);
  }

  function installVideos(){
    videoDays.forEach(function(day){
      var chapter=document.querySelector('.chapter[data-chapter="'+day+'"]');
      if(!chapter) return;
      var panel=chapter.querySelector('.panel-grid > div:last-child');
      if(!panel) return;
      panel.style.padding='0'; panel.style.overflow='hidden';
      panel.innerHTML='<video muted loop playsinline controls preload="metadata" style="display:block;width:100%;height:auto;min-height:0;aspect-ratio:16/9;object-fit:contain;background:#000"><source src="assets/day-'+day+'-v2.mp4?v=7" type="video/mp4"><source src="assets/day-'+day+'.mp4?v=7" type="video/mp4"></video>';
    });
  }

  function syncMedia(){
    document.querySelectorAll('.chapter video').forEach(function(video){
      var chapter=video.closest('.chapter');
      var active=chapter&&!chapter.hidden;
      if(active){video.muted=!soundOn;video.volume=1;try{var p=video.play();if(p&&p.catch)p.catch(function(){});}catch(e){}}
      else{video.muted=true;try{video.pause();}catch(e){}}
    });
    var sound=document.getElementById('site-sound-toggle');
    if(sound){
      sound.style.display='';
      sound.textContent=soundOn?(currentLang==='en'?'🔊 SOUND: ON':currentLang==='ro'?'🔊 SUNET: PORNIT':'🔊 ЗВУК: ВКЛ'):(currentLang==='en'?'🔇 SOUND: OFF':currentLang==='ro'?'🔇 SUNET: OPRIT':'🔇 ЗВУК: ВЫКЛ');
      sound.setAttribute('aria-pressed',String(soundOn));
    }
  }

  function activateChapter(day,button){
    day=String(day);
    document.querySelectorAll('.chapter[data-chapter]').forEach(function(ch){ch.hidden=ch.dataset.chapter!==day;});
    document.querySelectorAll('.day-tab').forEach(function(tab){tab.setAttribute('aria-selected','false');tab.classList.remove('red');});
    if(button){button.setAttribute('aria-selected','true');if(day==='3')button.classList.add('red');var label=document.getElementById('chapter-label');if(label)label.textContent=button.textContent.replace('★ ',currentLang==='ru'?'ДЕНЬ ':currentLang==='ro'?'ZIUA ':'DAY ');}
    syncMedia();
  }

  function rememberRussian(){
    document.querySelectorAll('body h1,body h2,body h3,body p,body b,body a,body button,body li,body small,body span.marker').forEach(function(node){
      if(node.id==='site-sound-toggle')return;
      if(!node.dataset.ruText)node.dataset.ruText=normalize(node.textContent);
      if(!node.dataset.ruHtml)node.dataset.ruHtml=node.innerHTML;
    });
  }

  function translateNode(node,lang){
    if(node.id==='site-sound-toggle'||node.hasAttribute('data-site-lang'))return;
    if(lang==='ru'){if(node.dataset.ruHtml)node.innerHTML=node.dataset.ruHtml;return;}
    var key=node.dataset.ruText;
    var value=translations[lang]&&translations[lang][key];
    if(value)node.textContent=value;
  }

  function applyLanguage(lang){
    if(!translations[lang]&&lang!=='ru')lang='ru';
    currentLang=lang;
    document.documentElement.lang=lang;
    document.querySelectorAll('body h1,body h2,body h3,body p,body b,body a,body button,body li,body small,body span.marker').forEach(function(node){translateNode(node,lang);});

    var hero=document.querySelector('.hero h1');
    if(hero){
      if(lang==='en')hero.innerHTML='JAPAN<br><span class="text-[var(--red)]">FIRST</span><br>ENCOUNTER!';
      else if(lang==='ro')hero.innerHTML='JAPONIA<br><span class="text-[var(--red)]">PRIMA</span><br>ÎNTÂLNIRE!';
      else if(hero.dataset.ruHtml)hero.innerHTML=hero.dataset.ruHtml;
    }
    var burst=document.querySelector('.burst');
    if(burst){
      if(!burst.dataset.ruHtml)burst.dataset.ruHtml=burst.innerHTML;
      if(lang==='en')burst.innerHTML='<span class="display text-3xl">SPECIAL EDITION</span><span class="text-xl">ASCENT OF<br>MOUNT FUJI</span><small>3,776 m</small>';
      else if(lang==='ro')burst.innerHTML='<span class="display text-3xl">EDIȚIE SPECIALĂ</span><span class="text-xl">ASCENSIUNEA<br>PE FUJI</span><small>3.776 m</small>';
      else burst.innerHTML=burst.dataset.ruHtml;
    }

    document.querySelectorAll('[data-site-lang]').forEach(function(b){var on=b.dataset.siteLang===lang;b.classList.toggle('bg-black',on);b.classList.toggle('text-white',on);b.classList.toggle('bg-white',!on);});
    try{localStorage.setItem('japan2026-language',lang);}catch(e){}
    syncMedia();
  }

  function bindTabs(){document.querySelectorAll('.day-tab').forEach(function(button){button.dataset.day=getDay(button);button.onclick=function(e){if(e)e.preventDefault();activateChapter(button.dataset.day,button);return false;};});}
  function bindSound(){var sound=document.getElementById('site-sound-toggle');if(!sound)return;sound.style.display='';sound.onclick=function(e){if(e)e.preventDefault();soundOn=!soundOn;syncMedia();return false;};}
  function bindLanguages(){document.querySelectorAll('[data-site-lang]').forEach(function(button){button.style.display='';button.onclick=function(e){if(e)e.preventDefault();applyLanguage(button.dataset.siteLang);return false;};});}

  function boot(){
    installVideos();
    rememberRussian();
    bindTabs();bindSound();bindLanguages();
    window.showChapter=activateChapter;
    window.applySiteLanguage=applyLanguage;
    var saved='ru';try{saved=localStorage.getItem('japan2026-language')||'ru';}catch(e){}
    applyLanguage(saved);
    var active=document.querySelector('.day-tab[aria-selected="true"]')||document.querySelector('.day-tab');if(active)activateChapter(getDay(active),active);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();
