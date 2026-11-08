/**
 * Santoral: el índice.
 *
 * Quién se conmemora cada día, con su nombre, su rango y su siglo. Es lo que
 * necesitan el calendario, la portada, los recordatorios y los enlaces de la
 * prosa, que se cargan al arrancar. Las vidas —casi todo el peso del
 * santoral— van en `vidas/`, y el santoral completo, con ellas y con los
 * troparios, en `santoral.ts`, que sólo se carga al sembrar la base de datos
 * o al abrir algo que de verdad lo necesita.
 *
 * Las biografías son reseñas históricas redactadas para ATHOS. Los troparios y
 * kontakia son textos litúrgicos: sólo se incluyen cuando se dispone de una
 * versión española de dominio público o de uso tradicional; en caso contrario
 * la ficha queda marcada como pendiente y no se inventa el texto.
 */
import type { Saint, SaintCategory, SaintSummary, TextBlock } from '@/types';
import { MORE_SAINTS } from './saints-more';
import { THIRD_SAINTS } from './saints-third';
import { YEAR_SAINTS_1 } from './saints-year-1';
import { YEAR_SAINTS_2 } from './saints-year-2';
import { YEAR_SAINTS_3 } from './saints-year-3';
import { YEAR_SAINTS_4 } from './saints-year-4';
import { YEAR_SAINTS_5 } from './saints-year-5';
import { YEAR_SAINTS_6 } from './saints-year-6';

export interface SaintSeed {
  id: string;
  name: string;
  fullName?: string;
  day: string;
  category: SaintCategory[];
  century?: string;
  place?: string;
  troparion?: TextBlock[];
  status?: Saint['status'];
}

