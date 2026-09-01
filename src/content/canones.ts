/**
 * Los cánones, con sus irmoi.
 *
 * Un canon bizantino son nueve odas, y cada oda empieza por un **irmos**: la
 * estrofa modelo, que fija la melodía y el metro de las que vienen detrás, y
 * que alude siempre al cántico bíblico de esa oda —el de Moisés en el mar, el
 * de Ana, el de Habacuc, el de los tres jóvenes en el horno—. Los irmoi son la
 * parte fija y conocida; los troparios que los siguen cambian con la fiesta y
 * son muchos.
 *
 * Aquí están los irmoi traducidos del griego, que es lo que permite seguir un
 * canon y cantarlo. Donde el canon tiene además doscientos cincuenta troparios
 * propios —el Gran Canon—, se dice y se deja dicho: incorporarlos es otro
 * trabajo, y fingir que están sería peor que no tenerlos.
 *
 * Misma advertencia que en el Akáthistos: el texto es auténtico, la versión
 * castellana es de ATHOS y no procede de ningún libro publicado.
 */
import type { OfficeSection, SourceMeta, TextBlock } from '@/types';

const base = {
  tradition: 'Rito bizantino',
  language: 'es' as const,
  license: 'cc-by-sa-4.0' as const,
  dateAdded: '2026-09-01',
};

export const canonMeta = (over: Partial<SourceMeta>): SourceMeta => ({
  ...base,
  ...over,
  source: `${over.source ?? ''} Traducción al español hecha para ATHOS a partir del original griego, que es de dominio público.`.trim(),
  copyright:
    'Texto litúrgico tradicional; el original griego es de dominio público. Esta versión española es una traducción hecha para ATHOS y se publica bajo CC BY-SA 4.0.',
  notes: `${over.notes ?? ''} Lo que es de ATHOS es la traducción: no procede de ningún libro litúrgico español publicado ni se ha cotejado con una edición crítica del griego.`.trim(),
});

const t = (content: string): TextBlock => ({ kind: 'text', content });
const rub = (content: string): TextBlock => ({ kind: 'rubric', content });
const ref = (content: string): TextBlock => ({ kind: 'refrain', content });
const pending = (what: string): TextBlock => ({
  kind: 'pending',
  content: `Contenido pendiente de incorporar: ${what}`,
});
const s = (id: string, title: string, blocks: TextBlock[]): OfficeSection => ({ id, title, blocks });

/* ═══════════════════ Canon Pascual ═══════════════════ */

