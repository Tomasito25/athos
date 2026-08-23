import { Link } from 'react-router-dom';
import { useAsync } from '@/hooks/useAsync';
import { getPsalms, suggestedKathisma } from '@/db/psalter';
import { useToday } from '@/hooks/useLiturgicalDay';
import { isoToDate } from '@/lib/calendar/jdn';
import { KATHISMATA, PSALM_NOTES, PSALTER_META, SIX_PSALMS } from '@/content/psalter';
import { ListRow, Loading, PageHead, Section, SourceNote, Tag } from '@/components/ui';
import es from '@/locales/es';

/** Índice del Salterio: kathismata, salmos señalados y lista completa. */
export function PsalterPage() {
  const today = useToday();
  const suggested = suggestedKathisma(isoToDate(today));
  const psalms = useAsync(() => getPsalms(), []);

  return (
    <div className="page">
      <PageHead title={es.psalter.title} subtitle={es.psalter.subtitle} />

      <Section title={es.psalter.todaySuggestion}>
        <Link className="panel" to={`/leer/salterio/kathisma/${suggested}`} style={{ textDecoration: 'none', display: 'block' }}>
          <p className="panel__title">{es.psalter.kathisma.replace('{{n}}', String(suggested))}</p>
          <p className="muted text-sm">
            Salmos {KATHISMATA[suggested - 1].psalms[0]}–{KATHISMATA[suggested - 1].psalms.at(-1)}
          </p>
          <p className="muted text-sm" style={{ marginTop: 'var(--sp-2)' }}>
            Reparto de lectura continua en veinte días. La distribución del Typikon depende del
            tiempo litúrgico y del día de la semana.
          </p>
        </Link>
      </Section>

      <Section title={es.psalter.sixPsalms}>
        <div className="scroller">
          {SIX_PSALMS.map((number) => (
            <Link key={number} className="card" to={`/leer/salterio/${number}`} style={{ minWidth: '11rem' }}>
              <span className="card__title">{es.psalter.psalm.replace('{{n}}', String(number))}</span>
              <span className="card__text">{PSALM_NOTES[number]}</span>
            </Link>
          ))}
        </div>
      </Section>

      <Section title={es.psalter.kathismata}>
        <div className="grid">
          {KATHISMATA.map((kathisma) => (
            <Link key={kathisma.number} className="card" to={`/leer/salterio/kathisma/${kathisma.number}`}>
              <span className="card__title">{es.psalter.kathisma.replace('{{n}}', String(kathisma.number))}</span>
              <span className="card__text">
                Salmos {kathisma.psalms[0]}–{kathisma.psalms.at(-1)}
              </span>
            </Link>
          ))}
        </div>
      </Section>

      <Section title="Todos los salmos">
        {psalms.loading ? (
          <Loading />
        ) : (
          <div className="list">
            {psalms.data?.map((psalm) => (
              <ListRow
                key={psalm.id}
                to={`/leer/salterio/${psalm.numberLxx}`}
                title={es.psalter.psalm.replace('{{n}}', String(psalm.numberLxx))}
                meta={PSALM_NOTES[psalm.numberLxx] ?? psalm.blocks.find((b) => b.kind === 'verse')?.content}
                trailing={
                  psalm.numberHebrew !== psalm.numberLxx ? (
                    <Tag>{psalm.numberHebrew} heb.</Tag>
                  ) : null
                }
              />
            ))}
          </div>
        )}
      </Section>

      <SourceNote meta={PSALTER_META} />
    </div>
  );
}
