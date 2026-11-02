/**
 * El apotegma del día, al lado del versículo.
 *
 * Un dicho de los Padres del desierto, con quien lo dijo debajo. Se pinta como
 * el versículo, para que los dos se lean como una pareja: la Escritura y la
 * palabra de los que la vivieron. Pinchándolo se abren todos los apotegmas,
 * con el de hoy señalado.
 *
 * A diferencia del versículo, el texto va en el código: es una traducción de
 * ATHOS, no se lee de la Biblia guardada, y por eso sale siempre, también sin
 * conexión.
 */
import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { apophthegmFor } from '@/content/apotegmas';
import { IconShare } from '@/components/icons';
import { absoluteUrl, useShare } from '@/hooks/useShare';
import es from '@/locales/es';

export function ApophthegmOfDay({ prominent = false }: { prominent?: boolean }) {
  const compartir = useShare();
  const dicho = useMemo(() => apophthegmFor(new Date()), []);
  const ruta = `/biblioteca/apotegmas#${dicho.id}`;
  // Un suceso de cinco líneas centrado se lee mal: los largos van alineados a
  // la izquierda, como un párrafo; las frases breves, como el versículo.
  const clases = ['verse-day', prominent ? 'verse-day--hero' : '', 'verse-day--apotegma', dicho.text.length > 180 ? 'verse-day--largo' : '']
    .filter(Boolean)
    .join(' ');

  return (
    <section className={clases} aria-labelledby="apotegma-del-dia">
      <h2 id="apotegma-del-dia" className="eyebrow verse-day__label">
        {es.home.apophthegmOfDay}
      </h2>
      {prominent ? (
        <span className="verse-day__mark" aria-hidden="true">
          ✣
        </span>
      ) : null}

      <Link to={ruta} className="verse-day__link">
        <p className="verse-day__text">{dicho.text}</p>
        <p className="verse-day__ref">{dicho.abba}</p>
        {prominent ? <p className="verse-day__more">{es.home.apophthegmMore}</p> : null}
      </Link>
      <button
        type="button"
        className="icon-btn verse-day__share"
        aria-label={`${es.reader.share}: ${es.home.apophthegmOfDay.toLowerCase()}`}
        title={es.reader.share}
        onClick={() => void compartir(dicho.abba, dicho.text, absoluteUrl(ruta))}
      >
        <IconShare size={18} />
      </button>
    </section>
  );
}
