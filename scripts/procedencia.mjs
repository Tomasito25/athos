/**
 * Inventario de procedencia: de dónde dice venir cada texto español.
 *
 * Genera `docs/PROCEDENCIA.md`, una tabla con cada oración, oficio,
 * akathisto, canon y troparío, la clase de su versión española y el estado de
 * su revisión. Es la lista de trabajo para comprobar, texto por texto, si la
 * versión española es traducción de ATHOS desde el griego o el eslavo o si se
 * tomó de un libro parroquial, que puede tener derechos.
 *
 * La columna «Revisado» no la rellena el script: se lee de
 * `docs/procedencia-revisada.json`, que se escribe a mano a medida que alguien
 * comprueba un texto. Así regenerar la tabla no borra lo ya revisado.
 *
 *   npm run procedencia
 */
import { createServer } from 'vite';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const raiz = resolve(import.meta.dirname, '..');
const server = await createServer({
  root: raiz,
  configFile: false,
  logLevel: 'error',
  resolve: { alias: { '@': resolve(raiz, 'src') } },
  define: {
    __APP_VERSION__: '"procedencia"',
    __BUILD_DATE__: '""',
    __CHANGELOG__: '[]',
    __CONTENT_VERSIONS__: '{}',
    __CONTACT_EMAIL__: '""',
  },
  server: { middlewareMode: true, hmr: false },
  // Sólo se carga el corpus: no hace falta preparar las dependencias del navegador.
  optimizeDeps: { noDiscovery: true, include: [] },
  appType: 'custom',
});

const contenido = await server.ssrLoadModule('/src/content/index.ts');
await server.close();

/** La clase de la versión española, deducida de lo que declara su ficha. */
function clase(meta) {
  const fuente = `${meta.source ?? ''}`.toLowerCase();
  const texto = `${fuente} ${meta.notes ?? ''} ${meta.copyright ?? ''}`.toLowerCase();
  // La traducción se mira antes: sus notas dicen «no una oración escrita para
  // ATHOS», y eso no la hace redactada.
  if (/traducci[oó]n( al español)?( hecha)? para athos/.test(texto)) return 'Traducción de ATHOS';
  if (/(redactad[ao]|compuest[ao]|escrit[ao]) para athos/.test(fuente)) return 'Redactada para ATHOS';
  if (/^texto redactado para athos/.test(`${meta.copyright ?? ''}`.toLowerCase())) return 'Redactada para ATHOS';
  if (meta.license === 'traditional') return '**Tradicional sin verificar**';
  if (meta.license === 'public-domain') return 'Dominio público';
  return meta.license ?? '—';
}

const grupos = [
  ['Oraciones', contenido.PRAYERS, (x) => x.title],
  ['Oficios y Divina Liturgia', contenido.OFFICES, (x) => x.title],
  ['Akathistos', contenido.AKATHISTS, (x) => x.title],
  ['Cánones', contenido.CANONS, (x) => x.title],
];

const revisadoArchivo = resolve(raiz, 'docs/procedencia-revisada.json');
const revisado = existsSync(revisadoArchivo) ? JSON.parse(readFileSync(revisadoArchivo, 'utf-8')) : {};

const celda = (t) => String(t ?? '').replace(/\|/g, '\\|').replace(/\s+/g, ' ').trim();

const resumen = new Map();
const secciones = [];
for (const [nombre, lista, titulo] of grupos) {
  const filas = [];
  for (const item of lista ?? []) {
    if (!item.meta) continue;
    const c = clase(item.meta);
    resumen.set(c, (resumen.get(c) ?? 0) + 1);
    const r = revisado[item.id];
    filas.push(
      `| \`${item.id}\` | ${celda(titulo(item))} | ${c} | ${celda(item.meta.source)} | ${
        r ? `${celda(r.fecha)}: ${celda(r.resultado)}` : 'pendiente'
      } |`,
    );
  }
  secciones.push(
    `## ${nombre} (${filas.length})\n\n| Id | Título | Versión española | Fuente declarada | Revisado |\n| --- | --- | --- | --- | --- |\n${filas.join('\n')}`,
  );
}

const total = [...resumen.values()].reduce((a, b) => a + b, 0);
const salida = `# Procedencia de los textos españoles

> Generado por \`npm run procedencia\`. No editar a mano: lo revisado se anota en
> \`docs/procedencia-revisada.json\` (\`{ "id": { "fecha": "AAAA-MM-DD", "resultado": "…" } }\`).

Cada texto declara en su ficha de dónde viene su versión española. Esta tabla
lo reúne para revisarlo **texto por texto**. Lo urgente son los marcados como
**tradicional sin verificar**: hay que comprobar si coinciden con un libro
parroquial publicado (que puede tener derechos) o si son traducción propia.
Si coinciden con un libro y no hay permiso, se retiran o se vuelven a traducir
del original.

## Resumen

| Versión española | Textos |
| --- | --- |
${[...resumen.entries()].sort((a, b) => b[1] - a[1]).map(([c, n]) => `| ${c} | ${n} |`).join('\n')}
| **Total** | **${total}** |

Revisados: ${Object.keys(revisado).length} de ${total}.

Las vidas de santos, el catecismo, los cursos, la historia y los artículos del
Monte Athos son textos **redactados para ATHOS** (CC BY-SA 4.0) y no están en
esta tabla; su revisión es teológica, no de derechos.

${secciones.join('\n\n')}
`;

mkdirSync(resolve(raiz, 'docs'), { recursive: true });
writeFileSync(resolve(raiz, 'docs/PROCEDENCIA.md'), salida);
console.log(`docs/PROCEDENCIA.md: ${total} textos`);
for (const [c, n] of resumen) console.log(`  ${c.replace(/\*/g, '')}: ${n}`);
