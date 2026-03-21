/**
 * Custom element interfaces for float-bar components
 */

/**
 * FloatBar custom element interface
 */
export interface FloatBarElement extends HTMLElement {}

/**
 * HTML attributes for float-bar element
 */
export interface FloatBarAttributes {
  /**
   * Offset in pixels from the top
   */
  offset?: string | number;

  /**
   * CSS selector for an element whose height will be used as offset
   */
  'offset-element'?: string;

  /**
   * Disables auto-hide behavior
   */
  disabled?: boolean;

  /**
   * Children and standard HTML attributes
   */
  children?: any;
  slot?: string;
  className?: string;
  class?: string;
  style?: string | Record<string, any>;
  id?: string;
}
