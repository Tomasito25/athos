/**
 * Oficios divinos.
 *
 * ATHOS incorpora la estructura completa de cada oficio —que es un dato
 * documentado— y los textos que se han podido verificar: diaconías, respuestas
 * del pueblo y exclamaciones. Las oraciones sacerdotales largas y los propios
 * variables se marcan como pendientes en lugar de transcribirse de memoria.
 *
 * El propósito de esta sección es seguir el oficio, no sustituir al libro
 * litúrgico del celebrante.
 */
import type { Office, OfficeSection, SourceMeta, TextBlock } from '@/types';
import { OFFICE_ABOUT } from './hymns-about';
import { HORAS_OFFICES, HORAS_RESUMEN } from './horas';

const meta: SourceMeta = {
  source: 'Ieratikón y Horologion bizantinos; textos de uso tradicional',
  tradition: 'Rito bizantino',
  language: 'es',
  license: 'traditional',
  copyright: 'Textos litúrgicos tradicionales, de dominio público en su original griego.',
  dateAdded: '2026-01-01',
  notes: 'Se incluyen la estructura del oficio y las partes cantadas por el pueblo y el coro.',
};

const t = (content: string): TextBlock => ({ kind: 'text', content });
const rub = (content: string): TextBlock => ({ kind: 'rubric', content });
const ref = (content: string): TextBlock => ({ kind: 'refrain', content });
const pending = (what: string): TextBlock => ({
  kind: 'pending',
  content: `Contenido pendiente de incorporar: ${what}`,
});

const section = (
  id: string,
  title: string,
  blocks: TextBlock[],
  voice?: OfficeSection['voice'],
): OfficeSection => ({ id, title, blocks, voice });

/* ============================================================
   Divina Liturgia de san Juan Crisóstomo
   ============================================================ */

