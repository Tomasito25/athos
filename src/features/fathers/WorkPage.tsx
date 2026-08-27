import { useParams } from 'react-router-dom';
import { useAsync } from '@/hooks/useAsync';
import { db } from '@/db/db';
import { Blocks, Empty, Loading, Panel, SourceNote } from '@/components/ui';
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
        <Empty title="Esa obra no está incorporada" text={es.app.pending} heading />
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

      {/* De qué trata. Va antes del texto, y cuando el texto está pendiente es
          lo único que hay: mejor eso que una ficha muda. */}
      {work.summary ? (
        <Panel variant="quiet" style={{ marginBottom: 'var(--sp-5)' }}>
          <p className="eyebrow">{es.library.whatItSays}</p>
          <p style={{ marginTop: 'var(--sp-2)' }}>{work.summary}</p>
          {work.written ? (
            <p className="muted text-sm" style={{ marginTop: 'var(--sp-3)' }}>
              {work.written}
            </p>
          ) : null}
        </Panel>
      ) : null}

      <Blocks blocks={work.blocks} illuminated={work.status !== 'pending'} />
      <SourceNote meta={work.meta} status={work.status} />
    </article>
  );
}
