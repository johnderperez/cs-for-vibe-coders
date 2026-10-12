import { phases } from '../data/phases.js';
export function GET({ site }) {
  const paths = ['/', ...phases.map(p => '/' + p.slug), '/shipping', '/rules', '/prompt'];
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${paths.map(p => `<url><loc>${new URL(p, site)}</loc></url>`).join('')}</urlset>`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml' } });
}
