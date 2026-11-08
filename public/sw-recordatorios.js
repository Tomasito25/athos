/**
 * Recordatorios de ATHOS con la aplicación cerrada.
 *
 * Este archivo lo carga el Service Worker que genera Workbox (`importScripts`).
 * No calcula nada: la aplicación deja en IndexedDB la cola de los avisos de
 * los próximos días, ya redactados, y aquí sólo se enseñan los que hayan
 * vencido cuando el navegador despierta al Service Worker con la
 * sincronización periódica. Eso sólo lo hacen Chrome y Edge, con ATHOS
 * instalada, y cuando el sistema lo decide: por eso puede haber retraso, y
 * la aplicación lo dice en sus ajustes.
 *
 * También recibe el toque en cualquier aviso y abre la pantalla que trae.
 */
const BD = 'athos';
const COLA = 'reminders.queue';
const VISTOS = 'reminders.shown';
/** Más allá de esto, un aviso atrasado ya no tiene sentido. */
const CADUCA = 6 * 60 * 60 * 1000;

function abrir() {
  return new Promise((resolve, reject) => {
    const peticion = indexedDB.open(BD);
    peticion.onsuccess = () => resolve(peticion.result);
    peticion.onerror = () => reject(peticion.error);
    // Si la base no existía, no hay nada que avisar: se cancela la creación.
    peticion.onupgradeneeded = () => peticion.transaction.abort();
  });
}

async function leer(base, clave) {
  if (!base.objectStoreNames.contains('settings')) return undefined;
  return new Promise((resolve) => {
    const peticion = base.transaction('settings', 'readonly').objectStore('settings').get(clave);
    peticion.onsuccess = () => resolve(peticion.result ? peticion.result.value : undefined);
    peticion.onerror = () => resolve(undefined);
  });
}

async function escribir(base, clave, valor) {
  return new Promise((resolve) => {
    const tx = base.transaction('settings', 'readwrite');
    tx.objectStore('settings').put({ key: clave, value: valor, updatedAt: new Date().toISOString() });
    tx.oncomplete = () => resolve();
    tx.onerror = () => resolve();
  });
}

async function avisarPendientes() {
  let base;
  try {
    base = await abrir();
  } catch {
    return;
  }
  const cola = (await leer(base, COLA)) || [];
  const vistos = (await leer(base, VISTOS)) || {};
  const ahora = Date.now();
  let cambios = false;

  for (const aviso of cola) {
    const cuando = Date.parse(aviso.at);
    if (aviso.needsApp || cuando > ahora || ahora - cuando > CADUCA) continue;
    const clave = `${aviso.id}|${aviso.date}`;
    if (vistos[clave]) continue;
    await self.registration.showNotification(aviso.title, {
      body: aviso.body,
      tag: aviso.id,
      lang: 'es',
      icon: new URL('icons/icon-192.png', self.registration.scope).href,
      badge: new URL('icons/icon-192.png', self.registration.scope).href,
      data: { url: aviso.url },
    });
    vistos[clave] = new Date().toISOString();
    cambios = true;
  }

  if (cambios) await escribir(base, VISTOS, vistos);
  base.close();
}

self.addEventListener('periodicsync', (evento) => {
  if (evento.tag === 'athos-recordatorios') evento.waitUntil(avisarPendientes());
});

self.addEventListener('notificationclick', (evento) => {
  evento.notification.close();
  const destino = new URL((evento.notification.data && evento.notification.data.url) || '', self.registration.scope).href;
  evento.waitUntil(
    (async () => {
      const ventanas = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
      for (const ventana of ventanas) {
        if ('focus' in ventana) {
          await ventana.focus();
          if ('navigate' in ventana && ventana.url !== destino) {
            try {
              await ventana.navigate(destino);
            } catch {
              /* Una ventana que no controla este Service Worker no se deja llevar. */
            }
          }
          return;
        }
      }
      await self.clients.openWindow(destino);
    })(),
  );
});
