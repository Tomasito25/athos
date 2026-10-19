/**
 * La vida de unos santos, leída de la base de datos.
 *
 * El calendario sólo carga el índice del santoral —nombres, días, rangos—,
 * porque las vidas son casi todo su peso. Donde se enseña un trozo de la vida
 * junto al nombre, se lee aquí de IndexedDB, que ya la tiene sembrada.
 */
import { db } from '@/db/db';
import { useAsync } from './useAsync';

export function useSaintLives(ids: string[]): Record<string, string> {
  const { data } = useAsync(async () => {
    const filas = await db.saints.bulkGet(ids);
    return Object.fromEntries(
      filas.flatMap((santo) => (santo ? [[santo.id, santo.biography] as const] : [])),
    );
  }, [ids.join(',')]);
  return data ?? {};
}
