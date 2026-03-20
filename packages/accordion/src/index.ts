// SSR-safe: Only define and register components in browser environment
if (typeof window !== 'undefined' && typeof HTMLElement !== 'undefined') {

/**
 * AccordionItem component - Expandable/collapsible content container with smooth animations
 *
 * @element accordion-item
 *
 * @attr {boolean} open - When present, the accordion starts in an expanded state
 * @attr {string} animation-time - Animation duration in milliseconds (default: "300")
 * @attr {string} animation-easing - CSS easing function (default: "ease")
 *
 * @slot trigger - The clickable element that toggles the accordion (typically a button)
 * @slot - Default slot for the accordion content
 *
 * @fires accordion-opened - Dispatched when the accordion opens (detail: { open: true })
 * @fires accordion-closed - Dispatched when the accordion closes (detail: { open: false })
 *
 * @cssprop [--animation-time] - Can be overridden via CSS custom properties
 * @cssprop [--animation-easing] - Can be overridden via CSS custom properties
 *
 * @example
 * ```html
 * <accordion-item>
 *   <button slot="trigger">Click to expand</button>
 *   <div>Your content here</div>
 * </accordion-item>
 *
 * <!-- Start expanded with custom animation -->
 * <accordion-item open animation-time="500" animation-easing="ease-in-out">
 *   <button slot="trigger">Already open</button>
 *   <div>This content is visible by default</div>
 * </accordion-item>
 * ```
 *
 * @example
 * ```javascript
 * // Programmatic control
 * const accordion = document.querySelector('accordion-item');
 * accordion.show();     // Open
 * accordion.close();    // Close
 * accordion.toggle();   // Toggle state
 *
 * // Listen to events
 * accordion.addEventListener('accordion-opened', (e) => {
 *   console.log('Opened!', e.detail);
 * });
 * ```
 *
 * @note Automatically adds ARIA attributes (aria-expanded) for accessibility
 * @note Supports keyboard navigation (Enter/Space) for non-button triggers
 */
class AccordionItem extends HTMLElement{

    private shadow: ShadowRoot;
    private trigger: HTMLSlotElement | null = null;
    private triggerElement: HTMLElement | null = null;
    public open = false;
    private animationTime: string;
    private easing: string;

    constructor(){
        super();

        // Initialize state from attribute
        this.open = this.hasAttribute('open');
        this.animationTime = this.getAttribute('animation-time') || '300';
        this.easing = this.getAttribute('animation-easing') || 'ease';
        this.shadow = this.attachShadow({ mode: 'open'} );
        this.shadow.innerHTML = /*HTML*/`
            <style>
                :host{
                    display: block;
                    overflow: hidden;
                }
                .content-wrapper {
                    display: grid;
                    grid-template-rows: 0fr;
                    transition: grid-template-rows ${this.animationTime}ms ${this.easing};
                    overflow: hidden;
                }

                :host([open]) .content-wrapper {
                    grid-template-rows: 1fr;
                }

                .content-inner {
                    min-height: 0;
                }
            </style>
            <slot name="trigger"></slot>
            <div class="content-wrapper">
                <div class="content-inner">
                    <slot content></slot>
                </div>
            </div>
        `
    }

    static get observedAttributes() {
        return ['open'];
    }

    attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
        if(oldValue === newValue) return;
        switch (name) {
            case 'open':
                const shouldBeOpen = newValue !== null;
                // Only update if state actually changed to prevent infinite loop
                if(this.open !== shouldBeOpen) {
                    this.open = shouldBeOpen;
                    this.updateTriggerAccessibility();
                    this.dispatchStateEvent();
                }
                break;
            default:
                break;
        }
    }

    connectedCallback(){
        this.trigger = this.shadow.querySelector('slot[name="trigger"]');
        if(this.trigger){
            this.trigger.addEventListener('click', this.handleTriggerClick);

            // Setup accessibility for trigger element
            requestAnimationFrame(() => {
                this.setupTriggerAccessibility();
                this.updateTriggerAccessibility();
            });
        }
    }

    disconnectedCallback(){
        if(this.trigger){
            this.trigger.removeEventListener('click', this.handleTriggerClick);
        }

        // Cleanup keyboard listener
        if(this.triggerElement){
            this.triggerElement.removeEventListener('keydown', this.handleKeydown);
        }
    }

    private setupTriggerAccessibility = () => {
        if(!this.trigger) return;

        this.triggerElement = this.trigger.assignedElements()[0] as HTMLElement;
        if(!this.triggerElement) return;

        // If the slotted element is not a button, add keyboard support
        if(this.triggerElement.tagName !== 'BUTTON' && !this.triggerElement.hasAttribute('role')) {
            this.triggerElement.setAttribute('role', 'button');
            this.triggerElement.setAttribute('tabindex', '0');

            // Add keyboard listener
            this.triggerElement.addEventListener('keydown', this.handleKeydown);
        }
    }

    private handleTriggerClick = () => {
        this.toggle();
    }

    private handleKeydown = (e: KeyboardEvent) => {
        if(e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.toggle();
        }
    }

    /**
     * Toggles the accordion between open and closed states
     * @public
     */
    public toggle = () =>{
        if(this.open){
            this.close();
        } else{
            this.show();
        }
    }

    /**
     * Opens the accordion
     * @public
     * @fires accordion-opened
     */
    public show = () =>{
        this.open = true;
        this.reflectState();
    }

    /**
     * Closes the accordion
     * @public
     * @fires accordion-closed
     */
    public close = () =>{
        this.open = false;
        this.reflectState();
    }

    private reflectState = () => {
        // Update attribute to match property
        this.open ? this.setAttribute('open', '') : this.removeAttribute('open');
        this.updateTriggerAccessibility();
        this.dispatchStateEvent();
    }

    private dispatchStateEvent = () => {
        // Dispatch custom events
        this.dispatchEvent(new CustomEvent(this.open ? 'accordion-opened' : 'accordion-closed', {
            bubbles: true,
            composed: true,
            detail: { open: this.open }
        }));
    }

    private updateTriggerAccessibility = () => {
        if(!this.trigger) return;

        const triggerElement = this.trigger.assignedElements()[0] as HTMLElement;
        if(triggerElement) {
            triggerElement.setAttribute('aria-expanded', String(this.open));
        }
    }
}

