/**
 * Los recordatorios.
 *
 * Dicen lo que toca ese día, sólo suenan cuando hay algo que decir, respetan
 * la hora elegida y se dejan preparados en la cola para el Service Worker.
 */
import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
import { db, getSetting } from '@/db/db';
import { seedContent, seedUserDefaults } from '@/db/seed';
import { completeRule, ruleForTime } from '@/db/user';
import { toggleDay } from '@/db/plans';
import { daysOf } from '@/content/plans';
import { QUEUE_KEY, REMINDERS, avisarVencidos, buildQueue, refreshReminders, reminderContent, timeFor } from '@/lib/reminders';
import { showNotification } from '@/lib/notifications';
import { verseReferenceFor } from '@/content/verse-of-day';

// Los avisos no se enseñan de verdad: se anota cuáles se habrían enseñado.
vi.mock('@/lib/notifications', async (original) => ({
  ...(await original<Record<string, unknown>>()),
  showNotification: vi.fn(async () => true),
}));
import { useSettings } from '@/stores/settings';
import { toIsoDate } from '@/lib/calendar/jdn';

const ajustes = { calendarStyle: 'nuevo' as const, officeLength: { manana: 'breve', mediodia: 'habitual', noche: 'extenso' } as const };

beforeAll(async () => {
  await db.delete();
  await db.open();
  await seedContent();
  await seedUserDefaults();
});

beforeEach(() => {
  useSettings.getState().set('notifications', {});
  useSettings.getState().set('notificationTimes', {});
});

