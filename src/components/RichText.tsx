/**
 * Prosa con los nombres enlazados.
 *
 * Un párrafo de la historia o del catecismo nombra santos, Padres, concilios y
 * monasterios que tienen su ficha dentro de ATHOS. Esto los convierte en
 * enlaces sin tocar el texto de origen: el contenido sigue siendo una cadena
 * limpia, y quien la escribe no tiene que acordarse de marcar nada.
 *
 * No se usa —nunca— sobre texto litúrgico. Una oración, un tropario o un
 * canon se muestran tal cual: la regla es la misma que impide inventarlos.
 */
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { linkify } from '@/content/links';

export function RichText({
  children,
  max,
}: {
  children: string;
  /** Cuántos enlaces como mucho. Por defecto, los que decida `linkify`. */
  max?: number;
}) {
  const { pathname } = useLocation();
  const trozos = linkify(children, { omitir: pathname, maximo: max });

  return (
    <>
      {trozos.map((trozo, i) =>
        trozo.path ? (
          <Link key={`${trozo.path}-${i}`} to={trozo.path} className="in-text">
            {trozo.text}
          </Link>
        ) : (
          <span key={i}>{trozo.text}</span>
        ),
      )}
    </>
  );
}

/** Varios párrafos seguidos, cada uno con sus enlaces. */
export function RichParagraphs({
  paragraphs,
  className,
  max,
}: {
  paragraphs: string[];
  className?: string;
  max?: number;
}) {
  return (
    <>
      {paragraphs.map((parrafo, i) => (
        <p key={i} className={className}>
          <RichText max={max}>{parrafo}</RichText>
        </p>
      ))}
    </>
  );
}
