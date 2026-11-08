/**
 * El canon al Ángel de la Guarda, entero.
 *
 * Es un canon de los libros eslavos: los griegos no lo traen entre las
 * oraciones de la Comunión. Por eso se ha traducido del eslavo eclesiástico,
 * tal como lo publica el libro de oraciones ruso (en la edición digital de
 * Azbuka Very, azbyka.ru), y no de la versión rusa moderna que la acompaña,
 * que es una obra reciente con sus propios derechos.
 *
 * Están el tropario, las ocho odas con sus irmoi y sus estrofas, el sedalen,
 * el kontakion con su ikos y la oración larga con que se cierra. La
 * traducción es de ATHOS y no procede de ningún libro español publicado.
 */
import type { OfficeSection, TextBlock } from '@/types';

const t = (content: string): TextBlock => ({ kind: 'text', content });
const rub = (content: string): TextBlock => ({ kind: 'rubric', content });
const ref = (content: string): TextBlock => ({ kind: 'refrain', content });
const s = (id: string, title: string, blocks: TextBlock[]): OfficeSection => ({ id, title, blocks });

const AL_ANGEL = ref('Santo ángel de Dios, guardián mío, ruega a Dios por mí.');
const A_JESUS = ref('Señor Jesucristo, Dios mío, ten piedad de mí.');
const GLORIA = 'Gloria al Padre, y al Hijo, y al Espíritu Santo.';
const AHORA = 'Ahora y siempre, y por los siglos de los siglos. Amén.';

interface Oda {
  n: number;
  irmos: string;
  /** La primera oda y la novena empiezan con una estrofa a Cristo. */
  aJesus?: string;
  troparios: string[];
  gloria: string;
  ahora: string;
}

const oda = ({ n, irmos, aJesus, troparios, gloria, ahora }: Oda): OfficeSection =>
  s(`oda-${n}`, `Oda ${n}`, [
    rub('Irmos'),
    t(irmos),
    ...(aJesus ? [A_JESUS, t(aJesus)] : []),
    AL_ANGEL,
    ...troparios.map(t),
    rub(GLORIA),
    t(gloria),
    rub(AHORA),
    t(ahora),
  ]);

