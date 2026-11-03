/**
 * Los momentos del libro de oraciones, sin las oraciones.
 *
 * La portada de Orar y sus listas sólo necesitan los nombres, no los textos.
 * Antes vivían en `prayers.ts`, y para pintar treinta y dos títulos había que
 * descargar el libro entero: por eso van aparte.
 */
import type { PrayerCategory, PrayerCategoryId, VirtueId } from '@/types';

export const PRAYER_CATEGORIES: PrayerCategory[] = [
  /* ---- El día ---- */
  { id: 'manana', name: 'Al despertar', description: 'Lo primero, antes que el día empiece a tirar de ti.', order: 1 },
  { id: 'salir-de-casa', name: 'Al salir de casa', description: 'En el umbral, antes de echarse a la calle.', order: 2 },
  { id: 'antes-trabajar', name: 'Antes de trabajar', description: 'Para ofrecer la obra de las manos, y para darla por acabada.', order: 3 },
  { id: 'antes-estudiar', name: 'Antes de estudiar', description: 'Para pedir luz al entendimiento.', order: 4 },
  { id: 'antes-comer', name: 'Antes de comer', description: 'Bendición de la mesa.', order: 5 },
  { id: 'despues-comer', name: 'Después de comer', description: 'Acción de gracias por el alimento.', order: 6 },
  { id: 'antes-viajar', name: 'Antes de viajar', description: 'Antes de coger el coche, el tren o el avión.', order: 7 },
  { id: 'noche', name: 'Al acostarse', description: 'Antes del descanso, al cerrar la jornada.', order: 8 },

  /* ---- El alma ---- */
  { id: 'al-pecar', name: 'Al caer en el pecado', description: 'En el momento mismo de la caída, sin dejarlo para luego.', order: 9 },
  { id: 'arrepentimiento', name: 'Arrepentimiento', description: 'Cuando el alma reconoce su pecado y quiere volver.', order: 10 },
  { id: 'tentacion', name: 'En la tentación', description: 'En la hora de la prueba.', order: 11 },
  { id: 'ira', name: 'Cuando te enfadas', description: 'Cuando se ha ido la mano, o la lengua, o está a punto de irse.', order: 12 },
  { id: 'miedo', name: 'Cuando tienes miedo', description: 'Ante lo que viene, ante lo que no se sabe.', order: 13 },
  { id: 'angustia', name: 'En la angustia y la tristeza', description: 'Cuando aprieta la pena, el miedo o el desaliento.', order: 14 },
  { id: 'dudas', name: 'Cuando falla la fe', description: 'Cuando no sale, no se siente nada o se ha dejado de creer.', order: 15 },
  { id: 'decision', name: 'Ante una decisión', description: 'Cuando hay que elegir y no se ve claro.', order: 16 },
  { id: 'accion-de-gracias', name: 'Al recibir un bien', description: 'Acción de gracias por los beneficios recibidos.', order: 17 },

  /* ---- Los tuyos ---- */
  { id: 'familia', name: 'Por la familia', description: 'Por los padres, el cónyuge y los hijos.', order: 18 },
  { id: 'matrimonio', name: 'Por el matrimonio', description: 'Antes de casarse y en los años que vienen después.', order: 19 },
  { id: 'embarazo', name: 'En la espera de un hijo', description: 'Por la mujer encinta, por el parto y por lo que no llega.', order: 20 },
  { id: 'casa', name: 'Por la casa', description: 'El hogar, la mesa y quien entra por la puerta.', order: 21 },
  { id: 'amigos', name: 'Por los amigos', description: 'Por quienes caminan a nuestro lado.', order: 22 },
  { id: 'enemigos', name: 'Por los enemigos', description: 'Por quienes nos hacen daño.', order: 23 },
  { id: 'padre-espiritual', name: 'Por el padre espiritual', description: 'Por quien te confiesa y te guía.', order: 24 },
  { id: 'enfermedad', name: 'En la enfermedad', description: 'Por los enfermos y en la propia dolencia.', order: 25 },
  { id: 'agonia', name: 'Junto a un moribundo', description: 'Las horas últimas, y qué se hace en ellas.', order: 26 },
  { id: 'difuntos', name: 'Por los difuntos', description: 'Por los que se han dormido en el Señor.', order: 27 },
  { id: 'duelo', name: 'En el duelo', description: 'Cuando el muerto es tuyo y el que queda eres tú.', order: 28 },
  { id: 'paz', name: 'En tiempo de guerra', description: 'Por la paz, por las víctimas y por los que combaten.', order: 29 },

  /* ---- Las virtudes ---- */
  { id: 'fe', name: 'La fe', description: 'Para creer de verdad, y más cuando cuesta.', order: 30 },
  { id: 'esperanza', name: 'La esperanza', description: 'Para no desesperar de nada ni de nadie, ni de uno mismo.', order: 31 },
  { id: 'amor', name: 'El amor', description: 'A Dios sobre todo, y al prójimo como a uno mismo.', order: 32 },
  { id: 'sabiduria', name: 'La sabiduría', description: 'Para ver las cosas como Dios las ve.', order: 33 },
  { id: 'discernimiento', name: 'El discernimiento', description: 'Para distinguir lo bueno de lo que sólo lo parece.', order: 34 },
  { id: 'temor-de-dios', name: 'El temor de Dios', description: 'El principio de la sabiduría: no querer ofender a quien se ama.', order: 35 },
  { id: 'templanza', name: 'La templanza', description: 'Para ser dueño de los deseos, y no al revés.', order: 36 },
  { id: 'justicia', name: 'La justicia', description: 'Para dar a cada uno lo suyo, y antes que a nadie al que no tiene.', order: 37 },
  { id: 'fortaleza', name: 'La fortaleza', description: 'Para no echarse atrás ante lo que hay que hacer.', order: 38 },
  { id: 'castidad', name: 'La castidad', description: 'Para tener entero el corazón, y limpia la mirada.', order: 39 },
  { id: 'humildad', name: 'La humildad', description: 'Para verse como se es delante de Dios.', order: 40 },
  { id: 'paciencia', name: 'La paciencia', description: 'Para aguantar sin amargarse, y para esperar.', order: 41 },
  { id: 'mansedumbre', name: 'La mansedumbre', description: 'Para que la ofensa no mande en ti.', order: 42 },
  { id: 'obediencia', name: 'La obediencia', description: 'Para decir «hágase» y no sólo «a ver».', order: 43 },
  { id: 'silencio', name: 'El silencio', description: 'Para guardar la lengua y oír a Dios.', order: 44 },
  { id: 'vigilancia', name: 'La vigilancia', description: 'Para no vivir dormido, y acordarse de la muerte.', order: 45 },
  { id: 'desprendimiento', name: 'El desprendimiento', description: 'Para que lo que tienes no te tenga a ti.', order: 46 },
  { id: 'perdon', name: 'El perdón', description: 'Para no guardar rencor y no juzgar a nadie.', order: 47 },
  { id: 'misericordia', name: 'La misericordia', description: 'Para que el dolor ajeno se te clave, y actúes.', order: 48 },
  { id: 'compuncion', name: 'La compunción', description: 'Para llorar los pecados, sin desesperar.', order: 49 },
  { id: 'gratitud', name: 'La gratitud', description: 'Para dar gracias en todo, también en lo que no se entiende.', order: 50 },
  { id: 'paz-interior', name: 'La paz del alma', description: 'Para que se aquiete lo de dentro.', order: 51 },
  { id: 'oracion', name: 'La oración', description: 'Para aprender a rezar, y para no dejarlo.', order: 52 },

  /* ---- A quién ---- */
  { id: 'a-la-trinidad', name: 'A la Santísima Trinidad', description: 'Al Padre, al Hijo y al Espíritu Santo.', order: 53 },
  { id: 'a-cristo', name: 'A nuestro Señor Jesucristo', description: 'Al que se llama por su nombre, y responde.', order: 54 },
  { id: 'al-espiritu-santo', name: 'Al Espíritu Santo', description: 'Rey celestial, Consolador, Espíritu de verdad.', order: 55 },
  { id: 'theotokos', name: 'A la Theotokos', description: 'A la Madre de Dios, para pedir su intercesión.', order: 56 },
  { id: 'angeles', name: 'A los ángeles', description: 'Al ángel de la guarda y a los arcángeles.', order: 57 },
  { id: 'santos', name: 'A los santos', description: 'San Nicolás, los Tres Jerarcas, el santo de hoy y los que nos acompañan.', order: 58 },

  /* ---- La Iglesia y la Escritura ---- */
  { id: 'templo', name: 'Al entrar en el templo', description: 'En la puerta de la iglesia y ante los iconos.', order: 59 },
  { id: 'confesion', name: 'Antes de confesar', description: 'Preparación para el sacramento del arrepentimiento.', order: 60 },
  { id: 'comunion', name: 'Antes de comulgar', description: 'Antes y después de los Santos Misterios.', order: 61 },
  { id: 'ayuno', name: 'En el ayuno', description: 'En la Cuaresma y en los otros tiempos de ayuno.', order: 62 },
  { id: 'escritura', name: 'Antes de leer la Escritura', description: 'Para que la palabra no pase de largo.', order: 63 },
  { id: 'odas', name: 'Las nueve odas', description: 'Los cánticos de la Biblia sobre los que se escriben los cánones.', order: 64 },
  { id: 'oraciones-biblicas', name: 'Oraciones de la Biblia', description: 'Lo que rezaron Moisés, David, Salomón, Tobías, san Pablo y el Señor.', order: 65 },
  { id: 'salmos-necesidad', name: 'Grupos de salmos', description: 'Los que la Iglesia reza juntos: al amanecer, de noche, subiendo al templo.', order: 66 },
  { id: 'otras', name: 'Otras oraciones', description: 'Las que no son de una hora ni de una necesidad concreta.', order: 67 },
];

