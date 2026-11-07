const C='realms-v1',F=['./','index.html','style.css','script.js','manifest.json','background.wav'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>Promise.all(F.map(f=>c.add(f).catch(()=>0)))))});
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>clients.claim())));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(r=>r||fetch(e.request).then(n=>{const c=n.clone();caches.open(C).then(x=>x.put(e.request,c));return n}).catch(()=>caches.match('index.html'))))});
