/**
 * Las oraciones de un momento.
 *
 * Primero, si el libro las reza seguidas, el orden entero. Luego las oraciones,
 * y aparte lo que es Escritura: una lista de veinte en la que se mezclan oraciones
 * de una línea con capítulos enteros no ayuda a elegir. Las que también sirven
 * aquí, aunque sean de otro momento, entran con las demás.
 *
 * Si el momento es una virtud, lleva encima su línea para repetir y el paso a su
 * ficha de la biblioteca.
 */
import { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAsync } from '@/hooks/useAsync';
import { db } from '@/db/db';
import { ButtonLink, Empty, ListRow, Loading, NotFound, PageHead, Section, StatusTag } from '@/components/ui';
import { PRAYERS_ALSO, VIRTUE_INFO, isVirtue } from '@/content/prayer-categories';
import { groupOfMoment, momentById } from '@/content/moments';
import { ordersForCategory } from '@/content/prayer-orders';
import { MomentIcon } from './MomentIcon';
import type { Prayer } from '@/types';
import es from '@/locales/es';

/** Las que traen su texto, frente a las que son sólo un salmo o un pasaje. */
const tieneTextoPropio = (p: Prayer) => p.blocks.some((b) => b.kind !== 'rubric' && b.kind !== 'reading' && b.kind !== 'psalm');

function Lista({ oraciones }: { oraciones: Prayer[] }) {
  return (
    <div className="list">
      {oraciones.map((prayer) => (
        <ListRow
          key={prayer.id}
          to={`/orar/oraciones/${prayer.id}`}
          title={prayer.title}
          meta={prayer.subtitle}
          trailing={<StatusTag status={prayer.status} />}
        />
      ))}
    </div>
  );
}

export function PrayerCategoryPage() {
  const { categoryId = '' } = useParams<{ categoryId: string }>();
  const category = momentById(categoryId);
  const grupo = groupOfMoment(categoryId);
  const ordenes = ordersForCategory(categoryId);

  const oraciones = useAsync(async () => {
    const suyas = await db.prayers.where('category').equals(categoryId).sortBy('order');
    const otras = PRAYERS_ALSO[category?.id ?? 'otras'] ?? [];
    const tambien = category ? (await db.prayers.bulkGet(otras)).filter((p): p is Prayer => Boolean(p)) : [];
    return [...suyas, ...tambien];
  }, [categoryId]);

  const [conTexto, deLaEscritura] = useMemo(() => {
    const todas = oraciones.data ?? [];
    return [todas.filter(tieneTextoPropio), todas.filter((p) => !tieneTextoPropio(p))];
  }, [oraciones.data]);

  if (!category) {
    return (
      <div className="page">
        <NotFound title="Ese momento no existe" text="Vuelve al menú y elige otro." />
        <div className="btn-row">
          <ButtonLink to="/orar/oraciones">{es.prayers.chooseMoment}</ButtonLink>
        </div>
      </div>
    );
  }

  const virtud = isVirtue(category.id) ? VIRTUE_INFO[category.id] : null;

  return (
    <div className="page">
      <PageHead
        eyebrow={grupo?.name ?? es.prayers.title}
        title={category.name}
        subtitle={category.description}
      />

      {virtud ? (
        <aside className="virtue-petition">
          <p className="virtue-petition__text">{virtud.petition}</p>
          <p className="virtue-petition__from">
            {virtud.from} · <span lang="el">{virtud.greek}</span>
          </p>
          <Link className="virtue-petition__link" to={`/biblioteca/virtudes/${category.id}`}>
            {es.prayers.readAbout.replace('{{name}}', category.name.toLowerCase())}
          </Link>
        </aside>
      ) : null}

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

      {oraciones.loading ? <Loading /> : null}

      {!oraciones.loading && !conTexto.length && !deLaEscritura.length ? (
        <Empty title={es.app.empty} text="Todavía no hay oraciones incorporadas en este momento." />
      ) : null}

      {conTexto.length && deLaEscritura.length ? (
        <>
          <Section title={es.prayers.groupPrayers}>
            <Lista oraciones={conTexto} />
          </Section>
          <Section title={es.prayers.groupScripture}>
            <Lista oraciones={deLaEscritura} />
          </Section>
        </>
      ) : (
        <Lista oraciones={conTexto.length ? conTexto : deLaEscritura} />
      )}

      <div className="btn-row" style={{ marginTop: 'var(--sp-6)' }}>
        <ButtonLink to={grupo ? `/orar/oraciones/seccion/${grupo.id}` : '/orar/oraciones'} variant="ghost" size="sm">
          {grupo ? es.prayers.backToSection.replace('{{name}}', grupo.name) : es.prayers.chooseMoment}
        </ButtonLink>
      </div>
    </div>
  );
}