/**
 * Cómo se agrupan las virtudes.
 *
 * No hay una lista canónica. Ésta sigue las que la tradición ya junta: las
 * tres de san Pablo (1 Corintios 13, 13); las cuatro del libro de la Sabiduría
 * (8, 7), con la prudencia junto al discernimiento; las que pide la oración de
 * san Efrén, y las que recorre la «Escala» de san Juan Clímaco.
 */
export interface VirtueGroup {
  id: string;
  name: string;
  note: string;
  virtues: VirtueId[];
}

export const VIRTUE_GROUPS: VirtueGroup[] = [
  {
    id: 'las-tres',
    name: 'Las tres que permanecen',
    note: '«Ahora permanecen la fe, la esperanza y el amor, estas tres; pero la mayor de ellas es el amor» (1 Corintios 13, 13).',
    virtues: ['fe', 'esperanza', 'amor'],
  },
  {
    id: 'la-luz',
    name: 'La luz del entendimiento',
    note: 'La sabiduría, y lo que lleva a ella: su principio, el temor de Dios, y su uso, el discernimiento.',
    virtues: ['sabiduria', 'discernimiento', 'temor-de-dios'],
  },
  {
    id: 'las-cuatro',
    name: 'Las de toda vida recta',
    note: 'El libro de la Sabiduría (8, 7) nombra cuatro, y los Padres griegos las recibieron: la prudencia, que aquí va con el discernimiento, la templanza, la justicia y la fortaleza.',
    virtues: ['templanza', 'justicia', 'fortaleza'],
  },
  {
    id: 'san-efren',
    name: 'Las que pide san Efrén',
    note: '«Concédeme espíritu de castidad, de humildad, de paciencia y de amor»: la oración que se reza cada día de la Cuaresma.',
    virtues: ['castidad', 'humildad', 'paciencia'],
  },
  {
    id: 'el-combate',
    name: 'Las de cada día',
    note: 'Los peldaños de la «Escala» de san Juan Clímaco, y el combate de todos: la lengua, el rencor, el dinero, el sueño del alma.',
    virtues: [
      'mansedumbre',
      'obediencia',
      'silencio',
      'vigilancia',
      'desprendimiento',
      'perdon',
      'misericordia',
      'compuncion',
      'gratitud',
      'paz-interior',
      'oracion',
    ],
  },
];

