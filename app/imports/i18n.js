'use strict';

import i18n from 'i18next';
import XHR from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
    .use(XHR)
    .use(LanguageDetector)
    .init({
        fallbackLng: 'en-US',
        ns: ['phraseapp'],
        defaultNS: 'phraseapp',
        interpolation: {
            escapeValue: false,
            prefix: '__',
            suffix: '__'
        },
        backend: {
            loadPath: '/locales/__lng__/__ns__.json'
        },
        debug: false
    });

export default i18n;
