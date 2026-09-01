/**
 * Los otros cuatro akathistos.
 *
 * Todos son posteriores al de la Theotokos y están calcados de él: veinticuatro
 * estrofas, kontakia que acaban en «Aleluya», ikoi que acaban con un saludo
 * repetido. El del Dulcísimo Jesús es del siglo XIV o XV y se reza mucho en la
 * piedad griega y rusa; los otros tres son devocionales y más tardíos.
 *
 * Aquí no está lo mismo que en el de la Theotokos, y conviene decirlo antes de
 * abrirlos. De aquél conozco el texto entero y lo he traducido entero. De
 * éstos tengo con seguridad el proimion, los estribillos y la forma, que es lo
 * que hace falta para rezarlos siguiendo a quien los canta, y de algunos un
 * ikos. Lo demás no lo pongo: rellenar veinticuatro estrofas a base de
 * aproximaciones sería inventar un himno, que es justo lo que ATHOS no hace.
 *
 * Cada ficha dice qué tiene y qué le falta, y la cuenta de lo que falta está
 * en Configuración → Fuentes.
 */
import type { OfficeSection, SourceMeta, TextBlock } from '@/types';

export const akathistMeta = (over: Partial<SourceMeta>): SourceMeta => ({
  tradition: 'Rito bizantino',
  language: 'es',
  license: 'cc-by-sa-4.0',
  dateAdded: '2026-09-01',
  ...over,
  source: `${over.source ?? ''} Traducción al español hecha para ATHOS a partir del original griego o eslavo, que es de dominio público.`.trim(),
  copyright:
    'Texto litúrgico tradicional; el original es de dominio público. Esta versión española es una traducción hecha para ATHOS y se publica bajo CC BY-SA 4.0.',
  notes: `${over.notes ?? ''} Lo que es de ATHOS es la traducción: no procede de ningún libro litúrgico español publicado.`.trim(),
});

const t = (content: string): TextBlock => ({ kind: 'text', content });
const rub = (content: string): TextBlock => ({ kind: 'rubric', content });
const ref = (content: string): TextBlock => ({ kind: 'refrain', content });
const pending = (what: string): TextBlock => ({
  kind: 'pending',
  content: `Contenido pendiente de incorporar: ${what}`,
});
const s = (id: string, title: string, blocks: TextBlock[]): OfficeSection => ({ id, title, blocks });

/** La explicación de la forma, que es la misma en los cuatro. */
const forma = (estribillo: string) =>
  s('forma', 'Cómo está hecho', [
    rub('Como todos los akathistos, sigue el modelo del de la Theotokos: veinticuatro estrofas alternas, doce kontakia y doce ikoi. Se escucha de pie.'),
    rub('Los ikoi terminan con este estribillo, repetido después de cada uno de los doce saludos:'),
    ref(estribillo),
    rub('Y los kontakia, con el suyo:'),
    ref('Aleluya.'),
  ]);

/* ═══════════════ Al Dulcísimo Señor Jesús ═══════════════ */

export const AKATHISTOS_JESUS: OfficeSection[] = [
  s('sobre', 'El akathistos al Nombre', [
    rub('Compuesto hacia los siglos XIV o XV, en el ambiente hesicasta que había hecho de la oración de Jesús el centro de la vida espiritual. Es el akathistos más rezado después del de la Theotokos, y en la piedad rusa se lee los domingos.'),
    rub('Está construido enteramente sobre el Nombre: cada saludo empieza llamando a Jesús.'),
  ]),
  s('proimion', 'Proimion', [
    t('A Ti, campeón y Señor, vencedor del infierno, yo, librado de la muerte eterna, te canto como tu criatura y tu siervo. Y Tú, que tienes una misericordia inefable, líbrame de toda clase de males, para que te aclame: Jesús, Hijo de Dios, ten piedad de mí.'),
  ]),
  forma('Jesús, Hijo de Dios, ten piedad de mí.'),
  s('kontakion-1', 'Primer kontakion', [
    t('Creador de los ángeles y Señor de los ejércitos: abre mi mente y mis labios torpes, como abriste antaño el oído del sordo y la lengua del tartamudo, para que yo también aprenda a decir: Aleluya.'),
  ]),
  s('final', 'Al terminar', [
    t('Oh Jesús dulcísimo y muy compasivo, recibe ahora esta pequeña súplica nuestra, como recibiste las dos moneditas de la viuda, y guarda tu heredad de los enemigos visibles e invisibles, de la ira que viene, de la enfermedad y del hambre, y de toda aflicción; y libra del tormento futuro a los que te aclaman: Aleluya.'),
  ]),
  s('lo-que-falta', 'Las estrofas', [
    rub('Con lo de arriba se sigue y se responde el akathistos cuando lo canta otro, que es como se reza casi siempre.'),
    pending('las veinticuatro estrofas con sus doce saludos cada una.'),
  ]),
];

