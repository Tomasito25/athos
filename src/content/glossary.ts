/**
 * Las palabras que hay que explicar.
 *
 * Una lección que dice «el Concilio proclamó a la Virgen Theotokos y con ello
 * defendió la unidad hipostática» está escrita para quien ya sabe. Quien no
 * lo sabe no puede ni preguntar, porque no sabe qué preguntar.
 *
 * Aquí está cada palabra que ATHOS usa y que no se aprende en la calle, con
 * dos definiciones: una de una línea, para salir del paso sin dejar de leer,
 * y otra más despacio donde hace falta.
 *
 * ## Cómo llega a las lecciones
 *
 * No se apunta a mano qué términos salen en cada lección: eso se descuelga a
 * la primera vez que alguien reescribe un párrafo. Se busca el término en el
 * texto —`termsIn`—, y así una lección enseña exactamente las palabras que
 * usa, ni una más ni una menos.
 */

export interface GlossaryTerm {
  id: string;
  /** Cómo se escribe normalmente. */
  term: string;
  /** Otras formas con que aparece en los textos de ATHOS. */
  aliases?: string[];
  /** Una línea: lo justo para seguir leyendo. */
  short: string;
  /** Lo que conviene añadir cuando hay tiempo. */
  long?: string;
}

export const GLOSSARY: GlossaryTerm[] = [
  /* ---- Lo que es la Iglesia ---- */
  {
    id: 'ortodoxia',
    term: 'ortodoxia',
    aliases: ['ortodoxo', 'ortodoxa', 'ortodoxos', 'ortodoxas'],
    short: 'Significa a la vez «recta doctrina» y «recta alabanza»: creer bien y alabar bien.',
    long: 'Del griego orthós, recto, y dóxa, que quiere decir las dos cosas —opinión y gloria—. Por eso en esta tradición no se separa lo que se cree de cómo se reza: son la misma palabra.',
  },
  {
    id: 'pentecostes',
    term: 'Pentecostés',
    short: 'El día en que el Espíritu Santo descendió sobre los apóstoles, cincuenta días después de Pascua.',
    long: 'Se cuenta en Hechos 2. La Iglesia lo considera su nacimiento: aquel día los apóstoles salieron a predicar y se bautizaron tres mil personas.',
  },
  {
    id: 'autocefala',
    term: 'autocéfala',
    aliases: ['autocefalia', 'autocéfalas', 'autocéfalo'],
    short: 'Iglesia local que elige a su propio primado y no depende de ninguna otra.',
    long: 'Literalmente «con cabeza propia». Las Iglesias autocéfalas comparten la misma fe y los mismos sacramentos, y sus obispos se reconocen entre sí; ninguna manda sobre otra. Conceder la autocefalia a una Iglesia nueva es de las decisiones que más conflicto causan.',
  },
  {
    id: 'patriarcado',
    term: 'patriarcado',
    aliases: ['patriarca', 'patriarcados'],
    short: 'Iglesia autocéfala cuyo primado lleva el título de patriarca.',
    long: 'Es un rango de honor, no un poder mayor: un patriarca no manda sobre las otras Iglesias. Los cinco antiguos —Roma, Constantinopla, Alejandría, Antioquía y Jerusalén— formaban la pentarquía.',
  },
  {
    id: 'primacia-honor',
    term: 'primacía de honor',
    short: 'Ser el primero en el orden, sin mandar sobre los demás.',
    long: 'Como el sitio en una mesa: el primero preside, convoca y habla en nombre de todos, pero no decide por ellos. La ortodoxia reconoce a Constantinopla esta primacía; la diferencia con la primacía de jurisdicción —poder de gobierno sobre las demás Iglesias— es el fondo de la separación con Roma.',
  },
  {
    id: 'sucesion-apostolica',
    term: 'sucesión apostólica',
    short: 'La cadena ininterrumpida de obispos ordenados por otros obispos desde los apóstoles.',
    long: 'No es sólo una lista de nombres: lo que se transmite con la imposición de manos es el ministerio y, con él, la fe recibida.',
  },
  {
    id: 'catolica',
    term: 'católica',
    aliases: ['katholikḗ', 'catolicidad'],
    short: 'En el Credo no significa «romana», sino «según el todo»: entera, completa.',
    long: 'Del griego kath’ hólon. Quiere decir que en la parroquia más pequeña está la Iglesia entera, no un trozo de ella. Por eso los ortodoxos rezan cada domingo que creen en la Iglesia «católica».',
  },

  /* ---- Los concilios y la doctrina ---- */
  {
    id: 'concilio-ecumenico',
    term: 'Concilio Ecuménico',
    aliases: ['concilio ecuménico', 'concilios ecuménicos'],
    short: 'Reunión de obispos de toda la Iglesia cuyas decisiones ésta reconoce después como suyas.',
    long: 'La ortodoxia reconoce siete, de Nicea (325) a Nicea II (787). Lo que hace ecuménico a un concilio no es quién lo convocó ni cuántos fueron, sino que la Iglesia entera acabara recibiendo lo que definió: hubo concilios muy concurridos que fueron rechazados después.',
  },
  {
    id: 'theotokos',
    term: 'Theotokos',
    aliases: ['Madre de Dios'],
    short: '«La que dio a luz a Dios». El título de la Virgen definido en Éfeso (431).',
    long: 'No es en primer lugar una afirmación sobre María, sino sobre Cristo: si el que nació de ella es Dios, ella es Madre de Dios. Negarlo —como hizo Nestorio, que prefería «Madre de Cristo»— era, para el Concilio, partir a Cristo en dos.',
  },
  {
    id: 'homoousios',
    term: 'consustancial',
    aliases: ['homooúsios', 'homoousios'],
    short: 'De la misma sustancia que el Padre. Es la palabra clave del Credo de Nicea.',
    long: 'Se eligió precisamente porque los arrianos no podían firmarla en su sentido: decía que el Hijo no es una criatura excelsa, sino Dios del mismo modo que el Padre. Costó cinco destierros a san Atanasio.',
  },
  {
    id: 'filioque',
    term: 'Filioque',
    short: 'La palabra «y del Hijo» que Occidente añadió al Credo. Es uno de los dos puntos de la separación.',
    long: 'Dos objeciones distintas y conviene no mezclarlas. La de forma: el Credo lo fijó un Concilio Ecuménico y nadie puede cambiarlo por su cuenta. La de fondo: para Oriente, hacer proceder al Espíritu también del Hijo desdibuja que el Padre es el único origen dentro de la Trinidad.',
  },
  {
    id: 'hipostasis',
    term: 'hipóstasis',
    aliases: ['hipostática', 'hipostático'],
    short: 'La persona concreta, frente a la naturaleza, que es lo que se es.',
    long: 'Cristo es una hipóstasis —una persona— en dos naturalezas, divina y humana. La Trinidad es al revés: tres hipóstasis en una sola naturaleza. Casi todas las discusiones de los primeros siglos son sobre cómo usar bien estas dos palabras.',
  },
  {
    id: 'calcedonia',
    term: 'Calcedonia',
    aliases: ['calcedonia', 'calcedonio'],
    short: 'El cuarto Concilio (451). Definió que Cristo es una persona en dos naturalezas.',
    long: 'Su fórmula —«sin confusión, sin cambio, sin división, sin separación»— no explica el misterio: pone las cuatro vallas fuera de las cuales se cae en un error. Quienes no la aceptaron formaron las Iglesias ortodoxas orientales.',
  },
  {
    id: 'apofatico',
    term: 'apofático',
    aliases: ['apofática', 'teología apofática'],
    short: 'Hablar de Dios diciendo lo que no es, porque lo que es supera lo que se puede decir.',
    long: 'Su contrario es el camino catafático, que afirma —Dios es bueno, sabio, justo—. La tradición usa los dos, pero da la última palabra al apofático: toda afirmación sobre Dios se queda corta.',
  },
  {
    id: 'teosis',
    term: 'teosis',
    aliases: ['deificación', 'endiosamiento'],
    short: 'Llegar a participar de la vida de Dios. Es lo que la ortodoxia entiende por salvación.',
    long: '«Dios se hizo hombre para que el hombre se hiciera dios», resumió san Atanasio. No significa volverse Dios por naturaleza —eso es imposible—, sino participar de sus energías, como el hierro en el fuego se pone al rojo sin dejar de ser hierro.',
  },
  {
    id: 'energias',
    term: 'energías increadas',
    aliases: ['energías divinas', 'esencia y energías'],
    short: 'Aquello de Dios en lo que se puede participar, distinto de su esencia, que es inaccesible.',
    long: 'La distinción la formuló san Gregorio Palamás en el siglo XIV para explicar cómo los hesicastas podían ver una luz que era realmente Dios sin que Dios dejara de ser incognoscible.',
  },

  /* ---- La vida de oración ---- */
  {
    id: 'hesicasmo',
    term: 'hesicasmo',
    aliases: ['hesicasta', 'hesicastas', 'hesicastas', 'hesiquía', 'Hesychía', 'hesychia'],
    short: 'La tradición de oración del silencio interior, ligada a la oración de Jesús.',
    long: 'De hesychía, quietud. No es estar callado, sino que se apague el ruido de dentro. Se practica repitiendo la oración de Jesús con atención, y en el siglo XIV fue objeto de una controversia que ganaron sus defensores.',
  },
  {
    id: 'oracion-jesus',
    term: 'oración de Jesús',
    aliases: ['oración del corazón'],
    short: '«Señor Jesucristo, Hijo de Dios, ten misericordia de mí, pecador», repetida sin prisa.',
    long: 'Es la oración más característica de la tradición ortodoxa. Se dice con el komboskini, un cordón de nudos que sirve para no llevar la cuenta con la cabeza.',
  },
  {
    id: 'komboskini',
    term: 'komboskini',
    aliases: ['chotki', 'cordón de nudos'],
    short: 'El cordón de nudos de lana con que se cuenta la oración de Jesús.',
    long: 'En ruso se llama chotki. No es un rosario —no hay misterios que meditar—: sirve para que la cuenta no la lleve la cabeza y ésta quede libre para la oración.',
  },
  {
    id: 'filocalia',
    term: 'Filocalia',
    short: 'La antología de textos sobre la oración del corazón, reunida en el Monte Athos y publicada en 1782.',
    long: 'La compilaron san Nicodemo el Hagiorita y san Macario de Corinto. Su traducción al eslavo y luego al ruso llevó el hesicasmo mucho más allá de los monasterios.',
  },
  {
    id: 'nepsis',
    term: 'nepsis',
    aliases: ['sobriedad'],
    short: 'La vigilancia sobre los propios pensamientos: mirar lo que entra antes de dejarlo pasar.',
  },
  {
    id: 'metania',
    term: 'metania',
    aliases: ['metanoia', 'metanias'],
    short: 'La inclinación o postración que acompaña a la oración; también, el cambio de la mente que es el arrepentimiento.',
  },

  /* ---- El culto y sus libros ---- */
  {
    id: 'liturgia',
    term: 'Divina Liturgia',
    short: 'La celebración de la Eucaristía en el rito bizantino.',
    long: 'La que se usa casi todo el año es la de san Juan Crisóstomo; diez veces al año, la de san Basilio; y en Cuaresma, la de los Dones Presantificados, que no consagra sino que comulga de lo consagrado el domingo.',
  },
  {
    id: 'anafora',
    term: 'anáfora',
    short: 'La gran oración eucarística, el corazón de la Liturgia.',
  },
  {
    id: 'epiclesis',
    term: 'epíclesis',
    short: 'La invocación del Espíritu Santo sobre el pan y el vino dentro de la anáfora.',
  },
  {
    id: 'horologion',
    term: 'Horologion',
    short: 'El libro de las horas: qué se reza a cada hora del día.',
  },
  {
    id: 'menaion',
    term: 'Menaion',
    short: 'Los doce libros con los textos propios de cada día del año fijo, santo por santo.',
  },
  {
    id: 'octoecos',
    term: 'Octoecos',
    aliases: ['Octoeco'],
    short: 'El libro de los ocho tonos, que rige el ciclo semanal del canto.',
  },
  {
    id: 'triodion',
    term: 'Triodion',
    short: 'El libro de la Gran Cuaresma, desde tres domingos antes hasta el Sábado Santo.',
  },
  {
    id: 'pentecostario',
    term: 'Pentecostario',
    short: 'El libro del tiempo pascual, de Pascua a Pentecostés.',
  },
  {
    id: 'typikon',
    term: 'Typikón',
    short: 'El reglamento que dice cómo se combinan todos los libros cada día concreto.',
  },
  {
    id: 'tropario',
    term: 'tropario',
    aliases: ['troparios'],
    short: 'Estrofa breve que resume lo que se celebra ese día.',
    long: 'Cada fiesta y cada santo tiene el suyo, llamado apolytíkion. Cuando no se dispone del propio de un santo, la Iglesia canta el general de su rango: el de los mártires, el de los obispos, el de los monjes.',
  },
  {
    id: 'kontakion',
    term: 'kontakion',
    aliases: ['kontakia'],
    short: 'Otra estrofa propia del día, que suele decir lo mismo desde otro ángulo.',
  },
  {
    id: 'kathisma',
    term: 'kathisma',
    aliases: ['kathismata'],
    short: 'Cada una de las veinte partes en que se divide el Salterio para leerlo por turnos.',
  },
  {
    id: 'akathistos',
    term: 'akathistos',
    short: 'Himno largo que se canta de pie: eso significa su nombre, «no sentados».',
  },
  {
    id: 'iconostasio',
    term: 'iconostasio',
    short: 'El muro de iconos que separa el altar de la nave, con tres puertas.',
    long: 'No esconde el altar: lo muestra en imágenes. Las puertas centrales se llaman reales, y por ellas sale el cáliz.',
  },
  {
    id: 'prosfora',
    term: 'prósfora',
    short: 'El pan que se lleva para la Liturgia, con un sello impreso.',
  },
  {
    id: 'antidoron',
    term: 'antídoron',
    short: 'El pan bendito que se reparte al final, y que puede tomar cualquiera.',
    long: 'Significa «en lugar del don»: no es la Comunión, y por eso lo pueden recibir también los que no han comulgado.',
  },
  {
    id: 'synaxarion',
    term: 'sinaxario',
    aliases: ['synaxarion'],
    short: 'El libro que recoge qué santo se conmemora cada día.',
  },
];

