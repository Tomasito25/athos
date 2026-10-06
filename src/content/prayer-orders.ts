/**
 * Los órdenes del libro de oraciones, enteros y seguidos.
 *
 * Las oraciones de la biblioteca se encuentran por momentos, una a una. Pero
 * cuatro de esos momentos el libro de oraciones no los reza sueltos, sino en
 * un orden fijo que se lee de corrido: las oraciones de la mañana, las de antes
 * del sueño, las de antes de comulgar y la acción de gracias de después. Aquí
 * está ese orden, tal como lo traen el Molitvoslov eslavo (mañana y noche) y
 * el Horologion griego (comunión).
 *
 * No hay texto nuevo en este archivo salvo las piezas fijas —el comienzo, los
 * salmos, la despedida—, que son las mismas de los oficios. Cada sección toma
 * los bloques de una oración de la biblioteca por su identificador, de modo
 * que una corrección hecha en la oración llega sola al orden.
 */
import type { PrayerCategoryId, SourceMeta, TextBlock } from '@/types';
import { PRAYERS } from './prayers';
import { SAINT_PROPER_TROPARIA } from './troparia-santos';
import { SAINT_KONTAKIA } from './kontakia';

export type PrayerOrderId = 'manana' | 'noche' | 'antes-de-comulgar' | 'despues-de-comulgar';

export interface PrayerOrderSection {
  id: string;
  title: string;
  /** La oración de la biblioteca de la que procede, si procede de una. */
  prayerId?: string;
  blocks: TextBlock[];
}

export interface PrayerOrder {
  id: PrayerOrderId;
  title: string;
  subtitle: string;
  /** Qué es y cuándo se reza, en dos líneas. */
  about: string;
  /** El momento del menú al que pertenece. */
  category: PrayerCategoryId;
  sections: PrayerOrderSection[];
  meta: SourceMeta;
}

const t = (content: string): TextBlock => ({ kind: 'text', content });
const rub = (content: string): TextBlock => ({ kind: 'rubric', content });
const head = (content: string): TextBlock => ({ kind: 'heading', content });
const psalm = (n: number): TextBlock => ({ kind: 'psalm', content: `Salmo ${n}`, ref: String(n) });

const POR_ID = new Map(PRAYERS.map((p) => [p.id, p]));

/** Los bloques de una oración de la biblioteca; si no existe, se nota en las pruebas. */
function bloques(id: string): TextBlock[] {
  return POR_ID.get(id)?.blocks ?? [];
}

/** Una sección que es una oración de la biblioteca entera. */
function oracion(id: string, titulo?: string, delante: TextBlock[] = []): PrayerOrderSection {
  const p = POR_ID.get(id);
  return { id, title: titulo ?? p?.title ?? id, prayerId: id, blocks: [...delante, ...bloques(id)] };
}

/** Una sección con texto propio del orden. */
const seccion = (id: string, title: string, blocks: TextBlock[]): PrayerOrderSection => ({ id, title, blocks });

/* ---------------- Las piezas fijas ---------------- */

const GLORIA_AHORA = t('Gloria al Padre, y al Hijo, y al Espíritu Santo, ahora y siempre, y por los siglos de los siglos. Amén.');

const TRISAGIO_PADRE_NUESTRO: TextBlock[] = [
  t('Santo Dios, Santo Fuerte, Santo Inmortal, ten piedad de nosotros. <em>(tres veces)</em>'),
  GLORIA_AHORA,
  t('Santísima Trinidad, ten piedad de nosotros. Señor, purifica nuestros pecados. Soberano, perdona nuestras iniquidades. Santo, visita y sana nuestras enfermedades, por tu nombre.'),
  t('Señor, ten piedad. <em>(tres veces)</em>'),
  GLORIA_AHORA,
  t('Padre nuestro, que estás en los cielos, santificado sea tu nombre; venga a nosotros tu reino; hágase tu voluntad, así en la tierra como en el cielo. Danos hoy nuestro pan de cada día; perdónanos nuestras deudas, así como nosotros perdonamos a nuestros deudores; y no nos dejes caer en la tentación, mas líbranos del maligno.'),
];

const REY_CELESTIAL: TextBlock[] = [
  t('Gloria a Ti, Dios nuestro, gloria a Ti.'),
  t('Rey celestial, Consolador, Espíritu de verdad, que estás en todo lugar y todo lo llenas, tesoro de bienes y dador de vida: ven y habita en nosotros, purifícanos de toda mancha y salva, oh Bueno, nuestras almas.'),
  rub('Desde Pascua hasta la Ascensión, en lugar de «Rey celestial» se dice tres veces «Cristo ha resucitado»; desde la Ascensión hasta Pentecostés se omite.'),
];

