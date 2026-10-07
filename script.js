document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{const id=a.getAttribute('href');if(id&&id!=='#'){const el=document.querySelector(id);if(el){e.preventDefault();el.scrollIntoView({behavior:'smooth'});}}}));

const header=document.querySelector('.header');
window.addEventListener('scroll',()=>{const y=scrollY;header.style.boxShadow=y>20?'0 8px 30px rgba(0,0,0,.35)':'none';});

// NSCC Countdown + live state
(()=>{
  const panel=document.getElementById('countdownPanel');
  if(!panel)return;
  const target=new Date(panel.dataset.target).getTime();
  const opening=new Date('2026-10-10T20:30:00+09:00').getTime();
  const day1=new Date('2026-10-10T21:00:00+09:00').getTime();
  const day1End=new Date('2026-10-11T03:00:00+09:00').getTime();
  const finalStart=new Date('2026-10-11T20:30:00+09:00').getTime();
  const eventEnd=new Date('2026-10-12T03:00:00+09:00').getTime();
  const ids={d:document.getElementById('cdDays'),h:document.getElementById('cdHours'),m:document.getElementById('cdMinutes'),s:document.getElementById('cdSeconds')};
  const badge=document.getElementById('liveStatusBadge');
  const stages=[...document.querySelectorAll('#liveProgress article')];
  const setStage=name=>stages.forEach(x=>x.classList.toggle('active',x.dataset.stage===name));
  const pad=n=>String(n).padStart(2,'0');

  function update(){
    const now=Date.now();
    let diff=Math.max(0,target-now);
    ids.d.textContent=pad(Math.floor(diff/86400000));
    ids.h.textContent=pad(Math.floor(diff%86400000/3600000));
    ids.m.textContent=pad(Math.floor(diff%3600000/60000));
    ids.s.textContent=pad(Math.floor(diff%60000/1000));

    badge.classList.remove('live');
    if(now<opening){badge.querySelector('span').textContent='PRE EVENT';setStage('pre');}
    else if(now<day1){badge.querySelector('span').textContent='OPENING NOW';badge.classList.add('live');setStage('opening');}
    else if(now<day1End){badge.querySelector('span').textContent='DAY 1 LIVE';badge.classList.add('live');setStage('day1');}
    else if(now<finalStart){badge.querySelector('span').textContent='FINAL DAY';setStage('final');}
    else if(now<eventEnd){badge.querySelector('span').textContent='FINAL LIVE';badge.classList.add('live');setStage('final');}
    else{badge.querySelector('span').textContent='EVENT COMPLETE';setStage('final');}
  }
  update();setInterval(update,1000);
})();

// Team finder
(()=>{
  const select=document.getElementById('teamSelect');
  const button=document.getElementById('teamJumpButton');
  const cards=[...document.querySelectorAll('.roster-grid .roster-card')];
  if(!select||!button||!cards.length)return;
  cards.forEach((card,i)=>{
    const letter=card.querySelector('.roster-head>span')?.textContent.trim()||String(i+1);
    const name=card.querySelector('.roster-head strong')?.textContent.trim()||('TEAM '+letter);
    card.id='team-'+letter.toLowerCase();
    const opt=document.createElement('option');opt.value=card.id;opt.textContent='TEAM '+letter+'｜'+name;select.appendChild(opt);
  });
  const jump=()=>{
    if(!select.value)return;
    const el=document.getElementById(select.value);if(!el)return;
    el.scrollIntoView({behavior:'smooth',block:'center'});
    el.classList.remove('team-highlight');void el.offsetWidth;el.classList.add('team-highlight');
  };
  button.addEventListener('click',jump);
  select.addEventListener('change',()=>{if(select.value)jump();});
})();

// Champion reveal hook: set data-revealed="true" and champion name in HTML when winner is decided.
(()=>{
  const box=document.getElementById('championReveal');
  if(!box)return;
  if(box.dataset.revealed==='true')box.classList.add('revealed');
})();
