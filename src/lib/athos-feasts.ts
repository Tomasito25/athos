/**
 * El año de la Montaña: cuándo celebra cada monasterio su fiesta.
 *
 * El Athos sigue el calendario juliano, así que la Anunciación de Vatopedi,
 * el 25 de marzo, cae para el resto del mundo el 7 de abril. Las fechas se
 * convierten pasando por el día juliano, como en el resto del calendario, y
 * no sumando trece días.
 *
 * Dos reglas más. Esfigmenu celebra la Ascensión, que depende de la Pascua.
 * Y san Jorge, el de Zográfu y Xenofontos, no se celebra en Cuaresma: si su
 * día cae antes de la Pascua, la fiesta pasa al lunes de la Semana Luminosa.
 */
import type { Monastery } from '@/types';
import { ATHOS_ICON_FEASTS, type AthosIconFeast } from '@/content/athos-lugares';
import { isoToJdn, jdnToIso, julianToJdn } from './calendar/jdn';
import { paschaJdn } from './calendar/pascha';

export interface AthosFeastDay {
  /** Fecha civil, la del teléfono. */
  date: string;
  /** Días que faltan desde hoy: 0 es hoy. */
  days: number;
  /** La fecha en el calendario de la Montaña, `MM-DD`, si es fija. */
  churchDay?: string;
  name: string;
  kind: 'monasterio' | 'icono';
  /** El monasterio que celebra, si lo hay. */
  monasteryId?: string;
  monasteryName?: string;
  place: string;
  /** Se ha movido de su día: san Jorge en Cuaresma. */
  moved?: boolean;
}

interface Fuente {
  name: string;
  day?: string;
  paschaOffset?: number;
}

const SAN_JORGE = '04-23';

/** El día civil en que cae, en el año eclesiástico `y`, una fiesta de la Montaña. */
function enElAno(f: Fuente, y: number): { jdn: number; moved: boolean } | null {
  if (f.paschaOffset !== undefined) return { jdn: paschaJdn(y) + f.paschaOffset, moved: false };
  if (!f.day) return null;
  const [m, d] = f.day.split('-').map(Number);
  const jdn = julianToJdn(y, m!, d!);
  if (f.day === SAN_JORGE) {
    const pascua = paschaJdn(y);
    if (jdn <= pascua) return { jdn: pascua + 1, moved: true };
  }
  return { jdn, moved: false };
}

/** La próxima vez que se celebra, a partir de `desde` (incluido). */
function proxima(f: Fuente, desde: number): { jdn: number; moved: boolean } | null {
  // El año juliano va trece días por detrás: se miran el anterior, éste y el
  // siguiente, y se queda la primera fecha que no haya pasado.
  const y = Number(jdnToIso(desde).slice(0, 4));
  const candidatas = [y - 1, y, y + 1]
    .map((a) => enElAno(f, a))
    .filter((c): c is { jdn: number; moved: boolean } => c !== null && c.jdn >= desde)
    .sort((a, b) => a.jdn - b.jdn);
  return candidatas[0] ?? null;
}

/**
 * Las fiestas de los veinte monasterios y de los iconos de la Montaña, por
 * orden de fecha a partir de `hoy`.
 */
export function athosFeastCalendar(monasteries: Monastery[], hoy: string): AthosFeastDay[] {
  const desde = isoToJdn(hoy);
  const salida: AthosFeastDay[] = [];

  for (const m of monasteries) {
    const p = proxima(m.feast, desde);
    if (!p) continue;
    salida.push({
      date: jdnToIso(p.jdn),
      days: p.jdn - desde,
      churchDay: m.feast.day,
      name: m.feast.name,
      kind: 'monasterio',
      monasteryId: m.id,
      monasteryName: m.name,
      place: m.name,
      moved: p.moved,
    });
  }

  const nombres = new Map(monasteries.map((m) => [m.id, m.name]));
  for (const icono of ATHOS_ICON_FEASTS) {
    const p = proxima(icono, desde);
    if (!p) continue;
    salida.push(iconDay(icono, p.jdn, desde, nombres));
  }

  return salida.sort((a, b) => a.days - b.days || a.place.localeCompare(b.place, 'es'));
}

function iconDay(icono: AthosIconFeast, jdn: number, desde: number, nombres: Map<string, string>): AthosFeastDay {
  return {
    date: jdnToIso(jdn),
    days: jdn - desde,
    churchDay: icono.day,
    name: icono.name,
    kind: 'icono',
    monasteryId: icono.monastery,
    monasteryName: icono.monastery ? nombres.get(icono.monastery) : undefined,
    place: icono.place,
  };
}

/** La próxima fiesta de un monasterio. */
export function nextMonasteryFeast(m: Monastery, hoy: string): AthosFeastDay | null {
  return athosFeastCalendar([m], hoy).find((f) => f.kind === 'monasterio') ?? null;
}
