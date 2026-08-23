import { useParams } from 'react-router-dom';
import { useAsync } from '@/hooks/useAsync';
import { db } from '@/db/db';
import { Empty, ListRow, Loading, PageHead, Section, SourceNote, StatusTag, Tag } from '@/components/ui';
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
        <Empty title="Ese Padre no está incorporado" />
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

      <Section title={es.library.works}>
        <div className="list">
          {item.works.map((work) => (
            <ListRow
              key={work.id}
              to={`/biblioteca/padres/${item.id}/${work.id}`}
              title={work.title}
              meta={work.kind}
              trailing={<StatusTag status={work.status} />}
            />
          ))}
        </div>
      </Section>

      <SourceNote meta={item.meta} status={item.status} />
    </article>
  );
}
