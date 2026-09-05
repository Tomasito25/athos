/**
 * Las palabras de una lección, explicadas.
 *
 * ATHOS escribe sobre una tradición con vocabulario propio: theotokos,
 * autocéfala, hesicasmo, anáfora. Quien lo conoce, lee de corrido; quien no,
 * se queda fuera sin poder ni preguntar, porque no sabe qué preguntar.
 *
 * Los términos no se apuntan a mano lección por lección —eso se descuelga a
 * la primera reescritura—: se buscan en el texto. Cada lección enseña
 * exactamente las palabras que usa.
 *
 * Van plegados. Abiertos siempre, un párrafo de seis líneas quedaría seguido
 * de doce de diccionario, y el que ya sabe leería el doble para nada.
 */
import { termsIn } from '@/content/glossary';
import es from '@/locales/es';

export function LessonTerms({ text, open = false }: { text: string; open?: boolean }) {
  const terminos = termsIn(text);
  if (!terminos.length) return null;

  return (
    <details className="terminos" open={open}>
      <summary className="terminos__resumen">
        {es.study.terms.replace('{{count}}', String(terminos.length))}
      </summary>
      <dl className="terminos__lista">
        {terminos.map((t) => (
          <div key={t.id} className="terminos__entrada">
            <dt>{t.term}</dt>
            <dd>
              {t.short}
              {t.long ? <span className="terminos__mas">{t.long}</span> : null}
            </dd>
          </div>
        ))}
      </dl>
    </details>
  );
}
