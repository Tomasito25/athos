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
    status: 'pending',
    sections: [
      section('ficha', 'Oficio de Medianoche', [
        rub('Se reza al levantarse de noche, en espera del Esposo que llega a medianoche. Incluye el salmo 118 los días de diario y el canon a la Trinidad los domingos.'),
        pending('el texto del oficio.'),
      ]),
    ],
  },
  {
    id: 'horas',
    title: 'Las Horas',
    subtitle: 'Primera, Tercera, Sexta y Novena',
    kind: 'horas',
    status: 'pending',
    sections: [
      section('ficha', 'Las Horas', [
        rub('Prima al amanecer, Tercia a media mañana (el descenso del Espíritu Santo), Sexta al mediodía (la Crucifixión) y Nona a media tarde (la muerte del Señor). Cada hora consta de tres salmos, un tropario y una oración.'),
        pending('el texto de las cuatro Horas.'),
      ]),
    ],
  },
  {
    id: 'moleben',
    title: 'Moleben',
    subtitle: 'Oficio de súplica',
    kind: 'moleben',
    status: 'pending',
    sections: [
      section('ficha', 'Moleben', [
        rub('Oficio breve de intercesión que puede celebrarse por una necesidad concreta: por los enfermos, por los que viajan, en acción de gracias, al comenzar el curso o una obra.'),
        pending('el texto del oficio.'),
      ]),
    ],
  },
  {
    id: 'paraclesis',
    title: 'Paráclesis a la Theotokos',
    subtitle: 'Canon de súplica',
    kind: 'paraclesis',
    status: 'pending',
    sections: [
      section('ficha', 'Paráclesis', [
        rub('Canon de súplica a la Madre de Dios. La Pequeña Paráclesis se canta durante las dos primeras semanas de agosto, en el ayuno de la Dormición, alternando con la Grande.'),
        pending('el texto del canon.'),
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

export const OFFICES: Office[] = seeds.map((s, i) => ({
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
