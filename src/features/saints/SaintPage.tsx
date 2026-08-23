import { useParams } from 'react-router-dom';
import { useAsync } from '@/hooks/useAsync';
import { db } from '@/db/db';
import { SAINT_CATEGORY_LABELS } from '@/content/saints';
import { Blocks, Empty, Loading, Section, SourceNote, Tag } from '@/components/ui';
import { ReaderToolbar } from '@/components/Reader';
import { useVisitLog } from '@/hooks/useVisitLog';
import { formatMonthDay } from '@/lib/format';
import es from '@/locales/es';

export function SaintPage() {
  const { saintId = '' } = useParams();
  const saint = useAsync(() => db.saints.get(saintId), [saintId]);
  const path = `/calendario/santos/${saintId}`;

  useVisitLog(saint.data ? { path, title: saint.data.name, kind: es.saints.title } : null);

  if (saint.loading) return <Loading />;
  if (!saint.data) {
    return (
      <div className="page">
        <Empty title="Ese santo no está incorporado" text={es.app.pending} />
      </div>
    );
  }

  const item = saint.data;

  return (
    <article className="page page--reading">
      <header style={{ paddingTop: 'var(--sp-5)', marginBottom: 'var(--sp-4)' }}>
        <p className="eyebrow">{formatMonthDay(item.day)}</p>
        <h1 className="display" style={{ fontSize: 'var(--text-2xl)', margin: 'var(--sp-2) 0' }}>
          {item.name}
        </h1>
        {item.fullName && item.fullName !== item.name ? (
          <p className="muted">{item.fullName}</p>
        ) : null}

        <div className="tag-row" style={{ margin: 'var(--sp-3) 0' }}>
          {item.category.map((category) => (
            <Tag key={category} tone="gold">
              {SAINT_CATEGORY_LABELS[category]}
            </Tag>
          ))}
          {item.century ? <Tag>{`Siglo ${item.century}`}</Tag> : null}
          {item.place ? <Tag>{item.place}</Tag> : null}
        </div>

        <ReaderToolbar
          favorite={{ kind: 'saint', refId: item.id, title: item.name, path }}
          note={{ targetKind: 'saint', targetId: item.id, targetTitle: item.name, path }}
        />
      </header>

      <Section title={es.saints.biography}>
        <div className="prose book-surface">
          <p>{item.biography}</p>
        </div>
      </Section>

      <Section title={es.saints.troparion}>
        <Blocks blocks={item.troparion ?? []} />
      </Section>

      <Section title={es.saints.kontakion}>
        <Blocks blocks={item.kontakion ?? []} />
      </Section>

      <SourceNote meta={item.meta} status={item.status} />
    </article>
  );
}
