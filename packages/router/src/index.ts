
/**
 * Route configuration object
 */
export type Route = {
    /** Unique name identifier for the route (used by router-link) */
    name: string,
    /** URL path (e.g., '/', '/about', '/users/:id') */
    path: string,
    /** Function that returns the component to render for this route */
    component: () => HTMLElement;
}

/**
 * RouterOutlet component - Container that renders the current route's component
 *
 * @element router-outlet
 *
 * @property {Route[]} routes - Array of route configurations
 * @property {Route | undefined} route - Currently active route
 *
 * @fires router-routes-updated - Dispatched when routes array is set/updated
 * @fires router-before-navigate - Dispatched before navigation occurs
 * @fires router-navigated - Dispatched after navigation completes
 * @fires router-route-not-found - Dispatched when no route matches the current path (detail contains {path: string})
 *
 * @example
 * ```html
 * <router-outlet></router-outlet>
 *
 * <script>
 * import HomePage from './pages/home';
 *
 * const router = document.querySelector('router-outlet');
 * router.routes = [
 *   { name: 'home', path: '/', component: HomePage },
 *   { name: 'about', path: '/about', component: AboutPage }
 * ];
 * </script>
 * ```
 *
 * @note Paths with and without trailing slashes are treated as equivalent (e.g., '/about' === '/about/')
 * @note To create a custom 404 Not Found page, add a route with name: '*' and path: '*'. If no custom 404 route exists, a default 404 component will be rendered.
 * @note When a 404 occurs, a 'router-route-not-found' event is dispatched and a meta tag is added for SEO crawlers. The meta tag is automatically removed when navigating to a valid route.
 *
 * @example
 * ```javascript
 * // Custom 404 route
 * router.routes = [
 *   { name: 'home', path: '/', component: HomePage },
 *   { name: '*', path: '*', component: NotFoundPage }
 * ];
 *
 * // Listen to 404 events for analytics, logging, etc.
 * document.addEventListener('router-route-not-found', (e) => {
 *   console.log('404 for path:', e.detail.path);
 *   // Send to analytics, log to server, etc.
 * });
 * ```
 */
export class RouterOutlet extends HTMLElement{

    private static stylesApplied = false;
    private _routes: Route[] = [];
    public route: Route | undefined = undefined;
    public params: Record<string, string> = {};

    public get routes(): Route[] {
        return this._routes;
    }

    public set routes(value: Route[]) {
        this._routes = value;
        this.updateRouteFromPath();
        this.render();
        document.dispatchEvent(new CustomEvent('router-routes-updated'));
    }

    constructor(){
        super();
        if (!RouterOutlet.stylesApplied) {
            const sheet = new CSSStyleSheet();
            sheet.replaceSync('router-outlet { display: block; }');
            document.adoptedStyleSheets = [...document.adoptedStyleSheets, sheet];
            RouterOutlet.stylesApplied = true;
        }
    }

    connectedCallback(){
        window.addEventListener('popstate', this.handlePopstateChange)
        this.updateRouteFromPath();
        this.render();
    }

    disconnectedCallback(){
        window.removeEventListener('popstate', this.handlePopstateChange)
    }

    private handlePopstateChange = () => {
        this.updateRouteFromPath();
        this.render();
        document.dispatchEvent(new CustomEvent('router-navigated'));
    }

    private notFoundComponent = () =>{
        const el = document.createElement('div')
            el.classList.add('router-not-found-page')
            el.innerHTML = /*HTML*/`
                <style>
                    .router-not-found-page{
                        display: flex;
                        justify-content: center;
                        padding: 2rem 1rem;
                    }
                    .router-not-found-page h2{
                        font-weight: 700;
                        font-size: 1.5em;
                        font-style: italic;
                    }
                </style>
                <div>
                    <h2>404 - page not found</h2>
                    <p>We are sorry. The requested page cannot be found.</p>
                </div>
        `
        return el
    }

    private updateRouteFromPath(){
        const path = this.normalizePath(window.location.pathname);

        // Try exact match first
        const exactMatch = this._routes.find(r => this.normalizePath(r.path) === path);
        if(exactMatch){
            this.route = exactMatch;
            this.params = {};
            return;
        }

        // Try dynamic route matching
        for(const route of this._routes){
            const match = this.matchRoute(route.path, path);
            if(match){
                this.route = route;
                this.params = match.params;
                return;
            }
        }

        // No match found
        this.route = undefined;
        this.params = {};
    }

    private matchRoute(routePath: string, actualPath: string): { params: Record<string, string> } | null {
        const routeSegments = this.normalizePath(routePath).split('/');
        const pathSegments = actualPath.split('/');

        if(routeSegments.length !== pathSegments.length){
            return null;
        }

        const params: Record<string, string> = {};

        for(let i = 0; i < routeSegments.length; i++){
            const routeSegment = routeSegments[i];
            const pathSegment = pathSegments[i];

            // Check if it's a dynamic segment {paramName}
            if(routeSegment.startsWith('{') && routeSegment.endsWith('}')){
                const paramName = routeSegment.slice(1, -1);
                params[paramName] = pathSegment;
            } else if(routeSegment !== pathSegment){
                // Not a dynamic segment and doesn't match
                return null;
            }
        }

        return { params };
    }

