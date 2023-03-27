const path = require('path');

module.exports = {
  i18n: {
    locales: ['en', 'pl'], // Lista obsługiwanych języków
    defaultLocale: 'en', // Domyślny język
  },
  localePath: path.resolve('./public/locales'), // Ścieżka do katalogu z plikami tłumaczeń
};