#!/usr/bin/env node
/*
 * Token generator (D-44). tokens.json is the single source of truth; this
 * script emits every consumable target:
 *
 *   src/styles/tokens.css   CSS custom properties (the package stylesheet)
 *   tokens/Tokens.swift     SwiftUI constants for native slivers
 *   tokens/Tokens.kt        Compose constants for native slivers
 *
 * Never hand-edit the generated files. Run: pnpm tokens
 *
 * Ref syntax in tokens.json:
 *   {river.500}  -> Layer 1 palette value  (CSS: var(--ornie-river-500))
 *   {@surface}   -> another Layer 2 token in the same theme (CSS: var(--ornie-surface))
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const tokens = JSON.parse(readFileSync(join(root, 'tokens.json'), 'utf8'));

const GENERATED = 'GENERATED from tokens.json by scripts/build-tokens.mjs — DO NOT EDIT. Edit tokens.json and run `pnpm tokens`.';

const isMeta = (k) => k.startsWith('$');
const entries = (obj) => Object.entries(obj).filter(([k]) => !isMeta(k));

// ---------------------------------------------------------------- CSS refs
const cssRef = (value) =>
  value
    .replace(/\{@([\w-]+)\}/g, 'var(--ornie-$1)')
    .replace(/\{([a-z]+)\.([\w-]+)\}/g, 'var(--ornie-$1-$2)');

// ------------------------------------------------------------ value resolve
// Resolve a Layer 2 value to a concrete color string (for native targets).
function resolveValue(value, theme) {
  const alias = value.match(/^\{@([\w-]+)\}$/);
  if (alias) return resolveValue(theme[alias[1]], theme);
  const pal = value.match(/^\{([a-z]+)\.([\w-]+)\}$/);
  if (pal) return tokens.layer1.palette[pal[1]][pal[2]];
  return value;
}

function parseColor(v) {
  const hex = v.match(/^#([0-9a-f]{6})$/i);
  if (hex) {
    const n = parseInt(hex[1], 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255, 1];
  }
  const rgba = v.match(/^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*([\d.]+)\s*)?\)$/);
  if (rgba) return [+rgba[1], +rgba[2], +rgba[3], rgba[4] === undefined ? 1 : +rgba[4]];
  return null; // not a color (shadow list, font stack, …)
}

// ------------------------------------------------------------------- CSS
function cssDecls(group, indent, prefix = '') {
  const comments = group.$comments ?? {};
  return entries(group)
    .map(([k, v]) => {
      const c = comments[k] ? ` /* ${comments[k]} */` : '';
      return `${indent}--ornie-${prefix}${k}: ${cssRef(v)};${c}`;
    })
    .join('\n');
}

function buildCss() {
  const l1 = tokens.layer1;
  const out = [];
  out.push(`/*
 * ${GENERATED}
 *
 * Ornie design tokens — "${tokens.$meta.name}" theme.
 *
 * Platypus habitat: earth + water. Warm taupe neutrals (earth) carry the page;
 * a muted river teal carries actions; fur brown is the identity thread. Status
 * colors are deliberately muted — Ornie is built for A(u)DHD users, so nothing
 * on screen should shout.
 *
 * Layer 1 (primitives): raw palette, type scale, spacing, radii, shadows.
 * Layer 2 (semantic):   the roles components actually consume.
 *
 * Components must only reference Layer 2 tokens. The dark theme is a Layer 2
 * override under [data-ornie-theme='dark'] — attribute-only by design (no
 * prefers-color-scheme): the app decides, so a page never flips theme on its
 * own. The dark block must stay AFTER the light block — :root and
 * [data-ornie-theme='dark'] tie at (0,1,0) specificity, so source order wins.
 */
`);

  out.push(':root {');
  const palComments = l1.palette.$comments ?? {};
  for (const [scale, colors] of entries(l1.palette)) {
    out.push(`  /* --- Layer 1: palette — ${scale}${colors.$comment ? ` (${colors.$comment})` : ''} --- */`);
    for (const [k, v] of entries(colors)) {
      const c = palComments[`${scale}.${k}`] ? ` /* ${palComments[`${scale}.${k}`]} */` : '';
      out.push(`  --ornie-${scale}-${k}: ${v};${c}`);
    }
    out.push('');
  }
  out.push('  /* --- Layer 1: typography --- */');
  out.push(cssDecls(l1.typography, '  '));
  out.push('');
  out.push(`  /* --- Layer 1: spacing (${l1.spacing.$comment ?? ''}) --- */`);
  out.push(cssDecls(l1.spacing, '  '));
  out.push('');
  out.push('  /* --- Layer 1: radii --- */');
  out.push(cssDecls(l1.radius, '  '));
  out.push('');
  out.push(`  /* --- Layer 1: ${l1.shadow.$comment ?? 'elevation'} --- */`);
  out.push(cssDecls(l1.shadow, '  '));
  out.push('');
  out.push(`  /* --- Layer 1: motion — ${l1.motion.$comment ?? ''} --- */`);
  out.push(cssDecls(l1.motion, '  '));
  out.push('');
  out.push('  /* --- Layer 1: stacking --- */');
  out.push(cssDecls(l1.z, '  '));
  if (l1.runtime) {
    out.push('');
    out.push(`  /* --- Layer 1: runtime contract — ${l1.runtime.$comment ?? ''} --- */`);
    out.push(cssDecls(l1.runtime, '  '));
  }
  out.push('}\n');

  const light = tokens.layer2.light;
  out.push(`:root,