const crisostomoSections: OfficeSection[] = [
  section('proscomidia', 'Proscomidia', [
    rub('Antes de la Liturgia, el sacerdote y el diácono preparan los dones en la prótesis. El pueblo aún no participa; entre tanto se leen las Horas.'),
    pending('las oraciones de la preparación de los dones.'),
  ], 'sacerdote'),

  section('bendicion-inicial', 'Bendición inicial', [
    rub('Diácono:'),
    t('Bendice, señor.'),
    rub('Sacerdote:'),
    t('Bendito sea el reino del Padre, y del Hijo, y del Espíritu Santo, ahora y siempre, y por los siglos de los siglos.'),
    ref('Amén.'),
  ]),

  section('gran-letania', 'Gran Letanía de la Paz', [
    rub('Diácono, y el coro responde «Señor, ten piedad» a cada petición:'),
    t('En paz, oremos al Señor.'),
    t('Por la paz de lo alto y por la salvación de nuestras almas, oremos al Señor.'),
    t('Por la paz del mundo entero, por la estabilidad de las santas Iglesias de Dios y por la unión de todos, oremos al Señor.'),
    t('Por esta santa casa y por quienes entran en ella con fe, piedad y temor de Dios, oremos al Señor.'),
    t('Por los que navegan, los que viajan, los enfermos, los que sufren, los cautivos, y por su salvación, oremos al Señor.'),
    t('Por que seamos librados de toda tribulación, ira, peligro y necesidad, oremos al Señor.'),
    t('Socórrenos, sálvanos, ten piedad de nosotros y guárdanos, oh Dios, por tu gracia.'),
    t('Conmemorando a la santísima, purísima, bendita y gloriosa Señora nuestra, la Theotokos y siempre Virgen María, junto con todos los santos, encomendémonos a nosotros mismos, unos a otros, y toda nuestra vida a Cristo Dios.'),
    ref('A Ti, Señor.'),
    rub('Exclamación del sacerdote:'),
    t('Porque a Ti corresponde toda gloria, honor y adoración: al Padre, y al Hijo, y al Espíritu Santo, ahora y siempre, y por los siglos de los siglos.'),
    ref('Amén.'),
  ]),

  section('antifonas', 'Antífonas', [
    rub('Se cantan tres antífonas, separadas por pequeñas letanías. En los domingos ordinarios se emplean los salmos típicos; en las fiestas, las antífonas propias.'),
    t('Por las oraciones de la Theotokos, Salvador, sálvanos.'),
    rub('Segunda antífona, seguida del himno:'),
    t('Hijo unigénito y Verbo de Dios, que siendo inmortal te dignaste, por nuestra salvación, encarnarte de la santa Theotokos y siempre Virgen María, y sin cambiar te hiciste hombre; y crucificado, oh Cristo Dios, con tu muerte venciste a la muerte: siendo uno de la santa Trinidad, glorificado con el Padre y el Espíritu Santo, sálvanos.'),
    rub('Tercera antífona: las Bienaventuranzas o los versículos propios de la fiesta.'),
  ]),

  section('pequena-entrada', 'Pequeña Entrada', [
    rub('Se lleva en procesión el Evangeliario. Diácono:'),
    t('¡Sabiduría! ¡De pie!'),
    ref('Venid, adoremos y postrémonos ante Cristo. Sálvanos, Hijo de Dios, que resucitaste de entre los muertos, a los que te cantamos: ¡Aleluya!'),
    rub('Se cantan los troparios y kontakia del día.'),
  ]),

  section('trisagio', 'Himno Trisagio', [
    ref('Santo Dios, Santo Fuerte, Santo Inmortal, ten piedad de nosotros. <em>(tres veces)</em>'),
    t('Gloria al Padre, y al Hijo, y al Espíritu Santo, ahora y siempre, y por los siglos de los siglos. Amén.'),
    ref('Santo Inmortal, ten piedad de nosotros.'),
    ref('Santo Dios, Santo Fuerte, Santo Inmortal, ten piedad de nosotros.'),
    rub('En Pascua, Navidad, Teofanía, Pentecostés y el Sábado Santo se canta en su lugar: «Cuantos habéis sido bautizados en Cristo, de Cristo os habéis revestido. Aleluya». En la Exaltación de la Cruz: «Ante tu Cruz nos postramos, Soberano».'),
  ]),

  section('lecturas', 'Lecturas', [
    rub('Diácono:'),
    t('¡Atendamos! ¡Sabiduría! ¡Atendamos!'),
    rub('Se canta el prokímenon, se lee el Apóstol, se canta el Aleluya y se proclama el Evangelio. Las lecturas del día se muestran en la pantalla de Inicio y en el Calendario.'),
    ref('Gloria a Ti, Señor, gloria a Ti.'),
  ]),

  section('letania-ferviente', 'Letanía ferviente y letanía de los catecúmenos', [
    rub('Diácono; el coro responde «Señor, ten piedad» tres veces a cada petición:'),
    t('Digamos todos con toda el alma y con todo el entendimiento, digamos.'),
    t('Señor todopoderoso, Dios de nuestros padres, te rogamos: escúchanos y ten piedad.'),
    rub('Después, la letanía por los catecúmenos y su despedida.'),
    t('Cuantos sois catecúmenos, salid. Que ninguno de los catecúmenos permanezca.'),
  ]),

  section('gran-entrada', 'Gran Entrada · Himno Querúbico', [
    ref('Nosotros, que místicamente representamos a los querubines y cantamos el himno tres veces santo a la Trinidad vivificante, dejemos ahora toda preocupación mundana.'),
    rub('Se lleva en procesión el pan y el vino desde la prótesis al altar. Después:'),
    ref('Para recibir al Rey de todos, escoltado invisiblemente por los ejércitos angélicos. ¡Aleluya, aleluya, aleluya!'),
    rub('El Jueves Santo y el Sábado Santo se cantan himnos propios en lugar del Querúbico.'),
  ]),

  section('credo', 'El beso de la paz y el Símbolo de la Fe', [
    rub('Diácono:'),
    t('Amémonos los unos a los otros, para que en un mismo espíritu confesemos.'),
    ref('Al Padre, y al Hijo, y al Espíritu Santo: Trinidad consustancial e indivisible.'),
    rub('Diácono:'),
    t('¡Las puertas, las puertas! ¡Con sabiduría, atendamos!'),
    rub('El pueblo recita el Símbolo de la Fe. El texto completo está en Orar → Oraciones → Otras.'),
  ]),

  section('anafora', 'Anáfora', [
    rub('Diácono:'),
    t('Estemos en pie con dignidad, estemos con temor, atendamos para ofrecer en paz la santa oblación.'),
    ref('Misericordia de paz, sacrificio de alabanza.'),
    rub('Sacerdote:'),
    t('La gracia de nuestro Señor Jesucristo, el amor de Dios Padre y la comunión del Espíritu Santo sean con todos vosotros.'),
    ref('Y con tu espíritu.'),
    t('Elevemos los corazones.'),
    ref('Los tenemos levantados hacia el Señor.'),
    t('Demos gracias al Señor.'),
    ref('Es digno y justo adorar al Padre, al Hijo y al Espíritu Santo: Trinidad consustancial e indivisible.'),
    rub('Sigue la oración de la Anáfora, que culmina en:'),
    ref('Santo, santo, santo es el Señor Sabaot. Llenos están el cielo y la tierra de tu gloria. ¡Hosanna en las alturas! ¡Bendito el que viene en el nombre del Señor! ¡Hosanna en las alturas!'),
    rub('Palabras de la institución:'),
    t('Tomad, comed: esto es mi Cuerpo, que por vosotros es partido para el perdón de los pecados.'),
    ref('Amén.'),
    t('Bebed de él todos: esta es mi Sangre de la nueva alianza, que por vosotros y por muchos es derramada para el perdón de los pecados.'),
    ref('Amén.'),
    t('Lo tuyo, de lo tuyo, te ofrecemos, en todo y por todo.'),
    ref('A Ti te cantamos, a Ti te bendecimos, a Ti te damos gracias, Señor, y te rogamos, Dios nuestro.'),
    rub('Epíclesis: el sacerdote invoca al Espíritu Santo sobre los dones. Después:'),
    ref('Digno es en verdad bendecirte a Ti, Theotokos, siempre bienaventurada y toda pura, y Madre de nuestro Dios. Más venerable que los querubines e incomparablemente más gloriosa que los serafines, tú que sin mancha diste a luz al Verbo de Dios: verdadera Theotokos, te magnificamos.'),
  ]),

  section('comunion', 'Comunión', [
    rub('Se canta el Padre Nuestro. Después, el sacerdote eleva el pan:'),
    t('Las cosas santas, para los santos.'),
    ref('Uno solo es Santo, uno solo es Señor: Jesucristo, para gloria de Dios Padre. Amén.'),
    rub('Se canta el koinonikón, el versículo de comunión del día. Al acercarse los fieles:'),
    t('Creo, Señor, y confieso que Tú eres en verdad el Cristo, el Hijo de Dios vivo…'),
    rub('El texto íntegro está en Orar → Oraciones → Preparación para la comunión.'),
    ref('Hemos visto la luz verdadera, hemos recibido el Espíritu celestial, hemos hallado la fe verdadera, adorando a la Trinidad indivisible, porque ella nos ha salvado.'),
  ]),

  section('despedida', 'Acción de gracias y despedida', [
    rub('Diácono:'),
    t('En paz, salgamos.'),
    ref('En el nombre del Señor.'),
    rub('Oración detrás del ambón, y después:'),
    ref('Sea bendito el nombre del Señor, desde ahora y por siempre. <em>(tres veces)</em>'),
    rub('El sacerdote da la despedida y se reparte el antídoron.'),
  ]),
];

