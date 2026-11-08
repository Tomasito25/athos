/**
 * El canon de preparación para la Santa Comunión, entero.
 *
 * Se lee la víspera de comulgar, después de las Completas. Es un canon
 * alfabético: en griego, cada estrofa empieza por una letra, de la alfa a la
 * omega, y con eso se reconoce que no falta ninguna. Aquí están las
 * veinticinco, con los irmoi del tono segundo a los que se ajustan.
 *
 * El texto se ha traducido de la Akolouthía de la Divina Comunión del
 * Horologion griego, y los irmoi, del Heirmologion, ambos en la edición
 * digital de la Archidiócesis Ortodoxa Griega de América (glt.goarch.org).
 * La traducción es de ATHOS y no procede de ningún libro litúrgico español
 * publicado.
 *
 * Hasta ahora la ficha daba como estribillo «Jesús dulcísimo, sálvame», que es
 * el del canon al Dulcísimo Jesús, no el de éste. Queda corregido.
 */
import type { OfficeSection, TextBlock } from '@/types';

const t = (content: string): TextBlock => ({ kind: 'text', content });
const rub = (content: string): TextBlock => ({ kind: 'rubric', content });
const ref = (content: string): TextBlock => ({ kind: 'refrain', content });
const s = (id: string, title: string, blocks: TextBlock[]): OfficeSection => ({ id, title, blocks });

const oda = (n: number, irmos: string, troparios: string[], theotokion?: string): OfficeSection =>
  s(`oda-${n}`, `Oda ${n}`, [
    rub('Irmos'),
    t(irmos),
    ...troparios.map(t),
    ...(theotokion ? [rub('Theotokion'), t(theotokion)] : []),
  ]);

