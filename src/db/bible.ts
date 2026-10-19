/**
 * Acceso al texto bíblico.
 *
 * El texto vive en `public/content/bible/<traducción>/<LIBRO>.json`, se sirve
 * como recurso estático y se guarda en IndexedDB a medida que se lee. Una tarea
 * en segundo plano puede indexar la Biblia entera para que la búsqueda funcione
 * sin conexión.
 */
import type { BibleVerse } from '@/types';
import { BIBLE_BOOKS, BOOKS_BY_ID } from '@/content/bible';
import { contentUrl, contentVersions } from '@/lib/content-url';
import { db, getSetting, setSetting } from './db';

export const DEFAULT_TRANSLATION = 'rv1909';

export interface BibleBookFile {
  id: string;
  name: string;
  chapters: Record<string, Record<string, string>>;
}

const memory = new Map<string, BibleBookFile>();
const inFlight = new Map<string, Promise<BibleBookFile>>();

const fileUrl = (bookId: string, translationId: string) =>
  contentUrl(`bible/${translationId}/${bookId}.json`);

/**
 * La traducción de la que hay que leer un libro.
 *
 * Quien pide la traducción por defecto pide en realidad «la Biblia de ATHOS»,
 * y en ella cada libro viene de donde viene: Tobías no está en la Reina-Valera.
 * Si se pide otra traducción expresamente, se respeta.
 */
export function effectiveTranslation(bookId: string, translationId = DEFAULT_TRANSLATION): string {
  if (translationId !== DEFAULT_TRANSLATION) return translationId;
  return BOOKS_BY_ID.get(bookId)?.translationId ?? DEFAULT_TRANSLATION;
}

/** Descarga (o recupera de memoria) el archivo de un libro. */
export async function loadBookFile(
  bookId: string,
  requested = DEFAULT_TRANSLATION,
): Promise<BibleBookFile> {
  const translationId = effectiveTranslation(bookId, requested);
  const key = `${translationId}:${bookId}`;
  const cached = memory.get(key);
  if (cached) return cached;

  const pending = inFlight.get(key);
  if (pending) return pending;

  const request = (async () => {
    const response = await fetch(fileUrl(bookId, translationId));
    if (!response.ok) {
      throw new Error(`No se ha podido cargar ${bookId} (${response.status})`);
    }
    const file = (await response.json()) as BibleBookFile;
    memory.set(key, file);
    inFlight.delete(key);
    return file;
  })();

  inFlight.set(key, request);
  return request;
}

/**
 * Las traducciones españolas guardan sus versículos con la clave de siempre,
 * `LIBRO.capítulo.versículo`, y no se pisan entre sí porque no comparten
 * libros. Las griegas sí comparten libros con ellas, así que llevan delante el
 * nombre de la traducción: si no, Juan 1, 1 en griego borraba Juan 1, 1 en
 * español.
 */
const SIN_PREFIJO = new Set(['rv1909', 'blm']);
const clave = (translationId: string, resto: string) =>
  SIN_PREFIJO.has(translationId) ? resto : `${translationId}:${resto}`;

export function chapterVerses(
  file: BibleBookFile,
  chapter: number,
  translationId = DEFAULT_TRANSLATION,
): BibleVerse[] {
  const raw = file.chapters[String(chapter)] ?? {};
  return Object.entries(raw)
    .map(([verse, text]) => ({
      id: clave(translationId, `${file.id}.${chapter}.${verse}`),
      bookId: file.id,
      chapter,
      verse: Number(verse),
      text,
      translationId,
    }))
    .sort((a, b) => a.verse - b.verse);
}

/* ---------- Que lo guardado no se quede viejo ---------- */

const VERSIONS_KEY = 'bible.versions';
/** Las traducciones de las que se construye el Salterio. */
const DEL_SALTERIO = new Set(['rv1909', 'blm']);
/** Debe coincidir con la clave de `psalter.ts`; no se importa para no hacer un ciclo. */
const PSALTER_KEY = 'psalter.built.v2';
const CONTENT_CACHE = 'athos-content-v2';

