/**
 * Al calendario del teléfono.
 *
 * Con ATHOS cerrada, los recordatorios no son fiables: en Android dependen de
 * Chrome y en iPhone no llegan nunca. Sin servidor, lo único que avisa siempre
 * es el calendario del propio teléfono, y por eso se exportan a un archivo
 * .ics. El formato es estricto y los teléfonos no perdonan: hay que probarlo.
 */
import { beforeAll, describe, expect, it } from 'vitest';
import { calendarFile, feastAndFastEvents, reminderEvents } from '@/lib/ics';
import { db } from '@/db/db';
import { seedContent } from '@/db/seed';

beforeAll(async () => {
  await db.delete();
  await db.open();
  await seedContent();
});

const lineasDe = (ics: string) => ics.replace(/\r\n /g, '').split('\r\n');

describe('el formato', () => {
  const ics = calendarFile(
    'Prueba',
    [
      {
        uid: 'x',
        titulo: 'San Juan, el Teólogo; apóstol',
        descripcion: 'Una línea\ny otra, bastante más larga para que haya que partirla en varios trozos de setenta y cinco octetos',
        dia: '2026-09-26',
      },
    ],
    new Date('2026-10-19T08:00:00Z'),
  );

  it('usa CRLF y ninguna línea pasa de 75 octetos', () => {
    expect(ics).toContain('\r\n');
    expect(ics.replace(/\r\n/g, '')).not.toContain('\n');
    for (const linea of ics.split('\r\n')) {
      expect(new TextEncoder().encode(linea).length, linea).toBeLessThanOrEqual(75);
    }
  });

  it('escapa comas, puntos y comas y saltos de línea', () => {
    const lineas = lineasDe(ics);
    expect(lineas).toContain('SUMMARY:San Juan\\, el Teólogo\\; apóstol');
    expect(lineas.find((l) => l.startsWith('DESCRIPTION:'))).toContain('Una línea\\ny otra\\, bastante');
  });

  it('un día entero acaba al día siguiente, como manda el formato', () => {
    const lineas = lineasDe(ics);
    expect(lineas).toContain('DTSTART;VALUE=DATE:20260926');
    expect(lineas).toContain('DTEND;VALUE=DATE:20260927');
    expect(lineas[0]).toBe('BEGIN:VCALENDAR');
    expect(lineas.at(-2)).toBe('END:VCALENDAR');
  });
});

describe('fiestas y ayunos', () => {
  const eventos = feastAndFastEvents('nuevo', '2027-01-01', 365);

  it('trae la Pascua de 2027 en su día', () => {
    // La Pascua ortodoxa de 2027 cae el 2 de mayo.
    expect(eventos.some((e) => e.dia === '2027-05-02' && /Pascua/i.test(e.titulo))).toBe(true);
  });

  it('cada periodo de ayuno es un solo evento de varios días', () => {
    const cuaresma = eventos.filter((e) => /Cuaresma/i.test(e.titulo));
    expect(cuaresma.length).toBeGreaterThan(0);
    expect(Math.max(...cuaresma.map((e) => e.dias ?? 1))).toBeGreaterThan(30);
  });

  it('no llena el calendario con los miércoles y los viernes', () => {
    expect(eventos.length).toBeLessThan(60);
  });
});

describe('los avisos', () => {
  const ajustes = {
    calendarStyle: 'nuevo' as const,
    officeLength: { manana: 'habitual', mediodia: 'habitual', noche: 'habitual' } as const,
    notifications: { 'oracion-manana': true, santo: true, regla: true },
    notificationTimes: { 'oracion-manana': '06:45' },
  };

  it('el oficio se repite cada día a la hora elegida, con alarma', async () => {
    const eventos = await reminderEvents(ajustes, '2026-10-19', 3);
    const manana = eventos.find((e) => e.uid === 'oracion-manana');
    expect(manana?.diario).toBe(true);
    expect(manana?.inicio).toEqual({ iso: '2026-10-19', hora: '06:45' });
    const ics = lineasDe(calendarFile('Avisos', eventos));
    expect(ics).toContain('RRULE:FREQ=DAILY');
    expect(ics).toContain('DTSTART:20261019T064500');
    expect(ics).toContain('BEGIN:VALARM');
  });

  it('el santo se escribe día por día, con su nombre', async () => {
    const eventos = await reminderEvents(ajustes, '2026-10-19', 3);
    const santos = eventos.filter((e) => e.uid.startsWith('santo-'));
    expect(santos).toHaveLength(3);
    expect(santos.every((e) => e.descripcion && e.descripcion.length > 3)).toBe(true);
  });

  it('no exporta lo que sólo sabe ATHOS abierta', async () => {
    const eventos = await reminderEvents(ajustes, '2026-10-19', 3);
    expect(eventos.some((e) => e.uid.startsWith('regla'))).toBe(false);
  });
});
