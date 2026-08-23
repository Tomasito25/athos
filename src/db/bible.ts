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
  `${import.meta.env.BASE_URL}content/bible/${translationId}/${bookId}.json`;

/** Descarga (o recupera de memoria) el archivo de un libro. */
export async function loadBookFile(
  bookId: string,
  translationId = DEFAULT_TRANSLATION,
): Promise<BibleBookFile> {
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

export function chapterVerses(
  file: BibleBookFile,
  chapter: number,
  translationId = DEFAULT_TRANSLATION,
): BibleVerse[] {
  const raw = file.chapters[String(chapter)] ?? {};
  return Object.entries(raw)
    .map(([verse, text]) => ({
      id: `${file.id}.${chapter}.${verse}`,
      bookId: file.id,
      chapter,
      verse: Number(verse),
      text,
      translationId,
    }))
    .sort((a, b) => a.verse - b.verse);
}

/** Versículos de un capítulo, con IndexedDB como caché de lectura. */
export async function getChapter(
  bookId: string,
  chapter: number,
  translationId = DEFAULT_TRANSLATION,
): Promise<BibleVerse[]> {
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
      id: `${bookId}.${chapter}`,
      bookId,
      chapter,
      verseCount: verses.length,
      status: 'complete',
      translationId,
    });
  }
  return verses;
}

/** Número de capítulos reales del libro según el archivo descargado. */
export async function getBookChapterCount(
  bookId: string,
  translationId = DEFAULT_TRANSLATION,
): Promise<number> {
  const book = BOOKS_BY_ID.get(bookId);
  if (book && book.status === 'pending') return 0;
  const file = await loadBookFile(bookId, translationId);
  return Object.keys(file.chapters).length;
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
  const available = BIBLE_BOOKS.filter((b) => b.status !== 'pending');
  const already = new Set(await indexedBooks());
  let done = already.size;

  for (const book of available) {
    if (signal?.aborted) return;
    if (already.has(book.id)) continue;

    const file = await loadBookFile(book.id, translationId);
    const verses: BibleVerse[] = [];
    const chapters = Object.keys(file.chapters).map(Number).sort((a, b) => a - b);

    for (const chapter of chapters) {
      verses.push(...chapterVerses(file, chapter, translationId));
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
          translationId,
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
