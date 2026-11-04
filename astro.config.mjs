import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  output: 'static',
  // GitHub Pages 项目站点地址。修改仓库名时需同步更新 site 与 base。
  site: 'https://fapig1.github.io',
  base: '/MdWriting',
  vite: {
    plugins: [tailwindcss()],
  },
});