[data-ornie-theme='light'] {
  color-scheme: ${light.$colorScheme};
`);
  out.push(cssDecls(light, '  '));
  out.push('}\n');

  const dark = tokens.layer2.dark;
  out.push(`/*
 * Riverbed at night. Same earth-and-water character, lights down: deep warm
 * browns carry the page (never pure black), the river accent keeps its exact
 * daytime fills so controls feel like the same objects, and status/decoration
 * tints flip from pastel-on-light to deep-ground-with-pale-ink. All text/
 * background pairs are contrast-verified: scripts/check-contrast.mjs.
 */
[data-ornie-theme='dark'] {
  color-scheme: ${dark.$colorScheme};
`);
  out.push(cssDecls(dark, '  '));
  out.push('}\n');

  const collapse = l1.motion.$reducedMotion ?? {};
  out.push(`/*
 * Calm floor (D-01 / A11y): reduced motion collapses every motion token to
 * near-zero HERE, once — components use the duration tokens and never write
 * this media query themselves.
 */
@media (prefers-reduced-motion: reduce) {
  :root {
${Object.entries(collapse).map(([k, v]) => `    --ornie-${k}: ${v};`).join('\n')}
  }
}
`);
  return out.join('\n');
}

// ---------------------------------------------------------------- naming
const camel = (k) => k.replace(/-(\w)/g, (_, c) => c.toUpperCase());

// Tokens that exist only for CSS back-compat or are CSS-specific — native
// slivers are new consumers and get only the canonical, expressible set.
const NATIVE_SKIP = new Set([
  'inverse-surface',
  'inverse-text',
  'focus-ring-danger',
  'duration-fast',
  'duration-normal',
  'ease',
]);

function nativeSemantic(theme) {
  return entries(theme)
    .filter(([k]) => !NATIVE_SKIP.has(k) && !k.startsWith('shadow-'))
    .map(([k, v]) => [k, parseColor(resolveValue(v, theme))])
    .filter(([, c]) => c !== null);
}

// ------------------------------------------------------------------ Swift
function swiftColor([r, g, b, a]) {
  const f = (n) => (n / 255).toFixed(4);
  return a === 1
    ? `Color(.sRGB, red: ${f(r)}, green: ${f(g)}, blue: ${f(b)})`
    : `Color(.sRGB, red: ${f(r)}, green: ${f(g)}, blue: ${f(b)}, opacity: ${a})`;
}

function buildSwift() {
  const l1 = tokens.layer1;
  const out = [];
  out.push(`// ${GENERATED}`);
  out.push(`// Ornie design tokens — "${tokens.$meta.name}" theme.`);
  out.push('// Native slivers consume tokens only, never components (D-44).');
  out.push('// CSS-only tokens (shadows, z-index, easing curves, deprecated aliases) are not emitted.');
  out.push('');
  out.push('import SwiftUI');
  out.push('');
  out.push('public enum OrnieTokens {');

  out.push('  public enum Palette {');
  for (const [scale, colors] of entries(l1.palette)) {
    for (const [k, v] of entries(colors)) {
      out.push(`    public static let ${camel(`${scale}-${k}`)} = ${swiftColor(parseColor(v))}`);
    }
  }
  out.push('  }');
  out.push('');
  for (const theme of ['light', 'dark']) {
    out.push(`  public enum ${theme[0].toUpperCase() + theme.slice(1)} {`);
    for (const [k, c] of nativeSemantic(tokens.layer2[theme])) {
      out.push(`    public static let ${camel(k)} = ${swiftColor(c)}`);
    }
    out.push('  }');
    out.push('');
  }
  out.push('  public enum Typography {');
  out.push(`    public static let fontFamily = "Manrope"`);
  for (const [k, v] of entries(l1.typography)) {
    if (k === 'font-sans') continue;
    const num = parseFloat(v);
    const type = k.startsWith('weight') ? 'Int' : 'CGFloat';
    out.push(`    public static let ${camel(k)}: ${type} = ${k.startsWith('weight') ? num : num}`);
  }
  out.push('  }');
  out.push('');
  out.push('  public enum Space {');
  for (const [k, v] of entries(l1.spacing)) {
    out.push(`    public static let ${camel(k.replace('space-', 's'))}: CGFloat = ${parseFloat(v)}`);
  }
  out.push('  }');
  out.push('');
  out.push('  public enum Radius {');
  for (const [k, v] of entries(l1.radius)) {
    out.push(`    public static let ${camel(k.replace('radius-', ''))}: CGFloat = ${parseFloat(v)}`);
  }
  out.push('  }');
  out.push('');
  out.push('  public enum Motion {');
  for (const [k, v] of entries(l1.motion)) {
    if (NATIVE_SKIP.has(k) || k.startsWith('ease')) continue;
    out.push(`    /// milliseconds — collapse to ~0 when the OS reduce-motion setting is on`);
    out.push(`    public static let ${camel(k)}: Double = ${parseFloat(v)}`);
  }
  out.push('  }');
  out.push('}');
  out.push('');
  return out.join('\n');
}

// ------------------------------------------------------------------ Kotlin
function kotlinColor([r, g, b, a]) {
  const byte = (n) => n.toString(16).padStart(2, '0').toUpperCase();
  const alpha = byte(Math.round(a * 255));
  return `Color(0x${alpha}${byte(r)}${byte(g)}${byte(b)})`;
}

function buildKotlin() {
  const l1 = tokens.layer1;
  const out = [];
  out.push(`// ${GENERATED}`);
  out.push(`// Ornie design tokens — "${tokens.$meta.name}" theme.`);
  out.push('// Native slivers consume tokens only, never components (D-44).');
  out.push('// CSS-only tokens (shadows, z-index, easing curves, deprecated aliases) are not emitted.');
  out.push('');
  out.push('package com.ornie.tokens');
  out.push('');
  out.push('import androidx.compose.ui.graphics.Color');
  out.push('');
  out.push('object OrnieTokens {');
  out.push('    object Palette {');
  for (const [scale, colors] of entries(l1.palette)) {
    for (const [k, v] of entries(colors)) {
      out.push(`        val ${camel(`${scale}-${k}`)} = ${kotlinColor(parseColor(v))}`);
    }
  }
  out.push('    }');
  out.push('');
  for (const theme of ['light', 'dark']) {
    out.push(`    object ${theme[0].toUpperCase() + theme.slice(1)} {`);
    for (const [k, c] of nativeSemantic(tokens.layer2[theme])) {
      out.push(`        val ${camel(k)} = ${kotlinColor(c)}`);
    }
    out.push('    }');
    out.push('');
  }
  out.push('    object Typography {');
  out.push('        const val fontFamily = "Manrope"');
  for (const [k, v] of entries(l1.typography)) {
    if (k === 'font-sans') continue;
    const type = k.startsWith('leading') ? 'Float' : 'Int';
    out.push(`        const val ${camel(k)}: ${type} = ${type === 'Float' ? `${parseFloat(v)}f` : parseFloat(v)}`);
  }
  out.push('    }');
  out.push('');
  out.push('    object Space {');
  for (const [k, v] of entries(l1.spacing)) {
    out.push(`        const val ${camel(k.replace('space-', 's'))}: Int = ${parseFloat(v)}`);
  }
  out.push('    }');
  out.push('');
  out.push('    object Radius {');
  for (const [k, v] of entries(l1.radius)) {
    out.push(`        const val ${camel(k.replace('radius-', ''))}: Int = ${parseFloat(v)}`);
  }
  out.push('    }');
  out.push('');
  out.push('    object Motion {');
  out.push('        // milliseconds — collapse to ~0 when the OS reduce-motion setting is on');
  for (const [k, v] of entries(l1.motion)) {
    if (NATIVE_SKIP.has(k) || k.startsWith('ease')) continue;
    out.push(`        const val ${camel(k)}: Int = ${parseFloat(v)}`);
  }
  out.push('    }');
  out.push('}');
  out.push('');
  return out.join('\n');
}

// ------------------------------------------------------------------ write
mkdirSync(join(root, 'tokens'), { recursive: true });
writeFileSync(join(root, 'src/styles/tokens.css'), buildCss());
writeFileSync(join(root, 'tokens/Tokens.swift'), buildSwift());
writeFileSync(join(root, 'tokens/Tokens.kt'), buildKotlin());
console.log('tokens.json → src/styles/tokens.css, tokens/Tokens.swift, tokens/Tokens.kt');
