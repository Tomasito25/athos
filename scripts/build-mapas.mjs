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
 *
 * El mapa del Athos va girado: la península corre en diagonal, y puesta en
 * vertical cabe en un teléfono con el doble de detalle. Se recorta entonces
 * en el plano ya girado, y `src/lib/mapa.ts` aplica el mismo giro a cada
 * punto. Una rosa en el dibujo dice dónde queda el norte.
 *
 * Y su costa no sale de Natural Earth, que a esa escala dibuja la península
 * con veinticinco vértices y deja Ouranúpoli en el mar, sino del relieve:
 * SRTM3, el modelo de elevación de la NASA de 2000 (dominio público), con un
 * punto cada tres segundos de arco, unos noventa metros. La costa es la curva
 * de nivel cero y, encima, van tres curvas más que dibujan el monte. Se
 * descarga de la réplica de srtm.kurviger.de, copia de la que publicaba el
 * USGS, o se toma de la misma carpeta que Natural Earth.
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { tmpdir } from 'node:os';
import { inflateRawSync } from 'node:zlib';

const FUENTE = 'https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson';
const ANCHO = 1000;

/** Cada mapa: su recuadro (oeste, sur, este, norte), la escala de los datos y la tolerancia. */
const MAPAS = {
  mediterraneo: { caja: [8.5, 29, 47.5, 57.8], escala: '50m', tolerancia: 1.2 },
  pablo: { caja: [11.5, 30.3, 37.3, 42.6], escala: '50m', tolerancia: 0.9 },
  'asia-menor': { caja: [25.6, 36.6, 30.4, 41.4], escala: '10m', tolerancia: 0.9 },
  'tierra-santa': { caja: [34.2, 30.95, 36.05, 33.45], escala: '10m', tolerancia: 0.8, rios: true },
  // Del Sinaí a las Solovkí: los grandes monasterios de fuera del Athos.
  ortodoxia: { caja: [12, 27.5, 46, 66.5], escala: '50m', tolerancia: 1.7 },
};

/**
 * Los mapas girados: el centro (longitud, latitud), el giro en grados en el
 * sentido de las agujas del reloj y el tamaño del rectángulo, en kilómetros.
 */
const GIRADOS = {
  athos: {
    centro: [24.2008, 40.2496],
    giro: 46.5,
    km: [25, 46],
    tolerancia: 1.4,
    // La zona que se lee del relieve, en grados, y las curvas de nivel.
    srtm: { teselas: ['N40E023', 'N40E024'], caja: [23.8, 40.0, 24.5, 40.5], niveles: [400, 900, 1500] },
  },
};

const SRTM = 'https://srtm.kurviger.de/SRTM3/Eurasia';

/** Kilómetros por grado de latitud, a la latitud de Grecia. */
const KM_GRADO = 111.0;

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

/**
 * La proyección girada: la misma equirrectangular, centrada, y luego girada.
 * Tiene que coincidir con `proyectar` en `src/lib/mapa.ts`.
 */
function proyeccionGirada({ centro, giro, km }) {
  const [lon0, lat0] = centro;
  const cos = Math.cos((lat0 * Math.PI) / 180);
  const escala = ANCHO / (km[0] / KM_GRADO);
  const alto = Math.round((km[1] / KM_GRADO) * escala);
  const g = (giro * Math.PI) / 180;
  const [cg, sg] = [Math.cos(g), Math.sin(g)];
  const proyectar = ([lon, lat]) => {
    const dx = (lon - lon0) * cos * escala;
    const dy = (lat0 - lat) * escala;
    return [dx * cg - dy * sg + ANCHO / 2, dx * sg + dy * cg + alto / 2];
  };
  return { cos, escala, alto, proyectar };
}

/** Sutherland–Hodgman contra el rectángulo del dibujo, ya proyectado. */
function recortarPlano(anillo, ancho, alto) {
  return recortar(anillo, [0, 0, ancho, alto]);
}

