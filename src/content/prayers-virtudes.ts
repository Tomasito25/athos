/**
 * Las oraciones de las virtudes, y las que faltaban para rezar a cada uno.
 *
 * Añadidas en la 2.1, cuando se rehízo el menú de oración. Son de tres clases,
 * y cada ficha dice de cuál:
 *
 * - **Oraciones de los Padres**, traducidas para ATHOS. San Efrén y san
 *   Gregorio Nacianceno desde la versión rusa de la Academia Teológica de Moscú
 *   (siglo XIX, de dominio público), que es de la griega; lo dicen, porque no
 *   es lo mismo que traducir del griego. Las demás, de su texto eslavo o ruso.
 *
 * - **Piezas de los oficios que ATHOS ya tiene**, ahora también sueltas: el
 *   «Luz alegre», la oración de san Antíoco, las de las Horas. Se importan del
 *   oficio, de modo que el texto es uno solo.
 *
 * - **La Escritura y los salmos.** No hay texto aquí: sólo la referencia, y lo
 *   trae la Biblia de ATHOS al abrir la oración. Reunirlos por virtudes es una
 *   decisión editorial; escribirlos de memoria no se puede.
 *
 * Se dejaron fuera a propósito dos textos que se encontraron y son auténticos.
 * La oración de san Gregorio que pide a Cristo «termina mi vida» no conviene en
 * una lista que abre quien busca consuelo. Y la del akáthistos a la Trinidad
 * dirigida al Hijo habla de «satisfacer a la justicia» del Padre, que es lenguaje
 * de la teología escolástica y no de la tradición de la Iglesia.
 *
 * Tampoco está la oración de san Teodosio de las Cuevas: en Wikisource sólo se
 * ha encontrado en una versión rusa moderna con derechos, y no en su original.
 */
import type { SourceMeta, TextBlock } from '@/types';
import type { ThirdPrayerSeed } from './prayers-third';
import { ANTIOCO, PABLO_EVERGETINO } from './completas';
import { ORACION_FINAL_DE_LA_HORA } from './horas';
import { LUZ_ALEGRE } from './visperas';
import { ANTES_DEL_EVANGELIO, DETRAS_DEL_AMBON } from './liturgia-crisostomo';
import { HE_AQUI_EL_ESPOSO } from './medianoche';
import { LENTEN_HOURS, MOVABLE_KONTAKIA, SAINT_KONTAKIA } from './kontakia';
import { SAINT_PROPER_TROPARIA } from './troparia-santos';
import { embed } from './comun';
import { GREEK_FORMULAS } from './greek';

const FECHA = '2026-11-03';

const DERECHOS =
  'El original es de dominio público. Esta versión española es una traducción hecha para ATHOS y se publica bajo CC BY-SA 4.0.';
const NOTA =
  'Es una traducción de un texto que existe, no una oración escrita para ATHOS. La versión española es de ATHOS: no procede de un libro de oraciones español publicado.';

const traduccion = (fuente: string, original: string, autor?: string, nota?: string): SourceMeta => ({
  source: `${fuente}. Traducción al español hecha para ATHOS a partir de ${original}, de dominio público`,
  tradition: 'Rito bizantino',
  language: 'es',
  license: 'cc-by-sa-4.0',
  copyright: DERECHOS,
  dateAdded: FECHA,
  author: autor,
  notes: nota ? `${NOTA} ${nota}` : NOTA,
});

const OBRAS_EFREN = 'Obras de san Efrén el Sirio, parte IV (Sérgiev Posad, 1900), «Oraciones para diversas ocasiones»';
const VERSION_RUSA_EFREN = 'la versión rusa de la Academia Teológica de Moscú, hecha sobre el griego';
const AVISO_EFREN =
  'Pertenece al Efrén griego: las oraciones que corren en griego con su nombre, de las que no todas son suyas. La versión rusa de la que se ha traducido la hizo la Academia de Moscú desde el griego.';

const efren = (numero: number, fragmento = false): SourceMeta =>
  traduccion(
    `${OBRAS_EFREN}, oración ${numero}`,
    VERSION_RUSA_EFREN,
    'San Efrén el Sirio († 373), según la tradición griega',
    fragmento ? `${AVISO_EFREN} Es un fragmento, y lo que falta se indica donde falta.` : AVISO_EFREN,
  );

const nacianceno = (poema: string, nota?: string): SourceMeta =>
  traduccion(
    `San Gregorio Nacianceno, «${poema}», de sus poemas (PG 37), en la transcripción de Wikisource`,
    'la versión rusa de la Academia Teológica de Moscú (1843-1848), hecha sobre el griego',
    'San Gregorio Nacianceno († ca. 390)',
    nota,
  );

const AKATHISTOS_TRINIDAD = 'Akáthistos a la santísima y vivificante Trinidad, oraciones finales, en la transcripción de Wikisource';
const AVISO_AKATHISTOS =
  'Es de un akáthistos ruso, impreso con la ortografía anterior a 1918, de autor que no se ha podido averiguar. Se cotejó con la edición de RussPortal.';

const delOficio = (oficio: string, autor?: string): SourceMeta => ({
  source: `${oficio}. Traducción al español hecha para ATHOS a partir del original griego, que es de dominio público`,
  tradition: 'Rito bizantino',
  language: 'es',
  license: 'cc-by-sa-4.0',
  copyright: DERECHOS,
  dateAdded: FECHA,
  author: autor,
  notes: `${NOTA} Es la misma versión que ATHOS reza en ese oficio.`,
});

/** Lo que viene de la Biblia de ATHOS: ni una palabra de Escritura está escrita aquí. */
const ESCRITURA: SourceMeta = {
  source: 'La Biblia de ATHOS: Reina-Valera 1909 y, en los libros que ésta no trae, Santa Biblia libre para el mundo',
  tradition: 'Sagrada Escritura',
  language: 'es',
  license: 'public-domain',
  copyright: 'Las dos versiones son de dominio público.',
  dateAdded: FECHA,
  notes:
    'El texto se trae de la Biblia de ATHOS al abrir la oración, y no se copia aquí. Reunir estos pasajes por necesidades y virtudes es decisión de ATHOS, y lo que va en cursiva antes del pasaje lo ha escrito ATHOS para situarlo.',
};

/** La numeración hebrea de un salmo a partir de la de los Setenta, para la ficha. */
const hebreo = (lxx: number): string => {
  if (lxx < 9 || lxx > 147) return String(lxx);
  if (lxx === 9) return '9-10';
  if (lxx === 113) return '114-115';
  if (lxx === 114 || lxx === 115) return '116';
  if (lxx === 146 || lxx === 147) return '147';
  return String(lxx + 1);
};

const SALTERIO = (lxx: number[]): SourceMeta => ({
  source: `Salterio, ${lxx.length > 1 ? 'salmos' : 'salmo'} ${lxx.join(', ')} según la numeración de los Setenta (${lxx.map(hebreo).join(', ')} hebreo). Reina-Valera 1909`,
  tradition: 'Rito bizantino',
  language: 'es',
  license: 'public-domain',
  copyright: 'La Reina-Valera de 1909 es de dominio público.',
  dateAdded: FECHA,
  notes:
    'El texto es el del Salterio de ATHOS, con la numeración litúrgica de los Setenta. Lo que va en cursiva antes del salmo lo ha escrito ATHOS para situarlo.',
});

const t = (content: string): TextBlock => ({ kind: 'text', content });
const rub = (content: string): TextBlock => ({ kind: 'rubric', content });
const head = (content: string): TextBlock => ({ kind: 'heading', content });
const lectura = (cita: string): TextBlock => ({ kind: 'reading', content: cita, ref: cita });
const salmoBloque = (n: number): TextBlock => ({ kind: 'psalm', content: `Salmo ${n}`, ref: String(n) });

type Categoria = ThirdPrayerSeed['category'];

/** Una oración que es uno o varios pasajes de la Escritura. */
const pasaje = (
  id: string,
  category: Categoria,
  title: string,
  subtitle: string,
  citas: string[],
  nota?: string,
): ThirdPrayerSeed => ({
  id,
  category,
  title,
  subtitle,
  blocks: [...(nota ? [rub(nota)] : []), ...citas.map(lectura)],
  meta: ESCRITURA,
});

/** Una oración que es un salmo, con su número de los Setenta. */
const salmo = (id: string, category: Categoria, n: number, title: string, nota?: string): ThirdPrayerSeed => ({
  id,
  category,
  title,
  subtitle: `Salmo ${n}`,
  blocks: [...(nota ? [rub(nota)] : []), salmoBloque(n)],
  meta: SALTERIO([n]),
});

const finalDeHora = (id: string) => {
  const oracion = ORACION_FINAL_DE_LA_HORA.get(id);
  if (!oracion) throw new Error(`No hay oración final de ${id}`);
  return oracion;
};

/* ================================ Oraciones de los Padres ================================ */

