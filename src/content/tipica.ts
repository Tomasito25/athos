/**
 * Las Típicas: la parte de la Liturgia que se puede rezar sin sacerdote.
 *
 * Los días en que no hay Divina Liturgia —y en la Cuaresma, los días de
 * diario— se rezan después de la Hora Sexta (o de la Novena). Toman de la
 * Liturgia los salmos típicos, las Bienaventuranzas, el Símbolo y el Padre
 * Nuestro, sin la anáfora. Por eso son también el oficio de los que no tienen
 * iglesia cerca: rezadas en casa el domingo, unen a la Liturgia que se está
 * celebrando en otra parte.
 *
 * Traducido del Horologion griego («Τὰ Τυπικά») y cotejado con la Obédnitsa
 * del Chasoslov eslavo, de donde vienen el «Bendito sea el nombre del Señor»
 * y el salmo 33 del final. Los salmos no se copian: se muestran del Salterio
 * de ATHOS. La traducción es de ATHOS y no procede de ningún libro litúrgico
 * español publicado.
 */
import type { OfficeSection, TextBlock } from '@/types';
import { GREEK_FORMULAS as G } from './greek';
import { ORACION_DE_EFREN } from './comun';

const t = (content: string): TextBlock => ({ kind: 'text', content });
const rub = (content: string): TextBlock => ({ kind: 'rubric', content });
const ref = (content: string): TextBlock => ({ kind: 'refrain', content });
const psalm = (n: number): TextBlock => ({ kind: 'psalm', content: `Salmo ${n}`, ref: String(n) });
const gr = (clave: keyof typeof G, times?: number): TextBlock => ({
  kind: 'text',
  content: G[clave].spanish,
  greek: G[clave].greek,
  roman: G[clave].roman,
  times,
});
const section = (id: string, title: string, blocks: TextBlock[]): OfficeSection => ({ id, title, blocks });

const GLORIA = rub('Gloria al Padre, y al Hijo, y al Espíritu Santo.');
const AHORA = rub('Ahora y siempre, y por los siglos de los siglos. Amén.');
const TRADUCCION = rub('Traducción para ATHOS a partir del original griego, que es de dominio público; no procede de un libro litúrgico español publicado.');

/** Las Bienaventuranzas, Mt 5, 3-12, precedidas del ruego del buen ladrón. */
const BIENAVENTURANZAS: TextBlock[] = [
  ref('En tu Reino acuérdate de nosotros, Señor, cuando vengas en tu Reino.'),
  t('Bienaventurados los pobres en espíritu, porque de ellos es el Reino de los cielos.'),
  t('Bienaventurados los que lloran, porque ellos serán consolados.'),
  t('Bienaventurados los mansos, porque ellos heredarán la tierra.'),
  t('Bienaventurados los que tienen hambre y sed de justicia, porque ellos serán saciados.'),
  t('Bienaventurados los misericordiosos, porque ellos alcanzarán misericordia.'),
  t('Bienaventurados los limpios de corazón, porque ellos verán a Dios.'),
  t('Bienaventurados los que trabajan por la paz, porque ellos serán llamados hijos de Dios.'),
  t('Bienaventurados los perseguidos por causa de la justicia, porque de ellos es el Reino de los cielos.'),
  t('Bienaventurados seréis cuando os injurien y os persigan y digan con mentira toda clase de mal contra vosotros por mi causa.'),
  t('Alegraos y regocijaos, porque vuestra recompensa será grande en los cielos.'),
];

const SANTO = 'Santo, santo, santo, Señor Sabaot; llenos están el cielo y la tierra de tu gloria.';

