/**
 * Mantener la pantalla encendida durante la oración.
 *
 * La API Screen Wake Lock no existe en todos los navegadores. Cuando falta, se
 * informa al usuario en lugar de fingir que funciona.
 */
export const wakeLockSupported = () =>
  typeof navigator !== 'undefined' && 'wakeLock' in navigator;

let sentinel: WakeLockSentinel | null = null;

export async function requestWakeLock(): Promise<boolean> {
  if (!wakeLockSupported()) return false;
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
  if (document.visibilityState === 'visible' && sentinel?.released !== false) {
    try {
      sentinel = await navigator.wakeLock.request('screen');
    } catch {
      /* El navegador puede rechazarlo; no es un error que deba interrumpir la oración. */
    }
  }
}

export async function releaseWakeLock(): Promise<void> {
  document.removeEventListener('visibilitychange', reacquire);
  try {
    await sentinel?.release();
  } catch {
    /* Ya estaba liberado. */
  }
  sentinel = null;
}
