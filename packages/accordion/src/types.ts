/**
 * Custom element interfaces for accordion components
 */

/**
 * AccordionItem custom element interface
 */
export interface AccordionItemElement extends HTMLElement {
  /**
   * Opens the accordion
   * @fires accordion-opened
   */
  show(): void;

  /**
   * Closes the accordion
   * @fires accordion-closed
   */
  close(): void;

  /**
   * Toggles the accordion between open and closed states
   */
  toggle(): void;

  /**
   * Current open state of the accordion
   */
  open: boolean;
}

/**
 * AccordionGroup custom element interface
 */
export interface AccordionGroupElement extends HTMLElement {}

/**
 * Event detail for accordion state change events
 */
export interface AccordionEventDetail {
  open: boolean;
}

/**
 * HTML attributes for accordion-item element
 */
export interface AccordionItemAttributes {
  /**
   * When present, the accordion starts in an expanded state
   */
  open?: boolean;

  /**
   * Animation duration in milliseconds (default: "300")
   */
  'animation-time'?: string | number;

  /**
   * CSS easing function (default: "ease")
   */
  'animation-easing'?: string;

  /**
   * Applied to child elements inside trigger-container slot to designate which element toggles the accordion
   */
  'accordion-trigger'?: boolean;

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
   * Event handler for accordion-opened event
   * Fired when the accordion opens
   */
  onAccordionOpened?: (event: CustomEvent<AccordionEventDetail>) => void;

  /**
   * Event handler for accordion-closed event
   * Fired when the accordion closes
   */
  onAccordionClosed?: (event: CustomEvent<AccordionEventDetail>) => void;

  /**
   * Legacy event handler naming (lowercase)
   */
  'onaccordion-opened'?: (event: CustomEvent<AccordionEventDetail>) => void;
  'onaccordion-closed'?: (event: CustomEvent<AccordionEventDetail>) => void;
}

/**
 * HTML attributes for accordion-group element
 */
export interface AccordionGroupAttributes {
  /**
   * When present, allows multiple accordions to be open simultaneously.
   * By default, opening one accordion closes all others in the group.
   */
  'allow-multiple-open'?: boolean;

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
