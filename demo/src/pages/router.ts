import { RouterOutlet } from "@gnireeg/router";

export default function RouterPage(){
    const router = document.querySelector('router-outlet') as RouterOutlet;
    const el = document.createElement('div');
    el.className = 'max-w-6xl mx-auto px-6 py-12';
    el.innerHTML = /*HTML*/`
        <h1 class="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4 transition-colors">Router</h1>
        <p class="text-lg text-slate-600 dark:text-slate-400 mb-8 transition-colors">
            Client-side routing with support for navigation links, active states, and dynamic route parameters.
        </p>
    `
    if(router.params.slug){
        el.innerHTML += /*HTML*/`
            <div class="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-l-4 border-blue-500 p-6 rounded-lg mb-8 shadow-sm">
                <div class="flex items-start gap-3">
                    <div class="text-2xl">🔗</div>
                    <div>
                        <p class="text-sm font-semibold text-blue-900 dark:text-blue-200 mb-2">Dynamic Route Parameter Detected!</p>
                        <p class="text-sm text-blue-800 dark:text-blue-300">
                            Current slug: <code class="bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded font-mono text-blue-900 dark:text-blue-100">${router.params.slug}</code>
                        </p>
                        <p class="text-xs text-blue-700 dark:text-blue-400 mt-2">
                            Try navigating to different slugs like <code class="bg-blue-100 dark:bg-blue-900 px-1 rounded">/router/hello</code> or <code class="bg-blue-100 dark:bg-blue-900 px-1 rounded">/router/world</code>
                        </p>
                    </div>
                </div>
            </div>
        `
    }

    el.innerHTML+= /*HTML*/`
        <!-- Features -->
        <section class="mb-12">
            <h2 class="text-2xl font-semibold text-slate-800 dark:text-slate-200 mb-4 transition-colors">Features</h2>
            <ul class="list-disc list-inside text-slate-600 dark:text-slate-400 space-y-2 transition-colors bg-white dark:bg-slate-800 rounded-lg p-6">
                <li>Client-side routing without page reloads</li>
                <li>Active link detection with CSS class</li>
                <li>Browser history integration (back/forward buttons work)</li>
                <li>Dynamic route parameters (e.g., <code class="bg-slate-200 dark:bg-slate-700 px-1 rounded">/post/{id}</code>)</li>
                <li>Automatic trailing slash normalization</li>
                <li>Custom events for navigation lifecycle</li>
                <li>Type-safe route definitions</li>
                <li>Zero dependencies</li>
            </ul>
        </section>

        <!-- Usage -->
        <section class="mb-12">
            <h2 class="text-2xl font-semibold text-slate-800 dark:text-slate-200 mb-4 transition-colors">Usage</h2>
            <div class="bg-slate-900 dark:bg-slate-950 rounded-lg p-6 overflow-x-auto">
                <pre class="text-green-400 text-sm"><code>&lt;!-- Add router outlet to your HTML --&gt;
&lt;router-outlet&gt;&lt;/router-outlet&gt;

&lt;!-- Add navigation links --&gt;
&lt;router-link to="home"&gt;Home&lt;/router-link&gt;
&lt;router-link to="about"&gt;About&lt;/router-link&gt;

&lt;script type="module"&gt;
import { RouterOutlet } from '@gnireeg/router-outlet';
import HomePage from './pages/home';
import AboutPage from './pages/about';

// Configure routes
const router = document.querySelector('router-outlet');
router.routes = [
  {
    name: 'home',
    path: '/',
    component: HomePage  // Function that returns HTMLElement
  },
  {
    name: 'about',
    path: '/about',
    component: AboutPage
  }
];
&lt;/script&gt;</code></pre>
            </div>
        </section>

        <!-- Dynamic Routes -->
        <section class="mb-12">
            <h2 class="text-2xl font-semibold text-slate-800 dark:text-slate-200 mb-4 transition-colors">Dynamic Route Parameters</h2>
            <p class="text-slate-600 dark:text-slate-400 mb-4 transition-colors">
                Define dynamic segments in your routes using curly braces <code class="bg-slate-200 dark:bg-slate-700 px-2 py-1 rounded">{paramName}</code>.
                Access the parameters via <code class="bg-slate-200 dark:bg-slate-700 px-2 py-1 rounded">router.params</code> in your component.
            </p>
            <div class="bg-slate-900 dark:bg-slate-950 rounded-lg p-6 overflow-x-auto mb-4">
                <pre class="text-green-400 text-sm"><code>// Define routes with dynamic segments
router.routes = [
  {
    name: 'post',
    path: '/post/{id}',
    component: PostPage
  },
  {
    name: 'user-post',
    path: '/users/{userId}/posts/{postId}',
    component: UserPostPage
  }
];

// Access parameters in your component
function PostPage() {
  const router = document.querySelector('router-outlet');
  const { id } = router.params; // Get the 'id' parameter

  const el = document.createElement('div');
  el.innerHTML = \`&lt;h1&gt;Post \${id}&lt;/h1&gt;\`;
  return el;
}</code></pre>
            </div>
            <div class="bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-400 p-4 rounded">
                <p class="text-sm text-amber-800 dark:text-amber-200">
                    <strong>Try it out:</strong> Navigate to <code class="bg-amber-100 dark:bg-amber-900 px-1 py-0.5 rounded"><router-link to="dynamic" params='{"slug":"test-slug"}'>/router/test-slug</router-link></code>
                    to see dynamic parameters in action on this page!
                </p>
            </div>
        </section>

        <!-- Custom 404 Page -->
        <section class="mb-12">
            <h2 class="text-2xl font-semibold text-slate-800 dark:text-slate-200 mb-4 transition-colors">Custom 404 Not Found Page</h2>
            <p class="text-slate-600 dark:text-slate-400 mb-4 transition-colors">
                You can create a custom 404 page by adding a route with <code class="bg-slate-200 dark:bg-slate-700 px-2 py-1 rounded">name: '*'</code> and <code class="bg-slate-200 dark:bg-slate-700 px-2 py-1 rounded">path: '*'</code>.
                If no custom 404 route exists, the router will render a default 404 component.
            </p>
            <div class="bg-slate-900 dark:bg-slate-950 rounded-lg p-6 overflow-x-auto mb-4">
                <pre class="text-green-400 text-sm"><code>import NotFoundPage from './pages/not-found';

router.routes = [
  {
    name: 'home',
    path: '/',
    component: HomePage
  },
  {
    name: 'about',
    path: '/about',
    component: AboutPage
  },
  {
    name: '*',
    path: '*',
    component: NotFoundPage  // Custom 404 page
  }
];</code></pre>
            </div>
            <div class="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-400 p-4 rounded">
                <p class="text-sm text-blue-800 dark:text-blue-200 mb-2">
                    <strong>404 Event Handling:</strong>
                </p>
                <p class="text-sm text-blue-800 dark:text-blue-200 mb-3">
                    When a 404 occurs, the router dispatches a <code class="bg-blue-100 dark:bg-blue-900 px-1 py-0.5 rounded">router-route-not-found</code> event and adds a meta tag for SEO crawlers.
                    The meta tag is automatically removed when navigating to a valid route.
                </p>
                <div class="bg-slate-900 dark:bg-slate-950 rounded p-3 overflow-x-auto">
                    <pre class="text-green-400 text-xs"><code>// Listen to 404 events for analytics, logging, etc.
document.addEventListener('router-route-not-found', (e) => {
  console.log('404 for path:', e.detail.path);
  // Send to analytics, log to server, etc.
});</code></pre>
                </div>
            </div>
        </section>

        <!-- Page Components -->
        <section class="mb-12">
            <h2 class="text-2xl font-semibold text-slate-800 dark:text-slate-200 mb-4 transition-colors">Creating Page Components</h2>
            <p class="text-slate-600 dark:text-slate-400 mb-4 transition-colors">
                Page components are simple functions that return HTMLElements:
            </p>
            <div class="bg-slate-900 dark:bg-slate-950 rounded-lg p-6 overflow-x-auto">
                <pre class="text-green-400 text-sm"><code>// pages/home.ts
export default function HomePage() {
    const el = document.createElement('div');
    el.className = 'container';
    el.innerHTML = \`
        &lt;h1&gt;Welcome Home&lt;/h1&gt;
        &lt;p&gt;This is the home page&lt;/p&gt;
    \`;
    return el;
}</code></pre>
            </div>
        </section>

        <!-- Demo -->
        <section class="mb-12">
            <h2 class="text-2xl font-semibold text-slate-800 dark:text-slate-200 mb-4 transition-colors">Demo</h2>
            <p class="text-slate-600 dark:text-slate-400 mb-6 transition-colors">
                This demo site uses the router! Check out the navigation bar at the top. Notice how:
            </p>
            <ul class="list-disc list-inside text-slate-600 dark:text-slate-400 space-y-2 mb-6 bg-white dark:bg-slate-800 rounded-lg p-6">
                <li>The active link has different styling (check the navbar above)</li>
                <li>Navigation happens without page reloads</li>
                <li>Browser back/forward buttons work correctly</li>
                <li>URLs update in the address bar</li>
            </ul>
        </section>

        <!-- Attributes & Types -->
        <section class="mb-12">
            <h2 class="text-2xl font-semibold text-slate-800 dark:text-slate-200 mb-4 transition-colors">Route Type</h2>
            <div class="bg-slate-900 dark:bg-slate-950 rounded-lg p-6 overflow-x-auto">
                <pre class="text-green-400 text-sm"><code>type Route = {
    name: string;        // Unique identifier for the route
    path: string;        // URL path (e.g., '/', '/about')
    component: () => HTMLElement;  // Function returning page component
}</code></pre>
            </div>
        </section>

        <section class="mb-12">
            <h2 class="text-2xl font-semibold text-slate-800 dark:text-slate-200 mb-4 transition-colors">router-link Attributes</h2>
            <div class="bg-white dark:bg-slate-800 rounded-lg shadow overflow-hidden">
                <table class="w-full">
                    <thead class="bg-slate-100 dark:bg-slate-700">
                        <tr>
                            <th class="px-6 py-3 text-left text-sm font-semibold text-slate-900 dark:text-slate-100">Attribute</th>
                            <th class="px-6 py-3 text-left text-sm font-semibold text-slate-900 dark:text-slate-100">Type</th>
                            <th class="px-6 py-3 text-left text-sm font-semibold text-slate-900 dark:text-slate-100">Description</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-200 dark:divide-slate-700">
                        <tr>
                            <td class="px-6 py-4 text-sm text-slate-900 dark:text-slate-100 font-mono">to</td>
                            <td class="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">string (required)</td>
                            <td class="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">Name of the route to navigate to (must match a route name)</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>

        <!-- Events -->
        <section class="mb-12">
            <h2 class="text-2xl font-semibold text-slate-800 dark:text-slate-200 mb-4 transition-colors">Events</h2>
            <div class="bg-white dark:bg-slate-800 rounded-lg shadow overflow-hidden">
                <table class="w-full">
                    <thead class="bg-slate-100 dark:bg-slate-700">
                        <tr>
                            <th class="px-6 py-3 text-left text-sm font-semibold text-slate-900 dark:text-slate-100">Event</th>
                            <th class="px-6 py-3 text-left text-sm font-semibold text-slate-900 dark:text-slate-100">Description</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-200 dark:divide-slate-700">
                        <tr>
                            <td class="px-6 py-4 text-sm text-slate-900 dark:text-slate-100 font-mono">router-routes-updated</td>
                            <td class="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">Dispatched when routes array is set/updated</td>
                        </tr>
                        <tr>
                            <td class="px-6 py-4 text-sm text-slate-900 dark:text-slate-100 font-mono">router-before-navigate</td>
                            <td class="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">Dispatched before navigation occurs</td>
                        </tr>
                        <tr>
                            <td class="px-6 py-4 text-sm text-slate-900 dark:text-slate-100 font-mono">router-navigated</td>
                            <td class="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">Dispatched after navigation completes</td>
                        </tr>
                        <tr>
                            <td class="px-6 py-4 text-sm text-slate-900 dark:text-slate-100 font-mono">router-route-not-found</td>
                            <td class="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">Dispatched when no route matches the current path (detail: {path: string})</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>

        <!-- Active Link Styling -->
        <section class="mb-12">
            <h2 class="text-2xl font-semibold text-slate-800 dark:text-slate-200 mb-4 transition-colors">Active Link Styling</h2>
            <p class="text-slate-600 dark:text-slate-400 mb-4 transition-colors">
                The active route's link automatically gets the <code class="bg-slate-200 dark:bg-slate-700 px-2 py-1 rounded">active</code> class on its anchor element:
            </p>
            <div class="bg-slate-900 dark:bg-slate-950 rounded-lg p-6 overflow-x-auto">
                <pre class="text-green-400 text-sm"><code>/* Style active links */
router-link a.active {
    font-weight: bold;
    color: #3b82f6;
    border-bottom: 2px solid currentColor;
}</code></pre>
            </div>
        </section>

        <!-- Path Normalization -->
        <section class="mb-12">
            <div class="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-400 p-4 rounded">
                <p class="text-sm text-blue-800 dark:text-blue-200">
                    <strong>💡 Tip:</strong> Paths with and without trailing slashes are treated as equivalent.
                    For example, <code>/about</code> and <code>/about/</code> will match the same route.
                </p>
            </div>
        </section>
    `;

    return el;
}
