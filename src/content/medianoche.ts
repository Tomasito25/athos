/**
 * El Oficio de Medianoche, entero: el de los días de diario, el del sábado y
 * el del domingo.
 *
 * Hasta la versión 1.25 ATHOS tenía el de diario a medias y decía que faltaban
 * «la oración de san Marcos el Monje y los troparios propios del sábado y del
 * domingo». La oración no es de san Marcos: es la de san Mardario, uno de los
 * cinco mártires de Sebaste, la misma que en los libros eslavos cierra la Hora
 * Tercia. Ahora está, con todo lo demás.
 *
 * Traducido del Horologion griego (glt.goarch.org): las tres formas del
 * Mesonyktikon. Los salmos no se copian: se muestran tomados del Salterio de
 * ATHOS. La traducción del resto es de ATHOS y no procede de ningún libro
 * litúrgico español publicado.
 */
import type { OfficeSection, TextBlock } from '@/types';
import { TODA_HORA } from './horas';

const t = (content: string): TextBlock => ({ kind: 'text', content });
const rub = (content: string): TextBlock => ({ kind: 'rubric', content });
const ref = (content: string): TextBlock => ({ kind: 'refrain', content });
const head = (content: string): TextBlock => ({ kind: 'heading', content });
const psalm = (n: number): TextBlock => ({ kind: 'psalm', content: `Salmo ${n}`, ref: String(n) });
const s = (id: string, title: string, blocks: TextBlock[]): OfficeSection => ({ id, title, blocks });

const POR_LOS_SIGLOS = 'ahora y siempre, y por los siglos de los siglos.';
const TRISAGIO = rub('Trisagio, «Santísima Trinidad» y Padre Nuestro, como en el comienzo habitual (Orar → Oraciones → Comienzo habitual).');

const MARDARIO = t(
  'Soberano Dios, Padre todopoderoso, Señor Hijo unigénito, Jesucristo, y Espíritu Santo, una sola divinidad, un solo poder: ten piedad de mí, pecador, y por los caminos que Tú conoces sálvame a mí, tu siervo indigno, porque eres bendito por los siglos de los siglos. Amén.',
);