/**
 * AccordionGroup component - Container for managing multiple accordion items with mutual exclusion
 *
 * @element accordion-group
 *
 * @attr {boolean} allow-multiple-open - When present, allows multiple accordions to be open simultaneously. By default, opening one accordion closes all others in the group.
 *
 * @example
 * ```html
 * <!-- Only one accordion can be open at a time -->
 * <accordion-group>
 *   <accordion-item open>
 *     <button slot="trigger">First Item</button>
 *     <div>Opening another will close this</div>
 *   </accordion-item>
 *
 *   <accordion-item>
 *     <button slot="trigger">Second Item</button>
 *     <div>Only one can be open at a time</div>
 *   </accordion-item>
 *
 *   <accordion-item>
 *     <button slot="trigger">Third Item</button>
 *     <div>Same behavior here</div>
 *   </accordion-item>
 * </accordion-group>
 * ```
 *
 * @example
 * ```html
 * <!-- Allow multiple accordions to be open -->
 * <accordion-group allow-multiple-open>
 *   <accordion-item>
 *     <button slot="trigger">First Item</button>
 *     <div>Can be open with others</div>
 *   </accordion-item>
 *
 *   <accordion-item>
 *     <button slot="trigger">Second Item</button>
 *     <div>Multiple can be open</div>
 *   </accordion-item>
 * </accordion-group>
 * ```
 *
 * @note Each accordion-group works independently. Multiple groups on the same page don't affect each other.
 * @note The group listens to 'accordion-opened' events from child accordion-item elements
 */
class AccordionGroup extends HTMLElement{

    private allowMultiple: boolean;
    private static stylesApplied = false;

    constructor(){
        super();
        if (!AccordionGroup.stylesApplied) {
            const sheet = new CSSStyleSheet();
            sheet.replaceSync('accordion-group { display: block; }');
            document.adoptedStyleSheets = [...document.adoptedStyleSheets, sheet];
            AccordionGroup.stylesApplied = true;
        }
        this.allowMultiple = this.hasAttribute('allow-multiple-open');
    }

    static get observedAttributes() {
        return ['allow-multiple-open'];
    }

    attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
        if(oldValue === newValue) return;
        switch (name) {
            case 'allow-multiple-open':
                const shouldBeAllowed = newValue !== null;
                // Only update if state actually changed to prevent infinite loop
                if(this.allowMultiple !== shouldBeAllowed) {
                    this.allowMultiple = shouldBeAllowed;
                }
                break;
            default:
                break;
        }
    }

    connectedCallback(){
        this.addEventListener('accordion-opened', this.handleAccordionOpened)
    }
    disconnectedCallback(){
        this.removeEventListener('accordion-opened', this.handleAccordionOpened)
    }

    private handleAccordionOpened = (e: Event) =>{
        if(this.allowMultiple) return;
        const childAccordions = this.querySelectorAll('accordion-item');
        childAccordions.forEach( acc => {
            const accordion = acc as AccordionItem;
            if(e.target !== accordion){
                if(accordion.open) accordion.close();
            }
        })
    }

}

// Register custom elements
customElements.define('accordion-item', AccordionItem);
customElements.define('accordion-group', AccordionGroup);

}
