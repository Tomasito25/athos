/**
 * Lecturas del día.
 *
 * Muestra el texto exacto de cada perícopa —los versículos que se leen, no el
 * capítulo entero—, y para las referencias compuestas que no se pueden recortar
 * con seguridad, remite a la Biblia. Si el leccionario no tiene entrada para el
 * día, se dice, en lugar de mostrar un hueco mudo.
 */
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLiturgicalDay, useToday } from '@/hooks/useLiturgicalDay';
import { parseReference } from '@/lib/reference';
import { LECTIONARY_COVERAGE_NOTE } from '@/content/lectionary';
import { addDaysIso } from '@/lib/calendar/jdn';
import { formatLongDate } from '@/lib/format';
import { Button, Notice, PageHead, Panel, Section, SourceNote } from '@/components/ui';
import { PericopeText } from '@/components/PericopeText';
import { IconChevronLeft, IconChevronRight } from '@/components/icons';
import type { ReadingRef } from '@/types';
import { LITURGY_KINDS, isComposite, readingLabel, readingNote, readingTitle } from '@/lib/readings';
import es from '@/locales/es';

// Las etiquetas y la limpieza de las referencias compuestas se comparten con
// la ficha del día: viven en `lib/readings`.
const DE_LA_LITURGIA = LITURGY_KINDS;

function ReadingBlock({ reading, abierta = false }: { reading: ReadingRef; abierta?: boolean }) {
  const [expanded, setExpanded] = useState(abierta);
  // El leccionario generado ya trae el libro y el capítulo resueltos; si no,
  // se intenta deducirlos de la referencia escrita.
  const target = reading.passageId
    ? { bookId: reading.passageId.split('.')[0], chapter: Number(reading.passageId.split('.')[1]) }
    : parseReference(reading.reference);

  const label = readingLabel(reading.kind);

  return (
    <Panel>
      <p className="eyebrow">
        {label}
        {reading.note ? ` · ${readingNote(reading.note)}` : ''}
      </p>
      <p className="display" style={{ fontSize: 'var(--text-lg)', margin: 'var(--sp-1) 0 var(--sp-3)' }}>
        {readingTitle(reading.reference)}
      </p>
      {isComposite(reading.reference) ? (
        <p className="rubric" style={{ marginTop: 'calc(-1 * var(--sp-2))' }}>
          Lectura compuesta de varios pasajes.
        </p>
      ) : null}

      <div className="btn-row">
        <Button size="sm" onClick={() => setExpanded((value) => !value)}>
          {expanded ? 'Ocultar el texto' : 'Leer el pasaje'}
        </Button>
        {target ? (
          <Link className="btn btn--sm btn--ghost" to={`/leer/biblia/${target.bookId}/${target.chapter}`}>
            Ver el capítulo
          </Link>
        ) : null}
      </div>

      {expanded ? (
        <div style={{ marginTop: 'var(--sp-4)' }}>
          <PericopeText reference={reading.reference} />
        </div>
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
            {day.readings.readings
              .filter((r) => DE_LA_LITURGIA.includes(r.kind))
              .map((reading) => (
                <ReadingBlock
                  key={`${reading.kind}-${reading.reference}`}
                  reading={reading}
                  abierta
                />
              ))}
          </div>

          {day.readings.readings.some((r) => !DE_LA_LITURGIA.includes(r.kind)) ? (
            <Section title="Otros oficios del día">
              <div className="stack">
                {day.readings.readings
                  .filter((r) => !DE_LA_LITURGIA.includes(r.kind))
                  .map((reading) => (
                    <ReadingBlock key={`${reading.kind}-${reading.reference}`} reading={reading} />
                  ))}
              </div>
            </Section>
          ) : null}
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
