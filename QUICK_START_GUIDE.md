# Quick Start Guide: Creating Missing Pages

## 🎯 Start Here: 5 Quick Wins (2-3 days)

These pages will have the most immediate impact and are easiest to implement:

### 1️⃣ Excel to PDF (`excel-to-pdf`)

**Why:** Business users need this daily
**Effort:** 2-3 hours

### 2️⃣ PowerPoint to PDF (`pptx-to-pdf`)

**Why:** Sharing presentations
**Effort:** 2-3 hours

### 3️⃣ PDF to Text (`pdf-to-txt`)

**Why:** Content extraction
**Effort:** 2-3 hours

### 4️⃣ Add Watermark (`add-watermark`)

**Why:** Brand protection
**Effort:** 3-4 hours

### 5️⃣ Rotate PDF (`rotate-pdf`)

**Why:** Basic editing feature
**Effort:** 2-3 hours

---

## 📝 Copy-Paste Template for New Conversion Pages

### Step 1: Create the page file

```bash
# Create new page directory
mkdir -p src/app/[locale]/excel-to-pdf
```

### Step 2: Create `page.tsx`

```tsx
// src/app/[locale]/excel-to-pdf/page.tsx
import ConvertPage from "@/components/common/ConvertPage";
import { conversionTools } from "@/data/conversionConfig";

export default function ExcelToPdfPage() {
  const config = conversionTools["excel-to-pdf"];

  if (!config) {
    return <div>Configuration not found</div>;
  }

  return (
    <ConvertPage
      titleKey={config.titleKey}
      subtitleKey={config.subtitleKey}
      convertFunction={config.convertFunction}
      action={config.action}
      acceptType={config.acceptType}
    />
  );
}
```

### Step 3: Add to `conversionConfig.ts`

```typescript
// src/data/conversionConfig.ts
import { convertExcelToPdf } from "@/utils/apiUtils";

"excel-to-pdf": {
  titleKey: "toolPages.excelToPdf.title",
  subtitleKey: "toolPages.excelToPdf.subtitle",
  convertFunction: convertExcelToPdf,
  action: "excel_to_pdf",
  acceptType: ".xlsx, .xls",
},
```

### Step 4: Add translation keys

```json
// messages/en.json
"toolPages": {
  "excelToPdf": {
    "title": "Excel to PDF Converter",
    "subtitle": "Convert your Excel spreadsheets to PDF format"
  }
}
```

### Step 5: Add API function

```typescript
// src/utils/apiUtils.ts
export const convertExcelToPdf = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API_BASE_URL}/api/convert/excel-to-pdf`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Conversion failed");
  }

  const data = await response.json();
  return data.processingId;
};
```

---

## 🔧 Copy-Paste Template for New Editing Pages

### For tools like add-watermark, rotate-pdf, etc.

```tsx
// src/app/[locale]/add-watermark/page.tsx
import ToolLandingPage from "@/components/common/ToolLandingPage";

