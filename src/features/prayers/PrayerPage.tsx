import { useParams } from 'react-router-dom';
import { useAsync } from '@/hooks/useAsync';
import { db } from '@/db/db';
import { Blocks, Empty, Loading, SourceNote, Tag } from '@/components/ui';
import { ReaderToolbar } from '@/components/Reader';
import { useVisitLog } from '@/hooks/useVisitLog';
import { PRAYER_CATEGORIES } from '@/content/prayers';
import es from '@/locales/es';

/** Una oración, presentada como una página de libro. */
export function PrayerPage() {
  const { prayerId } = useParams<{ prayerId: string }>();
  const prayer = useAsync(() => db.prayers.get(prayerId ?? ''), [prayerId]);

  useVisitLog(
    prayer.data
      ? { path: `/orar/oraciones/${prayer.data.id}`, title: prayer.data.title, kind: es.prayers.title }
      : null,
  );

  if (prayer.loading) return <Loading />;
  if (!prayer.data) {
    return (
      <div className="page">
        <Empty title="Esta oración no está incorporada" heading />
      </div>
    );
  }

  const item = prayer.data;
  const category = PRAYER_CATEGORIES.find((c) => c.id === item.category);

  return (
    <article className="page page--reading">
      <header style={{ paddingTop: 'var(--sp-5)', marginBottom: 'var(--sp-5)' }}>
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

      <SourceNote meta={item.meta} status={item.status} />
    </article>
  );
}
