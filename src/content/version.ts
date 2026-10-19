/**
 * Versión del corpus. Al incrementarla, ATHOS vuelve a sembrar las tablas de
 * contenido en la próxima apertura, sin tocar los datos del usuario.
 *
 * Vive aparte del índice del corpus para que comprobarla no obligue a cargar
 * el corpus entero: en un arranque normal no hay que sembrar nada, y antes se
 * descargaban y analizaban dos megas de texto sólo para saberlo.
 */
export const CONTENT_VERSION = 25;
