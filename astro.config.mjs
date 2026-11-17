// @ts-check
import { defineConfig } from 'astro/config';

const githubPages = process.env.GITHUB_PAGES === 'true';
const [owner, repository] = (process.env.GITHUB_REPOSITORY || 'YonaNeg/academic-website').split('/');
const pagesBase = repository.toLowerCase() === owner.toLowerCase() + '.github.io'
  ? '/'
  : '/' + repository;

// https://astro.build/config
export default defineConfig({
  site: githubPages ? 'https://' + owner.toLowerCase() + '.github.io' : 'https://ydegefu-research.vercel.app',
  base: githubPages ? pagesBase : '/',
  output: 'static',
  build: {
    inlineStylesheets: 'never',
  },
});
