/**
 * Inicio — el día de hoy.
 *
 * Es la pantalla que se ve cada mañana. Antes era una columna larga en la que
 * la fecha aparecía a media pantalla, había dos botones que repetían la barra
 * de abajo y la regla se resumía en un «0 de 44» que no decía qué faltaba.
 *
 * Ahora va por este orden, que es el de las preguntas de quien la abre:
 *
 * 1. **¿Qué día es?** La oración de Jesús como lema, la fecha, el tiempo
 *    litúrgico, el tono, el ayuno y la fiesta, todo junto arriba.
 * 2. **¿Qué toca rezar?** El oficio de la hora, con su botón.
 * 3. **¿Qué celebra hoy la Iglesia?** El santo, el ayuno y el Evangelio.
 * 4. **¿Cómo voy?** Los tres oficios, cada uno con su avance.
 * 5. **¿A dónde voy ahora?** Los atajos, en teselas, y lo último que se leyó.
 *
 * En escritorio, lo de la Iglesia y lo personal van en dos columnas.
 */
import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useLiturgicalDay, useToday } from '@/hooks/useLiturgicalDay';
import { useAsync } from '@/hooks/useAsync';
import { listHistory } from '@/db/user';
import { SEASON_LABELS } from '@/lib/calendar/liturgical';
import { isoToCivil } from '@/lib/calendar/jdn';
import { fastTone, formatDayMonth, formatLongDate, greeting, toneLabel, WEEKDAYS } from '@/lib/format';
import { isFastDay } from '@/lib/calendar/fasting';
import { officeNow } from '@/lib/office-time';
import { nextGreatFeast } from '@/lib/calendar/next-feast';
import { readingNote, readingTitle } from '@/lib/readings';
import { ListRow, Panel, Section, Tag } from '@/components/ui';
import { Tile, TileGrid } from '@/components/hub';
import { OfficeInvitation } from '@/features/office/OfficeInvitation';
import { useOfficeProgress } from '@/features/office/useOfficeProgress';
import { WelcomeCard } from './WelcomeCard';
import { PericopeText } from '@/components/PericopeText';
import { VerseOfDay } from '@/components/VerseOfDay';
import {
  IconBook,
  IconCandle,
  IconChotki,
  IconCross,
  IconMoon,
  IconPray,
  IconScroll,
  IconStar,
  IconSun,
  OrthodoxCross,
} from '@/components/icons';
import { DAILY_OFFICES } from '@/content/hours';
import { useSettings } from '@/stores/settings';
import type { RuleTime } from '@/types';
import es from '@/locales/es';

const ICONO_DEL_OFICIO: Record<RuleTime, typeof IconSun> = {
  manana: IconSun,
  mediodia: IconCross,
  noche: IconMoon,
};

