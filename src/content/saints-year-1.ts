/**
 * El año completo, primera mitad: de enero a junio.
 *
 * Con esta tanda y la siguiente, los 366 días del calendario tienen al menos
 * una conmemoración escrita. Antes había 197 días en blanco, y un calendario
 * con huecos empuja a saltárselo justo los días corrientes, que son casi
 * todos.
 *
 * Las fechas son las del calendario eclesiástico —el mismo que usa el
 * Menaion—, no las civiles: quien siga el calendario nuevo verá cada
 * conmemoración en el día civil que le corresponda, y ATHOS hace esa cuenta.
 *
 * Criterio, el de siempre: las reseñas son historia redactada para ATHOS a
 * partir de fuentes hagiográficas comunes. No son textos litúrgicos y no se
 * presentan como tales. Ningún tropario se inventa: donde no hay versión
 * española verificable, la ficha lo dice.
 */
import type { SaintCategory } from '@/types';

export interface SaintSeedYear {
  id: string;
  name: string;
  fullName?: string;
  day: string;
  category: SaintCategory[];
  century?: string;
  place?: string;
}

export const YEAR_SAINTS_1: SaintSeedYear[] = [
  /* ═══════════════ Enero ═══════════════ */
  { id: 'sinclitica-alejandria', name: 'Santa Sinclética de Alejandría', day: '01-05', category: ['monje'], century: 'IV', place: 'Alejandría' },
  { id: 'domnica-constantinopla', name: 'Santa Domnica de Constantinopla', day: '01-08', category: ['monje'], century: 'IV–V', place: 'Constantinopla' },
  { id: 'hermilo-estratonico', name: 'Santos Hermilo y Estratónico', day: '01-13', category: ['martir'], century: 'IV', place: 'Singidunum, el Danubio' },
  { id: 'nina-georgia', name: 'Santa Nina de Georgia', fullName: 'Santa Nina, igual a los Apóstoles, iluminadora de Georgia', day: '01-14', category: ['justo'], century: 'IV', place: 'Mtsjeta, Georgia' },
  { id: 'clemente-ancira', name: 'San Clemente de Ancira', day: '01-23', category: ['obispo', 'martir'], century: 'III–IV', place: 'Ancira, Galacia' },
  { id: 'xenofonte-familia', name: 'San Xenofonte y su familia', day: '01-26', category: ['justo'], century: 'V–VI', place: 'Constantinopla y Beirut' },

  /* ═══════════════ Febrero ═══════════════ */
  { id: 'lucas-estirio', name: 'San Lucas de Estirio', fullName: 'Hósios Lukás', day: '02-07', category: ['monje'], century: 'X', place: 'Fócide, Grecia' },
  { id: 'niceforo-antioquia', name: 'San Nicéforo de Antioquía', day: '02-09', category: ['martir'], century: 'III', place: 'Antioquía' },
  { id: 'simeon-mirobleta', name: 'San Simeón el Mirobleta', fullName: 'San Simeón, antes Esteban Nemanja, gran zhupán de Serbia', day: '02-13', category: ['monje'], century: 'XII–XIII', place: 'Monte Athos' },
  { id: 'panfilo-cesarea', name: 'San Pánfilo y sus compañeros', day: '02-16', category: ['martir'], century: 'III–IV', place: 'Cesarea de Palestina' },
  { id: 'arquipo-filemon', name: 'Santos Arquipo, Filemón y Apia', day: '02-19', category: ['apostol', 'martir'], century: 'I', place: 'Colosas' },
  { id: 'leon-catania', name: 'San León de Catania', day: '02-20', category: ['obispo'], century: 'VIII', place: 'Catania, Sicilia' },
  { id: 'eustacio-antioquia', name: 'San Eustacio de Antioquía', day: '02-21', category: ['obispo', 'confesor'], century: 'IV', place: 'Antioquía' },
  { id: 'talasio-limneo', name: 'Santos Talasio y Limneo', day: '02-22', category: ['monje'], century: 'V', place: 'Siria' },
  { id: 'procopio-decapolita', name: 'San Procopio el Decapolita', day: '02-27', category: ['monje', 'confesor'], century: 'VIII–IX', place: 'Decápolis y Constantinopla' },
  { id: 'basilio-confesor', name: 'San Basilio el Confesor', day: '02-28', category: ['monje', 'confesor'], century: 'VIII–IX', place: 'Constantinopla' },
  { id: 'juan-casiano', name: 'San Juan Casiano el Romano', day: '02-29', category: ['monje', 'padre'], century: 'IV–V', place: 'Escitia Menor, Belén, Egipto y Marsella' },

  /* ═══════════════ Marzo ═══════════════ */
  { id: 'teodoto-cirene', name: 'San Teodoto de Cirene', day: '03-02', category: ['obispo', 'martir'], century: 'IV', place: 'Cirene, Chipre' },
  { id: 'eutropio-cleonico', name: 'Santos Eutropio, Cleónico y Basilisco', day: '03-03', category: ['martir'], century: 'IV', place: 'Amasea del Ponto' },
  { id: 'marcos-asceta', name: 'San Marcos el Asceta', day: '03-05', category: ['monje', 'padre'], century: 'IV–V', place: 'Egipto o Ancira' },
  { id: 'teofilacto-nicomedia', name: 'San Teofilacto de Nicomedia', day: '03-08', category: ['obispo', 'confesor'], century: 'VIII–IX', place: 'Nicomedia' },
  { id: 'codrato-corinto', name: 'San Codrato de Corinto y sus compañeros', day: '03-10', category: ['martir'], century: 'III', place: 'Corinto' },
  { id: 'niceforo-traslacion', name: 'San Nicéforo de Constantinopla', fullName: 'Traslación de las reliquias de san Nicéforo, patriarca de Constantinopla', day: '03-13', category: ['obispo', 'confesor'], century: 'VIII–IX', place: 'Constantinopla' },
  { id: 'agapio-cesarea', name: 'San Agapio y sus compañeros', day: '03-15', category: ['martir'], century: 'IV', place: 'Cesarea de Palestina' },
  { id: 'cristodulo-patmos', name: 'San Cristódulo de Patmos', day: '03-16', category: ['monje'], century: 'XI', place: 'Patmos' },
  { id: 'crisanto-daria', name: 'Santos Crisanto y Daría', day: '03-19', category: ['martir'], century: 'III', place: 'Roma' },
  { id: 'jacobo-confesor', name: 'San Jacobo el Confesor', day: '03-21', category: ['obispo', 'confesor'], century: 'VIII–IX', place: 'Studion, Constantinopla' },
  { id: 'basilio-ancira', name: 'San Basilio de Ancira', day: '03-22', category: ['martir'], century: 'IV', place: 'Ancira, Galacia' },
  { id: 'nicon-martir', name: 'San Nicón y sus discípulos', day: '03-23', category: ['martir'], century: 'III', place: 'Sicilia' },
  { id: 'artemon-seleucia', name: 'San Artemón de Seleucia', day: '03-24', category: ['obispo'], century: 'I–II', place: 'Seleucia de Pisidia' },
  { id: 'sinaxis-gabriel', name: 'Sinaxis del Arcángel Gabriel', day: '03-26', category: ['senor'] },
  { id: 'matrona-tesalonica', name: 'Santa Matrona de Tesalónica', day: '03-27', category: ['martir'], century: 'III–IV', place: 'Tesalónica' },
  { id: 'hilarion-nuevo', name: 'San Hilarión el Nuevo', day: '03-28', category: ['monje', 'confesor'], century: 'VIII–IX', place: 'Pelekete, Bitinia' },
  { id: 'marcos-aretusa', name: 'San Marcos de Aretusa y el diácono Cirilo', day: '03-29', category: ['obispo', 'martir'], century: 'IV', place: 'Aretusa, Siria' },
  { id: 'hipacio-gangra', name: 'San Hipacio de Gangra', day: '03-31', category: ['obispo', 'martir'], century: 'IV', place: 'Gangra, Paflagonia' },

  /* ═══════════════ Abril ═══════════════ */
  { id: 'niceta-medikion', name: 'San Niceta el Confesor', day: '04-03', category: ['monje', 'confesor'], century: 'VIII–IX', place: 'Medikion, Bitinia' },
  { id: 'agatopodo-teodulo', name: 'Santos Agatópodo y Teódulo', day: '04-05', category: ['martir'], century: 'IV', place: 'Tesalónica' },
  { id: 'jorge-mitilene', name: 'San Jorge de Mitilene', day: '04-07', category: ['obispo', 'confesor'], century: 'IX', place: 'Lesbos' },
  { id: 'herodion-agabo', name: 'Los apóstoles Herodión, Agabo, Rufo y sus compañeros', day: '04-08', category: ['apostol'], century: 'I' },
  { id: 'eupsiquio-cesarea', name: 'San Eupsiquio de Cesarea', day: '04-09', category: ['martir'], century: 'IV', place: 'Cesarea de Capadocia' },
  { id: 'gregorio-v', name: 'San Gregorio V de Constantinopla', day: '04-10', category: ['obispo', 'neomartir'], century: 'XVIII–XIX', place: 'Constantinopla' },
  { id: 'basilio-parios', name: 'San Basilio de Parion', day: '04-12', category: ['obispo', 'confesor'], century: 'VIII', place: 'Parion, en el Helesponto' },
  { id: 'maximo-quintiliano-dadas', name: 'Santos Máximo, Cuintiliano y Dadas', day: '04-13', category: ['martir'], century: 'IV', place: 'Ozovia, Mesia' },
  { id: 'agapia-irene-quionia', name: 'Santas Agapia, Irene y Quionia', day: '04-16', category: ['martir'], century: 'IV', place: 'Tesalónica' },
  { id: 'simeon-persia', name: 'San Simeón de Persia y sus compañeros', day: '04-17', category: ['obispo', 'martir'], century: 'IV', place: 'Seleucia-Ctesifonte' },
  { id: 'juan-yanina', name: 'San Juan el Nuevo de Yánina', day: '04-18', category: ['neomartir'], century: 'XVI', place: 'Constantinopla' },
  { id: 'anastasio-sinaita', name: 'San Anastasio del Sinaí', day: '04-20', category: ['monje', 'padre'], century: 'VII', place: 'Monte Sinaí' },
  { id: 'jenaro-benevento', name: 'San Jenaro y sus compañeros', day: '04-21', category: ['obispo', 'martir'], century: 'III–IV', place: 'Nápoles' },
  { id: 'sabas-estratelates', name: 'San Sabas Estratelates', day: '04-24', category: ['martir'], century: 'III', place: 'Roma' },
  { id: 'basileo-amasea', name: 'San Basileo de Amasea', day: '04-26', category: ['obispo', 'martir'], century: 'IV', place: 'Amasea del Ponto' },
  { id: 'nueve-cizico', name: 'Los Nueve Mártires de Cízico', day: '04-28', category: ['martir'], century: 'III–IV', place: 'Cízico, Misia' },
  { id: 'jason-sosipatro', name: 'Santos Jasón y Sosípatro', day: '04-29', category: ['apostol'], century: 'I', place: 'Corfú' },
  { id: 'santiago-zebedeo', name: 'Santiago el Apóstol', fullName: 'San Santiago, hijo de Zebedeo, hermano de san Juan el Teólogo', day: '04-30', category: ['apostol', 'martir'], century: 'I', place: 'Jerusalén' },

  /* ═══════════════ Mayo ═══════════════ */
  { id: 'profeta-jeremias', name: 'Profeta Jeremías', day: '05-01', category: ['profeta'], century: 'VII–VI a.C.', place: 'Judá y Egipto' },
  { id: 'teodosio-cuevas', name: 'San Teodosio de las Cuevas', day: '05-03', category: ['monje'], century: 'XI', place: 'Kiev' },
  { id: 'pelagia-tarso', name: 'Santa Pelagia de Tarso', day: '05-04', category: ['martir'], century: 'III', place: 'Tarso de Cilicia' },
  { id: 'aparicion-cruz', name: 'Aparición de la Cruz en Jerusalén', day: '05-07', category: ['senor'], century: 'IV', place: 'Jerusalén' },
  { id: 'profeta-isaias', name: 'Profeta Isaías', day: '05-09', category: ['profeta'], century: 'VIII a.C.', place: 'Jerusalén' },
  { id: 'glicera-martir', name: 'Santa Glicera', day: '05-13', category: ['martir'], century: 'II', place: 'Traianópolis, Tracia' },
  { id: 'isidoro-quios', name: 'San Isidoro de Quíos', day: '05-14', category: ['martir'], century: 'III', place: 'Quíos' },
  { id: 'teodoro-santificado', name: 'San Teodoro el Santificado', day: '05-16', category: ['monje'], century: 'IV', place: 'Tabennisi, Egipto' },
  { id: 'andronico-junia', name: 'Los apóstoles Andrónico y Junia', day: '05-17', category: ['apostol'], century: 'I' },
  { id: 'teodoto-mesonero', name: 'San Teódoto de Ancira y las siete vírgenes', day: '05-18', category: ['martir'], century: 'IV', place: 'Ancira, Galacia' },
  { id: 'patricio-prusa', name: 'San Patricio de Prusa', day: '05-19', category: ['obispo', 'martir'], century: 'III–IV', place: 'Prusa, Bitinia' },
  { id: 'talaleo-martir', name: 'San Talaleo', day: '05-20', category: ['martir'], century: 'III', place: 'Egas, Cilicia' },
  { id: 'basilisco-comana', name: 'San Basilisco', day: '05-22', category: ['martir'], century: 'IV', place: 'Comana del Ponto' },
  { id: 'miguel-sinada', name: 'San Miguel de Sinada', day: '05-23', category: ['obispo', 'confesor'], century: 'VIII–IX', place: 'Sinada, Frigia' },
  { id: 'simeon-monte-admirable', name: 'San Simeón Estilita el Joven', day: '05-24', category: ['monje'], century: 'VI', place: 'Monte Admirable, cerca de Antioquía' },
  { id: 'tercer-hallazgo-cabeza', name: 'Tercer hallazgo de la cabeza del Bautista', day: '05-25', category: ['profeta'] },
  { id: 'apostol-carpo', name: 'Apóstol Carpo', day: '05-26', category: ['apostol'], century: 'I', place: 'Tróade' },
  { id: 'niceta-calcedonia', name: 'San Niceta de Calcedonia', day: '05-28', category: ['obispo', 'confesor'], century: 'VIII–IX', place: 'Calcedonia' },
  { id: 'teodosia-constantinopla', name: 'Santa Teodosia de Constantinopla', day: '05-29', category: ['monje', 'martir'], century: 'VIII', place: 'Constantinopla' },
  { id: 'isaac-dalmacia', name: 'San Isaac de Dalmacia', day: '05-30', category: ['monje', 'confesor'], century: 'IV', place: 'Constantinopla' },
  { id: 'hermias-martir', name: 'San Hermias', day: '05-31', category: ['martir'], century: 'II', place: 'Comana de Capadocia' },

  /* ═══════════════ Junio ═══════════════ */
  { id: 'lucillano-martir', name: 'San Lucillano y sus compañeros', day: '06-03', category: ['martir'], century: 'III', place: 'Bizancio' },
  { id: 'doroteo-tiro', name: 'San Doroteo de Tiro', day: '06-05', category: ['obispo', 'martir'], century: 'III–IV', place: 'Tiro' },
  { id: 'visarion-egipto', name: 'San Visarión el Taumaturgo', day: '06-06', category: ['monje'], century: 'IV–V', place: 'Egipto' },
  { id: 'teodoto-obispo-ancira', name: 'San Teódoto, obispo de Ancira', day: '06-07', category: ['obispo', 'martir'], century: 'IV', place: 'Ancira, Galacia' },
  { id: 'teodoro-estratelates-tr', name: 'Traslación de las reliquias de san Teodoro Estratelates', day: '06-08', category: ['granmartir'], century: 'IV', place: 'Euquita, Ponto' },
  { id: 'timoteo-prusa', name: 'San Timoteo de Prusa', day: '06-10', category: ['obispo', 'martir'], century: 'IV', place: 'Prusa, Bitinia' },
  { id: 'aquilina-biblos', name: 'Santa Aquilina', day: '06-13', category: ['martir'], century: 'III', place: 'Biblos, Fenicia' },
  { id: 'profeta-eliseo', name: 'Profeta Eliseo', day: '06-14', category: ['profeta'], century: 'IX a.C.', place: 'Israel' },
  { id: 'profeta-amos', name: 'Profeta Amós', day: '06-15', category: ['profeta'], century: 'VIII a.C.', place: 'Tecoa y Betel' },
  { id: 'tijon-amato', name: 'San Tijón de Amato', day: '06-16', category: ['obispo'], century: 'IV–V', place: 'Amato, Chipre' },
  { id: 'manuel-sabel-ismael', name: 'Santos Manuel, Sabel e Ismael', day: '06-17', category: ['martir'], century: 'IV', place: 'Calcedonia' },
  { id: 'leoncio-tripoli', name: 'San Leoncio de Trípoli', day: '06-18', category: ['martir'], century: 'II', place: 'Trípoli, Fenicia' },
  { id: 'apostol-judas', name: 'Apóstol Judas', fullName: 'San Judas Tadeo, hermano del Señor', day: '06-19', category: ['apostol'], century: 'I' },
  { id: 'julian-tarso', name: 'San Julián de Tarso', day: '06-21', category: ['martir'], century: 'III–IV', place: 'Tarso de Cilicia' },
  { id: 'eusebio-samosata', name: 'San Eusebio de Samosata', day: '06-22', category: ['obispo', 'martir'], century: 'IV', place: 'Samosata, Siria' },
  { id: 'agripina-roma', name: 'Santa Agripina', day: '06-23', category: ['martir'], century: 'III', place: 'Roma y Sicilia' },
  { id: 'febronia-nisibis', name: 'Santa Febronia', day: '06-25', category: ['monje', 'martir'], century: 'III–IV', place: 'Nisibis, Mesopotamia' },
];
