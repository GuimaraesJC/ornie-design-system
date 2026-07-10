/*
 * Variant-grid harness. Bundled to dist/grid/ornie-grid.js (iife, global
 * `OrnieGrid`) by `pnpm build:grid`. Each component's <Name>.html loads it and
 * calls OrnieGrid.mount(build) — the harness renders the SAME variant × state
 * matrix twice, into a light half and a `data-ornie-theme="dark"` half, side
 * by side. The grid is the both-themes proof and the axe target (audit:a11y).
 *
 * Dev-only artifact: not part of the published package entry; grids and axe
 * load everything from dist/, so run `pnpm build` first.
 */
import * as React from 'react';
import { createRoot } from 'react-dom/client';
import * as Components from '../index';

export { React, Components };

type Build = (
  h: typeof React.createElement,
  C: typeof Components,
  helpers: { section: SectionFn; row: RowFn },
) => React.ReactNode;

type SectionFn = (title: string, ...children: React.ReactNode[]) => React.ReactNode;
type RowFn = (label: string, ...children: React.ReactNode[]) => React.ReactNode;

const h = React.createElement;

const section: SectionFn = (title, ...children) =>
  h(
    'section',
    { key: title, style: { marginBottom: 'var(--ornie-space-6)' } },
    h(
      'h2',
      {
        style: {
          margin: '0 0 var(--ornie-space-3)',
          fontSize: '11px',
          fontWeight: 'var(--ornie-weight-bold)',
          letterSpacing: '1px',
          textTransform: 'uppercase',
          color: 'var(--ornie-text-muted)',
        },
      },
      title,
    ),
    h('div', { style: { display: 'flex', flexDirection: 'column', gap: 'var(--ornie-space-3)' } }, ...children),
  );

const row: RowFn = (label, ...children) =>
  h(
    'div',
    { key: label, style: { display: 'flex', alignItems: 'center', gap: 'var(--ornie-space-3)', flexWrap: 'wrap' } },
    h(
      'span',
      {
        style: {
          width: '112px',
          flex: 'none',
          fontSize: 'var(--ornie-text-xs)',
          color: 'var(--ornie-text-muted)',
        },
      },
      label,
    ),
    ...children,
  );

/** Render the same matrix twice — light and dark halves, side by side. */
export function mount(build: Build): void {
  const main = document.createElement('main');
  Object.assign(main.style, { display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '100vh' });
  document.body.appendChild(main);

  for (const theme of ['light', 'dark'] as const) {
    const host = document.createElement('div');
    host.className = 'ornie-app';
    if (theme === 'dark') host.setAttribute('data-ornie-theme', 'dark');
    Object.assign(host.style, {
      padding: '32px',
      boxSizing: 'border-box',
      background: 'var(--ornie-bg)',
      color: 'var(--ornie-text)',
      fontFamily: 'var(--ornie-font-sans)',
    });
    main.appendChild(host);
    createRoot(host, { identifierPrefix: `${theme}-` }).render(
      h(
        'section',
        { 'aria-label': `${theme} theme variants` },
        h(
          'h1',
          { style: { margin: '0 0 var(--ornie-space-5)', fontSize: 'var(--ornie-text-lg)' } },
          `${document.title} — ${theme}`,
        ),
        build(h, Components, { section, row }),
      ),
    );
  }
}