export const CANON_ANGEL: OfficeSection[] = [
  s('sobre', 'El canon al propio ángel', [
    rub('Se lee la víspera de comulgar, junto con el canon de la Comunión y el de la Theotokos, y en cualquier otro momento. Cada bautizado tiene un ángel puesto para guardarle, y este canon le habla a él directamente, en segunda persona.'),
    rub('Está en el tono octavo. Antes de cada estrofa se dice el estribillo:'),
    AL_ANGEL,
    rub('Si lo reza una mujer, cambia lo que hay que cambiar: «tu sierva», «perdida», «pecadora».'),
  ]),
  s('tropario', 'Tropario', [
    rub('En el tono sexto:'),
    t('Ángel de Dios, mi santo guardián: guarda mi vida en el temor de Cristo Dios, afianza mi mente en el camino verdadero y hiere mi alma con el amor de lo alto, para que, guiado por ti, alcance de Cristo Dios la gran misericordia.'),
    rub(`${GLORIA} ${AHORA}`),
    t('Santa Soberana, Madre de Cristo nuestro Dios, que diste a luz de modo inefable al Creador de todo: suplica siempre a su bondad, junto con mi ángel guardián, que salve mi alma, presa de las pasiones, y me conceda el perdón de los pecados.'),
  ]),
  oda({
    n: 1,
    irmos: 'Cantemos al Señor, que condujo a su pueblo a través del mar Rojo, porque sólo Él se ha glorificado gloriosamente.',
    aJesus:
      'Haz digno, oh Salvador, a tu siervo de cantar y alabar como es debido al ángel incorpóreo, mi guía y mi guardián.',
    troparios: ['Yo solo yazgo ahora en la insensatez y en la pereza: guía mío y guardián, no me abandones, que perezco.'],
    gloria:
      'Dirige mi mente con tu oración, para que cumpla los mandamientos de Dios y reciba de Él el perdón de los pecados; y enséñame a aborrecer el mal, te lo suplico.',
    ahora:
      'Ruega por mí, tu siervo, Virgen, al Bienhechor, junto con mi ángel guardián, y enséñame a cumplir los mandamientos de tu Hijo y Creador mío.',
  }),
  oda({
    n: 3,
    irmos: 'Tú eres el apoyo de los que acuden a Ti, Señor; Tú eres la luz de los que están en tinieblas, y mi espíritu te canta.',
    troparios: [
      'He puesto en ti todo mi pensamiento y mi alma, guardián mío: líbrame tú de toda asechanza del enemigo.',
      'El enemigo me pisotea, me maltrata y me enseña siempre a hacer su voluntad; pero tú, guía mío, no me abandones, que perezco.',
    ],
    gloria:
      'Dame cantar con gratitud y celo un cántico al Creador y Dios, y a ti, mi buen ángel guardián: libertador mío, arráncame de los enemigos que me maltratan.',
    ahora:
      'Cura, Purísima, las llagas de mi alma, llenas de dolencias; ahuyenta a los enemigos, que luchan siempre contra mí.',
  }),
  s('sedalen', 'Sedalen', [
    rub('En el tono segundo:'),
    t('Desde el amor de mi alma te clamo, guardián de mi alma, mi santísimo ángel: cúbreme y guárdame siempre de las trampas del maligno, y guíame a la vida celestial, instruyéndome, iluminándome y fortaleciéndome.'),
    rub(`${GLORIA} ${AHORA}`),
    t('Theotokos purísima, que no conociste esposo, que sin semilla diste a luz al Soberano de todos: suplícale con mi ángel guardián que me libre de toda perplejidad y dé a mi alma compunción y luz, y purificación de los pecados, tú, la única que socorre enseguida.'),
  ]),
  oda({
    n: 4,
    irmos: 'He oído, Señor, el misterio de tu providencia; he comprendido tus obras y he glorificado tu divinidad.',
    troparios: [
      'Suplica tú, guardián mío, a Dios, amigo de los hombres, y no me abandones; guarda siempre en paz mi vida y concédeme una salvación invencible.',
      'Te he recibido de Dios, ángel, como defensor y guardián de mi vida: te ruego, santo, que me libres de todos los males.',
    ],
    gloria:
      'Limpia con tu santidad mi impureza, guardián mío, y que por tus oraciones sea apartado del lado izquierdo y me muestre partícipe de la gloria.',
    ahora:
      'Me tienen perplejo los males que me rodean, Purísima; pero líbrame pronto de ellos, porque sólo a ti he acudido.',
  }),
  oda({
    n: 5,
    irmos: 'Al amanecer te clamamos: Señor, sálvanos; porque Tú eres nuestro Dios, y fuera de Ti no conocemos otro.',
    troparios: [
      'Tú, que tienes confianza ante Dios, mi santo guardián, suplícale que me libre de los males que me afligen.',
      'Luz luminosa, ilumina con claridad mi alma, guía y guardián mío, ángel que Dios me ha dado.',
    ],
    gloria:
      'Duermo perversamente bajo el peso del pecado: guárdame, ángel de Dios, como si velara, y levántame con tu súplica a la alabanza.',
    ahora:
      'María, Señora Theotokos, que no conociste esposo, esperanza de los fieles: abate la soberbia del enemigo y alegra a los que te cantan.',
  }),
  oda({
    n: 6,
    irmos: 'Dame una túnica luminosa, Tú que te vistes de luz como de un manto, Cristo, Dios nuestro, lleno de misericordia.',
    troparios: [
      'Líbrame de todas las desgracias y sálvame de las tristezas, te lo ruego, santo ángel que Dios me dio, mi buen guardián.',
      'Alumbra mi mente, oh bueno, e ilumíname, te lo ruego, santo ángel, y enséñame a pensar siempre lo que me conviene.',
    ],
    gloria:
      'Aparta mi corazón de la agitación presente, fortaléceme para velar en el bien, guardián mío, y guíame admirablemente a la paz de la vida.',
    ahora:
      'El Verbo de Dios habitó en ti, Theotokos, y te mostró a los hombres como escala celestial: porque por ti el Altísimo bajó hasta nosotros.',
  }),
  s('kontakion', 'Kontakion e ikos', [
    rub('Kontakion, en el tono cuarto:'),
    t('Muéstrate misericordioso conmigo, santo ángel del Señor, guardián mío, y no te apartes de mí, impuro; ilumíname con la luz inaccesible y hazme digno del Reino de los cielos.'),
    rub('Ikos'),
    t('Mi alma, humillada por muchas tentaciones, hazla tú digna, santo protector, de la gloria inefable del cielo, tú que cantas con los coros de las potestades incorpóreas de Dios. Ten piedad de mí y guárdame, ilumina mi alma con buenos pensamientos, para que me enriquezca con tu gloria, ángel mío; abate a los enemigos que piensan mal contra mí, y hazme digno del Reino de los cielos.'),
  ]),
  oda({
    n: 7,
    irmos:
      'Los jóvenes venidos de Judea pisotearon en otro tiempo en Babilonia, por la fe en la Trinidad, la llama del horno, cantando: Dios de nuestros padres, bendito eres.',
    troparios: [
      'Sé misericordioso conmigo y suplica a Dios, ángel del Señor; porque te tengo por defensor en toda mi vida, por guía y guardián que Dios me dio para siempre.',
      'No dejes, santo ángel, que los bandidos maten en el camino a mi alma miserable, que Dios te entregó sin mancha; sino guíala por el camino del arrepentimiento.',
    ],
    gloria:
      'Te traigo mi alma toda avergonzada por mis malos pensamientos y mis malas obras; pero adelántate, guía mío, y cúrame con buenos pensamientos, para que me incline siempre a los caminos rectos.',
    ahora:
      'Sabiduría personal del Altísimo: por la Theotokos, llena de sabiduría y de fuerza divina a todos los que claman con fe: Dios de nuestros padres, bendito eres.',
  }),
  oda({
    n: 8,
    irmos: 'Al Rey del cielo, a quien cantan los ejércitos de los ángeles, alabadle y exaltadle por todos los siglos.',
    troparios: [
      'Enviado por Dios, afianza la vida de tu siervo, ángel buenísimo, y no me abandones nunca.',
      'Te canto por los siglos, bienaventurado, a ti, ángel bueno, guía y guardián de mi alma.',
    ],
    gloria:
      'Sé para mí amparo y muralla en el día del juicio de todos los hombres, cuando las obras buenas y las malas sean probadas por el fuego.',
    ahora:
      'Sé mi ayuda y mi paz, Theotokos siempre Virgen, a mí, tu siervo, y no dejes que me vea privado de tu protección.',
  }),
  oda({
    n: 9,
    irmos:
      'Te confesamos verdaderamente Theotokos, Virgen pura, nosotros, los que por ti hemos sido salvados, y te engrandecemos con los coros de los incorpóreos.',
    aJesus:
      'Ten piedad de mí, único Salvador mío, porque eres misericordioso y compasivo, y hazme partícipe de los coros de los justos.',
    troparios: [
      'Concédeme, ángel del Señor, pensar y hacer siempre lo bueno y lo provechoso, y muéstrame fuerte en la debilidad y sin mancha.',
    ],
    gloria:
      'Tú, que tienes confianza ante el Rey del cielo, suplícale con los demás incorpóreos que tenga piedad de mí, desdichado.',
    ahora:
      'Tú, Virgen, que tienes gran confianza ante el que se encarnó de ti, líbrame de las cadenas y dame por tus oraciones la liberación y la salvación.',
  }),
  s('oracion', 'Oración al ángel de la guarda', [
    rub('Con ella termina el canon:'),
    t('Santo ángel de Cristo, postrado ante ti te suplico, mi santo guardián, que me fuiste dado desde el santo bautismo para guardar mi alma y mi cuerpo de pecador. Pero yo, con mi pereza y mis malas costumbres, he irritado tu purísima luz y te he alejado de mí con toda clase de obras vergonzosas: con mentiras, calumnias, envidia, juicios, desprecio, desobediencia, odio a mis hermanos y rencor, amor al dinero, adulterio, ira, avaricia, glotonería sin saciedad y embriaguez, palabrería, pensamientos malos y astutos, costumbres soberbias y lujuria desenfrenada, entregado por mi propia voluntad a todo deseo de la carne.'),
    t('¡Oh, mi mala voluntad, que ni las bestias sin razón la siguen! ¿Cómo podrás mirarme o acercarte a mí, como a un perro maloliente? ¿Con qué ojos me mirarás, ángel de Cristo, enredado como estoy en obras abominables? ¿Cómo podré pedir ya perdón por mis obras amargas, malas y astutas, en las que caigo todos los días y todas las noches y a toda hora?'),
    t('Pero te suplico, postrado ante ti, santo guardián mío: compadécete de mí, tu siervo pecador e indigno N.; sé mi ayuda y mi defensor contra mi malvado adversario con tus santas oraciones, y hazme partícipe del Reino de Dios con todos los santos, siempre, ahora y siempre, y por los siglos de los siglos. Amén.'),
  ]),
  s('oracion-breve', 'La oración breve al ángel', [
    rub('Se reza también sola, y está en Orar → Oraciones.'),
    t('Santo ángel, que asistes a mi alma miserable y a mi vida atribulada: no me abandones a mí, pecador, ni te apartes de mí por mi falta de dominio. No des lugar al demonio maligno para que me domine con la violencia de este cuerpo mortal. Toma mi mano desdichada y débil y llévame por el camino de la salvación.'),
  ]),
];
