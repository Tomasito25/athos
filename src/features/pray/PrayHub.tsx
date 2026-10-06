/**
 * Portada de Orar.
 *
 * Los tres oficios del día en primer lugar —con el de ahora destacado—; debajo,
 * el libro de oración con sus cuatro órdenes de corrido; después, la oración
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
} from '@/components/icons';
import { PRAYER_CATEGORIES } from '@/content/prayers';
import { PRAYER_ORDERS } from '@/content/prayer-orders';
import { MomentIcon } from '@/features/prayers/MomentIcon';
import { useOfficeProgress } from '@/features/office/useOfficeProgress';
import es from '@/locales/es';

export function PrayHub() {
  const today = useToday();
  const horas = useSettings((s) => s.officeHours);
  const ahora = officeNow(new Date().getHours(), horas);
  const stats = useAsync(() => prayerStats(today), [today]);
  const progreso = useOfficeProgress(today);

  return (
    <div className="page">
      <HubHero icon={IconPray} title={es.nav.pray} subtitle={es.office.threeTimes} />

      <Section title={es.office.title}>
        <div className="office-cards">
          {DAILY_OFFICES.map((oficio) => {
            const estado = progreso.data?.get(oficio.time);
            const esAhora = oficio.time === ahora;
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

      <Section title={es.prayers.orders}>
        <p className="muted text-sm" style={{ margin: 'calc(-1 * var(--sp-2)) 0 var(--sp-3)' }}>
          {es.prayers.ordersHint}
        </p>
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

      <Section title={es.pray.yours}>
        <TileGrid>
          <Tile
            to="/orar/oraciones"
            icon={IconPray}
            title={es.prayers.title}
            hint={`${PRAYER_CATEGORIES.length} momentos, del despertar al duelo`}
          />
          <Tile to="/orar/oracion-de-jesus" icon={IconCross} title={es.jesusPrayer.title} hint={es.pray.jesusHint} />
          <Tile
            to="/orar/komboskini"
            icon={IconChotki}
            title={es.jesusPrayer.chotkiAlt}
            hint={stats.data?.today ? es.pray.chotkiToday.replace('{{count}}', String(stats.data.today)) : es.pray.chotkiHint}
          />
          <Tile to="/orar/regla" icon={IconScroll} title={es.rule.title} hint={es.pray.ruleHint} />
          <Tile to="/orar/mis-oraciones" icon={IconEdit} title={es.office.myPrayers} hint={es.pray.myPrayersHint} />
        </TileGrid>
      </Section>

      <Section title={es.pray.withChurch}>
        <TileGrid>
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
