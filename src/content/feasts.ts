/**
 * Fiestas del año litúrgico.
 *
 * `paschaOffset` negativo = días antes de la Pascua siguiente (Triodio,
 * Cuaresma, Semana Santa). `paschaOffset` positivo o cero = días desde la
 * última Pascua (Pentecostario). `day` = fiesta fija `MM-DD` del calendario
 * eclesiástico.
 */
import type { Feast, SourceMeta } from '@/types';

const meta: SourceMeta = {
  source: 'Calendario litúrgico ortodoxo, uso común a las jurisdicciones bizantinas',
  tradition: 'Rito bizantino',
  language: 'es',
  license: 'traditional',
  dateAdded: '2026-01-01',
  notes: 'Nombres y rangos de las fiestas. Los textos propios de cada fiesta se incorporan por separado.',
};

export const MOVABLE_FEASTS: Feast[] = [
  { id: 'zaqueo', name: 'Domingo de Zaqueo', rank: 'menor', paschaOffset: -77, description: 'Anuncio del Triodio: el deseo de ver a Cristo.', status: 'complete', meta },
  { id: 'publicano-fariseo', name: 'Domingo del Publicano y el Fariseo', rank: 'menor', paschaOffset: -70, description: 'Se abre el Triodio. La humildad frente a la jactancia.', status: 'complete', meta },
  { id: 'hijo-prodigo', name: 'Domingo del Hijo Pródigo', rank: 'menor', paschaOffset: -63, description: 'El regreso a la casa del Padre.', status: 'complete', meta },
  { id: 'sabado-difuntos-carnaval', name: 'Sábado de Difuntos de Carnaval', rank: 'menor', paschaOffset: -57, description: 'Conmemoración universal de los difuntos.', status: 'complete', meta },
  { id: 'carnaval', name: 'Domingo de Carnaval', shortName: 'Juicio Final', rank: 'menor', paschaOffset: -56, description: 'Último día en que se come carne. Evangelio del Juicio Final.', status: 'complete', meta },
  { id: 'perdon', name: 'Domingo del Perdón', shortName: 'Domingo de Queso', rank: 'menor', paschaOffset: -49, description: 'Expulsión de Adán del Paraíso. Vísperas del Perdón.', status: 'complete', meta },
  { id: 'lunes-puro', name: 'Lunes Puro', rank: 'menor', paschaOffset: -48, description: 'Comienza la Gran Cuaresma.', status: 'complete', meta },
  { id: 'ortodoxia', name: 'Domingo de la Ortodoxia', rank: 'polieleo', paschaOffset: -42, description: 'Restauración de los santos iconos, año 843.', status: 'complete', meta },
  { id: 'palamas', name: 'Domingo de San Gregorio Palamás', rank: 'polieleo', paschaOffset: -35, description: 'Segundo domingo de Cuaresma.', status: 'complete', meta },
  { id: 'adoracion-cruz', name: 'Domingo de la Adoración de la Cruz', rank: 'polieleo', paschaOffset: -28, description: 'Mitad de la Cuaresma: la Cruz como sostén.', status: 'complete', meta },
  { id: 'juan-climaco', name: 'Domingo de San Juan Clímaco', rank: 'polieleo', paschaOffset: -21, description: 'Autor de La Escala Santa.', status: 'complete', meta },
  { id: 'maria-egipciaca', name: 'Domingo de Santa María Egipcíaca', rank: 'polieleo', paschaOffset: -14, description: 'Imagen del arrepentimiento sin límites.', status: 'complete', meta },
  { id: 'lazaro', name: 'Sábado de Lázaro', rank: 'vigilia', paschaOffset: -8, description: 'Resurrección de Lázaro, anticipo de la Pascua.', status: 'complete', meta },
  { id: 'ramos', name: 'Domingo de Ramos', shortName: 'Entrada en Jerusalén', rank: 'gran-fiesta', paschaOffset: -7, relaxesFast: true, description: 'Entrada del Señor en Jerusalén. Una de las Doce Grandes Fiestas.', status: 'complete', meta },
  { id: 'lunes-santo', name: 'Lunes Santo', rank: 'menor', paschaOffset: -6, description: 'José el Hermoso y la higuera seca.', status: 'complete', meta },
  { id: 'martes-santo', name: 'Martes Santo', rank: 'menor', paschaOffset: -5, description: 'Parábola de las diez vírgenes.', status: 'complete', meta },
  { id: 'miercoles-santo', name: 'Miércoles Santo', rank: 'menor', paschaOffset: -4, description: 'La mujer pecadora y la traición de Judas.', status: 'complete', meta },
  { id: 'jueves-santo', name: 'Jueves Santo', rank: 'vigilia', paschaOffset: -3, description: 'La Última Cena y el lavatorio de los pies.', status: 'complete', meta },
  { id: 'viernes-santo', name: 'Viernes Santo', rank: 'vigilia', paschaOffset: -2, description: 'Los santos y salvíficos Padecimientos. Descendimiento y sepultura.', status: 'complete', meta },
  { id: 'sabado-santo', name: 'Sábado Santo', rank: 'vigilia', paschaOffset: -1, description: 'El Señor reposa en el sepulcro y desciende al Hades.', status: 'complete', meta },
  { id: 'pascua', name: 'Santa y Gran Pascua', shortName: 'Pascua', rank: 'pascua', paschaOffset: 0, relaxesFast: true, description: 'Resurrección de nuestro Señor Jesucristo. Fiesta de las fiestas.', status: 'complete', meta },
  { id: 'lunes-renovacion', name: 'Lunes de la Renovación', rank: 'menor', paschaOffset: 1, relaxesFast: true, status: 'complete', meta },
  { id: 'viernes-fuente', name: 'Viernes de la Fuente Vivificante', rank: 'menor', paschaOffset: 5, relaxesFast: true, description: 'Icono de la Theotokos Zoodojos Pigí.', status: 'complete', meta },
  { id: 'tomas', name: 'Domingo de Tomás', shortName: 'Antipascua', rank: 'vigilia', paschaOffset: 7, relaxesFast: true, description: 'Renovación de la Pascua. «Señor mío y Dios mío».', status: 'complete', meta },
  { id: 'radonitsa', name: 'Radonitsa', rank: 'menor', paschaOffset: 9, description: 'Conmemoración pascual de los difuntos (tradición eslava).', status: 'complete', meta },
  { id: 'miroforas', name: 'Domingo de las Miróforas', rank: 'polieleo', paschaOffset: 14, description: 'Las mujeres portadoras de mirra, José de Arimatea y Nicodemo.', status: 'complete', meta },
  { id: 'paralitico', name: 'Domingo del Paralítico', rank: 'menor', paschaOffset: 21, status: 'complete', meta },
  { id: 'mitad-pentecostes', name: 'Mitad de Pentecostés', rank: 'menor', paschaOffset: 25, status: 'complete', meta },
  { id: 'samaritana', name: 'Domingo de la Samaritana', rank: 'menor', paschaOffset: 28, description: 'Santa Fotini junto al pozo de Jacob.', status: 'complete', meta },
  { id: 'ciego', name: 'Domingo del Ciego de nacimiento', rank: 'menor', paschaOffset: 35, status: 'complete', meta },
  { id: 'ascension', name: 'Ascensión del Señor', rank: 'gran-fiesta', paschaOffset: 39, relaxesFast: true, description: 'Cuarenta días después de la Pascua. Una de las Doce Grandes Fiestas.', status: 'complete', meta },
  { id: 'padres-nicea', name: 'Domingo de los Padres del I Concilio Ecuménico', rank: 'polieleo', paschaOffset: 42, description: 'Los 318 Padres de Nicea, año 325.', status: 'complete', meta },
  { id: 'sabado-difuntos-pentecostes', name: 'Sábado de Difuntos de Pentecostés', rank: 'menor', paschaOffset: 48, status: 'complete', meta },
  { id: 'pentecostes', name: 'Santa Pentecostés', rank: 'gran-fiesta', paschaOffset: 49, relaxesFast: true, description: 'Descenso del Espíritu Santo. Una de las Doce Grandes Fiestas.', status: 'complete', meta },
  { id: 'espiritu-santo', name: 'Lunes del Espíritu Santo', rank: 'polieleo', paschaOffset: 50, relaxesFast: true, status: 'complete', meta },
  { id: 'todos-los-santos', name: 'Domingo de Todos los Santos', rank: 'polieleo', paschaOffset: 56, description: 'Cierre del Pentecostario.', status: 'complete', meta },
];

