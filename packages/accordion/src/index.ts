// Export types for consumers
export type {
  AccordionItemElement,
  AccordionGroupElement,
  AccordionEventDetail,
  AccordionItemAttributes,
  AccordionGroupAttributes,
} from './types';

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
 * @attr {boolean} accordion-trigger - Applied to the element inside trigger-container that should toggle the accordion
 *
 * @slot trigger-container - Container for the trigger element(s). Use accordion-trigger attribute to specify which element toggles the accordion
 * @slot - Default slot for the accordion content
 *
 * @fires accordion-opened - Dispatched when the accordion opens (detail: { open: true }) - Vanilla JS convention
 * @fires AccordionOpened - Same as accordion-opened, for React compatibility
 * @fires accordion-closed - Dispatched when the accordion closes (detail: { open: false }) - Vanilla JS convention
 * @fires AccordionClosed - Same as accordion-closed, for React compatibility
 *
 * @cssprop [--animation-time] - Can be overridden via CSS custom properties
 * @cssprop [--animation-easing] - Can be overridden via CSS custom properties
 *
 * @example
 * ```html
 * <!-- Basic usage -->
 * <accordion-item>
 *   <button slot="trigger-container">Click to expand</button>
 *   <div>Your content here</div>
 * </accordion-item>
 *
 * <!-- Start expanded with custom animation -->
 * <accordion-item open animation-time="500" animation-easing="ease-in-out">
 *   <button slot="trigger-container">Already open</button>
 *   <div>This content is visible by default</div>
 * </accordion-item>
 *
 * <!-- Advanced: Selective trigger with multiple interactive elements -->
 * <accordion-item>
 *   <div slot="trigger-container" class="flex gap-2">
 *     <button accordion-trigger class="flex-1">Expand details</button>
 *     <button onclick="edit()">Edit</button>
 *     <button onclick="delete()">Delete</button>
 *   </div>
 *   <div>Content - only the first button toggles the accordion</div>
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
 * @note If no element with accordion-trigger attribute is found, the entire trigger-container will toggle the accordion
 */
class AccordionItem extends HTMLElement{

    private shadow: ShadowRoot;
    private triggerContainerSlot: HTMLSlotElement | null = null;
    private triggerElement: HTMLElement | null = null;
    private _open = false;
    private _animationTime: string = '300';
    private _easing: string = 'ease';

    // Property getters/setters for React compatibility
    get open(): boolean {
        return this._open;
    }
    set open(value: boolean) {
        this._open = value;
        if (value) {
            this.setAttribute('open', '');
        } else {
            this.removeAttribute('open');
        }
    }

    get animationTime(): string {
        return this._animationTime;
    }
    set animationTime(value: string) {
        this._animationTime = value;
        this.setAttribute('animation-time', value);
    }

    get easing(): string {
        return this._easing;
    }
    set easing(value: string) {
        this._easing = value;
        this.setAttribute('animation-easing', value);
    }

    constructor(){
        super();
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
                    transition: grid-template-rows ${this._animationTime}ms ${this._easing};
                    overflow: hidden;
                }

                :host([open]) .content-wrapper {
                    grid-template-rows: 1fr;
                }

                .content-inner {
                    min-height: 0;
                }
            </style>
            <slot name="trigger-container"></slot>
            <div class="content-wrapper">
                <div class="content-inner">
                    <slot></slot>
                </div>
            </div>
        `
    }

    static get observedAttributes() {
        return ['open', 'animation-time', 'animation-easing'];
    }

    attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
        if(oldValue === newValue) return;
        switch (name) {
            case 'open':
                const shouldBeOpen = newValue !== null;
                // Only update if state actually changed to prevent infinite loop
                if(this._open !== shouldBeOpen) {
                    this._open = shouldBeOpen;
                    this.updateTriggerAccessibility();
                    this.dispatchStateEvent();
                }
                break;
            case 'animation-time':
                this._animationTime = newValue || '300';
                break;
            case 'animation-easing':
                this._easing = newValue || 'ease';
                break;
            default:
                break;
        }
    }

    connectedCallback(){
        this.triggerContainerSlot = this.shadow.querySelector('slot[name="trigger-container"]');
        if(this.triggerContainerSlot){
            // Find the element with accordion-trigger attribute
            requestAnimationFrame(() => {
                this.triggerElement = this.querySelector('[accordion-trigger]');

                // Fallback: if no [accordion-trigger] found, use the first slotted element
                if(!this.triggerElement) {
                    this.triggerElement = this.triggerContainerSlot;
                }

                if(this.triggerElement) {
                    this.triggerElement.addEventListener('click', this.handleTriggerClick);
                    this.setupTriggerAccessibility();
                    this.updateTriggerAccessibility();
                }
            });
        }
    }

    disconnectedCallback(){
        // Cleanup click and keyboard listeners
        if(this.triggerElement){
            this.triggerElement.removeEventListener('click', this.handleTriggerClick);
            this.triggerElement.removeEventListener('keydown', this.handleKeydown);
        }
    }

    private setupTriggerAccessibility = () => {
        if(!this.triggerElement) return;

        // If the trigger element is not a button, add keyboard support
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
     * @fires AccordionOpened
     */
    public show = () =>{
        this._open = true;
        this.reflectState();
    }

    /**
     * Closes the accordion
     * @public
     * @fires accordion-closed
     * @fires AccordionClosed
     */
    public close = () =>{
        this._open = false;
        this.reflectState();
    }

    private reflectState = () => {
        // Update attribute to match property
        this._open ? this.setAttribute('open', '') : this.removeAttribute('open');
        this.updateTriggerAccessibility();
        this.dispatchStateEvent();
    }

    private dispatchStateEvent = () => {
        // Dispatch custom events (both naming conventions for compatibility)
        const eventDetail = {
            bubbles: true,
            composed: true,
            detail: { open: this._open }
        };

        // Vanilla JS / Web Standards convention (lowercase with hyphens)
        this.dispatchEvent(new CustomEvent(this._open ? 'accordion-opened' : 'accordion-closed', eventDetail));

        // React convention (camelCase)
        this.dispatchEvent(new CustomEvent(this._open ? 'AccordionOpened' : 'AccordionClosed', eventDetail));
    }

    private updateTriggerAccessibility = () => {
        if(!this.triggerElement) return;
        this.triggerElement.setAttribute('aria-expanded', String(this._open));
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

    private _allowMultiple: boolean = false;
    private static stylesApplied = false;

    // Property getter/setter for React compatibility
    get allowMultipleOpen(): boolean {
        return this._allowMultiple;
    }
    set allowMultipleOpen(value: boolean) {
        this._allowMultiple = value;
        if (value) {
            this.setAttribute('allow-multiple-open', '');
        } else {
            this.removeAttribute('allow-multiple-open');
        }
    }

    constructor(){
        super();
        if (!AccordionGroup.stylesApplied) {
            const sheet = new CSSStyleSheet();
            sheet.replaceSync('accordion-group { display: block; }');
            document.adoptedStyleSheets = [...document.adoptedStyleSheets, sheet];
            AccordionGroup.stylesApplied = true;
        }
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
                if(this._allowMultiple !== shouldBeAllowed) {
                    this._allowMultiple = shouldBeAllowed;
                }
                break;
            default:
                break;
        }
    }

    connectedCallback(){
        // Only listen to one event to avoid duplicate handling
        this.addEventListener('accordion-opened', this.handleAccordionOpened);
    }
    disconnectedCallback(){
        this.removeEventListener('accordion-opened', this.handleAccordionOpened);
    }

    private handleAccordionOpened = (e: Event) =>{
        if(this._allowMultiple) return;
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
