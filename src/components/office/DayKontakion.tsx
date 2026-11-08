/**
 * El kontakion de hoy, dentro de las Horas.
 *
 * Hasta la versión 1.25 la pantalla decía aquí «pendiente». Ahora pone el que
 * toca según el calendario elegido: el de la Resurrección los domingos, el de
 * la fiesta, el del santo si ATHOS lo tiene, y si no, el del día de la semana.
 * En los días de diario de la Cuaresma pone lo que el Horologion manda decir
 * en su lugar, que cambia de una Hora a otra.
 */
import { useLiturgicalDay, useToday } from '@/hooks/useLiturgicalDay';
import { kontakiaForDay, LENTEN_CROSS_KONTAKION } from '@/lib/calendar/day-kontakia';
import { Tag } from '@/components/ui';
import type { TextBlock } from '@/types';

const ORIGEN: Record<string, string> = {
  resurreccion: 'Del Octoecos',
  'fiesta-movil': 'De la fiesta',
  fiesta: 'De la fiesta',
  santo: 'Propio del santo',
  semana: 'Del día de la semana',
};

function Bloques({ blocks }: { blocks: TextBlock[] }) {
  return (
    <>
      {blocks.map((b, j) =>
        b.kind === 'rubric' ? (
          <p key={j} className="rubric text-sm">
            {b.content}
          </p>
        ) : (
          <p key={j} dangerouslySetInnerHTML={{ __html: b.content }} />
        ),
      )}
    </>
  );
}

export default function DayKontakion({ hora }: { hora?: string }) {
  const today = useToday();
  const day = useLiturgicalDay(today);
  const result = kontakiaForDay(day, hora);

  if (result.kind === 'cuaresma') {
    return (
      <div className="day-troparion" aria-live="polite">
        <div className="day-troparion__notice">
          <p>
            <strong>Hoy es día de diario de la Gran Cuaresma.</strong> En lugar del kontakion del día, el
            Horologion pone en esta Hora estos troparios:
          </p>
        </div>
        {result.blocks.length > 0 ? (
          <Bloques blocks={result.blocks} />
        ) : (
          <p className="muted text-sm">En esta Hora no hay troparios propios de la Cuaresma.</p>
        )}
        {result.cuartaSemana ? (
          <>
            <p className="rubric text-sm">
              En la cuarta semana, la de la Cruz, se dice además el kontakion del domingo de la Cruz, en el tono
              séptimo:
            </p>
            <Bloques blocks={LENTEN_CROSS_KONTAKION.blocks} />
          </>
        ) : null}
        <p className="muted text-sm">
          Es el orden del Horologion griego. Si hoy se celebra a un santo con fiesta, se dice en su lugar el
          kontakion del santo. La traducción es de ATHOS.
        </p>
      </div>
    );
  }

  const items = result.items;
  return (
    <div className="day-troparion" aria-live="polite">
      {result.kind === 'luminosa' ? (
        <div className="day-troparion__notice">
          <p>
            <strong>Es la Semana Luminosa.</strong> En las Horas de Pascua se canta este kontakion:
          </p>
        </div>
      ) : null}
      {items.length === 0 ? (
        <p className="muted text-sm">
          Para hoy ATHOS no tiene kontakion incorporado. Se dice el del santo del día, tomado del Menaion.
        </p>
      ) : (
        items.map((item, i) => (
          <div key={`${item.name}-${i}`} className="day-troparion__item">
            <div className="tag-row" style={{ margin: 'var(--sp-2) 0' }}>
              <Tag tone="gold">{item.occasion}</Tag>
              <Tag>{item.tone}</Tag>
              <Tag>{ORIGEN[item.origin]}</Tag>
            </div>
            <Bloques blocks={item.blocks} />
          </div>
        ))
      )}
      {result.kind === 'kontakia' && result.sinPropio.length > 0 ? (
        <p className="rubric text-sm">
          {result.items.some((i) => i.origin === 'semana')
            ? `ATHOS no tiene el kontakion propio de ${result.sinPropio.join(', ')}; se pone el del día de la semana, que es el que trae el Horologion cuando no hay otro. Quien tenga el Menaion puede decir el del santo.`
            : `ATHOS no tiene el kontakion propio de ${result.sinPropio.join(', ')}.`}
        </p>
      ) : null}
      {items.length > 1 ? (
        <p className="rubric text-sm">Cuando hay varios kontakia, el Typikon los reparte entre las Horas; aquí van todos.</p>
      ) : null}
      {items.length > 0 ? (
        <p className="muted text-sm">
          {items.some((i) => i.eslavo)
            ? 'Traducción de ATHOS, a partir del original griego y, donde se indica, del eslavo eclesiástico.'
            : 'Traducción de ATHOS, a partir del original griego.'}{' '}
          No procede de un libro litúrgico español publicado.
        </p>
      ) : null}
    </div>
  );
}
