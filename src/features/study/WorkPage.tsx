/** Ficha de una obra del catálogo de estudio. */
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { STUDY_META, STUDY_WORKS, WORK_KINDS } from '@/content/study';
import { Empty, Notice, PageHead, Panel, Section, SourceNote, Tag } from '@/components/ui';
import es from '@/locales/es';

export function StudyWorkPage() {
  const { workId = '' } = useParams();
  const obra = STUDY_WORKS.find((o) => o.id === workId);

  if (!obra) {
    return (
      <div className="page">
        <Empty title="Esa obra no está en el catálogo" heading />
      </div>
    );
  }

  return (
    <article className="page page--reading">
      <PageHead eyebrow={WORK_KINDS[obra.kind]} title={obra.title} subtitle={obra.author} />

      <div className="tag-row" style={{ marginBottom: 'var(--sp-4)' }}>
        <Tag tone="gold">{obra.century}</Tag>
        <Tag>{WORK_KINDS[obra.kind]}</Tag>
      </div>

      <Section title="Qué es">
        <div className="prose book-surface">
          <p>{obra.what}</p>
        </div>
      </Section>

      <Section title="Por qué importa">
        <div className="prose book-surface">
          <p>{obra.why}</p>
        </div>
      </Section>

      {obra.path ? (
        <Panel style={{ marginTop: 'var(--sp-4)' }}>
          <Link to={obra.path} className="btn btn--primary btn--block">
            {es.study.openInAthos}
          </Link>
        </Panel>
      ) : (
        <Notice variant="pending">
          ATHOS no incluye el texto de esta obra: no se ha encontrado una traducción española con
          licencia compatible. La ficha queda para que sepas qué es y puedas buscarla.
        </Notice>
      )}

      <SourceNote meta={STUDY_META} />
    </article>
  );
}
