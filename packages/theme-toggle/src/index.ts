/**
 * A custom element that provides a theme toggle button with animated sun/moon icon.
 *
 * @element theme-toggle
 *
 * @example
 * ```html
 * <theme-toggle></theme-toggle>
 * ```
 *
 * Features:
 * - Smooth animated transition between light and dark modes
 * - Automatically toggles the 'dark' class on document.body
 * - Accessible with proper ARIA attributes
 * - Respects prefers-reduced-motion for animations
 * - Uses Shadow DOM for style encapsulation
 *
 * @credits
 * Based on the theme switch component by Adam Argyle
 * @see https://web.dev/articles/building/a-theme-switch-component?hl=de
 */
export class ThemeToggle extends HTMLElement{

    private shadow: ShadowRoot;
    private mode: 'light' | 'dark' = 'light';
    private button: HTMLButtonElement | null = null;
    private maskId: string;

    constructor(){
        super();
        this.maskId = 'mask-theme-toggle-' + Math.random().toString(36).substr(2, 9);
        this.shadow = this.attachShadow({ mode: 'open' })
        this.render();
        this.button = this.shadow.querySelector('.theme-toggle');
    }

    private handleClick(){
        if(this.mode === 'dark') {
            this.mode = 'light';
            this.button?.classList.remove('dark');
            document.body.classList.remove('dark');
        } else if(this.mode === 'light'){
            this.mode = 'dark';
            this.button?.classList.add('dark');
            document.body.classList.add('dark');
        } else{
            this.mode = 'light';
        }
    }

    connectedCallback(){
        this.addEventListener('click', this.handleClick)
    }

    disconnectedCallback(){
        this.removeEventListener('click', this.handleClick)
    }

    private render(){
        this.shadow.innerHTML = `
            <style>
                ${this.getStyle()}
            </style>
            <button class="theme-toggle" title="Toggles light & dark" aria-label="auto" aria-live="polite">
                <svg class="sun-and-moon" aria-hidden="true" width="24" height="24" viewBox="0 0 24 24">
                    <mask class="moon" id="${this.maskId}">
                    <rect x="0" y="0" width="100%" height="100%" fill="white" />
                    <circle cx="24" cy="10" r="6" fill="black" />
                    </mask>
                    <circle class="sun" cx="12" cy="12" r="6" mask="url(#${this.maskId})" fill="currentColor" />
                    <g class="sun-beams" stroke="currentColor">
                    <line x1="12" y1="1" x2="12" y2="3" />
                    <line x1="12" y1="21" x2="12" y2="23" />
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                    <line x1="1" y1="12" x2="3" y2="12" />
                    <line x1="21" y1="12" x2="23" y2="12" />
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                    </g>
                </svg>
            </button>
        `
    }

    private getStyle(){
        return `
        :host{
            color: inherit;

            .theme-toggle{
                background-color: transparent;
                border: none;
                color: inherit;
                cursor: pointer;
            }

            --icon-fill: currentColor;
            --icon-fill-hover: currentColor;

            .sun-and-moon > :is(.moon, .sun, .sun-beams) {
                transform-origin: center;
            }

            .sun-and-moon > :is(.moon, .sun) {
                fill: var(--icon-fill);
            }

            .theme-toggle:is(:hover, :focus-visible) > .sun-and-moon > :is(.moon, .sun) {
                fill: var(--icon-fill-hover);
            }

            .sun-and-moon > .sun-beams {
                stroke: var(--icon-fill);
                stroke-width: 2px;
            }

            .theme-toggle:is(:hover, :focus-visible) .sun-and-moon > .sun-beams {
                stroke: var(--icon-fill-hover);
            }

            .theme-toggle.dark .sun-and-moon > .sun {
                transform: scale(1.75);
            }

            .theme-toggle.dark .sun-and-moon > .sun-beams {
                opacity: 0;
            }

            .theme-toggle.dark .sun-and-moon > .moon > circle {
                transform: translateX(-7px);
            }

            @supports (cx: 1) {
                .theme-toggle.dark .sun-and-moon > .moon > circle {
                    cx: 17;
                    transform: translateX(0);
                }
            }

            @media (prefers-reduced-motion: no-preference) {
                .sun-and-moon > .sun {
                    transition: transform .5s cubic-bezier(.5,1.25,.75,1.25);
                }

                .sun-and-moon > .sun-beams {
                    transition: transform .5s cubic-bezier(.5,1.5,.75,1.25), opacity .5s cubic-bezier(.25,0,.3,1);
                }

                .sun-and-moon .moon > circle {
                    transition: transform .25s cubic-bezier(0,0,0,1);
                }

                @supports (cx: 1) {
                    .sun-and-moon .moon > circle {
                    transition: cx .25s cubic-bezier(0,0,0,1);
                    }
                }
            }

            .theme-toggle.dark .sun-and-moon > .sun {
                transition-timing-function: cubic-bezier(.25,0,.3,1);
                transition-duration: .25s;
            }

            .theme-toggle.dark .sun-and-moon > .sun-beams {
                transition-duration: .15s;
                transform: rotateZ(-25deg);
            }

            .theme-toggle.dark .sun-and-moon > .moon > circle {
                transition-delay: .25s;
            }

            @supports (cx: 1) {
                .theme-toggle.dark .sun-and-moon > .moon > circle {
                    transition-duration: .5s;
                }
            }
        }
        `
    }
}

customElements.define('theme-toggle', ThemeToggle)