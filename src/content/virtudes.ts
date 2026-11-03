/**
 * Las virtudes: una ficha de cada una para la biblioteca.
 *
 * Tres clases de texto, separadas, como en todo ATHOS:
 *
 * - **La exposición** es prosa redactada para ATHOS. No es texto patrístico, y
 *   la ficha lo dice. Lo que afirma de los Padres se puede comprobar en las
 *   citas de al lado.
 *
 * - **Las citas de los Padres** son traducciones hechas para ATHOS desde las
 *   versiones rusas de los siglos XIX y XX, de dominio público, porque son las
 *   que se han podido cotejar enteras. Cada una dice de qué obra y de qué capítulo
 *   sale, con la numeración de esa edición. Ninguna está escrita de memoria: se
 *   buscaron en el texto antes de ponerlas. Falta, como en todas las traducciones
 *   de ATHOS, que una persona las revise con el griego delante.
 *
 * - **La Escritura** va sólo por referencia, y la trae la Biblia de ATHOS.
 *
 * Los dichos del desierto no se copian aquí: se toman de `apotegmas.ts` por tema.
 */
import type { SourceMeta, VirtueId } from '@/types';
import type { ApophthegmTheme } from './apotegmas';

export interface VirtueQuote {
  text: string;
  /** Quién lo dijo, y dónde. */
  who: string;
  where: string;
  /** La ficha del Padre, si ATHOS la tiene. */
  fatherId?: string;
}

export interface Virtue {
  id: VirtueId;
  /** Qué es, en dos o tres párrafos. */
  what: string[];
  /** Lo que se le opone, que suele aclarar más que la definición. */
  against: string;
  /** Cómo se empieza. */
  practice: string[];
  /** Referencias a la Escritura, en el formato de `parsePassage`. */
  scripture: string[];
  quotes: VirtueQuote[];
  /** Los temas de los apotegmas que hablan de ella. */
  themes: ApophthegmTheme[];
  /** Santos en los que se ve, con el motivo. */
  saints: Array<{ id: string; why: string }>;
  see?: Array<{ label: string; path: string }>;
}

export const VIRTUES_META: SourceMeta = {
  source:
    'Exposición redactada para ATHOS. Las citas se han traducido al español para ATHOS desde las versiones rusas de dominio público de san Juan Clímaco (5.ª ed. de Óptina, 1898), san Doroteo de Gaza (8.ª ed. de Óptina), san Basilio (Moscú, 1846) y san Isaac el Sirio (Moscú, 1854), en la edición de RussPortal',
  tradition: 'Iglesia ortodoxa',
  language: 'es',
  license: 'cc-by-sa-4.0',
  copyright:
    'Las obras de los Padres son de dominio público. La exposición y la traducción de las citas son de ATHOS y se publican bajo CC BY-SA 4.0.',
  dateAdded: '2026-11-03',
  notes:
    'La exposición no es un texto patrístico. Las citas son traducción de una traducción, y lo que cuenta es el griego: está pendiente la revisión de una persona con el original delante. La numeración de los capítulos es la de esas ediciones rusas, y puede no coincidir con la de otras.',
};

const CLIMACO = 'San Juan Clímaco';
const ID_CLIMACO = 'juan-climaco';
const DOROTEO = 'San Doroteo de Gaza';

const escala = (text: string, where: string): VirtueQuote => ({
  text,
  who: CLIMACO,
  where: `La Escala, ${where}`,
  fatherId: ID_CLIMACO,
});
const doroteo = (text: string, where: string): VirtueQuote => ({ text, who: DOROTEO, where: `Enseñanzas, ${where}` });

/** La casa del alma de san Doroteo, que ordena la portada de las virtudes. */
export const CASA_DEL_ALMA: VirtueQuote[] = [
  doroteo(
    'Primero hay que poner el cimiento, que es la fe: porque sin fe, como dice el Apóstol, es imposible agradar a Dios. Y luego, sobre ese cimiento, hay que edificar por igual: si se presenta la obediencia, hay que poner una piedra de obediencia; si llega un disgusto de parte de un hermano, una piedra de paciencia; si se ofrece ocasión de abstinencia, una piedra de abstinencia.',
    'XIV',
  ),
  doroteo(
    'Hay que cuidar de la paciencia y del valor, porque son las piedras angulares: con ellas se traba el edificio y se une un muro con otro. Sin paciencia y sin valor nadie puede llevar a cabo ninguna virtud.',
    'XIV',
  ),
  doroteo(
    'Y en cada piedra hay que poner argamasa, porque si pone piedra sobre piedra sin argamasa, las piedras se saldrán y la casa se hundirá. La argamasa es la humildad, porque se saca de la tierra y está bajo los pies de todos. La casa ha de tener también sus trabazones, que son el discernimiento. Y el techo es el amor, que es la perfección de las virtudes, como el techo es lo más alto de la casa.',
    'XIV',
  ),
];

