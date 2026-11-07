const R={e:'Elves',h:'Hobbits',d:'Dwarves',m:'Men'},T={e:'The Elven Realm',h:'The Hobbit Realm',d:'The Dwarven Realm',m:'The Kingdoms of Men',a:'All Four Realms'};
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
let S;try{S=JSON.parse(localStorage.getItem('realms'))}catch(e){}
S=S||{};S.n=S.n||{e:[],h:[],d:[],m:[]};S.H=S.H||[];if(S.mu===undefined)S.mu=1;
const save=()=>{try{localStorage.setItem('realms',JSON.stringify(S))}catch(e){}};
let cur='e',last=null,tm=[];
const esc=s=>s.replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const toast=m=>{const t=$('#toast');t.textContent=m;t.classList.add('on');setTimeout(()=>t.classList.remove('on'),2200)};
const shuf=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
const pool=()=>(cur==='a'?'ehdm':cur).split('').flatMap(r=>S.n[r].map(n=>({n,r})));
const parse=t=>t.split(/[\n,;]+/).map(x=>x.trim()).filter(Boolean);
function view(id){$$('.view').forEach(v=>v.classList.toggle('on',v.id===id));scrollTo(0,0)}
function setRace(r){cur=r;document.body.dataset.r=r;$('#rt').textContent=T[r];$('#chips').innerHTML=[...'ehdm','a'].map(k=>`<button data-k="${k}" class="${k===r?'on':''}">${k==='a'?'All Realms':R[k]}</button>`).join('');render()}
function render(){const p=pool();$('#avail').textContent=p.length+' name'+(p.length==1?'':'s')+' available in '+T[cur];
 $('#hint2').style.display=cur==='a'?'block':'none';
 $('#nl').innerHTML=p.length?p.map(x=>`<li><span>${esc(x.n)} <small>${R[x.r]}</small></span><span><button data-ed="${x.r}|${esc(x.n)}">Edit</button><button class="danger" data-del="${x.r}|${esc(x.n)}">Delete</button></span></li>`).join(''):'<li class="dim">No names yet. Add some above.</li>';
 $('#hl').innerHTML=S.H.length?S.H.map(h=>`<li><span>${esc(h.n)} <small>${R[h.r]}</small></span><small>${h.d}</small></li>`).join(''):'<li class="dim">No draws yet.</li>'}
function addNames(list,r){let a=0;list.forEach(n=>{if(!S.n[r].some(x=>x.toLowerCase()===n.toLowerCase())){S.n[r].push(n);a++}});save();render();toast(a+' added'+(list.length-a?', '+(list.length-a)+' duplicate skipped':''))}
$('#chips').onclick=e=>{const k=e.target.dataset.k;if(k)setRace(k)};
$('#tabs').onclick=e=>{const t=e.target.dataset.t;if(!t)return;$$('#tabs button').forEach(b=>b.classList.toggle('on',b===e.target));$$('.pane').forEach(p=>p.classList.toggle('on',p.id==='p-'+t))};
$$('.t').forEach(g=>{g.onclick=()=>enter(g.dataset.r);g.onkeydown=e=>{if(e.key==='Enter')enter(g.dataset.r)}});
function enter(r){startMusic();setRace(r);view('realm')}
$('#enter').onclick=()=>{startMusic();$('#map').scrollIntoView({behavior:'smooth'});$$('.t').forEach((g,i)=>setTimeout(()=>{g.style.filter='brightness(1.5) drop-shadow(0 0 8px #fff)';setTimeout(()=>g.style.filter='',700)},i*500))};
$('#back').onclick=()=>{document.body.dataset.r='home';view('home')};
$('#add').onclick=()=>{if(cur==='a')return toast('Choose one realm first');const l=parse($('#ta').value);if(!l.length)return toast('Type a name first');addNames(l,cur);$('#ta').value=''};
$('#imp').onchange=e=>{const f=e.target.files[0];if(!f)return;if(cur==='a'){toast('Choose one realm first');return}f.text().then(t=>{addNames(parse(t),cur)});e.target.value=''};
$('#clr').onclick=()=>{const rs=cur==='a'?'ehdm':cur;if(confirm('Clear all names in '+T[cur]+'?')){[...rs].forEach(r=>S.n[r]=[]);save();render()}};
$('#nl').onclick=e=>{const d=e.target.dataset;if(d.del){const[r,n]=d.del.split('|');S.n[r]=S.n[r].filter(x=>x!==n);save();render()}
 if(d.ed){const[r,n]=d.ed.split('|');const v=(prompt('Edit name',n)||'').trim();if(!v||v===n)return;if(S.n[r].some(x=>x!==n&&x.toLowerCase()===v.toLowerCase()))return toast('That name already exists');S.n[r][S.n[r].indexOf(n)]=v;save();render()}};
$('#ch').onclick=()=>{if(confirm('Clear the whole history?')){S.H=[];save();render()}};
const GN=['Fellowship of the Silver Star','Company of the Ember Crown','Order of the Hollow Hill','Band of the Raven Banner','Circle of the Last Light','Wardens of the Green Gate','Riders of the Dawn Road','Keepers of the Deep Forge','Wanderers of the Mist','Guard of the White Tower','Sons and Daughters of the Oak','Brotherhood of the Golden Ring'];
$('#gg').onclick=()=>{const p=shuf(pool());if(!p.length)return toast('No names to gather');const n=Math.max(1,Math.min(+$('#gn').value||1,p.length)),g=Array.from({length:n},()=>[]);p.forEach((x,i)=>g[i%n].push(x));const nm=shuf(GN);
 $('#gl').innerHTML=g.map((m,i)=>`<div class="card"><h3>${nm[i%12]}${i>=12?' '+(Math.floor(i/12)+1):''}</h3><ul>${m.map(x=>`<li><span>${esc(x.n)}</span><small>${R[x.r]}</small></li>`).join('')}</ul><small class="dim">${m.length} member${m.length==1?'':'s'}</small></div>`).join('')};
