import { Link, useParams } from 'react-router-dom';
import { useAsync } from '@/hooks/useAsync';
import { db } from '@/db/db';
import { SAINT_CATEGORY_LABELS } from '@/content/saints';
import { Blocks, Panel, Section, SourceNote, Tag, Skeleton, NotFound } from '@/components/ui';
import { ReaderToolbar } from '@/components/Reader';
import { RichText } from '@/components/RichText';
import { otraFicha } from '@/content/links';
import {
  GENERAL_TROPARION_META,
  generalTroparionFor,
} from '@/content/troparia-general';
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

  if (saint.loading) return <Skeleton title lines={6} />;
  if (!saint.data) {
    return (
      <div className="page">
        <NotFound title="Ese santo no está incorporado" text={es.app.pending}  />
      </div>
    );
  }

  const item = saint.data;
  // Muchos santos son además Padres de la Iglesia, y esa otra ficha es la que
  // trae lo que enseñaron. Sin este enlace hay que salir a buscarla.
  const comoPadre = otraFicha(item.name, 'santo');
  const general = generalTroparionFor(item.category, item.id);

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
      {/*
        Sin tropario propio no se deja el hueco: se canta el general del rango,
        que es lo que la Iglesia hace cuando no tiene el propio a mano. La
        ficha dice cuál es y por qué, para que nadie lo tome por el suyo.
      */}
      <Section title={es.saints.troparion}>
        {esPendiente(item.troparion) ? (
          general ? (
            <>
              <Panel variant="quiet">
                <p className="text-sm">
                  {general.own ? es.saints.feastTroparion : es.saints.generalIntro}
                </p>
              </Panel>
              <div className="tag-row" style={{ margin: 'var(--sp-3) 0' }}>
                <Tag tone="gold">{general.name}</Tag>
                <Tag>{general.tone}</Tag>
              </div>
              <Blocks blocks={general.blocks} />
              <SourceNote meta={GENERAL_TROPARION_META} />
            </>
          ) : (
            <Panel variant="quiet">
              <p className="text-sm">{es.saints.whatIsTroparion}</p>
              <p className="muted text-sm" style={{ marginTop: 'var(--sp-3)' }}>
                {es.saints.hymnPending}
              </p>
            </Panel>
          )
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
