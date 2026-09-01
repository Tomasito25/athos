/**
 * Leer: la portada.
 *
 * Antes eran cinco filas iguales, y la más importante —lo que la Iglesia lee
 * hoy— era una de ellas. Ahora lo de hoy va delante y con su contenido a la
 * vista, porque quien abre esta pantalla casi siempre viene a eso; después el
 * plan que lleve empezado, si lleva alguno; y sólo entonces los libros, que
 * están ahí para cuando se busca algo concreto.
 */
import { useMemo } from 'react';
import { useAsync } from '@/hooks/useAsync';
import { listBookmarks, listHistory } from '@/db/user';
import { allPlanProgress, nextDay } from '@/db/plans';
import { suggestedKathisma } from '@/db/psalter';
import { READING_PLANS, daysOf } from '@/content/plans';
import { useLiturgicalDay, useToday } from '@/hooks/useLiturgicalDay';
import { ListRow, PageHead, Panel, Progress, Section } from '@/components/ui';
import { IconBook, IconBookmark, IconScroll, OrthodoxCross } from '@/components/icons';
import { isoToDate } from '@/lib/calendar/jdn';
import { formatLongDate } from '@/lib/format';
import es from '@/locales/es';

export function ReadHub() {
  const today = useToday();
  const day = useLiturgicalDay(today);
  const history = useAsync(() => listHistory(4), []);
  const bookmarks = useAsync(() => listBookmarks(), []);
  const planes = useAsync(() => allPlanProgress(), []);
  const kathisma = suggestedKathisma(isoToDate(today));

  const lecturas = day.readings?.readings ?? [];
  const evangelio = lecturas.find((r) => r.kind === 'evangelio');
  const epistola = lecturas.find((r) => r.kind === 'epistola');

  /** El plan empezado con más avance: es el que la persona está siguiendo. */
  const enCurso = useMemo(() => {
    const empezados = (planes.data ?? []).filter((p) => p.completed.length > 0);
    if (empezados.length === 0) return null;
    const suyo = empezados.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))[0];
    const plan = READING_PLANS.find((p) => p.id === suyo.refId);
    if (!plan) return null;
    const dias = daysOf(plan.id);
    const siguiente = nextDay(suyo, dias.length);
    return { plan, dias, hechos: suyo.completed.length, siguiente };
  }, [planes.data]);

  return (
    <div className="page">
      <PageHead title={es.nav.read} subtitle={es.read.subtitle} />

      {/* Lo que la Iglesia lee hoy, con la cita a la vista y no detrás de un
          nombre de sección. */}
      <Section title={es.home.readings}>
        <Panel>
          <p className="eyebrow">{formatLongDate(today)}</p>
          <div className="stack stack--tight" style={{ marginTop: 'var(--sp-3)' }}>
            {epistola ? (
              <ListRow to="/leer/lecturas" title={es.home.epistle} meta={epistola.reference} />
            ) : null}
            {evangelio ? (
              <ListRow to="/leer/lecturas" title={es.home.gospel} meta={evangelio.reference} />
            ) : null}
            {lecturas.length === 0 ? (
              <ListRow to="/leer/lecturas" title={es.home.readings} meta={es.app.pending} />
            ) : null}
          </div>
        </Panel>
      </Section>

      {enCurso ? (
        <Section title={es.plans.started}>
          <Panel>
            <p className="eyebrow">{enCurso.plan.title}</p>
            <div style={{ margin: 'var(--sp-3) 0' }}>
              <Progress
                value={enCurso.hechos / Math.max(enCurso.dias.length, 1)}
                label={`${enCurso.hechos} / ${enCurso.dias.length}`}
              />
            </div>
            <ListRow
              to={`/leer/planes/${enCurso.plan.id}`}
              title={
                enCurso.siguiente
                  ? `${es.plans.day} ${enCurso.siguiente} · ${enCurso.dias[enCurso.siguiente - 1]?.label}`
                  : es.plans.finished
              }
              meta={enCurso.siguiente ? es.plans.continue : es.plans.finishedNote}
            />
          </Panel>
        </Section>
      ) : null}

      <Section title={es.read.books}>
        <div className="list">
          <ListRow
            to="/leer/biblia"
            leading={<IconBook size={20} style={{ color: 'var(--gold)' }} />}
            title={es.bible.title}
            meta="Antiguo y Nuevo Testamento · Reina-Valera 1909"
          />
          <ListRow
            to="/leer/salterio"
            leading={<IconScroll size={20} style={{ color: 'var(--gold)' }} />}
            title={es.psalter.title}
            meta={`${es.psalter.todaySuggestion}: ${es.psalter.kathisma.replace('{{n}}', String(kathisma))}`}
          />
          <ListRow
            to="/leer/planes"
            leading={<OrthodoxCross size={20} style={{ color: 'var(--gold)' }} />}
            title={es.plans.title}
            meta={es.plans.subtitle}
          />
          <ListRow
            to="/biblioteca/padres"
            leading={<IconBook size={20} style={{ color: 'var(--gold)' }} />}
            title={es.library.fathers}
            meta="Qué enseñó cada uno y por dónde empezar a leerlo"
          />
          <ListRow
            to="/biblioteca/estudio"
            leading={<IconBook size={20} style={{ color: 'var(--gold)' }} />}
            title={es.study.title}
            meta="Itinerarios de estudio y catálogo de obras"
          />
        </div>
      </Section>

      {bookmarks.data && bookmarks.data.length > 0 ? (
        <Section title={es.favorites.bookmarks}>
          <div className="list">
            {bookmarks.data.slice(0, 5).map((bookmark) => (
              <ListRow
                key={bookmark.id}
                to={bookmark.path}
                leading={<IconBookmark size={18} style={{ color: 'var(--gold)' }} />}
                title={bookmark.title}
              />
            ))}
          </div>
        </Section>
      ) : null}

      {history.data && history.data.length > 0 ? (
        <Section title={es.home.continueReading}>
          <div className="list">
            {history.data.map((entry) => (
              <ListRow key={entry.id} to={entry.path} title={entry.title} meta={entry.kind} />
            ))}
          </div>
        </Section>
      ) : null}
    </div>
  );
}