/* ============================================================
   Buscar los términos dentro de un texto
   ============================================================ */

const LETRA = /[\p{L}\p{M}\p{N}]/u;

const sinAcentos = (s: string) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '');

/** Todas las formas de cada término, de la más larga a la más corta. */
const FORMAS: Array<{ forma: string; termino: GlossaryTerm }> = GLOSSARY.flatMap((t) =>
  [t.term, ...(t.aliases ?? [])].map((forma) => ({ forma: sinAcentos(forma), termino: t })),
).sort((a, b) => b.forma.length - a.forma.length);

/**
 * Los términos del glosario que aparecen en un texto.
 *
 * Se compara sin acentos y comprobando a mano los límites de palabra: el `\b`
 * de JavaScript no considera letra a la «á», y partiría «hesicastas» por la
 * mitad. Cada término sale una sola vez aunque el texto lo repita.
 */
export function termsIn(texto: string): GlossaryTerm[] {
  const plano = sinAcentos(texto);
  const vistos = new Set<string>();
  const salida: GlossaryTerm[] = [];

  for (const { forma, termino } of FORMAS) {
    if (vistos.has(termino.id)) continue;
    let desde = 0;
    for (;;) {
      const i = plano.indexOf(forma, desde);
      if (i === -1) break;
      const antes = plano[i - 1];
      const despues = plano[i + forma.length];
      if (!(antes && LETRA.test(antes)) && !(despues && LETRA.test(despues))) {
        vistos.add(termino.id);
        salida.push(termino);
        break;
      }
      desde = i + 1;
    }
  }

  // En el orden en que se definieron, que agrupa por materia.
  return salida.sort((a, b) => GLOSSARY.indexOf(a) - GLOSSARY.indexOf(b));
}

export const GLOSSARY_NOTE =
  'Definiciones redactadas para ATHOS. Son explicaciones, no definiciones dogmáticas: ' +
  'sirven para poder seguir leyendo, no para zanjar una discusión teológica.';
