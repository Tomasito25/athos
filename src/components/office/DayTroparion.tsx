/**
 * El tropario de hoy, dentro de las Horas.
 *
 * Es lo único de las Horas que cambia cada día, y hasta ahora la pantalla
 * decía «pendiente». Ahora pone el que toca según el calendario elegido: el
 * de la Resurrección los domingos, el de la fiesta móvil, el del santo. Cuando
 * hoy no se canta tropario del día —la Semana Luminosa, los días de diario de
 * Cuaresma—, lo dice y explica qué se hace en su lugar.
 */
import { Link } from 'react-router-dom';
import { useLiturgicalDay, useToday } from '@/hooks/useLiturgicalDay';
import { troparionsForDay } from '@/lib/calendar/day-troparia';
import { formatLongDate } from '@/lib/format';
import { Tag } from '@/components/ui';

/** «Jueves, 1 de octubre» → «jueves, 1 de octubre», para ir detrás de «Hoy,». */
const enMinuscula = (s: string) => s.charAt(0).toLocaleLowerCase('es') + s.slice(1);

const ORIGEN: Record<string, string> = {
  resurreccion: 'Del Octoecos',
  'fiesta-movil': 'De la fiesta',
  fiesta: 'De la fiesta',
  propio: 'Propio del santo',
  general: 'General de su rango',
};

export default function DayTroparion() {
  const today = useToday();
  const day = useLiturgicalDay(today);
  const result = troparionsForDay(day);

  return (
    <div className="day-troparion" aria-live="polite">
      <p className="day-troparion__date">Hoy, {enMinuscula(formatLongDate(today))}</p>

      {result.kind === 'luminosa' ? (
        <div className="day-troparion__notice">
          <p>
            <strong>Es la Semana Luminosa.</strong> Durante los siete días de Pascua no se rezan las Horas
            ordinarias: se cantan en su lugar las Horas de Pascua, todas iguales y todas cantadas —«Cristo ha
            resucitado» tres veces, «Habiendo contemplado la resurrección de Cristo», el hipakoí y el kontakion de
            Pascua—.
          </p>
          <p>
            <Link to="/orar/oraciones/cristo-ha-resucitado">Cristo ha resucitado</Link>
          </p>
        </div>
      ) : result.kind === 'cuaresma' ? (
        <div className="day-troparion__notice">
          <p>
            <strong>Hoy es día de diario de la Gran Cuaresma.</strong> No se canta el tropario del día: en su
            lugar se canta tres veces, con una postración cada vez, el tropario propio de esta Hora, que va justo
            debajo.
          </p>
        </div>
      ) : result.items.length === 0 ? (
        <p className="muted text-sm">
          Para hoy ATHOS no tiene tropario incorporado. Se dice el del santo del día tomado del Menaion.
        </p>
      ) : (
        <>
          {result.items.map((item, i) => (
            <div key={`${item.name}-${i}`} className="day-troparion__item">
              {i > 0 ? <p className="rubric">Gloria al Padre, y al Hijo, y al Espíritu Santo.</p> : null}
              <div className="tag-row" style={{ margin: 'var(--sp-2) 0' }}>
                <Tag tone="gold">{item.occasion}</Tag>
                <Tag>{item.tone}</Tag>
                <Tag>{ORIGEN[item.origin]}</Tag>
              </div>
              {item.blocks.map((b, j) =>
                b.kind === 'rubric' ? (
                  <p key={j} className="rubric text-sm">
                    {b.content}
                  </p>
                ) : (
                  <p key={j} dangerouslySetInnerHTML={{ __html: b.content }} />
                ),
              )}
            </div>
          ))}
          {result.items.some((i) => i.origin === 'general') ? (
            <p className="rubric text-sm">
              «General de su rango» es el tropario que la Iglesia canta para todos los santos de un mismo orden
              cuando no se dispone del propio. Donde dice el nombre entre paréntesis, se dice el del santo.
            </p>
          ) : null}
          {result.items.length > 1 ? (
            <p className="rubric text-sm">
              Cuando hay varios troparios, el Typikon los reparte entre las Horas; aquí van todos.
            </p>
          ) : null}
          <p className="muted text-sm">
            Las traducciones son de ATHOS, a partir del original griego, y no proceden de un libro litúrgico
            español publicado.
          </p>
        </>
      )}
    </div>
  );
}
