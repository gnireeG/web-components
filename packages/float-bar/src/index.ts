// Export types for consumers
export type {
  FloatBarElement,
  FloatBarAttributes,
} from './types';

// SSR-safe: Only define and register components in browser environment
if (typeof window !== 'undefined' && typeof HTMLElement !== 'undefined') {

/**
 * A floating bar component with scroll spy, automatic positioning, and sticky behavior.
 *
 * Works with both window scroll and container scroll. The scroll container is automatically
 * detected based on the element's offsetParent. If offsetParent is null or document.body,
 * it will listen to window/document scroll events. Otherwise, it listens to the scroll
 * events of the offsetParent element.
 *
 * @example
 * <!-- Window scroll -->
 * <float-bar>
 *   <nav>Your navigation content</nav>
 * </float-bar>
 *
 * @example
 * <!-- Container scroll -->
 * <div style="position: relative; overflow: auto; height: 500px;">
 *   <float-bar>
 *     <nav>Your navigation content</nav>
 *   </float-bar>
 *   <div>Scrollable content...</div>
 * </div>
 *
 * @example
 * <!-- With offset (e.g., when a fixed header is above) -->
 * <float-bar offset="80">
 *   <nav>Your navigation content</nav>
 * </float-bar>
 *
 * @example
 * <!-- With offset-element (automatically uses another element's height as offset) -->
 * <header id="top-header">Fixed header</header>
 * <float-bar offset-element="#top-header">
 *   <nav>Your navigation content</nav>
 * </float-bar>
 *
 * @example
 * <!-- Disabled (bar scrolls normally without hiding) -->
 * <float-bar disabled>
 *   <nav>Your navigation content</nav>
 * </float-bar>
 */
class FloatBar extends HTMLElement {
  private lastScroll = 0;
  private translateAmount = 0;
  private navbarHeight = 0;
  private ticking = false;
  private shadow: ShadowRoot;
  private resizeTimeout: ReturnType<typeof setTimeout> | null = null;
  private scrollParent: Element | Document = document;
  private _disabled = false;
  private _offset = 0;
  private _offsetElement: string | null = null;
  private offsetElementRef: Element | null = null;
  private totalOffset = 0;
  private offsetElementObserver: ResizeObserver | null = null;
  private isResizing = false;

  private _isSticky = false;

  // Property getters/setters for React compatibility
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(value: boolean) {
    this._disabled = value;
    if (value) {
      this.setAttribute('disabled', '');
    } else {
      this.removeAttribute('disabled');
    }
  }

  get offset(): number {
    return this._offset;
  }
  set offset(value: number) {
    this._offset = value;
    this.setAttribute('offset', String(value));
  }

  get offsetElement(): string | null {
    return this._offsetElement;
  }
  set offsetElement(value: string | null) {
    this._offsetElement = value;
    if (value !== null) {
      this.setAttribute('offset-element', value);
    } else {
      this.removeAttribute('offset-element');
    }
  }

  static get observedAttributes() {
    return ['offset', 'disabled', 'offset-element'];
  }

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
    this.shadow.innerHTML = `
      <style>
        :host {
          display: block;
          position: sticky;
          top: var(--sticky-top, 0px);
          left: 0;
          width: 100%;
        }
      </style>
      <slot></slot>
    `;
    
  }

  private updateStickyTop(){
    this.style.setProperty('--sticky-top', `${this.totalOffset}px`);
  }

  private calculateTotalOffset(){
    this.totalOffset = this.offset + (this.offsetElementRef ? this.offsetElementRef.clientHeight : 0);
  }

  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
    if (oldValue === newValue) return;

    if (name === 'offset') {
      this._offset = newValue ? parseInt(newValue, 10) : 0;
      this.calculateTotalOffset();
      this.updateStickyTop();
    }

    if (name === 'disabled') {
      const wasDisabled = this._disabled;
      this._disabled = newValue !== null;

      // Reset navbar position when disabled state changes
      this.translateAmount = 0;
      this.applyTransform();

      // If re-enabled, reset scroll tracking
      if (wasDisabled && !this._disabled) {
        this.lastScroll = this.getScrollPosition();
      }
    }

    if (name === 'offset-element') {
      this._offsetElement = newValue;
      // Clean up existing observer
      if (this.offsetElementObserver) {
        this.offsetElementObserver.disconnect();
        this.offsetElementObserver = null;
      }
      // Query for new element and set up observer
      if (newValue) {
        const el = document.querySelector(newValue);
        if (el) {
          this.offsetElementRef = el;
          this.addObserverToOffsetElement();
          this.calculateTotalOffset();
          this.updateStickyTop();
        }
      } else {
        this.offsetElementRef = null;
        this.calculateTotalOffset();
        this.updateStickyTop();
      }
    }
  }

  connectedCallback() {
    this.updateStickyTop();
    this.scrollParent = this.offsetParent ?? document;
    if(this.scrollParent === document.body){
        this.scrollParent = document;
    }

    const offsetElementSelector = this.getAttribute('offset-element');
    if(offsetElementSelector){
      this._offsetElement = offsetElementSelector;
      const el = document.querySelector(offsetElementSelector)
      if(el){
        this.offsetElementRef = el;
        this.addObserverToOffsetElement()
      }
    }

    requestAnimationFrame(() => {
      this.measureNavbarHeight();
      this.calculateTotalOffset();
      this.updateStickyTop();
      this.lastScroll = this.getScrollPosition();
    });

    this.scrollParent.addEventListener('scroll', this.handleScroll, { passive: true });
    window.addEventListener('resize', this.handleResize);

  }

  disconnectedCallback() {
    this.scrollParent.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('resize', this.handleResize);

    if (this.resizeTimeout) {
      clearTimeout(this.resizeTimeout);
    }

    // Clean up ResizeObserver
    if (this.offsetElementObserver) {
      this.offsetElementObserver.disconnect();
      this.offsetElementObserver = null;
    }
  }

  private addObserverToOffsetElement(){
    if(this.offsetElementRef){
      this.offsetElementObserver = new ResizeObserver(() =>{
        this.handleResizeUpdate();
      });

      this.offsetElementObserver.observe(this.offsetElementRef)
    }
  }

  private handleResizeUpdate() {
    this.isResizing = true;
    this.measureNavbarHeight();
    this.calculateTotalOffset();
    this.updateStickyTop();

    // Update lastScroll after a short delay to ensure layout has settled
    // and any scroll events triggered by the resize have fired
    setTimeout(() => {
      this.lastScroll = this.getScrollPosition();
      this.isResizing = false;
    }, 0);
  }

  private measureNavbarHeight() {
    this.navbarHeight = this.offsetHeight;
  }

  private getScrollPosition(): number {
    if (this.scrollParent === document) {
      return window.scrollY || document.documentElement.scrollTop;
    }
    return (this.scrollParent as Element).scrollTop;
  }

  private isSticky(): boolean {
    if (this.scrollParent === document) {
      return this.getBoundingClientRect().top <= this.totalOffset;
    }

    const parent = this.scrollParent as Element;
    const parentRect = parent.getBoundingClientRect();
    const navbarRect = this.getBoundingClientRect();

    // Account for parent's border
    const computedStyle = window.getComputedStyle(parent);
    const borderTop = parseFloat(computedStyle.borderTopWidth) || 0;

    const threshold = parentRect.top + borderTop + this.totalOffset;
    // Use small tolerance (1px) to account for floating point precision
    return navbarRect.top <= threshold + 1;
  }

  private calculateTranslateAmount() {
    if (this._disabled) {
      return;
    }

    const currentScroll = this.getScrollPosition();
    const scrollDiff = currentScroll - this.lastScroll;
    const isSticky = this.isSticky();

    // Update class when sticky state changes
    if(this._isSticky !== isSticky){
      this._isSticky = isSticky;
      isSticky ? this.classList.add('is-sticky') : this.classList.remove('is-sticky');
    }

    if (currentScroll <= 0 || !isSticky) {
        this.translateAmount = 0;
    } else if (scrollDiff > 0) {
        this.translateAmount = Math.min(this.translateAmount + scrollDiff, this.navbarHeight);
    } else {
        this.translateAmount = Math.max(this.translateAmount + scrollDiff, 0);
    }

    this.lastScroll = currentScroll;
    }

  private applyTransform() {
    this.style.transform = `translateY(-${this.translateAmount}px)`;
  }

  private handleScroll = () => {
    if (this.isResizing) {
      return;
    }

    if (!this.ticking) {
      requestAnimationFrame(() => {
        this.calculateTranslateAmount();
        this.applyTransform();
        this.ticking = false;
      });
      this.ticking = true;
    }
  }

  private handleResize = () => {
    if (this.resizeTimeout) clearTimeout(this.resizeTimeout);
    this.resizeTimeout = setTimeout(() => {
      this.handleResizeUpdate();
    }, 150);
  }
}

// Register custom element
customElements.define('float-bar', FloatBar);

}