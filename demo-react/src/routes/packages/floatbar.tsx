import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/packages/floatbar')({
  component: RouteComponent,
})

function RouteComponent() {
  return(
    <div className="p-4 max-w-5xl mx-auto" suppressHydrationWarning>
      <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4 transition-colors">Float Bar</h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 transition-colors">
            A floating bar component with scroll spy, automatic positioning, and sticky behavior.
        </p>

        <section className="mb-12">
            <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-200 mb-4 transition-colors">Features</h2>
            <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 space-y-2 transition-colors bg-white dark:bg-slate-800 rounded-lg p-6">
                <li>Smooth animations using requestAnimationFrame</li>
                <li>Works with both window scroll and container scroll</li>
                <li>Configurable offset to account for sticky elements</li>
                <li>Lightweight and dependency-free</li>
                <li>Zero configuration required</li>
            </ul>
        </section>

        <section className="mb-12">
            <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-200 mb-4 transition-colors">Usage</h2>
            <div className="bg-slate-900 dark:bg-slate-950 rounded-lg p-6 overflow-x-auto">
                <pre className="text-green-400 text-sm"><code>&lt;!-- Window scroll example --&gt;
&lt;float-bar className="bg-slate-800 text-white px-6 py-4"&gt;
    &lt;nav&gt;Your navigation content&lt;/nav&gt;
&lt;/float-bar&gt;

&lt;!-- With offset (e.g., for sticky header) --&gt;
&lt;float-bar offset="60" className="..."&gt;
    &lt;nav&gt;Your navigation content&lt;/nav&gt;
&lt;/float-bar&gt;

&lt;!-- Container scroll example --&gt;
&lt;div className="h-64 overflow-y-auto"&gt;
    &lt;float-bar className="..."&gt;
        &lt;nav&gt;Container bar&lt;/nav&gt;
    &lt;/float-bar&gt;
    &lt;!-- scrollable content --&gt;
&lt;/div&gt;</code></pre>
            </div>
        </section>

        <section className="mb-12">
            <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-200 mb-4 transition-colors">Demo</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-6 transition-colors">
                The bar at the top of this page uses float-bar. Try scrolling down to see it hide, then scroll up to reveal it again.
            </p>

            <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-300 mb-3 transition-colors">Container Scroll Example</h3>
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg overflow-hidden transition-colors">
                <div className="relative h-64 overflow-y-auto border border-slate-200 dark:border-slate-700">
                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 h-32 transition-colors">
                        <p className="text-slate-600 dark:text-slate-400 transition-colors">Scroll down in this container to see the bar hide...</p>
                    </div>
                    <float-bar className="bg-purple-800 text-white is-sticky:bg-white is-sticky:text-gray-800 transition-colors px-4 py-3 shadow-md" suppressHydrationWarning>
                        <div className="font-semibold">Container Navbar</div>
                    </float-bar>
                    <div className="p-4 space-y-4" id="scroll-content">
                      {Array.from({length: 20}).map((item, index) =>
                        <div className="h-24 bg-purple-100 dark:bg-purple-900/30 rounded p-4 text-slate-700 dark:text-slate-300 transition-colors" key={index}>Item #{index}</div>
                      )}
                    </div>
                </div>
            </div>
        </section>

        <section className="mb-12">
            <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-200 mb-4 transition-colors">Attributes</h2>
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
                            <td className="px-6 py-4 text-sm text-slate-900 dark:text-slate-100 font-mono">offset</td>
                            <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">number</td>
                            <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">0</td>
                            <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">Offset in pixels to account for sticky elements above the bar</td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4 text-sm text-slate-900 dark:text-slate-100 font-mono">offset-element</td>
                            <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">string</td>
                            <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">-</td>
                            <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">CSS selector for an element whose height will be used as offset</td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4 text-sm text-slate-900 dark:text-slate-100 font-mono">disabled</td>
                            <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">boolean</td>
                            <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">false</td>
                            <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">Disables auto-hide behavior</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>

        <section className="mb-12">
            <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-200 mb-4 transition-colors">Styling</h2>
            <div className="bg-white dark:bg-slate-800 rounded-lg p-6 transition-colors space-y-4">
                <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-300 transition-colors">Sticky State Class</h3>
                <p className="text-slate-600 dark:text-slate-400 transition-colors">
                    The float bar automatically adds an <code className="bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded text-sm">is-sticky</code> class when it reaches the sticky position (top of viewport or container). Use this to add visual effects:
                </p>
                <div className="bg-slate-900 dark:bg-slate-950 rounded-lg p-6 overflow-x-auto">
                    <pre className="text-green-400 text-sm"><code>{`/* Style the bar when it's sticky */
float-bar.is-sticky {
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
}`}</code></pre>
                </div>

                <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 rounded">
                    <h4 className="text-md font-semibold text-blue-900 dark:text-blue-100 mb-2 transition-colors">💡 Pro Tip: Tailwind v4 Custom Variant</h4>
                    <p className="text-sm text-blue-800 dark:text-blue-200 mb-3 transition-colors">
                        Create a custom variant to style the sticky state directly in your utility classes:
                    </p>
                    <div className="bg-slate-900 dark:bg-slate-950 rounded p-4 mb-3">
                        <pre className="text-green-400 text-xs"><code>{`/* styles.css */
@custom-variant is-sticky (&:where(.is-sticky, .is-sticky *));`}</code></pre>
                    </div>
                    <p className="text-sm text-blue-800 dark:text-blue-200 mb-2 transition-colors">
                        Now you can use it inline:
                    </p>
                    <div className="bg-slate-900 dark:bg-slate-950 rounded p-4">
                        <pre className="text-green-400 text-xs"><code>{`<float-bar className="
  bg-transparent
  transition-all
  is-sticky:bg-white/95
  is-sticky:shadow-xl
">
  <nav className="text-slate-600 is-sticky:text-slate-900">
    Your navigation
  </nav>
</float-bar>`}</code></pre>
                    </div>
                    <p className="text-xs text-blue-700 dark:text-blue-300 mt-3 transition-colors">
                        The variant works on the element itself <strong>and its children</strong>, so you can style nested elements based on sticky state!
                    </p>
                </div>
            </div>
        </section>
    </div>
  )
}
