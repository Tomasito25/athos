/**
 * Cuántas oraciones ofrece cada momento: las suyas y las que también sirven.
 *
 * Se leen sólo las claves del índice: para contar no hace falta traerse el
 * texto de cientos de oraciones.
 */
import { useMemo } from 'react';
import { useAsync } from '@/hooks/useAsync';
import { db } from '@/db/db';
import { PRAYERS_ALSO } from '@/content/prayer-categories';

export function useCategoryCounts(): Map<string, number> {
  const claves = useAsync(() => db.prayers.orderBy('category').keys(), []);

  return useMemo(() => {
    const cuentas = new Map<string, number>();
    if (!claves.data) return cuentas;
    for (const clave of claves.data) {
      const id = String(clave);
      cuentas.set(id, (cuentas.get(id) ?? 0) + 1);
    }
    for (const [id, lista] of Object.entries(PRAYERS_ALSO)) {
      cuentas.set(id, (cuentas.get(id) ?? 0) + (lista?.length ?? 0));
    }
    return cuentas;
  }, [claves.data]);
}
