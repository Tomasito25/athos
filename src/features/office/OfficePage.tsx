/**
 * Un oficio del día, rezado de corrido.
 *
 * No es una lista de tareas: es un libro que se lee de arriba abajo. Las
 * marcas de cada paso están para saber por dónde se iba si hay que
 * interrumpirse, no para puntuar a nadie.
 */
import { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAsync } from '@/hooks/useAsync';
import { useOfficeSteps, type ResolvedStep } from './useOfficeSteps';
import { OFFICE_BY_TIME, OFFICES_STRUCTURE_NOTE } from '@/content/hours';
import { completionsOn, ruleForTime, toggleRuleItem } from '@/db/user';
import { useToday } from '@/hooks/useLiturgicalDay';
import {
  Blocks,
  ButtonLink,
  CheckCircle,
  Empty,
  Loading,
  Panel,
  ProgressBlocks,
  Rule,
  SourceNote,
  Tag,
} from '@/components/ui';
import { ReaderToolbar } from '@/components/Reader';
import { InlineCounter } from './InlineCounter';
import { IconEdit } from '@/components/icons';
import type { RuleTime } from '@/types';
import es from '@/locales/es';

export function OfficePage() {
  const { time = 'manana' } = useParams<{ time: RuleTime }>();
  const today = useToday();
  const definicion = OFFICE_BY_TIME.get(time as RuleTime);

  const regla = useAsync(() => ruleForTime(time as RuleTime), [time]);
  const pasos = useOfficeSteps(regla.data?.id ?? '');
  const hechos = useAsync(() => completionsOn(today), [today, regla.data?.id]);

  const completados = useMemo(
    () => new Set((hechos.data ?? []).map((c) => c.itemId)),
    [hechos.data],
  );

  if (regla.loading) return <Loading />;

  if (!regla.data) {
    return (
      <div className="page page--reading">
        <Empty
          title="Este oficio ya no existe"
          text="Puedes volver a crearlo desde la pantalla de Orar."
          action={<ButtonLink to="/orar" variant="primary">{es.nav.pray}</ButtonLink>}
        />
      </div>
    );
  }

  const lista = pasos.data ?? [];
  const hechosCuenta = lista.filter((p) => completados.has(p.item.id)).length;

  return (
    <article className="page page--reading">
      <header style={{ paddingTop: 'var(--sp-5)' }}>
        {definicion ? (
          <p className="eyebrow" lang="el" style={{ letterSpacing: 'var(--tracking-wide)' }}>
            {definicion.greekName}
          </p>
        ) : null}
        <h1 className="display" style={{ fontSize: 'var(--text-2xl)', margin: 'var(--sp-2) 0' }}>
          {regla.data.name}
        </h1>
        {definicion ? <p className="muted">{definicion.subtitle}</p> : null}

        <div style={{ margin: 'var(--sp-4) 0' }}>
          <ProgressBlocks value={lista.length ? hechosCuenta / lista.length : 0} />
        </div>

        <div className="row row--wrap">
          <ReaderToolbar
            favorite={{
              kind: 'office',
              refId: regla.data.id,
              title: regla.data.name,
              path: `/orar/oficio/${time}`,
            }}
            extraActions={
              <Link
                className="icon-btn"
                to={`/orar/regla/editar/${regla.data.id}`}
                aria-label={es.office.edit}
                title={es.office.edit}
              >
                <IconEdit size={20} />
              </Link>
            }
          />
        </div>
      </header>

      <Rule />

      {pasos.loading ? <Loading /> : null}

      {lista.map((paso, indice) => (
        <Step
          key={paso.item.id}
          paso={paso}
          numero={indice + 1}
          hecho={completados.has(paso.item.id)}
          onToggle={async () => {
            await toggleRuleItem(today, regla.data!.id, paso.item.id, paso.item.target);
            hechos.reload();
          }}
        />
      ))}

      <Rule />

      <Panel variant="quiet">
        <p className="text-sm muted">{OFFICES_STRUCTURE_NOTE}</p>
      </Panel>

      <div className="btn-row" style={{ marginTop: 'var(--sp-5)' }}>
        <ButtonLink to={`/orar/regla/editar/${regla.data.id}`}>{es.office.edit}</ButtonLink>
        <ButtonLink to="/orar" variant="ghost">
          {es.app.back}
        </ButtonLink>
      </div>
    </article>
  );
}

function Step({
  paso,
  numero,
  hecho,
  onToggle,
}: {
  paso: ResolvedStep;
  numero: number;
  hecho: boolean;
  onToggle: () => void;
}) {
  const { item } = paso;

  return (
    <section
      id={item.id}
      style={{ marginTop: 'var(--sp-6)', opacity: hecho ? 0.62 : 1, transition: 'opacity var(--dur) var(--ease)' }}
    >
      <div className="row" style={{ alignItems: 'flex-start', gap: 'var(--sp-2)' }}>
        <button
          type="button"
          className="check-btn"
          aria-pressed={hecho}
          aria-label={`${hecho ? 'Desmarcar' : 'Marcar'} ${item.title}`}
          onClick={onToggle}
        >
          <CheckCircle done={hecho} />
        </button>

        <div style={{ flex: 1, minWidth: 0 }}>
          <p className="eyebrow">
            {numero}. {item.title}
          </p>
          {paso.origin ? <p className="muted text-sm">{paso.origin}</p> : null}
        </div>

        {paso.path ? (
          <Link to={paso.path} className="btn btn--sm btn--ghost">
            {es.office.open}
          </Link>
        ) : null}
      </div>

      {item.note ? (
        <p className="rubric" style={{ marginTop: 'var(--sp-2)' }}>
          {item.note}
        </p>
      ) : null}

      <div style={{ marginTop: 'var(--sp-3)' }}>
        {paso.counter ? (
          <InlineCounter
            mode={paso.counter}
            target={item.target ?? 33}
            onComplete={hecho ? undefined : onToggle}
          />
        ) : (
          <Blocks blocks={paso.blocks} />
        )}
      </div>

      {paso.meta ? <SourceNote meta={paso.meta} /> : null}
    </section>
  );
}

export function OfficeTag({ time }: { time: RuleTime }) {
  const definicion = OFFICE_BY_TIME.get(time);
  return <Tag tone="gold">{definicion?.name ?? time}</Tag>;
}
