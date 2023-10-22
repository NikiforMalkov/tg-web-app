import * as messagesRu from './locales/ru.json';
import * as messagesEn from './locales/en.json';
import * as i18next from 'i18next';

export const i18n = i18next.init({
    lng: 'en',
    fallbackLng: 'en',
    resources: {
        en: {
          translation: messagesEn
        },
        ru: {
            translation: messagesRu
        }
    },
});