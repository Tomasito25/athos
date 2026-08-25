/**
 * Oraciones para los momentos concretos del día y de la vida.
 *
 * Se añaden a las de `prayers.ts` y siguen su misma regla: los textos son
 * tradicionales, de dominio público en su original griego o eslavo. Cuando una
 * pieza no puede incorporarse con garantías, queda su ficha y el cuerpo se
 * marca como pendiente. Lo que ATHOS redacta —guías prácticas, órdenes de
 * oración, indicaciones— se identifica en su ficha y nunca se presenta como
 * texto litúrgico.
 */
import type { PrayerCategoryId, SourceMeta, TextBlock, ContentStatus } from '@/types';

const TRAD: SourceMeta = {
  source: 'Libro de oraciones ortodoxo (Horologion y Molitvoslov), uso tradicional',
  tradition: 'Rito bizantino',
  language: 'es',
  license: 'traditional',
  copyright: 'Texto litúrgico tradicional, de dominio público en su original griego o eslavo.',
  dateAdded: '2026-08-24',
  notes: 'Versión española de uso corriente en las parroquias ortodoxas hispanohablantes.',
};

const meta = (over: Partial<SourceMeta> = {}): SourceMeta => ({ ...TRAD, ...over });

/**
 * Fichas de lo que ATHOS redacta.
 *
 * El aviso va después del `...over` a propósito: la fuente, los derechos y la
 * primera línea de las notas no se pueden perder al escribir una ficha
 * concreta, por mucho que se pasen esos campos por parámetro. Lo que ATHOS
 * escribe no puede acabar luciendo «texto litúrgico tradicional» por herencia.
 */
const ATHOS_RIGHTS =
  'Texto redactado para ATHOS. No es un texto litúrgico ni procede de un libro litúrgico. ' +
  'Se publica bajo CC BY-SA 4.0.';

/** Un orden de oración compuesto por ATHOS con piezas tradicionales. */
const seleccion = (over: Partial<SourceMeta> = {}): SourceMeta =>
  meta({
    ...over,
    license: 'cc-by-sa-4.0',
    copyright: ATHOS_RIGHTS,
    source: `Orden compuesto para ATHOS. Textos: ${over.source ?? 'Horologion y Salterio'}`,
    notes:
      'No es un texto litúrgico: las oraciones son tradicionales, pero el orden y las indicaciones ' +
      'en cursiva los propone ATHOS y no forman un oficio del libro litúrgico. ' +
      (over.notes ?? ''),
  });

/** Una guía práctica, no un texto de oración. */
const guia = (over: Partial<SourceMeta> = {}): SourceMeta =>
  meta({
    ...over,
    license: 'cc-by-sa-4.0',
    copyright: ATHOS_RIGHTS,
    source: `Guía redactada para ATHOS. ${over.source ?? 'Uso corriente de las parroquias ortodoxas'}`,
    notes:
      'No es un texto litúrgico, sino una explicación práctica. ' +
      (over.notes ?? 'El uso varía de una iglesia local a otra.'),
  });

const t = (content: string): TextBlock => ({ kind: 'text', content });
const rub = (content: string): TextBlock => ({ kind: 'rubric', content });
const head = (content: string): TextBlock => ({ kind: 'heading', content });

export interface MorePrayerSeed {
  id: string;
  title: string;
  subtitle?: string;
  category: PrayerCategoryId;
  blocks: TextBlock[];
  meta?: SourceMeta;
  status?: ContentStatus;
}

