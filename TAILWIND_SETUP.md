# Tailwind CSS Setup Guide

This document outlines the Tailwind CSS configuration for the Fuel Tracker client application.

## Installation

Tailwind CSS and its dependencies are already installed:

```bash
npm install -D tailwindcss postcss autoprefixer
```

## Configuration Files

### 1. `tailwind.config.js`
Main configuration file that defines:
- **Content paths**: Scans `./index.html` and all files in `src/**/*.{js,ts,jsx,tsx}`
- **Theme**: Extended with custom color palettes (primary and accent)
- **Dark mode**: Enabled using `media` (respects system preferences)
- **Fonts**: Custom sans-serif and monospace font families

### 2. `postcss.config.js`
PostCSS configuration for processing Tailwind CSS and Autoprefixer.

### 3. `src/index.css`
Global styles with:
- Tailwind directives (`@tailwind base`, `@tailwind components`, `@tailwind utilities`)
- Custom base styles converted to Tailwind classes
- Dark mode support via media queries

## UI Components

### Button Component (`src/components/ui/Button.tsx`)
Reusable button component with:
- **Variants**: `primary`, `secondary`, `danger`, `ghost`
- **Sizes**: `sm`, `md`, `lg`
- **Loading state**: Built-in spinner animation
- **Accessibility**: Focus rings and disabled states

**Usage:**
```tsx
import Button from '@/components/ui/Button';

<Button variant="primary" size="md" onClick={handleClick}>
  Click me
</Button>

<Button variant="danger" isLoading>
  Deleting...
</Button>
```

### Card Component (`src/components/ui/Card.tsx`)
Simple card container with:
- **Padding options**: `none`, `sm`, `md`, `lg`
- **Styling**: White background, shadow, rounded corners
- **Customizable**: Additional className support

**Usage:**
```tsx
import Card from '@/components/ui/Card';

<Card padding="lg">
  <h2>Card Title</h2>
  <p>Card content goes here</p>
</Card>
```

### Input Component (`src/components/ui/Input.tsx`)
Enhanced input field with:
- **Label**: Optional label with automatic ID generation
- **Error handling**: Visual feedback for validation errors
- **Helper text**: Additional information below the input
- **Icon support**: Optional icon prefix

**Usage:**
```tsx
import Input from '@/components/ui/Input';

<Input
  label="Email Address"
  type="email"
  placeholder="you@example.com"
  error={error}
  helperText="We'll never share your email"
  icon={<MailIcon />}
/>
```

## Color Palette

### Primary Colors (Blue)
- 50: #f0f9ff (lightest)
- 500: #0ea5e9 (default)
- 900: #0c4a6e (darkest)

### Accent Colors (Purple)
- 50: #faf5ff (lightest)
- 500: #a855f7 (default)
- 900: #581c87 (darkest)

## Dark Mode

The application supports dark mode based on system preferences. Dark mode styles are automatically applied when:
- The user's system preference is set to dark mode
- Using `@media (prefers-color-scheme: dark)`

To test dark mode, change your system's appearance settings.

## Customization

### Adding New Colors
Edit `tailwind.config.js`:
```js
theme: {
  extend: {
    colors: {
      brand: {
        50: '#...',
        500: '#...',
        900: '#...',
      },
    },
  },
}
```

### Adding New Components
Follow the pattern in `src/components/ui/`:
1. Create a new component file
2. Use Tailwind utility classes
3. Add TypeScript types
4. Export as default

### Extending Theme
Any Tailwind configuration can be extended in `tailwind.config.js`:
- Fonts
- Spacing
- Border radius
- Shadows
- And more...

## Best Practices

1. **Use utility classes first**: Prefer Tailwind's utility classes over custom CSS
2. **Extract components**: For repeated UI patterns, create reusable components
3. **Responsive design**: Use Tailwind's responsive prefixes (`sm:`, `md:`, `lg:`)
4. **Accessibility**: Include focus states, aria labels, and semantic HTML
5. **Consistency**: Follow established color palette and spacing scale

## Development

The Tailwind CSS is processed automatically by Vite during development. Any changes to Tailwind classes will be hot-reloaded in the browser.

### Build Process
Tailwind CSS is purged of unused styles during the build process:
```bash
npm run build
```

This ensures the final CSS bundle is optimized and minimal.

## Troubleshooting

### Styles not applying?
1. Check that `src/index.css` has the three Tailwind directives
2. Verify `tailwind.config.js` content paths are correct
3. Restart the dev server

### Dark mode not working?
- Ensure `darkMode: 'media'` is set in `tailwind.config.js`
- Check your system's appearance settings
- Verify dark mode styles in `src/index.css`

### Build errors?
- Clear the `node_modules/.vite` cache
- Reinstall dependencies: `rm -rf node_modules package-lock.json && npm install`

## Resources

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Tailwind CSS Cheat Sheet](https://tailwindcomponents.com/cheatsheet/)
- [Vite + Tailwind Guide](https://tailwindcss.com/docs/guides/vite)