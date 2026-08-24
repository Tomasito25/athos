/**
 * Resuelve los pasos de un oficio: cada uno puede traer su propio texto, o
 * apuntar a una oración de la biblioteca, a un salmo, a una oración escrita por
 * el usuario o a un contador de la oración de Jesús o del komboskini.
 */
import { useAsync } from '@/hooks/useAsync';
import { db } from '@/db/db';
import { getPsalm } from '@/db/psalter';
import { ruleItems } from '@/db/user';
import type { RuleItem, SourceMeta, TextBlock } from '@/types';

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

export function useOfficeSteps(ruleId: string) {
  return useAsync(async (): Promise<ResolvedStep[]> => {
    const items = await ruleItems(ruleId);

    return Promise.all(
      items.map(async (item): Promise<ResolvedStep> => {
        if (item.linkKind === 'jesus-prayer' || item.linkKind === 'komboskini') {
          return { item, blocks: [], counter: item.linkKind };
        }

        if (item.linkKind === 'prayer' && item.linkId) {
          const oracion = await db.prayers.get(item.linkId);
          if (oracion) {
            return {
              item,
              blocks: oracion.blocks,
              origin: oracion.subtitle,
              meta: oracion.meta,
              path: `/orar/oraciones/${oracion.id}`,
            };
          }
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
            return { item, blocks, origin: 'Oración tuya', path: `/orar/mis-oraciones/${propia.id}` };
          }
        }

        if (item.linkKind === 'psalm' && item.linkId) {
          const salmo = await getPsalm(Number(item.linkId));
          if (salmo) {
            return {
              item,
              blocks: salmo.blocks,
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
  }, [ruleId]);
}
