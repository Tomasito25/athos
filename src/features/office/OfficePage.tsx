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
 *
 * Y se puede rezar en tres medidas: la breve, para coger el hábito o para los
 * días con prisa; la habitual, que es la de cada uno y se edita; y la
 * extensa, para quien ya tiene costumbre. Se rece en la que se rece, el
 * oficio de ese momento del día queda rezado.
 */
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAsync } from '@/hooks/useAsync';
import { useOfficeSteps, type ResolvedStep } from './useOfficeSteps';
import { withDayExtras } from './dayExtras';
import { OFFICE_BY_TIME, OFFICES_STRUCTURE_NOTE } from '@/content/hours';
import { LENGTH_INFO, OFFICE_LENGTHS, OFFICE_VARIANTS, minutesFor } from '@/content/office-lengths';
import {
  completeRule,
  completionsOn,
  isRulePrayed,
  ruleForTime,
  ruleItems,
  uncompleteRule,
} from '@/db/user';
import { useLiturgicalDay, useToday } from '@/hooks/useLiturgicalDay';
import { useKeepAwake } from '@/hooks/useKeepAwake';
import {
  Blocks,
  Button,
  ButtonLink,
  Empty,
  Loading,
  Notice,
  Panel,
  ProgressBlocks,
  Segmented,
  Rule,
  SourceNote,
} from '@/components/ui';
import { ReaderToolbar } from '@/components/Reader';
import { InlineCounter } from './InlineCounter';
import { IconChevronLeft, IconChevronRight, IconEdit } from '@/components/icons';
import { useSettings } from '@/stores/settings';
import { useUi } from '@/stores/ui';
import { restoreOffice } from '@/db/seed';
import type { OfficeLength, RuleTime } from '@/types';
import es from '@/locales/es';

