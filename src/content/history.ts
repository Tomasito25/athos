/**
 * Historia de la Iglesia ortodoxa, de Pentecostés a hoy.
 *
 * Prosa redactada para ATHOS, no texto litúrgico ni conciliar. Se declara como
 * tal en su ficha, igual que el catecismo.
 *
 * Está construida en dos capas a propósito:
 *
 * 1. **El esqueleto.** Todo hecho relevante lleva su año y su sitio en la
 *    cronología, aunque nadie haya escrito todavía el párrafo que lo explique.
 *    Un hueco fechado enseña más que una ausencia: se ve que falta.
 *
 * 2. **La prosa.** Donde se ha podido escribir, se escribe. Los siete
 *    Concilios Ecuménicos llevan además su ficha completa —quién los convocó,
 *    contra qué, qué definieron— porque son las junturas de todo lo demás.
 *
 * Con la historia reciente se procura el mismo cuidado que con la doctrina:
 * donde hay conflicto vivo entre Iglesias ortodoxas, se dice que lo hay y se
 * exponen las dos posiciones. Un relato en el que los nuestros siempre tienen
 * razón no es historia.
 */
import type { SourceMeta } from '@/types';

export type EventKind =
  | 'concilio'
  | 'cisma'
  | 'mision'
  | 'persecucion'
  | 'figura'
  | 'politico'
  | 'obra'
  | 'liturgia';

export const EVENT_KINDS: Record<EventKind, string> = {
  concilio: 'Concilio',
  cisma: 'Ruptura',
  mision: 'Misión',
  persecucion: 'Persecución',
  figura: 'Persona',
  politico: 'Poder civil',
  obra: 'Obra',
  liturgia: 'Culto',
};

/** La ficha de un concilio: lo que se convocó, contra qué y qué se decidió. */
export interface CouncilCard {
  /** Número de ecuménico, si lo es. Los locales no lo llevan. */
  number?: number;
  place: string;
  year: string;
  convokedBy: string;
  attendees?: string;
  /** Qué se estaba discutiendo. */
  against: string;
  /** Qué quedó definido. */
  defined: string[];
  /** Lo que conviene no dar por sabido. */
  note?: string;
}

export interface HistoryEvent {
  id: string;
  /** Año o rango, tal como se cita: «325», «c. 33», «1054», «1917-1938». */
  year: string;
  /** Para ordenar. Año de inicio en números. */
  sort: number;
  title: string;
  kind: EventKind;
  /** La explicación, cuando está escrita. Sin ella, el hecho sigue en su sitio. */
  detail?: string;
  council?: CouncilCard;
  /** Dónde seguir dentro de ATHOS. */
  seeAlso?: Array<{ label: string; path: string }>;
  /** Cuando el hecho se discute o duele, se dice. */
  disputed?: string;
}

export interface HistoryPeriod {
  id: string;
  title: string;
  range: string;
  /** De qué va esta época, en dos o tres párrafos. */
  summary: string[];
  events: HistoryEvent[];
}

export const HISTORY_META: SourceMeta = {
  source: 'Reseña histórica redactada para ATHOS a partir de las actas conciliares y de la historiografía común',
  tradition: 'Iglesia ortodoxa',
  language: 'es',
  license: 'cc-by-sa-4.0',
  dateAdded: '2026-08-27',
  copyright:
    'Texto redactado para ATHOS. No es un texto litúrgico ni un documento conciliar. Se publica bajo CC BY-SA 4.0.',
  notes:
    'No es un texto litúrgico, sino una reseña histórica. Los hechos sin párrafo explicativo conservan su fecha y su lugar en la cronología: el hueco se ve. Donde hay conflicto vivo entre Iglesias ortodoxas se expone como conflicto, no resuelto a favor de nadie.',
};
