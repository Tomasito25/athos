/**
 * Las últimas entradas del registro de cambios, para la pantalla de novedades.
 *
 * Se leen de CHANGELOG.md al compilar y entran en la aplicación como dato: así
 * quien acaba de actualizar ve qué ha cambiado sin que ATHOS tenga que pedir
 * nada a ningún servidor. Sólo entran las últimas versiones; el registro
 * entero pesa setenta y tantos kilobytes y no hace falta en el teléfono.
 */
import { readFileSync } from 'node:fs';

export interface ChangelogSection {
  title: string;
  items: string[];
}

export interface ChangelogEntry {
  version: string;
  sections: ChangelogSection[];
}

export function recentChangelog(path: string | URL, versions = 4): ChangelogEntry[] {
  let texto: string;
  try {
    texto = readFileSync(path, 'utf-8');
  } catch {
    return [];
  }

  const salida: ChangelogEntry[] = [];
  let entrada: ChangelogEntry | null = null;
  let seccion: ChangelogSection | null = null;

  for (const linea of texto.split('\n')) {
    const version = /^## \[([^\]]+)\]/.exec(linea);
    if (version) {
      if (salida.length >= versions) break;
      entrada = { version: version[1]!, sections: [] };
      salida.push(entrada);
      seccion = null;
      continue;
    }
    if (!entrada) continue;

    const titulo = /^### (.+)/.exec(linea);
    if (titulo) {
      seccion = { title: titulo[1]!.trim(), items: [] };
      entrada.sections.push(seccion);
      continue;
    }
    if (!seccion) continue;

    // Un punto nuevo empieza con «- »; las líneas sangradas lo continúan.
    // Los subpuntos («  - ») se unen al punto del que cuelgan.
    if (/^- /.test(linea)) {
      seccion.items.push(linea.slice(2).trim());
    } else if (/^\s+\S/.test(linea) && seccion.items.length) {
      const resto = linea.trim().replace(/^- /, '· ');
      seccion.items[seccion.items.length - 1] += ` ${resto}`;
    }
  }

  return salida;
}