export default function AddWatermarkPage() {
  return (
    <ToolLandingPage
      titleKey="toolPages.addWatermark.title"
      subtitleKey="toolPages.addWatermark.subtitle"
      action="add_watermark"
    />
  );
}
```

---

## 📊 Missing Pages Checklist

### ✅ High Priority - Do These First (16 pages)

#### PDF Conversions (11)

- [ ] `excel-to-pdf` - Business essential
- [ ] `pptx-to-pdf` - Presentation sharing
- [ ] `pdf-to-txt` - Text extraction
- [ ] `pdf-to-html` - Web publishing
- [ ] `pdf-to-mobi` - Ebook format
- [ ] `pdf-to-tiff` - Image archival
- [ ] `pdf-to-webp` - Modern web format
- [ ] `pdf-to-avif` - Next-gen format
- [ ] `mobi-to-pdf` - Ebook to PDF
- [ ] `avif-to-pdf` - AVIF to PDF
- [ ] `pdf-to-doc` - Legacy Word format

#### PDF Editing (6)

- [ ] `edit-pdf` - Full editor
- [ ] `pdf-ocr` - OCR functionality
- [ ] `add-watermark` - Watermarking
- [ ] `rotate-pdf` - Rotate pages
- [ ] `delete-pages` - Delete pages
- [ ] `crop-pdf` - Crop pages

### 🎯 Medium Priority (14 pages)

#### Specialized Conversions (11)

- [ ] `pdf-to-svg` - Vector graphics
- [ ] `pdf-to-eps` - PostScript
- [ ] `pdf-to-dxf` - CAD format
- [ ] `pdf-to-azw3` - Kindle format
- [ ] `png-to-avif` - Image optimization
- [ ] `jpg-to-avif` - Image optimization
- [ ] `avif-to-png` - Compatibility
- [ ] `avif-to-jpg` - Compatibility
- [ ] `epub-to-mobi` - Ebook conversion
- [ ] `mobi-to-epub` - Ebook conversion
- [ ] `pdf-to-image` - Generic converter

#### Form Tools (3)

- [ ] `fill-form` - Fill PDF forms
- [ ] `create-form` - Create forms
- [ ] `image-to-pdf` - Batch converter

---

## 🚀 Implementation Workflow

### For Each New Page:

1. **Create directory**

   ```bash
   mkdir -p src/app/[locale]/[page-name]
   ```

2. **Copy template** (from above)

   - Use ConvertPage for conversion tools
   - Use ToolLandingPage for editing tools

3. **Add configuration**

   - Update `src/data/conversionConfig.ts`
   - Add API function in `src/utils/apiUtils.ts`

4. **Add translations**

   - Update `messages/en.json`
   - Update `messages/es.json`
   - Update `messages/fr.json`
   - Update `messages/ko.json`
   - Update `messages/se.json`

5. **Test**

   - Upload sample file
   - Verify conversion works
   - Check loading states work
   - Test on mobile

6. **Commit**
   ```bash
   git add .
   git commit -m "Add [page-name] conversion page"
   ```

---

## 💡 Pro Tips

### 1. Batch Create Similar Pages

Group similar conversions and create them together:

- All "PDF to X" conversions
- All "X to PDF" conversions
- All image format conversions
- All ebook conversions

### 2. Reuse Translation Patterns

```json
{
  "title": "[Format] to [Format] Converter",
  "subtitle": "Convert your [format] files to [format] format quickly and easily"
}
```

### 3. Test Files

Keep test files for each format:

- `test.xlsx` for Excel
- `test.pptx` for PowerPoint
- `test.epub` for ebooks
- etc.

### 4. Loading States

✅ **Already done!** All buttons have loading states implemented.

---

## 🎨 Visual Progress Tracker

```
Current Progress: 23/47 pages (48.9%)

████████████░░░░░░░░░░░░ 49%

After Quick Wins: 28/47 pages (59.6%)
████████████████░░░░░░░░ 60%

After Phase 1: 33/47 pages (70.2%)
██████████████████░░░░░░ 70%

After Phase 2: 39/47 pages (83.0%)
█████████████████████░░░ 83%

Goal: 47/47 pages (100%)
████████████████████████ 100%
```

---

## ⏱️ Time Estimates

| Phase      | Pages  | Days      | Cumulative   |
| ---------- | ------ | --------- | ------------ |
| Quick Wins | 5      | 2-3       | 2-3 days     |
| Phase 1    | 11     | 3-5       | 5-8 days     |
| Phase 2    | 6      | 5-7       | 10-15 days   |
| Phase 3    | 7      | 3-4       | 13-19 days   |
| Phase 4    | 3      | 4-5       | 17-24 days   |
| Phase 5    | 9      | 5-6       | 22-30 days   |
| **Total**  | **47** | **22-30** | **~1 month** |

---

## 🆘 Need Help?

### Common Issues:

**Q: Page shows "Configuration not found"**
A: Make sure you added the tool to `conversionConfig.ts`

**Q: Conversion fails**
A: Check that the API function is implemented in `apiUtils.ts`

**Q: Translation keys not working**
A: Verify keys exist in all 5 language files

**Q: Loading state not showing**
A: It should work automatically - check console for errors

---

## 📚 Reference Files

Key files you'll be editing:

- `src/data/conversionConfig.ts` - Tool configurations
- `src/utils/apiUtils.ts` - API conversion functions
- `messages/en.json` (+ other languages) - Translations
- `src/app/[locale]/[tool-name]/page.tsx` - Individual pages

---

**Start with the 5 Quick Wins and you'll have significant progress in just 2-3 days!** 🚀

**Last Updated:** October 17, 2025
