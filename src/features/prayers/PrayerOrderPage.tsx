/**
 * Un orden del libro de oraciones, entero y seguido.
 *
 * Las oraciones de la mañana, las de antes del sueño y las de la comunión no
 * se rezan sueltas: el libro las pone en un orden y se leen de corrido. Esta
 * página las presenta así, con un índice plegado arriba para saltar a la que
 * toque, y en cada una el enlace a su ficha, donde consta de dónde viene.
 */
import { Link, useParams } from 'react-router-dom';
import { Blocks, ButtonLink, ListRow, NotFound, Panel, Section, SourceNote } from '@/components/ui';
import { ReaderToolbar } from '@/components/Reader';
import { Headpiece, Tailpiece } from '@/components/Ornament';
import { useVisitLog } from '@/hooks/useVisitLog';
import { useHashScroll } from '@/hooks/useHashScroll';
import { PRAYER_ORDERS, orderById } from '@/content/prayer-orders';
import { PRAYER_CATEGORIES } from '@/content/prayers';
import es from '@/locales/es';

export function PrayerOrderPage() {
  const { orderId = '' } = useParams<{ orderId: string }>();
  const orden = orderById(orderId);
  const path = `/orar/oraciones/orden/${orderId}`;

  useVisitLog(orden ? { path, title: orden.title, kind: es.prayers.title } : null);
  // El índice y las fichas enlazan con una parte concreta: hay que bajar a ella.
  useHashScroll([orderId]);

  if (!orden) {
    return (
      <div className="page">
        <NotFound title="Ese orden no existe" text="Vuelve a las oraciones y elige otro." />
        <div className="btn-row">
          <ButtonLink to="/orar/oraciones">{es.prayers.chooseMoment}</ButtonLink>
        </div>
      </div>
    );
  }

  const momento = PRAYER_CATEGORIES.find((c) => c.id === orden.category);
  const otros = PRAYER_ORDERS.filter((o) => o.id !== orden.id);

  return (
    <article className="page page--reading">
      <header className="page-head--ornate" style={{ paddingTop: 'var(--sp-5)', marginBottom: 'var(--sp-5)' }}>
        <Headpiece />
        <p className="eyebrow">{es.prayers.orderEyebrow}</p>
        <h1 className="display" style={{ fontSize: 'var(--text-2xl)', margin: 'var(--sp-2) 0' }}>
          {orden.title}
        </h1>
        <p className="muted">{orden.subtitle}</p>
        <div style={{ marginTop: 'var(--sp-4)' }}>
          <ReaderToolbar
            favorite={{ kind: 'prayer', refId: `orden-${orden.id}`, title: orden.title, subtitle: momento?.name, path }}
            note={{ targetKind: 'prayer', targetId: `orden-${orden.id}`, targetTitle: orden.title, path }}
          />
        </div>
      </header>

      <Panel variant="quiet" style={{ marginBottom: 'var(--sp-4)' }}>
        <p className="text-sm">{orden.about}</p>
      </Panel>

      {/* El índice va plegado: quien reza de corrido no lo necesita, y quien
          retoma a medias lo abre y salta. */}
      <details className="order-toc">
        <summary>
          {es.prayers.orderIndex.replace('{{count}}', String(orden.sections.length))}
        </summary>
        <ol>
          {orden.sections.map((seccion) => (
            <li key={seccion.id}>
              <a href={`#${seccion.id}`}>{seccion.title}</a>
            </li>
          ))}
        </ol>
      </details>

      {orden.sections.map((seccion, indice) => (
        <section key={seccion.id} id={seccion.id} className="order-section">
          <div className="order-section__head">
            <h2 className="display">
              <span className="order-section__num" aria-hidden="true">
                {indice + 1}
              </span>
              {seccion.title}
            </h2>
            {seccion.prayerId ? (
              <Link to={`/orar/oraciones/${seccion.prayerId}`} className="order-section__link">
                {es.prayers.orderSource}
              </Link>
            ) : null}
          </div>
          <Blocks blocks={seccion.blocks} />
        </section>
      ))}

      <Tailpiece />

      <SourceNote meta={orden.meta} status="complete" />

      <Section title={es.prayers.otherOrders}>
        <div className="list">
          {otros.map((o) => (
            <ListRow key={o.id} to={`/orar/oraciones/orden/${o.id}`} title={o.title} meta={o.subtitle} />
          ))}
        </div>
      </Section>
    </article>
  );
}
