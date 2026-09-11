/**
 * Los troparios propios de los santos más venerados.
 *
 * Hasta ahora ningún santo tenía el suyo: cada ficha mostraba el tropario
 * general de su rango. Es lo que prescribe el libro cuando no se dispone del
 * propio, pero de san Nicolás o de san Jorge sí se dispone, y cualquier
 * ortodoxo reconoce su tropario a la primera nota.
 *
 * Aquí están los de los santos cuyo apolytíkion es universalmente conocido y
 * cuyo texto griego es fijo desde hace siglos. No están todos: el Menaion
 * trae cientos, y lo que no se sabe con seguridad no se escribe. Cada uno va
 * traducido para ATHOS a partir del original griego, que es de dominio
 * público, y la ficha lo dice.
 */
import type { SourceMeta, TextBlock } from '@/types';

export interface ProperTroparion {
  name: string;
  tone: string;
  blocks: TextBlock[];
}

export const PROPER_TROPARION_META: SourceMeta = {
  source:
    'Tropario propio (apolytíkion) del Menaion bizantino. Traducción al español hecha para ATHOS a partir del original griego, que es de dominio público',
  tradition: 'Rito bizantino',
  language: 'es',
  license: 'cc-by-sa-4.0',
  dateAdded: '2026-09-11',
  copyright:
    'Texto litúrgico tradicional; el original griego es de dominio público. Esta versión española es una traducción hecha para ATHOS y se publica bajo CC BY-SA 4.0.',
  notes:
    'Es el tropario propio, el que se canta en la fiesta. La traducción es de ATHOS: no procede de un libro litúrgico español publicado.',
};

const t = (content: string): TextBlock => ({ kind: 'text', content });

const tropario = (name: string, tone: string, texto: string): ProperTroparion => ({
  name,
  tone,
  blocks: [t(texto)],
});

const BAUTISTA = tropario(
  'Tropario de san Juan Bautista',
  'Tono 2',
  'La memoria del justo se celebra con alabanzas; a ti, Precursor, te basta el testimonio del Señor. Porque te mostraste en verdad más venerable que los profetas, pues fuiste digno de bautizar en las corrientes a Aquel a quien anunciabas. Por eso, habiendo combatido por la verdad, anunciaste con alegría también a los del Hades a Dios manifestado en la carne, que quita el pecado del mundo y nos concede la gran misericordia.',
);

const JUAN_TEOLOGO = tropario(
  'Tropario de san Juan el Teólogo',
  'Tono 2',
  'Apóstol amado de Cristo Dios, apresúrate a librar a un pueblo sin defensa. Te recibe cuando te acercas Aquel que te permitió reclinarte sobre su pecho. Ruégale, oh Teólogo, que disipe la nube persistente de las naciones, pidiendo para nosotros la paz y la gran misericordia.',
);

const PALAMAS = tropario(
  'Tropario de san Gregorio Palamás',
  'Tono 8',
  'Lucero de la ortodoxia, sostén y maestro de la Iglesia, hermosura de los monjes, campeón invencible de los teólogos, Gregorio taumaturgo, gloria de Tesalónica y heraldo de la gracia: intercede siempre para que se salven nuestras almas.',
);

const ESPIRIDON = tropario(
  'Tropario de san Espiridón',
  'Tono 1',
  'Te mostraste campeón del primer Concilio y taumaturgo, padre nuestro Espiridón portador de Dios. Por eso hablaste a la muerta en el sepulcro y convertiste la serpiente en oro; y mientras cantabas las santas oraciones, ángeles oficiaban contigo, oh santísimo. Gloria a Aquel que te glorificó; gloria a Aquel que te coronó; gloria a Aquel que obra por ti curaciones para todos.',
);