/** El final común de los tres días: los salmos 120 y 133 y la conmemoración de los difuntos. */
const DIFUNTOS: OfficeSection[] = [
  s('salmos-finales', 'Los salmos 120 y 133', [
    rub('De lunes a sábado, el lector dice «Venid, adoremos» tres veces, con tres postraciones, y los salmos:'),
    psalm(120),
    psalm(133),
    TRISAGIO,
  ]),
  s('difuntos', 'Por los difuntos', [
    rub('El oficio de Medianoche termina cada día rezando por los difuntos: en la tradición monástica es el momento fijo del día en que se hace. Troparios, en el tono octavo:'),
    t('Acuérdate, Señor, como bueno, de tus siervos, y perdónales todo lo que pecaron en esta vida; porque nadie está sin pecado, sino Tú, que puedes dar el descanso también a los que han partido.'),
    t('Tú, que con la profundidad de tu sabiduría todo lo dispones por amor a los hombres y das a todos lo que les conviene, único Creador: da descanso, Señor, a las almas de tus siervos, porque en Ti pusieron su esperanza, Creador, Hacedor y Dios nuestro.'),
    rub('Gloria al Padre, y al Hijo, y al Espíritu Santo.'),
    t('Con los santos da descanso, oh Cristo, a las almas de tus siervos, donde no hay dolor, ni tristeza, ni gemido, sino vida sin fin.'),
    rub('Ahora y siempre, y por los siglos de los siglos. Amén.'),
    t('Te llamamos bienaventurada todas las generaciones, Virgen Theotokos, porque en ti se dignó estar contenido Cristo, nuestro Dios, a quien nada puede contener. Bienaventurados somos también nosotros, que te tenemos por protectora: porque día y noche intercedes por nosotros, y los cetros del Reino se afianzan por tus súplicas. Por eso, cantándote, te clamamos: Alégrate, llena de gracia, el Señor está contigo.'),
    { kind: 'text', content: 'Señor, ten piedad.', times: 12 },
    rub('El sacerdote, o quien preside, dice la oración por los difuntos:'),
    t(`Acuérdate, Señor, de nuestros padres y hermanos que se han dormido en la esperanza de la resurrección y de la vida eterna, y de todos los que han llegado al fin en la piedad y en la fe; perdónales toda falta, voluntaria e involuntaria, que hayan cometido de palabra, de obra o de pensamiento. Hazlos habitar en lugares de luz, en lugares de verdor, en lugares de frescura, de donde han huido todo dolor, toda tristeza y todo gemido, donde la visión de tu rostro alegra a todos tus santos desde siempre. Concédeles a ellos y a nosotros tu Reino, la participación en tus bienes inefables y eternos y el gozo de tu vida sin fin y bienaventurada. Porque Tú eres la vida, la resurrección y el descanso de tus siervos dormidos, Cristo Dios nuestro, y a Ti te damos gloria, con tu Padre sin principio y tu santísimo, bueno y vivificante Espíritu, ${POR_LOS_SIGLOS} Amén.`),
  ]),
  s('final', 'Al terminar', [
    t('Gloriosísima, siempre Virgen, bendita Theotokos: presenta nuestra oración a tu Hijo y Dios nuestro, y pídele que por ti salve nuestras almas.'),
    ref('Mi esperanza es el Padre, mi refugio el Hijo, mi protección el Espíritu Santo. Trinidad Santa, gloria a Ti.'),
    t('Toda mi esperanza la pongo en ti, Madre de Dios: guárdame bajo tu amparo.'),
    rub('Después, en el tono sexto, los troparios «Ten piedad de nosotros, Señor, ten piedad de nosotros», «Señor, ten piedad de nosotros, porque en Ti hemos confiado» y «Ábrenos la puerta de la compasión», que están en las Completas; «Señor, ten piedad» cuarenta veces; «Más venerable que los querubines»; «En el nombre del Señor, bendice, padre».'),
    rub('Si hay sacerdote, dice la letanía y la despedida, y después la breve letanía de los monasterios, a la que se responde «Señor, ten piedad» a cada petición:'),
    t('Oremos por la paz del mundo. Por los cristianos piadosos y ortodoxos. Por nuestro arzobispo N. y por toda nuestra hermandad en Cristo. Por nuestros padres y hermanos ausentes. Por los que nos sirven y nos han servido. Por los que nos odian y los que nos aman. Por los que nos han pedido, a nosotros, indignos, que oremos por ellos. Por la liberación de los cautivos. Por los que navegan. Por los que yacen enfermos. Oremos también por la abundancia de los frutos de la tierra, y por todos nuestros padres y hermanos que se han dormido antes que nosotros, los que reposan aquí piadosamente y los ortodoxos de todas partes. Digamos también por nosotros mismos: Señor, ten piedad.'),
    t('Por las oraciones de nuestros santos padres, Señor Jesucristo, Dios nuestro, ten piedad de nosotros y sálvanos. Amén.'),
  ]),
];

