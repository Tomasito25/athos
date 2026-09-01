/**
 * Las preferencias de aspecto.
 *
 * Todas se aplican escribiendo en el elemento raíz, y de ahí las lee el CSS.
 * Si una preferencia se guarda pero no llega al documento, el ajuste existe en
 * la pantalla de Configuración y no hace nada, que es peor que no tenerlo.
 */
import { beforeEach, describe, expect, it } from 'vitest';
import {
  DEFAULT_SETTINGS,
  DENSITY_SCALE,
  MEASURE_WIDTHS,
  applySettingsToDocument,
  type SettingsState,
} from '@/stores/settings';

const estado = (over: Partial<SettingsState> = {}): SettingsState =>
  ({
    ...DEFAULT_SETTINGS,
    ...over,
    set: () => {},
    toggleNotification: () => {},
    reset: () => {},
  }) as SettingsState;

beforeEach(() => {
  const root = document.documentElement;
  root.removeAttribute('data-ornaments');
  root.removeAttribute('data-dropcaps');
  root.removeAttribute('style');
});

describe('lo que llega al documento', () => {
  it('la densidad se convierte en un multiplicador del espaciado', () => {
    applySettingsToDocument(estado({ density: 'compacta' }));
    expect(document.documentElement.style.getPropertyValue('--user-space-scale')).toBe(
      String(DENSITY_SCALE.compacta),
    );
    applySettingsToDocument(estado({ density: 'comoda' }));
    expect(document.documentElement.style.getPropertyValue('--user-space-scale')).toBe(
      String(DENSITY_SCALE.comoda),
    );
  });

  it('el ancho de lectura sigue a la medida elegida', () => {
    applySettingsToDocument(estado({ measure: 'narrow' }));
    expect(document.documentElement.style.getPropertyValue('--measure')).toBe(
      MEASURE_WIDTHS.narrow,
    );
  });

  it('los ornamentos y la capitular se marcan y se quitan', () => {
    applySettingsToDocument(estado({ ornaments: true, dropCaps: true }));
    expect(document.documentElement.dataset.ornaments).toBe('si');
    expect(document.documentElement.dataset.dropcaps).toBe('si');

    applySettingsToDocument(estado({ ornaments: false, dropCaps: false }));
    expect(document.documentElement.dataset.ornaments).toBeUndefined();
    expect(document.documentElement.dataset.dropcaps).toBeUndefined();
  });

  it('el tamaño de letra y la densidad son ajustes distintos', () => {
    // Mezclarlos obligaría a elegir entre ver más texto y verlo más grande.
    applySettingsToDocument(estado({ fontScale: 1.4, density: 'compacta' }));
    const root = document.documentElement;
    expect(root.style.getPropertyValue('--user-font-scale')).toBe('1.4');
    expect(root.style.getPropertyValue('--user-space-scale')).toBe('0.85');
  });
});

describe('los valores de fábrica', () => {
  it('traen los ornamentos puestos: es el aspecto que la aplicación quiere tener', () => {
    expect(DEFAULT_SETTINGS.ornaments).toBe(true);
    expect(DEFAULT_SETTINGS.dropCaps).toBe(true);
  });

  it('abren por Inicio mientras nadie diga otra cosa', () => {
    expect(DEFAULT_SETTINGS.startAt).toBe('inicio');
  });

  it('la densidad normal no multiplica nada', () => {
    expect(DENSITY_SCALE.normal).toBe(1);
  });
});
