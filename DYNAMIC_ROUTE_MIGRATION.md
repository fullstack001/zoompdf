# Dynamic Route Migration Guide

This guide explains how to use the new dynamic route structure `[tool-name]` for all tool pages in your project.

## What Changed?

Previously, each tool required its own directory and `page.tsx` file:

```
src/app/[locale]/
├── pdf-to-word/page.tsx
├── pdf-to-excel/page.tsx
├── jpg-to-pdf/page.tsx
├── compress-pdf/page.tsx
└── ... (14+ individual directories)
```

Now, **one dynamic route handles all tools**:

```
src/app/[locale]/
└── [tool-name]/
    ├── page.tsx              # Handles ALL tools
    └── templates/            # Custom page templates
```

## Current Status

✅ **Created**: Dynamic route structure at `src/app/[locale]/[tool-name]/page.tsx`
✅ **Created**: Template for compress-pdf  
✅ **Created**: Template for merge-pdf
✅ **Ready**: All conversion tools work automatically
✅ **Ready**: All tool landing pages work automatically

## Tools Handled Automatically

### Conversion Tools (via ConvertPage)

These tools now work through the dynamic route without individual pages:

- ✅ pdf-to-word
- ✅ pdf-to-excel
- ✅ pdf-to-pptx
- ✅ pdf-to-png
- ✅ pdf-to-jpg
- ✅ pdf-to-epub
- ✅ word-to-pdf
- ✅ jpg-to-pdf
- ✅ png-to-pdf
- ✅ epub-to-pdf

### Tool Landing Pages (via ToolLandingPage)

- ✅ sign-pdf
- ✅ split-pdf

### Custom Pages (via Templates)

- ✅ compress-pdf (uses CompressionLevelModal)
- ✅ merge-pdf (uses MultiFileUploadSection)

## Migration Steps

### Option 1: Keep Both (Recommended for Testing)

Keep existing pages temporarily while testing the new dynamic route:

1. Test dynamic routes work: `/en/pdf-to-word`, `/en/compress-pdf`, etc.
2. Verify all functionality works correctly
3. Once confirmed, proceed to Option 2

### Option 2: Full Migration (Clean Up)

Remove old individual pages since they're now redundant:

```bash
# These directories can be safely deleted:
rm -rf src/app/[locale]/pdf-to-word
rm -rf src/app/[locale]/pdf-to-excel
rm -rf src/app/[locale]/pdf-to-pptx
rm -rf src/app/[locale]/pdf-to-png
rm -rf src/app/[locale]/pdf-to-jpg
rm -rf src/app/[locale]/pdf-to-epub
rm -rf src/app/[locale]/word-to-pdf
rm -rf src/app/[locale]/jpg-to-pdf
rm -rf src/app/[locale]/png-to-pdf
rm -rf src/app/[locale]/epub-to-pdf
rm -rf src/app/[locale]/sign-pdf
rm -rf src/app/[locale]/split-pdf
rm -rf src/app/[locale]/compress-pdf
rm -rf src/app/[locale]/merge-pdf
```

**Note**: Next.js will automatically prefer the specific routes over dynamic routes, so you can keep both during testing without conflicts.

## Adding New Tools

### Quick Reference

**For conversion tools** (e.g., pdf-to-csv):

1. Add to `src/data/conversionConfig.ts`
2. No page.tsx needed! ✨

**For tool landing pages** (e.g., watermark-pdf):

1. Add to `src/data/toolPages.ts`
2. No page.tsx needed! ✨

**For custom pages** (e.g., rotate-pdf with special UI):

1. Create template in `src/app/[locale]/[tool-name]/templates/`
2. Add case in `src/app/[locale]/[tool-name]/page.tsx`

See detailed examples in `src/app/[locale]/[tool-name]/README.md`

## Testing Checklist

Test these URLs to verify the dynamic route works:

- [ ] `/en/pdf-to-word` - Conversion page
- [ ] `/en/compress-pdf` - Custom page with compression modal
- [ ] `/en/merge-pdf` - Custom page with multi-file upload
- [ ] `/en/sign-pdf` - Tool landing page
- [ ] `/en/split-pdf` - Tool landing page
- [ ] `/fr/pdf-to-excel` - Test with different locale
- [ ] `/en/invalid-tool` - Should show 404 error page

## Benefits of Dynamic Routes

### Before (14+ files to maintain)

```typescript
// pdf-to-word/page.tsx
"use client";
import ConvertPage from "@/components/common/ConvertPage";
import { getConversionConfig } from "@/data/conversionConfig";
import { useTranslations } from "next-intl";

export default function PdfToWord() {
  const config = getConversionConfig("pdf-to-word");
  const t = useTranslations();
  // ... repeated code ...
}

// pdf-to-excel/page.tsx (same code, different tool name)
// pdf-to-pptx/page.tsx (same code, different tool name)
// ... 12 more similar files
```

### After (1 file handles all)

```typescript
// [tool-name]/page.tsx
export default function DynamicToolPage() {
  const toolName = params["tool-name"] as string;
  const config = getConversionConfig(toolName);
  // Handles all tools automatically!
}
```

### Key Benefits

- 🎯 **DRY Principle**: Don't repeat yourself
- 🚀 **Faster Development**: Add new tools by just updating config
- 🐛 **Easier Debugging**: Fix bugs in one place
- 📦 **Smaller Bundle**: Less code duplication
- 🔧 **Easier Maintenance**: Update once, affects all tools

## Rollback Plan

If you need to rollback:

1. The old individual pages still exist (unless deleted)
2. Next.js prioritizes specific routes over dynamic routes
3. Simply delete `src/app/[locale]/[tool-name]` to revert

## Configuration Files

Your tool configurations remain unchanged:

- `src/data/conversionConfig.ts` - Conversion tool configs
- `src/data/toolPages.ts` - Tool landing page configs
- `src/data/tools.ts` - Tool listings and categories

## Support

For questions or issues:

1. Check `src/app/[locale]/[tool-name]/README.md` for detailed docs
2. Review the template files in `templates/` for examples
3. Verify tool configuration in `conversionConfig.ts` or `toolPages.ts`

## Next Steps

1. ✅ Test all tool pages with the dynamic route
2. ✅ Verify file uploads and conversions work correctly
3. ✅ Test with different locales (en, fr, es, etc.)
4. ✅ Add any missing tools to the configs
5. ⏭️ (Optional) Delete old individual pages after confirming everything works
6. ⏭️ (Optional) Add new tools using the simplified process

## Example: Adding a New Tool

### Before Dynamic Routes

1. Create `src/app/[locale]/pdf-to-csv/page.tsx` (50+ lines)
2. Import all necessary components
3. Set up state and handlers
4. Write JSX template
5. Add translations
6. Test the page

### After Dynamic Routes

1. Add to `conversionConfig.ts`:

```typescript
"pdf-to-csv": {
  titleKey: "toolPages.pdfToCsv.title",
  subtitleKey: "toolPages.pdfToCsv.subtitle",
  convertFunction: convertPdfToCsv,
  action: "pdf_to_csv",
}
```

2. Add translations
3. Test! ✨

**Result**: 50+ lines reduced to 6 lines! 🎉
