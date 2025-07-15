# PSPDFKit Toolbar Color Customization

This guide shows you how to change the toolbar's background color in your PSPDFKit implementation.

## Quick Start

The toolbar background color has been customized in your `src/app/globals.css` file. The current implementation uses a light gray theme.

## Available Methods

### Method 1: CSS Custom Properties (Recommended)

Add these CSS custom properties to your `globals.css` file:

```css
:root {
  /* PSPDFKit Toolbar Customization */
  --PSPDFKit-ToolbarResponsiveGroup--primary-background: #f8fafc; /* Light gray background */
  --PSPDFKit-ToolbarResponsiveGroup--secondary-background: #e2e8f0; /* Slightly darker for secondary toolbar */
  --PSPDFKit-ToolbarResponsiveGroup--secondary-border: #cbd5e1; /* Border color */
  --PSPDFKit-ToolbarButton-isActive-background: #3b82f6; /* Active button background (blue) */
  --PSPDFKit-ToolbarButton-isActive-color: #ffffff; /* Active button text color */
  --PSPDFKit-ToolbarButton-svg-fill: #64748b; /* Default icon color */
  --PSPDFKit-ToolbarButton-isHovered-background: #e2e8f0; /* Hover background */
}
```

### Method 2: Direct CSS Selectors

Target PSPDFKit classes directly in your CSS:

```css
.PSPDFKit-ToolbarResponsiveGroup {
  background-color: #f8fafc !important; /* Light gray background */
  border-bottom: 1px solid #e2e8f0 !important;
}

.PSPDFKit-ToolbarResponsiveGroup--primary {
  background-color: #f8fafc !important;
}

.PSPDFKit-ToolbarResponsiveGroup--secondary {
  background-color: #e2e8f0 !important;
  border-top: 1px solid #cbd5e1 !important;
}

/* Toolbar button styling */
.PSPDFKit-ToolbarButton {
  background-color: transparent !important;
  border-radius: 4px !important;
  transition: background-color 0.2s ease !important;
}

.PSPDFKit-ToolbarButton:hover {
  background-color: #e2e8f0 !important;
}

.PSPDFKit-ToolbarButton.isActive {
  background-color: #3b82f6 !important;
  color: #ffffff !important;
}
```

### Method 3: Dynamic Color Schemes

Use the `ToolbarColorExample` component to apply different color schemes programmatically:

```tsx
import ToolbarColorExample from "../components/pdfviewer/ToolbarColorExamples";

// Available color schemes: "light", "dark", "blue", "green", "purple"
<ToolbarColorExample colorScheme="blue" />
```

## Color Scheme Examples

### Light Theme (Default)
- Primary: `#f8fafc`
- Secondary: `#e2e8f0`
- Active: `#3b82f6`

### Dark Theme
- Primary: `#1e293b`
- Secondary: `#334155`
- Active: `#3b82f6`

### Blue Theme
- Primary: `#dbeafe`
- Secondary: `#bfdbfe`
- Active: `#2563eb`

### Green Theme
- Primary: `#dcfce7`
- Secondary: `#bbf7d0`
- Active: `#16a34a`

### Purple Theme
- Primary: `#f3e8ff`
- Secondary: `#e9d5ff`
- Active: `#9333ea`

## Demo Page

Visit `/toolbar-demo` to see all color schemes in action and switch between them interactively.

## Customization Tips

1. **Use CSS Custom Properties**: This is the most reliable method as it works with PSPDFKit's internal styling system.

2. **Important Declarations**: Use `!important` when targeting PSPDFKit classes directly to ensure your styles take precedence.

3. **Color Consistency**: Maintain good contrast ratios for accessibility.

4. **Hover States**: Don't forget to style hover states for better user experience.

5. **Active States**: Style active button states to provide clear visual feedback.

## Troubleshooting

- If styles aren't applying, make sure you're using the correct CSS selectors
- Check that your CSS is loaded after PSPDFKit's default styles
- Use browser developer tools to inspect the actual class names being used
- Ensure your color values have sufficient contrast for accessibility

## ⚠️ Important: Don't Modify Core PSPDFKit Files

**Never modify the core PSPDFKit library files** (`public/pspdfkit-lib/` directory) because:

- ❌ **License Violation**: PSPDFKit's license prohibits modifying their source files
- ❌ **Update Issues**: Changes will be overwritten when you update PSPDFKit
- ❌ **Maintenance Nightmare**: You'll need to reapply changes after every update
- ❌ **Legal Risk**: Could violate PSPDFKit's terms of service

### ✅ Proper Customization Methods:

1. **CSS Overrides** (Recommended): Use the methods shown above
2. **Custom CSS Files**: Create separate CSS files like `src/styles/pspdfkit-custom.css`
3. **CSS Custom Properties**: Use PSPDFKit's built-in CSS variables
4. **Official API Options**: Use PSPDFKit's configuration options

## Additional Resources

- [PSPDFKit Web Documentation](https://pspdfkit.com/web/)
- [PSPDFKit Styling Guide](https://pspdfkit.com/guides/web/current/features/styling/)
- [CSS Custom Properties MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
- [PSPDFKit License Agreement](https://pspdfkit.com/legal/) 