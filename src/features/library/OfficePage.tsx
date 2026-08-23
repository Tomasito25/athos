import { useParams } from 'react-router-dom';
import { useAsync } from '@/hooks/useAsync';
import { db } from '@/db/db';
import { Blocks, Empty, Loading, SourceNote } from '@/components/ui';
import { ReaderToolbar } from '@/components/Reader';
import { useVisitLog } from '@/hooks/useVisitLog';
import es from '@/locales/es';

/** Un oficio completo, sección a sección, pensado para seguirlo en la iglesia. */
export function OfficePage() {
  const { officeId = '' } = useParams();
  const office = useAsync(() => db.liturgies.get(officeId), [officeId]);
  const path = `/biblioteca/liturgia/${officeId}`;

  useVisitLog(office.data ? { path, title: office.data.title, kind: es.library.liturgy } : null);

  if (office.loading) return <Loading />;
  if (!office.data) {
    return (
      <div className="page">
        <Empty title="Ese oficio no está incorporado" />
      </div>
    );
  }

  const item = office.data;

  return (
    <article className="page page--reading">
      <header style={{ paddingTop: 'var(--sp-5)', marginBottom: 'var(--sp-4)' }}>
        <p className="eyebrow">{es.library.liturgy}</p>
        <h1 className="display" style={{ fontSize: 'var(--text-2xl)', margin: 'var(--sp-2) 0' }}>
          {item.title}
        </h1>
        {item.subtitle ? <p className="muted">{item.subtitle}</p> : null}
        <div style={{ marginTop: 'var(--sp-4)' }}>
          <ReaderToolbar
            favorite={{ kind: 'office', refId: item.id, title: item.title, path }}
            note={{ targetKind: 'office', targetId: item.id, targetTitle: item.title, path }}
          />
        </div>
      </header>

      <nav aria-label="Índice del oficio" style={{ marginBottom: 'var(--sp-5)' }}>
        <ol className="stack stack--tight">
          {item.sections.map((section, index) => (
            <li key={section.id}>
              <a href={`#${section.id}`} className="muted text-sm">
                {index + 1}. {section.title}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      {item.sections.map((section) => (
        <section key={section.id} id={section.id} style={{ marginTop: 'var(--sp-6)' }}>
          <h2 className="display" style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--sp-3)' }}>
            {section.title}
          </h2>
          <Blocks blocks={section.blocks} />
        </section>
      ))}

      <SourceNote meta={item.meta} status={item.status} />
    </article>
  );
}
