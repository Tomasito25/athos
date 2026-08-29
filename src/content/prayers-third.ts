/**
 * Los momentos que faltaban.
 *
 * Casarse, esperar un hijo, estrenar casa, velar a un moribundo, enterrar a
 * alguien y seguir viviendo después, dejar de creer, y la guerra. Son
 * circunstancias en las que la gente busca qué rezar, y hasta ahora no
 * encontraba nada aquí.
 *
 * La regla no cambia y aquí aprieta más que en ninguna parte. Los textos de
 * los sacramentos —la coronación, el funeral, la bendición de la casa— los
 * dice el sacerdote con un libro delante, y ATHOS no los transcribe de memoria
 * ni los inventa: cuando no hay una versión española que se pueda incorporar,
 * la ficha lo dice y explica en su lugar qué es ese rito, quién lo hace y
 * cuándo se pide. Lo que ATHOS redacta lleva su ficha y no se disfraza de
 * texto litúrgico.
 */
import type { PrayerCategoryId, SourceMeta, TextBlock, ContentStatus } from '@/types';

const TRAD: SourceMeta = {
  source: 'Libro de oraciones ortodoxo (Horologion y Molitvoslov), uso tradicional',
  tradition: 'Rito bizantino',
  language: 'es',
  license: 'traditional',
  copyright: 'Texto litúrgico tradicional, de dominio público en su original griego o eslavo.',
  dateAdded: '2026-08-29',
  notes: 'Versión española de uso corriente en las parroquias ortodoxas hispanohablantes.',
};

const meta = (over: Partial<SourceMeta> = {}): SourceMeta => ({ ...TRAD, ...over });

const ATHOS_RIGHTS =
  'Texto redactado para ATHOS. No es un texto litúrgico ni procede de un libro litúrgico. ' +
  'Se publica bajo CC BY-SA 4.0.';

/**
 * Un orden compuesto por ATHOS.
 *
 * Aquí conviven dos cosas: piezas tradicionales y, en varias páginas de esta
 * tanda, oraciones que ha escrito ATHOS porque no existe un texto litúrgico
 * para ese momento. La nota genérica no puede afirmar que todo sea tradicional
 * —sería falso en esas páginas—, así que dice lo único cierto de todas: que el
 * conjunto no es un oficio, y que cada pieza declara de dónde viene. La
 * procedencia concreta va en `source` y, cuando el cuerpo es de ATHOS, también
 * en una rúbrica visible dentro de la propia oración.
 */
const seleccion = (over: Partial<SourceMeta> = {}): SourceMeta =>
  meta({
    ...over,
    license: 'cc-by-sa-4.0',
    copyright: ATHOS_RIGHTS,
    source: `Orden compuesto para ATHOS. Textos: ${over.source ?? 'Horologion y Salterio'}`,
    notes:
      'No es un texto litúrgico ni un oficio del libro litúrgico: el orden y las indicaciones en ' +
      'cursiva los propone ATHOS, y la procedencia de cada pieza consta en la fuente. ' +
      (over.notes ?? ''),
  });

/** Una explicación práctica, no un texto de oración. */
const guia = (over: Partial<SourceMeta> = {}): SourceMeta =>
  meta({
    ...over,
    license: 'cc-by-sa-4.0',
    copyright: ATHOS_RIGHTS,
    source: `Guía redactada para ATHOS. ${over.source ?? 'Uso corriente de las parroquias ortodoxas'}`,
    notes:
      'No es un texto litúrgico, sino una explicación práctica. ' +
      (over.notes ?? 'El uso varía de una iglesia local a otra: pregunta en tu parroquia.'),
  });

/** Ficha de un rito cuyo texto todavía no se puede incorporar. */
const pendiente = (over: Partial<SourceMeta> = {}): SourceMeta =>
  meta({
    ...over,
    license: 'pending',
    copyright: undefined,
    source: `${over.source ?? 'Euchologion'}. Original de dominio público; versión española pendiente de incorporar con licencia compatible.`,
    notes:
      'El texto del rito lo lee el sacerdote del libro litúrgico. ATHOS no lo transcribe de ' +
      'memoria: mientras no haya una versión española verificable, queda la explicación de qué es. ' +
      (over.notes ?? ''),
  });

