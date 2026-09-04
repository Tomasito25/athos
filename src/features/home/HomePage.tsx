/**
 * Inicio — el día de hoy.
 *
 * Es la pantalla que el usuario verá cada mañana: la oración de Jesús, la
 * fecha litúrgica, el santo, el ayuno, las lecturas y el estado de su regla.
 * Todo lo que aparece aquí lleva a alguna parte.
 */
import { Link } from 'react-router-dom';
import { useLiturgicalDay, useToday } from '@/hooks/useLiturgicalDay';
import { useAsync } from '@/hooks/useAsync';
import { dayRuleProgress, listHistory } from '@/db/user';
import { SEASON_LABELS } from '@/lib/calendar/liturgical';
import { formatLongDate, greeting, toneLabel } from '@/lib/format';
import { ButtonLink, ListRow, Panel, ProgressBlocks, Rule, Section, Tag } from '@/components/ui';
import { OfficeInvitation } from '@/features/office/OfficeInvitation';
import { PericopeText } from '@/components/PericopeText';
import { VerseOfDay } from '@/components/VerseOfDay';
import { IconCandle, IconChotki, IconScroll, OrthodoxCross } from '@/components/icons';
import { WEEKDAYS } from '@/lib/format';
import { isFastDay } from '@/lib/calendar/fasting';
import es from '@/locales/es';

const JESUS_PRAYER = 'Señor Jesucristo,\nHijo de Dios,\nten misericordia de mí,\npecador.';

