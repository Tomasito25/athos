/**
 * Corpus de ATHOS.
 *
 * Todo el contenido religioso vive aquí, separado del código de la aplicación,
 * para que las licencias de uno y otro puedan mantenerse distintas.
 */
export * from './bible';
export * from './feasts';
export * from './fathers';
export * from './hymns';
export * from './icons';
export * from './lectionary';
export * from './offices';
export * from './prayers';
export * from './psalter';
export * from './saints';
export * from './athos';
export * from './study';
export * from './catechism';
export * from './catechism-parts';
export * from './history';
export * from './history-all';
export * from './greek';
export * from './hours';
export * from './moments';

/**
 * Versión del corpus. Al incrementarla, ATHOS vuelve a sembrar las tablas de
 * contenido en la próxima apertura, sin tocar los datos del usuario.
 */
export const CONTENT_VERSION = 11;
