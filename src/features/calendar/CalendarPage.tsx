/**
 * Calendario litúrgico.
 *
 * Una rejilla mensual sobria en la que cada día lleva las marcas que importan:
 * grado de ayuno, gran fiesta y conmemoración. Debajo, el detalle del día
 * seleccionado.
 */
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { monthOfLiturgicalDays, CALENDAR_STYLE_LABELS, CALENDAR_STYLE_NOTE, SEASON_LABELS } from '@/lib/calendar/liturgical';
import { isoToCivil, monthDay } from '@/lib/calendar/jdn';
import { useSettings } from '@/stores/settings';
import { useToday } from '@/hooks/useLiturgicalDay';
import { Button, PageHead, Panel, Section, Segmented, Tag } from '@/components/ui';
import { IconChevronLeft, IconChevronRight } from '@/components/icons';
import { MONTHS, fastTone, formatChurchDate, formatLongDate } from '@/lib/format';
import { FASTING_DISCLAIMER } from '@/lib/calendar/fasting';
import type { CalendarStyle } from '@/types';
import es from '@/locales/es';

export function CalendarPage() {
  const today = useToday();
  const calendarStyle = useSettings((s) => s.calendarStyle);
  const setSetting = useSettings((s) => s.set);

  const [cursor, setCursor] = useState(() => {
    const { year, month } = isoToCivil(today);
    return { year, month };
  });
  const [selected, setSelected] = useState(today);

  const days = useMemo(
    () => monthOfLiturgicalDays(cursor.year, cursor.month, calendarStyle),
    [cursor.year, cursor.month, calendarStyle],
  );

  const selectedDay = useMemo(
    () => days.find((d) => d.date === selected) ?? days[0],
    [days, selected],
  );

  // La rejilla empieza en lunes, como los calendarios impresos en España.
  const leadingBlanks = (days[0].weekday + 6) % 7;

  const shift = (delta: number) => {
    const month = cursor.month + delta;
    const year = cursor.year + Math.floor((month - 1) / 12);
    setCursor({ year, month: ((month - 1 + 12) % 12) + 1 });
  };

  return (
    <div className="page">
      <PageHead
        title={es.calendar.title}
        subtitle={CALENDAR_STYLE_LABELS[calendarStyle]}
        actions={
          <Segmented
            value={calendarStyle}
            label={es.calendar.style}
            options={[
              { value: 'nuevo' as CalendarStyle, label: es.calendar.styleNew },
              { value: 'juliano' as CalendarStyle, label: es.calendar.styleOld },
            ]}
            onChange={(value) => setSetting('calendarStyle', value)}
          />
        }
      />

      <nav className="row row--between" style={{ marginBottom: 'var(--sp-4)' }} aria-label="Cambiar de mes">
        <Button size="sm" onClick={() => shift(-1)} aria-label={es.calendar.previousMonth}>
          <IconChevronLeft size={18} />
        </Button>
        <h2 className="display" style={{ fontSize: 'var(--text-lg)' }}>
          {MONTHS[cursor.month - 1]} de {cursor.year}
        </h2>
        <Button size="sm" onClick={() => shift(1)} aria-label={es.calendar.nextMonth}>
          <IconChevronRight size={18} />
        </Button>
      </nav>

      <div
        role="grid"
        aria-label={`${MONTHS[cursor.month - 1]} de ${cursor.year}`}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: '2px',
          background: 'var(--line-soft)',
          border: '1px solid var(--line)',
          borderRadius: 'var(--radius)',
          overflow: 'hidden',
        }}
      >
        {['L', 'M', 'X', 'J', 'V', 'S', 'D'].map((label, index) => (
          <div
            key={label + index}
            role="columnheader"
            className="eyebrow text-center"
            style={{ padding: 'var(--sp-2) 0', background: 'var(--surface-sunken)' }}
          >
            {label}
          </div>
        ))}

        {Array.from({ length: leadingBlanks }, (_, index) => (
          <div key={`blank-${index}`} style={{ background: 'var(--surface)', minHeight: '3.4rem' }} />
        ))}

        {days.map((day) => {
          const isToday = day.date === today;
          const isSelected = day.date === selected;
          const great = day.feasts.some((f) => f.rank === 'gran-fiesta' || f.rank === 'pascua');
          const tone = fastTone(day);

          return (
            <button
              key={day.date}
              type="button"
              role="gridcell"
              aria-selected={isSelected}
              aria-label={formatLongDate(day.date)}
              onClick={() => setSelected(day.date)}
              style={{
                position: 'relative',
                minHeight: '3.4rem',
                padding: 'var(--sp-2) 4px 4px',
                background: isSelected ? 'var(--gold-wash)' : 'var(--surface)',
                borderTop: isToday ? '2px solid var(--gold)' : '2px solid transparent',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '3px',
                color: day.weekday === 0 ? 'var(--red)' : 'var(--ink)',
              }}
            >
              <span
                className="display"
                style={{ fontSize: 'var(--text-md)', fontWeight: great ? 600 : 400 }}
              >
                {isoToCivil(day.date).day}
              </span>
              <span style={{ display: 'flex', gap: '2px', height: '5px' }}>
                {great ? (
                  <span
                    aria-hidden="true"
                    style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--gold)' }}
                  />
                ) : null}
                {tone ? (
                  <span
                    aria-hidden="true"
                    style={{
                      width: 5,
                      height: 5,
                      borderRadius: '50%',
                      background: `var(--${tone === 'red' ? 'red' : tone === 'blue' ? 'blue' : 'green'})`,
                    }}
                  />
                ) : null}
              </span>
            </button>
          );
        })}
      </div>

      <p className="muted text-sm" style={{ marginTop: 'var(--sp-3)' }}>
        <span style={{ color: 'var(--gold)' }}>●</span> gran fiesta ·{' '}
        <span style={{ color: 'var(--red)' }}>●</span> ayuno estricto ·{' '}
        <span style={{ color: 'var(--blue)' }}>●</span> vino y aceite ·{' '}
        <span style={{ color: 'var(--green)' }}>●</span> pescado o lácteos
      </p>

      {selectedDay ? (
        <Section title={formatLongDate(selectedDay.date)}>
          <Panel>
            <div className="tag-row" style={{ marginBottom: 'var(--sp-3)' }}>
              <Tag tone="gold">{SEASON_LABELS[selectedDay.season]}</Tag>
              {selectedDay.tone ? <Tag>Tono {selectedDay.tone}</Tag> : null}
              <Tag tone={fastTone(selectedDay)}>{selectedDay.fasting.label}</Tag>
            </div>

            <p className="muted text-sm">
              {es.calendar.churchDate}: {formatChurchDate(selectedDay.church)} ·{' '}
              {monthDay(selectedDay.church)}
            </p>

            {selectedDay.feasts.length > 0 ? (
              <div style={{ marginTop: 'var(--sp-3)' }}>
                <p className="eyebrow">{es.calendar.feasts}</p>
                {selectedDay.feasts.map((feast) => (
                  <p key={feast.id} className="display" style={{ fontSize: 'var(--text-md)' }}>
                    {feast.name}
                  </p>
                ))}
              </div>
            ) : null}

            {selectedDay.saints.length > 0 ? (
              <div style={{ marginTop: 'var(--sp-3)' }}>
                <p className="eyebrow">{es.calendar.saints}</p>
                {selectedDay.saints.map((saint) => (
                  <Link key={saint.id} to={`/calendario/santos/${saint.id}`} style={{ display: 'block' }}>
                    {saint.name}
                  </Link>
                ))}
              </div>
            ) : null}

            <div className="btn-row" style={{ marginTop: 'var(--sp-4)' }}>
              <Link className="btn btn--sm" to={`/calendario/dia/${selectedDay.date}`}>
                Ver el día completo
              </Link>
            </div>
          </Panel>
        </Section>
      ) : null}

      <div className="stack" style={{ marginTop: 'var(--sp-5)' }}>
        <p className="source-note">{CALENDAR_STYLE_NOTE[calendarStyle]}</p>
        <p className="source-note">{FASTING_DISCLAIMER}</p>
      </div>

      <div className="btn-row" style={{ marginTop: 'var(--sp-4)' }}>
        <Link className="btn" to="/calendario/santos">{es.saints.title}</Link>
        <Link className="btn" to="/calendario/ayuno">{es.fasting.title}</Link>
        <Link className="btn" to="/calendario/fiestas">{es.calendar.feasts}</Link>
        <Button size="md" onClick={() => { setSelected(today); const c = isoToCivil(today); setCursor({ year: c.year, month: c.month }); }}>
          {es.calendar.today}
        </Button>
      </div>
    </div>
  );
}
