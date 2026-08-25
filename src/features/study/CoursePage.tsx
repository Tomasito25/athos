/**
 * Un itinerario de estudio: sus lecciones, una detrás de otra.
 *
 * Cada lección se puede marcar como leída; el progreso se guarda en
 * `reading_progress`, la misma tabla que usan los planes de lectura.
 */
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useAsync } from '@/hooks/useAsync';
import { db } from '@/db/db';
import { STUDY_COURSES, STUDY_LEVELS, STUDY_META } from '@/content/study';
import {
  CheckCircle,
  Empty,
  Loading,
  PageHead,
  Panel,
  Progress,
  Rule,
  SourceNote,
} from '@/components/ui';
import { ReaderToolbar } from '@/components/Reader';
import { useVisitLog } from '@/hooks/useVisitLog';
import es from '@/locales/es';

export function CoursePage() {
  const { courseId = '' } = useParams();
  const curso = STUDY_COURSES.find((c) => c.id === courseId);

  const progreso = useAsync(async () => {
    const fila = await db.reading_progress.get(`plan:${courseId}`);
    return new Set(fila?.completed ?? []);
  }, [courseId]);

  useVisitLog(curso ? { path: `/biblioteca/estudio/${curso.id}`, title: curso.title, kind: es.study.title } : null);

  if (!curso) {
    return (
      <div className="page">
        <Empty title="Ese itinerario no existe" heading />
      </div>
    );
  }

  const hechas = progreso.data ?? new Set<string>();

  const alternar = async (leccionId: string) => {
    const clave = `plan:${curso.id}`;
    const fila = await db.reading_progress.get(clave);
    const actuales = new Set(fila?.completed ?? []);
    if (actuales.has(leccionId)) actuales.delete(leccionId);
    else actuales.add(leccionId);
    await db.reading_progress.put({
      id: clave,
      kind: 'plan',
      refId: curso.id,
      completed: [...actuales],
      total: curso.lessons.length,
      updatedAt: new Date().toISOString(),
    });
    progreso.reload();
  };

  return (
    <article className="page page--reading">
      <PageHead eyebrow={STUDY_LEVELS[curso.level]} title={curso.title} subtitle={curso.subtitle} />

      <div style={{ marginBottom: 'var(--sp-4)' }}>
        <Progress value={hechas.size / curso.lessons.length} label={curso.title} />
      </div>

      <ReaderToolbar
        favorite={{
          kind: 'athos-article',
          refId: `estudio-${curso.id}`,
          title: curso.title,
          path: `/biblioteca/estudio/${curso.id}`,
        }}
      />

      {progreso.loading ? <Loading /> : null}

      {curso.lessons.map((leccion, indice) => {
        const hecha = hechas.has(leccion.id);
        return (
          <section key={leccion.id} id={leccion.id} style={{ marginTop: 'var(--sp-7)' }}>
            <div className="row" style={{ alignItems: 'flex-start', gap: 'var(--sp-2)' }}>
              <button
                type="button"
                className="check-btn"
                aria-pressed={hecha}
                aria-label={`${hecha ? 'Marcar como no leída' : 'Marcar como leída'}: ${leccion.title}`}
                onClick={() => alternar(leccion.id)}
              >
                <CheckCircle done={hecha} />
              </button>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p className="eyebrow">Lección {indice + 1}</p>
                <h2 className="display" style={{ fontSize: 'var(--text-lg)' }}>
                  {leccion.title}
                </h2>
              </div>
            </div>

            <div className="prose book-surface" style={{ marginTop: 'var(--sp-3)', opacity: hecha ? 0.7 : 1 }}>
              {leccion.body.map((parrafo, i) => (
                <p key={i}>{parrafo}</p>
              ))}
            </div>

            {leccion.readings?.length ? (
              <Panel variant="quiet" style={{ marginTop: 'var(--sp-3)' }}>
                <p className="eyebrow">{es.study.readNow}</p>
                <div className="btn-row" style={{ marginTop: 'var(--sp-2)' }}>
                  {leccion.readings.map((lectura) => (
                    <Link key={lectura.path} to={lectura.path} className="btn btn--sm">
                      {lectura.label}
                    </Link>
                  ))}
                </div>
              </Panel>
            ) : null}

            {leccion.question ? (
              <p className="rubric" style={{ marginTop: 'var(--sp-3)' }}>
                Para pensar: {leccion.question}
              </p>
            ) : null}
          </section>
        );
      })}

      <Rule />
      <SourceNote meta={STUDY_META} />
    </article>
  );
}