    private render(){
        this.innerHTML = '';
        if(this.route){
            this.appendChild(this.route.component())
            // Remove 404 meta tag when navigating to valid route
            const existingMeta = document.querySelector('meta[name="prerender-status-code"]');
            if (existingMeta) {
                existingMeta.remove();
            }
        } else if(this._routes.length > 0){
            // if provided use custom 404 page.
            const notFoundPage = this._routes.find(r => r.name === '*')
            if(notFoundPage){
                this.appendChild(notFoundPage.component())
            } else{
                this.appendChild(this.notFoundComponent())
            }
            const path = this.normalizePath(window.location.pathname);
            console.warn(`[RouterOutlet] No route found for path "${path}".`);

            // Dispatch 404 event for external handling (analytics, logging, etc.)
            document.dispatchEvent(new CustomEvent('router-route-not-found', {
                detail: { path }
            }));

            // Add meta tag for SEO crawlers
            const existingMeta = document.querySelector('meta[name="prerender-status-code"]');
            if (!existingMeta) {
                const meta = document.createElement('meta');
                meta.name = 'prerender-status-code';
                meta.content = '404';
                document.head.appendChild(meta);
            }
        }
    }

    private normalizePath(path: string): string {
        // Entferne trailing slash, außer es ist nur '/'
        const normalized = path.endsWith('/') && path.length > 1
            ? path.slice(0, -1)
            : path;
        // Leerer String wird zu '/'
        return normalized === '' ? '/' : normalized;
    }

    /**
     * Programmatically navigate to a route
     * @param route - The route object to navigate to
     */
    public navigateToRoute(route: Route){
        this.performNavigation(route.path);
    }

    /**
     * Programmatically navigate to a path
     * @param path - The path to navigate to (can include dynamic segments already resolved)
     */
    public navigateToPath(path: string){
        this.performNavigation(path);
    }

    private performNavigation(path: string){
        document.dispatchEvent(new CustomEvent('router-before-navigate'));
        window.history.pushState({}, '', path);
        this.updateRouteFromPath();
        this.render();
        window.scrollTo({top: 0})
        document.dispatchEvent(new CustomEvent('router-navigated'));
    }
}

/**
 * RouterLink component - Navigation link that routes without page reload
 *
 * @element router-link
 *
 * @attr {string} to - Required. Name of the route to navigate to (must match a route name in router-outlet)
 *
 * @example
 * ```html
 * <router-link to="home">Home</router-link>
 * <router-link to="about">About</router-link>
 * ```
 *
 * @note The active route link will have the 'active' class on its anchor element for styling
 * @example
 * ```css
 * router-link a.active {
 *   font-weight: bold;
 *   color: blue;
 * }
 * ```
 */
export class RouterLink extends HTMLElement{

    router: RouterOutlet | null = null;
    to: string | null;
    params: Record<string, string> = {};
    href: string = '';
    route: Route | undefined = undefined;
    private anchor: HTMLAnchorElement | null = null;

    constructor(){
        super();
        this.to = this.getAttribute('to');
        const paramsAttr = this.getAttribute('params');
        if(paramsAttr){
            try {
                this.params = JSON.parse(paramsAttr);
            } catch(e) {
                console.warn('[RouterLink] Invalid params attribute. Must be valid JSON.');
                this.params = {};
            }
        }
    }

    private render = () =>{
        if(!this.anchor){
            this.anchor = document.createElement('a');
            this.anchor.href = this.href;
            // Move all child nodes into the anchor
            while(this.firstChild){
                this.anchor.appendChild(this.firstChild);
            }
            this.appendChild(this.anchor);
        } else {
            this.anchor.href = this.href;
        }
        if(this.route && this.route === this.router?.route){
            this.anchor.classList.add('active')
        } else{
            this.anchor.classList.remove('active')
        }

        
    }

    private handleNavigate = (e: PointerEvent) => {
        e.preventDefault();
        if(!this.router){
            console.warn('[RouterLink] No router outlet found. Make sure <router-outlet> exists in the DOM.');
            return;
        }
        if(!this.route){
            console.warn(`[RouterLink] Route "${this.to}" not found. Check if the route is registered.`);
            return;
        }
        // Navigate with the built path (params already replaced)
        const pathToNavigate = this.buildPath(this.route.path, this.params);
        this.router.navigateToPath(pathToNavigate);
    }

    private loadRoutes = () => {
        this.router = document.querySelector('router-outlet') as RouterOutlet;
        if(!this.router){
            console.warn('[RouterLink] No router outlet found. Make sure <router-outlet> exists in the DOM.');
            return;
        }
        this.route = this.router.routes.find(r => r.name === this.to);
        if(this.route){
            // Replace dynamic segments with params
            this.href = this.buildPath(this.route.path, this.params);
        } else{
            this.href = '';
            // Only warn if routes have been set (not empty array)
            if(this.router.routes.length > 0) {
                console.warn(`[RouterLink] Route "${this.to}" not found in registered routes.`);
            }
        }
        this.render();
    }

    private buildPath(path: string, params: Record<string, string>): string {
        let result = path;
        // Replace {paramName} with actual values
        for(const [key, value] of Object.entries(params)){
            result = result.replace(`{${key}}`, value);
        }
        return result;
    }

    connectedCallback(){
        this.addEventListener('click', this.handleNavigate)
        document.addEventListener('router-routes-updated', this.loadRoutes);
        document.addEventListener('router-navigated', this.render);
        this.loadRoutes(); // Load routes immediately for dynamically added links
    }

    disconnectedCallback(){
        this.removeEventListener('click', this.handleNavigate)
        document.removeEventListener('router-routes-updated', this.loadRoutes)
        document.removeEventListener('router-navigated', this.render);

    }
}

customElements.define('router-outlet', RouterOutlet);
customElements.define('router-link', RouterLink);
