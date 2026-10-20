/**
 * El santoral, cuarta ampliación.
 *
 * Los Padres latinos que faltaban —san Ireneo, san Cipriano, san Jerónimo, el
 * bienaventurado Agustín, san Vicente de Lérins, san Hipólito—; las mártires
 * antiguas de Occidente —Perpetua y Felicidad, Inés, Lucía—; los santos de
 * Britania e Irlanda que las comunidades ortodoxas de aquellas tierras veneran;
 * Padres y santos griegos, eslavos, rumanos, serbios, georgianos y de América;
 * y cuatro profetas del Antiguo Testamento.
 *
 * Mismo criterio que la tercera ampliación, también en las fechas: la del
 * Menaion de la Iglesia que venera al santo.
 */
import type { SaintSeedYear } from './saints-year-1';

export const YEAR_SAINTS_4: SaintSeedYear[] = [
  /* ═══════════════ Enero ═══════════════ */
  { id: 'genoveva-paris', name: 'Santa Genoveva de París', day: '01-03', category: ['monje'], century: 'V–VI', place: 'Nanterre y París' },
  { id: 'gordio-cesarea', name: 'San Gordio de Cesarea', day: '01-03', category: ['martir'], century: 'IV', place: 'Cesarea de Capadocia' },
  { id: 'juan-calibita', name: 'San Juan Calibita', day: '01-15', category: ['monje'], century: 'V', place: 'Constantinopla' },
  { id: 'ines-roma', name: 'Santa Inés de Roma', day: '01-21', category: ['martir'], century: 'IV', place: 'Roma' },
  { id: 'hipolito-roma', name: 'San Hipólito de Roma', day: '01-30', category: ['martir', 'padre'], century: 'II–III', place: 'Roma y Cerdeña' },
  /* ═══════════════ Febrero ═══════════════ */
  { id: 'perpetua-felicidad', name: 'Santas Perpetua y Felicidad', day: '02-01', category: ['martir'], century: 'III', place: 'Cartago' },
  { id: 'barsanufio-juan', name: 'Santos Barsanufio y Juan de Gaza', day: '02-06', category: ['monje'], century: 'VI', place: 'Gaza' },
  { id: 'profeta-zacarias-hoz', name: 'Profeta Zacarías el de la hoz', fullName: 'Santo Profeta Zacarías, uno de los Doce', day: '02-08', category: ['profeta'], century: 'VI a. C.', place: 'Jerusalén' },
  { id: 'escolastica', name: 'Santa Escolástica', day: '02-10', category: ['monje'], century: 'VI', place: 'Monte Cassino' },
  { id: 'teodora-emperatriz', name: 'Santa Teodora la Emperatriz', day: '02-11', category: ['justo'], century: 'IX', place: 'Constantinopla' },
  { id: 'fotini-samaritana', name: 'Santa Fotini la Samaritana', day: '02-26', category: ['martir'], century: 'I', place: 'Samaria y Roma' },
  { id: 'rafael-brooklyn', name: 'San Rafael de Brooklyn', day: '02-27', category: ['obispo'], century: 'XIX–XX', place: 'Beirut, Rusia y Nueva York' },
  /* ═══════════════ Marzo ═══════════════ */
  { id: 'david-gales', name: 'San David de Gales', day: '03-01', category: ['obispo', 'monje'], century: 'VI', place: 'Gales' },
  { id: 'nicolas-planas', name: 'San Nicolás Planás', day: '03-02', category: ['justo'], century: 'XIX–XX', place: 'Naxos y Atenas' },
  { id: 'eduardo-martir', name: 'San Eduardo el Mártir', day: '03-18', category: ['martir'], century: 'X', place: 'Inglaterra' },
  { id: 'cutberto-lindisfarne', name: 'San Cutberto de Lindisfarne', day: '03-20', category: ['obispo', 'monje'], century: 'VII', place: 'Northumbria' },
  /* ═══════════════ Abril ═══════════════ */
  { id: 'sabas-kalimnos', name: 'San Sabas de Kálimnos', day: '04-07', category: ['monje'], century: 'XIX–XX', place: 'Jerusalén, Egina y Kálimnos' },
  { id: 'calinic-cernica', name: 'San Calínico de Cernica', day: '04-11', category: ['obispo', 'monje'], century: 'XIX', place: 'Bucarest y Râmnic' },
  { id: 'ignacio-brianchaninov', name: 'San Ignacio Brianchanínov', day: '04-30', category: ['obispo'], century: 'XIX', place: 'Vólogda, San Petersburgo y el Cáucaso' },
  /* ═══════════════ Mayo ═══════════════ */
  { id: 'german-constantinopla', name: 'San Germán de Constantinopla', day: '05-12', category: ['obispo', 'padre', 'confesor'], century: 'VII–VIII', place: 'Constantinopla' },
  { id: 'vicente-lerins', name: 'San Vicente de Lérins', day: '05-24', category: ['monje', 'padre'], century: 'V', place: 'Lérins, Provenza' },
  { id: 'beda-venerable', name: 'San Beda el Venerable', day: '05-25', category: ['monje'], century: 'VII–VIII', place: 'Jarrow, Northumbria' },
  /* ═══════════════ Junio ═══════════════ */
  { id: 'jeronimo', name: 'San Jerónimo', day: '06-15', category: ['padre', 'monje'], century: 'IV–V', place: 'Dalmacia, Roma y Belén' },
  { id: 'agustin-hipona', name: 'Bienaventurado Agustín de Hipona', day: '06-15', category: ['obispo', 'padre'], century: 'IV–V', place: 'Tagaste, Milán e Hipona' },
  { id: 'lazaro-serbia', name: 'San Lázaro de Serbia', fullName: 'San Lázaro, gran príncipe de Serbia', day: '06-15', category: ['martir'], century: 'XIV', place: 'Serbia y Kosovo' },
  { id: 'paisio-hilandar', name: 'San Paisio de Hilandar', day: '06-19', category: ['monje'], century: 'XVIII', place: 'Bansko y Monte Athos' },
  { id: 'nicolas-cabasilas', name: 'San Nicolás Cabásilas', day: '06-20', category: ['padre'], century: 'XIV', place: 'Tesalónica y Constantinopla' },
  { id: 'albano-britania', name: 'San Albano', fullName: 'San Albano, protomártir de Britania', day: '06-22', category: ['martir'], century: 'III', place: 'Verulamio, Britania' },
  /* ═══════════════ Julio ═══════════════ */
  { id: 'profeta-ezequiel', name: 'Profeta Ezequiel', day: '07-21', category: ['profeta'], century: 'VI a. C.', place: 'Jerusalén y Babilonia' },
  /* ═══════════════ Agosto ═══════════════ */
  { id: 'gregorio-sinaita', name: 'San Gregorio el Sinaíta', day: '08-08', category: ['monje'], century: 'XIII–XIV', place: 'Sinaí, Creta, Monte Athos y Bulgaria' },
  { id: 'gerasimo-cefalonia', name: 'San Gerásimo de Cefalonia', day: '08-16', category: ['monje'], century: 'XVI', place: 'Monte Athos, Jerusalén y Cefalonia' },
  { id: 'brancoveanu', name: 'San Constantino Brâncoveanu y sus hijos', day: '08-16', category: ['martir'], century: 'XVII–XVIII', place: 'Valaquia y Constantinopla' },
  { id: 'ireneo-lyon', name: 'San Ireneo de Lyon', day: '08-23', category: ['obispo', 'padre'], century: 'II', place: 'Esmirna y Lyon' },
  { id: 'cipriano-cartago', name: 'San Cipriano de Cartago', day: '08-31', category: ['obispo', 'martir', 'padre'], century: 'III', place: 'Cartago' },
  { id: 'aidan-lindisfarne', name: 'San Aidán de Lindisfarne', day: '08-31', category: ['obispo', 'monje'], century: 'VII', place: 'Iona y Northumbria' },
  /* ═══════════════ Septiembre ═══════════════ */
  { id: 'babilas-antioquia', name: 'San Bábilas de Antioquía', day: '09-04', category: ['obispo', 'martir'], century: 'III', place: 'Antioquía' },
  { id: 'macario-optina', name: 'San Macario de Óptina', day: '09-07', category: ['monje'], century: 'XIX', place: 'Óptina' },
  { id: 'demetrio-rostov', name: 'San Demetrio de Rostov', day: '09-21', category: ['obispo'], century: 'XVII–XVIII', place: 'Kiev y Rostov' },
  { id: 'profeta-jonas', name: 'Profeta Jonás', day: '09-22', category: ['profeta'], century: 'VIII a. C.', place: 'Galilea y Nínive' },
  /* ═══════════════ Octubre ═══════════════ */
  { id: 'profeta-joel', name: 'Profeta Joel', day: '10-19', category: ['profeta'], century: 'Desconocido', place: 'Judá' },
  { id: 'gabriel-georgia', name: 'San Gabriel de Georgia', fullName: 'San Gabriel Urgebadze, confesor y loco por Cristo', day: '10-20', category: ['monje', 'confesor'], century: 'XX', place: 'Tiflis y Mtsjeta' },
  { id: 'job-pochaiv', name: 'San Job de Pocháiv', day: '10-28', category: ['monje'], century: 'XVI–XVII', place: 'Galitzia y Volinia' },
  { id: 'juan-kochurov', name: 'San Juan Kochúrov', day: '10-31', category: ['neomartir'], century: 'XIX–XX', place: 'Chicago y Tsárskoye Seló' },
  /* ═══════════════ Noviembre ═══════════════ */
  { id: 'esteban-decanski', name: 'San Esteban de Dečani', fullName: 'San Esteban Uroš III Dečanski, rey de Serbia', day: '11-11', category: ['martir'], century: 'XIII–XIV', place: 'Serbia y Constantinopla' },
  { id: 'nilo-sinai', name: 'San Nilo del Sinaí', day: '11-12', category: ['monje', 'padre'], century: 'IV–V', place: 'Constantinopla y Sinaí' },
  { id: 'hilda-whitby', name: 'Santa Hilda de Whitby', day: '11-17', category: ['monje'], century: 'VII', place: 'Northumbria' },
  /* ═══════════════ Diciembre ═══════════════ */
  { id: 'lucia-siracusa', name: 'Santa Lucía de Siracusa', day: '12-13', category: ['martir'], century: 'IV', place: 'Siracusa, Sicilia' },
  { id: 'dionisio-zante', name: 'San Dionisio de Zante', day: '12-17', category: ['obispo'], century: 'XVI–XVII', place: 'Zante y Egina' },
];
