/**
 * JSX type definitions for float-bar web component
 *
 * This file augments the JSX namespace to add type definitions for custom elements.
 * Works with both React and Preact without requiring React-specific types.
 */

import type {
  FloatBarAttributes,
} from './types';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'float-bar': FloatBarAttributes;
    }
  }
  namespace React.JSX {
    interface IntrinsicElements {
      'float-bar': FloatBarAttributes;
    }
  }
}

// This export is required to make this file a module
export {};