/** Por identificador de ficha. Dos fichas del mismo santo comparten el mismo. */
export const SAINT_PROPER_TROPARIA: Record<string, ProperTroparion> = {
  'basilio-magno': tropario('Tropario de san Basilio el Grande', 'Tono 1', 'Por toda la tierra ha salido tu voz, pues ella recibió tu palabra, con la que enseñaste de modo digno de Dios, explicaste la naturaleza de los seres y ordenaste las costumbres de los hombres. Oh sacerdocio real, padre santo Basilio, intercede ante Cristo Dios para que salve nuestras almas.'),
  'juan-bautista-sinaxis': BAUTISTA,
  'degollacion-s': BAUTISTA,
  'antonio-magno': tropario('Tropario de san Antonio el Grande', 'Tono 4', 'Imitando en tus costumbres al celoso Elías y siguiendo por los caminos rectos al Bautista, padre Antonio, fuiste habitante del desierto y afirmaste el universo con tus oraciones. Intercede ante Cristo Dios para que salve nuestras almas.'),
  'atanasio-alejandria': tropario('Tropario de san Atanasio y san Cirilo', 'Tono 3', 'Brillasteis con obras de ortodoxia y apagasteis toda enseñanza torcida; vencedores y triunfadores, enriquecisteis a todos con la piedad y adornasteis grandemente a la Iglesia. Dignamente hallasteis a Cristo Dios, que concede a todos, por vuestras súplicas, la gran misericordia.'),
  'gregorio-teologo': tropario('Tropario de san Gregorio el Teólogo', 'Tono 1', 'El caramillo pastoral de tu teología venció las trompetas de los retóricos; pues, como quien escudriñó las profundidades del Espíritu, también te fue añadida la belleza de la palabra. Intercede ante Cristo Dios, padre Gregorio, para que salve nuestras almas.'),
  'tres-jerarcas': tropario('Tropario de los Tres Jerarcas', 'Tono 1', 'Honremos, reunidos, a los tres grandes luminares de la Divinidad trisolar, que iluminaron el orbe con los rayos de las enseñanzas divinas; ríos de sabiduría que manan miel y que regaron toda la creación con las corrientes del conocimiento de Dios: Basilio el Grande, Gregorio el Teólogo y el ilustre Juan de palabra de oro. Todos los que amamos sus palabras, honrémoslos con himnos, porque ellos interceden sin cesar ante la Trinidad por nosotros.'),
  'juan-crisostomo': tropario('Tropario de san Juan Crisóstomo', 'Tono 8', 'La gracia de tu boca, que resplandeció como una antorcha, iluminó el orbe; depositó en el mundo tesoros de desprendimiento y nos mostró la altura de la humildad. Tú que nos educas con tus palabras, padre Juan Crisóstomo, intercede ante el Verbo, Cristo Dios, para que salve nuestras almas.'),
  'nicolas-mira-dic': tropario('Tropario de san Nicolás', 'Tono 4', 'Regla de fe, imagen de mansedumbre y maestro de templanza te mostró a tu rebaño la verdad de las cosas. Por eso alcanzaste por la humildad lo alto y por la pobreza lo rico. Padre y jerarca Nicolás, intercede ante Cristo Dios para que salve nuestras almas.'),
  'jorge-trofeoforo': tropario('Tropario de san Jorge', 'Tono 4', 'Como libertador de los cautivos y defensor de los pobres, médico de los enfermos y campeón de los reyes, gran mártir Jorge portador de trofeos, intercede ante Cristo Dios para que salve nuestras almas.'),
  'demetrio-s': tropario('Tropario de san Demetrio', 'Tono 3', 'Gran defensor en los peligros te encontró el orbe, oh vencedor de las naciones. Así como abatiste la arrogancia de Lieo y diste valor a Néstor en el estadio, así, santo Demetrio, intercede ante Cristo Dios para que nos conceda la gran misericordia.'),
  'gregorio-palamas': PALAMAS,
  'gregorio-palamas-nov': PALAMAS,
  'espiridón-diciembre': ESPIRIDON,
  'espiridon-trimitunte': ESPIRIDON,
  'constantino-elena': tropario('Tropario de los santos Constantino y Elena', 'Tono 8', 'Contemplando en el cielo la figura de tu Cruz, y habiendo recibido, como Pablo, la llamada no de los hombres, tu apóstol entre los reyes, Señor, puso en tus manos la ciudad reinante. Guárdala siempre en paz, por las intercesiones de la Theotokos, oh único amante de los hombres.'),
  'pedro-pablo': tropario('Tropario de los santos Pedro y Pablo', 'Tono 4', 'Primeros en el trono de los apóstoles y maestros del orbe, interceded ante el Soberano de todos para que conceda paz al mundo y a nuestras almas la gran misericordia.'),
  'elias-profeta': tropario('Tropario del santo profeta Elías', 'Tono 4', 'Ángel en la carne, fundamento de los profetas y segundo precursor de la venida de Cristo, el glorioso Elías envió desde lo alto a Eliseo la gracia para ahuyentar las enfermedades y purificar a los leprosos. Por eso derrama también curaciones sobre quienes lo honran.'),
  panteleimon: tropario('Tropario de san Panteleimón', 'Tono 3', 'Santo atleta y sanador Panteleimón, intercede ante el Dios misericordioso para que conceda a nuestras almas el perdón de los pecados.'),
  'catalina-alejandria': tropario('Tropario de santa Catalina', 'Tono 5', 'Alabemos a la toda loable esposa de Cristo, Catalina divina, protectora del Sinaí, nuestra ayuda y auxilio; porque con la espada del Espíritu redujo brillantemente al silencio a los sabios de los impíos, y ahora, coronada como mártir, pide para todos la gran misericordia.'),
  'nectario-noviembre': tropario('Tropario de san Nectario de Egina', 'Tono 1', 'Al hijo de Silivria y protector de Egina, que en los últimos tiempos se mostró amigo verdadero de la virtud, a Nectario, honrémoslo los fieles como servidor divino de Cristo; porque hace brotar curaciones de toda clase para quienes claman con piedad: Gloria a Cristo que te glorificó; gloria a Aquel que te hizo admirable; gloria a Aquel que obra por ti curaciones para todos.'),
  'esteban-protomartir': tropario('Tropario de san Esteban Protomártir', 'Tono 4', 'Con diadema real fue coronada tu cabeza por los combates que soportaste por Cristo Dios, primero de los mártires. Tú que reprobaste la locura de los perseguidores viste a tu Salvador a la diestra del Padre. A Él suplica siempre por nuestras almas.'),
  'juan-teologo-mayo': JUAN_TEOLOGO,
  'juan-teologo-dormicion': JUAN_TEOLOGO,
  'andres-apostol': tropario('Tropario de san Andrés el Primer Llamado', 'Tono 4', 'Como primer llamado de los apóstoles y hermano del corifeo, suplica, Andrés, al Soberano de todos que conceda paz al mundo y a nuestras almas la gran misericordia.'),
  'cosme-damian': tropario('Tropario de los santos anárgiros', 'Tono 8', 'Santos anárgiros y taumaturgos, visitad nuestras enfermedades: gratis recibisteis, dad gratis.'),
  'cirilo-metodio-c': tropario('Tropario de los santos Cirilo y Metodio', 'Tono 4', 'Como iguales en costumbres a los apóstoles y maestros de los pueblos eslavos, Cirilo y Metodio, sabios en Dios, interceded ante el Soberano de todos para que confirme a todas las naciones eslavas en la ortodoxia y la concordia, pacifique al mundo y salve nuestras almas.'),
  'miguel-arcangel': tropario('Tropario de los Arcángeles', 'Tono 4', 'Jefes de los ejércitos celestiales, os suplicamos siempre nosotros, indignos, que con vuestras súplicas nos protejáis al amparo de las alas de vuestra gloria inmaterial, guardándonos a los que caemos ante vosotros y clamamos con insistencia: libradnos de los peligros, capitanes de las potestades de lo alto.'),
  'santiago-hermano-señor': tropario('Tropario de Santiago, hermano del Señor', 'Tono 2', 'Como discípulo del Señor recibiste el Evangelio, justo; como mártir tienes lo inquebrantable; como hermano de Dios, la libertad de palabra; como jerarca, la intercesión. Intercede ante Cristo Dios para que salve nuestras almas.'),
};