export const MEDIANOCHE: OfficeSection[] = [
  s('sentido', 'Por qué a medianoche', [
    rub('Se reza al levantarse de noche, esperando al Esposo que llega a medianoche (Mateo 25). En los monasterios abre el ciclo diario: es el primer oficio, antes de los Maitines. Tiene tres formas: la de los días de diario, la del sábado y la del domingo.'),
  ]),
  s('comienzo', 'El comienzo', [
    rub('Sacerdote: «Bendito sea nuestro Dios…». O, si reza un laico: «Por las oraciones de nuestros santos padres…». Sigue el comienzo habitual, «Venid, adoremos» tres veces, y el salmo 50:'),
    psalm(50),
  ]),

  s('diario', 'Los días de diario: el salmo 118', [
    rub('De lunes a viernes se lee el salmo 118 entero, la kathisma decimoséptima, que habla de la ley de Dios y de la noche: «A medianoche me levantaba para alabarte por tus justos juicios».'),
    psalm(118),
    rub('Se dice el Símbolo de la Fe (Orar → Oraciones → Símbolo de la Fe) y el Trisagio.'),
    rub('Troparios, en el tono octavo:'),
    t('He aquí que el Esposo viene a medianoche, y bienaventurado el siervo a quien encuentre velando; pero indigno aquel a quien halle negligente. Mira, pues, alma mía, no te dejes vencer por el sueño, no sea que seas entregada a la muerte y quedes fuera del Reino; antes bien, despierta clamando: Santo, Santo, Santo eres, oh Dios; por la intercesión de la Theotokos, ten piedad de nosotros.'),
    rub('Gloria al Padre, y al Hijo, y al Espíritu Santo.'),
    t('Pensando en aquel día terrible, alma mía, vela, enciende tu lámpara y hazla brillar con aceite; porque no sabes cuándo vendrá a ti la voz que dice: He aquí el Esposo. Mira, pues, alma mía, no te duermas, no sea que te quedes fuera llamando, como las cinco vírgenes; vela, en cambio, sin descanso, para salir con aceite abundante al encuentro de Cristo Dios, y que Él te dé la cámara nupcial divina de su gloria.'),
    rub('Ahora y siempre, y por los siglos de los siglos. Amén.'),
    t('A ti, muralla inexpugnable, fortaleza de la salvación, Virgen Theotokos, te suplicamos: deshaz los planes de los enemigos, cambia en alegría la tristeza de tu pueblo, rodea de murallas tu ciudad, combate al lado de quien gobierna, llama de nuevo a tu mundo, fortalece a los piadosos e intercede por la paz del mundo, porque tú eres, Theotokos, nuestra esperanza.'),
    rub('En los días que preceden o siguen a una fiesta del Señor o de la Theotokos, en lugar de estos troparios se dice, leído, el tropario de la fiesta.'),
    { kind: 'text', content: 'Señor, ten piedad.', times: 40 },
    rub('Y la oración de todas las horas:'),
    ...TODA_HORA,
    rub('«Más venerable que los querubines…». «En el nombre del Señor, bendice, padre». Sacerdote: «Que Dios se compadezca de nosotros y nos bendiga, haga brillar su rostro sobre nosotros y tenga piedad de nosotros». Amén.'),
    head('En los días de ayuno'),
    rub('Desde el 22 de septiembre hasta el Domingo de Ramos, cuando hay ayuno, se hacen tres grandes postraciones y se dice la oración de san Efrén, que está en Orar → Oraciones, y después:'),
    MARDARIO,
    rub('Oración de san Basilio el Grande:'),
    t('Señor todopoderoso, Dios de los ejércitos y de toda carne, que habitas en las alturas y miras lo humilde, que escrutas los corazones y las entrañas y conoces claramente los secretos de los hombres; luz sin principio y eterna, en quien no hay cambio ni sombra de variación: Tú mismo, Rey inmortal, recibe las súplicas que en este tiempo de la noche, confiados en la multitud de tus compasiones, te dirigimos con labios impuros; perdónanos las faltas que hemos cometido de obra, de palabra y de pensamiento, a sabiendas o sin saberlo, y purifícanos de toda mancha de la carne y del espíritu, haciéndonos templos del Espíritu Santo.'),
    t('Y concédenos pasar toda la noche de la vida presente con el corazón despierto y la mente sobria, esperando la venida del día luminoso y manifiesto de tu Hijo unigénito, nuestro Señor, Dios y Salvador Jesucristo, en el que vendrá a la tierra con gloria, como Juez de todos, a dar a cada uno según sus obras; para que no nos encuentre caídos y dormidos, sino velando y bien despiertos en el cumplimiento de sus mandamientos, preparados para la alegría, y entremos con Él en la cámara nupcial divina de su gloria, donde está la voz incesante de los que celebran la fiesta y el gozo inefable de los que contemplan la belleza indecible de tu rostro. Porque Tú eres la luz verdadera, que ilumina y santifica todas las cosas, y a Ti te canta toda la creación por los siglos de los siglos. Amén.'),
    rub('Y la segunda oración de san Basilio:'),
    t('Te bendecimos, oh Dios altísimo y Señor de la misericordia, que siempre haces con nosotros cosas grandes e inescrutables, gloriosas y admirables, sin número; que nos concediste el sueño para descanso de nuestra debilidad y reposo de las fatigas de nuestra carne. Te damos gracias porque no nos has hecho perecer con nuestras iniquidades, sino que, amando a los hombres como siempre, nos has levantado cuando yacíamos sin esperanza, para que glorifiquemos tu poder. Por eso suplicamos a tu bondad inconmensurable: ilumina los ojos de nuestro entendimiento y levanta nuestra mente del pesado sueño de la pereza; abre nuestra boca y llénala de tu alabanza, para que podamos cantarte, confesarte y glorificarte sin distracción, a Ti, Dios glorificado en todo y por todos, Padre sin principio, con tu Hijo unigénito y tu santísimo, bueno y vivificador Espíritu, ahora y siempre, y por los siglos de los siglos. Amén.'),
  ]),

  s('sabado', 'El sábado: la kathisma novena', [
    rub('El sábado, en lugar del salmo 118 se lee la kathisma novena, los salmos 64 a 69:'),
    psalm(64),
    psalm(65),
    psalm(66),
    psalm(67),
    psalm(68),
    psalm(69),
    rub('Símbolo de la Fe y Trisagio. Troparios, en el tono segundo:'),
    t('Imitando a las potestades de lo alto, nosotros, los de la tierra, te ofrecemos el himno de victoria, oh Bueno: Santo, Santo, Santo eres, Dios nuestro. Por la intercesión de tus santos, Señor, sálvame.'),
    rub('Gloria al Padre, y al Hijo, y al Espíritu Santo.'),
    t('Naturaleza increada, creadora de todo: abre nuestros labios para que anunciemos tu alabanza, clamando: Santo, Santo, Santo eres, oh Dios. Por la intercesión de la Theotokos, Señor, sálvame.'),
    rub('Ahora y siempre, y por los siglos de los siglos. Amén.'),
    t('Tú, que me has levantado del lecho y del sueño, Señor, ilumina mi mente y abre mi corazón y mis labios para cantarte, Trinidad santa: Santo, Santo, Santo eres, Dios nuestro. Por la intercesión de la Theotokos, ten piedad de nosotros.'),
    { kind: 'text', content: 'Señor, ten piedad.', times: 40 },
    rub('La oración de todas las horas, «Más venerable que los querubines», la bendición del sacerdote, la oración de san Efrén con sus postraciones, la de san Mardario y, en lugar de las de san Basilio, ésta:'),
    head('Oración de san Eustracio'),
    t('Engrandeciéndote te engrandezco, Señor, porque miraste mi humillación y no me encerraste en manos de los enemigos, sino que salvaste mi alma de las angustias. Y ahora, Soberano, que me cubra tu mano y venga sobre mí tu misericordia, porque mi alma está turbada y llena de dolor al salir de este cuerpo miserable y sucio, no sea que el mal designio del adversario le salga al encuentro y la detenga por los pecados que he cometido en esta vida, por ignorancia y a sabiendas.'),
    t('Sé propicio conmigo, Soberano, y que mi alma no vea el aspecto sombrío y tenebroso de los malos demonios, sino que la reciban tus ángeles luminosos y resplandecientes. Da gloria a tu santo nombre y llévame con tu poder ante tu tribunal divino. Cuando sea juzgado, que no me alcance la mano del príncipe de este mundo para arrastrarme, a mí, pecador, al fondo del infierno; sino ponte a mi lado y sé mi Salvador y mi defensor. Ten piedad, Señor, de mi alma, manchada por las pasiones de la vida, y recíbela pura por el arrepentimiento y la confesión, porque eres bendito por los siglos de los siglos. Amén.'),
    rub('San Eustracio es uno de los cinco mártires de Sebaste, compañero de san Mardario; la Iglesia los conmemora el 13 de diciembre. Según su Pasión, rezó esta oración antes de morir.'),
  ]),

  s('domingo', 'El domingo: el canon de la Trinidad', [
    rub('El domingo no se lee el Salterio: después del salmo 50 se dice el Símbolo de la Fe y se canta el canon a la Santísima Trinidad del tono de la semana, del Octoecos, con el estribillo:'),
    ref('Santísima Trinidad, Dios nuestro, ten piedad de nosotros y sálvanos.'),
    rub('Después del canon se cantan estos megalinarios a la Trinidad, que se omiten cuando cae en domingo una fiesta del Señor:'),
    t('Digno es en verdad cantar a la Trinidad que está por encima de toda divinidad: al Padre sin principio y creador de todo, al Verbo igualmente sin principio, engendrado del Padre antes de los siglos sin división, y al Espíritu Santo, que procede del Padre fuera del tiempo.'),
    t('Digno es en verdad glorificarte a Ti, Dios Verbo, ante quien tiemblan y se estremecen los querubines y a quien glorifican las potestades de los cielos: a Cristo, dador de vida, resucitado del sepulcro al tercer día, glorifiquémoslo con temor.'),
    t('Cantemos todos como conviene a Dios, con cantos divinos, al Padre, al Hijo y al Espíritu divino, poder en tres personas, único Reino y único Señorío.'),
    t('Al ver a tu Hijo resucitado de entre los muertos como conviene a Dios, Virgen purísima, la creación se llenó de una alegría inefable, glorificándolo a Él y honrándote a ti.'),
    rub('«Más venerable que los querubines», el Trisagio, «Señor, ten piedad» cuarenta veces y la bendición. El domingo no se dicen los salmos 120 y 133 ni la conmemoración de los difuntos: el domingo, día de la Resurrección, no se reza por ellos en este oficio.'),
  ]),

  ...DIFUNTOS,
];
