/**
 * El glosario entero, buscable.
 *
 * Las lecciones enseñan las palabras que usan, pero hace falta además un
 * sitio donde mirar una palabra suelta: la que se oyó en la iglesia el
 * domingo y nadie explicó.
 */
import { useMemo, useState } from 'react';
import { GLOSSARY, GLOSSARY_NOTE } from '@/content/glossary';
import { Empty, PageHead } from '@/components/ui';
import { useVisitLog } from '@/hooks/useVisitLog';
import { normalize, tokenize } from '@/lib/text';
import es from '@/locales/es';

export function GlossaryPage() {
  const [busca, setBusca] = useState('');
  useVisitLog({ path: '/biblioteca/glosario', title: es.study.glossary, kind: es.nav.library });

  const filtrado = useMemo(() => {
    const palabras = tokenize(busca);
    if (!palabras.length) return GLOSSARY;
    /*
     * Se busca también dentro de la definición, y por palabras sueltas, no
     * por la frase entera: quien no sabe cómo se llama algo lo busca por lo
     * que es —«pan que se reparte»—, y esa frase no está escrita así en
     * ningún sitio. Basta con que aparezcan todas las palabras.
     */
    return GLOSSARY.filter((t) => {
      const heno = normalize(
        `${t.term} ${t.aliases?.join(' ') ?? ''} ${t.short} ${t.long ?? ''}`,
      );
      return palabras.every((palabra) => heno.includes(palabra));
    });
  }, [busca]);

  return (
    <div className="page page--reading">
      <PageHead
        eyebrow={es.nav.library}
        title={es.study.glossary}
        subtitle={es.study.glossarySubtitle}
      />

      <input
        type="search"
        className="input"
        placeholder={`Buscar entre ${GLOSSARY.length} palabras…`}
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
        aria-label="Buscar una palabra"
        style={{ marginBottom: 'var(--sp-5)' }}
      />

      {filtrado.length === 0 ? (
        <Empty title={`Ninguna palabra coincide con «${busca.trim()}»`} />
      ) : (
        <dl className="terminos__lista">
          {filtrado.map((t) => (
            <div key={t.id} className="terminos__entrada" id={t.id}>
              <dt>
                {t.term}
                {t.aliases?.length ? (
                  <span className="terminos__alias">{t.aliases.join(' · ')}</span>
                ) : null}
              </dt>
              <dd>
                {t.short}
                {t.long ? <span className="terminos__mas">{t.long}</span> : null}
              </dd>
            </div>
          ))}
        </dl>
      )}

      <p className="source-note" style={{ marginTop: 'var(--sp-6)' }}>{GLOSSARY_NOTE}</p>
    </div>
  );
}
