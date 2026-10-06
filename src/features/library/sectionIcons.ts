/** El icono de cada sección de la biblioteca, por el nombre que le da `content/library`. */
import {
  IconBook,
  IconCandle,
  IconChalice,
  IconChurch,
  IconJournal,
  IconLamp,
  IconMonastery,
  IconNote,
  IconPeople,
  IconScroll,
  OrthodoxCross,
} from '@/components/icons';
import type { LibrarySection } from '@/content/library';

export const LIBRARY_ICONS: Record<LibrarySection['icon'], typeof IconBook> = {
  cross: OrthodoxCross,
  scroll: IconScroll,
  book: IconBook,
  monastery: IconMonastery,
  candle: IconCandle,
  chalice: IconChalice,
  lamp: IconLamp,
  note: IconNote,
  journal: IconJournal,
  people: IconPeople,
  church: IconChurch,
};
