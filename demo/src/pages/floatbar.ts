export default function FloatBar(){
    const el = document.createElement('div');
    el.className = 'max-w-6xl mx-auto px-6 py-12';
    el.innerHTML = /*HTML*/`
        <h1 class="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4 transition-colors">Float Bar</h1>
        <p class="text-lg text-slate-600 dark:text-slate-400 mb-8 transition-colors">
            A floating bar component with scroll spy, automatic positioning, and sticky behavior.
        </p>

        <!-- Features -->
        <section class="mb-12">
            <h2 class="text-2xl font-semibold text-slate-800 dark:text-slate-200 mb-4 transition-colors">Features</h2>
            <ul class="list-disc list-inside text-slate-600 dark:text-slate-400 space-y-2 transition-colors bg-white dark:bg-slate-800 rounded-lg p-6">
                <li>Smooth animations using requestAnimationFrame</li>
                <li>Works with both window scroll and container scroll</li>
                <li>Configurable offset to account for sticky elements</li>
                <li>Lightweight and dependency-free</li>
                <li>Zero configuration required</li>
            </ul>
        </section>

        <!-- Usage -->
        <section class="mb-12">
            <h2 class="text-2xl font-semibold text-slate-800 dark:text-slate-200 mb-4 transition-colors">Usage</h2>
            <div class="bg-slate-900 dark:bg-slate-950 rounded-lg p-6 overflow-x-auto">
                <pre class="text-green-400 text-sm"><code>&lt;!-- Window scroll example --&gt;
&lt;float-bar class="bg-slate-800 text-white px-6 py-4"&gt;
    &lt;nav&gt;Your navigation content&lt;/nav&gt;
&lt;/float-bar&gt;

&lt;!-- With offset (e.g., for sticky header) --&gt;
&lt;float-bar offset="60" class="..."&gt;
    &lt;nav&gt;Your navigation content&lt;/nav&gt;
&lt;/float-bar&gt;

&lt;!-- Container scroll example --&gt;
&lt;div class="h-64 overflow-y-auto"&gt;
    &lt;float-bar class="..."&gt;
        &lt;nav&gt;Container bar&lt;/nav&gt;
    &lt;/float-bar&gt;
    &lt;!-- scrollable content --&gt;
&lt;/div&gt;</code></pre>
            </div>
        </section>

        <!-- Demo -->
        <section class="mb-12">
            <h2 class="text-2xl font-semibold text-slate-800 dark:text-slate-200 mb-4 transition-colors">Demo</h2>
            <p class="text-slate-600 dark:text-slate-400 mb-6 transition-colors">
                The bar at the top of this page uses float-bar. Try scrolling down to see it hide, then scroll up to reveal it again.
            </p>

            <h3 class="text-xl font-semibold text-slate-700 dark:text-slate-300 mb-3 transition-colors">Container Scroll Example</h3>
            <div class="bg-white dark:bg-slate-800 rounded-lg shadow-lg overflow-hidden transition-colors">
                <div class="relative h-64 overflow-y-auto border border-slate-200 dark:border-slate-700">
                    <div class="p-4 bg-blue-50 dark:bg-blue-900/20 h-32 transition-colors">
                        <p class="text-slate-600 dark:text-slate-400 transition-colors">Scroll down in this container to see the bar hide...</p>
                    </div>
                    <float-bar class="bg-purple-800 text-white is-sticky:bg-white is-sticky:text-gray-800 transition-colors px-4 py-3 shadow-md">
                        <div class="font-semibold">Container Navbar</div>
                    </float-bar>
                    <div class="p-4 space-y-4" id="scroll-content"></div>
                </div>
            </div>
        </section>

        <!-- Attributes -->
        <section class="mb-12">
            <h2 class="text-2xl font-semibold text-slate-800 dark:text-slate-200 mb-4 transition-colors">Attributes</h2>
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
                            <td class="px-6 py-4 text-sm text-slate-900 dark:text-slate-100 font-mono">offset</td>
                            <td class="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">number</td>
                            <td class="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">0</td>
                            <td class="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">Offset in pixels to account for sticky elements above the bar</td>
                        </tr>
                        <tr>
                            <td class="px-6 py-4 text-sm text-slate-900 dark:text-slate-100 font-mono">offset-element</td>
                            <td class="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">string</td>
                            <td class="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">-</td>
                            <td class="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">CSS selector for an element whose height will be used as offset</td>
                        </tr>
                        <tr>
                            <td class="px-6 py-4 text-sm text-slate-900 dark:text-slate-100 font-mono">disabled</td>
                            <td class="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">boolean</td>
                            <td class="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">false</td>
                            <td class="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">Disables auto-hide behavior</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>

        <!-- Styling -->
        <section class="mb-12">
            <h2 class="text-2xl font-semibold text-slate-800 dark:text-slate-200 mb-4 transition-colors">Styling</h2>
            <div class="bg-white dark:bg-slate-800 rounded-lg p-6 transition-colors space-y-4">
                <h3 class="text-lg font-semibold text-slate-700 dark:text-slate-300 transition-colors">Sticky State Class</h3>
                <p class="text-slate-600 dark:text-slate-400 transition-colors">
                    The float bar automatically adds an <code class="bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded text-sm">is-sticky</code> class when it reaches the sticky position (top of viewport or container). Use this to add visual effects:
                </p>
                <div class="bg-slate-900 dark:bg-slate-950 rounded-lg p-6 overflow-x-auto">
                    <pre class="text-green-400 text-sm"><code>/* Style the bar when it's sticky */
float-bar.is-sticky {
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
}</code></pre>
                </div>

                <div class="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 rounded">
                    <h4 class="text-md font-semibold text-blue-900 dark:text-blue-100 mb-2 transition-colors">💡 Pro Tip: Tailwind v4 Custom Variant</h4>
                    <p class="text-sm text-blue-800 dark:text-blue-200 mb-3 transition-colors">
                        Create a custom variant to style the sticky state directly in your utility classes:
                    </p>
                    <div class="bg-slate-900 dark:bg-slate-950 rounded p-4 mb-3">
                        <pre class="text-green-400 text-xs"><code>/* styles.css */
@custom-variant is-sticky (&:where(.is-sticky, .is-sticky *));</code></pre>
                    </div>
                    <p class="text-sm text-blue-800 dark:text-blue-200 mb-2 transition-colors">
                        Now you can use it inline:
                    </p>
                    <div class="bg-slate-900 dark:bg-slate-950 rounded p-4">
                        <pre class="text-green-400 text-xs"><code>&lt;float-bar class="
  bg-transparent
  transition-all
  is-sticky:bg-white/95
  is-sticky:shadow-xl
"&gt;
  &lt;nav class="text-slate-600 is-sticky:text-slate-900"&gt;
    Your navigation
  &lt;/nav&gt;
&lt;/float-bar&gt;</code></pre>
                    </div>
                    <p class="text-xs text-blue-700 dark:text-blue-300 mt-3 transition-colors">
                        The variant works on the element itself <strong>and its children</strong>, so you can style nested elements based on sticky state!
                    </p>
                </div>
            </div>
        </section>
    `;

    // Add scroll content dynamically
    const scrollContent = el.querySelector('#scroll-content');
    if (scrollContent) {
        for (let i = 0; i < 8; i++) {
            const block = document.createElement('div');
            block.className = 'h-24 bg-purple-100 dark:bg-purple-900/30 rounded p-4 text-slate-700 dark:text-slate-300 transition-colors';
            block.textContent = `Content Block ${i + 1}`;
            scrollContent.appendChild(block);
        }
    }

    return el;
}
