export default function Home(){
    const el = document.createElement('div');
    el.className = 'max-w-6xl mx-auto px-6 py-12';
    el.innerHTML = /*HTML*/`
        <h1 class="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-8 transition-colors">Web Components Library</h1>

        <p class="text-lg text-slate-600 dark:text-slate-400 mb-8 transition-colors">
            A collection of lightweight, dependency-free web components built with vanilla TypeScript.
        </p>

        <div class="grid md:grid-cols-2 gap-6 mb-12">
            <div class="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6 transition-colors">
                <h2 class="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-3 transition-colors">
                    🧭 Router
                </h2>
                <p class="text-slate-600 dark:text-slate-400 mb-4 transition-colors">
                    Client-side routing with support for navigation links and active states.
                </p>
                <router-link to="router" class="text-blue-600 dark:text-blue-400 hover:underline">View Documentation →</router-link>
            </div>

            <div class="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6 transition-colors">
                <h2 class="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-3 transition-colors">
                    📱 Fly-Out
                </h2>
                <p class="text-slate-600 dark:text-slate-400 mb-4 transition-colors">
                    Slide-in panels from any direction with focus trapping and accessibility features.
                </p>
                <router-link to="flyout" class="text-blue-600 dark:text-blue-400 hover:underline">View Documentation →</router-link>
            </div>

            <div class="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6 transition-colors">
                <h2 class="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-3 transition-colors">
                    📜 Scroll Navbar
                </h2>
                <p class="text-slate-600 dark:text-slate-400 mb-4 transition-colors">
                    Auto-hiding navigation bar that responds to scroll direction.
                </p>
                <router-link to="floatbar" class="text-blue-600 dark:text-blue-400 hover:underline">View Documentation →</router-link>
            </div>

            <div class="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6 transition-colors">
                <h2 class="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-3 transition-colors">
                    🌓 Theme Toggle
                </h2>
                <p class="text-slate-600 dark:text-slate-400 mb-4 transition-colors">
                    Animated theme switcher with system preference detection and localStorage persistence.
                </p>
                <router-link to="themetoggle" class="text-blue-600 dark:text-blue-400 hover:underline">View Documentation →</router-link>
            </div>
        </div>

        <div class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 mb-12 transition-colors">
            <h3 class="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-3 transition-colors">Features</h3>
            <ul class="list-disc list-inside text-slate-600 dark:text-slate-400 space-y-2 transition-colors">
                <li>🚀 Zero dependencies - built with vanilla TypeScript</li>
                <li>♿ Accessibility-first design with ARIA attributes and keyboard support</li>
                <li>🎨 Fully customizable with CSS and Tailwind support</li>
                <li>📦 Tree-shakeable and lightweight</li>
                <li>🌐 Works with any framework or vanilla JS</li>
                <li>📝 Comprehensive JSDoc documentation</li>
            </ul>
        </div>

        <div class="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 rounded-lg p-6 transition-colors">
            <h3 class="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-4 transition-colors">
                💡 Publishing Web Components - Common Patterns
            </h3>
            <p class="text-slate-600 dark:text-slate-400 mb-4 transition-colors">
                Patterns and gotchas when building components for React and SSR compatibility:
            </p>

            <div class="space-y-4">
                <div class="bg-white dark:bg-slate-800 rounded-lg p-4 transition-colors">
                    <h4 class="font-semibold text-slate-900 dark:text-slate-100 mb-2 transition-colors">
                        ⚠️ React: Avoid setAttribute() in Constructor
                    </h4>
                    <p class="text-sm text-slate-600 dark:text-slate-400 mb-2 transition-colors">
                        React sets attributes <strong>after</strong> the constructor runs.
                        Calling <code class="bg-slate-100 dark:bg-slate-700 px-1 rounded">setAttribute()</code> in the constructor will be overwritten.
                    </p>
                    <pre class="bg-slate-900 text-green-400 text-xs p-3 rounded overflow-x-auto"><code>// ❌ Bad - React will overwrite this
constructor() {
  super();
  this.setAttribute("role", "dialog");
}

// ✅ Good - Set in connectedCallback
connectedCallback() {
  this.setAttribute("role", "dialog");
}</code></pre>
                </div>

                <div class="bg-white dark:bg-slate-800 rounded-lg p-4 transition-colors">
                    <h4 class="font-semibold text-slate-900 dark:text-slate-100 mb-2 transition-colors">
                        ⚠️ setAttribute() in constructor clears React attributes
                    </h4>
                    <p class="text-sm text-slate-600 dark:text-slate-400 mb-2 transition-colors">
                        If you call <code class="bg-slate-100 dark:bg-slate-700 px-1 rounded">setAttribute()</code> in the constructor,
                        all attributes set in React JSX will disappear. Reading with <code class="bg-slate-100 dark:bg-slate-700 px-1 rounded">getAttribute()</code> is fine.
                    </p>
                    <pre class="bg-slate-900 text-green-400 text-xs p-3 rounded overflow-x-auto"><code>constructor() {
  super();
  // ✅ This is fine
  this.name = this.getAttribute("name");

  // ❌ This will clear all React-set attributes
  this.setAttribute("role", "dialog");
}

// ✅ Move setAttribute to connectedCallback
connectedCallback() {
  this.setAttribute("role", "dialog");
}</code></pre>
                </div>

                <div class="bg-white dark:bg-slate-800 rounded-lg p-4 transition-colors">
                    <h4 class="font-semibold text-slate-900 dark:text-slate-100 mb-2 transition-colors">
                        📘 TypeScript/JSX Type Definitions
                    </h4>
                    <p class="text-sm text-slate-600 dark:text-slate-400 mb-2 transition-colors">
                        For TypeScript autocomplete in React/JSX, create these type files:
                    </p>
                    <pre class="bg-slate-900 text-green-400 text-xs p-3 rounded overflow-x-auto"><code>// src/types.ts
export interface MyElementAttributes {
  name: string;
  position?: 'top' | 'bottom';
  children?: any;
}

// src/jsx.d.ts
import type { MyElementAttributes } from './types';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'my-element': MyElementAttributes;
    }
  }
  namespace React.JSX {
    interface IntrinsicElements {
      'my-element': MyElementAttributes;
    }
  }
}

// src/types-entry.d.ts
/// &lt;reference path="./jsx.d.ts" /&gt;
export * from './types';</code></pre>
                </div>

                <div class="bg-white dark:bg-slate-800 rounded-lg p-4 transition-colors">
                    <h4 class="font-semibold text-slate-900 dark:text-slate-100 mb-2 transition-colors">
                        📦 Package.json Type Configuration
                    </h4>
                    <p class="text-sm text-slate-600 dark:text-slate-400 mb-2 transition-colors">
                        Point to types-entry.d.ts and copy type files during build:
                    </p>
                    <pre class="bg-slate-900 text-green-400 text-xs p-3 rounded overflow-x-auto"><code>{
  "types": "./dist/types-entry.d.ts",
  "exports": {
    ".": {
      "types": "./dist/types-entry.d.ts",
      "default": "./dist/index.js"
    }
  },
  "scripts": {
    "build": "tsc && node -e \\"const fs = require('fs'); fs.copyFileSync('src/jsx.d.ts', 'dist/jsx.d.ts'); fs.copyFileSync('src/types-entry.d.ts', 'dist/types-entry.d.ts');\\""
  }
}</code></pre>
                </div>

                <div class="bg-white dark:bg-slate-800 rounded-lg p-4 transition-colors">
                    <h4 class="font-semibold text-slate-900 dark:text-slate-100 mb-2 transition-colors">
                        🌐 SSR Safety (Next.js, Astro, etc.)
                    </h4>
                    <p class="text-sm text-slate-600 dark:text-slate-400 mb-2 transition-colors">
                        Wrap component definitions in a browser check to prevent server-side crashes:
                    </p>
                    <pre class="bg-slate-900 text-green-400 text-xs p-3 rounded overflow-x-auto"><code>// Export types first (always available)
export type { MyElementAttributes } from './types';

// SSR-safe: Only define in browser
if (typeof window !== 'undefined' && typeof HTMLElement !== 'undefined') {
  class MyElement extends HTMLElement {
    // Your implementation
  }

  customElements.define('my-element', MyElement);
}</code></pre>
                </div>

                <div class="bg-white dark:bg-slate-800 rounded-lg p-4 transition-colors">
                    <h4 class="font-semibold text-slate-900 dark:text-slate-100 mb-2 transition-colors">
                        🚫 Don't Export the Class
                    </h4>
                    <p class="text-sm text-slate-600 dark:text-slate-400 mb-2 transition-colors">
                        Remove <code class="bg-slate-100 dark:bg-slate-700 px-1 rounded">export</code> from class declaration when using SSR check, or you'll get runtime errors:
                    </p>
                    <pre class="bg-slate-900 text-green-400 text-xs p-3 rounded overflow-x-auto"><code>// ❌ Bad - causes "Modifiers cannot appear here" error
if (typeof window !== 'undefined') {
  export class MyElement extends HTMLElement {}
}

// ✅ Good - no export keyword
if (typeof window !== 'undefined') {
  class MyElement extends HTMLElement {}
  customElements.define('my-element', MyElement);
}</code></pre>
                </div>

                <div class="bg-white dark:bg-slate-800 rounded-lg p-4 transition-colors">
                    <h4 class="font-semibold text-slate-900 dark:text-slate-100 mb-2 transition-colors">
                        📤 Export Types from index.ts
                    </h4>
                    <p class="text-sm text-slate-600 dark:text-slate-400 mb-2 transition-colors">
                        Always export types from your main entry point for consumer access:
                    </p>
                    <pre class="bg-slate-900 text-green-400 text-xs p-3 rounded overflow-x-auto"><code>// src/index.ts
export type {
  MyElementElement,
  MyElementAttributes,
} from './types';

// Now consumers can import types:
// import type { MyElementAttributes } from '@my-scope/my-element';</code></pre>
                </div>
            </div>

            <div class="mt-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                <p class="text-sm text-green-800 dark:text-green-200 transition-colors">
                    💡 All components in this library follow these patterns. Check the source code for reference.
                </p>
            </div>
        </div>
    `;

    return el;
}
