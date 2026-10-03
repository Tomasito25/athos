/**
 * Una lectura de la Escritura dentro de un oficio.
 *
 * Como el salmo: el texto no se copia en el oficio, se toma de la Biblia de
 * ATHOS —la Reina-Valera 1909, o la Biblia libre para los deuterocanónicos—,
 * de modo que es el mismo que se lee en Leer → Biblia y se puede plegar.
 */
import { PericopeText } from '@/components/PericopeText';

export default function InlineReading({ reference }: { reference: string }) {
  return (
    <details className="inline-psalm inline-reading" open>
      <summary className="inline-psalm__head">
        <span className="inline-psalm__title">{reference}</span>
      </summary>
      <div className="inline-psalm__body">
        <PericopeText reference={reference} />
      </div>
    </details>
  );
}
