import { useMemo, useState } from 'react';
import { useAsync } from '@/hooks/useAsync';
import { db } from '@/db/db';
import { useLiturgicalDay, useToday } from '@/hooks/useLiturgicalDay';
import { SAINTS_COVERAGE_NOTE, SAINT_CATEGORY_LABELS } from '@/content/saints';
import { ListRow, Loading, PageHead, Section, Segmented, Tag } from '@/components/ui';
import { normalize } from '@/lib/text';
import { formatMonthDay } from '@/lib/format';
import type { SaintCategory } from '@/types';
import es from '@/locales/es';

const FILTERS: Array<{ value: SaintCategory | 'todos'; label: string }> = [
  { value: 'todos', label: es.app.all },
  { value: 'padre', label: SAINT_CATEGORY_LABELS.padre },
  { value: 'monje', label: SAINT_CATEGORY_LABELS.monje },
  { value: 'martir', label: SAINT_CATEGORY_LABELS.martir },
  { value: 'apostol', label: SAINT_CATEGORY_LABELS.apostol },
];

export function SaintsPage() {
  const today = useToday();
  const day = useLiturgicalDay(today);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<SaintCategory | 'todos'>('todos');
  const saints = useAsync(() => db.saints.orderBy('day').toArray(), []);

  const filtered = useMemo(() => {
    const needle = normalize(query);
    return (saints.data ?? []).filter((saint) => {
      if (filter !== 'todos' && !saint.category.includes(filter)) return false;
      if (!needle) return true;
      return normalize(saint.searchText).includes(needle);
    });
  }, [saints.data, query, filter]);

  return (
    <div className="page">
      <PageHead title={es.saints.title} subtitle="Selección de conmemoraciones del año eclesiástico." />

      {day.saints.length > 0 ? (
        <Section title={es.saints.ofTheDay}>
          <div className="list">
            {day.saints.map((saint) => (
              <ListRow
                key={saint.id}
                to={`/calendario/santos/${saint.id}`}
                title={saint.name}
                meta={saint.biography}
                trailing={<Tag tone="gold">Hoy</Tag>}
              />
            ))}
          </div>
        </Section>
      ) : null}

      <div className="stack" style={{ marginTop: 'var(--sp-5)' }}>
        <input
          type="search"
          className="input"
          placeholder={es.saints.search}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          aria-label={es.saints.search}
        />
        <Segmented value={filter} options={FILTERS} onChange={setFilter} label={es.saints.category} />
      </div>

      <Section title={`${filtered.length} ${filtered.length === 1 ? 'santo' : 'santos'}`}>
        {saints.loading ? (
          <Loading />
        ) : (
          <div className="list">
            {filtered.map((saint) => (
              <ListRow
                key={saint.id}
                to={`/calendario/santos/${saint.id}`}
                title={saint.name}
                meta={saint.biography}
                trailing={<Tag>{formatMonthDay(saint.day)}</Tag>}
              />
            ))}
          </div>
        )}
      </Section>

      <p className="source-note">{SAINTS_COVERAGE_NOTE}</p>
    </div>
  );
}