export function HomePage() {
  const today = useToday();
  const day = useLiturgicalDay(today);
  const history = useAsync(() => listHistory(4), []);

  const lead = day.feasts[0];
  const saint = day.saints[0];
  const gospel = day.readings?.readings.find((r) => r.kind === 'evangelio');
  const epistle = day.readings?.readings.find((r) => r.kind === 'epistola');
  const tono = fastTone(day);
  const proxima = useMemo(() => nextGreatFeast(today, day.calendarStyle), [today, day.calendarStyle]);

  return (
    <div className="page page--home">
      {/* La portada no lleva un título a la vista, pero toda página necesita
          su encabezado de primer nivel, para quien usa lector de pantalla. */}
      <h1 className="sr-only">ATHOS · Inicio</h1>

      <div className="home-top">
        {/* ---------- El día ---------- */}
        <section className="today-hero" aria-labelledby="hoy">
          <p className="today-hero__prayer">
            <span className="home-hero__halo" aria-hidden="true">
              <OrthodoxCross size={22} style={{ color: 'var(--gold)' }} />
            </span>
            <span className="home-hero__prayer">
              Señor Jesucristo, Hijo de Dios, ten misericordia de mí, pecador.
            </span>
          </p>
          <div className="today-hero__divider" aria-hidden="true" />
          <p className="eyebrow">
            {greeting()} · {WEEKDAYS[day.weekday]}
          </p>
          <h2 id="hoy" className="today-hero__date display">
            {formatDayMonth(today)}
          </h2>
          <p className="today-hero__year">{isoToCivil(today).year}</p>

          <div className="tag-row">
            <Tag tone="gold">{SEASON_LABELS[day.season]}</Tag>
            <Tag>{toneLabel(day.tone)}</Tag>
            <Tag tone={tono}>{day.fasting.label}</Tag>
            {day.calendarStyle === 'juliano' ? <Tag tone="blue">{es.calendar.styleOld}</Tag> : null}
          </div>

          {lead ? (
            <Link to={`/calendario/dia/${today}`} className="today-hero__feast">
              {lead.name}
            </Link>
          ) : null}
        </section>

        {/* ---------- Lo que toca rezar ---------- */}
        <OfficeInvitation />
      </div>

      <WelcomeCard />

      <div className="home-grid">
        {/* ---------- La Iglesia, hoy ---------- */}
        <div className="home-col">
          <Section title={es.home.today} action={{ label: es.home.seeDay, to: `/calendario/dia/${today}` }} id="hoy-iglesia">
            <div className="day-cards">
              <Link
                to={saint ? `/calendario/santos/${saint.id}` : '/calendario/santos'}
                className="day-card day-card--wide"
                data-tone="gold"
              >
                <span className="eyebrow">{es.home.saintOfDay}</span>
                <span className="day-card__title">{saint ? saint.name : es.home.noSaint}</span>
                {saint ? <span className="day-card__text">{saint.biography}</span> : null}
                {day.saints.length > 1 ? (
                  <span className="muted text-sm">
                    {day.saints.length === 2
                      ? es.home.oneMoreSaint
                      : es.home.moreSaints.replace('{{count}}', String(day.saints.length - 1))}
                  </span>
                ) : null}
              </Link>

              <Link to="/calendario/ayuno" className="day-card" data-tone={tono}>
                <span className="eyebrow">{es.home.fasting}</span>
                <span className="day-card__title">{day.fasting.label}</span>
                {day.fasting.period && isFastDay(day.fasting) ? (
                  <span className="day-card__text">{day.fasting.period}</span>
                ) : (
                  <span className="day-card__text">{day.fasting.reason}</span>
                )}
              </Link>

              {proxima ? (
                <Link to={`/calendario/dia/${proxima.date}`} className="day-card" data-tone="gold">
                  <span className="eyebrow">{es.home.nextFeast}</span>
                  <span className="day-card__title">{proxima.name}</span>
                  <span className="day-card__text">
                    {proxima.days === 1
                      ? es.home.tomorrow
                      : es.home.inDays.replace('{{count}}', String(proxima.days))}{' '}
                    · {formatDayMonth(proxima.date)}
                  </span>
                </Link>
              ) : null}
            </div>
          </Section>

          {/* ---------- El Evangelio del día ---------- */}
          <Section title={es.home.gospel} action={{ label: es.home.allReadings, to: '/leer/lecturas' }} id="evangelio">
            {gospel ? (
              <Link to="/leer/lecturas" className="panel" style={{ display: 'block', textDecoration: 'none' }}>
                <p className="display" style={{ fontSize: 'var(--text-lg)' }}>
                  {readingTitle(gospel.reference)}
                </p>
                {gospel.note ? <p className="rubric">{readingNote(gospel.note)}</p> : null}
                <div style={{ marginTop: 'var(--sp-3)' }}>
                  <PericopeText reference={gospel.reference} compact maxVerses={4} />
                </div>
                <p className="section__action" style={{ marginTop: 'var(--sp-2)', paddingInline: 0 }}>
                  {es.home.readWhole}
                </p>
              </Link>
            ) : (
              <Panel variant="quiet">
                <p className="muted text-sm">{es.app.pending}</p>
              </Panel>
            )}

            {epistle ? (
              <Link to="/leer/lecturas" className="reading-card" style={{ marginTop: 'var(--sp-3)' }}>
                <span className="reading-card__icon" aria-hidden="true">
                  <IconScroll size={18} />
                </span>
                <span className="reading-card__body">
                  <span className="eyebrow">{es.home.epistle}</span>
                  <span className="reading-card__ref">{readingTitle(epistle.reference)}</span>
                </span>
              </Link>
            ) : null}
          </Section>
        </div>

        {/* ---------- Lo tuyo ---------- */}
        <div className="home-col">
          <TodayOffices today={today} />

          <Section title={es.home.quickActions} id="accesos">
            <TileGrid>
              <Tile to="/orar/oraciones" icon={IconPray} title={es.prayers.title} hint={es.home.quickPrayers} />
              <Tile to="/orar/oracion-de-jesus" icon={IconChotki} title={es.home.jesusPrayer} hint={es.home.quickJesus} />
              <Tile to="/leer/salterio" icon={IconScroll} title={es.psalter.title} hint={es.home.quickPsalter} />
              <Tile to="/leer/biblia" icon={IconBook} title={es.bible.title} hint={es.home.quickBible} />
              <Tile to="/calendario/santos" icon={IconCandle} title={es.saints.title} hint={es.home.quickSaints} />
              <Tile to="/favoritos" icon={IconStar} title={es.favorites.title} hint={es.home.quickFavorites} />
            </TileGrid>
          </Section>

          {history.data && history.data.length > 0 ? (
            <Section title={es.home.continueReading} id="historial">
              <div className="list">
                {history.data.map((entry) => (
                  <ListRow key={entry.id} to={entry.path} title={entry.title} meta={entry.kind} />
                ))}
              </div>
            </Section>
          ) : null}

          {/* La frase que uno se lleva puesta el resto del día. */}
          <VerseOfDay />
        </div>
      </div>

      <p className="muted text-sm text-center" style={{ marginTop: 'var(--sp-6)' }}>
        {es.home.pascha.replace('{{date}}', formatLongDate(day.paschaDate))}
      </p>
    </div>
  );
}

