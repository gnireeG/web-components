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

  public open() {
    this.show = true;
    this.previouslyFocusedElement = document.activeElement as HTMLElement;

    const styles = this.getPositionStyles();
    this.style.transform = styles.openTransform;
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

  public close() {
    this.show = false;
    const styles = this.getPositionStyles();
    this.style.transform = styles.closedTransform;
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
    const clickedOnTrigger = (target as Element).closest?.("fly-out-trigger");

    if (!this.contains(target) && !clickedOnTrigger && this.show) {
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

export class FlyOutTrigger extends HTMLElement {
  private flyOutName: string | null = null;

  constructor() {
    super();
  }

  private triggerFlyout() {
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

    this.addEventListener("click", this.triggerFlyout);
    document.addEventListener("fly-out-state-changed", this.updateAriaExpanded);
  }

  disconnectedCallback() {
    this.removeEventListener("click", this.triggerFlyout);
    document.removeEventListener(
      "fly-out-state-changed",
      this.updateAriaExpanded,
    );
  }
}

customElements.define("fly-out", FlyOut);
customElements.define("fly-out-trigger", FlyOutTrigger);
