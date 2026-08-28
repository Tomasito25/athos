/**
 * Base de datos: siembra, datos del usuario y respeto por lo que el usuario
 * ya tiene guardado.
 */
import { beforeEach, describe, expect, it } from 'vitest';
import { AthosDatabase, db, getSetting, setSetting } from '@/db/db';
import { restoreOffice, seedContent, seedUserDefaults } from '@/db/seed';
import {
  completionsOn,
  deleteRule,
  favoriteId,
  isFavorite,
  listFavorites,
  listRules,
  prayerStats,
  recordVisit,
  ruleItems,
  ruleProgress,
  saveNote,
  saveSession,
  toggleFavorite,
  toggleRuleItem,
} from '@/db/user';
import { CONTENT_VERSION } from '@/content';
import { SAINTS } from '@/content/saints';

async function reset() {
  await db.delete();
  await db.open();
}

beforeEach(async () => {
  await reset();
});

describe('esquema', () => {
  it('declara todas las tablas de la especificación', () => {
    const fresh = new AthosDatabase('athos-esquema');
    const names = fresh.tables.map((t) => t.name);
    for (const table of [
      'prayers',
      'bible_books',
      'bible_chapters',
      'bible_verses',
      'psalms',
      'saints',
      'feasts',
      'liturgical_readings',
      'liturgies',
      'akathists',
      'canons',
      'church_fathers',
      'monasteries',
      'icons',
      'daily_rules',
      'rule_items',
      'favorites',
      'bookmarks',
      'notes',
      'settings',
    ]) {
      expect(names).toContain(table);
    }
    fresh.close();
  });
});

describe('siembra del contenido', () => {
  it('escribe el contenido y registra su versión', async () => {
    expect(await seedContent()).toBe(true);
    expect(await db.prayers.count()).toBeGreaterThan(20);
    expect(await db.saints.count()).toBeGreaterThan(30);
    expect(await db.monasteries.count()).toBe(20);
    // 66 libros del canon corto más los 12 deuterocanónicos de la Septuaginta.
    expect(await db.bible_books.count()).toBe(78);
    expect(await db.bible_books.filter((b) => b.deuterocanonical === true).count()).toBe(12);
    expect(await getSetting('content.version', 0)).toBe(CONTENT_VERSION);
  });

  it('no vuelve a sembrar si la versión no ha cambiado', async () => {
    await seedContent();
    expect(await seedContent()).toBe(false);
  });

  it('una nueva siembra no toca los datos del usuario', async () => {
    await seedContent();
    await seedUserDefaults();
    await toggleFavorite({
      kind: 'psalm',
      refId: '50',
      title: 'Salmo 50',
      path: '/leer/salterio/50',
    });
    await toggleRuleItem('2026-08-23', 'oficio-manana', 'oficio-manana-m-inicio');

    await seedContent(true);

    expect(await db.favorites.count()).toBe(1);
    expect(await db.rule_completions.count()).toBe(1);
  });
});

describe('valores iniciales del usuario', () => {
  it('crea los tres oficios del día una sola vez', async () => {
    expect(await seedUserDefaults()).toBe(true);
    const reglas = await listRules();
    expect(reglas.map((r) => r.time)).toEqual(['manana', 'mediodia', 'noche']);
    expect(await db.rule_items.count()).toBeGreaterThan(30);
    expect(await seedUserDefaults()).toBe(false);
  });

  it('cada oficio trae sus pasos, con texto o con enlace', async () => {
    await seedUserDefaults();
    for (const regla of await listRules()) {
      const pasos = await ruleItems(regla.id);
      expect(pasos.length, regla.name).toBeGreaterThan(8);
      for (const paso of pasos) {
        expect(paso.title.length, `${regla.name}: paso sin título`).toBeGreaterThan(2);
        // O trae su propio texto, o apunta a algo, o es un contador.
        const tieneContenido =
          Boolean(paso.blocks?.length) || Boolean(paso.linkKind) || Boolean(paso.target);
        expect(tieneContenido, `${regla.name}: ${paso.title}`).toBe(true);
      }
    }
  });

  it('si el usuario borra un oficio, no reaparece', async () => {
    await seedUserDefaults();
    await deleteRule('oficio-manana');
    await seedUserDefaults();
    expect((await listRules()).map((r) => r.id)).not.toContain('oficio-manana');
  });

  it('al borrar un oficio se llevan sus pasos y su historial', async () => {
    await seedUserDefaults();
    await toggleRuleItem('2026-08-23', 'oficio-manana', 'oficio-manana-m-inicio');
    await deleteRule('oficio-manana');
    expect(await db.rule_items.where('ruleId').equals('oficio-manana').count()).toBe(0);
    expect(await db.rule_completions.where('ruleId').equals('oficio-manana').count()).toBe(0);
  });
});

