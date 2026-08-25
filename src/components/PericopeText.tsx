/**
 * El texto exacto de una perícopa.
 *
 * Antes ATHOS mostraba el capítulo entero y avisaba de cuál era el pasaje;
 * ahora muestra justo los versículos que se leen. Una referencia puede abarcar
 * más de un libro —«1 Corintios 5, 6-8; Gálatas 3, 13-14»—, y entonces se
 * muestran los dos, cada uno con su encabezado.
 *
 * Si la referencia es compuesta y no se entiende, se dice y se remite a la
 * Biblia: es preferible a recortar mal la palabra de Dios.
 */
import { useAsync } from '@/hooks/useAsync';
import { getChapter } from '@/db/bible';
import { chaptersOf, inPericope, parsePassage, type Pericope } from '@/lib/pericope';
import { Loading, Notice } from '@/components/ui';
import { RV1909 } from '@/content/bible';
import type { BibleVerse } from '@/types';

async function versiculosDe(pericopa: Pericope): Promise<BibleVerse[]> {
  const capitulos = chaptersOf(pericopa.ranges);
  const cargados = await Promise.all(
    capitulos.map((capitulo) => getChapter(pericopa.bookId, capitulo)),
  );
  return cargados
    .flat()
    .filter((v) => inPericope(pericopa.ranges, v.chapter, v.verse))
    .sort((a, b) => a.chapter - b.chapter || a.verse - b.verse);
}

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
  const pericopas = parsePassage(reference);

  const cargadas = useAsync(async () => {
    if (!pericopas) return null;
    return Promise.all(
      pericopas.map(async (p) => ({ pericopa: p, versiculos: await versiculosDe(p) })),
    );
  }, [reference]);

  if (!pericopas) {
    return (
      <Notice variant="pending">
        Esta referencia no se puede recortar automáticamente. Búscala en la Biblia: {reference}
      </Notice>
    );
  }

  if (cargadas.loading) return <Loading />;

  if (cargadas.error || !cargadas.data?.some((t) => t.versiculos.length)) {
    return (
      <Notice variant="warn">
        No se ha podido cargar el pasaje. Si es la primera vez que abres este libro hace falta
        conexión; después queda disponible sin ella.
      </Notice>
    );
  }

  // El recorte de Inicio se reparte entre los libros por orden: se calcula
  // antes de pintar, no mientras se pinta.
  const total = cargadas.data.reduce((n, t) => n + t.versiculos.length, 0);
  const variosLibros = cargadas.data.length > 1;
  const bloques: Array<{ pericopa: Pericope; lista: BibleVerse[] }> = [];
  let restantes = maxVerses ?? Infinity;
  for (const { pericopa, versiculos } of cargadas.data) {
    const lista = versiculos.slice(0, Math.max(0, restantes));
    restantes -= lista.length;
    if (lista.length) bloques.push({ pericopa, lista });
  }

  return (
    <div className={`prose book-surface${compact ? ' prose--compact' : ''}`}>
      {bloques.map(({ pericopa, lista }) => {
        const variosCapitulos = new Set(lista.map((v) => v.chapter)).size > 1;
        return (
          <div key={pericopa.bookId}>
            {variosLibros ? <p className="passage-book">{pericopa.bookName}</p> : null}
            {lista.map((verso, indice) => {
              const nuevoCapitulo =
                variosCapitulos && (indice === 0 || lista[indice - 1].chapter !== verso.chapter);
              return (
                <p key={verso.id}>
                  {nuevoCapitulo ? <span className="chapter-mark">{verso.chapter}</span> : null}
                  <span className="verse-num">{verso.verse}</span>
                  {verso.text}
                </p>
              );
            })}
          </div>
        );
      })}
      {maxVerses && total > maxVerses ? <p className="muted text-sm">…</p> : null}
      {!compact ? (
        <p className="source-note" style={{ marginTop: 'var(--sp-4)' }}>
          {bloques.map((b) => b.pericopa.bookName).join(' · ')} · {RV1909.name}
        </p>
      ) : null}
    </div>
  );
}
