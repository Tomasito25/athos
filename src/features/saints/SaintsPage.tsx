/**
 * El santoral.
 *
 * Desde que el calendario tiene una conmemoración por día, volcar las
 * cuatrocientas en una sola lista no sirve de nada: no se busca un santo
 * hojeando cuatrocientos nombres. Así que la pantalla se recorre por meses y
 * abre por el mes en curso, que es donde está el día de hoy.
 */
import { useMemo, useState } from 'react';
import { useAsync } from '@/hooks/useAsync';
import { db } from '@/db/db';
import { useLiturgicalDay, useToday } from '@/hooks/useLiturgicalDay';
import { SAINTS_COVERAGE_NOTE, SAINT_CATEGORY_LABELS } from '@/content/saints';
import { ListRow, PageHead, Section, Segmented, Tag, SkeletonList } from '@/components/ui';
import { normalize } from '@/lib/text';
import { MONTHS, formatMonthDay } from '@/lib/format';
import type { SaintCategory } from '@/types';
import es from '@/locales/es';

const FILTERS: Array<{ value: SaintCategory | 'todos'; label: string }> = [
  { value: 'todos', label: es.app.all },
  { value: 'padre', label: SAINT_CATEGORY_LABELS.padre },
  { value: 'monje', label: SAINT_CATEGORY_LABELS.monje },
  { value: 'martir', label: SAINT_CATEGORY_LABELS.martir },
  { value: 'apostol', label: SAINT_CATEGORY_LABELS.apostol },
];

const MONTH_SHORT = MONTHS.map((name) => name.slice(0, 3));

export function SaintsPage() {
  const today = useToday();
  const day = useLiturgicalDay(today);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<SaintCategory | 'todos'>('todos');
  // Se abre por el mes eclesiástico del día de hoy, no por el civil: es el que
  // manda en el santoral, y con el calendario juliano no son el mismo.
  const [mes, setMes] = useState<number | 'todo'>(day.church.month);
  const saints = useAsync(() => db.saints.orderBy('day').toArray(), []);

  // Con su propio useMemo: si no, la lista cambia de identidad en cada render
  // y los dos cálculos de abajo se rehacen sin motivo.
  const todos = useMemo(() => saints.data ?? [], [saints.data]);

  // Cuántos hay en cada mes. Va en la píldora, para que se vea que ningún mes
  // está vacío sin tener que entrar a comprobarlo.
  const porMes = useMemo(() => {
    const cuenta = new Array(12).fill(0);
    for (const saint of todos) cuenta[Number(saint.day.slice(0, 2)) - 1] += 1;
    return cuenta;
  }, [todos]);

  const buscando = normalize(query).length > 0;

  const filtered = useMemo(() => {
    const needle = normalize(query);
    return todos.filter((saint) => {
      if (filter !== 'todos' && !saint.category.includes(filter)) return false;
      // Al buscar se busca en el año entero: quien escribe un nombre no está
      // pensando en un mes.
      if (!buscando && mes !== 'todo' && Number(saint.day.slice(0, 2)) !== mes) return false;
      if (!needle) return true;
      return normalize(saint.searchText).includes(needle);
    });
  }, [todos, query, filter, mes, buscando]);

  const titulo = buscando
    ? `${filtered.length} ${filtered.length === 1 ? 'resultado' : 'resultados'}`
    : mes === 'todo'
      ? `${filtered.length} conmemoraciones`
      : `${MONTHS[mes - 1]} · ${filtered.length}`;

  return (
    <div className="page">
      <PageHead
        title={es.saints.title}
        subtitle={`${todos.length} conmemoraciones, al menos una para cada día del año.`}
      />

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

      {buscando ? null : (
        <nav className="scroller" style={{ marginTop: 'var(--sp-3)' }} aria-label={es.saints.byMonth}>
          <button
            type="button"
            className="chip"
            aria-pressed={mes === 'todo'}
            onClick={() => setMes('todo')}
          >
            {es.saints.wholeYear}
          </button>
          {MONTH_SHORT.map((nombre, indice) => (
            <button
              key={nombre}
              type="button"
              className="chip"
              aria-pressed={mes === indice + 1}
              onClick={() => setMes(indice + 1)}
            >
              {nombre}
              <span className="chip__count">{porMes[indice]}</span>
            </button>
          ))}
        </nav>
      )}

      <Section title={titulo}>
        {saints.loading ? (
          <SkeletonList rows={6} />
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
