/**
 * Las Vísperas, enteras en lo que tienen de fijo.
 *
 * Las Vísperas son el oficio con que empieza el día litúrgico. Hasta la
 * versión 1.25 ATHOS tenía su esqueleto; ahora tiene todo lo que no cambia de
 * un día a otro: las siete oraciones de la luz que el sacerdote reza durante
 * el salmo inicial, las letanías, los salmos de la lámpara, el «Luz alegre»,
 * los prokímena de cada día de la semana y los grandes de la Cuaresma, la
 * oración de la inclinación, los versículos de las apósticas, los troparios
 * finales y la despedida.
 *
 * Lo que sí cambia —las estiqueras de «Señor, a Ti clamo» y de las
 * apósticas, el tropario del día, las lecturas de las vísperas de fiesta— se
 * toma del Octoecos, del Menaion y del Triodion, y se indica dónde va.
 *
 * Traducido del Horologion griego (glt.goarch.org). Los salmos no se copian:
 * se muestran tomados del Salterio de ATHOS. La traducción del resto es de
 * ATHOS y no procede de ningún libro litúrgico español publicado.
 */
import type { OfficeSection, TextBlock } from '@/types';

const t = (content: string): TextBlock => ({ kind: 'text', content });
const rub = (content: string): TextBlock => ({ kind: 'rubric', content });
const ref = (content: string): TextBlock => ({ kind: 'refrain', content });
const head = (content: string): TextBlock => ({ kind: 'heading', content });
const psalm = (n: number): TextBlock => ({ kind: 'psalm', content: `Salmo ${n}`, ref: String(n) });
const section = (
  id: string,
  title: string,
  blocks: TextBlock[],
  voice?: OfficeSection['voice'],
): OfficeSection => ({ id, title, blocks, voice });

const AMEN = ref('Amén.');
const SENOR = ref('Señor, ten piedad.');
const POR_LOS_SIGLOS = 'ahora y siempre, y por los siglos de los siglos.';

