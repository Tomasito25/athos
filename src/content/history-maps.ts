/**
 * Los patriarcados en el mapa, y las divisiones en el tiempo.
 *
 * Dos cosas que la prosa cuenta mal y un dibujo cuenta bien: dónde estaban
 * las sedes y cuándo se separó cada quién de quién.
 *
 * ## Sobre el mapa
 *
 * Era un esquema sobre una retícula, para no dibujar de memoria una costa del
 * Mediterráneo. Ahora la costa es la de verdad: sale de Natural Earth, de
 * dominio público, generada una vez y guardada en el código
 * (`scripts/build-mapas.mjs`). Cada sede va en su longitud y su latitud. Lo
 * que el mapa no dibuja son fronteras: cambiaron demasiado de una época a
 * otra, y una frontera mal puesta afirma algo que no es.
 */

/** Qué era una sede en una época concreta. */
import type { Aspecto } from '@/lib/mapa';

export type SeeStatus =
  /** Patriarcado de la pentarquía antigua. */
  | 'pentarquia'
  /** Patriarcado posterior, reconocido como tal. */
  | 'patriarcado'
  /** Iglesia autocéfala que no lleva el título de patriarcado. */
  | 'autocefala'
  /** Sede que en esa época ya no está en comunión con las demás. */
  | 'separada'
  /** Autocefalia que unas Iglesias reconocen y otras no. */
  | 'disputada';

export const SEE_STATUS_LABELS: Record<SeeStatus, string> = {
  pentarquia: 'Pentarquía',
  patriarcado: 'Patriarcado',
  autocefala: 'Iglesia autocéfala',
  separada: 'Fuera de comunión',
  disputada: 'Autocefalia en disputa',
};

/** Cada rango tiene su forma, además de su color: no se depende sólo del color. */
export const SEE_STATUS_LOOK: Record<SeeStatus, Aspecto> = {
  pentarquia: 'lleno',
  patriarcado: 'lleno',
  autocefala: 'hueco',
  separada: 'tachado',
  disputada: 'discontinuo',
};

export interface See {
  id: string;
  name: string;
  /** Dónde está, en grados. */
  lon: number;
  lat: number;
  status: SeeStatus;
  /** Una línea: qué es y desde cuándo. */
  note: string;
  /** El rótulo del dibujo, si el nombre no cabe. Puede llevar un salto de línea. */
  label?: string;
  /** A qué lado del punto va el rótulo; por defecto, a la derecha. */
  labelSide?: 'izquierda' | 'derecha' | 'arriba' | 'abajo';
  /** Desplazamiento vertical del rótulo, para que no pise a otro. */
  labelDy?: number;
  /** Fuera del mapa: dónde se pinta, en unidades del dibujo, con una nota. */
  offMap?: { x: number; y: number };
}

export interface MapEpoch {
  id: string;
  title: string;
  year: string;
  /** Qué se ve en este mapa y qué había cambiado. */
  summary: string;
  sees: See[];
  /** A qué época de la historia de ATHOS pertenece. */
  periodId?: string;
}

/* Las sedes, en grados de longitud y latitud: las mismas en todas las épocas,
   para que no bailen de un mapa a otro. */
const P = {
  roma: { lon: 12.5, lat: 41.9 },
  constantinopla: { lon: 28.98, lat: 41.01 },
  // Con el rótulo a la izquierda: a la derecha pisaría a Jerusalén.
  alejandria: { lon: 29.92, lat: 31.2, labelSide: 'izquierda' },
  antioquia: { lon: 36.16, lat: 36.2 },
  jerusalen: { lon: 35.23, lat: 31.78 },
  cartago: { lon: 10.32, lat: 36.85 },
  moscu: { lon: 37.62, lat: 55.75 },
  kiev: { lon: 30.52, lat: 50.45 },
  atenas: { lon: 23.73, lat: 37.98 },
  belgrado: { lon: 20.46, lat: 44.82 },
  bucarest: { lon: 26.1, lat: 44.43 },
  sofia: { lon: 23.32, lat: 42.7 },
  tiflis: { lon: 44.79, lat: 41.72, labelSide: 'izquierda' },
  nicosia: { lon: 33.36, lat: 35.17 },
  ohrid: { lon: 20.8, lat: 41.12 },
  tirana: { lon: 19.82, lat: 41.33, labelSide: 'izquierda' },
  varsovia: { lon: 21.01, lat: 52.23 },
  praga: { lon: 14.44, lat: 50.08 },
  // América no cabe: se pinta arriba a la izquierda, y se dice.
  america: { lon: -77.04, lat: 38.9, offMap: { x: 40, y: 45 } },
} as const;

