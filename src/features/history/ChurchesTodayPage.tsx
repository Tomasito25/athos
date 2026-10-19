/**
 * Las Iglesias ortodoxas hoy.
 *
 * Una ficha por Iglesia y, aparte, las disputas abiertas contadas como
 * disputas. Cada ficha dice cuándo se comprobó quién la preside: es lo que
 * más deprisa se queda viejo.
 */
import { Link, useNavigate } from 'react-router-dom';
import { CHURCHES_NOTE, CHURCH_DISPUTES, ORTHODOX_CHURCHES, type OrthodoxChurch } from '@/content/iglesias-hoy';
import { Notice, PageHead, Panel, Section, Tag } from '@/components/ui';
import { MapKey, RealMap } from '@/components/RealMap';
import { MAPAS_BASE } from '@/content/generated/mapas';
import { MAP_EPOCHS, SEE_STATUS_LABELS, SEE_STATUS_LOOK } from '@/content/history-maps';
import { useHashScroll } from '@/hooks/useHashScroll';
import { formatDayMonth } from '@/lib/format';
import { reportIssueUrl } from '@/lib/site';
import es from '@/locales/es';

const CALENDARIO: Record<OrthodoxChurch['calendar'], string> = {
  nuevo: es.churches.calendarNew,
  juliano: es.churches.calendarJulian,
  mixto: es.churches.calendarMixed,
};

function Ficha({ iglesia }: { iglesia: OrthodoxChurch }) {
  const disputas = CHURCH_DISPUTES.filter((d) => d.churches.includes(iglesia.id));
  return (
    <Panel id={iglesia.id} className="church-card">
      <div className="church-card__head">
        <h3 className="church-card__name">{iglesia.name}</h3>
        {iglesia.status === 'disputada' ? <Tag tone="red">{es.churches.disputed}</Tag> : null}
      </div>
      <p className="church-card__primate">
        <span className="muted text-sm">{iglesia.primateTitle}</span>
        <br />
        <strong>{iglesia.primate}</strong>
        <span className="muted text-sm">
          {' '}
          · {es.churches.since.replace('{{year}}', iglesia.primateSince)} ·{' '}
          {es.churches.verified.replace(
            '{{date}}',
            `${formatDayMonth(iglesia.verifiedOn)} de ${iglesia.verifiedOn.slice(0, 4)}`,
          )}
        </span>
      </p>
      <dl className="church-card__datos">
        <div>
          <dt>{es.churches.see}</dt>
          <dd>{iglesia.see}</dd>
        </div>
        <div>
          <dt>{es.churches.autocephaly}</dt>
          <dd>{iglesia.autocephaly}</dd>
        </div>
        <div>
          <dt>{es.churches.faithful}</dt>
          <dd>{iglesia.faithful}</dd>
        </div>
        <div>
          <dt>{es.churches.calendar}</dt>
          <dd>
            {CALENDARIO[iglesia.calendar]}
            {iglesia.calendarNote ? `. ${iglesia.calendarNote}` : ''}
          </dd>
        </div>
        <div>
          <dt>{es.churches.languages}</dt>
          <dd>{iglesia.languages.join(', ')}</dd>
        </div>
        {iglesia.autonomous?.length ? (
          <div>
            <dt>{es.churches.autonomous}</dt>
            <dd>{iglesia.autonomous.join('; ')}</dd>
          </div>
        ) : null}
        {iglesia.hispanic?.length ? (
          <div>
            <dt>{es.churches.hispanic}</dt>
            <dd>{iglesia.hispanic.join('; ')}</dd>
          </div>
        ) : null}
      </dl>
      {iglesia.note ? <p className="text-sm">{iglesia.note}</p> : null}
      {disputas.length ? (
        <p className="text-sm" style={{ marginTop: 'var(--sp-2)' }}>
          {es.churches.disputesOf}{' '}
          {disputas.map((d, i) => (
            <span key={d.id}>
              {i > 0 ? ', ' : ''}
              <a href={`#disputa-${d.id}`}>{d.title}</a>
            </span>
          ))}
        </p>
      ) : null}
    </Panel>
  );
}

/**
 * Dónde está cada una. Es el mapa de hoy de la historia, con las mismas sedes;
 * aquí, tocando una, se baja a su ficha.
 */
function MapaDeHoy() {
  const navigate = useNavigate();
  const hoy = MAP_EPOCHS.find((e) => e.id === 'hoy')!;
  const rangos = [...new Set(hoy.sees.map((s) => s.status))];
  return (
    <figure className="mapa__figura">
      <RealMap
        mapa={MAPAS_BASE.mediterraneo}
        points={hoy.sees.map((sede) => ({
          id: sede.id,
          lon: sede.lon,
          lat: sede.lat,
          label: sede.offMap ? `${sede.label ?? sede.name} ↖` : (sede.label ?? sede.name),
          side: sede.labelSide,
          dy: sede.labelDy,
          look: SEE_STATUS_LOOK[sede.status],
          fuera: sede.offMap,
        }))}
        title="Las Iglesias ortodoxas hoy"
        description={`Mapa con la sede de cada una de las ${hoy.sees.length} Iglesias. Tocando una se baja a su ficha.`}
        onSelect={(id) => navigate({ hash: id })}
      />
      <figcaption className="mapa__pie">
        {rangos.map((rango) => (
          <span key={rango} className="mapa__clave">
            <MapKey look={SEE_STATUS_LOOK[rango]} />
            {SEE_STATUS_LABELS[rango]}
          </span>
        ))}
      </figcaption>
    </figure>
  );
}

export function ChurchesTodayPage() {
  const reconocidas = ORTHODOX_CHURCHES.filter((c) => c.status === 'reconocida');
  const disputadas = ORTHODOX_CHURCHES.filter((c) => c.status === 'disputada');
  useHashScroll([]);

  return (
    <div className="page page--reading">
      <PageHead
        eyebrow={es.nav.library}
        title={es.churches.title}
        subtitle={es.churches.subtitle
          .replace('{{recognized}}', String(reconocidas.length))
          .replace('{{disputed}}', String(disputadas.length))}
      />

      <Notice>{CHURCHES_NOTE}</Notice>

      <MapaDeHoy />

      <Section title={es.churches.recognized}>
        <div className="stack">
          {reconocidas.map((c) => (
            <Ficha key={c.id} iglesia={c} />
          ))}
        </div>
      </Section>

      <Section title={es.churches.disputedTitle}>
        <div className="stack">
          {disputadas.map((c) => (
            <Ficha key={c.id} iglesia={c} />
          ))}
        </div>
      </Section>

      <Section title={es.churches.disputes}>
        <div className="stack">
          {CHURCH_DISPUTES.map((d) => (
            <Panel key={d.id} id={`disputa-${d.id}`} variant="quiet">
              <p className="eyebrow">{es.churches.disputeSince.replace('{{year}}', d.since)}</p>
              <h3 className="panel__title">{d.title}</h3>
              <p className="text-sm" style={{ marginTop: 'var(--sp-2)' }}>
                {d.text}
              </p>
            </Panel>
          ))}
        </div>
      </Section>

      <p className="source-note">
        {es.churches.outdated}{' '}
        <a href={reportIssueUrl('/biblioteca/iglesias')} target="_blank" rel="noreferrer noopener">
          {es.about.reportError}
        </a>
        . <Link to="/biblioteca/historia">{es.churches.seeHistory}</Link>
      </p>
    </div>
  );
}