export const CANON_PASCUAL: OfficeSection[] = [
  s('sobre', 'El canon de la noche de Pascua', [
    rub('Obra de san Juan Damasceno. Se canta en los Maitines de Pascua y todos los días de la Semana Radiante. Como todos los cánones festivos, no tiene segunda oda.'),
    rub('Entre estrofa y estrofa se canta el estribillo, y al final de cada oda se repite el irmos.'),
    ref('Cristo ha resucitado de entre los muertos.'),
  ]),
  s('oda-1', 'Oda 1', [
    t('Éste es el día de la Resurrección: resplandezcamos, pueblos. ¡Pascua, Pascua del Señor! Porque de la muerte a la vida y de la tierra al cielo nos ha llevado Cristo Dios, a los que cantamos el himno de victoria.'),
  ]),
  s('oda-3', 'Oda 3', [
    t('Venid, bebamos una bebida nueva, no sacada milagrosamente de una roca estéril, sino de la fuente de incorrupción que brota del sepulcro de Cristo, en quien nos afianzamos.'),
  ]),
  s('oda-4', 'Oda 4', [
    t('Que se ponga en la guardia divina el divino Habacuc, y nos muestre al ángel portador de luz que dice claramente: Hoy es la salvación del mundo, porque ha resucitado Cristo, como omnipotente.'),
  ]),
  s('oda-5', 'Oda 5', [
    t('Madruguemos muy de mañana, y en lugar de ungüento ofrezcamos un himno al Señor, y veremos a Cristo, sol de justicia, que hace amanecer la vida para todos.'),
  ]),
  s('oda-6', 'Oda 6', [
    t('Descendiste a lo más hondo de la tierra y quebrantaste los cerrojos eternos que retenían a los encadenados, oh Cristo; y al tercer día, como Jonás del monstruo marino, saliste del sepulcro.'),
  ]),
  s('kontakion', 'Kontakion', [
    t('Aunque bajaste al sepulcro, oh Inmortal, destruiste el poder del infierno y resucitaste vencedor, oh Cristo Dios, diciendo a las mujeres portadoras de ungüento: Alegraos, y dando la paz a tus apóstoles, Tú que concedes la resurrección a los caídos.'),
  ]),
  s('oda-7', 'Oda 7', [
    t('El que libró a los jóvenes del horno, hecho hombre, padece como mortal, y por su pasión reviste a lo mortal con la hermosura de la incorrupción: el único Dios de nuestros padres, bendito y lleno de gloria.'),
  ]),
  s('oda-8', 'Oda 8', [
    t('Éste es el día señalado y santo, el primero de las semanas, rey y señor, fiesta de fiestas y solemnidad de solemnidades, en el que bendecimos a Cristo por los siglos.'),
  ]),
  s('oda-9', 'Oda 9', [
    rub('Antes del irmos se canta el megalinario, que pone en boca del ángel el saludo a la Madre de Dios:'),
    t('El ángel gritó a la llena de gracia: Virgen pura, alégrate; y de nuevo digo: alégrate, porque tu Hijo ha resucitado al tercer día del sepulcro, y ha resucitado a los muertos. Pueblos, alegraos.'),
    t('Ilumínate, ilumínate, nueva Jerusalén, porque la gloria del Señor ha amanecido sobre ti. Danza ahora y alégrate, Sión; y tú, Madre de Dios pura, gózate en la resurrección de tu Hijo.'),
  ]),
  s('exapostilario', 'Exapostilario', [
    t('Habiéndote dormido en la carne como mortal, oh Rey y Señor, al tercer día resucitaste, levantando a Adán de la corrupción y aboliendo la muerte. Pascua de la incorrupción, salvación del mundo.'),
  ]),
];

/* ═══════════════════ Gran Canon ═══════════════════ */