/* ============================================================
   Vísperas
   ============================================================ */

const visperasSections: OfficeSection[] = [
  section('inicio', 'Comienzo', [
    rub('Sacerdote:'),
    t('Bendito sea nuestro Dios, siempre, ahora y por los siglos de los siglos.'),
    ref('Amén.'),
    rub('Comienzo habitual: Rey celestial, Trisagio, Padre Nuestro.'),
  ]),
  section('salmo-103', 'Salmo introductorio', [
    rub('Se lee o canta el salmo 103, el salmo de la creación: «Bendice, alma mía, al Señor…». El texto íntegro está en Leer → Salterio → Salmo 103.'),
  ]),
  section('letania-paz', 'Gran Letanía', [
    rub('La misma Letanía de la Paz de la Divina Liturgia.'),
  ]),
  section('senor-clame', 'Señor, a Ti clamé', [
    ref('Señor, a Ti clamé: escúchame. Escúchame, Señor.'),
    ref('Suba mi oración como el incienso ante Ti; el alzar de mis manos, como sacrificio vespertino.'),
    rub('Se intercalan los estijirá propios del día.'),
  ]),
  section('luz-alegre', 'Himno de la luz vespertina', [
    t('Luz alegre de la santa gloria del Padre inmortal, celestial, santo, bienaventurado: Jesucristo. Llegados al ocaso del sol y viendo la luz de la tarde, cantamos al Padre, al Hijo y al Espíritu Santo, Dios. Digno eres de ser cantado en todo tiempo por voces santas, oh Hijo de Dios, que das la vida; por eso el mundo te glorifica.'),
    rub('Es uno de los himnos cristianos más antiguos que se siguen cantando; ya san Basilio lo cita en el siglo IV como venerable y de autor desconocido.'),
  ]),
  section('nunc-dimittis', 'Cántico de san Simeón y despedida', [
    t('Ahora, Señor, despides a tu siervo en paz, según tu palabra; porque han visto mis ojos tu salvación, la que has preparado ante la faz de todos los pueblos: luz para iluminar a las naciones y gloria de tu pueblo Israel.'),
    rub('Trisagio, tropario del día y despedida.'),
  ]),
];

