import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './assets/locales/en.json';
import ar from './assets/locales/ar.json';

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  lng: 'en',
  fallbackLng: 'en',
  resources: {
    en: { translation: en },
    ar: { translation: ar },
  },
  interpolation: { escapeValue: false },
});

export default i18n;