function generarGirado(nombre, def, alturas) {
  const { cos, escala, alto, proyectar } = proyeccionGirada(def);
  const [lon0, lat0] = def.centro;

  // Un anillo proyectado, recortado y simplificado; las rocas sueltas, fuera.
  const trazar = (anillos, minimo) =>
    anillos
      .map((a) => recortarPlano(a.map(proyectar), ANCHO, alto))
      .filter((a) => a.length >= 3)
      .map((a) => simplificar(a, def.tolerancia))
      .filter((a) => {
        if (a.length < 3) return false;
        const xs = a.map((p) => p[0]);
        const ys = a.map((p) => p[1]);
        return Math.max(...xs) - Math.min(...xs) > minimo || Math.max(...ys) - Math.min(...ys) > minimo;
      })
      .map((a) => `M${a.map(([x, y]) => `${Math.round(x)} ${Math.round(y)}`).join('L')}Z`)
      .join('');

  const tierra = trazar(curvas(alturas, 0.5), 8);
  const relieve = def.srtm.niveles.map((nivel) => trazar(curvas(alturas, nivel), 12));

  // La caja en grados que abarca el dibujo, para quien sólo necesite saber
  // por dónde cae.
  const g = (def.giro * Math.PI) / 180;
  const inversa = ([x, y]) => {
    const [ux, uy] = [x - ANCHO / 2, y - alto / 2];
    const dx = ux * Math.cos(g) + uy * Math.sin(g);
    const dy = -ux * Math.sin(g) + uy * Math.cos(g);
    return [lon0 + dx / (cos * escala), lat0 - dy / escala];
  };
  const grados = [
    [0, 0],
    [ANCHO, 0],
    [0, alto],
    [ANCHO, alto],
  ].map(inversa);
  const caja = [
    Math.min(...grados.map((p) => p[0])),
    Math.min(...grados.map((p) => p[1])),
    Math.max(...grados.map((p) => p[0])),
    Math.max(...grados.map((p) => p[1])),
  ].map((v) => Math.round(v * 1e4) / 1e4);
  return {
    caja,
    cos,
    escala,
    ancho: ANCHO,
    alto,
    tierra,
    lagos: '',
    rios: '',
    centro: def.centro,
    giro: def.giro,
    relieve,
    niveles: def.srtm.niveles,
  };
}

/* ---------------- El relieve: SRTM3 ---------------- */

/** Los archivos de un zip, sin más dependencias que zlib. */
function leerZip(buf) {
  const fin = buf.lastIndexOf(Buffer.from([0x50, 0x4b, 0x05, 0x06]));
  const total = buf.readUInt16LE(fin + 10);
  let p = buf.readUInt32LE(fin + 16);
  const salida = {};
  for (let k = 0; k < total; k += 1) {
    const metodo = buf.readUInt16LE(p + 10);
    const tam = buf.readUInt32LE(p + 20);
    const [n, e, c] = [buf.readUInt16LE(p + 28), buf.readUInt16LE(p + 30), buf.readUInt16LE(p + 32)];
    const local = buf.readUInt32LE(p + 42);
    const nombre = buf.toString('utf8', p + 46, p + 46 + n);
    const inicio = local + 30 + buf.readUInt16LE(local + 26) + buf.readUInt16LE(local + 28);
    const datos = buf.subarray(inicio, inicio + tam);
    salida[nombre] = metodo === 8 ? inflateRawSync(datos) : datos;
    p += 46 + n + e + c;
  }
  return salida;
}

async function tesela(carpeta, nombre) {
  const archivo = join(carpeta, `${nombre}.hgt.zip`);
  if (!existsSync(archivo)) {
    process.stdout.write(`descargando ${nombre}… `);
    const r = await fetch(`${SRTM}/${nombre}.hgt.zip`);
    if (!r.ok) throw new Error(`${nombre}: ${r.status}`);
    writeFileSync(archivo, Buffer.from(await r.arrayBuffer()));
    console.log('hecho');
  }
  const hgt = Object.values(leerZip(readFileSync(archivo)))[0];
  const lado = Math.sqrt(hgt.length / 2);
  const lat = Number(nombre.slice(1, 3)) * (nombre[0] === 'N' ? 1 : -1);
  const lon = Number(nombre.slice(4, 7)) * (nombre[3] === 'E' ? 1 : -1);
  return { hgt, lado, lat, lon };
}

/**
 * La rejilla de alturas de la zona, a tres segundos de arco.
 *
 * Los huecos del radar (-32768) caen en los acantilados y en la cumbre, nunca
 * en el mar, que SRTM dejó a cero: se rellenan con la media de sus vecinos,
 * de fuera hacia dentro, para que las curvas de nivel no tengan agujeros.
 */
function rejilla(teselas, [oeste, sur, este, norte]) {
  const paso = 1200;
  const ancho = Math.round((este - oeste) * paso) + 1;
  const alto = Math.round((norte - sur) * paso) + 1;
  const z = new Float32Array(ancho * alto);
  for (let i = 0; i < alto; i += 1) {
    const lat = norte - i / paso;
    for (let j = 0; j < ancho; j += 1) {
      const lon = oeste + j / paso;
      const t = teselas.find((x) => lon >= x.lon && lon <= x.lon + 1 && lat >= x.lat && lat <= x.lat + 1);
      if (!t) continue;
      const fila = Math.round((t.lat + 1 - lat) * (t.lado - 1));
      const col = Math.round((lon - t.lon) * (t.lado - 1));
      const v = t.hgt.readInt16BE((fila * t.lado + col) * 2);
      z[i * ancho + j] = v === -32768 ? Number.NaN : v;
    }
  }
  for (let pasada = 0; pasada < 50; pasada += 1) {
    let quedan = 0;
    const antes = z.slice();
    for (let k = 0; k < z.length; k += 1) {
      if (!Number.isNaN(antes[k])) continue;
      const [i, j] = [Math.floor(k / ancho), k % ancho];
      let suma = 0;
      let n = 0;
      for (const [di, dj] of [[-1, 0], [1, 0], [0, -1], [0, 1], [-1, -1], [-1, 1], [1, -1], [1, 1]]) {
        const [a, b] = [i + di, j + dj];
        if (a < 0 || b < 0 || a >= alto || b >= ancho) continue;
        const w = antes[a * ancho + b];
        if (!Number.isNaN(w)) {
          suma += w;
          n += 1;
        }
      }
      if (n) z[k] = suma / n;
      else quedan += 1;
    }
    if (!quedan) break;
  }
  return { z, ancho, alto, oeste, norte, paso };
}

