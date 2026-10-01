/**
 * Las oraciones del libro que faltaban.
 *
 * El libro de oraciones ortodoxo —el Horologion griego y el Molitvoslov
 * eslavo— tiene un núcleo que se reza en todas partes: las oraciones de la
 * mañana y de la noche, las de antes y después de comulgar. ATHOS tenía
 * algunas; aquí entran las que más se echaban de menos.
 *
 * Todas son textos que existen, con siglos de uso, y cuyos originales son de
 * dominio público. Ninguna es una redacción de ATHOS. Lo que sí es de ATHOS es
 * la versión española, y la ficha de cada una lo dice: no se presenta como la
 * que se reza en una parroquia concreta, porque no lo es.
 *
 * Los salmos son otra cosa: su texto es el de la Reina-Valera 1909, el mismo
 * del Salterio de ATHOS, y se muestra entero dentro de la oración.
 */
import type { SourceMeta, TextBlock } from '@/types';
import type { ThirdPrayerSeed } from './prayers-third';

const TRADUCCION_DERECHOS =
  'Texto litúrgico tradicional; el original es de dominio público. Esta versión española es una traducción hecha para ATHOS y se publica bajo CC BY-SA 4.0.';

/** Una oración que existe, traducida para ATHOS. */
const traduccion = (fuente: string, original: 'griego' | 'eslavo' | 'griego y eslavo', autor?: string): SourceMeta => ({
  source: `${fuente}. Traducción al español hecha para ATHOS a partir del original ${original}, que es de dominio público`,
  tradition: 'Rito bizantino',
  language: 'es',
  license: 'cc-by-sa-4.0',
  copyright: TRADUCCION_DERECHOS,
  dateAdded: '2026-10-01',
  author: autor,
  notes:
    'Es una traducción de un texto que existe, no una oración escrita para ATHOS. La versión española es de ATHOS: no procede de un libro litúrgico español publicado.',
});

/** Un salmo del Salterio de ATHOS. */
const salterio = (lxx: number, hebreo: number): SourceMeta => ({
  source: `Salterio, salmo ${lxx} según la numeración de los Setenta (${hebreo} hebreo). Reina-Valera 1909`,
  tradition: 'Rito bizantino',
  language: 'es',
  license: 'public-domain',
  copyright: 'La Reina-Valera de 1909 es de dominio público.',
  dateAdded: '2026-10-01',
  notes:
    'El texto es el del Salterio de ATHOS, con la numeración litúrgica de los Setenta. Lo que va en cursiva antes del salmo lo ha escrito ATHOS para situarlo.',
});

const t = (content: string): TextBlock => ({ kind: 'text', content });
const rub = (content: string): TextBlock => ({ kind: 'rubric', content });
const head = (content: string): TextBlock => ({ kind: 'heading', content });
const v = (ref: number, content: string): TextBlock => ({ kind: 'verse', ref: String(ref), content });
const psalm = (n: number): TextBlock => ({ kind: 'psalm', content: `Salmo ${n}`, ref: String(n) });

const MOLITVOSLOV_MANANA = 'Oraciones de la mañana del libro de oraciones ortodoxo (Molitvoslov)';
const MOLITVOSLOV_NOCHE = 'Oraciones antes del sueño del libro de oraciones ortodoxo (Molitvoslov)';
const COMUNION = 'Oraciones antes de la sagrada comunión, del Horologion';
const ACCION_DE_GRACIAS = 'Oraciones de acción de gracias después de la sagrada comunión, del Horologion';