const seeds: SaintSeed[] = [
  /* ---------------- Enero ---------------- */
  { id: 'basilio-magno', name: 'San Basilio el Grande', day: '01-01', category: ['obispo', 'padre'], century: 'IV', place: 'Cesarea de Capadocia' },
  { id: 'serafin-sarov', name: 'San Serafín de Sarov', day: '01-02', category: ['monje'], century: 'XVIII–XIX', place: 'Sarov, Rusia' },
  { id: 'teofania-señor', name: 'Bautismo del Señor', day: '01-06', category: ['senor'] },
  { id: 'juan-bautista-sinaxis', name: 'San Juan Bautista', fullName: 'Sinaxis del santo Profeta, Precursor y Bautista Juan', day: '01-07', category: ['profeta'], century: 'I' },
  { id: 'antonio-magno', name: 'San Antonio el Grande', day: '01-17', category: ['monje'], century: 'III–IV', place: 'Egipto' },
  { id: 'atanasio-alejandria', name: 'San Atanasio el Grande', day: '01-18', category: ['obispo', 'padre', 'confesor'], century: 'IV', place: 'Alejandría' },
  { id: 'macario-egipcio', name: 'San Macario el Egipcio', day: '01-19', category: ['monje'], century: 'IV', place: 'Escete, Egipto' },
  { id: 'gregorio-teologo', name: 'San Gregorio el Teólogo', fullName: 'San Gregorio Nacianceno', day: '01-25', category: ['obispo', 'padre'], century: 'IV', place: 'Nacianzo, Capadocia' },
  { id: 'tres-jerarcas', name: 'Los Tres Santos Jerarcas', day: '01-30', category: ['obispo', 'padre'], century: 'IV–V' },

  /* ---------------- Febrero ---------------- */
  { id: 'encuentro-senor', name: 'Encuentro del Señor', day: '02-02', category: ['senor'] },
  { id: 'haralambos', name: 'San Haralampo', day: '02-10', category: ['martir', 'obispo'], century: 'II', place: 'Magnesia' },
  { id: 'cirilo-metodio-c', name: 'San Cirilo, iguales a los Apóstoles', day: '02-14', category: ['obispo'], century: 'IX', place: 'Tesalónica' },

  /* ---------------- Marzo ---------------- */
  { id: 'gregorio-palamas', name: 'San Gregorio Palamás', day: '03-14', category: ['obispo', 'padre'], century: 'XIV', place: 'Monte Athos y Tesalónica' },
  { id: 'anunciacion-s', name: 'Anunciación de la Theotokos', day: '03-25', category: ['theotokos'] },

  /* ---------------- Abril ---------------- */
  { id: 'jorge-trofeoforo', name: 'San Jorge el Trofeóforo', day: '04-23', category: ['granmartir'], century: 'IV', place: 'Capadocia y Lida' },
  { id: 'marcos-evangelista', name: 'San Marcos Evangelista', day: '04-25', category: ['apostol'], century: 'I', place: 'Alejandría' },

  /* ---------------- Mayo ---------------- */
  { id: 'juan-teologo-mayo', name: 'San Juan el Teólogo', day: '05-08', category: ['apostol', 'padre'], century: 'I', place: 'Éfeso y Patmos' },

  /* ---------------- Junio ---------------- */
  { id: 'justino-filosofo', name: 'San Justino Filósofo', day: '06-01', category: ['martir', 'padre'], century: 'II', place: 'Roma' },

  /* ---------------- Julio ---------------- */
  { id: 'cosme-damian', name: 'Santos Cosme y Damián', day: '07-01', category: ['justo'], century: 'III' },
  { id: 'atanasio-athonita', name: 'San Atanasio el Athonita', day: '07-05', category: ['monje'], century: 'X', place: 'Monte Athos' },
  { id: 'elias-profeta', name: 'Santo Profeta Elías', day: '07-20', category: ['profeta'], century: 'IX a. C.', place: 'Israel' },
  { id: 'panteleimon', name: 'San Panteleimón', day: '07-27', category: ['granmartir'], century: 'III–IV', place: 'Nicomedia' },

  /* ---------------- Agosto ---------------- */
  { id: 'degollacion-s', name: 'Degollación de San Juan Bautista', day: '08-29', category: ['profeta', 'martir'], century: 'I' },
  { id: 'cosme-etolia', name: 'San Cosme de Etolia', day: '08-24', category: ['martir', 'monje'], century: 'XVIII', place: 'Monte Athos y Epiro' },

  /* ---------------- Septiembre ---------------- */
  { id: 'simeon-estilita', name: 'San Simeón el Estilita', day: '09-01', category: ['monje'], century: 'V', place: 'Siria' },
  { id: 'exaltacion-s', name: 'Exaltación de la Cruz', day: '09-14', category: ['senor'] },
  { id: 'juan-teologo-dormicion', name: 'Dormición de San Juan el Teólogo', day: '09-26', category: ['apostol'], century: 'I', place: 'Éfeso' },
  { id: 'silvano-athonita', name: 'San Silvano del Monte Athos', day: '09-24', category: ['monje'], century: 'XIX–XX', place: 'Monasterio de San Panteleimón, Athos' },

  /* ---------------- Octubre ---------------- */
  { id: 'dionisio-areopagita', name: 'San Dionisio Areopagita', day: '10-03', category: ['obispo', 'martir'], century: 'I', place: 'Atenas' },
  { id: 'demetrio-s', name: 'San Demetrio de Tesalónica', day: '10-26', category: ['granmartir'], century: 'IV', place: 'Tesalónica' },

  /* ---------------- Noviembre ---------------- */
  { id: 'miguel-arcangel', name: 'Arcángel Miguel', fullName: 'Sinaxis del Arcángel Miguel y todas las Potestades incorpóreas', day: '11-08', category: ['justo'] },
  { id: 'gregorio-palamas-nov', name: 'San Gregorio Palamás (traslación)', day: '11-14', category: ['obispo', 'padre'], century: 'XIV' },
  { id: 'entrada-theotokos-s', name: 'Entrada de la Theotokos en el Templo', day: '11-21', category: ['theotokos'] },

  /* ---------------- Diciembre ---------------- */
  { id: 'esteban-protomartir', name: 'San Esteban Protomártir', day: '12-27', category: ['martir'], century: 'I', place: 'Jerusalén' },

  /* ---------------- Padres y ancianos athonitas ---------------- */
  { id: 'isaac-sirio', name: 'San Isaac el Sirio', day: '01-28', category: ['obispo', 'monje', 'padre'], century: 'VII', place: 'Nínive' },
  { id: 'juan-damasceno', name: 'San Juan Damasceno', day: '12-04', category: ['monje', 'padre'], century: 'VII–VIII', place: 'Damasco y San Sabas' },
  { id: 'maximo-confesor', name: 'San Máximo el Confesor', day: '01-21', category: ['monje', 'confesor', 'padre'], century: 'VII', place: 'Constantinopla' },
  { id: 'juan-kronstadt', name: 'San Juan de Kronstadt', day: '12-20', category: ['justo'], century: 'XIX–XX', place: 'Kronstadt, Rusia' },
  { id: 'teofano-recluso', name: 'San Teófano el Recluso', day: '01-10', category: ['obispo'], century: 'XIX', place: 'Vysha, Rusia' },
  { id: 'paisios-athonita', name: 'San Paisios del Monte Athos', day: '07-12', category: ['monje'], century: 'XX', place: 'Monte Athos' },
  { id: 'porfirio-kavsokalivita', name: 'San Porfirio Kavsokalivita', day: '12-02', category: ['monje'], century: 'XX', place: 'Athos y Atenas' },
  { id: 'sergio-radonezh', name: 'San Sergio de Rádonezh', day: '09-25', category: ['monje'], century: 'XIV', place: 'Rusia' },
  { id: 'ambrosio-optina', name: 'San Ambrosio de Óptina', day: '10-10', category: ['monje'], century: 'XIX', place: 'Óptina, Rusia' },
];

