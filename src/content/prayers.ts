/**
 * Biblioteca de oraciones.
 *
 * Los textos incorporados son oraciones litúrgicas tradicionales, de dominio
 * público en su original y de uso corriente en las parroquias ortodoxas de
 * lengua española. Cuando no ha sido posible verificar una versión española
 * completa, la ficha se conserva y el texto queda marcado como pendiente:
 * ATHOS nunca redacta un texto propio haciéndolo pasar por litúrgico.
 */
import type { Prayer, PrayerCategory, PrayerCategoryId, SourceMeta, TextBlock } from '@/types';
import { MORE_PRAYERS } from './prayers-more';
import { THIRD_PRAYERS } from './prayers-third';

export const PRAYER_CATEGORIES: PrayerCategory[] = [
  /* ---- El día ---- */
  { id: 'manana', name: 'Al despertar', description: 'Lo primero, antes que el día empiece a tirar de ti.', order: 1 },
  { id: 'salir-de-casa', name: 'Al salir de casa', description: 'En el umbral, antes de echarse a la calle.', order: 2 },
  { id: 'antes-trabajar', name: 'Antes de trabajar', description: 'Para ofrecer la obra de las manos, y para darla por acabada.', order: 3 },
  { id: 'antes-estudiar', name: 'Antes de estudiar', description: 'Para pedir luz al entendimiento.', order: 4 },
  { id: 'antes-comer', name: 'Antes de comer', description: 'Bendición de la mesa.', order: 5 },
  { id: 'despues-comer', name: 'Después de comer', description: 'Acción de gracias por el alimento.', order: 6 },
  { id: 'antes-viajar', name: 'Antes de viajar', description: 'Antes de coger el coche, el tren o el avión.', order: 7 },
  { id: 'noche', name: 'Al acostarse', description: 'Antes del descanso, al cerrar la jornada.', order: 8 },

  /* ---- El alma ---- */
  { id: 'al-pecar', name: 'Al caer en el pecado', description: 'En el momento mismo de la caída, sin dejarlo para luego.', order: 9 },
  { id: 'arrepentimiento', name: 'Arrepentimiento', description: 'Cuando el alma reconoce su pecado y quiere volver.', order: 10 },
  { id: 'tentacion', name: 'En la tentación', description: 'En la hora de la prueba.', order: 11 },
  { id: 'angustia', name: 'En la angustia y la tristeza', description: 'Cuando aprieta la pena, el miedo o el desaliento.', order: 12 },
  { id: 'accion-de-gracias', name: 'Al recibir un bien', description: 'Acción de gracias por los beneficios recibidos.', order: 13 },

  /* ---- Los demás ---- */
  { id: 'familia', name: 'Por la familia', description: 'Por los padres, el cónyuge y los hijos.', order: 14 },
  { id: 'amigos', name: 'Por los amigos', description: 'Por quienes caminan a nuestro lado.', order: 15 },
  { id: 'enemigos', name: 'Por los enemigos', description: 'Por quienes nos hacen daño.', order: 16 },
  { id: 'enfermedad', name: 'En la enfermedad', description: 'Por los enfermos y en la propia dolencia.', order: 17 },
  { id: 'padre-espiritual', name: 'Por el padre espiritual', description: 'Por quien te confiesa y te guía.', order: 18 },
  { id: 'difuntos', name: 'Por los difuntos', description: 'Por los que se han dormido en el Señor.', order: 19 },
  { id: 'agonia', name: 'Junto a un moribundo', description: 'Las horas últimas, y qué se hace en ellas.', order: 20 },
  { id: 'duelo', name: 'En el duelo', description: 'Cuando el muerto es tuyo y el que queda eres tú.', order: 21 },

  /* ---- La casa ---- */
  { id: 'matrimonio', name: 'Por el matrimonio', description: 'Antes de casarse y en los años que vienen después.', order: 22 },
  { id: 'embarazo', name: 'En la espera de un hijo', description: 'Por la mujer encinta, por el parto y por lo que no llega.', order: 23 },
  { id: 'casa', name: 'Por la casa', description: 'El hogar, la mesa y quien entra por la puerta.', order: 24 },

  /* ---- Ante Dios ---- */
  { id: 'templo', name: 'Al entrar en el templo', description: 'En la puerta de la iglesia y ante los iconos.', order: 25 },
  { id: 'escritura', name: 'Antes de leer la Escritura', description: 'Para que la palabra no pase de largo.', order: 26 },
  { id: 'confesion', name: 'Antes de confesar', description: 'Preparación para el sacramento del arrepentimiento.', order: 27 },
  { id: 'comunion', name: 'Antes de comulgar', description: 'Antes y después de los Santos Misterios.', order: 28 },
  { id: 'dudas', name: 'Cuando falla la fe', description: 'Cuando no sale, no se siente nada o se ha dejado de creer.', order: 29 },
  { id: 'paz', name: 'En tiempo de guerra', description: 'Por la paz, por las víctimas y por los que combaten.', order: 30 },
  { id: 'otras', name: 'Otras oraciones', description: 'Oraciones para diversas circunstancias.', order: 31 },
];

