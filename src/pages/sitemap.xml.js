import { u } from '../data/url.js';
import { phases } from '../data/phases.js';
import { steps } from '../data/activities.js';
export function GET({ site }) {
  const paths = ['/', ...phases.flatMap(p => ['/' + p.slug, ...steps[p.slug].map(x => `/${p.slug}/${x.s}`)]), '/shipping', '/rules', '/prompt'];
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${paths.map(p => `<url><loc>${new URL(u(p), site)}</loc></url>`).join('')}</urlset>`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml' } });
}