export const MAP_EPOCHS: MapEpoch[] = [
  {
    id: 'pentarquia',
    title: 'La Pentarquía',
    year: 'siglo VI',
    periodId: 'concilios',
    summary:
      'Cinco sedes ordenan la Iglesia entera, por este orden de honor: Roma, Constantinopla, Alejandría, Antioquía y Jerusalén. Ninguna manda sobre las otras; el primer puesto de Roma es de honor, y Constantinopla obtuvo el segundo en Calcedonia (451) por ser la capital del Imperio, no por origen apostólico.',
    sees: [
      { id: 'roma', name: 'Roma', ...P.roma, status: 'pentarquia', note: 'Primera en el orden de honor. Sede de san Pedro.' },
      { id: 'constantinopla', name: 'Constantinopla', ...P.constantinopla, status: 'pentarquia', note: 'Segunda desde Calcedonia (451), por ser la Nueva Roma.' },
      { id: 'alejandria', name: 'Alejandría', ...P.alejandria, status: 'pentarquia', note: 'Tercera. Sede de san Marcos y cuna de la teología del Verbo.' },
      { id: 'antioquia', name: 'Antioquía', ...P.antioquia, status: 'pentarquia', note: 'Cuarta. Allí se llamó cristianos por primera vez a los discípulos.' },
      { id: 'jerusalen', name: 'Jerusalén', ...P.jerusalen, status: 'pentarquia', note: 'Quinta. La Iglesia madre, elevada a patriarcado en Calcedonia.' },
      { id: 'cartago', name: 'Cartago', ...P.cartago, status: 'autocefala', note: 'Iglesia de África, con sus propios concilios. Desaparece con la conquista árabe.' },
    ],
  },

  {
    id: 'tras-calcedonia',
    title: 'Después de Calcedonia',
    year: '451 – 1054',
    periodId: 'concilios',
    summary:
      'La primera gran división duradera. Quienes no aceptan la fórmula de Calcedonia —«en dos naturalezas»— quedan aparte: coptos en Egipto, sirios, armenios, etíopes. Alejandría y Antioquía se desdoblan: en cada ciudad quedan dos jerarquías, la que acepta el Concilio y la que no. Es una división que dura hasta hoy.',
    sees: [
      { id: 'roma', name: 'Roma', ...P.roma, status: 'pentarquia', note: 'Sigue en comunión con Oriente, aunque ya con tensiones.' },
      { id: 'constantinopla', name: 'Constantinopla', ...P.constantinopla, status: 'pentarquia', note: 'Su influencia crece con la del Imperio.' },
      { id: 'alejandria', name: 'Alejandría', ...P.alejandria, status: 'separada', note: 'La mayor parte de Egipto no acepta Calcedonia: nace la Iglesia copta.' },
      { id: 'antioquia', name: 'Antioquía', ...P.antioquia, status: 'separada', note: 'Buena parte de Siria tampoco lo acepta: nace la Iglesia siria.' },
      { id: 'jerusalen', name: 'Jerusalén', ...P.jerusalen, status: 'pentarquia', note: 'Permanece calcedonia.' },
    ],
  },

  {
    id: 'ruptura-1054',
    title: 'Oriente y Occidente se separan',
    year: '1054 – 1453',
    periodId: 'separacion',
    summary:
      'Las excomuniones mutuas de 1054 no rompen nada de un día para otro: la ruptura se consuma cuando los cruzados saquean Constantinopla en 1204 y ponen allí un patriarca latino. Desde entonces Roma queda fuera de la comunión de las otras cuatro, y las Iglesias eslavas —bautizadas en el siglo IX y X— crecen dentro de ella.',
    sees: [
      { id: 'roma', name: 'Roma', ...P.roma, status: 'separada', note: 'Desde 1054, y de hecho desde 1204, fuera de comunión con Oriente.' },
      { id: 'constantinopla', name: 'Constantinopla', ...P.constantinopla, status: 'patriarcado', note: 'Primera sede de la ortodoxia, con primacía de honor.' },
      { id: 'alejandria', name: 'Alejandría', ...P.alejandria, status: 'patriarcado', note: 'El patriarcado ortodoxo, junto al copto.' },
      { id: 'antioquia', name: 'Antioquía', ...P.antioquia, status: 'patriarcado', note: 'El patriarcado ortodoxo, junto al sirio.' },
      { id: 'jerusalen', name: 'Jerusalén', ...P.jerusalen, status: 'patriarcado', note: 'Custodia de los Santos Lugares.' },
      { id: 'ohrid', name: 'Ohrid', ...P.ohrid, status: 'autocefala', note: 'Arzobispado eslavo, heredero de la misión de Cirilo y Metodio.' },
      { id: 'kiev', name: 'Kiev', ...P.kiev, status: 'autocefala', note: 'Metrópoli de la Rus, bautizada en 988, bajo Constantinopla.' },
      { id: 'nicosia', name: 'Chipre', ...P.nicosia, status: 'autocefala', note: 'Autocéfala desde el Concilio de Éfeso (431): la más antigua que no es patriarcado.' },
    ],
  },

  {
    id: 'tras-1453',
    title: 'Bajo el Imperio otomano',
    year: '1453 – 1917',
    periodId: 'ocaso',
    summary:
      'Constantinopla cae en 1453 y los cuatro patriarcados orientales quedan bajo dominio musulmán, organizados como una comunidad civil con el patriarca por cabeza. El centro de gravedad se desplaza al norte: Moscú se hace patriarcado en 1589 y se llama a sí misma «la tercera Roma».',
    sees: [
      { id: 'roma', name: 'Roma', ...P.roma, status: 'separada', note: 'Fuera de comunión. En 1596, la unión de Brest pasa a Roma a parte de los ortodoxos de Polonia-Lituania.' },
      { id: 'constantinopla', name: 'Constantinopla', ...P.constantinopla, status: 'patriarcado', note: 'Bajo el sultán, cabeza civil de todos los ortodoxos del Imperio.' },
      { id: 'alejandria', name: 'Alejandría', ...P.alejandria, status: 'patriarcado', note: 'Reducido a una comunidad pequeña.' },
      { id: 'antioquia', name: 'Antioquía', ...P.antioquia, status: 'patriarcado', note: 'Con sede trasladada a Damasco.' },
      { id: 'jerusalen', name: 'Jerusalén', ...P.jerusalen, status: 'patriarcado', note: 'Custodia de los Santos Lugares, en disputa con otras confesiones.' },
      { id: 'moscu', name: 'Moscú', ...P.moscu, status: 'patriarcado', note: 'Patriarcado desde 1589. Suprimido por Pedro I en 1721 y restaurado en 1917.' },
      { id: 'nicosia', name: 'Chipre', ...P.nicosia, status: 'autocefala', note: 'Mantiene su autocefalia.' },
    ],
  },

  {
    id: 'hoy',
    title: 'Hoy',
    year: 'desde 1991',
    periodId: 'hoy',
    summary:
      'Catorce Iglesias autocéfalas que todas reconocen: los cuatro patriarcados antiguos, Moscú, ' +
      'Serbia, Rumanía, Bulgaria, Georgia, Chipre, Grecia, Polonia, Albania y la de las Tierras ' +
      'Checas y Eslovaquia. Y tres cuya autocefalia unas reconocen y otras no: la Iglesia ortodoxa ' +
      'en América (1970, concedida por Moscú), la de Ucrania (2019, por Constantinopla) y la de ' +
      'Ohrid (2022, por Serbia). La comunión está tensada: desde 2018 Moscú no está en comunión con ' +
      'Constantinopla, y ha dejado de conmemorar a los primados que reconocieron a Ucrania.',
    sees: [
      { id: 'constantinopla', name: 'Constantinopla', ...P.constantinopla, status: 'patriarcado', note: 'Patriarcado Ecuménico. Primacía de honor entre los ortodoxos.' },
      { id: 'alejandria', name: 'Alejandría', ...P.alejandria, status: 'patriarcado', note: 'Patriarcado de Alejandría y toda África. Reconoció a Ucrania en 2019, y desde 2021 Moscú tiene en África un exarcado propio.' },
      { id: 'antioquia', name: 'Antioquía', ...P.antioquia, status: 'patriarcado', note: 'Patriarcado de Antioquía y todo Oriente, con sede en Damasco desde el siglo XIV. Su grey se ha dispersado por la guerra en Siria.' },
      { id: 'jerusalen', name: 'Jerusalén', ...P.jerusalen, status: 'patriarcado', note: 'Patriarcado de Jerusalén, custodio de los Santos Lugares.' },
      { id: 'moscu', name: 'Moscú', ...P.moscu, status: 'patriarcado', note: 'La Iglesia ortodoxa más numerosa. Desde 2018, sin comunión con Constantinopla.' },
      { id: 'serbia', name: 'Serbia', ...P.belgrado, status: 'patriarcado', labelSide: 'izquierda', note: 'Patriarcado de Serbia, con sede en Belgrado. Autocéfala desde san Sava, en 1219.' },
      { id: 'rumania', name: 'Rumanía', ...P.bucarest, status: 'patriarcado', note: 'Patriarcado de Rumanía: autocéfala desde 1885, patriarcado desde 1925.' },
      { id: 'bulgaria', name: 'Bulgaria', ...P.sofia, status: 'patriarcado', note: 'Patriarcado de Bulgaria, con sede en Sofía. Patriarcado reconocido desde 1961.' },
      { id: 'georgia', name: 'Georgia', ...P.tiflis, status: 'patriarcado', labelSide: 'izquierda', note: 'Iglesia ortodoxa de Georgia, de raíz muy antigua; su autocefalia restaurada se reconoció en 1990.' },
      { id: 'chipre', name: 'Chipre', ...P.nicosia, status: 'autocefala', note: 'Autocéfala desde el Concilio de Éfeso (431).' },
      { id: 'grecia', name: 'Grecia', ...P.atenas, status: 'autocefala', labelSide: 'izquierda', note: 'Iglesia de Grecia, autocéfala desde 1850.' },
      { id: 'polonia', name: 'Polonia', ...P.varsovia, status: 'autocefala', labelSide: 'izquierda', note: 'Iglesia ortodoxa de Polonia, con sede en Varsovia. Autocéfala desde 1924.' },
      { id: 'albania', name: 'Albania', ...P.tirana, status: 'autocefala', labelSide: 'izquierda', note: 'Iglesia ortodoxa de Albania, autocéfala desde 1937. Prohibida con toda religión en 1967, renació desde 1991.' },
      { id: 'chequia-eslovaquia', name: 'Tierras Checas y Eslovaquia', label: 'Chequia y\nEslovaquia', ...P.praga, status: 'autocefala', note: 'Con sedes en Praga y Prešov. Autocéfala por Moscú en 1951; Constantinopla la reconoció en 1998.' },
      { id: 'ucrania', name: 'Ucrania', ...P.kiev, status: 'disputada', note: 'La Iglesia ortodoxa de Ucrania recibió la autocefalia de Constantinopla en 2019; la reconocen además Alejandría, Grecia y Chipre. Moscú no, y en Ucrania sigue también la Iglesia que dependía de Moscú.' },
      { id: 'oca', name: 'América (OCA)', ...P.america, status: 'disputada', note: 'La Iglesia ortodoxa en América, fuera del esquema. Moscú le concedió la autocefalia en 1970; Constantinopla y la mayoría la tratan todavía como Iglesia autónoma.' },
      { id: 'ohrid', name: 'Ohrid', ...P.ohrid, status: 'disputada', note: 'La Iglesia de Macedonia del Norte. Proclamó su autocefalia en 1967; en 2022 Constantinopla la recibió en comunión y Serbia se la concedió, pero no todas la reconocen.' },
    ],
  },
];

