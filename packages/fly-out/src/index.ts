// Export types for consumers
export type {
  FlyOutElement,
  FlyOutToggleElement,
  FlyOutEventDetail,
  FlyOutStateChangeDetail,
  FlyOutAttributes,
  FlyOutToggleAttributes,
} from './types';

// SSR-safe: Only define and register components in browser environment
if (typeof window !== 'undefined' && typeof HTMLElement !== 'undefined') {

/**
 * FlyOut component - A slide-in panel that can appear from any edge of the screen
 *
 * @element fly-out
 *
 * @attr {string} name - Required. Unique identifier for this fly-out
 * @attr {('bottom'|'top'|'left'|'right')} [position='bottom'] - Edge from which the fly-out slides in
 * @attr {boolean} [disable-scroll-lock] - Prevents body scroll locking when fly-out is open
 * @attr {boolean} [disable-click-outside] - Prevents closing when clicking outside the fly-out
 * @attr {boolean} [disable-background] - Disables the background overlay when fly-out is open
 *
 * @fires fly-out-opened - Dispatched when the fly-out opens. Detail: { name: string }
 * @fires fly-out-closed - Dispatched when the fly-out closes. Detail: { name: string }
 * @fires fly-out-state-changed - Dispatched when open/close state changes. Detail: { name: string, open: boolean }
 *
 * @example
 * ```html
 * <fly-out name="sidebar" position="left">
 *   <div>Content here</div>
 * </fly-out>
 * ```
 *
 * @note ⚠️ The internal slide-in animation uses `transition: transform` on the `:host` element (`<fly-out>`).
 * If you override the `transition` property, you'll need to manually include the fly-out animation
 * by adding `transform` to your transition (e.g., `transition: transform 0.2s, color 0.2s`).
 */
class FlyOut extends HTMLElement {
  private _name: string | null = null;
  private _position: "bottom" | "top" | "left" | "right" = "bottom";
  private show = false;
  private shadow: ShadowRoot;
  private disableScrollLock = false;
  private disableClickOutside = false;
  private disableBackground = false;
  private previouslyFocusedElement: HTMLElement | null = null;
  private focusableElements: HTMLElement[] = [];
  private static stylesApplied = false;
  private static backgroundElement: HTMLElement | null = null;
  private static openFlyOuts = 0;
  private hasInitialized = false;

  // Property getters/setters for React compatibility
  get name(): string | null {
    return this._name;
  }
  set name(value: string | null) {
    this._name = value;
    if (value !== null) {
      this.setAttribute('name', value);
    }
  }

  get position(): "bottom" | "top" | "left" | "right" {
    return this._position;
  }
  set position(value: "bottom" | "top" | "left" | "right") {
    this._position = value;
    this.setAttribute('position', value);
    // Re-render if already initialized
    if (this.hasInitialized && this.shadow) {
      this.render();
    }
  }

  static get observedAttributes() {
    return ['name', 'position'];
  }

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
  }

  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
    if (name === 'name') {
      this._name = newValue;
    } else if (name === 'position') {
      if (newValue === "bottom" || newValue === "top" || newValue === "left" || newValue === "right") {
        this._position = newValue;
        // Re-render if already initialized
        if (this.hasInitialized && this.shadow) {
          this.render();
        }
      }
    }
  }

  private render() {
    const styles = this.getPositionStyles();
    this.shadow.innerHTML = `
            <style>
                :host{
                    display: block;
                    position: fixed;
                    ${styles.positioning}
                    transform: ${styles.closedTransform};
                    z-index: 1000;
                    visibility: hidden;
                }
                :host(.closing){
                    animation: slideout 0.3s ease-in forwards;
                    visibility: visible;
                }
                :host(.open){
                    animation: slidein 0.7s ease-out forwards;
                    visibility: visible;
                }
                @keyframes slidein{
                    0% {
                        transform: ${styles.closedTransform};
                    }
                    30% {
                        transform: ${styles.overshoot1};
                    }
                    50% {
                        transform: ${styles.overshoot2};
                    }
                    70% {
                        transform: ${styles.overshoot3};
                    }
                    100% {
                        transform: ${styles.openTransform};
                    }
                }
                @keyframes slideout{
                    0% {
                        transform: ${styles.openTransform};
                    }
                    100% {
                        transform: ${styles.closedTransform};
                    }
                }
            </style>
            <slot></slot>
        `;

    if (!FlyOut.stylesApplied) {
      const sheet = new CSSStyleSheet();
      sheet.replaceSync(`
        .fly-out-background {
          width: 100vw;
          height: 100vh;
          background-color: rgba(0,0,0,0.5);
          position: fixed;
          top: 0;
          left: 0;
          z-index: 999;
          backdrop-filter: blur(3px);
          -webkit-backdrop-filter: blur(3px);
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.2s ease-out;
        }
        .fly-out-background.show {
          opacity: 1;
          pointer-events: auto;
        }
      `);
      document.adoptedStyleSheets = [...document.adoptedStyleSheets, sheet];
      FlyOut.stylesApplied = true;
    }

    // Create shared background element once
    if (!FlyOut.backgroundElement) {
      const background = document.createElement('div');
      background.classList.add('fly-out-background');
      document.body.appendChild(background);
      FlyOut.backgroundElement = background;
    }
  }

  private getPositionStyles() {
    switch (this.position) {
      case "bottom":
        return {
          positioning: "bottom: 0; left: 50vw; transform-origin: bottom;",
          closedTransform: "translateX(-50%) translateY(100%)",
          openTransform: "translateX(-50%) translateY(0)",
          overshoot1: "translateX(-50%) translateY(0) scaleY(1.03)",
          overshoot2: "translateX(-50%) translateY(0) scaleY(0.99)",
          overshoot3: "translateX(-50%) translateY(0) scaleY(1.01)",
        };
      case "top":
        return {
          positioning: "top: 0; left: 50vw; transform-origin: top;",
          closedTransform: "translateX(-50%) translateY(-100%)",
          openTransform: "translateX(-50%) translateY(0)",
          overshoot1: "translateX(-50%) translateY(0) scaleY(1.03)",
          overshoot2: "translateX(-50%) translateY(0) scaleY(0.99)",
          overshoot3: "translateX(-50%) translateY(0) scaleY(1.01)",
        };
      case "left":
        return {
          positioning: "left: 0; top: 50vh; transform-origin: left;",
          closedTransform: "translateX(-100%) translateY(-50%)",
          openTransform: "translateX(0) translateY(-50%)",
          overshoot1: "translateX(0) translateY(-50%) scaleX(1.03)",
          overshoot2: "translateX(0) translateY(-50%) scaleX(0.99)",
          overshoot3: "translateX(0) translateY(-50%) scaleX(1.01)",
        };
      case "right":
        return {
          positioning: "right: 0; top: 50vh; transform-origin: right;",
          closedTransform: "translateX(100%) translateY(-50%)",
          openTransform: "translateX(0) translateY(-50%)",
          overshoot1: "translateX(0) translateY(-50%) scaleX(1.03)",
          overshoot2: "translateX(0) translateY(-50%) scaleX(0.99)",
          overshoot3: "translateX(0) translateY(-50%) scaleX(1.01)",
        };
    }
  }

  private getFocusableElements(): HTMLElement[] {
    const focusableSelectors =
      'a[href], button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])';
    return Array.from(
      this.querySelectorAll(focusableSelectors),
    ) as HTMLElement[];
  }

  private handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      this.close();
    }

    if (e.key === "Tab") {
      this.handleTabKey(e);
    }
  };

  private handleTabKey(e: KeyboardEvent) {
    this.focusableElements = this.getFocusableElements();
    if (this.focusableElements.length === 0) return;

    const firstElement = this.focusableElements[0];
    const lastElement =
      this.focusableElements[this.focusableElements.length - 1];

    if (e.shiftKey) {
      if (document.activeElement === firstElement) {
        lastElement.focus();
        e.preventDefault();
      }
    } else {
      if (document.activeElement === lastElement) {
        firstElement.focus();
        e.preventDefault();
      }
    }
  }

  /**
   * Opens the fly-out panel
   * - Locks body scroll (unless disabled)
   * - Sets focus to first focusable element
   * - Adds keyboard event listeners (ESC to close, Tab for focus trap)
   */
  public open() {
    this.show = true;
    this.previouslyFocusedElement = document.activeElement as HTMLElement;

    this.classList.add("open");
    if (!this.disableScrollLock) document.body.style.overflow = "hidden";

    // Show background when first fly-out opens (unless disabled)
    if (!this.disableBackground) {
      FlyOut.openFlyOuts++;
      if (FlyOut.openFlyOuts === 1 && FlyOut.backgroundElement) {
        FlyOut.backgroundElement.classList.add("show");
      }
    }

    document.addEventListener("keydown", this.handleKeyDown);

    requestAnimationFrame(() => {
      this.focusableElements = this.getFocusableElements();
      if (this.focusableElements.length > 0) {
        this.focusableElements[0].focus();
      }
    });

    this.notifyTriggers();
    this.dispatchEvent(
      new CustomEvent("fly-out-opened", {
        bubbles: true,
        composed: true,
        detail: { name: this.name },
      }),
    );
  }

  /**
   * Closes the fly-out panel
   * - Unlocks body scroll
   * - Restores focus to previously focused element
   * - Removes keyboard event listeners
   */
  public close() {
    const wasOpen = this.show;
    this.show = false;
    this.classList.remove("open");
    this.classList.add("closing");

    if (!this.disableScrollLock) document.body.style.overflow = "";

    // Hide background when last fly-out closes (unless disabled)
    if (!this.disableBackground && wasOpen) {
      FlyOut.openFlyOuts--;
      if(FlyOut.openFlyOuts < 0 ) FlyOut.openFlyOuts = 0;
      if (FlyOut.openFlyOuts === 0 && FlyOut.backgroundElement) {
        FlyOut.backgroundElement.classList.remove("show");
      }
    }

    document.removeEventListener("keydown", this.handleKeyDown);

    if (this.previouslyFocusedElement) {
      this.previouslyFocusedElement.focus();
      this.previouslyFocusedElement = null;
    }

    // Remove closing class after animation finishes
    setTimeout(() => {
      this.classList.remove("closing");
    }, 300);

    this.notifyTriggers();
    this.dispatchEvent(
      new CustomEvent("fly-out-closed", {
        bubbles: true,
        composed: true,
        detail: { name: this.name },
      }),
    );
  }

  private notifyTriggers() {
    document.dispatchEvent(
      new CustomEvent("fly-out-state-changed", {
        detail: { name: this.name, open: this.show },
      }),
    );
  }

  /**
   * Toggles the fly-out open/closed state
   */
  public toggle() {
    if (this.show) {
      this.close();
    } else {
      this.open();
    }
  }

  private handleToggleFlyOut = (e: Event) => {
    const customEvent = e as CustomEvent;
    if (this.name === customEvent.detail.name) {
      this.toggle();
    }
  };

  private handleClickOutside = (e: PointerEvent) => {
    const target = e.target as Node;
    const clickedToggle = (target as Element).closest?.("fly-out-toggle") as HTMLElement;

    // Check if clicked toggle is for THIS fly-out
    const clickedOnThisToggle = clickedToggle && clickedToggle.getAttribute('name') === this.name;

    // If clicked on this toggle, let the toggle event handle it (don't close here)
    if (clickedOnThisToggle) return;

    // If clicked outside the fly-out, close it
    if (!this.contains(target) && this.show) {
      this.close();
    }
  };

  private handleBackgroundClick = () => {
    if (this.show && !this.disableClickOutside) {
      this.close();
    }
  }

  connectedCallback() {
    // Read initial attribute values
    this.name = this.getAttribute("name");

    const posAttr = this.getAttribute("position");
    if (
      posAttr === "bottom" ||
      posAttr === "top" ||
      posAttr === "left" ||
      posAttr === "right"
    ) {
      this.position = posAttr;
    }

    this.disableScrollLock = this.hasAttribute("disable-scroll-lock");
    this.disableClickOutside = this.hasAttribute("disable-click-outside");
    this.disableBackground = this.hasAttribute("disable-background");

    // Render with all attributes set
    this.render();

    // Set ARIA attributes
    this.setAttribute("role", "dialog");
    this.setAttribute("aria-modal", "true");
    if (this.name) this.setAttribute("id", this.name);

    document.addEventListener("toggle-fly-out", this.handleToggleFlyOut);
    FlyOut.backgroundElement?.addEventListener('click', this.handleBackgroundClick);
    if (!this.disableClickOutside) {
      document.addEventListener("click", this.handleClickOutside);
    }
    requestAnimationFrame(() => {
      this.classList.add("ready");
    });

    // Mark as initialized so attributeChangedCallback will work
    this.hasInitialized = true;
  }

  disconnectedCallback() {
    document.removeEventListener("toggle-fly-out", this.handleToggleFlyOut);
    FlyOut.backgroundElement?.removeEventListener('click', this.handleBackgroundClick);
    if (!this.disableClickOutside) {
      document.removeEventListener("click", this.handleClickOutside);
    }
    // Cleanup falls FlyOut offen war:
    if (this.show && !this.disableScrollLock) {
      document.body.style.overflow = "";
    }

    this._name = null;
    this._position = "bottom";
    this.show = false;
    this.disableScrollLock = false;
    this.disableClickOutside = false;
    this.disableBackground = false;
    this.hasInitialized = false;
  }
}

