/**
 * Todas las oraciones, con el buscador.
 *
 * Se llega desde el buscador de la portada de Orar con lo escrito en la dirección:
 * así se puede volver atrás y seguir en la misma búsqueda. Se busca también por el
 * momento: quien escribe «humildad» quiere las de la humildad, aunque la palabra no
 * esté en el título.
 */
import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAsync } from '@/hooks/useAsync';
import { db } from '@/db/db';
import { Empty, ListRow, PageHead, Section, StatusTag, SkeletonList } from '@/components/ui';
import { PRAYER_CATEGORIES } from '@/content/prayer-categories';
import { normalize } from '@/lib/text';
import es from '@/locales/es';

export function AllPrayersPage() {
  const [params, setParams] = useSearchParams();
  const query = params.get('q') ?? '';
  const prayers = useAsync(() => db.prayers.orderBy('order').toArray(), []);

  const nombreCategoria = useMemo(() => new Map(PRAYER_CATEGORIES.map((c) => [c.id, c.name])), []);

  const filtradas = useMemo(() => {
    if (!prayers.data) return [];
    const needle = normalize(query);
    if (!needle) return prayers.data;
    return prayers.data.filter((p) =>
      normalize(`${p.title} ${nombreCategoria.get(p.category) ?? ''} ${p.searchText}`).includes(needle),
    );
  }, [prayers.data, query, nombreCategoria]);

  // Quien escribe «humildad» o «miedo» no busca una oración suelta, sino todas:
  // el momento va primero, con las que también sirven para él.
  const momentos = useMemo(() => {
    const needle = normalize(query);
    return needle.length < 3 ? [] : PRAYER_CATEGORIES.filter((c) => normalize(c.name).includes(needle));
  }, [query]);

  return (
    <div className="page">
      <PageHead eyebrow={es.prayers.title} title={es.prayers.allPrayers} subtitle={es.prayers.searchAll} />

      <input
        type="search"
        className="input"
        placeholder={es.prayers.searchPlaceholder}
        value={query}
        onChange={(event) => setParams(event.target.value ? { q: event.target.value } : {}, { replace: true })}
        aria-label={es.prayers.searchPlaceholder}
      />

      {momentos.length > 0 ? (
        <Section title={es.prayers.moments}>
          <div className="list">
            {momentos.map((c) => (
              <ListRow key={c.id} to={`/orar/oraciones/categoria/${c.id}`} title={c.name} meta={c.description} />
            ))}
          </div>
        </Section>
      ) : null}

      {prayers.loading ? <SkeletonList rows={5} /> : null}

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
