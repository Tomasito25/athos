/**
 * Los nombres para la oración: vivos y difuntos.
 *
 * Se guardan en el dispositivo, salen en su sitio dentro de la conmemoración,
 * entran en la copia de seguridad y avisan el día del santo de cada uno.
 */
import { beforeAll, describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { db } from '@/db/db';
import { seedContent } from '@/db/seed';
import { deleteDiptych, listDiptychs, saveDiptych } from '@/db/user';
import { exportBackup, importBackup } from '@/db/backup';
import { reminderContent } from '@/lib/reminders';
import { PRAYERS } from '@/content/prayers';
import Commemoration from '@/components/office/Commemoration';

beforeAll(async () => {
  await db.delete();
  await db.open();
  await seedContent();
});

const ajustes = {
  calendarStyle: 'nuevo' as const,
  officeLength: { manana: 'habitual', mediodia: 'habitual', noche: 'habitual' } as const,
};

describe('la lista', () => {
  it('guarda, ordena y borra', async () => {
    const juan = await saveDiptych({ name: ' Juan ', list: 'vivos' });
    await saveDiptych({ name: 'María', list: 'difuntos', note: 'mi abuela' });
    expect((await listDiptychs('vivos')).map((n) => n.name)).toEqual(['Juan']);
    expect((await listDiptychs('difuntos'))[0]?.note).toBe('mi abuela');
    await deleteDiptych(juan.id);
    expect(await listDiptychs('vivos')).toEqual([]);
  });

  it('sale en la conmemoración, en su sitio', async () => {
    await saveDiptych({ name: 'Pedro', list: 'vivos' });
    render(
      <MemoryRouter>
        <Commemoration list="vivos" />
      </MemoryRouter>,
    );
    expect(await screen.findByText(/Pedro/)).toBeInTheDocument();
  });

  it('las oraciones de conmemoración y la panihida la llevan', () => {
    for (const id of ['por-los-vivos', 'por-los-difuntos', 'por-los-padres-difuntos', 'panihida-ficha']) {
      const oracion = PRAYERS.find((p) => p.id === id);
      expect(oracion?.blocks.some((b) => b.kind === 'commemoration'), id).toBe(true);
    }
  });

  it('entra en la copia de seguridad y vuelve con ella', async () => {
    const copia = await exportBackup();
    expect(copia.data.diptychs?.length).toBeGreaterThan(0);
    await db.diptychs.clear();
    await importBackup(copia);
    expect((await listDiptychs()).length).toBe(copia.data.diptychs!.length);
  });

  it('avisa el día del santo de un nombre', async () => {
    // San Basilio el Grande: 1 de enero.
    await saveDiptych({ name: 'Basilio', list: 'vivos', saintId: 'basilio-magno' });
    const aviso = await reminderContent('onomastica', '2027-01-01', ajustes);
    expect(aviso?.title).toMatch(/Basilio/);
    expect(aviso?.body).toMatch(/Basilio/);
    expect(await reminderContent('onomastica', '2027-01-02', ajustes)).toBeNull();
  });
});