export const GRAN_CANON: OfficeSection[] = [
  s('sobre', 'El canon del arrepentimiento', [
    rub('Obra de san Andrés de Creta († 740). Es el canon más largo de la Iglesia: unas doscientas cincuenta estrofas que recorren la Escritura entera, del Génesis al Evangelio, poniendo al alma frente a cada figura bíblica. Se canta partido las cuatro primeras noches de la Gran Cuaresma y entero el jueves de la quinta semana.'),
    ref('Ten piedad de mí, oh Dios, ten piedad de mí.'),
    rub('El estribillo se repite con una postración después de cada estrofa. En las odas dedicadas a santa María Egipcíaca se dice «Santa madre María, ruega a Dios por nosotros», y en las últimas, «Padre venerable Andrés, ruega a Dios por nosotros».'),
  ]),
  s('comienzo', 'Primera estrofa', [
    rub('Con ella empieza el canon, y da el tono de todo lo demás:'),
    t('¿Por dónde empezaré a llorar las acciones de mi vida miserable? ¿Qué principio pondré, oh Cristo, a este lamento? Pero Tú, que eres compasivo, dame el perdón de mis culpas.'),
  ]),
  s('irmos-1', 'Irmos de la oda 1', [
    t('Auxiliador y protector se ha hecho para mi salvación. Éste es mi Dios, y le glorificaré; el Dios de mi padre, y le exaltaré, porque gloriosamente se ha glorificado.'),
  ]),
  s('irmos-2', 'Irmos de la oda 2', [
    rub('El Gran Canon es de los pocos que conservan la segunda oda, que se canta sólo en Cuaresma.'),
    t('Atiende, cielo, y hablaré; y cantaré a Cristo, que vino de la Virgen a habitar en la carne.'),
  ]),
  s('irmos-3', 'Irmos de la oda 3', [
    t('Sobre la piedra inconmovible de tus mandamientos afianza, oh Cristo, a tu Iglesia.'),
  ]),
  s('irmos-4', 'Irmos de la oda 4', [
    t('Oyó el profeta tu venida, Señor, y temió: que ibas a nacer de una Virgen y a manifestarte a los hombres, y decía: Oí tu fama y temí. Gloria a tu poder, Señor.'),
  ]),
  s('irmos-5', 'Irmos de la oda 5', [
    t('De noche madruga mi espíritu hacia Ti, oh Dios, porque son luz tus mandamientos. Ilumínanos en ellos y enséñanos, oh Salvador, a hacer tu voluntad.'),
  ]),
  s('irmos-6', 'Irmos de la oda 6', [
    t('Clamé con todo mi corazón al Dios compasivo, y me escuchó desde el infierno más hondo, y sacó mi vida de la corrupción.'),
  ]),
  s('kontakion', 'Kontakion', [
    rub('Se canta después de la sexta oda, y es la estrofa más conocida del canon:'),
    t('Alma mía, alma mía, levántate: ¿por qué duermes? El fin se acerca y vas a turbarte. Despierta, pues, para que se compadezca de ti Cristo Dios, que está en todo lugar y todo lo llena.'),
  ]),
  s('irmos-7', 'Irmos de la oda 7', [
    t('Pecamos, cometimos iniquidad, obramos injusticia delante de Ti; no guardamos ni cumplimos lo que nos mandaste. Pero no nos entregues hasta el fin, Dios de nuestros padres.'),
  ]),
  s('irmos-8', 'Irmos de la oda 8', [
    t('A quien glorifican los ejércitos de los cielos y ante quien tiemblan los querubines y los serafines, todo aliento y toda criatura cantadle, bendecidle y exaltadle por todos los siglos.'),
  ]),
  s('irmos-9', 'Irmos de la oda 9', [
    t('Es imposible que los hombres vean a Dios, a quien no se atreven a mirar de frente los ejércitos de los ángeles; pero por ti, Purísima, apareció a los hombres el Verbo encarnado, y a quien engrandecemos con los ejércitos del cielo y a ti te llamamos bienaventurada.'),
  ]),
  s('lo-que-falta', 'Los troparios', [
    rub('Los irmoi de las nueve odas están arriba, y con ellos se puede seguir y cantar el canon.'),
    pending('las cerca de doscientas cincuenta estrofas que van entre irmos e irmos, cada una sobre una figura de la Escritura. Es el texto litúrgico más extenso de la Iglesia y su traducción es un trabajo aparte.'),
  ]),
];

/* ═══════════════════ Pequeña Paráclesis ═══════════════════ */

export const CANON_PARACLISIS: OfficeSection[] = [
  s('sobre', 'El canon de súplica', [
    rub('Obra de Teosteriktos el Monje (siglo IX). Se canta las dos primeras semanas de agosto, en el ayuno de la Dormición, y en cualquier momento de aflicción. Puede rezarlo un laico en casa.'),
    ref('Santísima Theotokos, sálvanos.'),
    rub('El estribillo se dice antes de cada estrofa.'),
  ]),
  s('irmos-1', 'Irmos de la oda 1', [
    t('Habiendo atravesado el agua como tierra firme y escapado de la maldad de Egipto, el israelita clamaba: Cantemos a nuestro Redentor y Dios.'),
  ]),
  s('irmos-3', 'Irmos de la oda 3', [
    t('Oh Theotokos, techo y protección de los que a ti acuden, roca viva e inagotable: a ti, refugio celestial, te cantamos. Afiánzame en tu casa espiritual.'),
  ]),
  s('irmos-4', 'Irmos de la oda 4', [
    t('Oí, Señor, el misterio de tu economía; comprendí tus obras y glorifiqué tu divinidad.'),
  ]),
  s('irmos-5', 'Irmos de la oda 5', [
    t('Ilumina, Señor amante de los hombres, con la luz de tu conocimiento divino, a los que madrugan hacia Ti, y guíanos por el camino de tus mandamientos.'),
  ]),
  s('irmos-6', 'Irmos de la oda 6', [
    t('Al ver el mar de la vida levantado por la tempestad de las tentaciones, acudo a tu puerto sereno y te clamo: Saca mi vida de la corrupción, oh Misericordioso.'),
  ]),
  s('kontakion', 'Kontakion', [
    t('Protección de los cristianos que no se avergüenza, mediación ante el Creador que no se rechaza: no desprecies las voces de los pecadores que te suplican, sino adelántate, como buena, a socorrer a los que fielmente te claman. Apresúrate a interceder y date prisa en suplicar, oh Theotokos, que proteges siempre a los que te honran.'),
  ]),
  s('irmos-7', 'Irmos de la oda 7', [
    t('Los jóvenes venidos de Judea, que en Babilonia pisaron la llama del horno confiando en Ti, cantaban: Dios de nuestros padres, bendito eres.'),
  ]),
  s('irmos-8', 'Irmos de la oda 8', [
    t('Al Rey del cielo, a quien cantan los ejércitos de los ángeles, alabadle y exaltadle por todos los siglos.'),
  ]),
  s('irmos-9', 'Irmos de la oda 9', [
    t('Es cosa propia de las madres el parto, y ajena a las vírgenes el dar a luz; por eso en ti, Theotokos, se hizo nuevo lo uno y lo otro. Por eso te engrandecemos.'),
  ]),
  s('final', 'Al terminar', [
    t('No callaremos jamás, oh Theotokos, de proclamar tus proezas, los indignos; porque si tú no te adelantaras a interceder, ¿quién nos habría librado de tantos peligros, o quién nos habría guardado libres hasta ahora? No nos apartemos de ti, Señora, porque tú salvas siempre a tus siervos de toda clase de males.'),
  ]),
  s('lo-que-falta', 'Los troparios', [
    pending('las estrofas que van entre irmos e irmos, distintas en cada oda.'),
  ]),
];

