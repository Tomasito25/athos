/**
 * La política de privacidad, dentro de la aplicación.
 *
 * El mismo texto se publica en `privacidad.html`, con dirección fija; aquí se
 * lee sin salir de ATHOS, que en un iPhone con la aplicación instalada es la
 * única forma de poder volver.
 */
import { PageHead, Section } from '@/components/ui';
import { PRIVACY_INTRO, PRIVACY_SECTIONS, PRIVACY_UPDATED } from '@/content/privacidad';
import { CONTACT_EMAIL, ISSUES_URL, privacyPageUrl } from '@/lib/site';
import { formatLongDate } from '@/lib/format';
import es from '@/locales/es';

/** Los enlaces que aparecen en el texto, tocables. */
function ConEnlaces({ texto }: { texto: string }) {
  const partes = texto.split(/(https:\/\/[^\s)]+)/g);
  return (
    <>
      {partes.map((parte, i) =>
        parte.startsWith('https://') ? (
          <a key={i} href={parte} target="_blank" rel="noreferrer noopener">
            {parte}
          </a>
        ) : (
          parte
        ),
      )}
    </>
  );
}

export function PrivacyPage() {
  const fija = new URL(privacyPageUrl(), window.location.href).href;
  return (
    <article className="page page--reading">
      <PageHead
        title={es.about.privacyTitle}
        subtitle={es.about.privacyUpdated.replace('{{date}}', formatLongDate(PRIVACY_UPDATED))}
      />
      <div className="prose">
        <p>{PRIVACY_INTRO}</p>
      </div>
      {PRIVACY_SECTIONS.map((seccion) => (
        <Section key={seccion.title} title={seccion.title}>
          <div className="prose">
            {seccion.paragraphs.map((p) => (
              <p key={p}>
                <ConEnlaces texto={p} />
              </p>
            ))}
          </div>
        </Section>
      ))}
      <Section title={es.about.contact}>
        <div className="prose">
          {CONTACT_EMAIL ? (
            <p>
              {es.about.email}: <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
            </p>
          ) : null}
          <p>
            <a href={ISSUES_URL} target="_blank" rel="noreferrer noopener">
              {ISSUES_URL}
            </a>
          </p>
          <p className="muted text-sm">
            {es.about.privacyFixedUrl}{' '}
            <a href={fija} target="_blank" rel="noreferrer noopener">
              {fija}
            </a>
          </p>
        </div>
      </Section>
    </article>
  );
}
