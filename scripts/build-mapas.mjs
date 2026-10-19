/**
 * Las costas de los mapas, generadas una vez a partir de Natural Earth.
 *
 * Natural Earth (https://www.naturalearthdata.com) es de dominio público. De
 * sus tierras y sus lagos se recorta la región de cada mapa, se proyecta, se
 * simplifica y se escribe como trazado SVG en
 * `src/content/generated/mapas.ts`. Ese archivo va en el repositorio: la
 * aplicación no descarga nada, y funciona sin conexión.
 *
 *   npm run build:mapas                     # descarga los datos a una carpeta temporal
 *   node scripts/build-mapas.mjs <carpeta>  # o los toma de ahí
 *
 * La proyección es equirrectangular, con la longitud encogida por el coseno
 * de la latitud media: a esta escala, y tan cerca del ecuador como el
 * Mediterráneo, es indistinguible de una cónica y no deforma lo que importa,
 * que es dónde queda cada sitio respecto de los demás.
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { tmpdir } from 'node:os';

const FUENTE = 'https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson';
const ANCHO = 1000;

/** Cada mapa: su recuadro (oeste, sur, este, norte), la escala de los datos y la tolerancia. */
const MAPAS = {
  mediterraneo: { caja: [8.5, 29, 47.5, 57.8], escala: '50m', tolerancia: 1.2 },
  pablo: { caja: [11.5, 30.3, 37.3, 42.6], escala: '50m', tolerancia: 0.9 },
  'asia-menor': { caja: [25.6, 36.6, 30.4, 41.4], escala: '10m', tolerancia: 0.9 },
  'tierra-santa': { caja: [34.2, 30.95, 36.05, 33.45], escala: '10m', tolerancia: 0.8, rios: true },
};

async function datos(carpeta, nombre) {
  const archivo = join(carpeta, `${nombre}.geojson`);
  if (!existsSync(archivo)) {
    process.stdout.write(`descargando ${nombre}… `);
    const r = await fetch(`${FUENTE}/${nombre}.geojson`);
    if (!r.ok) throw new Error(`${nombre}: ${r.status}`);
    writeFileSync(archivo, Buffer.from(await r.arrayBuffer()));
    console.log('hecho');
  }
  return JSON.parse(readFileSync(archivo, 'utf-8'));
}

/** Los anillos exteriores e interiores de todos los polígonos. */
function anillos(geo) {
  const salida = [];
  for (const f of geo.features) {
    const g = f.geometry;
    if (!g) continue;
    const polis = g.type === 'Polygon' ? [g.coordinates] : g.type === 'MultiPolygon' ? g.coordinates : [];
    for (const p of polis) for (const anillo of p) salida.push(anillo);
  }
  return salida;
}

/** Recorte de Sutherland–Hodgman contra el recuadro. */
function recortar(anillo, [oeste, sur, este, norte]) {
  const bordes = [
    (p) => p[0] >= oeste,
    (p) => p[0] <= este,
    (p) => p[1] >= sur,
    (p) => p[1] <= norte,
  ];
  const corte = [
    (a, b) => [oeste, a[1] + ((b[1] - a[1]) * (oeste - a[0])) / (b[0] - a[0])],
    (a, b) => [este, a[1] + ((b[1] - a[1]) * (este - a[0])) / (b[0] - a[0])],
    (a, b) => [a[0] + ((b[0] - a[0]) * (sur - a[1])) / (b[1] - a[1]), sur],
    (a, b) => [a[0] + ((b[0] - a[0]) * (norte - a[1])) / (b[1] - a[1]), norte],
  ];
  let salida = anillo;
  for (let i = 0; i < 4; i += 1) {
    const entrada = salida;
    salida = [];
    if (!entrada.length) break;
    for (let j = 0; j < entrada.length; j += 1) {
      const actual = entrada[j];
      const previo = entrada[(j + entrada.length - 1) % entrada.length];
      const dentro = bordes[i](actual);
      const previoDentro = bordes[i](previo);
      if (dentro) {
        if (!previoDentro) salida.push(corte[i](previo, actual));
        salida.push(actual);
      } else if (previoDentro) {
        salida.push(corte[i](previo, actual));
      }
    }
  }
  return salida;
}

/** Douglas–Peucker. */
function simplificar(puntos, tolerancia) {
  if (puntos.length < 4) return puntos;
  const t2 = tolerancia * tolerancia;
  const marcados = new Uint8Array(puntos.length);
  marcados[0] = 1;
  marcados[puntos.length - 1] = 1;
  const pila = [[0, puntos.length - 1]];
  while (pila.length) {
    const [a, b] = pila.pop();
    const [ax, ay] = puntos[a];
    const [bx, by] = puntos[b];
    const dx = bx - ax;
    const dy = by - ay;
    const largo = dx * dx + dy * dy;
    let max = 0;
    let indice = -1;
    for (let i = a + 1; i < b; i += 1) {
      const [px, py] = puntos[i];
      let d;
      if (largo === 0) d = (px - ax) ** 2 + (py - ay) ** 2;
      else {
        const t = Math.max(0, Math.min(1, ((px - ax) * dx + (py - ay) * dy) / largo));
        d = (px - ax - t * dx) ** 2 + (py - ay - t * dy) ** 2;
      }
      if (d > max) {
        max = d;
        indice = i;
      }
    }
    if (max > t2 && indice !== -1) {
      marcados[indice] = 1;
      pila.push([a, indice], [indice, b]);
    }
  }
  return puntos.filter((_, i) => marcados[i]);
}

