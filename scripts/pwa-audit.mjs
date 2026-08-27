/**
 * Auditoría PWA.
 *
 * Comprueba, contra la aplicación servida de verdad y con el navegador de
 * verdad, los criterios que Chrome usa para decidir si ofrece instalarla:
 * contexto seguro, manifest sin errores de interpretación, iconos que existen
 * y se descargan, Service Worker activo con su precaché, navegación completa
 * sin red, y la ficha de instalación con sus capturas y accesos directos.
 *
 * Las pruebas de `tests/pwa.test.ts` miran los archivos que deja la
 * compilación; esto mira lo que el navegador hace con ellos, que no es lo
 * mismo. Requiere el servidor y un navegador con depuración remota:
 *
 *   ./run.sh --no-browser &
 *   brave --headless=new --remote-debugging-port=9333 --user-data-dir=/tmp/athos-cdp about:blank &
 *   node scripts/pwa-audit.mjs                          # en la raíz
 *   node scripts/pwa-audit.mjs http://127.0.0.1:8801/athos   # en subcarpeta
 */
const BASE = process.argv[2] || 'http://127.0.0.1:8788';
const list = await (await fetch('http://127.0.0.1:9333/json/list')).json();
const t = list.find(x => x.type === 'page');
const ws = new WebSocket(t.webSocketDebuggerUrl);
let id=0; const p=new Map(); const eventos=[];
ws.addEventListener('message', e=>{const m=JSON.parse(e.data);
  if(m.id&&p.has(m.id)){p.get(m.id)(m);p.delete(m.id);} else if(m.method) eventos.push(m);});
await new Promise(r=>ws.addEventListener('open',r));
const send=(m,q={})=>new Promise(res=>{const n=++id;p.set(n,res);ws.send(JSON.stringify({id:n,method:m,params:q}));});
const ev=async e=>{const r=await send('Runtime.evaluate',{expression:e,awaitPromise:true,returnByValue:true});
  if(r.result?.exceptionDetails) throw new Error(JSON.stringify(r.result.exceptionDetails).slice(0,250));
  return r.result?.result?.value;};
await send('Runtime.enable'); await send('Page.enable'); await send('Network.enable');
await send('Emulation.setDeviceMetricsOverride',{width:412,height:915,deviceScaleFactor:2,mobile:true});

let fallos=0; const ok=(n,c,x='')=>{console.log((c?'  ✓ ':'  ✗ ')+n+(c?'':'   ← '+x));if(!c)fallos++;};

// Estado limpio: un visitante que nunca ha estado aquí.
await send('Page.navigate',{url:BASE+'/'});
await new Promise(r=>setTimeout(r,2500));
await ev(`(async()=>{for(const r of await navigator.serviceWorker.getRegistrations())await r.unregister();
 for(const k of await caches.keys())await caches.delete(k);localStorage.clear();
 await new Promise(res=>{const q=indexedDB.deleteDatabase('athos');q.onsuccess=res;q.onerror=res;q.onblocked=res;});return 1})()`);
await send('Page.navigate',{url:BASE+'/'});
await new Promise(r=>setTimeout(r,9000));

console.log('\n═══ 1. Contexto seguro ═══');
const seg = await ev(`({seguro:window.isSecureContext, protocolo:location.protocol, host:location.hostname})`);
ok('contexto seguro (obligatorio para instalar)', seg.seguro===true, JSON.stringify(seg));

console.log('\n═══ 2. Manifest, leído por el propio navegador ═══');
const man = await send('Page.getAppManifest');
const errores = man.result?.errors ?? [];
ok('el navegador lo encuentra y lo interpreta', Boolean(man.result?.url), JSON.stringify(man.result).slice(0,120));
ok('sin errores de interpretación', errores.length===0, JSON.stringify(errores).slice(0,300));
// Dos etiquetas `rel="manifest"` no rompen el navegador —usa la primera— pero
// los validadores lo señalan y no hay motivo para tener dos.
const enlaces = await ev(`[...document.querySelectorAll('link[rel="manifest"]')].map(l=>l.getAttribute('href'))`);
ok('un único enlace al manifest', enlaces.length===1, `${enlaces.length}: ${JSON.stringify(enlaces)}`);
// Muchos rastreadores piden /manifest.json por convención.
const alterno = await ev(`(async()=>{try{const r=await fetch(new URL('manifest.json', location.href));return r.ok;}catch(e){return false;}})()`);
ok('también responde /manifest.json, que es lo que piden los validadores', alterno===true, '404');
const m = JSON.parse(man.result?.data || '{}');
for (const [campo, cond, nota] of [
  ['name', !!m.name, m.name],
  ['short_name', !!m.short_name, m.short_name],
  ['start_url', !!m.start_url, m.start_url],
  ['scope', !!m.scope, m.scope],
  ['id', !!m.id, m.id],
  ['display', ['standalone','fullscreen','minimal-ui'].includes(m.display), m.display],
  ['theme_color', !!m.theme_color, m.theme_color],
  ['background_color', !!m.background_color, m.background_color],
]) ok(`${campo}: ${nota}`, cond, 'ausente o inválido');