/* ============================================================
   La línea del tiempo y sus divisiones
   ============================================================ */

/** Una rama que se separa del tronco, con el año y el motivo. */
export interface Branch {
  id: string;
  /** De dónde sale: el tronco, o el id de otra rama. */
  from: string;
  year: number;
  /** Cómo se cita el año. */
  yearLabel: string;
  name: string;
  /** Por qué se separó, en una frase. */
  why: string;
  /** Cuántos son hoy, en números redondos, cuando se sabe. */
  today?: string;
}

/**
 * El tronco es la comunión que llega hasta hoy; cada rama es una separación.
 *
 * Está contado desde donde está ATHOS, y por eso se dice: la línea recta es
 * la Iglesia ortodoxa, y las demás salen de ella. Un católico dibujaría lo
 * mismo con la recta en su sitio. Lo que no cambia según quien lo cuente son
 * las fechas y los motivos, y eso es lo que el esquema afirma.
 */
export const CHURCH_BRANCHES: Branch[] = [
  {
    id: 'oriente',
    from: 'tronco',
    year: 431,
    yearLabel: '431',
    name: 'Iglesia de Oriente',
    why: 'No acepta el Concilio de Éfeso, que condenó a Nestorio y llamó Theotokos —Madre de Dios— a la Virgen.',
    today: 'Iglesia asiria de Oriente, hoy pequeña, con raíces en Irak e Irán.',
  },
  {
    id: 'orientales',
    from: 'tronco',
    year: 451,
    yearLabel: '451',
    name: 'Iglesias ortodoxas orientales',
    why: 'No aceptan la fórmula de Calcedonia, «en dos naturalezas». Se las llamó monofisitas; ellas prefieren miafisitas, y el diálogo moderno ha reconocido que buena parte del desacuerdo era de palabras.',
    today: 'Coptos, sirios, armenios, etíopes, eritreos e indios: unos sesenta millones.',
  },
  {
    id: 'roma',
    from: 'tronco',
    year: 1054,
    yearLabel: '1054 · 1204',
    name: 'Iglesia católica romana',
    why: 'Siglos de distancia acaban en las excomuniones mutuas de 1054; la ruptura se consuma con el saqueo de Constantinopla en 1204. Los dos puntos de fondo: el Filioque añadido al Credo y el alcance de la primacía del papa.',
    today: 'La confesión cristiana más numerosa.',
  },
  {
    id: 'protestantes',
    from: 'roma',
    year: 1517,
    yearLabel: '1517',
    name: 'Reformas protestantes',
    why: 'Salen de Roma, no de Oriente: luteranos, reformados, anglicanos y, después, muchas otras. La ortodoxia no participó en aquella discusión ni en la que la provocó.',
    today: 'Cientos de familias distintas.',
  },
  {
    id: 'greco-catolicos',
    from: 'tronco',
    year: 1596,
    yearLabel: '1596',
    name: 'Iglesias greco-católicas',
    why: 'En la unión de Brest, parte de los ortodoxos de Polonia-Lituania pasa a Roma conservando el rito bizantino. Es una de las heridas que más pesan todavía en el trato entre católicos y ortodoxos.',
  },
  {
    id: 'viejos-creyentes',
    from: 'tronco',
    year: 1666,
    yearLabel: '1653-1666',
    name: 'Viejos creyentes',
    why: 'Se separan de la Iglesia rusa al rechazar las reformas litúrgicas del patriarca Nikón: no fue una disputa doctrinal, sino sobre los libros y los gestos del culto.',
  },
];

export const TIMELINE_START = 33;
/** El final es el año en curso: con un año fijo, la línea se quedaba en 2025. */
export const TIMELINE_END = new Date().getFullYear();

export const MAPS_NOTE =
  'La costa, los lagos y los ríos son los de Natural Earth, de dominio público, y cada sede está en su ' +
  'longitud y su latitud. No se dibujan fronteras: cambiaron demasiado de una época a otra. Lo que el ' +
  'mapa afirma es qué sedes existían en cada época, con qué rango y en comunión con quién.';
