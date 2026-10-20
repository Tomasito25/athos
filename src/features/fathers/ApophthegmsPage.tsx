/**
 * Los apotegmas de los Padres del desierto.
 *
 * Arriba, el de hoy, que es el mismo de la portada y del aviso de la mañana.
 * Debajo, todos, por temas: el aviso y la portada llevan aquí, al dicho
 * concreto, y desde aquí se sigue leyendo.
 */
import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { PageHead, Section, SourceNote } from '@/components/ui';
import { IconShare } from '@/components/icons';
import {
  APOPHTHEGMS,
  APOPHTHEGMS_META,
  APOPHTHEGM_THEMES,
  apophthegmFor,
  type Apophthegm,
  type ApophthegmTheme,
} from '@/content/apotegmas';
import { useHashScroll } from '@/hooks/useHashScroll';
import { shareText } from '@/lib/lectura';
import { useUi } from '@/stores/ui';
import es from '@/locales/es';

function Dicho({ dicho, hoy }: { dicho: Apophthegm; hoy: boolean }) {
  const toast = useUi((s) => s.toast);
  return (
    <article id={dicho.id} className={hoy ? 'apotegma apotegma--hoy' : 'apotegma'}>
      {hoy ? <p className="eyebrow apotegma__hoy">{es.home.apophthegmOfDay}</p> : null}
      <p className="apotegma__texto">{dicho.text}</p>
      <p className="apotegma__autor">
        {dicho.saintId ? <Link to={`/calendario/santos/${dicho.saintId}`}>{dicho.abba}</Link> : dicho.abba}
        {dicho.ref ? <span className="muted"> · {dicho.ref}</span> : null}
        <button
          type="button"
          className="icon-btn apotegma__compartir"
          aria-label={`${es.reader.share}: ${dicho.abba}`}
          title={es.reader.share}
          onClick={async () => {
            const url = new URL(
              `${import.meta.env.BASE_URL}biblioteca/apotegmas#${dicho.id}`,
              window.location.href,
            ).href;
            if ((await shareText(dicho.abba, dicho.text, url)) === 'copied') toast(es.reader.copied);
          }}
        >
          <IconShare size={16} />
        </button>
      </p>
    </article>
  );
}

export function ApophthegmsPage() {
  const deHoy = useMemo(() => apophthegmFor(new Date()), []);
  useHashScroll([]);
  // El de hoy va arriba y no se repite en su tema: un ancla sólo puede estar una vez.
  const temas = (Object.keys(APOPHTHEGM_THEMES) as ApophthegmTheme[]).filter((t) =>
    APOPHTHEGMS.some((a) => a.theme === t && a.id !== deHoy.id),
  );

  return (
    <div className="page page--reading">
      <PageHead eyebrow={es.nav.library} title={es.apophthegms.title} subtitle={es.apophthegms.subtitle} />

      <p className="section-lead">{es.apophthegms.intro}</p>
      <p className="muted text-sm">
        {es.apophthegms.daily} <Link to="/configuracion/notificaciones">{es.apophthegms.notify}</Link>
      </p>

      <Dicho dicho={deHoy} hoy />

      {temas.map((tema) => (
        <Section key={tema} title={APOPHTHEGM_THEMES[tema]} id={`tema-${tema}`}>
          <div className="apotegmas">
            {APOPHTHEGMS.filter((a) => a.theme === tema && a.id !== deHoy.id).map((a) => (
              <Dicho key={a.id} dicho={a} hoy={false} />
            ))}
          </div>
        </Section>
      ))}

      <SourceNote meta={APOPHTHEGMS_META} status="complete" />
    </div>
  );
}
