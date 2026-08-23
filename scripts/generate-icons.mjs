/**
 * Genera los iconos de ATHOS a partir de un SVG maestro.
 *   node scripts/generate-icons.mjs
 * Produce: iconos PWA (any + maskable), apple-touch-icon, favicon.ico,
 * imagen Open Graph y pantallas de arranque para iOS.
 */
import sharp from 'sharp';
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const iconsDir = resolve(root, 'public/icons');

const INK = '#14100C';
const GOLD = '#C9A24A';
const GOLD_DEEP = '#8C6A22';
const PARCHMENT = '#F4EDE0';

/** Cruz ortodoxa de ocho puntas dibujada sobre un lienzo de 512×512. */
function cross({ stroke = GOLD, w = 26, scale = 1, cx = 256, cy = 256 } = {}) {
  const s = (n) => (n * scale).toFixed(2);
  const t = (x, y) => `${(cx + (x - 256) * scale).toFixed(2)} ${(cy + (y - 256) * scale).toFixed(2)}`;
  return `
    <g fill="none" stroke="${stroke}" stroke-width="${s(w)}" stroke-linecap="round" stroke-linejoin="round">
      <path d="M ${t(256, 54)} L ${t(256, 458)}" />
      <path d="M ${t(186, 118)} L ${t(326, 118)}" />
      <path d="M ${t(128, 196)} L ${t(384, 196)}" />
      <path d="M ${t(160, 366)} L ${t(352, 314)}" />
    </g>`;
}

function masterSvg({ bg = INK, fg = GOLD, scale = 1, ring = true } = {}) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512" role="img" aria-label="ATHOS">
  <defs>
    <radialGradient id="glow" cx="50%" cy="42%" r="62%">
      <stop offset="0%" stop-color="#241C14"/>
      <stop offset="100%" stop-color="${bg}"/>
    </radialGradient>
    <linearGradient id="gold" gradientUnits="userSpaceOnUse" x1="256" y1="54" x2="256" y2="458">
      <stop offset="0%" stop-color="${fg}"/>
      <stop offset="100%" stop-color="${GOLD_DEEP}"/>
    </linearGradient>
  </defs>
  <rect width="512" height="512" fill="url(#glow)"/>
  ${ring ? `<circle cx="256" cy="256" r="${(226 * scale).toFixed(1)}" fill="none" stroke="${GOLD_DEEP}" stroke-width="${(5 * scale).toFixed(1)}" opacity="0.55"/>` : ''}
  ${cross({ stroke: 'url(#gold)', scale })}
</svg>`;
}

/** Un icono ".ico" mínimo que envuelve un PNG de 32×32. */
function icoFromPng(png) {
  const dir = Buffer.alloc(6);
  dir.writeUInt16LE(0, 0);
  dir.writeUInt16LE(1, 2);
  dir.writeUInt16LE(1, 4);
  const entry = Buffer.alloc(16);
  entry.writeUInt8(32, 0);
  entry.writeUInt8(32, 1);
  entry.writeUInt8(0, 2);
  entry.writeUInt8(0, 3);
  entry.writeUInt16LE(1, 4);
  entry.writeUInt16LE(32, 6);
  entry.writeUInt32LE(png.length, 8);
  entry.writeUInt32LE(22, 12);
  return Buffer.concat([dir, entry, png]);
}

const render = (svg, size) => sharp(Buffer.from(svg)).resize(size, size).png({ compressionLevel: 9 }).toBuffer();

async function main() {
  await mkdir(iconsDir, { recursive: true });

  const any = masterSvg({ scale: 1 });
  // Los iconos "maskable" necesitan que el contenido quepa en el círculo seguro (80 %).
  const maskable = masterSvg({ scale: 0.62, ring: false });

  await writeFile(resolve(iconsDir, 'icon.svg'), any);
  await writeFile(resolve(root, 'public/favicon.svg'), any);

  for (const size of [64, 128, 192, 256, 512]) {
    await writeFile(resolve(iconsDir, `icon-${size}.png`), await render(any, size));
  }
  for (const size of [192, 512]) {
    await writeFile(resolve(iconsDir, `maskable-${size}.png`), await render(maskable, size));
  }
  await writeFile(resolve(iconsDir, 'apple-touch-icon.png'), await render(masterSvg({ scale: 0.78, ring: false }), 180));
  await writeFile(resolve(root, 'public/favicon.ico'), icoFromPng(await render(any, 32)));

  // Imagen Open Graph 1200×630
  const og = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#1B1510"/><stop offset="100%" stop-color="#0E0B08"/>
      </linearGradient>
    </defs>
    <rect width="1200" height="630" fill="url(#bg)"/>
    <rect x="28" y="28" width="1144" height="574" fill="none" stroke="${GOLD_DEEP}" stroke-width="2" opacity="0.5"/>
    <g transform="translate(190 315) scale(0.62) translate(-256 -256)">${cross({ stroke: GOLD, w: 22 })}</g>
    <text x="400" y="290" font-family="Georgia, 'EB Garamond', serif" font-size="128" letter-spacing="26" fill="${PARCHMENT}">ATHOS</text>
    <text x="406" y="356" font-family="Georgia, 'EB Garamond', serif" font-size="38" letter-spacing="7" fill="${GOLD}">Oración · Tradición · Vida</text>
  </svg>`;
  await writeFile(resolve(iconsDir, 'og-image.png'), await sharp(Buffer.from(og)).png().toBuffer());

  // Pantallas de arranque para iOS (Safari no genera splash a partir del manifest).
  const splashes = [
    [1170, 2532], [1179, 2556], [1284, 2778], [1290, 2796], [1242, 2688],
    [828, 1792], [750, 1334], [1620, 2160], [1668, 2388], [2048, 2732],
  ];
  for (const [w, h] of splashes) {
    const side = Math.round(Math.min(w, h) * 0.34);
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
      <rect width="${w}" height="${h}" fill="${INK}"/>
      <g transform="translate(${w / 2} ${h / 2 - side * 0.15}) scale(${side / 512}) translate(-256 -256)">${cross({ stroke: GOLD, w: 20 })}</g>
      <text x="${w / 2}" y="${h / 2 + side * 0.72}" text-anchor="middle" font-family="Georgia, serif" font-size="${Math.round(side * 0.15)}" letter-spacing="${Math.round(side * 0.05)}" fill="${PARCHMENT}">ATHOS</text>
    </svg>`;
    await writeFile(resolve(iconsDir, `splash-${w}x${h}.png`), await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toBuffer());
  }

  console.log('Iconos generados en public/icons');
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
