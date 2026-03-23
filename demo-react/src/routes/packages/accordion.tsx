import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/packages/accordion')({
  component: RouteComponent,
})

function RouteComponent() {
  return(
    <div className="p-4 max-w-5xl mx-auto" suppressHydrationWarning>
      <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4 transition-colors">Accordion</h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 transition-colors">
            A flexible accordion component with smooth animations and keyboard navigation.
        </p>

        <section className="mb-12">
            <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-200 mb-4 transition-colors">Features</h2>
            <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 space-y-2 transition-colors bg-white dark:bg-slate-800 rounded-lg p-6">
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

        <section className="mb-12">
            <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-200 mb-4 transition-colors">Demo</h2>

            <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-300 mb-3 transition-colors">Standalone Accordions</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">Without <code className="bg-slate-200 dark:bg-slate-700 px-1 rounded">accordion-group</code>, multiple accordions can be open at the same time:</p>

            <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 rounded mb-4">
                <p className="text-sm font-semibold text-blue-900 dark:text-blue-200 mb-2">💡 Advanced: Selective Trigger</p>
                <p className="text-sm text-blue-800 dark:text-blue-300 mb-2">
                    Use <code className="bg-blue-100 dark:bg-blue-900 px-1 py-0.5 rounded">accordion-trigger</code> attribute to specify which element triggers the accordion.
                    Other elements in the container won't toggle it.
                </p>
                <p className="text-xs text-blue-700 dark:text-blue-400">
                    Try clicking the "Edit" button below - it won't toggle the accordion!
                </p>
            </div>

            <div className="space-y-4 mb-12">
                <accordion-item open suppressHydrationWarning>
                    <div slot="trigger-container" className="accordion-trigger flex gap-2 items-start">
                        <button accordion-trigger className="flex justify-between items-center flex-1 text-left">
                            <span>What is a web component?</span>
                            <svg className="w-5 h-5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                            </svg>
                        </button>
                        <button
                            onClick={() => alert('Edit clicked! Notice the accordion didn\'t toggle.')}
                            className="px-3 py-2 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded transition-colors">
                            Edit
                        </button>
                    </div>
                    <div className="accordion-content">
                        <p>Web components are a set of web platform APIs that allow you to create custom, reusable, encapsulated HTML tags to use in web pages and web apps. They work across modern browsers and can be used with any JavaScript framework or library.</p>
                        <accordion-group className="mt-6 border border-slate-300 dark:border-slate-600 rounded" suppressHydrationWarning allow-multiple-open={true}>
                            <accordion-item className="small" suppressHydrationWarning>
                                <button slot="trigger-container" className="small-trigger">
                                    <span>Custom Elements</span>
                                    <svg className="w-4 h-4 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                                    </svg>
                                </button>
                                <div className="small-content">Custom Elements allow you to define your own HTML tags with custom behavior. They're registered using <code className="bg-slate-200 dark:bg-slate-700 px-1 rounded text-xs">customElements.define()</code> and extend <code className="bg-slate-200 dark:bg-slate-700 px-1 rounded text-xs">HTMLElement</code>.</div>
                            </accordion-item>
                            <accordion-item className="small" suppressHydrationWarning>
                                <button slot="trigger-container" className="small-trigger">
                                    <span>Shadow DOM</span>
                                    <svg className="w-4 h-4 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                                    </svg>
                                </button>
                                <div className="small-content">Shadow DOM provides encapsulation for your component's internal structure and styling. Styles inside a shadow root don't leak out, and external styles don't leak in (unless explicitly allowed).</div>
                            </accordion-item>
                            <accordion-item className="small" suppressHydrationWarning>
                                <button slot="trigger-container" className="small-trigger">
                                    <span>HTML Templates</span>
                                    <svg className="w-4 h-4 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                                    </svg>
                                </button>
                                <div className="small-content">The <code className="bg-slate-200 dark:bg-slate-700 px-1 rounded text-xs">&lt;template&gt;</code> element lets you declare fragments of markup that can be cloned and inserted into the document at runtime. Content inside templates isn't rendered until activated.</div>
                            </accordion-item>
                            <accordion-item className="small" suppressHydrationWarning>
                                <button slot="trigger-container" className="small-trigger">
                                    <span>Slots</span>
                                    <svg className="w-4 h-4 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                                    </svg>
                                </button>
                                <div className="small-content">Slots allow you to define placeholders in your component's shadow DOM that can be filled with content from the light DOM. Named slots enable multiple insertion points with different content.</div>
                            </accordion-item>
                        </accordion-group>
                    </div>
                </accordion-item>

                <accordion-item suppressHydrationWarning>
                    <button slot="trigger-container" className="accordion-trigger">
                        <span>How do I use the accordion component?</span>
                        <svg className="w-5 h-5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                    </button>
                    <div className="accordion-content">
                        Simply use the <code className="bg-slate-200 dark:bg-slate-700 px-2 py-1 rounded">accordion-item</code> element with a trigger button using the <code className="bg-slate-200 dark:bg-slate-700 px-2 py-1 rounded">slot="trigger-container"</code> attribute, and your content below it. Add the <code className="bg-slate-200 dark:bg-slate-700 px-2 py-1 rounded">open</code> attribute to start expanded.
                    </div>
                </accordion-item>

                <accordion-item suppressHydrationWarning>
                    <button slot="trigger-container" className="accordion-trigger">
                        <span>Can I customize the styling?</span>
                        <svg className="w-5 h-5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                    </button>
                    <div className="accordion-content">
                        Yes! The accordion uses slots, so you have full control over the trigger button and content styling. Use any CSS framework or custom styles you prefer.
                    </div>
                </accordion-item>
            </div>

            <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-300 mb-3 transition-colors">Accordion Group 1</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">Inside an <code className="bg-slate-200 dark:bg-slate-700 px-1 rounded">accordion-group</code>, only one accordion can be open at a time:</p>
            <accordion-group className="space-y-4 mb-12" suppressHydrationWarning>
                <accordion-item open suppressHydrationWarning>
                    <button slot="trigger-container" className="accordion-trigger">
                        <span>Frontend Technologies</span>
                        <svg className="w-5 h-5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                    </button>
                    <div className="accordion-content">
                        HTML, CSS, and JavaScript form the core of frontend development. Modern frameworks like React, Vue, and Svelte build on these foundations.
                    </div>
                </accordion-item>

                <accordion-item suppressHydrationWarning>
                    <button slot="trigger-container" className="accordion-trigger">
                        <span>Backend Technologies</span>
                        <svg className="w-5 h-5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                    </button>
                    <div className="accordion-content">
                        Node.js, Python, Java, and Go are popular choices for backend development. They handle server-side logic, databases, and APIs.
                    </div>
                </accordion-item>

                <accordion-item suppressHydrationWarning>
                    <button slot="trigger-container" className="accordion-trigger">
                        <span>Database Systems</span>
                        <svg className="w-5 h-5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                    </button>
                    <div className="accordion-content">
                        SQL databases like PostgreSQL and MySQL, and NoSQL databases like MongoDB and Redis, each serve different use cases.
                    </div>
                </accordion-item>
            </accordion-group>

            <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-300 mb-3 transition-colors">Accordion Group 2 (Independent)</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">Each <code className="bg-slate-200 dark:bg-slate-700 px-1 rounded">accordion-group</code> works independently. Opening an item here won't affect Group 1:</p>
            <accordion-group className="space-y-4" suppressHydrationWarning>
                <accordion-item suppressHydrationWarning>
                    <button slot="trigger-container" className="accordion-trigger">
                        <span>Design Principles</span>
                        <svg className="w-5 h-5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                    </button>
                    <div className="accordion-content">
                        Good design follows principles like consistency, hierarchy, contrast, and alignment. These create intuitive user experiences.
                    </div>
                </accordion-item>

                <accordion-item>
                    <button slot="trigger-container" className="accordion-trigger">
                        <span>Accessibility</span>
                        <svg className="w-5 h-5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                    </button>
                    <div className="accordion-content">
                        Accessible design ensures everyone can use your application, regardless of ability. This includes keyboard navigation, screen readers, and color contrast.
                    </div>
                </accordion-item>

                <accordion-item>
                    <button slot="trigger-container" className="accordion-trigger">
                        <span>Performance</span>
                        <svg className="w-5 h-5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                    </button>
                    <div className="accordion-content">
                        Fast applications keep users engaged. Optimize images, minimize JavaScript, lazy load resources, and use efficient rendering techniques.
                    </div>
                </accordion-item>
            </accordion-group>
        </section>

        <section className="mb-12">
            <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-200 mb-4 transition-colors">Usage</h2>

            <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-3 transition-colors">Basic Accordion</h3>
            <div className="bg-slate-900 dark:bg-slate-950 rounded-lg p-6 overflow-x-auto mb-6">
                <pre className="text-green-400 text-sm"><code>&lt;accordion-item&gt;
  &lt;button slot="trigger-container"&gt;Click to expand&lt;/button&gt;
  &lt;div&gt;Your content here&lt;/div&gt;
&lt;/accordion-item&gt;

&lt;!-- Start expanded --&gt;
&lt;accordion-item open&gt;
  &lt;button slot="trigger-container"&gt;Already open&lt;/button&gt;
  &lt;div&gt;This content is visible by default&lt;/div&gt;
&lt;/accordion-item&gt;</code></pre>
            </div>

            <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-3 transition-colors">Advanced: Selective Trigger</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-4 transition-colors">
                Use the <code className="bg-slate-200 dark:bg-slate-700 px-1 rounded">accordion-trigger</code> attribute to specify which element inside the trigger container should toggle the accordion. This allows you to place additional interactive elements (buttons, links, checkboxes) alongside the trigger without toggling the accordion:
            </p>
            <div className="bg-slate-900 dark:bg-slate-950 rounded-lg p-6 overflow-x-auto mb-4">
                <pre className="text-green-400 text-sm"><code>&lt;accordion-item&gt;
  &lt;div slot="trigger-container" className="flex gap-2"&gt;
    &lt;!-- Only this button toggles the accordion --&gt;
    &lt;button accordion-trigger className="flex-1"&gt;
      Expand details
    &lt;/button&gt;

    &lt;!-- This button won't toggle the accordion --&gt;
    &lt;button onclick="editItem()"&gt;Edit&lt;/button&gt;
    &lt;button onclick="deleteItem()"&gt;Delete&lt;/button&gt;
  &lt;/div&gt;

  &lt;div&gt;Your content here&lt;/div&gt;
&lt;/accordion-item&gt;</code></pre>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-400 p-4 rounded mb-6">
                <p className="text-sm text-blue-800 dark:text-blue-200">
                    <strong>💡 Fallback Behavior:</strong> If no element with the <code className="bg-blue-100 dark:bg-blue-900 px-1 py-0.5 rounded">accordion-trigger</code> attribute is found, the entire trigger container will toggle the accordion (backward compatible behavior).
                </p>
            </div>

            <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-3 transition-colors">Accordion Group (Mutual Exclusion)</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-4 transition-colors">
                Wrap multiple <code className="bg-slate-200 dark:bg-slate-700 px-1 rounded">accordion-item</code> elements in an <code className="bg-slate-200 dark:bg-slate-700 px-1 rounded">accordion-group</code> to ensure only one can be open at a time:
            </p>
            <div className="bg-slate-900 dark:bg-slate-950 rounded-lg p-6 overflow-x-auto mb-4">
                <pre className="text-green-400 text-sm"><code>&lt;accordion-group&gt;
  &lt;accordion-item open&gt;
    &lt;button slot="trigger-container"&gt;First Item&lt;/button&gt;
    &lt;div&gt;Only one item can be open at a time&lt;/div&gt;
  &lt;/accordion-item&gt;

  &lt;accordion-item&gt;
    &lt;button slot="trigger-container"&gt;Second Item&lt;/button&gt;
    &lt;div&gt;Opening this will close the first&lt;/div&gt;
  &lt;/accordion-item&gt;

  &lt;accordion-item&gt;
    &lt;button slot="trigger-container"&gt;Third Item&lt;/button&gt;
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

        <section className="mb-12">
            <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-200 mb-4 transition-colors">Styling the Open State</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-4 transition-colors">
                Use the <code className="bg-slate-200 dark:bg-slate-700 px-2 py-1 rounded">open</code> attribute selector to style accordion items differently when expanded.
                This is perfect for rotating icons, changing colors, or any other visual feedback.
            </p>
            <div className="bg-slate-900 dark:bg-slate-950 rounded-lg p-6 overflow-x-auto mb-4">
                <pre className="text-green-400 text-sm"><code>/* Rotate chevron icon when accordion is open */
accordion-item[open] [slot="trigger-container"] svg &lbrace;
    transform: rotate(180deg);
&rbrace;

/* Remove bottom border radius when open (for seamless content) */
accordion-item[open] [slot="trigger-container"] &lbrace;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
&rbrace;

/* Change background color when open */
accordion-item[open] [slot="trigger-container"] &lbrace;
    background-color: #f1f5f9;
&rbrace;

/* Add border accent when open */
accordion-item[open] &lbrace;
    border-left: 4px solid #3b82f6;
&rbrace;</code></pre>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-400 p-4 rounded mb-4">
                <p className="text-sm text-blue-800 dark:text-blue-200 mb-2">
                    <strong>💡 Tip:</strong> The chevron icons in the demo above use this technique!
                    They rotate 180° when the accordion is expanded using the <code className="bg-blue-100 dark:bg-blue-900 px-1 py-0.5 rounded">accordion-item[open]</code> selector.
                </p>
            </div>
            <div className="bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-400 p-4 rounded">
                <p className="text-sm text-amber-800 dark:text-amber-200 mb-2">
                    <strong>Programmatic Control:</strong>
                </p>
                <p className="text-sm text-amber-800 dark:text-amber-200 mb-3">
                    You can control accordions programmatically in two ways:
                </p>

                <p className="text-sm font-semibold text-amber-800 dark:text-amber-200 mb-2">1. Using public methods:</p>
                <div className="bg-slate-900 dark:bg-slate-950 rounded p-3 overflow-x-auto mb-4">
                    <pre className="text-green-400 text-xs"><code>const accordion = document.querySelector('accordion-item');

// Open the accordion
accordion.show();

// Close the accordion
accordion.close();

// Toggle open/closed state
accordion.toggle();</code></pre>
                </div>

                <p className="text-sm font-semibold text-amber-800 dark:text-amber-200 mb-2">2. Setting/removing the <code className="bg-amber-100 dark:bg-amber-900 px-1 py-0.5 rounded">open</code> attribute:</p>
                <div className="bg-slate-900 dark:bg-slate-950 rounded p-3 overflow-x-auto mb-3">
                    <pre className="text-green-400 text-xs"><code>const accordion = document.querySelector('accordion-item');

// Open the accordion
accordion.setAttribute('open', '');

// Close the accordion
accordion.removeAttribute('open');</code></pre>
                </div>

                <p className="text-xs text-amber-700 dark:text-amber-300">
                    💡 The attribute approach is especially useful in frameworks like Vue or React where you can bind attributes dynamically:
                    <code className="bg-amber-100 dark:bg-amber-900 px-1 py-0.5 rounded text-xs">:open="isExpanded"</code> (Vue) or
                    <code className="bg-amber-100 dark:bg-amber-900 px-1 py-0.5 rounded text-xs">open=&lbrace;isExpanded&rbrace;</code> (React)
                </p>
            </div>
        </section>

        <section className="mb-12">
            <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-200 mb-4 transition-colors">Events</h2>
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow overflow-hidden mb-4">
                <table className="w-full">
                    <thead className="bg-slate-100 dark:bg-slate-700">
                        <tr>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900 dark:text-slate-100">Event</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900 dark:text-slate-100">Description</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                        <tr>
                            <td className="px-6 py-4 text-sm text-slate-900 dark:text-slate-100 font-mono">accordion-opened</td>
                            <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">Dispatched when the accordion opens. Detail contains <code className="bg-slate-200 dark:bg-slate-700 px-1 rounded">&lbrace; open: true &rbrace;</code></td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4 text-sm text-slate-900 dark:text-slate-100 font-mono">accordion-closed</td>
                            <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">Dispatched when the accordion closes. Detail contains <code className="bg-slate-200 dark:bg-slate-700 px-1 rounded">&lbrace; open: false &rbrace;</code></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="bg-slate-900 dark:bg-slate-950 rounded-lg p-6 overflow-x-auto">
                <pre className="text-green-400 text-sm"><code>{`const accordion = document.querySelector('accordion-item');

accordion.addEventListener('accordion-opened', (e) => {
  console.log('Accordion opened!', e.detail);
});

accordion.addEventListener('accordion-closed', (e) => {
  console.log('Accordion closed!', e.detail);
});`}</code></pre>
            </div>
        </section>

        <section className="mb-12">
            <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-200 mb-4 transition-colors">Attributes</h2>

            <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-3 transition-colors">accordion-item</h3>
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow overflow-hidden mb-6">
                <table className="w-full">
                    <thead className="bg-slate-100 dark:bg-slate-700">
                        <tr>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900 dark:text-slate-100">Attribute</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900 dark:text-slate-100">Type</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900 dark:text-slate-100">Default</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900 dark:text-slate-100">Description</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                        <tr>
                            <td className="px-6 py-4 text-sm text-slate-900 dark:text-slate-100 font-mono">open</td>
                            <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">boolean</td>
                            <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">false</td>
                            <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">Set to start the accordion in an expanded state. Also used as CSS selector for styling.</td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4 text-sm text-slate-900 dark:text-slate-100 font-mono">animation-time</td>
                            <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">string</td>
                            <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">"300"</td>
                            <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">Animation duration in milliseconds. Example: <code className="bg-slate-200 dark:bg-slate-700 px-1 rounded">animation-time="500"</code></td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4 text-sm text-slate-900 dark:text-slate-100 font-mono">animation-easing</td>
                            <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">string</td>
                            <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">"ease"</td>
                            <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">CSS easing function. Examples: <code className="bg-slate-200 dark:bg-slate-700 px-1 rounded">ease-in-out</code>, <code className="bg-slate-200 dark:bg-slate-700 px-1 rounded">cubic-bezier(0.4, 0, 0.2, 1)</code></td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-3 transition-colors">accordion-group</h3>
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow overflow-hidden">
                <table className="w-full">
                    <thead className="bg-slate-100 dark:bg-slate-700">
                        <tr>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900 dark:text-slate-100">Attribute</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900 dark:text-slate-100">Type</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900 dark:text-slate-100">Default</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900 dark:text-slate-100">Description</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                        <tr>
                            <td className="px-6 py-4 text-sm text-slate-900 dark:text-slate-100 font-mono">allow-multiple-open</td>
                            <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">boolean</td>
                            <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">false</td>
                            <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">When set, allows multiple accordions in the group to be open simultaneously. By default, opening one closes all others.</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>

        <section className="mb-12">
            <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-400 p-4 rounded">
                <p className="text-sm text-green-800 dark:text-green-200 mb-2">
                    <strong>♿ Accessibility Built-in:</strong>
                </p>
                <ul className="text-sm text-green-800 dark:text-green-200 space-y-1 ml-4">
                    <li>• Automatic <code className="bg-green-100 dark:bg-green-900 px-1 py-0.5 rounded">aria-expanded</code> attribute on trigger elements</li>
                    <li>• Keyboard support (Enter/Space) for non-button triggers</li>
                    <li>• Automatic <code className="bg-green-100 dark:bg-green-900 px-1 py-0.5 rounded">role="button"</code> for non-button triggers</li>
                    <li>• Screen reader friendly state announcements</li>
                </ul>
            </div>
        </section>
    </div>
  )
}