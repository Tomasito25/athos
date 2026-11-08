/**
 * Tercera tanda del santoral.
 *
 * Mismo criterio que las dos anteriores: las biografías son reseñas históricas
 * redactadas para ATHOS a partir de fuentes hagiográficas comunes —no son
 * textos litúrgicos—, y no se incluye ningún tropario, porque incorporarlos
 * exige una versión española verificable que ATHOS todavía no tiene.
 *
 * Sólo entran conmemoraciones cuya fecha en el calendario bizantino conozco con
 * seguridad. Colocar a un santo en un día equivocado sería la misma falta que
 * inventarle un texto.
 */
import type { SaintCategory } from '@/types';

export interface SaintSeedThird {
  id: string;
  name: string;
  day: string;
  category: SaintCategory[];
  century?: string;
  place?: string;
}

export const THIRD_SAINTS: SaintSeedThird[] = [
  /* ---------------- Enero ---------------- */
  { id: 'malaquias-profeta', name: 'Profeta Malaquías', day: '01-03', category: ['profeta'], century: 'V a.C.', place: 'Judea' },
  { id: 'setenta-apostoles', name: 'Sínaxis de los Setenta Apóstoles', day: '01-04', category: ['apostol'], century: 'I' },
  { id: 'polieucto-melitene', name: 'San Polieucto de Melitene', day: '01-09', category: ['martir'], century: 'III', place: 'Melitene, Armenia' },
  { id: 'tatiana-roma', name: 'Santa Tatiana de Roma', day: '01-12', category: ['martir'], century: 'III', place: 'Roma' },
  { id: 'cadenas-pedro', name: 'Veneración de las cadenas de san Pedro', day: '01-16', category: ['apostol'], century: 'I', place: 'Jerusalén y Roma' },
  { id: 'juan-crisostomo-reliquias', name: 'Traslado de las reliquias de san Juan Crisóstomo', day: '01-27', category: ['padre', 'obispo'], century: 'V', place: 'Comana y Constantinopla' },
  { id: 'ciro-juan', name: 'Santos Ciro y Juan, anárgiros', day: '01-31', category: ['martir'], century: 'IV', place: 'Alejandría' },

  /* ---------------- Febrero ---------------- */
  { id: 'trifon-martir', name: 'San Trifón', day: '02-01', category: ['martir'], century: 'III', place: 'Frigia' },
  { id: 'agata-catania', name: 'Santa Águeda de Catania', day: '02-05', category: ['martir'], century: 'III', place: 'Catania, Sicilia' },
  { id: 'teodoro-estratelates', name: 'San Teodoro Estratelates', day: '02-08', category: ['granmartir'], century: 'IV', place: 'Heraclea' },
  { id: 'blas-sebaste', name: 'San Blas de Sebaste', day: '02-11', category: ['martir', 'obispo'], century: 'IV', place: 'Sebaste, Armenia' },
  { id: 'teodoro-tiron', name: 'San Teodoro Tirón', day: '02-17', category: ['granmartir'], century: 'IV', place: 'Amasea' },
  { id: 'policarpo-esmirna', name: 'San Policarpo de Esmirna', day: '02-23', category: ['martir', 'obispo', 'padre'], century: 'II', place: 'Esmirna' },
  { id: 'cabeza-bautista', name: 'Hallazgo de la cabeza de san Juan Bautista', day: '02-24', category: ['justo'], century: 'IV' },
  { id: 'porfirio-gaza', name: 'San Porfirio de Gaza', day: '02-26', category: ['obispo'], century: 'V', place: 'Gaza' },

  /* ---------------- Marzo ---------------- */
  { id: 'eudocia-heliopolis', name: 'Santa Eudocia de Heliópolis', day: '03-01', category: ['monje', 'martir'], century: 'II', place: 'Heliópolis, Siria' },
  { id: 'cuarenta-dos-amorion', name: 'Los cuarenta y dos mártires de Amorion', day: '03-06', category: ['martir'], century: 'IX', place: 'Amorion, Frigia' },
  { id: 'cuarenta-sebaste', name: 'Los cuarenta mártires de Sebaste', day: '03-09', category: ['martir'], century: 'IV', place: 'Sebaste, Armenia' },
  { id: 'gregorio-dialogo', name: 'San Gregorio Dialogista', day: '03-12', category: ['padre', 'obispo'], century: 'VI', place: 'Roma' },
  { id: 'padres-san-sabas', name: 'Los Padres muertos en el monasterio de San Sabas', day: '03-20', category: ['monje', 'martir'], century: 'VIII', place: 'Desierto de Judea' },

  /* ---------------- Abril ---------------- */
  { id: 'maria-egipcia', name: 'Santa María Egipcíaca', day: '04-01', category: ['monje'], century: 'V–VI', place: 'Desierto del Jordán' },

  /* ---------------- Mayo ---------------- */
  { id: 'irene-tesalonica', name: 'Santa Irene', day: '05-05', category: ['granmartir'], century: 'IV', place: 'Magedón, Persia' },
  { id: 'cirilo-metodio', name: 'Santos Cirilo y Metodio', day: '05-11', category: ['obispo', 'confesor'], century: 'IX', place: 'Tesalónica y Moravia' },
  { id: 'constantino-elena', name: 'Santos Constantino y Elena', day: '05-21', category: ['justo'], century: 'IV', place: 'Constantinopla y Jerusalén' },

  /* ---------------- Junio ---------------- */
  { id: 'nicetas-remesiana', name: 'San Nicetas de Remesiana', day: '06-24', category: ['obispo'], century: 'IV–V', place: 'Remesiana, Dacia' },
  { id: 'natividad-bautista', name: 'Natividad de san Juan Bautista', day: '06-24', category: ['justo'], century: 'I', place: 'Judea' },
  { id: 'pedro-pablo', name: 'Santos Apóstoles Pedro y Pablo', day: '06-29', category: ['apostol'], century: 'I', place: 'Roma' },
  { id: 'sinaxis-doce', name: 'Sínaxis de los Doce Apóstoles', day: '06-30', category: ['apostol'], century: 'I' },

  /* ---------------- Julio ---------------- */
  { id: 'manto-theotokos', name: 'Deposición del manto de la Theotokos', day: '07-02', category: ['theotokos'], century: 'V', place: 'Blaquernas, Constantinopla' },
  { id: 'eufemia-calcedonia', name: 'Santa Eufemia', day: '07-11', category: ['granmartir'], century: 'IV', place: 'Calcedonia' },
  { id: 'atenogenes-sebaste', name: 'San Atenógenes y sus diez discípulos', day: '07-16', category: ['obispo', 'martir'], century: 'IV' },

  /* ---------------- Agosto ---------------- */
  { id: 'procesion-cruz-ago', name: 'Procesión de la Preciosa Cruz', day: '08-01', category: ['senor'], century: 'IX', place: 'Constantinopla' },
  { id: 'transfiguracion', name: 'La Transfiguración del Señor', day: '08-06', category: ['senor'], century: 'I', place: 'Monte Tabor' },
  { id: 'dormicion', name: 'La Dormición de la Theotokos', day: '08-15', category: ['theotokos'], century: 'I', place: 'Jerusalén' },
  { id: 'mandylion', name: 'Traslado de la Santa Imagen no hecha por mano', day: '08-16', category: ['senor'], century: 'X', place: 'Edesa y Constantinopla' },

  /* ---------------- Septiembre ---------------- */
  { id: 'natividad-theotokos', name: 'Natividad de la Theotokos', day: '09-08', category: ['theotokos'], century: 'I', place: 'Jerusalén' },

  /* ---------------- Octubre ---------------- */
  { id: 'proteccion-theotokos', name: 'Protección de la Theotokos', day: '10-01', category: ['theotokos'], century: 'X', place: 'Blaquernas, Constantinopla' },

  /* ---------------- Noviembre ---------------- */
  { id: 'juan-crisostomo', name: 'San Juan Crisóstomo', day: '11-13', category: ['padre', 'obispo'], century: 'IV–V', place: 'Constantinopla' },
  { id: 'andres-apostol', name: 'San Andrés el Primer Llamado', day: '11-30', category: ['apostol'], century: 'I', place: 'Patras' },

  /* ---------------- Diciembre ---------------- */
  { id: 'barbara-martir', name: 'Santa Bárbara', day: '12-04', category: ['granmartir'], century: 'III–IV', place: 'Heliópolis' },
  { id: 'nicolas-mira-dic', name: 'San Nicolás de Mira', day: '12-06', category: ['obispo'], century: 'IV', place: 'Mira, Licia' },
  { id: 'ignacio-antioquia-dic', name: 'San Ignacio de Antioquía', day: '12-20', category: ['martir', 'obispo', 'padre'], century: 'I–II', place: 'Antioquía y Roma' },
  { id: 'natividad-senor', name: 'La Natividad de Cristo', day: '12-25', category: ['senor'], century: 'I', place: 'Belén' },
  { id: 'sinaxis-theotokos', name: 'Sínaxis de la Theotokos', day: '12-26', category: ['theotokos'], century: 'I' },
];