const COMIENZO = (rubrica: string): TextBlock[] => [
  rub(rubrica),
  t('En el nombre del Padre, y del Hijo, y del Espíritu Santo. Amén.'),
  rub('Espera un momento, hasta que se aquieten los sentidos y el pensamiento deje lo de la tierra. Después, sin prisa y con atención:'),
  t('Oh Dios, ten piedad de mí, pecador. <em>(con una inclinación)</em>'),
  t('Señor Jesucristo, Hijo de Dios, por las oraciones de tu purísima Madre y de todos los santos, ten piedad de nosotros. Amén.'),
  ...REY_CELESTIAL,
  ...TRISAGIO_PADRE_NUESTRO,
];

const VENID_ADOREMOS: TextBlock[] = [
  t('Venid, adoremos y postrémonos ante Dios, nuestro Rey. <em>(inclinación)</em>'),
  t('Venid, adoremos y postrémonos ante Cristo, nuestro Rey y nuestro Dios. <em>(inclinación)</em>'),
  t('Venid, adoremos y postrémonos ante el mismo Cristo, Rey y Dios nuestro. <em>(inclinación)</em>'),
];

const DIGNO_ES = t('Digno es en verdad bendecirte, oh Theotokos, siempre bienaventurada y toda inmaculada, y Madre de nuestro Dios. Más venerable que los querubines e incomparablemente más gloriosa que los serafines, tú que sin mancha diste a luz al Verbo de Dios: verdadera Theotokos, te engrandecemos.');

const CONCLUSION: TextBlock[] = [
  DIGNO_ES,
  GLORIA_AHORA,
  t('Señor, ten piedad. <em>(tres veces)</em>'),
  t('Señor Jesucristo, Hijo de Dios, por las oraciones de tu purísima Madre, de nuestros padres venerables y portadores de Dios y de todos los santos, ten piedad de nosotros. Amén.'),
];

/** El primer bloque de texto de una oración: para piezas que el orden toma sueltas. */
function primerTexto(id: string): TextBlock[] {
  const b = bloques(id).find((x) => x.kind === 'text');
  return b ? [b] : [];
}

const TRADUCCION_META = (fuente: string): SourceMeta => ({
  source: `${fuente}. Las oraciones son las de la biblioteca de ATHOS, cada una con su procedencia; la versión española es una traducción hecha para ATHOS a partir del original, que es de dominio público`,
  tradition: 'Rito bizantino',
  language: 'es',
  license: 'cc-by-sa-4.0',
  copyright:
    'Textos litúrgicos tradicionales; los originales son de dominio público. La versión española es una traducción hecha para ATHOS y se publica bajo CC BY-SA 4.0. Los salmos son los de la Reina-Valera 1909.',
  dateAdded: '2026-10-06',
  notes:
    'Es el orden del libro de oraciones, no una selección de ATHOS. Cada oración enlaza con su ficha, donde consta de dónde viene.',
});

/* ---------------- Los cuatro órdenes ---------------- */