describe('santoral', () => {
  it('ningún santo pisa a otro', async () => {
    // Dos entradas con el mismo identificador no dan error: la segunda
    // sobrescribe a la primera al sembrar, y el santo desaparece sin ruido.
    const ids = SAINTS.map((s) => s.id);
    const repetidos = [...new Set(ids.filter((x, i) => ids.indexOf(x) !== i))];
    expect(repetidos).toEqual([]);
    await seedContent();
    expect(await db.saints.count()).toBe(SAINTS.length);
  });

  it('cada conmemoración tiene día válido y vida escrita', () => {
    for (const santo of SAINTS) {
      expect(santo.day, santo.id).toMatch(/^\d{2}-\d{2}$/);
      const [mes, dia] = santo.day.split('-').map(Number);
      expect(mes >= 1 && mes <= 12, `${santo.id}: mes ${mes}`).toBe(true);
      expect(dia >= 1 && dia <= 31, `${santo.id}: día ${dia}`).toBe(true);
      // La ficha sin vida no sirve de nada: es un nombre en un calendario.
      expect(santo.biography.length, `${santo.id} sin vida escrita`).toBeGreaterThan(60);
      expect(santo.name.length, santo.id).toBeGreaterThan(4);
      expect(santo.category.length, `${santo.id} sin categoría`).toBeGreaterThan(0);
    }
  });

  it('cubre buena parte del año', () => {
    const dias = new Set(SAINTS.map((s) => s.day));
    expect(dias.size).toBeGreaterThan(160);
  });
});

describe('favoritos', () => {
  it('alterna y persiste', async () => {
    const entry = {
      kind: 'prayer' as const,
      refId: 'comienzo-habitual',
      title: 'Comienzo habitual',
      path: '/orar/oraciones/comienzo-habitual',
    };
    expect(await toggleFavorite(entry)).toBe(true);
    expect(await isFavorite('prayer', 'comienzo-habitual')).toBe(true);
    expect((await listFavorites('prayer')).length).toBe(1);

    expect(await toggleFavorite(entry)).toBe(false);
    expect(await isFavorite('prayer', 'comienzo-habitual')).toBe(false);
  });

  it('la clave evita duplicados entre tipos distintos', () => {
    expect(favoriteId('prayer', 'x')).not.toBe(favoriteId('psalm', 'x'));
  });
});

describe('regla de oración', () => {
  it('el progreso se guarda por fecha', async () => {
    await seedUserDefaults();
    const rule = (await listRules())[0];
    const items = await ruleItems(rule.id);

    await toggleRuleItem('2026-08-23', rule.id, items[0].id);
    await toggleRuleItem('2026-08-23', rule.id, items[1].id);

    const hoy = await ruleProgress('2026-08-23', rule);
    expect(hoy.completed.size).toBe(2);
    expect(hoy.ratio).toBeCloseTo(2 / items.length);

    const otroDia = await ruleProgress('2026-08-24', rule);
    expect(otroDia.completed.size).toBe(0);
  });

  it('marcar dos veces desmarca', async () => {
    await seedUserDefaults();
    const rule = (await listRules())[0];
    const items = await ruleItems(rule.id);
    await toggleRuleItem('2026-08-23', rule.id, items[0].id);
    expect(await toggleRuleItem('2026-08-23', rule.id, items[0].id)).toBe(false);
    expect(await completionsOn('2026-08-23')).toHaveLength(0);
  });
});

