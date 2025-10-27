# Dynamic Route Flow Diagram

## 🗺️ Route Resolution Flow

```
┌──────────────────────────────────────────────────────────────┐
│  User visits: /en/pdf-to-word                                │
└─────────────────────────┬────────────────────────────────────┘
                          │
                          ▼
┌──────────────────────────────────────────────────────────────┐
│  Next.js Router                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ Route Pattern: /[locale]/[tool-name]                   │ │
│  │ Params: { locale: "en", tool-name: "pdf-to-word" }    │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────┬────────────────────────────────────┘
                          │
                          ▼
┌──────────────────────────────────────────────────────────────┐
│  Dynamic Route Handler                                       │
│  📄 src/app/[locale]/[tool-name]/page.tsx                   │
└─────────────────────────┬────────────────────────────────────┘
                          │
                          ▼
┌──────────────────────────────────────────────────────────────┐
│  Check 1: Is it a Conversion Tool?                          │
│  📋 getConversionConfig("pdf-to-word")                      │
└─────────────────────────┬────────────────────────────────────┘
                          │
            ┌─────────────┴─────────────┐
            │                           │
         ✅ Yes                       ❌ No
            │                           │
            ▼                           ▼
┌──────────────────────────┐  ┌──────────────────────────────┐
│  Render ConvertPage      │  │  Check 2: Tool Landing Page? │
│  with config:            │  │  📋 getToolPageConfig()      │
│  - titleKey              │  └────────────┬─────────────────┘
│  - subtitleKey           │               │
│  - convertFunction       │    ┌──────────┴──────────┐
│  - action                │    │                     │
│  - acceptType            │  ✅ Yes               ❌ No
└──────────────────────────┘    │                     │
                                ▼                     ▼
                    ┌──────────────────────┐  ┌────────────────────┐
                    │  Render              │  │  Check 3: Custom?  │
                    │  ToolLandingPage     │  │  switch(toolName)  │
                    │  with config:        │  └────────┬───────────┘
                    │  - titleKey          │           │
                    │  - subtitleKey       │  ┌────────┴────────┐
                    │  - action            │  │                 │
                    └──────────────────────┘ ✅ Match        ❌ No Match
                                             │                 │
                                             ▼                 ▼
                              ┌──────────────────────┐  ┌─────────────┐
                              │  Render Custom       │  │  Show 404   │
                              │  Template:           │  │  Error Page │
                              │  - CompressPdfPage   │  └─────────────┘
                              │  - MergePdfPage      │
                              └──────────────────────┘
```

## 📊 Tool Type Decision Tree

```
                      [tool-name] received
                              │
                              ▼
                    ┌─────────────────────┐
                    │ In conversionConfig? │
                    └─────────┬───────────┘
                              │
                  ┌───────────┴───────────┐
                  │                       │
                 YES                     NO
                  │                       │
                  ▼                       ▼
         ┌────────────────┐    ┌──────────────────┐
         │ ConvertPage    │    │ In toolPages?    │
         │                │    └────────┬─────────┘
         │ Tools:         │             │
         │ • pdf-to-word  │   ┌─────────┴─────────┐
         │ • word-to-pdf  │   │                   │
         │ • jpg-to-pdf   │  YES                 NO
         │ • png-to-pdf   │   │                   │
         │ • pdf-to-excel │   ▼                   ▼
         │ • etc...       │ ┌──────────┐   ┌────────────┐
         └────────────────┘ │ToolPage  │   │ Custom?    │
                            │          │   └──────┬─────┘
                            │ Tools:   │          │
                            │ • sign   │  ┌───────┴───────┐
                            │ • split  │  │               │
                            └──────────┘ YES             NO
                                         │               │
                                         ▼               ▼
                                  ┌──────────┐    ┌─────────┐
                                  │ Template │    │   404   │
                                  │          │    └─────────┘
                                  │ Tools:   │
                                  │ •compress│
                                  │ • merge  │
                                  └──────────┘
```

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                         Application Layer                           │
│                                                                     │
│  ┌────────────────┐  ┌────────────────┐  ┌────────────────┐      │
│  │   Navbar       │  │   Footer       │  │   Sections     │      │
│  └────────────────┘  └────────────────┘  └────────────────┘      │
└──────────────────────────────┬──────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────────┐
│                          Route Layer                                │
│                                                                     │
│  /[locale]/[tool-name]/page.tsx (Dynamic Route Handler)            │
│                                                                     │
│  ┌──────────────────────────────────────────────────────────────┐ │
│  │  Decision Logic:                                             │ │
│  │  1. Check conversionConfig.ts                                │ │
│  │  2. Check toolPages.ts                                       │ │
│  │  3. Check custom switch cases                                │ │
│  │  4. Return 404                                               │ │
│  └──────────────────────────────────────────────────────────────┘ │
└──────────────────────────────┬──────────────────────────────────────┘
                               │
                ┌──────────────┼──────────────┐
                │              │              │
                ▼              ▼              ▼