/** Las virtudes en el orden en que se presentan. */
export const VIRTUES_IN_ORDER: VirtueId[] = VIRTUE_GROUPS.flatMap((g) => g.virtues);

/**
 * Las oraciones que también sirven para un momento, sin ser suyas.
 *
 * Cada oración vive en un solo momento, pero la de san Efrén pide cuatro
 * virtudes y la de Óptina sirve lo mismo por la mañana que ante una decisión.
 * Aquí se dice dónde más hay que ofrecerlas, por su identificador; una prueba
 * comprueba que todas existen.
 */
export const PRAYERS_ALSO: Partial<Record<PrayerCategoryId, string[]>> = {
  /* El alma */
  ira: ['perdon-efren', 'efren-sirio', 'mansedumbre-colosenses'],
  miedo: ['salmo-26', 'salmo-90-ref', 'nadie-que-acude', 'fortaleza-salmo-45'],
  decision: ['filareto', 'optina', 'discernimiento-camino', 'discernimiento-senda', 'sabiduria-santiago'],
  angustia: ['cristo-nacianceno'],
  dudas: ['fe-creo-ayuda', 'fe-aumentanos'],
  arrepentimiento: ['compuncion-puerta', 'compuncion-lagrimas', 'compuncion-prodigo'],
  'accion-de-gracias': ['trinidad-al-padre', 'gratitud-leprosos'],
  /* Los tuyos */
  enemigos: ['perdon-efren', 'perdon-partenio', 'perdon-esteban'],
  /* El día */
  manana: ['templanza-nacianceno'],
  noche: ['vigilancia-antioco'],
  'antes-estudiar': ['sabiduria-salomon', 'sabiduria-alfabetica', 'sabiduria-evangelio'],
  'antes-viajar': ['miedo-efren'],
  /* Las virtudes */
  fe: ['simbolo-de-la-fe', 'creo-senor-y-confieso', 'oracion-del-que-duda', 'salmo-41'],
  esperanza: ['filareto', 'nadie-que-acude', 'salmo-129', 'salmo-22'],
  amor: ['por-el-amor-mutuo', 'kronstadt-tu-nombre', 'crisostomo-24', 'trinidad-al-espiritu', 'efren-sirio', 'perdon-partenio'],
  sabiduria: ['antes-de-estudiar', 'despues-del-estudio', 'san-sergio-estudio', 'lectura-espiritual', 'antes-de-leer-la-escritura', 'tres-jerarcas'],
  discernimiento: ['ante-una-decision', 'filareto', 'optina', 'sabiduria-santiago', 'decision-proverbios'],
  'temor-de-dios': ['crisostomo-24', 'humildad-efren'],
  templanza: ['antes-de-comer', 'despues-de-comer', 'ayuno-mateo', 'castidad-efren'],
  justicia: ['trinidad-al-espiritu', 'ayuno-isaias', 'bienaventuranzas', 'sabiduria-corazon'],
  fortaleza: ['levantese-dios', 'en-la-tentacion', 'salmo-26', 'cristo-nacianceno', 'miedo-efren'],
  castidad: ['efren-sirio', 'crisostomo-24', 'trinidad-al-espiritu', 'salmo-50-ref', 'templanza-siracida', 'agni-parthene'],
  humildad: ['efren-sirio', 'crisostomo-24', 'trinidad-al-espiritu', 'oracion-publicano', 'magnificat'],
  paciencia: ['efren-sirio', 'crisostomo-24', 'optina', 'filareto', 'nacianceno-enfermedad', 'trinidad-al-espiritu'],
  mansedumbre: ['crisostomo-24', 'trinidad-al-espiritu', 'nacianceno-ira', 'humildad-mateo', 'bienaventuranzas'],
  obediencia: ['crisostomo-24', 'filareto', 'optina', 'por-el-padre-espiritual', 'paciencia-salmo-39'],
  silencio: ['efren-sirio', 'oracion-de-jesus'],
  vigilancia: ['al-despertar', 'canto-de-medianoche', 'oracion-de-la-hora', 'ilumina-mis-ojos', 'salmos-hexapsalmos'],
  desprendimiento: ['filareto', 'optina', 'bienaventuranzas'],
  perdon: ['perdon-nocturno', 'perdona-a-los-que-nos-odian', 'por-los-enemigos', 'palabras-del-senor-enemigos', 'efren-sirio'],
  misericordia: ['por-los-bienhechores', 'conmemoracion-larga', 'por-los-vivos', 'ayuno-isaias', 'bienaventuranzas'],
  compuncion: ['oracion-de-manases', 'troparios-de-compuncion', 'salmo-50-ref', 'salmo-129', 'crisostomo-24', 'al-caer'],
  gratitud: ['trinidad-al-padre', 'gloria-a-dios-por-todo', 'accion-gracias', 'por-todos-los-beneficios', 'salmo-102', 'cantico-tres-jovenes'],
  'paz-interior': ['oracion-de-jesus', 'vigilancia-antioco', 'filareto', 'salmo-22', 'humildad-salmo-130'],
  oracion: ['filareto', 'oracion-de-jesus', 'oracion-de-la-hora', 'cuando-no-sale-rezar', 'senal-de-la-cruz'],
  /* A quién */
  'a-la-trinidad': ['comienzo-habitual', 'al-despertar', 'levantandome-trinidad', 'simbolo-de-la-fe'],
  'a-cristo': ['oracion-de-jesus', 'jesucristo-manana', 'noche-octava', 'ante-el-icono-de-cristo', 'kronstadt-tu-nombre'],
  'al-espiritu-santo': ['espiritu-santo-noche', 'comienzo-habitual', 'sabiduria-pentecostes'],
  theotokos: [
    'theotokos-manana',
    'theotokos-canto-tu-gracia',
    'buena-madre',
    'estudita-theotokos',
    'suplicas-a-la-theotokos',
    'theotokos-noche',
    'nadie-que-acude',
    'no-me-confies',
    'no-tenemos-otra-ayuda',
    'proteccion-de-los-cristianos',
    'hodigitria-viaje',
    'theotokos-despues-comulgar',
    'magnificat',
  ],
  angeles: ['angel-guarda-manana', 'angel-noche', 'salmo-90-ref'],
  santos: ['santo-del-nombre', 'santos-anargiros', 'san-nicolas-viaje', 'panteleimon-curacion', 'panteleimon-alma', 'san-sergio-estudio'],
  /* La Iglesia */
  ayuno: ['efren-sirio', 'templanza-siracida', 'compuncion-joel'],
  escritura: ['sabiduria-evangelio', 'sabiduria-salmo-118', 'temor-siracida'],
};

