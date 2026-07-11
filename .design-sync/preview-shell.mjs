import { createElement } from 'react';

// Preview wrapper mirroring .storybook/preview.tsx's decorator: every story
// renders inside <div className="ornie-app">, which base.css gives the Ornie
// page font (Manrope), ink color, and page background (--ornie-bg = #f8f5f1,
// identical to the storybook 'ornie' canvas). Design tokens live on :root, so
// components style themselves without it — but the base font/ink/bg inherit
// from this wrapper, exactly as the app applies .ornie-app to its page root.
//
// Bundled via cfg.extraEntries so cfg.provider can reference it as a real
// bundle export. The decorator itself cannot auto-bundle: its index.css import
// pulls in Manrope .woff2, which the converter's decorator esbuild pass has no
// font loader for. cfg.provider both restores the wrapper and lets the README
// generate concrete wrap guidance (decorator-only wrapping ships a generic note).
export function OrnieApp({ children }) {
  return createElement('div', { className: 'ornie-app' }, children);
}