describe('lo que dice cada uno', () => {
  it('el oficio dice la medida en que se reza y cuánto se tarda', async () => {
    const c = await reminderContent('oracion-manana', '2026-10-20', ajustes);
    expect(c?.title).toBe('Oficio de la mañana');
    expect(c?.body).toMatch(/^Breve · unos 6 min/);
    expect(c?.path).toBe('/orar/oficio/manana');
    expect((await reminderContent('oracion-noche', '2026-10-20', ajustes))?.body).toMatch(/^Extenso/);
  });

  it('la fiesta sólo suena en las grandes fiestas', async () => {
    expect((await reminderContent('fiesta', '2026-12-25', ajustes))?.body).toMatch(/Natividad/);
    expect(await reminderContent('fiesta', '2026-10-20', ajustes)).toBeNull();
  });

  it('el ayuno, sólo el primer día del periodo', async () => {
    // El ayuno de la Natividad empieza el 15 de noviembre en el calendario nuevo.
    expect(await reminderContent('ayuno', '2026-11-15', ajustes)).not.toBeNull();
    expect(await reminderContent('ayuno', '2026-11-16', ajustes)).toBeNull();
  });

  it('el santo nombra al santo del día y lleva a su ficha', async () => {
    const c = await reminderContent('santo', '2026-12-06', ajustes);
    expect(c?.body).toMatch(/Nicolás/);
    expect(c?.path).toMatch(/^\/calendario\/santos\//);
  });

  it('el oficio ya rezado no avisa en el momento', async () => {
    const hoy = toIsoDate(new Date());
    const regla = await ruleForTime('mediodia');
    await completeRule(hoy, regla!.id, 'breve');
    expect(await reminderContent('oracion-mediodia', hoy, ajustes, true)).toBeNull();
    // Pero «lo que queda por rezar» sigue nombrando los otros dos.
    const queda = await reminderContent('regla', hoy, ajustes, true);
    expect(queda?.body).toMatch(/mañana/);
    expect(queda?.body).not.toMatch(/mediodía/);
  });

  it('el plan de lectura dice qué día toca y lleva a leerlo', async () => {
    await toggleDay('evangelios', 1, daysOf('evangelios').length);
    const c = await reminderContent('lectura', toIsoDate(new Date()), ajustes);
    expect(c?.body).toMatch(/^Día 2: /);
    expect(c?.path).toBe('/leer/planes/evangelios/dia/2');
  });
});

describe('el apotegma y el versículo, por separado', () => {
  const hora = (id: string) => REMINDERS.find((r) => r.id === id)!.defaultTime;

  it('el apotegma llega por la mañana y el versículo por la tarde', () => {
    expect(hora('apotegma') < '12:00').toBe(true);
    expect(hora('versiculo') >= '14:00' && hora('versiculo') < '21:00').toBe(true);
  });

  it('el apotegma dice el dicho y quién lo dijo, y lleva a él', async () => {
    const c = await reminderContent('apotegma', '2026-10-20', ajustes);
    expect(c?.title).toMatch(/^Apotegma del día · (Abba|Amma) /);
    expect(c?.path).toMatch(/^\/biblioteca\/apotegmas#[a-z0-9-]+$/);
    expect(c!.body.length).toBeLessThanOrEqual(301);
    const otro = await reminderContent('apotegma', '2026-10-21', ajustes);
    expect(otro?.body).not.toBe(c?.body);
  });

  it('el versículo lleva a su capítulo, aunque el libro no esté guardado', async () => {
    const c = await reminderContent('versiculo', '2026-10-20', ajustes);
    expect(c?.title).toMatch(/^Versículo del día/);
    expect(c?.body.length).toBeGreaterThan(5);
    expect(c?.path).toMatch(/^\/leer\/biblia\//);
  });

  it('el versículo lleva su texto cuando el libro está guardado', async () => {
    // El día del año en que toca el salmo 1, que es el que sirven las pruebas.
    let dia = new Date(2026, 0, 1);
    while (verseReferenceFor(dia) !== 'Salmos 1, 1') dia = new Date(dia.getFullYear(), dia.getMonth(), dia.getDate() + 1);
    const c = await reminderContent('versiculo', toIsoDate(dia), ajustes);
    expect(c?.title).toBe('Versículo del día · Salmos 1, 1');
    expect(c?.body).toMatch(/^BIENAVENTURADO el varón/);
    expect(c?.path).toBe('/leer/biblia/PSA/1#v1');
  });

  it('dos avisos a la misma hora se enseñan los dos', async () => {
    const enseñar = vi.mocked(showNotification);
    enseñar.mockClear();
    const a = (id: string) => ({ id, date: '2026-10-20', at: new Date(2026, 9, 20, 8, 0).toISOString(), title: id, body: id, url: '/' });
    const cola = [a('apotegma'), a('santo')];
    await avisarVencidos(cola, new Date(2026, 9, 20, 8, 0, 1).getTime());
    expect(enseñar.mock.calls.map((c) => c[2])).toEqual(['apotegma', 'santo']);
    // Y no se repiten.
    await avisarVencidos(cola, new Date(2026, 9, 20, 8, 5).getTime());
    expect(enseñar).toHaveBeenCalledTimes(2);
  });

  it('lo vencido hace más de seis horas ya no se enseña', async () => {
    const enseñar = vi.mocked(showNotification);
    enseñar.mockClear();
    const viejo = { id: 'apotegma', date: '2026-10-19', at: new Date(2026, 9, 19, 7, 45).toISOString(), title: '', body: '', url: '/' };
    await avisarVencidos([viejo], new Date(2026, 9, 19, 14, 0).getTime());
    expect(enseñar).not.toHaveBeenCalled();
  });

  it('son dos avisos distintos, cada uno a su hora', async () => {
    useSettings.getState().set('notifications', { apotegma: true, versiculo: true });
    const manana = new Date(2026, 9, 20, 0, 1);
    const cola = await buildQueue(manana);
    const delDia = cola.filter((q) => q.date === '2026-10-20');
    expect(delDia.map((q) => q.id)).toEqual(['apotegma', 'versiculo']);
    expect(new Date(delDia[0]!.at).getHours()).toBeLessThan(12);
    expect(new Date(delDia[1]!.at).getHours()).toBeGreaterThanOrEqual(14);
  });
});

describe('la cola', () => {
  it('respeta la hora elegida y sólo lleva los activados', async () => {
    useSettings.getState().set('notifications', { santo: true });
    useSettings.getState().set('notificationTimes', { santo: '06:45' });
    const cola = await buildQueue(new Date(2026, 9, 20, 12, 0));
    expect(cola.length).toBeGreaterThan(0);
    expect(new Set(cola.map((c) => c.id))).toEqual(new Set(['santo']));
    const primero = new Date(cola[0]!.at);
    expect([primero.getHours(), primero.getMinutes()]).toEqual([6, 45]);
    // A las doce ya han pasado las 6:45: el primero es el del día siguiente.
    expect(cola[0]!.date).toBe('2026-10-21');
  });

  it('se guarda para el Service Worker al programar', async () => {
    useSettings.getState().set('notifications', { fiesta: true, regla: true });
    await refreshReminders();
    const cola = await getSetting<Array<{ id: string; needsApp?: boolean }>>(QUEUE_KEY, []);
    // «Lo que queda por rezar» va marcado: sólo la aplicación abierta sabe decidirlo.
    expect(cola.filter((c) => c.id === 'regla').every((c) => c.needsApp)).toBe(true);
  });

  it('cada recordatorio tiene una hora por defecto válida', () => {
    for (const r of REMINDERS) expect(timeFor(r.id, {})).toMatch(/^\d{2}:\d{2}$/);
  });
});
