export default function ScrollNavbar(){
    const el = document.createElement('div');
    el.className = 'max-w-6xl mx-auto px-6 py-12';
    el.innerHTML = /*HTML*/`
        <h1 class="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4 transition-colors">Scroll Navbar</h1>
        <p class="text-lg text-slate-600 dark:text-slate-400 mb-8 transition-colors">
            A navigation bar that automatically hides when scrolling down and reveals when scrolling up.
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
&lt;scroll-navbar class="bg-slate-800 text-white px-6 py-4"&gt;
    &lt;nav&gt;Your navigation content&lt;/nav&gt;
&lt;/scroll-navbar&gt;

&lt;!-- With offset (e.g., for sticky header) --&gt;
&lt;scroll-navbar offset="60" class="..."&gt;
    &lt;nav&gt;Your navigation content&lt;/nav&gt;
&lt;/scroll-navbar&gt;

&lt;!-- Container scroll example --&gt;
&lt;div class="h-64 overflow-y-auto"&gt;
    &lt;scroll-navbar class="..."&gt;
        &lt;nav&gt;Container navbar&lt;/nav&gt;
    &lt;/scroll-navbar&gt;
    &lt;!-- scrollable content --&gt;
&lt;/div&gt;</code></pre>
            </div>
        </section>

        <!-- Demo -->
        <section class="mb-12">
            <h2 class="text-2xl font-semibold text-slate-800 dark:text-slate-200 mb-4 transition-colors">Demo</h2>
            <p class="text-slate-600 dark:text-slate-400 mb-6 transition-colors">
                The navbar at the top of this page uses scroll-navbar. Try scrolling down to see it hide, then scroll up to reveal it again.
            </p>

            <h3 class="text-xl font-semibold text-slate-700 dark:text-slate-300 mb-3 transition-colors">Container Scroll Example</h3>
            <div class="bg-white dark:bg-slate-800 rounded-lg shadow-lg overflow-hidden transition-colors">
                <div class="relative h-64 overflow-y-auto border border-slate-200 dark:border-slate-700">
                    <div class="p-4 bg-blue-50 dark:bg-blue-900/20 h-32 transition-colors">
                        <p class="text-slate-600 dark:text-slate-400 transition-colors">Scroll down in this container to see the navbar hide...</p>
                    </div>
                    <scroll-navbar class="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-3 shadow-md">
                        <div class="font-semibold">Container Navbar</div>
                    </scroll-navbar>
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
                            <td class="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">Offset in pixels to account for sticky elements above the navbar</td>
                        </tr>
                    </tbody>
                </table>
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
