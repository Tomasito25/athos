import { useParams } from 'react-router-dom';
import { useAsync } from '@/hooks/useAsync';
import { db } from '@/db/db';
import { AthosMap } from './AthosMap';
import { Loading, PageHead, Panel, Section, SourceNote, Tag, NotFound } from '@/components/ui';
import { ReaderToolbar } from '@/components/Reader';
import { RichText } from '@/components/RichText';
import { useVisitLog } from '@/hooks/useVisitLog';
import es from '@/locales/es';

export function MonasteryPage() {
  const { monasteryId = '' } = useParams();
  const monastery = useAsync(() => db.monasteries.get(monasteryId), [monasteryId]);
  const all = useAsync(() => db.monasteries.orderBy('rank').toArray(), []);
  const path = `/biblioteca/athos/monasterio/${monasteryId}`;

  useVisitLog(monastery.data ? { path, title: monastery.data.name, kind: es.library.athos } : null);

  if (monastery.loading) return <Loading />;
  if (!monastery.data) {
    return (
      <div className="page">
        <NotFound title="Ese monasterio no está en la lista"  />
      </div>
    );
  }

  const item = monastery.data;

  return (
    <article className="page page--reading">
      <PageHead eyebrow={es.library.athos} title={item.name} subtitle={item.greekName} />

      <div className="tag-row" style={{ marginBottom: 'var(--sp-4)' }}>
        <Tag tone="gold">{item.rank}.º en la jerarquía</Tag>
        <Tag>{item.tradition}</Tag>
        <Tag>{item.founded}</Tag>
        <Tag>Costa {item.location.side}</Tag>
      </div>

      <ReaderToolbar favorite={{ kind: 'monastery', refId: item.id, title: item.name, path }} />

      <Panel style={{ marginTop: 'var(--sp-4)' }}>
        <p className="eyebrow">Fiesta titular</p>
        <p className="panel__title" style={{ marginTop: 'var(--sp-1)' }}>{item.dedication}</p>
      </Panel>

      <div className="prose book-surface" style={{ marginTop: 'var(--sp-5)' }}>
        <p>
          <RichText>{item.description}</RichText>
        </p>
        {/* Qué es hoy. Sin esto, la ficha se queda en la fecha de fundación y
            todos los monasterios se parecen. */}
        {item.today ? (
          <p>
            <RichText>{item.today}</RichText>
          </p>
        ) : null}
      </div>

      {item.saints?.length ? (
        <Section title="Quién vivió aquí">
          <ul className="stack stack--tight">
            {item.saints.map((santo) => (
              <li key={santo} className="row">
                <span style={{ color: 'var(--gold)' }}>✤</span>
                <span>
                  <RichText max={1}>{santo}</RichText>
                </span>
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      {item.treasures?.length ? (
        <Section title="Lo que custodia">
          <ul className="stack stack--tight">
            {item.treasures.map((treasure) => (
              <li key={treasure} className="row">
                <span style={{ color: 'var(--gold)' }}>✤</span>
                <span>{treasure}</span>
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      {item.dependencies?.length ? (
        <Section title="De él dependen">
          <div className="tag-row">
            {item.dependencies.map((dep) => (
              <Tag key={dep}>{dep}</Tag>
            ))}
          </div>
          <p className="muted text-sm" style={{ marginTop: 'var(--sp-2)' }}>
            Sketes, celdas y ermitas. Todo lo que hay en la Montaña pertenece a alguno de los veinte
            monasterios: no existe tierra sin dueño.
          </p>
        </Section>
      ) : null}

      <Section title="En la península">
        <AthosMap monasteries={all.data ?? []} activeId={item.id} />
      </Section>

      <SourceNote meta={item.meta} status={item.status} />
    </article>
  );
}
