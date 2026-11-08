/**
 * El corpus que no va en el precaché, descargado en segundo plano.
 *
 * Para que ATHOS se pueda instalar deprisa, el precaché lleva sólo lo que
 * hace falta para arrancar y rezar. El resto del corpus —cada sección en su
 * trozo— se descarga aquí, después de arrancar, uno detrás de otro y sin
 * ejecutarlo: el Service Worker lo guarda al pasar, y a partir de ahí se lee
 * igual sin conexión. Si ya estaba guardado, cada petición se contesta de la
 * caché sin tocar la red.
 *
 * La lista la escribe la compilación en `corpus.json` (véase `vite.config.ts`).
 */

let enCurso: Promise<number> | null = null;

/** Descarga lo que falte del corpus. Devuelve cuántos trozos tiene guardados. */
export function warmCorpus(): Promise<number> {
  enCurso ??= descargar().finally(() => {
    enCurso = null;
  });
  return enCurso;
}

async function descargar(): Promise<number> {
  if (typeof navigator === 'undefined' || !navigator.serviceWorker?.controller) return 0;
  const base = import.meta.env.BASE_URL;
  let lista: string[];
  try {
    const respuesta = await fetch(`${base}corpus.json`);
    if (!respuesta.ok) return 0;
    lista = (await respuesta.json()) as string[];
  } catch {
    return 0;
  }
  let guardados = 0;
  for (const archivo of lista) {
    try {
      const respuesta = await fetch(`${base}${archivo}`);
      // Se lee entero para que la respuesta llegue completa a la caché.
      if (respuesta.ok) {
        await respuesta.arrayBuffer();
        guardados += 1;
      }
    } catch {
      // Sin conexión: se intentará en el próximo arranque.
    }
  }
  return guardados;
}

/**
 * Lo lanza al arrancar, o en cuanto el Service Worker tome el control: la
 * primera vez que se abre ATHOS todavía no lo tiene, y sin él lo descargado
 * no se guardaría.
 */
export function scheduleCorpusWarmup(): void {
  if (typeof navigator === 'undefined' || !('serviceWorker' in navigator)) return;
  if (navigator.serviceWorker.controller) {
    void warmCorpus();
    return;
  }
  navigator.serviceWorker.addEventListener('controllerchange', () => void warmCorpus(), { once: true });
}
