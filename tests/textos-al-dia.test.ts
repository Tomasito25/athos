/**
 * Lo que ATHOS dice de sí misma tiene que ser verdad.
 *
 * «Acerca de» hablaba del diario y los hábitos, que se retiraron, y decía que
 * ATHOS no hace peticiones a ningún servidor. NOTICE daba por pendientes los
 * deuterocanónicos, que llevan semanas incorporados. El README contaba
 * treinta y un momentos y una Biblia sólo en Reina-Valera. Y el selector de
 * idioma prometía siete idiomas que no se podían usar.
 */
import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { MOMENT_GROUPS } from '@/content/moments';
import { PRIVACY_SECTIONS } from '@/content/privacidad';

const leer = (ruta: string) => readFileSync(resolve(process.cwd(), ruta), 'utf-8');

describe('Acerca de', () => {
  const about = leer('src/features/settings/AboutPage.tsx');

  it('no habla de lo que se retiró', () => {
    const principios = about.slice(about.indexOf('const PRINCIPLES'), about.indexOf('export function'));
    expect(principios).not.toMatch(/diario|hábitos/i);
  });

  it('no promete que ATHOS no hace ninguna petición', () => {
    expect(about).not.toMatch(/no hace peticiones a ningún servidor/);
    // Y dice cuáles hace.
    expect(about).toMatch(/cada hora/);
  });

  it('enlaza al repositorio, a los errores y a la privacidad', () => {
    expect(about).toContain('REPO_URL');
    expect(about).toContain('reportIssueUrl');
    expect(about).toContain('/configuracion/privacidad');
  });
});

describe('README', () => {
  const readme = leer('README.md');
  const numeros: Record<number, string> = { 31: 'treinta y un', 32: 'treinta y dos', 33: 'treinta y tres', 34: 'treinta y cuatro' };

  it('cuenta los momentos que hay', () => {
    const total = MOMENT_GROUPS.reduce((n, g) => n + g.moments.length, 0);
    expect(readme.toLowerCase()).toContain(`${numeros[total]} momentos`);
  });

  it('dice de dónde sale la Biblia, griego incluido', () => {
    expect(readme).not.toMatch(/La Biblia completa\*\* en Reina-Valera/);
    for (const texto of ['Reina-Valera', 'Biblia libre para el mundo', 'Brenton', '1904', 'griego']) {
      expect(readme, texto).toContain(texto);
    }
  });

  it('no dice que traducir sea copiar un archivo', () => {
    expect(readme).not.toMatch(/Traducir consiste en copiar/);
  });
});

describe('NOTICE', () => {
  const notice = leer('NOTICE.md');

  it('nombra los cuatro textos bíblicos', () => {
    for (const texto of ['Reina-Valera 1909', 'Biblia libre para el mundo', 'Brenton', '1904']) {
      expect(notice, texto).toContain(texto);
    }
  });

  it('no da por pendientes los deuterocanónicos', () => {
    expect(notice).not.toMatch(/deuterocanónicos[\s\S]{0,120}pendiente de incorporar/);
  });

  it('no afirma una procedencia que no se ha comprobado', () => {
    expect(notice).not.toMatch(/en la versión española de uso corriente en las parroquias/);
    expect(notice).toContain('docs/PROCEDENCIA.md');
  });
});

describe('antes de publicar', () => {
  it('las cifras de la procedencia son las de la tabla generada', () => {
    const tabla = leer('docs/PROCEDENCIA.md');
    const guia = leer('docs/ANTES-DE-PUBLICAR.md');
    const cuenta = (clase: string) => tabla.match(new RegExp(`\\| ${clase} \\| (\\d+) \\|`))?.[1];
    expect(guia).toContain(`lista los ${tabla.match(/\*\*Total\*\* \| \*\*(\d+)\*\*/)?.[1]} textos`);
    expect(guia).toContain(`Traducción de ATHOS (${cuenta('Traducción de ATHOS')})`);
    expect(guia).toContain(`Tradicional sin verificar** (${cuenta('\\*\\*Tradicional sin verificar\\*\\*')})`);
    expect(guia).toContain(`Redactada para ATHOS (${cuenta('Redactada para ATHOS')})`);
    expect(guia).toContain(`Dominio público (${cuenta('Dominio público')})`);
  });
});

describe('idiomas', () => {
  it('no se ofrece un selector de idiomas que no funcionan', () => {
    expect(leer('src/features/settings/SettingsPage.tsx')).not.toMatch(/pendiente de traducir|SUPPORTED_LANGUAGES/);
  });

  it('no se carga una librería de traducción que nadie usa', () => {
    const pkg = JSON.parse(leer('package.json')) as { dependencies: Record<string, string> };
    expect(Object.keys(pkg.dependencies)).not.toContain('i18next');
    expect(Object.keys(pkg.dependencies)).not.toContain('react-i18next');
  });
});

describe('privacidad', () => {
  it('cuenta las peticiones que hace ATHOS y dónde viven los datos', () => {
    const todo = PRIVACY_SECTIONS.flatMap((s) => s.paragraphs).join(' ');
    expect(todo).toMatch(/versión nueva/);
    expect(todo).toMatch(/IndexedDB/);
    expect(todo).toMatch(/GitHub/);
  });
});
