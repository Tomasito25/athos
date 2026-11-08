/**
 * Mantener la pantalla encendida durante la oración.
 *
 * La API Screen Wake Lock no existe en todos los navegadores. Cuando falta, se
 * informa al usuario en lugar de fingir que funciona.
 *
 * Varias partes pueden pedirlo a la vez —el oficio entero y el contador de
 * la oración de Jesús que va dentro—, así que cada una lo pide con su propio
 * dueño, y la pantalla sólo se suelta cuando ya no lo quiere nadie. Antes
 * había un único bloqueo: el contador, al pararse, lo soltaba también para
 * el oficio.
 */
export const wakeLockSupported = () =>
  typeof navigator !== 'undefined' && 'wakeLock' in navigator;

let sentinel: WakeLockSentinel | null = null;
const duenos = new Set<symbol>();
const GENERAL = Symbol('general');

export async function requestWakeLock(dueno: symbol = GENERAL): Promise<boolean> {
  if (!wakeLockSupported()) return false;
  duenos.add(dueno);
  if (sentinel && !sentinel.released) return true;
  try {
    sentinel = await navigator.wakeLock.request('screen');
    // Si el usuario cambia de pestaña, el bloqueo se pierde: hay que rehacerlo.
    document.addEventListener('visibilitychange', reacquire);
    return true;
  } catch {
    return false;
  }
}

async function reacquire() {
  if (document.visibilityState === 'visible' && duenos.size && sentinel?.released !== false) {
    try {
      sentinel = await navigator.wakeLock.request('screen');
    } catch {
      /* El navegador puede rechazarlo; no es un error que deba interrumpir la oración. */
    }
  }
}

export async function releaseWakeLock(dueno: symbol = GENERAL): Promise<void> {
  duenos.delete(dueno);
  if (duenos.size) return;
  document.removeEventListener('visibilitychange', reacquire);
  try {
    await sentinel?.release();
  } catch {
    /* Ya estaba liberado. */
  }
  sentinel = null;
}
