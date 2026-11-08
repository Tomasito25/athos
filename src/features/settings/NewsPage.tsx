/**
 * Novedades: qué ha cambiado en las últimas versiones.
 *
 * El texto es el del registro de cambios del proyecto, leído al compilar: lo
 * mismo que se escribe al publicar cada versión, sin resumir ni adornar.
 */
import { Fragment } from 'react';
import { PageHead, Section } from '@/components/ui';
import { UpdateStatusPanel } from './UpdateStatusPanel';
import es from '@/locales/es';

/** **negrita** y *cursiva*, que es todo el marcado que usa el registro. */
function conMarcas(texto: string) {
  const partes = texto.split(/(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g);
  return partes.map((parte, i) => {
    if (/^\*\*[^*]+\*\*$/.test(parte)) return <strong key={i}>{parte.slice(2, -2)}</strong>;
    if (/^\*[^*]+\*$/.test(parte)) return <em key={i}>{parte.slice(1, -1)}</em>;
    if (/^`[^`]+`$/.test(parte)) return <code key={i}>{parte.slice(1, -1)}</code>;
    return <Fragment key={i}>{parte}</Fragment>;
  });
}

export function NewsPage() {
  const entradas = __CHANGELOG__;

  return (
    <div className="page page--reading">
      <PageHead title={es.settings.news} subtitle={es.settings.newsSubtitle} />

      <UpdateStatusPanel />

      <Section>
        {entradas.length === 0 ? <p className="muted">{es.settings.newsEmpty}</p> : null}
        {entradas.map((entrada) => (
          <article key={entrada.version} className="news-entry">
            <h2 className="news-entry__version">
              {es.settings.versionShort.replace('{{version}}', entrada.version)}
              {entrada.version === __APP_VERSION__ ? <span className="muted text-sm"> · {es.settings.newsCurrent}</span> : null}
            </h2>
            {entrada.sections.map((seccion) => (
              <div key={seccion.title} className="news-entry__section">
                <h3>{seccion.title}</h3>
                <ul>
                  {seccion.items.map((item, i) => (
                    <li key={i}>{conMarcas(item)}</li>
                  ))}
                </ul>
              </div>
            ))}
          </article>
        ))}
      </Section>
    </div>
  );
}
