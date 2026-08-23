import { Link, useParams } from 'react-router-dom';
import { useLiturgicalDay, useToday } from '@/hooks/useLiturgicalDay';
import { SEASON_LABELS } from '@/lib/calendar/liturgical';
import { ALLOWANCE_LABELS, FASTING_DISCLAIMER } from '@/lib/calendar/fasting';
import { addDaysIso } from '@/lib/calendar/jdn';
import { formatChurchDate, formatLongDate, fastTone, relativeDayLabel, toneLabel } from '@/lib/format';
import { ListRow, PageHead, Panel, Section, Tag } from '@/components/ui';
import { IconChevronLeft, IconChevronRight } from '@/components/icons';
import es from '@/locales/es';

/** Ficha completa de un día del año litúrgico. */
export function DayPage() {
  const { date = '' } = useParams();
  const today = useToday();
  const day = useLiturgicalDay(date);
  const relative = relativeDayLabel(date, today);

  return (
    <div className="page page--reading">
      <PageHead
        eyebrow={relative ?? SEASON_LABELS[day.season]}
        title={formatLongDate(date)}
        subtitle={`${es.calendar.churchDate}: ${formatChurchDate(day.church)} · ${
          day.calendarStyle === 'juliano' ? es.calendar.styleOld : es.calendar.styleNew
        }`}
      />

      <div className="tag-row">
        <Tag tone="gold">{SEASON_LABELS[day.season]}</Tag>
        <Tag>{toneLabel(day.tone)}</Tag>
        <Tag tone={fastTone(day)}>{day.fasting.label}</Tag>
      </div>

      {day.feasts.length > 0 ? (
        <Section title={es.calendar.feasts}>
          <div className="stack stack--tight">
            {day.feasts.map((feast) => (
              <Panel key={feast.id} variant="quiet">
                <p className="panel__title">{feast.name}</p>
                {feast.description ? <p className="muted text-sm">{feast.description}</p> : null}
              </Panel>
            ))}
          </div>
        </Section>
      ) : null}

      <Section title={es.calendar.saints}>
        {day.saints.length ? (
          <div className="list">
            {day.saints.map((saint) => (
              <ListRow
                key={saint.id}
                to={`/calendario/santos/${saint.id}`}
                title={saint.name}
                meta={saint.biography}
              />
            ))}
          </div>
        ) : (
          <p className="muted text-sm">{es.home.noSaint}</p>
        )}
      </Section>

      <Section title={es.fasting.title}>
        <Panel>
          <p className="panel__title">{day.fasting.label}</p>
          <p className="muted text-sm">{day.fasting.reason}</p>
          <div className="tag-row" style={{ marginTop: 'var(--sp-3)' }}>
            {ALLOWANCE_LABELS.map(({ key, label }) => (
              <Tag key={key} tone={day.fasting.allowance[key] ? 'green' : 'red'}>
                {day.fasting.allowance[key] ? '✓' : '✕'} {label}
              </Tag>
            ))}
          </div>
          <p className="source-note">{FASTING_DISCLAIMER}</p>
        </Panel>
      </Section>

      <Section title={es.calendar.readings} action={{ label: 'Abrir', to: '/leer/lecturas' }}>
        {day.readings ? (
          <div className="list">
            {day.readings.readings.map((reading) => (
              <ListRow
                key={`${reading.kind}-${reading.reference}`}
                to="/leer/lecturas"
                title={reading.reference}
                meta={reading.kind === 'evangelio' ? es.home.gospel : es.home.epistle}
              />
            ))}
          </div>
        ) : (
          <p className="muted text-sm">{es.app.pending}</p>
        )}
      </Section>

      <p className="muted text-sm">{es.home.pascha.replace('{{date}}', formatLongDate(day.paschaDate))}</p>

      <nav className="row row--between" style={{ marginTop: 'var(--sp-5)' }} aria-label="Cambiar de día">
        <Link className="btn" to={`/calendario/dia/${addDaysIso(date, -1)}`}>
          <IconChevronLeft size={16} /> Anterior
        </Link>
        <Link className="btn" to={`/calendario/dia/${addDaysIso(date, 1)}`}>
          Siguiente <IconChevronRight size={16} />
        </Link>
      </nav>
    </div>
  );
}
