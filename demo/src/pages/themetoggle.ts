export default function ThemeToggle(){
    const el = document.createElement('div');
    el.className = 'max-w-6xl mx-auto px-6 py-12';
    el.innerHTML = /*HTML*/`
        <h1 class="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4 transition-colors">Theme Toggle</h1>
        <p class="text-lg text-slate-600 dark:text-slate-400 mb-8 transition-colors">
            Animated theme switcher with system preference detection and localStorage persistence.
        </p>

        <!-- Features -->
        <section class="mb-12">
            <h2 class="text-2xl font-semibold text-slate-800 dark:text-slate-200 mb-4 transition-colors">Features</h2>
            <ul class="list-disc list-inside text-slate-600 dark:text-slate-400 space-y-2 transition-colors bg-white dark:bg-slate-800 rounded-lg p-6">
                <li>Smooth animated transition between light and dark modes</li>
                <li>Automatically toggles the 'dark' class on document.body</li>
                <li>Persists theme preference to localStorage</li>
                <li>Respects system color scheme preference (prefers-color-scheme)</li>
                <li>Automatically updates when system theme changes</li>
                <li>Accessible with proper ARIA attributes</li>
                <li>Respects prefers-reduced-motion for animations</li>
                <li>Uses Shadow DOM for style encapsulation</li>
            </ul>
        </section>

        <!-- Usage -->
        <section class="mb-12">
            <h2 class="text-2xl font-semibold text-slate-800 dark:text-slate-200 mb-4 transition-colors">Usage</h2>
            <div class="bg-slate-900 dark:bg-slate-950 rounded-lg p-6 overflow-x-auto mb-6">
                <pre class="text-green-400 text-sm"><code>&lt;!-- Simply add the component --&gt;
&lt;theme-toggle&gt;&lt;/theme-toggle&gt;</code></pre>
            </div>

            <h3 class="text-xl font-semibold text-slate-700 dark:text-slate-300 mb-3 transition-colors">With Vanilla CSS</h3>
            <div class="bg-slate-900 dark:bg-slate-950 rounded-lg p-6 overflow-x-auto mb-6">
                <pre class="text-green-400 text-sm"><code>/* Style your dark mode */
body.dark {
    background-color: #1a1a1a;
    color: #ffffff;
}

.card {
    background: white;
}

body.dark .card {
    background: #2d2d2d;
}</code></pre>
            </div>

            <h3 class="text-xl font-semibold text-slate-700 dark:text-slate-300 mb-3 transition-colors">With Tailwind CSS</h3>
            <p class="text-slate-600 dark:text-slate-400 mb-3 transition-colors">
                Add this to your CSS file (e.g., app.css):
            </p>
            <div class="bg-slate-900 dark:bg-slate-950 rounded-lg p-6 overflow-x-auto mb-4">
                <pre class="text-green-400 text-sm"><code>@import "tailwindcss";
@custom-variant dark (&:where(.dark, .dark *));</code></pre>
            </div>
            <p class="text-slate-600 dark:text-slate-400 mb-3 transition-colors">
                Then use Tailwind's dark variant:
            </p>
            <div class="bg-slate-900 dark:bg-slate-950 rounded-lg p-6 overflow-x-auto">
                <pre class="text-green-400 text-sm"><code>&lt;div class="bg-white dark:bg-slate-900 text-black dark:text-white"&gt;
    Content that adapts to theme
&lt;/div&gt;</code></pre>
            </div>
        </section>

        <!-- Demo -->
        <section class="mb-12">
            <h2 class="text-2xl font-semibold text-slate-800 dark:text-slate-200 mb-4 transition-colors">Demo</h2>
            <p class="text-slate-600 dark:text-slate-400 mb-6 transition-colors">
                Try the theme toggle in the navbar above! Notice how:
            </p>
            <ul class="list-disc list-inside text-slate-600 dark:text-slate-400 space-y-2 mb-6 bg-white dark:bg-slate-800 rounded-lg p-6">
                <li>The theme changes smoothly across the entire page</li>
                <li>The sun/moon icon animates beautifully</li>
                <li>Your preference is saved (try refreshing the page)</li>
                <li>It respects your system theme preference if you haven't manually toggled</li>
            </ul>

            <div class="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-8 transition-colors">
                <h3 class="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4 transition-colors">
                    This section demonstrates theme switching
                </h3>
                <p class="text-slate-700 dark:text-slate-300 mb-6 transition-colors">
                    Notice how the colors, backgrounds, and text adapt seamlessly when you toggle the theme.
                </p>
                <div class="grid md:grid-cols-2 gap-4">
                    <div class="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-lg transition-colors">
                        <h4 class="font-semibold text-slate-900 dark:text-slate-100 mb-2 transition-colors">Light Mode</h4>
                        <p class="text-slate-600 dark:text-slate-400 text-sm transition-colors">Clean, bright interface perfect for daytime use</p>
                    </div>
                    <div class="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-lg transition-colors">
                        <h4 class="font-semibold text-slate-900 dark:text-slate-100 mb-2 transition-colors">Dark Mode</h4>
                        <p class="text-slate-600 dark:text-slate-400 text-sm transition-colors">Easy on the eyes for nighttime browsing</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Theme Priority -->
        <section class="mb-12">
            <h2 class="text-2xl font-semibold text-slate-800 dark:text-slate-200 mb-4 transition-colors">Theme Priority</h2>
            <p class="text-slate-600 dark:text-slate-400 mb-4 transition-colors">
                The theme toggle follows this priority order:
            </p>
            <div class="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
                <ol class="space-y-4">
                    <li class="flex items-start">
                        <span class="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mr-3">1</span>
                        <div>
                            <h4 class="font-semibold text-slate-900 dark:text-slate-100 mb-1 transition-colors">User's Manual Selection</h4>
                            <p class="text-slate-600 dark:text-slate-400 text-sm transition-colors">Saved in localStorage and takes highest priority</p>
                        </div>
                    </li>
                    <li class="flex items-start">
                        <span class="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mr-3">2</span>
                        <div>
                            <h4 class="font-semibold text-slate-900 dark:text-slate-100 mb-1 transition-colors">System Preference</h4>
                            <p class="text-slate-600 dark:text-slate-400 text-sm transition-colors">Detected via prefers-color-scheme media query</p>
                        </div>
                    </li>
                    <li class="flex items-start">
                        <span class="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mr-3">3</span>
                        <div>
                            <h4 class="font-semibold text-slate-900 dark:text-slate-100 mb-1 transition-colors">Default</h4>
                            <p class="text-slate-600 dark:text-slate-400 text-sm transition-colors">Falls back to light mode</p>
                        </div>
                    </li>
                </ol>
            </div>
        </section>

        <!-- Attributes -->
        <section class="mb-12">
            <h2 class="text-2xl font-semibold text-slate-800 dark:text-slate-200 mb-4 transition-colors">Attributes</h2>
            <div class="bg-white dark:bg-slate-800 rounded-lg shadow overflow-hidden">
                <table class="w-full">
                    <thead class="bg-slate-100 dark:bg-slate-700">
                        <tr>
                            <th class="px-6 py-3 text-left text-sm font-semibold text-slate-900 dark:text-slate-100">Component</th>
                            <th class="px-6 py-3 text-left text-sm font-semibold text-slate-900 dark:text-slate-100">Attributes</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-200 dark:divide-slate-700">
                        <tr>
                            <td class="px-6 py-4 text-sm text-slate-900 dark:text-slate-100 font-mono">theme-toggle</td>
                            <td class="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">None - works out of the box!</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>

        <!-- Browser Support -->
        <section class="mb-12">
            <div class="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-400 p-4 rounded">
                <p class="text-sm text-green-800 dark:text-green-200">
                    <strong>✅ Browser Support:</strong> Works in all modern browsers with support for:
                    <code class="bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded mx-1">localStorage</code>,
                    <code class="bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded mx-1">matchMedia</code>, and
                    <code class="bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded mx-1">Web Components</code>.
                </p>
            </div>
        </section>

        <!-- Credits -->
        <section class="mb-12">
            <div class="bg-slate-100 dark:bg-slate-800 rounded-lg p-6 transition-colors">
                <h3 class="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2 transition-colors">Credits</h3>
                <p class="text-slate-600 dark:text-slate-400 transition-colors">
                    Based on the theme switch component by <a href="https://web.dev/articles/building/a-theme-switch-component?hl=de" class="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener">Adam Argyle</a>.
                </p>
            </div>
        </section>
    `;

    return el;
}
