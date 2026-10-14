/**
 * El menú de los momentos.
 *
 * Es la portada de las oraciones: en vez de una lista de títulos, la pregunta
 * que trae al que abre la aplicación —¿qué hora es, qué me pasa?—. Arriba, el
 * momento que corresponde a esta hora; debajo, los demás en rejilla, cada uno
 * con su signo, para poder abarcarlos de un vistazo.
 */
import { Link } from 'react-router-dom';
import { useAsync } from '@/hooks/useAsync';
import { db } from '@/db/db';
import { listFavorites } from '@/db/user';
import { ButtonLink, ListRow, Panel, Section, Tag } from '@/components/ui';
import { HubHero } from '@/components/hub';
import { IconPray } from '@/components/icons';
import { PRAYER_LICENSE_NOTE } from '@/content/prayers';
import { ANY_HOUR, momentById, momentNow } from '@/content/moments';
import { PRAYER_ORDERS } from '@/content/prayer-orders';
import { MomentIcon } from './MomentIcon';
import { MomentsMenu } from './MomentsMenu';
import es from '@/locales/es';

export function PrayersPage() {
  const prayers = useAsync(() => db.prayers.orderBy('order').toArray(), []);
  const favorites = useAsync(() => listFavorites('prayer'), []);

  const ahora = momentNow(new Date().getHours());
  const momento = ahora ? momentById(ahora) : undefined;

  return (
    <div className="page">
      <HubHero icon={IconPray} title={es.prayers.title} subtitle={es.prayers.heroSubtitle} />

      {/* ---- Lo que toca ahora ---- */}
      {momento && ahora ? (
        <Link to={`/orar/oraciones/categoria/${momento.id}`} className="now-card">
          <div className="row row--between" style={{ alignItems: 'flex-start' }}>
            <p className="eyebrow">{es.prayers.rightNow}</p>
            <Tag tone="gold">{es.prayers.now}</Tag>
          </div>
          <p className="now-card__name">{momento.name}</p>
          <p className="now-card__text">{momento.description}</p>
          <span className="now-card__icon">
            <MomentIcon id={ahora} size={64} />
          </span>
        </Link>
      ) : (
        <Panel variant="quiet">
          <p className="eyebrow">{ANY_HOUR.title}</p>
          <div className="prose prose--compact" style={{ marginTop: 'var(--sp-2)' }}>
            <p>{ANY_HOUR.text}</p>
          </div>
          <div className="btn-row" style={{ marginTop: 'var(--sp-3)' }}>
            <ButtonLink to={ANY_HOUR.path} size="sm">
              {es.prayers.openJesusPrayer}
            </ButtonLink>
          </div>
        </Panel>
      )}

      {/* ---- Los cuatro órdenes que se rezan de corrido ---- */}
      <Section title={es.prayers.orders}>
        <p className="muted text-sm" style={{ margin: 'calc(-1 * var(--sp-2)) 0 var(--sp-3)' }}>
          {es.prayers.ordersHint}
        </p>
        <div className="order-grid">
          {PRAYER_ORDERS.map((orden) => (
            <Link
              key={orden.id}
              to={`/orar/oraciones/orden/${orden.id}`}
              className={`order-card${orden.category === ahora ? ' order-card--now' : ''}`}
            >
              <span className="moment__icon">
                <MomentIcon id={orden.category} />
              </span>
              <span className="order-card__name">{orden.title}</span>
              <span className="order-card__meta">
                {orden.sections.length} partes{orden.category === ahora ? ` · ${es.prayers.now}` : ''}
              </span>
            </Link>
          ))}
        </div>
      </Section>

      {favorites.data && favorites.data.length > 0 ? (
        <Section title={es.prayers.favorites}>
          <div className="list">
            {favorites.data.slice(0, 5).map((favorite) => (
              <ListRow key={favorite.id} to={favorite.path} title={favorite.title} meta={favorite.subtitle} />
            ))}
          </div>
        </Section>
      ) : null}

      {/* ---- Todos los momentos, en rejilla ---- */}
      <MomentsMenu />

      <Section title={es.prayers.everything}>
        <div className="list">
          <ListRow
            to="/orar/oraciones/todas"
            leading={<IconPray size={20} style={{ color: 'var(--gold)' }} />}
            title={es.prayers.allPrayers}
            meta={es.prayers.searchAll}
            trailing={<span className="pill-count">{prayers.data?.length ?? 0}</span>}
          />
        </div>
      </Section>

      <p className="source-note" style={{ marginTop: 'var(--sp-6)' }}>
        {PRAYER_LICENSE_NOTE}
      </p>
    </div>
  );
}
