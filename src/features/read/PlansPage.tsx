/**
 * Los planes de lectura, y en cuál vas.
 *
 * Un plan empezado se distingue de uno sin empezar: el primero enseña por
 * dónde ibas, el segundo lo que cuesta. Es la diferencia entre «sigue» y
 * «empieza», y es la única que importa al abrir esta pantalla.
 */
import { useMemo } from 'react';
import { useAsync } from '@/hooks/useAsync';
import { allPlanProgress, nextDay } from '@/db/plans';
import { PLANS_NOTE, READING_PLANS, daysOf } from '@/content/plans';
import { ListRow, PageHead, Panel, Progress, Section } from '@/components/ui';
import es from '@/locales/es';

export function PlansPage() {
  const progreso = useAsync(() => allPlanProgress(), []);

  const porPlan = useMemo(
    () => new Map((progreso.data ?? []).map((p) => [p.refId, p])),
    [progreso.data],
  );

  const planes = READING_PLANS.map((plan) => {
    const dias = daysOf(plan.id);
    const suyo = porPlan.get(plan.id);
    const hechos = suyo?.completed.length ?? 0;
    const siguiente = nextDay(suyo, dias.length);
    return { plan, dias, hechos, siguiente };
  });

  const empezados = planes.filter((p) => p.hechos > 0);
  const nuevos = planes.filter((p) => p.hechos === 0);

  return (
    <div className="page">
      <PageHead title={es.plans.title} subtitle={es.plans.subtitle} />

      {empezados.length > 0 ? (
        <Section title={es.plans.started}>
          <div className="stack">
            {empezados.map(({ plan, dias, hechos, siguiente }) => (
              <Panel key={plan.id}>
                <p className="panel__title">{plan.title}</p>
                <div style={{ margin: 'var(--sp-3) 0' }}>
                  <Progress
                    value={hechos / Math.max(dias.length, 1)}
                    label={`${hechos} / ${dias.length}`}
                  />
                </div>
                <ListRow
                  to={`/leer/planes/${plan.id}`}
                  title={
                    siguiente
                      ? `${es.plans.day} ${siguiente} · ${dias[siguiente - 1]?.label}`
                      : es.plans.finished
                  }
                  meta={siguiente ? es.plans.continue : es.plans.finishedNote}
                />
              </Panel>
            ))}
          </div>
        </Section>
      ) : null}

      <Section title={empezados.length > 0 ? es.plans.others : es.plans.choose}>
        <div className="list">
          {nuevos.map(({ plan, dias }) => (
            <ListRow
              key={plan.id}
              to={`/leer/planes/${plan.id}`}
              title={plan.title}
              meta={plan.subtitle}
              trailing={<span className="pill-count">{dias.length} d</span>}
            />
          ))}
        </div>
      </Section>

      <p className="source-note">{PLANS_NOTE}</p>
    </div>
  );
}
