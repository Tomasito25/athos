/**
 * El versículo del día, en lo alto de Inicio.
 *
 * La idea es llevarse una frase en la cabeza durante la jornada, así que se
 * pinta como una inscripción y no como un párrafo más: centrada, en la letra
 * de los textos, con la referencia debajo en pequeño. Pinchándola se abre el
 * capítulo entero, porque un versículo suelto casi siempre da ganas de ver
 * qué había alrededor.
 *
 * El texto no está escrito aquí ni en ningún archivo de ATHOS: se lee de la
 * Biblia que la aplicación guarda —Reina-Valera de 1909— por el mismo camino
 * que las lecturas del día. ATHOS pone la referencia; las palabras las pone
 * la Escritura.
 */
import { Link } from 'react-router-dom';
import { useMemo } from 'react';
import { useAsync } from '@/hooks/useAsync';
import { getChapter } from '@/db/bible';
import { chaptersOf, inPericope, parsePassage } from '@/lib/pericope';
import { verseReferenceFor } from '@/content/verse-of-day';
import { Skeleton } from '@/components/ui';
import es from '@/locales/es';

export function VerseOfDay() {
  // La fecha se calcula una vez: si no, cada render daría un objeto nuevo y
  // la carga se repetiría sin motivo.
  const referencia = useMemo(() => verseReferenceFor(new Date()), []);
  const pericopas = useMemo(() => parsePassage(referencia), [referencia]);

  const versiculos = useAsync(async () => {
    if (!pericopas?.length) return null;
    const p = pericopas[0]!;
    const capitulos = await Promise.all(
      chaptersOf(p.ranges).map((capitulo) => getChapter(p.bookId, capitulo)),
    );
    return {
      pericopa: p,
      lista: capitulos
        .flat()
        .filter((v) => inPericope(p.ranges, v.chapter, v.verse))
        .sort((a, b) => a.chapter - b.chapter || a.verse - b.verse),
    };
  }, [referencia]);

  if (versiculos.loading) {
    return (
      <div className="verse-day" aria-hidden="true">
        <Skeleton lines={2} />
      </div>
    );
  }

  // Sin conexión y sin ese libro todavía guardado no hay versículo. No se
  // avisa de nada: la portada tiene más cosas que decir, y un error aquí
  // sería un mal comienzo de mañana.
  const datos = versiculos.data;
  if (!datos || !datos.lista.length) return null;

  const { pericopa, lista } = datos;
  const primero = lista[0]!;
  const ultimo = lista[lista.length - 1]!;
  const cita =
    lista.length === 1
      ? `${pericopa.bookName} ${primero.chapter}, ${primero.verse}`
      : `${pericopa.bookName} ${primero.chapter}, ${primero.verse}-${ultimo.verse}`;

  return (
    <section className="verse-day" aria-labelledby="versiculo-del-dia">
      <h2 id="versiculo-del-dia" className="eyebrow verse-day__label">
        {es.home.verseOfDay}
      </h2>

      <Link
        to={`/leer/biblia/${pericopa.bookId}/${primero.chapter}#v${primero.verse}`}
        className="verse-day__link"
      >
        <p className="verse-day__text">
          {lista.map((v) => v.text).join(' ')}
        </p>
        <p className="verse-day__ref">{cita}</p>
      </Link>
    </section>
  );
}
