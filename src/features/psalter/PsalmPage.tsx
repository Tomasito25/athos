import { Link, useParams } from 'react-router-dom';
import { useAsync } from '@/hooks/useAsync';
import { getPsalm } from '@/db/psalter';
import { kathismaOf, PSALM_NOTES } from '@/content/psalter';
import { Blocks, Empty, Loading, SourceNote, Tag } from '@/components/ui';
import { ReaderToolbar } from '@/components/Reader';
import { IconChevronLeft, IconChevronRight } from '@/components/icons';
import { useVisitLog } from '@/hooks/useVisitLog';
import es from '@/locales/es';

export function PsalmPage() {
  const { number = '1' } = useParams();
  const lxx = Number(number);
  const psalm = useAsync(() => getPsalm(lxx), [lxx]);
  const path = `/leer/salterio/${lxx}`;

  useVisitLog({ path, title: es.psalter.psalm.replace('{{n}}', String(lxx)), kind: es.psalter.title });

  if (psalm.loading) return <Loading />;
  if (!psalm.data) {
    return (
      <div className="page">
        <Empty title="Ese salmo no existe" text="El Salterio va del 1 al 151." />
      </div>
    );
  }

  const item = psalm.data;
  const kathisma = kathismaOf(lxx);

  return (
    <article className="page page--reading">
      <header style={{ paddingTop: 'var(--sp-5)', marginBottom: 'var(--sp-4)' }}>
        {kathisma ? (
          <Link className="eyebrow" to={`/leer/salterio/kathisma/${kathisma.number}`} style={{ textDecoration: 'none' }}>
            {es.psalter.kathisma.replace('{{n}}', String(kathisma.number))}
          </Link>
        ) : null}

        <h1 className="display" style={{ fontSize: 'var(--text-2xl)', margin: 'var(--sp-2) 0' }}>
          {es.psalter.psalm.replace('{{n}}', String(item.numberLxx))}
        </h1>

        <div className="tag-row" style={{ marginBottom: 'var(--sp-3)' }}>
          <Tag tone="gold">LXX {item.numberLxx}</Tag>
          {item.numberHebrew !== item.numberLxx ? (
            <Tag>{es.psalter.hebrewNumber.replace('{{n}}', String(item.numberHebrew))}</Tag>
          ) : null}
        </div>

        {PSALM_NOTES[lxx] ? <p className="rubric">{PSALM_NOTES[lxx]}</p> : null}

        <div style={{ marginTop: 'var(--sp-4)' }}>
          <ReaderToolbar
            favorite={{
              kind: 'psalm',
              refId: String(lxx),
              title: es.psalter.psalm.replace('{{n}}', String(lxx)),
              path,
            }}
            note={{
              targetKind: 'psalm',
              targetId: String(lxx),
              targetTitle: es.psalter.psalm.replace('{{n}}', String(lxx)),
              path,
            }}
          />
        </div>
      </header>

      <Blocks blocks={item.blocks} />

      <nav className="row row--between" style={{ marginTop: 'var(--sp-6)' }} aria-label="Navegación entre salmos">
        {lxx > 1 ? (
          <Link className="btn" to={`/leer/salterio/${lxx - 1}`}>
            <IconChevronLeft size={16} /> {es.psalter.psalm.replace('{{n}}', String(lxx - 1))}
          </Link>
        ) : (
          <span />
        )}
        {lxx < 151 ? (
          <Link className="btn" to={`/leer/salterio/${lxx + 1}`}>
            {es.psalter.psalm.replace('{{n}}', String(lxx + 1))} <IconChevronRight size={16} />
          </Link>
        ) : (
          <span />
        )}
      </nav>

      <SourceNote meta={item.meta} status={item.status} />
    </article>
  );
}
