import { createContext, forwardRef, useContext, useId } from 'react';
import type { HTMLAttributes, ReactNode, Ref } from 'react';
import { cx } from '../../lib/cx';
import { Badge } from '../../primitives/Badge/Badge';
import { Tooltip } from '../../primitives/Tooltip/Tooltip';
import './SidebarNav.css';

/** Rail state, provided by SidebarNav; consumed by SidebarGroup/SidebarItem. */
const SidebarNavContext = createContext(false);

export interface SidebarNavProps extends HTMLAttributes<HTMLElement> {
  /** Workspace name / greeting area, above the nav groups. */
  header?: ReactNode;
  /** Nav content — compose from `SidebarGroup` + `SidebarItem`. */
  children?: ReactNode;
  /** Settings / plan-card area, pinned to the bottom above a hairline. */
  footer?: ReactNode;
  /**
   * Rail mode: 60px wide, labels hide, items center, each item grows a
   * right-placed Tooltip. The collapse control and persistence are the
   * app's job — this component only takes the state.
   */
  collapsed?: boolean;
  /** Accessible name of the `<nav>` landmark. @default 'Main' */
  'aria-label'?: string;
}

/**
 * SidebarNav — the desktop frame's left sidebar (SPECS: 264px expanded /
 * 60px rail, on `--ornie-surface-sunken`, right hairline). Compose the body
 * from SidebarGroup + SidebarItem. See SidebarNav.prompt.md.
 * Screens: D:all views (Frame), 2d/1z tablet rail (COVERAGE_MATRIX).
 */
export const SidebarNav = forwardRef<HTMLElement, SidebarNavProps>(function SidebarNav(
  { header, footer, collapsed = false, 'aria-label': ariaLabel = 'Main', className, children, ...rest },
  ref,
) {
  return (
    <nav
      ref={ref}
      aria-label={ariaLabel}
      className={cx('ornie-sidebarnav', collapsed && 'ornie-sidebarnav--rail', className)}
      {...rest}
    >
      <SidebarNavContext.Provider value={collapsed}>
        {header && <div className="ornie-sidebarnav__header">{header}</div>}
        <div className="ornie-sidebarnav__body">{children}</div>
        {footer && <div className="ornie-sidebarnav__footer">{footer}</div>}
      </SidebarNavContext.Provider>
    </nav>
  );
});

export interface SidebarGroupProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Optional group caption (10.5px caps, `--ornie-text-subtle`). In rail mode
   * it stays available to assistive tech (visually hidden) and a short
   * hairline keeps the group spacing.
   */
  label?: string;
  /** SidebarItems. Rendered inside a real `<ul role="list">`. */
  children?: ReactNode;
}

/**
 * SidebarGroup — one labelled column of SidebarItems inside SidebarNav.
 * Groups are lists: `<ul role="list">` (role restated because `list-style:
 * none` drops list semantics in some engines), labelled by the caption.
 */
export const SidebarGroup = forwardRef<HTMLDivElement, SidebarGroupProps>(function SidebarGroup(
  { label, className, children, ...rest },
  ref,
) {
  const collapsed = useContext(SidebarNavContext);
  const labelId = useId();
  return (
    <div
      ref={ref}
      className={cx('ornie-sidebargroup', collapsed && 'ornie-sidebargroup--rail', className)}
      {...rest}
    >
      {label && (
        <div className="ornie-sidebargroup__label" id={labelId}>
          {label}
        </div>
      )}
      {label && <span className="ornie-sidebargroup__rule" aria-hidden="true" />}
      <ul className="ornie-sidebargroup__items" role="list" aria-labelledby={label ? labelId : undefined}>
        {children}
      </ul>
    </div>
  );
});

export interface SidebarItemProps extends Omit<HTMLAttributes<HTMLLIElement>, 'onSelect'> {
  /** Item label (plain text — it becomes the rail tooltip + aria-label). */
  children?: ReactNode;
  /**
   * 18px leading slot: an `<Icon>`, a `<ProjectDot>`, or a 16px
   * `<ProgressRing>` (the wrapper sets `--ornie-progress-ring-disc` to the
   * sunken sidebar ground so the mini-ring disc blends in). Decorative.
   */
  leading?: ReactNode;
  /**
   * Quiet neutral count Badge in the trailing position (never alarm-colored,
   * D-01). Ignored when `trailing` is set. Hidden in rail mode — the rail
   * tooltip carries "label · count" instead.
   */
  count?: number;
  /** Custom trailing content (e.g. "8/12"). Wins over `count`. */
  trailing?: ReactNode;
  /** Current view. `--ornie-selected` wash + `--ornie-accent-text` ink, `aria-current`. */
  active?: boolean;
  /** Makes the item a `<button>`. */
  onSelect?: () => void;
  /** Makes the item an `<a>`. */
  href?: string;
  /** Shortcut caps shown in the rail tooltip only (decorative), e.g. `['⌘','1']`. */
  kbd?: string[];
}

/**
 * SidebarItem — one nav row: 18px leading + 13.5px label + optional count.
 * Renders `<li>` around a `<button>` (with `onSelect`) or `<a>` (with
 * `href`). In rail mode it centers to a 36px square, hides label/trailing,
 * wraps itself in a right-placed Tooltip and carries the label as
 * `aria-label`.
 */
export const SidebarItem = forwardRef<HTMLElement, SidebarItemProps>(function SidebarItem(
  { children, leading, count, trailing, active, onSelect, href, kbd, className, ...rest },
  ref,
) {
  const collapsed = useContext(SidebarNavContext);

  const body = (
    <>
      {leading && (
        <span className="ornie-sidebaritem__leading" aria-hidden="true">
          {leading}
        </span>
      )}
      {!collapsed && <span className="ornie-sidebaritem__label">{children}</span>}
      {!collapsed && trailing !== undefined && <span className="ornie-sidebaritem__trailing">{trailing}</span>}
      {!collapsed && trailing === undefined && count !== undefined && (
        <span className="ornie-sidebaritem__trailing">
          <Badge size="sm" count={count} className="ornie-sidebaritem__count" />
        </span>
      )}
    </>
  );

  const railLabel = collapsed && typeof children === 'string' ? children : undefined;
  const shared = {
    className: 'ornie-sidebaritem__control',
    'aria-current': active ? ('page' as const) : undefined,
    'aria-label': railLabel,
  };
  const control = href ? (
    <a ref={ref as Ref<HTMLAnchorElement>} href={href} {...shared}>
      {body}
    </a>
  ) : (
    <button ref={ref as Ref<HTMLButtonElement>} type="button" onClick={onSelect && (() => onSelect())} {...shared}>
      {body}
    </button>
  );

  return (
    <li
      className={cx(
        'ornie-sidebaritem',
        collapsed && 'ornie-sidebaritem--rail',
        active && 'ornie-sidebaritem--active',
        className,
      )}
      {...rest}
    >
      {collapsed ? (
        <Tooltip
          placement="right"
          kbd={kbd}
          content={
            <>
              {children}
              {trailing === undefined && count !== undefined && count > 0 ? ` · ${count}` : null}
            </>
          }
        >
          {control}
        </Tooltip>
      ) : (
        control
      )}
    </li>
  );
});
