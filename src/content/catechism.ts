/**
 * Catecismo: aprender la fe ortodoxa.
 *
 * Prosa redactada para ATHOS, no texto litúrgico ni patrístico. Se distingue
 * en su ficha, como todo lo que la aplicación escribe por su cuenta.
 *
 * Tres criterios lo gobiernan:
 *
 * 1. **Se responde de verdad.** Una pregunta con una respuesta evasiva no vale
 *    para nada. Donde la Iglesia enseña algo, se dice; donde no lo ha definido,
 *    se dice que no lo ha definido, que es distinto de no saberlo.
 *
 * 2. **Lo discutido se marca como discutido.** Donde Oriente y Occidente
 *    difieren —el Filioque, el purgatorio, el papado—, se explica en qué
 *    consiste la diferencia sin caricaturizar a nadie. Un catecismo que gana
 *    todas las discusiones por incomparecencia del contrario no enseña.
 *
 * 3. **Hay tres maneras de llegar aquí.** Quien no ha pisado una iglesia, quien
 *    se prepara para el bautismo y quien lleva años dentro no necesitan lo
 *    mismo. Cada entrada dice a quién sirve, y se puede filtrar.
 */
import type { SourceMeta } from '@/types';

/** A quién sirve cada entrada. No es una nota: es a quién le hace falta. */
export type CatechismLevel = 'nuevo' | 'catecumeno' | 'iniciado';

export const CATECHISM_LEVELS: Record<CatechismLevel, { name: string; description: string }> = {
  nuevo: {
    name: 'Sin bautizar ni catequizar',
    description: 'Para quien llega de fuera y no da nada por sabido. Empieza por aquí.',
  },
  catecumeno: {
    name: 'Catecúmeno',
    description: 'Para quien se prepara para entrar en la Iglesia y necesita lo que se le va a preguntar.',
  },
  iniciado: {
    name: 'Ya en la fe',
    description: 'Para quien lleva tiempo dentro y quiere el fondo de lo que reza.',
  },
};

export interface CatechismEntry {
  id: string;
  /** La pregunta, tal como la haría alguien de verdad. */
  question: string;
  /** La respuesta, un párrafo por idea. */
  answer: string[];
  level: CatechismLevel;
  /** Dónde lo dice la Escritura. */
  scripture?: string[];
  /** Dónde seguir dentro de ATHOS. */
  seeAlso?: Array<{ label: string; path: string }>;
  /** En qué difieren las confesiones, cuando difieren. */
  disputed?: string;
  /** Lo que la Iglesia no ha definido, cuando no lo ha definido. */
  undefined_?: string;
}

export interface CatechismPart {
  id: string;
  title: string;
  summary: string;
  entries: CatechismEntry[];
}

export const CATECHISM_META: SourceMeta = {
  source: 'Catecismo redactado para ATHOS a partir del Símbolo de la Fe, los Concilios Ecuménicos y la enseñanza patrística común',
  tradition: 'Iglesia ortodoxa',
  language: 'es',
  license: 'cc-by-sa-4.0',
  dateAdded: '2026-08-27',
  copyright:
    'Texto redactado para ATHOS. No es un texto litúrgico ni una definición conciliar. Se publica bajo CC BY-SA 4.0.',
  notes:
    'No es un texto litúrgico, sino una explicación. Donde la Iglesia ha definido algo se dice, y donde no lo ha definido también. Las diferencias entre confesiones se exponen sin caricaturizar a nadie. Ante una duda que importe, pregunta a un sacerdote.',
};
