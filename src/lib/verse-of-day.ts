/**
 * El versículo del día, con su texto.
 *
 * Lo usan la portada y el recordatorio de la tarde, y los dos tienen que
 * decir el mismo versículo con las mismas palabras: las de la Biblia que
 * ATHOS guarda, nunca escritas a mano.
 */
import { getChapter } from '@/db/bible';
import { chaptersOf, inPericope, parsePassage } from '@/lib/pericope';
import { verseReferenceFor } from '@/content/verse-of-day';

export interface VerseOfDayText {
  /** «Evangelio según San Juan 3, 16», o con un rango si son varios. */
  cita: string;
  texto: string;
  /** El capítulo, bajando al primer versículo. */
  path: string;
}

/**
 * El versículo de un día, o `null` si su libro no está guardado todavía y no
 * hay conexión para traerlo.
 */
export async function verseOfDay(date: Date): Promise<VerseOfDayText | null> {
  const pericopa = parsePassage(verseReferenceFor(date))?.[0];
  if (!pericopa) return null;
  const capitulos = await Promise.all(
    chaptersOf(pericopa.ranges).map((capitulo) => getChapter(pericopa.bookId, capitulo)),
  );
  const lista = capitulos
    .flat()
    .filter((v) => inPericope(pericopa.ranges, v.chapter, v.verse))
    .sort((a, b) => a.chapter - b.chapter || a.verse - b.verse);
  if (!lista.length) return null;

  const primero = lista[0]!;
  const ultimo = lista[lista.length - 1]!;
  return {
    cita:
      lista.length === 1
        ? `${pericopa.bookName} ${primero.chapter}, ${primero.verse}`
        : `${pericopa.bookName} ${primero.chapter}, ${primero.verse}-${ultimo.verse}`,
    texto: lista.map((v) => v.text).join(' '),
    path: `/leer/biblia/${pericopa.bookId}/${primero.chapter}#v${primero.verse}`,
  };
}
