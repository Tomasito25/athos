/**
 * El akathistos y el canon de cada día.
 *
 * El Octoecos dedica cada día de la semana a un misterio o a unos santos: el
 * domingo a la Resurrección, el lunes a los ángeles, el martes al Precursor,
 * el miércoles y el viernes a la Cruz —el miércoles también a la Theotokos—,
 * el jueves a los apóstoles y a san Nicolás, y el sábado a la Theotokos, a
 * todos los santos y a los difuntos. Quien reza un akathistos o un canon en
 * casa suele seguir ese reparto, y por encima de él la fiesta del día.
 *
 * ATHOS tiene enteros cuatro akathistos —a la Theotokos, al Dulcísimo Jesús,
 * a san Nicolás y a la Pasión— y seis cánones. Aquí se elige, de entre ellos,
 * el que mejor corresponde al día, y se dice por qué. Cuando el que pediría el
 * día no está en ATHOS —el de los ángeles, el del Precursor, el de la
 * Resurrección—, se dice también, y se pone el más cercano. No se inventa
 * ninguno.
 */
import type { LiturgicalDay } from '@/types';

export interface DevotionChoice {
  id: string;
  /** Por qué ése, en una frase. */
  reason: string;
}

export interface DayDevotion {
  /** A qué dedica el Octoecos este día de la semana. */
  dedication: string;
  /** El akathistos de hoy; `null` cuando la costumbre es no leerlo. */
  akathist: DevotionChoice | null;
  /** El canon de hoy, para el hueco que le dejan las Completas. */
  canon: DevotionChoice;
  /** Un aviso, cuando el día pide algo distinto. */
  notice?: string;
}

const DEDICACION = [
  'la Resurrección',
  'los ángeles',
  'san Juan el Precursor',
  'la Cruz y la Theotokos',
  'los santos apóstoles y san Nicolás',
  'la Cruz',
  'la Theotokos, todos los santos y los difuntos',
];

const FIESTAS_THEOTOKOS = ['natividad-theotokos', 'entrada-theotokos', 'anunciacion', 'dormicion', 'proteccion', 'sinaxis-theotokos', 'encuentro', 'viernes-fuente'];
const FIESTAS_DEL_SENOR = ['natividad', 'teofania', 'transfiguracion', 'ramos', 'ascension', 'pentecostes', 'circuncision'];
const FIESTAS_DE_LA_CRUZ = ['exaltacion', 'adoracion-cruz', 'procesion-cruz'];

const AKATHISTOS = {
  theotokos: 'akathistos-theotokos',
  jesus: 'akathistos-jesus',
  nicolas: 'akathistos-nicolas',
  pasion: 'akathistos-pasion',
};

const CANON = {
  paraclesis: 'canon-theotokos-paraclisis',
  angel: 'canon-angel',
  difuntos: 'canon-difuntos',
  pascual: 'canon-pascual',
  granCanon: 'gran-canon-andres',
};

const dd = (n: number) => String(n).padStart(2, '0');

export function dayDevotion(day: LiturgicalDay): DayDevotion {
  const wd = day.weekday;
  const ids = new Set(day.feasts.map((f) => f.id));
  const fecha = `${dd(day.church.month)}-${dd(day.church.day)}`;
  // Desde la Pascua pasada (tiempo pascual) y hasta la siguiente (Cuaresma).
  const o = day.paschaOffset;
  const n = day.nextPaschaOffset;
  const dedication = DEDICACION[wd] ?? '';

  /* ---------- El canon ---------- */
  let canon: DevotionChoice;
  if (o >= 0 && o <= 39) {
    canon = { id: CANON.pascual, reason: 'En el tiempo pascual, hasta la Ascensión, ATHOS pone el canon de Pascua, el canto propio de este tiempo.' };
  } else if (n >= -48 && n <= -45) {
    canon = {
      id: CANON.granCanon,
      reason: 'Del lunes al jueves de la primera semana de Cuaresma se lee en las Grandes Completas el Gran Canon de san Andrés, una parte cada día.',
    };
  } else if (fecha >= '08-01' && fecha <= '08-14') {
    canon = { id: CANON.paraclesis, reason: 'En el ayuno de la Dormición se canta casi cada tarde la Paráclesis a la Theotokos.' };
  } else if (wd === 1) {
    canon = { id: CANON.angel, reason: 'El lunes está dedicado a los ángeles.' };
  } else if (wd === 6) {
    canon = { id: CANON.difuntos, reason: 'El sábado se recuerda a los difuntos.' };
  } else {
    canon = {
      id: CANON.paraclesis,
      reason: `El canon del día, del Octoecos, no está en ATHOS; se pone la Paráclesis a la Theotokos, que se puede rezar cualquier día.`,
    };
  }

  /* ---------- El akathistos ---------- */
  // En la Semana Santa y en la Luminosa se sigue lo propio de esos días.
  if ((n >= -6 && n <= -1) || (o >= 0 && o <= 6)) {
    return {
      dedication,
      akathist: null,
      canon,
      notice:
        n < 0 && n >= -6
          ? 'En la Semana Santa es costumbre dejar los akathistos y seguir los oficios de cada día, que lo dicen todo.'
          : 'En la Semana Luminosa, en lugar de las oraciones de cada día se cantan las Horas de Pascua, y los akathistos se dejan.',
    };
  }

  let akathist: DevotionChoice;
  if (n === -15) {
    akathist = { id: AKATHISTOS.theotokos, reason: 'Hoy es el sábado del Akáthistos, el día en que la Iglesia lo canta entero.' };
  } else if (FIESTAS_THEOTOKOS.some((f) => ids.has(f))) {
    akathist = { id: AKATHISTOS.theotokos, reason: 'Hoy es fiesta de la Theotokos.' };
  } else if (ids.has('nicolas') || fecha === '05-09') {
    akathist = { id: AKATHISTOS.nicolas, reason: 'Hoy es fiesta de san Nicolás.' };
  } else if (FIESTAS_DE_LA_CRUZ.some((f) => ids.has(f))) {
    akathist = { id: AKATHISTOS.pasion, reason: 'Hoy es fiesta de la Cruz.' };
  } else if (FIESTAS_DEL_SENOR.some((f) => ids.has(f))) {
    akathist = { id: AKATHISTOS.jesus, reason: 'Hoy es fiesta del Señor.' };
  } else {
    switch (wd) {
      case 0:
        akathist = { id: AKATHISTOS.jesus, reason: 'El domingo es el día de la Resurrección. El akathistos de la Resurrección no está en ATHOS; se pone el del Dulcísimo Jesús.' };
        break;
      case 4:
        akathist = { id: AKATHISTOS.nicolas, reason: 'El jueves está dedicado a los apóstoles y a san Nicolás.' };
        break;
      case 5:
        akathist = { id: AKATHISTOS.pasion, reason: 'El viernes está dedicado a la Cruz.' };
        break;
      case 3:
      case 6:
        akathist = { id: AKATHISTOS.theotokos, reason: `El ${wd === 3 ? 'miércoles' : 'sábado'} está dedicado también a la Theotokos.` };
        break;
      case 1:
        akathist = { id: AKATHISTOS.theotokos, reason: 'El lunes está dedicado a los ángeles; su akathistos no está en ATHOS, así que se pone el de la Theotokos, que se reza cualquier día. El canon del día es el del Ángel de la Guarda.' };
        break;
      default:
        akathist = { id: AKATHISTOS.theotokos, reason: 'El martes está dedicado al Precursor; su akathistos no está en ATHOS, así que se pone el de la Theotokos, que se reza cualquier día.' };
    }
  }

  return { dedication, akathist, canon };
}
