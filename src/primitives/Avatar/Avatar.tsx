import { forwardRef, useState } from 'react';
import type { HTMLAttributes } from 'react';
import { cx } from '../../lib/cx';
import './Avatar.css';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type AvatarShape = 'circle' | 'square';

const TONES = ['river', 'fur', 'moss', 'clay', 'stone'] as const;

function initialsOf(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '';
  const first = parts[0][0] ?? '';
  const last = parts.length > 1 ? parts[parts.length - 1][0] ?? '' : '';
  return (first + last).toUpperCase();
}

function toneOf(name: string): (typeof TONES)[number] {
  let sum = 0;
  for (let i = 0; i < name.length; i++) sum = (sum * 53 + name.charCodeAt(i)) % 100003;
  return TONES[sum % TONES.length];
}

export interface AvatarProps extends HTMLAttributes<HTMLSpanElement> {
  /** Image source; falls back to initials (from `name`) if missing or broken. */
  src?: string;
  /** Accessible description of the image. Defaults to `name`. */
  alt?: string;
  /** Used for the initials fallback (first + last word) and its deterministic tint. */
  name?: string;
  /** xs 20 / sm 28 / md 36 / lg 44 / xl 56 (px). @default 'md' */
  size?: AvatarSize;
  /** @default 'circle' */
  shape?: AvatarShape;
}

/**
 * Avatar — a person, as image, initials, or quiet person glyph.
 * See Avatar.prompt.md. Screens: 2k people, D:people, share-later surfaces.
 */
export const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(function Avatar(
  { src, alt, name, size = 'md', shape = 'circle', className, ...rest },
  ref,
) {
  /* Track which src failed so a new src gets a fresh attempt. */
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const showImage = !!src && failedSrc !== src;
  const initials = name ? initialsOf(name) : '';
  return (
    <span
      ref={ref}
      className={cx(
        'ornie-avatar',
        `ornie-avatar--${size}`,
        `ornie-avatar--${shape}`,
        !showImage && !!name && `ornie-avatar--tone-${toneOf(name)}`,
        className,
      )}
      role={showImage ? undefined : 'img'}
      aria-label={showImage ? undefined : alt ?? name}
      {...rest}
    >
      {showImage ? (
        <img
          className="ornie-avatar__img"
          src={src}
          alt={alt ?? name ?? ''}
          onError={() => setFailedSrc(src)}
        />
      ) : initials ? (
        <span aria-hidden="true">{initials}</span>
      ) : (
        <svg className="ornie-avatar__icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 12a4.5 4.5 0 1 0-4.5-4.5A4.5 4.5 0 0 0 12 12Zm0 2.25c-3.9 0-7.5 1.96-7.5 4.5V20a1 1 0 0 0 1 1h13a1 1 0 0 0 1-1v-1.25c0-2.54-3.6-4.5-7.5-4.5Z" />
        </svg>
      )}
    </span>
  );
});
