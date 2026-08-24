/**
 * El texto exacto de una perícopa.
 *
 * Antes ATHOS mostraba el capítulo entero y avisaba de cuál era el pasaje;
 * ahora muestra justo los versículos que se leen. Si la referencia es compuesta
 * y no se entiende, se cae de vuelta al capítulo, que es preferible a recortar
 * mal la palabra de Dios.
 */
import { useAsync } from '@/hooks/useAsync';
import { getChapter } from '@/db/bible';
import { chaptersOf, inPericope, parsePericope } from '@/lib/pericope';
import { Loading, Notice } from '@/components/ui';
import { RV1909 } from '@/content/bible';
import type { BibleVerse } from '@/types';

export function PericopeText({
  reference,
  compact = false,
  maxVerses,
}: {
  reference: string;
  /** En Inicio se muestran sólo los primeros versículos. */
  compact?: boolean;
  maxVerses?: number;
}) {
  const pericopa = parsePericope(reference);

  const versiculos = useAsync(async (): Promise<BibleVerse[] | null> => {
    if (!pericopa) return null;
    const capitulos = chaptersOf(pericopa.ranges);
    const cargados = await Promise.all(
      capitulos.map((capitulo) => getChapter(pericopa.bookId, capitulo)),
    );
    return cargados
      .flat()
      .filter((v) => inPericope(pericopa.ranges, v.chapter, v.verse))
      .sort((a, b) => a.chapter - b.chapter || a.verse - b.verse);
  }, [reference]);

  if (!pericopa) {
    return (
      <Notice variant="pending">
        Esta referencia no se puede recortar automáticamente. Búscala en la Biblia: {reference}
      </Notice>
    );
  }

  if (versiculos.loading) return <Loading />;

  if (versiculos.error || !versiculos.data?.length) {
    return (
      <Notice variant="warn">
        No se ha podido cargar el pasaje. Si es la primera vez que abres este libro hace falta
        conexión; después queda disponible sin ella.
      </Notice>
    );
  }

  const lista = maxVerses ? versiculos.data.slice(0, maxVerses) : versiculos.data;
  const recortado = maxVerses ? versiculos.data.length > maxVerses : false;
  // Cuando la perícopa salta de capítulo conviene señalarlo.
  const variosCapitulos = new Set(lista.map((v) => v.chapter)).size > 1;

  return (
    <div className={`prose book-surface${compact ? ' prose--compact' : ''}`}>
      {lista.map((verso, indice) => {
        const nuevoCapitulo = variosCapitulos && (indice === 0 || lista[indice - 1].chapter !== verso.chapter);
        return (
          <p key={verso.id}>
            {nuevoCapitulo ? <span className="chapter-mark">{verso.chapter}</span> : null}
            <span className="verse-num">{verso.verse}</span>
            {verso.text}
          </p>
        );
      })}
      {recortado ? <p className="muted text-sm">…</p> : null}
      {!compact ? (
        <p className="source-note" style={{ marginTop: 'var(--sp-4)' }}>
          {pericopa.bookName} · {RV1909.name}
        </p>
      ) : null}
    </div>
  );
}