let comprobacion: Promise<string[]> | null = null;

/**
 * Tira lo guardado de cada traducción cuyo texto haya cambiado.
 *
 * Los libros se guardan en IndexedDB al leerlos y no se volvían a pedir
 * nunca: una corrección de la Biblia no llegaba a quien ya la tenía. Ahora
 * cada traducción lleva la huella de sus archivos (`__CONTENT_VERSIONS__`), y
 * si la guardada no es la de esta compilación se borran sus versículos, se
 * desmarca su indexación y, si alimenta el Salterio, el Salterio se
 * reconstruye. Lo del usuario —favoritos, notas, avance— apunta a
 * referencias, no a filas, y no se toca.
 *
 * Quien venía de una versión sin huellas no tiene ninguna guardada: se le
 * renueva todo una vez, porque no hay forma de saber si lo suyo es lo último.
 *
 * Devuelve las traducciones renovadas. Se ejecuta una vez por sesión.
 */
export function ensureBibleCurrent(): Promise<string[]> {
  comprobacion ??= renewStaleTranslations().catch(() => {
    // Si falla —IndexedDB bloqueada—, se lee lo que haya y se reintenta otro día.
    comprobacion = null;
    return [];
  });
  return comprobacion;
}

export async function renewStaleTranslations(): Promise<string[]> {
  const actuales: Record<string, string> = {};
  for (const [grupo, huella] of Object.entries(contentVersions())) {
    if (grupo.startsWith('bible/')) actuales[grupo.slice('bible/'.length)] = huella;
  }
  if (!Object.keys(actuales).length) return [];

  const guardadas = await getSetting<Record<string, string>>(VERSIONS_KEY, {});
  const viejas = Object.keys(actuales).filter((t) => guardadas[t] !== actuales[t]);
  if (!viejas.length) return [];

  await db.transaction('rw', [db.bible_verses, db.bible_chapters, db.psalms, db.settings], async () => {
    for (const traduccion of viejas) {
      await db.bible_verses.where('translationId').equals(traduccion).delete();
      await db.bible_chapters.where('translationId').equals(traduccion).delete();
    }

    // Los libros indexados cuya traducción ha cambiado vuelven a indexarse.
    const indexados = await getSetting<string[]>(INDEX_KEY, []);
    const siguen = indexados.filter((libro) => !viejas.includes(effectiveTranslation(libro)));
    if (siguen.length !== indexados.length) await setSetting(INDEX_KEY, siguen);

    if (viejas.some((t) => DEL_SALTERIO.has(t))) {
      await db.psalms.clear();
      await setSetting(PSALTER_KEY, false);
    }

    await setSetting(VERSIONS_KEY, { ...guardadas, ...actuales });
  });

  for (const traduccion of viejas) {
    for (const clave of memory.keys()) if (clave.startsWith(`${traduccion}:`)) memory.delete(clave);
  }
  await limpiarCache(viejas, actuales);
  return viejas;
}

/**
 * Quita de la caché del Service Worker los libros con huella vieja.
 *
 * No es imprescindible —la dirección nueva ya no los encuentra—, pero si no
 * se quitan ocupan sitio hasta que caducan, dentro de un año.
 */
async function limpiarCache(viejas: string[], actuales: Record<string, string>): Promise<void> {
  if (typeof caches === 'undefined') return;
  try {
    const cache = await caches.open(CONTENT_CACHE);
    for (const peticion of await cache.keys()) {
      const url = new URL(peticion.url);
      const traduccion = viejas.find((t) => url.pathname.includes(`/content/bible/${t}/`));
      if (traduccion && url.searchParams.get('v') !== actuales[traduccion]) await cache.delete(peticion);
    }
  } catch {
    // Sin acceso a la caché no se pierde nada: sólo ocupa sitio un tiempo.
  }
}

