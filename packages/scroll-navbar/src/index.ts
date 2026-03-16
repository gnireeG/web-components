export class ScrollNavbar extends HTMLElement {
  private lastScroll = 0;
  private navbarOffset = 0;
  private navbarHeight = 0;
  private ticking = false;
  private resizeTimeout: ReturnType<typeof setTimeout> | null = null;

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
    requestAnimationFrame(() => {
      this.updateNavbarHeight();
    });

    window.addEventListener('scroll', this.boundHandleScroll, { passive: true });
    window.addEventListener('resize', this.boundHandleResize);
  }

  disconnectedCallback() {
    window.removeEventListener('scroll', this.boundHandleScroll);
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

  private updateNavbar() {
    const currentScroll = window.scrollY;
    const scrollDiff = currentScroll - this.lastScroll;
    const atTop = this.getBoundingClientRect().top <= 0;

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