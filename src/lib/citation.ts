/**
 * ¿Lo que se ha escrito es una cita bíblica?
 *
 * «Juan 3, 16», «Mt 5», «1 Co 13, 4-7»: quien escribe eso no busca la
 * palabra «Juan», busca el pasaje. Lo usan la portada de la Biblia y el
 * buscador general, con el mismo análisis que el leccionario, así que
 * entienden las abreviaturas y las dos notaciones.
 */
import { BIBLE_BOOKS } from '@/content/bible';
import { parsePassage } from '@/lib/pericope';

export interface Citation {
  /** «Juan 3, 16» o «Juan 3». */
  label: string;
  /** El capítulo, con el versículo señalado si se ha dado. */
  path: string;
}

export function citationFor(query: string): Citation | null {
  if (query.trim().length < 3 || !/\d/.test(query)) return null;
  const partes = parsePassage(query);
  const primera = partes?.[0];
  const rango = primera?.ranges[0];
  const capitulo = rango?.chapter;
  if (!primera || !capitulo) return null;
  const libro = BIBLE_BOOKS.find((b) => b.id === primera.bookId);
  if (!libro || capitulo > libro.chapters) return null;
  // Sin versículo, el rango cubre el capítulo entero y no hay a dónde saltar.
  const versiculo = rango?.from ?? null;
  return {
    label: `${libro.name} ${capitulo}${versiculo ? `, ${versiculo}` : ''}`,
    path: `/leer/biblia/${libro.id}/${capitulo}${versiculo ? `#v${versiculo}` : ''}`,
  };
}
