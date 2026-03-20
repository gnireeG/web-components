// Global TypeScript JSX type declarations
// This file is automatically loaded by TypeScript

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'accordion-item': {
        // Custom accordion attributes
        open?: boolean;
        'animation-time'?: string;
        'animation-easing'?: string;

        // Custom event handlers
        onAccordionOpened?: (event: CustomEvent<{ open: boolean }>) => void;
        onAccordionClosed?: (event: CustomEvent<{ open: boolean }>) => void;

        // Standard HTML attributes
        class?: string;
        className?: string;
        id?: string;
        style?: string | Record<string, any>;
        children?: any;
        [key: string]: any;
      };

      'accordion-group': {
        // Custom accordion-group attributes
        'allow-multiple-open'?: boolean;

        // Standard HTML attributes
        class?: string;
        className?: string;
        id?: string;
        style?: string | Record<string, any>;
        children?: any;
        [key: string]: any;
      };
    }
  }
}

export {};
