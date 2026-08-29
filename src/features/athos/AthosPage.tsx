/**
 * Portada del Monte Athos: el mapa, los veinte monasterios y los artículos.
 *
 * Los artículos van en tres bloques —qué es la Montaña, cómo se vive allí, qué
 * se ve y cómo se llega— porque doce entradillas seguidas obligan a leerlas
 * todas para saber cuál interesa.
 */
import { useMemo } from 'react';
import { useAsync } from '@/hooks/useAsync';
import { db } from '@/db/db';
import { ATHOS_INTRO } from '@/content/athos';
import { ATHOS_GROUPS, ATHOS_LEAD } from '@/content/athos-articles';
import { AthosMap, MonasteryLink } from './AthosMap';
import { ListRow, Loading, PageHead, Section } from '@/components/ui';
import es from '@/locales/es';

export function AthosPage() {
  const monasteries = useAsync(() => db.monasteries.orderBy('rank').toArray(), []);
  const articles = useAsync(() => db.athos_articles.toArray(), []);

  const porId = useMemo(
    () => new Map((articles.data ?? []).map((a) => [a.id, a])),
    [articles.data],
  );

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

      {ATHOS_GROUPS.map((grupo) => {
        const dentro = grupo.articles.map((id) => porId.get(id)).filter((a) => a !== undefined);
        if (dentro.length === 0) return null;
        return (
          <Section key={grupo.id} title={grupo.title}>
            <p className="muted text-sm" style={{ marginBottom: 'var(--sp-3)' }}>
              {grupo.note}
            </p>
            <div className="list">
              {dentro.map((article) => (
                <ListRow
                  key={article.id}
                  to={`/biblioteca/athos/${article.id}`}
                  title={article.title}
                  meta={
                    ATHOS_LEAD[article.id] ??
                    article.blocks.find((b) => b.kind === 'text')?.content.slice(0, 150)
                  }
                />
              ))}
            </div>
          </Section>
        );
      })}
    </div>
  );
}
