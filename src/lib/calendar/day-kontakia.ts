/**
 * Qué kontakion se dice hoy en las Horas.
 *
 * En las Horas, después del Padre Nuestro, va «el kontakion del día». La
 * regla, en lo que importa aquí, es ésta:
 *
 * - En la **Semana Luminosa** no hay Horas ordinarias: se cantan las de
 *   Pascua, que llevan el kontakion de Pascua.
 * - En los **días de diario de la Gran Cuaresma**, si no cae una gran fiesta,
 *   el Horologion no pone kontakion: pone unos troparios propios de cada Hora,
 *   y en la cuarta semana añade el kontakion del domingo de la Cruz.
 * - En una **fiesta móvil**, el suyo.
 * - Los **domingos**, el de la Resurrección del tono, salvo que una fiesta
 *   del Señor ocupe el domingo.
 * - Y **cada día**, el del santo o la fiesta fija si ATHOS lo tiene.
 * - Cuando no hay ni santo con kontakion ni fiesta, el del día de la semana:
 *   los ángeles el lunes, el Precursor el martes, la Cruz el miércoles y el
 *   viernes, los apóstoles y san Nicolás el jueves, los mártires y los
 *   difuntos el sábado.
 *
 * La función es pura para poder probarla día a día.
 */
import type { LiturgicalDay, SaintCategory, TextBlock } from '@/types';
import {
  LENTEN_CROSS_KONTAKION,
  LENTEN_HOURS,
  MOVABLE_KONTAKIA,
  RESURRECTION_KONTAKIA,
  SAINT_KONTAKIA,
  WEEKDAY_KONTAKIA,
} from '@/content/kontakia';
import { LORD_MOVABLE_FEASTS } from '@/content/troparia-domingo';
import { isoToJdn } from './jdn';
import { paschaJdn } from './pascha';

export interface DayKontakionItem {
  /** Por quién o por qué se dice: «San Nicolás», «Domingo, tono 3». */
  occasion: string;
  name: string;
  tone: string;
  blocks: TextBlock[];
  origin: 'resurreccion' | 'fiesta-movil' | 'fiesta' | 'santo' | 'semana';
  eslavo?: boolean;
}

export type DayKontakia =
  | { kind: 'luminosa'; items: DayKontakionItem[] }
  | { kind: 'cuaresma'; blocks: TextBlock[]; cuartaSemana: boolean }
  | { kind: 'kontakia'; items: DayKontakionItem[]; sinPropio: string[] };

const ES_FIESTA_DEL_SENOR_O_THEOTOKOS = (cats: SaintCategory[]) =>
  cats.length > 0 && cats.every((c) => c === 'senor' || c === 'theotokos');

/**
 * La cuarta semana de la Cuaresma: del lunes al viernes después del domingo de
 * la Cruz. `paschaOffset` se cuenta desde la Pascua anterior; aquí hace falta
 * la distancia a la siguiente.
 */
const esCuartaSemana = (day: LiturgicalDay) => {
  const hastaPascua = isoToJdn(day.date) - paschaJdn(Number(day.paschaDate.slice(0, 4)) + 1);
  return hastaPascua >= -27 && hastaPascua <= -23;
};

function deCuaresma(day: LiturgicalDay, hora: string | undefined): TextBlock[] {
  const h = LENTEN_HOURS[hora ?? ''];
  if (!h) return [];
  const miercolesOViernes = day.weekday === 3 || day.weekday === 5;
  const propio = miercolesOViernes ? h.miercolesViernes : h.lunesMartesJueves;
  return [...h.comun, ...(propio ?? [])];
}

export function kontakiaForDay(day: LiturgicalDay, hora?: string): DayKontakia {
  if (day.paschaOffset >= 0 && day.paschaOffset <= 6) {
    const pascua = MOVABLE_KONTAKIA.pascua!;
    return { kind: 'luminosa', items: [{ occasion: 'Pascua', ...pascua, origin: 'fiesta-movil' }] };
  }

  const santos = [...day.saints].sort(
    (a, b) =>
      Number(ES_FIESTA_DEL_SENOR_O_THEOTOKOS(b.category)) -
      Number(ES_FIESTA_DEL_SENOR_O_THEOTOKOS(a.category)),
  );
  const hayGranFiesta = santos.some(
    (s) => ES_FIESTA_DEL_SENOR_O_THEOTOKOS(s.category) && SAINT_KONTAKIA[s.id] !== undefined,
  );

  const diarioDeCuaresma = day.season === 'gran-cuaresma' && day.weekday >= 1 && day.weekday <= 5;
  if (diarioDeCuaresma && !hayGranFiesta) {
    return { kind: 'cuaresma', blocks: deCuaresma(day, hora), cuartaSemana: esCuartaSemana(day) };
  }

  const items: DayKontakionItem[] = [];
  const fiestaDelSenor =
    day.feasts.some((f) => LORD_MOVABLE_FEASTS.has(f.id)) ||
    santos.some((s) => s.category.includes('senor') && SAINT_KONTAKIA[s.id] !== undefined);

  if (day.weekday === 0 && day.tone && !fiestaDelSenor && day.season !== 'semana-santa') {
    items.push({ occasion: `Domingo, tono ${day.tone}`, ...RESURRECTION_KONTAKIA[day.tone]!, origin: 'resurreccion' });
  }

  for (const feast of day.feasts) {
    const kont = MOVABLE_KONTAKIA[feast.id];
    if (kont) items.push({ occasion: feast.name, ...kont, origin: 'fiesta-movil' });
  }

  const sinPropio: string[] = [];
  if (day.season !== 'semana-santa') {
    for (const s of santos) {
      const kont = SAINT_KONTAKIA[s.id];
      if (!kont) {
        sinPropio.push(s.name);
        continue;
      }
      items.push({
        occasion: s.name,
        ...kont,
        origin: ES_FIESTA_DEL_SENOR_O_THEOTOKOS(s.category) ? 'fiesta' : 'santo',
      });
    }
  }

  // Sin nada propio, el del día de la semana.
  if (items.length === 0 && day.weekday >= 1) {
    const semana = WEEKDAY_KONTAKIA[day.weekday]!;
    for (const kont of semana.items) {
      items.push({ occasion: semana.dedicacion, ...kont, origin: 'semana' });
    }
  }

  // El mismo texto no se dice dos veces (la Cruz el 14 de septiembre en miércoles, por ejemplo).
  const vistos = new Set<string>();
  const unicos = items.filter((i) => {
    const clave = i.blocks.map((b) => b.content).join();
    if (vistos.has(clave)) return false;
    vistos.add(clave);
    return true;
  });

  return { kind: 'kontakia', items: unicos, sinPropio };
}

export { LENTEN_CROSS_KONTAKION };
