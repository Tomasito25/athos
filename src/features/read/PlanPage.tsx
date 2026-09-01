/**
 * Un plan por dentro: qué toca hoy y qué queda.
 *
 * El día en curso va arriba y en grande, porque es lo único que hay que hacer.
 * La lista completa va debajo, plegada hasta donde uno vaya: enseñar los
 * trescientos sesenta y cinco días de golpe desanima antes de empezar.
 */
import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAsync } from '@/hooks/useAsync';
import { nextDay, planProgress, resetPlan, toggleDay } from '@/db/plans';
import { PLANS_NOTE, READING_PLANS, daysOf } from '@/content/plans';
import {
  Button,
  ButtonLink,
  CheckCircle,
  Empty,
  ListRow,
  PageHead,
  Panel,
  Progress,
  Section,
} from '@/components/ui';
import { useUi } from '@/stores/ui';
import es from '@/locales/es';

/** Cuántos días se enseñan de golpe al abrir. */
const TRAMO = 30;

export function PlanPage() {
  const { planId = '' } = useParams();
  const plan = READING_PLANS.find((p) => p.id === planId);
  const dias = useMemo(() => daysOf(planId), [planId]);
  const progreso = useAsync(() => planProgress(planId), [planId]);
  const toast = useUi((s) => s.toast);
  const [verHasta, setVerHasta] = useState(TRAMO);

  const hechos = useMemo(
    () => new Set(progreso.data?.completed ?? []),
    [progreso.data],
  );

  if (!plan) {
    return (
      <div className="page">
        <Empty title="Ese plan no existe" heading />
        <div className="btn-row">
          <ButtonLink to="/leer/planes">{es.plans.title}</ButtonLink>
        </div>
      </div>
    );
  }

  const siguiente = nextDay(progreso.data, dias.length);
  const hoy = siguiente ? dias[siguiente - 1] : null;

  const marcar = async (numero: number) => {
    await toggleDay(planId, numero, dias.length);
    progreso.reload();
  };

  return (
    <div className="page">
      <PageHead eyebrow={es.plans.title} title={plan.title} subtitle={plan.subtitle} />

      <Panel>
        <Progress
          value={hechos.size / Math.max(dias.length, 1)}
          label={`${hechos.size} / ${dias.length}`}
        />
        <p className="muted text-sm" style={{ marginTop: 'var(--sp-3) ' }}>
          {plan.about}
        </p>
      </Panel>

      {hoy ? (
        <Section title={es.plans.today}>
          <Panel>
            <p className="eyebrow">
              {es.plans.day} {hoy.number}
            </p>
            <p className="display" style={{ fontSize: 'var(--text-lg)', margin: 'var(--sp-2) 0' }}>
              {hoy.label}
            </p>
            <div className="btn-row" style={{ marginTop: 'var(--sp-3)' }}>
              <ButtonLink to={hoy.path} variant="primary">
                {es.plans.read}
              </ButtonLink>
              <Button onClick={() => marcar(hoy.number)}>{es.plans.markDone}</Button>
            </div>
          </Panel>
        </Section>
      ) : (
        <Section title={es.plans.finished}>
          <Panel variant="quiet">
            <p className="text-sm">{es.plans.finishedNote}</p>
            <div className="btn-row" style={{ marginTop: 'var(--sp-3)' }}>
              <Button
                onClick={async () => {
                  if (!window.confirm(es.plans.resetConfirm)) return;
                  await resetPlan(planId);
                  progreso.reload();
                  toast(es.plans.reset);
                }}
              >
                {es.plans.restart}
              </Button>
            </div>
          </Panel>
        </Section>
      )}

      <Section title={es.plans.allDays}>
        <div className="list">
          {dias.slice(0, verHasta).map((dia) => (
            <ListRow
              key={dia.number}
              to={dia.path}
              title={`${dia.number}. ${dia.label}`}
              trailing={
                <button
                  type="button"
                  className="icon-btn"
                  aria-label={
                    hechos.has(String(dia.number)) ? es.plans.unmark : es.plans.markDone
                  }
                  aria-pressed={hechos.has(String(dia.number))}
                  onClick={(event) => {
                    // La fila entera es un enlace al texto; la marca es otra
                    // acción y no puede arrastrar consigo la navegación.
                    event.preventDefault();
                    event.stopPropagation();
                    void marcar(dia.number);
                  }}
                >
                  <CheckCircle done={hechos.has(String(dia.number))} />
                </button>
              }
            />
          ))}
        </div>

        {verHasta < dias.length ? (
          <div className="btn-row" style={{ marginTop: 'var(--sp-4)' }}>
            <Button onClick={() => setVerHasta((n) => n + TRAMO)}>
              {es.plans.more.replace('{{count}}', String(Math.min(TRAMO, dias.length - verHasta)))}
            </Button>
          </div>
        ) : null}
      </Section>

      {hechos.size > 0 && siguiente ? (
        <div className="btn-row" style={{ marginTop: 'var(--sp-5)' }}>
          <Button
            variant="ghost"
            onClick={async () => {
              if (!window.confirm(es.plans.resetConfirm)) return;
              await resetPlan(planId);
              progreso.reload();
              toast(es.plans.reset);
            }}
          >
            {es.plans.restart}
          </Button>
        </div>
      ) : null}

      <p className="source-note">{PLANS_NOTE}</p>
    </div>
  );
}
