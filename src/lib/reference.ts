/** Interpretación de referencias bíblicas escritas: «Juan 3, 16-21». */
import { findBook } from '@/content/bible';

export interface ParsedReference {
  bookId: string;
  chapter: number;
}

/**
 * Extrae el libro y el capítulo de una referencia. Los versículos se dejan
 * fuera a propósito: las perícopas bizantinas suelen ser discontinuas
 * («Mateo 10, 32-33. 37-38») y recortarlas daría una falsa sensación de exactitud.
 */
export function parseReference(reference: string): ParsedReference | null {
  const match = reference.match(/^(\d?\s?[^\d,]+?)\s+(\d+)\s*,/);
  if (!match) return null;
  const book = findBook(match[1].trim());
  if (!book || book.status === 'pending') return null;
  return { bookId: book.id, chapter: Number(match[2]) };
}
