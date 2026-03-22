/**
 * Custom element interfaces for fly-out components
 */

/**
 * FlyOut custom element interface
 */
export interface FlyOutElement extends HTMLElement {
  /**
   * Opens the fly-out panel
   * @fires fly-out-opened
   */
  open(): void;

  /**
   * Closes the fly-out panel
   * @fires fly-out-closed
   */
  close(): void;

  /**
   * Toggles the fly-out between open and closed states
   */
  toggle(): void;
}

/**
 * FlyOutToggle custom element interface
 */
export interface FlyOutToggleElement extends HTMLElement {}

/**
 * Event detail for fly-out opened/closed events
 */
export interface FlyOutEventDetail {
  name: string;
}

/**
 * Event detail for fly-out state change events
 */
export interface FlyOutStateChangeDetail {
  name: string;
  open: boolean;
}

/**
 * HTML attributes for fly-out element
 */
export interface FlyOutAttributes {
  /**
   * Required. Unique identifier for this fly-out
   */
  name: string;

  /**
   * Edge from which the fly-out slides in (default: "bottom")
   */
  position?: 'bottom' | 'top' | 'left' | 'right';

  /**
   * Prevents body scroll locking when fly-out is open
   */
  'disable-scroll-lock'?: boolean;

  /**
   * Prevents closing when clicking outside the fly-out
   */
  'disable-click-outside'?: boolean;

  /**
   * Disables the background overlay when fly-out is open
   */
  'disable-background'?: boolean;

  /**
   * Children and standard HTML attributes
   */
  children?: any;
  slot?: string;
  className?: string;
  class?: string;
  style?: string | Record<string, any>;
  id?: string;

  /**
   * Event handler for when the fly-out opens
   * React: Use onFlyOutOpened
   * Vanilla JS: addEventListener('fly-out-opened', ...)
   */
  onFlyOutOpened?: (event: CustomEvent<FlyOutEventDetail>) => void;

  /**
   * Event handler for when the fly-out closes
   * React: Use onFlyOutClosed
   * Vanilla JS: addEventListener('fly-out-closed', ...)
   */
  onFlyOutClosed?: (event: CustomEvent<FlyOutEventDetail>) => void;

  /**
   * Event handler for when the fly-out state changes
   * React: Use onFlyOutStateChanged
   * Vanilla JS: addEventListener('fly-out-state-changed', ...)
   */
  onFlyOutStateChanged?: (event: CustomEvent<FlyOutStateChangeDetail>) => void;

  /**
   * Allow any other attributes (e.g., ref, key, data-*, aria-*, etc.)
   */
  [key: string]: any;
}

/**
 * HTML attributes for fly-out-toggle element
 */
export interface FlyOutToggleAttributes {
  /**
   * Required. Must match the name of the fly-out to control
   */
  name: string;

  /**
   * Children and standard HTML attributes
   */
  children?: any;
  slot?: string;
  className?: string;
  class?: string;
  style?: string | Record<string, any>;
  id?: string;

  /**
   * Allow any other attributes (e.g., ref, key, data-*, aria-*, etc.)
   */
  [key: string]: any;
}
