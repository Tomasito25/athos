/**
 * Las lecturas del día, dentro de un oficio.
 *
 * Como el tropario del día: el oficio no guarda texto, pone el Apóstol y el
 * Evangelio que la Iglesia lee el día en que se abre, tomados del leccionario
 * y de la Biblia de ATHOS. Los días sin Liturgia —los de diario de la Gran
 * Cuaresma— pone lo que se lee en los otros oficios, y si no hay nada lo dice.
 */
import { Link } from 'react-router-dom';
import { useLiturgicalDay, useToday } from '@/hooks/useLiturgicalDay';
import { PericopeText } from '@/components/PericopeText';
import { readingLabel, readingNote, readingTitle, splitReadings } from '@/lib/readings';

export default function DayReadings() {
  const today = useToday();
  const day = useLiturgicalDay(today);
  const { liturgia, otras } = splitReadings(day.readings?.readings ?? []);
  const lecturas = liturgia.length ? liturgia : otras;

  if (!lecturas.length) {
    return (
      <p className="notice notice--pending">
        El leccionario de ATHOS no trae lecturas para hoy. Puedes leer en su lugar un capítulo del Evangelio
        desde <Link to="/leer/biblia">Leer → Biblia</Link>.
      </p>
    );
  }

  return (
    <div className="day-readings">
      {lecturas.map((lectura) => (
        <details key={`${lectura.kind}-${lectura.reference}`} className="inline-psalm inline-reading" open>
          <summary className="inline-psalm__head">
            <span className="inline-psalm__title">
              {readingLabel(lectura.kind)} · {readingTitle(lectura.reference)}
            </span>
          </summary>
          {lectura.note ? <p className="rubric">{readingNote(lectura.note)}</p> : null}
          <div className="inline-psalm__body">
            <PericopeText reference={lectura.reference} />
          </div>
        </details>
      ))}
    </div>
  );
}