export const CANON_COMUNION: OfficeSection[] = [
  s('sobre', 'Antes de comulgar', [
    rub('Se lee la víspera de comulgar, después de las Completas y antes de acostarse. A la mañana siguiente se rezan las oraciones ante la Comunión, que están en Orar → Oraciones → Comunión.'),
    rub('Es un canon alfabético, en el tono segundo: en griego, cada estrofa empieza por una letra, de la alfa a la omega. No tiene segunda oda.'),
    rub('Los libros griegos no ponen estribillo. Los eslavos dicen antes de cada estrofa el versículo del salmo 50, y antes de los theotokía, «Santísima Theotokos, sálvanos»:'),
    ref('Crea en mí, oh Dios, un corazón puro, y renueva un espíritu recto en mis entrañas.'),
  ]),
  oda(
    1,
    'Venid, pueblos, cantemos un cántico a Cristo Dios, que dividió el mar y condujo al pueblo que había librado de la servidumbre de Egipto, porque se ha glorificado.',
    [
      'Que tu santo Cuerpo, Señor compasivo, sea para mí pan de vida eterna, y tu preciosa Sangre, remedio de muchas y diversas enfermedades.',
      'Profanado por obras indignas, yo, desdichado, no soy digno, oh Cristo, de participar de tu Cuerpo purísimo y de tu Sangre divina: hazme Tú digno.',
    ],
    'Tierra buena y bendita, Esposa de Dios, que hiciste brotar la espiga que nadie sembró y que salva al mundo: haz que yo, comiéndola, sea salvado.',
  ),
  oda(
    3,
    'Afianzándome sobre la roca de la fe, ensanchaste mi boca contra mis enemigos, porque mi espíritu se alegró al cantar: No hay santo como nuestro Dios, ni hay justo fuera de Ti, Señor.',
    [
      'Dame, oh Cristo, gotas de lágrimas que limpien la suciedad de mi corazón, para que, purificado y con buena conciencia, me acerque con fe y temor, Soberano, a recibir tus dones divinos.',
      'Que tu Cuerpo purísimo y tu Sangre divina sean para mí perdón de mis faltas, comunión del Espíritu Santo y vida eterna, oh amigo de los hombres, y que me alejen de las pasiones y de las aflicciones.',
    ],
    'Santísima, mesa del Pan de vida, que bajó de lo alto por misericordia y da al mundo una vida nueva: hazme ahora digno a mí, indigno, de gustarlo con temor y de vivir.',
  ),
  oda(
    4,
    'Viniste de una Virgen, no como embajador ni como ángel, sino Tú mismo, Señor, hecho carne, y me salvaste a mí, al hombre entero. Por eso te clamo: Gloria a tu poder, Señor.',
    [
      'Quisiste, oh Misericordioso, encarnado por nosotros, ser inmolado como una oveja por los pecados de los hombres; por eso te suplico que borres también mis culpas.',
      'Cura, Señor, las heridas de mi alma, santifícame entero y hazme digno, Soberano, de participar, miserable de mí, de tu Cena mística y divina.',
    ],
    'Haz que también conmigo sea propicio el que nació de tus entrañas, Señora, y guárdame sin mancha y sin reproche a mí, tu siervo, para que, al recibir la perla espiritual, sea santificado.',
  ),
  oda(
    5,
    'Señor, que das la luz y creaste los siglos, guíanos en la luz de tus mandamientos, porque fuera de Ti no conocemos otro Dios.',
    [
      'Como dijiste, oh Cristo, hágase con tu humilde siervo: permanece en mí, como prometiste; porque he aquí que como tu Cuerpo divino y bebo tu Sangre.',
      'Verbo de Dios y Dios: que la brasa de tu Cuerpo sea luz para mí, que estoy en tinieblas, y tu Sangre, purificación de mi alma profanada.',
    ],
    'María, Madre de Dios, morada venerable de la fragancia: hazme con tus oraciones vaso escogido, para que participe de los dones santos de tu Hijo.',
  ),
  oda(
    6,
    'Rodeado por el abismo de mis faltas, invoco el abismo insondable de tu compasión: sácame, oh Dios, de la corrupción.',
    [
      'Santifica, oh Salvador, la mente, el alma, el corazón y mi cuerpo, y hazme digno, Soberano, de acercarme sin condenación a los Misterios temibles.',
      'Que me vea libre de las pasiones y reciba aumento de gracia y firmeza de vida por la comunión de tus santos Misterios, oh Cristo.',
    ],
    'Oh Dios, Verbo santo de Dios: santifícame entero ahora que me acerco a tus Misterios divinos, por las súplicas de tu santa Madre.',
  ),
  s('kontakion', 'Kontakion', [
    rub('En el tono segundo, después de la sexta oda:'),
    t('No desdeñes, oh Cristo, que reciba ahora el Pan, que es tu Cuerpo, y tu Sangre divina; que el participar yo, miserable, de tus Misterios purísimos y temibles, Soberano, no sea para mi condena, sino para la vida eterna e inmortal.'),
  ]),
  oda(
    7,
    'Cuando en la llanura de Dura se adoraba una estatua de oro, tus tres jóvenes despreciaron la orden impía; y, arrojados en medio del fuego, rociados de frescor, cantaban: Bendito eres, Dios de nuestros padres.',
    [
      'Fuente de bienes es, oh Cristo, la comunión de tus Misterios inmortales: que sea para mí luz, vida e impasibilidad, y me haga avanzar y crecer en una virtud más divina, oh único Bueno, para que te glorifique.',
      'Que sea librado de las pasiones, de los enemigos, de las necesidades y de toda aflicción, ahora que me acerco con temblor, con amor y con reverencia, oh amigo de los hombres, a tus Misterios inmortales y divinos, y te canto: Bendito eres, oh Dios, Dios de nuestros padres.',
    ],
    'Tú, que diste a luz más allá de todo entendimiento a Cristo Salvador, llena de la gracia de Dios: yo, tu siervo, impuro, te suplico a ti, la pura: purifícame entero de toda mancha de la carne y del espíritu, ahora que voy a acercarme a los Misterios purísimos.',
  ),
  oda(
    8,
    'Al Dios que bajó al horno de fuego con los jóvenes hebreos y cambió la llama en rocío, obras todas, cantadle como a Señor y exaltadle por todos los siglos.',
    [
      'Hazme digno también a mí, que he perdido la esperanza, oh Dios, Salvador mío, de participar ahora de tus Misterios celestiales, temibles y santos, oh Cristo, y de tu Cena divina y mística.',
      'Refugiado bajo tu compasión, oh Bueno, te clamo con temor: permanece en mí, oh Salvador, y yo en Ti, como dijiste; porque he aquí que, confiado en tu misericordia, como tu Cuerpo y bebo tu Sangre.',
      'Tiemblo al recibir el fuego, no sea que arda como la cera y como la hierba. ¡Oh Misterio temible! ¡Oh compasión de Dios! ¿Cómo yo, que soy barro, participo del Cuerpo y de la Sangre divinos y me hago incorruptible?',
    ],
  ),
  oda(
    9,
    'El Hijo del Padre sin principio, Dios y Señor, encarnado de una Virgen, se nos ha manifestado para iluminar lo que estaba en tinieblas y reunir lo disperso. Por eso engrandecemos a la Theotokos, digna de toda alabanza.',
    [
      'Gustad y ved qué bueno es el Señor: porque Él, que en otro tiempo se hizo como nosotros por nosotros y se ofreció una sola vez como ofrenda a su Padre, es inmolado siempre, santificando a los que participan.',
      'Que sea santificado en el alma y en el cuerpo, Soberano; que sea iluminado, que sea salvado; que me haga casa tuya por la comunión de los Misterios sagrados, teniéndote a Ti, con el Padre y el Espíritu, habitando en mí, oh bienhechor lleno de misericordia.',
      'Que tu Cuerpo y tu preciosísima Sangre, Salvador mío, sean para mí como fuego y como luz, que quemen la materia del pecado, abrasen las espinas de las pasiones y me iluminen entero para adorar tu divinidad.',
    ],
    'Dios tomó cuerpo de tu sangre purísima; por eso toda generación te canta, Señora, y las multitudes de los espíritus te glorifican, porque por ti vieron claramente al Soberano de todo, que tomó la naturaleza humana.',
  ),
  s('final', 'Al terminar', [
    rub('Se dice «Digno es en verdad», el Trisagio, «Santísima Trinidad» y el Padre Nuestro, y se termina con lo que queda de las Completas.'),
  ]),
];

/** El canon en una sola página, para la ficha de Orar → Oraciones. */
export const CANON_COMUNION_BLOCKS: TextBlock[] = CANON_COMUNION.flatMap((sec) => [
  { kind: 'heading', content: sec.title },
  ...sec.blocks,
]);
