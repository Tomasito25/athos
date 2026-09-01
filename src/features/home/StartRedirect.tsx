/**
 * La pantalla de entrada.
 *
 * Casi nadie usa la aplicación entera: uno la abre para rezar, otro para leer
 * lo del día, otro para mirar el santoral. Obligar a todos a pasar por Inicio
 * es un toque de más para la mayoría, todos los días.
 *
 * Sólo desvía cuando la elección no es «inicio», y sólo en la raíz: entrar por
 * un enlace directo o volver atrás no se toca. El reemplazo del historial es
 * a propósito —si no, el botón de volver dejaría al usuario dando tumbos entre
 * la raíz y su pantalla—.
 */
import { Navigate } from 'react-router-dom';
import { HomePage } from './HomePage';
import { useSettings } from '@/stores/settings';
import type { StartChoice } from '@/stores/settings';

const RUTAS: Record<StartChoice, string> = {
  inicio: '/',
  orar: '/orar',
  leer: '/leer',
  calendario: '/calendario',
  biblioteca: '/biblioteca',
};

export function StartRedirect() {
  const startAt = useSettings((s) => s.startAt);
  if (startAt === 'inicio') return <HomePage />;
  return <Navigate to={RUTAS[startAt]} replace />;
}
