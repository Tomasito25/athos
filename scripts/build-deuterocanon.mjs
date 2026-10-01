/**
 * Los libros que la Reina-Valera de 1909 no trae.
 *
 *   node scripts/build-deuterocanon.mjs [archivo.usfx.xml]
 *
 * La Reina-Valera sigue el canon hebreo corto. La Iglesia ortodoxa lee además
 * los libros que están en la Biblia griega de los Setenta: Tobías, Judit,
 * Sabiduría, Eclesiástico, Baruc, la Carta de Jeremías, los Macabeos, 1 Esdras,
 * la Oración de Manasés, el Salmo 151 y los textos griegos de Ester y Daniel.
 *
 * Se toman de la «Santa Biblia libre para el mundo», de dominio público,
 * publicada por eBible.org. Es la única traducción española de dominio público
 * que trae esos libros siguiendo el griego de los Setenta, y no la Vulgata
 * latina como las Biblias católicas antiguas. Sus autores la publican como
 * borrador en revisión, y ATHOS lo dice en la ficha de cada libro.
 *
 * Sin argumentos, descarga el USFX de eBible.org y lo descomprime en
 * `scripts/data/` (hace falta la orden `unzip`).
 *
 * Salida: public/content/bible/blm/<LIBRO>.json e index.json, con los mismos
 * identificadores que usa ATHOS.
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import { parseUsfx } from './build-bible.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const ZIP_URL = 'https://ebible.org/Scriptures/spablm_usfx.zip';
const DEFAULT_SOURCE = 'scripts/data/spablm_usfx.xml';

/**
 * Qué se toma de la fuente y con qué identificador queda en ATHOS.
 *
 * Baruc trae la Carta de Jeremías como capítulo 6, que es como la numera la
 * Vulgata; en la Biblia griega es un libro aparte, y así lo tiene ATHOS.
 */
const MAPA = [
  { from: 'TOB', to: 'TOB' },
  { from: 'JDT', to: 'JDT' },
  { from: 'ESG', to: 'ESG' },
  { from: 'WIS', to: 'WIS' },
  { from: 'SIR', to: 'SIR' },
  { from: 'BAR', to: 'BAR', chapters: [1, 2, 3, 4, 5] },
  { from: 'BAR', to: 'LJE', chapters: [6], renumber: true },
  { from: '1MA', to: '1MA' },
  { from: '2MA', to: '2MA' },
  { from: '3MA', to: '3MA' },
  { from: '4MA', to: '4MA' },
  { from: '1ES', to: '1ES' },
  { from: 'MAN', to: 'MAN' },
  { from: 'PS2', to: 'PS2' },
  { from: 'DAG', to: 'DAG' },
];

async function ensureSource(path) {
  const full = resolve(root, path);
  if (existsSync(full)) return full;
  const dir = dirname(full);
  mkdirSync(dir, { recursive: true });
  const zip = resolve(dir, 'spablm_usfx.zip');
  console.log(`Descargando ${ZIP_URL}…`);
  const response = await fetch(ZIP_URL);
  if (!response.ok) throw new Error(`No se ha podido descargar (${response.status})`);
  writeFileSync(zip, Buffer.from(await response.arrayBuffer()));
  const unzip = spawnSync('unzip', ['-o', '-j', zip, 'spablm_usfx.xml', '-d', dir], { stdio: 'inherit' });
  if (unzip.status !== 0 || !existsSync(full)) {
    throw new Error('No se ha podido descomprimir el USFX: hace falta la orden `unzip`.');
  }
  return full;
}

async function main() {
  const [source = DEFAULT_SOURCE] = process.argv.slice(2);
  const xml = readFileSync(await ensureSource(source), 'utf-8');
  const books = new Map(parseUsfx(xml).map((b) => [b.id, b]));

  const outDir = resolve(root, 'public/content/bible/blm');
  mkdirSync(outDir, { recursive: true });

  const index = [];
  let total = 0;
  for (const { from, to, chapters: wanted, renumber } of MAPA) {
    const book = books.get(from);
    if (!book) throw new Error(`La fuente no trae el libro ${from}`);
    const nums = Object.keys(book.chapters)
      .map(Number)
      .filter((c) => !wanted || wanted.includes(c))
      .sort((a, b) => a - b);
    const chapters = {};
    const verseCounts = {};
    nums.forEach((c, i) => {
      const n = renumber ? i + 1 : c;
      chapters[n] = book.chapters[c];
      verseCounts[n] = Object.keys(book.chapters[c]).length;
      total += verseCounts[n];
    });
    writeFileSync(resolve(outDir, `${to}.json`), JSON.stringify({ id: to, name: book.name, chapters }));
    index.push({ id: to, name: book.name, chapters: nums.length, verseCounts });
  }

  writeFileSync(resolve(outDir, 'index.json'), JSON.stringify({ translationId: 'blm', books: index }));
  console.log(`${index.length} libros · ${total} versículos → ${outDir}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
