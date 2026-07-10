import { forwardRef } from 'react';
import type { HTMLAttributes, Ref } from 'react';
import { cx } from '../../lib/cx';
import { deprecate } from '../../lib/deprecate';
import './Card.css';

export type CardVariant = 'flat' | 'elevated' | 'sunken';
export type CardPadding = 'none' | 'sm' | 'md' | 'lg';

export interface CardProps extends HTMLAttributes<HTMLElement> {
  /**
   * Surface treatment. `flat` = surface + hairline; `elevated` = hairline +
   * shadow; `sunken` = recessed grouping inside another surface.
   * @default 'elevated'
   */
  variant?: CardVariant | 'outlined';
  /** Inner padding: none 0 / sm 12 / md 16 / lg 24 (px). @default 'md' */
  padding?: CardPadding;
  /** 4px `--ornie-accent` left edge (the RIGHT NOW card, 2a). Radius-aware. */
  spine?: boolean;
  /**
   * Hover wash + pointer cursor + focus ring. With `onClick` the card renders
   * as a full-width `<button>`; with `href` as an `<a>`.
   */
  interactive?: boolean;
  /** Renders the card as an `<a>`. Pair with `interactive`. */
  href?: string;
}

/**
 * Card — the bounded surface. See Card.prompt.md.
 * Screens: 2a RIGHT NOW + close-day, 2c triage, 2l Journal, 2m Pages,
 * 1v plan, D:Today, D:Pages, D:Journal, D:Settings (COVERAGE_MATRIX).
 */
export const Card = forwardRef<HTMLElement, CardProps>(function Card(
  {
    variant = 'elevated',
    padding = 'md',
    spine,
    interactive,
    href,
    onClick,
    className,
    children,
    ...rest
  },
  ref,
) {
  let resolved: CardVariant;
  if (variant === 'outlined') {
    deprecate('Card.variant', 'Card variant="outlined" is deprecated, use variant="flat"; removed in 0.3.0');
    resolved = 'flat';
  } else {
    resolved = variant;
  }

  const classes = cx(
    'ornie-card',
    `ornie-card--${resolved}`,
    padding !== 'none' && `ornie-card--pad-${padding}`,
    spine && 'ornie-card--spine',
    interactive && 'ornie-card--interactive',
    className,
  );

  if (href !== undefined) {
    return (
      <a ref={ref as Ref<HTMLAnchorElement>} className={classes} href={href} onClick={onClick} {...rest}>
        {children}
      </a>
    );
  }

  if (interactive && onClick !== undefined) {
    return (
      <button ref={ref as Ref<HTMLButtonElement>} type="button" className={classes} onClick={onClick} {...rest}>
        {children}
      </button>
    );
  }

  return (
    <div ref={ref as Ref<HTMLDivElement>} className={classes} onClick={onClick} {...rest}>
      {children}
    </div>
  );
});