/**
 * Las curvas de nivel de la rejilla, por cuadrados marchantes, como anillos
 * cerrados en longitud y latitud. Fuera de la rejilla se supone mar, así que
 * toda curva se cierra.
 */
function curvas({ z, ancho, alto, oeste, norte, paso }, umbral) {
  const v = (i, j) => (i < 0 || j < 0 || i >= alto || j >= ancho ? -1e9 : z[i * ancho + j]);
  const fr = (a, b) => Math.min(1, Math.max(0, (umbral - a) / (b - a)));
  const puntos = new Map();
  const vecinos = new Map();
  const unir = (a, b) => {
    if (!vecinos.has(a)) vecinos.set(a, []);
    if (!vecinos.has(b)) vecinos.set(b, []);
    vecinos.get(a).push(b);
    vecinos.get(b).push(a);
  };
  for (let i = -1; i < alto; i += 1) {
    for (let j = -1; j < ancho; j += 1) {
      const [a, b, c, d] = [v(i, j), v(i, j + 1), v(i + 1, j + 1), v(i + 1, j)];
      const caso = (a > umbral ? 8 : 0) | (b > umbral ? 4 : 0) | (c > umbral ? 2 : 0) | (d > umbral ? 1 : 0);
      if (caso === 0 || caso === 15) continue;
      const arriba = () => { const k = `h${i},${j}`; puntos.set(k, [j + fr(a, b), i]); return k; };
      const derecha = () => { const k = `v${i},${j + 1}`; puntos.set(k, [j + 1, i + fr(b, c)]); return k; };
      const abajo = () => { const k = `h${i + 1},${j}`; puntos.set(k, [j + fr(d, c), i + 1]); return k; };
      const izquierda = () => { const k = `v${i},${j}`; puntos.set(k, [j, i + fr(a, d)]); return k; };
      const centro = (a + b + c + d) / 4 > umbral;
      switch (caso) {
        case 1: case 14: unir(izquierda(), abajo()); break;
        case 2: case 13: unir(abajo(), derecha()); break;
        case 3: case 12: unir(izquierda(), derecha()); break;
        case 4: case 11: unir(arriba(), derecha()); break;
        case 6: case 9: unir(arriba(), abajo()); break;
        case 7: case 8: unir(izquierda(), arriba()); break;
        case 5:
          if (centro) { unir(izquierda(), arriba()); unir(abajo(), derecha()); }
          else { unir(arriba(), derecha()); unir(izquierda(), abajo()); }
          break;
        case 10:
          if (centro) { unir(arriba(), derecha()); unir(izquierda(), abajo()); }
          else { unir(izquierda(), arriba()); unir(abajo(), derecha()); }
          break;
      }
    }
  }
  const vistos = new Set();
  const anillos = [];
  for (const inicio of vecinos.keys()) {
    if (vistos.has(inicio)) continue;
    const anillo = [];
    let previo = null;
    let actual = inicio;
    while (actual && !vistos.has(actual)) {
      vistos.add(actual);
      const [x, y] = puntos.get(actual);
      anillo.push([oeste + x / paso, norte - y / paso]);
      const siguiente = vecinos.get(actual).find((k) => k !== previo && !vistos.has(k));
      previo = actual;
      actual = siguiente;
    }
    if (anillo.length >= 4) anillos.push(anillo);
  }
  return anillos;
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
for (const [nombre, def] of Object.entries(GIRADOS)) {
  const teselas = [];
  for (const t of def.srtm.teselas) teselas.push(await tesela(carpeta, t));
  salida[nombre] = generarGirado(nombre, def, rejilla(teselas, def.srtm.caja));
  const kb = Math.round((salida[nombre].tierra.length + salida[nombre].relieve.join('').length) / 1024);
  console.log(`${nombre}: ${salida[nombre].ancho}×${salida[nombre].alto}, girado ${def.giro}°, ${kb} KB`);
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
  /** En los mapas girados: el centro (longitud, latitud) y el giro, en grados. */
  centro?: [number, number];
  giro?: number;
  /** Las curvas de nivel, de la más baja a la más alta, y sus alturas en metros. */
  relieve?: string[];
  niveles?: number[];
}

export const MAPAS_BASE: Record<${[...Object.keys(MAPAS), ...Object.keys(GIRADOS)]
    .map((k) => `'${k}'`)
    .join(' | ')}, MapaBase> = ${JSON.stringify(salida, null, 2)};
`,
);
console.log('src/content/generated/mapas.ts');
