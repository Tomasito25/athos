/**
 * Hábitos espirituales.
 *
 * Una cuadrícula de memoria, no un marcador. No hay rachas destacadas, ni
 * medallas, ni comparación con nadie: sólo lo que ha ocurrido.
 */
import { useMemo, useState } from 'react';
import { useAsync } from '@/hooks/useAsync';
import {
  deleteHabit,
  habitEntriesBetween,
  listHabits,
  newId,
  saveHabit,
  toggleHabit,
} from '@/db/user';
import { useToday } from '@/hooks/useLiturgicalDay';
import { addDaysIso, isoToCivil } from '@/lib/calendar/jdn';
import { MONTHS, WEEKDAYS_NARROW } from '@/lib/format';
import {
  Button,
  CheckCircle,
  Dialog,
  Field,
  Loading,
  PageHead,
  Panel,
  Section,
  Segmented,
  Switch,
} from '@/components/ui';
import { IconPlus, IconTrash } from '@/components/icons';
import { useUi } from '@/stores/ui';
import type { Habit } from '@/types';
import es from '@/locales/es';

type Range = 'semana' | 'mes' | 'ano';

const RANGES: Array<{ value: Range; label: string }> = [
  { value: 'semana', label: es.habits.week },
  { value: 'mes', label: es.habits.month },
  { value: 'ano', label: es.habits.year },
];

const RANGE_DAYS: Record<Range, number> = { semana: 7, mes: 30, ano: 365 };