┌─────────────────────┐ ┌────────────┐ ┌────────────────┐
│   ConvertPage       │ │ ToolPage   │ │ Custom Template│
│   Component         │ │ Component  │ │ Components     │
└──────────┬──────────┘ └──────┬─────┘ └────────┬───────┘
           │                   │                 │
           └───────────────────┴─────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────────┐
│                          Config Layer                               │
│                                                                     │
│  ┌──────────────────┐  ┌──────────────┐  ┌──────────────────────┐ │
│  │conversionConfig  │  │  toolPages   │  │  Custom Switch       │ │
│  │                  │  │              │  │                      │ │
│  │ • pdf-to-word   │  │ • sign-pdf   │  │ • compress-pdf      │ │
│  │ • word-to-pdf   │  │ • split-pdf  │  │ • merge-pdf         │ │
│  │ • jpg-to-pdf    │  │              │  │                      │ │
│  │ • etc...        │  │              │  │                      │ │
│  └──────────────────┘  └──────────────┘  └──────────────────────┘ │
└──────────────────────────────┬──────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────────┐
│                          Utility Layer                              │
│                                                                     │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────────┐ │
│  │  apiUtils.ts │  │  hooks       │  │  navigation.ts           │ │
│  │              │  │              │  │                          │ │
│  │ • convert*   │  │ • useCompress│  │ • useLocalizedNavigation │ │
│  │ • upload*    │  │ • useConvert │  │                          │ │
│  │ • download*  │  │              │  │                          │ │
│  └──────────────┘  └──────────────┘  └──────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────┘
```

## 🔄 Data Flow Example: PDF to Word Conversion

```
┌─────────────────────────────────────────────────────────────────┐
│  1. User Action                                                 │
│     User visits: /en/pdf-to-word                                │
│     User uploads: document.pdf                                  │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│  2. Route Resolution                                            │
│     [tool-name] = "pdf-to-word"                                 │
│     getConversionConfig("pdf-to-word") ✅ Found                 │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│  3. Component Render                                            │
│     <ConvertPage                                                │
│       titleKey="toolPages.pdfToWord.title"                      │
│       convertFunction={convertPdfToWord}                        │
│       action="pdf_to_word"                                      │
│     />                                                          │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│  4. File Upload                                                 │
│     FileUploadSection → User selects document.pdf               │
│     Validation → Check file type, size                          │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│  5. Conversion API Call                                         │
│     convertPdfToWord(file)                                      │
│       ↓                                                         │
│     convertFile("/pdf/pdf_to_word", file)                       │
│       ↓                                                         │
│     POST to backend with FormData                               │
│     Track progress: 0% → 50% → 100%                             │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│  6. Processing                                                  │
│     Backend processes PDF → DOCX conversion                     │
│     Returns filename: "converted-123456.docx"                   │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│  7. Download                                                    │
│     downloadFile(filename)                                      │
│     User receives: document.docx                                │
└─────────────────────────────────────────────────────────────────┘
```

## 🎯 Custom Page Flow: Compress PDF

```
┌─────────────────────────────────────────────────────────────────┐
│  1. User visits: /en/compress-pdf                               │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│  2. Route checks:                                               │
│     conversionConfig? ❌ No                                      │
│     toolPages? ❌ No                                             │
│     switch("compress-pdf")? ✅ Yes                               │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│  3. Render: <CompressPdfPage />                                 │
│     Custom template from templates/CompressPdfPage.tsx          │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│  4. User uploads file → PDF uploaded                            │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│  5. Show CompressionLevelModal                                  │
│     Options: Low, Medium, High compression                      │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│  6. User selects level → Call compressPdf(file, level)          │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│  7. Process & Download compressed PDF                           │
└─────────────────────────────────────────────────────────────────┘
```

## 🔀 Custom Page Flow: Merge PDF

```
┌─────────────────────────────────────────────────────────────────┐
│  1. User visits: /en/merge-pdf                                  │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│  2. Route resolves to: <MergePdfPage />                         │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│  3. User uploads multiple PDFs                                  │
│     MultiFileUploadSection (max 12 files)                       │
│     Files: [doc1.pdf, doc2.pdf, doc3.pdf]                       │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│  4. User clicks "Merge PDFs"                                    │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│  5. Client-side merge using pdf-lib                             │
│     PDFDocument.create()                                        │
│     Load each PDF → Copy pages → Add to merged doc              │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│  6. Upload merged PDF to server                                 │
│     uploadEditedPDF(mergedFile)                                 │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│  7. Navigate to editor with merged PDF                          │
│     navigate("/editor")                                         │
└─────────────────────────────────────────────────────────────────┘
```

## 📁 File Structure Visualization

```
zoompdf/
├── src/
│   ├── app/
│   │   └── [locale]/
│   │       ├── [tool-name]/              ← 🆕 NEW DYNAMIC ROUTE
│   │       │   ├── page.tsx              ← Main handler
│   │       │   ├── templates/            ← Custom templates
│   │       │   │   ├── CompressPdfPage.tsx
│   │       │   │   └── MergePdfPage.tsx
│   │       │   └── README.md             ← Technical docs
│   │       │
│   │       ├── pdf-to-word/              ← ⚠️ Can be deleted
│   │       ├── compress-pdf/             ← ⚠️ Can be deleted
│   │       └── ...                       ← ⚠️ Other old pages
│   │
│   ├── components/
│   │   └── common/
│   │       ├── ConvertPage.tsx           ← For conversion tools
│   │       ├── ToolLandingPage.tsx       ← For tool pages
│   │       └── ...
│   │
│   ├── data/
│   │   ├── conversionConfig.ts           ← Conversion tools config
│   │   ├── toolPages.ts                  ← Tool pages config
│   │   └── tools.ts                      ← All tools list
│   │
│   └── utils/
│       ├── apiUtils.ts                   ← Conversion functions
│       ├── useCompressPdf.ts             ← Compress hook
│       └── useFileConversion.ts          ← Conversion hook
│
├── DYNAMIC_ROUTE_MIGRATION.md            ← 📚 Migration guide
├── DYNAMIC_ROUTE_IMPLEMENTATION_SUMMARY.md ← 📚 Summary
└── DYNAMIC_ROUTE_FLOW_DIAGRAM.md         ← 📚 This file
```

## 🎨 Component Hierarchy

```
DynamicToolPage (page.tsx)
│
├── ConvertPage (for conversion tools)
│   ├── Navbar
│   ├── FileUploadSection
│   ├── FeatureItems
│   ├── ProgressModal
│   ├── HowItWorks
│   ├── ToolsGrid
│   ├── FeatureCTA
│   ├── WhyUs
│   ├── FormTemplates
│   ├── CoreValues
│   ├── FAQ
│   └── Footer
│
├── ToolLandingPage (for tool pages)
│   ├── Navbar
│   ├── FileUploadSection
│   ├── FeatureItems
│   ├── HowItWorks
│   ├── ToolsGrid
│   ├── FeatureCTA
│   ├── WhyUs
│   ├── FormTemplates
│   ├── CoreValues
│   ├── FAQ
│   └── Footer
│
└── Custom Templates (for special cases)
    ├── CompressPdfPage
    │   ├── Navbar
    │   ├── FileUploadSection
    │   ├── CompressionLevelModal ← Special
    │   ├── ProgressModal
    │   ├── EmailModal
    │   └── ... (common sections)
    │
    └── MergePdfPage
        ├── Navbar
        ├── MultiFileUploadSection ← Special
        ├── Progress Modal
        └── ... (common sections)