describe('oración de Jesús', () => {
  it('acumula las estadísticas del día y de la semana', async () => {
    await saveSession({
      startedAt: '2026-08-23T07:00:00.000Z',
      endedAt: '2026-08-23T07:10:00.000Z',
      count: 100,
      target: 100,
      durationMs: 600_000,
      mode: 'jesus-prayer',
      formulaId: 'jesus-prayer-es',
    });
    await saveSession({
      startedAt: '2026-08-20T07:00:00.000Z',
      endedAt: '2026-08-20T07:05:00.000Z',
      count: 33,
      target: 33,
      durationMs: 300_000,
      mode: 'chotki',
      formulaId: 'chotki',
    });

    const stats = await prayerStats('2026-08-23');
    expect(stats.today).toBe(100);
    expect(stats.week).toBe(133);
    expect(stats.total).toBe(133);
    expect(stats.sessions).toBe(2);
  });
});

describe('notas e historial', () => {
  it('guarda notas ligadas a un texto', async () => {
    const note = await saveNote({
      targetKind: 'prayer',
      targetId: 'comienzo-habitual',
      targetTitle: 'Comienzo habitual',
      path: '/orar/oraciones/comienzo-habitual',
      body: 'Rezar más despacio.',
    });
    expect(note.id).toBeTruthy();
    expect(note.createdAt).toBe(note.updatedAt);
  });

  it('el historial no repite la misma ruta', async () => {
    await recordVisit({ path: '/leer/salterio/50', title: 'Salmo 50', kind: 'Salterio' });
    await recordVisit({ path: '/leer/salterio/50', title: 'Salmo 50', kind: 'Salterio' });
    expect(await db.history.count()).toBe(1);
  });
});

describe('ajustes', () => {
  it('guarda y recupera valores arbitrarios', async () => {
    await setSetting('prueba', { a: 1 });
    expect(await getSetting('prueba', null)).toEqual({ a: 1 });
    expect(await getSetting('inexistente', 'defecto')).toBe('defecto');
  });
});

describe('restaurar un oficio', () => {
  it('recupera los pasos de fábrica sin tocar los otros oficios', async () => {
    // Los oficios se siembran una sola vez, así que las mejoras posteriores no
    // llegan solas: esto es lo que permite recibirlas, y sólo cuando se pide.
    await seedUserDefaults();

    // El usuario destroza el de la mañana y personaliza el de la noche.
    const pasosManana = await ruleItems('oficio-manana');
    await db.rule_items.bulkDelete(pasosManana.slice(2).map((p) => p.id));
    const pasosNoche = await ruleItems('oficio-noche');
    await db.rule_items.update(pasosNoche[0].id, { title: 'Mi paso de siempre' });

    expect((await ruleItems('oficio-manana')).length).toBe(2);

    const hecho = await restoreOffice('manana');
    expect(hecho).toBe(true);

    // La mañana vuelve entera, con la conmemoración de los vivos incluida.
    const restaurada = await ruleItems('oficio-manana');
    expect(restaurada.length).toBeGreaterThan(10);
    expect(restaurada.some((p) => p.id.endsWith('m-vivos'))).toBe(true);

    // Y la noche conserva lo que el usuario había cambiado.
    const noche = await ruleItems('oficio-noche');
    expect(noche[0].title).toBe('Mi paso de siempre');
  });

  it('no inventa un oficio que no existe', async () => {
    expect(await restoreOffice('manana')).toBe(true);
    // @ts-expect-error a propósito: un momento que no es de los tres.
    expect(await restoreOffice('tarde')).toBe(false);
  });
});
