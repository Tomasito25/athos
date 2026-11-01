/**
 * Portada del Monte Athos.
 *
 * Arriba, lo que hace falta para situarse: el mapa de verdad, que se toca, y
 * lo que celebra la Montaña. Debajo, los veinte monasterios —que se filtran
 * por tradición y por vertiente—, los doce sketes, el año de sus fiestas y
 * los artículos en tres bloques, porque trece entradillas seguidas obligan a
 * leerlas todas para saber cuál interesa.
 */
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAsync } from '@/hooks/useAsync';
import { useToday } from '@/hooks/useLiturgicalDay';
import { db } from '@/db/db';
import { ATHOS_INTRO } from '@/content/athos';
import { ATHOS_GROUPS, ATHOS_LEAD } from '@/content/athos-articles';
import { ATHOS_PLACES, ATHOS_SKETES } from '@/content/athos-lugares';
import { athosFeastCalendar, type AthosFeastDay } from '@/lib/athos-feasts';
import { formatDayMonth, formatMonthDay } from '@/lib/format';
import { AthosMap, MonasteryLink } from './AthosMap';
import { ListRow, Loading, PageHead, Section } from '@/components/ui';
import type { Monastery } from '@/types';
import es from '@/locales/es';

type Filtro = 'todos' | 'griegos' | 'eslavos' | 'este' | 'oeste';

const FILTROS: Array<{ id: Filtro; label: string; test: (m: Monastery) => boolean }> = [
  { id: 'todos', label: es.athos.filterAll, test: () => true },
  { id: 'griegos', label: es.athos.filterGreek, test: (m) => m.tradition.startsWith('Griega') },
  { id: 'eslavos', label: es.athos.filterSlav, test: (m) => !m.tradition.startsWith('Griega') },
  { id: 'este', label: es.athos.filterEast, test: (m) => m.side !== 'oeste' },
  { id: 'oeste', label: es.athos.filterWest, test: (m) => m.side === 'oeste' },
];

export function AthosPage() {
  const today = useToday();
  const monasteries = useAsync(() => db.monasteries.orderBy('rank').toArray(), []);
  const articles = useAsync(() => db.athos_articles.toArray(), []);
  const [elegido, setElegido] = useState<string | undefined>();
  const [filtro, setFiltro] = useState<Filtro>('todos');
  const [anoEntero, setAnoEntero] = useState(false);

  const lista = useMemo(() => monasteries.data ?? [], [monasteries.data]);
  const calendario = useMemo(() => athosFeastCalendar(lista, today), [lista, today]);
  const porId = useMemo(() => new Map((articles.data ?? []).map((a) => [a.id, a])), [articles.data]);
  const nombres = useMemo(() => new Map(lista.map((m) => [m.id, m.name])), [lista]);
  const visibles = lista.filter(FILTROS.find((f) => f.id === filtro)!.test);
  const hoy = calendario.filter((f) => f.days === 0);

  return (
    <div className="page page--athos">
      <PageHead eyebrow="Ἅγιον Ὄρος" title={es.library.athos} subtitle={ATHOS_INTRO} />

      <ul className="athos-facts" aria-label="La Montaña en cifras">
        {es.athos.facts.map((f) => (
          <li key={f}>{f}</li>
        ))}
      </ul>

      {hoy.length ? (
        <div className="athos-today" role="status">
          <span className="eyebrow">{es.athos.todayFeast}</span>
          {hoy.map((f) => (
            <FeastLink key={`${f.kind}-${f.place}-${f.name}`} fiesta={f} />
          ))}
        </div>
      ) : null}

      {monasteries.loading ? (
        <Loading />
      ) : (
        <Section title={es.athos.map} id="mapa">
          <div className="athos-explore">
            <AthosMap monasteries={lista} selected={elegido} onSelect={setElegido} />
            <div className="athos-explore__side">
              <Seleccion id={elegido} monasteries={lista} nombres={nombres} />
            </div>
          </div>
        </Section>
      )}

      <Section title={es.library.monasteries} id="monasterios">
        <div className="scroller athos-filters" role="group" aria-label="Filtrar los monasterios">
          {FILTROS.map((f) => (
            <button
              key={f.id}
              type="button"
              className="chip"
              aria-pressed={filtro === f.id}
              onClick={() => setFiltro(f.id)}
            >
              {f.label}
              <span className="chip__count">{lista.filter(f.test).length}</span>
            </button>
          ))}
        </div>
        <div className="monastery-list">
          {visibles.map((monastery) => (
            <MonasteryLink key={monastery.id} monastery={monastery} />
          ))}
        </div>
      </Section>

      <Section title={es.athos.sketes} id="sketes">
        <p className="section-lead">{es.athos.sketesLead}</p>
        <div className="list">
          {ATHOS_SKETES.map((s) => (
            <ListRow
              key={s.id}
              to={`/biblioteca/athos/monasterio/${s.monastery}`}
              title={s.name}
              meta={`${s.kind === 'cenobitico' ? es.athos.cenobitic : es.athos.idiorrhythmic} · ${s.tradition} · ${es.athos.dependsOn} ${nombres.get(s.monastery) ?? ''}`}
            />
          ))}
        </div>
      </Section>

      <Section title={es.athos.year} id="ano">
        <p className="section-lead">{es.athos.yearLead}</p>
        <ol className="feast-list">
          {(anoEntero ? calendario : calendario.slice(0, 6)).map((f) => (
            <li key={`${f.kind}-${f.place}-${f.name}`}>
              <FeastRow fiesta={f} />
            </li>
          ))}
        </ol>
        <button type="button" className="btn btn--ghost btn--sm" onClick={() => setAnoEntero((v) => !v)}>
          {anoEntero ? es.athos.fewer : `${es.athos.wholeYear} (${calendario.length})`}
        </button>
      </Section>

      {ATHOS_GROUPS.map((grupo) => {
        const dentro = grupo.articles.map((id) => porId.get(id)).filter((a) => a !== undefined);
        if (dentro.length === 0) return null;
        return (
          <Section key={grupo.id} title={grupo.title}>
            <p className="section-lead">{grupo.note}</p>
            <div className="list">
              {dentro.map((article) => (
                <ListRow
                  key={article.id}
                  to={`/biblioteca/athos/${article.id}`}
                  title={article.title}
                  meta={
                    ATHOS_LEAD[article.id] ??
                    article.blocks.find((b) => b.kind === 'text')?.content.slice(0, 150)
                  }
                />
              ))}
            </div>
          </Section>
        );
      })}

      <Link className="athos-beyond" to="/biblioteca/monasterios">
        <span className="eyebrow">Más allá de la Montaña</span>
        <span className="athos-beyond__title">Monasterios del mundo ortodoxo</span>
        <span className="athos-beyond__text">
          Del Sinaí a las Solovkí: Mar Saba, Patmos, Metéora, Rila, Studenica, las Lauras de Kiev y de San Sergio, Óptina,
          Valaam y los demás.
        </span>
      </Link>
    </div>
  );
}

