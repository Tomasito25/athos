/**
 * Recargar cuando falta un trozo de la aplicación.
 *
 * Cada pantalla se descarga aparte, con una huella en el nombre del archivo.
 * Si otra ventana aplica una versión nueva, el Service Worker nuevo borra los
 * archivos de la vieja, y la ventana que seguía abierta pide un trozo que ya
 * no existe: salía «Algo ha salido mal» y había que saber que recargar lo
 * arreglaba. Ahora se recarga sola, una vez.
 */

const CLAVE = 'athos.chunk-reload';
/** Si ya se recargó por esto hace menos de esto, no se insiste: sería un bucle. */
const ESPERA = 20_000;

/** ¿El error es que no se ha podido descargar un trozo de código o de estilo? */
export function isChunkLoadError(error: unknown): boolean {
  const texto =
    error instanceof Error
      ? `${error.name} ${error.message}`
      : typeof error === 'string'
        ? error
        : '';
  return /dynamically imported module|Importing a module script failed|Unable to preload CSS|ChunkLoadError|Loading (?:CSS )?chunk \S+ failed|module script.*MIME type/i.test(
    texto,
  );
}

/** ¿Se puede recargar, o ya se hizo por lo mismo hace un momento? Sólo lee. */
export function canReload(): boolean {
  try {
    return Date.now() - Number(sessionStorage.getItem(CLAVE) ?? 0) >= ESPERA;
  } catch {
    // Sin sessionStorage no hay forma de evitar el bucle: mejor no recargar.
    return false;
  }
}

/** Apunta la hora y recarga. */
export function reloadNow(): void {
  try {
    sessionStorage.setItem(CLAVE, String(Date.now()));
  } catch {
    return;
  }
  window.location.reload();
}

/**
 * Recarga la página, salvo que ya se haya hecho por lo mismo hace un momento.
 * Devuelve si ha recargado.
 */
export function reloadOnce(): boolean {
  if (!canReload()) return false;
  reloadNow();
  return true;
}
