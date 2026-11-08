import { Link, useLocation } from 'react-router-dom';
import { Panel, Section } from '@/components/ui';
import { OrthodoxCross } from '@/components/icons';
import { CONTACT_EMAIL, ISSUES_URL, REPO_URL, reportIssueUrl } from '@/lib/site';
import { UpdateStatusPanel } from './UpdateStatusPanel';
import es from '@/locales/es';

/**
 * Lo que ATHOS promete, dicho de forma que sea verdad.
 *
 * Decía que no pedía nada a ningún servidor, y no era cierto: pregunta cada
 * hora si hay versión nueva y descarga los textos la primera vez que se
 * abren. No envía nada, pero pregunta. Y hablaba del diario y los hábitos,
 * que se retiraron en la versión 3 de la base de datos.
 */
const PRINCIPLES = [
  ['Sin cuenta', 'ATHOS no pide registro ni identificación. No hay servidor que sepa quién eres.'],
  ['Sin rastreo', 'No hay analítica, ni cookies, ni identificadores publicitarios.'],
  ['Sin publicidad', 'Nunca.'],
  [
    'Nada tuyo sale del dispositivo',
    'ATHOS sólo pide al servidor donde está publicada lo que necesita: los textos la primera vez que ' +
      'se abren y, al abrirla y cada hora mientras está abierta, si hay versión nueva. Esas peticiones ' +
      'no llevan nada tuyo.',
  ],
  [
    'Tuyo',
    'Las reglas de oración, los favoritos, las notas y el avance de lectura viven en tu dispositivo y ' +
      'puedes exportarlos cuando quieras. Haz una copia de vez en cuando: si el navegador borra los ' +
      'datos del sitio, es lo único que los recupera.',
  ],
];

export function AboutPage() {
  const { pathname } = useLocation();
  return (
    <div className="page page--reading">
      <div style={{ textAlign: 'center', paddingTop: 'var(--sp-5)' }}>
        <OrthodoxCross size={34} style={{ margin: '0 auto', color: 'var(--gold)' }} />
        <h1 className="display" style={{ fontSize: 'var(--text-2xl)', letterSpacing: 'var(--tracking-widest)', marginTop: 'var(--sp-3)' }}>
          ATHOS
        </h1>
        <p className="muted" style={{ letterSpacing: 'var(--tracking-wide)' }}>{es.app.tagline}</p>
        <p className="muted text-sm" style={{ marginTop: 'var(--sp-2)' }}>
          {es.settings.version.replace('{{version}}', __APP_VERSION__)} · {__BUILD_DATE__}
        </p>
      </div>

      <Section title={es.settings.updates}>
        <UpdateStatusPanel />
        <p className="text-sm" style={{ marginTop: 'var(--sp-3)' }}>
          <Link to="/configuracion/novedades">{es.settings.news}</Link>: {es.settings.newsSubtitle.toLowerCase()}
        </p>
      </Section>

      <Section title="Qué es">
        <div className="prose book-surface">
          <p>
            ATHOS reúne en una sola aplicación lo que un cristiano ortodoxo necesita a diario:
            el libro de oración, la Escritura, el Salterio, el calendario litúrgico con sus santos y
            sus ayunos, la biblioteca de los oficios y de los Padres, y la regla de oración de cada
            uno, con su avance.
          </p>
          <p>
            Está pensada para abrirse cada mañana y cada noche, y para funcionar igual con o sin
            conexión. Se instala desde el navegador y después se comporta como cualquier otra
            aplicación del sistema.
          </p>
        </div>
      </Section>

      <Section title={es.settings.privacy}>
        <div className="stack stack--tight">
          {PRINCIPLES.map(([title, text]) => (
            <Panel key={title} variant="quiet">
              <p className="panel__title">{title}</p>
              <p className="muted text-sm">{text}</p>
            </Panel>
          ))}
        </div>
        <p className="text-sm" style={{ marginTop: 'var(--sp-3)' }}>
          <Link to="/configuracion/privacidad">{es.about.privacyPolicy}</Link>
        </p>
      </Section>

      <Section title={es.about.contact}>
        <Panel variant="quiet">
          <ul className="about-links">
            <li>
              <a href={reportIssueUrl(pathname)} target="_blank" rel="noreferrer noopener">
                {es.about.reportError}
              </a>
              <span className="muted text-sm"> — {es.about.reportErrorHint}</span>
            </li>
            <li>
              <a href={ISSUES_URL} target="_blank" rel="noreferrer noopener">
                {es.about.openIssues}
              </a>
            </li>
            <li>
              <a href={REPO_URL} target="_blank" rel="noreferrer noopener">
                {es.about.sourceCode}
              </a>
            </li>
            {CONTACT_EMAIL ? (
              <li>
                {es.about.email}: <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
              </li>
            ) : null}
          </ul>
        </Panel>
      </Section>

      <Section title="Honestidad sobre el contenido">
        <Panel variant="quiet">
          <p className="text-sm">
            ATHOS no inventa textos litúrgicos. Cuando una oración, un himno o una traducción no
            está disponible con una licencia compatible, la ficha se conserva y el texto se marca
            como pendiente de incorporar. Puedes ver el estado completo del corpus en{' '}
            <Link to="/configuracion/fuentes">{es.settings.sources}</Link>.
          </p>
        </Panel>
      </Section>

      <Section title="Proyecto abierto">
        <Panel variant="quiet">
          <p className="text-sm">
            El código se publica bajo AGPL-3.0-or-later. Las aportaciones —textos con licencia
            comprobada, correcciones del calendario y del ayuno, errores— son bienvenidas. El contenido
            religioso se mantiene separado del código, con su propia procedencia.
          </p>
        </Panel>
      </Section>

      <p className="text-center muted text-sm" style={{ marginTop: 'var(--sp-7)' }}>
        Δόξα τῷ Θεῷ πάντων ἕνεκεν
        <br />
        Gloria a Dios por todas las cosas
      </p>
    </div>
  );
}
