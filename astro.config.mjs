// @ts-check
import { defineConfig } from 'astro/config';

const githubPages = process.env.GITHUB_PAGES === 'true';
const [owner, repository] = (process.env.GITHUB_REPOSITORY || 'YonaNeg/YonaNeg.github.io').split('/');
const pagesBase = repository.toLowerCase() === owner.toLowerCase() + '.github.io'
  ? '/'
  : '/' + repository;
const base = githubPages ? pagesBase : '/';

// The site first launched at /academic-website/. Once it is served from the root domain,
// these pages forward the old addresses to their new ones.
const legacyRedirects = Object.fromEntries(
  ['', 'about', 'research', 'publications', 'cv'].map((page) => [
    page ? `/academic-website/${page}` : '/academic-website',
    page ? `/${page}/` : '/',
  ]),
);

// https://astro.build/config
export default defineConfig({
  site: 'https://' + owner.toLowerCase() + '.github.io',
  base,
  output: 'static',
  redirects: base === '/' ? legacyRedirects : {},
  build: {
    inlineStylesheets: 'never',
  },
});
