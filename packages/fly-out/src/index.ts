/**
 * FlyOut component - A slide-in panel that can appear from any edge of the screen
 *
 * @element fly-out
 *
 * @attr {string} name - Required. Unique identifier for this fly-out
 * @attr {('bottom'|'top'|'left'|'right')} [position='bottom'] - Edge from which the fly-out slides in
 * @attr {boolean} [disable-lock-scroll] - Prevents body scroll locking when fly-out is open
 * @attr {boolean} [disable-click-outside] - Prevents closing when clicking outside the fly-out
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
export class FlyOut extends HTMLElement {
  private name: string | null = null;
  private position: "bottom" | "top" | "left" | "right" = "bottom";
  private show = false;
  private shadow: ShadowRoot;
  private disableLockScroll = false;
  private disableClickOutside = false;
  private previouslyFocusedElement: HTMLElement | null = null;
  private focusableElements: HTMLElement[] = [];

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
    this.name = this.getAttribute("name");

    if (!this.name) {
      console.warn(
        'FlyOut: "name" attribute is required for the component to work properly.',
      );
    }

    this.disableLockScroll = this.hasAttribute("disable-lock-scroll");
    this.disableClickOutside = this.hasAttribute("disable-click-outside");
    const posAttr = this.getAttribute("position");

    if (
      posAttr === "bottom" ||
      posAttr === "top" ||
      posAttr === "left" ||
      posAttr === "right"
    ) {
      this.position = posAttr;
    }

    this.setAttribute("role", "dialog");
    this.setAttribute("aria-modal", "true");
    if (this.name) this.setAttribute("id", this.name);

    this.render();
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
                }
                :host(.ready){
                    transition: transform 0.2s ease-out;
                }
                :host(.open){
                    transform: ${styles.openTransform};
                }
            </style>
            <slot></slot>
        `;
  }

  private getPositionStyles() {
    switch (this.position) {
      case "bottom":
        return {
          positioning: "bottom: 0; left: 50vw;",
          closedTransform: "translateX(-50%) translateY(100%)",
          openTransform: "translateX(-50%) translateY(0)",
        };
      case "top":
        return {
          positioning: "top: 0; left: 50vw;",
          closedTransform: "translateX(-50%) translateY(-100%)",
          openTransform: "translateX(-50%) translateY(0)",
        };
      case "left":
        return {
          positioning: "left: 0; top: 50vh;",
          closedTransform: "translateX(-100%) translateY(-50%)",
          openTransform: "translateX(0) translateY(-50%)",
        };
      case "right":
        return {
          positioning: "right: 0; top: 50vh;",
          closedTransform: "translateX(100%) translateY(-50%)",
          openTransform: "translateX(0) translateY(-50%)",
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
    if (!this.disableLockScroll) document.body.style.overflow = "hidden";

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
    this.show = false;
    this.classList.remove("open");
    if (!this.disableLockScroll) document.body.style.overflow = "";

    document.removeEventListener("keydown", this.handleKeyDown);

    if (this.previouslyFocusedElement) {
      this.previouslyFocusedElement.focus();
      this.previouslyFocusedElement = null;
    }

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

  connectedCallback() {
    document.addEventListener("toggle-fly-out", this.handleToggleFlyOut);
    if (!this.disableClickOutside) {
      document.addEventListener("click", this.handleClickOutside);
    }
    requestAnimationFrame(() => {
      this.classList.add("ready");
    });
  }

  disconnectedCallback() {
    document.removeEventListener("toggle-fly-out", this.handleToggleFlyOut);
    if (!this.disableClickOutside) {
      document.removeEventListener("click", this.handleClickOutside);
    }
    // Cleanup falls FlyOut offen war:
    if (this.show && !this.disableLockScroll) {
      document.body.style.overflow = "";
    }
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
export class FlyOutToggle extends HTMLElement {
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

customElements.define("fly-out", FlyOut);
customElements.define("fly-out-toggle", FlyOutToggle);
