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
                <router-link to="scrollnavbar" class="text-blue-600 dark:text-blue-400 hover:underline">View Documentation →</router-link>
            </div>

            <div class="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6 transition-colors">
                <h2 class="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-3 transition-colors">
                    🌓 Theme Toggle
                </h2>
                <p class="text-slate-600 dark:text-slate-400 mb-4 transition-colors">
                    Animated theme switcher with system preference detection and localStorage persistence.
                </p>
                <span class="text-slate-500 dark:text-slate-400">(See navbar above)</span>
            </div>
        </div>

        <div class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 transition-colors">
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
    `;

    return el;
}
