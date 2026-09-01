/**
 * Lo que faltaba en el catecismo.
 *
 * La primera tanda cubría bien la doctrina —Dios, Cristo, la Iglesia, los
 * Misterios— y se quedaba corta justo donde la gente tiene las preguntas: la
 * Escritura, la vida de todos los días, qué se hace al entrar en una iglesia y
 * los asuntos que duelen.
 *
 * Rige el mismo criterio, y aquí más que en ninguna parte:
 *
 * 1. Donde la Iglesia enseña algo, se dice, aunque incomode.
 * 2. Donde no lo ha definido, se dice que no lo ha definido, que es distinto
 *    de no saberlo y distinto de que dé igual.
 * 3. Donde las Iglesias locales o los confesores difieren, se dice también, sin
 *    fingir una unanimidad que no existe.
 * 4. Ninguna respuesta se escribe contra nadie.
 */
import type { CatechismEntry, CatechismPart } from './catechism';
import { LOVE_ENTRIES } from './catechism-amor';
import { HOPE_ENTRIES } from './catechism-esperanza';
import { SYMBOL_ENTRIES } from './catechism-simbolo';

/* ═══════════════ Partes nuevas ═══════════════ */

export const EXTRA_PARTS: CatechismPart[] = [
  /*
   * Las tres partes clásicas.
   *
   * Un catecismo ortodoxo se ha organizado siempre desde san Pablo —«ahora
   * permanecen la fe, la esperanza y el amor»—: la fe sobre el Símbolo, la
   * esperanza sobre el Padre Nuestro y las Bienaventuranzas, el amor sobre los
   * mandamientos. ATHOS tenía las preguntas sueltas y le faltaba justamente
   * eso: el esqueleto que las sostiene y el texto explicado línea por línea.
   */
  {
    id: 'simbolo',
    title: 'La fe · el Símbolo, artículo por artículo',
    summary:
      'Los doce artículos del Credo, uno a uno: qué dice cada uno, contra qué se escribió y qué se juega en él.',
    entries: SYMBOL_ENTRIES,
  },
  {
    id: 'esperanza',
    title: 'La esperanza · el Padre Nuestro y las Bienaventuranzas',
    summary:
      'Qué es la oración, la invocación, las siete peticiones, la doxología y las nueve bienaventuranzas.',
    entries: HOPE_ENTRIES,
  },
  {
    id: 'amor',
    title: 'El amor · los mandamientos',
    summary:
      'Los dos mandamientos en que Cristo resumió la Ley, y el Decálogo uno por uno en la numeración ortodoxa.',
    entries: LOVE_ENTRIES,
  },

  {
    id: 'escritura',
    title: 'La Escritura',
    summary: 'Qué es la Biblia para la Iglesia ortodoxa, por qué tiene más libros y cómo se lee.',
    entries: [
      {
        id: 'que-es-la-biblia',
        question: '¿La Biblia es palabra de Dios?',
        level: 'nuevo',
        answer: [
          'Sí, y la Iglesia lo dice sin rebajarlo: los libros de la Escritura están inspirados por el Espíritu Santo. Pero conviene entender qué significa eso en la tradición oriental, porque no significa dictado.',
          'Los autores no fueron secretarios. Escribieron con su lengua, su cultura y sus límites, y eso se nota: Marcos escribe mal el griego, Lucas lo escribe bien, y los cuatro evangelistas ordenan los hechos de manera distinta. La inspiración no borró al hombre que escribía, igual que la divinidad de Cristo no borró su humanidad. La Iglesia lee la Escritura con esa analogía.',
          'Y hay una diferencia importante con el protestantismo: la Iglesia no se apoya en la Escritura, sino que la Escritura salió de la Iglesia. Fue la comunidad la que reconoció qué libros eran suyos, cerca de trescientos años después de Pentecostés. Por eso la ortodoxia no admite el sola Scriptura: el libro no puede juzgar a la comunidad que lo reconoció.',
        ],
        scripture: ['2 Timoteo 3, 16', '2 Pedro 1, 21'],
        disputed:
          'Las confesiones protestantes sostienen que la Escritura es la única autoridad y que se interpreta a sí misma. La ortodoxia sostiene que la Escritura, la liturgia, los concilios y los Padres son una sola tradición, y que la Biblia se lee dentro de ella, no contra ella.',
      },
      {
        id: 'canon-biblico',
        question: '¿Por qué la Biblia ortodoxa tiene más libros que la protestante?',
        level: 'catecumeno',
        answer: [
          'Porque las dos parten de textos distintos. La Iglesia usó desde el principio la Septuaginta, la traducción griega del Antiguo Testamento hecha por judíos de Alejandría dos siglos antes de Cristo, que incluía libros como Sabiduría, Eclesiástico, Tobías, Judit y los Macabeos. Los apóstoles citan esa versión.',
          'En el siglo XVI, la Reforma decidió atenerse al canon hebreo fijado por el judaísmo rabínico después de Cristo, y dejó fuera esos libros; los llamó apócrifos. La Iglesia católica los mantuvo con el nombre de deuterocanónicos. La ortodoxa los conserva también, y añade alguno más: el salmo 151, la oración de Manasés, 3 Macabeos y, en algunas ediciones, 4 Macabeos.',
          'Lo que sí conviene decir: la ortodoxia nunca ha promulgado una lista definitiva y cerrada del Antiguo Testamento en un concilio ecuménico. Los libros discutidos se leen en la iglesia y se tienen por Escritura, y a la vez hay Padres que los ponen en un segundo escalón. Es uno de los pocos asuntos en que la Iglesia ha vivido siglos sin necesitar zanjar.',
        ],
        undefined_:
          'No hay definición ecuménica del canon del Antiguo Testamento. El del Nuevo Testamento sí es firme desde el siglo IV y coincide en las tres grandes tradiciones: veintisiete libros.',
        seeAlso: [{ label: 'Leer la Biblia', path: '/leer/biblia' }],
      },
      {
        id: 'leer-literal',
        question: '¿Hay que entender la Biblia al pie de la letra?',
        level: 'catecumeno',
        answer: [
          'No siempre, y la Iglesia lleva mil ochocientos años diciéndolo. Los Padres distinguen varios sentidos en un mismo pasaje: el literal o histórico, el que apunta a Cristo, y el que se aplica al alma de quien lee. El paso del mar Rojo ocurrió, anuncia el bautismo y describe lo que le pasa a cada uno al salir del pecado: los tres sentidos a la vez, sin que ninguno anule a los demás.',
          'Hubo dos escuelas antiguas y las dos son ortodoxas. La de Antioquía tiraba de lo literal y lo histórico; la de Alejandría, de lo alegórico. La Iglesia no eligió: se quedó con las dos y las corrigió mutuamente, porque el literalismo cerrado y la alegoría desbocada estropean el texto por lados opuestos.',
          'La regla práctica es sencilla: lo que la liturgia y los Padres leen como historia, se lee como historia; lo que leen como figura, como figura. Y ante una duda que importe, se pregunta en vez de decidir por cuenta propia.',
        ],
        seeAlso: [{ label: 'San Gregorio de Nisa', path: '/biblioteca/padres/gregorio-nisa' }],
      },
      {
        id: 'por-donde-empezar-biblia',
        question: 'Quiero leer la Biblia entera. ¿Por dónde empiezo?',
        level: 'nuevo',
        answer: [
          'No por el Génesis y hacia delante: casi todo el que lo intenta se atasca en el Levítico. Empieza por un Evangelio —san Marcos es el más corto y el más directo—, sigue con los Hechos, que cuentan qué pasó después, y luego con las cartas de san Pablo, empezando por Filipenses o Romanos.',
          'El Antiguo Testamento se entiende mejor después, y también conviene un orden: Génesis y Éxodo, los Salmos, Isaías, Job. El Salterio es aparte: es el libro de oración de la Iglesia y se lee rezándolo, no estudiándolo.',
          'Y la manera ortodoxa por excelencia: leer cada día las lecturas que toca en la Liturgia. Son una del Evangelio y una de las cartas, van hilvanadas a lo largo del año, y así se lee la Escritura al ritmo de la Iglesia y no al de uno. ATHOS las trae cada día.',
        ],
        seeAlso: [
          { label: 'Las lecturas de hoy', path: '/leer/lecturas' },
          { label: 'Antes de leer la Escritura', path: '/orar/oraciones/antes-de-leer-la-escritura' },
        ],
      },
    ],
  },

  {
    id: 'en-la-iglesia',
    title: 'Dentro del templo',
    summary: 'Qué se hace, por qué se hace así y qué pasa si no sabes qué hacer.',
    entries: [
      {
        id: 'no-se-que-hacer',
        question: 'Entro por primera vez y no sé qué hacer. ¿Qué hago?',
        level: 'nuevo',
        answer: [
          'Quedarte de pie al fondo y mirar. Nadie va a acercarse a preguntarte nada, y estar sin hacer nada es una manera perfectamente aceptable de estar allí. La gente entra y sale durante el oficio: no es una falta de respeto, es la costumbre.',
          'Lo que sí conviene: no cruzar por delante de la puerta central del iconostasio, no hablar durante la Liturgia y no acercarse a comulgar. Al final se reparte pan bendito, el antídoron, que puede tomar cualquiera; se recoge con la mano derecha sobre la izquierda.',
          'Y si alguien te habla, la respuesta «vengo a ver cómo es» es la más frecuente del mundo y nadie la encuentra rara.',
        ],
        seeAlso: [{ label: 'Cómo se entra en el templo', path: '/orar/oraciones/como-se-entra-en-el-templo' }],
      },
      {
        id: 'por-que-de-pie',
        question: '¿Por qué se está de pie tanto rato?',
        level: 'nuevo',
        answer: [
          'Porque estar de pie es la postura de la resurrección: se está de pie ante alguien vivo. El canon 20 del Concilio de Nicea prohíbe arrodillarse los domingos y en el tiempo pascual precisamente por eso, y esa norma sigue en vigor aunque casi nadie la conozca.',
          'Dicho esto, en las iglesias ortodoxas hay bancos o sillas junto a las paredes, y en las de tradición griega hay stasídia, los sillones altos de madera con brazos. Están para usarlos. Los mayores, los enfermos y quien lleva un niño en brazos se sientan sin que nadie los mire.',
          'La regla que dan los sacerdotes: es mejor sentarse atendiendo que estar de pie pensando en cuándo acaba.',
        ],
      },
      {
        id: 'por-que-tan-largo',
        question: '¿Por qué los oficios son tan largos?',
        level: 'nuevo',
        answer: [
          'La Divina Liturgia dura entre hora y media y dos horas; una vigilia de fiesta, mucho más. Es largo de verdad y no tiene sentido disimularlo.',
          'La razón es que el oficio bizantino nunca se abrevió. Lo que en Occidente se recortó a partir del siglo XIII para adaptarlo a la vida de las ciudades, en Oriente se conservó tal cual salía de los monasterios. La estructura sigue siendo monástica y la parroquia hereda ese ritmo.',
          'La otra razón es de fondo: el oficio no está pensado como una obligación que se cumple en el menor tiempo posible, sino como un tiempo en el que se entra. La repetición y la longitud tienen una función; a los quince minutos uno todavía está en el oficio, a la hora ya está en otro sitio. Nadie lo aguanta bien al principio.',
        ],
      },
      {
        id: 'lengua-liturgia',
        question: '¿En qué lengua se celebra?',
        level: 'nuevo',
        answer: [
          'Depende de la parroquia. En España hay parroquias en griego, en rumano, en ruso, en serbio, en árabe y en español, y muchas mezclan: partes en la lengua de origen y partes en castellano, sobre todo el Evangelio y la homilía.',
          'El principio ortodoxo es antiguo y claro: la liturgia se celebra en la lengua del pueblo. San Cirilo y san Metodio inventaron un alfabeto entero en el siglo IX para poder traducir los oficios al eslavo, y la Iglesia les dio la razón contra quienes sostenían que sólo se podía celebrar en tres lenguas sagradas.',
          'En la práctica, las parroquias de la diáspora conservan la lengua de origen porque también sirven para conservar una comunidad lejos de casa. Si no entiendes nada, díselo al sacerdote: casi siempre hay libros bilingües, y en muchos sitios se está traduciendo más de lo que parece.',
        ],
      },
      {
        id: 'velas-y-dinero',
        question: '¿Hay que pagar por las velas? ¿Y por los sacramentos?',
        level: 'nuevo',
        answer: [
          'Las velas suelen tener un donativo asociado, y con eso se mantiene el templo: la Iglesia ortodoxa no recibe impuestos ni asignación en España y vive de lo que dan sus fieles. Si no puedes o no quieres dar nada, coge la vela igual. Nadie lo comprueba.',
          'Los sacramentos no se cobran, y cobrarlos tiene nombre desde el siglo IV: simonía, y está condenada por los cánones. Otra cosa es que exista la costumbre de dar un donativo por un bautizo, una boda o un funeral; es voluntario y no condiciona nada. Si un sacerdote pone precio a un sacramento, eso no es la práctica de la Iglesia y se le dice al obispo.',
          'Lo mismo vale para los nombres que se entregan para la conmemoración en la Liturgia: se dan con un donativo si se quiere y sin él si no se puede.',
        ],
      },
      {
        id: 'ninos-en-misa',
        question: '¿Y si mi hijo no para quieto?',
        level: 'nuevo',
        answer: [
          'No pasa nada, y en una iglesia ortodoxa se nota enseguida: los niños circulan, hablan, se les oye. La costumbre oriental no exige a los niños un silencio que no pueden dar.',
          'Los niños bautizados comulgan desde el mismo bautismo, incluidos los bebés, porque en la ortodoxia el bautismo, la crismación y la comunión van juntos y no se separan por edades. No hay primera comunión a los ocho años: los niños llevan comulgando desde que tienen semanas.',
          'Y suelen pasar delante en la fila de la comunión, con los mayores y los enfermos. No es un privilegio simpático: es que aguantan peor la espera.',
        ],
      },
      {
        id: 'panuelo-mujeres',
        question: '¿Las mujeres tienen que cubrirse la cabeza?',
        level: 'nuevo',
        answer: [
          'Depende del sitio, y varía mucho. En las parroquias rusas y en los monasterios es lo habitual y se agradece; en muchas parroquias griegas no lo hace casi nadie. En España te encontrarás las dos costumbres a veinte kilómetros de distancia.',
          'La base es un pasaje de san Pablo a los corintios, y su interpretación se discute desde hace siglos. Ninguna Iglesia local lo ha convertido en obligación canónica para las fieles.',
          'La regla práctica: si vas a un monasterio, lleva un pañuelo en el bolso. Si vas a una parroquia, mira lo que hacen las demás y haz eso. Y nadie te va a decir nada de ninguna manera.',
        ],
        undefined_:
          'No hay canon que lo imponga a las laicas. Es costumbre local, firme en unas tradiciones y ausente en otras.',
      },
    ],
  },

  {
    id: 'vida-diaria',
    title: 'La vida de todos los días',
    summary:
      'El dinero, el trabajo, el sexo, la política. Lo que se pregunta cuando la doctrina ya se ha entendido.',
    entries: [
      {
        id: 'dinero',
        question: '¿Qué dice la Iglesia sobre el dinero?',
        level: 'catecumeno',
        answer: [
          'Cosas más duras de las que se suelen repetir. San Basilio y san Juan Crisóstomo, que no eran revolucionarios sino obispos, sostienen que lo que sobra a uno pertenece al que no tiene, y que retenerlo no es falta de generosidad sino robo. Crisóstomo lo dijo en Constantinopla ante una corte que vivía de eso, y le costó el destierro.',
          'La Iglesia no condena la propiedad ni el comercio, y nunca ha enseñado que la pobreza sea buena en sí misma: la pobreza es un mal que hay que remediar, y la renuncia voluntaria de los monjes es otra cosa. Lo que condena es el apego, la usura y la indiferencia.',
          'En lo práctico, la tradición pide dar con regularidad y en secreto, no cuando sobra y se nota. Y pide una cosa incómoda de medir: que la limosna llegue a doler algo, porque lo que no cuesta nada no se ha dado.',
        ],
        scripture: ['Lucas 12, 15', 'Santiago 5, 1-4', '1 Timoteo 6, 10'],
        seeAlso: [{ label: 'San Juan Crisóstomo', path: '/biblioteca/padres/juan-crisostomo' }],
      },
      {
        id: 'trabajo',
        question: '¿Hay trabajos que un cristiano no deba hacer?',
        level: 'catecumeno',
        answer: [
          'La Iglesia antigua tenía listas explícitas: quien quería bautizarse no podía seguir siendo gladiador, proxeneta, actor de espectáculos obscenos, astrólogo ni fabricante de ídolos. La Tradición Apostólica del siglo III las recoge sin rodeos.',
          'El criterio que hay detrás sigue sirviendo: no se puede vivir de un trabajo cuyo objeto sea el daño de otro o el engaño. Lo demás —incluido el trabajo duro, mal pagado o poco lucido— se santifica haciéndolo bien. El monacato oriental insiste en que el trabajo manual es parte de la oración, no una interrupción.',
          'Sobre casos concretos de hoy, la Iglesia ortodoxa no ha publicado listas y los resuelve el confesor con la persona delante. Lo que sí hay es una advertencia constante en los Padres: cuidado con el trabajo que exige mentir a diario, aunque sea legal.',
        ],
        undefined_:
          'No hay una lista contemporánea de oficios prohibidos. Los casos difíciles se hablan con el padre espiritual.',
      },
      {
        id: 'sexualidad',
        question: '¿Qué enseña la Iglesia sobre la sexualidad?',
        level: 'catecumeno',
        answer: [
          'Que es buena. Conviene empezar por ahí porque no siempre se supone: la ortodoxia no ha tenido nunca una teología que trate el cuerpo o el placer como malos en sí, y condenó explícitamente a los grupos antiguos que lo sostenían. El matrimonio es un sacramento, no una concesión a los débiles.',
          'Y que su lugar es el matrimonio. La Iglesia enseña que las relaciones sexuales fuera de él son pecado, incluidas las de quienes viven juntos sin casarse, y esto no ha cambiado. Es de las enseñanzas que hoy más se ignoran en la práctica, y a la vez de las que ninguna Iglesia local ha modificado.',
          'La manera de tratarlo es la confesión, no el escrutinio. La Iglesia no pregunta por la vida íntima de nadie desde el ambón, y el confesor trabaja con lo que la persona trae, a su ritmo. Que la norma sea clara no significa que la aplicación sea automática: la oikonomía existe precisamente para esto.',
        ],
        seeAlso: [
          { label: 'Qué es la oikonomía', path: '/biblioteca/catecismo/fondo' },
          { label: 'Qué es la coronación', path: '/orar/oraciones/que-es-la-coronacion' },
        ],
      },
      {
        id: 'homosexualidad',
        question: '¿Y si soy homosexual?',
        level: 'catecumeno',
        answer: [
          'Puedes entrar en la Iglesia, ser bautizado, confesarte y comulgar, como cualquiera. Nadie va a preguntarte esto en la puerta y la Iglesia no tiene ninguna categoría de fieles de segunda.',
          'Y la enseñanza es la que es, así que se dice sin adornos: todas las Iglesias ortodoxas sostienen que el matrimonio es la unión de un hombre y una mujer y que las relaciones sexuales fuera de él son pecado, incluidas las homosexuales. Ninguna Iglesia local ha cambiado eso, ninguna bendice uniones del mismo sexo, y no hay señales de que vaya a ocurrir. Fingir lo contrario sería engañar a quien pregunta.',
          'Lo que también forma parte de la enseñanza, y se olvida más: que el desprecio, la burla y la hostilidad hacia las personas no tienen ningún respaldo en la tradición, y que la inclinación no es en sí misma un pecado, porque el pecado está en los actos y en el consentimiento. La Iglesia ha condenado a quienes tratan un pecado como si fuera peor que los demás; la lista de san Pablo pone en el mismo párrafo la avaricia y la maledicencia, y esas dos nadie las persigue.',
          'En la práctica, esto se habla con un sacerdote y en confesión, no en abstracto ni en una página. Hay quien encuentra en la Iglesia un sitio y hay quien encuentra sobre todo dolor, y sería deshonesto no decirlo.',
        ],
        disputed:
          'Dentro de la ortodoxia hay teólogos —pocos y sin respaldo sinodal— que piden revisar la cuestión pastoralmente, y jerarquías que han endurecido su postura en los últimos años. La enseñanza oficial de todas las Iglesias locales sigue siendo la descrita.',
      },
      {
        id: 'aborto',
        question: '¿Qué dice la Iglesia sobre el aborto?',
        level: 'catecumeno',
        answer: [
          'Que es la muerte de una vida humana, y lo dice desde el principio: la Didajé, un texto del siglo I, lo prohíbe expresamente, y los cánones de san Basilio lo tratan como homicidio sin distinguir según el tiempo de gestación. No hay ninguna tradición ortodoxa que lo admita.',
          'Y a la vez la Iglesia trata a la mujer que ha abortado como trata a cualquier pecado grave: con confesión, absolución y restitución plena. No existe la excomunión automática, no hay listas, y a nadie se le recuerda después. Varias Iglesias locales tienen oraciones específicas de consuelo para este caso.',
          'Los casos en que la vida de la madre corre peligro se resuelven pastoralmente y no con una regla general; la tradición no ha formulado una casuística, y los confesores no la improvisan en abstracto.',
          'Si esto te toca de cerca, no lo leas aquí: háblalo con un sacerdote. Esta página no puede hacer lo que hace una conversación.',
        ],
        scripture: ['Salmo 138, 13-16', 'Jeremías 1, 5'],
      },
      {
        id: 'anticoncepcion',
        question: '¿Se puede usar anticonceptivos?',
        level: 'iniciado',
        answer: [
          'Aquí la respuesta honrada es que no hay una posición ortodoxa única, y quien te diga lo contrario está dando la de su Iglesia local o la de su confesor por la de toda la Iglesia.',
          'Hay tres posturas vivas. Una sostiene que todo método artificial es ilícito, y es la tradicional en el monte Athos y en sectores del mundo griego. Otra, mayoritaria hoy en la práctica pastoral, admite los métodos no abortivos dentro del matrimonio, por acuerdo de los dos esposos y hablado con el confesor, cuando hay razones serias. Una tercera lo deja enteramente al criterio de la pareja.',
          'En lo que sí hay acuerdo unánime: los métodos que actúan impidiendo la implantación se consideran abortivos y no se admiten; y el matrimonio no puede cerrarse por principio a los hijos, porque tener hijos es uno de sus fines.',
          'Ninguna Iglesia ortodoxa ha publicado un documento vinculante para todas. Es de los casos en que la ortodoxia ha preferido dejar el asunto al confesor antes que legislar.',
        ],
        undefined_:
          'No hay definición pan-ortodoxa. El documento de Creta de 2016 sobre el matrimonio no zanjó la cuestión, y las Iglesias locales mantienen orientaciones distintas.',
      },
      {
        id: 'politica',
        question: '¿Debe la Iglesia meterse en política?',
        level: 'iniciado',
        answer: [
          'La tradición ortodoxa tiene una idea propia sobre esto, la sinfonía: Iglesia y Estado como dos ámbitos distintos que colaboran sin absorberse, formulada por Justiniano en el siglo VI. Funcionó a ratos y fracasó otras tantas veces, casi siempre en la misma dirección: el Estado usando a la Iglesia.',
          'La historia deja los dos ejemplos. San Juan Crisóstomo, san Ambrosio, san Felipe de Moscú y san Basilio se enfrentaron al poder y lo pagaron; ésa es la línea que la Iglesia canoniza. Y hay también jerarquías que bendijeron guerras, colaboraron con dictaduras o callaron cuando debían hablar; eso también ocurrió y la Iglesia no lo ha canonizado.',
          'Lo que la ortodoxia sostiene con firmeza es que la Iglesia no se identifica con una nación ni con un partido. En 1872 condenó como herejía el filetismo, es decir, organizar la Iglesia según criterios étnicos o nacionales. Es una condena que se cita poco porque casi nadie la cumple del todo.',
        ],
        seeAlso: [{ label: 'La historia de la Iglesia', path: '/biblioteca/historia' }],
      },
      {
        id: 'alcohol',
        question: '¿Está mal beber?',
        level: 'nuevo',
        answer: [
          'No. La Iglesia ortodoxa no es abstemia: usa vino en la Eucaristía, lo bendice en las bodas y lo tiene por un bien. San Pablo recomienda a Timoteo un poco de vino para el estómago. La Iglesia condenó a los grupos antiguos que prohibían el vino por considerarlo impuro.',
          'Lo que sí condena, y con dureza, es la embriaguez: los Padres la tratan como una forma de suicidio lento y como la puerta de todo lo demás. Y en los tiempos de ayuno el vino se restringe junto con el aceite, no por ser malo, sino porque el ayuno consiste precisamente en apartarse de lo bueno.',
          'Para quien tiene un problema con el alcohol, la abstinencia total es lo indicado y ningún confesor le dirá lo contrario. Beber no es obligatorio en ninguna parte y en los monasterios muchos monjes no prueban una gota.',
        ],
        scripture: ['Salmo 103, 15', '1 Timoteo 5, 23', 'Efesios 5, 18'],
      },
    ],
  },
];

