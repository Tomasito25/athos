/**
 * La ficha de un monasterio.
 *
 * Lo que se pregunta de un monasterio, en el orden en que se pregunta: dónde
 * está, de quién es, cuándo es su fiesta, qué es hoy, quién vivió allí, qué
 * guarda y qué depende de él. Al pie, el trozo de la península donde está y
 * el paso al anterior y al siguiente en la jerarquía, que es el orden en que
 * la Montaña misma los nombra.
 */
import { Link, useParams } from 'react-router-dom';
import { useAsync } from '@/hooks/useAsync';
import { useToday } from '@/hooks/useLiturgicalDay';
import { db } from '@/db/db';
import { ATHOS_SKETES } from '@/content/athos-lugares';
import { nextMonasteryFeast } from '@/lib/athos-feasts';
import { formatDayMonth, formatMonthDay, relativeDayLabel } from '@/lib/format';
import { AthosMap } from './AthosMap';
import { Loading, PageHead, Section, SourceNote, NotFound } from '@/components/ui';
import { ReaderToolbar } from '@/components/Reader';
import { RichText } from '@/components/RichText';
import { IconChevronLeft, IconChevronRight } from '@/components/icons';
import { useVisitLog } from '@/hooks/useVisitLog';
import type { Monastery } from '@/types';
import es from '@/locales/es';

function dondeEsta(m: Monastery): string {
  if (m.side === 'centro') return es.athos.sideCenter;
  const vertiente = m.side === 'este' ? es.athos.sideEast : es.athos.sideWest;
  return `${vertiente}, ${m.shore ? es.athos.onShore : es.athos.inland}`;
}

export function MonasteryPage() {
  const { monasteryId = '' } = useParams();
  const today = useToday();
  const monastery = useAsync(() => db.monasteries.get(monasteryId), [monasteryId]);
  const all = useAsync(() => db.monasteries.orderBy('rank').toArray(), []);
  const path = `/biblioteca/athos/monasterio/${monasteryId}`;

  useVisitLog(monastery.data ? { path, title: monastery.data.name, kind: es.library.athos } : null);

  if (monastery.loading) return <Loading />;
  if (!monastery.data) {
    return (
      <div className="page">
        <NotFound title="Ese monasterio no está en la lista" />
      </div>
    );
  }

  const item = monastery.data;
  const lista = all.data ?? [];
  const anterior = lista.find((m) => m.rank === item.rank - 1);
  const siguiente = lista.find((m) => m.rank === item.rank + 1);
  const sketes = ATHOS_SKETES.filter((s) => s.monastery === item.id);
  const fiesta = nextMonasteryFeast(item, today);
  const cuando = fiesta ? (relativeDayLabel(fiesta.date, today) ?? formatDayMonth(fiesta.date)) : null;

  return (
    <article className="page page--reading">
      <PageHead
        eyebrow={`${es.library.athos} · ${es.athos.rank.replace('{{n}}', String(item.rank))}`}
        title={item.name}
        subtitle={item.greekName}
      />

      <dl className="facts">
        <div>
          <dt>{es.athos.founded}</dt>
          <dd>{item.founded}</dd>
        </div>
        <div>
          <dt>{es.athos.tradition}</dt>
          <dd>{item.tradition}</dd>
        </div>
        <div className="facts__wide">
          <dt>{es.athos.feast}</dt>
          <dd>
            {item.feast.name}
            {item.feast.day ? ` · ${formatMonthDay(item.feast.day)}` : ''}
            {cuando ? <span className="facts__note">{es.athos.nextFeast.replace('{{date}}', cuando.toLowerCase())}</span> : null}
          </dd>
        </div>
        <div className="facts__wide">
          <dt>{es.athos.where}</dt>
          <dd>{dondeEsta(item)}</dd>
        </div>
        {item.renewal ? (
          <div>
            <dt>{es.athos.renewal}</dt>
            <dd>{item.renewal}</dd>
          </div>
        ) : null}
        {sketes.length ? (
          <div>
            <dt>Sketes</dt>
            <dd>{sketes.length}</dd>
          </div>
        ) : null}
      </dl>

      <ReaderToolbar favorite={{ kind: 'monastery', refId: item.id, title: item.name, path }} />

      <div className="prose book-surface" style={{ marginTop: 'var(--sp-5)' }}>
        <p>
          <RichText>{item.description}</RichText>
        </p>
        {/* Qué es hoy. Sin esto, la ficha se queda en la fecha de fundación y
            todos los monasterios se parecen. */}
        {item.today ? (
          <p>
            <RichText>{item.today}</RichText>
          </p>
        ) : null}
      </div>

      {item.saints?.length ? (
        <Section title={es.athos.livedHere}>
          <ul className="bullet-list">
            {item.saints.map((santo) => (
              <li key={santo}>
                <RichText max={1}>{santo}</RichText>
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      {item.treasures?.length ? (
        <Section title={es.athos.treasures}>
          <ul className="bullet-list">
            {item.treasures.map((treasure) => (
              <li key={treasure}>{treasure}</li>
            ))}
          </ul>
        </Section>
      ) : null}

      {sketes.length || item.dependencies?.length ? (
        <Section title={es.athos.dependencies}>
          {sketes.length ? (
            <div className="list">
              {sketes.map((s) => (
                <div key={s.id} className="list-item list-item--static">
                  <span className="list-item__body">
                    <span className="list-item__title">Skete de {s.name}</span>
                    <span className="list-item__meta">
                      {s.kind === 'cenobitico' ? es.athos.cenobitic : es.athos.idiorrhythmic} · {s.tradition}. {s.note}
                    </span>
                  </span>
                </div>
              ))}
            </div>
          ) : null}
          {item.dependencies?.length ? (
            <div className="tag-row" style={{ marginTop: 'var(--sp-3)' }}>
              {item.dependencies.map((dep) => (
                <span key={dep} className="tag">
                  {dep}
                </span>
              ))}
            </div>
          ) : null}
          <p className="muted text-sm" style={{ marginTop: 'var(--sp-2)' }}>
            {es.athos.dependenciesNote}
          </p>
        </Section>
      ) : null}

      <Section title={es.athos.onMap}>
        <AthosMap monasteries={lista} activeId={item.id} />
      </Section>

      <nav className="pager" aria-label="Los monasterios por orden">
        {anterior ? (
          <Link className="pager__link" to={`/biblioteca/athos/monasterio/${anterior.id}`} rel="prev">
            <IconChevronLeft size={18} aria-hidden="true" />
            <span>
              <span className="pager__label">{es.athos.previous}</span>
              <span className="pager__title">
                {anterior.rank}. {anterior.name}
              </span>
            </span>
          </Link>
        ) : (
          <span />
        )}
        {siguiente ? (
          <Link className="pager__link pager__link--next" to={`/biblioteca/athos/monasterio/${siguiente.id}`} rel="next">
            <span>
              <span className="pager__label">{es.athos.next}</span>
              <span className="pager__title">
                {siguiente.rank}. {siguiente.name}
              </span>
            </span>
            <IconChevronRight size={18} aria-hidden="true" />
          </Link>
        ) : null}
      </nav>

      <SourceNote meta={item.meta} status={item.status} />
    </article>
  );
}