export const FIXED_FEASTS: Feast[] = [
  { id: 'circuncision', name: 'Circuncisión del Señor · San Basilio el Grande', rank: 'fiesta-del-senor', day: '01-01', relaxesFast: true, status: 'complete', meta },
  { id: 'teofania', name: 'Santa Teofanía · Bautismo del Señor', shortName: 'Teofanía', rank: 'gran-fiesta', day: '01-06', relaxesFast: true, description: 'Una de las Doce Grandes Fiestas. Gran bendición de las aguas.', status: 'complete', meta },
  { id: 'sinaxis-bautista', name: 'Sinaxis de San Juan Bautista', rank: 'polieleo', day: '01-07', status: 'complete', meta },
  { id: 'tres-jerarcas', name: 'Los Tres Santos Jerarcas', rank: 'polieleo', day: '01-30', relaxesFast: true, description: 'Basilio el Grande, Gregorio el Teólogo y Juan Crisóstomo.', status: 'complete', meta },
  { id: 'encuentro', name: 'Encuentro del Señor en el Templo', shortName: 'Hypapante', rank: 'gran-fiesta', day: '02-02', relaxesFast: true, description: 'Una de las Doce Grandes Fiestas.', status: 'complete', meta },
  { id: 'anunciacion', name: 'Anunciación de la Santísima Theotokos', shortName: 'Anunciación', rank: 'gran-fiesta', day: '03-25', relaxesFast: true, description: 'Una de las Doce Grandes Fiestas.', status: 'complete', meta },
  { id: 'jorge', name: 'San Jorge el Trofeóforo', rank: 'polieleo', day: '04-23', status: 'complete', meta },
  { id: 'constantino-elena', name: 'Santos Constantino y Elena, iguales a los Apóstoles', rank: 'polieleo', day: '05-21', status: 'complete', meta },
  { id: 'natividad-bautista', name: 'Natividad de San Juan Bautista', rank: 'polieleo', day: '06-24', relaxesFast: true, status: 'complete', meta },
  { id: 'pedro-pablo', name: 'Santos Apóstoles Pedro y Pablo', rank: 'polieleo', day: '06-29', relaxesFast: true, description: 'Cierra el Ayuno de los Apóstoles.', status: 'complete', meta },
  { id: 'sinaxis-apostoles', name: 'Sinaxis de los Doce Apóstoles', rank: 'menor', day: '06-30', status: 'complete', meta },
  { id: 'elias', name: 'Santo Profeta Elías', rank: 'polieleo', day: '07-20', status: 'complete', meta },
  { id: 'procesion-cruz', name: 'Procesión de la Preciosa Cruz', rank: 'menor', day: '08-01', description: 'Comienza el Ayuno de la Dormición.', status: 'complete', meta },
  { id: 'transfiguracion', name: 'Transfiguración del Señor', rank: 'gran-fiesta', day: '08-06', relaxesFast: true, description: 'Una de las Doce Grandes Fiestas. Bendición de las uvas.', status: 'complete', meta },
  { id: 'dormicion', name: 'Dormición de la Santísima Theotokos', shortName: 'Dormición', rank: 'gran-fiesta', day: '08-15', relaxesFast: true, description: 'Una de las Doce Grandes Fiestas.', status: 'complete', meta },
  { id: 'degollacion', name: 'Degollación de San Juan Bautista', rank: 'polieleo', day: '08-29', status: 'complete', meta },
  { id: 'indiccion', name: 'Comienzo del año eclesiástico · Indicción', rank: 'menor', day: '09-01', status: 'complete', meta },
  { id: 'natividad-theotokos', name: 'Natividad de la Santísima Theotokos', rank: 'gran-fiesta', day: '09-08', relaxesFast: true, description: 'Primera de las Doce Grandes Fiestas del año eclesiástico.', status: 'complete', meta },
  { id: 'exaltacion', name: 'Exaltación de la Preciosa y Vivificante Cruz', shortName: 'Exaltación de la Cruz', rank: 'gran-fiesta', day: '09-14', description: 'Una de las Doce Grandes Fiestas. Día de ayuno estricto.', status: 'complete', meta },
  { id: 'juan-teologo', name: 'Dormición de San Juan el Teólogo', rank: 'polieleo', day: '09-26', status: 'complete', meta },
  { id: 'proteccion', name: 'Protección de la Santísima Theotokos', shortName: 'Pokrov', rank: 'polieleo', day: '10-01', relaxesFast: true, status: 'complete', meta },
  { id: 'demetrio', name: 'San Demetrio de Tesalónica', rank: 'polieleo', day: '10-26', status: 'complete', meta },
  { id: 'sinaxis-miguel', name: 'Sinaxis del Arcángel Miguel y todas las Potestades celestiales', rank: 'polieleo', day: '11-08', relaxesFast: true, status: 'complete', meta },
  { id: 'crisostomo', name: 'San Juan Crisóstomo', rank: 'polieleo', day: '11-13', status: 'complete', meta },
  { id: 'inicio-ayuno-natividad', name: 'Comienzo del Ayuno de la Natividad', rank: 'menor', day: '11-15', status: 'complete', meta },
  { id: 'entrada-theotokos', name: 'Entrada de la Theotokos en el Templo', rank: 'gran-fiesta', day: '11-21', relaxesFast: true, description: 'Una de las Doce Grandes Fiestas.', status: 'complete', meta },
  { id: 'andres', name: 'San Andrés el Primer Llamado', rank: 'polieleo', day: '11-30', relaxesFast: true, status: 'complete', meta },
  { id: 'nicolas', name: 'San Nicolás de Mira', rank: 'polieleo', day: '12-06', relaxesFast: true, status: 'complete', meta },
  { id: 'natividad', name: 'Natividad según la carne de nuestro Señor Jesucristo', shortName: 'Natividad', rank: 'gran-fiesta', day: '12-25', relaxesFast: true, description: 'Una de las Doce Grandes Fiestas.', status: 'complete', meta },
  { id: 'sinaxis-theotokos', name: 'Sinaxis de la Santísima Theotokos', rank: 'menor', day: '12-26', status: 'complete', meta },
  { id: 'esteban', name: 'San Esteban Protomártir', rank: 'polieleo', day: '12-27', status: 'complete', meta },
];

/** Las Doce Grandes Fiestas, más la Pascua, que está por encima de ellas. */
export const GREAT_FEAST_IDS = [
  'natividad-theotokos',
  'exaltacion',
  'entrada-theotokos',
  'natividad',
  'teofania',
  'encuentro',
  'anunciacion',
  'ramos',
  'ascension',
  'pentecostes',
  'transfiguracion',
  'dormicion',
];

export const ALL_FEASTS: Feast[] = [...MOVABLE_FEASTS, ...FIXED_FEASTS];
