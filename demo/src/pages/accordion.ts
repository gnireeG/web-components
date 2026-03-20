export default function Accordion(){
    const el = document.createElement('div');
    el.className = 'max-w-6xl mx-auto px-6 py-12';
    el.innerHTML = /* HTML */`
        <h1 class="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4 transition-colors">Accordion</h1>
        <p class="text-lg text-slate-600 dark:text-slate-400 mb-8 transition-colors">
            A flexible accordion component with smooth animations and keyboard navigation.
        </p>

        <!-- Features -->
        <section class="mb-12">
            <h2 class="text-2xl font-semibold text-slate-800 dark:text-slate-200 mb-4 transition-colors">Features</h2>
            <ul class="list-disc list-inside text-slate-600 dark:text-slate-400 space-y-2 transition-colors bg-white dark:bg-slate-800 rounded-lg p-6">
                <li>Smooth expand/collapse animations</li>
                <li>Full keyboard navigation support (Enter/Space)</li>
                <li>Built-in accessibility (ARIA attributes, screen reader support)</li>
                <li>Custom events (accordion-opened, accordion-closed)</li>
                <li>Optional initially open state</li>
                <li>Customizable trigger and content slots</li>
                <li>Dark mode support</li>
                <li>Zero dependencies</li>
            </ul>
        </section>

        <!-- Demo -->
        <section class="mb-12">
            <h2 class="text-2xl font-semibold text-slate-800 dark:text-slate-200 mb-4 transition-colors">Demo</h2>

            <!-- Standalone Accordions -->
            <h3 class="text-xl font-semibold text-slate-700 dark:text-slate-300 mb-3 transition-colors">Standalone Accordions</h3>
            <p class="text-sm text-slate-600 dark:text-slate-400 mb-4">Without <code class="bg-slate-200 dark:bg-slate-700 px-1 rounded">accordion-group</code>, multiple accordions can be open at the same time:</p>
            <div class="space-y-4 mb-12">
                <accordion-item open>
                    <button slot="trigger" class="accordion-trigger">
                        <span>What is a web component?</span>
                        <svg class="w-5 h-5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                    </button>
                    <div class="accordion-content">
                        Web components are a set of web platform APIs that allow you to create custom, reusable, encapsulated HTML tags to use in web pages and web apps. They work across modern browsers and can be used with any JavaScript framework or library.
                    </div>
                </accordion-item>

                <accordion-item>
                    <button slot="trigger" class="accordion-trigger">
                        <span>How do I use the accordion component?</span>
                        <svg class="w-5 h-5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                    </button>
                    <div class="accordion-content">
                        Simply use the <code class="bg-slate-200 dark:bg-slate-700 px-2 py-1 rounded">accordion-item</code> element with a trigger button using the <code class="bg-slate-200 dark:bg-slate-700 px-2 py-1 rounded">slot="trigger"</code> attribute, and your content below it. Add the <code class="bg-slate-200 dark:bg-slate-700 px-2 py-1 rounded">open</code> attribute to start expanded.
                    </div>
                </accordion-item>

                <accordion-item>
                    <button slot="trigger" class="accordion-trigger">
                        <span>Can I customize the styling?</span>
                        <svg class="w-5 h-5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                    </button>
                    <div class="accordion-content">
                        Yes! The accordion uses slots, so you have full control over the trigger button and content styling. Use any CSS framework or custom styles you prefer.
                    </div>
                </accordion-item>
            </div>

            <!-- Accordion Group 1 -->
            <h3 class="text-xl font-semibold text-slate-700 dark:text-slate-300 mb-3 transition-colors">Accordion Group 1</h3>
            <p class="text-sm text-slate-600 dark:text-slate-400 mb-4">Inside an <code class="bg-slate-200 dark:bg-slate-700 px-1 rounded">accordion-group</code>, only one accordion can be open at a time:</p>
            <accordion-group class="space-y-4 mb-12">
                <accordion-item open>
                    <button slot="trigger" class="accordion-trigger">
                        <span>Frontend Technologies</span>
                        <svg class="w-5 h-5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                    </button>
                    <div class="accordion-content">
                        HTML, CSS, and JavaScript form the core of frontend development. Modern frameworks like React, Vue, and Svelte build on these foundations.
                    </div>
                </accordion-item>

                <accordion-item>
                    <button slot="trigger" class="accordion-trigger">
                        <span>Backend Technologies</span>
                        <svg class="w-5 h-5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                    </button>
                    <div class="accordion-content">
                        Node.js, Python, Java, and Go are popular choices for backend development. They handle server-side logic, databases, and APIs.
                    </div>
                </accordion-item>

                <accordion-item>
                    <button slot="trigger" class="accordion-trigger">
                        <span>Database Systems</span>
                        <svg class="w-5 h-5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                    </button>
                    <div class="accordion-content">
                        SQL databases like PostgreSQL and MySQL, and NoSQL databases like MongoDB and Redis, each serve different use cases.
                    </div>
                </accordion-item>
            </accordion-group>

            <!-- Accordion Group 2 -->
            <h3 class="text-xl font-semibold text-slate-700 dark:text-slate-300 mb-3 transition-colors">Accordion Group 2 (Independent)</h3>
            <p class="text-sm text-slate-600 dark:text-slate-400 mb-4">Each <code class="bg-slate-200 dark:bg-slate-700 px-1 rounded">accordion-group</code> works independently. Opening an item here won't affect Group 1:</p>
            <accordion-group class="space-y-4">
                <accordion-item>
                    <button slot="trigger" class="accordion-trigger">
                        <span>Design Principles</span>
                        <svg class="w-5 h-5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                    </button>
                    <div class="accordion-content">
                        Good design follows principles like consistency, hierarchy, contrast, and alignment. These create intuitive user experiences.
                    </div>
                </accordion-item>

                <accordion-item>
                    <button slot="trigger" class="accordion-trigger">
                        <span>Accessibility</span>
                        <svg class="w-5 h-5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                    </button>
                    <div class="accordion-content">
                        Accessible design ensures everyone can use your application, regardless of ability. This includes keyboard navigation, screen readers, and color contrast.
                    </div>
                </accordion-item>

                <accordion-item>
                    <button slot="trigger" class="accordion-trigger">
                        <span>Performance</span>
                        <svg class="w-5 h-5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                    </button>
                    <div class="accordion-content">
                        Fast applications keep users engaged. Optimize images, minimize JavaScript, lazy load resources, and use efficient rendering techniques.
                    </div>
                </accordion-item>
            </accordion-group>
        </section>

        <!-- Usage -->
        <section class="mb-12">
            <h2 class="text-2xl font-semibold text-slate-800 dark:text-slate-200 mb-4 transition-colors">Usage</h2>

            <h3 class="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-3 transition-colors">Basic Accordion</h3>
            <div class="bg-slate-900 dark:bg-slate-950 rounded-lg p-6 overflow-x-auto mb-6">
                <pre class="text-green-400 text-sm"><code>&lt;accordion-item&gt;
  &lt;button slot="trigger"&gt;Click to expand&lt;/button&gt;
  &lt;div&gt;Your content here&lt;/div&gt;
&lt;/accordion-item&gt;

&lt;!-- Start expanded --&gt;
&lt;accordion-item open&gt;
  &lt;button slot="trigger"&gt;Already open&lt;/button&gt;
  &lt;div&gt;This content is visible by default&lt;/div&gt;
&lt;/accordion-item&gt;</code></pre>
            </div>

            <h3 class="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-3 transition-colors">Accordion Group (Mutual Exclusion)</h3>
            <p class="text-slate-600 dark:text-slate-400 mb-4 transition-colors">
                Wrap multiple <code class="bg-slate-200 dark:bg-slate-700 px-1 rounded">accordion-item</code> elements in an <code class="bg-slate-200 dark:bg-slate-700 px-1 rounded">accordion-group</code> to ensure only one can be open at a time:
            </p>
            <div class="bg-slate-900 dark:bg-slate-950 rounded-lg p-6 overflow-x-auto mb-4">
                <pre class="text-green-400 text-sm"><code>&lt;accordion-group&gt;
  &lt;accordion-item open&gt;
    &lt;button slot="trigger"&gt;First Item&lt;/button&gt;
    &lt;div&gt;Only one item can be open at a time&lt;/div&gt;
  &lt;/accordion-item&gt;

  &lt;accordion-item&gt;
    &lt;button slot="trigger"&gt;Second Item&lt;/button&gt;
    &lt;div&gt;Opening this will close the first&lt;/div&gt;
  &lt;/accordion-item&gt;

  &lt;accordion-item&gt;
    &lt;button slot="trigger"&gt;Third Item&lt;/button&gt;
    &lt;div&gt;Same behavior here&lt;/div&gt;
  &lt;/accordion-item&gt;
&lt;/accordion-group&gt;

&lt;!-- Allow multiple open --&gt;
&lt;accordion-group allow-multiple-open&gt;
  &lt;accordion-item&gt;...&lt;/accordion-item&gt;
  &lt;accordion-item&gt;...&lt;/accordion-item&gt;
&lt;/accordion-group&gt;</code></pre>
            </div>
        </section>

        <!-- Styling Open State -->
        <section class="mb-12">
            <h2 class="text-2xl font-semibold text-slate-800 dark:text-slate-200 mb-4 transition-colors">Styling the Open State</h2>
            <p class="text-slate-600 dark:text-slate-400 mb-4 transition-colors">
                Use the <code class="bg-slate-200 dark:bg-slate-700 px-2 py-1 rounded">open</code> attribute selector to style accordion items differently when expanded.
                This is perfect for rotating icons, changing colors, or any other visual feedback.
            </p>
            <div class="bg-slate-900 dark:bg-slate-950 rounded-lg p-6 overflow-x-auto mb-4">
                <pre class="text-green-400 text-sm"><code>/* Rotate chevron icon when accordion is open */
accordion-item[open] [slot="trigger"] svg {
    transform: rotate(180deg);
}

/* Remove bottom border radius when open (for seamless content) */
accordion-item[open] [slot="trigger"] {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
}

/* Change background color when open */
accordion-item[open] [slot="trigger"] {
    background-color: #f1f5f9;
}

/* Add border accent when open */
accordion-item[open] {
    border-left: 4px solid #3b82f6;
}</code></pre>
            </div>
            <div class="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-400 p-4 rounded mb-4">
                <p class="text-sm text-blue-800 dark:text-blue-200 mb-2">
                    <strong>💡 Tip:</strong> The chevron icons in the demo above use this technique!
                    They rotate 180° when the accordion is expanded using the <code class="bg-blue-100 dark:bg-blue-900 px-1 py-0.5 rounded">accordion-item[open]</code> selector.
                </p>
            </div>
            <div class="bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-400 p-4 rounded">
                <p class="text-sm text-amber-800 dark:text-amber-200 mb-2">
                    <strong>Programmatic Control:</strong>
                </p>
                <p class="text-sm text-amber-800 dark:text-amber-200 mb-3">
                    You can control accordions programmatically in two ways:
                </p>

                <p class="text-sm font-semibold text-amber-800 dark:text-amber-200 mb-2">1. Using public methods:</p>
                <div class="bg-slate-900 dark:bg-slate-950 rounded p-3 overflow-x-auto mb-4">
                    <pre class="text-green-400 text-xs"><code>const accordion = document.querySelector('accordion-item');

// Open the accordion
accordion.show();

// Close the accordion
accordion.close();

// Toggle open/closed state
accordion.toggle();</code></pre>
                </div>

                <p class="text-sm font-semibold text-amber-800 dark:text-amber-200 mb-2">2. Setting/removing the <code class="bg-amber-100 dark:bg-amber-900 px-1 py-0.5 rounded">open</code> attribute:</p>
                <div class="bg-slate-900 dark:bg-slate-950 rounded p-3 overflow-x-auto mb-3">
                    <pre class="text-green-400 text-xs"><code>const accordion = document.querySelector('accordion-item');

// Open the accordion
accordion.setAttribute('open', '');

// Close the accordion
accordion.removeAttribute('open');</code></pre>
                </div>

                <p class="text-xs text-amber-700 dark:text-amber-300">
                    💡 The attribute approach is especially useful in frameworks like Vue or React where you can bind attributes dynamically:
                    <code class="bg-amber-100 dark:bg-amber-900 px-1 py-0.5 rounded text-xs">:open="isExpanded"</code> (Vue) or
                    <code class="bg-amber-100 dark:bg-amber-900 px-1 py-0.5 rounded text-xs">open={isExpanded}</code> (React)
                </p>
            </div>
        </section>

        <!-- Events -->
        <section class="mb-12">
            <h2 class="text-2xl font-semibold text-slate-800 dark:text-slate-200 mb-4 transition-colors">Events</h2>
            <div class="bg-white dark:bg-slate-800 rounded-lg shadow overflow-hidden mb-4">
                <table class="w-full">
                    <thead class="bg-slate-100 dark:bg-slate-700">
                        <tr>
                            <th class="px-6 py-3 text-left text-sm font-semibold text-slate-900 dark:text-slate-100">Event</th>
                            <th class="px-6 py-3 text-left text-sm font-semibold text-slate-900 dark:text-slate-100">Description</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-200 dark:divide-slate-700">
                        <tr>
                            <td class="px-6 py-4 text-sm text-slate-900 dark:text-slate-100 font-mono">accordion-opened</td>
                            <td class="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">Dispatched when the accordion opens. Detail contains <code class="bg-slate-200 dark:bg-slate-700 px-1 rounded">{ open: true }</code></td>
                        </tr>
                        <tr>
                            <td class="px-6 py-4 text-sm text-slate-900 dark:text-slate-100 font-mono">accordion-closed</td>
                            <td class="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">Dispatched when the accordion closes. Detail contains <code class="bg-slate-200 dark:bg-slate-700 px-1 rounded">{ open: false }</code></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="bg-slate-900 dark:bg-slate-950 rounded-lg p-6 overflow-x-auto">
                <pre class="text-green-400 text-sm"><code>const accordion = document.querySelector('accordion-item');

accordion.addEventListener('accordion-opened', (e) => {
  console.log('Accordion opened!', e.detail);
});

accordion.addEventListener('accordion-closed', (e) => {
  console.log('Accordion closed!', e.detail);
});</code></pre>
            </div>
        </section>

        <!-- Attributes -->
        <section class="mb-12">
            <h2 class="text-2xl font-semibold text-slate-800 dark:text-slate-200 mb-4 transition-colors">Attributes</h2>

            <h3 class="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-3 transition-colors">accordion-item</h3>
            <div class="bg-white dark:bg-slate-800 rounded-lg shadow overflow-hidden mb-6">
                <table class="w-full">
                    <thead class="bg-slate-100 dark:bg-slate-700">
                        <tr>
                            <th class="px-6 py-3 text-left text-sm font-semibold text-slate-900 dark:text-slate-100">Attribute</th>
                            <th class="px-6 py-3 text-left text-sm font-semibold text-slate-900 dark:text-slate-100">Type</th>
                            <th class="px-6 py-3 text-left text-sm font-semibold text-slate-900 dark:text-slate-100">Default</th>
                            <th class="px-6 py-3 text-left text-sm font-semibold text-slate-900 dark:text-slate-100">Description</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-200 dark:divide-slate-700">
                        <tr>
                            <td class="px-6 py-4 text-sm text-slate-900 dark:text-slate-100 font-mono">open</td>
                            <td class="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">boolean</td>
                            <td class="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">false</td>
                            <td class="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">Set to start the accordion in an expanded state. Also used as CSS selector for styling.</td>
                        </tr>
                        <tr>
                            <td class="px-6 py-4 text-sm text-slate-900 dark:text-slate-100 font-mono">animation-time</td>
                            <td class="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">string</td>
                            <td class="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">"300"</td>
                            <td class="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">Animation duration in milliseconds. Example: <code class="bg-slate-200 dark:bg-slate-700 px-1 rounded">animation-time="500"</code></td>
                        </tr>
                        <tr>
                            <td class="px-6 py-4 text-sm text-slate-900 dark:text-slate-100 font-mono">animation-easing</td>
                            <td class="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">string</td>
                            <td class="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">"ease"</td>
                            <td class="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">CSS easing function. Examples: <code class="bg-slate-200 dark:bg-slate-700 px-1 rounded">ease-in-out</code>, <code class="bg-slate-200 dark:bg-slate-700 px-1 rounded">cubic-bezier(0.4, 0, 0.2, 1)</code></td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <h3 class="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-3 transition-colors">accordion-group</h3>
            <div class="bg-white dark:bg-slate-800 rounded-lg shadow overflow-hidden">
                <table class="w-full">
                    <thead class="bg-slate-100 dark:bg-slate-700">
                        <tr>
                            <th class="px-6 py-3 text-left text-sm font-semibold text-slate-900 dark:text-slate-100">Attribute</th>
                            <th class="px-6 py-3 text-left text-sm font-semibold text-slate-900 dark:text-slate-100">Type</th>
                            <th class="px-6 py-3 text-left text-sm font-semibold text-slate-900 dark:text-slate-100">Default</th>
                            <th class="px-6 py-3 text-left text-sm font-semibold text-slate-900 dark:text-slate-100">Description</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-200 dark:divide-slate-700">
                        <tr>
                            <td class="px-6 py-4 text-sm text-slate-900 dark:text-slate-100 font-mono">allow-multiple-open</td>
                            <td class="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">boolean</td>
                            <td class="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">false</td>
                            <td class="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">When set, allows multiple accordions in the group to be open simultaneously. By default, opening one closes all others.</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>

        <!-- Accessibility -->
        <section class="mb-12">
            <div class="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-400 p-4 rounded">
                <p class="text-sm text-green-800 dark:text-green-200 mb-2">
                    <strong>♿ Accessibility Built-in:</strong>
                </p>
                <ul class="text-sm text-green-800 dark:text-green-200 space-y-1 ml-4">
                    <li>• Automatic <code class="bg-green-100 dark:bg-green-900 px-1 py-0.5 rounded">aria-expanded</code> attribute on trigger elements</li>
                    <li>• Keyboard support (Enter/Space) for non-button triggers</li>
                    <li>• Automatic <code class="bg-green-100 dark:bg-green-900 px-1 py-0.5 rounded">role="button"</code> for non-button triggers</li>
                    <li>• Screen reader friendly state announcements</li>
                </ul>
            </div>
        </section>
    `
    return el;
}