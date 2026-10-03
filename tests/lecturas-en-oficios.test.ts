/**
 * Las lecturas y los salmos que los oficios muestran dentro del texto.
 *
 * Un bloque `reading` guarda sólo la referencia y la pantalla la recorta de la
 * Biblia de ATHOS; uno `psalm`, sólo el número. Si la referencia no se
 * entiende o el salmo no existe, el fiel ve un aviso en mitad del oficio. Esto
 * lo comprueba antes, para todos los oficios, himnos y oraciones.
 */
import { describe, expect, it } from 'vitest';
import { OFFICES } from '@/content/offices';
import { AKATHISTS, CANONS } from '@/content/hymns';
import { PRAYERS } from '@/content/prayers';
import { parsePassage } from '@/lib/pericope';
import type { TextBlock } from '@/types';

const bloques: { donde: string; b: TextBlock }[] = [
  ...OFFICES.flatMap((o) => o.sections.flatMap((s) => s.blocks.map((b) => ({ donde: `${o.title} · ${s.title}`, b })))),
  ...CANONS.flatMap((c) => c.odes.flatMap((s) => s.blocks.map((b) => ({ donde: `${c.title} · ${s.title}`, b })))),
  ...AKATHISTS.flatMap((a) => a.sections.flatMap((s) => s.blocks.map((b) => ({ donde: `${a.title} · ${s.title}`, b })))),
  ...PRAYERS.flatMap((p) => p.blocks.map((b) => ({ donde: p.title, b }))),
];

describe('lecturas dentro de los oficios', () => {
  const lecturas = bloques.filter(({ b }) => b.kind === 'reading');

  it('hay lecturas, y todas se entienden', () => {
    expect(lecturas.length).toBeGreaterThan(5);
    for (const { donde, b } of lecturas) {
      expect(parsePassage(b.ref ?? ''), `${donde}: «${b.ref}»`).not.toBeNull();
    }
  });

  it('los cánticos de Daniel se leen del texto griego, no del hebreo', () => {
    const daniel = lecturas.filter(({ b }) => (b.ref ?? '').startsWith('Daniel'));
    expect(daniel.length).toBeGreaterThan(0);
    for (const { b } of daniel) {
      expect(parsePassage(b.ref!)?.[0]?.bookId).toBe('DAG');
    }
  });

  it('los salmos citados existen (1-151)', () => {
    for (const { donde, b } of bloques.filter(({ b }) => b.kind === 'psalm')) {
      const n = Number(b.ref);
      expect(n >= 1 && n <= 151, `${donde}: salmo ${b.ref}`).toBe(true);
    }
  });
});
