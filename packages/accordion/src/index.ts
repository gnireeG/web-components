export class AccordionItem extends HTMLElement{

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

    public toggle = () =>{
        if(this.open){
            this.close();
        } else{
            this.show();
        }
    }

    public show = () =>{
        this.open = true;
        this.reflectState();
    }

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

export class AccordionGroup extends HTMLElement{
    
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

customElements.define('accordion-item', AccordionItem);
customElements.define('accordion-group', AccordionGroup);