/** Todas las semillas, ordenadas por su día del calendario. */
export const SAINT_SEEDS: SaintSeed[] = [
  ...seeds,
  ...MORE_SAINTS,
  ...THIRD_SAINTS,
  ...YEAR_SAINTS_1,
  ...YEAR_SAINTS_2,
  ...YEAR_SAINTS_3,
  ...YEAR_SAINTS_4,
  ...YEAR_SAINTS_5,
  ...YEAR_SAINTS_6,
].sort((a, b) =>
  a.day === b.day ? a.name.localeCompare(b.name, 'es') : a.day.localeCompare(b.day),
);

/** Cada santo, sin su vida ni sus himnos. */
export const SAINT_INDEX: SaintSummary[] = SAINT_SEEDS.map((s) => ({
  id: s.id,
  name: s.name,
  fullName: s.fullName,
  day: s.day,
  category: s.category,
  century: s.century,
  place: s.place,
}));

export const SAINT_CATEGORY_LABELS: Record<SaintCategory, string> = {
  apostol: 'Apóstol',
  martir: 'Mártir',
  granmartir: 'Gran Mártir',
  confesor: 'Confesor',
  monje: 'Monje',
  obispo: 'Obispo',
  profeta: 'Profeta',
  justo: 'Justo',
  neomartir: 'Neomártir',
  padre: 'Padre de la Iglesia',
  theotokos: 'Theotokos',
  senor: 'Fiesta del Señor',
};

const byDay = new Map<string, SaintSummary[]>();
for (const saint of SAINT_INDEX) {
  for (const day of [saint.day, ...(saint.otherDays ?? [])]) {
    const list = byDay.get(day) ?? [];
    list.push(saint);
    byDay.set(day, list);
  }
}

export function saintsOnDay(monthDay: string): SaintSummary[] {
  return byDay.get(monthDay) ?? [];
}

/** Días del año que ya tienen alguna conmemoración incorporada. */
export const SAINT_DAYS = new Set(SAINT_INDEX.map((s) => s.day));
