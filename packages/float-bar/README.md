# @gnireeg/float-bar

Floating bar web component that automatically hides when scrolling down and reveals when scrolling up.

## Features

- ✨ Smooth animations using requestAnimationFrame
- 📍 Auto-hide on scroll down, auto-show on scroll up
- 🎯 Works with both window scroll and container scroll
- ⚙️ Configurable offset to account for sticky elements
- 📦 Zero dependencies
- 🎯 TypeScript support
- 💨 Lightweight and performant

## Installation

```bash
npm install @gnireeg/float-bar
```

## Usage

### Basic Usage

```html
<script type="module">
  import '@gnireeg/float-bar';
</script>

<float-bar class="bg-slate-800 text-white px-6 py-4">
  <nav>Your navigation content</nav>
</float-bar>
```

### With Offset

Use the `offset` attribute to account for sticky elements above the float bar:

```html
<float-bar offset="80" class="bg-white shadow-md">
  <nav>Your navigation content</nav>
</float-bar>
```

### With Offset Element

Automatically use another element's height as offset:

```html
<header id="top-header" style="height: 60px;">Fixed header</header>

<float-bar offset-element="#top-header" class="bg-white shadow-md">
  <nav>Your navigation content</nav>
</float-bar>
```

### In Scrollable Container

The float bar automatically detects its scroll container:

```html
<div style="position: relative; overflow: auto; height: 500px;">
  <float-bar class="bg-white shadow-md">
    <nav>Your navigation content</nav>
  </float-bar>
  <div>Scrollable content...</div>
</div>
```

### Disabled (Static)

Disable the auto-hide behavior:

```html
<float-bar disabled class="bg-white shadow-md">
  <nav>Static navigation</nav>
</float-bar>
```

## API

### Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `offset` | number | `0` | Offset in pixels from the top |
| `offset-element` | string | - | CSS selector for an element whose height will be used as offset |
| `disabled` | boolean | `false` | Disables auto-hide behavior |

## Styling

The float bar uses CSS transforms for smooth animations. You can style it like any other element:

```css
float-bar {
  background: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  padding: 1rem;
}
```

### Sticky State Class

The float bar automatically adds an `is-sticky` class when it reaches the sticky position (top of viewport or container):

```css
/* Style the bar when it's sticky */
float-bar.is-sticky {
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
}
```

This is useful for adding effects like shadows or background changes when the bar becomes sticky.

## How it Works

The float bar:
1. Automatically detects its scroll container (window or parent element)
2. Monitors scroll direction
3. Hides when scrolling down (using translateY transform)
4. Shows when scrolling up
5. Uses requestAnimationFrame for smooth 60fps animations

## Browser Support

Works in all modern browsers that support:
- Custom Elements v1
- Shadow DOM v1
- ES Modules

## License

MIT

## Author

Joel Geering