export const PRAYER_ORDERS: PrayerOrder[] = [
  {
    id: 'manana',
    title: 'Oraciones de la mañana',
    subtitle: 'El orden entero del libro de oraciones',
    about:
      'Lo que el libro de oraciones manda rezar al levantarse, antes de cualquier otra cosa: el comienzo, los troparios a la Trinidad, el salmo 50, el Credo y las diez oraciones de los Padres, con la conmemoración de los vivos y de los difuntos.',
    category: 'manana',
    sections: [
      seccion('comienzo', 'El comienzo', COMIENZO('Al levantarte del sueño, antes de cualquier otra cosa, ponte con reverencia ante Dios, que todo lo ve, y haciendo la señal de la cruz di:')),
      oracion('al-despertar', 'Troparios a la Trinidad'),
      oracion('levantandome-trinidad', 'Oración a la Santísima Trinidad'),
      seccion('venid-adoremos', 'Venid, adoremos', VENID_ADOREMOS),
      seccion('salmo-50', 'Salmo 50', [psalm(50)]),
      oracion('simbolo-de-la-fe', 'Símbolo de la Fe'),
      oracion('macario-primera', 'Primera oración, de san Macario'),
      oracion('canto-de-medianoche', 'Segunda oración, de san Macario'),
      oracion('macario-tercera', 'Tercera oración, de san Macario'),
      oracion('macario-cuarta', 'Cuarta oración, de san Macario'),
      oracion('basilio-manana-primera', 'Quinta oración, de san Basilio'),
      oracion('basilio-manana-segunda', 'Sexta oración, de san Basilio'),
      oracion('theotokos-canto-tu-gracia', 'Séptima oración, a la Theotokos'),
      oracion('jesucristo-manana', 'Octava oración, a nuestro Señor Jesucristo'),
      oracion('angel-guarda-manana', 'Novena oración, al Ángel de la Guarda'),
      oracion('theotokos-manana', 'Décima oración, a la Theotokos'),
      oracion('santo-del-nombre', 'Al santo de tu nombre'),
      seccion('alegrate', 'Theotokos Virgen, alégrate', primerTexto('theotokos-noche')),
      oracion('tropario-de-la-cruz', 'Tropario de la Cruz'),
      oracion('por-los-vivos', 'Por los vivos', [
        rub('O, si hay tiempo, la conmemoración larga, que está en Orar → Oraciones → Por la familia.'),
      ]),
      oracion('por-los-padres-difuntos', 'Por los difuntos'),
      seccion('final', 'Al terminar', CONCLUSION),
    ],
    meta: TRADUCCION_META('Libro de oraciones ortodoxo eslavo (Molitvoslov), en la transcripción de Wikisource, oraciones de la mañana'),
  },

  {
    id: 'noche',
    title: 'Oraciones antes del sueño',
    subtitle: 'El orden entero del libro de oraciones',
    about:
      'Lo que el libro de oraciones manda rezar antes de acostarse: el comienzo, los troparios de compunción, las once oraciones de los Padres, las súplicas a la Theotokos y, ya junto a la cama, la oración del Damasceno, la de la Cruz y la confesión de los pecados del día.',
    category: 'noche',
    sections: [
      seccion('comienzo', 'El comienzo', COMIENZO('Se empieza como por la mañana, haciendo la señal de la cruz:')),
      seccion('troparios', 'Troparios de compunción', [
        ...bloques('troparios-de-compuncion'),
        t('Señor, ten piedad. <em>(doce veces)</em>'),
      ]),
      oracion('macario-noche', 'Primera oración, de san Macario'),
      oracion('antioco-noche', 'Segunda oración, de san Antíoco'),
      oracion('espiritu-santo-noche', 'Tercera oración, al Espíritu Santo'),
      oracion('macario-que-te-ofrecere', 'Cuarta oración, de san Macario'),
      oracion('noche-quinta', 'Quinta oración'),
      oracion('noche-sexta', 'Sexta oración'),
      oracion('crisostomo-24', 'Séptima oración, de san Juan Crisóstomo'),
      oracion('noche-octava', 'Octava oración, a nuestro Señor Jesucristo'),
      oracion('estudita-theotokos', 'Novena oración, de san Pedro Estudita'),
      oracion('buena-madre', 'Décima oración, a la Theotokos'),
      oracion('angel-noche', 'Undécima oración, al Ángel de la Guarda'),
      seccion('kontakion', 'Kontakion a la Theotokos', [rub('Tono octavo:'), ...primerTexto('akathistos-ref')]),
      oracion('suplicas-a-la-theotokos', 'Súplicas a la Theotokos'),
      seccion('digno-es', 'Digno es en verdad', [
        ...CONCLUSION,
        rub('En los monasterios las oraciones se rezan en común después de la cena, y aquí se despiden. Lo que sigue se dice ya al acostarse.'),
      ]),
      oracion('damasceno-noche', 'Oración de san Juan Damasceno'),
      oracion('ilumina-mis-ojos', 'Ilumina mis ojos'),
      oracion('levantese-dios', 'A la preciosa Cruz'),
      oracion('perdon-nocturno', 'Remite, perdona, absuelve'),
      oracion('confesion-diaria', 'Confesión de los pecados del día'),
      oracion('oracion-final-noche', 'Al dormirse'),
    ],
    meta: TRADUCCION_META('Libro de oraciones ortodoxo eslavo (Molitvoslov), en la transcripción de Wikisource, oraciones antes del sueño'),
  },

  {
    id: 'antes-de-comulgar',
    title: 'Oraciones antes de comulgar',
    subtitle: 'La mañana de la comunión',
    about:
      'Lo que se reza la mañana en que se va a comulgar, después de las oraciones de la mañana: los salmos 22, 23 y 115, los troparios y las diez oraciones de los Padres, hasta los versos que se dicen camino del cáliz. La víspera, después de las Completas, se lee el canon de preparación.',
    category: 'comunion',
    sections: [
      seccion('vispera', 'La víspera', [
        rub('La noche anterior, después de las Completas, se lee el canon de preparación, que está entero en Orar → Oraciones → Antes de comulgar. Lo que sigue es para la mañana.'),
      ]),
      seccion('comienzo', 'El comienzo', [
        rub('Después de las oraciones de la mañana:'),
        ...TRISAGIO_PADRE_NUESTRO,
        t('Señor, ten piedad. <em>(doce veces)</em>'),
        GLORIA_AHORA,
        ...VENID_ADOREMOS,
      ]),
      seccion('salmos', 'Los tres salmos', [
        psalm(22),
        psalm(23),
        psalm(115),
        GLORIA_AHORA,
        t('Aleluya, aleluya, aleluya. Gloria a Ti, oh Dios. <em>(tres veces)</em>'),
        t('Señor, ten piedad. <em>(tres veces)</em>'),
      ]),
      oracion('troparios-antes-comulgar', 'Troparios y versos'),
      oracion('basilio-antes-comulgar', 'Primera oración, de san Basilio'),
      oracion('basilio-se-senor', 'Segunda oración, de san Basilio'),
      oracion('crisostomo-antes-comulgar', 'Tercera oración, de san Juan Crisóstomo'),
      oracion('crisostomo-no-soy-digno', 'Cuarta oración, de san Juan Crisóstomo'),
      oracion('crisostomo-remite', 'Quinta oración, de san Juan Crisóstomo'),
      oracion('damasceno-antes-comulgar', 'Sexta oración, de san Juan Damasceno'),
      oracion('simeon-de-labios-manchados', 'Séptima oración, de san Simeón el Nuevo Teólogo'),
      oracion('metafrastes-antes-comulgar', 'Octava oración, de Simeón Metafrastes'),
      oracion('damasceno-ante-las-puertas', 'Novena oración, de san Juan Damasceno'),
      // De «Creo, Señor» se toma sólo la oración: el tropario de la Cena y lo
      // demás vienen en la sección siguiente, en su sitio.
      seccion('creo-senor', 'Décima oración, de san Juan Crisóstomo', bloques('creo-senor-y-confieso').slice(0, 2)),
      oracion('al-acercarse-al-caliz', 'Al ir a comulgar'),
    ],
    meta: TRADUCCION_META('Horologion, Akolouthía de la Divina Comunión (glt.goarch.org)'),
  },

  {
    id: 'despues-de-comulgar',
    title: 'Acción de gracias después de comulgar',
    subtitle: 'Al volver del cáliz',
    about:
      'Lo que se reza después de comulgar, en la iglesia o en casa: las cinco oraciones de acción de gracias, el cántico de Simeón y los troparios del día y del santo cuya Liturgia se ha celebrado.',
    category: 'comunion',
    sections: [
      oracion('despues-de-comulgar', 'Primera oración'),
      oracion('basilio-despues-comulgar', 'Segunda oración, de san Basilio'),
      oracion('metafrastes-despues-comulgar', 'Tercera oración, de Simeón Metafrastes'),
      oracion('tu-santo-cuerpo', 'Cuarta oración'),
      oracion('theotokos-despues-comulgar', 'Quinta oración, a la Theotokos'),
      seccion('simeon', 'El cántico de Simeón', [...bloques('simeon-noche'), ...TRISAGIO_PADRE_NUESTRO]),
      seccion('troparios', 'Los troparios', [
        rub('El tropario del día:'),
        { kind: 'day-troparion', content: 'Tropario del día' },
        rub('Y el del santo cuya Liturgia se ha celebrado. Si ha sido la de san Juan Crisóstomo:'),
        head(`Tropario, ${SAINT_PROPER_TROPARIA['juan-crisostomo']?.tone.toLowerCase() ?? 'tono 8'}`),
        ...(SAINT_PROPER_TROPARIA['juan-crisostomo']?.blocks ?? []),
        head(`Kontakion, ${SAINT_KONTAKIA['juan-crisostomo']?.tone.toLowerCase() ?? 'tono 6'}`),
        ...(SAINT_KONTAKIA['juan-crisostomo']?.blocks ?? []),
        rub('Si ha sido la de san Basilio el Grande:'),
        head(`Tropario, ${SAINT_PROPER_TROPARIA['basilio-magno']?.tone.toLowerCase() ?? 'tono 1'}`),
        ...(SAINT_PROPER_TROPARIA['basilio-magno']?.blocks ?? []),
        head(`Kontakion, ${SAINT_KONTAKIA['basilio-magno']?.tone.toLowerCase() ?? 'tono 4'}`),
        ...(SAINT_KONTAKIA['basilio-magno']?.blocks ?? []),
      ]),
      seccion('final', 'Al terminar', [
        t('Señor, ten piedad. <em>(doce veces)</em>'),
        GLORIA_AHORA,
        t('Más venerable que los querubines e incomparablemente más gloriosa que los serafines, tú que sin mancha diste a luz al Verbo de Dios: verdadera Theotokos, te engrandecemos.'),
        rub('El libro de oraciones eslavo añade: después de comulgar, cada uno procure guardarse en pureza, en templanza y en pocas palabras, para conservar dignamente a Cristo, a quien ha recibido.'),
      ]),
    ],
    meta: TRADUCCION_META('Horologion, acción de gracias después de la Divina Comunión (glt.goarch.org)'),
  },
];

export const orderById = (id: string) => PRAYER_ORDERS.find((o) => o.id === id);

/** El orden que corresponde a un momento del menú, si lo hay. */
export const ordersForCategory = (category: string) => PRAYER_ORDERS.filter((o) => o.category === category);
