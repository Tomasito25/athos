/**
 * Lo que faltaba del libro de oraciones para tenerlo entero.
 *
 * Con esto están completas las cuatro piezas que todo libro de oraciones
 * ortodoxo trae y que se rezan seguidas:
 *
 * - las oraciones de la mañana, de la primera a la décima;
 * - las oraciones antes del sueño, de la primera a la undécima, con la
 *   confesión diaria de los pecados;
 * - las oraciones antes de comulgar, las diez del Horologion griego, con sus
 *   salmos, troparios y versos;
 * - la acción de gracias después de comulgar, con sus cinco oraciones.
 *
 * Además, de las «oraciones para diversas necesidades» del libro eslavo, los
 * troparios y kontakia que tienen los momentos que se habían quedado cortos:
 * antes de toda obra, por el amor mutuo, por los que nos odian, en la
 * calamidad, por los beneficios recibidos, antes de la lectura espiritual.
 *
 * Fuentes. Las oraciones de la mañana y de la noche y las de diversas
 * necesidades se han traducido del Molitvoslov eslavo en la transcripción de
 * Wikisource, que cita la edición sinodal de 1893 pero reproduce el texto de
 * una edición moderna: las oraciones son las mismas, y sólo cambian las
 * conmemoraciones de las autoridades. Las de la
 * comunión, del Horologion griego en la edición digital de la Archidiócesis
 * Ortodoxa Griega de América (glt.goarch.org), de donde se tradujo también el
 * canon de preparación. Son textos de siglos, de dominio público en su
 * original; la versión española es de ATHOS y cada ficha lo dice.
 *
 * Donde el eslavo nombraba al emperador, ATHOS dice «los que nos gobiernan»,
 * como hace con los reyes de los textos griegos, y la ficha lo advierte.
 */
import type { SourceMeta, TextBlock } from '@/types';
import type { ThirdPrayerSeed } from './prayers-third';

const DERECHOS =
  'Texto litúrgico tradicional; el original es de dominio público. Esta versión española es una traducción hecha para ATHOS y se publica bajo CC BY-SA 4.0.';

const NOTA_TRADUCCION =
  'Es una traducción de un texto que existe, no una oración escrita para ATHOS. La versión española es de ATHOS: no procede de un libro litúrgico español publicado.';

/** Una oración que existe, traducida para ATHOS. */
const traduccion = (
  fuente: string,
  original: 'griego' | 'eslavo' | 'griego y eslavo' | 'ruso',
  autor?: string,
  nota?: string,
): SourceMeta => ({
  source: `${fuente}. Traducción al español hecha para ATHOS a partir del original ${original}, que es de dominio público`,
  tradition: 'Rito bizantino',
  language: 'es',
  license: 'cc-by-sa-4.0',
  copyright: DERECHOS,
  dateAdded: '2026-10-06',
  author: autor,
  notes: nota ? `${NOTA_TRADUCCION} ${nota}` : NOTA_TRADUCCION,
});

const t = (content: string): TextBlock => ({ kind: 'text', content });
const rub = (content: string): TextBlock => ({ kind: 'rubric', content });
const head = (content: string): TextBlock => ({ kind: 'heading', content });

const MOLITVOSLOV = 'Libro de oraciones ortodoxo eslavo (Molitvoslov), en la transcripción de Wikisource';
const MANANA = `${MOLITVOSLOV}, oraciones de la mañana`;
const NOCHE = `${MOLITVOSLOV}, oraciones antes del sueño`;
const NECESIDADES = `${MOLITVOSLOV}, oraciones para diversas necesidades`;
const ANTES_COMULGAR = 'Horologion, Akolouthía de la Divina Comunión (glt.goarch.org)';
const DESPUES_COMULGAR = 'Horologion, acción de gracias después de la Divina Comunión (glt.goarch.org)';

const GLORIA = t('Gloria al Padre, y al Hijo, y al Espíritu Santo.');
const AHORA = t('Ahora y siempre, y por los siglos de los siglos. Amén.');

