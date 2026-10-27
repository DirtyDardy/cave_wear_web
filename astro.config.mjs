// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  // React only where it's the right tool (the Pack drawer). Everything else on the
  // site stays plain Astro + JavaScript.
  integrations: [react()]
});