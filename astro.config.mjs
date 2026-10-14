// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://amirabbas-khalili.github.io',
  devToolbar: { enabled: false },
  vite: {
    css: { transformer: 'lightningcss', lightningcss: { targets: { safari: (15 << 16) | (4 << 8) } } },
    build: { cssMinify: 'lightningcss', cssTarget: 'safari15.4' },
    plugins: [tailwindcss()]
  }
});
