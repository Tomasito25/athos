/**
 * Calendario litúrgico.
 *
 * Una rejilla mensual sobria en la que cada día lleva las marcas que importan:
 * grado de ayuno, gran fiesta y conmemoración. Debajo, el detalle del día
 * seleccionado.
 */
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  monthOfLiturgicalDays,
  CALENDAR_STYLE_LABELS,
  CALENDAR_STYLE_NOTE,
  SEASON_LABELS,
} from '@/lib/calendar/liturgical';
import { isoToCivil, monthDay } from '@/lib/calendar/jdn';
import { useSettings } from '@/stores/settings';
import { useLiturgicalDay, useToday } from '@/hooks/useLiturgicalDay';
import { Button, Panel, Section, Segmented, Tag } from '@/components/ui';
import { HubHero } from '@/components/hub';
import {
  IconBook,
  IconCalendar,
  IconCandle,
  IconChevronLeft,
  IconChevronRight,
  IconFast,
  OrthodoxCross,
} from '@/components/icons';
import { MONTHS, fastTone, formatChurchDate, formatLongDate } from '@/lib/format';
import { FASTING_DISCLAIMER } from '@/lib/calendar/fasting';
import type { CalendarStyle } from '@/types';
import es from '@/locales/es';

export function CalendarPage() {
  const today = useToday();
  const hoy = useLiturgicalDay(today);
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

  const selectedDay = useMemo(() => days.find((d) => d.date === selected) ?? days[0], [days, selected]);

  // La rejilla empieza en lunes, como los calendarios impresos en España.
  const leadingBlanks = (days[0].weekday + 6) % 7;

  const shift = (delta: number) => {
    const month = cursor.month + delta;
    const year = cursor.year + Math.floor((month - 1) / 12);
    setCursor({ year, month: ((month - 1 + 12) % 12) + 1 });
  };

  const irAHoy = () => {
    setSelected(today);
    const c = isoToCivil(today);
    setCursor({ year: c.year, month: c.month });
  };

  return (
    <div className="page">
      <HubHero
        icon={IconCalendar}
        title={es.calendar.title}
        subtitle={`${formatLongDate(today)} · ${SEASON_LABELS[hoy.season]}`}
      />

      {/* Los destinos hermanos, arriba y a mano. Antes eran cuatro botones al
          pie, debajo de dos párrafos de notas. */}
      <nav className="shortcut-row" aria-label={es.calendar.shortcuts}>
        <button type="button" className="shortcut" onClick={irAHoy}>
          <IconCalendar size={16} /> {es.calendar.today}
        </button>
        <Link className="shortcut" to="/calendario/santos">
          <IconCandle size={16} /> {es.saints.title}
        </Link>
        <Link className="shortcut" to="/calendario/fiestas">
          <OrthodoxCross size={16} /> {es.calendar.feasts}
        </Link>
        <Link className="shortcut" to="/calendario/ayuno">
          <IconFast size={16} /> {es.fasting.title}
        </Link>
        <Link className="shortcut" to="/leer/lecturas">
          <IconBook size={16} /> {es.calendar.readings}
        </Link>
      </nav>

      {/* En escritorio, el mes a un lado y el día elegido al otro: se ve qué
          trae cada día sin tener que bajar después de cada toque. */}
      <div className="cal-layout">
        <div className="cal-month">
          <nav className="cal-nav" aria-label="Cambiar de mes">
            <Button size="sm" onClick={() => shift(-1)} aria-label={es.calendar.previousMonth}>
              <IconChevronLeft size={18} />
            </Button>
            <h2 className="display cal-nav__title">
              {MONTHS[cursor.month - 1]} de {cursor.year}
            </h2>
            <Button size="sm" onClick={() => shift(1)} aria-label={es.calendar.nextMonth}>
              <IconChevronRight size={18} />
            </Button>
          </nav>

          <div role="grid" aria-label={`${MONTHS[cursor.month - 1]} de ${cursor.year}`} className="cal-grid">
            {['L', 'M', 'X', 'J', 'V', 'S', 'D'].map((label, index) => (
              <div key={label + index} role="columnheader" className="cal-grid__head">
                {label}
              </div>
            ))}

            {Array.from({ length: leadingBlanks }, (_, index) => (
              <div key={`blank-${index}`} className="cal-cell cal-cell--blank" />
            ))}

            {days.map((day) => {
              const isToday = day.date === today;
              const isSelected = day.date === selected;
              const great = day.feasts.some((f) => f.rank === 'gran-fiesta' || f.rank === 'pascua');
              const tone = fastTone(day);
              const clases = [
                'cal-cell',
                isToday ? 'cal-cell--today' : '',
                isSelected ? 'cal-cell--selected' : '',
                day.weekday === 0 ? 'cal-cell--sunday' : '',
                great ? 'cal-cell--great' : '',
              ]
                .filter(Boolean)
                .join(' ');

              return (
                <button
                  key={day.date}
                  type="button"
                  role="gridcell"
                  aria-selected={isSelected}
                  aria-label={formatLongDate(day.date)}
                  onClick={() => setSelected(day.date)}
                  className={clases}
                >
                  <span className="cal-cell__num">{isoToCivil(day.date).day}</span>
                  <span className="cal-cell__marks" aria-hidden="true">
                    {great ? <span className="cal-dot cal-dot--gold" /> : null}
                    {tone && tone !== 'gold' ? <span className={`cal-dot cal-dot--${tone}`} /> : null}
                  </span>
                </button>
              );
            })}
          </div>

          <p className="cal-legend">
            <span>
              <span className="cal-dot cal-dot--gold" /> gran fiesta
            </span>
            <span>
              <span className="cal-dot cal-dot--red" /> ayuno estricto
            </span>
            <span>
              <span className="cal-dot cal-dot--blue" /> vino y aceite
            </span>
            <span>
              <span className="cal-dot cal-dot--green" /> pescado o lácteos
            </span>
          </p>
        </div>

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
                    <Link key={saint.id} to={`/calendario/santos/${saint.id}`} className="tap-row">
                      {saint.name}
                    </Link>
                  ))}
                </div>
              ) : null}

              <div className="btn-row" style={{ marginTop: 'var(--sp-4)' }}>
                <Link className="btn btn--primary btn--sm" to={`/calendario/dia/${selectedDay.date}`}>
                  {es.calendar.fullDay}
                </Link>
              </div>
            </Panel>
          </Section>
        ) : null}
      </div>

      {/* El estilo de calendario se elige aquí y en la configuración; con sus
          notas, va plegado: se cambia una vez y no hace falta verlo cada día. */}
      <details className="fold">
        <summary>
          {es.calendar.styleFold}: {CALENDAR_STYLE_LABELS[calendarStyle]}
        </summary>
        <div className="stack">
          <Segmented
            value={calendarStyle}
            label={es.calendar.style}
            options={[
              { value: 'nuevo' as CalendarStyle, label: es.calendar.styleNew },
              {
                value: 'juliano' as CalendarStyle,
                label: es.calendar.styleOld,
              },
            ]}
            onChange={(value) => setSetting('calendarStyle', value)}
          />
          <p className="source-note">{CALENDAR_STYLE_NOTE[calendarStyle]}</p>
          <p className="source-note">{FASTING_DISCLAIMER}</p>
        </div>
      </details>
    </div>
  );
}
