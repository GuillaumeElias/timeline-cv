import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

const hashDetector = {
  name: 'hash',

  lookup() {
    const hash = window.location.hash;
    const lang = hash.split('/')[1];
    if (lang && ['fr', 'en'].includes(lang)) {
      return lang;
    }
    return null;
  }
};

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    saveMissing: true,
    debug: false,
    backend: {
      loadPath: '/locales/{{lng}}.json'
    },
    detection: {
      order: ['hash', 'cookie', 'localStorage', 'navigator'],
      caches: ['cookie'],
      lookupCookie: 'i18next',
      cookieMinutes: 10080,
      lookupLocalStorage: 'i18nextLng'
    }
  });

i18n.services.languageDetector.addDetector(hashDetector);

export default i18n;
