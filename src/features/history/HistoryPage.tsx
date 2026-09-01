/**
 * Historia: la portada.
 *
 * Ocho épocas de Pentecostés a hoy, y un atajo a los siete Concilios, que son
 * las junturas sobre las que se articula todo lo demás.
 */
import { Link } from 'react-router-dom';
import { HISTORY_META } from '@/content/history';
import { COUNCILS, ECUMENICAL, HISTORY_PERIODS, HISTORY_TIMELINE } from '@/content/history-all';
import { ListRow, PageHead, Panel, Section, SourceNote } from '@/components/ui';
import es from '@/locales/es';

export function HistoryPage() {
  const conProsa = HISTORY_TIMELINE.filter((e) => e.detail).length;

  return (
    <div className="page page--reading">
      <PageHead
        eyebrow={es.nav.library}
        title={es.history.title}
        subtitle={es.history.subtitle
          .replace('{{events}}', String(HISTORY_TIMELINE.length))
          .replace('{{councils}}', String(COUNCILS.length))}
      />

      <Section title={es.history.periods}>
        <div className="list">
          {HISTORY_PERIODS.map((periodo) => (
            <ListRow
              key={periodo.id}
              to={`/biblioteca/historia/${periodo.id}`}
              title={periodo.title}
              meta={periodo.summary[0]}
              trailing={<span className="pill-count">{periodo.range}</span>}
            />
          ))}
        </div>
      </Section>

      <Section title={es.history.councils}>
        <p className="muted text-sm" style={{ margin: 'calc(-1 * var(--sp-2)) 0 var(--sp-3)' }}>
          {es.history.councilsIntro}
        </p>
        <div className="list">
          {ECUMENICAL.map((c) => (
            <ListRow
              key={c.id}
              to={`/biblioteca/historia/${c.periodId}#${c.id}`}
              title={`${c.council!.number}. ${c.council!.place}`}
              meta={c.council!.against}
              trailing={<span className="pill-count">{c.council!.year}</span>}
            />
          ))}
        </div>
      </Section>

      <Panel variant="quiet" style={{ marginTop: 'var(--sp-5)' }}>
        {/* Cuando no falta ninguna reseña, decirlo; y si mañana se añade un
            hecho sin párrafo, la cuenta vuelve sola a la otra frase. */}
        <p className="text-sm">
          {conProsa === HISTORY_TIMELINE.length
            ? es.history.skeletonDone
                .replace('{{total}}', String(HISTORY_TIMELINE.length))
                .replace('{{councils}}', String(COUNCILS.length))
            : es.history.skeleton
                .replace('{{written}}', String(conProsa))
                .replace('{{total}}', String(HISTORY_TIMELINE.length))}
        </p>
        <p className="muted text-sm" style={{ marginTop: 'var(--sp-3)' }}>
          {es.history.disputedNote}{' '}
          <Link to="/biblioteca/catecismo">{es.catechism.title}</Link>
        </p>
      </Panel>

      <SourceNote meta={HISTORY_META} />
    </div>
  );
}
