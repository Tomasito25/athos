/**
 * Pantalla completa durante la oración.
 *
 * En un móvil, el modo oración ya esconde las barras de ATHOS, pero quedaban
 * las del navegador: la de direcciones arriba y la de gestos abajo, con el
 * reloj y las notificaciones asomando. Lo que se busca al entrar en este modo
 * es precisamente que no quede nada que mirar más que el texto.
 *
 * No en todas partes se puede. Safari en iPhone no deja poner en pantalla
 * completa un elemento que no sea un vídeo, así que allí esto no hace nada y
 * el modo oración funciona igual que antes. Se prefiere eso a fingir que
 * funciona: la aplicación no promete lo que el navegador no da.
 */

/** ¿Puede este navegador poner la página en pantalla completa? */
export function fullscreenSupported(): boolean {
  if (typeof document === 'undefined') return false;
  const raiz = document.documentElement as HTMLElement & {
    webkitRequestFullscreen?: unknown;
  };
  return (
    typeof raiz.requestFullscreen === 'function' ||
    typeof raiz.webkitRequestFullscreen === 'function'
  );
}

/** ¿Está la página en pantalla completa ahora mismo? */
export function isFullscreen(): boolean {
  if (typeof document === 'undefined') return false;
  const doc = document as Document & { webkitFullscreenElement?: Element | null };
  return Boolean(document.fullscreenElement ?? doc.webkitFullscreenElement);
}

/**
 * Sólo se pide donde la pantalla completa gana algo.
 *
 * En un ordenador las barras del navegador no estorban igual, y quitarlas de
 * golpe asusta más que ayuda; además `Escape` ya sale del modo oración y
 * tenerlo haciendo dos cosas a la vez se presta a líos.
 */
export function shouldGoFullscreen(): boolean {
  if (typeof window === 'undefined' || !window.matchMedia) return false;
  return window.matchMedia('(pointer: coarse)').matches;
}

/**
 * Entra en pantalla completa. Devuelve si lo consiguió.
 *
 * Hay que llamarlo desde un gesto del usuario —un toque, una tecla—: los
 * navegadores rechazan la petición si no viene de uno, y con razón.
 */
export async function enterFullscreen(): Promise<boolean> {
  if (!fullscreenSupported() || isFullscreen()) return isFullscreen();
  const raiz = document.documentElement as HTMLElement & {
    webkitRequestFullscreen?: () => Promise<void> | void;
  };
  try {
    await (raiz.requestFullscreen?.({ navigationUI: 'hide' }) ?? raiz.webkitRequestFullscreen?.());
    return true;
  } catch {
    // El navegador puede negarse —sin gesto, o por política del dispositivo—.
    // No es un error que deba interrumpir nada.
    return false;
  }
}

/** Sale de pantalla completa, si estaba. */
export async function exitFullscreen(): Promise<void> {
  if (!isFullscreen()) return;
  const doc = document as Document & { webkitExitFullscreen?: () => Promise<void> | void };
  try {
    await (document.exitFullscreen?.() ?? doc.webkitExitFullscreen?.());
  } catch {
    /* Ya había salido, o el navegador lo hizo por su cuenta. */
  }
}
