// Verifies every expected page was built and has a title, description and OG tags.
import { readFileSync, existsSync } from 'node:fs';
const pages = ['index','phase-1-machine/index','phase-2-algorithms/index','phase-3-engineering/index','phase-4-systems/index','shipping/index','rules/index','prompt/index','404'];
let fail = 0;
for (const p of pages) {
  const f = `dist/${p}.html`;
  if (!existsSync(f)) { console.error('missing', f); fail++; continue; }
  const h = readFileSync(f, 'utf8');
  for (const needle of ['<title>', 'name="description"', 'property="og:image"', '<h1']) if (!h.includes(needle)) { console.error(f, 'lacks', needle); fail++; }
}
if (!readFileSync('dist/prompt/index.html','utf8').includes('id="copy"')) { console.error('copy button missing'); fail++; }
if (!existsSync('dist/sitemap.xml')) { console.error('sitemap missing'); fail++; }
console.log(fail ? `${fail} problem(s)` : `All ${pages.length} pages OK`); process.exit(fail ? 1 : 0);
