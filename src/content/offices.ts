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
import { HORAS_OFFICES, HORAS_RESUMEN, TODA_HORA } from './horas';

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
/** El salmo entero, tomado del Salterio de ATHOS al mostrarse. */
const psalm = (n: number): TextBlock => ({ kind: 'psalm', content: `Salmo ${n}`, ref: String(n) });
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
  section('revestimiento', 'La entrada y el revestimiento', [
    rub('Antes de preparar los dones, el sacerdote y el diácono se detienen ante las puertas del iconostasio, hacen tres inclinaciones y rezan las oraciones de entrada; después besan los iconos de Cristo y de la Theotokos y entran en el santuario diciendo:'),
    t('Entraré en tu casa, adoraré en tu santo templo con tu temor. Señor, guíame por tu justicia; por causa de mis enemigos, endereza delante de Ti mi camino.'),
    rub('Dentro, toman las vestiduras una a una, las bendicen, las besan y se revisten diciendo un versículo distinto para cada una. Casi todos son de los salmos, y no describen la prenda sino lo que significa llevarla.'),
    rub('Al ponerse el esticario, la túnica larga que llevan por igual el sacerdote, el diácono y el monaguillo:'),
    t('Se alegrará mi alma en el Señor, porque me ha vestido con vestidura de salvación y me ha cubierto con manto de alegría; como a esposo me ha puesto una corona y como a esposa me ha adornado con joyas.'),
    rub('Al ponerse el epitraquelio, la estola que cae desde el cuello y sin la cual el sacerdote no puede celebrar nada:'),
    t('Bendito sea Dios, que derrama su gracia sobre sus sacerdotes, como el ungüento sobre la cabeza, que desciende sobre la barba, la barba de Aarón, que desciende hasta el borde de su vestidura.'),
    rub('Al ceñirse el cinturón:'),
    t('Bendito sea Dios, que me ciñe de poder y hace intachable mi camino, que hace mis pies como de ciervo y me afirma sobre las alturas.'),
    rub('Al ponerse los puños, primero el derecho:'),
    t('Tu diestra, Señor, se ha glorificado en la fuerza; tu mano derecha, Señor, ha quebrantado a los enemigos, y con la abundancia de tu gloria has destrozado a los adversarios.'),
    rub('Y después el izquierdo:'),
    t('Tus manos me hicieron y me formaron; dame entendimiento y aprenderé tus mandamientos.'),
    rub('Si le corresponde llevarlo, al ponerse el epigonation, la pieza romboidal que cuelga del costado:'),
    t('Ciñe tu espada a la cintura, valeroso, en tu esplendor y tu hermosura; tiende tu arco, avanza y reina, por la verdad, la mansedumbre y la justicia; y tu diestra te guiará maravillosamente.'),
    rub('Al ponerse el felonio, la capa sin mangas que lo cubre todo:'),
    t('Tus sacerdotes, Señor, se vestirán de justicia y tus santos se llenarán de alegría, ahora y siempre, y por los siglos de los siglos. Amén.'),
    rub('Por último se lavan las manos, diciendo el salmo 25:'),
    t('Lavaré mis manos entre los inocentes y rodearé tu altar, Señor, para oír la voz de tu alabanza y contar todas tus maravillas. Señor, he amado la belleza de tu casa y el lugar donde habita tu gloria. No pierdas mi alma con los impíos ni mi vida con los hombres de sangre, en cuyas manos hay iniquidad y cuya diestra está llena de sobornos. Yo, en cambio, he caminado en mi inocencia; líbrame, Señor, y ten piedad de mí. Mi pie se mantiene en el camino recto; en las asambleas te bendeciré, Señor.'),
    rub('El diácono se reviste sólo con el esticario, el orario —la banda larga que lleva sobre el hombro izquierdo— y los puños, y pide antes la bendición del sacerdote.'),
    rub('Traducción para ATHOS a partir del original griego, que es de dominio público; no procede de un libro litúrgico español publicado.'),
  ], 'sacerdote'),

  section('proscomidia', 'Proscomidia', [
    rub('Antes de la Liturgia, el sacerdote y el diácono preparan los dones en la prótesis, una mesa a la izquierda del altar. El pueblo aún no participa; entre tanto se leen las Horas.'),
    rub('Del primero de los panes ofrecidos, la prósfora, el sacerdote corta con la lanza un cubo marcado con el sello IC XC NIKA: es el Cordero, que será consagrado. Mientras corta dice las palabras del profeta Isaías: «Como oveja fue llevado al matadero; como cordero sin mancha, mudo ante el que lo esquila, así no abrió su boca».'),
    rub('Después atraviesa el Cordero por el costado recordando el Evangelio de Juan: «Uno de los soldados le abrió el costado con una lanza, y al instante salió sangre y agua». Y vierte en el cáliz vino y agua.'),
    rub('De los demás panes saca partículas que coloca en la patena alrededor del Cordero: una por la Theotokos, a su derecha; nueve por los órdenes de los santos —el Precursor, los profetas, los apóstoles, los jerarcas, los mártires, los monjes, los anárgiros, los antepasados de Dios y el santo del día—; y otras por los vivos y los difuntos cuyos nombres le han entregado los fieles. Así la Iglesia entera, del cielo y de la tierra, queda reunida en torno a Cristo.'),
    rub('Cubre los dones con la estrella y los velos, los inciensa y dice la oración de la prótesis:'),
    t('Oh Dios, Dios nuestro, que enviaste el Pan celestial, alimento de todo el mundo, a nuestro Señor y Dios Jesucristo, Salvador, Redentor y Bienhechor, que nos bendice y santifica: bendice Tú mismo esta ofrenda y recíbela en tu altar celestial. Acuérdate, como bueno y amante de los hombres, de los que la ofrecieron y de aquellos por quienes la ofrecieron, y guárdanos sin condenación en la celebración sagrada de tus divinos misterios. Porque santificado y glorificado es tu honorabilísimo y magnífico nombre, del Padre, y del Hijo, y del Espíritu Santo, ahora y siempre, y por los siglos de los siglos. Amén.'),
    rub('Traducción para ATHOS a partir del original griego, que es de dominio público; no procede de un libro litúrgico español publicado.'),
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
    rub('Se lee o canta el salmo 103, el salmo de la creación: «Bendice, alma mía, al Señor…». Mientras se lee, el sacerdote, con las puertas cerradas, reza en voz baja las oraciones de la luz.'),
    psalm(103),
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
        rub('Los libros lo llaman «de san Gregorio Dialogista, papa de Roma», pero esa atribución es tardía; la última sección explica de dónde viene realmente el oficio.'),
      ]),
      section('estructura', 'Cómo se ordena', [
        rub('Es un oficio de Vísperas al que, después de las lecturas, se injerta la comunión. Su orden es éste:'),
        rub('1. Bendición inicial, la misma de la Liturgia: «Bendito el Reino del Padre, y del Hijo, y del Espíritu Santo». Es lo único del comienzo que no es de Vísperas, y avisa desde la primera palabra de que aquí habrá comunión.'),
        rub('2. Salmo 103, el de la creación, y la gran letanía.'),
        rub('3. La kathisma decimoctava del Salterio —los salmos graduales, del 119 al 133—, leída en tres partes. Durante ella el sacerdote saca de la reserva el Cordero consagrado el domingo anterior, lo pone en la patena y prepara el cáliz.'),
        rub('4. «Señor, a Ti clamo» con las estiqueras del día, la entrada con el incensario y el himno «Luz alegre».'),
        pending('las estiqueras y los prokímena propios de cada día, que se toman del Triodion.'),
        rub('5. Las dos lecturas del Antiguo Testamento: una del Génesis y otra de los Proverbios, cada una con su prokímenon.'),
        rub('6. Entre las dos, el momento propio de este oficio.'),
        rub('7. «Suba mi oración», con postraciones, y la oración de san Efrén.'),
        rub('8. Las letanías, la gran entrada en silencio con los dones ya consagrados, el Padre Nuestro y la comunión.'),
        rub('9. Acción de gracias, oración del ambón propia de este oficio y despedida.'),
      ]),
      section('luz-de-cristo', 'La luz de Cristo', [
        rub('Terminada la primera lectura, el sacerdote toma el incensario y un cirio encendido, se vuelve al pueblo, traza con ellos la señal de la Cruz y proclama:'),
        t('La luz de Cristo ilumina a todos.'),
        rub('Todos se postran hasta el suelo mientras lo dice, y sólo se levantan cuando empieza la segunda lectura. Es uno de los pocos momentos del rito bizantino en que el pueblo no mira: la rúbrica antigua manda inclinarse porque aquella luz no es la del cirio.'),
        rub('Los catecúmenos, que en la Iglesia antigua se preparaban en Cuaresma para el bautismo de Pascua, asistían hasta aquí; de ese uso quedan en este oficio unas letanías por ellos que no se dicen en ningún otro día del año.'),
      ]),
      section('himnos', 'Himnos propios', [
        rub('Después de la segunda lectura se canta, con el sacerdote y el pueblo alternándose y con una postración en cada repetición, el versículo del salmo 140:'),
        t('Suba mi oración como el incienso ante Ti; el alzar de mis manos, como sacrificio vespertino.'),
        rub('En lugar del Querúbico, cuando entran los dones ya consagrados, se canta:'),
        t('Ahora las Potestades celestiales invisiblemente concelebran con nosotros, pues he aquí que entra el Rey de la gloria. He aquí que es escoltado el sacrificio místico ya consumado. Acerquémonos con fe y amor para hacernos partícipes de la vida eterna. ¡Aleluya!'),
        rub('Y en la comunión, en lugar del versículo de costumbre:'),
        t('Gustad y ved qué bueno es el Señor. ¡Aleluya!'),
        rub('Traducción para ATHOS a partir del original griego, que es de dominio público; no procede de un libro litúrgico español publicado.'),
      ]),
      section('por-que', 'Por qué no hay consagración', [
        t('La Iglesia antigua no celebraba la Eucaristía en días de ayuno estricto, porque la Liturgia es siempre fiesta y la fiesta no cabe en un día de duelo. Pero tampoco quiso dejar a los fieles sin comunión durante seis semanas.'),
        t('La solución fue ésta: consagrar el domingo un Cordero de más, guardarlo, y darlo a comulgar entre semana dentro de un oficio que no es la Liturgia sino Vísperas. Por eso se celebra al atardecer, tras un día entero de ayuno, y por eso en él no se oye nunca la anáfora.'),
        rub('El canon 52 del Concilio Quinisexto, de 692, es el que fija esta práctica para toda la Cuaresma. Su atribución a san Gregorio Dialogista, papa de Roma, es posterior y no tiene fundamento histórico; el oficio es de formación oriental.'),
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
        rub('Empiezan así, tres veces el canto de los ángeles en Belén y dos veces el versículo del salmo 50:'),
        { kind: 'text', content: 'Gloria a Dios en las alturas, y en la tierra paz, buena voluntad entre los hombres.', times: 3 },
        { kind: 'text', content: 'Señor, abre mis labios, y mi boca proclamará tu alabanza.', times: 2 },
        psalm(3),
        psalm(37),
        psalm(62),
        rub('Gloria al Padre, y al Hijo, y al Espíritu Santo, ahora y siempre, y por los siglos de los siglos. Amén. Aleluya, aleluya, aleluya, gloria a Ti, oh Dios (tres veces). Señor, ten piedad (tres veces). Gloria al Padre… ahora y siempre…'),
        psalm(87),
        psalm(102),
        psalm(142),
        rub('Y se cierra igual: Gloria…, Aleluya tres veces, Señor, ten piedad tres veces.'),
        rub('Mientras se leen, el sacerdote reza en voz baja las doce oraciones de la mañana.'),
      ]),
      section('doxologia', 'Gran Doxología', [
        rub('Al amanecer, con las puertas reales abiertas, el sacerdote exclama: «Gloria a Ti, que nos has mostrado la luz». Y se canta:'),
        t('Gloria a Dios en las alturas, y en la tierra paz, benevolencia entre los hombres.'),
        t('Te alabamos, te bendecimos, te adoramos, te glorificamos, te damos gracias por tu gran gloria.'),
        t('Señor, Rey celestial, Dios Padre todopoderoso; Señor, Hijo unigénito, Jesucristo, y Espíritu Santo.'),
        t('Señor Dios, Cordero de Dios, Hijo del Padre, que quitas el pecado del mundo, ten piedad de nosotros; Tú que quitas los pecados del mundo, recibe nuestra súplica; Tú que estás sentado a la derecha del Padre, ten piedad de nosotros.'),
        t('Porque sólo Tú eres santo, sólo Tú eres Señor, Jesucristo, para gloria de Dios Padre. Amén.'),
        t('Cada día te bendeciré y alabaré tu nombre por los siglos, y por los siglos de los siglos.'),
        t('Concédenos, Señor, guardarnos este día sin pecado.'),
        t('Bendito eres, Señor, Dios de nuestros padres, y alabado y glorificado es tu nombre por los siglos. Amén.'),
        t('Venga, Señor, tu misericordia sobre nosotros, como lo esperamos de Ti.'),
        t('Bendito eres, Señor, enséñame tus mandamientos.'),
        rub('Tres veces.'),
        t('Señor, Tú has sido nuestro refugio de generación en generación. Yo dije: Señor, ten piedad de mí, sana mi alma, porque he pecado contra Ti.'),
        t('Señor, en Ti me refugio: enséñame a hacer tu voluntad, porque Tú eres mi Dios.'),
        t('Porque en Ti está la fuente de la vida, y en tu luz veremos la luz. Extiende tu misericordia sobre los que te conocen.'),
        t('Santo Dios, Santo Fuerte, Santo Inmortal, ten piedad de nosotros.'),
        rub('Tres veces. Y después: Gloria al Padre… ahora y siempre… Santo Inmortal, ten piedad de nosotros. Y una vez más, con canto más solemne: Santo Dios, Santo Fuerte, Santo Inmortal, ten piedad de nosotros.'),
        rub('Traducción para ATHOS a partir del original griego, que es de dominio público; no procede de un libro litúrgico español publicado.'),
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
      section('que-es', 'Pequeñas y Grandes', [
        t('Apódeipnon significa literalmente «después de la cena», y eso es: la última oración del día, hecha ya en casa o en el monasterio, antes de acostarse. No es un oficio de la iglesia catedral sino de la celda, y se nota en su tono: casi todo él está en primera persona del singular.'),
        t('Hay dos formas. Las Completas Pequeñas son las de uso diario. Las Grandes se rezan en la Gran Cuaresma y en las vigilias de las grandes fiestas: son mucho más largas, están divididas en tres partes y llevan el canto «Dios está con nosotros».'),
        rub('Lo que sigue son las Completas Pequeñas. Las Grandes están descritas en la última sección.'),
      ]),

      section('comienzo', 'Comienzo habitual', [
        rub('Como toda regla: «Bendito sea nuestro Dios», el Trisagio, el Padre Nuestro y las oraciones iniciales.'),
        rub('El texto completo está en Orar → Oraciones → Comienzo habitual.'),
      ]),

      section('salmos', 'Los tres salmos', [
        rub('Se leen seguidos, sin canto, tres salmos que dicen lo mismo de tres maneras: el 50, el 69 y el 142.'),
        rub('El 50 es el de la penitencia, el mismo que abre casi todos los oficios. El 69 es un grito breve: «Dios mío, ven en mi auxilio». El 142 es la última súplica del día: «No entres en juicio con tu siervo».'),
        psalm(50),
        psalm(69),
        psalm(142),
      ]),

      section('doxologia', 'Doxología', [
        rub('Se lee, no se canta, la misma doxología que en Maitines se canta al final: «Gloria a Dios en las alturas y en la tierra paz».'),
        rub('El texto está en Biblioteca → Maitines → Gran Doxología.'),
      ]),

      section('simbolo', 'Símbolo de la Fe', [
        rub('Se recita entero. Está en Orar → Oraciones → Símbolo de la Fe.'),
        rub('Que el Credo aparezca aquí, dicho en voz baja por una persona sola antes de dormir, y no sólo en la Liturgia, dice bastante sobre lo que la Iglesia entiende por profesar la fe.'),
      ]),

      section('canon', 'El canon', [
        rub('Después del Símbolo se canta un canon, que cambia según el día: el del Ángel Custodio, alguno de los cánones de arrepentimiento, o el canon a la Theotokos del Octoecos correspondiente al tono de la semana.'),
        pending('los cánones variables que se cantan en este lugar, que se toman del Octoecos y del Triodion.'),
      ]),

      section('digno-es', 'Digno es en verdad', [
        rub('Terminado el canon:'),
        t('Digno es en verdad bendecirte a ti, Theotokos, siempre bienaventurada y purísima, y Madre de nuestro Dios. Más honorable que los querubines e incomparablemente más gloriosa que los serafines, tú que sin mancha diste a luz al Verbo de Dios, verdadera Theotokos, te engrandecemos.'),
      ]),

      section('trisagio-troparios', 'Trisagio y troparios', [
        rub('El Trisagio y el Padre Nuestro otra vez, y después estos troparios, que son los de los días ordinarios:'),
        t('Ten piedad de nosotros, Señor, ten piedad de nosotros; porque, sin saber qué alegar en nuestra defensa, los pecadores te ofrecemos esta súplica como a Soberano: ten piedad de nosotros.'),
        rub('Gloria al Padre, y al Hijo, y al Espíritu Santo.'),
        t('Señor, ten piedad de nosotros, porque en Ti hemos confiado. No te enojes demasiado con nosotros ni recuerdes nuestras iniquidades; mira ahora, como compasivo, y líbranos de nuestros enemigos; porque Tú eres nuestro Dios y nosotros tu pueblo, todos obra de tus manos, y tu nombre invocamos.'),
        rub('Ahora y siempre, y por los siglos de los siglos. Amén.'),
        t('Ábrenos la puerta de tu compasión, bendita Theotokos; para que, esperando en ti, no perezcamos, sino que por ti nos veamos libres de las desgracias, porque tú eres la salvación del pueblo cristiano.'),
        rub('Traducción para ATHOS a partir del original griego, que es de dominio público; no procede de un libro litúrgico español publicado.'),
      ]),

      section('kyrie', 'Señor, ten piedad', [
        rub('Cuarenta veces, sin prisa, como en las Horas.'),
      ]),

      section('toda-hora', 'Oración de toda hora', [
        rub('La misma que se dice en las cuatro Horas.'),
        ...TODA_HORA,
      ]),

      section('basilio-noche', 'Oración de la noche', [
        rub('Atribuida a san Basilio el Grande. Es la oración central de las Completas:'),
        t('Señor, Señor, que nos libraste de toda saeta que vuela de día, líbranos de todo lo que anda en las tinieblas. Recibe como sacrificio vespertino la elevación de nuestras manos. Concédenos pasar sin culpa el curso de la noche, sin que nos alcance el mal, y líbranos de toda turbación y de todo temor que nos venga del diablo. Da compunción a nuestras almas, y a nuestra mente cuidado por el examen de tu juicio temible y justo. Clava nuestra carne en tu temor y mortifica nuestros miembros terrenos, para que también en la quietud del sueño quedemos iluminados por la contemplación de tus juicios. Aparta de nosotros toda imaginación indecente y todo deseo dañino. Y levántanos a la hora de la oración afianzados en la fe y adelantados en tus mandamientos. Por la benevolencia y la bondad de tu Hijo unigénito, con quien eres bendito, junto con tu santísimo, bueno y vivificador Espíritu, ahora y siempre, y por los siglos de los siglos. Amén.'),
        rub('Traducción para ATHOS a partir del original griego, que es de dominio público; no procede de un libro litúrgico español publicado.'),
      ]),

      section('theotokos-noche', 'Oración a la Theotokos', [
        rub('De Pablo, monje del monasterio de Evergetis, en el siglo XI:'),
        t('Inmaculada, incontaminada, incorrupta, purísima y casta Virgen, Esposa de Dios y Soberana, que por tu admirable alumbramiento uniste a Dios Verbo con los hombres y juntaste con las cosas del cielo la naturaleza caída de nuestro linaje; única esperanza de los desesperados y auxilio de los combatidos, pronta protección de los que acuden a ti y refugio de todos los cristianos: no me desprecies a mí, pecador y manchado, que con pensamientos, palabras y obras vergonzosas me he hecho inútil del todo y, por pereza de la mente, me he vuelto esclavo de los placeres de la vida.'),
        t('Antes bien, como Madre del Dios que ama a los hombres, ten compasión de mí, pecador y pródigo, y acoge esta súplica que te ofrezco con labios impuros. Usando de tu confianza de madre, pide a tu Hijo, Soberano y Señor nuestro, que me abra las entrañas compasivas de su bondad, que pase por alto mis faltas incontables y me convierta al arrepentimiento, y me haga cumplidor probado de sus mandamientos. Y quédate siempre a mi lado, como misericordiosa, compasiva y amante del bien; sé en esta vida mi defensora ardiente y auxiliadora, apartando los asaltos de los enemigos y guiándome hacia la salvación; y en la hora de mi muerte abraza mi alma desdichada y aleja de ella lejos las tenebrosas apariencias de los espíritus malignos.'),
        t('Y en el día terrible del juicio líbrame del castigo eterno, y muéstrame heredero de la gloria inefable de tu Hijo y Dios nuestro; alcánzalo, Señora mía, santísima Theotokos, por tu intercesión y tu amparo, por la gracia y el amor a los hombres de tu Hijo unigénito, Señor y Dios y Salvador nuestro Jesucristo, a quien corresponde toda gloria, honor y adoración, con su Padre sin principio y su santísimo, bueno y vivificador Espíritu, ahora y siempre, y por los siglos de los siglos. Amén.'),
        rub('Traducción para ATHOS a partir del original griego, que es de dominio público; no procede de un libro litúrgico español publicado.'),
      ]),

      section('antioco', 'Oración a Cristo', [
        rub('De san Antíoco, monje de la laura de San Sabas, en el siglo VII:'),
        t('Y danos, Soberano, al ir a dormir, descanso de cuerpo y alma; y guárdanos del sombrío sueño del pecado y de todo placer oscuro de la noche. Aplaca los ímpetus de las pasiones, apaga los dardos encendidos del maligno que vienen contra nosotros con engaño. Calma las rebeliones de nuestra carne y adormece todo pensamiento nuestro terreno y material.'),
        t('Y concédenos, oh Dios, mente vigilante, pensamiento casto, corazón sobrio, y un sueño ligero y libre de toda fantasía del enemigo. Levántanos a la hora de la oración afianzados en tus mandamientos y guardando firme dentro de nosotros el recuerdo de tus juicios. Concédenos glorificarte toda la noche, para que cantemos, bendigamos y glorifiquemos tu nombre honorabilísimo y magnífico, del Padre, y del Hijo, y del Espíritu Santo, ahora y siempre, y por los siglos de los siglos. Amén.'),
        rub('Traducción para ATHOS a partir del original griego, que es de dominio público; no procede de un libro litúrgico español publicado.'),
      ]),

      section('esperanza', 'Mi esperanza', [
        rub('El verso con que se cierra el oficio, que resume en una línea todo lo dicho:'),
        ref('Mi esperanza es el Padre, mi refugio el Hijo, mi protección el Espíritu Santo. Trinidad Santa, gloria a Ti.'),
      ]),

      section('perdon', 'El perdón mutuo', [
        rub('Las Completas no terminan con una bendición sino con una petición de perdón, que en los monasterios se hace en voz alta y con una inclinación. Es lo último que se dice en el día.'),
        t('Perdonadme, padres y hermanos, a mí, pecador, todo aquello en que he pecado hoy de obra, de palabra y de pensamiento, y con todos mis sentidos.'),
        rub('Y se responde:'),
        t('Dios te perdone, hermano, y tenga piedad de nosotros.'),
        rub('Después no se habla más hasta el día siguiente. La regla del silencio nocturno no es un castigo: es lo que hace posible que la última palabra del día sea ésa y no otra.'),
      ]),

      section('damasceno', 'Al acostarse', [
        rub('Ya en el lecho, antes de dormirse, se dice esta oración de san Juan Damasceno, que es lo último del día:'),
        t('Soberano amante de los hombres: ¿será este lecho mi sepulcro, o iluminarás todavía con otro día mi alma miserable? He aquí que el sepulcro está delante de mí, he aquí que la muerte se me presenta. Tu juicio temo, Señor, y el castigo sin fin; y sin embargo no dejo de hacer el mal. A Ti, Señor Dios mío, te irrito continuamente, y a tu Madre purísima, y a todas las Potestades celestiales, y a mi santo ángel custodio.'),
        t('Sé, Señor, que soy indigno de tu amor a los hombres, y que merezco toda condena y todo castigo. Pero, Señor, quieras o no, sálvame. Porque salvar a un justo no tiene mérito, ni es maravilla tener piedad de los puros, que son dignos de tu misericordia; muestra en mí, pecador, la maravilla de tu piedad. En eso se manifiesta tu amor a los hombres: en que mi maldad no venza tu bondad y tu misericordia, que no tienen medida. Y dispón de mí como quieras.'),
        rub('Traducción para ATHOS a partir del original griego, que es de dominio público; no procede de un libro litúrgico español publicado.'),
      ]),

      section('grandes', 'Las Completas Grandes', [
        t('Se rezan en la Gran Cuaresma, en las vigilias de Navidad, Teofanía y Anunciación, y en algunas fiestas. Duran más de una hora y están divididas en tres partes, cada una con su propio comienzo y su propio final, de modo que pueden separarse.'),
        rub('Primera parte. Los salmos 4, 6 y 12; después el canto «Dios está con nosotros», tomado de Isaías, con su estribillo repetido:'),
        ref('Porque Dios está con nosotros.'),
        rub('Los versículos son de Isaías 8 y 9, y están en Leer → Biblia → Isaías. Siguen unos troparios de la noche, el Símbolo de la Fe y la letanía «Santísima Soberana Theotokos, intercede por nosotros, pecadores», en la que se invoca por orden a los ángeles, al Precursor, a los apóstoles y a todos los santos.'),
        rub('Segunda parte. Los salmos 24, 30 y 90; troparios de penitencia; y la oración de Manasés, rey de Judá, que es uno de los textos del Antiguo Testamento griego:'),
        t('Señor omnipotente, Dios de nuestros padres, de Abrahán, de Isaac y de Jacob, y de su descendencia justa; Tú que hiciste el cielo y la tierra con todo su ornato; que encadenaste el mar con la palabra de tu mandato; que cerraste el abismo y lo sellaste con tu nombre temible y glorioso; ante quien todas las cosas se estremecen y tiemblan delante de tu poder, porque nadie puede resistir la magnificencia de tu gloria, y es insoportable la ira de tu amenaza contra los pecadores. Pero es inmensa e insondable la misericordia de tu promesa, porque Tú eres el Señor altísimo, compasivo, paciente y de mucha misericordia, y te arrepientes de los males de los hombres.'),
        t('Tú, Señor, según la muchedumbre de tu bondad, prometiste el arrepentimiento y el perdón a los que han pecado contra Ti, y en tu inmensa compasión determinaste la penitencia para los pecadores, para su salvación. Tú, pues, Señor, Dios de los justos, no pusiste el arrepentimiento para los justos, para Abrahán, Isaac y Jacob, que no pecaron contra Ti, sino que pusiste el arrepentimiento para mí, pecador; porque he pecado más que la arena del mar. Mis iniquidades se han multiplicado, Señor, se han multiplicado, y no soy digno de levantar los ojos y ver la altura del cielo por la multitud de mis injusticias.'),
        t('Estoy encorvado bajo el peso de muchas cadenas de hierro, de modo que no puedo levantar la cabeza, y no hay para mí respiro; porque provoqué tu ira e hice lo malo delante de Ti: no cumplí tu voluntad ni guardé tus mandamientos, puse abominaciones y multipliqué los escándalos. Y ahora doblo las rodillas de mi corazón, suplicando tu bondad. He pecado, Señor, he pecado, y reconozco mis iniquidades. Pero pido y te ruego: perdóname, Señor, perdóname, y no me pierdas con mis iniquidades, ni guardes para siempre rencor a mis males, ni me condenes a lo profundo de la tierra; porque Tú, Señor, eres el Dios de los que se arrepienten. Y en mí mostrarás toda tu bondad, porque, indigno como soy, me salvarás según tu gran misericordia, y te alabaré sin cesar todos los días de mi vida. Porque a Ti te alaban todas las potestades de los cielos, y tuya es la gloria por los siglos de los siglos. Amén.'),
        rub('Traducción para ATHOS a partir del original griego de los Setenta, que es de dominio público; no procede de una Biblia española publicada.'),
        rub('Tercera parte. Los salmos 69 y 142, la doxología y el canon; en la primera semana de Cuaresma, el Gran Canon de san Andrés de Creta repartido en cuatro noches. Después, el Trisagio, el estribillo propio de estas Completas:'),
        ref('Señor de las potestades, quédate con nosotros, porque no tenemos otro auxilio en las tribulaciones sino a Ti. Señor de las potestades, ten piedad de nosotros.'),
        rub('Y el final es el mismo de las Completas Pequeñas: la oración de san Basilio, las oraciones a la Theotokos y a Cristo, y el perdón mutuo. En Cuaresma se añade la oración de san Efrén con postraciones, que está en Orar → Oraciones.'),
      ]),

      section('salmo-90', 'Salmo de protección', [
        rub('El salmo 90, «El que habita al abrigo del Altísimo», se lee en las Completas Grandes y es el salmo nocturno por excelencia de la tradición cristiana.'),
        psalm(90),
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
        psalm(50),
      ]),
      section('kathisma-17', 'Salmo 118', [
        rub('El salmo más largo del Salterio, la kathisma decimoséptima, dividida en tres estasis. Es el corazón del oficio los días de diario.'),
        psalm(118),
        rub('Los domingos se sustituye por el canon a la Santísima Trinidad, del Octoecos, cuyo texto no está incorporado todavía.'),
      ]),
      section('simbolo', 'Símbolo de la Fe', [
        rub('Se recita entero. Está en Orar → Oraciones → Símbolo de la Fe.'),
      ]),
      section('propios', 'Troparios y oraciones del oficio', [
        rub('Después del Símbolo de la Fe y del Trisagio se cantan los troparios de la vigilia, que dan sentido a todo el oficio: la espera del Esposo que llega a medianoche.'),
        t('He aquí que el Esposo viene a medianoche, y bienaventurado el siervo a quien encuentre velando; pero indigno aquel a quien halle negligente. Mira, pues, alma mía, no te dejes vencer por el sueño, no sea que seas entregada a la muerte y quedes fuera del Reino; antes bien, despierta clamando: Santo, Santo, Santo eres, oh Dios; por la intercesión de la Theotokos, ten piedad de nosotros.'),
        t('Pensando en aquel día terrible, alma mía, vela, enciende tu lámpara y hazla brillar con aceite; porque no sabes cuándo vendrá a ti la voz que dice: He aquí el Esposo. Mira, pues, alma mía, no te duermas, no sea que te quedes fuera llamando, como las cinco vírgenes; vela, en cambio, sin descanso, para salir con aceite abundante al encuentro de Cristo Dios, y que Él te dé la cámara nupcial divina de su gloria.'),
        rub('Y la oración del oficio, atribuida a san Basilio:'),
        t('Te bendecimos, oh Dios altísimo y Señor de la misericordia, que siempre haces con nosotros cosas grandes e inescrutables, gloriosas y admirables, sin número; que nos concediste el sueño para descanso de nuestra debilidad y reposo de las fatigas de nuestra carne. Te damos gracias porque no nos has hecho perecer con nuestras iniquidades, sino que, amando a los hombres como siempre, nos has levantado cuando yacíamos sin esperanza, para que glorifiquemos tu poder. Por eso suplicamos a tu bondad inconmensurable: ilumina los ojos de nuestro entendimiento y levanta nuestra mente del pesado sueño de la pereza; abre nuestra boca y llénala de tu alabanza, para que podamos cantarte, confesarte y glorificarte sin distracción, a Ti, Dios glorificado en todo y por todos, Padre sin principio, con tu Hijo unigénito y tu santísimo, bueno y vivificador Espíritu, ahora y siempre, y por los siglos de los siglos. Amén.'),
        rub('Traducción para ATHOS a partir del original griego, que es de dominio público; no procede de un libro litúrgico español publicado.'),
        rub('Los sábados y los domingos el oficio cambia: el domingo la kathisma 118 se sustituye por el canon a la Santísima Trinidad del Octoecos, y el sábado por unos troparios propios. En los dos casos se añade además una oración atribuida a san Marcos el Monje, asceta del siglo V.'),
        pending('la oración de san Marcos el Monje y los troparios propios del sábado y del domingo. No se transcriben de memoria: hasta comprobar el texto, es preferible decir que faltan.'),
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
