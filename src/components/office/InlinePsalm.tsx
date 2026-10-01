/**
 * Un salmo entero dentro de un oficio.
 *
 * Antes, cada Hora decía «Salmo 5 — está en Leer → Salterio» y había que irse
 * a otra pantalla a mitad de la oración. Ahora el salmo se lee aquí mismo,
 * tomado del Salterio de ATHOS —la misma traducción y la misma numeración de
 * los Setenta—, y se puede plegar si uno se lo sabe.
 */
import { Link } from 'react-router-dom';
import { useAsync } from '@/hooks/useAsync';
import { getPsalm } from '@/db/psalter';
import { PSALM_NOTES } from '@/content/psalter';

export default function InlinePsalm({ n }: { n: number }) {
  const psalm = useAsync(() => getPsalm(n), [n]);
  const verses = psalm.data?.blocks.filter((b) => b.kind === 'verse') ?? [];

  return (
    <details className="inline-psalm" open>
      <summary className="inline-psalm__head">
        <span className="inline-psalm__title">Salmo {n}</span>
        {PSALM_NOTES[n] ? <span className="inline-psalm__note">{PSALM_NOTES[n]}</span> : null}
      </summary>

      {psalm.loading ? (
        <p className="muted text-sm">Cargando el salmo…</p>
      ) : verses.length ? (
        <div className="inline-psalm__body">
          {verses.map((v, i) => (
            <p key={`${v.ref}-${i}`}>
              {v.ref ? <span className="verse-num">{v.ref}</span> : null}
              {v.content}
            </p>
          ))}
        </div>
      ) : (
        <p className="muted text-sm">
          No se ha podido cargar el texto. Está en <Link to={`/leer/salterio/${n}`}>Salterio → Salmo {n}</Link>.
        </p>
      )}

      <p className="inline-psalm__foot">
        <Link to={`/leer/salterio/${n}`}>Abrir el salmo {n} aparte</Link>
      </p>
    </details>
  );
}
