/**
 * El templo ortodoxo, parte por parte.
 *
 * Quien entra por primera vez en una iglesia ortodoxa ve una pared de iconos
 * con tres puertas y no sabe qué hay detrás, ni por qué la gente se para en
 * la entrada, ni dónde ponerse. Esto lo explica parte por parte, de la puerta
 * al altar, con dos dibujos: la planta y el iconostasio.
 *
 * Es exposición redactada para ATHOS a partir de lo que es común a las
 * tradiciones griega y eslava; donde difieren, se dice. No es texto litúrgico.
 */
import type { SourceMeta } from '@/types';

export const TEMPLE_META: SourceMeta = {
  source: 'Exposición redactada para ATHOS a partir de la disposición común del templo bizantino',
  tradition: 'Iglesia ortodoxa',
  language: 'es',
  license: 'cc-by-sa-4.0',
  dateAdded: '2026-10-14',
  notes:
    'Los dibujos son esquemas: cada iglesia tiene su forma, y muchas pequeñas no tienen nártex ni coros separados. Lo que no cambia es el orden, del oeste al este.',
};

export type TempleZone = 'fuera' | 'narthex' | 'nave' | 'iconostasio' | 'santuario' | 'altar';

export interface TemplePart {
  id: string;
  name: string;
  /** El nombre griego o eslavo, cuando se usa. */
  other?: string;
  zone: TempleZone;
  /** Una línea, para el dibujo. */
  short: string;
  /** Lo que es, para qué sirve y qué significa. */
  text: string[];
}

export const TEMPLE_ZONES: Record<TempleZone, { title: string; lead: string }> = {
  fuera: {
    title: 'Por fuera',
    lead: 'Antes de entrar ya se ve hacia dónde mira la iglesia y qué la corona.',
  },
  narthex: {
    title: 'El nártex',
    lead: 'La entrada: el umbral entre la calle y la iglesia.',
  },
  nave: {
    title: 'La nave',
    lead: 'Donde está el pueblo: la tierra que se vuelve cielo.',
  },
  iconostasio: {
    title: 'El iconostasio',
    lead: 'La pared de iconos que separa la nave del santuario, y que a la vez lo enseña.',
  },
  santuario: {
    title: 'El santuario',
    lead: 'Detrás del iconostasio: el lugar del altar, que representa el cielo.',
  },
  altar: {
    title: 'Lo que hay en el altar',
    lead: 'Los objetos que se ven cuando se abren las puertas reales.',
  },
};