export const MORE_PRAYERS: MorePrayerSeed[] = [
  /* ═════════════════════ AL DESPERTAR ═════════════════════ */
  {
    id: 'optina',
    title: 'Oración de los ancianos de Óptina',
    subtitle: 'Para recibir el día tal como venga',
    category: 'manana',
    blocks: [
      t('Señor, concédeme recibir con paz de espíritu todo lo que este día me traiga.'),
      t('Concédeme entregarme enteramente a tu santa voluntad.'),
      t('En cada hora de este día, instrúyeme y sostenme en todo.'),
      t('Cualesquiera noticias reciba en el transcurso del día, enséñame a aceptarlas con serenidad de alma y con la firme convicción de que en todo se cumple tu santa voluntad.'),
      t('En todas mis palabras y en todas mis obras, guía mis pensamientos y mis sentimientos.'),
      t('En los sucesos imprevistos, no me dejes olvidar que todo procede de Ti.'),
      t('Enséñame a tratar con rectitud y sensatez a todos, sin turbar ni afligir a nadie.'),
      t('Señor, dame fuerzas para soportar la fatiga del día que comienza y todo lo que en él ocurra.'),
      t('Guía mi voluntad y enséñame a orar, a creer, a esperar, a soportar, a perdonar y a amar. Amén.'),
    ],
    meta: meta({
      source: 'Oración matutina de los ancianos del monasterio de Óptina (Rusia, siglos XIX–XX)',
      tradition: 'Tradición rusa; de uso extendido en toda la Iglesia ortodoxa',
    }),
  },

  /* ═════════════════════ AL SALIR DE CASA ═════════════════════ */
  {
    id: 'al-salir-de-casa',
    title: 'Al salir de casa',
    subtitle: 'En el umbral, antes de echarse a la calle',
    category: 'salir-de-casa',
    blocks: [
      rub('Persígnate y, sin detenerte más de lo que dura un aliento, di:'),
      t('El Señor guardará tu salida y tu entrada, desde ahora y para siempre.'),
      rub('Después, encomiéndate a la Madre de Dios:'),
      t('Bajo tu compasión nos refugiamos, Theotokos: no desprecies nuestras súplicas en la necesidad, sino líbranos del peligro, tú, la única pura, la única bendita.'),
      rub('Y ya de camino, cuantas veces te acuerdes:'),
      t('Señor Jesucristo, Hijo de Dios, ten piedad de mí, pecador.'),
    ],
    meta: seleccion({
      source: 'Salmo 120 (121), 8; oración «Bajo tu compasión» (siglo III); oración de Jesús',
    }),
  },
  {
    id: 'senal-de-la-cruz',
    title: 'La señal de la cruz',
    subtitle: 'Cómo se hace y qué se dice',
    category: 'salir-de-casa',
    blocks: [
      rub('Se juntan los tres primeros dedos de la mano derecha —el pulgar, el índice y el corazón— confesando así a la Trinidad; los otros dos se doblan sobre la palma, por las dos naturalezas de Cristo.'),
      rub('Se lleva la mano a la frente, luego al vientre, después al hombro derecho y por último al izquierdo. Los ortodoxos se santiguan de derecha a izquierda.'),
      rub('Mientras tanto se dice, en voz baja o en el pensamiento:'),
      t('En el nombre del Padre, y del Hijo, y del Espíritu Santo. Amén.'),
      rub('Se hace al levantarse y al acostarse, al entrar y al salir, ante los iconos, al empezar y al terminar cualquier cosa, y siempre que el alma lo necesite. No se hace con prisa ni a medias: vale más una señal hecha despacio que veinte deshechas.'),
    ],
    meta: guia({
      source: 'Uso común de la Iglesia ortodoxa',
      notes:
        'Describe un gesto. La forma de tres dedos y el sentido derecha-izquierda son los usuales en ' +
        'el rito bizantino; los viejos creyentes y algunas tradiciones locales difieren.',
    }),
  },

  /* ═════════════════════ EL TRABAJO ═════════════════════ */
  {
    id: 'antes-de-toda-obra',
    title: 'Antes de comenzar cualquier obra',
    category: 'antes-trabajar',
    blocks: [
      t('Señor Jesucristo, Hijo unigénito del Padre sin principio, Tú has dicho con tus purísimos labios: «Sin Mí no podéis hacer nada».'),
      t('Señor mío, creyendo de todo corazón en tus palabras, me postro ante tu bondad: ayúdame, a mí pecador, a llevar a término en Ti mismo la obra que voy a empezar, en el nombre del Padre, y del Hijo, y del Espíritu Santo. Amén.'),
    ],
    meta: meta({
      source: 'Oración antes de toda obra, del libro de oraciones; cita del Evangelio según San Juan 15, 5',
    }),
  },
  {
    id: 'al-terminar-la-obra',
    title: 'Al terminar la obra',
    category: 'antes-trabajar',
    blocks: [
      t('Plenitud de todos los bienes eres Tú, Cristo mío. Llena de alegría y de gozo mi alma y sálvame, porque eres el único rico en misericordia. Amén.'),
      rub('Si el trabajo salió mal, se dice lo mismo: la acción de gracias no depende del resultado.'),
    ],
    meta: meta({ source: 'Oración después de toda obra, del libro de oraciones' }),
  },

  /* ═════════════════════ EL ESTUDIO ═════════════════════ */
  {
    id: 'despues-del-estudio',
    title: 'Después del estudio',
    category: 'antes-estudiar',
    blocks: [
      t('Te damos gracias, Creador, porque nos has concedido tu gracia para atender a la enseñanza. Bendice a quienes nos gobiernan, a nuestros padres y a nuestros maestros, que nos conducen al conocimiento del bien, y danos fuerza y firmeza para seguir aprendiendo. Amén.'),
    ],
    meta: meta({
      source: 'Oración después de la enseñanza, del libro de oraciones',
      tradition: 'Tradición rusa; se rezaba al cerrar la clase',
    }),
  },

  /* ═════════════════════ LA MESA ═════════════════════ */
  {
    id: 'antes-de-cenar',
    title: 'Antes de la cena',
    category: 'antes-comer',
    blocks: [
      t('Comerán los pobres y serán saciados, y alabarán al Señor los que le buscan; sus corazones vivirán por los siglos de los siglos.'),
      t('Gloria al Padre, y al Hijo, y al Espíritu Santo, ahora y siempre, y por los siglos de los siglos. Amén.'),
      t('Señor, ten piedad. <em>(tres veces)</em>'),
      rub('Y el Padre Nuestro. Después:'),
      t('Cristo Dios, bendice el alimento y la bebida de tus siervos, porque Tú eres santo, ahora y siempre, y por los siglos de los siglos. Amén.'),
    ],
    meta: meta({ source: 'Horologion, bendición de la mesa de la tarde; Salmo 21 (22), 27' }),
  },
  {
    id: 'mesa-pascual',
    title: 'Bendición de la mesa en Pascua',
    subtitle: 'Desde el domingo de Pascua hasta la Ascensión',
    category: 'antes-comer',
    blocks: [
      rub('En lugar del comienzo habitual se canta tres veces:'),
      t('Cristo ha resucitado de entre los muertos: con la muerte venció a la muerte y a los que yacían en los sepulcros les dio la vida.'),
      rub('Y después la bendición acostumbrada:'),
      t('Cristo Dios, bendice el alimento y la bebida de tus siervos, porque Tú eres santo, ahora y siempre, y por los siglos de los siglos. Amén.'),
    ],
    meta: meta({ source: 'Pentecostarion; tropario pascual y bendición de la mesa del Horologion' }),
  },
  {
    id: 'despues-de-cenar',
    title: 'Después de la cena',
    category: 'despues-comer',
    blocks: [
      t('Bendito es Dios, que tiene misericordia de nosotros y nos alimenta con sus dones abundantes, por su gracia y su compasión, ahora y siempre, y por los siglos de los siglos. Amén.'),
    ],
    meta: meta({ source: 'Horologion, acción de gracias después de la cena' }),
  },

  /* ═════════════════════ EL CAMINO ═════════════════════ */
  {
    id: 'san-nicolas-viaje',
    title: 'A san Nicolás, por los que van de camino',
    category: 'antes-viajar',
    blocks: [
      head('Tropario'),
      t('La verdad de tus obras te ha mostrado a tu grey como regla de fe, imagen de mansedumbre y maestro de templanza. Por eso alcanzaste con la humildad lo excelso, y con la pobreza la riqueza. Padre y pontífice Nicolás, intercede ante Cristo Dios para que salve nuestras almas.'),
      rub('San Nicolás de Mira († c. 343) es invocado por los que navegan y por los que van de viaje. Su memoria, el 6 de diciembre.'),
    ],
    meta: meta({ source: 'Menaion, 6 de diciembre; tropario de san Nicolás de Mira, tono 4' }),
  },

  /* ═════════════════════ AL CAER EN EL PECADO ═════════════════════ */
  {
    id: 'al-caer',
    title: 'En el momento de la caída',
    subtitle: 'Lo que se reza sin moverse del sitio',
    category: 'al-pecar',
    blocks: [
      rub('No lo dejes para la noche ni para la próxima confesión. Detente donde estés, aunque sea un instante, y no discutas contigo mismo: acúsate y vuelve.'),
      t('Oh Dios, ten piedad de mí, pecador.'),
      rub('Repítelo despacio hasta que el alma se aquiete. Luego:'),
      t('Señor Jesucristo, Hijo de Dios, ten piedad de mí, pecador.'),
      rub('Y sigue con lo que estabas haciendo. La tristeza que insiste en mirarse a sí misma no es arrepentimiento; el arrepentimiento se levanta y anda.'),
      rub('Lo que sea grave, dilo en la confesión: aquí no se sustituye el sacramento, se evita que la herida se enfríe hasta entonces.'),
    ],
    meta: seleccion({
      source: 'Oración del publicano (Lucas 18, 13) y oración de Jesús',
      notes:
        'Recoge el consejo ascético común de levantarse enseguida. No sustituye a la confesión ni al ' +
        'consejo del padre espiritual.',
    }),
  },
  {
    id: 'troparios-de-compuncion',
    title: 'Troparios de compunción',
    subtitle: 'De las Completas',
    category: 'al-pecar',
    blocks: [
      t('Ten piedad de nosotros, Señor, ten piedad de nosotros, porque, sin hallar excusa alguna, nosotros pecadores te ofrecemos esta súplica como a Soberano: ten piedad de nosotros.'),
      t('Gloria al Padre, y al Hijo, y al Espíritu Santo.'),
      t('Señor, ten piedad de nosotros, porque en Ti hemos confiado. No te irrites demasiado contra nosotros ni recuerdes nuestras iniquidades, sino mira también ahora, como compasivo, y líbranos de nuestros enemigos; porque Tú eres nuestro Dios y nosotros tu pueblo, todos obra de tus manos, e invocamos tu nombre.'),
      t('Ahora y siempre, y por los siglos de los siglos. Amén.'),
      t('Ábrenos la puerta de la compasión, bendita Theotokos, para que, esperando en ti, no perezcamos, sino que por ti nos veamos libres de las adversidades, porque tú eres la salvación del pueblo cristiano.'),
    ],
    meta: meta({ source: 'Horologion, Completas; troparios de compunción tras el Trisagio' }),
  },
  {
    id: 'oracion-de-manases',
    title: 'Oración de Manasés',
    subtitle: 'Se lee en las Grandes Completas',
    category: 'al-pecar',
    blocks: [{ kind: 'pending', content: 'Contenido pendiente de incorporar.' }],
    status: 'pending',
    meta: meta({
      source: 'Septuaginta, Odas 12; se lee en las Grandes Completas de la Gran Cuaresma',
      license: 'pending',
      notes:
        'Texto veterotestamentario del canon largo. ATHOS todavía no incorpora los libros ' +
        'deuterocanónicos, porque la Reina-Valera 1909 —la traducción de dominio público que usa la ' +
        'aplicación— no los contiene. No se transcribe de memoria.',
    }),
  },

  /* ═════════════════════ EN LA TENTACIÓN ═════════════════════ */
  {
    id: 'deus-in-adiutorium',
    title: 'Dios, ven en mi auxilio',
    subtitle: 'El versículo que san Juan Casiano recomendaba repetir',
    category: 'tentacion',
    blocks: [
      t('Oh Dios, ven en mi auxilio; Señor, date prisa en socorrerme.'),
      rub('San Juan Casiano recogió de los monjes de Egipto el consejo de repetir este versículo del salmo 69 en toda hora y en toda prueba: en la tentación, en el desánimo, en la distracción, hasta que la mente aprenda a habitar en él y no en el pensamiento que la asalta.'),
      rub('No se discute con el pensamiento ni se le da vueltas: se le opone el versículo y se sigue.'),
    ],
    meta: meta({
      source: 'Salmo 69 (70), 2; san Juan Casiano, Colaciones X',
      author: 'San Juan Casiano († c. 435)',
      license: 'public-domain',
    }),
  },
  {
    id: 'salmo-90-ref',
    title: 'Salmo 90',
    subtitle: 'El que habita al amparo del Altísimo',
    category: 'tentacion',
    blocks: [
      rub('El salmo que la tradición pone en la boca del que teme. Se lee íntegro desde el Salterio: Leer → Salterio → Salmo 90.'),
      t('El que habita al abrigo del Altísimo morará bajo la sombra del Omnipotente. Diré yo al Señor: esperanza mía y castillo mío, mi Dios, en quien confiaré.'),
    ],
    meta: meta({
      source: 'Salterio, salmo 90 según la numeración de los Setenta (91 hebreo). Reina-Valera 1909',
      license: 'public-domain',
    }),
  },

  /* ═════════════════════ EN LA ANGUSTIA ═════════════════════ */
  {
    id: 'en-la-angustia',
    title: 'En la angustia y la tristeza',
    category: 'angustia',
    blocks: [
      rub('Cuando no salen las palabras, no las busques: presta la voz a los salmos, que ya han dicho esto antes que tú.'),
      t('Desde lo hondo clamé a Ti, Señor: Señor, oye mi voz.'),
      t('¿Por qué te abates, alma mía, y por qué te turbas dentro de mí? Espera en Dios, porque aún he de alabarle.'),
      rub('Y después, sin prisa, cuantas veces haga falta:'),
      t('Señor Jesucristo, Hijo de Dios, ten piedad de mí.'),
      rub('Salmos enteros para esta hora: el 6, el 41, el 101 y el 129, en Leer → Salterio.'),
      rub('Si el peso no cede, o si aparece el pensamiento de acabar con tu vida, no lo lleves a solas: díselo hoy a tu padre espiritual y busca ayuda médica. La oración no excluye al médico; la Iglesia nunca lo ha entendido así.'),
    ],
    meta: seleccion({
      source: 'Salmos 129 (130), 1 y 41 (42), 6 según la Reina-Valera 1909; oración de Jesús',
    }),
  },
  {
    id: 'proteccion-de-los-cristianos',
    title: 'Protección de los cristianos',
    subtitle: 'Kontakion a la Theotokos',
    category: 'angustia',
    blocks: [
      t('Protección de los cristianos que jamás falla, mediación ante el Creador que no cesa: no desprecies las voces suplicantes de los pecadores, sino adelántate, como buena, a socorrernos a los que fielmente te invocamos. Apresúrate a interceder, date prisa en suplicar, tú que proteges siempre, Theotokos, a los que te honran.'),
    ],
    meta: meta({ source: 'Horologion; kontakion a la Theotokos, tono 6' }),
  },

  /* ═════════════════════ EN LA ENFERMEDAD ═════════════════════ */
  {
    id: 'santos-anargiros',
    title: 'A los santos Anárgiros',
    subtitle: 'Cosme y Damián, médicos que no cobraban',
    category: 'enfermedad',
    blocks: [
      t('Santos anárgiros y taumaturgos: visitad nuestras dolencias. Gratis recibisteis, dad gratis.'),
      rub('Los santos Cosme y Damián son invocados por los enfermos y por quienes los cuidan. Su memoria, el 1 de noviembre.'),
    ],
    meta: meta({
      source: 'Menaion, 1 de noviembre; kontakion de los santos Anárgiros. Cita del Evangelio según San Mateo 10, 8',
    }),
  },

  /* ═════════════════════ LOS DEMÁS ═════════════════════ */
  {
    id: 'por-los-vivos',
    title: 'Por los vivos',
    subtitle: 'Conmemoración diaria de los nuestros',
    category: 'familia',
    blocks: [
      rub('Donde va N. se dice el nombre, uno a uno y sin prisa. Es la parte de la oración en que se hace sitio a los demás.'),
      t('Salva, Señor, y ten piedad de mi padre espiritual N., y por sus santas oraciones perdona mis pecados.'),
      t('Salva, Señor, y ten piedad de mis padres N. y N., de mis hermanos y hermanas, de mis parientes según la carne y de todos mis allegados, y concédeles tu paz.'),
      t('Salva, Señor, y ten piedad de los que me hacen bien, y recompénsalos con tus bienes celestiales.'),
      t('Salva, Señor, y ten piedad de los que me odian y me ofenden, y no permitas que perezcan por mi causa.'),
      t('Salva, Señor, y ten piedad de los que están enfermos, de los que sufren, de los presos, de los que están de camino, y de los que me han pedido, indigno de mí, que ore por ellos.'),
      t('Ten piedad, Señor, de todos ellos según tu gran misericordia. Amén.'),
    ],
    meta: meta({ source: 'Libro de oraciones, conmemoración de los vivos en las oraciones de la mañana y de la noche' }),
  },
  {
    id: 'bendicion-de-los-hijos',
    title: 'Bendición de los hijos',
    subtitle: 'Al salir de casa o antes de dormir',
    category: 'familia',
    blocks: [
      rub('El padre o la madre traza la señal de la cruz sobre la frente del hijo diciendo:'),
      t('El Señor te bendiga y te guarde. Haga resplandecer el Señor su rostro sobre ti y tenga de ti misericordia. Alce el Señor sobre ti su rostro y ponga en ti paz.'),
      rub('Puede añadirse: En el nombre del Padre, y del Hijo, y del Espíritu Santo. Amén.'),
    ],
    meta: meta({
      source: 'Libro de los Números 6, 24-26, según la Reina-Valera 1909',
      license: 'public-domain',
      notes: 'La bendición sacerdotal de la Escritura, usada por los padres sobre sus hijos.',
    }),
  },
  {
    id: 'por-los-bienhechores',
    title: 'Por los bienhechores',
    category: 'amigos',
    blocks: [
      t('Recompensa, Señor, con tus bienes celestiales a los que nos aman y nos hacen bien. Concede a mis hermanos y a mis allegados cuanto piden para su salvación, y la vida eterna.'),
      rub('Es la única deuda que se puede pagar sin que el otro se entere.'),
    ],
    meta: meta({ source: 'Libro de oraciones, conmemoración de los vivos' }),
  },
  {
    id: 'palabras-del-senor-enemigos',
    title: 'Las palabras del Señor sobre los enemigos',
    category: 'enemigos',
    blocks: [
      rub('Antes de rezar por quien te ha hecho daño, lee lo que se te manda. No es un consejo:'),
      t('Amad a vuestros enemigos, bendecid a los que os maldicen, haced bien a los que os aborrecen, y orad por los que os ultrajan y os persiguen.'),
      rub('Y lo que Él mismo hizo desde la cruz:'),
      t('Padre, perdónalos, porque no saben lo que hacen.'),
      rub('Si todavía no puedes desearle el bien, pide al menos poder desearlo: eso ya es haber empezado.'),
    ],
    meta: meta({
      source: 'Evangelio según San Mateo 5, 44 y San Lucas 23, 34, según la Reina-Valera 1909',
      license: 'public-domain',
    }),
  },
  {
    id: 'por-los-padres-difuntos',
    title: 'Por los padres difuntos',
    category: 'difuntos',
    blocks: [
      t('Recuerda, Señor, las almas de tus siervos difuntos, mis padres N. y N., y de todos mis parientes según la carne, y perdónales todos sus pecados, voluntarios e involuntarios, concediéndoles el Reino y la participación en tus bienes eternos y el gozo de tu vida bienaventurada e inacabable.'),
      t('Memoria eterna. <em>(tres veces)</em>'),
    ],
    meta: meta({ source: 'Libro de oraciones, conmemoración de los difuntos' }),
  },

  /* ═════════════════════ EL PADRE ESPIRITUAL ═════════════════════ */
  {
    id: 'por-el-padre-espiritual',
    title: 'Por el padre espiritual',
    category: 'padre-espiritual',
    blocks: [
      t('Salva, Señor, y ten piedad de mi padre espiritual N., y por sus santas oraciones perdona mis pecados.'),
      rub('Se dice cada día. También por el obispo y por el sacerdote de tu parroquia.'),
    ],
    meta: meta({ source: 'Libro de oraciones, conmemoración de los vivos' }),
  },
  {
    id: 'pedir-la-bendicion',
    title: 'Cómo se pide la bendición',
    category: 'padre-espiritual',
    blocks: [
      rub('Al saludar a un sacerdote o a un obispo no se le da la mano: se le pide la bendición.'),
      rub('Se juntan las manos, la derecha sobre la izquierda, con las palmas hacia arriba, y se dice: «Bendiga, padre» —o «Bendiga, señor», si es obispo—.'),
      rub('Él bendice trazando la cruz y responde. Entonces se besa su mano derecha: no se venera a la persona, sino la mano que bendice y que sostiene el cáliz.'),
      rub('Lo mismo se pide antes de un viaje, de una decisión o de una obra que empieza. Pedir la bendición no es un trámite: es reconocer que no se camina solo.'),
      rub('Buscar un padre espiritual lleva tiempo y no se fuerza. Mientras tanto, confiésate con el sacerdote de tu parroquia y sé constante con él.'),
    ],
    meta: guia({ source: 'Uso corriente de las parroquias ortodoxas' }),
  },

  /* ═════════════════════ EL TEMPLO ═════════════════════ */
  {
    id: 'al-entrar-en-el-templo',
    title: 'Al entrar en el templo',
    category: 'templo',
    blocks: [
      rub('En la puerta, antes de pasar, tres veces la señal de la cruz con una inclinación, diciendo:'),
      t('Oh Dios, ten piedad de mí, pecador. <em>(y una inclinación)</em>'),
      t('Oh Dios, purifícame a mí, pecador, y ten piedad de mí. <em>(y una inclinación)</em>'),
      t('Creador mío, Señor, perdóname. <em>(y una inclinación)</em>'),
      rub('Y al entrar:'),
      t('Entraré en tu casa; me postraré hacia tu santo templo con temor de Ti. Señor, guíame en tu justicia a causa de mis enemigos; endereza delante de mí tu camino.'),
    ],
    meta: meta({
      source: 'Horologion, oraciones al entrar en la iglesia; Salmo 5, 8-9',
    }),
  },
  {
    id: 'ante-el-icono-de-cristo',
    title: 'Ante el icono de Cristo',
    category: 'templo',
    blocks: [
      t('Adoramos tu purísima imagen, oh Bueno, pidiendo el perdón de nuestras faltas, Cristo Dios; porque quisiste voluntariamente subir en la carne a la cruz, para librar de la esclavitud del enemigo a los que creaste. Por eso, agradecidos, te clamamos: de gozo lo llenaste todo, Salvador nuestro, al venir a salvar el mundo.'),
      rub('Se venera el icono besando los pies o la mano, no el rostro.'),
    ],
    meta: meta({ source: 'Tropario del domingo de la Ortodoxia, tono 2' }),
  },
  {
    id: 'como-se-entra-en-el-templo',
    title: 'Qué se hace dentro',
    subtitle: 'Para quien entra por primera vez',
    category: 'templo',
    blocks: [
      rub('Se entra en silencio. Si el oficio ya ha empezado, se busca sitio sin cruzar por delante del altar ni de quien está rezando.'),
      rub('Se compra una vela y se enciende ante el icono que se quiera, por los vivos o por los difuntos. Es una ofrenda, no una moneda de cambio.'),
      rub('Se veneran los iconos del centro del templo: dos señales de la cruz con inclinación, se besa el icono, y una tercera al retirarse.'),
      rub('Se está de pie. En muchas parroquias hay bancos para quien los necesite; usarlos no es faltar a nada.'),
      rub('Los domingos y las fiestas no se hacen postraciones hasta el suelo, ni tampoco en el tiempo pascual: la Iglesia celebra la resurrección de pie.'),
      rub('A la comunión se acerca quien está bautizado o crismado en la Iglesia ortodoxa y se ha preparado. Quien no comulga puede recibir al final el pan bendito —el antídoron— sin ninguna dificultad.'),
      rub('Si algo no se entiende, se pregunta después al sacerdote. Nadie espera que el que llega lo sepa hacer.'),
    ],
    meta: guia({
      source: 'Uso corriente de las parroquias ortodoxas',
      notes:
        'Las costumbres varían entre las iglesias griega, rusa, rumana, serbia, antioquena y las ' +
        'parroquias de habla hispana: pregunta en la tuya.',
    }),
  },

  /* ═════════════════════ LA ESCRITURA ═════════════════════ */
  {
    id: 'antes-de-leer-la-escritura',
    title: 'Antes de leer la Escritura',
    category: 'escritura',
    blocks: [
      t('Señor Jesucristo, abre los ojos de mi corazón para que escuche tu palabra, la entienda y cumpla tu voluntad, porque peregrino soy sobre la tierra.'),
      t('No escondas de mí tus mandamientos, sino ábreme los ojos para que contemple las maravillas de tu ley.'),
      t('Haz brillar en mi corazón, Señor amante de los hombres, la luz pura de tu conocimiento y abre los ojos de mi mente para comprender la predicación de tu Evangelio. Amén.'),
    ],
    meta: meta({
      source:
        'Oración antes de la lectura de la Escritura, atribuida a san Juan Crisóstomo; Salmo 118 (119), 18-19; ' +
        'oración antes del Evangelio de la Divina Liturgia',
      author: 'San Juan Crisóstomo († 407)',
    }),
  },
  {
    id: 'como-se-lee-la-escritura',
    title: 'Cómo se lee',
    category: 'escritura',
    blocks: [
      rub('Poco y despacio. Un capítulo del Evangelio y otro de las epístolas al día es más de lo que parece.'),
      rub('De pie para el Evangelio, si puedes: se escucha a Alguien, no se consulta un libro.'),
      rub('No se lee para tener razón. Cuando un pasaje incomoda, ese es precisamente el que hay que releer.'),
      rub('No se lee a solas: la Iglesia lee con los Padres. En Biblioteca → Estudio están los itinerarios y las obras; en Leer → Lecturas del día, las que la Iglesia lee hoy.'),
      rub('Lo que no se entienda, se anota y se pregunta. No hace falta resolverlo todo en la misma sentada.'),
    ],
    meta: guia({ source: 'Consejo común de la tradición patrística, resumido por ATHOS' }),
  },

  /* ═════════════════════ LOS SACRAMENTOS ═════════════════════ */
  {
    id: 'como-es-la-confesion',
    title: 'Cómo es la confesión',
    subtitle: 'Para quien va a confesarse por primera vez',
    category: 'confesion',
    blocks: [
      rub('Se pregunta en la parroquia cuándo confiesa el sacerdote. En muchas iglesias, antes de las Vísperas o antes de la Liturgia.'),
      rub('No es una conversación ni una consulta: es acusarse a uno mismo. Se dicen los pecados propios, no los ajenos ni las circunstancias que los explican.'),
      rub('Se está ante el icono de Cristo y ante el Evangelio y la cruz. El sacerdote es testigo, no juez: el que perdona es Cristo.'),
      rub('Se dice lo que se recuerda, con sencillez y sin adornar. Si no se sabe empezar, se dice eso mismo y el sacerdote ayuda.'),
      rub('Al final él pone el epitrafilio sobre la cabeza y lee la oración de absolución. Puede dar un consejo o una penitencia: se recibe como medicina, no como castigo.'),
      rub('El sacerdote está obligado al secreto de la confesión de manera absoluta.'),
      rub('Para el examen previo, en esta misma sección: «Guía para el examen antes de la confesión».'),
    ],
    meta: guia({
      source: 'Uso corriente de las parroquias ortodoxas',
      notes:
        'La frecuencia de la confesión y su relación con la comunión varían según la iglesia local y ' +
        'lo que indique el padre espiritual.',
    }),
  },
  {
    id: 'preparacion-para-comulgar',
    title: 'Cómo se prepara la comunión',
    category: 'comunion',
    blocks: [
      rub('La preparación tiene cuatro partes, y ninguna se compra con las otras:'),
      rub('Reconciliarse. Si hay algo pendiente con alguien, se arregla antes. «Deja allí tu ofrenda y ve primero a reconciliarte con tu hermano».'),
      rub('Confesarse, según lo que indique el padre espiritual.'),
      rub('Rezar el oficio de preparación: el canon y las oraciones antes de la comunión, la noche anterior o esa mañana.'),
      rub('Ayunar. Lo habitual es no comer ni beber nada desde la medianoche, y guardar los días de ayuno de la semana. La medida concreta —y las excepciones por enfermedad, edad o medicación— las fija tu padre espiritual, no una aplicación.'),
      rub('Se acerca uno con las manos cruzadas sobre el pecho, se dice el nombre de bautismo y se recibe. Después, el antídoron y las oraciones de acción de gracias.'),
      rub('En esta sección están «Creo, Señor, y confieso» y «Después de la Santa Comunión». El canon completo está pendiente de incorporar y así se indica en su ficha.'),
    ],
    meta: guia({
      source: 'Uso corriente de las parroquias ortodoxas; cita del Evangelio según San Mateo 5, 24',
      notes:
        'La disciplina eucarística difiere entre las iglesias locales y es el padre espiritual quien ' +
        'la aplica a cada persona.',
    }),
  },

  /* ═════════════════════ ACCIÓN DE GRACIAS ═════════════════════ */
  {
    id: 'por-todos-los-beneficios',
    title: 'Por todos los beneficios',
    category: 'accion-de-gracias',
    blocks: [
      t('Te damos gracias, Señor, por todos los beneficios que nos has hecho: los conocidos y los desconocidos, los manifiestos y los ocultos.'),
      t('Gloria a Ti, Dios nuestro, gloria a Ti.'),
      rub('Los desconocidos y los ocultos son los más: casi todo lo que Dios hace por uno ocurre sin que uno se entere.'),
    ],
    meta: meta({ source: 'Divina Liturgia de san Juan Crisóstomo, anáfora' }),
  },

  /* ═════════════════════ OTRAS ═════════════════════ */
  {
    id: 'bajo-tu-proteccion',
    title: 'Bajo tu compasión',
    subtitle: 'La oración más antigua a la Madre de Dios que se conserva',
    category: 'otras',
    blocks: [
      t('Bajo tu compasión nos refugiamos, Theotokos: no desprecies nuestras súplicas en la necesidad, sino líbranos del peligro, tú, la única pura, la única bendita.'),
      rub('Se conserva en un papiro egipcio del siglo III. Es el testimonio más antiguo que existe de una oración dirigida a la Theotokos, y sigue rezándose sin cambios.'),
    ],
    meta: meta({
      source: 'Papiro Rylands 470 (Egipto, siglo III); Horologion',
      license: 'public-domain',
    }),
  },
  {
    id: 'ante-una-decision',
    title: 'Antes de una decisión',
    category: 'otras',
    blocks: [
      rub('No para que Dios firme lo que ya has decidido, sino para llegar a la decisión sin ruido.'),
      t('Hazme oír por la mañana tu misericordia, porque en Ti he confiado; hazme saber el camino por donde ande, porque a Ti he elevado mi alma.'),
      t('Señor, no sé lo que debo pedirte. Tú solo sabes lo que necesito. Dame lo que Tú mismo quieras darme. Enséñame a orar. Ora Tú mismo en mí. Amén.'),
      rub('Después, cuenta la decisión a tu padre espiritual antes de tomarla, no después.'),
    ],
    meta: seleccion({
      source: 'Salmo 142 (143), 8 según la Reina-Valera 1909; oración de san Filareto de Moscú († 1867)',
    }),
  },

  /* ═════════════════════ LA NOCHE ═════════════════════ */
  {
    id: 'desvelo',
    title: 'En el desvelo de la noche',
    category: 'noche',
    blocks: [
      rub('Si el sueño no llega, no enciendas la pantalla. La noche en vela es una hora antigua de oración: los monjes se levantan a ella a propósito.'),
      t('Señor Jesucristo, Hijo de Dios, ten piedad de mí, pecador.'),
      rub('Despacio, siguiendo la respiración, sin contar cuánto llevas ni esperar nada. Si te duermes rezando, has terminado bien.'),
      rub('Si el desvelo viene de una preocupación, ponla por nombre delante de Dios y déjala ahí: «Señor, esto no lo puedo yo».'),
      rub('Salmos para esta hora: el 6, el 90 y el 133, en Leer → Salterio.'),
    ],
    meta: seleccion({ source: 'Oración de Jesús; Salterio' }),
  },
];
