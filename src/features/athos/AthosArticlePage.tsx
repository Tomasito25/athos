import { useParams } from 'react-router-dom';
import { useAsync } from '@/hooks/useAsync';
import { db } from '@/db/db';
import { Blocks, Loading, PageHead, SourceNote, NotFound } from '@/components/ui';
import { ReaderToolbar } from '@/components/Reader';
import { useVisitLog } from '@/hooks/useVisitLog';
import es from '@/locales/es';

export function AthosArticlePage() {
  const { articleId = '' } = useParams();
  const article = useAsync(() => db.athos_articles.get(articleId), [articleId]);
  const path = `/biblioteca/athos/${articleId}`;

  useVisitLog(article.data ? { path, title: article.data.title, kind: es.library.athos } : null);

  if (article.loading) return <Loading />;
  if (!article.data) {
    return (
      <div className="page">
        <NotFound title="Ese artículo no existe"  />
      </div>
    );
  }

  return (
    <article className="page page--reading">
      <PageHead eyebrow={es.library.athos} title={article.data.title} />
      <ReaderToolbar
        favorite={{ kind: 'athos-article', refId: article.data.id, title: article.data.title, path }}
        note={{
          targetKind: 'athos-article',
          targetId: article.data.id,
          targetTitle: article.data.title,
          path,
        }}
      />
      <div style={{ marginTop: 'var(--sp-5)' }}>
        <Blocks blocks={article.data.blocks} linked />
      </div>
      <SourceNote meta={article.data.meta} status={article.data.status} />
    </article>
  );
}
