(function(){
  var soundOn=false;
  var currentLang=localStorage.getItem('japan2026-language')||'ru';
  var videoDays=['0','1','2','4','5','6','7','8','9'];

  var cardTranslations={
    '0':{
      ru:['CHAPTER 0 • 6 сентября','ПЕРЕЛЁТ: ПОРТАЛ ОТКРЫТ','Вылет в Японию','День дороги, отдыха и настройки внутреннего компаса на другой часовой пояс.'],
      en:['CHAPTER 0 • 6 September','FLIGHT: THE PORTAL OPENS','Flight to Japan','A travel day to rest and tune your inner compass to a new time zone.'],
      ro:['CHAPTER 0 • 6 septembrie','ZBOR: PORTALUL SE DESCHIDE','Zbor spre Japonia','O zi de drum, odihnă și adaptare la un alt fus orar.']
    },
    '1':{
      ru:['CHAPTER 1 • 7 сентября','ТОКИО: ПЕРВЫЙ КАДР','Прилёт → заселение → Уэно → Синдзюку','Мягко войдём в ритм Токио: парк Уэно, торговые улочки Амэёко и вечерний Синдзюку с экранами, небоскрёбами и 3D-котом.'],
      en:['CHAPTER 1 • 7 September','TOKYO: THE FIRST FRAME','Arrival → check-in → Ueno → Shinjuku','Ease into Tokyo: Ueno Park, Ameyoko shopping streets and evening Shinjuku with screens, skyscrapers and its 3D cat.'],
      ro:['CHAPTER 1 • 7 septembrie','TOKYO: PRIMUL CADRU','Sosire → cazare → Ueno → Shinjuku','Intrăm ușor în ritmul Tokyo: parcul Ueno, străduțele comerciale Ameyoko și Shinjuku de seară cu ecrane, zgârie-nori și pisica 3D.']
    },
    '2':{
      ru:['CHAPTER 2 • 8 сентября','ФУДЗИ И КАВАГУЧИКО','Токио → район Фудзи → озеро Кавагучико','Открыточные виды из Oishi Park, прогулка у озера, опциональная лодка и музей кукол Юки Атаэ. Ночуем у Фудзи.'],
      en:['CHAPTER 2 • 8 September','FUJI AND KAWAGUCHIKO','Tokyo → Fuji area → Lake Kawaguchiko','Postcard views from Oishi Park, a lakeside walk, an optional boat ride and the Yuki Atae Doll Museum. Overnight near Fuji.'],
      ro:['CHAPTER 2 • 8 septembrie','FUJI ȘI KAWAGUCHIKO','Tokyo → zona Fuji → lacul Kawaguchiko','Priveliști de carte poștală din Oishi Park, plimbare pe lângă lac, barcă opțională și muzeul păpușilor Yuki Atae. Dormim lângă Fuji.']
    },
    '3':{
      ru:['SPECIAL CHAPTER • 9 сентября','ВОСХОЖДЕНИЕ НА ФУДЗИ','ИДЕМ К ВЕРШИНЕ!','Ранний выход на маршрут Yoshida, восхождение, прогулка вокруг кратера над облаками, спуск и возвращение в Кавагучико. (Маршрут проходим при подходящей погоде и открытой трассе)','После возвращения: отдых и восстановление в традиционном японском доме в Кавагучико.'],
      en:['SPECIAL CHAPTER • 9 September','ASCENT OF MOUNT FUJI','WE CLIMB TO THE SUMMIT!','Early start on the Yoshida Trail, ascent, a walk around the crater above the clouds, descent and return to Kawaguchiko. (The route is taken only in suitable weather and when the trail is open.)','After the return: rest and recovery in a traditional Japanese house in Kawaguchiko.'],
      ro:['SPECIAL CHAPTER • 9 septembrie','ASCENSIUNEA PE FUJI','URCĂM SPRE VÂRF!','Pornire devreme pe traseul Yoshida, ascensiune, plimbare în jurul craterului deasupra norilor, coborâre și întoarcere în Kawaguchiko. (Parcurgem traseul doar pe vreme potrivită și când ruta este deschisă.)','După întoarcere: odihnă și recuperare într-o casă japoneză tradițională din Kawaguchiko.']
    },
    '4':{
      ru:['CHAPTER 4 • 10 сентября','ТОКИО: ТИШИНА И НЕОН','Кавагучико → Токио → Мэйдзи → Акихабара','Лесное святилище Мэйдзи рядом с Харадзюку, затем Акихабара: электроника, игры, манга и ночные вывески.'],
      en:['CHAPTER 4 • 10 September','TOKYO: QUIET AND NEON','Kawaguchiko → Tokyo → Meiji → Akihabara','Forest-shaded Meiji Shrine near Harajuku, then Akihabara: electronics, games, manga and neon signs.'],
      ro:['CHAPTER 4 • 10 septembrie','TOKYO: LINIȘTE ȘI NEON','Kawaguchiko → Tokyo → Meiji → Akihabara','Sanctuarul Meiji, înconjurat de pădure lângă Harajuku, apoi Akihabara: electronică, jocuri, manga și reclame de noapte.']
    },
    '5':{
      ru:['CHAPTER 5 • 11 сентября','СТАРЫЙ ТОКИО / НОВЫЙ ТОКИО','Асакуса → Skytree → Сибуя → Гинза','Сэнсодзи и Nakamise-dori, вид с Tokyo Skytree, диагональный перекрёсток Сибуи и элегантная вечерняя Гинза.'],
      en:['CHAPTER 5 • 11 September','OLD TOKYO / NEW TOKYO','Asakusa → Skytree → Shibuya → Ginza','Senso-ji and Nakamise-dori, Tokyo Skytree views, Shibuya Crossing and elegant evening Ginza.'],
      ro:['CHAPTER 5 • 11 septembrie','TOKYO VECHI / TOKYO NOU','Asakusa → Skytree → Shibuya → Ginza','Senso-ji și Nakamise-dori, priveliștea din Tokyo Skytree, intersecția Shibuya și eleganta Ginza de seară.']
    },
    '6':{
      ru:['CHAPTER 6 • 12 сентября','БУДУЩЕЕ У ЗАЛИВА','TeamLab → Toyosu → Odaiba → Miraikan','Цифровое искусство TeamLab, свежая рыба в Toyosu Senkyaku Banrai, футуристическая Одайба и Geo-Cosmos в музее будущего. Вечером по желанию: онсен Tokyo Toyosu Manyo Club.'],
      en:['CHAPTER 6 • 12 September','THE FUTURE BY THE BAY','TeamLab → Toyosu → Odaiba → Miraikan','TeamLab digital art, fresh fish at Toyosu Senkyaku Banrai, futuristic Odaiba and Geo-Cosmos at the Museum of the Future. Optional evening: Tokyo Toyosu Manyo Club onsen.'],
      ro:['CHAPTER 6 • 12 septembrie','VIITORUL LÂNGĂ GOLF','TeamLab → Toyosu → Odaiba → Miraikan','Arta digitală TeamLab, pește proaspăt la Toyosu Senkyaku Banrai, Odaiba futuristă și Geo-Cosmos la muzeul viitorului. Seara, opțional: onsen Tokyo Toyosu Manyo Club.']
    },
    '7':{
      ru:['CHAPTER 7 • 13 сентября','ЭНОСИМА: ОСТРОВ ДРАКОНА','Токио → Fujisawa → Enoshima → Hase','Легендарный поезд Enoden, пляж, мост на остров, святилища Бэнтэн, Sea Candle, пещеры Iwaya и shirasu-don. К вечеру заселяемся в тихий Hase у моря.'],
      en:['CHAPTER 7 • 13 September','ENOSHIMA: DRAGON ISLAND','Tokyo → Fujisawa → Enoshima → Hase','The legendary Enoden train, beach, island bridge, Benzaiten shrines, Sea Candle, Iwaya caves and shirasu-don. By evening, we settle into quiet Hase by the sea.'],
      ro:['CHAPTER 7 • 13 septembrie','ENOSHIMA: INSULA DRAGONULUI','Tokyo → Fujisawa → Enoshima → Hase','Trenul legendar Enoden, plaja, podul spre insulă, sanctuarele Benzaiten, Sea Candle, peșterile Iwaya și shirasu-don. Spre seară ne cazăm în liniștitul Hase, lângă mare.']
    },
    '8':{
      ru:['CHAPTER 8 • 14 сентября','КАМАКУРА: БУДДА И МОРЕ','Hase → Kamakura → Ōfuna → Hase','Великий Будда, Hase-dera, Komachi-dori, Hachimangu, бамбук Hokokuji и белая Ōfuna Kannon. Затем несколько часов у Yuigahama и прощальный вечер.'],
      en:['CHAPTER 8 • 14 September','KAMAKURA: BUDDHA AND SEA','Hase → Kamakura → Ōfuna → Hase','Great Buddha, Hase-dera, Komachi-dori, Hachimangu, Hokokuji bamboo grove and white Ōfuna Kannon. Then a few hours at Yuigahama and a farewell evening.'],
      ro:['CHAPTER 8 • 14 septembrie','KAMAKURA: BUDDHA ȘI MAREA','Hase → Kamakura → Ōfuna → Hase','Marele Buddha, Hase-dera, Komachi-dori, Hachimangu, pădurea de bambus Hokokuji și statuia albă Ōfuna Kannon. Apoi câteva ore la Yuigahama și o seară de rămas-bun.']
    },
    '9':{
      ru:['FINAL CHAPTER • 15 сентября','ДОМОЙ, С ПОЛНЫМ ЧЕМОДАНОМ ПОДАРКОВ И ВПЕЧАТЛЕНИЙ','Hase / Kamakura → Yokohama → Haneda','Ранний выезд через Йокогаму, запас на регистрацию, последние покупки и вылет домой.'],
      en:['FINAL CHAPTER • 15 September','HOME, WITH A SUITCASE FULL OF GIFTS AND MEMORIES','Hase / Kamakura → Yokohama → Haneda','Early departure via Yokohama, time for check-in, last shopping and the flight home.'],
      ro:['FINAL CHAPTER • 15 septembrie','ACASĂ, CU O VALIZĂ PLINĂ DE CADOURI ȘI AMINTIRI','Hase / Kamakura → Yokohama → Haneda','Plecare devreme prin Yokohama, timp suficient pentru check-in, ultimele cumpărături și zborul spre casă.']
    }
  };

  var ui={
    en:{route:'ROUTE',guides:'GUIDES',details:'DETAILS',join:'JOIN THE GROUP',chapters:'ITINERARY CHAPTERS',soundOn:'🔊 SOUND: ON',soundOff:'🔇 SOUND: OFF'},
    ro:{route:'TRASEU',guides:'GHIZI',details:'DETALII',join:'VREAU ÎN GRUP',chapters:'CAPITOLELE ITINERARULUI',soundOn:'🔊 SUNET: PORNIT',soundOff:'🔇 SUNET: OPRIT'},
    ru:{route:'маршрут',guides:'проводники',details:'условия',join:'ХОЧУ В ГРУППУ',chapters:'ГЛАВЫ МАРШРУТА',soundOn:'🔊 ЗВУК: ВКЛ',soundOff:'🔇 ЗВУК: ВЫКЛ'}
  };

  var tabLabels={
    ru:['0 · ПЕРЕЛЁТ','1 · ТОКИО','2 · КАВАГУЧИКО','★ ФУДЗИ','4 · МЭЙДЗИ','5 · АСАКУСА','6 · TeamLab','7 · ЭНОСИМА','8 · КАМАКУРА','9 · ДОМОЙ'],
    en:['0 · FLIGHT','1 · TOKYO','2 · KAWAGUCHIKO','★ FUJI','4 · MEIJI','5 · ASAKUSA','6 · TeamLab','7 · ENOSHIMA','8 · KAMAKURA','9 · HOME'],
    ro:['0 · ZBOR','1 · TOKYO','2 · KAWAGUCHIKO','★ FUJI','4 · MEIJI','5 · ASAKUSA','6 · TeamLab','7 · ENOSHIMA','8 · KAMAKURA','9 · ACASĂ']
  };

  function installVideos(){
    videoDays.forEach(function(day){
      var chapter=document.querySelector('.chapter[data-chapter="'+day+'"]');
      if(!chapter)return;
      var panel=chapter.querySelector('.panel-grid > div:last-child');
      if(!panel)return;
      panel.style.padding='0';panel.style.overflow='hidden';
      panel.innerHTML='<video muted loop playsinline controls preload="metadata" style="display:block;width:100%;height:auto;aspect-ratio:16/9;object-fit:contain;background:#000"><source src="assets/day-'+day+'-v2.mp4?v=8" type="video/mp4"><source src="assets/day-'+day+'.mp4?v=8" type="video/mp4"></video>';
    });
  }

  function syncMedia(){
    document.querySelectorAll('.chapter video').forEach(function(video){
      var chapter=video.closest('.chapter');
      var active=chapter&&!chapter.hidden;
      if(active){video.muted=!soundOn;video.volume=1;try{var p=video.play();if(p&&p.catch)p.catch(function(){});}catch(e){}}
      else{video.muted=true;try{video.pause();}catch(e){}}
    });
    var btn=document.getElementById('site-sound-toggle');
    if(btn){btn.style.display='';btn.textContent=soundOn?ui[currentLang].soundOn:ui[currentLang].soundOff;btn.setAttribute('aria-pressed',String(soundOn));}
  }

  function activateChapter(day,button){
    day=String(day);
    document.querySelectorAll('.chapter[data-chapter]').forEach(function(ch){ch.hidden=ch.dataset.chapter!==day;});
    document.querySelectorAll('.day-tab').forEach(function(tab){tab.setAttribute('aria-selected','false');tab.classList.remove('red');});
    if(button){button.setAttribute('aria-selected','true');if(day==='3')button.classList.add('red');}
    updateChapterLabel(day);
    syncMedia();
  }

  function updateChapterLabel(day){
    var label=document.getElementById('chapter-label');
    if(!label)return;
    var idx=Number(day);var text=tabLabels[currentLang][idx]||'';
    if(day==='3') label.textContent=(currentLang==='ru'?'ДЕНЬ ':'DAY ')+text.replace('★ ','');
    else label.textContent=(currentLang==='ru'?'ДЕНЬ ':'DAY ')+text;
  }

  function translateCard(day,lang){
    var chapter=document.querySelector('.chapter[data-chapter="'+day+'"]');
    var t=cardTranslations[day]&&cardTranslations[day][lang];
    if(!chapter||!t)return;
    var meta=chapter.querySelector(':scope > p.display'); if(meta)meta.textContent=t[0];
    var title=chapter.querySelector(':scope > h3'); if(title)title.textContent=t[1];
    if(day==='3'){
      var special=chapter.querySelector('.border-red-500');
      if(special){var spTitle=special.querySelector('p.display');if(spTitle){var height=spTitle.querySelector('span');spTitle.childNodes[0].nodeValue=t[2];if(height)height.textContent='3 776 M';}var desc=special.querySelector('p.mt-3');if(desc)desc.textContent=t[3];}
      var after=chapter.querySelector(':scope > p.mt-5');if(after)after.textContent=t[4];
    }else{
      var first=chapter.querySelector('.panel-grid > div:first-child');
      if(first){var b=first.querySelector('b');if(b)b.textContent=t[2];var p=first.querySelector('p');if(p)p.textContent=t[3];}
    }
  }

  function applyLanguage(lang){
    currentLang=lang;localStorage.setItem('japan2026-language',lang);document.documentElement.lang=lang;
    document.querySelectorAll('.chapter[data-chapter]').forEach(function(ch){translateCard(ch.dataset.chapter,lang);});
    var tabs=document.querySelectorAll('.day-tab');tabs.forEach(function(tab,i){tab.textContent=tabLabels[lang][i];tab.dataset.day=String(i);});
    var nav=document.querySelectorAll('header nav a');if(nav[0])nav[0].textContent=ui[lang].route;if(nav[1])nav[1].textContent=ui[lang].guides;if(nav[2])nav[2].textContent=ui[lang].details;
    var join=document.querySelector('header a[href="#request"]');if(join)join.textContent=ui[lang].join;
    var routeTitle=document.querySelector('#route h2.display');if(routeTitle)routeTitle.textContent=ui[lang].chapters;
    document.querySelectorAll('[data-site-lang]').forEach(function(b){var active=b.dataset.siteLang===lang;b.style.display='';b.classList.toggle('bg-black',active);b.classList.toggle('text-white',active);b.classList.toggle('bg-white',!active);});
    var active=document.querySelector('.day-tab[aria-selected="true"]')||document.querySelector('.day-tab');if(active)updateChapterLabel(active.dataset.day||'0');
    syncMedia();
  }

  function bind(){
    document.querySelectorAll('.day-tab').forEach(function(button,i){button.dataset.day=String(i);button.onclick=function(e){if(e)e.preventDefault();activateChapter(button.dataset.day,button);return false;};});
    var sound=document.getElementById('site-sound-toggle');if(sound){sound.style.display='';sound.onclick=function(e){if(e)e.preventDefault();soundOn=!soundOn;syncMedia();return false;};}
    document.querySelectorAll('[data-site-lang]').forEach(function(button){button.style.display='';button.onclick=function(e){if(e)e.preventDefault();applyLanguage(button.dataset.siteLang);return false;};});
  }

  function boot(){installVideos();bind();applyLanguage(currentLang);window.showChapter=activateChapter;var active=document.querySelector('.day-tab[aria-selected="true"]')||document.querySelector('.day-tab');if(active)activateChapter(active.dataset.day||'0',active);}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();
