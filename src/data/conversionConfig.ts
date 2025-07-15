import {
  convertPdfToWord,
  convertPdfToPng,
  convertPdfToJpg,
  convertPdfToEpub,
  convertPdfToExcel,
  convertPdfToPptx,
  convertWordToPdf,
  convertJpgToPdf,
  convertPngToPdf,
  convertEpubToPdf,
} from "@/utils/apiUtils";

export interface ConversionToolConfig {
  title: string;
  subtitle: string;
  convertFunction: (file: File) => Promise<string>;
  action: string;
  acceptType?: string;
}

export const conversionTools: Record<string, ConversionToolConfig> = {
  "pdf-to-word": {
    title: "PDF to Word Converter",
    subtitle: "We've helped convert 775,000 files — let us help with yours",
    convertFunction: convertPdfToWord,
    action: "pdf_to_word",
  },
  "pdf-to-png": {
    title: "PDF to PNG Converter",
    subtitle: "We've already converted 775,000 files — yours could be next",
    convertFunction: convertPdfToPng,
    action: "pdf_to_png",
  },
  "pdf-to-jpg": {
    title: "PDF to JPG Converter",
    subtitle: "We've already converted 775,000 files — yours could be next",
    convertFunction: convertPdfToJpg,
    action: "pdf_to_jpg",
  },
  "pdf-to-epub": {
    title: "PDF to EPUB Converter",
    subtitle: "We've helped convert 775,000 files — let us help with yours",
    convertFunction: convertPdfToEpub,
    action: "pdf_to_epub",
  },
  "pdf-to-excel": {
    title: "PDF to Excel Converter",
    subtitle: "We've converted 775K PDFs — why not make yours the next one?",
    convertFunction: convertPdfToExcel,
    action: "pdf_to_excel",
  },
  "pdf-to-pptx": {
    title: "PDF to PPTX Converter",
    subtitle: "We've already converted 775,000 files — yours could be next",
    convertFunction: convertPdfToPptx,
    action: "pdf_to_pptx",
  },
  "word-to-pdf": {
    title: "Word to PDF Converter",
    subtitle: "We've helped convert 775,000 files — let us help with yours",
    convertFunction: convertWordToPdf,
    action: "word_to_pdf",
    acceptType: ".docx, .doc",
  },
  "jpg-to-pdf": {
    title: "JPG to PDF Converter",
    subtitle: "We've processed 75,000 JPGs so far. Let's make yours next.",
    convertFunction: convertJpgToPdf,
    action: "jpg_to_pdf",
    acceptType: ".jpg, .jpeg",
  },
  "png-to-pdf": {
    title: "PNG to PDF Converter",
    subtitle: "We've already converted 775,000 files — yours could be next",
    convertFunction: convertPngToPdf,
    action: "png_to_pdf",
    acceptType: ".png",
  },
  "epub-to-pdf": {
    title: "EPUB to PDF Converter",
    subtitle: "We've already converted 775,000 files — now let us help with yours",
    convertFunction: convertEpubToPdf,
    action: "epub_to_pdf",
    acceptType: ".epub",
  },
};

export const getConversionConfig = (toolKey: string): ConversionToolConfig | null => {
  return conversionTools[toolKey] || null;
}; 