/**
 * La ficha de una virtud.
 *
 * Primero lo que se puede usar ya —la línea para repetir y el paso a sus oraciones—;
 * luego qué es, lo que se le opone y cómo se empieza; y al final, plegado o más
 * abajo, lo que dicen la Escritura y los Padres y en qué santos se ve.
 */
import { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ButtonLink, ListRow, NotFound, PageHead, Section, SourceNote } from '@/components/ui';
import { PericopeText } from '@/components/PericopeText';
import { RichText } from '@/components/RichText';
import { useVisitLog } from '@/hooks/useVisitLog';
import { APOPHTHEGMS } from '@/content/apotegmas';
import { SAINT_INDEX } from '@/content/saints';
import { PRAYERS_ALSO, VIRTUES_IN_ORDER, VIRTUE_INFO, isVirtue } from '@/content/prayer-categories';
import { momentById } from '@/content/moments';
import { VIRTUES_BY_ID, VIRTUES_META } from '@/content/virtudes';
import { useCategoryCounts } from '@/features/prayers/useCategoryCounts';
import es from '@/locales/es';

const SANTOS = new Map(SAINT_INDEX.map((s) => [s.id, s]));

export function VirtuePage() {
  const { virtueId = '' } = useParams<{ virtueId: string }>();
  const virtud = isVirtue(virtueId) ? VIRTUES_BY_ID.get(virtueId) : undefined;
  const nombre = momentById(virtueId)?.name ?? '';
  const cuentas = useCategoryCounts();

  useVisitLog(virtud ? { path: `/biblioteca/virtudes/${virtud.id}`, title: nombre, kind: es.virtues.title } : null);

  const dichos = useMemo(
    () => (virtud ? APOPHTHEGMS.filter((a) => virtud.themes.includes(a.theme)).slice(0, 3) : []),
    [virtud],
  );

  if (!virtud) {
    return (
      <div className="page">
        <NotFound title={es.virtues.notFound} />
        <div className="btn-row">
          <ButtonLink to="/biblioteca/virtudes">{es.virtues.title}</ButtonLink>
        </div>
      </div>
    );
  }

  const info = VIRTUE_INFO[virtud.id];
  const posicion = VIRTUES_IN_ORDER.indexOf(virtud.id);
  const anterior = posicion > 0 ? VIRTUES_IN_ORDER[posicion - 1] : undefined;
  const siguiente = posicion < VIRTUES_IN_ORDER.length - 1 ? VIRTUES_IN_ORDER[posicion + 1] : undefined;
  const cuantas = cuentas.get(virtud.id) ?? (PRAYERS_ALSO[virtud.id]?.length ?? 0);

  return (
    <article className="page page--reading">
      <PageHead eyebrow={es.virtues.title} title={nombre} subtitle={momentById(virtud.id)?.description} />

      <aside className="virtue-petition">
        <p className="virtue-petition__text">{info.petition}</p>
        <p className="virtue-petition__from">
          {info.from} · <span lang="el">{info.greek}</span>
        </p>
        <ButtonLink to={`/orar/oraciones/categoria/${virtud.id}`} size="sm">
          {es.virtues.prayAll.replace('{{count}}', String(cuantas)).replace('{{name}}', nombre.toLowerCase())}
        </ButtonLink>
      </aside>

      <Section title={es.virtues.what}>
        <div className="prose">
          {virtud.what.map((parrafo) => (
            <p key={parrafo}>
              <RichText>{parrafo}</RichText>
            </p>
          ))}
        </div>
      </Section>

      <Section title={es.virtues.against}>
        <div className="prose">
          <p>
            <RichText>{virtud.against}</RichText>
          </p>
        </div>
      </Section>

      <Section title={es.virtues.practice}>
        <ul className="tips">
          {virtud.practice.map((paso) => (
            <li key={paso}>{paso}</li>
          ))}
        </ul>
      </Section>

      {virtud.quotes.length > 0 ? (
        <Section title={es.virtues.fathers}>
          {virtud.quotes.map((cita) => (
            <blockquote key={cita.text} className="virtue-quote">
              <p>{cita.text}</p>
              <footer>
                {cita.fatherId ? <Link to={`/biblioteca/padres/${cita.fatherId}`}>{cita.who}</Link> : cita.who}
                {', '}
                {cita.where}
              </footer>
            </blockquote>
          ))}
        </Section>
      ) : null}

      {dichos.length > 0 ? (
        <Section title={es.virtues.desert} action={{ label: es.virtues.moreSayings, to: '/biblioteca/apotegmas' }}>
          {dichos.map((dicho) => (
            <blockquote key={dicho.id} className="virtue-quote">
              <p>{dicho.text}</p>
              <footer>
                {dicho.abba}
                {dicho.ref ? ` · ${dicho.ref}` : ''}
              </footer>
            </blockquote>
          ))}
        </Section>
      ) : null}

      <Section title={es.virtues.scripture}>
        {virtud.scripture.map((cita) => (
          <details key={cita} className="fold">
            <summary>{cita}</summary>
            <PericopeText reference={cita} />
          </details>
        ))}
      </Section>

      {virtud.saints.length > 0 ? (
        <Section title={es.virtues.saints}>
          <div className="list">
            {virtud.saints.map((s) => (
              <ListRow
                key={s.id}
                to={`/calendario/santos/${s.id}`}
                title={SANTOS.get(s.id)?.name ?? s.id}
                meta={s.why}
              />
            ))}
          </div>
        </Section>
      ) : null}

      {virtud.see?.length ? (
        <Section title={es.virtues.see}>
          <div className="list">
            {virtud.see.map((enlace) => (
              <ListRow key={enlace.path} to={enlace.path} title={enlace.label} />
            ))}
          </div>
        </Section>
      ) : null}

      <nav className="prayer-nav" aria-label={es.virtues.title}>
        {anterior ? (
          <Link to={`/biblioteca/virtudes/${anterior}`} className="prayer-nav__link">
            <span className="prayer-nav__label">← {es.virtues.previous}</span>
            <span className="prayer-nav__title">{momentById(anterior)?.name}</span>
          </Link>
        ) : null}
        {siguiente ? (
          <Link to={`/biblioteca/virtudes/${siguiente}`} className="prayer-nav__link prayer-nav__link--next">
            <span className="prayer-nav__label">{es.virtues.next} →</span>
            <span className="prayer-nav__title">{momentById(siguiente)?.name}</span>
          </Link>
        ) : null}
      </nav>

      <SourceNote meta={VIRTUES_META} status="complete" />
    </article>
  );
}
