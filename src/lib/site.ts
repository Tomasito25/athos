/**
 * Dónde vive ATHOS y cómo escribir a quien la hace.
 *
 * «Acerca de» no enlazaba ni al repositorio, y no había a quién avisar de un
 * error ni dónde leer la política de privacidad.
 */

export const REPO_URL = 'https://github.com/Tomasito25/athos';
export const ISSUES_URL = `${REPO_URL}/issues`;
export const NEW_ISSUE_URL = `${REPO_URL}/issues/new`;

/**
 * Correo de contacto, si se ha configurado al compilar (`ATHOS_CONTACTO`).
 *
 * No se escribe aquí a mano: un correo en el código queda publicado para
 * siempre en el historial del repositorio. En GitHub se pone como variable del
 * repositorio (Settings → Secrets and variables → Actions → Variables). Si no
 * hay, la aplicación remite a las incidencias del repositorio.
 */
export const CONTACT_EMAIL: string = typeof __CONTACT_EMAIL__ === 'string' ? __CONTACT_EMAIL__ : '';

/** La página estática de privacidad, con dirección fija. */
export const privacyPageUrl = () => `${import.meta.env.BASE_URL}privacidad.html`;

/** Enlace para informar de un error, con la versión y la pantalla ya escritas. */
export function reportIssueUrl(pantalla: string): string {
  const version = typeof __APP_VERSION__ === 'string' ? __APP_VERSION__ : 'dev';
  const cuerpo = [
    '**Qué pasa:**',
    '',
    '',
    '**Qué debería pasar:**',
    '',
    '',
    '**Si es un texto o una fecha, la fuente que lo respalda:**',
    '',
    '',
    '---',
    `Versión ${version} · ${pantalla}`,
  ].join('\n');
  return `${NEW_ISSUE_URL}?body=${encodeURIComponent(cuerpo)}`;
}