const TRAD: SourceMeta = {
  source: 'Libro de oraciones ortodoxo (Horologion y Molitvoslov), uso tradicional',
  tradition: 'Rito bizantino',
  language: 'es',
  license: 'traditional',
  copyright: 'Texto litúrgico tradicional, de dominio público en su original griego o eslavo.',
  dateAdded: '2026-01-01',
  notes: 'Versión española de uso corriente en las parroquias ortodoxas hispanohablantes.',
};

const meta = (over: Partial<SourceMeta> = {}): SourceMeta => ({ ...TRAD, ...over });

const t = (content: string): TextBlock => ({ kind: 'text', content });
const rub = (content: string): TextBlock => ({ kind: 'rubric', content });
const head = (content: string): TextBlock => ({ kind: 'heading', content });
const PENDING: TextBlock[] = [{ kind: 'pending', content: 'Contenido pendiente de incorporar.' }];

interface Seed {
  id: string;
  title: string;
  subtitle?: string;
  category: PrayerCategoryId;
  blocks: TextBlock[];
  meta?: SourceMeta;
  status?: Prayer['status'];
}

const seeds: Seed[] = [
  /* ======================= MAÑANA ======================= */
  {
    id: 'comienzo-habitual',
    title: 'Comienzo habitual',
    subtitle: 'Oraciones iniciales de toda regla',
    category: 'manana',
    blocks: [
      rub('Al levantarte, haz la señal de la Cruz y di:'),
      t('En el nombre del Padre, y del Hijo, y del Espíritu Santo. Amén.'),
      rub('Después, guarda un momento de silencio hasta que se aquieten los sentidos. Sólo entonces empieza:'),
      t('Gloria a Ti, Dios nuestro, gloria a Ti.'),
      head('Oración al Espíritu Santo'),
      t('Rey celestial, Consolador, Espíritu de verdad, que estás en todo lugar y todo lo llenas, tesoro de bienes y dador de vida: ven y habita en nosotros, purifícanos de toda mancha y salva, oh Bueno, nuestras almas.'),
      rub('Desde Pascua hasta la Ascensión, en lugar de esta oración se dice tres veces «Cristo ha resucitado». Desde la Ascensión hasta Pentecostés se omite.'),
      head('Trisagio'),
      t('Santo Dios, Santo Fuerte, Santo Inmortal, ten piedad de nosotros. <em>(tres veces)</em>'),
      t('Gloria al Padre, y al Hijo, y al Espíritu Santo, ahora y siempre, y por los siglos de los siglos. Amén.'),
      head('Oración a la Santísima Trinidad'),
      t('Santísima Trinidad, ten piedad de nosotros. Señor, purifica nuestros pecados. Soberano, perdona nuestras iniquidades. Santo, visita y sana nuestras enfermedades, por tu nombre.'),
      t('Señor, ten piedad. <em>(tres veces)</em>'),
      t('Gloria al Padre, y al Hijo, y al Espíritu Santo, ahora y siempre, y por los siglos de los siglos. Amén.'),
      head('Oración del Señor'),
      t('Padre nuestro, que estás en los cielos, santificado sea tu nombre; venga a nosotros tu reino; hágase tu voluntad, así en la tierra como en el cielo. Danos hoy nuestro pan de cada día; perdónanos nuestras deudas, así como nosotros perdonamos a nuestros deudores; y no nos dejes caer en la tentación, mas líbranos del maligno.'),
      rub('El sacerdote concluye: Porque tuyo es el reino, y el poder, y la gloria, del Padre, y del Hijo, y del Espíritu Santo, ahora y siempre, y por los siglos de los siglos. Amén.'),
      t('Señor, ten piedad. <em>(doce veces)</em>'),
      t('Gloria al Padre, y al Hijo, y al Espíritu Santo, ahora y siempre, y por los siglos de los siglos. Amén.'),
      head('Invitatorio'),
      t('Venid, adoremos y postrémonos ante Dios, nuestro Rey.'),
      t('Venid, adoremos y postrémonos ante Cristo, nuestro Rey y nuestro Dios.'),
      t('Venid, adoremos y postrémonos ante el mismo Cristo, Rey y Dios nuestro.'),
    ],
  },
  {
    id: 'oracion-publicano',
    title: 'Oración del publicano',
    category: 'manana',
    blocks: [t('Oh Dios, ten piedad de mí, pecador.')],
    meta: meta({ source: 'Evangelio según San Lucas 18, 13', license: 'public-domain' }),
  },
  {
    id: 'macario-primera',
    title: 'Primera oración de la mañana',
    subtitle: 'De san Macario el Grande',
    category: 'manana',
    blocks: [
      t('Oh Dios, purifícame a mí, pecador, porque nunca he hecho nada bueno delante de Ti. Líbrame del maligno, y que se haga en mí tu voluntad, para que abra sin condenación mis labios indignos y alabe tu santo nombre: del Padre, y del Hijo, y del Espíritu Santo, ahora y siempre, y por los siglos de los siglos. Amén.'),
    ],
    meta: meta({ author: 'San Macario el Grande' }),
  },
  {
    id: 'al-despertar',
    title: 'Al levantarse del sueño',
    category: 'manana',
    blocks: [
      t('Te adoramos, Trinidad santa, consustancial y vivificante: gloria a Ti.'),
      t('Habiéndome levantado del sueño, te ofrezco esta súplica, oh Salvador, y clamo a Ti con las palabras del profeta: he pecado contra Ti, Señor; ten piedad de mí y sálvame.'),
      t('Gloria al Padre, y al Hijo, y al Espíritu Santo.'),
      t('Concédeme, Señor, empezar hoy a servirte de verdad, porque hasta ahora nada bueno he hecho delante de Ti.'),
      t('Ahora y siempre, y por los siglos de los siglos. Amén.'),
      t('Theotokos, esperanza y protección de los cristianos, no desprecies mi súplica, sino ayúdame en esta hora.'),
    ],
  },
  {
    id: 'filareto',
    title: 'Oración de la mañana',
    subtitle: 'Atribuida a san Filareto de Moscú y a los ancianos de Óptina',
    category: 'manana',
    blocks: [
      t('Señor, concédeme aceptar con serenidad de alma todo lo que este día me traiga.'),
      t('Concédeme entregarme por entero a tu santa voluntad.'),
      t('En cada hora de este día, instrúyeme y sostenme en todo.'),
      t('Cualesquiera que sean las noticias que reciba durante el día, enséñame a acogerlas con el alma tranquila y con la firme convicción de que en todo se cumple tu santa voluntad.'),
      t('En todas mis palabras y en todas mis obras, guía mis pensamientos y mis sentimientos.'),
      t('En los acontecimientos imprevistos, no me dejes olvidar que todo procede de Ti.'),
      t('Enséñame a tratar con rectitud y sencillez a cuantos me rodean, sin turbar ni afligir a nadie.'),
      t('Señor, dame fuerzas para soportar la fatiga de este día y todos los sucesos que traiga consigo.'),
      t('Guía mi voluntad y enséñame a orar, a creer, a esperar, a sufrir, a perdonar y a amar. Amén.'),
    ],
    meta: meta({
      author: 'San Filareto de Moscú († 1867); difundida también como oración de los ancianos de Óptina',
      source: 'Texto de amplia difusión; original ruso de dominio público',
    }),
  },
  {
    id: 'angel-guarda-manana',
    title: 'Al Ángel de la Guarda',
    category: 'manana',
    blocks: [
      t('Santo Ángel, que velas sobre mi alma miserable y sobre mi vida atormentada: no me abandones, pecador, ni te apartes de mí por mi falta de dominio. No des lugar al espíritu maligno para que domine sobre mí con la violencia de este cuerpo mortal. Toma mi mano débil y desdichada y condúceme por el camino de la salvación. Sí, santo Ángel de Dios, guardián y protector de mi alma miserable y de mi cuerpo: perdóname todo aquello con lo que te he afligido todos los días de mi vida, y si algo he pecado en esta noche pasada, protégeme en el día presente y guárdame de toda tentación del enemigo, para que no irrite a Dios con ningún pecado. Ruega por mí al Señor, para que me confirme en su temor y me haga siervo digno de su bondad. Amén.'),
    ],
  },
  {
    id: 'entrega-del-dia',
    title: 'Entrega del día',
    category: 'manana',
    blocks: [
      t('Señor, en tus manos encomiendo mi alma y mi cuerpo, mis obras y mis palabras, mi entrada y mi salida. Fortaléceme para hacer lo que te agrada, y guárdame de todo mal, hoy y siempre. Amén.'),
    ],
  },

  /* ======================= NOCHE ======================= */
  {
    id: 'damasceno-noche',
    title: 'Oración antes del sueño',
    subtitle: 'De san Juan Damasceno',
    category: 'noche',
    blocks: [
      rub('Señalando el lecho, di:'),
      t('Soberano amante de los hombres, ¿acaso este lecho será mi sepulcro, o alumbrarás todavía mi alma miserable con la luz de otro día? He aquí que el sepulcro está delante de mí, he aquí que la muerte me acecha. Temo, Señor, tu juicio y el tormento sin fin; pero no ceso de hacer el mal, y a Ti, Señor Dios mío, te irrito continuamente, y a mi Ángel custodio, y a todos los santos. Sé que soy indigno de tu misericordia y digno de toda condenación. Pero, Señor, quieras o no, sálvame: porque salvar a un justo no es cosa grande, ni tener piedad de un puro es maravilla, pues son dignos de tu misericordia; mas muestra en mí, pecador, la maravilla de tu bondad. Amén.'),
    ],
    meta: meta({ author: 'San Juan Damasceno' }),
  },
  {
    id: 'perdon-nocturno',
    title: 'Perdón antes de dormir',
    category: 'noche',
    blocks: [
      t('Perdona, Señor, a cuantos me odian y me ofenden. Haz el bien a los que me hacen bien. Concede a mis hermanos y a mis allegados cuanto piden para su salvación. Visita a los enfermos y concédeles la curación. Guía a los que navegan. Acompaña a los que van de camino. Concede a los que gobiernan sabiduría y paz. Perdona a los que me han pedido, indigno de mí, que ore por ellos. Ten piedad, Señor, según tu gran misericordia, de todos los que he olvidado nombrar, porque Tú eres bendito por los siglos de los siglos. Amén.'),
    ],
  },
  {
    id: 'examen-del-dia',
    title: 'Examen del día',
    category: 'noche',
    blocks: [
      rub('Antes de las oraciones nocturnas, repasa el día en silencio ante Dios, sin excusarte ni desesperar.'),
      t('¿En qué he ofendido hoy a Dios, de obra, de palabra o de pensamiento?'),
      t('¿A quién he herido, y a quién he dejado de ayudar pudiendo hacerlo?'),
      t('¿Qué he recibido hoy que no haya agradecido?'),
      t('¿Dónde me ha sostenido Dios sin que yo lo advirtiera?'),
      rub('Reconoce lo hallado con sencillez, pídele perdón y proponte una sola cosa concreta para mañana.'),
    ],
    meta: meta({
      source: 'Guía de examen redactada para ATHOS conforme a la práctica ascética común',
      license: 'cc-by-sa-4.0',
      copyright:
        'Texto redactado para ATHOS. No es un texto litúrgico ni procede de un libro litúrgico. ' +
        'Se publica bajo CC BY-SA 4.0.',
      notes: 'No es un texto litúrgico, sino una ayuda para el examen de conciencia.',
    }),
  },
  {
    id: 'theotokos-noche',
    title: 'A la Santísima Theotokos',
    category: 'noche',
    blocks: [
      t('Theotokos Virgen, alégrate, María llena de gracia, el Señor es contigo. Bendita tú eres entre las mujeres y bendito es el fruto de tu vientre, porque diste a luz al Salvador de nuestras almas.'),
      t('Digno es en verdad bendecirte a Ti, Theotokos, siempre bienaventurada y toda pura, y Madre de nuestro Dios. Más venerable que los querubines e incomparablemente más gloriosa que los serafines, tú que sin mancha diste a luz al Verbo de Dios: verdadera Theotokos, te magnificamos.'),
    ],
  },
  {
    id: 'simeon-noche',
    title: 'Cántico de san Simeón',
    category: 'noche',
    blocks: [
      t('Ahora, Señor, despides a tu siervo en paz, según tu palabra; porque han visto mis ojos tu salvación, la que has preparado ante la faz de todos los pueblos: luz para iluminar a las naciones y gloria de tu pueblo Israel.'),
    ],
    meta: meta({ source: 'Evangelio según San Lucas 2, 29-32', license: 'public-domain' }),
  },
  {
    id: 'oracion-final-noche',
    title: 'Al acostarse',
    category: 'noche',
    blocks: [
      t('En tus manos, Señor Jesucristo, Dios mío, encomiendo mi espíritu. Tú me bendices, Tú me tienes piedad, Tú me das la vida eterna. Amén.'),
    ],
  },

  /* ======================= MESA ======================= */
  {
    id: 'antes-de-comer',
    title: 'Bendición de la mesa',
    category: 'antes-comer',
    blocks: [
      rub('Se dice el Padre Nuestro y luego:'),
      t('Los ojos de todos esperan en Ti, Señor, y Tú les das su alimento a su tiempo. Abres tu mano y colmas de bendición a todo ser viviente.'),
      t('Cristo Dios, bendice el alimento y la bebida de tus siervos, porque Tú eres santo, ahora y siempre, y por los siglos de los siglos. Amén.'),
    ],
    meta: meta({ source: 'Salmo 144 (145), 15-16 y bendición de la mesa del Horologion' }),
  },
  {
    id: 'despues-de-comer',
    title: 'Acción de gracias después de comer',
    category: 'despues-comer',
    blocks: [
      t('Te damos gracias, Cristo Dios nuestro, porque nos has saciado de tus bienes terrenales. No nos prives tampoco de tu Reino celestial, sino que, como viniste en medio de tus discípulos, oh Salvador, y les diste la paz, ven también a nosotros y sálvanos.'),
      t('Digno es en verdad bendecirte a Ti, Theotokos, siempre bienaventurada y toda pura, y Madre de nuestro Dios.'),
      t('Gloria al Padre, y al Hijo, y al Espíritu Santo, ahora y siempre, y por los siglos de los siglos. Amén.'),
      t('Señor, ten piedad. <em>(tres veces)</em> Bendice.'),
    ],
  },

  /* ======================= ESTUDIO Y TRABAJO ======================= */
  {
    id: 'antes-de-estudiar',
    title: 'Antes del estudio',
    category: 'antes-estudiar',
    blocks: [
      t('Señor Jesucristo, Dios nuestro, que hiciste descender sobre tus santos discípulos y apóstoles el Espíritu Santo: envía también sobre mí, tu siervo, la gracia de ese mismo Espíritu, para que cuanto aprenda lo aprenda para gloria tuya y provecho del prójimo. Abre los ojos de mi entendimiento, ilumina mi mente y afirma mi memoria, por las oraciones de la Santísima Theotokos y de todos los santos. Amén.'),
    ],
  },
  {
    id: 'antes-de-trabajar',
    title: 'Antes del trabajo',
    category: 'antes-trabajar',
    blocks: [
      t('Señor Jesucristo, Hijo de Dios: bendice la obra de mis manos. Que cuanto haga hoy sea hecho con verdad y sin negligencia, no para ser visto por los hombres, sino delante de Ti. Aparta de mí la prisa que turba y la pereza que corrompe, y concédeme acabar en paz lo que empiezo. Amén.'),
    ],
    meta: meta({
      source: 'Oración redactada para ATHOS a partir de fórmulas del Horologion',
      license: 'cc-by-sa-4.0',
      copyright:
        'Texto redactado para ATHOS. No es un texto litúrgico ni procede de un libro litúrgico. ' +
        'Se publica bajo CC BY-SA 4.0.',
      notes: 'No es un texto litúrgico: no procede de un libro litúrgico y se ofrece como ayuda.',
    }),
  },
  {
    id: 'antes-de-viajar',
    title: 'Antes de emprender viaje',
    category: 'antes-viajar',
    blocks: [
      t('Señor Jesucristo, Dios nuestro, verdadero y auténtico Camino, que acompañaste a tu siervo José y viajaste con Lucas y Cleofás hacia Emaús: acompaña también, Señor, a tus siervos que emprenden este camino. Líbralos de todo peligro y devuélvelos sanos y salvos, porque tuyo es el poder y la gloria, ahora y siempre, y por los siglos de los siglos. Amén.'),
    ],
  },

  /* ======================= ARREPENTIMIENTO ======================= */
  {
    id: 'efren-sirio',
    title: 'Oración de san Efrén el Sirio',
    subtitle: 'Se dice con postraciones durante la Gran Cuaresma',
    category: 'arrepentimiento',
    blocks: [
      rub('Con una gran postración tras cada petición:'),
      t('Señor y Soberano de mi vida: no me des espíritu de ociosidad, de desaliento, de dominio ni de vaniloquio.'),
      t('Concede en cambio a mí, tu siervo, espíritu de castidad, de humildad, de paciencia y de amor.'),
      t('Sí, Señor y Rey: concédeme ver mis propios pecados y no juzgar a mi hermano, porque bendito eres por los siglos de los siglos. Amén.'),
      rub('Después, doce veces: Oh Dios, purifícame a mí, pecador. Y de nuevo la oración entera con una postración final.'),
    ],
    meta: meta({ author: 'San Efrén el Sirio († 373)' }),
  },
  {
    id: 'oracion-de-jesus',
    title: 'Oración de Jesús',
    category: 'arrepentimiento',
    blocks: [
      t('Señor Jesucristo, Hijo de Dios, ten misericordia de mí, pecador.'),
      rub('Forma breve: Señor Jesucristo, ten piedad de mí. — Forma brevísima: Señor, ten piedad.'),
    ],
    meta: meta({
      source: 'Filocalia; tradición hesicasta',
      notes: 'Núcleo de la oración del corazón. Puede repetirse con chotki: véase el módulo dedicado.',
    }),
  },
  {
    id: 'salmo-50-ref',
    title: 'Salmo 50',
    subtitle: 'Ten piedad de mí, oh Dios',
    category: 'arrepentimiento',
    blocks: [
      t('Ten piedad de mí, oh Dios, conforme a tu misericordia; conforme a la multitud de tus piedades borra mis rebeliones. Lávame más y más de mi maldad, y límpiame de mi pecado.'),
      rub('El salmo se lee íntegro desde el Salterio: Leer → Salterio → Salmo 50.'),
    ],
    meta: meta({
      source: 'Salterio, salmo 50 según la numeración de los Setenta (51 hebreo). Reina-Valera 1909',
      license: 'public-domain',
    }),
  },
  {
    id: 'canon-arrepentimiento-ref',
    title: 'Gran Canon de san Andrés de Creta',
    category: 'arrepentimiento',
    blocks: PENDING,
    status: 'pending',
    meta: meta({
      author: 'San Andrés de Creta († 740)',
      source: 'Triodion. Se canta en la primera semana de la Gran Cuaresma y el jueves de la quinta semana.',
      license: 'pending',
      notes: 'Texto completo pendiente de incorporar: son doscientas cincuenta estrofas y no se transcribe de forma aproximada.',
    }),
  },

  /* ======================= ACCIÓN DE GRACIAS ======================= */
  {
    id: 'accion-gracias',
    title: 'Acción de gracias por todo beneficio',
    category: 'accion-de-gracias',
    blocks: [
      t('Gloria a Ti, Señor, Rey de los siglos, que me has concedido bienes grandes e inescrutables. Gloria a Ti por lo que conozco y por lo que ignoro, por lo que veo y por lo que se me oculta. Recibe, Señor, esta acción de gracias de tu siervo indigno, y concédeme amarte con todo el corazón y servirte todos los días de mi vida. Amén.'),
    ],
  },
  {
    id: 'gloria-a-dios-por-todo',
    title: 'Gloria a Dios por todas las cosas',
    category: 'accion-de-gracias',
    blocks: [
      t('Gloria a Dios por todas las cosas.'),
      rub('Últimas palabras de san Juan Crisóstomo, camino del destierro.'),
    ],
    meta: meta({ author: 'San Juan Crisóstomo († 407)' }),
  },

  /* ======================= TENTACIÓN ======================= */
  {
    id: 'en-la-tentacion',
    title: 'En la hora de la tentación',
    category: 'tentacion',
    blocks: [
      t('Señor Jesucristo, Hijo de Dios, ten misericordia de mí, pecador.'),
      rub('Repítela sin contar, hasta que pase la hora. La tradición no aconseja discutir con el pensamiento, sino volver al Nombre.'),
      t('Dios mío, ven en mi auxilio; Señor, date prisa en socorrerme.'),
      t('Que se levante Dios y se dispersen sus enemigos, y huyan de su presencia los que le aborrecen.'),
    ],
    meta: meta({ source: 'Salmo 69 (70), 2 y Salmo 67 (68), 2; tradición hesicasta' }),
  },

  /* ======================= ENFERMEDAD ======================= */
  {
    id: 'por-el-enfermo',
    title: 'Por un enfermo',
    category: 'enfermedad',
    blocks: [
      t('Señor Jesucristo, médico de las almas y de los cuerpos, que no viniste a llamar a los justos sino a los pecadores al arrepentimiento: visita a tu siervo N., sánalo de toda enfermedad del cuerpo y del alma, y levántalo del lecho del dolor, porque Tú eres nuestra vida y a Ti damos gloria, al Padre, y al Hijo, y al Espíritu Santo, ahora y siempre, y por los siglos de los siglos. Amén.'),
    ],
  },
  {
    id: 'en-la-propia-enfermedad',
    title: 'En la propia enfermedad',
    category: 'enfermedad',
    blocks: [
      t('Señor, Tú conoces lo que me conviene. Concédeme llevar esta dolencia con paciencia y sin murmuración; y si es tu voluntad, devuélveme la salud para servirte. Pero no se haga mi voluntad, sino la tuya. Amén.'),
    ],
  },

  /* ======================= FAMILIA, AMIGOS, ENEMIGOS ======================= */
  {
    id: 'por-la-familia',
    title: 'Por la familia',
    category: 'familia',
    blocks: [
      t('Señor Jesucristo, guarda bajo tu protección a mis padres, a mis hermanos, a mi esposo o esposa y a mis hijos. Concédeles salud, paz y salvación, y a mí, un corazón paciente con ellos. Perdona lo que unos a otros nos hemos hecho, y únenos en tu amor. Amén.'),
    ],
  },
  {
    id: 'por-los-hijos',
    title: 'Por los hijos',
    category: 'familia',
    blocks: [
      t('Señor Dios nuestro, fuente de toda bondad: concede a mis hijos crecer en tu temor y en tu amor. Guárdalos de la mala compañía y del mal ejemplo, incluso del mío. Que cuando yo falte, encuentren en Ti el Padre que no falta. Amén.'),
    ],
  },
  {
    id: 'por-los-amigos',
    title: 'Por los amigos',
    category: 'amigos',
    blocks: [
      t('Señor, recuerda a quienes me han hecho bien y a quienes me acompañan. Devuélveles lo que yo no puedo devolverles y guárdalos de todo mal. Amén.'),
    ],
  },
  {
    id: 'por-los-enemigos',
    title: 'Por los enemigos',
    category: 'enemigos',
    blocks: [
      t('Señor, perdona a quienes me odian y me ofenden; haz el bien a quienes me hacen bien; concede a mis hermanos y allegados cuanto piden para su salvación, y a mí, no juzgar a ninguno.'),
      rub('«Amad a vuestros enemigos, bendecid a los que os maldicen» (Mt 5, 44).'),
    ],
  },

  /* ======================= DIFUNTOS ======================= */
  {
    id: 'con-los-santos',
    title: 'Con los santos da descanso',
    subtitle: 'Kontakion de los difuntos',
    category: 'difuntos',
    blocks: [
      t('Con los santos da descanso, oh Cristo, al alma de tu siervo, allí donde no hay dolor, ni tristeza, ni suspiro, sino vida sin fin.'),
    ],
  },
  {
    id: 'por-los-difuntos',
    title: 'Por los difuntos',
    category: 'difuntos',
    blocks: [
      t('Acuérdate, Señor, de tus siervos que se han dormido en la esperanza de la resurrección y de la vida eterna, y perdónales todo pecado voluntario e involuntario, porque no hay hombre que viva y no peque: sólo Tú estás sin pecado, y tu justicia es justicia eterna y tu palabra es verdad.'),
      t('Memoria eterna.'),
    ],
  },

  /* ======================= CONFESIÓN Y COMUNIÓN ======================= */
  {
    id: 'antes-de-confesar',
    title: 'Antes de la confesión',
    category: 'confesion',
    blocks: [
      rub('El sacerdote es testigo, no juez. Se confiesa ante Cristo.'),
      t('He aquí, hermano, que Cristo está invisiblemente presente y recibe tu confesión. No te avergüences ni temas, ni ocultes nada; di sin reservas cuanto has hecho, y recibirás el perdón de nuestro Señor Jesucristo.'),
      t('Señor Dios de nuestra salvación, que en tu bondad perdonas los pecados: acepta mi arrepentimiento y no me rechaces de tu presencia. Concédeme conocer mis faltas tal como son y no como yo quisiera verlas. Amén.'),
    ],
    meta: meta({ source: 'Exhortación del Euchologion antes de la confesión' }),
  },
  {
    id: 'examen-confesion',
    title: 'Guía para el examen antes de la confesión',
    category: 'confesion',
    blocks: [
      rub('Ayuda para preparar la confesión. No es un texto litúrgico ni sustituye al consejo del confesor.'),
      head('Ante Dios'),
      t('¿He orado con negligencia o he abandonado la oración? ¿He guardado los días de ayuno y las fiestas? ¿He recibido los Misterios con ligereza? ¿He puesto mi confianza en otras cosas antes que en Dios?'),
      head('Ante el prójimo'),
      t('¿He juzgado, murmurado o humillado a alguien? ¿He guardado rencor? ¿He mentido? ¿He sido avaro con quien necesitaba? ¿He descuidado a los míos?'),
      head('Ante mí mismo'),
      t('¿He consentido pensamientos impuros, la ira, la envidia, la vanidad, la pereza? ¿He usado mal el tiempo, el cuerpo, la palabra?'),
      rub('Escribe lo que encuentres, dilo con sencillez y sin justificarte, y no vuelvas a rumiarlo después de recibir el perdón.'),
    ],
    meta: meta({
      source: 'Guía redactada para ATHOS conforme a los manuales de confesión de uso común',
      license: 'cc-by-sa-4.0',
      copyright:
        'Texto redactado para ATHOS. No es un texto litúrgico ni procede de un libro litúrgico. ' +
        'Se publica bajo CC BY-SA 4.0.',
      notes:
        'No es un texto litúrgico, sino una ayuda para el examen de conciencia. Lo que aquí falte o ' +
        'sobre lo dirá el confesor, que conoce lo que esta lista no puede conocer.',
    }),
  },
  {
    id: 'creo-senor-y-confieso',
    title: 'Creo, Señor, y confieso',
    subtitle: 'Antes de la Santa Comunión',
    category: 'comunion',
    blocks: [
      t('Creo, Señor, y confieso que Tú eres en verdad el Cristo, el Hijo de Dios vivo, que viniste al mundo para salvar a los pecadores, de los cuales yo soy el primero.'),
      t('Creo además que este es tu purísimo Cuerpo y esta es tu preciosa Sangre. Por eso te ruego: ten piedad de mí y perdona mis transgresiones, voluntarias e involuntarias, de palabra o de obra, conscientes o inconscientes, y hazme digno de participar sin condenación de tus purísimos Misterios, para remisión de los pecados y vida eterna. Amén.'),
      t('De tu mística Cena, Hijo de Dios, recíbeme hoy como partícipe; porque no revelaré el misterio a tus enemigos, ni te daré un beso como Judas, sino que, como el ladrón, te confieso: acuérdate de mí, Señor, en tu Reino.'),
      t('Que la comunión de tus santos Misterios no sea para mí juicio ni condenación, Señor, sino curación del alma y del cuerpo. Amén.'),
    ],
    meta: meta({ source: 'Oraciones ante la Santa Comunión, Horologion' }),
  },
  {
    id: 'despues-de-comulgar',
    title: 'Después de la Santa Comunión',
    category: 'comunion',
    blocks: [
      t('Gloria a Ti, oh Dios. Gloria a Ti, oh Dios. Gloria a Ti, oh Dios.'),
      t('Te doy gracias, Señor Dios mío, porque no me has rechazado a mí, pecador, sino que me has hecho digno de participar de tus santos Misterios. Te doy gracias porque a mí, indigno, me has concedido comulgar de tus purísimos dones celestiales. Soberano amante de los hombres, que por nosotros moriste y resucitaste: concede que estos Misterios sean para mí salud del alma y del cuerpo, y ahuyenten toda adversidad. Amén.'),
      t('Ahora, Señor, despides a tu siervo en paz, según tu palabra; porque han visto mis ojos tu salvación.'),
    ],
  },
  {
    id: 'canon-comunion',
    title: 'Canon de preparación para la Comunión',
    category: 'comunion',
    blocks: PENDING,
    status: 'pending',
    meta: meta({
      source: 'Oficio de preparación para la Santa Comunión',
      license: 'pending',
      notes: 'Canon completo con sus nueve odas pendiente de incorporar.',
    }),
  },

  /* ======================= OTRAS ======================= */
  {
    id: 'cristo-ha-resucitado',
    title: 'Cristo ha resucitado',
    subtitle: 'Tropario pascual',
    category: 'otras',
    blocks: [
      t('Cristo ha resucitado de entre los muertos, con su muerte ha vencido a la muerte y a los que estaban en los sepulcros les ha dado la vida.'),
      rub('Se canta tres veces, desde la Pascua hasta la Ascensión, en lugar de «Rey celestial».'),
    ],
  },
  {
    id: 'simbolo-de-la-fe',
    title: 'Símbolo de la Fe',
    subtitle: 'Credo de Nicea y Constantinopla',
    category: 'otras',
    blocks: [
      t('Creo en un solo Dios, Padre todopoderoso, Creador del cielo y de la tierra, de todo lo visible y lo invisible.'),
      t('Y en un solo Señor Jesucristo, Hijo único de Dios, nacido del Padre antes de todos los siglos: Luz de Luz, Dios verdadero de Dios verdadero, engendrado, no creado, consustancial al Padre, por quien todo fue hecho; que por nosotros los hombres y por nuestra salvación bajó de los cielos, y se encarnó del Espíritu Santo y de María la Virgen, y se hizo hombre; y fue crucificado por nosotros bajo Poncio Pilato, y padeció y fue sepultado; y resucitó al tercer día según las Escrituras, y subió a los cielos y está sentado a la derecha del Padre; y de nuevo vendrá con gloria para juzgar a vivos y muertos, y su reino no tendrá fin.'),
      t('Y en el Espíritu Santo, Señor y dador de vida, que procede del Padre, que junto con el Padre y el Hijo recibe una misma adoración y gloria, que habló por los profetas.'),
      t('Y en la Iglesia, una, santa, católica y apostólica.'),
      t('Confieso un solo bautismo para el perdón de los pecados. Espero la resurrección de los muertos y la vida del siglo venidero. Amén.'),
      rub('La Iglesia ortodoxa recita el Símbolo sin la añadidura del Filioque, tal como fue proclamado en los concilios de Nicea (325) y Constantinopla (381).'),
    ],
    meta: meta({
      source: 'Símbolo niceno-constantinopolitano (381)',
      license: 'public-domain',
    }),
  },
  {
    id: 'oracion-por-la-paz',
    title: 'Por la paz',
    category: 'otras',
    blocks: [
      t('Señor Jesucristo, que dijiste a tus apóstoles: «Mi paz os dejo, mi paz os doy»: no mires nuestros pecados, sino la fe de tu Iglesia, y concédele la paz. Aparta de nosotros la guerra, el odio y la división, y haz de nosotros instrumentos de tu misericordia. Amén.'),
    ],
    meta: meta({
      source: 'Oración redactada para ATHOS a partir de la Divina Liturgia y de Juan 14, 27',
      license: 'cc-by-sa-4.0',
      copyright:
        'Texto redactado para ATHOS. No es un texto litúrgico ni procede de un libro litúrgico. ' +
        'Se publica bajo CC BY-SA 4.0.',
      notes: 'No es un texto litúrgico: recoge fórmulas de la Liturgia, pero la redacción es de ATHOS.',
    }),
  },
  {
    id: 'oracion-de-la-hora',
    title: 'Oración de cada hora',
    category: 'otras',
    blocks: [
      t('Señor Jesucristo, Hijo de Dios, por las oraciones de tu purísima Madre y de todos los santos, ten piedad de nosotros. Amén.'),
    ],
  },
  {
    id: 'akathistos-ref',
    title: 'Himno Akáthistos a la Theotokos',
    category: 'otras',
    blocks: PENDING,
    status: 'pending',
    meta: meta({
      source: 'Triodion; himno del siglo VI atribuido a san Romano el Meloda',
      license: 'pending',
      notes: 'Véase la sección Biblioteca → Akathistos.',
    }),
  },
];