/* ═══════════════════ Canon al Ángel de la Guarda ═══════════════════ */

export const CANON_ANGEL: OfficeSection[] = [
  s('sobre', 'El canon al propio ángel', [
    rub('Se lee la víspera de comulgar, junto con el canon de la Comunión y el de la Theotokos. Cada bautizado tiene un ángel puesto para guardarle, y este canon le habla a él directamente, en segunda persona.'),
    ref('Santo ángel de Dios, guardián mío, ruega a Dios por mí.'),
  ]),
  s('oracion', 'La oración al ángel', [
    rub('Se reza también sola, cada noche, y está en Orar → Oraciones.'),
    t('Santo ángel, que asistes a mi alma miserable y a mi vida atribulada: no me abandones a mí, pecador, ni te apartes de mí por mi falta de dominio. No des lugar al demonio maligno para que me domine con la violencia de este cuerpo mortal. Toma mi mano desdichada y débil y llévame por el camino de la salvación.'),
  ]),
  s('irmos-1', 'Irmos de la oda 1', [
    t('Cantemos al Señor, que condujo a su pueblo por el mar Rojo, porque sólo Él se ha glorificado gloriosamente.'),
  ]),
  s('lo-que-falta', 'Las odas', [
    rub('El estribillo y la oración al ángel, que son lo que se reza fuera del canon, están incorporados.'),
    pending('los troparios de las nueve odas.'),
  ]),
];

/* ═══════════════════ Canon de la Comunión ═══════════════════ */

export const CANON_COMUNION: OfficeSection[] = [
  s('sobre', 'Antes de comulgar', [
    rub('Se lee la víspera, junto con el canon al Ángel de la Guarda y el de la Theotokos, y va seguido de las oraciones ante la Comunión, que sí están incorporadas: Orar → Oraciones → Preparación para la comunión.'),
    ref('Jesús dulcísimo, sálvame.'),
  ]),
  s('irmos-1', 'Irmos de la oda 1', [
    t('Venid, pueblos, cantemos un cántico a Cristo Dios, que dividió el mar y condujo al pueblo que había sacado de la servidumbre de Egipto, porque se ha glorificado.'),
  ]),
  s('final', 'La estrofa final', [
    t('Pan de vida eterna sea para mí tu Cuerpo santo, oh Cristo Dios compasivo, y tu Sangre preciosa, remedio de mis dolencias.'),
  ]),
  s('lo-que-falta', 'Las odas', [
    pending('los troparios de las nueve odas.'),
  ]),
];
