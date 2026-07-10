import { forwardRef } from 'react';
import type { SVGAttributes } from 'react';
import { cx } from '../../lib/cx';
import { glyphs } from './glyphs.generated';
import type { IconName } from './glyphs.generated';
import './Icon.css';

export type { IconName };
export type IconSize = 16 | 20 | 24;

export interface IconProps extends Omit<SVGAttributes<SVGSVGElement>, 'children'> {
  /** Glyph name — plain Ornie nouns, see the Icons foundation card. */
  name: IconName;
  /** Box size in px. @default 20 */
  size?: IconSize;
  /**
   * Accessible name. Omit for decorative icons (default: hidden from
   * assistive tech). Icon-only buttons label the *button*, not the icon.
   */
  label?: string;
}

/**
 * Icon — curated Lucide glyphs, stroke locked at 1.9, round caps/joins.
 * Inherits `currentColor`; parents set color via text tokens.
 */
export const Icon = forwardRef<SVGSVGElement, IconProps>(function Icon(
  { name, size = 20, label, className, ...rest },
  ref,
) {
  return (
    <svg
      ref={ref}
      className={cx('ornie-icon', className)}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.9}
      strokeLinecap="round"
      strokeLinejoin="round"
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      dangerouslySetInnerHTML={{ __html: glyphs[name] }}
      {...rest}
    />
  );
});
