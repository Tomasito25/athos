/**
 * Los Padres, los himnos y los oficios: que enseñen algo aunque falte el texto.
 *
 * La regla del proyecto impide inventar textos litúrgicos, así que muchas
 * fichas seguirán pendientes durante mucho tiempo. Lo que no puede pasar es
 * que una ficha pendiente sea una pantalla muda: al menos tiene que decir qué
 * es eso que falta, cómo está hecho y qué dice.
 */
import { describe, expect, it } from 'vitest';
import { CHURCH_FATHERS } from '@/content/fathers';
import { AKATHISTS, CANONS } from '@/content/hymns';
import { OFFICES } from '@/content/offices';

describe('los Padres dicen qué enseñaron', () => {
  it('todos tienen doctrina escrita, no sólo biografía', () => {
    for (const padre of CHURCH_FATHERS) {
      expect(padre.teaching.length, `${padre.name} sin doctrina`).toBeGreaterThanOrEqual(3);
      for (const parrafo of padre.teaching) {
        expect(parrafo.length, `${padre.name}: párrafo demasiado corto`).toBeGreaterThan(120);
      }
    }
  });

  it('la doctrina dice qué sostuvo, no sólo que fue importante', () => {
    // Un párrafo que no contiene ningún verbo de afirmación es una alabanza,
    // no una enseñanza.
    for (const padre of CHURCH_FATHERS) {
      const texto = padre.teaching.join(' ').toLowerCase();
      expect(
        /\bque\b/.test(texto),
        `${padre.name}: la doctrina no afirma nada concreto`,
      ).toBe(true);
    }
  });

  it('cada uno dice por dónde empezar a leerlo', () => {
    for (const padre of CHURCH_FATHERS) {
      expect(padre.reading, `${padre.name} sin guía de lectura`).toBeTruthy();
      expect((padre.reading ?? '').length).toBeGreaterThan(60);
    }
  });

  it('toda obra dice de qué trata, tenga texto o no', () => {
    for (const padre of CHURCH_FATHERS) {
      for (const obra of padre.works) {
        expect(obra.summary, `${padre.name} · ${obra.title}: sin resumen`).toBeTruthy();
        expect((obra.summary ?? '').length, `${obra.title}: resumen escueto`).toBeGreaterThan(150);
      }
    }
  });

  it('las obras pendientes son precisamente las que más lo necesitan', () => {
    // Si una obra no tiene texto, su resumen es lo único que el lector recibe.
    const pendientes = CHURCH_FATHERS.flatMap((p) => p.works).filter((w) => w.status === 'pending');
    expect(pendientes.length, 'no hay obras pendientes que comprobar').toBeGreaterThan(5);
    for (const obra of pendientes) {
      expect((obra.summary ?? '').length, `${obra.title}`).toBeGreaterThan(150);
    }
  });

  it('lo redactado por ATHOS no se confunde con lo patrístico', () => {
    // La doctrina y los resúmenes son prosa de ATHOS; los pasajes, de los
    // Padres. Las fichas lo distinguen por la licencia.
    for (const padre of CHURCH_FATHERS) {
      expect(padre.meta.license, padre.name).toBe('cc-by-sa-4.0');
      expect(padre.meta.source).toMatch(/redactada para ATHOS/i);
    }
  });
});

describe('los himnos dicen qué son', () => {
  const todos = [...AKATHISTS, ...CANONS];

  it('todos explican qué son y cómo están construidos', () => {
    for (const himno of todos) {
      expect(himno.about, `${himno.title}: sin explicación`).toBeTruthy();
      expect((himno.about ?? '').length, himno.title).toBeGreaterThan(200);
      expect(himno.structure, `${himno.title}: sin estructura`).toBeTruthy();
    }
  });

  it('los pendientes también, que son los que dependen de esto', () => {
    const pendientes = todos.filter((h) => h.status === 'pending');
    expect(pendientes.length).toBeGreaterThan(2);
    for (const himno of pendientes) {
      expect((himno.about ?? '').length, himno.title).toBeGreaterThan(200);
    }
  });

  it('explican cuándo se usan, no sólo qué dicen', () => {
    for (const himno of todos) {
      const texto = `${himno.about} ${himno.structure}`.toLowerCase();
      expect(
        /cuaresma|pascua|domingo|jueves|viernes|sábado|noche|tarde|agosto|diciembre|año|día|semana|siempre|cualquier/.test(
          texto,
        ),
        `${himno.title}: no dice cuándo se usa`,
      ).toBe(true);
    }
  });
});

describe('los oficios dicen qué son', () => {
  it('la Divina Liturgia y los demás oficios se explican', () => {
    const explicados = OFFICES.filter((o) => o.about);
    expect(explicados.length, 'faltan oficios por explicar').toBeGreaterThanOrEqual(10);
    for (const oficio of explicados) {
      expect((oficio.about ?? '').length, oficio.title).toBeGreaterThan(200);
      expect(oficio.structure, `${oficio.title}: sin estructura`).toBeTruthy();
    }
  });

  it('las dos Liturgias explican en qué se diferencian', () => {
    const crisostomo = OFFICES.find((o) => o.id === 'liturgia-crisostomo');
    const basilio = OFFICES.find((o) => o.id === 'liturgia-basilio');
    expect(crisostomo?.about).toBeTruthy();
    expect(basilio?.about).toMatch(/diez veces|Cuaresma/i);
    // Y los Presantificados, que no consagran, lo dicen.
    const presantificados = OFFICES.find((o) => o.id === 'presantificados');
    expect(presantificados?.about).toMatch(/no se consagra|consagrados/i);
  });
});
