/**
 * La huella de cada carpeta del corpus estático, calculada al compilar.
 *
 * Los libros de la Biblia, el leccionario y las imágenes de los iconos viven
 * en `public/content/` con su nombre de siempre, sin huella en el nombre. El
 * Service Worker los guarda un año y la Biblia, además, se vuelca en
 * IndexedDB: una corrección del texto no llegaba nunca a quien ya lo tenía.
 * Es especialmente delicado con la BLM, que sus autores presentan como
 * borrador en revisión.
 *
 * Con esta huella la aplicación pide `…/JHN.json?v=<huella>`: si el texto
 * cambia, cambia la dirección y la caché vieja deja de servir. Y al arrancar
 * compara la huella guardada con la nueva para tirar lo que tenga en
 * IndexedDB de esa traducción.
 */
import { createHash } from 'node:crypto';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

/** Carpetas de `public/content` que llevan huella propia. */
export const CONTENT_GROUPS = [
  'bible/rv1909',
  'bible/blm',
  'bible/lxx',
  'bible/grc-nt',
  'lectionary',
  'icons',
] as const;

function archivos(dir: string): string[] {
  return readdirSync(dir)
    .sort()
    .flatMap((nombre) => {
      const ruta = join(dir, nombre);
      return statSync(ruta).isDirectory() ? archivos(ruta) : [ruta];
    });
}

/** `{ 'bible/blm': 'a1b2c3d4e5', … }`; una carpeta que no exista se omite. */
export function contentVersions(publicContent: string | URL): Record<string, string> {
  const raiz = typeof publicContent === 'string' ? publicContent : fileURLToPath(publicContent);
  const salida: Record<string, string> = {};
  for (const grupo of CONTENT_GROUPS) {
    const dir = join(raiz, grupo);
    let lista: string[];
    try {
      lista = archivos(dir);
    } catch {
      continue;
    }
    const hash = createHash('sha256');
    for (const archivo of lista) {
      hash.update(archivo.slice(dir.length));
      hash.update('\0');
      hash.update(readFileSync(archivo));
      hash.update('\0');
    }
    salida[grupo] = hash.digest('hex').slice(0, 10);
  }
  return salida;
}
