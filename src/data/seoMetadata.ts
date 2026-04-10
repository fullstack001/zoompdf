/**
 * SEO copy from PDFezy metadata guide (pdfezy-seo-metadata-v2).
 * Paths are tool slugs only; locale prefix is applied when building metadata.
 */

export type ToolSeoEntry = {
  title: string;
  description: string;
  ogDescription?: string;
  twitterDescription?: string;
};

export const homeSeo: ToolSeoEntry = {
  title: "PDFezy – Free Online PDF Converter & Editor",
  description:
    "PDFezy is a free online PDF converter and editor. Convert PDF to Word, Excel, JPG, PNG and 40+ formats. Edit, merge, split, compress, sign PDFs — no download required.",
  ogDescription:
    "Convert, edit, merge, split, compress, and sign PDFs online for free. PDFezy supports 40+ file formats — no downloads, no installs.",
  twitterDescription:
    "Convert, edit, merge, split, and sign PDFs online in seconds. 40+ supported formats. No downloads needed.",
};

export const planSeo: ToolSeoEntry = {
  title: "PDFezy Pricing – Free & Premium PDF Plans",
  description:
    "Choose a PDFezy plan that fits your needs. Start for free or upgrade to unlock unlimited conversions, priority processing, and advanced editing features.",
  ogDescription:
    "Compare PDFezy's free and premium subscription plans. Unlock unlimited PDF tools at an affordable price.",
  twitterDescription:
    "Compare PDFezy's free and premium subscription plans. Unlock unlimited PDF tools at an affordable price.",
};

export const privacyPolicySeo: ToolSeoEntry = {
  title: "Privacy Policy | PDFezy",
  description:
    "Read PDFezy's privacy policy to understand how we collect, use, and protect your personal data when using our online PDF tools.",
};

export const termsOfUseSeo: ToolSeoEntry = {
  title: "Terms of Use | PDFezy",
  description:
    "Review the terms and conditions governing your use of PDFezy's online PDF tools and services.",
};

