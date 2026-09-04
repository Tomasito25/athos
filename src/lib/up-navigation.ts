/**
 * A dónde lleva la flecha de volver.
 *
 * `navigate(-1)` es lo natural mientras haya historia propia: conserva el
 * desplazamiento y deshace exactamente el paso que dio el usuario. Pero ATHOS
 * se abre muchas veces directamente en una pantalla interior —un atajo del
 * manifiesto, una notificación, un enlace compartido, la pantalla de inicio
 * del móvil—, y entonces no hay nada detrás: la flecha sacaba de la
 * aplicación, que es lo último que se espera de una flecha dentro de ella.
 *
 * Cuando no hay historia se sube a la ruta padre. Casi siempre basta con
 * quitar el último segmento; unos pocos no son pantallas, sino tramos de
 * camino hacia una, y hay que saltárselos.
 */

/**
 * Segmentos que no son pantalla: `/orar/oraciones/categoria/matutinas` no
 * tiene una página en `/orar/oraciones/categoria`.
 *
 * La prueba `up-navigation.test.ts` recorre la tabla de rutas de verdad y
 * falla si alguna ruta nueva estrena un tramo que no esté aquí, así que esta
 * lista no puede quedarse atrás en silencio.
 */
export const SEGMENTOS_PUENTE = new Set([
  'categoria',
  'dia',
  'editar',
  'kathisma',
  'monasterio',
  'obra',
  'oficio',
]);

/** La pantalla de la que cuelga `pathname`. Nunca sale de la aplicación. */
export function parentPath(pathname: string): string {
  const segmentos = pathname.split('/').filter(Boolean);

  // Se quita el último segmento y, si lo que queda termina en un tramo de
  // paso, se sigue quitando hasta dar con una pantalla real.
  let corte = segmentos.length - 1;
  while (corte > 0 && SEGMENTOS_PUENTE.has(segmentos[corte - 1]!)) corte -= 1;

  const padre = segmentos.slice(0, corte);
  return padre.length ? `/${padre.join('/')}` : '/';
}

/**
 * ¿Hay algo detrás dentro de la aplicación?
 *
 * React Router numera sus entradas en `history.state.idx`. En la primera
 * carga vale 0: se ha entrado directamente y no hay adónde volver.
 */
export function hasAppHistory(): boolean {
  const estado = window.history.state as { idx?: unknown } | null;
  return typeof estado?.idx === 'number' && estado.idx > 0;
}
