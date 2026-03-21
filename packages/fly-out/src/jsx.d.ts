/**
 * JSX type definitions for fly-out web components
 *
 * This file augments the JSX namespace to add type definitions for custom elements.
 * Works with both React and Preact without requiring React-specific types.
 */

import type {
  FlyOutAttributes,
  FlyOutToggleAttributes,
} from './types';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'fly-out': FlyOutAttributes;
      'fly-out-toggle': FlyOutToggleAttributes;
    }
  }
  namespace React.JSX {
    interface IntrinsicElements {
      'fly-out': FlyOutAttributes;
      'fly-out-toggle': FlyOutToggleAttributes;
    }
  }
}

// This export is required to make this file a module
export {};
