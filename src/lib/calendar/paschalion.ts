/**
 * La Pascualia: las Pascuas de varios años, con lo que depende de ellas.
 *
 * Es la tabla que traían al final los calendarios impresos: cuándo es la
 * Pascua, cuándo empieza el Triodio y la Cuaresma, cuándo caen la Ascensión y
 * Pentecostés, y cuánto dura el ayuno de los Apóstoles, que cambia cada año
 * y no es igual en los dos calendarios. Todo sale del mismo cómputo que el
 * resto del calendario, pasando por el día juliano.
 */
import { gregorianToJdn, jdnToIso, julianToJdn } from './jdn';
import { paschaGregorianWestern, paschaJdn } from './pascha';

export interface PaschalionYear {
  year: number;
  pascha: string;
  /** La Pascua de Occidente, para comparar. */
  western: string;
  /** Las dos Pascuas caen el mismo domingo. */
  together: boolean;
  /** Domingo del Publicano y el Fariseo: empieza el Triodio. */
  triodion: string;
  /** Lunes Puro: empieza la Gran Cuaresma. */
  cleanMonday: string;
  ascension: string;
  pentecost: string;
  /** Días del ayuno de los Apóstoles, en el calendario nuevo y en el juliano. */
  apostlesFast: { nuevo: number; juliano: number };
  /** La Anunciación cae en Pascua en el calendario juliano: la Kyriopascha. */
  kyriopascha: boolean;
}

export function paschalionYear(year: number): PaschalionYear {
  const p = paschaJdn(year);
  const w = paschaGregorianWestern(year);
  const occidente = gregorianToJdn(year, w.month, w.day);
  // El ayuno va del lunes siguiente a Todos los Santos a la víspera de san
  // Pedro y san Pablo, el 28 de junio de cada calendario.
  const inicio = p + 57;
  return {
    year,
    pascha: jdnToIso(p),
    western: jdnToIso(occidente),
    together: occidente === p,
    triodion: jdnToIso(p - 70),
    cleanMonday: jdnToIso(p - 48),
    ascension: jdnToIso(p + 39),
    pentecost: jdnToIso(p + 49),
    apostlesFast: {
      nuevo: Math.max(0, gregorianToJdn(year, 6, 29) - inicio),
      juliano: Math.max(0, julianToJdn(year, 6, 29) - inicio),
    },
    kyriopascha: julianToJdn(year, 3, 25) === p,
  };
}

export function paschalion(desde: number, cuantos: number): PaschalionYear[] {
  return Array.from({ length: cuantos }, (_, i) => paschalionYear(desde + i));
}
