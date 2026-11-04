// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://cavewear.de',
  // React only where it's the right tool (the Pack drawer). Everything else on the
  // site stays plain Astro + JavaScript. The sitemap lists every page for search
  // engines, except the style guide (noindex).
  integrations: [react(), sitemap({ filter: (page) => !page.includes('/styleguide') })]
});