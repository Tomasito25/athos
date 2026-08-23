import { Link } from 'react-router-dom';
import { Panel, Section } from '@/components/ui';
import { OrthodoxCross } from '@/components/icons';
import es from '@/locales/es';

const PRINCIPLES = [
  ['Sin cuenta', 'ATHOS no pide registro ni identificación. No hay servidor que sepa quién eres.'],
  ['Sin rastreo', 'No hay analítica, ni cookies de terceros, ni identificadores publicitarios.'],
  ['Sin publicidad', 'Nunca.'],
  ['Sin red', 'Salvo la descarga inicial de los textos, ATHOS no hace peticiones a ningún servidor.'],
  ['Tuyo', 'El diario, las reglas, los hábitos y las notas viven en tu dispositivo y puedes exportarlos cuando quieras.'],
];

export function AboutPage() {
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

      <Section title="Qué es">
        <div className="prose book-surface">
          <p>
            ATHOS reúne en una sola aplicación lo que un cristiano ortodoxo necesita a diario:
            el libro de oración, la Escritura, el Salterio, el calendario litúrgico con sus santos y
            sus ayunos, la biblioteca de los oficios y de los Padres, y un lugar propio donde
            anotar la propia vida.
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
            El código se publica bajo AGPL-3.0-or-later. Las aportaciones —traducciones, textos con
            licencia comprobada, correcciones del calendario— son bienvenidas. El contenido
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
