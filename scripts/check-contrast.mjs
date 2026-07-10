#!/usr/bin/env node
/*
 * WCAG 2.1 contrast gate for the Riverbed themes.
 *
 * Parses src/styles/tokens.css (Layer 1 + both theme blocks), resolves var()
 * chains, and checks every text/fill pairing the components actually render.
 * Border hairlines are reported but non-fatal — they are deliberate sub-3:1
 * hairlines in both themes. Run: node scripts/check-contrast.mjs
 */
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const css = readFileSync(join(root, 'src/styles/tokens.css'), 'utf8');

function blockVars(selectorRe) {
  const m = css.match(selectorRe);
  if (!m) throw new Error(`selector not found: ${selectorRe}`);
  const body = m[1];
  const vars = {};
  for (const d of body.matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)) vars[d[1]] = d[2].trim();
  return vars;
}

const layer1 = blockVars(/:root\s*\{([^}]*)\}/);
const light = blockVars(/:root\s*,\s*\[data-ornie-theme='light'\]\s*\{([^}]*)\}/);
const dark = blockVars(/\[data-ornie-theme='dark'\]\s*\{([^}]*)\}/);

function resolve(name, theme) {
  let v = theme[name] ?? layer1[name];
  if (!v) throw new Error(`unresolved token ${name}`);
  const ref = v.match(/^var\((--[\w-]+)\)$/);
  return ref ? resolve(ref[1], theme) : v;
}

function parseColor(v) {
  const hex = v.match(/^#([0-9a-f]{6})$/i);
  if (hex) {
    const n = parseInt(hex[1], 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255, 1];
  }
  const rgba = v.match(/^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*([\d.]+)\s*)?\)$/);
  if (rgba) return [+rgba[1], +rgba[2], +rgba[3], rgba[4] === undefined ? 1 : +rgba[4]];
  throw new Error(`unparseable color: ${v}`);
}

const over = ([r, g, b, a], [br, bg, bb]) => [r * a + br * (1 - a), g * a + bg * (1 - a), b * a + bb * (1 - a), 1];

function luminance([r, g, b]) {
  const lin = (c) => {
    c /= 255;
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}

function ratio(fg, bgc) {
  const [l1, l2] = [luminance(fg), luminance(bgc)].sort((a, b) => b - a);
  return (l1 + 0.05) / (l2 + 0.05);
}

// [foreground, background, minimum, fatal] — backgrounds with alpha composite
// over the page (--ornie-bg) first.
const PAIRS = [
  ['--ornie-text', '--ornie-bg', 4.5, true],
  ['--ornie-text', '--ornie-surface', 4.5, true],
  ['--ornie-text-muted', '--ornie-surface', 4.5, true],
  ['--ornie-text-muted', '--ornie-surface-sunken', 4.5, true],
  ['--ornie-text-subtle', '--ornie-surface', 3, true],
  ['--ornie-accent-text', '--ornie-surface', 4.5, true],
  ['--ornie-accent-text', '--ornie-bg', 4.5, true],
  ['--ornie-text-on-accent', '--ornie-accent', 4.5, true],
  ['--ornie-text-on-accent', '--ornie-accent-hover', 4.5, true],
  ['--ornie-text-on-accent', '--ornie-accent-active', 4.5, true],
  ['--ornie-text-on-accent', '--ornie-danger', 4.5, true],
  ['--ornie-text-on-accent', '--ornie-danger-hover', 4.5, true],
  ['--ornie-accent-text', '--ornie-accent-subtle', 4.5, true],
  ['--ornie-accent-text-hover', '--ornie-surface', 4.5, true],
  ['--ornie-accent-text-hover', '--ornie-bg', 4.5, true],
  ['--ornie-success-text', '--ornie-success-subtle', 4.5, true],
  ['--ornie-warning-text', '--ornie-warning-subtle', 4.5, true],
  ['--ornie-danger-text', '--ornie-danger-subtle', 4.5, true],
  ['--ornie-danger-text', '--ornie-surface', 4.5, true],
  ['--ornie-danger-text', '--ornie-bg', 4.5, true],
  ['--ornie-text-inverse', '--ornie-surface-inverse', 4.5, true],
  // Interaction washes carry normal text
  ['--ornie-text', '--ornie-hover', 4.5, true],
  ['--ornie-text', '--ornie-selected', 4.5, true],
  ['--ornie-text-muted', '--ornie-hover', 4.5, true],
  // Decorative identity tones (Avatar, ProjectDot)
  ['--ornie-tone-river-ink', '--ornie-tone-river', 4.5, true],
  ['--ornie-tone-fur-ink', '--ornie-tone-fur', 4.5, true],
  ['--ornie-tone-moss-ink', '--ornie-tone-moss', 4.5, true],
  ['--ornie-tone-clay-ink', '--ornie-tone-clay', 4.5, true],
  ['--ornie-tone-stone-ink', '--ornie-tone-stone', 4.5, true],
  // UI boundaries (WCAG 1.4.11 where ≥3; hairlines are deliberate and non-fatal)
  ['--ornie-accent', '--ornie-bg', 3, true],
  ['--ornie-danger', '--ornie-bg', 3, true],
  ['--ornie-focus-ring', '--ornie-bg', 3, true],
  ['--ornie-focus-ring', '--ornie-surface', 3, true],
  ['--ornie-border', '--ornie-surface', 1.3, false],
  ['--ornie-border-strong', '--ornie-surface', 1.7, false],
  ['--ornie-border-hover', '--ornie-surface', 2.5, false],
];

let failed = 0;
for (const [themeName, theme] of [['light', light], ['dark', dark]]) {
  const page = parseColor(resolve('--ornie-bg', theme));
  const rows = PAIRS;
  console.log(`\n${themeName}`);
  for (const [fgName, bgName, min, fatal] of rows) {
    let bgc = parseColor(resolve(bgName, theme));
    if (bgc[3] < 1) bgc = over(bgc, page);
    let fg = parseColor(resolve(fgName, theme));
    if (fg[3] < 1) fg = over(fg, bgc);
    const r = ratio(fg, bgc);
    const ok = r >= min;
    if (!ok && fatal) failed++;
    const mark = ok ? '✓' : fatal ? '✗' : '!';
    console.log(`  ${mark} ${r.toFixed(2).padStart(6)} ≥ ${String(min).padStart(3)}  ${fgName} on ${bgName}`);
  }
}
if (failed) {
  console.error(`\n${failed} fatal contrast failure(s)`);
  process.exit(1);
}
console.log('\nall contrast gates pass');
