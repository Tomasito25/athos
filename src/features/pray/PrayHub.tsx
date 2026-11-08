/**
 * Portada de Orar.
 *
 * Antes era una página de ocho pantallas donde estaba todo a la vez: los tres
 * oficios, treinta y dos momentos, la medida, la semana, los órdenes y las
 * herramientas. Había que recorrerla entera para saber qué tenía. Ahora dice
 * una sola cosa en cada sitio:
 *
 * 1. **Lo que toca ahora**: el oficio de esta hora, con un botón.
 * 2. **Buscar**, para quien ya sabe lo que quiere.
 * 3. **Seis puertas**, una por cada pregunta que trae al que abre esto: cuándo,
 *    qué te pasa, por quién, qué quieres pedir, a quién rezas, con qué.
 * 4. **Lo propio de hoy**, **lo que se reza de corrido**, **tu práctica** y **lo
 *    que se reza con la Iglesia**, cada cosa en su bloque y sin explicaciones.
 *
 * La medida, la semana y los consejos para empezar pasaron a `/orar/oficios`.
 */
import { Link } from 'react-router-dom';
import { useToday } from '@/hooks/useLiturgicalDay';
import { useAsync } from '@/hooks/useAsync';
import { listFavorites, prayerStats } from '@/db/user';
import { DAILY_OFFICES } from '@/content/hours';
import { officeNow } from '@/lib/office-time';
import { useSettings } from '@/stores/settings';
import { ListRow, ProgressBlocks, Section } from '@/components/ui';
import { HubHero, Tile, TileGrid } from '@/components/hub';
import {
  IconBook,
  IconCandle,
  IconChevronRight,
  IconChotki,
  IconChurch,
  IconCross,
  IconEdit,
  IconPeople,
  IconPray,
  IconScroll,
  IconStar,
  IconSun,
} from '@/components/icons';
import { LENGTH_INFO, minutesFor } from '@/content/office-lengths';
import { MOMENT_GROUPS } from '@/content/moments';
import { PRAYER_ORDERS } from '@/content/prayer-orders';
import { SignIcon, MomentIcon } from '@/features/prayers/MomentIcon';
import { PrayerSearchBox } from '@/features/prayers/PrayerSearchBox';
import { useOfficeProgress } from '@/features/office/useOfficeProgress';
import { TodayDevotions } from './TodayDevotions';
import es from '@/locales/es';

/** El oficio de esta hora, en grande, y los otros dos debajo. */
function OficioDeAhora() {
  const today = useToday();
  const horas = useSettings((s) => s.officeHours);
  const medidas = useSettings((s) => s.officeLength);
  const progreso = useOfficeProgress(today);
  const ahora = officeNow(new Date().getHours(), horas);

  const actual = DAILY_OFFICES.find((o) => o.time === ahora) ?? DAILY_OFFICES[0]!;
  const otros = DAILY_OFFICES.filter((o) => o.time !== actual.time);
  const estado = progreso.data?.get(actual.time);
  const medida = medidas?.[actual.time] ?? 'habitual';
  const hecho = estado && estado.total > 0 && estado.ratio >= 1;

  return (
    <div className="pray-now">
      <Link to={`/orar/oficio/${actual.time}`} className="pray-now__main">
        <span className="pray-now__eyebrow">
          {es.prayers.now} <span lang="el">· {actual.greekName}</span>
        </span>
        <span className="pray-now__name">{actual.name}</span>
        <span className="pray-now__sub">{actual.subtitle}</span>
        {/* El avance sólo cuando hay algo empezado: una barra vacía no dice nada. */}
        {estado && estado.total > 0 && estado.ratio > 0 ? (
          <span className="pray-now__progress">
            <ProgressBlocks value={estado.ratio} />
          </span>
        ) : null}
        <span className="pray-now__foot">
          <span className="pray-now__length">
            {LENGTH_INFO.get(medida)?.label} ·{' '}
            {es.office.minutes.replace('{{n}}', String(minutesFor(actual.time, medida)))}
          </span>
          <span className="pray-now__go">
            {hecho ? es.pray.again : estado?.ratio ? es.pray.resume : es.pray.begin}
            <IconChevronRight size={16} />
          </span>
        </span>
      </Link>
      <div className="pray-now__others">
        {otros.map((oficio) => (
          <Link key={oficio.time} to={`/orar/oficio/${oficio.time}`} className="pray-now__other">
            {oficio.name}
          </Link>
        ))}
        <Link to="/orar/oficios" className="pray-now__other pray-now__other--more">
          {es.pray.officesAll}
        </Link>
      </div>
    </div>
  );
}

