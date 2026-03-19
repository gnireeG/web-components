/**
 * A navbar component that automatically hides when scrolling down and shows when scrolling up.
 *
 * Works with both window scroll and container scroll. The scroll container is automatically
 * detected based on the element's offsetParent. If offsetParent is null or document.body,
 * it will listen to window/document scroll events. Otherwise, it listens to the scroll
 * events of the offsetParent element.
 *
 * @example
 * <!-- Window scroll -->
 * <scroll-navbar>
 *   <nav>Your navbar content</nav>
 * </scroll-navbar>
 *
 * @example
 * <!-- Container scroll -->
 * <div style="position: relative; overflow: auto; height: 500px;">
 *   <scroll-navbar>
 *     <nav>Your navbar content</nav>
 *   </scroll-navbar>
 *   <div>Scrollable content...</div>
 * </div>
 *
 * @example
 * <!-- With offset (e.g., when a fixed header is above) -->
 * <scroll-navbar offset="80">
 *   <nav>Your navbar content</nav>
 * </scroll-navbar>
 *
 * @example
 * <!-- Disabled (navbar scrolls normally without hiding) -->
 * <scroll-navbar disabled>
 *   <nav>Your navbar content</nav>
 * </scroll-navbar>
 */
export class ScrollNavbar extends HTMLElement {
  private lastScroll = 0;
  private navbarOffset = 0;
  private navbarHeight = 0;
  private ticking = false;
  private resizeTimeout: ReturnType<typeof setTimeout> | null = null;
  private scrollParent: Element | Document = document;
  private disabled = false;
  private offset = 0;

  static get observedAttributes() {
    return ['offset', 'disabled'];
  }

  constructor() {
    super();

    this.disabled = this.hasAttribute('disabled');
    const offsetAttr = this.getAttribute('offset');
    this.offset = offsetAttr ? parseInt(offsetAttr, 10) : 0;

    const shadow = this.attachShadow({ mode: 'open' });
    shadow.innerHTML = `
      <style>
        :host {
          display: block;
          position: sticky;
          top: ${this.offset}px;
          left: 0;
          width: 100%;
        }
      </style>
      <slot></slot>
    `;

  }

  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
    if (oldValue === newValue) return;

    if (name === 'offset') {
      this.offset = newValue ? parseInt(newValue, 10) : 0;
      this.style.top = `${this.offset}px`;
    }

    if (name === 'disabled') {
      const wasDisabled = this.disabled;
      this.disabled = newValue !== null;

      // Reset navbar position when disabled state changes
      this.navbarOffset = 0;
      this.updateNavbarPosition();

      // If re-enabled, reset scroll tracking
      if (wasDisabled && !this.disabled) {
        this.lastScroll = this.getScrollPosition();
      }
    }
  }

  connectedCallback() {
    this.scrollParent = this.offsetParent ?? document;
    if(this.scrollParent === document.body){
        this.scrollParent = document;
    }

    requestAnimationFrame(() => {
      this.updateNavbarHeight();
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
  }

  private updateNavbarHeight() {
    this.navbarHeight = this.offsetHeight;

    if (this.navbarOffset > this.navbarHeight) {
      this.navbarOffset = 0;
      this.updateNavbarPosition();
    }
  }

  private getScrollPosition(): number {
    if (this.scrollParent === document) {
      return window.scrollY || document.documentElement.scrollTop;
    }
    return (this.scrollParent as Element).scrollTop;
  }

  private isAtScrollTop(): boolean {
    if (this.scrollParent === document) {
      return this.getBoundingClientRect().top <= this.offset;
    }

    const parent = this.scrollParent as Element;
    const parentRect = parent.getBoundingClientRect();
    const navbarRect = this.getBoundingClientRect();

    // Account for parent's border
    const computedStyle = window.getComputedStyle(parent);
    const borderTop = parseFloat(computedStyle.borderTopWidth) || 0;

    const threshold = parentRect.top + borderTop + this.offset;
    // Use small tolerance (1px) to account for floating point precision
    return navbarRect.top <= threshold + 1;
  }

  private updateNavbar() {
    if (this.disabled) {
      this.ticking = false;
      return;
    }

    const currentScroll = this.getScrollPosition();
    const scrollDiff = currentScroll - this.lastScroll;
    const atTop = this.isAtScrollTop();

    if (currentScroll <= 0 || !atTop) {
        this.navbarOffset = 0;
    } else if (scrollDiff > 0) {
        this.navbarOffset = Math.min(this.navbarOffset + scrollDiff, this.navbarHeight);
    } else {
        this.navbarOffset = Math.max(this.navbarOffset + scrollDiff, 0);
    }

    this.lastScroll = currentScroll;
    this.updateNavbarPosition();
    this.ticking = false;
    }

  private updateNavbarPosition() {
    this.style.transform = `translateY(-${this.navbarOffset}px)`;
  }

  private handleScroll = () => {
    if (!this.ticking) {
      requestAnimationFrame(() => this.updateNavbar());
      this.ticking = true;
    }
  }

  private handleResize = () => {
    if (this.resizeTimeout) clearTimeout(this.resizeTimeout);
    this.resizeTimeout = setTimeout(() => {
      this.updateNavbarHeight();
    }, 150);
  }
}

customElements.define('scroll-navbar', ScrollNavbar);