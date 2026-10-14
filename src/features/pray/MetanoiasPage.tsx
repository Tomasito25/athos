/**
 * Metanoias: rezar también con el cuerpo.
 *
 * Qué son la inclinación y la postración, cómo se hacen —en dibujo—, si hoy se
 * hacen grandes postraciones y por qué, y un contador para llevar la cuenta
 * sin pensar en ella. En la Cuaresma, la oración de san Efrén con las suyas.
 *
 * El contador no guarda nada: no es una estadística. Sirve para no perder la
 * cuenta mientras se reza, y nada más.
 */
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { HubHero } from '@/components/hub';
import { Blocks, Button, Panel, Section, Segmented, Tag } from '@/components/ui';
import { IconCross } from '@/components/icons';
import { useLiturgicalDay, useToday } from '@/hooks/useLiturgicalDay';
import { prostrationsToday } from '@/lib/calendar/prostrations';
import { ORACION_DE_EFREN } from '@/content/comun';
import { useSettings } from '@/stores/settings';
import { MetanoiaDiagram } from './MetanoiaDiagram';
import es from '@/locales/es';

const FORMULAS = {
  jesus: 'Señor Jesucristo, Hijo de Dios, ten misericordia de mí, pecador.',
  purificame: 'Oh Dios, purifícame a mí, pecador.',
  piedad: 'Señor, ten piedad.',
} as const;
type Formula = keyof typeof FORMULAS;

const METAS = ['3', '12', '40', '100'] as const;

export function MetanoiasPage() {
  const today = useToday();
  const day = useLiturgicalDay(today);
  const hoy = prostrationsToday(day);
  const vibrar = useSettings((s) => s.jesusPrayerVibration);

  const [formula, setFormula] = useState<Formula>('jesus');
  const [meta, setMeta] = useState<(typeof METAS)[number]>('12');
  const [cuenta, setCuenta] = useState(0);
  const objetivo = Number(meta);
  const hecho = cuenta >= objetivo;

  const contar = () => {
    setCuenta((c) => c + 1);
    if (vibrar) navigator.vibrate?.(cuenta + 1 === objetivo ? [60, 80, 60] : 20);
  };

  return (
    <div className="page">
      <HubHero icon={IconCross} title={es.metanoia.title} subtitle={es.metanoia.subtitle} />

      <Panel className={`metanoia-today${hoy.great ? '' : ' metanoia-today--no'}`}>
        <div className="row row--between" style={{ alignItems: 'flex-start' }}>
          <p className="eyebrow">{es.metanoia.today}</p>
          <Tag tone={hoy.great ? 'gold' : undefined}>{hoy.great ? es.metanoia.yes : es.metanoia.no}</Tag>
        </div>
        <p style={{ marginTop: 'var(--sp-2)' }}>{hoy.reason}</p>
      </Panel>

      <Section title={es.metanoia.what}>
        <div className="prose book-surface">
          {es.metanoia.whatText.map((p) => (
            <p key={p.slice(0, 20)}>{p}</p>
          ))}
        </div>
        <MetanoiaDiagram />
      </Section>

      {hoy.lent ? (
        <Section title={es.metanoia.ephrem}>
          <p className="muted text-sm section-lead">{es.metanoia.ephremLead}</p>
          <div className="prose book-surface">
            <Blocks blocks={ORACION_DE_EFREN} />
            <p className="rubric">{es.metanoia.ephremAfter}</p>
          </div>
        </Section>
      ) : null}

      <Section title={es.metanoia.counter}>
        <div className="stack">
          <Segmented
            value={formula}
            onChange={(v) => setFormula(v)}
            label={es.metanoia.formula}
            options={[
              { value: 'jesus' as Formula, label: es.metanoia.formulaJesus },
              { value: 'purificame' as Formula, label: es.metanoia.formulaPurify },
              { value: 'piedad' as Formula, label: es.metanoia.formulaMercy },
            ]}
          />
          <Segmented
            value={meta}
            onChange={(v) => {
              setMeta(v);
              setCuenta(0);
            }}
            label={es.metanoia.target}
            options={METAS.map((m) => ({ value: m, label: m }))}
          />
        </div>

        <button
          type="button"
          className={`metanoia-counter${hecho ? ' metanoia-counter--done' : ''}`}
          onClick={contar}
          aria-label={es.metanoia.countLabel.replace('{{n}}', String(cuenta)).replace('{{total}}', String(objetivo))}
        >
          <span className="metanoia-counter__formula">{FORMULAS[formula]}</span>
          <span className="metanoia-counter__count">{cuenta}</span>
          <span className="muted text-sm">
            {hecho ? es.metanoia.done : es.metanoia.of.replace('{{total}}', String(objetivo))}
          </span>
          <span className="muted text-sm">{es.metanoia.tap}</span>
        </button>
        <div className="btn-row" style={{ marginTop: 'var(--sp-3)' }}>
          <Button variant="ghost" size="sm" onClick={() => setCuenta(0)} disabled={cuenta === 0}>
            {es.jesusPrayer.reset}
          </Button>
        </div>
      </Section>

      <Section title={es.metanoia.advice}>
        <ul className="tips">
          {es.metanoia.adviceItems.map((a) => (
            <li key={a.slice(0, 20)}>{a}</li>
          ))}
        </ul>
        <p className="muted text-sm" style={{ marginTop: 'var(--sp-3)' }}>
          <Link to="/orar/formas">{es.metanoia.moreWays}</Link>
        </p>
      </Section>
    </div>
  );
}
