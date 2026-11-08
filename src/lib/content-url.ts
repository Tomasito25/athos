/**
 * Direcciones del corpus estático, con la huella de su carpeta.
 *
 * `public/content/` se sirve con los nombres de siempre y el Service Worker lo
 * guarda un año. Sin huella, un libro corregido no llegaba nunca a quien ya lo
 * había leído: la caché seguía devolviendo el viejo. Con `?v=<huella>`, la
 * dirección cambia en cuanto cambia cualquier archivo de la carpeta.
 *
 * Véase `scripts/content-versions.ts`.
 */

/** La huella de cada carpeta; en las pruebas puede no existir. */
export function contentVersions(): Record<string, string> {
  return typeof __CONTENT_VERSIONS__ === 'object' && __CONTENT_VERSIONS__ ? __CONTENT_VERSIONS__ : {};
}

/** La carpeta con huella a la que pertenece una ruta: `bible/blm/TOB.json` → `bible/blm`. */
export function contentGroup(path: string): string | undefined {
  const versiones = contentVersions();
  return Object.keys(versiones)
    .sort((a, b) => b.length - a.length)
    .find((grupo) => path.startsWith(`${grupo}/`));
}

/** `content/<ruta>` relativo a la base, con la huella de su carpeta si la tiene. */
export function contentUrl(path: string): string {
  const limpia = path.replace(/^\/?(content\/)?/, '');
  const grupo = contentGroup(limpia);
  const huella = grupo ? contentVersions()[grupo] : undefined;
  return `${import.meta.env.BASE_URL}content/${limpia}${huella ? `?v=${huella}` : ''}`;
}