/* ============================================================
   Fichas de los demás oficios
   ============================================================ */

interface OfficeSeed {
  id: string;
  title: string;
  subtitle?: string;
  kind: Office['kind'];
  sections: OfficeSection[];
  status: Office['status'];
  note?: string;
}

const seeds: OfficeSeed[] = [
  { id: 'liturgia-crisostomo', title: 'Divina Liturgia de san Juan Crisóstomo', subtitle: 'La que se celebra la mayor parte del año', kind: 'liturgia', sections: crisostomoSections, status: 'partial' },
  {
    id: 'liturgia-basilio',
    title: 'Divina Liturgia de san Basilio el Grande',
    subtitle: 'Diez veces al año',
    kind: 'liturgia',
    status: 'partial',
    sections: [
      section('estructura', 'Estructura', [
        rub('Se celebra los cinco domingos de la Gran Cuaresma, el Jueves y el Sábado Santos, las vísperas de Navidad y Teofanía, y el 1 de enero, fiesta del santo.'),
        t('La estructura visible es la misma de la Liturgia de san Juan Crisóstomo. Lo que cambia son las oraciones sacerdotales, mucho más extensas, y algunos himnos.'),
        t('En lugar de «Digno es en verdad» se canta: «En ti se alegra, oh llena de gracia, toda la creación».'),
        pending('las oraciones propias de la anáfora de san Basilio.'),
      ]),
    ],
  },
  {
    id: 'presantificados',
    title: 'Liturgia de los Dones Presantificados',
    subtitle: 'Vísperas con comunión, propia de la Gran Cuaresma',
    kind: 'liturgia',
    status: 'partial',
    sections: [
      section('sentido', 'Qué es', [
        t('No es una Liturgia eucarística: no hay consagración. Se comulga de los dones consagrados el domingo anterior. Se celebra los miércoles y viernes de la Gran Cuaresma y algunos otros días, siempre por la tarde, tras un día de ayuno.'),
        rub('Atribuida a san Gregorio Dialogo, papa de Roma.'),
      ]),
      section('himnos', 'Himnos propios', [
        t('Suba mi oración como el incienso ante Ti; el alzar de mis manos, como sacrificio vespertino.'),
        rub('En lugar del Querúbico se canta:'),
        t('Ahora las Potestades celestiales invisiblemente concelebran con nosotros, pues he aquí que entra el Rey de la gloria. He aquí que es escoltado el sacrificio místico ya consumado. Acerquémonos con fe y amor para hacernos partícipes de la vida eterna. ¡Aleluya!'),
        pending('el resto del oficio.'),
      ]),
    ],
  },
  { id: 'visperas', title: 'Vísperas', subtitle: 'Hesperinós — el oficio con que empieza el día litúrgico', kind: 'visperas', sections: visperasSections, status: 'partial' },
  {
    id: 'maitines',
    title: 'Maitines',
    subtitle: 'Orthros — el oficio de la mañana',
    kind: 'maitines',
    status: 'partial',
    sections: [
      section('estructura', 'Estructura', [
        t('Salmos del rey, gran letanía, «Dios es el Señor» con los troparios, los kathismata del Salterio, el polieleos en las fiestas, el Evangelio matutino, el canon de nueve odas, los salmos de alabanza y la Gran Doxología.'),
      ]),
      section('exapsalmos', 'Los Seis Salmos', [
        rub('Se leen en silencio y a media luz los salmos 3, 37, 62, 87, 102 y 142. Está prohibido moverse por la iglesia durante su lectura.'),
        rub('Los seis salmos están en Leer → Salterio.'),
      ]),
      section('doxologia', 'Gran Doxología', [
        t('Gloria a Dios en las alturas, y en la tierra paz, benevolencia entre los hombres. Te alabamos, te bendecimos, te adoramos, te glorificamos, te damos gracias por tu gran gloria.'),
        pending('el texto completo de la Gran Doxología.'),
      ]),
    ],
  },
  {
    id: 'completas',
    title: 'Completas',
    subtitle: 'Apódeipnon — después de la cena',
    kind: 'completas',
    status: 'partial',
    sections: [
      section('estructura', 'Estructura', [
        t('Hay unas Completas Pequeñas, de uso diario, y unas Grandes, propias de la Gran Cuaresma y de las vigilias de las grandes fiestas.'),
        rub('En las Grandes Completas se canta el «Dios está con nosotros» y, en Cuaresma, el Canon de san Andrés de Creta.'),
        t('Que Dios esté con nosotros: entendedlo, naciones, y someteos, porque Dios está con nosotros.'),
        pending('el texto completo de las Completas Pequeñas y Grandes.'),
      ]),
      section('salmo-90', 'Salmo de protección', [
        rub('Las Completas incluyen el salmo 90, «El que habita al abrigo del Altísimo». Está en Leer → Salterio → Salmo 90.'),
      ]),
    ],
  },
  {
    id: 'medianoche',
    title: 'Oficio de Medianoche',
    subtitle: 'Mesonyktikón',
    kind: 'medianoche',
    status: 'partial',
    sections: [
      section('sentido', 'Por qué a medianoche', [
        rub('Se reza al levantarse de noche, esperando al Esposo que llega a medianoche. En los monasterios abre el ciclo diario: es el primer oficio del día, antes de Maitines.'),
      ]),
      section('comienzo', 'Comienzo habitual', [
        rub('Se empieza como toda regla: Trisagio, Padre Nuestro y las oraciones iniciales.'),
        rub('El texto completo está en Orar → Oraciones → Comienzo habitual.'),
      ]),
      section('salmo-50', 'Salmo 50', [
        rub('El salmo del arrepentimiento, que abre casi todos los oficios.'),
        rub('Se lee entero. Está en Leer → Salterio → Salmo 50.'),
      ]),
      section('kathisma-17', 'Salmo 118', [
        rub('El salmo más largo del Salterio, la kathisma decimoséptima, dividida en tres estasis. Es el corazón del oficio los días de diario.'),
        rub('Está en Leer → Salterio → Kathisma 17.'),
        rub('Los domingos se sustituye por el canon a la Santísima Trinidad, del Octoecos, cuyo texto no está incorporado todavía.'),
      ]),
      section('simbolo', 'Símbolo de la Fe', [
        rub('Se recita entero. Está en Orar → Oraciones → Símbolo de la Fe.'),
      ]),
      section('propios', 'Troparios y oraciones del oficio', [
        pending('los troparios de compunción y la oración de san Marcos el Monje.'),
      ]),
      section('difuntos', 'Conmemoración de los difuntos', [
        rub('El oficio de Medianoche termina cada día con una conmemoración de los difuntos: en la tradición monástica es el momento fijo en que se reza por ellos.'),
        t('Acuérdate, Señor, de los que se han dormido en la esperanza de la resurrección y de la vida eterna, y da descanso a sus almas donde brilla la luz de tu rostro.'),
        rub('Traducción para ATHOS a partir del uso corriente del oficio; no procede de un libro litúrgico español publicado.'),
      ]),
    ],
  },
  {
    id: 'horas',
    title: 'Las Horas',
    subtitle: 'Primera, Tercera, Sexta y Novena',
    kind: 'horas',
    status: 'partial',
    sections: [
      section('sentido', 'Las cuatro horas del día', [
        rub('El día antiguo se contaba desde el amanecer y se marcaba de tres en tres horas. La Iglesia rezó en esas cuatro señales, y a cada una le quedó la memoria de un momento de la Pasión o de Pentecostés.'),
        rub('Las cuatro tienen la misma forma: tres salmos fijos, el tropario propio de la hora con su theotokion, el Trisagio, cuarenta veces «Señor, ten piedad», la oración de toda hora y una oración final distinta en cada una.'),
        t('Cada una está entera en su propia ficha. Aquí van las cuatro de un vistazo, para saber cuál toca.'),
      ]),
      section('prima', 'Hora Primera', [
        rub(HORAS_RESUMEN.find((x) => x.id === 'hora-primera')!.cuando),
        t(HORAS_RESUMEN.find((x) => x.id === 'hora-primera')!.memoria),
        rub(`Salmos ${HORAS_RESUMEN.find((x) => x.id === 'hora-primera')!.salmos.join(', ')}. El oficio entero está en Biblioteca → Liturgia → Hora Primera.`),
      ]),
      section('tercia', 'Hora Tercera', [
        rub(HORAS_RESUMEN.find((x) => x.id === 'hora-tercera')!.cuando),
        t(HORAS_RESUMEN.find((x) => x.id === 'hora-tercera')!.memoria),
        rub(`Salmos ${HORAS_RESUMEN.find((x) => x.id === 'hora-tercera')!.salmos.join(', ')}. El oficio entero está en Biblioteca → Liturgia → Hora Tercera.`),
      ]),
      section('sexta', 'Hora Sexta', [
        rub(HORAS_RESUMEN.find((x) => x.id === 'hora-sexta')!.cuando),
        t(HORAS_RESUMEN.find((x) => x.id === 'hora-sexta')!.memoria),
        rub(`Salmos ${HORAS_RESUMEN.find((x) => x.id === 'hora-sexta')!.salmos.join(', ')}. El oficio entero está en Biblioteca → Liturgia → Hora Sexta.`),
      ]),
      section('nona', 'Hora Novena', [
        rub(HORAS_RESUMEN.find((x) => x.id === 'hora-novena')!.cuando),
        t(HORAS_RESUMEN.find((x) => x.id === 'hora-novena')!.memoria),
        rub(`Salmos ${HORAS_RESUMEN.find((x) => x.id === 'hora-novena')!.salmos.join(', ')}. El oficio entero está en Biblioteca → Liturgia → Hora Novena.`),
      ]),
    ],
  },
  {
    id: 'moleben',
    title: 'Moleben',
    subtitle: 'Oficio de súplica',
    kind: 'moleben',
    status: 'partial',
    sections: [
      section('sentido', 'Cuándo se pide', [
        rub('Oficio breve de intercesión que se celebra por una necesidad concreta: por un enfermo, por los que viajan, al empezar el curso o una obra, o en acción de gracias. Se pide al sacerdote y dura entre veinte minutos y media hora.'),
      ]),
      section('orden', 'Cómo va', [
        rub('1. Bendición inicial y la gran letanía de la paz.'),
        rub('2. «Dios es el Señor» con el tropario del santo o de la necesidad por la que se pide.'),
        rub('3. Salmo 50 (Leer → Salterio → Salmo 50).'),
        rub('4. El canon del santo o de la ocasión, con sus odas.'),
        rub('5. Evangelio.'),
        rub('6. Letanía intensa, con los nombres de aquellos por quienes se pide.'),
        rub('7. Oración de súplica del sacerdote y despedida.'),
      ]),
      section('letania', 'La letanía intensa', [
        rub('Es el momento en que se leen los nombres. El coro responde a cada petición:'),
        ref('Señor, ten piedad. <em>(tres veces)</em>'),
        rub('Los nombres se entregan por escrito antes de empezar, de bautismo y sin apellidos.'),
      ]),
      section('propios', 'Lo que cambia según la ocasión', [
        pending('los cánones y las oraciones propias de cada moleben: por los enfermos, por los viajeros, de acción de gracias.'),
      ]),
    ],
  },
  {
    id: 'paraclesis',
    title: 'Paráclesis a la Theotokos',
    subtitle: 'Canon de súplica',
    kind: 'paraclesis',
    status: 'partial',
    sections: [
      section('sentido', 'Qué es', [
        rub('Canon de súplica a la Madre de Dios en la aflicción. Hay dos: la Pequeña Paráclesis, que se canta durante las dos primeras semanas de agosto en el ayuno de la Dormición, y la Grande, que se alterna con ella. La Pequeña puede rezarla un laico en casa, y es de los oficios que más se rezan fuera del templo.'),
      ]),
      section('orden', 'Cómo va', [
        rub('1. Comienzo habitual y salmo 142 (Leer → Salterio → Salmo 142).'),
        rub('2. «Dios es el Señor» y los troparios a la Theotokos.'),
        rub('3. Salmo 50.'),
        rub('4. El canon, en ocho odas, con su estribillo repetido en cada tropario.'),
        rub('5. Evangelio y la letanía con los nombres de los vivos.'),
        rub('6. Despedida.'),
      ]),
      section('estribillo', 'El estribillo del canon', [
        rub('Se repite antes de cada tropario del canon, y es lo que da nombre al oficio:'),
        ref('Santísima Theotokos, sálvanos.'),
      ]),
      section('propios', 'El texto del canon', [
        pending('los troparios de las ocho odas del canon, obra de Teosteriktos el Monje en el siglo IX.'),
      ]),
    ],
  },
];