```

## 🚦 Route Priority Order

```
Request: /en/pdf-to-word
    │
    ├─ 1. Check: /en/pdf-to-word/page.tsx (specific)
    │     └─ ✅ If exists, use this
    │
    ├─ 2. Check: /en/[tool-name]/page.tsx (dynamic)
    │     └─ ✅ If no specific route, use this
    │
    └─ 3. Check: /en/[...catchAll]/page.tsx (catch-all)
          └─ ⏭️ Skip (not applicable)

Result: Next.js prefers specific routes over dynamic ones
        This means both can coexist during migration!
```

## 📊 Performance Comparison

```
┌────────────────────┬──────────────┬──────────────┐
│                    │   Before     │    After     │
├────────────────────┼──────────────┼──────────────┤
│ Total Page Files   │     14+      │      1       │
├────────────────────┼──────────────┼──────────────┤
│ Lines of Code      │   ~700+      │    ~220      │
├────────────────────┼──────────────┼──────────────┤
│ Bundle Size        │   Larger     │   Smaller    │
├────────────────────┼──────────────┼──────────────┤
│ Maintenance        │   Hard       │   Easy       │
├────────────────────┼──────────────┼──────────────┤
│ Add New Tool       │   ~50 lines  │   ~6 lines   │
├────────────────────┼──────────────┼──────────────┤
│ Fix Bug            │   14+ places │   1 place    │
└────────────────────┴──────────────┴──────────────┘
```

## 🎯 Key Takeaways

1. **One Route, Multiple Tools**: Single dynamic route handles all tools
2. **Configuration-Driven**: Add tools by updating config files
3. **Type-Safe**: TypeScript ensures consistency
4. **Scalable**: Easy to add 100+ tools without creating files
5. **Maintainable**: Fix once, affects all tools
6. **Flexible**: Supports custom pages for special requirements

---

**Ready to use your new dynamic route structure!** 🚀
