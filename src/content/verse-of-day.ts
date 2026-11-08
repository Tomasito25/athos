/**
 * El versículo del día.
 *
 * ATHOS no escribe aquí ni una palabra de Escritura: pone **sólo la
 * referencia**, y el texto lo saca de la Biblia que la aplicación ya lleva
 * dentro —Reina-Valera de 1909, dominio público— por el mismo camino que las
 * lecturas del día. Elegir qué versículo se lee un martes es una decisión
 * editorial y se puede tomar; transcribir el versículo de memoria, no.
 *
 * La lista es de versos breves y que se sostienen solos: la idea es llevarse
 * uno en la cabeza durante el día, no empezar una lectura. Por eso casi todos
 * son de uno o dos versículos, y se evitan los que empiezan a media frase.
 *
 * El reparto es por día del año, así que el versículo de un día concreto es
 * siempre el mismo: quien lo recuerda al día siguiente lo puede volver a
 * encontrar, y dos personas que hablan del versículo de hoy hablan del mismo.
 */

/**
 * Las referencias, en el formato que entiende `parsePassage`.
 *
 * Son ciento treinta y cinco: bastantes para que un año no se repita más de tres
 * veces, y pocas para que cada una esté elegida y no rellenada.
 */
export const VERSES_OF_DAY: string[] = [
  /* ---- Los Evangelios ---- */
  'Mateo 5, 8',
  'Mateo 5, 16',
  'Mateo 6, 21',
  'Mateo 6, 33',
  'Mateo 7, 7',
  'Mateo 11, 28',
  'Mateo 11, 29',
  'Mateo 16, 24',
  'Mateo 18, 20',
  'Mateo 19, 26',
  'Mateo 22, 37-38',
  'Mateo 25, 40',
  'Mateo 28, 20',
  'Marcos 8, 36',
  'Marcos 9, 24',
  'Marcos 10, 27',
  'Marcos 10, 45',
  'Marcos 11, 24',
  'Marcos 12, 30-31',
  'Lucas 1, 37',
  'Lucas 6, 36',
  'Lucas 6, 37',
  'Lucas 9, 23',
  'Lucas 10, 42',
  'Lucas 11, 28',
  'Lucas 12, 34',
  'Lucas 17, 21',
  'Lucas 18, 13',
  'Lucas 21, 19',
  'Lucas 23, 34',
  'Juan 1, 5',
  'Juan 1, 14',
  'Juan 3, 16',
  'Juan 4, 24',
  'Juan 6, 35',
  'Juan 8, 12',
  'Juan 8, 32',
  'Juan 10, 10',
  'Juan 11, 25',
  'Juan 13, 34',
  'Juan 14, 6',
  'Juan 14, 27',
  'Juan 15, 5',
  'Juan 15, 12',
  'Juan 16, 33',
  'Juan 17, 3',
  'Juan 20, 29',

  /* ---- Los Salmos ---- */
  'Salmos 1, 1',
  'Salmos 4, 4',
  'Salmos 16, 8',
  'Salmos 18, 2',
  'Salmos 19, 1',
  'Salmos 23, 1',
  'Salmos 23, 4',
  'Salmos 27, 1',
  'Salmos 27, 14',
  'Salmos 31, 24',
  'Salmos 34, 8',
  'Salmos 34, 18',
  'Salmos 37, 5',
  'Salmos 42, 1',
  'Salmos 46, 10',
  'Salmos 51, 10',
  'Salmos 51, 17',
  'Salmos 55, 22',
  'Salmos 62, 1',
  'Salmos 63, 1',
  'Salmos 73, 26',
  'Salmos 84, 10',
  'Salmos 90, 12',
  'Salmos 91, 1',
  'Salmos 103, 8',
  'Salmos 103, 12',
  'Salmos 118, 24',
  'Salmos 119, 105',
  'Salmos 121, 1-2',
  'Salmos 126, 5',
  'Salmos 130, 1',
  'Salmos 133, 1',
  'Salmos 139, 7',
  'Salmos 139, 23-24',
  'Salmos 141, 3',
  'Salmos 143, 8',
  'Salmos 145, 18',
  'Salmos 147, 3',

  /* ---- Las cartas ---- */
  'Romanos 5, 8',
  'Romanos 8, 28',
  'Romanos 8, 38-39',
  'Romanos 12, 12',
  'Romanos 12, 21',
  'Romanos 15, 13',
  '1 Corintios 10, 13',
  '1 Corintios 13, 4',
  '1 Corintios 13, 13',
  '1 Corintios 16, 14',
  '2 Corintios 4, 18',
  '2 Corintios 5, 17',
  '2 Corintios 12, 9',
  'Gálatas 2, 20',
  'Gálatas 5, 22-23',
  'Gálatas 6, 2',
  'Efesios 2, 8',
  'Efesios 4, 2',
  'Efesios 4, 32',
  'Efesios 6, 11',
  'Filipenses 1, 21',
  'Filipenses 2, 3',
  'Filipenses 4, 4',
  'Filipenses 4, 6-7',
  'Filipenses 4, 13',
  'Colosenses 3, 12',
  'Colosenses 3, 15',
  '1 Tesalonicenses 5, 16-18',
  '2 Timoteo 1, 7',
  'Hebreos 11, 1',
  'Hebreos 12, 1',
  'Hebreos 13, 8',
  'Santiago 1, 2-3',
  'Santiago 1, 19',
  'Santiago 4, 8',
  '1 Pedro 5, 7',
  '1 Juan 1, 9',
  '1 Juan 4, 8',
  '1 Juan 4, 18',
  '1 Juan 4, 19',

  /* ---- El Antiguo Testamento ---- */
  'Deuteronomio 31, 6',
  'Josué 1, 9',
  'Proverbios 3, 5-6',
  'Isaías 40, 31',
  'Isaías 41, 10',
  'Isaías 43, 1',
  'Jeremías 29, 11',
  'Lamentaciones 3, 22-23',
  'Miqueas 6, 8',
  'Sofonías 3, 17',
];

/** Día del año, de 1 a 366, en hora local. */
function dayOfYear(date: Date): number {
  const inicio = Date.UTC(date.getFullYear(), 0, 1);
  const hoy = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
  return Math.floor((hoy - inicio) / 86_400_000) + 1;
}

/**
 * La referencia que toca hoy.
 *
 * El año entra en la cuenta para que la lista no empiece siempre por el mismo
 * versículo cada 1 de enero; el día del año manda, así que dentro de un mismo
 * año la sucesión es estable y no depende de la hora a la que se abra.
 */
export function verseReferenceFor(date: Date): string {
  const indice = (dayOfYear(date) - 1 + date.getFullYear()) % VERSES_OF_DAY.length;
  return VERSES_OF_DAY[indice]!;
}