/* ═══════════════ Entradas nuevas en partes que ya existen ═══════════════ */

export const EXTRA_ENTRIES: Record<string, CatechismEntry[]> = {
  misterios: [
    {
      id: 'santo-oleo',
      question: '¿Qué es el santo óleo? ¿Es la extremaunción?',
      level: 'catecumeno',
      answer: [
        'Es la unción de los enfermos, y no, no es la extremaunción. En la ortodoxia no está reservada a los moribundos: se administra a cualquier enfermo y también a los sanos. El Miércoles Santo se celebra en las parroquias para toda la comunidad y se unge a quien quiera acercarse.',
        'El rito completo lo celebran siete sacerdotes con siete lecturas del Evangelio y siete oraciones, aunque en la práctica lo hace uno solo cuando no hay más. Se basa en el capítulo quinto de la carta de Santiago, que manda llamar a los presbíteros para que unjan al enfermo.',
        'Lo que se pide es la salud del cuerpo y del alma a la vez, y el perdón de los pecados. La Iglesia no promete la curación física y no la presenta como un método: pide, y acepta lo que venga.',
      ],
      scripture: ['Santiago 5, 14-15', 'Marcos 6, 13'],
    },
    {
      id: 'orden-sacerdotal',
      question: '¿Cómo se hace uno sacerdote? ¿Pueden casarse?',
      level: 'catecumeno',
      answer: [
        'Hay tres grados: diácono, presbítero —el sacerdote de parroquia— y obispo. Se recibe por imposición de manos del obispo dentro de la Divina Liturgia, y siempre para una comunidad concreta: no se ordena a nadie en abstracto.',
        'Sí pueden casarse, y es lo habitual: la mayoría de los sacerdotes ortodoxos de parroquia son hombres casados con hijos. La regla es que hay que casarse antes de la ordenación, no después; el que se ordena soltero se queda soltero, y el que enviuda no vuelve a casarse. Los obispos se eligen entre los monjes o entre los viudos, así que son siempre célibes.',
        'Esa diferencia con la Iglesia latina no es una relajación oriental: es la disciplina antigua común, que Occidente cambió a partir del siglo XI. El Quinisexto la fijó por escrito en el año 692.',
      ],
      disputed:
        'La Iglesia católica romana exige el celibato a todos sus presbíteros de rito latino desde el siglo XII, con excepciones para los ritos orientales y para algunos convertidos. Las dos disciplinas son antiguas; la ortodoxa es la que continúa el uso primitivo.',
    },
  ],

  dificiles: [
    {
      id: 'no-cristianos',
      question: '¿Se condenan los que no son cristianos?',
      level: 'catecumeno',
      answer: [
        'La Iglesia no lo ha definido, y ésa no es una respuesta evasiva: es exactamente el estado de la cuestión. La ortodoxia afirma dónde está la Iglesia y dónde están seguros los medios de la salvación; no afirma dónde no está Dios ni a quién excluye.',
        'La fórmula que se repite entre los teólogos ortodoxos contemporáneos lo dice así: sabemos dónde está la Iglesia, no sabemos dónde no está. Y el juicio de cada persona pertenece a Dios, que conoce lo que nadie conoce: lo que cada uno recibió, lo que pudo entender y lo que hizo con ello.',
        'Lo que sí enseña la Iglesia es que quien conoce la verdad y la rechaza responde de eso, y que quien no la ha conocido no responde de lo que no supo. Y que rezar por los vivos incluye rezar por los que no creen, cosa que la Iglesia hace en todos sus oficios.',
      ],
      undefined_:
        'No hay definición conciliar sobre la salvación de quienes están fuera de la Iglesia visible. Las opiniones de los Padres van del rigor extremo a la esperanza amplia, y ninguna se ha impuesto como doctrina.',
    },
    {
      id: 'suicidio',
      question: '¿Se puede enterrar en la Iglesia a alguien que se ha suicidado?',
      level: 'catecumeno',
      answer: [
        'Sí, en la práctica actual y en la mayoría de los casos, aunque la respuesta requiere explicación porque la norma antigua era otra.',
        'Los cánones negaban el funeral eclesiástico al suicida, en un tiempo en que se entendía el suicidio como un acto plenamente libre de rechazo de la vida recibida. Hoy la Iglesia reconoce lo que aquellos cánones no podían reconocer: que la inmensa mayoría de los suicidios ocurren en un estado de enfermedad mental, y que donde no hay libertad no hay culpa. Es el obispo quien autoriza el funeral, y lo normal es que lo autorice.',
        'Lo que ninguna tradición ortodoxa hace es afirmar que el suicida está condenado. Eso no es doctrina de la Iglesia, y sostenerlo ante una familia que acaba de perder a alguien es una crueldad sin ningún respaldo.',
        'Y si esto lo estás leyendo por ti: díselo a alguien hoy, y llama al 024, la línea de atención a la conducta suicida, que atiende las veinticuatro horas y es gratuita.',
      ],
      undefined_:
        'La aplicación es pastoral y la decide el obispo caso por caso. La suerte eterna de nadie está definida por la Iglesia.',
    },
    {
      id: 'cremacion',
      question: '¿Se puede incinerar a un difunto?',
      level: 'catecumeno',
      answer: [
        'La Iglesia ortodoxa prefiere claramente la inhumación y en varias Iglesias locales la incineración está prohibida. La razón no es que Dios no pueda resucitar unas cenizas —eso nadie lo sostiene—, sino que el cuerpo del cristiano ha sido templo del Espíritu, ungido y comulgado, y la tradición lo entrega a la tierra como se entrega una semilla.',
        'La Iglesia de Grecia la rechaza. Otras Iglesias locales la desaconsejan pero conceden el funeral cuando la incineración viene impuesta por la ley del país, por razones sanitarias o por decisión de una familia no ortodoxa. En la diáspora la práctica es más flexible por necesidad.',
        'Si el caso se plantea, se pregunta al sacerdote antes y no después: cuando ya está hecho, las opciones se reducen.',
      ],
      disputed:
        'No hay una norma pan-ortodoxa. Unas Iglesias locales la prohíben y otras la toleran con condiciones; conviene consultar en la propia jurisdicción.',
    },
    {
      id: 'reencarnacion',
      question: '¿Y la reencarnación?',
      level: 'nuevo',
      answer: [
        'No es compatible con la fe cristiana, y la Iglesia lo ha dicho de manera formal. El Quinto Concilio Ecuménico, en 553, condenó la preexistencia de las almas en la forma que le había dado Orígenes, y con ella la idea de vidas sucesivas.',
        'La razón de fondo no es una prohibición arbitraria. El cristianismo sostiene que cada persona es única e irrepetible, que su cuerpo forma parte de lo que es y no es un envase intercambiable, y que lo que espera al final no es escapar del cuerpo sino recuperarlo: la resurrección de la carne, que está en el Credo. Una serie de reencarnaciones convierte al cuerpo en accidente y a la persona en algo pasajero.',
        'La Escritura lo dice en una línea: está establecido que los hombres mueran una sola vez, y después el juicio.',
      ],
      scripture: ['Hebreos 9, 27'],
    },
    {
      id: 'astrologia',
      question: '¿Y el horóscopo, el tarot, la energía, los amuletos?',
      level: 'nuevo',
      answer: [
        'La Iglesia lo prohíbe, y con más severidad de la que hoy se supone. Los cánones antiguos apartaban de la comunión durante años a quien consultaba adivinos o llevaba amuletos, y ponían en el mismo grupo la astrología, la magia y los ensalmos. No es una preocupación medieval: los sacerdotes se lo siguen encontrando a diario.',
        'El motivo no es que la Iglesia crea que esas cosas funcionan. Es que buscar el futuro o la protección por esa vía es cambiar de sitio la confianza: se sustituye una relación con alguien por una técnica para controlar lo que va a pasar. Y donde algo sí ocurre, la tradición avisa de que no todo lo que responde es bueno.',
        'Esto incluye los amuletos que se venden como cristianos: la cruz que se lleva al cuello no es un talismán y no protege por sí sola, ni el agua bendita funciona como un producto. La diferencia está en si se pide a alguien o se usa una cosa.',
      ],
      scripture: ['Deuteronomio 18, 10-12', 'Hechos 19, 19'],
    },
    {
      id: 'mujeres-sacerdocio',
      question: '¿Puede una mujer ser sacerdote?',
      level: 'iniciado',
      answer: [
        'No en la práctica de ninguna Iglesia ortodoxa, y no hay indicios de que vaya a cambiar. El sacerdocio y el episcopado se confieren sólo a varones, y el argumento tradicional es que el sacerdote actúa en la Liturgia representando a Cristo, con toda la carga que la tradición da a la encarnación en un varón concreto. Hay quien sostiene que ese argumento es más débil de lo que parece, pero la práctica es unánime.',
        'El diaconado femenino es otra cosa y conviene no confundirlo. Existió con toda seguridad en la Iglesia antigua: hay diaconisas ordenadas con imposición de manos dentro del altar, con un rito que se conserva en los eucologios, y san Pablo nombra a una, Febe. Desapareció en el segundo milenio por razones prácticas, no doctrinales.',
        'Su restauración se discute desde hace un siglo. El Patriarcado de Alejandría ordenó diaconisas en 2017 para las misiones africanas; la Iglesia de Grecia lo ha estudiado formalmente; otras Iglesias no se han pronunciado. Es una de las cuestiones abiertas de la ortodoxia contemporánea.',
      ],
      disputed:
        'El sacerdocio femenino no está en discusión práctica en ninguna Iglesia ortodoxa. El diaconado femenino sí lo está, y hay Iglesias locales que ya lo han restaurado y otras que lo rechazan.',
    },
    {
      id: 'reliquias-milagros',
      question: '¿Hay que creer en los milagros y en las reliquias?',
      level: 'catecumeno',
      answer: [
        'Hay que creer que Dios puede obrar y obra en la materia: eso sí, y es la base de todo lo demás, incluidos los sacramentos. Si el pan y el vino pueden ser el cuerpo de Cristo, un hueso o una tabla pintada pueden ser cauce de algo.',
        'Lo que no hay que creer es cada relato concreto. Ningún milagro particular es artículo de fe, ninguna reliquia obliga a nadie, y la Iglesia nunca ha exigido creer que un icono llorara en tal sitio y tal año. Los obispos investigan estos casos y con frecuencia los desmienten.',
        'La propia tradición desconfía de quien busca lo extraordinario. Los Padres del desierto trataban los prodigios con recelo y a los que los perseguían, con dureza. San Silvano y san Paisios, dos hombres a quienes se atribuyen muchos, insistieron toda su vida en que lo importante era otra cosa.',
      ],
      undefined_:
        'La autenticidad de un milagro concreto no es materia de fe. Se puede ser plenamente ortodoxo dudando de casi todos ellos.',
    },
    {
      id: 'convertido-rigor',
      question: 'Me acabo de convertir y quiero hacerlo todo bien. ¿Por dónde no empezar?',
      level: 'catecumeno',
      answer: [
        'Por el rigor. Es el aviso que más repiten los sacerdotes a los recién llegados, y hay hasta un nombre para el fenómeno: la enfermedad del converso. Consiste en ayunar más que los monjes, adoptar en dos meses una regla de oración que ni un monje sostiene, corregir a los que llevan cuarenta años dentro y acabar agotado o amargado antes del año.',
          'La tradición manda lo contrario: empezar por poco y sostenerlo. Una regla corta que se cumple todos los días vale más que una larga que se abandona en marzo. El ayuno se ajusta con el confesor y no se copia de un libro para monjes del siglo VII.',
        'Y el otro aviso, más incómodo: la Iglesia que te vas a encontrar tiene gente difícil, parroquias mal llevadas y discusiones tontas, como cualquier sitio con personas dentro. Quien entra buscando una comunidad perfecta se marcha en dos años. Quien entra buscando a Cristo se queda aunque la comunidad falle.',
      ],
      seeAlso: [{ label: 'Cuando no sale rezar', path: '/orar/oraciones/cuando-no-sale-rezar' }],
    },
  ],
};