const DE_LOS_PADRES: ThirdPrayerSeed[] = [
  /* ------------------------------- San Efrén ------------------------------- */
  {
    id: 'humildad-efren',
    category: 'humildad',
    title: 'Da humildad a mi corazón',
    subtitle: 'De san Efrén el Sirio',
    blocks: [
      t('Jesucristo, Dios mío, amante de los hombres: esperando firmemente en tus misericordias, te suplico que no me pongas a tu izquierda con los machos cabríos que te amargaron, y que no me digas: «En verdad te digo que no te conozco». Antes bien, por tu bondad, dame lágrimas sin fin, da compunción y humildad a mi corazón, y purifícalo con tu temor en la comunión de tus vivificantes y purísimos Misterios, para que se haga templo de tu gracia.'),
      t('Porque, aunque soy muy pecador e indigno, llamo sin cesar a tu puerta; aunque soy negligente y perezoso y descuido mi salvación, voy sin embargo por tu camino. Sálvame por tu misericordia, porque Tú, Señor, eres bueno con todos, y tus compasiones están sobre todas tus obras; y a Ti sea la gloria por los siglos. Amén.'),
    ],
    meta: efren(9),
  },
  {
    id: 'compuncion-lagrimas',
    category: 'compuncion',
    title: 'Dame compunción y lágrimas',
    subtitle: 'De san Efrén el Sirio',
    blocks: [
      t('Señor Jesucristo, Hijo de Dios, Dios y Salvador mío, dulzura inefable, nombre salvador: concédeme a mí, tu siervo indigno, compunción e iluminación del corazón, para que, iluminado el corazón, derrame lágrimas con dulzura en la oración pura; y con mis pocas lágrimas borrarás el documento de mis pecados, y por un poco de llanto apagarás el fuego encendido en mí. Porque, si me concedes, Soberano, llorar aquí, me librarás allí del fuego inextinguible.'),
      t('Y aunque sé, sé, Señor longánime y amante de los hombres, que cada día y cada hora te amargo y te irrito sin medida, la bondad de tu paciencia vencerá mi maldad y mi amargura. Porque si una madre, a la que su propio hijo no honra, se deja vencer por su ternura y no puede despreciarlo, ¿cuánto más tu gracia y tu bondad, Señor compasivo y longánime, movidas por tus misericordias sin medida, vencerán mi maldad y tendrán piedad de mí?'),
      t('Sí, Señor que amas el bien, Dios de misericordia y de compasión: sálvame de los malos pensamientos del enemigo impuro y terrible, que a cada hora rodea y oprime mi alma con pensamientos malos e inmundos. Tu poder inefable, oh Cristo, que reprendió las olas del mar, lo reprenda a él, lo deje sin fuerza y lo eche lejos de mí, tu siervo. Porque cada día renueva contra mí sus asechanzas y se apresura a dominar mi mente débil y a alejarme de Ti y de tus divinos mandamientos.'),
      t('Pero Tú, Soberano, Señor de mucha misericordia, envía pronto tu ayuda y aleja de mí, tu siervo inútil, a esta gran serpiente con todos sus pensamientos malos y repugnantes, para que te cante y te glorifique con pureza, con tu Padre sin principio y tu santísimo, bueno y vivificante Espíritu, sin cesar, ahora y siempre, y por los siglos de los siglos. Amén.'),
    ],
    meta: efren(7),
  },
  {
    id: 'compuncion-puerta',
    category: 'compuncion',
    title: 'Ábreme la puerta del arrepentimiento',
    subtitle: 'De san Efrén el Sirio',
    blocks: [
      t('Soberano Señor, Dios del cielo y de la tierra, Rey de los siglos: dígnate abrirme la puerta del arrepentimiento, porque te suplico con el alma dolorida. Mírame según tu gran compasión, recibe mi súplica y no rechaces mi petición; perdóname, culpable de muchas caídas. Inclina tu oído a mi súplica y perdóname todo el mal que he hecho, como hombre vencido por su propia voluntad. Porque busco descanso y no lo encuentro, pues mi conciencia está manchada, y no hay paz en mí por la multitud de mis iniquidades.'),
      t('Escucha, Señor, al corazón que clama a Ti con dolor. No atiendas a mis malas obras, sino mira el dolor de mi alma y apresúrate a curarme, a mí, cruelmente herido; concédeme volver pronto en mí por la gracia de tu amor a los hombres; líbrame de mis peores obras y no me pagues lo que merece lo que he hecho, para que no perezca del todo ni pierda todo afán y todo pensamiento de enmendarme.'),
      t('Caigo, pues, ante tus misericordias: ten piedad de mí, derribado por la condena de mis obras. Llama, Soberano, a este cautivo al que sujetan y como con cadenas atan sus obras; porque sólo Tú sabes desatar a los atados y curar las heridas invisibles, que sólo Tú conoces, que sabes lo oculto. Porque, por muchos males que padezca, encuentro que para todas estas desgracias Tú te llamas médico de los afligidos, puerta de los que se lamentan fuera, libertador de los que son llevados cautivos; Tú, que siempre detienes tu mano y no envías la ira preparada para los pecadores, sino que por tu gran amor a los hombres nos das tiempo para volver en nosotros; porque eres pronto en la misericordia y lento en el castigo.'),
      t('Dígnate, pues, tenderme la mano y levantarme del lodo de mis iniquidades, Tú que no te alegras de la perdición de los hombres ni apartas tu rostro del que te mira con lágrimas. Escucha, Señor, la voz de tu siervo que clama a Ti; muestra tu rostro a este entenebrecido, ilumíname con la venida de tu Espíritu Santo, dame celo a mí, manchado, y cambia mi fatiga, Señor, en alegría; rasga mi saco y cíñeme de gozo; y que se me abra la puerta de tu Reino, para que, entrando en él, glorifique tu santísimo nombre, del Padre, y del Hijo, y del Espíritu Santo, por los siglos de los siglos. Amén.'),
    ],
    meta: efren(4),
  },
  {
    id: 'castidad-efren',
    category: 'castidad',
    title: 'Líbrame de esta esclavitud',
    subtitle: 'De san Efrén el Sirio, contra las pasiones',
    blocks: [
      t('Sé mi ayuda, Soberano de todos, oh Cristo; defiende la debilidad de mi alma, para que me libre de esta corrupción repugnante y pecadora y quede libre de las ataduras del pecado; que no me tiranice la maldad, que no me domine el demonio enemigo como a un cautivo por la fuerza del pecado; sino que venga sobre mí el reino de tu Espíritu divino y adorable, para que se alejen de mí las pasiones impuras que ahora me dominan y reinan en mí.'),
      t('Porque Tú eres Dios de misericordia, de amor a los hombres y de compasión, y a Ti elevamos la gloria, con tu Padre sin principio y tu santísimo, bueno y vivificante Espíritu, ahora y siempre, y por los siglos de los siglos. Amén.'),
    ],
    meta: efren(10),
  },
  {
    id: 'perdon-efren',
    category: 'perdon',
    title: 'Por los que me odian',
    subtitle: 'De san Efrén el Sirio',
    blocks: [
      t('Ten piedad, Señor, de los que me odian y me envidian, y de los que hablan mal de mí y me calumnian; y que ninguno de ellos, ni en este siglo ni en el venidero, sufra ningún mal por causa mía, que soy impuro; sino santifícalos con tu misericordia y cúbrelos con tu bondad, oh Bondadosísimo.'),
    ],
    meta: efren(11),
  },
  {
    id: 'vigilancia-efren-muerte',
    category: 'vigilancia',
    title: 'Para la hora de la salida',
    subtitle: 'De san Efrén el Sirio',
    blocks: [
      t('Te engrandezco, Señor, porque miraste mi pequeñez, no me entregaste en manos de mis enemigos y salvaste mi alma de sus angustias. Y ahora, Soberano, que me cubra tu mano y venga sobre mí tu misericordia; porque mi alma está turbada y muy afligida, no sea que, al salir de este pobre cuerpo, le salga al paso la mano malvada del adversario y la retenga en las tinieblas por los pecados que cometí en esta vida, sin saberlo y a sabiendas.'),
      t('Sé misericordioso conmigo, Soberano de todas las cosas; que mi alma no vea la mirada sombría de los malos demonios, sino que la reciban tus ángeles puros y luminosos. Da gloria a tu santo nombre, y con tu poder llévame a tu trono divino. Y cuando sea juzgado, que no me arrebate la mano del príncipe de este mundo para llevarme, pecador, a lo hondo del infierno. Antes bien, ponte Tú a mi lado y sé mi salvador y mi defensor.'),
      t('Ten piedad, Señor, de mi alma, manchada por las pasiones de esta vida. Y si en algo, como hombre, por la flaqueza de la naturaleza, pequé de palabra, de obra o de pensamiento, Tú, que tienes poder para perdonar los pecados, perdóname y déjame libre, para que encuentre alivio y aparezca ante Ti sin mancha ni suciedad; que me reciba tu mano, Soberano, irreprochable y sin tacha; porque bendito eres por los siglos.'),
    ],
    meta: efren(6),
  },
  {
    id: 'vigilancia-efren-juicio',
    category: 'vigilancia',
    title: '¿Qué has sufrido tú por Mí?',
    subtitle: 'De san Efrén el Sirio, sobre el último día',
    blocks: [
      t('No me condenes a mí, que no tengo enmienda; no me rechaces a mí, perezoso e impaciente; y en tu segunda venida, cuando juzgues al mundo entero, no me digas, desdichado de mí: «¿Qué has sufrido tú por Mí?». Porque no tengo ni un poco de paciencia.'),
      t('En aquel día temible y terrible nos dirás, Señor, a los pecadores: «Bien sabéis, hombres, lo que he sufrido por vosotros. Yo, Dios, me encarné por vosotros; Yo, el invisible, habité visiblemente en la tierra por vosotros; por vosotros tuve hambre y sed y me cansé; por vosotros fui perseguido y apedreado; Yo, el que no tiene pecado, recibí bofetadas y salivazos por vosotros; Yo, el impasible, sufrí por vosotros una muerte vergonzosa; por vosotros me traspasaron el costado con una lanza y me dieron a beber vinagre mezclado con hiel; y clavado en la cruz con tales padecimientos no me airé, y ultrajado no maldije. Lo sufrí todo por vosotros, para haceros celestiales y santos. Os di el Reino de los cielos, a todos os llamé hermanos, os ofrecí como don al Padre, os envié el Espíritu Santo. ¿Qué habéis sufrido vosotros por Mí, hombres?».'),
      t('¿Qué responderé a esto yo, miserable, malo, pecador, impuro? Los mártires mostrarán entonces sus heridas, sus tormentos, sus miembros cortados y su paciencia hasta el fin. Los ascetas mostrarán su combate, su largo ayuno, su vela, su pobreza, sus lágrimas y su paciencia hasta el fin. Y yo, perezoso, pecador, culpable, ¿qué mostraré, sino los vergonzosos frutos de la gula, del amor al placer, del mucho dormir, de la avaricia, de la impaciencia, de la vanagloria y de la negligencia?'),
      t('¡Perdona, Señor! ¡Perdona, compasivo! ¡Perdona, amante de los hombres! ¡Perdona, único bueno, y no me tengas por indigno de tus misericordias! Acuérdate, Señor, de que tus misericordias son desde siempre, de generación en generación, sobre todo tu pueblo. Acuérdate de que para todos nosotros te has hecho refugio y salvación de los que esperan en Ti. Ten compasión y ten piedad de mí, por tu sola bondad.'),
      rub('Se ha dejado fuera el principio y parte del final de la oración, que son más largos.'),
    ],
    meta: efren(8, true),
  },
  {
    id: 'miedo-efren',
    category: 'miedo',
    title: 'Que se aparte el espíritu de miedo',
    subtitle: 'De san Efrén el Sirio, por los que están lejos',
    blocks: [
      rub('Es una oración por otros: por los que viajan o viven fuera de casa. Se reza igual por uno mismo.'),
      t('Dios justo y digno de alabanza, Dios eterno: escucha en esta hora a un hombre pecador. Escúchame, oh Dios, escúchame en tu fortaleza, sin recordar, en esta oración mía, las desobediencias constantes e incesantes de mi nada. Escúchame, Señor; escúchame con el fuego de la oración, como en otro tiempo a tu profeta. Sí, Dios de las santas potestades; sí, Creador de los incorpóreos; sí, Tú que dijiste: «Pedid y recibiréis»: no me rechaces a mí, impuro, que he manchado mis labios y estoy cubierto de pecados.'),
      t('Escúchame, Tú que prometiste escuchar a los que te invocan de verdad, y endereza los pasos de tus siervos y nuestros por camino de paz. Sé misericordioso con tus siervos sencillos que están en tierra extraña. Tú que dijiste: «Sed sencillos como palomas», a Ti clamé con todo mi corazón: Dios, Dios, escúchame, esperanza de todos los confines de la tierra y de los que viajan lejos.'),
      t('Reprende a todos los espíritus impuros, para que huyan de la presencia de tus siervos. Toma las armas y el escudo y levántate en su ayuda; desenvaina la espada y cierra el paso a los que los persiguen. Di, di, Señor, a sus almas: «Yo soy tu salvación». Que se aparte de su pensamiento el espíritu de miedo, el espíritu de desaliento, el espíritu de soberbia y de toda maldad; que se apague en ellos todo ardor que enciende la acción del diablo; que su cuerpo, su alma y su espíritu se iluminen con la luz de tu conocimiento, para que, llegados a la unidad de la fe y del conocimiento de la santa y adorable Trinidad, a la madurez del hombre perfecto, a la medida de su edad, por los siglos de los siglos, con los ángeles y con todos los que desde siempre agradaron a Dios, glorifiquen el honorabilísimo y protector nombre del Padre, y del Hijo, y del Espíritu Santo. Amén.'),
    ],
    meta: efren(3),
  },
  {
    id: 'amor-efren-gota',
    category: 'amor',
    title: 'Una sola gota de tu gracia',
    subtitle: 'De san Efrén el Sirio, para que arda el amor',
    blocks: [
      t('Sáname, Señor, y quedaré sano. Único Médico sabio y misericordioso: suplico a tu bondad que sanes las llagas de mi alma e ilumines los ojos de mi mente, para que comprenda el cuidado que siempre tienes de mí. Y puesto que mi corazón y mi mente se han vuelto necios, que los enderece tu gracia, esa sal verdadera. ¿Qué te diré, Tú que todo lo sabes de antemano y escrutas los corazones y las entrañas? Sólo Tú sabes que mi alma tiene sed de Ti como tierra sin agua, y que mi corazón te desea. Y tu gracia ha saciado siempre al que te ama. Por eso, como siempre me has escuchado, no desprecies tampoco ahora mi súplica. Porque mira: mi mente, como un cautivo, te busca a Ti, único Salvador verdadero. Envía, pues, tu gracia, que venga pronto en mi ayuda, y ella saciará mi hambre y apagará mi sed. Porque te deseo sin saciarme, Soberano. ¿Y quién puede saciarse de Ti, si de verdad te ama y tiene sed de la luz de tu verdad?'),
      t('Cumple mis peticiones, Dador de la luz, y concédeme lo que te pido: destila en mi corazón una sola gota de tu gracia, para que se encienda en él la llama de tu amor como fuego en el bosque, y devore como espinas y cardos los malos pensamientos. Dame en abundancia y sin medida, como Dios al hombre; concede como Rey de reyes; multiplica como padre bueno.'),
      rub('Aquí la oración sigue largamente. Su final dice:'),
      t('Mira: el verano alimenta los frutos de la tierra, y los árboles se coronan de flores diversas. Que el rocío de tu gracia riegue también mi mente y la adorne con las flores de la humildad, de la compunción, del amor y de la paciencia. ¿Y qué diré? Mira: mi oración es débil, y mis iniquidades son grandes y fuertes. Los pecados me aplastan y mis flaquezas me inquietan; pero Tú eres rico y bueno, misericordioso y generoso.'),
      t('Tú, que abriste los ojos al ciego, abre los ojos de mi mente, para que contemple sin cesar tu hermosura. Tú, que abriste la boca a la bestia de carga, abre mis labios para alabarte y para gloria de tu gracia. Tú, que pusiste límite al mar con la palabra de tu mandato, pon límite también a mi corazón con tu gracia, para que no se desvíe ni a la derecha ni a la izquierda de tu hermosura. Tú, que diste agua en el desierto a un pueblo rebelde y contestón, dame compunción y lágrimas a mis ojos, para que llore día y noche todo el tiempo de mi vida, con humildad, con amor y con corazón puro.'),
      t('Llegue mi súplica delante de Ti, Señor, y dame la santa semilla, para que te traiga gavillas llenas de compunción. ¡Gloria al que da lo que hay que ofrecerle! Escucha, Señor, la oración de tu siervo, por la intercesión de todos tus santos, Tú que estás sobre todos, bendito por los siglos. Amén.'),
    ],
    meta: efren(2, true),
  },

  /* --------------------------- San Gregorio Nacianceno --------------------------- */
  {
    id: 'templanza-nacianceno',
    category: 'templanza',
    title: 'Doy mi diestra a Dios',
    subtitle: 'Oración de la mañana de san Gregorio Nacianceno',
    blocks: [
      t('¡Mañana! Doy mi diestra a Dios: no haré ni aprobaré obras oscuras, sino que a Ti sobre todo te ofreceré en sacrificio este día, firme y dueño de mis pasiones. Y si lo paso mal, me avergonzaré de mi vejez y de esta Mesa ante la que estoy. Éste es mi deseo, oh Cristo; corónalo Tú con el éxito.'),
    ],
    meta: nacianceno('Oración de la mañana'),
  },
  {
    id: 'nacianceno-tarde',
    category: 'noche',
    title: 'Te mentí, a Ti que eres la Verdad',
    subtitle: 'Oración de la tarde de san Gregorio Nacianceno',
    blocks: [
      t('Te mentí a Ti, que eres la Verdad, oh Verbo, cuando te consagré este día. La noche no me ha encontrado del todo luminoso, ni como prometí y esperaba ser. En algo han tropezado mis pies, porque cayó la oscuridad, enemiga de la salvación. Tú, oh Cristo, haz brillar tu luz y muéstrate de nuevo a mí.'),
    ],
    meta: nacianceno('Oración de la tarde'),
  },
  {
    id: 'nacianceno-ira',
    category: 'ira',
    title: 'Se me perdió el día de ayer',
    subtitle: 'San Gregorio Nacianceno, a la mañana siguiente',
    blocks: [
      t('Se me perdió el día de ayer, oh Cristo: me sobrevino la ira y en un instante se apoderó de mí. ¡Ojalá el día de hoy sea para mí un día de luz!'),
    ],
    meta: nacianceno('Oración a la mañana siguiente'),
  },
  {
    id: 'nacianceno-enfermedad',
    category: 'enfermedad',
    title: 'Repréndela con tu palabra',
    subtitle: 'Oración en la enfermedad, de san Gregorio Nacianceno',
    blocks: [
      rub('La escribió enfermo y siendo ya obispo: por eso pide volver a predicar. Quien no es sacerdote puede quedarse con la primera parte.'),
      t('Sufro por la enfermedad y me consumo en el cuerpo. Algunos de cuello altivo quizá se rían de mi dolor. Mis miembros se han debilitado y mis pies no andan firmes. No sé si es efecto de la abstinencia, o de los pecados, o de algún combate. Pero gracias sean dadas a mi Soberano: quizá esto sea mejor para mí.'),
      t('Reprende a la enfermedad, repréndela con tu palabra; tu palabra es para mí la salvación. Y si no la reprendes, dame paciencia para soportarlo todo. Que lo corruptible se lo lleve la corrupción; guarda la imagen: entonces tendrás en mí a un siervo perfecto.'),
      t('Fortaléceme, oh Cristo. ¿Por qué estoy débil, yo, tu servidor? Está inactiva la lengua que te cantaba, ¿y lo permites? Levántame, y no rechaces a tu sacerdote.'),
      t('De nuevo deseo levantarme, ser predicador de la salvación y purificar al pueblo. Te suplico, Fuerza mía, no me dejes. Y si te he sido infiel en la tormenta, ¡que siga en la tormenta!'),
    ],
    meta: nacianceno('Oración en la enfermedad'),
  },
  {
    id: 'nacianceno-camino',
    category: 'antes-viajar',
    title: 'Sin Ti no puedo levantar el pie',
    subtitle: 'Oración del que se pone en camino, de san Gregorio Nacianceno',
    blocks: [
      t('Sin Ti, Cristo Rey, no se puede levantar ni el pie; en Ti están todos los bienes para los hombres que son tuyos; Tú eres en todo su camino recto; esperando en Ti, voy también por este sendero. Llévame sano y salvo, y dame lo que espera mi corazón. Tráeme también de vuelta, oh Rey, a mi pobre casa, donde pueda en libertad suplicarte día y noche.'),
      t('Tú, que guiaste al ejército con el fuego y la nube; Tú, que abriste camino en el mar a los perseguidos e hiciste firmes las olas para ellos, y que hiciste llover del cielo un pan inesperado, y sacaste un torrente de la roca escarpada: ven también ahora a acompañar a tu servidor que te llama, oh Cristo, Luz de los hombres, Dador de todo buen fin.'),
      t('En Ti, Verbo de Dios, descansamos cuando estamos en casa; a Ti te consagramos nuestro tiempo libre; Tú eres mi estar sentado, mi despertar y mi estar de pie; Tú eres también mi caminar. Y ahora, a una señal tuya, voy por camino recto. Pero envíame un ángel que me guíe y me ayude con buen resultado, que me conduzca con la columna de fuego y de nube, abra el mar, detenga los ríos con su palabra, me alimente en abundancia con pan del cielo y de la tierra y, trazando la cruz con las manos, frene la osadía de los enemigos; que no me queme el calor del mediodía ni me dé miedo la noche. Y el sendero desigual y empinado hazlo llano y fácil para mí, tu servidor, como tantas veces antes, cubriéndome con tu mano, me salvaste en la tierra y en el mar de los peligros, de las enfermedades crueles y de todo lo adverso; para que, acabado todo con bien, vuelva a mis amigos y parientes, y me reciban con alegría en casa; y, descansado de la fatiga, me postre ante Ti, pidiéndote que también mi último camino sea tranquilo y ligero.'),
      rub('Son tres de las cuatro partes del poema; se deja la primera, que es la más larga y repite estas mismas imágenes.'),
    ],
    meta: nacianceno('Oración del que se pone en camino'),
  },
  {
    id: 'cristo-nacianceno',
    category: 'a-cristo',
    title: 'Ojalá no te olvide',
    subtitle: 'Oración a Cristo de san Gregorio Nacianceno, en la tormenta',
    blocks: [
      t('¡Ojalá no te olvide yo a Ti, ni Tú me olvides a mí, Rey, a quien buscan los sabios, Luz trina! ¡Ojalá no me arrebate el enemigo y me esconda en los escondrijos del infierno, tras los odiosos cerrojos de las tinieblas! Es terrible e insidioso para tus amigos. Pero sé que escaparé de él si Tú te acuerdas de mí y me proteges sin cesar con tu palabra y con el pensamiento de Ti.'),
      t('¡Maestro! A mí, tu discípulo, me envuelve una ola terrible: ¡despierta antes de que muera! Manda tan sólo, y la tormenta morirá. Me atrevo a decirte algo, Cristo mío: no permitas que me aplaste y me apague el peso de las penas. Porque a muchos que están por debajo de mí les has tenido piedad; no me juzgues, pues, según lo que merezco, sino quítame, quítame la mayor parte de la carga. ¿Quién llevará el peso aunque sólo sea de un día? ¿A quién acudiré, abrumado por los males?'),
      t('Si se me desordenara el cuerpo, buscaría un médico. Si fuera un pobre, iría a un rico. En la tormenta me refugiaría en el puerto. Y si me ofendieran, acudiría a las leyes y a los tribunales. Al que cae por un precipicio a veces lo salva un arbusto. Pero si me hace tropezar el que corrompe en mí la imagen de Dios, ¿en quién encontraré apoyo, sino en Ti, Soberano?'),
      t('¡Algo nuevo, algo nuevo, oh Verbo de Dios, algo nuevo me ocurre! La hondura de mi corazón se ha quedado vacía: no hay en ella ni palabra sabia ni pensamiento sabio. Es verdad que el espíritu maligno huye de mí a toda prisa; pero su sitio no lo ocupa en mí nadie mejor. Lléname Tú de tus bienes, para que no vuelva a mí la envidia y me convierta en su taller, que sería peor que antes.'),
      t('Otra vez ha venido la serpiente. Me agarro a Ti, oh Dios: sostenme, sostenme; no entregues tu imagen al ultraje, que no me arrebate el enemigo como a un pájaro del nido.'),
      t('¡Ay! Temo el juicio y deseo partir. Aquí me persiguen y no tengo un momento de descanso en la vida. Y allí me llamas Tú, pero no tengo confianza. Tuyo soy, oh Cristo: sálvame como Tú mismo quieras.'),
    ],
    meta: nacianceno('Oración a Cristo', 'Reúne seis de las siete breves oraciones que el poema lleva seguidas.'),
  },

  /* ------------------------------ Otras oraciones ------------------------------ */
  {
    id: 'perdon-partenio',
    category: 'perdon',
    title: 'Haz de este día un día de tu misericordia',
    subtitle: 'Oración diaria del hieroesquimonje Partenio de Kiev',
    blocks: [
      t('Señor Jesucristo, Hijo de Dios: no permitas que la vanidad, el amor propio, la sensualidad, la negligencia y la ira me dominen y me arrebaten a tu amor. Oh Señor mío, Creador mío, toda mi esperanza: no me dejes sin parte en la bienaventurada eternidad; haz que también yo siga tu santo ejemplo y me someta a las autoridades puestas sobre mí; dame esa pureza de espíritu y esa sencillez de corazón que nos hacen dignos de tu amor.'),
      t('A Ti, Dios mío, elevo mi alma y mi corazón: no dejes perecer a tu criatura, sino líbrame del único y mayor de los males, el pecado. Haz, Señor, que soporte con la misma paciencia las inquietudes y penas del alma con que recibo alegre las satisfacciones del corazón. Si Tú quieres, Señor, puedes purificarme y santificarme. Aquí me entrego a tu bondad, pidiéndote que destruyas en mí todo lo que te es contrario y me unas a la compañía de tus elegidos.'),
      t('Señor, quítame la ociosidad del espíritu, que pierde el tiempo, y la vanidad de los pensamientos, que estorba tu presencia y dispersa mi atención en la oración. Y si, al rezar, me aparto de Ti con mis pensamientos, ayúdame para que esa distracción no sea voluntaria, y para que, apartándose la mente, no aparte de Ti el corazón.'),
      t('Te confieso, Señor Dios mío, todos los pecados de mi iniquidad, cometidos ahora y antes delante de Ti; perdónamelos por tu santo nombre y salva mi alma, que rescataste con tu sangre preciosa. Me entrego a tu misericordia, me abandono a tu voluntad: haz conmigo según tu bondad, y no según mi maldad y mi iniquidad. Enséñame, Señor, a disponer mis obras de modo que sirvan para glorificar tu santo nombre.'),
      t('Ten compasión, Señor, de todos los cristianos, escucha el deseo de todos los que claman a Ti, líbralos de todo mal, salva a tus siervos <em>(nombres)</em>, envía alivio y consuelo en las penas y tu santa misericordia. Señor, te ruego en especial por los que me han ofendido, insultado o entristecido, o me han hecho algún mal: no los castigues por causa mía, pecador, sino derrama sobre ellos tu bondad. Señor, te ruego por todos aquellos a quienes yo, pecador, he entristecido, ofendido o escandalizado, de palabra, de obra, de pensamiento, a sabiendas o sin saberlo.'),
      t('Señor Dios: perdónanos nuestros pecados y nuestras ofensas mutuas; echa, Señor, de nuestros corazones toda indignación, sospecha, ira, rencor, riña y todo lo que puede impedir el amor y disminuir el amor fraterno. Ten piedad, Señor, de los que me han encargado, a mí, pecador e indigno, que rece por ellos. Ten piedad, Señor, de todo el que pide tu ayuda.'),
      t('Señor, haz de este día un día de tu misericordia, da a cada uno según su petición, sé Pastor de los extraviados, Guía y Luz de los que no creen, Maestro de los que no saben, Padre de los huérfanos, Ayuda de los oprimidos, Médico de los enfermos, Consuelo de los moribundos, y llévanos a todos al fin deseado, a Ti, nuestro puerto y bienaventurado descanso. Amén.'),
    ],
    meta: traduccion(
      '«Vida del hieroesquimonje Partenio de Kiev, su oración diaria y sus dichos» (Moscú, 1913), pp. 19-22, en la edición de RussPortal',
      'su original ruso',
      'Hieroesquimonje Partenio de las Cuevas de Kiev († 1855)',
    ),
  },
  {
    id: 'trinidad-al-espiritu',
    category: 'al-espiritu-santo',
    title: 'Danos el espíritu de amor y de paciencia',
    subtitle: 'Al Espíritu Santo, para pedir todas las virtudes',
    blocks: [
      t('Consolador bondadosísimo, Espíritu de verdad, que procedes eternamente del Padre y reposas siempre en el Hijo, fuente sin envidia de los dones divinos, que los repartes a cada uno como quieres, por quien también nosotros, indignos, fuimos santificados y sellados el día de nuestro bautismo: mira la oración de tus siervos, ven a nosotros, habita en nosotros y purifica nuestras almas, para que seamos preparados como morada de la Santísima Trinidad.'),
      t('Sí, oh Bondadosísimo: no tengas asco de nuestra impureza y de nuestras llagas de pecado, sino cúralas con tu unción que todo lo sana. Ilumina nuestra mente, para que comprendamos la vanidad del mundo y de lo que hay en el mundo; vivifica nuestra conciencia, para que nos anuncie sin callar lo que conviene hacer y lo que conviene rechazar; endereza y renueva el corazón, para que no brote más de él, día y noche, pensamientos malos y deseos indignos. Doma la carne y apaga con tu aliento portador de rocío la llama de las pasiones, con la que se oscurece en nosotros la preciosa imagen de Dios.'),
      t('Aleja de nosotros el espíritu de ociosidad, de desaliento, de ambición y de vaniloquio, y danos el espíritu de amor y de paciencia, el espíritu de mansedumbre y de humildad, el espíritu de pureza y de justicia, para que, enderezados los corazones y las rodillas debilitados, corramos sin pereza por el camino de los santos mandamientos; y así, huyendo de todo pecado y cumpliendo toda justicia, merezcamos alcanzar un fin pacífico y sin vergüenza, entrar en la Jerusalén celestial y adorarte allí, junto con el Padre y el Hijo, cantando por los siglos de los siglos: ¡Trinidad santa, gloria a Ti!'),
    ],
    meta: traduccion(AKATHISTOS_TRINIDAD, 'su original eslavo', undefined, AVISO_AKATHISTOS),
  },
  {
    id: 'trinidad-al-padre',
    category: 'a-la-trinidad',
    title: 'Te damos gracias, porque nos llamaste de la nada',
    subtitle: 'A Dios Padre',
    blocks: [
      t('Soberano todopoderoso, Señor sapientísimo y bondadosísimo, Engendrador sin principio del Hijo, que es principio de la luz, y eterno y sempiterno Origen de tu Espíritu vivificante, cuya grandeza no se puede contar, cuya gloria es inefable y cuya misericordia no tiene medida: te damos gracias porque nos llamaste de la nada y nos honraste con tu imagen preciosa, y porque nos concediste, indignos, no sólo conocerte y amarte, sino, lo que es más dulce, llamarte Padre nuestro.'),
      t('Te damos gracias, Dios de misericordia y de compasión, porque a los que quebrantamos tu mandamiento no nos dejaste en medio del pecado y de la sombra de muerte, sino que te dignaste enviar a la tierra, para nuestra salvación, a tu Hijo unigénito, por quien también fueron hechos los siglos, para que por su encarnación y sus terribles padecimientos quedáramos libres de la tiranía del diablo y de la corrupción de la muerte. Te damos gracias, Dios de amor y de poder, porque, después de la ascensión al cielo de nuestro amadísimo Salvador, movido por su Cruz, enviaste también tu santísimo Espíritu sobre sus discípulos y apóstoles escogidos, para que, con la fuerza de su predicación inspirada, iluminaran el mundo entero con la luz incorruptible del Evangelio de Cristo.'),
      t('Tú mismo, pues, Soberano amante de los hombres, escucha ahora la humilde oración de tus hijos indignos: y así como nos creaste por tu sola bondad y nos redimiste por tu sola compasión, sálvanos por tu sola misericordia sin igual; porque de nuestras obras no tenemos ni rastro de salvación, sino la espera de un justo castigo y de la separación de tu rostro luminosísimo. Porque si se nos pedirá cuenta aun de una sola palabra ociosa en el día del juicio y del examen, ¿qué responderemos, miserables, de nuestras incontables iniquidades con que hemos pecado ante Ti? Por eso, desesperando del todo de justificarnos por nuestras obras, acudimos a tu sola bondad, que supera toda mente y toda palabra; y teniéndola como firme cimiento de esperanza, te suplicamos: hemos pecado, purifícanos, Señor; hemos obrado inicuamente, perdónanos, Soberano; te hemos irritado, reconcíliate con nosotros, Longánime.'),
      t('Y guarda en adelante nuestra mente, nuestra conciencia y nuestro corazón de las manchas del mundo; líbranos y sálvanos de la tempestad agitada de las pasiones y de las caídas, voluntarias e involuntarias, conocidas y desconocidas, y guíanos al puerto tranquilo de la fe, del amor y de la esperanza de la vida eterna. Acuérdate de nosotros en tu misericordia, Señor; concédenos todas las peticiones que llevan a la salvación, y sobre todo una vida pura y sin pecado; haznos dignos de amarte y de temerte con todo nuestro corazón y de hacer en todo tu santa voluntad, por las oraciones de nuestra purísima Señora, la Theotokos, y de todos tus santos; porque eres Dios bueno y amante de los hombres, y a Ti elevamos la gloria, la acción de gracias y la adoración, con tu Hijo unigénito y tu santísimo, bueno y vivificante Espíritu, ahora y siempre, y por los siglos de los siglos. Amén.'),
    ],
    meta: traduccion(AKATHISTOS_TRINIDAD, 'su original eslavo', undefined, AVISO_AKATHISTOS),
  },
  {
    id: 'a-la-santisima-trinidad',
    category: 'a-la-trinidad',
    title: '¿Qué te daremos a cambio?',
    subtitle: 'A la Santísima Trinidad',
    blocks: [
      t('Santísima Trinidad, poder de una sola esencia, causa de todos los bienes: ¿qué te daremos a cambio de todo lo que nos has dado a nosotros, pecadores e indignos, antes de que saliéramos a la luz; de todo lo que das a cada uno de nosotros todos los días, y de lo que nos has preparado a todos en el siglo venidero?'),
      t('Convendría, por tantos beneficios y compasiones, darte gracias no sólo con palabras, sino sobre todo con obras, guardando y cumpliendo tus mandamientos. Pero nosotros, haciendo caso a nuestras pasiones y a nuestra mala costumbre, caímos desde la juventud en pecados e iniquidades sin número. Por eso, impuros y manchados, no sólo no podríamos presentarnos sin vergüenza ante tu rostro tres veces santo, sino ni siquiera pronunciar tu santísimo nombre, si Tú misma no te hubieras dignado anunciar, para nuestro consuelo, que amas a los puros y justos, y que tienes piedad de los pecadores arrepentidos y los recibes con entrañas compasivas.'),
      t('Mira, pues, oh Trinidad divinísima, desde la altura de tu santa gloria a nosotros, muy pecadores, y recibe nuestra buena voluntad en lugar de las buenas obras; y danos el espíritu de verdadero arrepentimiento, para que, odiando todo pecado, vivamos en pureza y en justicia hasta el fin de nuestros días, haciendo tu santísima voluntad y glorificando con pensamientos puros y con buenas obras tu dulcísimo y magnífico nombre. Amén.'),
    ],
    meta: traduccion(AKATHISTOS_TRINIDAD, 'su original eslavo', undefined, AVISO_AKATHISTOS),
  },
  {
    id: 'sabiduria-alfabetica',
    category: 'sabiduria',
    title: 'Con esta palabra ruego a Dios',
    subtitle: 'La oración alfabética, del siglo IX, para pedir sabiduría y palabra',
    blocks: [
      rub('Es de los primeros poemas escritos en lengua eslava, y se atribuye a Constantino de Preslav. Cada verso empezaba por una letra del alfabeto recién nacido, cosa que en español se pierde.'),
      t('Con esta palabra ruego a Dios:<br>Dios, Creador de toda la creación,<br>de lo visible y de lo invisible,<br>envía al Espíritu que vive,<br>para que inspire en mi corazón una palabra<br>que sea de provecho para todos<br>los que viven en tus mandamientos.'),
      t('Porque tu Ley es una gran lámpara de vida<br>y luz para los senderos<br>del que busca la palabra del Evangelio<br>y pide recibir tus dones.'),
      t('Dame ahora a mí una palabra amplia,<br>Padre, Hijo y santísimo Espíritu,<br>a mí, que te pido ayuda.<br>Porque elevo siempre mis manos a lo alto,<br>para recibir de Ti fuerza y sabiduría.'),
      t('Esperanza de todos los confines de la tierra,<br>líbrame del faraón de la maldad.<br>Dame pensamiento y mente de querubín.<br>Oh venerable y santísima Trinidad,<br>cambia mi tristeza en alegría.'),
      t('Voy ahora tras las huellas del Maestro,<br>siguiendo su nombre y su obra.<br>Haré manifiesta la palabra del Evangelio,<br>alabando a la Trinidad en la Divinidad,<br>a la que canta toda edad, joven y anciano,<br>con su entendimiento,<br>a quien son el honor, el poder y la gloria<br>de parte de todo el aliento de la creación,<br>por todos los siglos y por siempre. Amén.'),
    ],
    meta: traduccion(
      '«Oración alfabética» (Азбучная молитва), en la transcripción de Wikisource',
      'el eslavo',
      'Atribuida a san Constantino de Preslav (siglos IX-X)',
      'Se dejan fuera unos versos que se refieren al bautismo de los pueblos eslavos y al trabajo del copista. La transcripción de Wikisource no cita edición: conviene cotejarla con una antes de darla por definitiva.',
    ),
  },
];