/** Versículos de un capítulo, con IndexedDB como caché de lectura. */
export async function getChapter(
  bookId: string,
  chapter: number,
  requested = DEFAULT_TRANSLATION,
): Promise<BibleVerse[]> {
  await ensureBibleCurrent();
  const translationId = effectiveTranslation(bookId, requested);
  const stored = await db.bible_verses
    .where('[translationId+bookId+chapter]')
    .equals([translationId, bookId, chapter])
    .sortBy('verse');
  if (stored.length) return stored;

  const file = await loadBookFile(bookId, translationId);
  const verses = chapterVerses(file, chapter, translationId);
  if (verses.length) {
    await db.bible_verses.bulkPut(verses);
    await db.bible_chapters.put({
      id: clave(translationId, `${bookId}.${chapter}`),
      bookId,
      chapter,
      verseCount: verses.length,
      status: 'complete',
      translationId,
    });
  }
  return verses;
}

/* ---------- Indexación completa para la búsqueda sin conexión ---------- */

const INDEX_KEY = 'bible.indexedBooks';

export async function indexedBooks(): Promise<string[]> {
  return getSetting<string[]>(INDEX_KEY, []);
}

export interface IndexProgress {
  done: number;
  total: number;
  book: string;
}

/**
 * Descarga todos los libros disponibles y los guarda en IndexedDB.
 * Puede interrumpirse y reanudarse: recuerda qué libros ya están indexados.
 */
export async function indexWholeBible(
  onProgress?: (p: IndexProgress) => void,
  signal?: AbortSignal,
  translationId = DEFAULT_TRANSLATION,
): Promise<void> {
  await ensureBibleCurrent();
  const available = BIBLE_BOOKS.filter((b) => b.status !== 'pending');
  const already = new Set(await indexedBooks());
  let done = already.size;

  for (const book of available) {
    if (signal?.aborted) return;
    if (already.has(book.id)) continue;

    const efectiva = effectiveTranslation(book.id, translationId);
    const file = await loadBookFile(book.id, efectiva);
    const verses: BibleVerse[] = [];
    const chapters = Object.keys(file.chapters).map(Number).sort((a, b) => a - b);

    for (const chapter of chapters) {
      verses.push(...chapterVerses(file, chapter, efectiva));
    }

    await db.transaction('rw', [db.bible_verses, db.bible_chapters], async () => {
      await db.bible_verses.bulkPut(verses);
      await db.bible_chapters.bulkPut(
        chapters.map((chapter) => ({
          id: `${book.id}.${chapter}`,
          bookId: book.id,
          chapter,
          verseCount: Object.keys(file.chapters[String(chapter)]).length,
          status: 'complete' as const,
          translationId: efectiva,
        })),
      );
    });

    already.add(book.id);
    done += 1;
    await setSetting(INDEX_KEY, [...already]);
    onProgress?.({ done, total: available.length, book: book.name });

    // Deja respirar al hilo principal en los dispositivos modestos.
    await new Promise((resolve) => setTimeout(resolve, 0));
  }
}

export async function bibleIndexStatus(): Promise<{ done: number; total: number }> {
  const total = BIBLE_BOOKS.filter((b) => b.status !== 'pending').length;
  return { done: (await indexedBooks()).length, total };
}

export async function clearBibleIndex(): Promise<void> {
  await db.bible_verses.clear();
  await db.bible_chapters.clear();
  await setSetting(INDEX_KEY, []);
  memory.clear();
}

/** Referencia legible: `Jn 3, 16`. */
export function formatReference(bookId: string, chapter: number, verse?: number): string {
  const book = BOOKS_BY_ID.get(bookId);
  const name = book?.abbr ?? bookId;
  return verse ? `${name} ${chapter}, ${verse}` : `${name} ${chapter}`;
}
