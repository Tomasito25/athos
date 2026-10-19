/**
 * Exportar al calendario del teléfono.
 *
 * Los recordatorios de ATHOS los prepara la propia aplicación, y con ella
 * cerrada no son fiables: en Android dependen de que Chrome la despierte, y
 * en iPhone no llegan nunca. Sin servidor, lo único que avisa siempre es el
 * calendario del propio teléfono. Así que se le dan los avisos en un archivo
 * `.ics`, el formato que entienden todos (RFC 5545), y desde ahí suenan
 * aunque ATHOS lleve semanas sin abrirse.
 *
 * Dos archivos:
 *   · los avisos de oración y lectura que se tengan activados, con su hora;
 *   · las fiestas y los periodos de ayuno del año que viene, de día entero.
 *
 * Todo se genera en el dispositivo: no se envía nada a ningún sitio.
 */
import { computeLiturgicalDay } from '@/lib/calendar/liturgical';
import { isFastDay } from '@/lib/calendar/fasting';
import { addDaysIso, toIsoDate } from '@/lib/calendar/jdn';
import { loadLectionary } from '@/db/lectionary';
import { REMINDERS, reminderContent, timeFor } from '@/lib/reminders';
import type { CalendarStyle, FeastRank, OfficeLength, RuleTime } from '@/types';

/* ---------------- El formato ---------------- */

/** Escapa un texto según RFC 5545: barras, comas, puntos y comas y saltos. */
function escapar(texto: string): string {
  return texto.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\r?\n/g, '\\n');
}

/**
 * Parte una línea en trozos de 75 octetos como mucho, que es lo que exige el
 * formato: las siguientes empiezan con un espacio. Se corta por caracteres
 * enteros, para no partir una letra con tilde por la mitad.
 */
function plegar(linea: string): string {
  const codificador = new TextEncoder();
  if (codificador.encode(linea).length <= 75) return linea;
  const trozos: string[] = [];
  let actual = '';
  let octetos = 0;
  for (const caracter of linea) {
    const tam = codificador.encode(caracter).length;
    const limite = trozos.length === 0 ? 75 : 74;
    if (octetos + tam > limite) {
      trozos.push(actual);
      actual = '';
      octetos = 0;
    }
    actual += caracter;
    octetos += tam;
  }
  trozos.push(actual);
  return trozos.join('\r\n ');
}

const fecha = (iso: string) => iso.replace(/-/g, '');
const sello = (d: Date) => d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');

interface Evento {
  uid: string;
  titulo: string;
  descripcion?: string;
  /** Día entero: `YYYY-MM-DD`. */
  dia?: string;
  /** Días que dura, si es de día entero. */
  dias?: number;
  /** Con hora, en la hora local del dispositivo: `YYYY-MM-DD` y `HH:MM`. */
  inicio?: { iso: string; hora: string };
  /** Repetir cada día. */
  diario?: boolean;
  /** Avisar a la hora del evento. */
  aviso?: boolean;
}

function evento(e: Evento, ahora: Date): string[] {
  const lineas = ['BEGIN:VEVENT', `UID:${e.uid}@athos`, `DTSTAMP:${sello(ahora)}`];
  if (e.dia) {
    lineas.push(`DTSTART;VALUE=DATE:${fecha(e.dia)}`);
    lineas.push(`DTEND;VALUE=DATE:${fecha(addDaysIso(e.dia, e.dias ?? 1))}`);
    lineas.push('TRANSP:TRANSPARENT');
  } else if (e.inicio) {
    // Hora «flotante», sin zona: el teléfono la entiende como hora local, y
    // el aviso de las siete sigue siendo a las siete si se viaja.
    const t = `${fecha(e.inicio.iso)}T${e.inicio.hora.replace(':', '')}00`;
    lineas.push(`DTSTART:${t}`, `DTEND:${t}`);
    lineas.push('TRANSP:TRANSPARENT');
    if (e.diario) lineas.push('RRULE:FREQ=DAILY');
  }
  lineas.push(`SUMMARY:${escapar(e.titulo)}`);
  if (e.descripcion) lineas.push(`DESCRIPTION:${escapar(e.descripcion)}`);
  if (e.aviso) {
    lineas.push('BEGIN:VALARM', 'ACTION:DISPLAY', 'TRIGGER:PT0M', `DESCRIPTION:${escapar(e.titulo)}`, 'END:VALARM');
  }
  lineas.push('END:VEVENT');
  return lineas;
}

/** Un calendario completo, listo para guardar como `.ics`. */
export function calendarFile(nombre: string, eventos: Evento[], ahora = new Date()): string {
  const lineas = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//ATHOS//Calendario ortodoxo//ES',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    `X-WR-CALNAME:${escapar(nombre)}`,
    ...eventos.flatMap((e) => evento(e, ahora)),
    'END:VCALENDAR',
  ];
  return lineas.map(plegar).join('\r\n') + '\r\n';
}

