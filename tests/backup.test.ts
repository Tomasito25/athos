/** Exportación, validación e importación de los datos del usuario. */
import { beforeEach, describe, expect, it } from 'vitest';
import { db } from '@/db/db';
import { seedUserDefaults } from '@/db/seed';
import {
  BACKUP_FORMAT,
  BACKUP_VERSION,
  backupToMarkdown,
  exportBackup,
  importBackup,
  validateBackup,
  wipeUserData,
  type AthosBackup,
} from '@/db/backup';
import { saveBookmark, saveNote, toggleFavorite } from '@/db/user';

beforeEach(async () => {
  await db.delete();
  await db.open();
  await seedUserDefaults();
});

async function poblado() {
  await toggleFavorite({
    kind: 'psalm',
    refId: '50',
    title: 'Salmo 50',
    path: '/leer/salterio/50',
  });
  await saveBookmark({
    kind: 'bible',
    refId: 'JHN.1',
    title: 'Juan 1',
    path: '/leer/biblia/JHN/1',
  });
  await saveNote({
    targetKind: 'psalm',
    targetId: '50',
    targetTitle: 'Salmo 50',
    path: '/leer/salterio/50',
    body: 'Rezarlo más despacio.',
  });
}

describe('exportación', () => {
  it('incluye los datos del usuario y no el contenido religioso', async () => {
    await poblado();
    const backup = await exportBackup();

    expect(backup.format).toBe(BACKUP_FORMAT);
    expect(backup.version).toBe(BACKUP_VERSION);
    expect(backup.data.favorites).toHaveLength(1);
    expect(backup.data.bookmarks).toHaveLength(1);
    expect(backup.data.notes).toHaveLength(1);
    expect(backup.data.daily_rules.length).toBeGreaterThan(0);
    expect(Object.keys(backup.data)).not.toContain('prayers');
  });

  it('no exporta los ajustes internos de la siembra', async () => {
    const backup = await exportBackup();
    expect(backup.data.settings.some((s) => s.key.startsWith('content.'))).toBe(false);
  });

  it('permite exportar sólo algunas secciones', async () => {
    await poblado();
    const backup = await exportBackup(['favorites']);
    expect(backup.data.favorites).toHaveLength(1);
    expect(backup.data.notes).toHaveLength(0);
  });

  it('el Markdown es legible y recoge lo guardado', async () => {
    await poblado();
    const markdown = backupToMarkdown(await exportBackup());
    expect(markdown).toContain('# ATHOS');
    expect(markdown).toContain('Salmo 50');
    expect(markdown).toContain('Rezarlo más despacio.');
  });

});

describe('validación', () => {
  it('acepta una copia recién exportada', async () => {
    const result = validateBackup(await exportBackup());
    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it('rechaza lo que no es una copia de ATHOS', () => {
    expect(validateBackup({ hola: 1 }).valid).toBe(false);
    expect(validateBackup(null).valid).toBe(false);
    expect(validateBackup('texto').valid).toBe(false);
  });

  it('rechaza una copia de una versión futura', () => {
    const result = validateBackup({
      format: BACKUP_FORMAT,
      version: BACKUP_VERSION + 1,
      data: {},
    });
    expect(result.valid).toBe(false);
    expect(result.errors.join(' ')).toContain('más reciente');
  });

  it('detecta registros con la forma equivocada', () => {
    const result = validateBackup({
      format: BACKUP_FORMAT,
      version: BACKUP_VERSION,
      data: { notes: [{ id: 'x' }] },
    });
    expect(result.valid).toBe(false);
    expect(result.errors.join(' ')).toContain('notes');
  });

  it('detecta una sección que no es una lista', () => {
    const result = validateBackup({
      format: BACKUP_FORMAT,
      version: BACKUP_VERSION,
      data: { favorites: 'no soy una lista' },
    });
    expect(result.valid).toBe(false);
  });
});

describe('importación', () => {
  it('restaura una copia sobre una base vacía', async () => {
    await poblado();
    const backup = await exportBackup();

    await wipeUserData();
    expect(await db.favorites.count()).toBe(0);

    await importBackup(backup, 'replace');
    expect(await db.favorites.count()).toBe(1);
    expect(await db.notes.count()).toBe(1);
    expect(await db.bookmarks.count()).toBe(1);
  });

  it('combinar conserva lo que ya había', async () => {
    await poblado();
    const backup = await exportBackup(['notes']);

    await saveNote({
      targetKind: 'prayer',
      targetId: 'local',
      targetTitle: 'Local',
      path: '/x',
      body: 'Nota local',
    });

    await importBackup(backup, 'merge');
    expect(await db.notes.count()).toBe(2);
  });

  it('reemplazar sustituye la sección entera', async () => {
    await poblado();
    const backup = await exportBackup(['notes']);

    await saveNote({
      targetKind: 'prayer',
      targetId: 'local',
      targetTitle: 'Local',
      path: '/x',
      body: 'Nota local',
    });

    await importBackup(backup, 'replace');
    expect(await db.notes.count()).toBe(1);
  });

  it('se niega a importar una copia inválida', async () => {
    const malo = { format: 'otro', version: 1, data: {} } as unknown as AthosBackup;
    await expect(importBackup(malo)).rejects.toThrow(/no válida/i);
  });

  it('la ida y vuelta conserva los datos intactos', async () => {
    await poblado();
    const antes = await exportBackup();
    await wipeUserData();
    await importBackup(antes, 'replace');
    const despues = await exportBackup();

    expect(despues.data.notes).toEqual(antes.data.notes);
    expect(despues.data.favorites).toEqual(antes.data.favorites);
    expect(despues.data.rule_items).toEqual(antes.data.rule_items);
  });
});

describe('borrado', () => {
  it('borra lo del usuario y respeta el contenido', async () => {
    await poblado();
    await db.prayers.put({
      id: 'x',
      title: 'x',
      category: 'otras',
      order: 1,
      blocks: [],
      status: 'complete',
      meta: {
        source: 's',
        language: 'es',
        license: 'traditional',
        dateAdded: '2026-01-01',
      },
      searchText: 'x',
    });

    await wipeUserData();

    expect(await db.favorites.count()).toBe(0);
    expect(await db.notes.count()).toBe(0);
    expect(await db.bookmarks.count()).toBe(0);
    expect(await db.prayers.count()).toBe(1);
  });
});
