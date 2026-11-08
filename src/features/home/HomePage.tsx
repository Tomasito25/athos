/**
 * Inicio — el día de hoy.
 *
 * Una pantalla, y no cinco. Repetía lo que ya tienen las otras pestañas: seis
 * atajos que eran la barra de abajo, el Evangelio entero, la regla en tres filas
 * con su barra. Ahora contesta sólo a lo que se pregunta al abrirla:
 *
 * 1. **¿Qué día es?** La fecha, la semana, la fiesta, el tono y el ayuno.
 * 2. **¿Qué toca rezar?** El oficio de la hora, con su botón, y debajo cómo van
 *    los tres, en una fila.
 * 3. **¿Qué celebra hoy la Iglesia?** El santo, el Evangelio y la próxima fiesta,
 *    en una lista que lleva a cada cosa.
 * 4. **Una palabra para el día**: el versículo y el apotegma.
 * 5. **Por dónde ibas.**
 */
import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useLiturgicalDay, useToday } from '@/hooks/useLiturgicalDay';
import { useAsync } from '@/hooks/useAsync';
import { listHistory } from '@/db/user';
import { db } from '@/db/db';
import { SEASON_LABELS, weekLabel } from '@/lib/calendar/liturgical';
import { isoToCivil } from '@/lib/calendar/jdn';
import { athosFeastCalendar } from '@/lib/athos-feasts';
import {
  fastTone,
  formatChurchDate,
  formatDayMonth,
  formatLongDate,
  greeting,
  MONTHS,
  toneLabel,
  WEEKDAYS,
} from '@/lib/format';
import { officeNow } from '@/lib/office-time';
import { nextGreatFeast } from '@/lib/calendar/next-feast';
import { readingTitle } from '@/lib/readings';
import { ListRow, Section, Tag } from '@/components/ui';
import { OfficeInvitation } from '@/features/office/OfficeInvitation';
import { useOfficeProgress } from '@/features/office/useOfficeProgress';
import { WelcomeCard } from './WelcomeCard';
import { BackupReminder } from './BackupReminder';
import { VerseOfDay } from '@/components/VerseOfDay';
import { ApophthegmOfDay } from '@/components/ApophthegmOfDay';
import { IconCross, IconMoon, IconSun, OrthodoxCross } from '@/components/icons';
import { DAILY_OFFICES } from '@/content/hours';
import { PlanToday } from '@/features/read/PlanToday';
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
  const semana = weekLabel(day);
  const civil = isoToCivil(today);
  // El tiempo ya va dicho en la semana cuando es el de después de Pentecostés;
  // los ayunos y los periodos con nombre propio sí se enseñan aparte.
  const tiempo = day.season === 'despues-de-pentecostes' && semana ? null : SEASON_LABELS[day.season];

  // La fiesta de la Montaña, de hoy o de mañana. Los monasterios ya están en la
  // base de datos: no hace falta cargar sus textos para saber sus fechas.
  const montes = useAsync(() => db.monasteries.toArray(), []);
  const fiestaAthos = useMemo(
    () => athosFeastCalendar(montes.data ?? [], today).find((f) => f.days <= 1) ?? null,
    [montes.data, today],
  );

  return (
    <div className="page page--home">
      {/* La portada no lleva un título a la vista, pero toda página necesita
          su encabezado de primer nivel, para quien usa lector de pantalla. */}
      <h1 className="sr-only">ATHOS · Inicio</h1>

      <div className="home-top">
        {/* ---------- El día ---------- */}
        <section className="today-hero" aria-labelledby="hoy">
          <p className="today-hero__motto">
            <span className="home-hero__halo" aria-hidden="true">
              <OrthodoxCross size={20} />
            </span>
            <span>Señor Jesucristo, Hijo de Dios, ten misericordia de mí, pecador.</span>
          </p>

          <div className="today-hero__body">
            {/* La hoja del calendario: lo que se ve de un vistazo. */}
            <div className="today-hero__leaf" aria-hidden="true">
              <span className="today-hero__weekday">{WEEKDAYS[day.weekday]}</span>
              <span className="today-hero__daynum">{civil.day}</span>
              <span className="today-hero__month">{MONTHS[civil.month - 1]}</span>
            </div>

            <div className="today-hero__info">
              <p className="eyebrow">{greeting()}</p>
              <h2 id="hoy" className="today-hero__date">
                <span className="sr-only">{formatLongDate(today)}. </span>
                {semana ?? SEASON_LABELS[day.season]}
              </h2>
              {lead ? (
                <Link to={`/calendario/dia/${today}`} className="today-hero__feast">
                  {lead.name}
                </Link>
              ) : saint ? (
                <Link to={`/calendario/santos/${saint.id}`} className="today-hero__feast">
                  {saint.name}
                </Link>
              ) : null}
              <div className="tag-row">
                {tiempo && semana ? <Tag tone="gold">{tiempo}</Tag> : null}
                <Tag>{toneLabel(day.tone)}</Tag>
                <Tag tone={tono}>{day.fasting.label}</Tag>
                {day.calendarStyle === 'juliano' ? (
                  <Tag tone="blue">
                    {es.calendar.styleOld} · {formatChurchDate(day.church).replace(/ de \d+$/, '')}
                  </Tag>
                ) : null}
              </div>
            </div>
          </div>
        </section>

        {/* ---------- Lo que toca rezar ---------- */}
        <div className="home-pray">
          <OfficeInvitation />
          <TodayOffices today={today} />
        </div>
      </div>

      <WelcomeCard />
      <BackupReminder />
      <PlanToday />

      <div className="home-grid">
        {/* ---------- La Iglesia, hoy ---------- */}
        <Section title={es.home.today} action={{ label: es.home.seeDay, to: `/calendario/dia/${today}` }} id="hoy-iglesia">
          <div className="list">
            <ListRow
              to={saint ? `/calendario/santos/${saint.id}` : '/calendario/santos'}
              title={saint ? saint.name : es.home.noSaint}
              meta={
                day.saints.length > 2
                  ? `${es.home.saintOfDay} · ${es.home.moreSaints.replace('{{count}}', String(day.saints.length - 1))}`
                  : day.saints.length === 2
                    ? `${es.home.saintOfDay} · ${es.home.oneMoreSaint}`
                    : es.home.saintOfDay
              }
            />
            {gospel ? (
              <ListRow
                to="/leer/lecturas"
                title={readingTitle(gospel.reference)}
                meta={
                  epistle
                    ? `${es.home.gospel} · ${es.home.epistle}: ${readingTitle(epistle.reference)}`
                    : es.home.gospel
                }
              />
            ) : null}
            {fiestaAthos ? (
              <ListRow
                to={
                  fiestaAthos.monasteryId
                    ? `/biblioteca/athos/monasterio/${fiestaAthos.monasteryId}`
                    : '/biblioteca/athos/karyes'
                }
                title={fiestaAthos.place}
                meta={`${fiestaAthos.days === 0 ? es.home.athosToday : es.home.athosTomorrow} · ${fiestaAthos.name}`}
              />
            ) : null}
            {proxima ? (
              <ListRow
                to={`/calendario/dia/${proxima.date}`}
                title={proxima.name}
                meta={`${es.home.nextFeast} · ${
                  proxima.days === 1 ? es.home.tomorrow : es.home.inDays.replace('{{count}}', String(proxima.days))
                } · ${formatDayMonth(proxima.date)}`}
              />
            ) : null}
          </div>
        </Section>

        {/* ---------- Una palabra para el día ---------- */}
        <div className="home-sayings">
          <VerseOfDay />
          <ApophthegmOfDay />
        </div>
      </div>

      {history.data && history.data.length > 0 ? (
        <Section title={es.home.continueReading} id="historial">
          <div className="list">
            {history.data.slice(0, 3).map((entry) => (
              <ListRow key={entry.id} to={entry.path} title={entry.title} meta={entry.kind} />
            ))}
          </div>
        </Section>
      ) : null}

      <p className="muted text-sm text-center" style={{ marginTop: 'var(--sp-6)' }}>
        {es.home.pascha.replace('{{date}}', formatLongDate(day.paschaDate))}
      </p>
    </div>
  );
}

/** Los tres oficios del día en una fila: cuál toca y cuál está hecho. */
function TodayOffices({ today }: { today: string }) {
  const progreso = useOfficeProgress(today);
  const horas = useSettings((s) => s.officeHours);
  const ahora = officeNow(new Date().getHours(), horas);
  const corto: Record<RuleTime, string> = { manana: es.rule.morning, mediodia: es.rule.midday, noche: es.rule.evening };

  return (
    <nav className="office-chips" aria-label={es.home.rule}>
      {DAILY_OFFICES.map((oficio) => {
        const ratio = progreso.data?.get(oficio.time)?.ratio ?? 0;
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
            className={`office-chip${esAhora ? ' office-chip--now' : ''}${hecho ? ' office-chip--done' : ''}`}
            aria-label={`${oficio.name}: ${estado}`}
          >
            <Icono size={16} aria-hidden="true" />
            <span className="office-chip__name">{corto[oficio.time]}</span>
            <span className="office-chip__state">{estado}</span>
          </Link>
        );
      })}
    </nav>
  );
}