/* ============================== Lo que ya estaba en los oficios ============================== */

const DE_LOS_OFICIOS: ThirdPrayerSeed[] = [
  {
    id: 'rey-celestial',
    category: 'al-espiritu-santo',
    title: 'Rey celestial',
    subtitle: 'Con la que empieza casi toda oración de la Iglesia',
    blocks: [
      {
        kind: 'text',
        content: GREEK_FORMULAS.basileuOuranie.spanish,
        greek: GREEK_FORMULAS.basileuOuranie.greek,
        roman: GREEK_FORMULAS.basileuOuranie.roman,
      },
      rub('Desde Pascua hasta la Ascensión no se dice; entre la Ascensión y Pentecostés, tampoco. Vuelve el día de Pentecostés.'),
    ],
    meta: delOficio('Oración al Espíritu Santo, del Horologion'),
  },
  {
    id: 'vigilancia-antioco',
    category: 'vigilancia',
    title: 'Mente vigilante, pensamiento casto',
    subtitle: 'Oración de san Antíoco, de las Completas',
    blocks: ANTIOCO,
    meta: delOficio('Completas, oración a Cristo', 'San Antíoco de Mar Saba (siglo VII)'),
  },
  {
    id: 'vigilancia-esposo',
    category: 'vigilancia',
    title: 'He aquí que el Esposo viene a medianoche',
    subtitle: 'Tropario del oficio de medianoche',
    blocks: [t(HE_AQUI_EL_ESPOSO)],
    meta: delOficio('Oficio de medianoche, troparios'),
  },
  {
    id: 'temor-basilio',
    category: 'temor-de-dios',
    title: finalDeHora('hora-sexta').titulo,
    subtitle: 'Oración de san Basilio el Grande, de la Hora Sexta',
    blocks: [t(finalDeHora('hora-sexta').texto)],
    meta: delOficio('Hora Sexta, oración final', 'San Basilio el Grande († 379)'),
  },
  {
    id: 'cristo-luz-verdadera',
    category: 'a-cristo',
    title: finalDeHora('hora-primera').titulo,
    subtitle: 'De la Hora Primera, al amanecer',
    blocks: [t(finalDeHora('hora-primera').texto)],
    meta: delOficio('Hora Primera, oración final'),
  },
  {
    id: 'cristo-hora-novena',
    category: 'a-cristo',
    title: finalDeHora('hora-novena').titulo,
    subtitle: 'Oración de san Basilio el Grande, de la Hora Novena',
    blocks: [t(finalDeHora('hora-novena').texto)],
    meta: delOficio('Hora Novena, oración final', 'San Basilio el Grande († 379)'),
  },
  {
    id: 'luz-alegre',
    category: 'a-cristo',
    title: 'Luz alegre',
    subtitle: 'El himno de la tarde, de las Vísperas',
    blocks: [t(LUZ_ALEGRE)],
    meta: delOficio('Vísperas, himno de la entrada'),
  },
  {
    id: 'trinidad-mardario',
    category: 'a-la-trinidad',
    title: finalDeHora('hora-tercera').titulo,
    subtitle: 'Oración de san Mardario, de la Hora Tercera',
    blocks: [t(finalDeHora('hora-tercera').texto)],
    meta: delOficio('Hora Tercera, oración final', 'San Mardario'),
  },
  {
    id: 'pablo-evergetino',
    category: 'theotokos',
    title: 'Inmaculada, incontaminada, incorrupta',
    subtitle: 'Oración de Pablo el Evergetino, de las Completas',
    blocks: PABLO_EVERGETINO,
    meta: delOficio('Completas, oración a la Theotokos', 'Pablo el Evergetino († 1054)'),
  },
  {
    id: 'esperanza-joanicio',
    category: 'esperanza',
    title: 'Mi esperanza es el Padre',
    subtitle: 'Oración de san Joanicio el Grande',
    blocks: [
      t('Mi esperanza es el Padre, mi refugio el Hijo, mi protección el Espíritu Santo. Trinidad Santa, gloria a Ti.'),
      t('Toda mi esperanza la pongo en ti, Madre de Dios: guárdame bajo tu amparo.'),
    ],
    meta: delOficio('Completas, oraciones finales', 'San Joanicio el Grande († 846)'),
  },
  {
    id: 'sabiduria-evangelio',
    category: 'sabiduria',
    title: 'Haz brillar en nuestros corazones',
    subtitle: 'La oración antes del Evangelio, de la Divina Liturgia',
    blocks: [t(ANTES_DEL_EVANGELIO)],
    meta: delOficio('Divina Liturgia de san Juan Crisóstomo, oración antes del Evangelio'),
  },
  {
    id: 'sabiduria-pentecostes',
    category: 'sabiduria',
    title: 'Hiciste sabios a los pescadores',
    subtitle: 'Tropario y kontakion de Pentecostés',
    blocks: [
      head('Tropario, en el tono octavo'),
      LENTEN_HOURS['hora-tercera']!.comun[0]!,
      head(`Kontakion, en el ${MOVABLE_KONTAKIA.pentecostes!.tone.toLowerCase()}`),
      ...MOVABLE_KONTAKIA.pentecostes!.blocks,
    ],
    meta: delOficio('Pentecostés, tropario y kontakion'),
  },
  {
    id: 'oracion-ambon',
    category: 'otras',
    title: 'Señor, que bendices a los que te bendicen',
    subtitle: 'La oración detrás del ambón, de la Divina Liturgia',
    blocks: [t(DETRAS_DEL_AMBON)],
    meta: delOficio('Divina Liturgia de san Juan Crisóstomo, oración detrás del ambón'),
  },
  {
    id: 'angeles-arcangeles',
    category: 'angeles',
    title: 'Jefes de los ejércitos celestiales',
    subtitle: 'Tropario y kontakion de los arcángeles',
    blocks: [
      head(`Tropario, en el ${SAINT_PROPER_TROPARIA['miguel-arcangel']!.tone.toLowerCase()}`),
      ...SAINT_PROPER_TROPARIA['miguel-arcangel']!.blocks,
      head(`Kontakion, en el ${SAINT_KONTAKIA['miguel-arcangel']!.tone.toLowerCase()}`),
      ...SAINT_KONTAKIA['miguel-arcangel']!.blocks,
    ],
    meta: delOficio('Sinaxis de los arcángeles, 8 de noviembre'),
  },
  {
    id: 'angeles-canon',
    category: 'angeles',
    title: 'Canon al Ángel de la Guarda',
    subtitle: 'Entero',
    blocks: [embed('canon:canon-angel', 'Canon al Ángel de la Guarda')],
    meta: delOficio('Canon al Ángel de la Guarda'),
  },
  {
    id: 'tres-jerarcas',
    category: 'santos',
    title: 'A los Tres Jerarcas',
    subtitle: 'San Basilio, san Gregorio y san Juan Crisóstomo: los maestros',
    blocks: [
      head(`Tropario, en el ${SAINT_PROPER_TROPARIA['tres-jerarcas']!.tone.toLowerCase()}`),
      ...SAINT_PROPER_TROPARIA['tres-jerarcas']!.blocks,
      head(`Kontakion, en el ${SAINT_KONTAKIA['tres-jerarcas']!.tone.toLowerCase()}`),
      ...SAINT_KONTAKIA['tres-jerarcas']!.blocks,
    ],
    meta: delOficio('Fiesta de los Tres Jerarcas, 30 de enero'),
  },
  {
    id: 'tropario-de-hoy',
    category: 'santos',
    title: 'El tropario de hoy',
    subtitle: 'Cambia cada día: el del santo o la fiesta que la Iglesia celebra hoy',
    blocks: [
      { kind: 'day-troparion', content: 'Tropario del día' },
      { kind: 'day-kontakion', content: 'Kontakion del día' },
    ],
    meta: delOficio('Menaion, Octoechos y Triodion, según el día'),
  },
];

