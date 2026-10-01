/**
 * Qué tropario se canta hoy en las Horas.
 *
 * En las Horas, después de los tres salmos, va «el tropario del día»: lo que
 * el libro llama el apolytíkion. Cuál sea depende del día, y la regla, en lo
 * que importa aquí, es ésta:
 *
 * - En la **Semana Luminosa** —los siete días de Pascua— no hay Horas
 *   ordinarias: se cantan en su lugar las Horas de Pascua.
 * - En los **días de diario de la Gran Cuaresma** no se canta el tropario del
 *   día, sino el propio de cada Hora, con postraciones. Salvo que caiga una
 *   gran fiesta, como la Anunciación, que trae el suyo.
 * - En la **Semana Santa**, el de cada día del Triodion.
 * - En una **fiesta móvil**, el de la fiesta.
 * - Los **domingos**, el de la Resurrección del tono de la semana, salvo
 *   cuando una fiesta del Señor ocupa el domingo.
 * - Y **cada día**, el del santo o la fiesta fija: el propio si ATHOS lo
 *   tiene, el general de su rango si no.
 *
 * El Typikon reparte los troparios entre las Horas cuando hay varios; ATHOS
 * los pone todos y lo dice. La función es pura para poder probarla día a día.
 */
import type { LiturgicalDay, SaintCategory, SourceMeta, TextBlock } from '@/types';
import { generalTroparionFor, GENERAL_TROPARION_META } from '@/content/troparia-general';
import { PROPER_TROPARION_META } from '@/content/troparia-santos';
import {
  LORD_MOVABLE_FEASTS,
  MOVABLE_SAINT_OF,
  MOVABLE_TROPARIA,
  OCTOECHOS_META,
  PASCHAL_CYCLE_META,
  RESURRECTION_TROPARIA,
} from '@/content/troparia-domingo';
import { SAINTS } from '@/content/saints';

export interface DayTroparionItem {
  /** Por quién o por qué se canta: «San Nicolás», «Domingo, tono 3». */
  occasion: string;
  name: string;
  tone: string;
  blocks: TextBlock[];
  origin: 'resurreccion' | 'fiesta-movil' | 'fiesta' | 'propio' | 'general';
  meta: SourceMeta;
}

export type DayTroparia =
  | { kind: 'luminosa' }
  | { kind: 'cuaresma' }
  | { kind: 'troparios'; items: DayTroparionItem[] };

const ES_FIESTA_DEL_SENOR_O_THEOTOKOS = (cats: SaintCategory[]) =>
  cats.length > 0 && cats.every((c) => c === 'senor' || c === 'theotokos');

/** Los troparios de los santos y fiestas fijas del día, sin repetir texto. */
function deLosSantos(day: LiturgicalDay): DayTroparionItem[] {
  const items: DayTroparionItem[] = [];
  // Primero las fiestas del Señor y de la Theotokos; después los santos.
  const ordenados = [...day.saints].sort(
    (a, b) =>
      Number(ES_FIESTA_DEL_SENOR_O_THEOTOKOS(b.category)) -
      Number(ES_FIESTA_DEL_SENOR_O_THEOTOKOS(a.category)),
  );
  for (const saint of ordenados) {
    const tr = generalTroparionFor(saint.category, saint.id);
    if (!tr) continue;
    const fiesta = tr.own && ES_FIESTA_DEL_SENOR_O_THEOTOKOS(saint.category);
    items.push({
      occasion: saint.name,
      name: tr.name,
      tone: tr.tone,
      blocks: tr.blocks,
      origin: fiesta ? 'fiesta' : tr.own ? 'propio' : 'general',
      meta: tr.own ? PROPER_TROPARION_META : GENERAL_TROPARION_META,
    });
  }
  return items;
}

/** Las fiestas móviles del día que tienen tropario, propio o de su santo. */
function deLasFiestasMoviles(day: LiturgicalDay): DayTroparionItem[] {
  const items: DayTroparionItem[] = [];
  for (const feast of day.feasts) {
    if (feast.paschaOffset === undefined) continue;
    const propio = MOVABLE_TROPARIA[feast.id];
    if (propio) {
      items.push({
        occasion: feast.name,
        ...propio,
        origin: 'fiesta-movil',
        meta: PASCHAL_CYCLE_META,
      });
      continue;
    }
    const santoId = MOVABLE_SAINT_OF[feast.id];
    const santo = santoId ? SAINTS.find((s) => s.id === santoId) : undefined;
    const tr = santo ? generalTroparionFor(santo.category, santo.id) : null;
    if (santo && tr) {
      items.push({
        occasion: feast.name,
        name: tr.name,
        tone: tr.tone,
        blocks: tr.blocks,
        origin: tr.own ? 'propio' : 'general',
        meta: tr.own ? PROPER_TROPARION_META : GENERAL_TROPARION_META,
      });
    }
  }
  return items;
}

export function troparionsForDay(day: LiturgicalDay): DayTroparia {
  if (day.paschaOffset >= 0 && day.paschaOffset <= 6) return { kind: 'luminosa' };

  const santos = deLosSantos(day);
  const hayGranFiesta = santos.some((s) => s.origin === 'fiesta');

  const diarioDeCuaresma =
    day.season === 'gran-cuaresma' && day.weekday >= 1 && day.weekday <= 5;
  if (diarioDeCuaresma && !hayGranFiesta) return { kind: 'cuaresma' };

  const moviles = deLasFiestasMoviles(day);
  const items: DayTroparionItem[] = [];

  // Una fiesta del Señor desplaza al domingo; una de la Theotokos, no: ese
  // día se cantan los dos troparios.
  const fiestaDelSenorEnDomingo =
    day.feasts.some((f) => LORD_MOVABLE_FEASTS.has(f.id)) ||
    day.saints.some(
      (s) => s.category.includes('senor') && generalTroparionFor(s.category, s.id)?.own === true,
    );
  if (day.weekday === 0 && day.tone && !fiestaDelSenorEnDomingo && day.season !== 'semana-santa') {
    const r = RESURRECTION_TROPARIA[day.tone]!;
    items.push({
      occasion: `Domingo, tono ${day.tone}`,
      ...r,
      origin: 'resurreccion',
      meta: OCTOECHOS_META,
    });
  }
  // El de la Resurrección, primero; después el de la fiesta móvil.
  items.push(...moviles);

  // En la Semana Santa no se cantan los troparios de los santos.
  if (day.season !== 'semana-santa') {
    const vistos = new Set(items.map((i) => i.blocks.map((b) => b.content).join()));
    for (const s of santos) {
      const clave = s.blocks.map((b) => b.content).join();
      if (vistos.has(clave)) continue;
      vistos.add(clave);
      items.push(s);
    }
  }

  return { kind: 'troparios', items };
}
