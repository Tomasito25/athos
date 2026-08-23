import { useParams } from 'react-router-dom';
import { useAsync } from '@/hooks/useAsync';
import { db } from '@/db/db';
import { Blocks, Empty, Loading, SourceNote } from '@/components/ui';
import { ReaderToolbar } from '@/components/Reader';
import { useVisitLog } from '@/hooks/useVisitLog';
import es from '@/locales/es';

export function WorkPage() {
  const { fatherId = '', workId = '' } = useParams();
  const father = useAsync(() => db.church_fathers.get(fatherId), [fatherId]);
  const path = `/biblioteca/padres/${fatherId}/${workId}`;
  const work = father.data?.works.find((w) => w.id === workId);

  useVisitLog(work ? { path, title: work.title, kind: es.library.fathers } : null);

  if (father.loading) return <Loading />;
  if (!work) {
    return (
      <div className="page">
        <Empty title="Esa obra no está incorporada" text={es.app.pending} />
      </div>
    );
  }

  return (
    <article className="page page--reading">
      <header style={{ paddingTop: 'var(--sp-5)', marginBottom: 'var(--sp-4)' }}>
        <p className="eyebrow">{father.data?.name}</p>
        <h1 className="display" style={{ fontSize: 'var(--text-2xl)', margin: 'var(--sp-2) 0' }}>
          {work.title}
        </h1>
        <ReaderToolbar
          favorite={{ kind: 'father-work', refId: work.id, title: work.title, subtitle: father.data?.name, path }}
          note={{ targetKind: 'father-work', targetId: work.id, targetTitle: work.title, path }}
        />
      </header>

      <Blocks blocks={work.blocks} illuminated={work.status !== 'pending'} />
      <SourceNote meta={work.meta} status={work.status} />
    </article>
  );
}
