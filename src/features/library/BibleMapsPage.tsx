/**
 * Los mapas de la Biblia.
 *
 * Tres mapas sobre la costa de verdad: Tierra Santa con los lugares del
 * Evangelio, los viajes de san Pablo y las siete Iglesias del Apocalipsis con
 * los concilios. Tocando un lugar se lee qué pasó allí, con los pasajes
 * enlazados; debajo, todos los lugares en una lista, que es lo que lee un
 * lector de pantalla y lo que se lee mejor en un móvil estrecho.
 */
import { useRef, useState, type ReactNode, type RefObject } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { PageHead, Section, Segmented } from '@/components/ui';
import { MapKey, RealMap, type MapPoint } from '@/components/RealMap';
import { MAPAS_BASE } from '@/content/generated/mapas';
import {
  ASIA_KIND_LOOK,
  ASIA_PLACES,
  BIBLE_MAPS_NOTE,
  HOLY_LAND,
  HOLY_LAND_WATERS,
  PAUL_JOURNEYS,
  PAUL_PLACES,
  type AsiaPlace,
  type BiblePlace,
} from '@/content/mapas-biblicos';
import { citationFor } from '@/lib/citation';
import es from '@/locales/es';

type Vista = 'tierra-santa' | 'pablo' | 'asia';

const VISTAS: Array<{ value: Vista; label: string }> = [
  { value: 'tierra-santa', label: 'Tierra Santa' },
  { value: 'pablo', label: 'San Pablo' },
  { value: 'asia', label: 'Las siete Iglesias' },
];

/** «Lc 2, 1-20» como enlace al capítulo, bajando al versículo. */
function Pasajes({ citas }: { citas: string[] }) {
  if (!citas.length) return null;
  return (
    <p className="mapa-pasajes">
      {citas.map((cita) => {
        const destino = citationFor(cita);
        return destino ? (
          <Link key={cita} to={destino.path} className="mapa-pasajes__cita">
            {cita}
          </Link>
        ) : (
          <span key={cita} className="mapa-pasajes__cita">
            {cita}
          </span>
        );
      })}
    </p>
  );
}

/** Al tocar un lugar en el teléfono, su explicación queda debajo del mapa: se trae a la vista. */
function useFicha() {
  const ficha = useRef<HTMLElement>(null);
  const traer = () => {
    if (window.matchMedia('(max-width: 51.99rem)').matches) {
      requestAnimationFrame(() => ficha.current?.scrollIntoView({ block: 'nearest', behavior: 'smooth' }));
    }
  };
  return { ficha, traer };
}

function TierraSanta() {
  const [elegido, setElegido] = useState('jerusalen');
  const { ficha, traer } = useFicha();
  const lugar = HOLY_LAND.find((l) => l.id === elegido);
  const puntos: MapPoint[] = HOLY_LAND.map((l) => ({
    id: l.id,
    lon: l.lon,
    lat: l.lat,
    label: l.label ?? l.name,
    side: l.side,
    dy: l.dy,
  }));

  return (
    <>
      <p className="muted text-sm section-lead">
        Toca un lugar para leer qué pasó allí. Los pasajes llevan a la Biblia.
      </p>
      <div className="mapa-biblico">
        <figure className="mapa__figura">
          <RealMap
            mapa={MAPAS_BASE['tierra-santa']}
            points={puntos}
            waters={HOLY_LAND_WATERS}
            title="Tierra Santa"
            description={`Mapa de Tierra Santa, de Tiro a Gaza, con ${HOLY_LAND.length} lugares del Evangelio y de los Hechos. La lista completa está debajo.`}
            selected={elegido}
            onSelect={(id) => {
              setElegido(id);
              traer();
            }}
          />
        </figure>
        {lugar ? <FichaLugar lugar={lugar} refFicha={ficha} /> : null}
      </div>

      <Section title="Todos los lugares, de norte a sur">
        <dl className="mapa__lista">
          {HOLY_LAND.map((l) => (
            <div key={l.id} className="mapa__entrada">
              <dt>{l.name}</dt>
              <dd>
                {l.note}
                <Pasajes citas={l.passages} />
              </dd>
            </div>
          ))}
        </dl>
      </Section>
    </>
  );
}

function FichaLugar({
  lugar,
  refFicha,
  extra,
}: {
  lugar: BiblePlace | AsiaPlace;
  refFicha: RefObject<HTMLElement | null>;
  extra?: ReactNode;
}) {
  return (
    <aside className="temple-detail mapa-biblico__ficha" aria-live="polite" ref={refFicha}>
      <h2 className="temple-detail__name">{lugar.name}</h2>
      <p>{lugar.note}</p>
      <Pasajes citas={lugar.passages} />
      {extra}
    </aside>
  );
}

