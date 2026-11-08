/**
 * Ayuno.
 *
 * Muestra el estado de hoy, los periodos del año y las reglas que ATHOS aplica,
 * con el aviso de que varían según la tradición y las circunstancias.
 */
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLiturgicalDay, useToday } from '@/hooks/useLiturgicalDay';
import { useSettings } from '@/stores/settings';
import { ALLOWANCE_LABELS, FASTING_DISCLAIMER, FAST_LEVELS } from '@/lib/calendar/fasting';
import { computeLiturgicalDay } from '@/lib/calendar/liturgical';
import { addDaysIso } from '@/lib/calendar/jdn';
import { fastTone, formatLongDate } from '@/lib/format';
import { ListRow, Notice, PageHead, Panel, Section, Tag } from '@/components/ui';
import es from '@/locales/es';

const PERIODS = [
  { id: 'gran-cuaresma', name: 'Gran Cuaresma', text: 'Cuarenta días desde el Lunes Puro, seguidos del Sábado de Lázaro, el Domingo de Ramos y la Semana Santa. Es el ayuno más riguroso del año.' },
  { id: 'semana-santa', name: 'Semana Santa', text: 'Xerofagia toda la semana. El Viernes Santo, la tradición recomienda abstenerse de alimento hasta después de los oficios.' },
  { id: 'apostoles', name: 'Ayuno de los Apóstoles', text: 'Del lunes siguiente al Domingo de Todos los Santos hasta la víspera de los santos Pedro y Pablo. Su duración cambia cada año, porque depende de la Pascua: puede no llegar a existir si la Pascua cae muy tarde.' },
  { id: 'dormicion', name: 'Ayuno de la Dormición', text: 'Del 1 al 14 de agosto. Estricto, con pescado el día de la Transfiguración.' },
  { id: 'natividad', name: 'Ayuno de la Natividad', text: 'Del 15 de noviembre al 24 de diciembre. Más suave al principio; del 20 en adelante se suprime el pescado.' },
  { id: 'semanal', name: 'Miércoles y viernes', text: 'Todo el año, en memoria de la traición y de la Crucifixión, salvo en las semanas sin ayuno.' },
  { id: 'sin-ayuno', name: 'Semanas sin ayuno', text: 'Semana de la Renovación, semana de Pentecostés, del 25 de diciembre al 4 de enero y la semana siguiente al Domingo del Publicano y el Fariseo.' },
];

export function FastingPage() {
  const today = useToday();
  const calendarStyle = useSettings((s) => s.calendarStyle);
  const day = useLiturgicalDay(today);
  const [days, setDays] = useState(14);

  const upcoming = useMemo(
    () =>
      Array.from({ length: days }, (_, index) =>
        computeLiturgicalDay(addDaysIso(today, index), calendarStyle),
      ),
    [today, days, calendarStyle],
  );

  return (
    <div className="page">
      <PageHead title={es.fasting.title} subtitle={es.fasting.subtitle} />

      <Panel>
        <p className="eyebrow">{es.app.today}</p>
        <p className="panel__title" style={{ marginTop: 'var(--sp-1)' }}>{day.fasting.label}</p>
        <p className="muted text-sm">{day.fasting.reason}</p>

        <div className="tag-row" style={{ marginTop: 'var(--sp-3)' }}>
          {ALLOWANCE_LABELS.map(({ key, label }) => (
            <Tag key={key} tone={day.fasting.allowance[key] ? 'green' : 'red'}>
              {day.fasting.allowance[key] ? '✓' : '✕'} {label}
            </Tag>
          ))}
        </div>
      </Panel>

      <div style={{ marginTop: 'var(--sp-4)' }}>
        <Notice variant="warn">{FASTING_DISCLAIMER}</Notice>
      </div>

      <Section title={es.fasting.calendar}>
        <div className="list">
          {upcoming.map((entry) => (
            <ListRow
              key={entry.date}
              to={`/calendario/dia/${entry.date}`}
              title={formatLongDate(entry.date)}
              meta={entry.fasting.reason}
              trailing={<Tag tone={fastTone(entry)}>{entry.fasting.label}</Tag>}
            />
          ))}
        </div>
        <div className="btn-row" style={{ marginTop: 'var(--sp-3)' }}>
          <button type="button" className="btn btn--sm" onClick={() => setDays((n) => n + 14)}>
            Ver más días
          </button>
        </div>
      </Section>

      <Section title={es.fasting.periods}>
        <div className="stack stack--tight">
          {PERIODS.map((period) => (
            <Panel key={period.id} variant="quiet">
              <p className="panel__title">{period.name}</p>
              <p className="muted text-sm">{period.text}</p>
            </Panel>
          ))}
        </div>
      </Section>

      <Section title="Grados de ayuno que emplea ATHOS">
        <div className="list">
          {Object.entries(FAST_LEVELS).map(([level, definition]) => (
            <div className="list-item" key={level}>
              <span className="list-item__body">
                <span className="list-item__title">{definition.label}</span>
                <span className="list-item__meta">
                  {ALLOWANCE_LABELS.filter(({ key }) => definition.allowance[key])
                    .map(({ label }) => label)
                    .join(', ') || 'Nada de lo anterior'}
                </span>
              </span>
            </div>
          ))}
        </div>
      </Section>

      <p className="source-note">
        Las reglas siguen la lectura habitual del Typikon. Puedes cambiar el calendario en{' '}
        <Link to="/configuracion">{es.nav.settings}</Link>.
      </p>
    </div>
  );
}
