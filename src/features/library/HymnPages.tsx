/** Páginas de akathistos y cánones: misma estructura, distinta colección. */
import { useParams } from 'react-router-dom';
import { useAsync } from '@/hooks/useAsync';
import { HYMNS_NOTE } from '@/content/hymns';
import { Blocks, Empty, ListRow, Loading, PageHead, Section, SourceNote, StatusTag, Tag } from '@/components/ui';
import { ReaderToolbar } from '@/components/Reader';
import { useVisitLog } from '@/hooks/useVisitLog';
import type { Akathist, Canon, FavoriteKind } from '@/types';
import es from '@/locales/es';

export function HymnIndex({
  title,
  subtitle,
  basePath,
  load,
}: {
  title: string;
  subtitle: string;
  basePath: string;
  load: () => Promise<Array<Akathist | Canon>>;
}) {
  const hymns = useAsync(load, [basePath]);

  return (
    <div className="page">
      <PageHead title={title} subtitle={subtitle} />
      {hymns.loading ? <Loading /> : null}
      <div className="list">
        {hymns.data?.map((hymn) => (
          <ListRow
            key={hymn.id}
            to={`${basePath}/${hymn.id}`}
            title={hymn.title}
            meta={hymn.dedication}
            trailing={<StatusTag status={hymn.status} />}
          />
        ))}
      </div>
      <p className="source-note">{HYMNS_NOTE}</p>
    </div>
  );
}

export function HymnDetail({
  eyebrow,
  basePath,
  favoriteKind,
  load,
}: {
  eyebrow: string;
  basePath: string;
  favoriteKind: FavoriteKind;
  load: (id: string) => Promise<Akathist | Canon | undefined>;
}) {
  const params = useParams();
  const id = params.akathistId ?? params.canonId ?? '';
  const hymn = useAsync(() => load(id), [id]);
  const path = `${basePath}/${id}`;

  useVisitLog(hymn.data ? { path, title: hymn.data.title, kind: eyebrow } : null);

  if (hymn.loading) return <Loading />;
  if (!hymn.data) {
    return (
      <div className="page">
        <Empty title="Ese himno no está incorporado" text={es.app.pending} />
      </div>
    );
  }

  const item = hymn.data;
  const sections = 'sections' in item ? item.sections : item.odes;

  return (
    <article className="page page--reading">
      <header style={{ paddingTop: 'var(--sp-5)', marginBottom: 'var(--sp-4)' }}>
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="display" style={{ fontSize: 'var(--text-2xl)', margin: 'var(--sp-2) 0' }}>
          {item.title}
        </h1>
        <div className="tag-row">
          <Tag tone="gold">{item.dedication}</Tag>
          {'tone' in item && item.tone ? <Tag>Tono {item.tone}</Tag> : null}
          <StatusTag status={item.status} />
        </div>
        <div style={{ marginTop: 'var(--sp-4)' }}>
          <ReaderToolbar
            favorite={{ kind: favoriteKind, refId: item.id, title: item.title, path }}
            note={{ targetKind: favoriteKind, targetId: item.id, targetTitle: item.title, path }}
          />
        </div>
      </header>

      {sections.map((section) => (
        <Section key={section.id} title={section.title}>
          <Blocks blocks={section.blocks} />
        </Section>
      ))}

      <SourceNote meta={item.meta} status={item.status} />
    </article>
  );
}