export function PrayHub() {
  const today = useToday();
  const horas = useSettings((s) => s.officeHours);
  const ahora = officeNow(new Date().getHours(), horas);
  const stats = useAsync(() => prayerStats(today), [today]);
  const favoritas = useAsync(() => listFavorites('prayer'), []);

  return (
    <div className="page">
      <HubHero icon={IconPray} title={es.nav.pray} subtitle={es.pray.hubSubtitle} />

      <PrayerSearchBox />

      <OficioDeAhora />

      <Section title={es.pray.doors} action={{ label: es.pray.fullIndex, to: '/orar/oraciones' }}>
        <div className="pray-doors">
          {MOMENT_GROUPS.map((grupo) => (
            <Link key={grupo.id} to={`/orar/oraciones/seccion/${grupo.id}`} className="pray-door" data-group={grupo.id}>
              <span className="pray-door__icon" aria-hidden="true">
                <SignIcon name={grupo.icon} size={22} />
              </span>
              <span className="pray-door__question">{grupo.question}</span>
              <span className="pray-door__name">{grupo.name}</span>
              <span className="pray-door__examples">{grupo.examples}</span>
            </Link>
          ))}
        </div>
      </Section>

      {favoritas.data?.length ? (
        <Section title={es.prayers.favorites}>
          <div className="list">
            {favoritas.data.slice(0, 3).map((favorita) => (
              <ListRow
                key={favorita.id}
                to={favorita.path}
                leading={<IconStar size={18} style={{ color: 'var(--accent)' }} />}
                title={favorita.title}
                meta={favorita.subtitle}
              />
            ))}
          </div>
        </Section>
      ) : null}

      <Section title={es.pray.today}>
        <TodayDevotions />
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

      <Section title={es.pray.tools}>
        <TileGrid compact>
          <Tile
            to="/orar/oracion-de-jesus"
            icon={IconChotki}
            title={es.jesusPrayer.title}
            hint={es.pray.chotkiHint}
            badge={stats.data?.today || undefined}
          />
          <Tile to="/orar/regla" icon={IconScroll} title={es.rule.title} hint={es.pray.ruleHint} />
          <Tile to="/orar/nombres" icon={IconPeople} title={es.names.title} hint={es.pray.namesHint} />
          <Tile to="/orar/metanoias" icon={IconCross} title={es.metanoia.title} hint={es.pray.metanoiasHint} />
          <Tile to="/orar/mis-oraciones" icon={IconEdit} title={es.office.myPrayers} hint={es.pray.myPrayersHint} />
          <Tile to="/orar/formas" icon={IconPray} title={es.pray.ways} hint={es.pray.waysHint} />
        </TileGrid>
      </Section>

      <Section title={es.pray.withChurch}>
        <TileGrid compact>
          <Tile to="/orar/maitines" icon={IconSun} title={es.pray.matins} hint={es.pray.matinsHint} />
          <Tile to="/leer/salterio" icon={IconBook} title={es.psalter.title} hint={es.pray.psalterHint} />
          <Tile to="/biblioteca/akathistos" icon={IconCandle} title={es.library.akathists} hint={es.pray.akathistsHint} />
          <Tile to="/biblioteca/canones" icon={IconScroll} title={es.library.canons} hint={es.pray.canonsHint} />
          <Tile to="/biblioteca/liturgia" icon={IconChurch} title={es.pray.offices} hint={es.pray.officesHint} />
        </TileGrid>
      </Section>
    </div>
  );
}
