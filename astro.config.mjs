import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Español en la raíz; el resto de los idiomas en /en/, /it/, /de/, /fr/
export default defineConfig({
  site: 'https://agenciacontesta.com',
  trailingSlash: 'always',
  integrations: [
    sitemap({
      i18n: { defaultLocale: 'es', locales: { es: 'es', en: 'en', it: 'it', de: 'de', fr: 'fr' } },
    }),
  ],
});
