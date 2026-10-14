/**
 * Portada de Orar.
 *
 * Los tres oficios del día en primer lugar —con el de ahora destacado y la
 * medida en que se reza cada uno—; debajo, la medida para los tres de una vez
 * y la semana, que es lo que necesita quien está cogiendo el hábito; luego el
 * libro de oración con sus cuatro órdenes de corrido; después, la oración
 * personal —las oraciones por momentos, la de Jesús, el komboskini, la regla—,
 * y al final lo que se reza con la Iglesia y está en la biblioteca.
 *
 * Los destinos van en teselas y no en filas: se abarcan de un vistazo y se
 * tocan sin apuntar. La nota sobre cómo están hechos los oficios queda
 * plegada al pie, para quien la busque.
 */
import { Link } from 'react-router-dom';
import { useToday } from '@/hooks/useLiturgicalDay';
import { useAsync } from '@/hooks/useAsync';
import { prayerStats } from '@/db/user';
import { DAILY_OFFICES, OFFICES_STRUCTURE_NOTE } from '@/content/hours';
import { officeNow } from '@/lib/office-time';
import { useSettings } from '@/stores/settings';
import { ProgressBlocks, Section, Tag } from '@/components/ui';
import { HubHero, Tile, TileGrid } from '@/components/hub';
import {
  IconBook,
  IconCandle,
  IconChotki,
  IconChurch,
  IconCross,
  IconEdit,
  IconPray,
  IconScroll,
  IconSun,
} from '@/components/icons';
import { LENGTH_INFO, minutesFor } from '@/content/office-lengths';
import { OfficeMeasure } from './OfficeMeasure';
import { OfficeWeek } from './OfficeWeek';
import { TodayDevotions } from './TodayDevotions';
import { PRAYER_ORDERS } from '@/content/prayer-orders';
import { MomentIcon } from '@/features/prayers/MomentIcon';
import { MomentsMenu } from '@/features/prayers/MomentsMenu';
import { useOfficeProgress } from '@/features/office/useOfficeProgress';
import es from '@/locales/es';

