# Dynamic Tool Route Structure

This directory implements a dynamic route pattern `[tool-name]` that handles all tool pages in the application with a unified structure.

## How It Works

The dynamic route automatically detects the tool type and renders the appropriate component:

1. **Conversion Tools** → Uses `ConvertPage` component
2. **Tool Landing Pages** → Uses `ToolLandingPage` component
3. **Custom Pages** → Uses specific template components

## File Structure

```
[tool-name]/
├── page.tsx                    # Main dynamic route handler
├── templates/                   # Custom page templates
│   ├── CompressPdfPage.tsx     # Compress PDF custom page
│   └── MergePdfPage.tsx        # Merge PDF custom page
└── README.md                   # This file
```

## Adding New Tools

### 1. For Conversion Tools (PDF ↔ Other Formats)

Add your tool configuration to `src/data/conversionConfig.ts`:

```typescript
export const conversionTools: Record<string, ConversionToolConfig> = {
  // ... existing tools
  "new-tool-name": {
    titleKey: "toolPages.newTool.title",
    subtitleKey: "toolPages.newTool.subtitle",
    convertFunction: convertNewToolFunction,
    action: "new_tool_action",
    acceptType: ".ext", // Optional: file type to accept
  },
};
```

**No page.tsx file needed!** The dynamic route handles it automatically.

### 2. For Tool Landing Pages (Sign, Split, etc.)

Add your tool configuration to `src/data/toolPages.ts`:

```typescript
export const toolPages: Record<string, ToolPageConfig> = {
  // ... existing tools
  "new-tool": {
    titleKey: "toolPages.newTool.title",
    subtitleKey: "toolPages.newTool.subtitle",
    action: "new_tool",
    route: "/new-tool",
  },
};
```

**No page.tsx file needed!** The dynamic route handles it automatically.

### 3. For Custom Pages (Complex Logic)

If your tool requires custom logic (like compress-pdf or merge-pdf):

1. Create a template component in `templates/`:

```typescript
// src/app/[locale]/[tool-name]/templates/CustomToolPage.tsx
"use client";
import Navbar from "@/components/Navbar";
// ... other imports

export default function CustomToolPage() {
  // Your custom logic here
  return (
    <main className="bg-gray-50">
      <Navbar />
      {/* Your custom UI */}
    </main>
  );
}
```

2. Add it to the switch statement in `page.tsx`:

```typescript
switch (toolName) {
  case "compress-pdf":
    return <CompressPdfPage />;
  case "merge-pdf":
    return <MergePdfPage />;
  case "new-custom-tool": // Add your new tool here
    return <CustomToolPage />;
  default:
  // 404 handler
}
```

## Tool Types Explained

### Conversion Tools

Tools that convert files from one format to another. Examples:

- `pdf-to-word`, `pdf-to-excel`, `pdf-to-jpg`
- `word-to-pdf`, `jpg-to-pdf`, `png-to-pdf`

These use the `ConvertPage` component which provides:

- File upload functionality
- Conversion progress tracking
- Download handling
- Standardized UI

### Tool Landing Pages

Tools that require file upload and redirect to the editor. Examples:

- `sign-pdf` - Upload and sign PDFs
- `split-pdf` - Upload and split PDFs

These use the `ToolLandingPage` component which provides:

- File upload section
- Action-specific configuration
- Editor navigation

### Custom Pages

Tools with unique requirements that don't fit the standard patterns:

- `compress-pdf` - Requires compression level selection modal
- `merge-pdf` - Requires multi-file upload and PDF merging logic

## Migration Guide

If you have existing individual tool pages, you can delete them since they're now handled by the dynamic route:

```bash
# Old structure (can be deleted)
src/app/[locale]/pdf-to-word/page.tsx
src/app/[locale]/pdf-to-excel/page.tsx
src/app/[locale]/jpg-to-pdf/page.tsx
# ... etc

# New structure (handles all above)
src/app/[locale]/[tool-name]/page.tsx  # Handles ALL tools
```

## Benefits

✅ **Single Source of Truth** - One route handler for all tools
✅ **Reduced Duplication** - No need to create individual page files
✅ **Easy Maintenance** - Update once, affects all tools
✅ **Type Safety** - Configuration-based approach ensures consistency
✅ **Automatic 404** - Invalid tool names automatically show error page

## Translation Keys

Make sure to add translation keys for your tool in `messages/*.json`:

```json
{
  "toolPages": {
    "newTool": {
      "title": "New Tool Title",
      "subtitle": "New Tool Subtitle"
    }
  }
}
```

## Example URLs

All these routes are now handled by the dynamic `[tool-name]` route:

- `/en/pdf-to-word`
- `/en/compress-pdf`
- `/en/sign-pdf`
- `/fr/pdf-to-word` (with locale)
- `/es/merge-pdf` (with locale)

## Troubleshooting

### Tool not found error

- Check if tool is added to `conversionConfig.ts` or `toolPages.ts`
- Verify the tool name in the URL matches the config key
- Ensure translation keys exist

### Custom tool not rendering

- Check if the tool name is added to the switch statement in `page.tsx`
- Verify the template component is imported correctly
- Check for TypeScript/linting errors in the template

### Conversion not working

- Verify the conversion function is implemented in `utils/apiUtils.ts`
- Check if the accept type is correctly specified
- Ensure the backend endpoint exists