/** La ficha de lo que se ha tocado en el mapa. */
function Seleccion({
  id,
  monasteries,
  nombres,
}: {
  id?: string;
  monasteries: Monastery[];
  nombres: Map<string, string>;
}) {
  const monasterio = monasteries.find((m) => m.id === id);
  const skete = ATHOS_SKETES.find((s) => s.id === id);
  const lugar = ATHOS_PLACES.find((l) => l.id === id);

  if (monasterio) {
    return (
      <div className="athos-pick" aria-live="polite">
        <p className="eyebrow">{es.athos.rank.replace('{{n}}', String(monasterio.rank))}</p>
        <p className="athos-pick__title">{monasterio.name}</p>
        <p className="athos-pick__greek" lang="el">
          {monasterio.greekName}
        </p>
        <p className="athos-pick__meta">
          {monasterio.tradition} · {monasterio.founded} · {monasterio.feast.name}
        </p>
        <p className="athos-pick__text">{monasterio.description}</p>
        <Link className="btn btn--primary btn--sm" to={`/biblioteca/athos/monasterio/${monasterio.id}`}>
          {es.athos.openMonastery}
        </Link>
      </div>
    );
  }
  if (skete) {
    return (
      <div className="athos-pick" aria-live="polite">
        <p className="eyebrow">
          Skete {skete.kind === 'cenobitico' ? es.athos.cenobitic.toLowerCase() : es.athos.idiorrhythmic.toLowerCase()}
        </p>
        <p className="athos-pick__title">{skete.name}</p>
        <p className="athos-pick__greek" lang="el">
          {skete.greekName}
        </p>
        <p className="athos-pick__meta">
          {skete.tradition} · {es.athos.dependsOn} {nombres.get(skete.monastery)}
        </p>
        <p className="athos-pick__text">{skete.note}</p>
        <Link className="btn btn--sm" to={`/biblioteca/athos/monasterio/${skete.monastery}`}>
          {nombres.get(skete.monastery)}
        </Link>
      </div>
    );
  }
  if (lugar) {
    return (
      <div className="athos-pick" aria-live="polite">
        <p className="athos-pick__title">{lugar.name}</p>
        <p className="athos-pick__text">{lugar.note}</p>
        {lugar.id === 'karyes' ? (
          <Link className="btn btn--sm" to="/biblioteca/athos/karyes">
            {es.athos.openArticle}
          </Link>
        ) : null}
      </div>
    );
  }
  return <p className="athos-pick athos-pick--empty">{es.athos.mapHint}</p>;
}

function FeastLink({ fiesta }: { fiesta: AthosFeastDay }) {
  const destino = fiesta.monasteryId ? `/biblioteca/athos/monasterio/${fiesta.monasteryId}` : '/biblioteca/athos/karyes';
  return (
    <Link className="athos-today__feast" to={destino}>
      <b>{fiesta.place}</b> · {fiesta.name}
    </Link>
  );
}

/** Una fiesta del año: el día civil, quién celebra, qué y el día en la Montaña. */
function FeastRow({ fiesta }: { fiesta: AthosFeastDay }) {
  const [dia, , mes] = formatDayMonth(fiesta.date).split(' ');
  const destino = fiesta.monasteryId ? `/biblioteca/athos/monasterio/${fiesta.monasteryId}` : '/biblioteca/athos/karyes';
  return (
    <Link className={`feast-row${fiesta.days === 0 ? ' feast-row--today' : ''}`} to={destino}>
      <span className="feast-row__date" aria-hidden="true">
        <b>{dia}</b>
        <span>{mes?.slice(0, 3)}</span>
      </span>
      <span className="feast-row__body">
        <span className="feast-row__place">{fiesta.place}</span>
        <span className="feast-row__name">
          {fiesta.kind === 'icono' ? 'Icono: ' : ''}
          {fiesta.name}
        </span>
        <span className="feast-row__meta">
          <span className="sr-only">{formatDayMonth(fiesta.date)}. </span>
          {fiesta.churchDay ? es.athos.churchDay.replace('{{date}}', formatMonthDay(fiesta.churchDay)) : null}
          {fiesta.moved ? ` · ${es.athos.movedGeorge}` : null}
        </span>
      </span>
    </Link>
  );
}
