/**
 * Un día de un plan, para leerlo de corrido.
 *
 * Antes «Leer» llevaba al primer capítulo del día y había que ir pasando de
 * uno en uno, y luego volver al plan a marcarlo. Ahora el día entero está en
 * una página —los tres capítulos, o la kathisma con sus salmos, o el tramo de
 * cada lectura cuando el plan lleva varias—, y al pie se marca como leído y
 * se pasa al siguiente.
 */
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useMemo } from 'react';
import { useAsync } from '@/hooks/useAsync';
import { getChapter } from '@/db/bible';
import { nextDay, planProgress, toggleDay } from '@/db/plans';
import { READING_PLANS, daysOf, type PlanPiece } from '@/content/plans';
import { BOOKS_BY_ID, translationOf } from '@/content/bible';
import { KATHISMATA } from '@/content/psalter';
import { Blocks, Button, Notice, PageHead, ProgressBlocks, Rule, Skeleton, NotFound } from '@/components/ui';
import { ReaderToolbar } from '@/components/Reader';
import { IconChevronLeft, IconChevronRight } from '@/components/icons';
import { useVisitLog } from '@/hooks/useVisitLog';
import { useUi } from '@/stores/ui';
import es from '@/locales/es';

export function PlanDayPage() {
  const { planId = '', day = '1' } = useParams();
  const numero = Number(day);
  const plan = READING_PLANS.find((p) => p.id === planId);
  const dias = useMemo(() => daysOf(planId), [planId]);
  const dia = dias[numero - 1];
  const progreso = useAsync(() => planProgress(planId), [planId, numero]);
  const navigate = useNavigate();
  const toast = useUi((s) => s.toast);

  useVisitLog(plan && dia ? { path: dia.path, title: `${plan.title} · ${es.plans.day} ${numero}`, kind: es.plans.title } : null);

  if (!plan || !dia) {
    return (
      <div className="page">
        <NotFound title={es.plans.dayMissing} to="/leer/planes" />
      </div>
    );
  }

  const hechos = new Set(progreso.data?.completed ?? []);
  const leido = hechos.has(String(numero));

  const marcar = async () => {
    const registro = await toggleDay(planId, numero, dias.length);
    progreso.reload();
    if (leido) return;
    const siguiente = nextDay(registro, dias.length);
    if (siguiente) {
      toast(es.plans.dayDone.replace('{{n}}', String(numero)));
      navigate(`/leer/planes/${planId}/dia/${siguiente}`);
      window.scrollTo(0, 0);
    } else {
      toast(es.plans.finished);
      navigate(`/leer/planes/${planId}`);
    }
  };

  return (
    <article className="page page--reading">
      <PageHead
        eyebrow={plan.title}
        title={`${es.plans.day} ${numero}`}
        subtitle={dia.label}
      />
      <div style={{ margin: 'var(--sp-3) 0' }}>
        <ProgressBlocks value={hechos.size / Math.max(dias.length, 1)} />
        <p className="muted text-sm" style={{ marginTop: 'var(--sp-1)' }}>
          {es.plans.progressOf.replace('{{done}}', String(hechos.size)).replace('{{total}}', String(dias.length))}
        </p>
      </div>
      <ReaderToolbar />

      {dia.pieces.map((pieza) => (
        <Pieza key={pieza.kind === 'chapter' ? `${pieza.bookId}.${pieza.chapter}` : `k${pieza.number}`} pieza={pieza} />
      ))}

      <Rule />

      <div className="plan-day__close">
        <Button variant={leido ? 'ghost' : 'primary'} block onClick={marcar}>
          {leido ? es.plans.unmark : es.plans.markDayDone.replace('{{n}}', String(numero))}
        </Button>
      </div>

      <nav className="row row--between" style={{ marginTop: 'var(--sp-5)', gap: 'var(--sp-3)' }} aria-label={es.plans.dayNav}>
        {numero > 1 ? (
          <Link className="btn" to={`/leer/planes/${planId}/dia/${numero - 1}`}>
            <IconChevronLeft size={16} /> {es.plans.day} {numero - 1}
          </Link>
        ) : (
          <span />
        )}
        <Link className="btn btn--ghost" to={`/leer/planes/${planId}`}>
          {es.plans.backToPlan}
        </Link>
        {numero < dias.length ? (
          <Link className="btn" to={`/leer/planes/${planId}/dia/${numero + 1}`}>
            {es.plans.day} {numero + 1} <IconChevronRight size={16} />
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </article>
  );
}

/** Una pieza del día: un capítulo con sus versículos, o una kathisma con sus salmos. */
function Pieza({ pieza }: { pieza: PlanPiece }) {
  if (pieza.kind === 'kathisma') {
    const kathisma = KATHISMATA.find((k) => k.number === pieza.number);
    return (
      <section className="plan-piece">
        <h2 className="plan-piece__title">{es.psalter.kathisma.replace('{{n}}', String(pieza.number))}</h2>
        <Blocks blocks={(kathisma?.psalms ?? []).map((n) => ({ kind: 'psalm' as const, content: `Salmo ${n}`, ref: String(n) }))} />
      </section>
    );
  }
  return <Capitulo bookId={pieza.bookId} chapter={pieza.chapter} />;
}

function Capitulo({ bookId, chapter }: { bookId: string; chapter: number }) {
  const libro = BOOKS_BY_ID.get(bookId);
  const versiculos = useAsync(() => getChapter(bookId, chapter), [bookId, chapter]);
  const nombre = `${libro?.name ?? bookId} ${chapter}`;

  return (
    <section className="plan-piece">
      <h2 className="plan-piece__title">
        <Link to={`/leer/biblia/${bookId}/${chapter}`}>{nombre}</Link>
      </h2>
      {versiculos.loading ? (
        <Skeleton lines={6} />
      ) : versiculos.error || !versiculos.data?.length ? (
        <Notice variant="warn">{es.plans.chapterOffline}</Notice>
      ) : (
        <div className="prose book-surface">
          {versiculos.data.map((v) => (
            <p key={v.id}>
              <span className="verse-num">{v.verse}</span>
              {v.text}
            </p>
          ))}
        </div>
      )}
      <p className="source-note">{translationOf(bookId).name}</p>
    </section>
  );
}