/** Los tres oficios del día, cada uno con su avance y su enlace. */
function TodayOffices({ today }: { today: string }) {
  const progreso = useOfficeProgress(today);
  const horas = useSettings((s) => s.officeHours);
  const ahora = officeNow(new Date().getHours(), horas);

  return (
    <Section title={es.home.rule} action={{ label: es.home.editRule, to: '/orar/regla' }} id="regla">
      <div className="office-rows">
        {DAILY_OFFICES.map((oficio) => {
          const p = progreso.data?.get(oficio.time);
          const ratio = p?.ratio ?? 0;
          const hecho = ratio >= 1;
          const esAhora = oficio.time === ahora;
          const Icono = ICONO_DEL_OFICIO[oficio.time];
          const estado = hecho
            ? es.home.officeDone
            : ratio > 0
              ? `${Math.round(ratio * 100)} %`
              : esAhora
                ? es.prayers.now
                : es.home.officePending;
          return (
            <Link
              key={oficio.time}
              to={`/orar/oficio/${oficio.time}`}
              className={`office-row${esAhora ? ' office-row--now' : ''}${hecho ? ' office-row--done' : ''}`}
            >
              <Icono size={20} className="office-row__icon" aria-hidden="true" />
              <span className="office-row__name">{oficio.name}</span>
              <span className="office-row__state">{estado}</span>
              <span className="office-row__bar" aria-hidden="true">
                <span style={{ width: `${Math.round(ratio * 100)}%` }} />
              </span>
            </Link>
          );
        })}
      </div>
    </Section>
  );
}
