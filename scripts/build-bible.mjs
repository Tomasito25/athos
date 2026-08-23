/**
 * Convierte una Biblia en formato USFX a los archivos JSON que usa ATHOS.
 *
 *   node scripts/build-bible.mjs [archivo.usfx.xml] [idTraducción]
 *
 * Sin argumentos, descarga la Reina-Valera de 1909 (dominio público) desde el
 * proyecto open-bibles y la convierte.
 *
 * Salida:
 *   public/content/bible/<id>/<LIBRO>.json   — texto por libro
 *   public/content/bible/<id>/index.json     — libros y número de capítulos
 *
 * La traducción por defecto es la Reina-Valera de 1909, de dominio público.
 * ATHOS no incluye traducciones protegidas por derechos de autor.
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

const ENTITIES = {
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&apos;': "'",
  '&#160;': ' ',
  '&nbsp;': ' ',
};

function clean(raw) {
  return raw
    .replace(/<note\b[\s\S]*?<\/note>/g, '')
    .replace(/<f\b[\s\S]*?<\/f>/g, '')
    .replace(/<x\b[\s\S]*?<\/x>/g, '')
    .replace(/<[^>]+>/g, '')
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&[a-z]+;|&#\d+;/gi, (m) => ENTITIES[m] ?? m)
    .replace(/\s+/g, ' ')
    .trim();
}

export function parseUsfx(xml) {
  const books = [];
  const bookRe = /<book id="([A-Z0-9]{3})">([\s\S]*?)<\/book>/g;
  let bookMatch;

  while ((bookMatch = bookRe.exec(xml))) {
    const [, id, body] = bookMatch;
    const name = clean((body.match(/<h>([\s\S]*?)<\/h>/) ?? [, id])[1]);
    const chapters = {};

    // Trocea por capítulos manteniendo el número.
    const chunks = body.split(/<c id="(\d+)"\s*\/?>/);
    for (let i = 1; i < chunks.length; i += 2) {
      const chapterNum = Number(chunks[i]);
      const chapterBody = chunks[i + 1] ?? '';
      const verses = {};

      const vChunks = chapterBody.split(/<v id="([\dA-Za-z\-–]+)"\s*\/?>/);
      for (let j = 1; j < vChunks.length; j += 2) {
        const rawId = vChunks[j];
        const num = Number.parseInt(rawId, 10);
        if (!Number.isFinite(num)) continue;
        // El texto del versículo llega hasta <ve/> o hasta el siguiente <v>.
        const text = clean((vChunks[j + 1] ?? '').split(/<ve\s*\/?>/)[0]);
        if (!text) continue;
        verses[num] = verses[num] ? `${verses[num]} ${text}` : text;
      }
      if (Object.keys(verses).length) chapters[chapterNum] = verses;
    }
    if (Object.keys(chapters).length) books.push({ id, name, chapters });
  }
  return books;
}

const RV1909_URL =
  'https://raw.githubusercontent.com/seven1m/open-bibles/master/spa-rv1909.usfx.xml';

/** Descarga el corpus si no está ya en `scripts/data/`. */
async function ensureSource(path) {
  const full = resolve(root, path);
  if (existsSync(full)) return full;
  console.log(`Descargando ${RV1909_URL}…`);
  mkdirSync(dirname(full), { recursive: true });
  const response = await fetch(RV1909_URL);
  if (!response.ok) throw new Error(`No se ha podido descargar el corpus (${response.status})`);
  writeFileSync(full, Buffer.from(await response.arrayBuffer()));
  return full;
}

async function main() {
  const [source = 'scripts/data/spa-rv1909.usfx.xml', translationId = 'rv1909'] =
    process.argv.slice(2);
  const xml = readFileSync(await ensureSource(source), 'utf-8');
  const books = parseUsfx(xml);

  const outDir = resolve(root, 'public/content/bible', translationId);
  mkdirSync(outDir, { recursive: true });

  const index = [];
  let totalVerses = 0;

  for (const book of books) {
    const chapterNums = Object.keys(book.chapters).map(Number).sort((a, b) => a - b);
    const verseCounts = {};
    for (const c of chapterNums) {
      const count = Object.keys(book.chapters[c]).length;
      verseCounts[c] = count;
      totalVerses += count;
    }
    writeFileSync(
      resolve(outDir, `${book.id}.json`),
      JSON.stringify({ id: book.id, name: book.name, chapters: book.chapters }),
    );
    index.push({ id: book.id, name: book.name, chapters: chapterNums.length, verseCounts });
  }

  writeFileSync(resolve(outDir, 'index.json'), JSON.stringify({ translationId, books: index }));
  console.log(`${books.length} libros · ${totalVerses} versículos → ${outDir}`);
}

if (process.argv[1] && process.argv[1].endsWith('build-bible.mjs')) {
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}