export const TEMPLE_PARTS: TemplePart[] = [
  /* ---------------- Por fuera ---------------- */
  {
    id: 'oriente',
    name: 'Hacia el oriente',
    zone: 'fuera',
    short: 'La iglesia mira al este, por donde sale el sol.',
    text: [
      'Casi todas las iglesias ortodoxas están orientadas: el altar al este y la puerta al oeste. Se reza mirando hacia donde sale el sol, porque Cristo es llamado en los himnos «Sol de justicia» y «Oriente de lo alto», y porque de oriente se espera su segunda venida.',
      'Por eso entrar en una iglesia es caminar del oeste al este: de la oscuridad a la luz, del mundo al Reino. Todo lo que hay dentro está ordenado a lo largo de ese camino.',
    ],
  },
  {
    id: 'cupulas',
    name: 'Las cúpulas',
    zone: 'fuera',
    short: 'El cielo sobre la nave, con su cruz encima.',
    text: [
      'La cúpula es el cielo que cubre la tierra. Por dentro, en las iglesias pintadas, se representa en ella a Cristo Pantocrátor, el Señor de todo, mirando hacia abajo.',
      'Su número tiene sentido simbólico, sobre todo en la tradición rusa: una cúpula, por Cristo; tres, por la Trinidad; cinco, por Cristo y los cuatro evangelistas; trece, por Cristo y los doce apóstoles. La forma de bulbo es rusa; en Grecia y en los Balcanes la cúpula es redonda y más baja. Encima va siempre una cruz.',
    ],
  },
  {
    id: 'campanario',
    name: 'El campanario',
    zone: 'fuera',
    short: 'Las campanas que llaman al oficio y anuncian la fiesta.',
    text: [
      'Las campanas llaman a los oficios, señalan los momentos principales de la Liturgia y anuncian las fiestas. En Pascua se tocan todo el día durante la Semana Luminosa.',
      'En la tradición rusa el toque es un arte con sus propias reglas: no se tocan melodías, sino ritmos con varias campanas a la vez. En muchas iglesias griegas basta con una o dos.',
    ],
  },

  /* ---------------- El nártex ---------------- */
  {
    id: 'narthex',
    name: 'El nártex',
    other: 'νάρθηξ · притвор',
    zone: 'narthex',
    short: 'La entrada, a la parte del oeste.',
    text: [
      'Es el vestíbulo que hay entre la puerta de la calle y la nave. En la Iglesia antigua era el lugar de los catecúmenos —los que se preparaban para el bautismo— y de los penitentes, que no entraban en la nave hasta haber cumplido su penitencia.',
      'Hoy es donde se encienden las velas en muchas iglesias, donde se compran, y donde se rezan algunos oficios breves, como la litía o ciertas partes de las Horas. Al pasar del nártex a la nave muchos se santiguan y se inclinan: se entra en otro lugar.',
    ],
  },
  {
    id: 'velas',
    name: 'Las velas y el candelero',
    zone: 'narthex',
    short: 'La vela que se enciende al entrar.',
    text: [
      'Al entrar se enciende una vela ante el icono de la fiesta o del santo, a veces ante varios, y se besa el icono. La vela es una ofrenda pequeña y una oración sin palabras: arde mientras uno se queda.',
      'Hay candeleros para los vivos y, en muchas iglesias, una mesa aparte, con un pequeño crucifijo, para las velas por los difuntos.',
    ],
  },

  /* ---------------- La nave ---------------- */
  {
    id: 'nave',
    name: 'La nave',
    other: 'ναός',
    zone: 'nave',
    short: 'Donde está el pueblo de pie.',
    text: [
      'Es la parte central de la iglesia, donde está el pueblo durante los oficios. Su nombre viene de nave como barco: la Iglesia es el arca que lleva a los fieles a través del mundo.',
      'En las iglesias ortodoxas se reza de pie, y en muchas no hay bancos: sólo algunos asientos junto a las paredes para quien los necesite. Tradicionalmente los hombres se colocan a la derecha y las mujeres a la izquierda, aunque en muchas parroquias ya no se guarda.',
    ],
  },
  {
    id: 'kliros',
    name: 'Los coros',
    other: 'κλίρος · клирос',
    zone: 'nave',
    short: 'A los lados, delante, donde están los cantores.',
    text: [
      'A un lado y a otro de la solea, delante del iconostasio, están los coros, desde donde cantan y leen los cantores y el lector. En las iglesias grandes hay dos y cantan alternándose, verso a verso; en las pequeñas, uno basta.',
      'En las iglesias rusas el coro a menudo está en una galería alta, al oeste, encima de la entrada.',
    ],
  },
  {
    id: 'solea',
    name: 'La solea',
    other: 'σολέα',
    zone: 'nave',
    short: 'El escalón alto delante del iconostasio.',
    text: [
      'Es la plataforma elevada, de uno o dos escalones, que corre delante del iconostasio a todo lo ancho. Por ella pasan el sacerdote y el diácono cuando salen del santuario, y desde ella se da la comunión.',
    ],
  },
  {
    id: 'ambon',
    name: 'El ambón',
    other: 'ἄμβων',
    zone: 'nave',
    short: 'El saliente central de la solea, ante las puertas reales.',
    text: [
      'Es la parte de la solea que sobresale hacia la nave justo delante de las puertas reales. Desde ahí el diácono lee el Evangelio y dice las letanías, el sacerdote predica y da la comunión, y se despide al pueblo al final.',
      'En las iglesias antiguas era un púlpito alto en medio de la nave; con el tiempo se juntó con la solea.',
    ],
  },
  {
    id: 'tetrapodion',
    name: 'El analogion del centro',
    other: 'ἀναλόγιον · аналой',
    zone: 'nave',
    short: 'El atril con el icono del día.',
    text: [
      'En medio de la nave, o delante del iconostasio, hay un atril inclinado con el icono de la fiesta o del santo del día. Es el que se besa al entrar. Cambia con el calendario, de modo que entrar en la iglesia cada día es encontrarse con quien la Iglesia recuerda ese día.',
      'Delante de otro atril parecido, junto al coro, se confiesa en muchas parroquias, con la cruz y el Evangelio puestos encima.',
    ],
  },

  /* ---------------- El iconostasio ---------------- */
  {
    id: 'iconostasio',
    name: 'El iconostasio',
    other: 'εἰκονοστάσιον · иконостас',
    zone: 'iconostasio',
    short: 'La pared de iconos con tres puertas.',
    text: [
      'Separa la nave del santuario. No es un muro que esconde, sino una pared que enseña: en ella está pintada toda la historia de la salvación, y por sus puertas se ve el altar cuando se abren.',
      'En las iglesias griegas suele ser bajo, de una o dos filas de iconos. En las rusas creció desde el siglo XV hasta cinco filas que llegan al techo. Lo esencial es lo mismo en todas: tres puertas y, junto a la del centro, Cristo y la Theotokos.',
    ],
  },
  {
    id: 'puertas-reales',
    name: 'Las puertas reales',
    other: 'ὡραία πύλη · царские врата',
    zone: 'iconostasio',
    short: 'La puerta del centro, con la Anunciación.',
    text: [
      'Son la puerta central, de dos hojas. Por ella sólo pasan el obispo, el sacerdote y el diácono, y sólo en momentos del oficio; en la Semana Luminosa quedan abiertas todo el tiempo, porque Cristo resucitado ha abierto el paraíso.',
      'Llevan pintada la Anunciación —el arcángel Gabriel en una hoja y la Virgen en la otra—, porque la Encarnación es la puerta por la que Dios entró en el mundo; y a menudo los cuatro evangelistas, que la anuncian. Encima suele ir la Cena mística.',
    ],
  },
  {
    id: 'cristo',
    name: 'El icono de Cristo',
    zone: 'iconostasio',
    short: 'A la derecha de las puertas reales.',
    text: [
      'Mirando al iconostasio, a la derecha de las puertas reales está siempre Cristo, normalmente con el Evangelio en la mano. Junto a él suele ir san Juan el Precursor, o el santo o la fiesta a la que está dedicada la iglesia.',
    ],
  },
  {
    id: 'theotokos',
    name: 'El icono de la Theotokos',
    zone: 'iconostasio',
    short: 'A la izquierda de las puertas reales.',
    text: [
      'A la izquierda de las puertas reales está la Theotokos con el Niño. Cristo y su Madre a los lados de la puerta central dicen lo mismo que la Anunciación pintada en ella: por ella vino Él.',
    ],
  },
  {
    id: 'otros-iconos',
    name: 'Los demás iconos de la fila',
    zone: 'iconostasio',
    short: 'El Precursor, el santo de la iglesia y otros.',
    text: [
      'A los lados de Cristo y de la Theotokos, más allá de las puertas de los diáconos, van otros iconos grandes: san Juan el Precursor, el santo o la fiesta a la que está dedicada la iglesia —el icono «patronal»—, y otros santos venerados en el lugar. Su orden varía de una iglesia a otra; el de Cristo y la Theotokos, nunca.',
    ],
  },
  {
    id: 'puertas-diaconales',
    name: 'Las puertas diaconales',
    zone: 'iconostasio',
    short: 'Las dos puertas laterales, con los arcángeles.',
    text: [
      'Son las dos puertas de los lados, la del norte y la del sur. Por ellas entran y salen el diácono y los acólitos. Llevan pintados los arcángeles Miguel y Gabriel —los servidores de Dios— o santos diáconos, como san Esteban.',
    ],
  },
  {
    id: 'filas',
    name: 'Las filas de arriba',
    zone: 'iconostasio',
    short: 'Las fiestas, la Deesis, los profetas y los patriarcas.',
    text: [
      'Por encima de la fila de abajo, en los iconostasios altos, van de abajo arriba: las doce grandes fiestas; la Deesis —Cristo en el centro, con la Theotokos y el Precursor que interceden, y los apóstoles—; los profetas, con la Virgen del Signo en el centro; y los patriarcas del Antiguo Testamento. Encima de todo, la Cruz.',
      'Leído de arriba abajo es la historia de la salvación: los patriarcas esperan, los profetas anuncian, las fiestas cumplen, y en el centro de abajo, la puerta.',
    ],
  },

  /* ---------------- El santuario ---------------- */
  {
    id: 'santuario',
    name: 'El santuario',
    other: 'ἱερόν · алтарь',
    zone: 'santuario',
    short: 'Detrás del iconostasio, al este.',
    text: [
      'Es la parte de la iglesia que está detrás del iconostasio, en el ábside del este. Representa el cielo, y por eso en él se celebra el sacrificio. Entran los clérigos y los que sirven en el altar; los demás, con la bendición del sacerdote. En la tradición rusa las mujeres no entran, salvo las monjas que sirven en él; en la griega la costumbre varía.',
      'En las lenguas eslavas a todo el santuario se le llama «altar»; en griego y en español, el altar es la mesa del centro.',
    ],
  },
  {
    id: 'mesa-altar',
    name: 'La santa mesa',
    other: 'ἁγία τράπεζα · престол',
    zone: 'santuario',
    short: 'El altar en el centro del santuario.',
    text: [
      'Es la mesa cuadrada que está en el centro del santuario, donde se celebra la Eucaristía. Representa el trono de Dios y el sepulcro de Cristo a la vez. Está consagrada, y en ella o debajo de ella hay reliquias de mártires.',
      'Sólo el sacerdote y el diácono la tocan. Pasar entre ella y las puertas reales está reservado al clero.',
    ],
  },
  {
    id: 'prothesis',
    name: 'La mesa de la preparación',
    other: 'πρόθεσις · жертвенник',
    zone: 'santuario',
    short: 'Al norte del santuario, a la izquierda.',
    text: [
      'Es una mesa más pequeña junto a la pared del norte —a la izquierda mirando al iconostasio—. En ella se preparan el pan y el vino antes de la Liturgia, en el rito de la Proscomidia, y se ponen las partículas por los vivos y los difuntos cuyos nombres se dan.',
      'Representa la cueva de Belén y el Gólgota: allí se prepara el Cordero.',
    ],
  },
  {
    id: 'diakonikon',
    name: 'El diakonikon',
    other: 'διακονικόν',
    zone: 'santuario',
    short: 'Al sur del santuario, a la derecha.',
    text: [
      'La parte del sur del santuario, donde se guardan los ornamentos, los libros y los vasos, y donde se revisten los clérigos. En muchas iglesias pequeñas es sólo un rincón con un armario.',
    ],
  },
  {
    id: 'sintronon',
    name: 'El lugar alto',
    other: 'σύνθρονον · горнее место',
    zone: 'santuario',
    short: 'El asiento del obispo, en el fondo del ábside.',
    text: [
      'En el fondo del ábside, detrás de la santa mesa, está el asiento del obispo, a veces con bancos de piedra a los lados para los presbíteros. Representa el trono de Cristo. En la Liturgia, mientras se canta el Trisagio, el sacerdote sube hacia él, y en la del obispo, el obispo se sienta en él durante la lectura del Apóstol.',
    ],
  },

  /* ---------------- Lo que hay en el altar ---------------- */
  {
    id: 'antimension',
    name: 'El antimension',
    other: 'ἀντιμήνσιον',
    zone: 'altar',
    short: 'El paño firmado por el obispo, con reliquias.',
    text: [
      'Es un paño de lino o seda con el Entierro de Cristo pintado o estampado, cosidas en él unas reliquias de mártires, y firmado por el obispo. Sin él no se celebra la Liturgia: es la señal de que esa comunidad celebra en comunión con su obispo. Se guarda doblado sobre la santa mesa, dentro de otro paño, y se despliega en la Liturgia de los fieles.',
    ],
  },
  {
    id: 'evangeliario',
    name: 'El Evangelio',
    zone: 'altar',
    short: 'El libro de los Evangelios, en el centro de la mesa.',
    text: [
      'El libro de los Evangelios descansa siempre sobre la santa mesa, en el centro, y suele estar cubierto de metal con los evangelistas y la Resurrección. Se saca en procesión en la Pequeña Entrada y se besa como un icono: es Cristo que habla.',
    ],
  },
  {
    id: 'tabernaculo',
    name: 'El tabernáculo',
    other: 'ἀρτοφόριον · дарохранительница',
    zone: 'altar',
    short: 'Donde se guardan los Dones para los enfermos.',
    text: [
      'Un recipiente, a menudo en forma de pequeña iglesia, donde se guarda el Cuerpo y la Sangre de Cristo consagrados para dar la comunión a los enfermos. Está sobre la santa mesa, detrás del Evangelio.',
    ],
  },
  {
    id: 'vasos',
    name: 'El cáliz y la patena',
    other: 'ποτήριον · δίσκος',
    zone: 'altar',
    short: 'El cáliz para el vino y la patena para el pan.',
    text: [
      'El cáliz recibe el vino mezclado con agua, y la patena —diskos— el Cordero, el pan que se consagrará. Con ellos están la lanza para cortar el pan, la estrella que se pone sobre la patena para que el velo no toque las partículas, y la cucharilla con que se da la comunión. Todos se preparan en la mesa de la preparación.',
    ],
  },
  {
    id: 'candelabro',
    name: 'El candelabro de siete brazos y la cruz',
    zone: 'altar',
    short: 'Detrás de la santa mesa, al este.',
    text: [
      'Detrás de la santa mesa suele haber un candelabro de siete brazos, que recuerda el del Templo de Jerusalén y los siete dones del Espíritu, y una cruz y un icono de la Theotokos montados sobre astas, que se sacan en las procesiones.',
    ],
  },
];

/** Las zonas en el orden en que se recorren, de la calle al altar. */
export const TEMPLE_ZONE_ORDER: TempleZone[] = ['fuera', 'narthex', 'nave', 'iconostasio', 'santuario', 'altar'];

export const templePart = (id: string) => TEMPLE_PARTS.find((p) => p.id === id);
