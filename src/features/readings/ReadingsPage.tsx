/**
 * Lecturas del día.
 *
 * Muestra las perícopas señaladas y, cuando la referencia puede resolverse
 * dentro de la traducción incorporada, el texto completo. Si la entrada del
 * leccionario no existe, se dice, en lugar de mostrar un hueco mudo.
 */
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLiturgicalDay, useToday } from '@/hooks/useLiturgicalDay';
import { useAsync } from '@/hooks/useAsync';
import { getChapter } from '@/db/bible';
import { parseReference } from '@/lib/reference';
import { LECTIONARY_COVERAGE_NOTE } from '@/content/lectionary';
import { addDaysIso } from '@/lib/calendar/jdn';
import { formatLongDate } from '@/lib/format';
import { Button, Loading, Notice, PageHead, Panel, Section, SourceNote } from '@/components/ui';
import { IconChevronLeft, IconChevronRight } from '@/components/icons';
import type { ReadingRef } from '@/types';
import es from '@/locales/es';

function ReadingBlock({ reading }: { reading: ReadingRef }) {
  const [expanded, setExpanded] = useState(false);
  const target = parseReference(reading.reference);
  const verses = useAsync(
    () => (expanded && target ? getChapter(target.bookId, target.chapter) : Promise.resolve([])),
    [expanded, target?.bookId, target?.chapter],
  );

  const label = reading.kind === 'evangelio' ? es.home.gospel : reading.kind === 'epistola' ? es.home.epistle : 'Lectura';

  return (
    <Panel>
      <p className="eyebrow">{label}</p>
      <p className="display" style={{ fontSize: 'var(--text-lg)', margin: 'var(--sp-1) 0 var(--sp-3)' }}>
        {reading.reference}
      </p>

      {target ? (
        <div className="btn-row">
          <Button size="sm" onClick={() => setExpanded((value) => !value)}>
            {expanded ? 'Ocultar el capítulo' : 'Leer el capítulo'}
          </Button>
          <Link className="btn btn--sm btn--ghost" to={`/leer/biblia/${target.bookId}/${target.chapter}`}>
            Abrir en la Biblia
          </Link>
        </div>
      ) : (
        <p className="muted text-sm">
          La referencia no se puede abrir automáticamente: busca el pasaje en la Biblia.
        </p>
      )}

      {expanded ? (
        verses.loading ? (
          <Loading />
        ) : (
          <div className="prose book-surface" style={{ marginTop: 'var(--sp-4)' }}>
            <p className="rubric">
              Se muestra el capítulo completo; la perícopa señalada es {reading.reference}.
            </p>
            {verses.data?.map((verse) => (
              <p key={verse.id}>
                <span className="verse-num">{verse.verse}</span>
                {verse.text}
              </p>
            ))}
          </div>
        )
      ) : null}
    </Panel>
  );
}

export function ReadingsPage() {
  const today = useToday();
  const [date, setDate] = useState(today);
  const day = useLiturgicalDay(date);

  return (
    <div className="page page--reading">
      <PageHead eyebrow={es.nav.read} title={es.home.readings} subtitle={formatLongDate(date)} />

      <nav className="row row--between" style={{ marginBottom: 'var(--sp-5)' }} aria-label="Cambiar de día">
        <Button size="sm" onClick={() => setDate(addDaysIso(date, -1))}>
          <IconChevronLeft size={16} /> Día anterior
        </Button>
        {date !== today ? (
          <Button size="sm" variant="ghost" onClick={() => setDate(today)}>
            {es.app.today}
          </Button>
        ) : null}
        <Button size="sm" onClick={() => setDate(addDaysIso(date, 1))}>
          Día siguiente <IconChevronRight size={16} />
        </Button>
      </nav>

      {day.readings ? (
        <>
          {day.readings.title ? (
            <p className="display" style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--sp-4)' }}>
              {day.readings.title}
            </p>
          ) : null}
          <div className="stack">
            {day.readings.readings.map((reading) => (
              <ReadingBlock key={`${reading.kind}-${reading.reference}`} reading={reading} />
            ))}
          </div>
          {day.readings.meta ? <SourceNote meta={day.readings.meta} status={day.readings.status} /> : null}
        </>
      ) : (
        <Notice variant="pending">
          No hay lecturas incorporadas para este día. {LECTIONARY_COVERAGE_NOTE}
        </Notice>
      )}

      <Section title="También hoy">
        <div className="list">
          <Link className="list-item" to="/leer/salterio">
            <span className="list-item__body">
              <span className="list-item__title">{es.psalter.title}</span>
              <span className="list-item__meta">Lectura continua del Salterio</span>
            </span>
          </Link>
          <Link className="list-item" to={`/calendario/dia/${date}`}>
            <span className="list-item__body">
              <span className="list-item__title">El día litúrgico completo</span>
              <span className="list-item__meta">Santos, fiestas y ayuno</span>
            </span>
          </Link>
        </div>
      </Section>
    </div>
  );
}
