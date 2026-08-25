/**
 * Todas las oraciones, con el buscador.
 *
 * El menú de momentos es la puerta normal; esta página es para quien ya sabe
 * el título que busca.
 */
import { useMemo, useState } from 'react';
import { useAsync } from '@/hooks/useAsync';
import { db } from '@/db/db';
import { Empty, ListRow, Loading, PageHead, Section, StatusTag } from '@/components/ui';
import { PRAYER_CATEGORIES } from '@/content/prayers';
import { normalize } from '@/lib/text';
import es from '@/locales/es';

export function AllPrayersPage() {
  const [query, setQuery] = useState('');
  const prayers = useAsync(() => db.prayers.orderBy('order').toArray(), []);

  const nombreCategoria = useMemo(
    () => new Map(PRAYER_CATEGORIES.map((c) => [c.id, c.name])),
    [],
  );

  const filtradas = useMemo(() => {
    if (!prayers.data) return [];
    const needle = normalize(query);
    if (!needle) return prayers.data;
    return prayers.data.filter((p) => normalize(`${p.title} ${p.searchText}`).includes(needle));
  }, [prayers.data, query]);

  return (
    <div className="page">
      <PageHead eyebrow={es.prayers.title} title={es.prayers.allPrayers} subtitle={es.prayers.searchAll} />

      <input
        type="search"
        className="input"
        placeholder="Buscar una oración…"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        aria-label="Buscar una oración"
      />

      {prayers.loading ? <Loading /> : null}

      {!prayers.loading && filtradas.length === 0 ? (
        <Empty title={es.app.empty} text="Ninguna oración coincide con lo que buscas." />
      ) : (
        <Section title={es.prayers.count_other.replace('{{count}}', String(filtradas.length))}>
          <div className="list">
            {filtradas.map((prayer) => (
              <ListRow
                key={prayer.id}
                to={`/orar/oraciones/${prayer.id}`}
                title={prayer.title}
                meta={prayer.subtitle ?? nombreCategoria.get(prayer.category)}
                trailing={<StatusTag status={prayer.status} />}
              />
            ))}
          </div>
        </Section>
      )}
    </div>
  );
}
