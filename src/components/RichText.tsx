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
import { useSyncExternalStore } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import type { linkify as Linkify } from '@/content/links';

/*
 * El índice de nombres se carga aparte, la primera vez que hace falta.
 *
 * Para saber qué nombres tienen ficha hay que recorrer los Padres, los
 * oficios, los monasterios, los iconos y las épocas de la historia: importarlo
 * de golpe arrastraba todo eso al arranque, aunque la primera pantalla no
 * tuviera un solo párrafo que enlazar. Ahora el texto se pinta enseguida tal
 * cual, y los enlaces aparecen en cuanto el índice está listo.
 */
let enlazar: typeof Linkify | null = null;
let carga: Promise<void> | null = null;
const avisar = new Set<() => void>();

function cargarIndice(): void {
  carga ??= import('@/content/links').then((m) => {
    enlazar = m.linkify;
    for (const aviso of avisar) aviso();
  });
}

function suscribir(aviso: () => void): () => void {
  avisar.add(aviso);
  cargarIndice();
  return () => avisar.delete(aviso);
}

const leer = () => enlazar;

export function RichText({
  children,
  max,
}: {
  children: string;
  /** Cuántos enlaces como mucho. Por defecto, los que decida `linkify`. */
  max?: number;
}) {
  const { pathname } = useLocation();
  const linkify = useSyncExternalStore(suscribir, leer, leer);
  const trozos = linkify ? linkify(children, { omitir: pathname, maximo: max }) : [{ text: children }];

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