export function OfficePage() {
  const { time = 'manana' } = useParams<{ time: RuleTime }>();
  const today = useToday();
  const definicion = OFFICE_BY_TIME.get(time as RuleTime);
  const dia = useLiturgicalDay(today);
  // En la Semana Luminosa no se rezan las Horas ni las Completas, sino las de Pascua.
  const luminosa = dia.paschaOffset >= 0 && dia.paschaOffset <= 6;

  const medidas = useSettings((s) => s.officeLength);
  const extras = useSettings((s) => s.officeExtras);
  const medida: OfficeLength = medidas?.[time as RuleTime] ?? 'habitual';

  const regla = useAsync(() => ruleForTime(time as RuleTime), [time]);
  const pasos = useOfficeSteps(regla.data?.id ?? '', time as RuleTime, medida);
  useKeepAwake();
  const pasosRegla = useAsync(
    async () => (regla.data ? ruleItems(regla.data.id) : []),
    [regla.data?.id],
  );
  const hechos = useAsync(() => completionsOn(today), [today, regla.data?.id]);

  const toast = useUi((s) => s.toast);
  const modo = useSettings((s) => s.officeFlow);
  const ponerAjuste = useSettings((s) => s.set);

  const ponerMedida = (nueva: OfficeLength) =>
    ponerAjuste('officeLength', { ...medidas, [time]: nueva } as Record<RuleTime, OfficeLength>);

  // El paso en curso lleva dentro de qué oficio y en qué medida es. Así, al
  // cambiar de oficio o de medida se empieza por el principio sin necesidad
  // de un efecto que lo reinicie.
  const clave = `${time}|${medida}`;
  const [posicion, setPosicion] = useState({ clave, indice: 0 });
  const actual = posicion.clave === clave ? posicion.indice : 0;
  const setActual = (indice: number) => setPosicion({ clave, indice });

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

  // Lo propio de hoy —tropario, kontakion, akathistos— se añade al enseñar el
  // oficio, no a la regla guardada.
  const lista = withDayExtras(pasos.data ?? [], time as RuleTime, medida, extras);
  // El oficio se da por rezado entero, no oración a oración, y en cualquiera
  // de sus medidas: lo que cuenta es que el de este momento del día se rezó.
  const rezado = isRulePrayed(hechos.data ?? [], regla.data.id, pasosRegla.data ?? []);
  const variante = medida === 'habitual' ? null : OFFICE_VARIANTS[time as RuleTime]?.[medida];
  const minutos = minutesFor(time as RuleTime, medida);

  const darPorRezado = async () => {
    if (!regla.data) return;
    if (rezado) await uncompleteRule(today, regla.data.id);
    else await completeRule(today, regla.data.id, medida);
    hechos.reload();
  };

  const hacerMia = async () => {
    if (!window.confirm(es.office.makeMineConfirm)) return;
    await restoreOffice(time as RuleTime, medida);
    ponerMedida('habitual');
    pasosRegla.reload();
    hechos.reload();
    toast(es.office.madeMine);
  };

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

        {luminosa ? (
          <Notice>
            {es.office.brightWeek}{' '}
            <Link to="/biblioteca/liturgia/horas-de-pascua">{es.office.brightWeekLink}</Link>
          </Notice>
        ) : null}

        <div className="office-length">
          <Segmented
            value={medida}
            onChange={ponerMedida}
            options={OFFICE_LENGTHS.map((l) => ({ value: l.id, label: l.label }))}
            label={es.office.length}
          />
          <p className="office-length__hint">
            {LENGTH_INFO.get(medida)?.forWhom}
            {minutos ? <span className="office-length__minutes"> · {es.office.minutes.replace('{{n}}', String(minutos))}</span> : null}
          </p>
          {variante ? (
            <div className="office-length__about">
              <p>{variante.summary}</p>
              <p className="muted text-sm">
                {es.office.source} {variante.source}
              </p>
            </div>
          ) : null}
        </div>

        <div style={{ margin: 'var(--sp-4) 0' }}>
          <ProgressBlocks value={rezado ? 1 : 0} />
        </div>

        <Segmented
          value={modo}
          onChange={(v) => {
            ponerAjuste('officeFlow', v);
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
              medida === 'habitual' ? (
                <Link
                  className="icon-btn"
                  to={`/orar/regla/editar/${regla.data.id}`}
                  aria-label={es.office.edit}
                  title={es.office.edit}
                >
                  <IconEdit size={20} />
                </Link>
              ) : undefined
            }
          />
        </div>
      </header>

      <Rule />

      {pasos.loading ? <Loading /> : null}

      {modo === 'seguido' ? (
        <>
          {lista.map((paso, indice) => (
            <Step key={paso.item.id} paso={paso} numero={indice + 1} />
          ))}
          <Cierre rezado={rezado} onCerrar={darPorRezado} />
        </>
      ) : null}

      {modo === 'paso' && lista.length > 0 ? (
        <PasoAPaso
          lista={lista}
          actual={Math.min(actual, lista.length - 1)}
          rezado={rezado}
          irA={setActual}
          onCerrar={darPorRezado}
        />
      ) : null}

      <Rule />

      {/* La nota invita a cambiar los pasos: sólo vale para el habitual. */}
      <Panel variant="quiet">
        <p className="text-sm muted">{variante ? es.office.fixedForm : OFFICES_STRUCTURE_NOTE}</p>
      </Panel>

      <div className="btn-row" style={{ marginTop: 'var(--sp-5)' }}>
        {variante ? (
          <Button onClick={hacerMia}>{es.office.makeMine}</Button>
        ) : (
          <>
            <ButtonLink to={`/orar/regla/editar/${regla.data.id}`}>{es.office.edit}</ButtonLink>
            <Button
              variant="ghost"
              onClick={async () => {
                // Se avisa antes: esto borra lo que el usuario haya cambiado en
                // ESTE oficio, aunque no toca los otros dos.
                if (!window.confirm(es.office.restoreConfirm)) return;
                await restoreOffice(time as RuleTime);
                pasos.reload();
                pasosRegla.reload();
                hechos.reload();
                toast(es.office.restored);
              }}
            >
              {es.office.restore}
            </Button>
          </>
        )}
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
 * En el último paso, «Siguiente» deja sitio a «Terminar»: es ahí donde el
 * oficio se da por rezado, no oración a oración.
 */
function PasoAPaso({
  lista,
  actual,
  rezado,
  irA,
  onCerrar,
}: {
  lista: ResolvedStep[];
  actual: number;
  rezado: boolean;
  irA: (n: number) => void;
  onCerrar: () => Promise<void>;
}) {
  const paso = lista[actual];
  const primero = actual === 0;
  const ultimo = actual === lista.length - 1;

  return (
    <>
      <Step paso={paso} numero={actual + 1} />

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

        {ultimo ? (
          <button
            type="button"
            className={rezado ? 'btn btn--ghost' : 'btn btn--primary'}
            onClick={onCerrar}
          >
            {rezado ? es.office.prayedUndo : es.office.finish}
          </button>
        ) : (
          <button type="button" className="btn btn--primary" onClick={() => irA(actual + 1)}>
            <span className="office-nav__word">{es.app.next}</span>
            <IconChevronRight size={18} />
          </button>
        )}
      </nav>
    </>
  );
}

/** El cierre del oficio en el modo seguido, al pie de todo. */
function Cierre({ rezado, onCerrar }: { rezado: boolean; onCerrar: () => Promise<void> }) {
  return (
    <div className="office-close">
      {rezado ? (
        <>
          <p className="office-close__done">{es.office.prayedToday}</p>
          <Button variant="ghost" size="sm" onClick={onCerrar}>
            {es.office.prayedUndo}
          </Button>
        </>
      ) : (
        <Button variant="primary" block onClick={onCerrar}>
          {es.office.finish}
        </Button>
      )}
    </div>
  );
}

function Step({ paso, numero }: { paso: ResolvedStep; numero: number }) {
  const { item } = paso;

  return (
    <section id={item.id} style={{ marginTop: 'var(--sp-6)' }}>
      <div className="row" style={{ alignItems: 'flex-start', gap: 'var(--sp-3)' }}>
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
          <InlineCounter mode={paso.counter} target={item.target ?? 33} />
        ) : (
          <Blocks blocks={paso.blocks} />
        )}
      </div>

      {paso.meta ? <SourceNote meta={paso.meta} /> : null}
    </section>
  );
}
