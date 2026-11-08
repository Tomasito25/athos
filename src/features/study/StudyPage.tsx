/**
 * Biblioteca de estudio.
 *
 * Itinerarios con lecciones por un lado, catálogo de obras por otro. El
 * progreso de cada itinerario se guarda por lección, para poder retomarlo.
 */
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAsync } from '@/hooks/useAsync';
import { db } from '@/db/db';
import {
  STUDY_COURSES,
  STUDY_LEVELS,
  STUDY_NOTE,
  STUDY_WORKS,
  WORK_KINDS,
  type StudyWork,
} from '@/content/study';
import { ListRow, PageHead, Panel, Progress, Section, Segmented, Tag } from '@/components/ui';
import { IconBook, IconScroll } from '@/components/icons';
import es from '@/locales/es';

type Vista = 'itinerarios' | 'obras';

const DISPONIBILIDAD: Record<StudyWork['availability'], { texto: string; tono?: 'green' | 'gold' }> = {
  completo: { texto: 'Texto completo en ATHOS', tono: 'green' },
  parcial: { texto: 'Fragmentos en ATHOS', tono: 'gold' },
  ficha: { texto: 'Sólo ficha' },
};

export function StudyPage() {
  const [vista, setVista] = useState<Vista>('itinerarios');

  const progreso = useAsync(async () => {
    const filas = await db.reading_progress.where('kind').equals('plan').toArray();
    return new Map(filas.map((f) => [f.refId, f]));
  }, [vista]);

  return (
    <div className="page">
      <PageHead
        title={es.study.title}
        subtitle="Itinerarios para estudiar despacio y las obras que forman la tradición."
      />

      <Segmented
        value={vista}
        label={es.study.title}
        options={[
          { value: 'itinerarios' as Vista, label: es.study.courses },
          { value: 'obras' as Vista, label: es.study.works },
        ]}
        onChange={setVista}
      />

      {vista === 'itinerarios' ? (
        <Section>
          <div className="stack">
            {STUDY_COURSES.map((curso) => {
              const hechas = progreso.data?.get(curso.id)?.completed.length ?? 0;
              return (
                <Link
                  key={curso.id}
                  to={`/biblioteca/estudio/${curso.id}`}
                  className="panel"
                  style={{ display: 'block', textDecoration: 'none' }}
                >
                  <div className="row row--between" style={{ alignItems: 'flex-start' }}>
                    <div style={{ minWidth: 0 }}>
                      <p className="eyebrow">{STUDY_LEVELS[curso.level]}</p>
                      <p className="panel__title" style={{ marginTop: 'var(--sp-1)' }}>
                        {curso.title}
                      </p>
                      <p className="muted text-sm">{curso.subtitle}</p>
                    </div>
                    <Tag>{curso.lessons.length} lecciones</Tag>
                  </div>
                  {hechas > 0 ? (
                    <div style={{ marginTop: 'var(--sp-3)' }}>
                      <Progress value={hechas / curso.lessons.length} label={curso.title} />
                    </div>
                  ) : null}
                </Link>
              );
            })}
          </div>
        </Section>
      ) : (
        (Object.keys(WORK_KINDS) as Array<StudyWork['kind']>).map((tipo) => {
          const obras = STUDY_WORKS.filter((o) => o.kind === tipo);
          if (!obras.length) return null;
          return (
            <Section key={tipo} title={WORK_KINDS[tipo]}>
              <div className="list">
                {obras.map((obra) => (
                  <ListRow
                    key={obra.id}
                    to={obra.path ?? `/biblioteca/estudio/obra/${obra.id}`}
                    leading={
                      tipo === 'escritura' ? (
                        <IconBook size={20} style={{ color: 'var(--gold)' }} />
                      ) : (
                        <IconScroll size={20} style={{ color: 'var(--gold)' }} />
                      )
                    }
                    title={obra.title}
                    meta={`${obra.author} · ${obra.century} — ${obra.what}`}
                    trailing={
                      <Tag tone={DISPONIBILIDAD[obra.availability].tono}>
                        {DISPONIBILIDAD[obra.availability].texto}
                      </Tag>
                    }
                  />
                ))}
              </div>
            </Section>
          );
        })
      )}

      <Panel variant="quiet" style={{ marginTop: 'var(--sp-6)' }}>
        <p className="text-sm muted">{STUDY_NOTE}</p>
      </Panel>
    </div>
  );
}
