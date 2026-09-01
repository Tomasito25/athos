/**
 * Una época, con su cronología.
 *
 * Los hechos sin párrafo explicativo conservan su fecha y su sitio: el hueco
 * se ve, que era la idea. Los concilios llevan su ficha desplegada.
 */
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { EVENT_KINDS, HISTORY_META } from '@/content/history';
import { HISTORY_PERIODS } from '@/content/history-all';
import { ButtonLink, Empty, Notice, PageHead, Panel, SourceNote, Tag } from '@/components/ui';
import { RichText } from '@/components/RichText';
import { useHashScroll } from '@/hooks/useHashScroll';
import { useVisitLog } from '@/hooks/useVisitLog';
import es from '@/locales/es';

export function HistoryPeriodPage() {
  const { periodId = '' } = useParams();
  const periodo = HISTORY_PERIODS.find((p) => p.id === periodId);
  const indice = HISTORY_PERIODS.findIndex((p) => p.id === periodId);
  const anterior = indice > 0 ? HISTORY_PERIODS[indice - 1] : null;
  const siguiente = indice >= 0 && indice < HISTORY_PERIODS.length - 1 ? HISTORY_PERIODS[indice + 1] : null;

  useVisitLog(periodo ? { path: `/biblioteca/historia/${periodId}`, title: periodo.title, kind: es.history.title } : null);
  // La portada enlaza a un concilio concreto, no a la época entera.
  useHashScroll([periodId]);

  if (!periodo) {
    return (
      <div className="page">
        <Empty title="Esa época no existe" heading />
        <div className="btn-row">
          <ButtonLink to="/biblioteca/historia">{es.history.title}</ButtonLink>
        </div>
      </div>
    );
  }

  return (
    <article className="page page--reading">
      <PageHead eyebrow={es.history.title} title={periodo.title} subtitle={periodo.range} />

      <div className="prose book-surface">
        {periodo.summary.map((parrafo) => (
          <p key={parrafo.slice(0, 40)}>
            <RichText>{parrafo}</RichText>
          </p>
        ))}
      </div>

      <ol className="timeline">
        {periodo.events.map((hecho) => (
          <li key={hecho.id} id={hecho.id} className="timeline__item">
            <div className="timeline__year">{hecho.year}</div>
            <div className="timeline__body">
              {/* También el título: media cronología nombra a alguien que
                  tiene ficha —«San Antonio se retira al desierto»— y era el
                  sitio más obvio para pinchar. */}
              <h2 className="timeline__title">
                <RichText max={1}>{hecho.title}</RichText>
              </h2>
              <div className="tag-row" style={{ marginTop: 'var(--sp-2)' }}>
                <Tag tone={hecho.kind === 'concilio' ? 'gold' : hecho.kind === 'cisma' ? 'red' : undefined}>
                  {EVENT_KINDS[hecho.kind]}
                </Tag>
              </div>

              {hecho.detail ? (
                <p style={{ marginTop: 'var(--sp-3)' }}>
                  <RichText>{hecho.detail}</RichText>
                </p>
              ) : (
                // Sin párrafo, el hecho conserva su fecha y su sitio. El hueco
                // se ve, que es la idea: una ausencia no se ve.
                <p className="muted text-sm" style={{ marginTop: 'var(--sp-3)' }}>
                  {es.history.noDetail}
                </p>
              )}

              {hecho.council ? (
                <Panel variant="sunken" style={{ marginTop: 'var(--sp-4)' }}>
                  <p className="eyebrow">
                    {hecho.council.number
                      ? `${hecho.council.number}.º Concilio Ecuménico`
                      : es.history.localCouncil}
                  </p>
                  <dl className="council">
                    <div>
                      <dt>{es.history.place}</dt>
                      <dd>
                        {hecho.council.place} · {hecho.council.year}
                      </dd>
                    </div>
                    <div>
                      <dt>{es.history.convoked}</dt>
                      <dd>{hecho.council.convokedBy}</dd>
                    </div>
                    {hecho.council.attendees ? (
                      <div>
                        <dt>{es.history.attendees}</dt>
                        <dd>{hecho.council.attendees}</dd>
                      </div>
                    ) : null}
                    <div>
                      <dt>{es.history.against}</dt>
                      <dd>
                        <RichText max={2}>{hecho.council.against}</RichText>
                      </dd>
                    </div>
                  </dl>

                  <p className="eyebrow" style={{ marginTop: 'var(--sp-4)' }}>
                    {es.history.defined}
                  </p>
                  <ul className="council__list">
                    {hecho.council.defined.map((linea) => (
                      <li key={linea.slice(0, 30)}>
                        <RichText max={2}>{linea}</RichText>
                      </li>
                    ))}
                  </ul>

                  {hecho.council.note ? (
                    <p className="muted text-sm" style={{ marginTop: 'var(--sp-3)' }}>
                      <RichText max={3}>{hecho.council.note}</RichText>
                    </p>
                  ) : null}
                </Panel>
              ) : null}

              {hecho.disputed ? (
                <div style={{ marginTop: 'var(--sp-3)' }}>
                  <Notice variant="warn">
                    <span>
                      <strong>{es.history.disputed}. </strong>
                      <RichText max={3}>{hecho.disputed}</RichText>
                    </span>
                  </Notice>
                </div>
              ) : null}

              {hecho.seeAlso?.length ? (
                <p className="text-sm" style={{ marginTop: 'var(--sp-3)' }}>
                  {hecho.seeAlso.map((e, i) => (
                    <span key={e.path}>
                      {i > 0 ? ' · ' : ''}
                      <Link to={e.path}>{e.label}</Link>
                    </span>
                  ))}
                </p>
              ) : null}
            </div>
          </li>
        ))}
      </ol>

      <div className="btn-row" style={{ marginTop: 'var(--sp-6)' }}>
        {anterior ? (
          <ButtonLink to={`/biblioteca/historia/${anterior.id}`} variant="ghost" size="sm">
            ← {anterior.title}
          </ButtonLink>
        ) : null}
        {siguiente ? (
          <ButtonLink to={`/biblioteca/historia/${siguiente.id}`} size="sm">
            {siguiente.title} →
          </ButtonLink>
        ) : null}
      </div>

      <SourceNote meta={HISTORY_META} />
    </article>
  );
}