export function HomePage() {
  const today = useToday();
  const day = useLiturgicalDay(today);
  const rule = useAsync(() => dayRuleProgress(today, day.weekday === 0 ? 'domingo' : 'diario'), [today, day.weekday]);
  const history = useAsync(() => listHistory(3), []);

  const lead = day.feasts[0];
  const saint = day.saints[0];
  const gospel = day.readings?.readings.find((r) => r.kind === 'evangelio');
  const epistle = day.readings?.readings.find((r) => r.kind === 'epistola');

  return (
    <div className="page page--reading">
      {/* ---------- La oración, antes que nada ---------- */}
      <header style={{ paddingTop: 'var(--sp-6)', textAlign: 'center' }}>
        {/* La portada enseña la oración, no un título; pero toda página
            necesita su encabezado de primer nivel, y aquí va para quien
            navega con lector de pantalla. */}
        <h1 className="sr-only">ATHOS · Inicio</h1>
        <p className="eyebrow" style={{ marginBottom: 'var(--sp-4)' }}>
          {greeting()}
        </p>
        <OrthodoxCross
          size={30}
          style={{ margin: '0 auto var(--sp-4)', color: 'var(--gold)', opacity: 0.85 }}
        />
        <p
          className="display"
          style={{
            fontSize: 'var(--text-xl)',
            lineHeight: 1.45,
            whiteSpace: 'pre-line',
            color: 'var(--ink-strong)',
          }}
        >
          {JESUS_PRAYER}
        </p>
      </header>

      {/* La frase que uno se lleva puesta el resto del día. */}
      <VerseOfDay />

      {/* Después, el oficio que toca a esta hora. */}
      <OfficeInvitation />

      <Rule />

      {/* ---------- El día ---------- */}
      <section aria-labelledby="hoy">
        <p className="eyebrow" style={{ letterSpacing: 'var(--tracking-widest)' }}>
          {WEEKDAYS[day.weekday]}
        </p>
        <h2
          id="hoy"
          className="display"
          style={{ fontSize: 'var(--text-2xl)', margin: 'var(--sp-1) 0 var(--sp-3)' }}
        >
          {formatLongDate(today)}
        </h2>

        <div className="tag-row">
          <Tag tone="gold">{SEASON_LABELS[day.season]}</Tag>
          <Tag>{toneLabel(day.tone)}</Tag>
          {day.calendarStyle === 'juliano' ? (
            <Tag tone="blue">{es.calendar.styleOld}</Tag>
          ) : null}
        </div>
      </section>

      <div className="stack" style={{ marginTop: 'var(--sp-5)' }}>
        {lead ? (
          <Link to="/calendario/fiestas" className="panel" style={{ textDecoration: 'none' }}>
            <p className="eyebrow">{es.home.feast}</p>
            <p className="panel__title" style={{ marginTop: 'var(--sp-1)' }}>{lead.name}</p>
            {lead.description ? <p className="muted text-sm">{lead.description}</p> : null}
          </Link>
        ) : null}

        <Link
          to={saint ? `/calendario/santos/${saint.id}` : '/calendario/santos'}
          className="panel"
          style={{ textDecoration: 'none' }}
        >
          <p className="eyebrow">{es.home.saintOfDay}</p>
          <p className="panel__title" style={{ marginTop: 'var(--sp-1)' }}>
            {saint ? saint.name : es.home.noSaint}
          </p>
          {saint ? (
            <p className="muted text-sm" style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
              {saint.biography}
            </p>
          ) : null}
        </Link>

        <Link to="/calendario/ayuno" className="panel" style={{ textDecoration: 'none' }}>
          <p className="eyebrow">{es.home.fasting}</p>
          <p className="panel__title" style={{ marginTop: 'var(--sp-1)' }}>{day.fasting.label}</p>
          <p className="muted text-sm">{day.fasting.reason}</p>
          {day.fasting.period && isFastDay(day.fasting) ? (
            <div className="tag-row" style={{ marginTop: 'var(--sp-2)' }}>
              <Tag tone="red">{day.fasting.period}</Tag>
            </div>
          ) : null}
        </Link>
      </div>

      <Rule />

      {/* ---------- El Evangelio del día ---------- */}
      <Section title={es.home.gospel} action={{ label: 'Lecturas', to: '/leer/lecturas' }} id="evangelio">
        {gospel ? (
          <Link to="/leer/lecturas" className="panel" style={{ display: 'block', textDecoration: 'none' }}>
            <p className="display" style={{ fontSize: 'var(--text-lg)' }}>
              {gospel.reference}
            </p>
            {gospel.note ? <p className="rubric">{gospel.note}</p> : null}
            <div style={{ marginTop: 'var(--sp-3)' }}>
              <PericopeText reference={gospel.reference} compact maxVerses={4} />
            </div>
            <p className="section__action" style={{ marginTop: 'var(--sp-2)', paddingInline: 0 }}>
              Leer entero
            </p>
          </Link>
        ) : (
          <Panel variant="quiet">
            <p className="muted text-sm">{es.app.pending}</p>
          </Panel>
        )}

        {epistle ? (
          <Panel variant="quiet" style={{ marginTop: 'var(--sp-3)' }}>
            <p className="eyebrow">{es.home.epistle}</p>
            <p className="display" style={{ fontSize: 'var(--text-md)', marginTop: 'var(--sp-1)' }}>
              {epistle.reference}
            </p>
          </Panel>
        ) : null}
      </Section>

      {/* ---------- Regla de oración ---------- */}
      <Section title={es.home.rule} action={{ label: 'Abrir', to: '/orar' }} id="regla">
        <Link to="/orar" className="panel" style={{ textDecoration: 'none', display: 'block' }}>
          {rule.data && rule.data.total > 0 ? (
            <>
              <ProgressBlocks value={rule.data.ratio} />
              <p className="muted text-sm" style={{ marginTop: 'var(--sp-2)' }}>
                {es.rule.doneCount
                  .replace('{{done}}', String(rule.data.done))
                  .replace('{{total}}', String(rule.data.total))}
              </p>
            </>
          ) : (
            <p className="muted text-sm">{es.rule.emptyText}</p>
          )}
        </Link>
      </Section>

      {/* ---------- Accesos ---------- */}
      <div className="btn-row" style={{ marginTop: 'var(--sp-5)' }}>
        <ButtonLink to="/orar" variant="primary" size="lg" style={{ flex: 1 }}>
          {es.home.openPrayers}
        </ButtonLink>
        <ButtonLink to="/leer" size="lg" style={{ flex: 1 }}>
          {es.home.openReading}
        </ButtonLink>
      </div>

      <Section title={es.home.quickActions} id="accesos">
        <div className="list">
          <ListRow
            to="/orar/oracion-de-jesus"
            leading={<IconChotki size={20} style={{ color: 'var(--gold)' }} />}
            title={es.home.jesusPrayer}
            meta="Contador, temporizador e historial"
          />
          <ListRow
            to="/leer/salterio"
            leading={<IconScroll size={20} style={{ color: 'var(--gold)' }} />}
            title={es.home.psalter}
            meta="Los ciento cincuenta salmos en kathismata"
          />
          <ListRow
            to="/biblioteca/athos"
            leading={<IconCandle size={20} style={{ color: 'var(--gold)' }} />}
            title="Monte Athos"
            meta="Los veinte monasterios de la Montaña Santa"
          />
        </div>
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

      <p className="muted text-sm text-center" style={{ marginTop: 'var(--sp-6)' }}>
        {es.home.pascha.replace('{{date}}', formatLongDate(day.paschaDate))}
      </p>
    </div>
  );
}
