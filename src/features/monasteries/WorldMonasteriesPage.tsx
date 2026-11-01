/**
 * Los grandes monasterios del mundo ortodoxo, fuera del Athos.
 *
 * Un mapa de conjunto, del Sinaí a las Solovkí, que se toca como el de la
 * Montaña, y debajo los monasterios por regiones: los de Tierra Santa y el
 * Mediterráneo, donde nació el monacato; los de los Balcanes, hijos del
 * Athos; y los de la Rus, de Kiev al mar Blanco.
 */
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { WORLD_MONASTERIES, type WorldMonastery } from '@/content/monasterios-mundo';
import { MAPAS_BASE } from '@/content/generated/mapas';
import { MapKey, RealMap } from '@/components/RealMap';
import { ButtonLink, PageHead, Section } from '@/components/ui';
import { worldMapPoints } from './world-map-points';
import es from '@/locales/es';

const REGIONES: Array<{ id: string; title: string; note: string; ids: string[] }> = [
  {
    id: 'oriente',
    title: 'Tierra Santa, Sinaí y Mediterráneo',
    note: 'Donde nació el monacato y donde se fijó el orden de los oficios que reza toda la Iglesia.',
    ids: ['sinai', 'mar-saba', 'saydnaya', 'kykkos', 'patmos', 'hosios-lukas', 'meteora'],
  },
  {
    id: 'balcanes',
    title: 'Los Balcanes y el Cáucaso',
    note: 'Las fundaciones de los reyes y los santos que se formaron en el Athos o se miraron en él.',
    ids: ['studenica', 'decani', 'rila', 'putna', 'gelati'],
  },
  {
    id: 'rus',
    title: 'La Rus, de Kiev al mar Blanco',
    note: 'El monacato que san Antonio llevó del Athos a Kiev, y lo que salió de allí durante mil años.',
    ids: ['pecherska', 'pochaiv', 'san-sergio', 'optina', 'diveyevo', 'valaam', 'solovki'],
  },
];

export function WorldMonasteriesPage() {
  const [elegido, setElegido] = useState<string | undefined>();
  const porId = new Map(WORLD_MONASTERIES.map((m) => [m.id, m]));
  const seleccion = elegido ? porId.get(elegido) : undefined;

  return (
    <div className="page">
      <PageHead
        eyebrow={es.library.title}
        title="Monasterios del mundo ortodoxo"
        subtitle="Del Sinaí a las Solovkí: las casas donde nació el monacato, las que fundó el Athos y las que dieron mártires en el siglo XX."
      />

      <Section title="En el mapa" id="mapa">
        <div className="athos-explore">
          <figure className="athos-map">
            <RealMap
              mapa={MAPAS_BASE.ortodoxia}
              points={worldMapPoints()}
              selected={elegido}
              onSelect={(id) => setElegido(id)}
              title="Los grandes monasterios del mundo ortodoxo"
              description="Mapa de Europa oriental y Oriente Próximo con diecinueve monasterios ortodoxos y el Monte Athos."
            />
            <figcaption className="athos-map__pie">
              <span className="athos-map__clave">
                <span>
                  <MapKey look="lleno" /> Monjes
                </span>
                <span>
                  <MapKey look="hueco" /> Monjas
                </span>
                <span>
                  <MapKey look="discontinuo" /> Monte Athos
                </span>
              </span>
              <span className="source-note">Costa de Natural Earth (dominio público); posiciones de Wikidata.</span>
            </figcaption>
          </figure>
          <div className="athos-explore__side">
            {elegido === 'athos' ? (
              <div className="athos-pick" aria-live="polite">
                <p className="athos-pick__title">Monte Athos</p>
                <p className="athos-pick__text">
                  Veinte monasterios y doce sketes en una península de Calcídica: la Santa Montaña tiene su propia sección.
                </p>
                <ButtonLink to="/biblioteca/athos" variant="primary" size="sm">
                  Ir al Monte Athos
                </ButtonLink>
              </div>
            ) : seleccion ? (
              <Ficha m={seleccion} />
            ) : (
              <p className="athos-pick athos-pick--empty">Toca un monasterio del mapa para ver qué es.</p>
            )}
          </div>
        </div>
      </Section>

      {REGIONES.map((region) => (
        <Section key={region.id} title={region.title} id={region.id}>
          <p className="section-lead">{region.note}</p>
          <div className="monastery-list">
            {region.ids.map((id) => {
              const m = porId.get(id);
              return m ? <Fila key={id} m={m} /> : null;
            })}
          </div>
        </Section>
      ))}
    </div>
  );
}

function Ficha({ m }: { m: WorldMonastery }) {
  return (
    <div className="athos-pick" aria-live="polite">
      <p className="eyebrow">
        {m.country} · {m.founded}
      </p>
      <p className="athos-pick__title">{m.name}</p>
      <p className="athos-pick__greek" lang={m.lang}>
        {m.localName}
      </p>
      <p className="athos-pick__meta">{m.church}</p>
      <p className="athos-pick__text">{m.description}</p>
      <ButtonLink to={`/biblioteca/monasterios/${m.id}`} variant="primary" size="sm">
        {es.athos.openMonastery}
      </ButtonLink>
    </div>
  );
}

function Fila({ m }: { m: WorldMonastery }) {
  return (
    <Link className="monastery-row monastery-row--world" to={`/biblioteca/monasterios/${m.id}`}>
      <span className="monastery-row__body">
        <span className="monastery-row__name">{m.name}</span>
        <span className="monastery-row__greek" lang={m.lang}>
          {m.localName}
        </span>
      </span>
      <span className="monastery-row__meta">
        <span>{m.country}</span>
        <span>{m.founded}</span>
      </span>
    </Link>
  );
}