export const FOURTH_PRAYERS: ThirdPrayerSeed[] = [
  /* ═════════════════════ AL DESPERTAR ═════════════════════ */
  {
    id: 'levantandome-trinidad',
    title: 'Te doy gracias, Santísima Trinidad',
    subtitle: 'Al levantarse',
    category: 'manana',
    blocks: [
      t('Levantándome del sueño, te doy gracias, Santísima Trinidad, porque por tu mucha bondad y longanimidad no te has irritado conmigo, perezoso y pecador, ni me has hecho perecer con mis iniquidades, sino que, con tu amor de siempre a los hombres, me has levantado cuando yacía sin esperanza, para que madrugue y glorifique tu poder.'),
      t('Ilumina ahora los ojos de mi entendimiento, abre mi boca para que aprenda tus palabras, comprenda tus mandamientos, cumpla tu voluntad, te cante con un corazón que te confiesa y alabe tu nombre santísimo, del Padre, y del Hijo, y del Espíritu Santo, ahora y siempre, y por los siglos de los siglos. Amén.'),
    ],
    meta: traduccion(MOLITVOSLOV_MANANA, 'griego y eslavo'),
  },
  {
    id: 'canto-de-medianoche',
    title: 'El canto de medianoche',
    subtitle: 'Para no dormirse en el pecado',
    category: 'manana',
    blocks: [
      t('Levantándome del sueño, te ofrezco, oh Salvador, el canto de medianoche, y postrándome te clamo: no me dejes dormir en la muerte del pecado; ten compasión de mí, Tú que fuiste crucificado voluntariamente, y levántame pronto, a mí, que yazgo en la pereza. Sálvame cuando estoy ante Ti y en la oración, y después del sueño de la noche haz amanecer para mí un día sin pecado, Cristo Dios, y sálvame.'),
    ],
    meta: traduccion(MOLITVOSLOV_MANANA, 'griego y eslavo'),
  },
  {
    id: 'theotokos-manana',
    title: 'Santísima Señora mía',
    subtitle: 'A la Theotokos, por la mañana',
    category: 'manana',
    blocks: [
      t('Santísima Señora mía, Theotokos: con tus santas y poderosas súplicas aleja de mí, tu siervo humilde y miserable, el desaliento, el olvido, la insensatez, la negligencia y todos los pensamientos impuros, malvados y blasfemos de mi corazón desdichado y de mi mente entenebrecida; y apaga la llama de mis pasiones, porque soy pobre y miserable.'),
      t('Líbrame de los muchos y crueles recuerdos y empeños, y de toda acción mala. Porque bendita eres por todas las generaciones, y glorificado es tu nombre honorabilísimo por los siglos de los siglos. Amén.'),
    ],
    meta: traduccion(MOLITVOSLOV_MANANA, 'eslavo'),
  },
  {
    id: 'santo-del-nombre',
    title: 'Al santo de tu nombre',
    subtitle: 'El que se recibió en el bautismo',
    category: 'manana',
    blocks: [
      t('Ruega a Dios por mí, santo <em>(nombre)</em>, agradable a Dios, porque acudo a ti con fervor, pronto auxilio e intercesor de mi alma.'),
      rub('Si es una santa, se dice «santa (nombre), agradable a Dios», e «intercesora». El santo del bautismo es un compañero de por vida: su fiesta es para el ortodoxo un día más suyo que el del cumpleaños.'),
    ],
    meta: traduccion(MOLITVOSLOV_MANANA, 'eslavo'),
  },

  /* ═════════════════════ AL ACOSTARSE ═════════════════════ */
  {
    id: 'macario-noche',
    title: 'Dios eterno y Rey de toda la creación',
    subtitle: 'A Dios Padre, antes del sueño',
    category: 'noche',
    blocks: [
      t('Dios eterno y Rey de toda la creación, que me has concedido llegar hasta esta hora: perdóname los pecados que hoy he cometido de obra, de palabra y de pensamiento, y purifica, Señor, mi humilde alma de toda mancha de la carne y del espíritu.'),
      t('Y concédeme, Señor, pasar en paz el sueño de esta noche, para que, levantándome de mi humilde lecho, agrade a tu nombre santísimo todos los días de mi vida y venza a los enemigos que me combaten, los de la carne y los que no tienen cuerpo. Y líbrame, Señor, de los pensamientos vanos que me manchan y de los malos deseos. Porque tuyo es el reino, el poder y la gloria, del Padre, y del Hijo, y del Espíritu Santo, ahora y siempre, y por los siglos de los siglos. Amén.'),
    ],
    meta: traduccion(MOLITVOSLOV_NOCHE, 'griego y eslavo', 'San Macario el Grande († 391), según la tradición'),
  },
  {
    id: 'espiritu-santo-noche',
    title: 'Señor, Rey celestial, ten compasión de mí',
    subtitle: 'Al Espíritu Santo, examinando el día',
    category: 'noche',
    blocks: [
      t('Señor, Rey celestial, Consolador, Espíritu de verdad: ten compasión y misericordia de mí, tu siervo pecador; absuélveme a mí, indigno, y perdóname todo lo que hoy he pecado contra Ti como hombre, y aun no como hombre, sino peor que una bestia: mis pecados voluntarios e involuntarios, conocidos y desconocidos, los que vienen de la juventud y de la mala enseñanza, y los que vienen de la insolencia y del desaliento.'),
      t('Si he jurado por tu nombre o lo he blasfemado en mi pensamiento; si he reprochado a alguien, o lo he calumniado en mi ira, o lo he entristecido, o me he enojado por algo; si he mentido, o he dormido sin necesidad, o vino a mí un pobre y lo desprecié; si he entristecido a mi hermano, o he reñido con él, o he juzgado a alguien; si me he envanecido, o me he ensoberbecido, o me he encolerizado; si, estando en la oración, mi mente se ha ido tras las maldades de este mundo, o he pensado en cosas corrompidas; si he comido o bebido en exceso, o me he reído neciamente; si he pensado mal, o he visto la hermosura ajena y con ella se ha herido mi corazón; si he dicho lo que no convenía, o me he reído del pecado de mi hermano, siendo innumerables los míos; si he descuidado la oración, o he hecho cualquier otro mal que no recuerdo —porque todo esto y aún más he hecho—:'),
      t('ten misericordia de mí, Soberano Creador mío, de tu siervo abatido e indigno; déjame, perdóname y absuélveme, como bueno y amante de los hombres, para que en paz me acueste, duerma y descanse yo, pródigo, pecador y miserable, y me postre, cante y glorifique tu nombre honorabilísimo, con el Padre y con su Hijo unigénito, ahora y siempre, y por los siglos. Amén.'),
      rub('Es, en forma de oración, un examen de conciencia: recorre el día en voz alta para no dormirse sin haberlo mirado.'),
    ],
    meta: traduccion(MOLITVOSLOV_NOCHE, 'eslavo'),
  },
  {
    id: 'crisostomo-24',
    title: 'Las veinticuatro oraciones de san Juan Crisóstomo',
    subtitle: 'Una por cada hora del día y de la noche',
    category: 'noche',
    blocks: [
      rub('Son peticiones de una línea, y la tradición las pone una por cada hora. Se pueden rezar todas seguidas antes de dormir o repartirlas a lo largo del día.'),
      head('Por el día'),
      v(1, 'Señor, no me prives de tus bienes celestiales.'),
      v(2, 'Señor, líbrame del tormento eterno.'),
      v(3, 'Señor, si he pecado con la mente o con el pensamiento, de palabra o de obra, perdóname.'),
      v(4, 'Señor, líbrame de toda ignorancia y olvido, de la pusilanimidad y de la insensibilidad de piedra.'),
      v(5, 'Señor, líbrame de toda tentación.'),
      v(6, 'Señor, ilumina mi corazón, que el mal deseo ha oscurecido.'),
      v(7, 'Señor, yo he pecado como hombre; Tú, como Dios generoso, ten piedad de mí, viendo la debilidad de mi alma.'),
      v(8, 'Señor, envía tu gracia en mi ayuda, para que glorifique tu santo nombre.'),
      v(9, 'Señor Jesucristo, inscribe a tu siervo en el libro de la vida y concédeme un buen final.'),
      v(10, 'Señor Dios mío, aunque nada bueno he hecho delante de Ti, concédeme por tu gracia empezar a hacer el bien.'),
      v(11, 'Señor, derrama en mi corazón el rocío de tu gracia.'),
      v(12, 'Señor del cielo y de la tierra, acuérdate de mí, tu siervo pecador, avergonzado e impuro, en tu Reino. Amén.'),
      head('Por la noche'),
      v(1, 'Señor, recíbeme arrepentido.'),
      v(2, 'Señor, no me abandones.'),
      v(3, 'Señor, no me dejes caer en la tentación.'),
      v(4, 'Señor, dame buenos pensamientos.'),
      v(5, 'Señor, dame lágrimas, memoria de la muerte y compunción.'),
      v(6, 'Señor, dame el deseo de confesar mis pecados.'),
      v(7, 'Señor, dame humildad, castidad y obediencia.'),
      v(8, 'Señor, dame paciencia, magnanimidad y mansedumbre.'),
      v(9, 'Señor, planta en mí la raíz de los bienes: tu temor en mi corazón.'),
      v(10, 'Señor, hazme digno de amarte con toda mi alma y con todo mi pensamiento, y de hacer en todo tu voluntad.'),
      v(11, 'Señor, protégeme de ciertos hombres, de los demonios, de las pasiones y de toda otra cosa que no convenga.'),
      v(12, 'Señor, Tú sabes que haces como quieres: hágase tu voluntad también en mí, pecador, porque bendito eres por los siglos. Amén.'),
    ],
    meta: traduccion(MOLITVOSLOV_NOCHE, 'eslavo', 'San Juan Crisóstomo († 407), según la tradición'),
  },
  {
    id: 'buena-madre',
    title: 'Buena Madre del buen Rey',
    subtitle: 'A la Theotokos, antes del sueño',
    category: 'noche',
    blocks: [
      t('Buena Madre del buen Rey, purísima y bendita Theotokos María: derrama la misericordia de tu Hijo y Dios nuestro sobre mi alma apasionada, y con tus súplicas guíame a las buenas obras, para que pase el resto de mi vida sin mancha y por ti alcance el paraíso, oh Virgen Theotokos, la única pura y bendita.'),
    ],
    meta: traduccion(MOLITVOSLOV_NOCHE, 'griego y eslavo'),
  },
  {
    id: 'angel-noche',
    title: 'Ángel de Cristo',
    subtitle: 'Al Ángel de la Guarda, antes del sueño',
    category: 'noche',
    blocks: [
      t('Ángel de Cristo, mi santo custodio y protector de mi alma y de mi cuerpo: perdóname todo lo que he pecado en el día de hoy, y líbrame de toda maldad del enemigo que me combate, para que no irrite a mi Dios con ningún pecado. Ruega por mí, siervo pecador e indigno, para que me muestres digno de la bondad y de la misericordia de la Santísima Trinidad, de la Madre de mi Señor Jesucristo y de todos los santos. Amén.'),
    ],
    meta: traduccion(MOLITVOSLOV_NOCHE, 'eslavo'),
  },
  {
    id: 'levantese-dios',
    title: 'Levántese Dios',
    subtitle: 'A la preciosa y vivificante Cruz',
    category: 'noche',
    blocks: [
      rub('Se dice haciendo la señal de la cruz sobre uno mismo, y en algunas casas, sobre el lecho y hacia los cuatro lados de la habitación. Empieza con el salmo 67.'),
      t('Levántese Dios y sean dispersados sus enemigos, y huyan de su presencia los que lo odian. Como se disipa el humo, que se disipen; como se derrite la cera ante el fuego, así perezcan los demonios ante la faz de los que aman a Dios y se signan con la señal de la cruz, y dicen con alegría:'),
      t('Alégrate, preciosa y vivificante Cruz del Señor, que ahuyentas a los demonios con la fuerza de nuestro Señor Jesucristo, crucificado en ti, que descendió a los infiernos, pisoteó el poder del diablo y nos dio a ti, su preciosa Cruz, para ahuyentar a todo adversario.'),
      t('Oh preciosa y vivificante Cruz del Señor: ayúdame, con la santa Señora, la Virgen Theotokos, y con todos los santos, por los siglos. Amén.'),
    ],
    meta: traduccion(MOLITVOSLOV_NOCHE, 'eslavo'),
  },

  /* ═════════════════════ LA COMUNIÓN ═════════════════════ */
  {
    id: 'crisostomo-antes-comulgar',
    title: 'Señor Dios mío, sé que no soy digno',
    subtitle: 'Antes de comulgar',
    category: 'comunion',
    blocks: [
      t('Señor Dios mío, sé que no soy digno ni capaz de que entres bajo el techo de la casa de mi alma, porque está toda desierta y en ruinas, y no tienes en mí lugar digno donde reclinar la cabeza. Pero así como desde lo alto te humillaste por nosotros, abájate también ahora a mi humildad; y así como aceptaste reclinarte en una cueva, en un pesebre de animales, acepta también entrar en el pesebre de mi alma sin razón y en mi cuerpo manchado.'),
      t('Y así como no desdeñaste entrar y comer con los pecadores en casa de Simón el leproso, dígnate también entrar en la casa de mi humilde alma, leprosa y pecadora. Y así como no rechazaste a la mujer pecadora, como yo, que se acercó y te tocó, ten compasión también de mí, pecador, que me acerco y te toco. Y así como no sentiste repugnancia de su boca manchada e impura que te besaba, no la sientas tampoco de la mía, más manchada e impura que la suya, ni de mis labios inmundos y desvergonzados, ni de mi lengua, más impura todavía.'),
      t('Antes bien, que el carbón encendido de tu santísimo Cuerpo y de tu preciosa Sangre sea para mí santificación, iluminación y salud de mi humilde alma y de mi cuerpo; alivio del peso de mis muchas faltas; protección contra toda acción del diablo; rechazo y freno de mi mala y perversa costumbre; mortificación de las pasiones; cumplimiento de tus mandamientos; aumento de tu divina gracia y posesión de tu Reino.'),
      t('Porque no me acerco a Ti con desprecio, Cristo Dios, sino confiando en tu bondad inefable, y para que, apartándome mucho tiempo de tu comunión, no me haga presa del lobo espiritual. Por eso te suplico: Tú, Soberano, el único santo, santifica mi alma y mi cuerpo, mi mente y mi corazón, mis entrañas y lo más hondo de mí, y renuévame entero. Arraiga tu temor en mis miembros, haz que tu santificación no se borre de mí, y sé mi auxilio y mi defensa, gobernando mi vida en paz y haciéndome digno de estar a tu derecha con tus santos, por las oraciones e intercesiones de tu purísima Madre, de tus servidores incorpóreos y de las potestades inmaculadas, y de todos los santos que te agradaron desde siempre. Amén.'),
    ],
    meta: traduccion(COMUNION, 'griego', 'San Juan Crisóstomo († 407), según la tradición'),
  },
  {
    id: 'damasceno-antes-comulgar',
    title: 'El único que tiene poder para perdonar',
    subtitle: 'Antes de comulgar',
    category: 'comunion',
    blocks: [
      t('Soberano Señor Jesucristo, Dios nuestro, el único que tiene poder para perdonar los pecados de los hombres: como bueno y amante de los hombres, pasa por alto mis faltas, las que cometí sabiéndolo y las que cometí sin saberlo, y hazme digno de recibir sin condenación tus divinos, gloriosos, purísimos y vivificantes Misterios; no para castigo ni para aumento de mis pecados, sino para purificación y santificación, como prenda de la vida y del Reino venideros, como muralla y auxilio, para derribar a los que me combaten y para borrar mis muchas faltas.'),
      t('Porque Tú eres Dios de misericordia, de compasión y de amor a los hombres, y a Ti te damos gloria, con el Padre y el Espíritu Santo, ahora y siempre, y por los siglos de los siglos. Amén.'),
    ],
    meta: traduccion(COMUNION, 'griego', 'San Juan Damasceno († 749), según la tradición'),
  },
  {
    id: 'basilio-despues-comulgar',
    title: 'Soberano Cristo Dios, Rey de los siglos',
    subtitle: 'Acción de gracias después de comulgar',
    category: 'comunion',
    blocks: [
      t('Soberano Cristo Dios, Rey de los siglos y Creador de todas las cosas: te doy gracias por todos los bienes que me has concedido y por la comunión de tus purísimos y vivificantes Misterios.'),
      t('Te suplico, pues, oh Bueno y amante de los hombres: guárdame bajo tu protección y a la sombra de tus alas, y concédeme, con conciencia pura y hasta mi último aliento, participar dignamente de tus santos dones, para el perdón de los pecados y para la vida eterna. Porque Tú eres el pan de la vida, la fuente de la santidad y el dador de los bienes, y a Ti te damos gloria, con el Padre y el Espíritu Santo, ahora y siempre, y por los siglos de los siglos. Amén.'),
    ],
    meta: traduccion(ACCION_DE_GRACIAS, 'griego', 'San Basilio el Grande († 379), según la tradición'),
  },
  {
    id: 'theotokos-despues-comulgar',
    title: 'Luz de mi alma entenebrecida',
    subtitle: 'A la Theotokos, después de comulgar',
    category: 'comunion',
    blocks: [
      t('Santísima Señora mía, Theotokos, luz de mi alma entenebrecida, mi esperanza, mi amparo, mi refugio, mi consuelo y mi alegría: te doy gracias porque me has hecho digno a mí, indigno, de participar del purísimo Cuerpo y de la preciosa Sangre de tu Hijo.'),
      t('Tú, que diste a luz la luz verdadera, ilumina los ojos espirituales de mi corazón; tú, que engendraste la fuente de la inmortalidad, vivifícame a mí, muerto por el pecado; tú, Madre compasiva del Dios misericordioso, ten piedad de mí y dame compunción y contrición en el corazón, humildad en mis pensamientos y libertad en los cautiverios de mis pensamientos.'),
      t('Y hazme digno, hasta mi último aliento, de recibir sin condenación la santificación de los purísimos Misterios, para curación del alma y del cuerpo; y concédeme lágrimas de arrepentimiento y de confesión, para cantarte y glorificarte todos los días de mi vida, porque bendita y glorificada eres por los siglos. Amén.'),
    ],
    meta: traduccion(ACCION_DE_GRACIAS, 'griego'),
  },

  /* ═════════════════════ EN LA ANGUSTIA ═════════════════════ */
  {
    id: 'nadie-que-acude',
    title: 'Nadie que acude a ti',
    subtitle: 'A la Theotokos',
    category: 'angustia',
    blocks: [
      t('Nadie que acude a ti sale avergonzado de tu presencia, purísima Virgen Theotokos; sino que pide la gracia y recibe el don, para bien de lo que pide.'),
    ],
    meta: traduccion('Theotokion del Horologion', 'griego'),
  },
  {
    id: 'no-me-confies',
    title: 'No me confíes a la protección humana',
    subtitle: 'A la Theotokos, cuando no queda nadie más',
    category: 'angustia',
    blocks: [
      t('No me confíes a la protección humana, santísima Soberana, sino recibe la súplica de tu siervo; porque la aflicción me oprime, no puedo soportar los dardos de los demonios, no tengo amparo ni sé adónde huir, miserable de mí. Combatido por todas partes, no tengo otro consuelo que tú. Soberana del mundo, esperanza y protección de los fieles: no desprecies mi súplica; haz lo que me convenga.'),
    ],
    meta: traduccion('Theotokion del Horologion, que se canta también en la Paraclesis', 'griego'),
  },

  /* ═════════════════════ LOS SALMOS DE CADA MOMENTO ═════════════════════ */
  {
    id: 'salmo-22',
    title: 'Salmo 22',
    subtitle: 'El Señor es mi pastor',
    category: 'angustia',
    blocks: [
      rub('El salmo del pastor, el del que atraviesa el valle de sombra de muerte sin temer mal alguno. En el rito eslavo abre las oraciones de preparación para la comunión.'),
      psalm(22),
    ],
    meta: salterio(22, 23),
  },
  {
    id: 'salmo-26',
    title: 'Salmo 26',
    subtitle: 'El Señor es mi luz y mi salvación',
    category: 'tentacion',
    blocks: [
      rub('«¿De quién temeré?». El salmo del que tiene miedo y decide no tenerlo.'),
      psalm(26),
    ],
    meta: salterio(26, 27),
  },
  {
    id: 'salmo-41',
    title: 'Salmo 41',
    subtitle: 'Como el ciervo anhela las corrientes de las aguas',
    category: 'dudas',
    blocks: [
      rub('El salmo de quien tiene sed de Dios y no la sacia, y se pregunta dónde está. Es también el de los días secos, cuando rezar cuesta y el alma se pregunta a sí misma por qué está abatida.'),
      psalm(41),
    ],
    meta: salterio(41, 42),
  },
  {
    id: 'salmo-102',
    title: 'Salmo 102',
    subtitle: 'Bendice, alma mía, al Señor',
    category: 'accion-de-gracias',
    blocks: [
      rub('El salmo de la acción de gracias. En el uso eslavo es el primer antífono de la Divina Liturgia del domingo: «no olvides ninguno de sus beneficios».'),
      psalm(102),
    ],
    meta: salterio(102, 103),
  },
  {
    id: 'salmo-120',
    title: 'Salmo 120',
    subtitle: 'Alzo mis ojos a los montes',
    category: 'antes-viajar',
    blocks: [
      rub('Uno de los salmos graduales, los que cantaban los peregrinos subiendo a Jerusalén: el que pide que Dios guarde la salida y la vuelta.'),
      psalm(120),
    ],
    meta: salterio(120, 121),
  },
  {
    id: 'salmo-126',
    title: 'Salmo 126',
    subtitle: 'Si el Señor no edifica la casa',
    category: 'casa',
    blocks: [
      rub('Otro de los salmos graduales: el que dice que en vano se construye una casa si no la edifica Dios.'),
      psalm(126),
    ],
    meta: salterio(126, 127),
  },
  {
    id: 'salmo-127',
    title: 'Salmo 127',
    subtitle: 'Bienaventurado el que teme al Señor',
    category: 'matrimonio',
    blocks: [
      rub('Es el salmo de la coronación, el matrimonio ortodoxo: se canta mientras los novios entran en la iglesia. Habla de la mujer como una vid fecunda y de los hijos alrededor de la mesa.'),
      psalm(127),
    ],
    meta: salterio(127, 128),
  },
  {
    id: 'salmo-129',
    title: 'Salmo 129',
    subtitle: 'Desde lo hondo a Ti clamo, Señor',
    category: 'arrepentimiento',
    blocks: [
      rub('Uno de los salmos que se cantan cada tarde en Vísperas, con «Señor, a Ti clamo»: el que reconoce que nadie se sostendría si Dios llevara cuenta de los pecados.'),
      psalm(129),
    ],
    meta: salterio(129, 130),
  },
];