export function HabitsPage() {
  const today = useToday();
  const toast = useUi((s) => s.toast);
  const [range, setRange] = useState<Range>('semana');
  const [editing, setEditing] = useState<Habit | null>(null);
  const [managing, setManaging] = useState(false);

  const habits = useAsync(() => listHabits(), [editing]);
  const from = addDaysIso(today, -(RANGE_DAYS[range] - 1));
  const entries = useAsync(() => habitEntriesBetween(from, today), [from, today, range]);

  const dates = useMemo(
    () => Array.from({ length: RANGE_DAYS[range] }, (_, index) => addDaysIso(from, index)),
    [from, range],
  );

  const doneSet = useMemo(
    () => new Set((entries.data ?? []).filter((e) => e.done).map((e) => `${e.habitId}|${e.date}`)),
    [entries.data],
  );

  const active = (habits.data ?? []).filter((habit) => habit.active);

  if (habits.loading) return <Loading />;

  return (
    <div className="page">
      <PageHead
        title={es.habits.title}
        subtitle={es.habits.subtitle}
        actions={
          <Button size="sm" onClick={() => setManaging(true)}>
            {es.habits.manage}
          </Button>
        }
      />

      <Segmented value={range} options={RANGES} onChange={setRange} label={es.habits.week} />

      <Section title={es.app.today}>
        <div className="list">
          {active.map((habit) => {
            const done = doneSet.has(`${habit.id}|${today}`);
            return (
              <button
                key={habit.id}
                type="button"
                className="list-item"
                aria-pressed={done}
                onClick={async () => {
                  await toggleHabit(habit.id, today);
                  entries.reload();
                }}
              >
                <CheckCircle done={done} />
                <span className="list-item__body">
                  <span
                    className="list-item__title"
                    style={{ opacity: done ? 0.6 : 1 }}
                  >
                    {habit.name}
                  </span>
                  {habit.description ? <span className="list-item__meta">{habit.description}</span> : null}
                </span>
              </button>
            );
          })}
        </div>
      </Section>

      <Section title={range === 'semana' ? es.habits.week : range === 'mes' ? es.habits.month : es.habits.year}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ borderCollapse: 'collapse', width: '100%', minWidth: range === 'semana' ? undefined : '44rem' }}>
            <caption className="sr-only">
              Registro de hábitos desde {from} hasta {today}
            </caption>
            <thead>
              <tr>
                <th scope="col" className="eyebrow" style={{ textAlign: 'start', padding: 'var(--sp-2)' }}>
                  Hábito
                </th>
                {dates.map((date) => {
                  const civil = isoToCivil(date);
                  return (
                    <th
                      key={date}
                      scope="col"
                      className="eyebrow"
                      style={{ padding: '2px', fontWeight: 400, fontSize: '0.6rem' }}
                      title={date}
                    >
                      {range === 'semana'
                        ? WEEKDAYS_NARROW[new Date(date).getDay()]
                        : range === 'mes'
                          ? civil.day
                          : civil.day === 1
                            ? MONTHS[civil.month - 1].slice(0, 1).toUpperCase()
                            : ''}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {active.map((habit) => (
                <tr key={habit.id}>
                  <th
                    scope="row"
                    style={{
                      textAlign: 'start',
                      padding: 'var(--sp-2)',
                      fontWeight: 400,
                      fontSize: 'var(--text-sm)',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {habit.name}
                  </th>
                  {dates.map((date) => {
                    const done = doneSet.has(`${habit.id}|${date}`);
                    return (
                      <td key={date} style={{ padding: 1, textAlign: 'center' }}>
                        <button
                          type="button"
                          aria-label={`${habit.name}, ${date}: ${done ? 'hecho' : 'sin marcar'}`}
                          aria-pressed={done}
                          onClick={async () => {
                            await toggleHabit(habit.id, date);
                            entries.reload();
                          }}
                          style={{
                            width: range === 'ano' ? 6 : 14,
                            height: 14,
                            borderRadius: 2,
                            background: done ? 'var(--gold)' : 'var(--surface-sunken)',
                            border: '1px solid var(--line)',
                            display: 'block',
                            margin: '0 auto',
                          }}
                        />
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="muted text-sm" style={{ marginTop: 'var(--sp-3)' }}>
          {es.habits.noCompetition}
        </p>
      </Section>

      <Dialog open={managing} onClose={() => setManaging(false)} title={es.habits.manage}>
        <div className="list">
          {(habits.data ?? []).map((habit) => (
            <div className="list-item" key={habit.id}>
              <span className="list-item__body">
                <span className="list-item__title">{habit.name}</span>
                <span className="list-item__meta">
                  {habit.cadence === 'daily'
                    ? es.habits.cadenceDaily
                    : habit.cadence === 'weekly'
                      ? es.habits.cadenceWeekly
                      : es.habits.cadenceOccasional}
                </span>
              </span>
              <button
                type="button"
                className="icon-btn"
                aria-label={habit.active ? 'Desactivar' : 'Activar'}
                aria-pressed={habit.active}
                onClick={async () => {
                  await saveHabit({ ...habit, active: !habit.active });
                  habits.reload();
                }}
              >
                <CheckCircle done={habit.active} />
              </button>
              {!habit.builtIn ? (
                <button
                  type="button"
                  className="icon-btn"
                  aria-label={es.app.delete}
                  onClick={async () => {
                    await deleteHabit(habit.id);
                    habits.reload();
                  }}
                >
                  <IconTrash size={18} />
                </button>
              ) : null}
            </div>
          ))}
        </div>

        <Button
          style={{ marginTop: 'var(--sp-4)' }}
          onClick={() =>
            setEditing({
              id: newId(),
              name: '',
              order: (habits.data?.length ?? 0) + 1,
              active: true,
              cadence: 'daily',
              builtIn: false,
            })
          }
        >
          <IconPlus size={16} /> {es.habits.newHabit}
        </Button>
      </Dialog>

      <Dialog
        open={Boolean(editing)}
        onClose={() => setEditing(null)}
        title={es.habits.newHabit}
        footer={
          <>
            <Button variant="ghost" onClick={() => setEditing(null)}>
              {es.app.cancel}
            </Button>
            <Button
              variant="primary"
              disabled={!editing?.name.trim()}
              onClick={async () => {
                if (!editing) return;
                await saveHabit(editing);
                setEditing(null);
                habits.reload();
                toast('Hábito guardado');
              }}
            >
              {es.app.save}
            </Button>
          </>
        }
      >
        {editing ? (
          <div className="stack">
            <Field label={es.habits.habitName}>
              {(id) => (
                <input
                  id={id}
                  className="input"
                  value={editing.name}
                  onChange={(event) => setEditing({ ...editing, name: event.target.value })}
                />
              )}
            </Field>
            <Field label={es.habits.cadence}>
              {(id) => (
                <select
                  id={id}
                  className="select"
                  value={editing.cadence}
                  onChange={(event) =>
                    setEditing({ ...editing, cadence: event.target.value as Habit['cadence'] })
                  }
                >
                  <option value="daily">{es.habits.cadenceDaily}</option>
                  <option value="weekly">{es.habits.cadenceWeekly}</option>
                  <option value="occasional">{es.habits.cadenceOccasional}</option>
                </select>
              )}
            </Field>
            <Panel variant="quiet">
              <Switch
                checked={editing.active}
                onChange={(value) => setEditing({ ...editing, active: value })}
                title={es.habits.active}
              />
            </Panel>
          </div>
        ) : null}
      </Dialog>
    </div>
  );
}