/* =============================== Las virtudes, en la Escritura =============================== */

const POR_VIRTUDES: ThirdPrayerSeed[] = [
  /* Las tres que permanecen */
  pasaje('fe-creo-ayuda', 'fe', 'Creo, Señor: ayuda mi incredulidad', 'La oración del padre del muchacho', ['Marcos 9, 17-27'], 'Dos líneas bastan para rezarla: las dice un hombre que no tiene más.'),
  pasaje('fe-aumentanos', 'fe', 'Auméntanos la fe', 'La petición de los apóstoles', ['Lucas 17, 5-6']),
  pasaje('fe-confesiones', 'fe', 'Tú eres el Cristo', 'Las confesiones de fe del Evangelio', ['Mateo 16, 13-18', 'Juan 6, 66-69', 'Juan 11, 25-27', 'Juan 20, 26-29'], 'Pedro, Marta y Tomás: lo que dijeron, y se puede decir con ellos.'),

  salmo('esperanza-salmo-70', 'esperanza', 70, 'En Ti, Señor, he esperado', 'El salmo del anciano que sigue esperando.'),
  pasaje('esperanza-lamentaciones', 'esperanza', 'Bueno es esperar en silencio', 'Jeremías, entre las ruinas', ['Lamentaciones 3, 21-33']),
  pasaje('esperanza-romanos', 'esperanza', '¿Quién nos separará del amor de Cristo?', 'San Pablo a los romanos', ['Romanos 8, 18-25', 'Romanos 8, 31-39']),

  pasaje('amor-efesios', 'amor', 'Arraigados y fundados en amor', 'La oración de san Pablo por los efesios', ['Efesios 3, 14-21']),
  pasaje('amor-filipenses', 'amor', 'Que vuestro amor abunde aún más', 'La oración de san Pablo por los filipenses', ['Filipenses 1, 9-11']),
  pasaje('amor-tesalonicenses', 'amor', 'El Señor os haga crecer en amor', 'La oración de san Pablo por los tesalonicenses', ['1 Tesalonicenses 3, 11-13']),
  pasaje('amor-himno', 'amor', 'Himno al amor', 'San Pablo a los corintios', ['1 Corintios 13, 1-13']),
  pasaje('amor-juan', 'amor', 'Dios es amor', 'San Juan, en su primera carta', ['1 Juan 4, 7-21']),

  /* La luz del entendimiento */
  pasaje('sabiduria-salomon', 'sabiduria', 'Dame la sabiduría que se sienta junto a tu trono', 'La oración de Salomón', ['Sabiduría de Salomón 9, 1-12']),
  pasaje('sabiduria-corazon', 'sabiduria', 'Da a tu siervo un corazón que entienda', 'Salomón, en sueños, en Gabaón', ['1 Reyes 3, 5-14']),
  pasaje('sabiduria-siracida', 'sabiduria', 'Busqué la sabiduría en mi oración', 'Jesús ben Sirá, de joven', ['Eclesiástico 51, 13-22']),
  pasaje('sabiduria-efesios', 'sabiduria', 'Espíritu de sabiduría', 'La oración de san Pablo por los efesios', ['Efesios 1, 15-19']),
  pasaje('sabiduria-colosenses', 'sabiduria', 'Llenos del conocimiento de su voluntad', 'La oración de san Pablo por los colosenses', ['Colosenses 1, 9-12']),
  pasaje('sabiduria-santiago', 'sabiduria', 'Si alguno tiene falta de sabiduría, pídala', 'La carta de Santiago', ['Santiago 1, 5-8', 'Santiago 3, 13-18']),
  pasaje('sabiduria-salmo-118', 'sabiduria', 'Enséñame, Señor, el camino de tus preceptos', 'Salmo 118, una estrofa', ['Salmos 119, 33-40']),

  pasaje('discernimiento-camino', 'discernimiento', 'Hazme saber el camino por donde he de andar', 'Salmo 142, versículos 8-10', ['Salmos 143, 8-10'], 'Se reza cada mañana en los Maitines, y también al terminar la Gran Doxología.'),
  pasaje('discernimiento-senda', 'discernimiento', 'Muéstrame tus caminos', 'Salmo 24, versículos 4-10', ['Salmos 25, 4-10']),
  pasaje('discernimiento-romanos', 'discernimiento', 'Para comprobar cuál es la voluntad de Dios', 'San Pablo a los romanos', ['Romanos 12, 1-2']),
  pasaje('discernimiento-espiritus', 'discernimiento', 'Probad los espíritus', 'San Juan, en su primera carta', ['1 Juan 4, 1-6']),

  salmo('temor-salmo-110', 'temor-de-dios', 110, 'El principio de la sabiduría es el temor del Señor'),
  salmo('temor-salmo-33', 'temor-de-dios', 33, 'Venid, hijos, y os enseñaré el temor del Señor'),
  pasaje('temor-siracida', 'temor-de-dios', 'El temor del Señor es gloria', 'Jesús ben Sirá', ['Eclesiástico 1, 11-20']),

  /* Las de toda vida recta */
  pasaje('templanza-siracida', 'templanza', 'Señor, Padre y Dios de mi vida', 'La oración de Jesús ben Sirá, contra los deseos', ['Eclesiástico 23, 1-6']),
  pasaje('templanza-corintios', 'templanza', 'Todo el que lucha se abstiene de todo', 'San Pablo a los corintios', ['1 Corintios 9, 24-27']),
  pasaje('templanza-tito', 'templanza', 'Vivamos sobria, justa y piadosamente', 'San Pablo a Tito', ['Tito 2, 11-14']),

  salmo('justicia-salmo-14', 'justicia', 14, 'Señor, ¿quién habitará en tu tabernáculo?'),
  pasaje('justicia-miqueas', 'justicia', 'Hacer justicia, amar misericordia', 'El profeta Miqueas', ['Miqueas 6, 6-8']),
  salmo('justicia-salmo-71', 'justicia', 71, 'Da, oh Dios, tus juicios al rey', 'Se reza por los que gobiernan y por los pobres de la tierra.'),
  pasaje('justicia-amos', 'justicia', 'Corra el juicio como las aguas', 'El profeta Amós', ['Amós 5, 14-15', 'Amós 5, 21-24']),

  pasaje('fortaleza-efesios', 'fortaleza', 'Fortaleceos en el Señor', 'La armadura de Dios', ['Efesios 6, 10-18']),
  salmo('fortaleza-salmo-45', 'fortaleza', 45, 'Dios es nuestro amparo y fortaleza'),
  pasaje('fortaleza-isaias', 'fortaleza', 'Los que esperan en el Señor tendrán nuevas fuerzas', 'El profeta Isaías', ['Isaías 40, 28-31']),
  pasaje('fortaleza-corintios', 'fortaleza', 'Cuando soy débil, entonces soy fuerte', 'San Pablo a los corintios', ['2 Corintios 12, 7-10']),
  pasaje('fortaleza-josue', 'fortaleza', 'Esfuérzate y sé valiente', 'A Josué, antes de cruzar el Jordán', ['Josué 1, 5-9']),

  /* Las que pide san Efrén */
  pasaje('castidad-salmo-118', 'castidad', '¿Con qué limpiará el joven su camino?', 'Salmo 118, una estrofa', ['Salmos 119, 9-16']),
  pasaje('castidad-corintios', 'castidad', 'Vuestro cuerpo es templo del Espíritu Santo', 'San Pablo a los corintios', ['1 Corintios 6, 18-20']),
  pasaje('castidad-tesalonicenses', 'castidad', 'Ésta es la voluntad de Dios: vuestra santificación', 'San Pablo a los tesalonicenses', ['1 Tesalonicenses 4, 3-8']),

  salmo('humildad-salmo-130', 'humildad', 130, 'Señor, no se ha envanecido mi corazón', 'Tres versículos, de los más breves del Salterio.'),
  pasaje('humildad-publicano', 'humildad', 'El fariseo y el publicano', 'La parábola, y la oración más corta del Evangelio', ['Lucas 18, 9-14']),
  pasaje('humildad-filipenses', 'humildad', 'Se humilló a sí mismo', 'San Pablo a los filipenses', ['Filipenses 2, 1-11']),
  pasaje('humildad-mateo', 'humildad', 'Aprended de mí, que soy manso y humilde', 'Las palabras del Señor', ['Mateo 11, 25-30']),
  pasaje('humildad-pedro', 'humildad', 'Humillaos bajo la poderosa mano de Dios', 'San Pedro, en su primera carta', ['1 Pedro 5, 5-7']),

  pasaje('paciencia-job', 'paciencia', 'El Señor dio, y el Señor quitó', 'Lo que dijo Job', ['Job 1, 20-22', 'Job 2, 9-10']),
  salmo('paciencia-salmo-39', 'paciencia', 39, 'Pacientemente esperé al Señor'),
  pasaje('paciencia-santiago', 'paciencia', 'Mirad cómo el labrador espera', 'La carta de Santiago', ['Santiago 5, 7-11']),
  pasaje('paciencia-romanos', 'paciencia', 'La tribulación produce paciencia', 'San Pablo a los romanos', ['Romanos 5, 1-5']),
  pasaje('paciencia-hebreos', 'paciencia', 'Corramos con paciencia la carrera', 'La carta a los Hebreos', ['Hebreos 12, 1-13']),

  /* Las de cada día */
  salmo('mansedumbre-salmo-36', 'mansedumbre', 36, 'Deja la ira, y abandona el enojo'),
  salmo('mansedumbre-salmo-131', 'mansedumbre', 131, 'Acuérdate, Señor, de David y de toda su mansedumbre'),
  pasaje('mansedumbre-colosenses', 'mansedumbre', 'Vestíos de entrañas de misericordia', 'San Pablo a los colosenses', ['Colosenses 3, 12-15']),
  pasaje('mansedumbre-efesios', 'mansedumbre', 'Con toda humildad y mansedumbre', 'San Pablo a los efesios', ['Efesios 4, 1-3']),

  pasaje('obediencia-hagase', 'obediencia', 'Hágase en mí según tu palabra', 'La Anunciación', ['Lucas 1, 26-38']),
  pasaje('obediencia-getsemani', 'obediencia', 'No como yo quiero, sino como Tú', 'El Señor, en Getsemaní', ['Mateo 26, 36-44']),
  pasaje('obediencia-samuel', 'obediencia', 'Habla, que tu siervo oye', 'La llamada de Samuel', ['1 Samuel 3, 1-10']),
  pasaje('obediencia-isaias', 'obediencia', 'Heme aquí, envíame a mí', 'La vocación de Isaías', ['Isaías 6, 1-8']),

  salmo('silencio-salmo-140', 'silencio', 140, 'Pon, Señor, guarda a mi boca', 'Es el primer salmo de la lámpara: se canta en cada Vísperas.'),
  salmo('silencio-salmo-38', 'silencio', 38, 'Guardaré mis caminos, para no pecar con mi lengua'),
  pasaje('silencio-siracida', 'silencio', '¿Quién pondrá guardia a mi boca?', 'Jesús ben Sirá', ['Eclesiástico 22, 27', 'Eclesiástico 23, 7-15']),
  pasaje('silencio-santiago', 'silencio', 'La lengua es un fuego', 'La carta de Santiago', ['Santiago 3, 1-12']),
  pasaje('silencio-eclesiastes', 'silencio', 'Sean pocas tus palabras', 'El Eclesiastés', ['Eclesiastés 5, 1-3']),

  pasaje('vigilancia-virgenes', 'vigilancia', 'Las diez vírgenes', 'La parábola del Señor', ['Mateo 25, 1-13']),
  pasaje('vigilancia-velad', 'vigilancia', 'Lo que a vosotros digo, a todos lo digo: velad', 'Las palabras del Señor', ['Marcos 13, 32-37']),
  pasaje('vigilancia-pedro', 'vigilancia', 'Sed sobrios y velad', 'San Pedro, en su primera carta', ['1 Pedro 5, 8-11']),
  salmo('vigilancia-salmo-62', 'vigilancia', 62, 'Dios, Dios mío, a Ti madrugaré', 'Uno de los seis salmos con que empiezan los Maitines.'),

  pasaje('desprendimiento-proverbios', 'desprendimiento', 'No me des pobreza ni riquezas', 'La oración de Agur', ['Proverbios 30, 7-9']),
  pasaje('desprendimiento-mateo', 'desprendimiento', 'No os afanéis por vuestra vida', 'Las palabras del Señor', ['Mateo 6, 19-34']),
  pasaje('desprendimiento-timoteo', 'desprendimiento', 'Gran ganancia es la piedad con contentamiento', 'San Pablo a Timoteo', ['1 Timoteo 6, 6-11']),
  pasaje('desprendimiento-lucas', 'desprendimiento', 'Necio, esta noche', 'La parábola del rico', ['Lucas 12, 15-21']),

  pasaje('perdon-esteban', 'perdon', 'No les tomes en cuenta este pecado', 'Lo que dijeron Cristo en la Cruz y san Esteban', ['Lucas 23, 33-34', 'Hechos 7, 54-60']),
  pasaje('perdon-setenta-veces', 'perdon', 'Setenta veces siete', 'La parábola del siervo sin compasión', ['Mateo 18, 21-35']),
  pasaje('perdon-no-juzgar', 'perdon', 'No juzguéis', 'Las palabras del Señor', ['Mateo 7, 1-5', 'Lucas 6, 36-38']),

  pasaje('misericordia-juicio', 'misericordia', 'Tuve hambre, y me disteis de comer', 'El juicio de las naciones', ['Mateo 25, 31-46']),
  pasaje('misericordia-samaritano', 'misericordia', 'El buen samaritano', 'La parábola del Señor', ['Lucas 10, 25-37']),
  salmo('misericordia-salmo-40', 'misericordia', 40, 'Bienaventurado el que piensa en el pobre'),
  pasaje('misericordia-tobias', 'misericordia', 'No apartes tu rostro de ningún pobre', 'Tobit a su hijo', ['Tobías 4, 7-11']),
  pasaje('misericordia-juan', 'misericordia', 'No amemos de palabra', 'San Juan, en su primera carta', ['1 Juan 3, 16-18']),

  salmo('compuncion-salmo-6', 'compuncion', 6, 'Señor, no me reprendas en tu furor'),
  salmo('compuncion-salmo-37', 'compuncion', 37, 'Mis iniquidades han pasado sobre mi cabeza', 'Uno de los seis salmos de los Maitines.'),
  salmo('compuncion-salmo-142', 'compuncion', 142, 'Señor, escucha mi oración', 'El último de los seis salmos de los Maitines.'),
  pasaje('compuncion-daniel', 'compuncion', 'Hemos pecado, hemos obrado mal', 'La oración de Daniel', ['Daniel griego 9, 3-19']),
  pasaje('compuncion-prodigo', 'compuncion', 'Padre, he pecado', 'La parábola del hijo pródigo', ['Lucas 15, 11-24']),
  pasaje('compuncion-joel', 'compuncion', 'Convertíos a mí con todo vuestro corazón', 'El profeta Joel', ['Joel 2, 12-18'], 'Se lee en la Cuaresma.'),

  pasaje('gratitud-tesalonicenses', 'gratitud', 'Dad gracias en todo', 'San Pablo a los tesalonicenses', ['1 Tesalonicenses 5, 16-18']),
  pasaje('gratitud-colosenses', 'gratitud', 'Y sed agradecidos', 'San Pablo a los colosenses', ['Colosenses 3, 15-17']),
  pasaje('gratitud-leprosos', 'gratitud', '¿Y los nueve dónde están?', 'Los diez leprosos', ['Lucas 17, 11-19']),
  salmo('gratitud-salmo-135', 'gratitud', 135, 'Porque para siempre es su misericordia', 'Se canta en los Maitines de las fiestas: es el «polyeleos».'),
  salmo('gratitud-salmo-99', 'gratitud', 99, 'Cantad alegres a Dios, habitantes de toda la tierra'),

  pasaje('paz-filipenses', 'paz-interior', 'La paz de Dios guardará vuestros corazones', 'San Pablo a los filipenses', ['Filipenses 4, 4-9']),
  pasaje('paz-juan', 'paz-interior', 'Mi paz os doy', 'Las palabras del Señor en la Última Cena', ['Juan 14, 25-27']),
  pasaje('paz-bendicion', 'paz-interior', 'El Señor te bendiga y te guarde', 'La bendición de Aarón', ['Números 6, 24-26']),
  salmo('paz-salmo-4', 'paz-interior', 4, 'En paz me acostaré, y asimismo dormiré', 'El primero de los salmos de las Grandes Completas.'),
  pasaje('paz-isaias', 'paz-interior', 'Tú guardarás en completa paz', 'El profeta Isaías', ['Isaías 26, 3-4']),

  pasaje('oracion-ensename', 'oracion', 'Señor, enséñanos a orar', 'Lo que pidieron los discípulos', ['Lucas 11, 1-13']),
  pasaje('oracion-padre-nuestro', 'oracion', 'Vosotros, pues, orad así', 'El Padre Nuestro, en el Sermón de la Montaña', ['Mateo 6, 5-13']),
  pasaje('oracion-viuda', 'oracion', 'Orar siempre, y no desmayar', 'La parábola de la viuda', ['Lucas 18, 1-8']),
  pasaje('oracion-espiritu', 'oracion', 'El Espíritu nos ayuda en nuestra flaqueza', 'San Pablo a los romanos', ['Romanos 8, 26-27']),
  salmo('oracion-salmo-141', 'oracion', 141, 'Con mi voz clamé al Señor', 'Es el salmo de David cuando se escondía en la cueva.'),
];