export const VISPERAS: OfficeSection[] = [
  section('inicio', 'Comienzo', [
    rub('Sacerdote:'),
    t(`Bendito sea nuestro Dios, siempre, ${POR_LOS_SIGLOS}`),
    AMEN,
    rub('Lector:'),
    t('Venid, adoremos y postrémonos ante nuestro Rey y Dios.'),
    t('Venid, adoremos y postrémonos ante Cristo, nuestro Rey y Dios.'),
    t('Venid, adoremos y postrémonos ante el mismo Cristo, nuestro Rey y nuestro Dios.'),
    rub('En las iglesias eslavas, y en todas cuando no hay sacerdote, se empieza con el comienzo habitual: «Rey celestial», Trisagio y Padre Nuestro (Orar → Oraciones → Comienzo habitual).'),
  ]),

  section('salmo-103', 'El salmo de la creación', [
    rub('Se lee el salmo 103. En las Vísperas de víspera de domingo y de fiesta, el sacerdote inciensa toda la iglesia mientras tanto: el humo que sube es la oración de la creación entera.'),
    psalm(103),
    rub('Al final se repite: «El sol conoce su ocaso; pusiste las tinieblas y se hizo de noche. ¡Qué grandes son tus obras, Señor! Todo lo hiciste con sabiduría». Gloria, ahora y siempre. Aleluya, aleluya, aleluya, gloria a Ti, oh Dios (tres veces).'),
  ]),

  section('oraciones-de-la-luz', 'Las siete oraciones de la luz', [
    rub('Mientras se lee el salmo, el sacerdote, ante las puertas santas cerradas y con la cabeza descubierta, reza en voz baja estas siete oraciones. Son de las más antiguas del oficio, de cuando las vísperas se celebraban al encender las lámparas.'),
    head('Primera'),
    t(`Señor compasivo y misericordioso, paciente y lleno de misericordia: presta oído a nuestra oración y atiende a la voz de nuestra súplica. Haz con nosotros una señal favorable; guíanos por tu camino para que andemos en tu verdad; alegra nuestros corazones para que temamos tu santo nombre. Porque Tú eres grande y haces maravillas; sólo Tú eres Dios, y no hay entre los dioses nadie semejante a Ti, Señor, poderoso en misericordia y bueno en fuerza, para ayudar, consolar y salvar a todos los que esperan en tu santo nombre. Porque a Ti corresponde toda gloria, honor y adoración, al Padre, y al Hijo, y al Espíritu Santo, ${POR_LOS_SIGLOS} Amén.`),
    head('Segunda'),
    t(`Señor, no nos reprendas en tu cólera ni nos castigues en tu ira, sino trátanos según tu clemencia, médico y sanador de nuestras almas. Guíanos al puerto de tu voluntad; ilumina los ojos de nuestros corazones para que conozcamos tu verdad; y concédenos que lo que queda de este día, y todo el tiempo de nuestra vida, sea pacífico y sin pecado, por la intercesión de la santa Theotokos y de todos tus santos. Porque tuyo es el poder, y tuyos son el Reino, la fuerza y la gloria, del Padre, y del Hijo, y del Espíritu Santo, ${POR_LOS_SIGLOS} Amén.`),
    head('Tercera'),
    t(`Señor, Dios nuestro, acuérdate de nosotros, tus siervos pecadores e inútiles, cuando invocamos tu santo nombre, y no nos defraudes en la espera de tu misericordia; concédenos, Señor, todo lo que te pedimos para nuestra salvación, y haznos dignos de amarte y temerte con todo nuestro corazón y de hacer en todo tu voluntad. Porque eres Dios bueno y amigo de los hombres, y a Ti te damos gloria, al Padre, y al Hijo, y al Espíritu Santo, ${POR_LOS_SIGLOS} Amén.`),
    head('Cuarta'),
    t(`Tú, a quien los santos poderes cantan con himnos incesantes y alabanzas que no callan: llena nuestra boca de tu alabanza, para que engrandezcamos tu santo nombre; y danos parte y herencia con todos los que te temen de verdad y guardan tus mandamientos, por la intercesión de la santa Theotokos y de todos tus santos. Porque a Ti corresponde toda gloria, honor y adoración, al Padre, y al Hijo, y al Espíritu Santo, ${POR_LOS_SIGLOS} Amén.`),
    head('Quinta'),
    t(`Señor, Señor, que sostienes el universo en tu mano purísima, que tienes paciencia con todos nosotros y te compadeces de nuestras maldades: acuérdate de tus compasiones y de tu misericordia; visítanos en tu bondad, y concédenos escapar también, en lo que queda de este día, de las múltiples trampas del maligno, y guarda nuestra vida libre de asechanzas, por la gracia de tu santísimo Espíritu. Por la misericordia y el amor a los hombres de tu Hijo unigénito, con quien eres bendito, junto con tu santísimo, bueno y vivificante Espíritu, ${POR_LOS_SIGLOS} Amén.`),
    head('Sexta'),
    t(`Dios grande y admirable, que con bondad inefable y rica providencia gobiernas el universo; que nos has dado los bienes de este mundo y nos has garantizado el Reino prometido por los bienes que ya nos has concedido; que nos has hecho apartarnos de todo mal en la parte ya pasada de este día: concédenos también acabar sin reproche lo que queda de él delante de tu santa gloria, cantándote a Ti, nuestro único Dios bueno y amigo de los hombres. Porque Tú eres nuestro Dios, y a Ti te damos gloria, al Padre, y al Hijo, y al Espíritu Santo, ${POR_LOS_SIGLOS} Amén.`),
    head('Séptima'),
    t('Dios grande y altísimo, el único que posee la inmortalidad y habita en una luz inaccesible, que hiciste con sabiduría toda la creación; que separaste la luz de las tinieblas y pusiste el sol para gobernar el día, y la luna y las estrellas para gobernar la noche; que nos has hecho dignos a nosotros, pecadores, de presentarnos también en esta hora ante tu rostro con la confesión y de ofrecerte la alabanza de la tarde: Tú mismo, Señor amigo de los hombres, haz subir nuestra oración como incienso ante Ti y recíbela en olor de fragancia.'),
    t(`Concédenos que esta tarde y la noche que viene sean en paz; revístenos con las armas de la luz; líbranos del temor nocturno y de todo lo que se mueve en las tinieblas; y danos el sueño que nos regalaste como descanso para nuestra debilidad, libre de toda fantasía diabólica. Sí, Soberano de todo, dador de los bienes: para que, compungidos también en nuestros lechos, nos acordemos de tu nombre en la noche, e iluminados por la meditación de tus mandamientos, nos levantemos con el alma alegre para glorificar tu bondad, ofreciendo a tu compasión súplicas y ruegos por nuestros propios pecados y por todo tu pueblo; visítalo con misericordia por la intercesión de la santa Theotokos. Porque eres Dios bueno y amigo de los hombres, y a Ti te damos gloria, al Padre, y al Hijo, y al Espíritu Santo, ${POR_LOS_SIGLOS} Amén.`),
  ], 'sacerdote'),

  section('letania-paz', 'La gran letanía', [
    rub('Diácono, o el sacerdote si no hay diácono; a cada petición se responde «Señor, ten piedad»:'),
    t('En paz, oremos al Señor.'),
    t('Por la paz de lo alto y por la salvación de nuestras almas, oremos al Señor.'),
    t('Por la paz del mundo entero, por la estabilidad de las santas Iglesias de Dios y por la unión de todos, oremos al Señor.'),
    t('Por esta santa casa y por los que entran en ella con fe, piedad y temor de Dios, oremos al Señor.'),
    t('Por los cristianos piadosos y ortodoxos, oremos al Señor.'),
    t('Por nuestro arzobispo N., por el venerable presbiterio, por el diaconado en Cristo, por todo el clero y el pueblo, oremos al Señor.'),
    t('Por nuestro país, por sus autoridades y por todos los que lo protegen, oremos al Señor.'),
    t('Por esta ciudad, por toda ciudad y región, y por los que viven en ellas con fe, oremos al Señor.'),
    t('Por un clima benigno, por la abundancia de los frutos de la tierra y por tiempos de paz, oremos al Señor.'),
    t('Por los que navegan, los que viajan, los enfermos, los que sufren, los cautivos, y por su salvación, oremos al Señor.'),
    t('Por que seamos librados de toda aflicción, ira, peligro y necesidad, oremos al Señor.'),
    t('Socórrenos, sálvanos, ten piedad de nosotros y guárdanos, oh Dios, por tu gracia.'),
    t('Conmemorando a nuestra santísima, purísima, bendita sobre todas y gloriosa Señora, la Theotokos y siempre Virgen María, junto con todos los santos, encomendémonos a nosotros mismos, unos a otros, y toda nuestra vida a Cristo Dios.'),
    ref('A Ti, Señor.'),
    rub('Sacerdote:'),
    t(`Porque a Ti corresponde toda gloria, honor y adoración, al Padre, y al Hijo, y al Espíritu Santo, ${POR_LOS_SIGLOS}`),
    AMEN,
    rub('Los sábados por la tarde y en las vísperas de fiesta se canta aquí el primer kathisma del Salterio, «Bienaventurado el varón»; los demás días, el kathisma que toque.'),
  ]),

  section('senor-clame', 'Señor, a Ti clamo', [
    rub('El coro canta los salmos de la lámpara en el tono de la semana o de la fiesta. Empieza así:'),
    ref('Señor, a Ti clamo: escúchame. Escúchame, Señor. Señor, a Ti clamo, escúchame; atiende a la voz de mi súplica cuando clamo a Ti. Escúchame, Señor.'),
    ref('Suba mi oración como el incienso ante Ti; el alzar de mis manos, como sacrificio vespertino. Escúchame, Señor.'),
    rub('Sigue el resto de los salmos 140, 141, 129 y 116, y en los últimos versículos se intercalan las estiqueras del día: diez los sábados y vísperas de fiesta, seis los días ordinarios, y la del «Gloria» y la del «Ahora», que es un theotokion. Las estiqueras se toman del Octoecos, del Menaion o del Triodion.'),
    psalm(140),
    psalm(141),
    psalm(129),
    psalm(116),
    rub('Mientras se canta, el sacerdote o el diácono inciensa el santuario y la iglesia.'),
  ]),

  section('luz-alegre', 'La entrada y el «Luz alegre»', [
    rub('En las Vísperas de víspera de domingo y de fiesta el sacerdote sale con el incensario por las puertas del norte y vuelve a entrar por las santas. El diácono:'),
    t('¡Sabiduría! ¡De pie!'),
    t('Luz alegre de la santa gloria del Padre inmortal, celestial, santo, bienaventurado: ¡oh Jesucristo! Llegados a la puesta del sol y viendo la luz de la tarde, cantamos al Padre, al Hijo y al Espíritu Santo, Dios. Digno eres de ser cantado en todo tiempo con voces santas, oh Hijo de Dios, que das la vida; por eso el mundo te glorifica.'),
    rub('Es uno de los himnos cristianos más antiguos que se siguen cantando; ya san Basilio lo cita en el siglo IV como venerable y de autor desconocido.'),
  ]),

  section('prokimenon', 'El prokímenon del día', [
    rub('Diácono: «¡Atendamos!». Sacerdote: «Paz a todos». Coro: «Y con tu espíritu». Diácono: «¡Sabiduría! ¡Atendamos!». Y se canta el prokímenon que toca:'),
    head('El sábado por la tarde'),
    rub('Tono sexto:'),
    t('El Señor reina, se ha vestido de majestad.'),
    rub('Versículos: «Se ha vestido el Señor de poder y se ha ceñido». «Ha afianzado el orbe, que no se moverá».'),
    head('El domingo por la tarde'),
    rub('Tono octavo:'),
    t('Bendecid ahora al Señor, todos los siervos del Señor.'),
    rub('Versículo: «Los que estáis en la casa del Señor, en los atrios de la casa de nuestro Dios».'),
    head('El lunes por la tarde'),
    rub('Tono cuarto:'),
    t('El Señor me escuchará cuando clame a Él.'),
    rub('Versículo: «Cuando te invocaba me escuchaste, Dios de mi justicia».'),
    head('El martes por la tarde'),
    rub('Tono primero:'),
    t('Tu misericordia, Señor, me seguirá todos los días de mi vida.'),
    rub('Versículo: «El Señor es mi pastor, nada me falta».'),
    head('El miércoles por la tarde'),
    rub('Tono quinto:'),
    t('Oh Dios, sálvame por tu nombre, y por tu poder hazme justicia.'),
    rub('Versículo: «Oh Dios, escucha mi oración».'),
    head('El jueves por la tarde'),
    rub('Tono sexto:'),
    t('Mi ayuda viene del Señor, que hizo el cielo y la tierra.'),
    rub('Versículo: «Alcé mis ojos a los montes, de donde vendrá mi ayuda».'),
    head('El viernes por la tarde'),
    rub('Tono séptimo:'),
    t('Oh Dios, Tú eres mi protector; tu misericordia se adelantará a socorrerme.'),
    rub('Versículo: «Líbrame de mis enemigos, oh Dios».'),
    head('Los domingos de Cuaresma por la tarde'),
    rub('El gran prokímenon, en el tono octavo. El domingo del Perdón y los domingos segundo y cuarto de Cuaresma:'),
    t('No apartes tu rostro de tu siervo, porque estoy afligido: escúchame pronto, atiende a mi alma y líbrala.'),
    rub('Versículos: «Que tu salvación, oh Dios, me proteja». «Que lo vean los pobres y se alegren; buscad a Dios y vivirá vuestra alma». Al final se repite con voz más alta.'),
    rub('Los domingos primero, tercero y quinto de Cuaresma:'),
    t('Diste herencia a los que temen tu nombre, Señor.'),
    rub('Versículos: «Desde los confines de la tierra clamé a Ti, cuando desfallecía mi corazón; me elevaste sobre la roca». «Me cobijaré al amparo de tus alas». «Así cantaré a tu nombre por los siglos, cumpliendo mis votos día tras día». Al final se repite con voz más alta.'),
    rub('En las vísperas de las fiestas se leen aquí las lecturas del Antiguo Testamento, las paremias, que dan las lecturas del día.'),
  ]),

  section('letania-ferviente', 'La letanía ferviente', [
    rub('Diácono; a cada petición se responde tres veces «Señor, ten piedad». En las Vísperas de los días ordinarios, sin diácono, esta letanía se omite.'),
    t('Digamos todos con toda el alma y con todo el entendimiento, digamos.'),
    t('Señor todopoderoso, Dios de nuestros padres, te rogamos: escúchanos y ten piedad.'),
    t('Ten piedad de nosotros, oh Dios, según tu gran misericordia; te rogamos: escúchanos y ten piedad.'),
    t('Oremos también por nuestro arzobispo N.'),
    t('Oremos también por nuestros hermanos, los sacerdotes, los hieromonjes, los hierodiáconos y los monjes, y por toda nuestra hermandad en Cristo.'),
    t('Oremos también por la misericordia, la vida, la paz, la salud, la salvación, la visita, el perdón y la remisión de los pecados de los siervos de Dios, de todos los cristianos piadosos y ortodoxos que viven en esta ciudad o están de paso, de los fieles, administradores y bienhechores de este santo templo.'),
    t('Oremos también por los bienaventurados y siempre recordados fundadores de esta santa iglesia, y por todos nuestros padres y hermanos que se han dormido antes que nosotros, los que reposan aquí piadosamente y los ortodoxos de todas partes.'),
    t('Oremos también por los que traen ofrendas y hacen el bien en este santo y venerabilísimo templo, por los que trabajan en él, por los que cantan, y por el pueblo aquí presente, que espera de Ti la grande y rica misericordia.'),
    rub('Sacerdote:'),
    t(`Porque eres Dios misericordioso y amigo de los hombres, y a Ti te damos gloria, al Padre, y al Hijo, y al Espíritu Santo, ${POR_LOS_SIGLOS}`),
    AMEN,
  ]),

  section('concedenos', 'Concédenos, Señor', [
    rub('El lector, o todos:'),
    t('Concédenos, Señor, guardarnos sin pecado esta tarde. Bendito eres, Señor, Dios de nuestros padres, y alabado y glorificado es tu nombre por los siglos. Amén.'),
    t('Que tu misericordia, Señor, venga sobre nosotros, como hemos esperado en Ti.'),
    t('Bendito eres, Señor: enséñame tus preceptos. Bendito eres, Soberano: hazme entender tus preceptos. Bendito eres, Santo: ilumíname con tus preceptos.'),
    t('Señor, tu misericordia es eterna: no desprecies la obra de tus manos. A Ti se debe la alabanza, a Ti se debe el himno, a Ti se debe la gloria, al Padre, y al Hijo, y al Espíritu Santo, ahora y siempre, y por los siglos de los siglos. Amén.'),
  ]),

  section('letania-tarde', 'La letanía de la tarde', [
    rub('Diácono:'),
    t('Completemos nuestra oración de la tarde al Señor.'),
    SENOR,
    t('Socórrenos, sálvanos, ten piedad de nosotros y guárdanos, oh Dios, por tu gracia.'),
    SENOR,
    t('Pidamos al Señor que toda la tarde sea perfecta, santa, pacífica y sin pecado.'),
    ref('Concédelo, Señor.'),
    t('Pidamos al Señor un ángel de paz, guía fiel y guardián de nuestras almas y de nuestros cuerpos.'),
    ref('Concédelo, Señor.'),
    t('Pidamos al Señor el perdón y la remisión de nuestros pecados y de nuestras faltas.'),
    ref('Concédelo, Señor.'),
    t('Pidamos al Señor lo que es bueno y provechoso para nuestras almas, y la paz para el mundo.'),
    ref('Concédelo, Señor.'),
    t('Pidamos al Señor acabar en paz y en arrepentimiento el tiempo que nos queda de vida.'),
    ref('Concédelo, Señor.'),
    t('Pidamos un final de nuestra vida cristiano, sin dolor, sin vergüenza y en paz, y una buena defensa ante el temible tribunal de Cristo.'),
    ref('Concédelo, Señor.'),
    t('Conmemorando a nuestra santísima, purísima, bendita sobre todas y gloriosa Señora, la Theotokos y siempre Virgen María, junto con todos los santos, encomendémonos a nosotros mismos, unos a otros, y toda nuestra vida a Cristo Dios.'),
    ref('A Ti, Señor.'),
    rub('Sacerdote:'),
    t(`Porque eres Dios bueno y amigo de los hombres, y a Ti te damos gloria, al Padre, y al Hijo, y al Espíritu Santo, ${POR_LOS_SIGLOS}`),
    AMEN,
    t('Paz a todos.'),
    ref('Y con tu espíritu.'),
    rub('Diácono:'),
    t('Inclinemos la cabeza ante el Señor.'),
    ref('A Ti, Señor.'),
    rub('Sacerdote, en voz baja, la oración de la inclinación:'),
    t('Dios nuestro, que inclinaste los cielos y bajaste para la salvación del género humano: mira a tus siervos y a tu heredad. Porque ante Ti, Juez temible y amigo de los hombres, tus siervos han inclinado la cabeza y sometido el cuello, no esperando ayuda de los hombres, sino aguardando tu misericordia y esperando tu salvación. Guárdalos en todo tiempo, también esta tarde y la noche que viene, de todo enemigo, de toda acción contraria del diablo, de los pensamientos vanos y de los malos deseos.'),
    rub('En voz alta:'),
    t(`Bendito y glorificado sea el poder de tu Reino, del Padre, y del Hijo, y del Espíritu Santo, ${POR_LOS_SIGLOS}`),
    AMEN,
  ]),

  section('aposticas', 'Las apósticas', [
    rub('Se cantan las estiqueras de las apósticas del día, con estos versículos entre una y otra. La víspera del domingo:'),
    t('El Señor reina, se ha vestido de majestad; se ha vestido el Señor de poder y se ha ceñido.'),
    t('Ha afianzado el orbe, que no se moverá.'),
    t('A tu casa corresponde la santidad, Señor, por días sin término.'),
    rub('Los demás días:'),
    t('A Ti levanto mis ojos, a Ti que habitas en el cielo. Como los ojos de los siervos están puestos en las manos de sus señores, como los ojos de la sierva en las manos de su señora, así nuestros ojos están puestos en el Señor, nuestro Dios, hasta que tenga piedad de nosotros.'),
    t('Ten piedad de nosotros, Señor, ten piedad de nosotros, que estamos saciados de desprecio; nuestra alma está harta del oprobio de los satisfechos y del desprecio de los soberbios.'),
    rub('Gloria, y la estiquera del día; ahora y siempre, y el theotokion.'),
  ]),

  section('nunc-dimittis', 'El cántico de Simeón', [
    t('Ahora, Soberano, despides a tu siervo en paz, según tu palabra; porque han visto mis ojos tu salvación, la que has preparado ante la faz de todos los pueblos: luz para revelación a las naciones y gloria de tu pueblo Israel.'),
    rub('Trisagio, «Santísima Trinidad» y Padre Nuestro, como en el comienzo habitual. El sacerdote: «Porque tuyos son el Reino, el poder y la gloria…».'),
  ]),

  section('troparios', 'Los troparios', [
    rub('Se canta el tropario del día o de la fiesta. Cuando no hay ninguno, en los libros griegos se cantan éstos:'),
    t('Bautista de Cristo, acuérdate de todos nosotros, para que seamos librados de nuestras iniquidades, porque a ti se te ha dado la gracia de interceder por nosotros.'),
    rub('Gloria al Padre, y al Hijo, y al Espíritu Santo.'),
    t('Interceded por nosotros, santos apóstoles y todos los santos, para que seamos librados de los peligros y de las aflicciones, porque os tenemos por ardientes protectores ante el Salvador.'),
    rub('Ahora y siempre, y por los siglos de los siglos. Amén.'),
    t('Bajo tu compasión nos refugiamos, oh Theotokos: no desprecies nuestras súplicas en la necesidad, sino líbranos de los peligros, tú, la única pura, la única bendita.'),
    rub('En las vísperas de los domingos y de las fiestas con bendición de los panes se canta tres veces:'),
    t('Theotokos Virgen, alégrate, María llena de gracia, el Señor está contigo; bendita tú entre las mujeres y bendito el fruto de tu vientre, porque diste a luz al Salvador de nuestras almas.'),
    { kind: 'day-troparion', content: 'Tropario del día' },
  ]),

  section('despedida', 'La despedida', [
    { kind: 'text', content: 'Señor, ten piedad.', times: 40 },
    rub(`Gloria al Padre, y al Hijo, y al Espíritu Santo, ${POR_LOS_SIGLOS} Amén.`),
    t('Más venerable que los querubines e incomparablemente más gloriosa que los serafines, tú que sin corrupción diste a luz a Dios Verbo, verdadera Theotokos, te engrandecemos.'),
    t('En el nombre del Señor, bendice, padre.'),
    rub('Sacerdote:'),
    t(`Bendito el que es, Cristo, nuestro Dios, siempre, ${POR_LOS_SIGLOS}`),
    AMEN,
    rub('Lector:'),
    t('Rey celestial, fortalece a los que nos gobiernan, afianza la fe, amansa a los pueblos, pacifica el mundo; guarda bien esta santa iglesia y esta ciudad; pon en las moradas de los justos a nuestros padres y hermanos que nos han precedido, y recíbenos a nosotros en el arrepentimiento y la confesión, porque eres bueno y amigo de los hombres.'),
    rub('Theotokion, en el tono segundo:'),
    t('Proteges, oh Buena, con tu mano poderosa a todos los que se refugian en ti con fe; porque nosotros, pecadores, agobiados por muchas faltas, no tenemos ante Dios otra mediación en los peligros y las aflicciones, Madre del Dios altísimo. Por eso nos postramos ante ti: libra a tus siervos de toda adversidad.'),
    rub('Sacerdote:'),
    t('¡Sabiduría!'),
    rub('Lector: «Bendice». Sacerdote:'),
    t(`Bendito el que es, Cristo, nuestro Dios, siempre, ${POR_LOS_SIGLOS}`),
    rub('Lector:'),
    t('Que el Señor Dios afiance la fe santa e inmaculada de los cristianos piadosos y ortodoxos, junto con su santa Iglesia y esta ciudad, por los siglos de los siglos. Amén.'),
    rub('Gloria, ahora y siempre. Señor, ten piedad (tres veces). Santo señor, bendice. Sacerdote:'),
    t('Gloria a Ti, oh Dios, esperanza nuestra; Señor, gloria a Ti.'),
    t('Cristo, nuestro Dios verdadero (el sábado por la tarde: que resucitó de entre los muertos), por las intercesiones de su purísima y del todo inmaculada santa Madre; por el poder de la preciosa y vivificante Cruz; por la protección de las venerables Potestades celestiales incorpóreas; por las súplicas del venerable y glorioso profeta, Precursor y Bautista Juan; de los santos, gloriosos y dignos de toda alabanza apóstoles; de los santos, gloriosos y victoriosos mártires; de nuestros venerables padres portadores de Dios; de los santos y justos antepasados de Dios Joaquín y Ana; del santo del día y de todos los santos, tenga piedad de nosotros y nos salve, porque es bueno, amigo de los hombres y misericordioso.'),
    t('Por las oraciones de nuestros santos padres, Señor Jesucristo, Dios nuestro, ten piedad de nosotros y sálvanos.'),
    AMEN,
  ]),
];