/**
 * FlyOutToggle component - Button/trigger to open/close a fly-out
 *
 * @element fly-out-toggle
 *
 * @attr {string} name - Required. Must match the name of the fly-out to control
 *
 * @example
 * ```html
 * <fly-out-toggle name="sidebar">
 *   Open Sidebar
 * </fly-out-toggle>
 *
 * <fly-out name="sidebar" position="left">
 *   <div>Sidebar content</div>
 * </fly-out>
 * ```
 */
class FlyOutToggle extends HTMLElement {
  private flyOutName: string | null = null;

  constructor() {
    super();
  }

  private toggleFlyout() {
    document.dispatchEvent(
      new CustomEvent("toggle-fly-out", {
        detail: { name: this.flyOutName },
      }),
    );
  }

  private updateAriaExpanded = (e: Event) => {
    const customEvent = e as CustomEvent;
    if (customEvent.detail.name === this.flyOutName) {
      this.setAttribute("aria-expanded", String(customEvent.detail.open));
    }
  };

  connectedCallback() {
    this.flyOutName = this.getAttribute("name");

    if (this.flyOutName) {
      this.setAttribute("aria-controls", this.flyOutName);
    }
    this.setAttribute("aria-expanded", "false");

    this.addEventListener("click", this.toggleFlyout);
    document.addEventListener("fly-out-state-changed", this.updateAriaExpanded);
  }

  disconnectedCallback() {
    this.removeEventListener("click", this.toggleFlyout);
    document.removeEventListener(
      "fly-out-state-changed",
      this.updateAriaExpanded,
    );
  }
}

// Register custom elements
customElements.define("fly-out", FlyOut);
customElements.define("fly-out-toggle", FlyOutToggle);

}
