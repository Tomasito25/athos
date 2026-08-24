/**
 * Capturas reales de la aplicación para el manifest.
 *
 * Chrome usa estas imágenes en la ficha de instalación. Tienen que ser
 * capturas de verdad, no montajes: el script arranca un navegador sin ventana,
 * abre ATHOS y fotografía la pantalla.
 *
 * Requiere el servidor en marcha y un navegador con depuración remota:
 *
 *   ./run.sh --no-browser &
 *   brave --headless=new --remote-debugging-port=9333 --user-data-dir=/tmp/athos-cdp about:blank &
 *   node scripts/screenshots.mjs
 */
import { writeFileSync, mkdirSync } from 'node:fs';
const list = await (await fetch('http://127.0.0.1:9333/json/list')).json();
const t = list.find(x => x.type === 'page');
const ws = new WebSocket(t.webSocketDebuggerUrl);
let id=0; const p=new Map();
ws.addEventListener('message', e=>{const m=JSON.parse(e.data); if(m.id&&p.has(m.id)){p.get(m.id)(m);p.delete(m.id);}});
await new Promise(r=>ws.addEventListener('open',r));
const send=(m,q={})=>new Promise(res=>{const n=++id;p.set(n,res);ws.send(JSON.stringify({id:n,method:m,params:q}));});
const ev=async e=>{const r=await send('Runtime.evaluate',{expression:e,awaitPromise:true,returnByValue:true});return r.result?.result?.value;};
await send('Runtime.enable');
mkdirSync('public/icons', { recursive: true });

// Estado limpio y datos ya sembrados
await send('Emulation.setDeviceMetricsOverride',{width:540,height:1170,deviceScaleFactor:1,mobile:true});
await send('Page.navigate',{url:'http://127.0.0.1:8788/'});
await new Promise(r=>setTimeout(r,3000));
await ev(`(async()=>{for(const r of await navigator.serviceWorker.getRegistrations())await r.unregister();for(const k of await caches.keys())await caches.delete(k);
 localStorage.clear(); await new Promise(res=>{const q=indexedDB.deleteDatabase('athos');q.onsuccess=res;q.onerror=res;q.onblocked=res;});return 1})()`);

const capturas = [
  { archivo: 'screenshot-mobile.png',  w: 540,  h: 1170, movil: true,  ruta: '/',                 tema: 'dark'  },
  { archivo: 'screenshot-mobile-2.png',w: 540,  h: 1170, movil: true,  ruta: '/orar/oficio/manana', tema: 'dark' },
  { archivo: 'screenshot-desktop.png', w: 1280, h: 800,  movil: false, ruta: '/',                 tema: 'light' },
  { archivo: 'screenshot-desktop-2.png', w: 1280, h: 800, movil: false, ruta: '/calendario',      tema: 'light' },
];

for (const c of capturas) {
  await send('Emulation.setDeviceMetricsOverride',{width:c.w,height:c.h,deviceScaleFactor:1,mobile:c.movil});
  if (c.movil) await send('Emulation.setTouchEmulationEnabled',{enabled:true,maxTouchPoints:5});
  await send('Page.navigate',{url:'http://127.0.0.1:8788'+c.ruta});
  await new Promise(r=>setTimeout(r,7000));
  // Fuera los avisos efímeros: no deben salir en la ficha de la tienda.
  await ev(`document.documentElement.dataset.theme = '${c.tema}';
    document.querySelectorAll('.toast-region').forEach(t => t.remove()); 1`);
  await new Promise(r=>setTimeout(r,900));
  await ev(`document.querySelectorAll('.toast-region').forEach(t => t.remove()); 1`);
  const shot = await send('Page.captureScreenshot',{format:'png', captureBeyondViewport:false});
  writeFileSync('public/icons/'+c.archivo, Buffer.from(shot.result.data,'base64'));
  console.log(c.archivo, c.w+'x'+c.h, Math.round(Buffer.from(shot.result.data,'base64').length/1024)+' kB');
}
ws.close();