/* ======================= El alma, la Iglesia, y lo que reza la Escritura ======================= */

const OTRAS: ThirdPrayerSeed[] = [
  /* El alma */
  pasaje('ira-efesios', 'ira', 'Airaos, pero no pequéis', 'Que no se ponga el sol sobre vuestro enojo', ['Efesios 4, 26-32']),
  pasaje('ira-santiago', 'ira', 'Tardo para hablar, tardo para airarse', 'La carta de Santiago', ['Santiago 1, 19-21']),
  pasaje('miedo-isaias', 'miedo', 'No temas, porque yo estoy contigo', 'El profeta Isaías', ['Isaías 41, 10-13']),
  pasaje('miedo-barca', 'miedo', '¿Por qué teméis?', 'El Señor calma la tormenta', ['Marcos 4, 35-41']),
  pasaje('decision-proverbios', 'decision', 'El Señor endereza sus pasos', 'Proverbios, sobre los planes del hombre', ['Proverbios 3, 5-8', 'Proverbios 16, 1-9']),

  /* La Iglesia */
  pasaje('ayuno-isaias', 'ayuno', 'El ayuno que yo escogí', 'El profeta Isaías', ['Isaías 58, 5-11']),
  pasaje('ayuno-mateo', 'ayuno', 'Cuando ayunes, unge tu cabeza', 'Las palabras del Señor', ['Mateo 6, 16-21'], 'Se lee el domingo del Perdón, a las puertas de la Cuaresma.'),

  /* Las nueve odas */
  pasaje('oda-1', 'odas', 'Primera oda: el cántico de Moisés', 'Cantemos al Señor, porque se ha cubierto de gloria', ['Éxodo 15, 1-19'], 'Las nueve odas son cánticos de la Biblia. Sobre ellas se escriben las nueve odas de cada canon de Maitines, y por eso cada una habla de lo mismo que el cántico.'),
  pasaje('oda-2', 'odas', 'Segunda oda: el segundo cántico de Moisés', 'Escuchad, cielos, y hablaré', ['Deuteronomio 32, 1-43'], 'Se reza sólo en Cuaresma, porque es un cántico severo.'),
  pasaje('oda-3', 'odas', 'Tercera oda: el cántico de Ana', 'Mi corazón se regocija en el Señor', ['1 Samuel 2, 1-10']),
  pasaje('oda-4', 'odas', 'Cuarta oda: el cántico de Habacuc', 'Oí, Señor, tu palabra, y temí', ['Habacuc 3, 1-19']),
  pasaje('oda-5', 'odas', 'Quinta oda: el cántico de Isaías', 'De noche te desea mi alma', ['Isaías 26, 9-20']),
  pasaje('oda-6', 'odas', 'Sexta oda: el cántico de Jonás', 'Desde el vientre del pez', ['Jonás 2, 1-9']),
  pasaje('oda-7', 'odas', 'Séptima oda: la oración de Azarías', 'Bendito eres, Señor, Dios de nuestros padres', ['Daniel griego 3, 26-45']),
  pasaje('cantico-tres-jovenes', 'odas', 'Octava oda: el cántico de los tres jóvenes', 'Bendecid al Señor, todas las obras del Señor', ['Daniel griego 3, 52-90']),
  pasaje('magnificat', 'odas', 'Novena oda: el cántico de la Theotokos', 'Engrandece mi alma al Señor', ['Lucas 1, 46-55'], 'Mientras se canta, en los Maitines, el diácono inciensa la iglesia.'),
  pasaje('cantico-zacarias', 'odas', 'Novena oda: el cántico de Zacarías', 'Bendito el Señor, Dios de Israel', ['Lucas 1, 68-79']),

  /* Oraciones de la Biblia */
  pasaje('bienaventuranzas', 'oraciones-biblicas', 'Las Bienaventuranzas', 'Se cantan en cada Divina Liturgia: el programa entero de las virtudes', ['Mateo 5, 3-12']),
  pasaje('oracion-sacerdotal', 'oraciones-biblicas', 'Que todos sean uno', 'La oración del Señor en la Última Cena', ['Juan 17, 1-26']),
  pasaje('oracion-iglesia', 'oraciones-biblicas', 'Soberano Señor, Tú eres Dios', 'La oración de la primera Iglesia, en la persecución', ['Hechos 4, 24-31']),
  pasaje('oracion-apocalipsis', 'oraciones-biblicas', 'Grandes y maravillosas son tus obras', 'El cántico de los que vencieron', ['Apocalipsis 15, 3-4']),
  pasaje('oracion-david', 'oraciones-biblicas', 'Tuya es, Señor, la grandeza', 'La oración de David, al final de su vida', ['1 Crónicas 29, 10-19']),
  pasaje('oracion-salomon-templo', 'oraciones-biblicas', 'Oye desde los cielos, y perdona', 'La oración de Salomón al dedicar el templo', ['1 Reyes 8, 22-40']),
  pasaje('oracion-ezequias', 'oraciones-biblicas', 'A la mitad de mis días', 'La oración de Ezequías, cuando sanó', ['Isaías 38, 9-20']),
  pasaje('oracion-nehemias', 'oraciones-biblicas', 'Estén atentos tus oídos', 'La oración de Nehemías, por su pueblo', ['Nehemías 1, 4-11']),
  pasaje('oracion-esdras', 'oraciones-biblicas', 'Avergonzado estoy para levantar mi rostro', 'La oración de Esdras', ['Esdras 9, 5-15']),
  pasaje('oracion-tobias', 'oraciones-biblicas', 'Bendito seas, Dios de nuestros padres', 'La oración de Tobías y Sara, la noche de bodas', ['Tobías 8, 5-8']),
  pasaje('oracion-judit', 'oraciones-biblicas', 'Tú eres el Dios de los humildes', 'La oración de Judit', ['Judit 9, 1-14']),
  pasaje('oracion-pablo-gracias', 'oraciones-biblicas', 'Bendito sea el Dios de toda consolación', 'San Pablo a los corintios', ['2 Corintios 1, 3-7']),

  /* Grupos de salmos */
  {
    id: 'salmos-hexapsalmos',
    category: 'salmos-necesidad',
    title: 'Los seis salmos',
    subtitle: 'Con los que empiezan cada día los Maitines',
    blocks: [
      rub('Se leen a oscuras y sin moverse: dicen los Padres que son como el juicio. Tres salmos de angustia y tres de consuelo.'),
      ...[3, 37, 62, 87, 102, 142].map(salmoBloque),
    ],
    meta: SALTERIO([3, 37, 62, 87, 102, 142]),
  },
  {
    id: 'salmos-de-la-noche',
    category: 'salmos-necesidad',
    title: 'Los salmos de la noche',
    subtitle: 'Los de las Grandes Completas',
    blocks: [
      rub('Los que abren las Grandes Completas. Se pueden rezar sueltos antes de dormir.'),
      ...[4, 6, 12, 24, 30, 90].map(salmoBloque),
    ],
    meta: SALTERIO([4, 6, 12, 24, 30, 90]),
  },
  {
    id: 'salmos-de-las-subidas',
    category: 'salmos-necesidad',
    title: 'Los cánticos de las subidas',
    subtitle: 'Los que se cantaban subiendo a Jerusalén: del 119 al 133',
    blocks: [
      rub('Son quince, y forman la kathisma 18. Salmos breves, de camino, para ir subiendo poco a poco.'),
      ...[119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133].map(salmoBloque),
    ],
    meta: SALTERIO([119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133]),
  },
];

export const VIRTUE_PRAYERS: ThirdPrayerSeed[] = [...DE_LOS_PADRES, ...DE_LOS_OFICIOS, ...POR_VIRTUDES, ...OTRAS];
