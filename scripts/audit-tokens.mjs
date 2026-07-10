#!/usr/bin/env node
/*
 * Token discipline gate (D-44 / D-61 / D-67). Scans hand-written component CSS
 * and fails on:
 *
 *   1. hex colors — semantic tokens only, no hex, ever
 *   2. raw palette scales (--ornie-river-*, --ornie-sand-*, …) without a
 *      `layer1:` justification comment on the same or previous line
 *   3. [data-ornie-theme] selectors — dark comes from tokens, never from
 *      component CSS (D-67)
 *
 * Scope: every .css under src/ except the generated tokens.css and fonts.css.
 * Run: pnpm audit:tokens
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, relative } from 'node:path';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const EXCLUDE = new Set(['src/styles/tokens.css', 'src/styles/fonts.css']);

function cssFiles(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) out.push(...cssFiles(p));
    else if (name.endsWith('.css')) out.push(p);
  }
  return out;
}

const RAW_SCALE = /var\(\s*--ornie-(?:river|sand|fur|moss|clay|rust)-\d+\s*\)/;
const HEX = /#[0-9a-fA-F]{3,8}\b/;
const THEME_SELECTOR = /\[data-ornie-theme[^\]]*\]/;

let failures = 0;
const fail = (file, line, msg) => {
  console.error(`✗ ${relative(root, file)}:${line}  ${msg}`);
  failures++;
};

for (const file of cssFiles(join(root, 'src'))) {
  if (EXCLUDE.has(relative(root, file))) continue;
  const lines = readFileSync(file, 'utf8').split('\n');
  let inComment = false;
  lines.forEach((raw, i) => {
    // strip comments (line-local; track multi-line blocks)
    let line = raw;
    if (inComment) {
      const end = line.indexOf('*/');
      if (end === -1) return;
      line = line.slice(end + 2);
      inComment = false;
    }
    line = line.replace(/\/\*.*?\*\//g, (m) => ' '.repeat(m.length));
    const open = line.indexOf('/*');
    if (open !== -1) {
      line = line.slice(0, open);
      inComment = true;
    }

    if (HEX.test(line)) fail(file, i + 1, `hex color — use a semantic token: ${raw.trim()}`);
    if (THEME_SELECTOR.test(line))
      fail(file, i + 1, `theme selector in component CSS — fix the tokens instead (D-67): ${raw.trim()}`);
    if (RAW_SCALE.test(line)) {
      const justified = /layer1:/.test(raw) || (i > 0 && /layer1:/.test(lines[i - 1]));
      if (!justified)
        fail(file, i + 1, `raw palette scale without a /* layer1: why */ comment: ${raw.trim()}`);
    }
  });
}

if (failures) {
  console.error(`\n${failures} token audit failure(s)`);
  process.exit(1);
}
console.log('token audit clean — semantic tokens only, no theme selectors');
