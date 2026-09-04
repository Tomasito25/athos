import { Link, useParams } from 'react-router-dom';
import { useAsync } from '@/hooks/useAsync';
import { db } from '@/db/db';
import {
  ListRow,
  Loading,
  Notice,
  PageHead,
  Panel,
  Section,
  SourceNote,
  StatusTag,
  Tag, NotFound } from '@/components/ui';
import { ReaderToolbar } from '@/components/Reader';
import { RichText } from '@/components/RichText';
import { otraFicha } from '@/content/links';
import { useVisitLog } from '@/hooks/useVisitLog';
import { formatMonthDay } from '@/lib/format';
import es from '@/locales/es';

export function FatherPage() {
  const { fatherId = '' } = useParams();
  const father = useAsync(() => db.church_fathers.get(fatherId), [fatherId]);
  const path = `/biblioteca/padres/${fatherId}`;

  useVisitLog(father.data ? { path, title: father.data.name, kind: es.library.fathers } : null);

  if (father.loading) return <Loading />;
  if (!father.data) {
    return (
      <div className="page">
        <NotFound title="Ese Padre no está incorporado"  />
      </div>
    );
  }

  const item = father.data;
  // La ficha del santo trae el día de su fiesta y su vida; ésta, la doctrina.
  const comoSanto = otraFicha(item.name, 'padre');

  return (
    <article className="page page--reading">
      <PageHead eyebrow={es.library.fathers} title={item.name} subtitle={item.fullName} />

      <div className="tag-row" style={{ marginBottom: 'var(--sp-4)' }}>
        <Tag tone="gold">{item.century}</Tag>
        {item.feastDay ? <Tag>{formatMonthDay(item.feastDay)}</Tag> : null}
      </div>

      {comoSanto ? (
        <Panel variant="quiet" style={{ marginBottom: 'var(--sp-4)' }}>
          <p className="text-sm">
            {es.saints.alsoSaint} <Link to={comoSanto.path}>{item.name}</Link>
          </p>
        </Panel>
      ) : null}

      <ReaderToolbar favorite={{ kind: 'father-work', refId: item.id, title: item.name, path }} />

      <div className="prose book-surface" style={{ marginTop: 'var(--sp-5)' }}>
        <p>
          <RichText>{item.biography}</RichText>
        </p>
      </div>

      {/* Lo que enseñó: la razón por la que la Iglesia sigue leyéndolo. */}
      {item.teaching.length > 0 ? (
        <Section title={es.library.teaching}>
          <div className="prose">
            {item.teaching.map((parrafo) => (
              <p key={parrafo.slice(0, 40)}>
                <RichText>{parrafo}</RichText>
              </p>
            ))}
          </div>
        </Section>
      ) : null}

      {item.caution ? (
        <div style={{ marginTop: 'var(--sp-5)' }}>
          <Notice variant="warn">
            <span>
              <strong>{es.library.caution}. </strong>
              <RichText max={3}>{item.caution}</RichText>
            </span>
          </Notice>
        </div>
      ) : null}

      {item.reading ? (
        <Section title={es.library.whereToStart}>
          <Panel variant="quiet">
            <p className="text-sm">
              <RichText max={3}>{item.reading}</RichText>
            </p>
          </Panel>
        </Section>
      ) : null}

      <Section title={es.library.works}>
        <div className="list">
          {item.works.map((work) => (
            <ListRow
              key={work.id}
              to={`/biblioteca/padres/${item.id}/${work.id}`}
              title={work.title}
              meta={work.summary ?? work.kind}
              trailing={<StatusTag status={work.status} />}
            />
          ))}
        </div>
      </Section>

      <SourceNote meta={item.meta} status={item.status} />
    </article>
  );
}
