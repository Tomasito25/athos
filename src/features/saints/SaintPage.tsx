import { Link, useParams } from 'react-router-dom';
import { useAsync } from '@/hooks/useAsync';
import { db } from '@/db/db';
import { SAINT_CATEGORY_LABELS } from '@/content/saints';
import { Blocks, Empty, Loading, Panel, Section, SourceNote, Tag } from '@/components/ui';
import { ReaderToolbar } from '@/components/Reader';
import { RichText } from '@/components/RichText';
import { otraFicha } from '@/content/links';
import { useVisitLog } from '@/hooks/useVisitLog';
import { formatMonthDay } from '@/lib/format';
import es from '@/locales/es';

/** ¿Está el himno sin incorporar? */
const esPendiente = (bloques?: { kind: string }[]) =>
  !bloques?.length || bloques.every((b) => b.kind === 'pending');

export function SaintPage() {
  const { saintId = '' } = useParams();
  const saint = useAsync(() => db.saints.get(saintId), [saintId]);
  const path = `/calendario/santos/${saintId}`;

  useVisitLog(saint.data ? { path, title: saint.data.name, kind: es.saints.title } : null);

  if (saint.loading) return <Loading />;
  if (!saint.data) {
    return (
      <div className="page">
        <Empty title="Ese santo no está incorporado" text={es.app.pending} heading />
      </div>
    );
  }

  const item = saint.data;
  // Muchos santos son además Padres de la Iglesia, y esa otra ficha es la que
  // trae lo que enseñaron. Sin este enlace hay que salir a buscarla.
  const comoPadre = otraFicha(item.name, 'santo');

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

      {comoPadre ? (
        <Panel variant="quiet" style={{ marginBottom: 'var(--sp-4)' }}>
          <p className="text-sm">
            {es.saints.alsoFather}{' '}
            <Link to={comoPadre.path}>{es.saints.seeTeaching}</Link>
          </p>
        </Panel>
      ) : null}

      <Section title={es.saints.biography}>
        <div className="prose book-surface">
          <p>
            <RichText>{item.biography}</RichText>
          </p>
        </div>
      </Section>

      {/* Cuando el himno no está incorporado, la sección explicaba nada: sólo
          decía «pendiente». Al menos que se sepa qué es un tropario. */}
      <Section title={es.saints.troparion}>
        {esPendiente(item.troparion) ? (
          <Panel variant="quiet">
            <p className="text-sm">{es.saints.whatIsTroparion}</p>
            <p className="muted text-sm" style={{ marginTop: 'var(--sp-3)' }}>
              {es.saints.hymnPending}
            </p>
          </Panel>
        ) : (
          <Blocks blocks={item.troparion ?? []} />
        )}
      </Section>

      <Section title={es.saints.kontakion}>
        {esPendiente(item.kontakion) ? (
          <Panel variant="quiet">
            <p className="text-sm">{es.saints.whatIsKontakion}</p>
          </Panel>
        ) : (
          <Blocks blocks={item.kontakion ?? []} />
        )}
      </Section>

      <SourceNote meta={item.meta} status={item.status} />
    </article>
  );
}
