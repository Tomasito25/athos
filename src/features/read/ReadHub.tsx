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
import { ListRow, Panel, Progress, Section } from '@/components/ui';
import { HubHero, Tile, TileGrid } from '@/components/hub';
import { Link } from 'react-router-dom';
import { IconBook, IconBookmark, IconCalendar, IconLibrary, IconScroll, OrthodoxCross } from '@/components/icons';
import { isoToDate } from '@/lib/calendar/jdn';
import { formatLongDate } from '@/lib/format';
import { readingTitle } from '@/lib/readings';
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
      <HubHero icon={IconBook} title={es.nav.read} subtitle={es.read.subtitle} />

      {/* Lo que la Iglesia lee hoy, con la cita a la vista y no detrás de un
          nombre de sección. */}
      <Section title={es.home.readings} action={{ label: es.home.allReadings, to: '/leer/lecturas' }}>
        <p className="muted text-sm" style={{ margin: 'calc(-1 * var(--sp-2)) 0 var(--sp-3)' }}>
          {formatLongDate(today)}
        </p>
        {lecturas.length === 0 ? (
          <Panel variant="quiet">
            <p className="muted text-sm">{es.app.pending}</p>
          </Panel>
        ) : (
          <div className="reading-pair">
            {epistola ? (
              <Link to="/leer/lecturas" className="reading-card">
                <span className="reading-card__icon" aria-hidden="true">
                  <IconScroll size={18} />
                </span>
                <span className="reading-card__body">
                  <span className="eyebrow">{es.home.epistle}</span>
                  <span className="reading-card__ref">{readingTitle(epistola.reference)}</span>
                </span>
              </Link>
            ) : null}
            {evangelio ? (
              <Link to="/leer/lecturas" className="reading-card">
                <span className="reading-card__icon" aria-hidden="true">
                  <OrthodoxCross size={18} />
                </span>
                <span className="reading-card__body">
                  <span className="eyebrow">{es.home.gospel}</span>
                  <span className="reading-card__ref">{readingTitle(evangelio.reference)}</span>
                </span>
              </Link>
            ) : null}
          </div>
        )}
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
        <TileGrid>
          <Tile to="/leer/biblia" icon={IconBook} title={es.bible.title} hint="Antiguo y Nuevo Testamento · Reina-Valera 1909" />
          <Tile
            to="/leer/salterio"
            icon={IconScroll}
            title={es.psalter.title}
            hint={`${es.psalter.todaySuggestion}: ${es.psalter.kathisma.replace('{{n}}', String(kathisma))}`}
          />
          <Tile to="/leer/lecturas" icon={IconCalendar} title={es.calendar.readings} hint="Las de hoy y las de cualquier día" />
          <Tile to="/leer/planes" icon={OrthodoxCross} title={es.plans.title} hint={es.plans.subtitle} />
          <Tile to="/biblioteca/padres" icon={IconLibrary} title={es.library.fathers} hint="Qué enseñó cada uno y por dónde empezar" />
          <Tile to="/biblioteca/estudio" icon={IconBook} title={es.study.title} hint="Itinerarios y catálogo de obras" />
        </TileGrid>
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
