/**
 * Leccionario — lecturas del día.
 *
 * ATHOS incorpora únicamente las perícopas que se han podido verificar. El
 * ciclo diario completo (Octoecos + Menaion) es muy extenso y no se inventa:
 * los días sin entrada muestran «Contenido pendiente de incorporar» y pueden
 * completarse importando una tabla desde Configuración → Datos.
 *
 * Clave `pascha:{offset}` para el ciclo móvil y `fixed:{MM-DD}` para el fijo.
 */
import type { LiturgicalReading, SourceMeta } from '@/types';

const meta: SourceMeta = {
  source: 'Leccionario bizantino (Evangeliario y Apóstol), perícopas de uso común',
  tradition: 'Rito bizantino',
  language: 'es',
  license: 'traditional',
  dateAdded: '2026-01-01',
  notes: 'Se indican las referencias; el texto se muestra si la traducción correspondiente está incorporada.',
};

const r = (key: string, title: string, epistola: string, evangelio: string): LiturgicalReading => ({
  id: key,
  key,
  title,
  readings: [
    { kind: 'epistola', reference: epistola },
    { kind: 'evangelio', reference: evangelio },
  ],
  status: 'complete',
  meta,
});

/** Ciclo móvil: Triodio, Cuaresma, Semana Santa y Pentecostario. */
export const MOVABLE_READINGS: LiturgicalReading[] = [
  r('pascha:-77', 'Domingo de Zaqueo', '1 Timoteo 4, 9-15', 'Lucas 19, 1-10'),
  r('pascha:-70', 'Domingo del Publicano y el Fariseo', '2 Timoteo 3, 10-15', 'Lucas 18, 10-14'),
  r('pascha:-63', 'Domingo del Hijo Pródigo', '1 Corintios 6, 12-20', 'Lucas 15, 11-32'),
  r('pascha:-57', 'Sábado de Difuntos de Carnaval', '1 Corintios 10, 23-28', 'Lucas 21, 8-9. 25-27. 33-36'),
  r('pascha:-56', 'Domingo de Carnaval · Juicio Final', '1 Corintios 8, 8 – 9, 2', 'Mateo 25, 31-46'),
  r('pascha:-49', 'Domingo del Perdón', 'Romanos 13, 11 – 14, 4', 'Mateo 6, 14-21'),
  r('pascha:-42', 'Domingo de la Ortodoxia', 'Hebreos 11, 24-26. 32 – 12, 2', 'Juan 1, 43-51'),
  r('pascha:-35', 'Domingo de San Gregorio Palamás', 'Hebreos 1, 10 – 2, 3', 'Marcos 2, 1-12'),
  r('pascha:-28', 'Domingo de la Adoración de la Cruz', 'Hebreos 4, 14 – 5, 6', 'Marcos 8, 34 – 9, 1'),
  r('pascha:-21', 'Domingo de San Juan Clímaco', 'Hebreos 6, 13-20', 'Marcos 9, 17-31'),
  r('pascha:-14', 'Domingo de Santa María Egipcíaca', 'Hebreos 9, 11-14', 'Marcos 10, 32-45'),
  r('pascha:-8', 'Sábado de Lázaro', 'Hebreos 12, 28 – 13, 8', 'Juan 11, 1-45'),
  r('pascha:-7', 'Domingo de Ramos', 'Filipenses 4, 4-9', 'Juan 12, 1-18'),
  r('pascha:-2', 'Viernes Santo · Vísperas', '1 Corintios 1, 18-31; 2, 1-2', 'Mateo 27, 1-38; Lucas 23, 39-43; Mateo 27, 39-54; Juan 19, 31-37; Mateo 27, 55-61'),
  r('pascha:-1', 'Sábado Santo', 'Romanos 6, 3-11', 'Mateo 28, 1-20'),
  r('pascha:0', 'Santa y Gran Pascua', 'Hechos 1, 1-8', 'Juan 1, 1-17'),
  r('pascha:1', 'Lunes de la Renovación', 'Hechos 1, 12-17. 21-26', 'Juan 1, 18-28'),
  r('pascha:7', 'Domingo de Tomás', 'Hechos 5, 12-20', 'Juan 20, 19-31'),
  r('pascha:14', 'Domingo de las Miróforas', 'Hechos 6, 1-7', 'Marcos 15, 43 – 16, 8'),
  r('pascha:21', 'Domingo del Paralítico', 'Hechos 9, 32-42', 'Juan 5, 1-15'),
  r('pascha:25', 'Mitad de Pentecostés', 'Hechos 14, 6-18', 'Juan 7, 14-30'),
  r('pascha:28', 'Domingo de la Samaritana', 'Hechos 11, 19-30', 'Juan 4, 5-42'),
  r('pascha:35', 'Domingo del Ciego de nacimiento', 'Hechos 16, 16-34', 'Juan 9, 1-38'),
  r('pascha:39', 'Ascensión del Señor', 'Hechos 1, 1-12', 'Lucas 24, 36-53'),
  r('pascha:42', 'Domingo de los Padres del I Concilio', 'Hechos 20, 16-18. 28-36', 'Juan 17, 1-13'),
  r('pascha:49', 'Santa Pentecostés', 'Hechos 2, 1-11', 'Juan 7, 37-52; 8, 12'),
  r('pascha:56', 'Domingo de Todos los Santos', 'Hebreos 11, 33 – 12, 2', 'Mateo 10, 32-33. 37-38; 19, 27-30'),
];

