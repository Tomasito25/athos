/**
 * La Biblia en griego: los Setenta y el Nuevo Testamento de 1904.
 *
 *   node scripts/build-greek.mjs
 *
 * Es el texto que lee la Iglesia ortodoxa griega, y los dos son de dominio
 * público:
 *
 * - el Antiguo Testamento de los Setenta en la edición de Lancelot Brenton
 *   (1851), con los libros que la Biblia hebrea no tiene;
 * - el Nuevo Testamento en la edición del Patriarcado Ecuménico de 1904, con
 *   veinte correcciones de ediciones posteriores.
 *
 * Los dos se descargan de eBible.org en formato USFX (hace falta `unzip`) y
 * se guardan con los identificadores de libro de la fuente, que son los de la
 * Biblia griega: Esdras B junta Esdras y Nehemías, los Salmos van con la
 * numeración de los Setenta, Susana y Bel van aparte. La correspondencia con
 * la numeración de la Reina-Valera la hace la aplicación al leer.
 *
 * Salida: public/content/bible/lxx/<LIBRO>.json y public/content/bible/grc-nt/<LIBRO>.json
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import { parseUsfx } from './build-bible.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const DATA = resolve(root, 'scripts/data');

const FUENTES = [
  { ebible: 'grcbrent', salida: 'lxx' },
  { ebible: 'grcbyz', salida: 'grc-nt' },
];

async function asegurar(ebible) {
  const xml = resolve(DATA, `${ebible}_usfx.xml`);
  if (existsSync(xml)) return xml;
  mkdirSync(DATA, { recursive: true });
  const zip = resolve(DATA, `${ebible}_usfx.zip`);
  if (!existsSync(zip)) {
    const url = `https://ebible.org/Scriptures/${ebible}_usfx.zip`;
    console.log(`Descargando ${url}…`);
    const r = await fetch(url);
    if (!r.ok) throw new Error(`No se ha podido descargar ${url} (${r.status})`);
    writeFileSync(zip, Buffer.from(await r.arrayBuffer()));
  }
  const unzip = spawnSync('unzip', ['-o', '-j', zip, `${ebible}_usfx.xml`, '-d', DATA], { stdio: 'inherit' });
  if (unzip.status !== 0 || !existsSync(xml)) throw new Error('No se ha podido descomprimir: hace falta `unzip`.');
  return xml;
}

for (const { ebible, salida } of FUENTES) {
  const libros = parseUsfx(readFileSync(await asegurar(ebible), 'utf-8')).filter(
    // Fuera las introducciones y los apéndices de la edición electrónica.
    (b) => !['FRT', 'INT', 'XXA', 'XXB', 'XXC', 'GLO', 'BAK'].includes(b.id),
  );
  const dir = resolve(root, 'public/content/bible', salida);
  mkdirSync(dir, { recursive: true });
  const indice = [];
  for (const libro of libros) {
    writeFileSync(resolve(dir, `${libro.id}.json`), JSON.stringify({ id: libro.id, name: libro.name, chapters: libro.chapters }));
    indice.push({ id: libro.id, name: libro.name, chapters: Object.keys(libro.chapters).length });
  }
  writeFileSync(resolve(dir, 'index.json'), JSON.stringify(indice));
  console.log(`${salida}: ${libros.length} libros`);
}