export const toolSeoBySlug: Record<string, ToolSeoEntry> = {
  "pdf-to-word": {
    title: "PDF to Word Converter – Free Online | PDFezy",
    description:
      "Convert PDF to editable Word documents (DOCX) in seconds. Preserve formatting, fonts, and layout. Free online PDF to Word converter — no software needed.",
    ogDescription:
      "Instantly convert any PDF to a fully editable Word (.docx) file. Fast, accurate, and free.",
  },
  "pdf-to-excel": {
    title: "PDF to Excel Converter – Free Online | PDFezy",
    description:
      "Extract tables and data from PDFs into Excel spreadsheets (.xlsx) instantly. Free online PDF to Excel converter with high accuracy — no installation required.",
    ogDescription:
      "Convert PDFs to editable Excel files in seconds. Preserve table structures and data with PDFezy.",
  },
  "pdf-to-png": {
    title: "PDF to PNG Converter – Free Online | PDFezy",
    description:
      "Convert PDF files to PNG images with transparency support. High-quality, free, and browser-based. No software installation required.",
    ogDescription:
      "Convert PDFs to crisp PNG images online, free of charge, with PDFezy.",
  },
  "pdf-to-jpg": {
    title: "PDF to JPG Converter – Free Online | PDFezy",
    description:
      "Convert PDF pages to high-quality JPG images online for free. Choose your image resolution and download all pages at once. No software needed.",
    ogDescription:
      "Extract images from your PDF or convert every page to JPG instantly with PDFezy.",
  },
  "pdf-to-epub": {
    title: "PDF to EPUB Converter – Free Online | PDFezy",
    description:
      "Convert PDF files to EPUB ebooks online for free. Compatible with Kindle, Kobo, and all major e-readers. Fast and secure.",
    ogDescription:
      "Free online PDF to EPUB converter. Make your PDFs readable on any e-reader device.",
  },
  "pdf-to-mobi": {
    title: "PDF to MOBI Converter – Free Online | PDFezy",
    description:
      "Convert PDF to MOBI format for Kindle devices online, for free. Fast, browser-based, and no software required.",
    ogDescription:
      "Turn PDFs into Kindle-ready MOBI files in seconds with PDFezy.",
  },
  "pdf-to-txt": {
    title: "PDF to TXT Converter – Extract Text Online | PDFezy",
    description:
      "Extract plain text from any PDF file online. Fast, free PDF to TXT converter that preserves the readable content of your document.",
    ogDescription:
      "Quickly extract plain text from PDFs online with PDFezy. Free and no install needed.",
  },
  "pdf-to-html": {
    title: "PDF to HTML Converter – Free Online | PDFezy",
    description:
      "Convert PDF documents to clean, web-ready HTML files online for free. Retain structure and text formatting with PDFezy.",
    ogDescription:
      "Turn PDFs into HTML web pages online, instantly and for free, with PDFezy.",
  },
  "pdf-to-svg": {
    title: "PDF to SVG Converter – Free Online | PDFezy",
    description:
      "Convert PDF pages to scalable SVG vector files online for free. Perfect for graphics, illustrations, and web use. No software needed.",
    ogDescription:
      "Turn PDF pages into scalable SVG vector files instantly with PDFezy. Free and browser-based.",
  },
  "pdf-to-tiff": {
    title: "PDF to TIFF Converter – Free Online | PDFezy",
    description:
      "Convert PDF files to high-resolution TIFF images online for free. Ideal for printing and archiving. No software installation required.",
    ogDescription:
      "Convert PDFs to high-quality TIFF images online for free with PDFezy.",
  },
  "pdf-to-webp": {
    title: "PDF to WebP Converter – Free Online | PDFezy",
    description:
      "Convert PDF pages to WebP image format online for free. Smaller file sizes with great quality. Fast, secure, and browser-based.",
    ogDescription:
      "Turn PDFs into modern WebP images online, for free, with PDFezy.",
  },
  "pdf-to-avif": {
    title: "PDF to AVIF Converter – Free Online | PDFezy",
    description:
      "Convert PDF pages to AVIF image format online for free. Next-gen compression with excellent quality. No software needed.",
    ogDescription:
      "Convert PDFs to next-gen AVIF images instantly with PDFezy. Free and online.",
  },
  "pdf-to-eps": {
    title: "PDF to EPS Converter – Free Online | PDFezy",
    description:
      "Convert PDF files to EPS vector format online for free. Ideal for professional printing and graphic design workflows.",
    ogDescription:
      "Turn PDFs into EPS vector files online for free with PDFezy.",
  },
  "pdf-to-dxf": {
    title: "PDF to DXF Converter – Free Online | PDFezy",
    description:
      "Convert PDF drawings to DXF format for CAD software online for free. Fast, accurate conversion for engineering and design files.",
    ogDescription:
      "Convert PDF files to DXF for CAD use online, free of charge, with PDFezy.",
  },
  "pdf-to-azw3": {
    title: "PDF to AZW3 Converter – Free Online | PDFezy",
    description:
      "Convert PDF to AZW3 Kindle format online for free. Read your PDFs on Kindle devices with proper formatting. Fast and secure.",
    ogDescription:
      "Turn PDFs into Kindle AZW3 ebooks online for free with PDFezy.",
  },
  "word-to-pdf": {
    title: "Word to PDF Converter – Free Online | PDFezy",
    description:
      "Convert Word documents (DOC, DOCX) to PDF online for free. Preserve fonts, formatting, and images. No Microsoft Office needed.",
    ogDescription:
      "Instantly convert DOC and DOCX files to PDF with perfect formatting using PDFezy.",
  },
  "excel-to-pdf": {
    title: "Excel to PDF Converter – Free Online | PDFezy",
    description:
      "Convert Excel spreadsheets (XLS, XLSX) to PDF online for free. Keep your tables, charts, and formulas intact. No installation required.",
    ogDescription:
      "Convert XLS and XLSX spreadsheets to PDF online with PDFezy. Fast, free, and accurate.",
  },
  "pptx-to-pdf": {
    title: "PowerPoint to PDF Converter – Free Online | PDFezy",
    description:
      "Convert PowerPoint presentations (PPT, PPTX) to PDF online for free. Keep slides, images, and design intact. No software needed.",
    ogDescription:
      "Turn PPT and PPTX files into share-ready PDFs instantly with PDFezy.",
  },
  "png-to-pdf": {
    title: "PNG to PDF Converter – Free Online | PDFezy",
    description:
      "Convert PNG images to PDF documents online for free. Combine multiple PNGs into one PDF file quickly and securely.",
    ogDescription:
      "Turn PNG images into PDF documents in seconds with PDFezy. 100% free and online.",
  },
  "jpg-to-pdf": {
    title: "JPG to PDF Converter – Free Online | PDFezy",
    description:
      "Convert JPG and JPEG images to PDF online for free. Merge multiple images into a single PDF. Fast, secure, and browser-based.",
    ogDescription:
      "Combine or convert JPG images into PDF instantly with PDFezy. Free and no software needed.",
  },
  "epub-to-pdf": {
    title: "EPUB to PDF Converter – Free Online | PDFezy",
    description:
      "Convert EPUB ebooks to PDF online for free. Share and print your ebooks as PDFs on any device or platform. No software required.",
    ogDescription:
      "Turn EPUB ebook files into PDFs online for free with PDFezy.",
  },
  "mobi-to-pdf": {
    title: "MOBI to PDF Converter – Free Online | PDFezy",
    description:
      "Convert MOBI Kindle files to PDF online for free. Share your Kindle ebooks in universal PDF format. Fast and browser-based.",
    ogDescription:
      "Convert MOBI files to PDF instantly online, for free, with PDFezy.",
  },
  "avif-to-pdf": {
    title: "AVIF to PDF Converter – Free Online | PDFezy",
    description:
      "Convert AVIF images to PDF documents online for free. Fast, accurate, and secure. No software installation required.",
    ogDescription:
      "Turn AVIF images into PDF files online for free with PDFezy.",
  },
  "png-to-avif": {
    title: "PNG to AVIF Converter – Free Online | PDFezy",
    description:
      "Convert PNG images to AVIF format online for free. Reduce file size with next-gen compression while maintaining quality. No software needed.",
    ogDescription:
      "Turn PNG files into modern AVIF images online, free of charge, with PDFezy.",
  },
  "jpg-to-avif": {
    title: "JPG to AVIF Converter – Free Online | PDFezy",
    description:
      "Convert JPG images to AVIF format online for free. Achieve better compression and quality with next-gen AVIF. Fast and browser-based.",
    ogDescription:
      "Instantly convert JPG images to AVIF online for free with PDFezy.",
  },
  "avif-to-png": {
    title: "AVIF to PNG Converter – Free Online | PDFezy",
    description:
      "Convert AVIF images to PNG format online for free. Wide compatibility, lossless quality, and transparency support. No software needed.",
    ogDescription:
      "Turn AVIF files into PNG images online for free with PDFezy.",
  },
  "avif-to-jpg": {
    title: "AVIF to JPG Converter – Free Online | PDFezy",
    description:
      "Convert AVIF images to JPG format online for free. Fast conversion with great visual quality. No downloads or software needed.",
    ogDescription:
      "Convert AVIF files to JPG instantly online, for free, with PDFezy.",
  },
  "sign-pdf": {
    title: "Sign PDF Online – Free eSignature Tool | PDFezy",
    description:
      "Add your digital signature to PDF documents online for free. Draw, type, or upload your signature. Secure, legally compliant, and browser-based.",
    ogDescription:
      "Sign any PDF document online in seconds with PDFezy. No downloads, no printing required.",
  },
  "split-pdf": {
    title: "Split PDF Online – Free | PDFezy",
    description:
      "Split a PDF into multiple files or extract specific pages online for free. Choose page ranges or split by every page. Fast and secure.",
    ogDescription:
      "Extract pages or divide PDFs into separate files online, free of charge, with PDFezy.",
  },
  "compress-pdf": {
    title: "Compress PDF Online – Reduce File Size Free | PDFezy",
    description:
      "Reduce PDF file size online for free without losing quality. Fast compression that makes PDFs easier to share by email or upload.",
    ogDescription:
      "Shrink PDF files instantly with PDFezy's free online compressor. No quality loss, no software needed.",
  },
  "pdf-ocr": {
    title: "PDF OCR – Make Scanned PDFs Searchable | PDFezy",
    description:
      "Convert scanned PDFs to searchable, editable text using OCR technology. Free online OCR tool supporting multiple languages. No software needed.",
    ogDescription:
      "Use PDFezy's free OCR tool to unlock text in scanned PDFs and make them editable and searchable.",
  },
  "merge-pdf": {
    title: "Merge PDF Files Online – Free | PDFezy",
    description:
      "Combine multiple PDF files into one document online for free. Drag, drop, and reorder pages before merging. No software installation required.",
    ogDescription:
      "Join multiple PDFs into a single file in seconds with PDFezy. Free, fast, and secure.",
  },
  "pdf-to-image": {
    title: "PDF to Image Converter – Free Online | PDFezy",
    description:
      "Convert PDF pages to images online for free. Supports JPG, PNG, and more. Perfect for sharing or using PDF content as visuals.",
    ogDescription:
      "Instantly convert PDF pages to high-quality images online for free with PDFezy.",
  },
  "image-to-pdf": {
    title: "Image to PDF Converter – Free Online | PDFezy",
    description:
      "Convert any image to PDF online for free. Supports JPG, PNG, AVIF, WebP, and more. Merge multiple images into one PDF in seconds.",
    ogDescription:
      "Turn any image into a PDF instantly online for free with PDFezy. Supports all major image formats.",
  },
  "pdf-to-doc": {
    title: "PDF to DOC Converter – Free Online | PDFezy",
    description:
      "Convert PDF files to editable DOC format online for free. Compatible with Microsoft Word and all major word processors. No software needed.",
    ogDescription:
      "Convert PDFs to DOC files instantly online, for free, with PDFezy.",
  },
  "pdf-to-pptx": {
    title: "PDF to PPTX Converter – Free Online | PDFezy",
    description:
      "Convert PDF files to editable PowerPoint presentations (PPTX, PPT) online for free. Preserve slides, images, and layout. No software required.",
    ogDescription:
      "Turn PDFs into editable PowerPoint files in seconds with PDFezy. Free and browser-based.",
    twitterDescription:
      "Convert PDF to PPTX online for free with PDFezy. Fast, accurate, and secure.",
  },
  "pdf-to-ppt": {
    title: "PDF to PPT Converter – Free Online | PDFezy",
    description:
      "Convert PDF to PowerPoint (PPT / PPTX) online for free. Turn each page into slides with layout preserved—fast and secure in your browser.",
    ogDescription:
      "Convert PDF to editable PowerPoint presentations online for free with PDFezy.",
    twitterDescription:
      "Convert PDF to PPT/PPTX online for free with PDFezy. Fast and secure.",
  },
  "epub-to-mobi": {
    title: "EPUB to MOBI Converter – Free Online | PDFezy",
    description:
      "Convert EPUB ebooks to MOBI Kindle format online for free. Keep your library Kindle-friendly—fast, secure, and browser-based.",
    ogDescription:
      "Turn EPUB books into MOBI files online for free with PDFezy.",
    twitterDescription:
      "Convert EPUB to MOBI for Kindle online, free, with PDFezy.",
  },
  "mobi-to-epub": {
    title: "MOBI to EPUB Converter – Free Online | PDFezy",
    description:
      "Convert MOBI Kindle files to EPUB format online for free. Read your ebooks on more apps and e-readers with PDFezy.",
    ogDescription:
      "Convert MOBI to EPUB instantly online for free with PDFezy.",
    twitterDescription:
      "Turn MOBI files into EPUB ebooks online for free with PDFezy.",
  },
};

function prettifySlug(slug: string): string {
  return slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function getToolSeoMetadata(slug: string): ToolSeoEntry {
  const direct = toolSeoBySlug[slug];
  if (direct) return direct;
  const label = prettifySlug(slug);
  return {
    title: `${label} | PDFezy`,
    description: `Use PDFezy to ${label.toLowerCase()} online—fast, secure, and free in your browser.`,
  };
}
