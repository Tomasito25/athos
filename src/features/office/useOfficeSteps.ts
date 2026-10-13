/**
 * Resuelve los pasos de un oficio: cada uno puede traer su propio texto, o
 * apuntar a una oración de la biblioteca, a un orden del libro de oración, a
 * un oficio, akathistos o canon, a un salmo, a las lecturas del día, a una
 * oración escrita por el usuario o a un contador de la oración de Jesús o del
 * komboskini.
 *
 * Los pasos del oficio habitual vienen de la regla guardada; los de las formas
 * breve y extensa, de su definición, que no se guarda.
 */
import { useAsync } from '@/hooks/useAsync';
import { db } from '@/db/db';
import { getPsalm } from '@/db/psalter';
import { ruleItems } from '@/db/user';
import { orderById } from '@/content/prayer-orders';
import { stepsToItems } from '@/content/hours';
import { stepsFor, variantRuleId } from '@/content/office-lengths';
import type { OfficeLength, OfficeSection, RuleItem, RuleTime, SourceMeta, TextBlock } from '@/types';

export interface ResolvedStep {
  item: RuleItem;
  /** Texto que se muestra, venga de donde venga. */
  blocks: TextBlock[];
  /** Subtítulo con la procedencia («Oración de la mañana», «Kathisma 7»…). */
  origin?: string;
  meta?: SourceMeta;
  /** Enlace para abrir el texto completo en su sección. */
  path?: string;
  /** Los pasos de contador se dibujan de otra manera. */
  counter?: 'jesus-prayer' | 'komboskini';
}

const NO_TEXT: TextBlock[] = [
  { kind: 'pending', content: 'Este paso no tiene texto asociado.' },
];

/** Las secciones de un oficio, akathistos o canon, cada una con su título. */
const conTitulos = (secciones: OfficeSection[], solo?: string[]): TextBlock[] =>
  secciones
    .filter((s) => !solo?.length || solo.includes(s.id))
    .flatMap((s): TextBlock[] => [{ kind: 'heading', content: s.title }, ...s.blocks]);

export async function resolveItems(items: RuleItem[]): Promise<ResolvedStep[]> {
  return Promise.all(
    items.map(async (item): Promise<ResolvedStep> => {
      // Lo que un oficio enlazado trae delante, como la rúbrica que dice por
      // dónde empieza la Sexta cuando sigue a la Tercera. Sólo en los oficios:
      // un paso que tuvo texto propio y luego se enlazó con otra cosa no debe
      // arrastrar el texto viejo.
      const delante = item.linkKind === 'office' ? (item.blocks ?? []) : [];

      if (item.linkKind === 'jesus-prayer' || item.linkKind === 'komboskini') {
        return { item, blocks: [], counter: item.linkKind };
      }

      if (item.linkKind === 'prayer' && item.linkId) {
        const oracion = await db.prayers.get(item.linkId);
        if (oracion) {
          return {
            item,
            blocks: [...oracion.blocks],
            origin: oracion.subtitle,
            meta: oracion.meta,
            path: `/orar/oraciones/${oracion.id}`,
          };
        }
      }

      if (item.linkKind === 'prayer-order' && item.linkId) {
        const orden = orderById(item.linkId);
        if (orden) {
          // El orden entero dentro del oficio, cada oración con su título.
          return {
            item,
            blocks: [...conTitulos(orden.sections)],
            origin: orden.subtitle,
            meta: orden.meta,
            path: `/orar/oraciones/orden/${orden.id}`,
          };
        }
      }

      if (item.linkKind === 'office' && item.linkId) {
        const oficio = await db.liturgies.get(item.linkId);
        if (oficio) {
          return {
            item,
            blocks: [...delante, ...conTitulos(oficio.sections, item.sections)],
            origin: oficio.subtitle,
            meta: oficio.meta,
            path: `/biblioteca/liturgia/${oficio.id}`,
          };
        }
      }

      if (item.linkKind === 'akathist' && item.linkId) {
        const akathistos = await db.akathists.get(item.linkId);
        if (akathistos) {
          return {
            item,
            blocks: [...conTitulos(akathistos.sections)],
            origin: akathistos.dedication,
            meta: akathistos.meta,
            path: `/biblioteca/akathistos/${akathistos.id}`,
          };
        }
      }

      if (item.linkKind === 'canon' && item.linkId) {
        const canon = await db.canons.get(item.linkId);
        if (canon) {
          return {
            item,
            blocks: [...conTitulos(canon.odes)],
            origin: canon.dedication,
            meta: canon.meta,
            path: `/biblioteca/canones/${canon.id}`,
          };
        }
      }

      if (item.linkKind === 'day-readings') {
        return {
          item,
          blocks: [{ kind: 'day-readings', content: 'Lecturas del día' }],
          path: '/leer/lecturas',
        };
      }

      if (item.linkKind === 'user-prayer' && item.linkId) {
        const propia = await db.user_prayers.get(item.linkId);
        if (propia) {
          const blocks: TextBlock[] = propia.body
            .split(/\n{2,}/)
            .filter(Boolean)
            .map((parrafo, indice) => ({
              kind: 'text',
              content: parrafo.trim(),
              greek: indice === 0 ? propia.greek : undefined,
            }));
          // No hay una pantalla por oración propia: se abre la lista con ésa ya
          // abierta para editar. Antes apuntaba a una ruta que no existía.
          return { item, blocks, origin: 'Oración tuya', path: `/orar/mis-oraciones?editar=${propia.id}` };
        }
      }

      if (item.linkKind === 'psalm' && item.linkId) {
        const salmo = await getPsalm(Number(item.linkId));
        if (salmo) {
          return {
            item,
            blocks: [...salmo.blocks],
            origin: `Kathisma ${salmo.kathisma} · ${salmo.numberHebrew} hebreo`,
            meta: salmo.meta,
            path: `/leer/salterio/${salmo.numberLxx}`,
          };
        }
      }

      // Paso con texto propio, como el comienzo habitual o la despedida.
      return { item, blocks: item.blocks?.length ? item.blocks : NO_TEXT };
    }),
  );
}

/**
 * Los pasos de un oficio en la medida elegida: el habitual, de la regla
 * guardada; el breve y el extenso, de su definición.
 */
export function useOfficeSteps(ruleId: string, time?: RuleTime, length: OfficeLength = 'habitual') {
  return useAsync(async (): Promise<ResolvedStep[]> => {
    if (time && length !== 'habitual') {
      return resolveItems(stepsToItems(variantRuleId(time, length), stepsFor(time, length)));
    }
    return resolveItems(await ruleItems(ruleId));
  }, [ruleId, time, length]);
}