/* ---------------- Los avisos ---------------- */

const OFICIOS: Record<string, RuleTime> = {
  'oracion-manana': 'manana',
  'oracion-mediodia': 'mediodia',
  'oracion-noche': 'noche',
};

export interface ExportSettings {
  calendarStyle: CalendarStyle;
  officeLength: Record<RuleTime, OfficeLength>;
  notifications: Record<string, boolean>;
  notificationTimes: Record<string, string>;
}

/**
 * Los avisos activados, como eventos con alarma.
 *
 * Los oficios se repiten cada día a su hora. Los que cambian según el día
 * —el Evangelio, el santo, el comienzo de un ayuno, una fiesta grande— se
 * escriben día por día para los próximos `dias`, cada uno con lo que dirá.
 * «Lo que queda por rezar» y el plan de lectura dependen de lo que se haya
 * hecho ese día, y eso sólo lo sabe ATHOS abierta: no se exportan.
 */
export async function reminderEvents(ajustes: ExportSettings, desde = toIsoDate(new Date()), dias = 180): Promise<Evento[]> {
  await loadLectionary(ajustes.calendarStyle);
  const activos = REMINDERS.filter((r) => ajustes.notifications[r.id] && !r.needsApp && r.id !== 'lectura');
  const eventos: Evento[] = [];
  for (const r of activos) {
    const hora = timeFor(r.id, ajustes.notificationTimes);
    if (OFICIOS[r.id]) {
      const contenido = await reminderContent(r.id, desde, ajustes);
      eventos.push({
        uid: r.id,
        titulo: r.title,
        descripcion: contenido?.body.replace(/ · [^·]*$/, '') ?? r.description,
        inicio: { iso: desde, hora },
        diario: true,
        aviso: true,
      });
      continue;
    }
    for (let i = 0; i < dias; i += 1) {
      const iso = addDaysIso(desde, i);
      const contenido = await reminderContent(r.id, iso, ajustes);
      if (!contenido) continue;
      eventos.push({
        uid: `${r.id}-${iso}`,
        titulo: contenido.title,
        descripcion: contenido.body,
        inicio: { iso, hora },
        aviso: true,
      });
    }
  }
  return eventos;
}

/* ---------------- Fiestas y ayunos ---------------- */

const SEMANALES = new Set(['semanal', 'pentecostario']);

const FIESTAS_QUE_SE_EXPORTAN: FeastRank[] = [
  'pascua',
  'gran-fiesta',
  'fiesta-del-senor',
  'fiesta-de-la-theotokos',
  'vigilia',
];

/**
 * Las fiestas principales y los periodos de ayuno de los próximos `dias`.
 *
 * Los periodos —la Gran Cuaresma, el ayuno de los Apóstoles, el de la
 * Dormición, el de Navidad— van como un solo evento de varios días. Los
 * miércoles y viernes no se exportan: son todas las semanas y llenarían el
 * calendario de lo que ya se sabe.
 */
export function feastAndFastEvents(style: CalendarStyle, desde = toIsoDate(new Date()), dias = 365): Evento[] {
  const eventos: Evento[] = [];
  // Con `as`: si no, TypeScript lo da por `null` para siempre, porque no ve
  // que `cerrar` y el bucle lo cambian.
  let periodo = null as { id: string; nombre: string; inicio: string; dias: number } | null;
  const cerrar = () => {
    if (periodo) {
      // «Exaltación de la Cruz» es a la vez la fiesta y su ayuno: se dice cuál es cuál.
      const titulo = /^ayuno/i.test(periodo.nombre) ? periodo.nombre : `Ayuno: ${periodo.nombre}`;
      eventos.push({ uid: `ayuno-${periodo.id}-${periodo.inicio}`, titulo, dia: periodo.inicio, dias: periodo.dias });
    }
    periodo = null;
  };

  for (let i = 0; i < dias; i += 1) {
    const iso = addDaysIso(desde, i);
    const dia = computeLiturgicalDay(iso, style);
    for (const fiesta of dia.feasts) {
      if (!FIESTAS_QUE_SE_EXPORTAN.includes(fiesta.rank)) continue;
      eventos.push({ uid: `fiesta-${fiesta.id}-${iso}`, titulo: fiesta.name, dia: iso });
    }
    // Sólo los periodos que son ayuno de verdad, y no los semanales: los
    // miércoles y viernes —también los del Pentecostario— son todas las
    // semanas. Los días sin ayuno (la Semana de la Renovación, los Doce Días)
    // tampoco son algo que haya que apuntar.
    const id =
      isFastDay(dia.fasting) && !SEMANALES.has(dia.fasting.periodId ?? '') ? dia.fasting.periodId : null;
    if (id && periodo?.id === id) {
      periodo.dias += 1;
    } else {
      cerrar();
      if (id) periodo = { id, nombre: dia.fasting.period ?? dia.fasting.label, inicio: iso, dias: 1 };
    }
  }
  cerrar();
  return eventos;
}