/* ═══════════════ A san Nicolás ═══════════════ */

export const AKATHISTOS_NICOLAS: OfficeSection[] = [
  s('sobre', 'El akathistos a san Nicolás', [
    rub('San Nicolás de Mira († c. 343) es, después de la Theotokos, el santo con más iglesias dedicadas del mundo ortodoxo, y este akathistos se reza los jueves, día en que la Iglesia lo conmemora junto con los apóstoles.'),
    rub('Su tema es la ayuda concreta: los tres inocentes salvados de la espada, los marineros en la tormenta, las tres muchachas sin dote.'),
  ]),
  forma('Alégrate, Nicolás, gran taumaturgo.'),
  s('tropario', 'Tropario del santo', [
    rub('Se canta antes de empezar, y es el texto por el que se le conoce:'),
    t('Regla de fe e imagen de mansedumbre, maestro de templanza te mostró a tu grey la verdad de las cosas. Por eso alcanzaste con la humildad lo excelso, y con la pobreza la riqueza. Padre y jerarca Nicolás, intercede ante Cristo Dios para que sean salvadas nuestras almas.'),
  ]),
  s('lo-que-falta', 'Las estrofas', [
    pending('las veinticuatro estrofas del himno.'),
  ]),
];

/* ═══════════════ Por los difuntos ═══════════════ */

export const AKATHISTOS_DIFUNTOS: OfficeSection[] = [
  s('sobre', 'El akathistos por los difuntos', [
    rub('De origen ruso y relativamente moderno. Se reza en casa por una persona concreta, sobre todo en los cuarenta días siguientes a su muerte, y no sustituye a la panihida, que es el oficio de la Iglesia por los difuntos y lo celebra un sacerdote.'),
    rub('Se dice el nombre de bautismo del difunto en el lugar señalado.'),
  ]),
  forma('Da descanso, Señor, al alma de tu siervo difunto.'),
  s('kontakion', 'El kontakion del funeral', [
    rub('Es la estrofa que la Iglesia canta en todos sus oficios por los difuntos, y con la que se abre y se cierra éste:'),
    t('Con los santos da descanso, oh Cristo, al alma de tu siervo, donde no hay dolor, ni tristeza, ni suspiro, sino vida sin fin.'),
  ]),
  s('lo-que-falta', 'Las estrofas', [
    rub('Lo que sí está incorporado, y es lo que la Iglesia reza de verdad por los difuntos, está en Orar → En el duelo y en la ficha de la panihida.'),
    pending('las veinticuatro estrofas del himno.'),
  ]),
];

/* ═══════════════ A la Pasión ═══════════════ */

export const AKATHISTOS_PASION: OfficeSection[] = [
  s('sobre', 'El akathistos a la Pasión', [
    rub('Se reza en Cuaresma y en la Semana Santa, y recorre la Pasión paso a paso: Getsemaní, el prendimiento, el juicio, los azotes, la cruz, el sepulcro.'),
  ]),
  forma('Jesús, Dios mío, ten piedad de mí.'),
  s('kontakion-final', 'El kontakion final', [
    t('Oh Jesús, Hijo de Dios, que por nosotros aceptaste la cruz y la muerte: recibe esta pequeña súplica y no nos dejes perecer en nuestros pecados, sino sálvanos por tu Pasión, a los que te aclamamos: Aleluya.'),
  ]),
  s('donde-si', 'Lo que sí está incorporado', [
    rub('Los oficios de la Semana Santa —los Doce Evangelios de la Pasión, las Lamentaciones ante el sepulcro— llevan sus lecturas en Leer → Lecturas del día, que las trae cada año en su fecha.'),
  ]),
  s('lo-que-falta', 'Las estrofas', [
    pending('las veinticuatro estrofas del himno.'),
  ]),
];