/** Las líneas de los ríos, partidas donde salen del recuadro. */
function lineas(geo) {
  const salida = [];
  for (const f of geo.features) {
    const g = f.geometry;
    if (!g) continue;
    if (g.type === 'LineString') salida.push(g.coordinates);
    if (g.type === 'MultiLineString') salida.push(...g.coordinates);
  }
  return salida;
}

function generar(nombre, { caja, tolerancia }, tierras, lagos, rios = []) {
  const [oeste, sur, este, norte] = caja;
  const cos = Math.cos((((sur + norte) / 2) * Math.PI) / 180);
  const escala = ANCHO / ((este - oeste) * cos);
  const alto = Math.round((norte - sur) * escala);
  const proyectar = ([lon, lat]) => [(lon - oeste) * cos * escala, (norte - lat) * escala];

  const trazado = (lista) =>
    lista
      .map((anillo) => recortar(anillo, caja))
      .filter((a) => a.length >= 3)
      .map((a) => simplificar(a.map(proyectar), tolerancia))
      .filter((a) => a.length >= 3)
      // Las islas de menos de un par de unidades no se ven y engordan el archivo.
      .filter((a) => {
        const xs = a.map((p) => p[0]);
        const ys = a.map((p) => p[1]);
        return Math.max(...xs) - Math.min(...xs) > 2.5 || Math.max(...ys) - Math.min(...ys) > 2.5;
      })
      .map((a) => `M${a.map(([x, y]) => `${Math.round(x)} ${Math.round(y)}`).join('L')}Z`)
      .join('');

  const dentro = ([lon, lat]) => lon >= oeste && lon <= este && lat >= sur && lat <= norte;
  const tramos = [];
  for (const linea of rios) {
    let tramo = [];
    for (const p of linea) {
      if (dentro(p)) tramo.push(p);
      else if (tramo.length) {
        tramos.push(tramo);
        tramo = [];
      }
    }
    if (tramo.length > 1) tramos.push(tramo);
  }
  const rio = tramos
    .map((t) => simplificar(t.map(proyectar), tolerancia))
    .filter((t) => t.length > 1)
    .map((t) => `M${t.map(([x, y]) => `${Math.round(x)} ${Math.round(y)}`).join('L')}`)
    .join('');

  return { caja, cos, escala, ancho: ANCHO, alto, tierra: trazado(tierras), lagos: trazado(lagos), rios: rio };
}

const carpeta = process.argv[2] ? resolve(process.argv[2]) : join(tmpdir(), 'athos-natural-earth');
mkdirSync(carpeta, { recursive: true });

const fuentes = {};
for (const escala of ['50m', '10m']) {
  fuentes[escala] = {
    tierras: anillos(await datos(carpeta, `ne_${escala}_land`)),
    lagos: anillos(await datos(carpeta, `ne_${escala}_lakes`)),
  };
}

const rios = lineas(await datos(carpeta, 'ne_10m_rivers_lake_centerlines'));

const salida = {};
for (const [nombre, def] of Object.entries(MAPAS)) {
  salida[nombre] = generar(nombre, def, fuentes[def.escala].tierras, fuentes[def.escala].lagos, def.rios ? rios : []);
  console.log(
    `${nombre}: ${salida[nombre].ancho}×${salida[nombre].alto}, ${Math.round((salida[nombre].tierra.length + salida[nombre].lagos.length) / 1024)} KB`,
  );
}

const raiz = resolve(import.meta.dirname, '..');
mkdirSync(join(raiz, 'src/content/generated'), { recursive: true });
writeFileSync(
  join(raiz, 'src/content/generated/mapas.ts'),
  `/**
 * Costas y lagos de los mapas, generados por scripts/build-mapas.mjs a partir
 * de Natural Earth (dominio público). No se edita a mano.
 */
export interface MapaBase {
  /** Oeste, sur, este, norte, en grados. */
  caja: [number, number, number, number];
  /** Coseno de la latitud media: cuánto se encoge la longitud. */
  cos: number;
  /** Unidades del dibujo por grado de latitud. */
  escala: number;
  ancho: number;
  alto: number;
  tierra: string;
  lagos: string;
  /** Los ríos, como líneas; sólo en los mapas pequeños. */
  rios: string;
}

export const MAPAS_BASE: Record<${Object.keys(MAPAS)
    .map((k) => `'${k}'`)
    .join(' | ')}, MapaBase> = ${JSON.stringify(salida, null, 2)};
`,
);
console.log('src/content/generated/mapas.ts');