const t = (content: string): TextBlock => ({ kind: 'text', content });
const rub = (content: string): TextBlock => ({ kind: 'rubric', content });
const head = (content: string): TextBlock => ({ kind: 'heading', content });
const PENDING: TextBlock[] = [{ kind: 'pending', content: 'Contenido pendiente de incorporar.' }];

export interface ThirdPrayerSeed {
  id: string;
  title: string;
  subtitle?: string;
  category: PrayerCategoryId;
  blocks: TextBlock[];
  meta?: SourceMeta;
  status?: ContentStatus;
}

export const THIRD_PRAYERS: ThirdPrayerSeed[] = [
  /* ═════════════════════ JUNTO A UN MORIBUNDO ═════════════════════ */
  {
    id: 'que-se-hace-al-morir',
    title: 'Qué se hace cuando alguien se está muriendo',
    subtitle: 'Lo primero, y por este orden',
    category: 'agonia',
    blocks: [
      rub('Esto no es una oración: es lo que conviene saber antes de necesitarlo, para no tener que averiguarlo en ese momento.'),
      head('Llama a un sacerdote'),
      t('Es lo primero y no admite espera. La Iglesia tiene tres cosas para este momento: la confesión, la comunión y el santo óleo. La comunión que se lleva a un moribundo se llama viático, y en muchas parroquias se guarda reservada precisamente para esto. No hay que esperar a que la persona esté inconsciente: cuanto antes, mejor, y mejor todavía si puede responder.'),
      rub('Si no conoces a ninguno, llama a la parroquia ortodoxa más cercana aunque no sea la tuya. Ningún sacerdote pregunta de qué jurisdicción eres para acudir a un moribundo.'),
      head('No hace falta que sea perfecto'),
      t('No hay una fórmula que haya que decir ni un momento exacto que no se pueda perder. Si la persona ya no habla, se le puede leer en voz alta, tomarle la mano y rezar a su lado. El oído es lo último que se va.'),
      head('El canon de la separación del alma'),
      t('La Iglesia tiene un oficio propio para esta hora, que se lee junto al lecho. Puede leerlo un laico si no hay sacerdote. Su texto figura más abajo, en su ficha.'),
      head('Después'),
      t('Cuando llegue el momento, se le cierran los ojos, se le cruzan las manos sobre el pecho y se empieza a leer el Salterio a su lado; en la costumbre ortodoxa no se deja solo al difunto hasta el entierro. Se avisa al sacerdote para fijar el funeral y para que se le empiece a conmemorar en la Liturgia.'),
      rub('Y una cosa que no se suele decir: puedes pedir que recen por ti mientras acompañas. Velar a alguien es agotador y nadie lo hace bien solo.'),
    ],
    meta: guia({
      source: 'Práctica corriente de las parroquias ortodoxas',
      notes:
        'Los ritos concretos y su nombre varían según la Iglesia local. Ante una situación real, ' +
        'lo que vale es lo que diga el sacerdote que acuda, no esta página.',
    }),
  },
  {
    id: 'canon-separacion-alma',
    title: 'Canon para la separación del alma',
    subtitle: 'El oficio que se lee junto al lecho',
    category: 'agonia',
    blocks: PENDING,
    status: 'pending',
    meta: pendiente({
      source: 'Canon eis psychorragounta, del Euchologion bizantino',
      notes:
        'Es un canon de ocho odas que se lee junto a quien agoniza, dirigido en buena parte a la ' +
        'Madre de Dios y en algunas estrofas puesto en boca del propio moribundo. Puede leerlo un ' +
        'laico. Existe también un segundo oficio para cuando la agonía se prolonga.',
    }),
  },
  {
    id: 'oracion-junto-al-lecho',
    title: 'Mientras se vela',
    category: 'agonia',
    blocks: [
      rub('Cuando ya no hay nada que hacer y quedan horas por delante.'),
      t('Señor Jesucristo, Hijo de Dios, ten piedad de él. <em>(o de ella, con su nombre)</em>'),
      rub('Despacio, muchas veces, sin contar. Es lo que más se reza en estas horas y no hace falta más.'),
      t('En tus manos, Señor, encomiendo mi espíritu.'),
      t('Santísima Theotokos, sálvanos.'),
      rub('Si puedes leer en voz alta, lee el Salterio: el salmo 22, el 90, el 118. Están en Leer → Salterio.'),
      rub('Y si no puedes con nada, quédate. Estar es la parte que no puede hacer nadie por ti.'),
    ],
    meta: seleccion({
      source: 'Oración de Jesús; salmo 30 (31), 6; invocación tradicional',
      notes: 'La elección de las piezas y las indicaciones son de ATHOS.',
    }),
  },

  /* ═════════════════════ EN EL DUELO ═════════════════════ */
  {
    id: 'oracion-del-que-queda',
    title: 'La oración del que se queda',
    category: 'duelo',
    blocks: [
      rub('Los primeros días no se reza bien. No es un fallo tuyo: se reza como se puede, y muchas veces sólo con una línea repetida.'),
      t('Dios de los espíritus y de toda carne, que venciste a la muerte y diste la vida al mundo: da descanso al alma de tu siervo <em>(su nombre)</em> en un lugar de luz, en un lugar de verdor, en un lugar de descanso, donde no hay dolor, ni tristeza, ni suspiro.'),
      rub('Es la oración que la Iglesia repite en todos los oficios por los difuntos. Aprenderla de memoria da algo que decir cuando no sale nada.'),
      t('Con los santos da descanso, oh Cristo, al alma de tu siervo, donde no hay dolor, ni tristeza, ni suspiro, sino vida sin fin.'),
      t('Memoria eterna. <em>(tres veces)</em>'),
      head('Y por ti'),
      t('Señor Jesucristo, Hijo de Dios, ten piedad de mí, pecador.'),
      rub('El duelo no se reza sólo por el muerto. Pedir por uno mismo en estos meses no es egoísmo, es exactitud.'),
    ],
    meta: seleccion({
      source: 'Oración de los oficios de difuntos y kontakion del funeral bizantino',
      notes: 'Las oraciones son tradicionales; el orden y las indicaciones son de ATHOS.',
    }),
  },
  {
    id: 'los-dias-del-duelo',
    title: 'Los días tercero, noveno y cuadragésimo',
    subtitle: 'Por qué la Iglesia cuenta los días',
    category: 'duelo',
    blocks: [
      rub('Una explicación, no una oración.'),
      t('La Iglesia ortodoxa conmemora a sus difuntos en días señalados: el tercero, el noveno, el cuadragésimo, al año y luego cada año. En cada uno se celebra una panihida, el oficio breve por los difuntos, y se lleva kolyva —trigo cocido con azúcar y granada— que se bendice y se reparte.'),
      head('Por qué esos días'),
      t('El tercero, por la resurrección de Cristo al tercer día. El noveno, por los nueve coros angélicos. El cuadragésimo, por los cuarenta días que pasaron entre la Resurrección y la Ascensión, y por los cuarenta que Israel anduvo llorando a Moisés. Hay explicaciones más detalladas en escritos tardíos sobre lo que hace el alma en cada uno de esos plazos; no son doctrina definida y conviene no tomarlas por tal.'),
      head('Qué se hace de verdad'),
      t('Lo que sostiene al difunto, según la Iglesia, no es la ceremonia sino la Liturgia: se entrega al sacerdote una lista con su nombre para que se conmemore en la proskomidía, y se da limosna en su memoria. San Juan Crisóstomo insiste en esto último: que se socorra a un pobre en nombre del difunto vale más que cualquier otra cosa que se haga por él.'),
      head('Y lo que hace por ti'),
      t('Los plazos también tienen una función humana evidente. Obligan a volver, en tres momentos escalonados del primer mes y medio, cuando el resto del mundo ya ha seguido adelante y espera que tú también. Tener una fecha a la que ir es, para mucha gente, lo único que ordena esos días.'),
    ],
    meta: guia({
      source: 'Práctica litúrgica ortodoxa sobre la conmemoración de los difuntos',
      notes:
        'Las costumbres concretas —el kolyva, las fechas exactas, lo que se lleva— varían mucho ' +
        'entre las tradiciones griega, rusa, rumana y serbia.',
    }),
  },
  {
    id: 'panihida-ficha',
    title: 'La panihida',
    subtitle: 'El oficio breve por los difuntos',
    category: 'duelo',
    blocks: PENDING,
    status: 'pending',
    meta: pendiente({
      source: 'Oficio de la panihida (mnemósynon), del Euchologion',
      notes:
        'Dura unos veinte minutos y se puede pedir cualquier día salvo en los grandes tiempos ' +
        'festivos. Se compone de una letanía, el salmo 90, el canon por los difuntos, el kontakion ' +
        '«Con los santos da descanso» y la memoria eterna final. Existe una forma abreviada, la ' +
        'litía, que un sacerdote puede rezar en cualquier sitio y en pocos minutos.',
    }),
  },

  /* ═════════════════════ POR EL MATRIMONIO ═════════════════════ */
  {
    id: 'que-es-la-coronacion',
    title: 'Qué es la coronación',
    subtitle: 'El sacramento del matrimonio en el rito bizantino',
    category: 'matrimonio',
    blocks: [
      rub('Una explicación, no el texto del rito.'),
      t('En la Iglesia ortodoxa el matrimonio no se contrae con un intercambio de consentimientos ante testigos: se recibe. Los novios no se dicen «sí quiero» —en el rito bizantino no hay votos—, sino que se les impone una corona sobre la cabeza y el sacerdote declara que quedan coronados. El sacramento se llama por eso la coronación.'),
      head('Las coronas'),
      t('Significan dos cosas a la vez, y la tradición no elige entre ellas: la corona del que reina, porque el matrimonio funda una casa que se gobierna, y la corona del mártir, porque se entra en él para morir a lo propio. En la tradición griega son de flores o de metal unidas por una cinta; en la rusa, coronas de orfebrería que sostienen los padrinos en alto.'),
      head('Lo que se lee'),
      t('El pasaje del Evangelio es siempre el mismo: las bodas de Caná. Y la epístola, el capítulo quinto de Efesios, que incluye el versículo sobre la sumisión de la mujer y también el que manda al marido amar a su mujer como Cristo amó a la Iglesia y se entregó por ella. Sobre cómo se predica ese pasaje hay hoy más de una manera dentro de la propia ortodoxia.'),
      head('La copa y la danza'),
      t('Los esposos beben de una misma copa de vino, señal de que a partir de ahí comparten lo que venga. Después dan tres vueltas alrededor de la mesa siguiendo al sacerdote, mientras se canta a los mártires: es la primera vez que caminan juntos, y van detrás de la cruz.'),
      head('Lo que conviene saber antes'),
      t('Los dos han de estar bautizados; en la mayoría de las jurisdicciones se admite el matrimonio con un cristiano no ortodoxo bautizado en el nombre de la Trinidad, con permiso del obispo, y no se admite con quien no está bautizado. No se celebran bodas en Cuaresma ni en los ayunos largos. Y se habla antes con el sacerdote: cada parroquia tiene su preparación.'),
    ],
    meta: guia({
      source: 'Rito de la coronación del Euchologion bizantino y práctica corriente',
      notes:
        'Las condiciones para casarse varían según la Iglesia local y las decide el obispo. Lo que ' +
        'vale es lo que diga tu parroquia.',
    }),
  },
  {
    id: 'por-mi-matrimonio',
    title: 'Por el propio matrimonio',
    category: 'matrimonio',
    blocks: [
      rub('Para rezar por el matrimonio en un día cualquiera, no en la boda.'),
      t('Señor Jesucristo, que bendijiste las bodas de Caná y convertiste el agua en vino: bendice nuestra casa. Danos paciencia el uno con el otro, y memoria para lo bueno y olvido para lo pequeño. Guárdanos de decirnos lo que no tiene vuelta. Y cuando uno de los dos falte, sostén al que quede.'),
      rub('Esta oración la ha redactado ATHOS y no es un texto litúrgico: se ofrece como se ofrecería a alguien que pide palabras prestadas.'),
      t('Santos Joaquín y Ana, rogad a Dios por nosotros.'),
      t('Santos mártires Adrián y Natalia, rogad a Dios por nosotros.'),
      rub('A los santos Adrián y Natalia se los invoca por los matrimonios: ella lo acompañó a la cárcel disfrazada de hombre y no lo dejó morir solo. Se conmemoran el 26 de agosto.'),
    ],
    meta: seleccion({
      source: 'Oración redactada para ATHOS; invocaciones tradicionales',
      notes:
        'El cuerpo de esta oración lo ha escrito ATHOS y se dice expresamente en la propia página. ' +
        'No procede de ningún libro litúrgico.',
    }),
  },

  /* ═════════════════════ EN LA ESPERA DE UN HIJO ═════════════════════ */
  {
    id: 'por-la-mujer-encinta',
    title: 'Por la mujer que espera un hijo',
    category: 'embarazo',
    blocks: [
      t('Señor Dios nuestro, que quisiste nacer de la Virgen y santificaste con ello el seno materno: guarda a tu sierva <em>(su nombre)</em> y a la criatura que lleva. Dale salud, quítale el miedo y llévala en paz a la hora del parto.'),
      rub('Oración redactada para ATHOS. La Iglesia tiene oraciones propias para la mujer encinta y para después del parto; las lee el sacerdote y sus textos figuran aquí como fichas pendientes.'),
      t('Santísima Theotokos, sálvanos.'),
      t('Santa Ana, madre de la Theotokos, ruega a Dios por nosotros.'),
      rub('A santa Ana se la invoca en la esterilidad y en el embarazo: tuvo a la Virgen siendo ya anciana y después de años de espera. Se la conmemora el 25 de julio y su concepción de María, el 9 de diciembre.'),
    ],
    meta: seleccion({
      source: 'Oración redactada para ATHOS; invocaciones tradicionales',
      notes: 'El cuerpo de esta oración lo ha escrito ATHOS y se dice en la propia página.',
    }),
  },
  {
    id: 'oraciones-del-parto',
    title: 'Las oraciones del nacimiento',
    subtitle: 'El primer día, el octavo y el cuadragésimo',
    category: 'embarazo',
    blocks: [
      rub('Una explicación de lo que hace la Iglesia alrededor de un nacimiento. Los textos los lee el sacerdote.'),
      head('El primer día'),
      t('Se leen unas oraciones por la madre y por la casa donde ha nacido la criatura. En la práctica actual suele hacerse cuando la familia vuelve del hospital.'),
      head('El octavo día'),
      t('El niño recibe su nombre, siguiendo el Evangelio: a los ocho días le pusieron por nombre Jesús. En muchos sitios se une ya al día cuadragésimo por comodidad.'),
      head('El cuadragésimo día'),
      t('La madre y el niño van por primera vez a la iglesia y el sacerdote los recibe en la puerta. Es lo que se llama la presentación o «entrada en el templo», por analogía con la del propio Cristo a los cuarenta días. Al niño se le lleva al altar si es varón y hasta las puertas si es niña; la diferencia es una costumbre antigua que hoy se discute y que algunas parroquias han dejado de observar.'),
      head('Una advertencia'),
      t('Algunas de estas oraciones, en su forma antigua, hablan de la impureza de la mujer tras el parto en términos que hoy resultan duros y que varias Iglesias locales han revisado o suavizado. No es una lectura moderna: la propia tradición ha discutido siempre qué significaba eso. Conviene saberlo antes de encontrárselo.'),
      head('Y si no llega'),
      t('La Iglesia tiene también oraciones para la esterilidad, para el aborto espontáneo y para la muerte de un recién nacido, y en varias tradiciones un oficio propio de consuelo para la madre. No hay que averiguarlo solo: se pide al sacerdote.'),
    ],
    meta: guia({
      source: 'Oraciones del nacimiento del Euchologion bizantino y práctica corriente',
      notes:
        'Las costumbres varían mucho entre Iglesias locales, y algunas de estas oraciones han sido ' +
        'revisadas en los últimos decenios.',
    }),
  },

  /* ═════════════════════ POR LA CASA ═════════════════════ */
  {
    id: 'bendicion-de-la-casa',
    title: 'La bendición de la casa',
    subtitle: 'Qué es y cuándo se pide',
    category: 'casa',
    blocks: [
      rub('Una explicación, no el texto del rito.'),
      t('El sacerdote va a la casa con agua bendita, lee unas oraciones, rocía las habitaciones y marca con óleo o con tiza una cruz en el dintel. Se pide al estrenar casa y también una vez al año, en el tiempo de la Teofanía: las semanas siguientes al 6 de enero se dedican en muchas parroquias a recorrer los domicilios uno por uno.'),
      head('El agua de la Teofanía'),
      t('El agua que se bendice el día del Bautismo del Señor se guarda en casa durante el año. Se toma en ayunas cuando hay motivo —una enfermedad, un miedo, un mal día—, se rocía con ella y no se tira: si sobra al cabo del año, se echa en un lugar donde no se pise, en una maceta o en un río.'),
      head('El rincón de los iconos'),
      t('En la costumbre ortodoxa la casa tiene un sitio para rezar: una pared o un rincón con iconos, orientado al este si se puede, con una lámpara o una vela. No hace falta que sea grande. Lo que hace es dar un lugar concreto adonde ir, en vez de rezar de pie en mitad del pasillo.'),
      head('Qué se pone'),
      t('Lo habitual es un icono de Cristo y otro de la Theotokos, y a partir de ahí el del santo de cada uno de la casa y el de la fiesta a la que se tenga devoción. Los iconos no se cuelgan como cuadros ni se mezclan con fotografías: se les reserva su pared.'),
    ],
    meta: guia({
      source: 'Rito de bendición de las casas y costumbre doméstica ortodoxa',
      notes: 'La costumbre de la visita anual es firme en unas Iglesias locales y esporádica en otras.',
    }),
  },
  {
    id: 'al-entrar-en-casa-nueva',
    title: 'Al entrar en una casa nueva',
    category: 'casa',
    blocks: [
      rub('Antes de que llegue el sacerdote, o si no va a llegar.'),
      t('En el nombre del Padre, y del Hijo, y del Espíritu Santo. Amén.'),
      t('Rey celestial, Consolador, Espíritu de verdad, que estás en todo lugar y todo lo llenas, tesoro de bienes y dador de vida: ven y habita en nosotros, purifícanos de toda mancha y salva, oh Bueno, nuestras almas.'),
      t('Padre nuestro, que estás en los cielos…'),
      rub('Después, en la puerta:'),
      t('Señor, bendice la entrada y la salida de esta casa. Que en ella se diga la verdad, se perdone deprisa y no falte pan para quien llame.'),
      rub('Esta última la ha redactado ATHOS y no es texto litúrgico. Pide después la bendición de la casa a tu parroquia: es lo propio.'),
    ],
    meta: seleccion({
      source: 'Comienzo habitual del Horologion; petición final redactada para ATHOS',
      notes: 'La petición final no procede de ningún libro litúrgico y se dice en la propia página.',
    }),
  },

  /* ═════════════════════ CUANDO FALLA LA FE ═════════════════════ */
  {
    id: 'cuando-no-sale-rezar',
    title: 'Cuando no sale rezar',
    category: 'dudas',
    blocks: [
      rub('Para las temporadas en que uno se pone delante del icono y no siente nada, o ni siquiera se pone.'),
      head('Lo primero: es normal'),
      t('Todos los Padres que escriben sobre la oración hablan de esto, y ninguno lo trata como una avería. Le llaman sequedad, y san Isaac el Sirio dedica páginas enteras a describirla: la desgana, la sensación de estar hablando solo, la tentación de dejarlo hasta que vuelvan las ganas. Su consejo es unánime y poco consolador: seguir. La oración no se mide por lo que se siente.'),
      head('Baja el listón, no lo subas'),
      t('Cuando no sale, la regla larga se abandona entera y no se vuelve a ella. Es mejor tres líneas todos los días que veinte minutos un domingo de cada cinco. Si no puedes con la regla, reza el Padre Nuestro. Si no puedes con el Padre Nuestro, reza «Señor, ten piedad». Si no puedes con eso, ponte delante del icono el tiempo que tardes en respirar diez veces y vete.'),
      head('Reza con palabras de otro'),
      t('Precisamente para esto existen los libros de oraciones: para los días en que uno no tiene nada que decir. Leer una oración escrita sin sentirla no es hipocresía, es lo que hace un coro cuando canta un funeral. La voz sostiene lo que el ánimo no sostiene.'),
      head('Y díselo a alguien'),
      t('Esto se cuenta al padre espiritual, no se rumia solo. Muchas veces la sequedad tiene una causa concreta —un agotamiento, una depresión, algo sin confesar, un rencor— y la solución no es rezar más sino resolver eso.'),
      rub('Si esto dura meses y viene acompañado de no poder con nada más, puede no ser un asunto espiritual. Un médico también es una respuesta legítima.'),
    ],
    meta: guia({
      source: 'Enseñanza de los Padres sobre la sequedad en la oración, expuesta para ATHOS',
      notes: 'Es una guía práctica y no sustituye al consejo de un sacerdote ni al de un médico.',
    }),
  },
  {
    id: 'oracion-del-que-duda',
    title: 'La oración del que duda',
    category: 'dudas',
    blocks: [
      rub('Del Evangelio de san Marcos, capítulo noveno: la respuesta del padre a quien Cristo pregunta si cree.'),
      t('Creo, Señor; ayuda mi incredulidad.'),
      rub('Es la frase más honrada del Evangelio y la Iglesia la ha conservado sin arreglarla. Se puede repetir muchas veces, como la oración de Jesús.'),
      t('Señor, si estás ahí, hazlo saber. Y si no lo haces, dame paciencia para esperar sin fingir que ya lo has hecho.'),
      rub('Esta segunda no es litúrgica: la ha redactado ATHOS.'),
      head('Y algo que decía san Silvano'),
      t('Que rezar por quien no cree vale más que discutir con él, y que quien no ha conocido el amor de Dios no tiene la culpa de no reconocerlo. Lo escribió de sí mismo, después de años sin sentir nada.'),
    ],
    meta: seleccion({
      source: 'Evangelio según san Marcos 9, 24, según la Reina-Valera 1909',
      notes: 'La segunda oración y el comentario final los ha redactado ATHOS.',
    }),
  },

  /* ═════════════════════ EN TIEMPO DE GUERRA ═════════════════════ */
  {
    id: 'por-la-paz-guerra',
    title: 'Por la paz, cuando hay guerra',
    category: 'paz',
    blocks: [
      rub('La Iglesia pide la paz en cada oficio, desde la primera letanía: «En paz, roguemos al Señor».'),
      t('Por la paz del mundo entero, por la estabilidad de las santas Iglesias de Dios y por la unión de todos, roguemos al Señor.'),
      t('Señor, ten piedad.'),
      t('Salva, Señor, a tu pueblo y bendice tu heredad; concede la victoria sobre el mal y guarda a los tuyos por el poder de tu Cruz.'),
      rub('La forma antigua de este tropario pedía la victoria de los emperadores sobre los bárbaros, y después la de los cristianos ortodoxos sobre sus adversarios. Muchas Iglesias lo dicen hoy así; otras han adoptado formas como ésta. Conviene saber que la variante existe y por qué.'),
      head('Por los muertos, por los heridos y por los que huyen'),
      t('Dios de los espíritus y de toda carne: acuérdate de los que han muerto en esta guerra, de los que la sufren sin haberla querido y de los que han tenido que dejar su casa. Sana a los heridos. Sostén a los que buscan a los suyos.'),
      rub('Redactada para ATHOS. No es un texto litúrgico.'),
      head('Y por los enemigos'),
      t('Amad a vuestros enemigos, bendecid a los que os maldicen, haced bien a los que os aborrecen y orad por los que os ultrajan y os persiguen.'),
      rub('Es del Evangelio y no admite excepción por causa de guerra. San Silvano del Monte Athos, que había sido soldado, decía que quien no puede rezar por sus enemigos todavía no conoce a Dios. Es la parte difícil, y está aquí porque está en el Evangelio.'),
    ],
    meta: seleccion({
      source:
        'Letanía de la paz del Horologion; tropario de la Cruz; Evangelio según san Mateo 5, 44, según la Reina-Valera 1909',
      notes:
        'La oración por los muertos y los desplazados la ha redactado ATHOS. La variante del ' +
        'tropario de la Cruz se explica en la propia página.',
    }),
  },
  {
    id: 'la-iglesia-y-la-guerra',
    title: 'Qué dice la Iglesia sobre la guerra',
    category: 'paz',
    blocks: [
      rub('Una exposición, no una oración. Y un asunto en el que la propia Iglesia no habla con una sola voz.'),
      head('No hay doctrina de la guerra justa'),
      t('A diferencia de la tradición occidental, la ortodoxia nunca desarrolló una teoría de la guerra justa. Lo más cercano es un canon atribuido a san Basilio que recomienda apartar de la comunión durante tres años al soldado que ha matado en combate, aunque la guerra fuera defensiva. Ese canon casi nunca se ha aplicado, pero nunca se ha derogado, y dice algo por sí solo: matar puede ser inevitable y no por eso deja de ser algo de lo que hay que curarse.'),
      head('Los santos militares'),
      t('El santoral está lleno de soldados —Jorge, Demetrio, Teodoro, Andrés Estratelates— y en casi todos los casos son venerados por su martirio, no por sus victorias: murieron por negarse a obedecer, no por vencer. Es una distinción que se pierde con facilidad cuando sus iconos se usan como emblema militar.'),
      head('Lo que ocurre hoy'),
      t('Las guerras recientes han enfrentado a ortodoxos con ortodoxos, y las jerarquías han tomado posiciones opuestas y públicas. No es un asunto zanjado ni ATHOS va a zanjarlo: lo honrado es decir que la Iglesia está atravesada por ese conflicto y no por encima de él.'),
      head('Lo que sí es firme'),
      t('Que se reza por la paz en todos los oficios y sin condiciones. Que se reza por los enemigos. Que un cristiano puede objetar y que hay santos que lo hicieron. Y que quien vuelve de una guerra necesita confesión y no una condecoración eclesiástica.'),
    ],
    meta: guia({
      source: 'Cánones de san Basilio, tradición hagiográfica y documentos de las Iglesias locales',
      notes:
        'Sobre este asunto las Iglesias ortodoxas han sostenido posiciones distintas y a veces ' +
        'enfrentadas. Aquí se expone lo común y se dice dónde no lo hay.',
    }),
  },

  /* ═════════════════════ AMPLIACIONES ═════════════════════ */
  {
    id: 'digno-es-en-verdad',
    title: 'Digno es en verdad',
    subtitle: 'Ἄξιόν ἐστιν',
    category: 'otras',
    blocks: [
      t('Digno es en verdad bendecirte, oh Theotokos, siempre bienaventurada y toda inmaculada, y Madre de nuestro Dios.'),
      t('A la más honorable que los querubines e incomparablemente más gloriosa que los serafines, que sin mancha diste a luz al Verbo de Dios, a la verdadera Theotokos, te engrandecemos.'),
      rub('Es el himno mariano más repetido del rito bizantino: cierra casi todos los oficios. La tradición athonita cuenta que la primera estrofa la enseñó un ángel a un monje en una celda cerca de Karyés, en el siglo X, y que el icono ante el cual se cantó se guarda en el Protaton. En Pascua y en las grandes fiestas se sustituye por otro himno propio del día.'),
    ],
    meta: meta({ source: 'Himno Áxion estin, del oficio bizantino' }),
  },
  {
    id: 'oracion-de-los-esposos-difuntos',
    title: 'Por el cónyuge difunto',
    category: 'duelo',
    blocks: [
      t('Con los santos da descanso, oh Cristo, al alma de tu siervo <em>(su nombre)</em>, donde no hay dolor, ni tristeza, ni suspiro, sino vida sin fin.'),
      t('Señor, acuérdate del que anduvo conmigo. Perdónale lo que yo le vi y lo que no le vi. Perdóname a mí lo que él tuvo que soportar. Y guárdanos el uno para el otro hasta que nos vuelvas a juntar.'),
      rub('La primera es el kontakion del funeral bizantino. La segunda la ha redactado ATHOS y no es un texto litúrgico.'),
    ],
    meta: seleccion({
      source: 'Kontakion del oficio de difuntos; segunda oración redactada para ATHOS',
      notes: 'La segunda no procede de ningún libro litúrgico y se dice en la propia página.',
    }),
  },
];