const plain = (blocks: TextBlock[]) =>
  blocks
    .filter((b) => b.kind !== 'pending')
    .map((b) => b.content.replace(/<[^>]+>/g, ''))
    .join(' ')
    .toLowerCase();

/**
 * Las oraciones de los momentos concretos viven en un archivo aparte y se
 * ordenan aquí junto a las demás: dentro de cada momento se conserva el orden
 * en que fueron escritas, y los momentos siguen el orden del día y de la vida.
 */
const CATEGORY_ORDER = new Map(PRAYER_CATEGORIES.map((c) => [c.id, c.order]));

const allSeeds: Seed[] = [...seeds, ...MORE_PRAYERS, ...THIRD_PRAYERS].sort(
  (a, b) => (CATEGORY_ORDER.get(a.category) ?? 99) - (CATEGORY_ORDER.get(b.category) ?? 99),
);

export const PRAYERS: Prayer[] = allSeeds.map((s, i) => ({
  id: s.id,
  title: s.title,
  subtitle: s.subtitle,
  category: s.category,
  order: i + 1,
  blocks: s.blocks,
  status: s.status ?? 'complete',
  meta: s.meta ?? TRAD,
  searchText: `${s.title} ${s.subtitle ?? ''} ${plain(s.blocks)}`.toLowerCase(),
}));

export const PRAYERS_BY_CATEGORY = new Map<PrayerCategoryId, Prayer[]>();
for (const category of PRAYER_CATEGORIES) {
  PRAYERS_BY_CATEGORY.set(
    category.id,
    PRAYERS.filter((p) => p.category === category.id),
  );
}

export const PRAYER_LICENSE_NOTE =
  'Las oraciones de ATHOS son textos litúrgicos tradicionales, de dominio público en su ' +
  'original. Cuando una versión española concreta esté protegida por derechos de autor y su ' +
  'titular lo comunique, será sustituida. Los textos redactados expresamente para ATHOS se ' +
  'identifican como tales en su ficha.';
