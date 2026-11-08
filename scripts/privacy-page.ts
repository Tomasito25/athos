/**
 * La página estática de privacidad, `privacidad.html`.
 *
 * Se genera al compilar desde el mismo texto que enseña la aplicación
 * (`src/content/privacidad.ts`), para que las dos no puedan decir cosas
 * distintas. Tiene dirección fija y se lee sin JavaScript: es la que se da a
 * una tienda de aplicaciones o a quien pregunte.
 */
import {
  PRIVACY_INTRO,
  PRIVACY_SECTIONS,
  PRIVACY_UPDATED,
} from '../src/content/privacidad.ts';
import { REPO_URL } from '../src/lib/site.ts';

const escapar = (texto: string) =>
  texto.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Escapa y convierte en enlace las direcciones que aparezcan en el texto. */
const conEnlaces = (texto: string) =>
  escapar(texto).replace(/https:\/\/[^\s)]+/g, (url) => `<a href="${url}">${url}</a>`);

export function privacyPageHtml({ base, contacto }: { base: string; contacto: string }): string {
  const repo = REPO_URL;
  const secciones = PRIVACY_SECTIONS.map(
    (s) =>
      `<h2>${escapar(s.title)}</h2>\n${s.paragraphs.map((p) => `<p>${conEnlaces(p)}</p>`).join('\n')}`,
  ).join('\n\n');
  const escribir = contacto
    ? `<p>Para cualquier pregunta sobre privacidad: <a href="mailto:${escapar(contacto)}">${escapar(contacto)}</a>.</p>`
    : '';
  return `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Privacidad — ATHOS</title>
<meta name="description" content="Política de privacidad de ATHOS: qué se guarda, dónde y qué peticiones hace a internet.">
<link rel="icon" href="${base}favicon.ico" sizes="32x32">
<style>
  :root { color-scheme: light dark; --fondo: #f4ede0; --texto: #2a2018; --suave: #6b5d4f; --oro: #8a6a2a; }
  @media (prefers-color-scheme: dark) { :root { --fondo: #14100c; --texto: #ece3d3; --suave: #b3a690; --oro: #d1ae63; } }
  body { margin: 0; background: var(--fondo); color: var(--texto); font: 1.0625rem/1.65 Georgia, 'EB Garamond', serif; }
  main { max-width: 38rem; margin: 0 auto; padding: 2.5rem 1rem 4rem; }
  h1 { font-weight: 500; letter-spacing: .04em; margin: 0 0 .25rem; }
  h2 { font-size: 1.15rem; font-weight: 600; margin: 2rem 0 .5rem; color: var(--oro); }
  p { margin: .6rem 0; }
  a { color: var(--oro); word-break: break-word; }
  .meta { color: var(--suave); font-size: .9rem; }
</style>
</head>
<body>
<main>
<h1>Privacidad</h1>
<p class="meta">ATHOS · Actualizada el ${PRIVACY_UPDATED}</p>
<p>${conEnlaces(PRIVACY_INTRO)}</p>

${secciones}

<h2>Contacto</h2>
${escribir}
<p>Para avisar de un error o preguntar algo en público: <a href="${repo}/issues">${repo}/issues</a>.</p>
<p>El código es libre (AGPL-3.0-or-later) y se puede leer entero: <a href="${repo}">${repo}</a>.</p>

<p class="meta"><a href="${base}">Abrir ATHOS</a></p>
</main>
</body>
</html>
`;
}