function ViajesDePablo() {
  const [viajeId, setViajeId] = useState(PAUL_JOURNEYS[0]!.id);
  const viaje = PAUL_JOURNEYS.find((v) => v.id === viajeId) ?? PAUL_JOURNEYS[0]!;
  const lugar = (id: string) => PAUL_PLACES.find((p) => p.id === id)!;
  const paradas = viaje.stops.map(lugar);
  const unicas = paradas.filter((p, i) => paradas.findIndex((q) => q.id === p.id) === i);
  const extremos = new Set([viaje.stops[0], viaje.stops[viaje.stops.length - 1]]);

  const puntos: MapPoint[] = unicas.map((p) => ({
    id: p.id,
    lon: p.lon,
    lat: p.lat,
    label: p.label ?? p.name,
    side: p.side,
    dy: p.dy,
    look: extremos.has(p.id) ? 'lleno' : 'hueco',
  }));

  return (
    <>
      <Segmented
        value={viajeId}
        label="Viaje"
        options={PAUL_JOURNEYS.map((v) => ({ value: v.id, label: v.short }))}
        onChange={setViajeId}
      />
      <h3 className="mapa__titulo">
        {viaje.title} <span className="muted text-sm">· {viaje.years}</span>
      </h3>
      <p className="text-sm">{viaje.summary}</p>
      <Pasajes citas={[viaje.passage]} />

      <figure className="mapa__figura">
        <RealMap
          mapa={MAPAS_BASE.pablo}
          encuadre={viaje.encuadre}
          points={puntos}
          routes={[{ id: viaje.id, points: paradas.map((p) => [p.lon, p.lat]) }]}
          title={`San Pablo · ${viaje.title}`}
          description={`Mapa del ${viaje.title.toLowerCase()} de san Pablo: ${paradas.map((p) => p.name).join(', ')}.`}
        />
        <figcaption className="mapa__pie">
          <span className="mapa__clave">
            <MapKey look="lleno" />
            Salida y llegada
          </span>
          <span className="mapa__clave">
            <MapKey look="hueco" />
            Etapa
          </span>
        </figcaption>
      </figure>

      <Section title="Las etapas">
        <ol className="mapa-etapas">
          {paradas.map((p, i) => (
            <li key={`${p.id}-${i}`}>{p.name}</li>
          ))}
        </ol>
        {viaje.letters?.length ? (
          <>
            <p className="muted text-sm">
              {viaje.id === 'roma' ? 'Cartas del cautiverio' : 'Cartas escritas durante este viaje'}
            </p>
            <Pasajes citas={viaje.letters} />
          </>
        ) : null}
      </Section>
    </>
  );
}

function Concilios({ lugar }: { lugar: AsiaPlace }) {
  if (!lugar.councils?.length) return null;
  return (
    <ul className="mapa-concilios">
      {lugar.councils.map((c) => (
        <li key={c.id}>
          <Link to={`/biblioteca/historia/${c.period}#${c.id}`}>{c.label}</Link>
        </li>
      ))}
    </ul>
  );
}

function SieteIglesias() {
  const [elegido, setElegido] = useState('efeso');
  const { ficha, traer } = useFicha();
  const lugar = ASIA_PLACES.find((l) => l.id === elegido);
  const puntos: MapPoint[] = ASIA_PLACES.map((l) => ({
    id: l.id,
    lon: l.lon,
    lat: l.lat,
    label: l.label ?? l.name,
    side: l.side,
    dy: l.dy,
    look: ASIA_KIND_LOOK[l.kind],
  }));
  const iglesias = ASIA_PLACES.filter((l) => l.kind === 'iglesia' || l.kind === 'iglesia-concilio');
  const concilios = ASIA_PLACES.filter((l) => l.councils?.length);

  return (
    <>
      <p className="muted text-sm section-lead">
        Las siete Iglesias a las que escribe san Juan desde Patmos, y las ciudades de los siete Concilios
        Ecuménicos. Están a pocos días de camino unas de otras.
      </p>
      <div className="mapa-biblico">
        <figure className="mapa__figura">
          <RealMap
            mapa={MAPAS_BASE['asia-menor']}
            points={puntos}
            title="Las siete Iglesias y los concilios"
            description="Mapa del oeste de Asia Menor con las siete Iglesias del Apocalipsis, Patmos, y Nicea, Constantinopla, Éfeso y Calcedonia, donde se celebraron los siete Concilios Ecuménicos. La lista completa está debajo."
            selected={elegido}
            onSelect={(id) => {
              setElegido(id);
              traer();
            }}
          />
          <figcaption className="mapa__pie">
            <span className="mapa__clave">
              <MapKey look="lleno" />
              Iglesia del Apocalipsis
            </span>
            <span className="mapa__clave">
              <MapKey look="hueco" />
              Concilio ecuménico
            </span>
            <span className="mapa__clave">
              <MapKey look="pequeño" />
              Patmos
            </span>
          </figcaption>
        </figure>
        {lugar ? <FichaLugar lugar={lugar} refFicha={ficha} extra={<Concilios lugar={lugar} />} /> : null}
      </div>

      <Section title="Las siete Iglesias">
        <dl className="mapa__lista">
          {iglesias.map((l) => (
            <div key={l.id} className="mapa__entrada">
              <dt>{l.name}</dt>
              <dd>
                {l.note}
                <Pasajes citas={l.passages} />
              </dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section title="Los concilios">
        <dl className="mapa__lista">
          {concilios.map((l) => (
            <div key={l.id} className="mapa__entrada">
              <dt>{l.name}</dt>
              <dd>
                <Concilios lugar={l} />
              </dd>
            </div>
          ))}
        </dl>
      </Section>
    </>
  );
}

export function BibleMapsPage() {
  const [params, setParams] = useSearchParams();
  const vista = (VISTAS.find((v) => v.value === params.get('ver'))?.value ?? 'tierra-santa') as Vista;

  return (
    <div className="page">
      <PageHead
        title={es.bible.maps}
        subtitle="Dónde pasó lo que se lee: Tierra Santa, los viajes de san Pablo y las Iglesias de Asia."
      />

      <Segmented
        value={vista}
        label="Mapa"
        options={VISTAS}
        onChange={(v) => setParams(v === 'tierra-santa' ? {} : { ver: v }, { replace: true })}
      />

      <div className="mapa">
        {vista === 'tierra-santa' ? <TierraSanta /> : null}
        {vista === 'pablo' ? <ViajesDePablo /> : null}
        {vista === 'asia' ? <SieteIglesias /> : null}
      </div>

      <p className="muted text-sm">{BIBLE_MAPS_NOTE}</p>
    </div>
  );
}
