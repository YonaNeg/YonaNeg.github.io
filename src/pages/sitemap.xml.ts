// Lists every page for search engines. Pages are found automatically, and their URLs
// follow the site address and base path in astro.config.mjs.
import type { APIRoute } from 'astro';
import { withBase } from '../utils/paths';

const routes = Object.keys(import.meta.glob('./**/*.astro'))
  .map((file) => file.replace(/^\.\//, '').replace(/\.astro$/, '').replace(/(^|\/)index$/, ''))
  .map((route) => (route ? `/${route}/` : '/'))
  .sort();

export const GET: APIRoute = ({ site }) => {
  const urls = routes.map((route) => `  <url><loc>${new URL(withBase(route), site)}</loc></url>`).join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