export const MOLITVOSLOV_PRAYERS: ThirdPrayerSeed[] = [
  /* ═════════════════════ AL DESPERTAR ═════════════════════ */
  {
    id: 'macario-tercera',
    title: 'A Ti, Soberano amante de los hombres',
    subtitle: 'Tercera oración de la mañana, de san Macario el Grande',
    category: 'manana',
    blocks: [
      t('A Ti, Soberano amante de los hombres, acudo al levantarme del sueño, y por tu misericordia me apresuro a tus obras, y te suplico: ayúdame en todo tiempo y en toda cosa, líbrame de todo mal del mundo y de toda instigación del diablo, sálvame e introdúceme en tu Reino eterno. Porque Tú eres mi Creador, el que provee y da todo bien; en Ti está toda mi esperanza, y a Ti te doy gloria, ahora y siempre, y por los siglos de los siglos. Amén.'),
    ],
    meta: traduccion(MANANA, 'eslavo', 'San Macario el Grande († 391), según la tradición'),
  },
  {
    id: 'macario-cuarta',
    title: 'Señor, que por tu mucha bondad',
    subtitle: 'Cuarta oración de la mañana, de san Macario el Grande',
    category: 'manana',
    blocks: [
      t('Señor, que por tu mucha bondad y tus grandes compasiones me has concedido a mí, tu siervo, pasar el tiempo de esta noche sin que me alcanzara ningún mal enemigo: Tú mismo, Soberano, Creador de todas las cosas, hazme digno de cumplir tu voluntad con tu luz verdadera y con el corazón iluminado, ahora y siempre, y por los siglos de los siglos. Amén.'),
    ],
    meta: traduccion(MANANA, 'eslavo', 'San Macario el Grande († 391), según la tradición'),
  },
  {
    id: 'basilio-manana-primera',
    title: 'Señor todopoderoso, Dios de los ejércitos',
    subtitle: 'Quinta oración de la mañana, de san Basilio el Grande',
    category: 'manana',
    blocks: [
      t('Señor todopoderoso, Dios de los ejércitos y de toda carne, que vives en las alturas y miras lo humilde, que escrutas los corazones y las entrañas y conoces de antemano los secretos de los hombres; Luz sin principio y eterna, en quien no hay cambio ni sombra de variación: Tú mismo, Rey inmortal, recibe las súplicas que en este momento, confiados en la multitud de tus compasiones, te dirigimos con labios impuros, y perdónanos los pecados que hemos cometido de obra, de palabra y de pensamiento, a sabiendas o sin saberlo, y purifícanos de toda mancha de la carne y del espíritu.'),
      t('Y concédenos pasar toda la noche de la vida presente con el corazón despierto y la mente sobria, esperando la venida del día luminoso y manifiesto de tu Hijo unigénito, nuestro Señor, Dios y Salvador Jesucristo, en el que el Juez de todos vendrá con gloria a dar a cada uno según sus obras; para que no nos encuentre caídos y perezosos, sino velando y levantados al trabajo, preparados, y entremos en su gozo y en la cámara divina de su gloria, donde está la voz incesante de los que celebran la fiesta y la dulzura indecible de los que contemplan la belleza inefable de tu rostro. Porque Tú eres la luz verdadera, que ilumina y santifica todas las cosas, y a Ti te canta toda la creación por los siglos de los siglos. Amén.'),
    ],
    meta: traduccion(MANANA, 'griego y eslavo', 'San Basilio el Grande († 379), según la tradición', 'En el Horologion griego es una de las oraciones del Oficio de medianoche.'),
  },
  {
    id: 'basilio-manana-segunda',
    title: 'Te bendecimos, Dios altísimo',
    subtitle: 'Sexta oración de la mañana, de san Basilio el Grande',
    category: 'manana',
    blocks: [
      t('Te bendecimos, Dios altísimo y Señor de la misericordia, que siempre haces con nosotros cosas grandes e inescrutables, gloriosas y admirables, sin número; que nos diste el sueño para descanso de nuestra debilidad y alivio de los trabajos de nuestra carne fatigada. Te damos gracias porque no nos has hecho perecer con nuestras iniquidades, sino que, amando a los hombres como siempre, nos has levantado cuando yacíamos sin esperanza, para que glorifiquemos tu poder.'),
      t('Por eso suplicamos a tu bondad sin medida: ilumina nuestros pensamientos y nuestros ojos, y levanta nuestra mente del pesado sueño de la pereza; abre nuestra boca y llénala de tu alabanza, para que podamos, sin vacilar, cantarte y confesarte a Ti, Dios glorificado en todos y por todos: Padre sin principio, con tu Hijo unigénito y tu santísimo, bueno y vivificador Espíritu, ahora y siempre, y por los siglos de los siglos. Amén.'),
    ],
    meta: traduccion(MANANA, 'griego y eslavo', 'San Basilio el Grande († 379), según la tradición', 'En el Horologion griego es una de las oraciones del Oficio de medianoche.'),
  },
  {
    id: 'theotokos-canto-tu-gracia',
    title: 'Canto tu gracia, Señora',
    subtitle: 'Séptima oración de la mañana, a la Theotokos',
    category: 'manana',
    blocks: [
      t('Canto tu gracia, Señora, y te ruego: llena de gracia mi mente. Enséñame a caminar derecho por el camino de los mandamientos de Cristo. Fortaléceme para velar en el canto, ahuyentando el sueño del desaliento. Atado como estoy con las cadenas de mis caídas, desátame con tus súplicas, Esposa de Dios. Guárdame de noche y de día, librándome de los enemigos que me combaten.'),
      t('Tú, que diste a luz a Dios, dador de la vida, vivifícame a mí, muerto por las pasiones. Tú, que diste a luz la Luz sin ocaso, ilumina mi alma ciega. Oh admirable palacio del Soberano, hazme morada del Espíritu divino. Tú, que diste a luz al Médico, sana las pasiones de mi alma, envejecidas con los años. Zarandeado por la tormenta de la vida, guíame al sendero del arrepentimiento. Líbrame del fuego eterno, del gusano maligno y del tártaro. No me hagas alegría de los demonios, a mí, culpable de tantos pecados.'),
      t('Renuévame, Purísima, a mí, envejecido por pecados insensatos. Muéstrame ajeno a todo tormento, y suplica al Soberano de todos. Hazme digno de alcanzar, con todos los santos, la alegría del cielo. Santísima Virgen, escucha la voz de tu siervo inútil. Dame un torrente de lágrimas, Purísima, que lave la suciedad de mi alma. Te ofrezco sin cesar los gemidos de mi corazón: apresúrate, Señora. Recibe el servicio de mi súplica y llévalo a Dios compasivo.'),
      t('Tú, más alta que los ángeles, ponme por encima de la confusión del mundo. Tienda celestial portadora de luz, endereza en mí la gracia del Espíritu. Alzo para alabarte mis manos y mis labios, manchados de impureza, Toda inmaculada. Líbrame de las insidias que corrompen el alma, suplicando con insistencia a Cristo, a quien corresponden el honor y la adoración, ahora y siempre, y por los siglos de los siglos. Amén.'),
    ],
    meta: traduccion(MANANA, 'eslavo'),
  },
  {
    id: 'jesucristo-manana',
    title: 'Misericordiosísimo Dios mío',
    subtitle: 'Octava oración de la mañana, a nuestro Señor Jesucristo',
    category: 'manana',
    blocks: [
      t('Muy misericordioso y todo misericordioso Dios mío, Señor Jesucristo: por tu gran amor descendiste y te encarnaste para salvar a todos. Y ahora, Salvador, sálvame por gracia, te lo suplico; porque si me salvas por las obras, no es gracia ni don, sino más bien deuda. Sí, Tú, el rico en compasión e inefable en misericordia, dijiste, Cristo mío: «El que cree en Mí vivirá y no verá la muerte jamás». Si, pues, la fe en Ti salva a los desesperados, he aquí que creo: sálvame, porque Tú eres mi Dios y mi Creador.'),
      t('Que la fe se me cuente en lugar de las obras, Dios mío, porque no encontrarás en mí obra alguna que me justifique. Que esa fe mía baste en lugar de todas ellas; que ella responda por mí, que ella me justifique, que ella me haga partícipe de tu gloria eterna. Que no me arrebate Satanás ni se jacte, oh Verbo, de haberme arrancado de tu mano y de tu redil. Quiera yo o no quiera, sálvame, Cristo Salvador mío; adelántate pronto, pronto, que perezco; porque Tú eres mi Dios desde el seno de mi madre.'),
      t('Concédeme, Señor, amarte ahora como amé en otro tiempo aquel mismo pecado, y servirte sin pereza y con diligencia como antes serví al engañoso Satanás. Y sobre todo te serviré a Ti, Señor y Dios mío Jesucristo, todos los días de mi vida, ahora y siempre, y por los siglos de los siglos. Amén.'),
    ],
    meta: traduccion(MANANA, 'eslavo'),
  },
  {
    id: 'tropario-de-la-cruz',
    title: 'Salva, Señor, a tu pueblo',
    subtitle: 'Tropario de la Cruz',
    category: 'manana',
    blocks: [
      t('Salva, Señor, a tu pueblo y bendice tu heredad; concede la victoria sobre el adversario, y guarda a los tuyos por el poder de tu Cruz.'),
      rub('Las oraciones de la mañana lo dicen después de las de la Theotokos. Se canta en tono primero, y es también el tropario de la Exaltación de la Cruz.'),
    ],
    meta: traduccion(MANANA, 'griego y eslavo', undefined, 'El original pedía la victoria para el emperador; esta versión, como las demás de ATHOS, la pide sin nombrar soberano.'),
  },

  /* ═════════════════════ AL ACOSTARSE ═════════════════════ */
  {
    id: 'antioco-noche',
    title: 'Todopoderoso, Verbo del Padre',
    subtitle: 'Segunda oración antes del sueño, de san Antíoco',
    category: 'noche',
    blocks: [
      t('Todopoderoso, Verbo del Padre, Jesucristo, que eres perfecto en Ti mismo: por tu gran misericordia no te apartes nunca de mí, tu siervo, sino descansa siempre en mí. Jesús, buen Pastor de tus ovejas, no me entregues a la sedición de la serpiente, ni me dejes a merced del deseo de Satanás, porque la semilla de la corrupción está en mí.'),
      t('Tú, pues, Señor Dios adorado, Rey santo, Jesucristo, guárdame mientras duermo con la luz que no se apaga, con tu Espíritu Santo, con el que santificaste a tus discípulos. Concédeme, Señor, también a mí, tu siervo indigno, tu salvación en mi lecho: ilumina mi mente con la luz del conocimiento de tu santo Evangelio; mi alma, con el amor de tu Cruz; mi corazón, con la pureza de tu palabra; mi cuerpo, con tu pasión impasible; guarda mi pensamiento con tu humildad, y levántame a su hora para glorificarte. Porque eres glorificadísimo, con tu Padre sin principio y con tu Espíritu santísimo, por los siglos. Amén.'),
    ],
    meta: traduccion(NOCHE, 'eslavo', 'San Antíoco, monje de San Sabas (siglo VII), según la tradición'),
  },
  {
    id: 'macario-que-te-ofrecere',
    title: '¿Qué te ofreceré?',
    subtitle: 'Cuarta oración antes del sueño, de san Macario el Grande',
    category: 'noche',
    blocks: [
      t('¿Qué te ofreceré, o qué te daré, Rey inmortal y generoso en dones, Señor compasivo y amante de los hombres? Porque, aunque he sido perezoso para agradarte y no he hecho nada bueno, me has traído al final de este día que ha pasado, disponiendo la conversión y la salvación de mi alma. Sé misericordioso conmigo, pecador y desnudo de toda obra buena; levanta mi alma caída, manchada por pecados sin medida, y aparta de mí todo pensamiento malo de esta vida visible.'),
      t('Perdona mis pecados, oh único sin pecado, los que he cometido contra Ti en este día, a sabiendas o sin saberlo, de palabra, de obra y de pensamiento, y con todos mis sentidos. Tú mismo, cubriéndome, guárdame de toda asechanza del adversario con tu poder divino, tu amor inefable a los hombres y tu fuerza. Purifica, oh Dios, purifica la multitud de mis pecados. Dígnate, Señor, librarme del lazo del maligno, salva mi alma apasionada y cúbreme con la luz de tu rostro cuando vengas en gloria; y ahora hazme dormir sin condenación, guarda sin ensueños y sin turbación el pensamiento de tu siervo, aleja de mí toda obra de Satanás e ilumina los ojos de la inteligencia de mi corazón, para que no me duerma en la muerte.'),
      t('Y envíame un ángel de paz, guardián y guía de mi alma y de mi cuerpo, que me libre de mis enemigos, para que, levantándome de mi lecho, te ofrezca súplicas de acción de gracias. Sí, Señor, escúchame a mí, tu siervo pecador y mísero, en mi voluntad y en mi conciencia; concédeme, al levantarme, aprender de tus palabras, y haz que tus ángeles alejen de mí el desaliento que traen los demonios, para que bendiga y glorifique tu santo nombre y glorifique a la purísima Theotokos María, a quien nos diste a los pecadores como protectora; recíbela cuando suplica por nosotros, porque sé que imita tu amor a los hombres y no cesa de interceder.'),
      t('Por su protección, por la señal de la preciosa Cruz y por todos tus santos, guarda mi pobre alma, Jesucristo Dios nuestro, porque Tú eres santo y glorificadísimo por los siglos. Amén.'),
    ],
    meta: traduccion(NOCHE, 'eslavo', 'San Macario el Grande († 391), según la tradición'),
  },
  {
    id: 'noche-quinta',
    title: 'Lo que hoy he pecado',
    subtitle: 'Quinta oración antes del sueño',
    category: 'noche',
    blocks: [
      t('Señor Dios nuestro: todo lo que he pecado en este día, de palabra, de obra y de pensamiento, perdónamelo, como bueno y amante de los hombres. Concédeme un sueño tranquilo y sereno. Envía a tu ángel custodio, que me cubra y me guarde de todo mal; porque Tú eres el guardián de nuestras almas y de nuestros cuerpos, y a Ti damos gloria, al Padre, y al Hijo, y al Espíritu Santo, ahora y siempre, y por los siglos de los siglos. Amén.'),
    ],
    meta: traduccion(NOCHE, 'eslavo'),
  },
  {
    id: 'noche-sexta',
    title: 'Señor Dios nuestro, en quien hemos creído',
    subtitle: 'Sexta oración antes del sueño',
    category: 'noche',
    blocks: [
      t('Señor Dios nuestro, en quien hemos creído y cuyo nombre invocamos sobre todo nombre: concédenos, a los que vamos a dormir, descanso del alma y del cuerpo; guárdanos de todo ensueño y del placer tenebroso; detén el ímpetu de las pasiones y apaga los ardores que se levantan en el cuerpo. Concédenos vivir castamente de obra y de palabra, para que, abrazando una vida virtuosa, no perdamos los bienes que nos has prometido; porque bendito eres por los siglos. Amén.'),
    ],
    meta: traduccion(NOCHE, 'eslavo'),
  },
  {
    id: 'noche-octava',
    title: 'Líbrame del asedio de los demonios',
    subtitle: 'Octava oración antes del sueño, a nuestro Señor Jesucristo',
    category: 'noche',
    blocks: [
      t('Señor Jesucristo, Hijo de Dios: por las oraciones de tu Madre honorabilísima, de tus ángeles incorpóreos, de tu Profeta, Precursor y Bautista, de los apóstoles que hablaron de Dios, de los mártires luminosos y victoriosos, de los padres venerables y portadores de Dios y de todos los santos, líbrame del asedio presente de los demonios.'),
      t('Sí, Señor mío y Creador, que no quieres la muerte del pecador, sino que se convierta y viva: concédeme también a mí, miserable e indigno, la conversión; arráncame de la boca de la serpiente destructora, que se abre para devorarme y llevarme vivo al infierno. Sí, Señor mío, consuelo mío, que por mí, miserable, te revestiste de carne corruptible: sácame de la miseria y da consuelo a mi alma desdichada. Planta en mi corazón el cumplir tus mandatos, dejar las obras malas y alcanzar tus bienaventuranzas; porque en Ti, Señor, he esperado: sálvame.'),
    ],
    meta: traduccion(NOCHE, 'eslavo'),
  },
  {
    id: 'estudita-theotokos',
    title: 'A ti, purísima Madre de Dios',
    subtitle: 'Novena oración antes del sueño, de san Pedro Estudita',
    category: 'noche',
    blocks: [
      t('A ti, purísima Madre de Dios, me postro y te suplico yo, miserable: tú sabes, Reina, que peco sin cesar e irrito a tu Hijo y Dios mío; y aunque me arrepiento muchas veces, me encuentro mentiroso ante Dios, y me arrepiento temblando: ¿no me herirá el Señor?; y al cabo de una hora vuelvo a hacer lo mismo.'),
      t('Sabiendo esto, Señora mía, Soberana Theotokos, te ruego que tengas piedad de mí, que me fortalezcas y me concedas hacer el bien. Porque sabes, Señora mía Theotokos, que aborrezco de veras mis malas obras y amo con todo mi pensamiento la ley de mi Dios; pero no sé, Señora purísima, por qué amo lo que aborrezco y paso por encima del bien.'),
      t('No permitas, Purísima, que se cumpla mi voluntad, porque no es agradable a Dios; sino que se haga la voluntad de tu Hijo y Dios mío: que me salve, me dé entendimiento y me conceda la gracia del Espíritu Santo, para que desde ahora deje de obrar el mal y viva lo que me quede según el mandato de tu Hijo, a quien corresponde toda gloria, honor y poder, con su Padre sin principio y su santísimo, bueno y vivificador Espíritu, ahora y siempre, y por los siglos de los siglos. Amén.'),
    ],
    meta: traduccion(NOCHE, 'eslavo', 'San Pedro Estudita, según la tradición'),
  },
  {
    id: 'suplicas-a-la-theotokos',
    title: 'Gloriosísima siempre Virgen',
    subtitle: 'Súplicas a la Theotokos y oración de san Joanicio',
    category: 'noche',
    blocks: [
      t('Gloriosísima siempre Virgen, Madre de Cristo Dios: lleva nuestra oración a tu Hijo y Dios nuestro, para que por ti salve nuestras almas.'),
      t('Toda mi esperanza la pongo en ti, Madre de Dios: guárdame bajo tu amparo.'),
      t('Virgen Theotokos, no me desprecies a mí, pecador, que necesito tu ayuda y tu protección; porque en ti ha esperado mi alma: ten piedad de mí.'),
      head('Oración de san Joanicio el Grande'),
      t('Mi esperanza es el Padre, mi refugio el Hijo, mi protección el Espíritu Santo. Trinidad Santa, gloria a Ti.'),
      rub('Se reza también en las Completas y en el Oficio de medianoche.'),
    ],
    meta: traduccion(NOCHE, 'griego y eslavo'),
  },
  {
    id: 'ilumina-mis-ojos',
    title: 'Ilumina mis ojos, Cristo Dios',
    subtitle: 'Troparios antes del sueño',
    category: 'noche',
    blocks: [
      t('Ilumina mis ojos, Cristo Dios, para que no me duerma en la muerte, para que no diga mi enemigo: He prevalecido contra él.'),
      GLORIA,
      t('Sé el protector de mi alma, oh Dios, porque camino en medio de muchos lazos: líbrame de ellos y sálvame, oh Bueno, como amante de los hombres.'),
      AHORA,
      t('A la gloriosísima Madre de Dios, más santa que los santos ángeles, cantémosle sin callar con el corazón y con los labios, confesándola Theotokos, porque en verdad nos dio a luz a Dios encarnado, y suplica sin cesar por nuestras almas.'),
    ],
    meta: traduccion(NOCHE, 'griego y eslavo', undefined, 'Los dos primeros son también los de la Hora de medianoche del sábado y los de las Completas.'),
  },

  /* ═════════════════════ ANTES DE CONFESAR ═════════════════════ */
  {
    id: 'confesion-diaria',
    title: 'Confesión diaria de los pecados',
    subtitle: 'Al final de las oraciones antes del sueño',
    category: 'confesion',
    blocks: [
      rub('El libro de oraciones la pone al final de las oraciones de la noche, para decirla cada día. Antes de confesarse sirve para examinarse: recorre, uno por uno, los pecados más corrientes.'),
      t('Te confieso a Ti, Señor Dios mío y Creador, adorado y glorificado en la Santa Trinidad, Padre, Hijo y Espíritu Santo, todos mis pecados, los que he cometido todos los días de mi vida, a toda hora, en el tiempo presente y en los días y las noches pasados:'),
      t('de obra, de palabra, de pensamiento; con la glotonería, la embriaguez, el comer a escondidas, la palabrería, el desaliento, la pereza, la porfía, la desobediencia, la calumnia, el juicio de los demás, la negligencia, el amor propio, el afán de poseer, el robo, la mentira, la ganancia deshonesta, la codicia, los celos, la envidia, la ira, el rencor, el odio, la usura; y con todos mis sentidos: la vista, el oído, el olfato, el gusto, el tacto; y con mis demás pecados, del alma y del cuerpo a la vez,'),
      t('con los que te he irritado a Ti, mi Dios y Creador, y he obrado injustamente con mi prójimo. Lamentándolo, me presento culpable ante Ti, mi Dios, y tengo voluntad de arrepentirme. Sólo ayúdame, Señor Dios mío; con lágrimas te lo suplico humildemente: perdóname por tu misericordia los pecados que he cometido, y absuélveme de todo lo que he dicho delante de Ti, porque eres bueno y amante de los hombres.'),
    ],
    meta: traduccion(NOCHE, 'eslavo'),
  },

  /* ═════════════════════ ANTES DE COMULGAR ═════════════════════ */
  {
    id: 'troparios-antes-comulgar',
    title: 'Pasa por alto mis iniquidades',
    subtitle: 'Troparios y versos antes de las oraciones de la Comunión',
    category: 'comunion',
    blocks: [
      rub('Después de los salmos 22, 23 y 115, en el tono sexto:'),
      t('Pasa por alto mis iniquidades, Señor, nacido de una Virgen, y purifica mi corazón, haciéndolo templo de tu Cuerpo y de tu Sangre inmaculados; no me apartes de tu rostro, Tú que tienes una gran misericordia sin medida.'),
      GLORIA,
      t('¿Cómo me atreveré, indigno, a la comunión de tus santos dones? Porque, si me atrevo a acercarme a Ti con los dignos, la túnica me delata, porque no es de la Cena, y procuraré la condenación de mi alma tan pecadora. Purifica, Señor, la suciedad de mi alma y sálvame, como amante de los hombres.'),
      AHORA,
      t('Muchas son, Theotokos, las multitudes de mis faltas: a ti he acudido, oh pura, pidiendo la salvación. Visita mi alma enferma y suplica a tu Hijo y Dios nuestro que me dé el perdón de los males que he hecho, oh única bendita.'),
      rub('El Jueves Santo, en lugar de éstos:'),
      t('Cuando los gloriosos discípulos eran iluminados en el lavatorio de la Cena, entonces Judas, el impío, enfermo de avaricia, se oscurecía, y te entrega a Ti, el Juez justo, a jueces inicuos. Mira, amante del dinero, al que por él acabó ahorcándose; huye del alma insaciable que se atrevió a tanto contra el Maestro. Señor, bueno con todos, gloria a Ti.'),
      rub('«Señor, ten piedad», cuarenta veces, con las postraciones que se quiera.'),
      head('Versos de Simeón Metafrastes'),
      rub('Sobre cómo hay que acercarse a los Misterios inmaculados:'),
      t('Si vas a comer, hombre, el Cuerpo del Señor, acércate con temor, no te quemes: es fuego. Y al beber la Sangre divina para la comunión, reconcíliate primero con los que te han ofendido; después, confiado, come el alimento místico.'),
      t('Antes de participar del sacrificio temible, del Cuerpo vivificante del Soberano, ora de este modo, con temblor:'),
    ],
    meta: traduccion(ANTES_COMULGAR, 'griego'),
  },
  {
    id: 'basilio-antes-comulgar',
    title: 'Fuente de la vida y de la inmortalidad',
    subtitle: 'Primera oración antes de comulgar, de san Basilio el Grande',
    category: 'comunion',
    blocks: [
      t('Soberano Señor Jesucristo, Dios nuestro, fuente de la vida y de la inmortalidad, Creador de toda la creación visible e invisible, Hijo coeterno y sin principio con el Padre sin principio, que por tu bondad desbordante te revestiste de carne en los últimos días, fuiste crucificado e inmolado por nosotros, ingratos e insensatos, y con tu propia Sangre rehiciste nuestra naturaleza, corrompida por el pecado: Tú mismo, Rey inmortal, recibe también el arrepentimiento de mí, pecador, inclina tu oído hacia mí y escucha mis palabras.'),
      t('Porque he pecado, Señor, he pecado contra el cielo y contra Ti, y no soy digno de levantar los ojos a la altura de tu gloria; porque he irritado tu bondad, traspasando tus mandamientos y desobedeciendo tus preceptos. Pero Tú, Señor, que no guardas rencor, longánime y de mucha misericordia, no me has entregado a perecer con mis iniquidades, esperando en todo mi conversión. Porque Tú dijiste, amante de los hombres, por medio de tu profeta: «No quiero la muerte del pecador, sino que se convierta y viva». Pues no quieres, Soberano, que perezca la obra de tus manos, ni te complaces en la perdición de los hombres, sino que quieres que todos se salven y lleguen al conocimiento de la verdad.'),
      t('Por eso también yo, aunque soy indigno del cielo y de la tierra y de esta vida pasajera, porque me he sometido entero al pecado, me he hecho esclavo de los placeres y he afeado tu imagen, no desespero de mi salvación, miserable de mí, porque soy obra y criatura tuya, sino que me acerco confiado en tu compasión sin medida. Recíbeme, pues, también a mí, Cristo amante de los hombres, como a la pecadora, como al ladrón, como al publicano y como al pródigo; y quítame la pesada carga de mis pecados, Tú que quitas el pecado del mundo y sanas las enfermedades de los hombres, que llamas a Ti a los cansados y agobiados y les das descanso, que no viniste a llamar a los justos, sino a los pecadores al arrepentimiento.'),
      t('Y purifícame de toda mancha de la carne y del espíritu; enséñame a llevar a cabo la santidad en tu temor, para que, con el testimonio limpio de mi conciencia, al recibir la porción de tus santos dones, me una a tu santo Cuerpo y a tu Sangre, y te tenga habitando y permaneciendo en mí con el Padre y el Espíritu Santo.'),
      t('Sí, Señor Jesucristo, Dios mío: que la comunión de tus Misterios purísimos y vivificantes no sea para mi condenación, ni me haga débil en el alma y en el cuerpo por recibirlos indignamente; sino concédeme, hasta mi último aliento, recibir sin condenación la porción de tus santos dones, para la comunión del Espíritu Santo, como provisión para la vida eterna y para una respuesta aceptable ante tu temible tribunal; para que también yo, con todos tus elegidos, participe de tus bienes incorruptibles, que preparaste para los que te aman, Señor, en los que eres glorificado por los siglos. Amén.'),
    ],
    meta: traduccion(ANTES_COMULGAR, 'griego', 'San Basilio el Grande († 379), según la tradición'),
  },
  {
    id: 'basilio-se-senor',
    title: 'Sé, Señor, que comulgo indignamente',
    subtitle: 'Segunda oración antes de comulgar, de san Basilio el Grande',
    category: 'comunion',
    blocks: [
      t('Sé, Señor, que comulgo indignamente de tu Cuerpo purísimo y de tu preciosa Sangre, y que soy culpable, y que como y bebo mi propia condenación, al no discernir el Cuerpo y la Sangre de Cristo, mi Dios. Pero, confiado en tus compasiones, me acerco a Ti, que dijiste: «El que come mi Carne y bebe mi Sangre permanece en Mí, y Yo en él».'),
      t('Compadécete, pues, Señor, y no me expongas a la vergüenza a mí, pecador, sino haz conmigo según tu misericordia; y que estos santos dones sean para mí curación, purificación, iluminación, protección, salvación y santificación del alma y del cuerpo; para alejar toda fantasía, toda obra mala y toda acción del diablo que obra en mis miembros con el pensamiento; para confianza y amor hacia Ti; para enmienda y firmeza de vida; para crecimiento en la virtud y en la perfección; para cumplimiento de los mandamientos; para comunión del Espíritu Santo; como provisión para la vida eterna y para una respuesta aceptable ante tu temible tribunal; no para juicio ni para condenación.'),
    ],
    meta: traduccion(ANTES_COMULGAR, 'griego', 'San Basilio el Grande († 379), según la tradición'),
  },
  {
    id: 'crisostomo-no-soy-digno',
    title: 'No soy digno, Soberano Señor',
    subtitle: 'Cuarta oración antes de comulgar, de san Juan Crisóstomo',
    category: 'comunion',
    blocks: [
      t('No soy digno, Soberano Señor, de que entres bajo el techo de mi alma; pero, ya que Tú, como amante de los hombres, quieres habitar en mí, me acerco confiado. Mandas que abra las puertas que sólo Tú creaste, y entras con amor a los hombres, como es propio de Ti; entras e iluminas mi pensamiento entenebrecido. Creo que lo harás.'),
      t('Porque no huiste de la pecadora que se acercó a Ti con lágrimas, ni rechazaste al publicano arrepentido, ni alejaste al ladrón que reconoció tu Reino, ni dejaste al perseguidor arrepentido en lo que era; sino que a todos los que el arrepentimiento trajo a Ti los pusiste en el coro de tus amigos, Tú, el único bendito siempre, ahora y por los siglos sin fin. Amén.'),
    ],
    meta: traduccion(ANTES_COMULGAR, 'griego', 'San Juan Crisóstomo († 407), según la tradición'),
  },
  {
    id: 'crisostomo-remite',
    title: 'Remite, perdona, purifícame',
    subtitle: 'Quinta oración antes de comulgar, de san Juan Crisóstomo',
    category: 'comunion',
    blocks: [
      t('Señor Jesucristo, Dios mío: remite, perdona, purifícame y absuélveme a mí, tu siervo pecador, inútil e indigno, de mis faltas, culpas y caídas, todas las que he cometido contra Ti desde mi juventud hasta el día y la hora presentes, a sabiendas o sin saberlo, de palabra o de obra, con intenciones o pensamientos, con propósitos y con todos mis sentidos.'),
      t('Y por la intercesión de la que te concibió sin semilla, la purísima y siempre Virgen María, tu Madre, mi única esperanza que no defrauda, mi protección y mi salvación, hazme digno de recibir sin condenación tus Misterios purísimos, inmortales, vivificantes y temibles, para perdón de los pecados y para la vida eterna; para santificación, iluminación, fuerza, curación y salud del alma y del cuerpo; y para borrar y destruir por completo mis malos pensamientos, intenciones y prejuicios, y las fantasías nocturnas de los espíritus tenebrosos y malignos. Porque tuyo es el Reino, el poder, la gloria, el honor y la adoración, con el Padre y el Espíritu Santo, ahora y siempre, y por los siglos de los siglos. Amén.'),
    ],
    meta: traduccion(ANTES_COMULGAR, 'griego', 'San Juan Crisóstomo († 407), según la tradición'),
  },
  {
    id: 'simeon-de-labios-manchados',
    title: 'De labios manchados',
    subtitle: 'Séptima oración antes de comulgar, de san Simeón el Nuevo Teólogo',
    category: 'comunion',
    blocks: [
      rub('En el original es un poema en versos de ocho sílabas. Aquí va en prosa, por párrafos.'),
      t('De labios manchados, de corazón abominable, de lengua impura, de alma sucia, recibe mi súplica, Cristo mío; y no desprecies mis palabras, ni mis modos, ni mi desvergüenza. Dame confianza para decir lo que he pensado, Cristo mío; o, mejor, enséñame Tú lo que debo hacer y decir.'),
      t('He pecado más que la pecadora que, sabiendo dónde te hospedabas, compró perfume y vino con audacia a ungir tus pies, los de mi Cristo, mi Soberano y mi Dios. Como a ella no la rechazaste cuando se acercó de corazón, no me aborrezcas a mí, oh Verbo; dame tus pies para que los tenga y los bese, y con el río de mis lágrimas, como con perfume de gran precio, me atreva a ungirlos.'),
      t('Lávame con mis lágrimas, purifícame con ellas, oh Verbo; perdona también mis faltas y concédeme el perdón. Conoces la multitud de mis males, conoces también mis heridas, y ves mis llagas; pero conoces también mi fe, ves mi buena disposición y oyes mis gemidos. No se te oculta, Dios mío, Creador mío, Redentor mío, ni una gota de lágrimas, ni una parte de una gota. Lo que aún no he hecho lo conocieron tus ojos, y en tu libro está escrito incluso lo que todavía no he obrado.'),
      t('Mira mi humillación, mira cuán grande es mi fatiga, y perdóname todos mis pecados, Dios de todas las cosas, para que con corazón puro, con mente temblorosa y con el alma quebrantada participe de tus Misterios inmaculados y purísimos, por los que vive y es divinizado todo el que te come y te bebe con sinceridad de corazón. Porque Tú dijiste, Soberano mío: «Todo el que come mi Carne y bebe mi Sangre permanece en Mí, y Yo en él». Verdadera es en todo la palabra de mi Soberano y mi Dios: porque el que participa de las gracias divinas que divinizan no está ya solo, sino contigo, Cristo mío, Luz de tres soles que ilumina el mundo.'),
      t('Para no quedarme solo, sin Ti, dador de la vida, mi aliento, mi vida, mi alegría, salvación del mundo, por eso me he acercado a Ti, como ves, con lágrimas y con el alma quebrantada, suplicándote recibir el rescate de mis faltas y participar sin condenación de tus Misterios intachables, que dan la vida; para que permanezcas, como dijiste, conmigo, tres veces miserable; para que el engañador, encontrándome sin tu gracia, no me arrebate con astucia y, seduciéndome, me aparte de tus palabras que divinizan.'),
      t('Por eso caigo ante Ti y te clamo con fervor: como recibiste al pródigo y a la pecadora que se acercó, recíbeme así, compasivo, a mí, pecador y pródigo, que me acerco ahora a Ti con el alma quebrantada. Sé, Salvador, que nadie ha pecado contra Ti como yo, ni ha hecho las obras que yo he hecho. Pero sé también esto: que ni la grandeza de las faltas ni la multitud de los pecados sobrepasan la gran longanimidad de mi Dios y su extremo amor a los hombres; sino que, con el óleo de la compasión, a los que se arrepienten con fervor los purificas, los haces resplandecer, los haces partícipes de la luz y los haces, sin envidia, comulgar de tu divinidad; y, cosa extraña a los ángeles y a la mente de los hombres, conversas con ellos muchas veces como con amigos tuyos verdaderos.'),
      t('Esto me hace atrevido, esto me da alas, Cristo mío; y, confiado en la riqueza de tus beneficios para con nosotros, alegre y tembloroso a la vez, yo, que soy hierba, participo del fuego, y —¡extraño prodigio!— soy rociado de modo indecible, como la zarza que en otro tiempo ardía sin consumirse. Por eso, con mente agradecida, con corazón agradecido, con los miembros agradecidos de mi alma y de mi carne, te adoro, te engrandezco y te glorifico, Dios mío, porque eres bendito ahora y por los siglos.'),
    ],
    meta: traduccion(ANTES_COMULGAR, 'griego', 'San Simeón el Nuevo Teólogo († 1022)'),
  },
  {
    id: 'metafrastes-antes-comulgar',
    title: 'Único puro e incorruptible Señor',
    subtitle: 'Octava oración antes de comulgar, de Simeón Metafrastes',
    category: 'comunion',
    blocks: [
      t('Único puro e incorruptible Señor, que por la compasión indecible de tu amor a los hombres tomaste toda nuestra masa, de la sangre pura y virginal de la que te dio a luz de modo sobrenatural, por la venida del Espíritu divino y el beneplácito del Padre eterno; Cristo Jesús, sabiduría, paz y poder de Dios:'),
      t('Tú, que en lo que tomaste aceptaste las pasiones vivificantes y salvadoras —la Cruz, los clavos, la lanza, la muerte—, haz morir las pasiones de mi cuerpo que matan el alma. Tú, que con tu sepultura despojaste los reinos del infierno, sepulta con buenos pensamientos mis malos designios y dispersa los espíritus de la maldad. Tú, que con tu Resurrección vivificadora al tercer día levantaste al primer padre caído, levántame a mí, que me he deslizado en el pecado, poniendo ante mí caminos de arrepentimiento.'),
      t('Tú, que con tu gloriosa Ascensión divinizaste la carne que tomaste y la honraste con el asiento a la derecha del Padre, hazme digno de alcanzar, por la comunión de tus santos Misterios, la parte de la derecha con los que se salvan. Tú, que con la venida del Espíritu Consolador hiciste de tus santos discípulos vasos preciosos, muéstrame también a mí receptáculo de su venida. Tú, que has de venir de nuevo a juzgar al mundo con justicia, dígnate que también yo salga a tu encuentro en las nubes, a Ti, mi Creador y Hacedor, con todos tus santos, para que te glorifique y te cante sin fin, con tu Padre sin principio y tu santísimo, bueno y vivificador Espíritu, ahora y siempre, y por los siglos de los siglos. Amén.'),
    ],
    meta: traduccion(ANTES_COMULGAR, 'griego', 'Simeón Metafrastes (siglo X)'),
  },
  {
    id: 'damasceno-ante-las-puertas',
    title: 'Ante las puertas de tu templo',
    subtitle: 'Novena oración antes de comulgar, de san Juan Damasceno',
    category: 'comunion',
    blocks: [
      t('Ante las puertas de tu templo estoy, y no me aparto de los malos pensamientos. Pero Tú, Cristo Dios, que justificaste al publicano, tuviste piedad de la cananea y abriste al ladrón las puertas del paraíso, ábreme las entrañas de tu amor a los hombres y recíbeme, que me acerco y te toco, como a la pecadora y a la que padecía flujo de sangre: porque ésta, tocando el borde de tu manto, recibió enseguida la curación, y aquélla, abrazando tus pies purísimos, obtuvo el perdón de sus pecados.'),
      t('Y yo, miserable, que me atrevo a recibir tu Cuerpo entero, que no sea abrasado; recíbeme como a ellas, e ilumina los sentidos de mi alma, quemando las culpas de mis pecados, por la intercesión de la que te dio a luz sin semilla y de las potestades celestiales; porque bendito eres por los siglos de los siglos. Amén.'),
    ],
    meta: traduccion(ANTES_COMULGAR, 'griego', 'San Juan Damasceno († 749), según la tradición'),
  },
  {
    id: 'al-acercarse-al-caliz',
    title: 'He aquí que me acerco',
    subtitle: 'Al ir a comulgar: los versos y los últimos troparios',
    category: 'comunion',
    blocks: [
      rub('Al ir a comulgar, los versos de Simeón Metafrastes:'),
      t('He aquí que me acerco a la divina comunión. Creador, no me abrases al participar, porque eres fuego que abrasa a los indignos; purifícame, más bien, de toda mancha.'),
      rub('El tropario:'),
      t('De tu Cena mística, Hijo de Dios, recíbeme hoy como partícipe; porque no revelaré el misterio a tus enemigos, ni te daré un beso como Judas, sino que, como el ladrón, te confieso: acuérdate de mí, Señor, en tu Reino.'),
      rub('Estos versos:'),
      t('Estremécete, hombre, al ver la Sangre que diviniza, porque es brasa que abrasa a los indignos. El Cuerpo de Dios me diviniza y me alimenta: diviniza el espíritu y alimenta la mente de un modo extraño.'),
      rub('Y estos troparios:'),
      t('Me cautivaste con el deseo, Cristo, y me transformaste con tu amor divino; abrasa con fuego inmaterial mis pecados y hazme digno de saciarme de la delicia que hay en Ti, para que, saltando de gozo, engrandezca, oh Bueno, tus dos venidas.'),
      t('¿Cómo entraré yo, indigno, en el esplendor de tus santos? Porque, si me atrevo a entrar con ellos en la cámara nupcial, la túnica me delata, porque no es de bodas, y seré echado fuera, atado, por los ángeles. Purifica, Señor, la suciedad de mi alma y sálvame, como amante de los hombres.'),
      rub('Y de nuevo: «De tu Cena mística…».'),
    ],
    meta: traduccion(ANTES_COMULGAR, 'griego'),
  },

  /* ═════════════════════ DESPUÉS DE COMULGAR ═════════════════════ */
  {
    id: 'metafrastes-despues-comulgar',
    title: 'Tú, que me das tu carne como alimento',
    subtitle: 'Tercera oración de acción de gracias, de Simeón Metafrastes',
    category: 'comunion',
    blocks: [
      rub('En el original son versos. Aquí van en prosa.'),
      t('Tú, que me das voluntariamente tu carne como alimento, Tú, que eres fuego y abrasas a los indignos, no me abrases, Creador mío; pasa más bien a los miembros que me forman, a todas las articulaciones, a las entrañas, al corazón. Abrasa las espinas de todas mis faltas. Purifica el alma, santifica los pensamientos. Afianza los tendones junto con los huesos. Ilumina los cinco sentidos en su sencillez. Clávame entero a tu temor.'),
      t('Protégeme siempre, guárdame y defiéndeme de toda obra y palabra que corrompe el alma. Purifícame, lávame y ordéname; embelléceme, dame entendimiento e ilumíname. Muéstrame morada sólo de tu Espíritu, y no ya morada del pecado, para que, siendo yo casa tuya por la entrada de la comunión, huya de mí como del fuego todo malhechor, toda pasión.'),
      t('Te traigo como intercesores a todos los santos, a los órdenes de los incorpóreos, a tu Precursor, a los sabios apóstoles y, además, a tu Madre inmaculada y pura: recibe sus súplicas, compasivo, Cristo mío, y haz de tu siervo un hijo de la luz. Porque sólo Tú eres, oh Bueno, la santificación y el resplandor de nuestras almas, y a Ti, como a Dios y Soberano, te damos todos cada día la gloria que te corresponde.'),
    ],
    meta: traduccion(DESPUES_COMULGAR, 'griego', 'Simeón Metafrastes (siglo X)'),
  },
  {
    id: 'tu-santo-cuerpo',
    title: 'Tu santo Cuerpo, Señor',
    subtitle: 'Cuarta oración de acción de gracias',
    category: 'comunion',
    blocks: [
      t('Que tu santo Cuerpo, Señor Jesucristo, Dios nuestro, sea para mí vida eterna, y tu preciosa Sangre, perdón de los pecados; y que esta acción de gracias sea para mí alegría, salud y gozo; y en tu temible segunda venida hazme digno a mí, pecador, de estar a la derecha de tu gloria, por la intercesión de tu purísima Madre y de todos tus santos. Amén.'),
    ],
    meta: traduccion(DESPUES_COMULGAR, 'griego'),
  },

  /* ═════════════════════ ANTES DE TRABAJAR ═════════════════════ */
  {
    id: 'troparios-antes-de-toda-obra',
    title: 'Creador y Hacedor de todas las cosas',
    subtitle: 'Tropario y kontakion antes de toda obra',
    category: 'antes-trabajar',
    blocks: [
      rub('Se empieza con «Rey celestial». Después:'),
      head('Tropario, tono cuarto'),
      t('Creador y Hacedor de todas las cosas, oh Dios: la obra de nuestras manos, comenzada para tu gloria, llévala pronto a buen término con tu bendición, y líbranos de todo mal, porque Tú solo eres todopoderoso y amante de los hombres.'),
      head('Kontakion, tono tercero'),
      t('Pronto en la protección y fuerte en el auxilio: asiste ahora con la gracia de tu poder; bendice y fortalece, y lleva a cabo la obra buena que tus siervos se proponen; porque todo lo que quieres, como Dios poderoso, lo puedes hacer.'),
    ],
    meta: traduccion(NECESIDADES, 'eslavo'),
  },

  /* ═════════════════════ LOS DEMÁS ═════════════════════ */
  {
    id: 'conmemoracion-larga',
    title: 'La conmemoración larga',
    subtitle: 'Por la Iglesia, por los tuyos, por los vivos y por los difuntos',
    category: 'familia',
    blocks: [
      rub('Es la forma larga de la conmemoración de las oraciones de la mañana: quien tiene tiempo la dice en lugar de la breve. A cada petición, una inclinación. Donde va N., los nombres.'),
      head('Por los vivos'),
      t('Acuérdate, Señor Jesucristo, Dios nuestro, de tus misericordias y compasiones, que son desde siempre, por las que te hiciste hombre y quisiste sufrir la crucifixión y la muerte por la salvación de los que creen rectamente en Ti; y, resucitado de entre los muertos, subiste a los cielos, estás sentado a la derecha de Dios Padre y miras las humildes súplicas de los que te invocan con todo el corazón: inclina tu oído y escucha la humilde súplica de mí, tu siervo inútil, que te la ofrezco como perfume espiritual por todo tu pueblo.'),
      t('Y ante todo acuérdate de tu Iglesia santa, católica y apostólica, que adquiriste con tu preciosa Sangre; afiánzala, fortalécela, ensánchala, multiplícala, pacifícala y guárdala por siempre invencible ante las puertas del infierno; calma las divisiones de las Iglesias, apaga los tumultos de las naciones, deshaz pronto y desarraiga los levantamientos de las herejías, y redúcelos a nada con el poder de tu Espíritu Santo.'),
      t('Salva, Señor, y ten piedad de nuestro país, guardado por Dios, de los que nos gobiernan y de sus ejércitos; guarda en paz su gobierno, somete a todo enemigo y adversario bajo los pies de los ortodoxos, y habla en sus corazones palabras de paz y de bien para tu santa Iglesia y para todo tu pueblo, para que llevemos una vida tranquila y serena en la fe recta, con toda piedad y pureza.'),
      t('Salva, Señor, y ten piedad de nuestro gran Señor y Padre, el santísimo patriarca N., de los metropolitas, arzobispos y obispos ortodoxos, de los presbíteros y diáconos y de todo el clero de la Iglesia, a quienes pusiste para apacentar tu rebaño espiritual; y por sus oraciones ten piedad de mí, pecador, y sálvame.'),
      t('Salva, Señor, y ten piedad de mi padre espiritual N., de mis padrinos y de mis maestros, y por sus santas oraciones perdona mis pecados.'),
      t('Salva, Señor, y ten piedad de mis padres N., de mis hermanos y hermanas, de mis parientes según la carne, de todos los allegados de mi familia y de mis amigos, y concédeles tus bienes de la tierra y del cielo.'),
      t('Salva, Señor, y ten piedad, según la multitud de tus compasiones, de todos los hieromonjes, monjes y monjas, y de todos los que viven en virginidad, piedad y ayuno en los monasterios, en los desiertos, en las cuevas, en los montes, sobre las columnas, en las celdas cerradas, en las grietas de las rocas, en las islas del mar y en todo lugar de tu dominio, viviendo en la fe recta, sirviéndote con piedad y orándote: alivia su carga, consuela su aflicción, dales fuerza y vigor para la lucha por Ti, y por sus oraciones concédeme el perdón de los pecados.'),
      t('Salva, Señor, y ten piedad de los ancianos y de los jóvenes, de los pobres, de los huérfanos y de las viudas, de los que están en la enfermedad y en la tristeza, en desgracias y aflicciones, en apuros y cautiverios, en cárceles y destierros, y sobre todo de tus siervos perseguidos por Ti y por la fe ortodoxa por pueblos sin Dios, por apóstatas y por herejes: acuérdate de ellos, visítalos, fortalécelos, consuélalos, y dales pronto con tu poder alivio, libertad y liberación.'),
      t('Salva, Señor, y ten piedad de los que nos hacen bien, tienen misericordia de nosotros y nos alimentan, de los que nos han dado limosna y nos han pedido, indignos de nosotros, que oremos por ellos, y de los que nos dan descanso; haz con ellos tu misericordia, concediéndoles todo lo que piden para su salvación y la posesión de los bienes eternos.'),
      t('Salva, Señor, y ten piedad de los que han sido enviados a un servicio, de los que van de viaje, de nuestros padres y hermanos, y de todos los cristianos ortodoxos.'),
      t('Salva, Señor, y ten piedad de aquellos a quienes yo, con mi insensatez, he escandalizado y apartado del camino de la salvación, y he llevado a obras malas e indignas: devuélvelos con tu providencia divina al camino de la salvación.'),
      t('Salva, Señor, y ten piedad de los que me odian y me ofenden y me causan daño, y no los dejes perecer por mi causa, pecador.'),
      t('A los que se han apartado de la fe ortodoxa y están cegados por herejías de perdición, ilumínalos con la luz de tu conocimiento y agrégalos a tu santa Iglesia apostólica y católica.'),
      head('Por los difuntos'),
      t('Acuérdate, Señor, de los que han partido de esta vida: de los que gobernaron en la fe ortodoxa, de los santísimos patriarcas, de los metropolitas, arzobispos y obispos ortodoxos, y de los que te sirvieron en el sacerdocio, en el clero de la Iglesia y en el orden monástico, y dales descanso con los santos en tus moradas eternas.'),
      t('Acuérdate, Señor, de las almas de tus siervos difuntos, mis padres N., y de todos mis parientes según la carne; perdónales todos sus pecados, voluntarios e involuntarios, y concédeles el Reino, la participación en tus bienes eternos y el gozo de tu vida sin fin y bienaventurada.'),
      t('Acuérdate, Señor, de todos los que se han dormido en la esperanza de la resurrección y de la vida eterna, nuestros padres, hermanos y hermanas, los que yacen aquí y en todas partes, cristianos ortodoxos: hazlos habitar con tus santos, donde brilla la luz de tu rostro, y ten piedad de nosotros, porque eres bueno y amante de los hombres. Amén.'),
      t('Concede, Señor, el perdón de los pecados a todos los que se durmieron antes que nosotros en la fe y en la esperanza de la resurrección, nuestros padres, hermanos y hermanas, y hazles memoria eterna. <em>(tres veces)</em>'),
      rub('Donde el eslavo nombra a las autoridades del país, a los zares y a los príncipes, ATHOS dice «los que nos gobiernan» y «los que gobernaron», como hace con los reyes de los textos griegos.'),
    ],
    meta: traduccion(MANANA, 'eslavo', undefined, 'Donde el original nombraba al soberano, la versión dice «los que nos gobiernan».'),
  },
  {
    id: 'por-el-amor-mutuo',
    title: 'Por el amor de unos a otros',
    subtitle: 'Tropario y kontakion para que crezca el amor',
    category: 'amigos',
    blocks: [
      head('Tropario, tono cuarto'),
      t('Tú, Cristo, que uniste a tus apóstoles con el vínculo del amor, únenos también fuertemente a Ti a nosotros, tus siervos fieles, y haz que cumplamos tus mandamientos y nos amemos unos a otros sin fingimiento, por las oraciones de la Theotokos, oh único amante de los hombres.'),
      head('Kontakion, tono quinto'),
      t('Enciende, Cristo Dios, nuestros corazones con la llama de tu amor, para que, abrasados por ella, te amemos con el corazón, la mente, el alma y todas nuestras fuerzas, y al prójimo como a nosotros mismos; y, guardando tus mandamientos, te glorifiquemos a Ti, dador de todos los bienes.'),
    ],
    meta: traduccion(`${NECESIDADES}: por el aumento del amor y contra el odio y toda malicia`, 'eslavo'),
  },
  {
    id: 'beneficios-de-dios',
    title: 'Por todos los beneficios de Dios',
    subtitle: 'Tropario, kontakion y theotokion de acción de gracias',
    category: 'accion-de-gracias',
    blocks: [
      head('Tropario, tono cuarto'),
      t('Agradecidos, tus siervos indignos, Señor, por los grandes beneficios que nos has hecho, glorificándote te alabamos, te bendecimos, te damos gracias, cantamos y engrandecemos tu compasión, y con amor de siervos te clamamos: Bienhechor, Salvador nuestro, gloria a Ti.'),
      head('Kontakion, tono tercero'),
      t('Hechos dignos, sin merecerlo, de tus beneficios y de tus dones, como siervos inútiles, Soberano, acudimos a Ti con fervor y te ofrecemos acción de gracias según nuestras fuerzas; y, glorificándote como Bienhechor y Creador, clamamos: Gloria a Ti, Dios generosísimo.'),
      t('Gloria al Padre, y al Hijo, y al Espíritu Santo, ahora y siempre, y por los siglos de los siglos. Amén.'),
      head('Theotokion'),
      t('Theotokos, auxilio de los cristianos: tus siervos, que hemos alcanzado tu protección, te clamamos agradecidos: Alégrate, purísima Theotokos Virgen, y líbranos siempre de todas las desgracias con tus oraciones, tú, la única que pronto intercede.'),
      rub('Después, si se quiere, el himno «A Ti, Dios, te alabamos», que está entero en Biblioteca → Moleben, en el de acción de gracias.'),
    ],
    meta: traduccion(`${NECESIDADES}: acción de gracias por todo beneficio de Dios`, 'eslavo'),
  },

  /* ═════════════════════ ANTE DIOS ═════════════════════ */
  {
    id: 'camino-del-templo',
    title: 'Camino de la iglesia',
    subtitle: 'Me alegré cuando me dijeron',
    category: 'templo',
    blocks: [
      t('Me alegré cuando me dijeron: Vamos a la casa del Señor. Y yo, por la abundancia de tu misericordia, Señor, entraré en tu casa; me postraré ante tu santo templo con temor de Ti. Señor, guíame en tu justicia; por causa de mis enemigos, endereza delante de Ti mi camino, para que sin tropiezo glorifique a la única Divinidad, Padre, Hijo y Espíritu Santo, ahora y siempre, y por los siglos de los siglos. Amén.'),
      rub('Está hecha con el salmo 121, 1 y el salmo 5, 8-9.'),
    ],
    meta: traduccion(`${NECESIDADES}: oración del que va a la iglesia`, 'eslavo'),
  },
  {
    id: 'prosfora-y-agua-bendita',
    title: 'Al tomar la prósfora y el agua bendita',
    subtitle: 'Por la mañana, en ayunas',
    category: 'templo',
    blocks: [
      rub('En las iglesias eslavas se acostumbra a tomar por la mañana, en ayunas, un trozo de la prósfora traída de la Liturgia o un sorbo de agua bendita, diciendo:'),
      t('Señor Jesucristo, Dios nuestro: que tu santo don, la prósfora, y tu agua bendita sean para el perdón de mis pecados, para la iluminación de mi mente, para la purificación del corazón, para el fortalecimiento de las fuerzas de mi alma y de mi cuerpo, para la salud de mi alma y de mi cuerpo, para someter mis pasiones y debilidades y para afianzar mi voluntad en los caminos de tu voluntad; para destruir y ahuyentar toda acción y toda asechanza del diablo, por tu misericordia sin límites, por el poder de la preciosa y vivificante Cruz, y por las oraciones de tu purísima Madre, de las potestades celestiales incorpóreas y de todos tus santos. Amén.'),
    ],
    meta: traduccion(`${NECESIDADES}: al tomar la prósfora y el agua bendita, según los libros de oraciones rusos`, 'eslavo', undefined, 'No está en todas las ediciones del libro de oraciones: es costumbre de las iglesias eslavas.'),
  },
  {
    id: 'lectura-espiritual',
    title: 'Antes de la lectura espiritual',
    subtitle: 'Atribuida a san Juan Crisóstomo',
    category: 'escritura',
    blocks: [
      t('Señor Jesucristo, abre los ojos de mi corazón para que oiga tu palabra, la entienda y cumpla tu voluntad, porque soy forastero en la tierra: no escondas de mí tus mandamientos, sino abre mis ojos para que comprenda las maravillas de tu ley. Hazme conocer lo oculto y lo secreto de tu sabiduría.'),
      t('En Ti espero, Dios mío: ilumina mi mente y mi corazón con la luz de tu conocimiento, para que no sólo lea lo escrito, sino que también lo cumpla; haz que no lea las vidas y las palabras de los santos para mi pecado, sino para mi renovación, iluminación y salvación, y para heredar la vida eterna. Porque Tú, Señor, eres la luz de los que yacen en tinieblas, y de Ti viene toda dádiva buena y todo don perfecto. Amén.'),
    ],
    meta: traduccion(`${NECESIDADES}: antes de leer libros espirituales`, 'eslavo', 'Atribuida a san Juan Crisóstomo († 407)'),
  },

  /* ═════════════════════ EN TIEMPO DE GUERRA ═════════════════════ */
  {
    id: 'en-la-calamidad',
    title: 'En la calamidad y ante el enemigo',
    subtitle: 'Tropario y kontakion',
    category: 'paz',
    blocks: [
      head('Tropario, tono cuarto'),
      t('Adelántate pronto, Cristo Dios nuestro, antes de que seamos esclavizados por los enemigos que te blasfeman y nos amenazan: destruye con tu Cruz a los que nos combaten, para que comprendan cuánto puede la fe de los ortodoxos, por las oraciones de la Theotokos, oh único amante de los hombres.'),
      head('Kontakion, tono octavo'),
      t('Caudillo defensor y Señor, vencedor del infierno: yo, tu criatura y tu siervo, librado de la muerte eterna, te escribo cantos de alabanza; pero, como tienes una misericordia inefable, líbrame de toda clase de peligros, a mí que te clamo: Jesús, Hijo de Dios, ten piedad de mí.'),
      rub('El kontakion es el primero del Akáthistos al Dulcísimo Jesús.'),
    ],
    meta: traduccion(`${NECESIDADES}: en tiempo de calamidad y de ataque de los enemigos`, 'eslavo'),
  },

  /* ═════════════════════ OTRAS ═════════════════════ */
  {
    id: 'kronstadt-tu-nombre',
    title: 'Señor, tu nombre es Amor',
    subtitle: 'Oración de cada día, atribuida a san Juan de Kronstadt',
    category: 'otras',
    blocks: [
      t('Señor, tu nombre es Amor: no me rechaces a mí, que ando extraviado. Tu nombre es Fuerza: sostenme, que desfallezco y caigo. Tu nombre es Luz: ilumina mi alma, oscurecida por las pasiones de la vida. Tu nombre es Paz: apacigua mi alma inquieta. Tu nombre es Misericordia: no dejes de tener misericordia de mí.'),
    ],
    meta: traduccion('Oración de cada día atribuida a san Juan de Kronstadt († 1908), según los libros de oraciones rusos', 'ruso', 'Atribuida a san Juan de Kronstadt († 1908)'),
  },
  {
    id: 'ioasaf-cada-hora',
    title: 'Bendito sea el día y la hora',
    subtitle: 'Oración de cada hora de san Joasaf de Bélgorod',
    category: 'otras',
    blocks: [
      t('Bendito sea el día y la hora en que mi Señor Jesucristo nació por mí, sufrió la crucifixión y padeció la muerte. Oh Señor Jesucristo, Hijo de Dios: en la hora de mi muerte recibe el espíritu de tu siervo, que anda de camino por esta vida, por las oraciones de tu purísima Madre y de todos los santos, porque bendito eres por los siglos de los siglos. Amén.'),
      rub('Se llama «de cada hora» porque, según la tradición, san Joasaf de Bélgorod († 1754) la decía cada vez que daba la hora.'),
    ],
    meta: traduccion('Oración de san Joasaf de Bélgorod, según los libros de oraciones rusos', 'eslavo', 'San Joasaf de Bélgorod († 1754)'),
  },
];
