/**
 * Una parte del catecismo, con sus preguntas.
 *
 * Cada pregunta lleva su respuesta debajo, no detrás de otro toque: quien
 * llega aquí quiere leer, no navegar. Lo que sí se marca aparte es lo que no
 * conviene confundir con doctrina cerrada: lo discutido entre confesiones y lo
 * que la Iglesia no ha definido.
 */
import { useMemo } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { CATECHISM_LEVELS, CATECHISM_META, type CatechismLevel } from '@/content/catechism';
import { CATECHISM_PARTS } from '@/content/catechism-parts';
import { ButtonLink, Empty, Notice, PageHead, SourceNote, Tag } from '@/components/ui';
import { RichText } from '@/components/RichText';
import { useHashScroll } from '@/hooks/useHashScroll';
import { useVisitLog } from '@/hooks/useVisitLog';
import es from '@/locales/es';

export function CatechismPartPage() {
  const { partId = '' } = useParams();
  const [params] = useSearchParams();
  const nivel = params.get('nivel') as CatechismLevel | null;

  const parte = CATECHISM_PARTS.find((p) => p.id === partId);
  const entradas = useMemo(
    () => (nivel ? (parte?.entries ?? []).filter((e) => e.level === nivel) : (parte?.entries ?? [])),
    [parte, nivel],
  );

  useVisitLog(parte ? { path: `/biblioteca/catecismo/${partId}`, title: parte.title, kind: es.catechism.title } : null);

  // El buscador de la portada enlaza a una pregunta concreta, no a la parte
  // entera. Al cambiar de filtro la lista se rehace y hay que repetir el salto.
  useHashScroll([partId, nivel]);

  if (!parte) {
    return (
      <div className="page">
        <Empty title="Esa parte del catecismo no existe" heading />
        <div className="btn-row">
          <ButtonLink to="/biblioteca/catecismo">{es.catechism.title}</ButtonLink>
        </div>
      </div>
    );
  }

  return (
    <article className="page page--reading">
      <PageHead eyebrow={es.catechism.title} title={parte.title} subtitle={parte.summary} />

      {entradas.map((entrada) => (
        <section key={entrada.id} id={entrada.id} className="catechism-entry">
          <h2 className="catechism-entry__q">{entrada.question}</h2>

          <div className="tag-row" style={{ margin: 'var(--sp-2) 0 var(--sp-3)' }}>
            <Tag tone={entrada.level === 'nuevo' ? 'green' : entrada.level === 'iniciado' ? 'blue' : 'gold'}>
              {CATECHISM_LEVELS[entrada.level].name}
            </Tag>
          </div>

          <div className="prose">
            {entrada.answer.map((parrafo) => (
              <p key={parrafo.slice(0, 40)}>
                <RichText>{parrafo}</RichText>
              </p>
            ))}
          </div>

          {entrada.scripture?.length ? (
            <p className="muted text-sm" style={{ marginTop: 'var(--sp-3)' }}>
              {es.catechism.inScripture}: {entrada.scripture.join(' · ')}
            </p>
          ) : null}

          {/* Lo discutido se marca como discutido. Un catecismo que gana todas
              las discusiones por incomparecencia del contrario no enseña. */}
          {entrada.disputed ? (
            <div style={{ marginTop: 'var(--sp-4)' }}>
              <Notice variant="warn">
                <span>
                  <strong>{es.catechism.disputed}. </strong>
                  <RichText max={3}>{entrada.disputed}</RichText>
                </span>
              </Notice>
            </div>
          ) : null}

          {entrada.undefined_ ? (
            <div style={{ marginTop: 'var(--sp-3)' }}>
              <Notice variant="pending">
                <span>
                  <strong>{es.catechism.notDefined}. </strong>
                  <RichText max={3}>{entrada.undefined_}</RichText>
                </span>
              </Notice>
            </div>
          ) : null}

          {entrada.seeAlso?.length ? (
            <p className="text-sm" style={{ marginTop: 'var(--sp-4)' }}>
              {es.catechism.seeAlso}:{' '}
              {entrada.seeAlso.map((enlace, i) => (
                <span key={enlace.path}>
                  {i > 0 ? ' · ' : ''}
                  <Link to={enlace.path}>{enlace.label}</Link>
                </span>
              ))}
            </p>
          ) : null}
        </section>
      ))}

      <div className="btn-row" style={{ marginTop: 'var(--sp-6)' }}>
        <ButtonLink to="/biblioteca/catecismo" variant="ghost" size="sm">
          {es.catechism.allParts}
        </ButtonLink>
      </div>

      <SourceNote meta={CATECHISM_META} />
    </article>
  );
}
