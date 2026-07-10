import type { HTMLAttributes } from 'react';
import { cx } from '../../lib/cx';

export type CardVariant = 'elevated' | 'outlined' | 'sunken';
export type CardPadding = 'none' | 'sm' | 'md' | 'lg';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** Surface treatment. @default 'elevated' */
  variant?: CardVariant;
  /** Inner padding. @default 'md' */
  padding?: CardPadding;
}

export function Card({
  variant = 'elevated',
  padding = 'md',
  className,
  children,
  ...rest
}: CardProps) {
  return (
    <div
      className={cx(
        'ornie-card',
        `ornie-card--${variant}`,
        padding !== 'none' && `ornie-card--pad-${padding}`,
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
