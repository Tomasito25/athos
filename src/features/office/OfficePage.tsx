/**
 * Un oficio del día.
 *
 * No es una lista de tareas: las marcas de cada paso están para saber por
 * dónde se iba si hay que interrumpirse, no para puntuar a nadie.
 *
 * Se puede rezar de dos maneras. **Paso a paso** es la de por defecto y la
 * pensada para el teléfono: un solo paso en pantalla, con la navegación al
 * alcance del pulgar, porque rezar un oficio desplazándose por un rollo de
 * trece pasos es perder el sitio a cada rato. **Seguido** deja el oficio
 * entero de arriba abajo, como un libro, para quien lo prefiera o lo lea en
 * una pantalla grande.
 */
import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAsync } from '@/hooks/useAsync';
import { useOfficeSteps, type ResolvedStep } from './useOfficeSteps';
import { OFFICE_BY_TIME, OFFICES_STRUCTURE_NOTE } from '@/content/hours';
import { completionsOn, ruleForTime, toggleRuleItem } from '@/db/user';
import { useToday } from '@/hooks/useLiturgicalDay';
import {
  Blocks,
  Button,
  ButtonLink,
  CheckCircle,
  Empty,
  Loading,
  Panel,
  ProgressBlocks,
  Segmented,
  Rule,
  SourceNote,
  Tag,
} from '@/components/ui';
import { ReaderToolbar } from '@/components/Reader';
import { InlineCounter } from './InlineCounter';
import { IconChevronLeft, IconChevronRight, IconEdit } from '@/components/icons';
import { useSettings } from '@/stores/settings';
import { useUi } from '@/stores/ui';
import { restoreOffice } from '@/db/seed';
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

  const toast = useUi((s) => s.toast);
  const modo = useSettings((s) => s.officeFlow);
  const ponerModo = useSettings((s) => s.set);

  // El paso en curso lleva dentro de qué oficio es. Así, al cambiar de oficio
  // se empieza por el principio sin necesidad de un efecto que lo reinicie.
  const [posicion, setPosicion] = useState({ time, indice: 0 });
  const actual = posicion.time === time ? posicion.indice : 0;
  const setActual = (indice: number) => setPosicion({ time, indice });

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

        <Segmented
          value={modo}
          onChange={(v) => {
            ponerModo('officeFlow', v);
            setActual(0);
          }}
          options={[
            { value: 'paso' as const, label: es.office.stepByStep },
            { value: 'seguido' as const, label: es.office.continuous },
          ]}
          label={es.office.howToPray}
        />

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

      {modo === 'seguido'
        ? lista.map((paso, indice) => (
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
          ))
        : null}

      {modo === 'paso' && lista.length > 0 ? (
        <PasoAPaso
          lista={lista}
          actual={Math.min(actual, lista.length - 1)}
          completados={completados}
          irA={setActual}
          onToggle={async (paso) => {
            await toggleRuleItem(today, regla.data!.id, paso.item.id, paso.item.target);
            hechos.reload();
          }}
        />
      ) : null}

      <Rule />

      <Panel variant="quiet">
        <p className="text-sm muted">{OFFICES_STRUCTURE_NOTE}</p>
      </Panel>

      <div className="btn-row" style={{ marginTop: 'var(--sp-5)' }}>
        <ButtonLink to={`/orar/regla/editar/${regla.data.id}`}>{es.office.edit}</ButtonLink>
        <Button
          variant="ghost"
          onClick={async () => {
            // Se avisa antes: esto borra lo que el usuario haya cambiado en
            // ESTE oficio, aunque no toca los otros dos.
            if (!window.confirm(es.office.restoreConfirm)) return;
            await restoreOffice(time as RuleTime);
            pasos.reload();
            hechos.reload();
            toast(es.office.restored);
          }}
        >
          {es.office.restore}
        </Button>
        <ButtonLink to="/orar" variant="ghost">
          {es.app.back}
        </ButtonLink>
      </div>
    </article>
  );
}

/**
 * Un paso cada vez, con la navegación abajo.
 *
 * Al marcar un paso se avanza solo al siguiente: es lo que uno haría de todos
 * modos, y ahorra un toque en mitad de la oración.
 */
function PasoAPaso({
  lista,
  actual,
  completados,
  irA,
  onToggle,
}: {
  lista: ResolvedStep[];
  actual: number;
  completados: Set<string>;
  irA: (n: number) => void;
  onToggle: (paso: ResolvedStep) => Promise<void>;
}) {
  const paso = lista[actual];
  const primero = actual === 0;
  const ultimo = actual === lista.length - 1;

  return (
    <>
      <Step
        paso={paso}
        numero={actual + 1}
        hecho={completados.has(paso.item.id)}
        onToggle={async () => {
          const estaba = completados.has(paso.item.id);
          await onToggle(paso);
          // Marcar avanza; desmarcar no, que sería quitarle a alguien el paso
          // que acaba de corregir.
          if (!estaba && !ultimo) irA(actual + 1);
        }}
      />

      <nav className="office-nav" aria-label={es.office.stepNav}>
        <button
          type="button"
          className="btn btn--ghost"
          onClick={() => irA(actual - 1)}
          disabled={primero}
        >
          <IconChevronLeft size={18} />
          <span className="office-nav__word">{es.app.previous}</span>
        </button>

        <span className="office-nav__count">
          {actual + 1} / {lista.length}
        </span>

        <button
          type="button"
          className="btn btn--primary"
          onClick={() => irA(actual + 1)}
          disabled={ultimo}
        >
          <span className="office-nav__word">{es.app.next}</span>
          <IconChevronRight size={18} />
        </button>
      </nav>
    </>
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
