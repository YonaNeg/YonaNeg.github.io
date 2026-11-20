// Search engines only read robots.txt at the root of a domain, so this takes effect
// once the site is served from https://yonaneg.github.io/. It allows all crawlers and
// points them to the sitemap.
import type { APIRoute } from 'astro';
import { withBase } from '../utils/paths';

export const GET: APIRoute = ({ site }) =>
  new Response(`User-agent: *\nAllow: /\n\nSitemap: ${new URL(withBase('/sitemap.xml'), site)}\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
