import { useParams } from 'react-router-dom';
import { useAsync } from '@/hooks/useAsync';
import { db } from '@/db/db';
import {
  Empty,
  ListRow,
  Loading,
  Notice,
  PageHead,
  Panel,
  Section,
  SourceNote,
  StatusTag,
  Tag,
} from '@/components/ui';
import { ReaderToolbar } from '@/components/Reader';
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
        <Empty title="Ese Padre no está incorporado" heading />
      </div>
    );
  }

  const item = father.data;

  return (
    <article className="page page--reading">
      <PageHead eyebrow={es.library.fathers} title={item.name} subtitle={item.fullName} />

      <div className="tag-row" style={{ marginBottom: 'var(--sp-4)' }}>
        <Tag tone="gold">{item.century}</Tag>
        {item.feastDay ? <Tag>{formatMonthDay(item.feastDay)}</Tag> : null}
      </div>

      <ReaderToolbar favorite={{ kind: 'father-work', refId: item.id, title: item.name, path }} />

      <div className="prose book-surface" style={{ marginTop: 'var(--sp-5)' }}>
        <p>{item.biography}</p>
      </div>

      {/* Lo que enseñó: la razón por la que la Iglesia sigue leyéndolo. */}
      {item.teaching.length > 0 ? (
        <Section title={es.library.teaching}>
          <div className="prose">
            {item.teaching.map((parrafo) => (
              <p key={parrafo.slice(0, 40)}>{parrafo}</p>
            ))}
          </div>
        </Section>
      ) : null}

      {item.caution ? (
        <div style={{ marginTop: 'var(--sp-5)' }}>
          <Notice variant="warn">
            <span>
              <strong>{es.library.caution}. </strong>
              {item.caution}
            </span>
          </Notice>
        </div>
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

      {item.reading ? (
        <Section title={es.library.whereToStart}>
          <Panel variant="quiet">
            <p className="text-sm">{item.reading}</p>
          </Panel>
        </Section>
      ) : null}

      <SourceNote meta={item.meta} status={item.status} />
    </article>
  );
}