/**
 * De cada virtud, su nombre griego y una línea para repetir durante el día.
 *
 * Las líneas no están escritas para ATHOS: son de oraciones que ATHOS ya
 * tiene o de la Escritura, y dicen de dónde salen. Viven aquí, y no con la ficha
 * de la biblioteca, porque las necesita también la lista de oraciones.
 */
export const VIRTUE_INFO: Record<VirtueId, { greek: string; petition: string; from: string }> = {
  fe: { greek: 'πίστις', petition: 'Creo; ayuda mi incredulidad.', from: 'Marcos 9, 24' },
  esperanza: {
    greek: 'ἐλπίς',
    petition: 'Mi esperanza es el Padre, mi refugio el Hijo, mi protección el Espíritu Santo.',
    from: 'San Joanicio el Grande',
  },
  amor: {
    greek: 'ἀγάπη',
    petition: 'Señor, hazme digno de amarte con toda mi alma y con todo mi pensamiento, y de hacer en todo tu voluntad.',
    from: 'San Juan Crisóstomo',
  },
  sabiduria: { greek: 'σοφία', petition: 'Bendito eres, Señor: enséñame tus preceptos.', from: 'De las Completas' },
  discernimiento: { greek: 'διάκρισις', petition: 'Señor, dame buenos pensamientos.', from: 'San Juan Crisóstomo' },
  'temor-de-dios': {
    greek: 'φόβος Θεοῦ',
    petition: 'Señor, planta en mí la raíz de los bienes: tu temor en mi corazón.',
    from: 'San Juan Crisóstomo',
  },
  templanza: {
    greek: 'ἐγκράτεια',
    petition: 'A Ti te ofreceré en sacrificio este día, firme y dueño de mis pasiones.',
    from: 'San Gregorio Nacianceno',
  },
  justicia: { greek: 'δικαιοσύνη', petition: 'Danos el espíritu de pureza y de justicia.', from: 'Del akáthistos a la Trinidad' },
  fortaleza: { greek: 'ἀνδρεία', petition: 'Te suplico, Fuerza mía, no me dejes.', from: 'San Gregorio Nacianceno' },
  castidad: { greek: 'σωφροσύνη', petition: 'Señor, dame humildad, castidad y obediencia.', from: 'San Juan Crisóstomo' },
  humildad: { greek: 'ταπείνωσις', petition: 'Oh Dios, ten piedad de mí, pecador.', from: 'La oración del publicano' },
  paciencia: { greek: 'ὑπομονή', petition: 'Señor, dame paciencia, magnanimidad y mansedumbre.', from: 'San Juan Crisóstomo' },
  mansedumbre: { greek: 'πραότης', petition: 'Danos el espíritu de mansedumbre y de humildad.', from: 'Del akáthistos a la Trinidad' },
  obediencia: {
    greek: 'ὑπακοή',
    petition: 'Señor, Tú sabes que haces como quieres: hágase tu voluntad también en mí, pecador.',
    from: 'San Juan Crisóstomo',
  },
  silencio: { greek: 'σιωπή', petition: 'Señor y Soberano de mi vida: no me des espíritu de vaniloquio.', from: 'San Efrén el Sirio' },
  vigilancia: {
    greek: 'νῆψις',
    petition: 'Concédenos, oh Dios, mente vigilante, pensamiento casto, corazón sobrio.',
    from: 'San Antíoco, de las Completas',
  },
  desprendimiento: { greek: 'ἀκτημοσύνη', petition: 'No me des pobreza ni riquezas.', from: 'Proverbios 30, 8' },
  perdon: {
    greek: 'ἀμνησικακία',
    petition: 'Concédeme ver mis propios pecados y no juzgar a mi hermano.',
    from: 'San Efrén el Sirio',
  },
  misericordia: {
    greek: 'ἔλεος',
    petition: 'Bienaventurados los misericordiosos, porque ellos alcanzarán misericordia.',
    from: 'Mateo 5, 7',
  },
  compuncion: { greek: 'κατάνυξις', petition: 'Señor, dame lágrimas, memoria de la muerte y compunción.', from: 'San Juan Crisóstomo' },
  gratitud: { greek: 'εὐχαριστία', petition: 'Gloria a Dios por todas las cosas.', from: 'San Juan Crisóstomo' },
  'paz-interior': { greek: 'ἡσυχία', petition: 'Señor Jesucristo, Hijo de Dios, ten piedad de mí, pecador.', from: 'La oración de Jesús' },
  oracion: { greek: 'προσευχή', petition: 'Enséñame a orar. Ora Tú mismo en mí.', from: 'San Filareto de Moscú' },
};

/** Una virtud se reconoce por estar en la lista. */
export const isVirtue = (id: string): id is VirtueId => (VIRTUES_IN_ORDER as string[]).includes(id);