/** Ciclo fijo: grandes fiestas del Menaion. */
export const FIXED_READINGS: LiturgicalReading[] = [
  r('fixed:01-01', 'Circuncisión del Señor · San Basilio', 'Colosenses 2, 8-12', 'Lucas 2, 20-21. 40-52'),
  r('fixed:01-06', 'Santa Teofanía', 'Tito 2, 11-14; 3, 4-7', 'Mateo 3, 13-17'),
  r('fixed:02-02', 'Encuentro del Señor', 'Hebreos 7, 7-17', 'Lucas 2, 22-40'),
  r('fixed:03-25', 'Anunciación de la Theotokos', 'Hebreos 2, 11-18', 'Lucas 1, 24-38'),
  r('fixed:06-29', 'Santos Apóstoles Pedro y Pablo', '2 Corintios 11, 21 – 12, 9', 'Mateo 16, 13-19'),
  r('fixed:08-06', 'Transfiguración del Señor', '2 Pedro 1, 10-19', 'Mateo 17, 1-9'),
  r('fixed:08-15', 'Dormición de la Theotokos', 'Filipenses 2, 5-11', 'Lucas 10, 38-42; 11, 27-28'),
  r('fixed:09-08', 'Natividad de la Theotokos', 'Filipenses 2, 5-11', 'Lucas 10, 38-42; 11, 27-28'),
  r('fixed:09-14', 'Exaltación de la Cruz', '1 Corintios 1, 18-24', 'Juan 19, 6-11. 13-20. 25-28. 30-35'),
  r('fixed:11-21', 'Entrada de la Theotokos en el Templo', 'Hebreos 9, 1-7', 'Lucas 10, 38-42; 11, 27-28'),
  r('fixed:12-25', 'Natividad de Cristo', 'Gálatas 4, 4-7', 'Mateo 2, 1-12'),
];

const byKey = new Map<string, LiturgicalReading>();
for (const entry of [...MOVABLE_READINGS, ...FIXED_READINGS]) byKey.set(entry.key, entry);

export function findReading(paschaOffset: number, nextPaschaOffset: number, monthDay: string): LiturgicalReading | null {
  return (
    byKey.get(`fixed:${monthDay}`) ??
    byKey.get(`pascha:${nextPaschaOffset}`) ??
    byKey.get(`pascha:${paschaOffset}`) ??
    null
  );
}

export const LECTIONARY_COVERAGE_NOTE =
  'ATHOS incorpora las perícopas verificadas del ciclo móvil y de las grandes fiestas. ' +
  'El ciclo diario completo puede añadirse desde Configuración → Datos.';
