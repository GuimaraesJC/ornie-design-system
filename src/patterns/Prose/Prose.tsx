import { forwardRef } from 'react';
import type { HTMLAttributes } from 'react';
import { cx } from '../../lib/cx';
import './Prose.css';

export type ProseProps = HTMLAttributes<HTMLDivElement>;

/**
 * Prose — reading typography for rendered note and journal content.
 * A single wrapper that styles the *elements* the app's renderer emits
 * (h1–h3, p, ul/ol, blockquote, code/pre, hr, bare `a`, strong/em).
 * It sets no width — the app owns layout — and has no outer margins;
 * internal block rhythm collapses at the first and last child so the
 * root composes cleanly. Components interleaved by the app (WikiLink,
 * Chip) keep their own look: only classless elements are styled.
 * See Prose.prompt.md. Screens: 1p/1q, 2l journal, 1u Ask, D:Notes, D:Journal, D:SDK docs.
 */
export const Prose = forwardRef<HTMLDivElement, ProseProps>(function Prose(
  { className, children, ...rest },
  ref,
) {
  return (
    <div ref={ref} className={cx('ornie-prose', className)} {...rest}>
      {children}
    </div>
  );
});
