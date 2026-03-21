/**
 * JSX type definitions for accordion web components
 *
 * This file augments the JSX namespace to add type definitions for custom elements.
 * Works with both React and Preact without requiring React-specific types.
 */

import type {
  AccordionItemAttributes,
  AccordionGroupAttributes,
} from './types';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'accordion-item': AccordionItemAttributes;
      'accordion-group': AccordionGroupAttributes;
    }
  }
  namespace React.JSX {
    interface IntrinsicElements {
      'accordion-item': AccordionItemAttributes;
      'accordion-group': AccordionGroupAttributes;
    }
  }
}

// This export is required to make this file a module
export {};
