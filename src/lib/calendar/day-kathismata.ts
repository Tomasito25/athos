/**
 * Los kathismata de los Maitines de cada día.
 *
 * El Típikon reparte el Salterio entero a lo largo de la semana, dos
 * kathismata en los Maitines de cada día y uno en las Vísperas. Este es el
 * reparto de dos, el del verano —desde el domingo de Tomás hasta el 21 de
 * septiembre—, que es el más sencillo:
 *
 *   domingo 2 y 3 · lunes 4 y 5 · martes 7 y 8 · miércoles 10 y 11 ·
 *   jueves 13 y 14 · viernes 19 y 20 · sábado 16 y 17
 *
 * En otoño e invierno el Típikon pone tres en algunos días, en la Gran
 * Cuaresma más, y en la Semana Luminosa ninguno. ATHOS no lo calcula: pone
 * este reparto y lo dice.
 */
import type { LiturgicalDay } from '@/types';

const POR_DIA: Array<[number, number]> = [
  [2, 3],
  [4, 5],
  [7, 8],
  [10, 11],
  [13, 14],
  [19, 20],
  [16, 17],
];

export interface DayKathismata {
  numbers: number[];
  /** Cuando el día pide otra cosa. */
  notice?: string;
}

export function kathismataFor(day: LiturgicalDay): DayKathismata {
  const o = day.paschaOffset;
  if (o >= 0 && o <= 6) {
    return {
      numbers: [],
      notice: 'En la Semana Luminosa no se lee el Salterio: todo es canto de Pascua.',
    };
  }
  const numbers = [...(POR_DIA[day.weekday] ?? [])];
  const n = day.nextPaschaOffset;
  if (n >= -48 && n <= -1) {
    return {
      numbers,
      notice: 'En la Gran Cuaresma el Típikon lee más kathismata cada día. Aquí van las dos del reparto común; las demás están en Leer → Salterio.',
    };
  }
  return { numbers };
}
