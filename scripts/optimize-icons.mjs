/**
 * Optimiza las reproducciones de iconos descargadas de Wikimedia Commons.
 *
 *   node scripts/optimize-icons.mjs <carpeta-descargas>
 *
 * Los originales llegan a tener 50 MB, lo que no cabe en una aplicación que
 * quiere funcionar sin conexión. De cada uno se guardan dos WebP: uno para la
 * ficha y una miniatura para la rejilla.
 */
import sharp from 'sharp';
import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const origen = resolve(process.argv[2] ?? '/tmp/iconos');
const destino = resolve(raiz, 'public/content/icons');

const GRANDE = 900; // lado mayor en la ficha
const MINIATURA = 420; // lado mayor en la rejilla

await mkdir(destino, { recursive: true });

const manifiesto = JSON.parse(await readFile(resolve(origen, 'origen.json'), 'utf-8'));
const archivos = (await readdir(origen)).filter((f) => f.endsWith('.jpg'));

let total = 0;
for (const archivo of archivos) {
  const clave = archivo.replace(/\.jpg$/, '');
  const entrada = sharp(resolve(origen, archivo), { limitInputPixels: false }).rotate();
  const meta = await entrada.metadata();

  const grande = await entrada
    .clone()
    .resize({ width: GRANDE, height: GRANDE, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 74, effort: 6 })
    .toBuffer();

  const mini = await entrada
    .clone()
    .resize({ width: MINIATURA, height: MINIATURA, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 70, effort: 6 })
    .toBuffer();

  await writeFile(resolve(destino, `${clave}.webp`), grande);
  await writeFile(resolve(destino, `${clave}-mini.webp`), mini);

  const info = manifiesto.items[clave];
  if (info) {
    info.file = `${clave}.webp`;
    info.thumb = `${clave}-mini.webp`;
    info.originalWidth = meta.width;
    info.originalHeight = meta.height;
  }

  total += grande.length + mini.length;
  console.log(
    `${clave.padEnd(24)} ${String(meta.width).padStart(5)}×${String(meta.height).padEnd(5)} → ` +
      `${(grande.length / 1024).toFixed(0)} kB + ${(mini.length / 1024).toFixed(0)} kB`,
  );
}

await writeFile(resolve(destino, 'origen.json'), JSON.stringify(manifiesto, null, 1));
console.log(`\n${archivos.length} iconos · ${(total / 1024 / 1024).toFixed(1)} MB en total`);
