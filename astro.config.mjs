import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  output: 'static',
  site: 'https://fapig1.github.io',
  base: '/MdWriting',
  vite: {
    plugins: [tailwindcss()],
  },
});
