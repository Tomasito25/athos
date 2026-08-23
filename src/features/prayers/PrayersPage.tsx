import { useMemo, useState } from 'react';
import { useAsync } from '@/hooks/useAsync';
import { db } from '@/db/db';
import { listFavorites } from '@/db/user';
import { ListRow, Loading, PageHead, Section, StatusTag } from '@/components/ui';
import { PRAYER_CATEGORIES, PRAYER_LICENSE_NOTE } from '@/content/prayers';
import { normalize } from '@/lib/text';
import es from '@/locales/es';

/** Índice de la biblioteca de oraciones. */
export function PrayersPage() {
  const [query, setQuery] = useState('');
  const prayers = useAsync(() => db.prayers.orderBy('order').toArray(), []);
  const favorites = useAsync(() => listFavorites('prayer'), []);

  const filtered = useMemo(() => {
    if (!prayers.data) return [];
    const needle = normalize(query);
    if (!needle) return prayers.data;
    return prayers.data.filter((p) => normalize(`${p.title} ${p.searchText}`).includes(needle));
  }, [prayers.data, query]);

  const byCategory = useMemo(() => {
    const map = new Map<string, number>();
    for (const prayer of prayers.data ?? []) {
      map.set(prayer.category, (map.get(prayer.category) ?? 0) + 1);
    }
    return map;
  }, [prayers.data]);

  return (
    <div className="page">
      <PageHead title={es.prayers.title} subtitle={es.prayers.subtitle} />

      <input
        type="search"
        className="input"
        placeholder="Buscar una oración…"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        aria-label="Buscar una oración"
      />

      {prayers.loading ? <Loading /> : null}

      {query.trim() ? (
        <Section title={es.prayers.count_other.replace('{{count}}', String(filtered.length))}>
          <div className="list">
            {filtered.map((prayer) => (
              <ListRow
                key={prayer.id}
                to={`/orar/oraciones/${prayer.id}`}
                title={prayer.title}
                meta={prayer.subtitle}
                trailing={<StatusTag status={prayer.status} />}
              />
            ))}
          </div>
        </Section>
      ) : (
        <>
          {favorites.data && favorites.data.length > 0 ? (
            <Section title={es.prayers.favorites}>
              <div className="list">
                {favorites.data.slice(0, 5).map((favorite) => (
                  <ListRow key={favorite.id} to={favorite.path} title={favorite.title} meta={favorite.subtitle} />
                ))}
              </div>
            </Section>
          ) : null}

          <Section title={es.prayers.categories}>
            <div className="list">
              {PRAYER_CATEGORIES.map((category) => (
                <ListRow
                  key={category.id}
                  to={`/orar/oraciones/categoria/${category.id}`}
                  title={category.name}
                  meta={category.description}
                  trailing={<span className="pill-count">{byCategory.get(category.id) ?? 0}</span>}
                />
              ))}
            </div>
          </Section>
        </>
      )}

      <p className="source-note" style={{ marginTop: 'var(--sp-6)' }}>
        {PRAYER_LICENSE_NOTE}
      </p>
    </div>
  );
}