export const TIPICA: OfficeSection[] = [
  section('sentido', 'Cuándo se rezan', [
    rub('Después de la Hora Sexta, los días en que no se celebra la Divina Liturgia; en la Gran Cuaresma, los días de diario, después de la Novena.'),
    t('Son la parte de la Liturgia que no necesita sacerdote. Quien vive lejos de una iglesia puede rezarlas en casa el domingo, a la hora de la Liturgia, y unirse así a la que se está celebrando en otra parte. En eslavo se llaman obédnitsa, «la pequeña Liturgia».'),
  ]),

  section('salmo-102', 'Salmo 102 · Bendice, alma mía, al Señor', [
    rub('Si no siguen a otro oficio, se empieza con el comienzo habitual. Después:'),
    psalm(102),
    GLORIA,
  ]),

  section('salmo-145', 'Salmo 145 · Alaba, alma mía, al Señor', [
    psalm(145),
    GLORIA,
    AHORA,
  ]),

  section('unigenito', 'Hijo unigénito', [
    t('Hijo unigénito y Verbo de Dios, que siendo inmortal te dignaste, por nuestra salvación, encarnarte de la santa Theotokos y siempre Virgen María, y sin cambiar te hiciste hombre; y crucificado, oh Cristo Dios, con tu muerte venciste a la muerte: Tú, que eres uno de la santa Trinidad, glorificado con el Padre y el Espíritu Santo, sálvanos.'),
  ]),

  section('bienaventuranzas', 'Las Bienaventuranzas', [
    rub('En la Gran Cuaresma se cantan despacio, y después de cada bienaventuranza se repite «Acuérdate de nosotros, Señor, cuando vengas en tu Reino».'),
    ...BIENAVENTURANZAS,
    GLORIA,
    ref('Acuérdate de nosotros, Señor, cuando vengas en tu Reino.'),
    ref('Acuérdate de nosotros, Soberano, cuando vengas en tu Reino.'),
    AHORA,
    ref('Acuérdate de nosotros, Santo, cuando vengas en tu Reino.'),
  ]),

  section('coro-celestial', 'El coro celestial', [
    t(`El coro celestial te canta y dice: ${SANTO}`),
    rub('Versículo, del salmo 33:'),
    t('Acercaos a Él y seréis iluminados, y vuestros rostros no quedarán avergonzados.'),
    t(`El coro celestial te canta y dice: ${SANTO}`),
    GLORIA,
    t(`El coro de los santos ángeles y arcángeles, con todas las potestades celestiales, te canta y dice: ${SANTO}`),
    AHORA,
  ]),

  section('simbolo', 'Símbolo de la fe', [
    t('Creo en un solo Dios, Padre todopoderoso, Creador del cielo y de la tierra, de todo lo visible y lo invisible.'),
    t('Y en un solo Señor Jesucristo, Hijo único de Dios, nacido del Padre antes de todos los siglos: Luz de Luz, Dios verdadero de Dios verdadero, engendrado, no creado, consustancial al Padre, por quien todo fue hecho; que por nosotros los hombres y por nuestra salvación bajó de los cielos, y se encarnó del Espíritu Santo y de María la Virgen, y se hizo hombre; y fue crucificado por nosotros bajo Poncio Pilato, y padeció y fue sepultado; y resucitó al tercer día según las Escrituras, y subió a los cielos y está sentado a la derecha del Padre; y de nuevo vendrá con gloria para juzgar a vivos y muertos, y su reino no tendrá fin.'),
    t('Y en el Espíritu Santo, Señor y dador de vida, que procede del Padre, que junto con el Padre y el Hijo recibe una misma adoración y gloria, que habló por los profetas.'),
    t('Y en la Iglesia, una, santa, católica y apostólica.'),
    t('Confieso un solo bautismo para el perdón de los pecados. Espero la resurrección de los muertos y la vida del siglo venidero. Amén.'),
  ]),

  section('perdona', 'Perdona, remite, condona', [
    t('Perdona, remite, condona, oh Dios, nuestras faltas, las voluntarias y las involuntarias, las de obra y las de palabra, las conscientes y las inconscientes, las de la noche y las del día, las de la mente y las del pensamiento: perdónanoslas todas, porque eres bueno y amante de los hombres.'),
    gr('paterImon'),
    rub('Sacerdote: «Porque tuyo es el reino, y el poder, y la gloria, del Padre, y del Hijo, y del Espíritu Santo, ahora y siempre, y por los siglos de los siglos». Sin sacerdote: «Por las oraciones de nuestros santos padres, Señor Jesucristo, Dios nuestro, ten piedad de nosotros y sálvanos». Amén.'),
  ]),

  section('kontakia', 'Los kontakia', [
    rub('Se dicen los kontakia del día: el de la Resurrección los domingos, el de la fiesta o el del santo, y el del templo. ATHOS pone los que corresponden hoy según tu calendario. En la Cuaresma los días de diario son otros, del Triodion, y no están incorporados.'),
    { kind: 'day-kontakion', content: 'Kontakia del día' },
  ]),

  section('kyrie', 'Señor, ten piedad', [
    gr('kyrie', 40),
    GLORIA,
    AHORA,
    t('Más honorable que los querubines e incomparablemente más gloriosa que los serafines, tú que sin mancha diste a luz al Verbo de Dios, verdadera Theotokos, te engrandecemos.'),
    rub('En el nombre del Señor, bendice, padre.'),
    rub('Sacerdote: «Dios tenga piedad de nosotros y nos bendiga; haga resplandecer su rostro sobre nosotros y nos tenga misericordia». Sin sacerdote: «Por las oraciones de nuestros santos padres…». Amén.'),
  ]),

  section('santisima-trinidad', 'Santísima Trinidad, poder consustancial', [
    t('Santísima Trinidad, poder consustancial, reino indivisible, causa de todo bien: muestra tu benevolencia también conmigo, pecador; afirma mi corazón y dale entendimiento, y quita de mí toda mancha; ilumina mi mente, para que siempre te glorifique, te cante, te adore y diga: Uno solo es santo, uno solo es Señor, Jesucristo, para gloria de Dios Padre. Amén.'),
  ]),

  section('salmo-33', 'Bendito sea el nombre del Señor', [
    { kind: 'text', content: 'Bendito sea el nombre del Señor, desde ahora y para siempre.', times: 3 },
    psalm(33),
  ]),

  section('final', 'Final', [
    gr('axionEstin'),
    gr('doxa'),
    gr('kyrie', 3),
    rub('Con sacerdote, la despedida. Sin él: «Por las oraciones de nuestros santos padres, Señor Jesucristo, Dios nuestro, ten piedad de nosotros y sálvanos». Amén.'),
  ]),

  section('cuaresma', 'En la Gran Cuaresma', [
    rub('Los días de diario de la Cuaresma, antes de la despedida, se dice la oración de san Efrén el Sirio:'),
    ...ORACION_DE_EFREN,
    TRADUCCION,
  ]),
];