console.log('\n═══ 3. Iconos ═══');
const iconos = m.icons || [];
const tam = iconos.map(i=>i.sizes);
ok('icono de 192×192', tam.some(s=>String(s).includes('192')), JSON.stringify(tam));
ok('icono de 512×512', tam.some(s=>String(s).includes('512')), JSON.stringify(tam));
ok('al menos uno maskable (Android lo recorta)', iconos.some(i=>String(i.purpose||'').includes('maskable')), '');
const rotos = await ev(`(async()=>{const srcs=${JSON.stringify(iconos.map(i=>i.src))};
  const malos=[]; for(const s of srcs){ try{const r=await fetch(new URL(s, location.href)); if(!r.ok) malos.push(s+' → '+r.status);}catch(e){malos.push(s+' → '+e.message);} }
  return malos;})()`);
ok('todos los iconos se descargan', rotos.length===0, JSON.stringify(rotos));

console.log('\n═══ 4. Service Worker ═══');
// Sin esto Android no llega a ofrecer la instalación: se espera hasta que se
// active y tome el control, en vez de mirar una sola vez y darlo por perdido.
for (let i=0;i<20;i++) {
  const listo = await ev(`(async()=>{const rs=await navigator.serviceWorker.getRegistrations();
    return !!rs[0]?.active && !!navigator.serviceWorker.controller;})()`);
  if (listo) break;
  await new Promise(r=>setTimeout(r,1500));
}
const sw = await ev(`(async()=>{const rs=await navigator.serviceWorker.getRegistrations();
  return rs.map(r=>({ambito:r.scope, activo:!!r.active, estado:r.active?.state}));})()`);
ok('registrado', sw.length>0, JSON.stringify(sw));
ok('activo', sw[0]?.activo===true, JSON.stringify(sw));
ok('el ámbito cubre la aplicación', sw[0]?.ambito?.endsWith(new URL(BASE+'/').pathname), sw[0]?.ambito);
ok('controla la página (sin esto no se ofrece instalar)', await ev(`!!navigator.serviceWorker.controller`), 'no la controla');
// Sin manejador de fetch, Chrome no considera la aplicación instalable.
const precache = await ev(`(async()=>{const ks=await caches.keys(); let n=0;
  for(const k of ks){ n += (await (await caches.open(k)).keys()).length; }
  return {cachés:ks.length, entradas:n};})()`);
ok('precaché poblado', precache.entradas>100, JSON.stringify(precache));

console.log('\n═══ 5. Funciona sin conexión ═══');
await send('Network.emulateNetworkConditions',{offline:true,latency:0,downloadThroughput:0,uploadThroughput:0});
for (const ruta of ['/', '/orar/oraciones', '/leer/salterio/50', '/calendario']) {
  await send('Page.navigate',{url:BASE+ruta});
  await new Promise(r=>setTimeout(r,3200));
  const txt = await ev(`(document.querySelector('main')?.innerText||'')`);
  ok(`sin red: ${ruta}`, txt.length>150, `${txt.length} caracteres`);
}
await send('Network.emulateNetworkConditions',{offline:false,latency:0,downloadThroughput:-1,uploadThroughput:-1});

console.log('\n═══ 6. Presentación instalada ═══');
ok('capturas para la ficha de instalación', (m.screenshots||[]).length>0, String((m.screenshots||[]).length));
const anchas = (m.screenshots||[]).filter(s=>s.form_factor==='wide').length;
ok('capturas de escritorio (form_factor wide)', anchas>0, `${anchas} anchas`);
ok('accesos directos', (m.shortcuts||[]).length>0, String((m.shortcuts||[]).length));

console.log('\n' + (fallos===0 ? '✓ cumple todos los criterios' : `✗ ${fallos} incumplimientos`));
ws.close(); process.exit(fallos===0?0:1);
