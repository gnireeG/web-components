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
 */
export class ScrollNavbar extends HTMLElement {
  private lastScroll = 0;
  private navbarOffset = 0;
  private navbarHeight = 0;
  private ticking = false;
  private resizeTimeout: ReturnType<typeof setTimeout> | null = null;
  private scrollParent: Element | Document = document;

  private boundHandleScroll: () => void;
  private boundHandleResize: () => void;

  constructor() {
    super();

    const shadow = this.attachShadow({ mode: 'open' });
    shadow.innerHTML = `
      <style>
        :host {
          display: block;
          position: sticky;
          top: 0;
          left: 0;
          width: 100%;
        }
      </style>
      <slot></slot>
    `;

    this.boundHandleScroll = this.handleScroll.bind(this);
    this.boundHandleResize = this.handleResize.bind(this);
  }

  connectedCallback() {
    this.scrollParent = this.offsetParent ?? document;
    if(this.scrollParent === document.body){
        this.scrollParent = document;
    }

    requestAnimationFrame(() => {
      this.updateNavbarHeight();
    });

    this.scrollParent.addEventListener('scroll', this.boundHandleScroll, { passive: true });
    window.addEventListener('resize', this.boundHandleResize);
  }

  disconnectedCallback() {
    this.scrollParent.removeEventListener('scroll', this.boundHandleScroll);
    window.removeEventListener('resize', this.boundHandleResize);

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
      return this.getBoundingClientRect().top <= 0;
    }

    const parentRect = (this.scrollParent as Element).getBoundingClientRect();
    const navbarRect = this.getBoundingClientRect();
    return navbarRect.top <= parentRect.top;
  }

  private updateNavbar() {
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

  private handleScroll() {
    if (!this.ticking) {
      requestAnimationFrame(() => this.updateNavbar());
      this.ticking = true;
    }
  }

  private handleResize() {
    if (this.resizeTimeout) clearTimeout(this.resizeTimeout);
    this.resizeTimeout = setTimeout(() => {
      this.updateNavbarHeight();
    }, 150);
  }
}

customElements.define('scroll-navbar', ScrollNavbar);