export function PrayHub() {
  const today = useToday();
  const horas = useSettings((s) => s.officeHours);
  const ahora = officeNow(new Date().getHours(), horas);
  const stats = useAsync(() => prayerStats(today), [today]);
  const progreso = useOfficeProgress(today);
  const medidas = useSettings((s) => s.officeLength);

  return (
    <div className="page">
      <HubHero icon={IconPray} title={es.nav.pray} subtitle={es.office.threeTimes} />

      <Section title={es.office.title}>
        <div className="office-cards">
          {DAILY_OFFICES.map((oficio) => {
            const estado = progreso.data?.get(oficio.time);
            const esAhora = oficio.time === ahora;
            const medida = medidas?.[oficio.time] ?? 'habitual';
            return (
              <Link
                key={oficio.time}
                to={`/orar/oficio/${oficio.time}`}
                className={`office-card${esAhora ? ' office-card--now' : ''}`}
              >
                <div className="row row--between" style={{ alignItems: 'flex-start' }}>
                  <p className="eyebrow" lang="el">
                    {oficio.greekName}
                  </p>
                  {esAhora ? <Tag tone="gold">{es.prayers.now}</Tag> : null}
                </div>
                <p className="office-card__name">{oficio.name}</p>
                <p className="muted text-sm">{oficio.subtitle}</p>
                <p className="office-card__length" data-length={medida}>
                  <span>{LENGTH_INFO.get(medida)?.label}</span> ·{' '}
                  {es.office.minutes.replace('{{n}}', String(minutesFor(oficio.time, medida)))}
                </p>
                {estado && estado.total > 0 ? (
                  <div className="office-card__progress">
                    <ProgressBlocks value={estado.ratio} />
                  </div>
                ) : null}
              </Link>
            );
          })}
        </div>
      </Section>

      <Section title={es.pray.today}>
        <TodayDevotions />
      </Section>

      <Section title={es.pray.measure}>
        <p className="muted text-sm section-lead">{es.pray.measureHint}</p>
        <OfficeMeasure />
        <details className="fold">
          <summary>{es.pray.beginners}</summary>
          <ul className="tips">
            {es.pray.beginnersTips.map((consejo) => (
              <li key={consejo}>{consejo}</li>
            ))}
          </ul>
          <p className="muted text-sm">{es.pray.beginnersNote}</p>
        </details>
      </Section>

      <Section title={es.pray.week}>
        <p className="muted text-sm section-lead">{es.pray.weekHint}</p>
        <OfficeWeek today={today} />
      </Section>

      <Section title={es.prayers.orders}>
        <p className="muted text-sm section-lead">{es.prayers.ordersHint}</p>
        <div className="order-grid">
          {PRAYER_ORDERS.map((orden) => {
            const esAhora = orden.category === ahora;
            return (
              <Link
                key={orden.id}
                to={`/orar/oraciones/orden/${orden.id}`}
                className={`order-card${esAhora ? ' order-card--now' : ''}`}
              >
                <span className="moment__icon">
                  <MomentIcon id={orden.category} />
                </span>
                <span className="order-card__name">{orden.title}</span>
                <span className="order-card__meta">
                  {orden.sections.length} partes{esAhora ? ` · ${es.prayers.now}` : ''}
                </span>
              </Link>
            );
          })}
        </div>
      </Section>

      {/* Antes iba aquí «Tu oración»: cinco teselas sin relación entre sí. Ahora,
          las oraciones para cada momento, que es lo que se busca al venir a
          rezar algo concreto; lo demás queda en la fila de debajo. */}
      <Section title={es.pray.moments} action={{ label: es.pray.allPrayers, to: '/orar/oraciones' }}>
        <MomentsMenu headingLevel="sub" />
      </Section>

      <nav className="shortcut-row" aria-label={es.pray.tools}>
        <Link className="shortcut" to="/orar/oracion-de-jesus">
          <IconCross size={16} /> {es.jesusPrayer.title}
        </Link>
        <Link className="shortcut" to="/orar/komboskini">
          <IconChotki size={16} /> {es.jesusPrayer.chotkiAlt}
          {stats.data?.today ? <span className="shortcut__badge">{stats.data.today}</span> : null}
        </Link>
        <Link className="shortcut" to="/orar/regla">
          <IconScroll size={16} /> {es.rule.title}
        </Link>
        <Link className="shortcut" to="/orar/metanoias">
          <IconCross size={16} /> {es.metanoia.title}
        </Link>
        <Link className="shortcut" to="/orar/formas">
          <IconPray size={16} /> {es.pray.ways}
        </Link>
        <Link className="shortcut" to="/orar/mis-oraciones">
          <IconEdit size={16} /> {es.office.myPrayers}
        </Link>
      </nav>

      <Section title={es.pray.withChurch}>
        <TileGrid>
          <Tile to="/orar/maitines" icon={IconSun} title={es.pray.matins} hint={es.pray.matinsHint} />
          <Tile to="/leer/salterio" icon={IconBook} title={es.psalter.title} hint={es.pray.psalterHint} />
          <Tile to="/biblioteca/akathistos" icon={IconCandle} title={es.library.akathists} hint={es.pray.akathistsHint} />
          <Tile to="/biblioteca/canones" icon={IconScroll} title={es.library.canons} hint={es.pray.canonsHint} />
          <Tile to="/biblioteca/liturgia" icon={IconChurch} title={es.pray.offices} hint={es.pray.officesHint} />
        </TileGrid>
      </Section>

      <details className="fold">
        <summary>{es.pray.howOffices}</summary>
        <p className="text-sm muted">{OFFICES_STRUCTURE_NOTE}</p>
      </details>
    </div>
  );
}
