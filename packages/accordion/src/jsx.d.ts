// TypeScript JSX type declarations for accordion components
// Framework-agnostic: Works with React, Preact, Solid, and other JSX frameworks

// Base HTML element attributes that work across all frameworks
interface HTMLElementAttributes {
  // Global HTML attributes
  class?: string;
  className?: string;
  id?: string;
  style?: string | Record<string, any>;
  title?: string;
  lang?: string;
  dir?: 'ltr' | 'rtl' | 'auto';
  hidden?: boolean;
  tabIndex?: number;
  slot?: string;
  part?: string;

  // ARIA
  role?: string;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  'aria-hidden'?: boolean | 'true' | 'false';
  'aria-expanded'?: boolean | 'true' | 'false';
  'aria-controls'?: string;

  // Data attributes
  [key: `data-${string}`]: any;

  // Common events
  onClick?: (event: MouseEvent) => void;
  onDblClick?: (event: MouseEvent) => void;
  onMouseDown?: (event: MouseEvent) => void;
  onMouseUp?: (event: MouseEvent) => void;
  onMouseEnter?: (event: MouseEvent) => void;
  onMouseLeave?: (event: MouseEvent) => void;
  onMouseMove?: (event: MouseEvent) => void;
  onMouseOver?: (event: MouseEvent) => void;
  onMouseOut?: (event: MouseEvent) => void;
  onKeyDown?: (event: KeyboardEvent) => void;
  onKeyUp?: (event: KeyboardEvent) => void;
  onKeyPress?: (event: KeyboardEvent) => void;
  onFocus?: (event: FocusEvent) => void;
  onBlur?: (event: FocusEvent) => void;
  onChange?: (event: Event) => void;
  onInput?: (event: Event) => void;
  onSubmit?: (event: Event) => void;

  // Children
  children?: any;

  // Allow any other HTML attributes
  [key: string]: any;
}

declare namespace JSX {
  interface IntrinsicElements {
    'accordion-item': HTMLElementAttributes & {
      // Custom accordion attributes
      open?: boolean;
      'animation-time'?: string;
      'animation-easing'?: string;

      // Custom event handlers
      onAccordionOpened?: (event: CustomEvent<{ open: boolean }>) => void;
      onAccordionClosed?: (event: CustomEvent<{ open: boolean }>) => void;
    };

    'accordion-group': HTMLElementAttributes & {
      // Custom accordion-group attributes
      'allow-multiple-open'?: boolean;
    };
  }
}