const plain = (sections: OfficeSection[]) =>
  sections
    .flatMap((s) => [s.title, ...s.blocks.filter((b) => b.kind !== 'pending').map((b) => b.content)])
    .join(' ')
    .replace(/<[^>]+>/g, '')
    .toLowerCase();

const base: Office[] = seeds.map((s, i) => ({
  ...OFFICE_ABOUT[s.id],
  id: s.id,
  title: s.title,
  subtitle: s.subtitle,
  kind: s.kind,
  order: i + 1,
  sections: s.sections,
  status: s.status,
  meta,
  searchText: `${s.title} ${s.subtitle ?? ''} ${plain(s.sections)}`,
}));

/**
 * Las cuatro Horas van detrás de «Las Horas», que es su portada.
 *
 * Se definen aparte —en `horas.ts`— porque las cuatro comparten esqueleto y
 * escribirlo cuatro veces a mano era pedir que se descolgaran entre sí.
 */
export const OFFICES: Office[] = [...base, ...HORAS_OFFICES];

export const OFFICE_KIND_LABELS: Record<Office['kind'], string> = {
  liturgia: 'Divina Liturgia',
  visperas: 'Vísperas',
  maitines: 'Maitines',
  completas: 'Completas',
  medianoche: 'Oficio de Medianoche',
  horas: 'Las Horas',
  moleben: 'Moleben',
  paraclesis: 'Paráclesis',
};

export const OFFICES_NOTE =
  'Esta biblioteca sirve para seguir el oficio, no para celebrarlo: no sustituye al ' +
  'Ieratikón del sacerdote ni a los libros de coro.';