export const VIRTUES: Virtue[] = [
  /* ------------------------------ Las tres que permanecen ------------------------------ */
  {
    id: 'fe',
    what: [
      'La fe no es sólo aceptar que Dios existe: eso, dice Santiago, también lo creen los demonios. Es fiarse de Él, como quien se apoya en alguien para no caer, y vivir como quien se ha fiado. La carta a los Hebreos la llama sustancia de lo que se espera y demostración de lo que no se ve.',
      'En la Iglesia tiene dos caras que no se separan: la fe que se confiesa, que es el Símbolo, y la fe con que se vive, que es la confianza de cada día. Por eso san Doroteo la pone como cimiento de la casa del alma: todo lo demás se levanta encima.',
    ],
    against:
      'La incredulidad, y su forma más corriente entre cristianos: la que cree en Dios los domingos y se las arregla sola el resto de la semana. También la superstición, que es fe puesta en lo que no es Dios.',
    practice: [
      'Reza el Símbolo de la Fe despacio, una vez al día.',
      'Cuando no sientas nada, reza igual: la fe no es un sentimiento, y el padre del muchacho del Evangelio no tenía más que dudas y una frase.',
      'Confíale a Dios una cosa concreta que te preocupe, y déjala en sus manos de verdad.',
    ],
    scripture: ['Hebreos 11, 1-6', 'Santiago 2, 14-26', 'Marcos 9, 23-24'],
    quotes: [
      escala(
        'A mi entender, la fe se parece a un rayo, la esperanza a la luz y el amor al disco del sol; pero las tres forman un solo resplandor y una sola claridad. La primera todo lo puede hacer y edificar; a la segunda la rodea la misericordia de Dios y no la deja quedar en vergüenza; y la tercera nunca cae, no se detiene en su carrera y no deja descansar al que ha herido con su bienaventurada embriaguez.',
        'escalón 30, 2-3',
      ),
    ],
    themes: [],
    saints: [
      { id: 'cuarenta-sebaste', why: 'Cuarenta soldados que prefirieron morir de frío sobre un lago helado antes que negar a Cristo.' },
      { id: 'tomas-apostol', why: 'El que dudó, y dijo después lo que nadie había dicho: «¡Señor mío, y Dios mío!».' },
    ],
    see: [
      { label: 'El Símbolo de la Fe, artículo por artículo', path: '/biblioteca/estudio/credo' },
      { label: 'El Símbolo de la Fe, para rezarlo', path: '/orar/oraciones/simbolo-de-la-fe' },
    ],
  },
  {
    id: 'esperanza',
    what: [
      'La esperanza cristiana no es optimismo ni el cálculo de que todo saldrá bien. Es la certeza de que Dios cumplirá lo que ha prometido y de que cuida de mi salvación, aunque las cosas vayan mal. Mira a lo que aún no se ve: la resurrección y el Reino.',
      'Su enemigo es doble: la desesperación, que cree que ya no hay nada que hacer, y la presunción, que cree que no hace falta hacer nada. San Juan Clímaco dice que es la puerta del amor, y que donde falta la esperanza se acaba también el amor.',
    ],
    against:
      'La desesperación, que la Iglesia tiene por uno de los pecados más graves, porque da por hecho que Dios no puede o no quiere perdonar. Y la presunción: dar la salvación por hecha.',
    practice: [
      'Cuando caigas, levántate enseguida: una caída se arregla, y lo peligroso es rendirse.',
      'Lee los salmos de la esperanza: el 22, el 70 y el 129.',
      'Ante la muerte de alguien querido, vuelve a Pascua: «Cristo ha resucitado» es la respuesta de la Iglesia.',
    ],
    scripture: ['Romanos 8, 24-25', '1 Pedro 1, 3-5', 'Hebreos 6, 18-20'],
    quotes: [
      escala(
        'La esperanza es enriquecerse con una riqueza invisible; es la posesión segura del tesoro aun antes de recibirlo. La esperanza es descanso en los trabajos; es la puerta del amor; mata la desesperación; es prenda de los bienes futuros.',
        'escalón 30, 29-30',
      ),
    ],
    themes: ['arrepentimiento'],
    saints: [
      { id: 'simeon-justo', why: 'Esperó la consolación de Israel hasta la vejez, y la tuvo en brazos.' },
      { id: 'silvano-athonita', why: 'Contaba que Cristo le dijo: «Ten tu mente en el infierno, y no desesperes».' },
    ],
    see: [{ label: 'Qué es la esperanza, en el catecismo', path: '/biblioteca/catecismo/esperanza' }],
  },
  {
    id: 'amor',
    what: [
      'Es el nombre mismo de Dios, dice san Juan, y el mandamiento que resume los demás. Tiene dos direcciones que no se pueden separar: a Dios, con todo el corazón, y al prójimo como a uno mismo. El que dice que ama a Dios, a quien no ve, y no ama a su hermano, a quien ve, miente.',
      'No es un sentimiento, aunque a veces lo acompañe. San Pablo lo describe por lo que hace: sufre, es benigno, no piensa el mal. Por eso es la más alta de las virtudes: en san Doroteo es el techo de la casa, y en la «Escala» de san Juan Clímaco, el último peldaño.',
    ],
    against:
      'El amor propio, que los Padres griegos llaman «filautía» y ponen en la raíz de las pasiones. Y la indiferencia, que es no ver al que está al lado.',
    practice: [
      'Reza cada día por alguien que te cuesta.',
      'Haz una cosa concreta por alguien sin que se entere.',
      'Antes de hablar de alguien, piensa si lo dirías delante de él.',
    ],
    scripture: ['1 Corintios 13, 4-8', '1 Juan 4, 19-21', 'Mateo 22, 37-40'],
    quotes: [
      escala(
        'El amor, por su cualidad, es semejanza con Dios, en cuanto los hombres pueden alcanzarla; por su acción, es embriaguez del alma; y por su propiedad, fuente de fe, abismo de longanimidad, mar de humildad.',
        'escalón 30, 7',
      ),
    ],
    themes: ['amor'],
    saints: [
      { id: 'juan-teologo-mayo', why: 'El discípulo amado. De anciano, cuenta san Jerónimo, ya sólo repetía: «Hijitos, amaos los unos a los otros».' },
      { id: 'silvano-athonita', why: 'Enseñó que el amor a los enemigos es la medida de la vida cristiana.' },
    ],
    see: [{ label: 'Los mandamientos, en el catecismo', path: '/biblioteca/catecismo/amor' }],
  },

  /* ------------------------------ La luz del entendimiento ------------------------------ */
  {
    id: 'sabiduria',
    what: [
      'En la Escritura la sabiduría no es saber muchas cosas: es saber vivir delante de Dios, ver las cosas como Él las ve. Por eso su principio es el temor de Dios, y por eso Salomón, que podía pedir lo que quisiera, pidió un corazón que entendiera.',
      'La Iglesia da un paso más: la Sabiduría de Dios tiene nombre. San Pablo llama a Cristo sabiduría de Dios, y a Él está dedicada Santa Sofía de Constantinopla. Cuando el diácono clama «¡Sabiduría!» en la Liturgia, antes de las lecturas, no está pidiendo erudición, sino atención a quien va a hablar.',
      'Y Santiago distingue dos: la de este mundo, que es astuta, y la que baja de lo alto, que es pura, pacífica y sin hipocresía. Se pide; no se consigue sólo estudiando, aunque quien pide luz para estudiar hace bien en ponerse a estudiar después.',
    ],
    against:
      'La necedad, que en la Biblia no es ser corto, sino vivir como si Dios no existiera: «Dijo el necio en su corazón: No hay Dios». Y la soberbia del que sabe mucho: la ciencia, dice san Pablo, hincha, y la caridad edifica.',
    practice: [
      'Antes de estudiar o de decidir algo, pide luz: el «Rey celestial» basta.',
      'Lee un poco cada día los libros sapienciales: los Proverbios, la Sabiduría, el Eclesiástico.',
      'Pregunta a quien sabe más y ha vivido más: al padre espiritual, a los mayores.',
    ],
    scripture: ['Proverbios 9, 10', '1 Corintios 1, 22-25', 'Santiago 3, 13-17', 'Sabiduría de Salomón 7, 7-14'],
    quotes: [],
    themes: ['discernimiento'],
    saints: [
      { id: 'tres-jerarcas', why: 'San Basilio, san Gregorio y san Juan Crisóstomo, que unieron la mejor cultura de su tiempo a la oración.' },
      { id: 'catalina-alejandria', why: 'La joven que, según su vida, discutió con los filósofos del emperador. Se la invoca al empezar los estudios.' },
      { id: 'sergio-radonezh', why: 'El niño al que no le entraban las letras, y que aprendió a leer, cuenta su vida, por la bendición de un monje.' },
    ],
    see: [{ label: 'Antes de estudiar', path: '/orar/oraciones/categoria/antes-estudiar' }],
  },
  {
    id: 'discernimiento',
    what: [
      'Es saber distinguir: lo bueno de lo que sólo lo parece, lo que viene de Dios de lo que viene de uno mismo, y cuándo hace falta cada cosa. Los Padres del desierto la tenían por una de las virtudes más necesarias, porque sin ella hasta el ayuno y la oración pueden hacer daño.',
      'Incluye la prudencia, que el libro de la Sabiduría cuenta entre las cuatro grandes virtudes. No se aprende solo: el camino ordinario es abrirse a un padre espiritual y no fiarse demasiado de uno mismo. Y casi nunca se hace deprisa.',
    ],
    against:
      'La imprudencia, y su contrario: la indecisión que no se atreve a nada. Y sobre todo el fiarse del propio juicio, que san Doroteo tiene por la raíz de las caídas.',
    practice: [
      'Ante una decisión, deja pasar una noche y reza antes de elegir.',
      'Cuéntaselo a alguien de confianza, mejor a tu padre espiritual.',
      'Mira los frutos: lo que viene de Dios suele dejar paz, aunque cueste; lo que no, deja inquietud, aunque al principio guste.',
    ],
    scripture: ['1 Juan 4, 1', 'Romanos 12, 2', 'Filipenses 1, 9-10', 'Hebreos 5, 14'],
    quotes: [
      escala(
        'El discernimiento es, en los principiantes, el verdadero conocimiento del estado de su alma; en los que van a medio camino, un sentido interior que distingue sin error lo verdaderamente bueno de lo natural y de lo que es contrario al bien; y en los perfectos, un conocimiento espiritual dado por la iluminación divina. Y en general consiste en comprender con exactitud y seguridad la voluntad divina en todo tiempo, en todo lugar y en toda cosa.',
        'escalón 26, 1-2',
      ),
      doroteo(
        'No conozco otra caída del monje que ésta: cuando cree a su propio corazón. Algunos dicen: por esto cae el hombre, o por aquello; pero yo no conozco otra caída que ésta: cuando el hombre se sigue a sí mismo.',
        'V',
      ),
    ],
    themes: ['discernimiento'],
    saints: [
      { id: 'antonio-magno', why: 'El padre de los monjes, al que iban a preguntar desde todo Egipto.' },
      { id: 'ambrosio-optina', why: 'El stárets al que acudía media Rusia a preguntar qué hacer, desde las campesinas hasta Dostoyevski.' },
    ],
    see: [{ label: 'El padre espiritual', path: '/biblioteca/estudio/primeros-pasos' }],
  },
  {
    id: 'temor-de-dios',
    what: [
      'No es miedo a que Dios castigue; o, mejor, empieza a veces por ahí, pero no se queda ahí. San Doroteo distingue dos temores: el del que empieza, que obra bien por miedo al castigo, y el de los santos, que temen perder a quien aman.',
      'La Escritura lo llama principio de la sabiduría, porque es lo que pone a cada uno en su sitio: Dios es Dios y yo no. Antes de comulgar el diácono lo proclama: «Acercaos con temor de Dios, con fe y con amor».',
    ],
    against:
      'La despreocupación de quien vive como si nada fuera a pasar. Y también el miedo servil, el de quien ve a Dios como un juez al acecho: ése no es temor de Dios, sino una idea equivocada de Dios.',
    practice: [
      'Recuerda al entrar en la iglesia en presencia de quién estás.',
      'Antes de hacer algo de lo que luego te arrepentirías, pregúntate si lo harías delante de Cristo.',
      'Reza el salmo 33.',
    ],
    scripture: ['Proverbios 1, 7', 'Salmos 111, 10', '1 Juan 4, 18'],
    quotes: [
      doroteo(
        'Hay dos temores: uno inicial y otro perfecto; uno es propio, por así decir, de los que empiezan a ser piadosos, y el otro de los santos perfectos, que han llegado a la medida del amor perfecto. El que cumple la voluntad de Dios por miedo a los tormentos es todavía principiante: no hace el bien por el bien mismo, sino por miedo al castigo. Otro cumple la voluntad de Dios por amor a Dios, amándolo precisamente para agradarle.',
        'IV',
      ),
    ],
    themes: ['muerte'],
    saints: [{ id: 'job-paciente', why: 'De él dice la Escritura que era perfecto y recto, temeroso de Dios y apartado del mal.' }],
  },

  /* ------------------------------- Las de toda vida recta ------------------------------- */
  {
    id: 'templanza',
    what: [
      'Es el dominio de uno mismo: que mande la persona y no el apetito. No se queda en la comida, aunque empieza por ella: alcanza la lengua, la mirada, el dinero, la pantalla. El libro de la Sabiduría la nombra la primera de sus cuatro virtudes, y san Pablo la compara con el entrenamiento del atleta.',
      'La Iglesia no la enseña por desprecio del cuerpo, que es templo del Espíritu Santo, sino por libertad: quien no puede decir que no a nada no es libre. Para eso son los tiempos de ayuno. Y nunca va sola: sin humildad se convierte en orgullo, y el que ayuna y juzga al que come ha perdido más de lo que ha ganado.',
    ],
    against:
      'La gula, y en general toda intemperancia: comer, beber, comprar o mirar sin saber parar. Y su caricatura, el rigorismo, que desprecia lo que Dios ha creado.',
    practice: [
      'Guarda los ayunos de la Iglesia en la medida que te indique tu padre espiritual, sin inventarte otros.',
      'Deja algo en el plato de vez en cuando; o el teléfono en otra habitación.',
      'Da gracias antes y después de comer: cambia cómo se come.',
    ],
    scripture: ['Sabiduría de Salomón 8, 7', '1 Corintios 9, 24-27', 'Gálatas 5, 22-24', 'Tito 2, 11-12'],
    quotes: [
      escala(
        'La gula es hipocresía del vientre: ya saciado, clama: «¡Poco!»; lleno y reventando de exceso, grita: «¡Tengo hambre!».',
        'escalón 14, 2',
      ),
    ],
    themes: [],
    saints: [{ id: 'juan-bautista-sinaxis', why: 'Vivió en el desierto de langostas y miel silvestre, y no se dejó comprar por ningún rey.' }],
    see: [{ label: 'El ayuno', path: '/calendario/ayuno' }],
  },
  {
    id: 'justicia',
    what: [
      'En griego, la misma palabra dice justicia y rectitud: estar bien con Dios y estar bien con los demás. Cristo llama bienaventurados a los que tienen hambre y sed de ella, y los profetas no dejan de repetir que a Dios no le agradan las fiestas de quien oprime al pobre.',
      'Los Padres fueron muy claros en lo que toca al dinero. San Basilio lo dijo sin rodeos, en la cita de aquí al lado, y san Juan Crisóstomo repitió que la limosna no es generosidad, sino justicia. Es la virtud de pagar lo que se debe, de decir la verdad en el juicio, de no aprovecharse del que no puede defenderse.',
    ],
    against:
      'La injusticia, claro; pero también la indiferencia ante la injusticia ajena, y hacer pasar por caridad lo que es deuda. Y la soberbia del justo, la del fariseo, que sabe de memoria lo que hace bien.',
    practice: [
      'Paga lo que debes y a tiempo: el salario, la factura, lo prestado.',
      'Di la verdad aunque te perjudique.',
      'Da al que no tiene antes de que te lo pida, y habla por el que no puede hablar.',
    ],
    scripture: ['Miqueas 6, 8', 'Mateo 5, 6', 'Isaías 1, 16-17', 'Mateo 23, 23'],
    quotes: [
      {
        text: 'Al hambriento pertenece el pan que retienes en tu casa; al desnudo, el vestido que guardas en tus arcas; al descalzo, el calzado que se pudre en tu casa; al necesitado, la plata que tienes enterrada. Por eso agravias a todos aquellos a quienes podrías socorrer.',
        who: 'San Basilio el Grande',
        where: 'Homilía sobre «Derribaré mis graneros» (Lucas 12, 18)',
        fatherId: 'basilio-magno',
      },
    ],
    themes: [],
    saints: [
      { id: 'basilio-magno', why: 'Levantó a las afueras de Cesarea una ciudad entera para enfermos y pobres, y se enfrentó por ellos a los poderosos.' },
      { id: 'juan-crisostomo', why: 'Perdió la sede y la vida por decir la verdad a los poderosos de Constantinopla.' },
      { id: 'felipe-moscu', why: 'El metropolitano que reprendió en público a Iván el Terrible por sus crímenes, y murió por ello.' },
    ],
  },
  {
    id: 'fortaleza',
    what: [
      'Es el valor de hacer lo que hay que hacer, y de no dejar de hacerlo. No consiste en no tener miedo: los mártires lo tenían. Consiste en que el miedo no mande. San Doroteo la pone, con la paciencia, como piedra angular de la casa del alma: sin ellas ninguna otra virtud se sostiene.',
      'Y es una fortaleza prestada, que no sale de los músculos. San Pablo lo aprendió: cuando soy débil, entonces soy fuerte. Por eso lo primero que hace el que la tiene es reconocer que sin Dios no puede nada.',
    ],
    against:
      'La cobardía, que hace callar cuando hay que hablar. La pusilanimidad, que no se atreve a empezar. Y la temeridad, que confunde el valor con la falta de juicio.',
    practice: [
      'Haz hoy lo que llevas días aplazando porque te da miedo.',
      'Reza el salmo 26 cuando te tiemblen las piernas.',
      'No pidas fuerza para lo de dentro de diez años, sino para lo de hoy.',
    ],
    scripture: ['Efesios 6, 10-13', '2 Corintios 12, 9-10', 'Josué 1, 9', '2 Timoteo 1, 7'],
    quotes: [
      escala(
        'El que se ha hecho siervo del Señor teme sólo a su Soberano; pero aquel en quien no hay temor del Señor a menudo tiene miedo hasta de su sombra.',
        'escalón 21, 11',
      ),
    ],
    themes: ['tentacion'],
    saints: [
      { id: 'jorge-trofeoforo', why: 'El soldado que confesó a Cristo delante del emperador y aguantó los tormentos.' },
      { id: 'cuarenta-sebaste', why: 'Cuarenta soldados que no se movieron del hielo, y se animaban unos a otros hasta el final.' },
    ],
  },

  /* ------------------------------- Las que pide san Efrén ------------------------------- */
  {
    id: 'castidad',
    what: [
      'La palabra griega de la oración de san Efrén, «sofrosyne», significa literalmente tener sano el pensamiento, tener entera el alma. Es más ancha que el sexo, aunque lo incluya: es la integridad de quien no está partido en deseos que tiran cada uno por su lado. San Juan Clímaco dice que es el nombre que abarca todas las virtudes.',
      'Vale para todos, cada uno en su estado: el casado la vive en la fidelidad, el soltero en la continencia y el monje en la virginidad. Y no es desprecio del cuerpo ni del amor: el matrimonio es un sacramento, y el cuerpo, templo del Espíritu Santo. No se consigue a fuerza de puños: los Padres insisten en que es un don, y en que hay que pedirlo.',
    ],
    against:
      'La lujuria, que convierte a las personas en objetos. Y, en otro plano, la vergüenza enfermiza y la desesperación del que cae una y otra vez: el que cae se levanta y vuelve a empezar.',
    practice: [
      'Guarda los ojos: lo que no entra no hay que echarlo luego. Vale también para la pantalla.',
      'En la tentación, no discutas con el pensamiento: reza la oración de Jesús y ponte a otra cosa.',
      'Si caes, confiésate pronto, sin dejarlo para más adelante, y no te desesperes.',
    ],
    scripture: ['Mateo 5, 8', '1 Corintios 6, 18-20', '1 Tesalonicenses 4, 3-5', 'Mateo 5, 27-28'],
    quotes: [
      escala(
        'La castidad es el nombre que abarca todas las virtudes. La castidad es la pureza del alma y del cuerpo.',
        'escalón 15, 4-5',
      ),
      escala(
        'Que nadie de los que se han ejercitado en guardar la pureza se atribuya a sí mismo haberla conseguido; porque es imposible que alguien venza su propia naturaleza, y donde la naturaleza es vencida, allí se reconoce la llegada de Aquel que está por encima de la naturaleza.',
        'escalón 15, 9',
      ),
    ],
    themes: ['tentacion'],
    saints: [
      { id: 'maria-egipcia', why: 'Vivió diecisiete años en la lujuria y cuarenta y siete en el desierto. Es la santa de los que no se rinden en este combate.' },
      { id: 'tecla', why: 'La discípula de san Pablo que renunció a un buen matrimonio y lo arriesgó todo por seguir a Cristo.' },
    ],
  },
  {
    id: 'humildad',
    what: [
      'No es pensar mal de uno mismo ni hablar mal de uno mismo, que puede ser otra forma de orgullo. Es verse como se es: criatura, pecador y amado. San Juan Clímaco recoge lo que decían de ella los monjes de su tiempo y acaba confesando que no se deja definir; que sólo la conoce quien la tiene.',
      'Los Padres la ponen en todas partes. Para san Doroteo es la argamasa de la casa del alma: cualquier virtud puesta sin ella se cae. Y tiene un modelo único: Cristo, que se humilló a sí mismo, y que no dijo aprended de los sabios ni de los ángeles, sino «aprended de mí, que soy manso y humilde de corazón».',
    ],
    against:
      'La soberbia, la raíz de todas las caídas y el pecado del diablo. Y la vanagloria, su hermana menor, que se alimenta hasta de las buenas obras. También la falsa humildad, la que espera que la contradigan.',
    practice: [
      'Pide perdón el primero, aunque la culpa no sea sólo tuya.',
      'No te justifiques cuando te corrijan, y no hables de tus buenas obras.',
      'Cuando veas pecar a alguien, acuérdate de los tuyos.',
    ],
    scripture: ['Filipenses 2, 5-8', 'Santiago 4, 6-10', 'Lucas 14, 7-11', 'Mateo 18, 1-4'],
    quotes: [
      escala(
        'Uno dijo que la humildad es el olvido constante de las propias buenas obras. Otro, que consiste en tenerse por el último y el más pecador de todos. Otro, que es la conciencia de la propia debilidad e impotencia. Otro, que su señal es adelantarse al prójimo con la reconciliación cuando hay una ofensa. Otro, que es el conocimiento de la gracia y la misericordia de Dios.',
        'escalón 25, 3',
      ),
      doroteo(
        'Dijo uno de los ancianos: «Ante todo necesitamos humildad, para estar dispuestos a decir "perdona" a cada palabra que oímos; porque con la humildad se quiebran todas las flechas del enemigo».',
        'II',
      ),
    ],
    themes: ['humildad'],
    saints: [
      { id: 'xenia-petersburgo', why: 'Viuda joven que lo regaló todo, se vistió con la ropa de su marido y vivió como loca por Cristo, haciéndose tener por nadie.' },
      { id: 'pimen-grande', why: 'El abba del que más dichos se conservan, casi todos sobre esto.' },
    ],
  },
  {
    id: 'paciencia',
    what: [
      'La palabra griega, «hypomoné», significa quedarse debajo: aguantar la carga sin tirarla y sin amargarse. No es la resignación de quien ya no espera nada, sino todo lo contrario: se aguanta porque se espera. «En vuestra paciencia poseeréis vuestras almas», dijo el Señor.',
      'San Doroteo enseña la razón de fondo: nada ocurre sin la providencia de Dios, y lo que Él permite, lo permite amándonos. No hace falta entenderlo para rezar como Job, que lo perdió todo y dijo: «El Señor dio, y el Señor quitó». Y hay una paciencia más difícil que las demás: la que hay que tener con uno mismo y con los propios pecados.',
    ],
    against:
      'La impaciencia y la murmuración. El desaliento, que los Padres llaman acedia: el hastío de todo, el querer estar en otra parte y en otra vida. Y la resignación sin esperanza, que se le parece y es lo contrario.',
    practice: [
      'Ante lo que no se puede cambiar, di primero «Gloria a Dios por todas las cosas», y luego piensa.',
      'Cuando alguien te saque de quicio, di una vez la oración de Jesús antes de contestar.',
      'Si te caes veinte veces en lo mismo, levántate veintiuna.',
    ],
    scripture: ['Lucas 21, 19', 'Santiago 1, 2-4', 'Hebreos 10, 36', 'Salmos 40, 1'],
    quotes: [
      doroteo(
        'Todo lo que nos ocurre hay que aceptarlo sin turbación, con humildad y con esperanza en Dios, creyendo que todo lo que Dios hace con nosotros lo hace por su bondad, porque nos ama, y que lo hace bien.',
        'XIII',
      ),
      doroteo(
        'Sin paciencia y sin valor nadie puede llevar a cabo ninguna virtud. Porque quien no tiene valor en el alma tampoco tendrá paciencia; y quien no tiene paciencia no puede hacer absolutamente nada.',
        'XIV',
      ),
    ],
    themes: ['paciencia'],
    saints: [
      { id: 'job-paciente', why: 'El que perdió los hijos, los bienes y la salud, y no maldijo.' },
      { id: 'ambrosio-optina', why: 'Se pasó la vida enfermo, en la cama, recibiendo a todo el que venía a verlo.' },
    ],
  },

  /* ---------------------------------- Las de cada día ---------------------------------- */
  {
    id: 'mansedumbre',
    what: [
      'Es la fuerza de no devolver el golpe. Cristo se la atribuye a sí mismo, y de pocos más se dice en la Biblia: de Moisés y de David. No es blandura ni falta de carácter: Moisés se enfrentó al faraón, y Cristo echó a los mercaderes del templo. Es no dejarse mandar por la ira, también cuando hay motivo.',
      'San Juan Clímaco la describe como una roca sobre el mar, y enseña cómo se llega, por grados: primero callar con el corazón alterado, luego callar también por dentro, y al final la calma. Y los Padres añaden que hay una ira buena: la que se vuelve contra el propio pecado y contra el demonio, no contra el hermano.',
    ],
    against:
      'La ira, que ciega, y el rencor, que es la ira guardada. También el sarcasmo, la mala contestación y el portazo, que son ira con buena educación o sin ella.',
    practice: [
      'Cuando te enfades, calla hasta que se te pase; si ya has hablado, pide perdón antes de que se ponga el sol.',
      'Reza por quien te ha ofendido, por su nombre: cuesta, y funciona.',
      'No contestes a un mensaje en caliente.',
    ],
    scripture: ['Mateo 5, 5', 'Mateo 11, 29', 'Números 12, 3', 'Santiago 1, 19-20', 'Gálatas 6, 1'],
    quotes: [
      escala(
        'La mansedumbre es una disposición inalterable de la mente, que permanece igual en la honra y en la deshonra. La mansedumbre consiste en rezar sin turbación y sinceramente por el prójimo cuando nos ofende. La mansedumbre es una roca alzada sobre el mar de la irascibilidad, contra la que se rompen todas las olas que la golpean, sin que ella se mueva.',
        'escalón 24, 2-4',
      ),
      escala(
        'El principio de la paz frente a la ira es callar la boca cuando el corazón se turba; el medio, callar los pensamientos cuando el alma se turba apenas; y el fin, una calma inmóvil al soplar de los vientos impuros.',
        'escalón 8, 4',
      ),
    ],
    themes: ['paz'],
    saints: [
      { id: 'profeta-moises', why: 'De él dice el libro de los Números que era muy manso, más que todos los hombres que había sobre la tierra.' },
      { id: 'serafin-sarov', why: 'Unos ladrones lo dejaron medio muerto a golpes. Cuando los encontraron, pidió que los perdonaran.' },
    ],
  },
  {
    id: 'obediencia',
    what: [
      'Obedecer viene de oír: es la virtud de quien escucha de verdad. Su modelo es Cristo, que se hizo obediente hasta la muerte, y su Madre, cuyo «hágase» abrió la historia de la salvación. Y como Adán cayó por desobedecer, la vuelta a Dios pasa por lo contrario.',
      'En los monasterios se vive entregando la propia voluntad al padre espiritual, y san Juan Clímaco la llama sepulcro de la voluntad propia. Fuera del monasterio no tiene esa forma, y conviene no trasladarla sin más: ningún padre espiritual puede mandar lo que va contra los mandamientos ni ocupar el lugar de la conciencia. Pero existe para todos: a Dios en sus mandamientos, a la Iglesia en sus ayunos y su regla, al padre espiritual cuando se le consulta, y a las circunstancias, cuando no hay modo de cambiarlas.',
    ],
    against:
      'La voluntad propia, que hace lo que le apetece y lo llama libertad. Y su extremo opuesto: la obediencia ciega a quien no tiene autoridad para mandarla, que la Iglesia no pide.',
    practice: [
      'Cumple la regla de oración que te has puesto, aunque hoy no te apetezca.',
      'Si tienes padre espiritual, consúltale antes de las decisiones grandes.',
      'Cede hoy en algo pequeño que te daría igual.',
    ],
    scripture: ['Filipenses 2, 8', 'Lucas 1, 38', '1 Samuel 15, 22', 'Hebreos 5, 8-9', 'Juan 14, 15'],
    quotes: [escala('La obediencia es el sepulcro de la propia voluntad y la resurrección de la humildad.', 'escalón 4, 3')],
    themes: ['obediencia'],
    saints: [{ id: 'juan-escala-marzo', why: 'El autor de la «Escala», que dedica a la obediencia uno de sus peldaños más largos.' }],
    see: [
      { label: 'Tu regla de oración', path: '/orar/regla' },
      { label: 'Cómo se pide la bendición', path: '/orar/oraciones/pedir-la-bendicion' },
    ],
  },
  {
    id: 'silencio',
    what: [
      'Hay dos silencios: el de la boca y el del pensamiento, y el primero es el principio del segundo. Quien habla sin parar no se oye a sí mismo, y menos a Dios. Y la lengua, dice Santiago, es un fuego: la mayor parte de las veces lo que se dice de más se dice contra alguien.',
      'No es callar por timidez ni por no comprometerse: hay tiempo de callar y tiempo de hablar, y el que calla ante la injusticia no está practicando esta virtud. Es saber que no todo hay que decirlo, ni comentarlo, ni opinarlo, y reservar un rato al día sin ruido para poder rezar.',
    ],
    against:
      'El vaniloquio del que san Efrén pide que se nos libre: hablar por hablar. La murmuración, la burla, la mentira. Y el ruido de fondo permanente, que hoy se lleva en el bolsillo.',
    practice: [
      'Guarda un rato al día sin pantallas ni ruido, aunque sea poco.',
      'Antes de contar algo de alguien, pregúntate si es verdad, si hace falta y si es amable.',
      'En la iglesia, no hables más que lo necesario.',
    ],
    scripture: ['Santiago 3, 1-10', 'Proverbios 10, 19', 'Eclesiastés 3, 7', 'Mateo 12, 36-37'],
    quotes: [
      escala(
        'El silencio prudente es madre de la oración, guardián del fuego divino, vigía de los pensamientos, escuela del llanto, amigo de las lágrimas.',
        'escalón 11, 3',
      ),
      escala(
        'El que conoce sus pecados tiene dominio sobre su lengua; pero el que habla mucho aún no se ha conocido como debe. El que ama el silencio se acerca a Dios, y hablando con Él en secreto recibe de Él la luz.',
        'escalón 11, 4-5',
      ),
    ],
    themes: ['silencio', 'celda'],
    saints: [{ id: 'arsenio-grande', why: 'Preceptor de príncipes en la corte, que oyó, cuentan los apotegmas: «Huye, calla, reposa».' }],
  },
  {
    id: 'vigilancia',
    what: [
      'Los Padres griegos la llaman «nepsis», que quiere decir sobriedad, no estar borracho: estar despierto por dentro. Es la atención del que vigila la puerta del corazón y mira qué pensamientos quieren entrar, antes de que hayan entrado. De ella toman nombre los padres népticos, los autores de la Filocalia.',
      'Tiene dos compañeras: la oración continua y el recuerdo de la muerte. No por morbo: el que se acuerda de que se va a morir no pierde el tiempo en lo que no importa. San Juan Clímaco dice que es más necesario que el pan. «Velad», dijo el Señor, y lo dijo a todos.',
    ],
    against:
      'La distracción, el vivir dormido, yendo de lo que toca a lo que toca. La insensibilidad, que la «Escala» llama muerte del alma antes de la del cuerpo. Y la curiosidad sin freno, que llena la cabeza y deja el corazón a la intemperie.',
    practice: [
      'Examina el día cada noche, en dos minutos: qué pensamientos han mandado hoy.',
      'Cuando notes que un pensamiento empieza a tirar de ti, no le contestes: di la oración de Jesús.',
      'Acuérdate de la muerte sin miedo, y de lo que querrías haber hecho.',
    ],
    scripture: ['Mateo 26, 41', '1 Pedro 5, 8', 'Marcos 13, 35-37', 'Lucas 12, 35-37', 'Proverbios 4, 23'],
    quotes: [
      escala(
        'Así como el pan es más necesario que cualquier otro alimento, así el pensamiento de la muerte es más necesario que cualquier otra práctica.',
        'escalón 6, 4',
      ),
      escala('El ojo vigilante purifica la mente; el mucho dormir endurece el alma.', 'escalón 20, 3'),
    ],
    themes: ['vigilancia', 'muerte'],
    saints: [
      { id: 'nicodemo-hagiorita', why: 'Publicó en 1782, con san Macario de Corinto, la Filocalia, la colección de los padres népticos.' },
      { id: 'juan-escala-marzo', why: 'El autor de la «Escala», que dedica un peldaño al recuerdo de la muerte y otro a la vela.' },
    ],
    see: [{ label: 'La oración de Jesús', path: '/orar/oracion-de-jesus' }],
  },
  {
    id: 'desprendimiento',
    what: [
      'Es la libertad frente a lo que se tiene. No es pobreza por la pobreza, ni desprecio de las cosas, que son buenas y creadas por Dios. Es que no sean ellas las que te tengan: donde está tu tesoro, allí estará también tu corazón. El monje lo deja todo; el que vive en el mundo se queda con lo necesario, usa lo que tiene y da lo que le sobra.',
      'San Juan Clímaco observa algo que sigue siendo verdad: el amor al dinero empieza poniendo como excusa la limosna y acaba en odio a los pobres. Y que el que depende de lo que tiene no reza en paz, porque se pone a hacer cuentas en medio de la oración. La primera bienaventuranza es para los pobres de espíritu.',
    ],
    against:
      'La avaricia, que san Pablo llama idolatría y raíz de todos los males. El ansia de tener más, que nunca se acaba. Y la preocupación, que es la avaricia de los que no tienen: el afán por el mañana.',
    practice: [
      'Da algo que te cueste, con regularidad; no sólo lo que te sobra.',
      'Antes de comprar lo que no necesitas, espera unos días.',
      'Cuando te preocupe el dinero, lee Mateo 6 y reza; luego haz lo que puedas.',
    ],
    scripture: ['Mateo 6, 19-21', 'Lucas 12, 15', '1 Timoteo 6, 9-10', 'Hebreos 13, 5'],
    quotes: [
      escala(
        'La pobreza es dejar las preocupaciones terrenas, vivir sin inquietud, caminar sin estorbo, tener fe en los mandamientos del Salvador; es ajena a la tristeza.',
        'escalón 17, 1',
      ),
      escala(
        'El amor al dinero empieza con el pretexto de dar limosna y acaba en odio a los pobres. El avaro es misericordioso mientras reúne dinero; pero en cuanto lo ha juntado, cierra la mano.',
        'escalón 16, 8',
      ),
    ],
    themes: ['trabajo'],
    saints: [
      { id: 'antonio-magno', why: 'Oyó en la iglesia «vende lo que tienes», y salió a hacerlo.' },
      { id: 'nilo-sora', why: 'Defendió en Rusia que los monasterios no tuvieran tierras ni riquezas.' },
    ],
  },
  {
    id: 'perdon',
    what: [
      'Es la única petición que el Señor comenta al enseñar el Padre Nuestro: perdónanos como nosotros perdonamos. No es olvidar ni hacer como si nada, y no exige volver a confiar en quien te hace daño: es renunciar a devolverlo, dejar de alimentar el rencor y pedir a Dios el bien para quien te ofendió.',
      'Su otra cara es no juzgar. San Juan Clímaco llama al rencor clavo hincado en el alma y orín de la oración. Y la Iglesia lo pone a las puertas de la Cuaresma: el domingo del Perdón cada uno pide perdón a los demás antes de empezar el ayuno. Se empieza por la voluntad: el sentimiento viene mucho después, o no viene, y eso no invalida el perdón.',
    ],
    against:
      'El rencor, que se alimenta repasando la ofensa. La venganza, también la pequeña. Y el juicio: decidir lo que vale alguien por lo que hizo, que sólo corresponde a Dios.',
    practice: [
      'Di en la oración el nombre de quien te ha herido, aunque sólo puedas decir el nombre.',
      'Si no puedes perdonar todavía, pide poder querer hacerlo.',
      'Si has ofendido a alguien, no esperes a que se le pase: ve.',
      'Perdonar no obliga a quedarse al lado de quien te hace daño, ni a callar un abuso.',
    ],
    scripture: ['Mateo 6, 12-15', 'Mateo 18, 21-22', 'Efesios 4, 31-32', 'Lucas 6, 37', 'Romanos 12, 17-21'],
    quotes: [
      escala(
        'El rencor es la consumación de la ira, la conservación de los pecados, la ruina de las virtudes, el orín del alma, el gusano de la mente, la vergüenza de la oración, un clavo hincado en el alma.',
        'escalón 9, 2',
      ),
      escala(
        'Si de verdad amas al prójimo, como dices, no te burles de él, sino reza por él en secreto; porque esta forma de amor agrada a Dios. Dejarás de juzgar a los que pecan si te acuerdas siempre de que Judas estaba en la compañía de los discípulos de Cristo, y el ladrón entre los asesinos; pero en un instante se produjo en ellos un cambio admirable.',
        'escalón 10, 4',
      ),
    ],
    themes: ['no-juzgar', 'amor'],
    saints: [
      { id: 'esteban-protomartir', why: 'Murió apedreado, rogando por los que le tiraban las piedras.' },
      { id: 'moises-etiope', why: 'Llamado a juzgar a un hermano, llegó cargando un saco agujereado lleno de arena: «Mis pecados se me van saliendo por detrás, y vengo a juzgar a otro».' },
    ],
    see: [{ label: 'Perdón antes de dormir', path: '/orar/oraciones/perdon-nocturno' }],
  },
  {
    id: 'misericordia',
    what: [
      'Es que el dolor del otro te duela, y que eso se note en lo que haces. Es lo que Dios es con nosotros: la palabra griega «eleos» es la que se repite en cada «Señor, ten piedad». Y Cristo dice que en el juicio preguntará por esto: tuve hambre, tuve sed, estuve enfermo.',
      'San Juan Crisóstomo no se cansó de decir que no se puede honrar el cuerpo de Cristo en el altar y despreciarlo en el pobre. Y san Isaac el Sirio llevó la idea hasta donde pocos: un corazón misericordioso es el que arde por toda la creación, hasta rezar con lágrimas por los animales y aun por los demonios.',
    ],
    against:
      'La dureza de corazón, que ve y pasa de largo, como el sacerdote y el levita de la parábola. Y la limosna sin mirar a la cara: se puede dar dinero sin misericordia.',
    practice: [
      'Visita a un enfermo o a alguien que está solo; llama a quien no llama nadie.',
      'Da con la mano y con los ojos: mira a quien ayudas.',
      'Cuando veas pecar a alguien, ten con él la compasión que tendrías con un enfermo.',
    ],
    scripture: ['Mateo 5, 7', 'Lucas 6, 36', 'Santiago 2, 13-17', 'Isaías 58, 6-8', 'Mateo 9, 13'],
    quotes: [
      {
        text: '¿Qué es un corazón misericordioso? El ardor del corazón del hombre por toda la creación: por los hombres, por las aves, por los animales, por los demonios y por toda criatura. Al recordarlos y al mirarlos, sus ojos derraman lágrimas. Por la grande y fuerte compasión que abraza su corazón, y por su mucha paciencia, su corazón se enternece, y no puede soportar ni oír ni ver ningún daño o la menor tristeza que sufra una criatura.',
        who: 'San Isaac el Sirio',
        where: 'Homilías ascéticas, 48',
        fatherId: 'isaac-sirio',
      },
    ],
    themes: ['amor'],
    saints: [
      { id: 'juan-limosnero', why: 'Patriarca de Alejandría, que llamaba a los pobres «mis señores» y murió sin dejar nada.' },
      { id: 'cosme-damian', why: 'Médicos que no cobraban: por eso se les llama Anárgiros, los sin plata.' },
      { id: 'nicolas-mira-dic', why: 'El obispo de Mira, del que se cuenta que dio de noche la dote a tres muchachas pobres.' },
    ],
    see: [{ label: 'San Juan Crisóstomo: honrar el Cuerpo de Cristo', path: '/biblioteca/padres/juan-crisostomo/crisostomo-homilias-mateo' }],
  },
  {
    id: 'compuncion',
    what: [
      'Es el dolor del corazón por haber ofendido a quien se ama: los Hechos dicen de los que oyeron a san Pedro que fueron compungidos de corazón. Los Padres griegos hablan de «penthos», un llanto que no es tristeza de este mundo, y que san Juan Clímaco llama alegre: el título de su peldaño es «del llanto que causa alegría».',
      'San Pablo distingue con cuidado dos tristezas: la que viene de Dios, que lleva al arrepentimiento y a la vida, y la del mundo, que lleva a la muerte. La primera mira a Dios; la segunda se mira a sí misma, y acaba en desesperación. Las lágrimas son un don que se pide, no algo que se fabrique, y quien no las tiene no está peor: basta con el corazón.',
    ],
    against:
      'La dureza de corazón, la insensibilidad de piedra de la que pide librarnos san Juan Crisóstomo. Y el escrúpulo, que confunde el arrepentimiento con la angustia: ése no viene de Dios.',
    practice: [
      'Acaba el día nombrando ante Dios lo que has hecho mal, sin excusas, y pidiendo perdón.',
      'Confiésate con regularidad, no sólo cuando te pese mucho.',
      'Lee el Gran Canon en Cuaresma, y el salmo 50 cuando caigas.',
    ],
    scripture: ['Salmos 51, 1-12', '2 Corintios 7, 9-10', 'Lucas 18, 13', 'Mateo 5, 4', 'Hechos 2, 37-38'],
    quotes: [
      escala(
        'El arrepentimiento es la renovación del bautismo. El arrepentimiento es un pacto con Dios para enmendar la vida. El arrepentimiento es hija de la esperanza y rechazo de la desesperación. El arrepentimiento es la purificación de la conciencia.',
        'escalón 5, 1',
      ),
    ],
    themes: ['arrepentimiento'],
    saints: [
      { id: 'maria-egipcia', why: 'Lloró sus pecados en el desierto hasta el final de su vida. Su historia se lee en la quinta semana de Cuaresma.' },
      { id: 'efren-sirio-santo', why: 'El autor de la oración de la Cuaresma, al que la tradición griega atribuye un sinfín de oraciones de arrepentimiento.' },
    ],
    see: [
      { label: 'Gran Canon de san Andrés de Creta', path: '/orar/oraciones/canon-arrepentimiento-ref' },
      { label: 'Cómo es la confesión', path: '/orar/oraciones/como-es-la-confesion' },
    ],
  },
  {
    id: 'gratitud',
    what: [
      '«Eucaristía» quiere decir acción de gracias: el centro de la vida de la Iglesia se llama así. Dar gracias no es cortesía: es reconocer que todo lo que tengo, empezando por existir, lo he recibido. San Pablo manda darlas en todo, no sólo en lo que a uno le gusta.',
      'La prueba es la desgracia. San Juan Crisóstomo murió en el destierro, agotado, y sus últimas palabras, según su biógrafo, fueron «Gloria a Dios por todas las cosas». San Doroteo explica el porqué: lo que Dios permite, lo permite amándonos. No se trata de dar gracias por el mal, sino de no dejar de darlas en medio del mal.',
    ],
    against:
      'La ingratitud, que olvida lo recibido y se queda con lo que falta. La queja como forma de vida. Y la envidia, que no puede alegrarse de lo que tiene otro.',
    practice: [
      'Al acostarte, nombra tres cosas de hoy por las que puedes dar gracias.',
      'Da gracias antes y después de comer.',
      'Después de comulgar, reza la acción de gracias.',
      'Da las gracias también a la gente, y por su nombre.',
    ],
    scripture: ['1 Tesalonicenses 5, 18', 'Colosenses 3, 15-17', 'Lucas 17, 15-18', 'Salmos 103, 1-5', 'Efesios 5, 20'],
    quotes: [
      doroteo(
        'Debemos, como dijo el Apóstol, dar gracias en todo a su bondad, y no entristecernos nunca ni desanimarnos por lo que nos ocurre.',
        'XIII',
      ),
    ],
    themes: [],
    saints: [
      { id: 'juan-crisostomo', why: 'Murió en el camino del destierro diciendo: «Gloria a Dios por todas las cosas».' },
      { id: 'job-paciente', why: 'Bendijo a Dios cuando lo había perdido todo.' },
    ],
    see: [{ label: 'Gloria a Dios por todas las cosas', path: '/orar/oraciones/gloria-a-dios-por-todo' }],
  },
  {
    id: 'paz-interior',
    what: [
      'Los Padres griegos la llaman «hesychía», quietud: no es que no pase nada, sino que lo de dentro ha dejado de agitarse. «Mi paz os doy», dijo el Señor, «no como el mundo la da». San Juan Clímaco la describe como el buen orden de los pensamientos, y a ella está orientado el hesicasmo, la tradición de oración del Monte Athos.',
      'No se consigue huyendo de los problemas, ni con técnicas de relajación: viene de estar en paz con Dios, y por eso pasa por la confesión y el perdón. San Serafín de Sarov lo resumió en su frase más repetida: «Adquiere el espíritu de paz, y a tu alrededor se salvarán miles». Y es para todos: el que vive en el ruido la busca igual, con menos tiempo.',
    ],
    against:
      'La agitación, la prisa, la inquietud por todo. La discusión interior sin fin con quien te ha ofendido. Y la paz falsa, la del que no quiere enterarse de nada.',
    practice: [
      'Reza la oración de Jesús despacio, unos minutos, respirando con calma.',
      'No tomes decisiones en plena agitación.',
      'Haz la paz con alguien antes de irte a dormir.',
    ],
    scripture: ['Juan 14, 27', 'Filipenses 4, 6-7', 'Salmos 4, 8', 'Isaías 26, 3', 'Mateo 5, 9'],
    quotes: [
      escala(
        'La quietud del cuerpo es el buen orden de las costumbres y de los sentidos; la quietud del alma es el buen orden de los pensamientos y un pensar que no se deja robar.',
        'escalón 27, 2',
      ),
    ],
    themes: ['paz', 'celda'],
    saints: [
      { id: 'serafin-sarov', why: 'Saludaba a todos con «Alegría mía, Cristo ha resucitado», en cualquier época del año.' },
      { id: 'gregorio-palamas', why: 'Defendió a los monjes hesicastas del Athos y su oración.' },
    ],
    see: [{ label: 'El hesicasmo, en el Athos', path: '/biblioteca/athos' }],
  },
  {
    id: 'oracion',
    what: [
      'La «Escala» la llama madre de las virtudes: de ahí salen las demás, y a ella vuelven. Es estar con Dios, antes que pedirle cosas. Puede hacerse con las palabras de la Iglesia, con las propias o sin palabras; con el cuerpo, con la voz o con la mente. Se aprende rezando: los discípulos pidieron que les enseñaran, y el Señor les dio el Padre Nuestro.',
      'San Pablo dice «orad sin cesar», y ese mandato es el que ha dado a la Iglesia la oración de Jesús. No hace falta sentir nada: los maestros avisan de que la oración seca, hecha con fidelidad, no vale menos que la que gusta. Lo único que no vale es dejarla.',
    ],
    against:
      'La pereza, y la excusa de que no se tiene tiempo. La distracción, que se combate volviendo sin enfadarse. Y rezar para quedar bien con uno mismo: el fariseo de la parábola también rezaba.',
    practice: [
      'Ponte una regla pequeña y cúmplela: mejor cinco minutos cada día que una hora de vez en cuando.',
      'Reza a la misma hora y en el mismo sitio, delante de un icono.',
      'Si una palabra de la oración te toca, quédate en ella.',
    ],
    scripture: ['1 Tesalonicenses 5, 17', 'Lucas 11, 1-4', 'Mateo 6, 5-6', 'Lucas 18, 1', 'Efesios 6, 18'],
    quotes: [
      escala(
        'La oración, por su cualidad, es la permanencia y unión del hombre con Dios; por su acción, sostén del mundo, reconciliación con Dios, madre y a la vez hija de las lágrimas, perdón de los pecados, puente para pasar las tentaciones, muro contra las aflicciones, fuente de las virtudes, alimento del alma, iluminación de la mente, hacha contra la desesperación.',
        'escalón 28, 1',
      ),
      escala(
        'Una sola palabra del publicano aplacó a Dios, y una sola frase llena de fe salvó al ladrón. La mucha palabrería en la oración a menudo dispersa la mente y la llena de fantasías; una sola palabra suele recogerla. Si en alguna palabra de la oración sientes dulzura o compunción, detente en ella; porque entonces también nuestro ángel de la guarda reza con nosotros.',
        'escalón 28, 10-11',
      ),
    ],
    themes: ['oracion'],
    saints: [
      { id: 'juan-kronstadt', why: 'Párroco de una ciudad de marineros, que escribió en su diario «Mi vida en Cristo» lo que aprendía rezando.' },
      { id: 'gregorio-palamas', why: 'Enseñó que el que reza puede conocer de verdad a Dios, y no sólo saber cosas de Él.' },
    ],
    see: [
      { label: 'Formas de rezar', path: '/orar/formas' },
      { label: 'La oración de Jesús', path: '/orar/oracion-de-jesus' },
      { label: 'Tu regla de oración', path: '/orar/regla' },
    ],
  },
];

export const VIRTUES_BY_ID = new Map(VIRTUES.map((v) => [v.id, v]));