/* Sound */
let ac;const au=$('#au');
function startMusic(){if(!S.mu)return;au.volume=.5;au.play().catch(()=>{})}
function setMu(){$('#mus').textContent='♪ Music: '+(S.mu?'On':'Off');save()}
$('#mus').onclick=()=>{S.mu=S.mu?0:1;setMu();S.mu?startMusic():au.pause()};setMu();
addEventListener('pointerdown',function f(){startMusic();removeEventListener('pointerdown',f)});
function sfx(){try{ac=ac||new(window.AudioContext||window.webkitAudioContext)();const t=ac.currentTime,g=ac.createGain();g.connect(ac.destination);g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(.3,t+3);g.gain.linearRampToValueAtTime(.35,t+5);g.gain.exponentialRampToValueAtTime(.001,t+9);
 [110,165,220,277,330].forEach((f,i)=>{const o=ac.createOscillator();o.type=i%2?'triangle':'sine';o.frequency.setValueAtTime(f,t);o.frequency.exponentialRampToValueAtTime(f*2,t+5);o.connect(g);o.start(t);o.stop(t+9)});
 [1318,1568,1976,2637].forEach((f,i)=>{const o=ac.createOscillator(),h=ac.createGain();o.frequency.value=f;o.connect(h);h.connect(ac.destination);const s=t+4.6+i*.18;h.gain.setValueAtTime(0,s);h.gain.linearRampToValueAtTime(.15,s+.02);h.gain.exponentialRampToValueAtTime(.001,s+3);o.start(s);o.stop(s+3.1)})}catch(e){}}
/* Ring reveal */
const ov=$('#ov');
function play(picks,commit){tm.forEach(clearTimeout);tm=[];ov.className='';$('#res').innerHTML='';ov.classList.add('on');sfx();
 const at=(ms,f)=>tm.push(setTimeout(f,ms));at(2000,()=>{ov.classList.add('ring');burst(60,1)});at(4000,()=>{ov.classList.add('fire');burst(160,1)});
 at(5200,()=>{ov.classList.add('show');$('#res').innerHTML=picks.map(p=>`<div class="n">${esc(p.n)}<small>${R[p.r]}</small></div>`).join('');burst(250,1);
  $('#sel').innerHTML=picks.map(p=>`<div class="nm">${esc(p.n)}</div><p class="dim">${R[p.r]}</p>`).join('');if(commit)commit();$('#rep').disabled=false});
 at(7500,()=>ov.classList.add('done'))}
$('#cl').onclick=()=>{ov.className='';render()};
$('#go').onclick=()=>{const p=pool();if(!p.length)return toast('This realm has no names yet');const k=Math.max(1,Math.min(+$('#cnt').value||1,p.length));
 const picks=shuf(p).slice(0,k);last=picks;startMusic();
 play(picks,()=>{const d=new Date().toLocaleString();picks.slice().reverse().forEach(x=>S.H.unshift({n:x.n,r:x.r,d}));S.H=S.H.slice(0,300);
  if($('#rm').checked)picks.forEach(x=>S.n[x.r]=S.n[x.r].filter(n=>n!==x.n));save()})};
$('#rep').onclick=()=>last&&play(last,null);
/* Particles */
const cv=$('#fx'),cx=cv.getContext('2d');let P=[],W,H;
function rs(){W=cv.width=innerWidth;H=cv.height=innerHeight}rs();addEventListener('resize',rs);
function burst(n,f){for(let i=0;i<n;i++){const a=Math.random()*6.28,s=Math.random()*5+1;P.push({x:W/2,y:H/2,vx:Math.cos(a)*s,vy:Math.sin(a)*s-f,l:90+Math.random()*60,g:1,c:'255,'+(150+Math.random()*100|0)+',40'})}}
function loop(){cx.clearRect(0,0,W,H);if(P.length<70&&Math.random()<.4){P.push({x:Math.random()*W,y:H+5,vx:(Math.random()-.5)*.6,vy:-Math.random()*.9-.2,l:300,c:getComputedStyle(document.body).getPropertyValue('--p')||'245,197,66'})}
 P=P.filter(p=>p.l>0);P.forEach(p=>{p.x+=p.vx;p.y+=p.vy;p.l--;cx.fillStyle=`rgba(${p.c},${Math.min(1,p.l/60)*.8})`;cx.shadowBlur=8;cx.shadowColor=`rgb(${p.c})`;cx.beginPath();cx.arc(p.x,p.y,p.g?2.5:1.8,0,6.28);cx.fill()});requestAnimationFrame(loop)}loop();
/* PWA */
let dp;addEventListener('beforeinstallprompt',e=>{e.preventDefault();dp=e;$('#inst').hidden=false});
$('#inst').onclick=()=>{if(dp){dp.prompt();dp=null;$('#inst').hidden=true}};
if('serviceWorker'in navigator)addEventListener('load',()=>navigator.serviceWorker.register('sw.js').catch(()=>{}));
setRace('e');document.body.dataset.r='home';
