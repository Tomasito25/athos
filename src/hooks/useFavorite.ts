/** Alterna un favorito y refleja su estado en la interfaz. */
import { useCallback, useEffect, useState } from 'react';
import type { Favorite, FavoriteKind } from '@/types';
import { isFavorite, toggleFavorite } from '@/db/user';
import { useUi } from '@/stores/ui';
import es from '@/locales/es';

export function useFavorite(entry: Omit<Favorite, 'id' | 'createdAt'> | null) {
  const [active, setActive] = useState(false);
  const toast = useUi((s) => s.toast);

  useEffect(() => {
    let alive = true;
    if (!entry) return;
    isFavorite(entry.kind, entry.refId).then((value) => {
      if (alive) setActive(value);
    });
    return () => {
      alive = false;
    };
  }, [entry?.kind, entry?.refId]); // eslint-disable-line react-hooks/exhaustive-deps

  const toggle = useCallback(async () => {
    if (!entry) return;
    const next = await toggleFavorite(entry);
    setActive(next);
    toast(next ? es.favorites.add : es.favorites.remove);
  }, [entry, toast]);

  return { active, toggle };
}

export function favoriteEntry(
  kind: FavoriteKind,
  refId: string,
  title: string,
  path: string,
  subtitle?: string,
): Omit<Favorite, 'id' | 'createdAt'> {
  return { kind, refId, title, subtitle, path };
}
