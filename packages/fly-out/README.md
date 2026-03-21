# @gnireeg/fly-out

Accessible fly-out web component with smooth animations, keyboard support, and background overlay.

## Features

- ✨ Smooth slide-in animations with spring easing
- ♿ Full accessibility (ARIA attributes, keyboard navigation, focus trap)
- 🎯 Slide from all four directions (top, bottom, left, right)
- 🎨 Animated background overlay with blur effect
- 📦 Zero dependencies
- 🎯 TypeScript support
- ⌨️ Keyboard support (ESC to close, Tab focus trap)
- 🖱️ Click outside to close (optional)
- 🔒 Body scroll locking (optional)
- 🎪 Custom events for state changes

## Installation

```bash
npm install @gnireeg/fly-out
```

## Usage

### Basic Fly-Out

```html
<script type="module">
  import '@gnireeg/fly-out';
</script>

<!-- Toggle button -->
<fly-out-toggle name="sidebar">
  Open Sidebar
</fly-out-toggle>

<!-- Fly-out panel -->
<fly-out name="sidebar" position="left">
  <div class="p-8">
    <h2>Sidebar Content</h2>
    <p>Your content here</p>
  </div>
</fly-out>
```

### Different Positions

```html
<!-- Slide from bottom (default) -->
<fly-out name="bottom-panel" position="bottom">
  <div>Content</div>
</fly-out>

<!-- Slide from top -->
<fly-out name="top-panel" position="top">
  <div>Content</div>
</fly-out>

<!-- Slide from left -->
<fly-out name="left-panel" position="left">
  <div>Content</div>
</fly-out>

<!-- Slide from right -->
<fly-out name="right-panel" position="right">
  <div>Content</div>
</fly-out>
```

### Disable Features

```html
<!-- No background overlay -->
<fly-out name="panel" disable-background>
  <div>Content without overlay</div>
</fly-out>

<!-- Allow scrolling when open -->
<fly-out name="panel" disable-scroll-lock>
  <div>Content with scrollable background</div>
</fly-out>

<!-- Prevent closing when clicking outside -->
<fly-out name="panel" disable-click-outside>
  <div>Must use ESC or close button</div>
</fly-out>
```

### Programmatic Control

```javascript
const flyout = document.querySelector('fly-out[name="sidebar"]');

// Open the fly-out
flyout.open();

// Close the fly-out
flyout.close();

// Toggle open/closed state
flyout.toggle();

// Listen to events
flyout.addEventListener('fly-out-opened', (e) => {
  console.log('Opened!', e.detail); // { name: "sidebar" }
});

flyout.addEventListener('fly-out-closed', (e) => {
  console.log('Closed!', e.detail); // { name: "sidebar" }
});

flyout.addEventListener('fly-out-state-changed', (e) => {
  console.log('State changed!', e.detail); // { name: "sidebar", open: true/false }
});
```

## API

### `<fly-out>`

#### Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `name` | string | **required** | Unique identifier for this fly-out |
| `position` | `'bottom'` \| `'top'` \| `'left'` \| `'right'` | `'bottom'` | Edge from which the fly-out slides in |
| `disable-scroll-lock` | boolean | `false` | Prevents body scroll locking when fly-out is open |
| `disable-click-outside` | boolean | `false` | Prevents closing when clicking outside the fly-out |
| `disable-background` | boolean | `false` | Disables the background overlay when fly-out is open |

#### Methods

| Method | Description |
|--------|-------------|
| `open()` | Opens the fly-out panel |
| `close()` | Closes the fly-out panel |
| `toggle()` | Toggles between open and closed states |

#### Events

| Event | Detail | Description |
|-------|--------|-------------|
| `fly-out-opened` | `{ name: string }` | Dispatched when the fly-out opens |
| `fly-out-closed` | `{ name: string }` | Dispatched when the fly-out closes |
| `fly-out-state-changed` | `{ name: string, open: boolean }` | Dispatched when open/close state changes |

### `<fly-out-toggle>`

#### Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `name` | string | **required** | Must match the name of the fly-out to control |

## Styling

The fly-out panel is positioned using `fixed` positioning and can be styled with regular CSS:

```css
/* Full height sidebar */
fly-out[name="sidebar"] {
  width: 400px;
  max-width: 90vw;
  height: 100vh;
  background: white;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
}

/* Bottom sheet */
fly-out[name="bottom-sheet"] {
  width: 100vw;
  background: white;
  border-radius: 16px 16px 0 0;
}
```

### Styling the Background Overlay

The background overlay is automatically managed and appears with:
- Semi-transparent black background (`rgba(0,0,0,0.5)`)
- Backdrop blur effect (`blur(3px)`)
- Smooth fade animation (`0.2s ease-out`)

### Important Note about Transitions

⚠️ The internal slide-in animation uses `transition: transform` on the `<fly-out>` element. If you override the `transition` property, you'll need to manually include the fly-out animation by adding `transform` to your transition:

```css
/* ✅ Correct - includes transform */
fly-out {
  transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1), background-color 0.2s;
}

/* ❌ Incorrect - breaks the slide animation */
fly-out {
  transition: background-color 0.2s;
}
```

## Accessibility

This component includes built-in accessibility features:

- Automatic `role="dialog"` and `aria-modal="true"`
- Automatic `aria-expanded` attribute on toggle buttons
- Focus trap - Tab cycles through focusable elements inside the fly-out
- Keyboard support - ESC key closes the fly-out
- Focus restoration - Returns focus to previously focused element when closed
- Automatic focus to first focusable element when opened

## Browser Support

Works in all modern browsers that support:
- Custom Elements v1
- Shadow DOM v1
- ES Modules
- CSS `position: fixed`

## License

MIT

## Author

Joel Geering
