/**
 * Las oraciones de un momento.
 *
 * Se llega desde el menú de momentos, y por eso la página dice antes que nada
 * a qué grupo pertenece y ofrece volver al menú.
 */
import { Link, useParams } from 'react-router-dom';
import { useAsync } from '@/hooks/useAsync';
import { db } from '@/db/db';
import { ButtonLink, Empty, ListRow, Loading, PageHead, StatusTag, NotFound } from '@/components/ui';
import { PRAYER_CATEGORIES } from '@/content/prayers';
import { MOMENT_GROUPS } from '@/content/moments';
import { ordersForCategory } from '@/content/prayer-orders';
import { MomentIcon } from './MomentIcon';
import es from '@/locales/es';

export function PrayerCategoryPage() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const category = PRAYER_CATEGORIES.find((c) => c.id === categoryId);
  const grupo = MOMENT_GROUPS.find((g) => g.moments.some((m) => m === categoryId));
  const prayers = useAsync(
    () => db.prayers.where('category').equals(categoryId ?? '').sortBy('order'),
    [categoryId],
  );
  const ordenes = ordersForCategory(categoryId ?? '');

  if (!category) {
    return (
      <div className="page">
        <NotFound title="Ese momento no existe" text="Vuelve al menú y elige otro."  />
        <div className="btn-row">
          <ButtonLink to="/orar/oraciones">{es.prayers.chooseMoment}</ButtonLink>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <PageHead
        eyebrow={grupo ? `${es.prayers.title} · ${grupo.name}` : es.prayers.title}
        title={category.name}
        subtitle={category.description}
      />
      {/* Donde el libro reza estas oraciones seguidas, lo primero es el orden
          entero; debajo, cada una suelta. */}
      {ordenes.length > 0 ? (
        <div className="order-grid" style={{ marginBottom: 'var(--sp-5)' }}>
          {ordenes.map((orden) => (
            <Link key={orden.id} to={`/orar/oraciones/orden/${orden.id}`} className="order-card order-card--now">
              <span className="moment__icon">
                <MomentIcon id={orden.category} />
              </span>
              <span className="order-card__name">{orden.title}</span>
              <span className="order-card__meta">{es.prayers.inOrder}</span>
            </Link>
          ))}
        </div>
      ) : null}

      {prayers.loading ? <Loading /> : null}
      {prayers.data?.length === 0 ? (
        <Empty title={es.app.empty} text="Todavía no hay oraciones incorporadas en este momento." />
      ) : (
        <div className="list">
          {prayers.data?.map((prayer) => (
            <ListRow
              key={prayer.id}
              to={`/orar/oraciones/${prayer.id}`}
              title={prayer.title}
              meta={prayer.subtitle}
              trailing={<StatusTag status={prayer.status} />}
            />
          ))}
        </div>
      )}

      <div className="btn-row" style={{ marginTop: 'var(--sp-6)' }}>
        <ButtonLink to="/orar/oraciones" variant="ghost" size="sm">
          {es.prayers.chooseMoment}
        </ButtonLink>
      </div>
    </div>
  );
}
