import { useAsync } from '@/hooks/useAsync';
import { db } from '@/db/db';
import { ATHOS_INTRO } from '@/content/athos';
import { AthosMap, MonasteryLink } from './AthosMap';
import { ListRow, Loading, PageHead, Section } from '@/components/ui';
import es from '@/locales/es';

/** Portada del Monte Athos: el mapa, los veinte monasterios y los artículos. */
export function AthosPage() {
  const monasteries = useAsync(() => db.monasteries.orderBy('rank').toArray(), []);
  const articles = useAsync(() => db.athos_articles.toArray(), []);

  return (
    <div className="page">
      <PageHead eyebrow="Ἅγιον Ὄρος" title={es.library.athos} subtitle={ATHOS_INTRO} />

      {monasteries.loading ? <Loading /> : <AthosMap monasteries={monasteries.data ?? []} />}

      <Section title={es.library.monasteries}>
        <div className="grid">
          {monasteries.data?.map((monastery) => (
            <MonasteryLink key={monastery.id} monastery={monastery} />
          ))}
        </div>
      </Section>

      <Section title={es.library.articles}>
        <div className="list">
          {articles.data?.map((article) => (
            <ListRow
              key={article.id}
              to={`/biblioteca/athos/${article.id}`}
              title={article.title}
              meta={article.blocks.find((b) => b.kind === 'text')?.content.slice(0, 150)}
            />
          ))}
        </div>
      </Section>
    </div>
  );
}
