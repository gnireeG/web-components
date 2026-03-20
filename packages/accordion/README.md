# @gnireeg/accordion

Accessible accordion web component with smooth animations, keyboard support, and nested accordion groups.

## Features

- ✨ Smooth expand/collapse animations
- ♿ Full accessibility (ARIA attributes, keyboard navigation)
- 🎨 Customizable animation timing and easing
- 📦 Zero dependencies
- 🎯 TypeScript support
- 🔄 Accordion groups with mutual exclusion
- 🪆 Support for nested accordions
- 🎪 Custom events for state changes

## Installation

```bash
npm install @gnireeg/accordion
```

## Usage

### Basic Accordion

```html
<script type="module">
  import '@gnireeg/accordion';
</script>

<accordion-item>
  <button slot="trigger-container">Click to expand</button>
  <div>Your content here</div>
</accordion-item>

<!-- Start expanded -->
<accordion-item open>
  <button slot="trigger-container">Already open</button>
  <div>This content is visible by default</div>
</accordion-item>
```

### Selective Trigger (Advanced)

Use the `accordion-trigger` attribute to specify which element should toggle the accordion. This allows you to place additional interactive elements alongside the trigger:

```html
<accordion-item>
  <div slot="trigger-container" class="flex gap-2">
    <!-- Only this button toggles the accordion -->
    <button accordion-trigger class="flex-1">
      Expand details
    </button>

    <!-- These buttons won't toggle the accordion -->
    <button onclick="edit()">Edit</button>
    <button onclick="delete()">Delete</button>
  </div>

  <div>Your content here</div>
</accordion-item>
```

> **Note:** If no element with the `accordion-trigger` attribute is found, the entire trigger container will toggle the accordion (backward compatible behavior).

### Accordion Group (Mutual Exclusion)

Wrap multiple accordion items in an `accordion-group` to ensure only one can be open at a time:

```html
<accordion-group>
  <accordion-item open>
    <button slot="trigger-container">First Item</button>
    <div>Only one item can be open at a time</div>
  </accordion-item>

  <accordion-item>
    <button slot="trigger-container">Second Item</button>
    <div>Opening this will close the first</div>
  </accordion-item>

  <accordion-item>
    <button slot="trigger-container">Third Item</button>
    <div>Same behavior here</div>
  </accordion-item>
</accordion-group>
```

### Custom Animation

```html
<accordion-item animation-time="500" animation-easing="ease-in-out">
  <button slot="trigger-container">Slow animation</button>
  <div>This opens and closes slower</div>
</accordion-item>
```

### Programmatic Control

```javascript
const accordion = document.querySelector('accordion-item');

// Open the accordion
accordion.show();

// Close the accordion
accordion.close();

// Toggle open/closed state
accordion.toggle();

// Listen to events
accordion.addEventListener('accordion-opened', (e) => {
  console.log('Opened!', e.detail);
});

accordion.addEventListener('accordion-closed', (e) => {
  console.log('Closed!', e.detail);
});
```

## API

### `<accordion-item>`

#### Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `open` | boolean | `false` | When present, the accordion starts in an expanded state |
| `animation-time` | string | `"300"` | Animation duration in milliseconds |
| `animation-easing` | string | `"ease"` | CSS easing function (e.g., `ease-in-out`, `cubic-bezier(...)`) |

#### Slots

| Slot | Description |
|------|-------------|
| `trigger-container` | Container for the trigger element(s). Use `accordion-trigger` attribute to specify which element toggles the accordion |
| (default) | The accordion content |

#### Methods

| Method | Description |
|--------|-------------|
| `show()` | Opens the accordion |
| `close()` | Closes the accordion |
| `toggle()` | Toggles between open and closed states |

#### Events

| Event | Detail | Description |
|-------|--------|-------------|
| `accordion-opened` | `{ open: true }` | Dispatched when the accordion opens |
| `accordion-closed` | `{ open: false }` | Dispatched when the accordion closes |

### `<accordion-group>`

#### Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `allow-multiple-open` | boolean | `false` | When present, allows multiple accordions to be open simultaneously |

## Styling

### Styling the Open State

Use the `[open]` attribute selector to style accordion items when expanded:

```css
/* Rotate chevron icon when accordion is open */
accordion-item[open] [slot="trigger-container"] svg {
  transform: rotate(180deg);
}

/* Change background color when open */
accordion-item[open] [slot="trigger-container"] {
  background-color: #f1f5f9;
}

/* Add border accent when open */
accordion-item[open] {
  border-left: 4px solid #3b82f6;
}
```

## Accessibility

This component includes built-in accessibility features:

- Automatic `aria-expanded` attribute on trigger elements
- Keyboard support (Enter/Space) for non-button triggers
- Automatic `role="button"` for non-button triggers
- Screen reader friendly state announcements

## Browser Support

Works in all modern browsers that support:
- Custom Elements v1
- Shadow DOM v1
- ES Modules

## License

MIT

## Author

Joel Geering
