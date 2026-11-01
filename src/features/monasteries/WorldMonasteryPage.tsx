/** La ficha de uno de los grandes monasterios de fuera del Athos. */
import { useParams } from 'react-router-dom';
import { WORLD_MONASTERIES, WORLD_MONASTERIES_META } from '@/content/monasterios-mundo';
import { MAPAS_BASE } from '@/content/generated/mapas';
import { RealMap } from '@/components/RealMap';
import { NotFound, PageHead, Section, SourceNote } from '@/components/ui';
import { ReaderToolbar } from '@/components/Reader';
import { RichText } from '@/components/RichText';
import { useVisitLog } from '@/hooks/useVisitLog';
import { proyectar } from '@/lib/mapa';
import es from '@/locales/es';

const MAPA = MAPAS_BASE.ortodoxia;

export function WorldMonasteryPage() {
  const { monasteryId = '' } = useParams();
  const m = WORLD_MONASTERIES.find((x) => x.id === monasteryId);
  const path = `/biblioteca/monasterios/${monasteryId}`;

  useVisitLog(m ? { path, title: m.name, kind: 'Monasterios' } : null);

  if (!m) {
    return (
      <div className="page">
        <NotFound title="Ese monasterio no está en la lista" />
      </div>
    );
  }

  // El mapa, acercado a la región del monasterio.
  const [x, y] = proyectar(MAPA, m.coords.lon, m.coords.lat);
  const ancho = 520;
  const alto = 380;
  const recorte = {
    x: Math.max(0, Math.min(MAPA.ancho - ancho, x - ancho / 2)),
    y: Math.max(0, Math.min(MAPA.alto - alto, y - alto / 2)),
    ancho,
    alto,
  };

  return (
    <article className="page page--reading">
      <PageHead eyebrow={`Monasterios del mundo ortodoxo · ${m.country}`} title={m.name} subtitle={m.localName} />

      <dl className="facts">
        <div>
          <dt>{es.athos.founded}</dt>
          <dd>{m.founded}</dd>
        </div>
        <div>
          <dt>{m.women ? 'Comunidad' : 'País'}</dt>
          <dd>{m.women ? 'De monjas' : m.country}</dd>
        </div>
        <div className="facts__wide">
          <dt>Iglesia</dt>
          <dd>{m.church}</dd>
        </div>
        {m.unesco ? (
          <div className="facts__wide">
            <dt>Patrimonio de la humanidad</dt>
            <dd>Desde {m.unesco}</dd>
          </div>
        ) : null}
      </dl>

      <ReaderToolbar favorite={{ kind: 'monastery', refId: `mundo-${m.id}`, title: m.name, path }} />

      <div className="prose book-surface" style={{ marginTop: 'var(--sp-5)' }}>
        <p>
          <RichText>{m.description}</RichText>
        </p>
        <p>
          <RichText>{m.today}</RichText>
        </p>
      </div>

      <Section title="Santos de esta casa">
        <ul className="bullet-list">
          {m.saints.map((s) => (
            <li key={s}>
              <RichText max={1}>{s}</RichText>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Dónde está">
        <figure className="athos-map">
          <RealMap
            mapa={MAPA}
            points={[{ id: m.id, lon: m.coords.lon, lat: m.coords.lat, label: m.name.replace(/^(La|Las|El) /, ''), side: m.label.side, dy: m.label.dy }]}
            recorte={recorte}
            selected={m.id}
            title={`${m.name} en el mapa`}
            description={`Mapa de la región de ${m.name}, en ${m.country}.`}
          />
          <figcaption className="source-note" style={{ marginTop: 'var(--sp-2)', borderTop: 'none', paddingTop: 0 }}>
            Costa de Natural Earth (dominio público); posición de Wikidata ({m.wikidata}).
          </figcaption>
        </figure>
      </Section>

      <SourceNote meta={WORLD_MONASTERIES_META} status="complete" />
    </article>
  );
}
