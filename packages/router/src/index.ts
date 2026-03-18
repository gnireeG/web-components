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
 */
export class RouterOutlet extends HTMLElement{

    private _routes: Route[] = [];
    public route: Route | undefined = undefined;

    public get routes(): Route[] {
        return this._routes;
    }

    public set routes(value: Route[]) {
        this._routes = value;
        this.render();
        document.dispatchEvent(new CustomEvent('router-routes-updated'));
    }

    constructor(){
        super();
        this.render();
    }

    connectedCallback(){
        window.addEventListener('popstate', this.handleRouting)
        this.render();
    }

    disconnectedCallback(){
        window.removeEventListener('popstate', this.handleRouting)
    }

    private handleRouting = () => {
        this.render();
    }

    private render(){
        const path = this.normalizePath(window.location.pathname);
        this.route = this._routes.find(r => this.normalizePath(r.path) === path)
        this.innerHTML = '';
        if(this.route){
            this.appendChild(this.route.component())
        } else if(this._routes.length > 0){
            console.warn(`[RouterOutlet] No route found for path "${path}". Available routes:`, this._routes.map(r => r.path));
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
    public navigate(route: Route){
        document.dispatchEvent(new CustomEvent('router-before-navigate'));
        window.history.pushState({}, '', route.path);
        this.render();
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
    href: string = '';
    route: Route | undefined = undefined;
    private anchor: HTMLAnchorElement | null = null;

    constructor(){
        super();
        this.to = this.getAttribute('to');
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
        this.router.navigate(this.route);
    }

    private loadRoutes = () => {
        this.router = document.querySelector('router-outlet') as RouterOutlet;
        if(!this.router){
            console.warn('[RouterLink] No router outlet found. Make sure <router-outlet> exists in the DOM.');
            return;
        }
        this.route = this.router.routes.find(r => r.name === this.to);
        if(this.route){
            this.href = this.route.path;
        } else{
            this.href = '';
            console.warn(`[RouterLink] Route "${this.to}" not found in registered routes. Available routes:`, this.router.routes.map(r => r.name));
        }
        this.render();
    }

    connectedCallback(){
        
        this.addEventListener('click', this.handleNavigate)
        document.addEventListener('router-routes-updated', this.loadRoutes);
        document.addEventListener('router-navigated', this.render);
        this.render();
    }

    disconnectedCallback(){
        this.removeEventListener('click', this.handleNavigate)
        document.removeEventListener('router-routes-updated', this.loadRoutes)
        document.removeEventListener('router-navigated', this.render);

    }
}

customElements.define('router-outlet', RouterOutlet);
customElements.define('router-link', RouterLink);