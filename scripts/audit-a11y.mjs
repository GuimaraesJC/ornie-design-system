#!/usr/bin/env node
/*
 * Accessibility gate: axe pass over every component variant grid
 * (src/<tier>/<Name>/<Name>.html — the both-themes proof pages).
 *
 * Grids render the full variant × state matrix twice (light + dark), so one
 * axe run per grid covers both themes. Any violation fails the build.
 *
 * No grids yet → passes with a note (Phase 1 adds them; the gate is wired now
 * so grids are audited from the first one onward).
 *
 * Run: pnpm audit:a11y  (needs `pnpm exec playwright install chromium` once)
 */
import { readdirSync, statSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, join, relative } from 'node:path';
import { createRequire } from 'node:module';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const TIERS = ['foundations', 'primitives', 'patterns', 'shells'];

function grids(dir) {
  const out = [];
  let names;
  try {
    names = readdirSync(dir);
  } catch {
    return out;
  }
  for (const name of names) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) out.push(...grids(p));
    else if (name.endsWith('.html')) out.push(p);
  }
  return out;
}

const targets = TIERS.flatMap((t) => grids(join(root, 'src', t)));
if (targets.length === 0) {
  console.log('audit:a11y — no variant grids found under src/{' + TIERS.join(',') + '} yet; gate is wired, nothing to check.');
  process.exit(0);
}

const require = createRequire(import.meta.url);
const { chromium } = await import('playwright');
const axeSource = (await import('node:fs')).readFileSync(require.resolve('axe-core/axe.min.js'), 'utf8');

const browser = await chromium.launch();
const page = await browser.newPage();
let failures = 0;

for (const grid of targets) {
  await page.goto(pathToFileURL(grid).href);
  await page.addScriptTag({ content: axeSource });
  // Let fonts load and finite animations (entrance fades) finish — axe reads
  // mid-animation opacity as a real color blend otherwise. Infinite animations
  // (Spinner) are skipped.
  await page.evaluate(async () => {
    await document.fonts?.ready;
    const finite = document
      .getAnimations()
      .filter((a) => a.effect?.getTiming().iterations !== Infinity);
    await Promise.all(finite.map((a) => a.finished.catch(() => {})));
    await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
  });
  const results = await page.evaluate(async () => await window.axe.run(document, {
    resultTypes: ['violations'],
    rules: {
      // The grid renders the SAME tree twice (light + dark halves), so any
      // named landmark legitimately appears twice per document. Real screens
      // render once; this rule can't coexist with the both-themes proof.
      'landmark-unique': { enabled: false },
    },
  }));
  const rel = relative(root, grid);
  if (results.violations.length === 0) {
    console.log(`✓ ${rel}`);
    continue;
  }
  failures++;
  console.error(`✗ ${rel}`);
  for (const v of results.violations) {
    console.error(`    [${v.impact}] ${v.id}: ${v.help} (${v.nodes.length} node(s))`);
    for (const n of v.nodes.slice(0, 3)) console.error(`      ${n.target.join(' ')}`);
  }
}

await browser.close();
if (failures) {
  console.error(`\n${failures} grid(s) with axe violations`);
  process.exit(1);
}
console.log(`\nall ${targets.length} variant grid(s) pass axe`);
