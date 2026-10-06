import { Link, useParams } from 'react-router-dom';
import { useAsync } from '@/hooks/useAsync';
import { db } from '@/db/db';
import { Blocks, SourceNote, Tag, Skeleton, NotFound } from '@/components/ui';
import { ReaderToolbar } from '@/components/Reader';
import { Headpiece, Tailpiece } from '@/components/Ornament';
import { useVisitLog } from '@/hooks/useVisitLog';
import { PRAYER_CATEGORIES } from '@/content/prayers';
import { PRAYER_ORDERS } from '@/content/prayer-orders';
import es from '@/locales/es';

/** Una oración, presentada como una página de libro. */
export function PrayerPage() {
  const { prayerId } = useParams<{ prayerId: string }>();
  const prayer = useAsync(() => db.prayers.get(prayerId ?? ''), [prayerId]);
  // Las del mismo momento, para poder pasar a la siguiente sin volver al menú.
  const hermanas = useAsync(
    async () => {
      const actual = await db.prayers.get(prayerId ?? '');
      return actual ? db.prayers.where('category').equals(actual.category).sortBy('order') : [];
    },
    [prayerId],
  );

  useVisitLog(
    prayer.data
      ? { path: `/orar/oraciones/${prayer.data.id}`, title: prayer.data.title, kind: es.prayers.title }
      : null,
  );

  if (prayer.loading) return <Skeleton title lines={6} />;
  if (!prayer.data) {
    return (
      <div className="page">
        <NotFound title="Esta oración no está incorporada"  />
      </div>
    );
  }

  const item = prayer.data;
  const category = PRAYER_CATEGORIES.find((c) => c.id === item.category);
  const lista = hermanas.data ?? [];
  const posicion = lista.findIndex((p) => p.id === item.id);
  const anterior = posicion > 0 ? lista[posicion - 1] : undefined;
  const siguiente = posicion >= 0 && posicion < lista.length - 1 ? lista[posicion + 1] : undefined;
  // Si la oración es una pieza de un orden del libro, se dice cuál y dónde.
  const enOrden = PRAYER_ORDERS.flatMap((o) =>
    o.sections.filter((s) => s.prayerId === item.id).map((s) => ({ orden: o, seccion: s })),
  );

  return (
    <article className="page page--reading">
      {/* La oración se abre como un texto del libro, con su puerta encima. */}
      <header
        className="page-head--ornate"
        style={{ paddingTop: 'var(--sp-5)', marginBottom: 'var(--sp-5)' }}
      >
        <Headpiece />
        <p className="eyebrow">{category?.name}</p>
        <h1 className="display" style={{ fontSize: 'var(--text-2xl)', margin: 'var(--sp-2) 0' }}>
          {item.title}
        </h1>
        {item.subtitle ? <p className="muted">{item.subtitle}</p> : null}

        <div style={{ marginTop: 'var(--sp-4)' }}>
          <ReaderToolbar
            favorite={{
              kind: 'prayer',
              refId: item.id,
              title: item.title,
              subtitle: category?.name,
              path: `/orar/oraciones/${item.id}`,
            }}
            note={{
              targetKind: 'prayer',
              targetId: item.id,
              targetTitle: item.title,
              path: `/orar/oraciones/${item.id}`,
            }}
          />
        </div>
      </header>

      <Blocks blocks={item.blocks} illuminated={item.status === 'complete'} />

      {item.status !== 'complete' ? (
        <div className="tag-row" style={{ marginTop: 'var(--sp-4)' }}>
          <Tag>{item.status === 'pending' ? es.sources.statusPending : es.sources.statusPartial}</Tag>
        </div>
      ) : null}

      {enOrden.length > 0 ? (
        <p className="muted text-sm" style={{ marginTop: 'var(--sp-4)' }}>
          {enOrden.map(({ orden, seccion }, i) => (
            <span key={orden.id}>
              {i > 0 ? ' · ' : 'En el libro de oración: '}
              <Link to={`/orar/oraciones/orden/${orden.id}#${seccion.id}`}>
                {orden.title}, {seccion.title.charAt(0).toLowerCase() + seccion.title.slice(1)}
              </Link>
            </span>
          ))}
        </p>
      ) : null}

      {anterior || siguiente ? (
        <nav className="prayer-nav" aria-label={category?.name}>
          {anterior ? (
            <Link to={`/orar/oraciones/${anterior.id}`} className="prayer-nav__link">
              <span className="prayer-nav__label">← {es.prayers.previous}</span>
              <span className="prayer-nav__title">{anterior.title}</span>
            </Link>
          ) : null}
          {siguiente ? (
            <Link to={`/orar/oraciones/${siguiente.id}`} className="prayer-nav__link prayer-nav__link--next">
              <span className="prayer-nav__label">{es.prayers.next} →</span>
              <span className="prayer-nav__title">{siguiente.title}</span>
            </Link>
          ) : null}
        </nav>
      ) : null}

      {category ? (
        <p className="text-sm" style={{ marginTop: 'var(--sp-3)', textAlign: 'center' }}>
          <Link to={`/orar/oraciones/categoria/${category.id}`}>
            {es.prayers.backToMoment.replace('{{name}}', category.name)}
          </Link>
        </p>
      ) : null}

      <Tailpiece />

      <SourceNote meta={item.meta} status={item.status} />
    </article>
  );
}
