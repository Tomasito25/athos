/**
 * Internacionalización.
 *
 * La primera versión está íntegramente en español, pero ningún texto de la
 * interfaz se escribe directamente en los componentes: todos pasan por aquí,
 * de modo que añadir un idioma consista sólo en aportar un archivo de traducción.
 */
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import es from '@/locales/es';

export const SUPPORTED_LANGUAGES = [
  { code: 'es', name: 'Español', native: 'Español', ready: true },
  { code: 'en', name: 'Inglés', native: 'English', ready: false },
  { code: 'el', name: 'Griego', native: 'Ελληνικά', ready: false },
  { code: 'ru', name: 'Ruso', native: 'Русский', ready: false },
  { code: 'ro', name: 'Rumano', native: 'Română', ready: false },
  { code: 'sr', name: 'Serbio', native: 'Српски', ready: false },
  { code: 'ka', name: 'Georgiano', native: 'ქართული', ready: false },
  { code: 'ar', name: 'Árabe', native: 'العربية', ready: false },
] as const;

export const RTL_LANGUAGES = new Set(['ar']);

export async function initI18n(language = 'es') {
  if (i18n.isInitialized) return i18n;
  await i18n.use(initReactI18next).init({
    resources: { es: { translation: es } },
    lng: language,
    fallbackLng: 'es',
    interpolation: { escapeValue: false },
    returnNull: false,
  });
  return i18n;
}

export function applyDocumentLanguage(language: string) {
  document.documentElement.lang = language;
  document.documentElement.dir = RTL_LANGUAGES.has(language) ? 'rtl' : 'ltr';
}

export default i18n;
