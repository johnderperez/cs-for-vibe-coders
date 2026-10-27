// Verifies every expected page was built and has a title, description and OG tags.
import { readFileSync, existsSync, readdirSync } from 'node:fs';
const pages = ['index','how-computers-work/index','algorithms-and-data/index','code-that-lasts/index','building-for-scale/index','how-computers-work/binary-and-logic/index','algorithms-and-data/big-o/index','building-for-scale/auth/index','shipping/index','rules/index','prompt/index','404'];
let fail = 0;
for (const p of pages) {
  const f = `dist/${p}.html`;
  if (!existsSync(f)) { console.error('missing', f); fail++; continue; }
  const h = readFileSync(f, 'utf8');
  for (const needle of ['<title>', 'name="description"', 'property="og:image"', '<h1', 'class="site-head"', 'aria-label="Breadcrumb"', 'aria-label="Course breadcrumb"', 'href="/guides"']) if (!h.includes(needle)) { console.error(f, 'lacks', needle); fail++; }
}
if (!readFileSync('dist/prompt/index.html','utf8').includes('id="copy"')) { console.error('copy button missing'); fail++; }
for (const p of pages.slice(1,5)) { const h = readFileSync(`dist/${p}.html`,'utf8'); if (!h.includes('class="checks"') || !h.includes('<details')) { console.error(p, 'lacks checklist or expandable topics'); fail++; } }
for (const p of pages) { const h = readFileSync(`dist/${p}.html`,'utf8'); if (/Phase \d/.test(h.replace(/<pre[\s\S]*?<\/pre>/g,''))) { console.error(p, 'still says "Phase N"'); fail++; } }
if (!readFileSync('dist/algorithms-and-data/index.html','utf8').includes('class="activity bigo"')) { console.error('Big-O game missing'); fail++; }
if (!readFileSync('dist/how-computers-work/binary-and-logic/index.html','utf8').includes('class="activity quiz"')) { console.error('quiz missing'); fail++; }
if (!readFileSync('dist/shipping/index.html','utf8').includes('class="activity order"')) { console.error('order challenge missing'); fail++; }
// Scan all generated pages, including lessons outside the representative list above.
function htmlFiles(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    const path = `${dir}/${entry.name}`;
    return entry.isDirectory() ? htmlFiles(path) : entry.name.endsWith('.html') ? [path] : [];
  });
}
const allHtml = htmlFiles('dist');
const canonicalBase = 'https://www.johnder.com/computer-science-for-vibe-coders';
for (const file of allHtml) {
  const html = readFileSync(file, 'utf8');
  const scripts = [...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)];
  const loaders = scripts.filter(([, attrs]) => /\bsrc=["']https:\/\/www\.googletagmanager\.com\/gtag\/js\?id=G-9HGKXLJNPY["']/.test(attrs));
  const configs = scripts.flatMap(([, , body]) => [...body.matchAll(/gtag\(\s*['"]config['"]\s*,\s*['"]G-9HGKXLJNPY['"]/g)]);
  if (loaders.length !== 1 || configs.length !== 1) {
    console.error(file, 'must have exactly one GA4 loader and one config call'); fail++;
  }
  const canonicals = [...html.matchAll(/<link\b[^>]*\brel=["']canonical["'][^>]*>/gi)];
  const href = canonicals[0]?.[0].match(/\bhref=["']([^"']+)["']/)?.[1];
  if (canonicals.length !== 1 || !(href === canonicalBase || href?.startsWith(`${canonicalBase}/`))) {
    console.error(file, 'must have one canonical under', canonicalBase); fail++;
  }
}
if (!existsSync('dist/sitemap.xml')) { console.error('sitemap missing'); fail++; }
if (existsSync('dist/sitemap.xml') && readFileSync('dist/sitemap.xml', 'utf8').includes('https://johnder.com/')) { console.error('sitemap contains non-www URLs'); fail++; }
console.log(fail ? `${fail} problem(s)` : `All ${allHtml.length} HTML pages OK`); process.exit(fail ? 1 : 0);
