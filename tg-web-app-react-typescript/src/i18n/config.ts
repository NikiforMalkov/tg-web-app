import i18n from 'i18next';
import messagesRu from './ru/messages.json';
import messagesEn from './en/messages.json';
import { initReactI18next } from 'react-i18next';

export const resources = {
  en: {
    "messages": messagesEn,
  },
  ru: {
    "messages": messagesRu,
  },
} as const;

i18n.use(initReactI18next).init({
  lng: 'en',
  ns: ['messages'],
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false, // not needed for react as it escapes by default
  },
  resources,
});


export interface LangOptions {
  ru: string
  en: string
}
