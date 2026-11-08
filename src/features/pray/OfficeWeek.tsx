/**
 * Los tres oficios de los últimos siete días.
 *
 * Quien empieza a rezar necesita ver que la costumbre va cogiendo forma, y
 * también dónde se le cae —el mediodía, casi siempre—. Esto lo enseña sin
 * números ni rachas: un punto por oficio rezado, y nada más.
 */
import { useAsync } from '@/hooks/useAsync';
import { officeWeek } from '@/db/user';
import { DAILY_OFFICES } from '@/content/hours';
import { LENGTH_INFO } from '@/content/office-lengths';
import { isoToCivil, isoToJdn, weekdayFromJdn } from '@/lib/calendar/jdn';
import { WEEKDAYS, WEEKDAYS_NARROW } from '@/lib/format';
import es from '@/locales/es';

const FILA: Record<string, string> = {
  manana: es.rule.morning,
  mediodia: es.rule.midday,
  noche: es.rule.evening,
};

export function OfficeWeek({ today }: { today: string }) {
  const semana = useAsync(() => officeWeek(today), [today]);
  const dias = semana.data ?? [];
  if (!dias.length) return null;

  return (
    <div className="office-week-wrap">
      <table className="office-week">
        <caption className="sr-only">{es.pray.week}</caption>
        <thead>
          <tr>
            <th scope="col">
              <span className="sr-only">Oficio</span>
            </th>
            {dias.map((d) => {
              const wd = weekdayFromJdn(isoToJdn(d.date));
              return (
                <th
                  key={d.date}
                  scope="col"
                  className={d.date === today ? 'office-week__day office-week__day--today' : 'office-week__day'}
                  aria-label={`${WEEKDAYS[wd]} ${isoToCivil(d.date).day}`}
                >
                  <span aria-hidden="true">{WEEKDAYS_NARROW[wd]}</span>
                  <span className="office-week__num" aria-hidden="true">
                    {isoToCivil(d.date).day}
                  </span>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {DAILY_OFFICES.map((oficio) => (
            <tr key={oficio.time}>
              <th scope="row" className="office-week__office">
                {FILA[oficio.time]}
              </th>
              {dias.map((d) => {
                const rezado = d.prayed.has(oficio.time);
                const medida = d.prayed.get(oficio.time);
                const etiqueta = rezado
                  ? es.pray.weekPrayed
                      .replace('{{office}}', oficio.name)
                      .replace('{{length}}', (LENGTH_INFO.get(medida ?? 'habitual')?.label ?? '').toLowerCase())
                  : es.pray.weekMissing.replace('{{office}}', oficio.name);
                return (
                  <td key={d.date} className={d.date === today ? 'office-week__cell--today' : undefined}>
                    <span
                      className={`office-week__dot${rezado ? ' office-week__dot--done' : ''}`}
                      data-length={rezado ? (medida ?? 'habitual') : undefined}
                      role="img"
                      aria-label={etiqueta}
                      title={etiqueta}
                    />
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <p className="office-week__legend muted text-sm" aria-hidden="true">
        <span className="office-week__dot office-week__dot--done" /> {es.pray.weekLegend}
        <span className="office-week__dot" /> {es.pray.weekNone}
      </p>
    </div>
  );
}
