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
  convertPdfToTxt,
  convertPdfToHtml,
  convertPdfToSvg,
  convertPdfToTiff,
  convertPdfToWebp,
  convertPdfToAvif,
  convertPdfToEps,
  convertPdfToDxf,
  convertPdfToAzw3,
  convertPdfToMobi,
  convertPdfToDoc,
  convertExcelToPdf,
  convertPptxToPdf,
  convertMobiToPdf,
  convertAvifToPdf,
  convertPngToAvif,
  convertJpgToAvif,
  convertAvifToPng,
  convertAvifToJpg,
  convertEpubToMobi,
  convertMobiToEpub,
  convertPdfOcr,
  convertPdfToImage,
  convertImageToPdf,
} from "@/utils/apiUtils";

export interface ConversionToolConfig {
  titleKey: string;
  subtitleKey: string;
  convertFunction: (file: File) => Promise<string>;
  action: string;
  acceptType?: string;
}

export const conversionTools: Record<string, ConversionToolConfig> = {
  "pdf-to-word": {
    titleKey: "toolPages.pdfToWord.title",
    subtitleKey: "toolPages.pdfToWord.subtitle",
    convertFunction: convertPdfToWord,
    action: "pdf_to_word",
  },
  "pdf-to-png": {
    titleKey: "toolPages.pdfToPng.title",
    subtitleKey: "toolPages.pdfToPng.subtitle",
    convertFunction: convertPdfToPng,
    action: "pdf_to_png",
  },
  "pdf-to-jpg": {
    titleKey: "toolPages.pdfToJpg.title",
    subtitleKey: "toolPages.pdfToJpg.subtitle",
    convertFunction: convertPdfToJpg,
    action: "pdf_to_jpg",
  },
  "pdf-to-epub": {
    titleKey: "toolPages.pdfToEpub.title",
    subtitleKey: "toolPages.pdfToEpub.subtitle",
    convertFunction: convertPdfToEpub,
    action: "pdf_to_epub",
  },
  "pdf-to-excel": {
    titleKey: "toolPages.pdfToExcel.title",
    subtitleKey: "toolPages.pdfToExcel.subtitle",
    convertFunction: convertPdfToExcel,
    action: "pdf_to_excel",
  },
  "pdf-to-pptx": {
    titleKey: "toolPages.pdfToPptx.title",
    subtitleKey: "toolPages.pdfToPptx.subtitle",
    convertFunction: convertPdfToPptx,
    action: "pdf_to_pptx",
  },
  "word-to-pdf": {
    titleKey: "toolPages.wordToPdf.title",
    subtitleKey: "toolPages.wordToPdf.subtitle",
    convertFunction: convertWordToPdf,
    action: "word_to_pdf",
    acceptType: ".docx, .doc",
  },
  "jpg-to-pdf": {
    titleKey: "toolPages.jpgToPdf.title",
    subtitleKey: "toolPages.jpgToPdf.subtitle",
    convertFunction: convertJpgToPdf,
    action: "jpg_to_pdf",
    acceptType: ".jpg, .jpeg",
  },
  "png-to-pdf": {
    titleKey: "toolPages.pngToPdf.title",
    subtitleKey: "toolPages.pngToPdf.subtitle",
    convertFunction: convertPngToPdf,
    action: "png_to_pdf",
    acceptType: ".png",
  },
  "epub-to-pdf": {
    titleKey: "toolPages.epubToPdf.title",
    subtitleKey: "toolPages.epubToPdf.subtitle",
    convertFunction: convertEpubToPdf,
    action: "epub_to_pdf",
    acceptType: ".epub",
  },
  // Additional PDF to other formats
  "pdf-to-txt": {
    titleKey: "toolPages.pdfToTxt.title",
    subtitleKey: "toolPages.pdfToTxt.subtitle",
    convertFunction: convertPdfToTxt,
    action: "pdf_to_txt",
  },
  "pdf-to-html": {
    titleKey: "toolPages.pdfToHtml.title",
    subtitleKey: "toolPages.pdfToHtml.subtitle",
    convertFunction: convertPdfToHtml,
    action: "pdf_to_html",
  },
  "pdf-to-svg": {
    titleKey: "toolPages.pdfToSvg.title",
    subtitleKey: "toolPages.pdfToSvg.subtitle",
    convertFunction: convertPdfToSvg,
    action: "pdf_to_svg",
  },
  "pdf-to-tiff": {
    titleKey: "toolPages.pdfToTiff.title",
    subtitleKey: "toolPages.pdfToTiff.subtitle",
    convertFunction: convertPdfToTiff,
    action: "pdf_to_tiff",
  },
  "pdf-to-webp": {
    titleKey: "toolPages.pdfToWebp.title",
    subtitleKey: "toolPages.pdfToWebp.subtitle",
    convertFunction: convertPdfToWebp,
    action: "pdf_to_webp",
  },
  "pdf-to-avif": {
    titleKey: "toolPages.pdfToAvif.title",
    subtitleKey: "toolPages.pdfToAvif.subtitle",
    convertFunction: convertPdfToAvif,
    action: "pdf_to_avif",
  },
  "pdf-to-eps": {
    titleKey: "toolPages.pdfToEps.title",
    subtitleKey: "toolPages.pdfToEps.subtitle",
    convertFunction: convertPdfToEps,
    action: "pdf_to_eps",
  },
  "pdf-to-dxf": {
    titleKey: "toolPages.pdfToDxf.title",
    subtitleKey: "toolPages.pdfToDxf.subtitle",
    convertFunction: convertPdfToDxf,
    action: "pdf_to_dxf",
  },
  "pdf-to-azw3": {
    titleKey: "toolPages.pdfToAzw3.title",
    subtitleKey: "toolPages.pdfToAzw3.subtitle",
    convertFunction: convertPdfToAzw3,
    action: "pdf_to_azw3",
  },
  "pdf-to-mobi": {
    titleKey: "toolPages.pdfToMobi.title",
    subtitleKey: "toolPages.pdfToMobi.subtitle",
    convertFunction: convertPdfToMobi,
    action: "pdf_to_mobi",
  },
  "pdf-to-doc": {
    titleKey: "toolPages.pdfToDoc.title",
    subtitleKey: "toolPages.pdfToDoc.subtitle",
    convertFunction: convertPdfToDoc,
    action: "pdf_to_doc",
  },
  // Additional files to PDF
  "excel-to-pdf": {
    titleKey: "toolPages.excelToPdf.title",
    subtitleKey: "toolPages.excelToPdf.subtitle",
    convertFunction: convertExcelToPdf,
    action: "excel_to_pdf",
    acceptType: ".xlsx, .xls",
  },
  "pptx-to-pdf": {
    titleKey: "toolPages.pptxToPdf.title",
    subtitleKey: "toolPages.pptxToPdf.subtitle",
    convertFunction: convertPptxToPdf,
    action: "pptx_to_pdf",
    acceptType: ".pptx, .ppt",
  },
  "mobi-to-pdf": {
    titleKey: "toolPages.mobiToPdf.title",
    subtitleKey: "toolPages.mobiToPdf.subtitle",
    convertFunction: convertMobiToPdf,
    action: "mobi_to_pdf",
    acceptType: ".mobi",
  },
  "avif-to-pdf": {
    titleKey: "toolPages.avifToPdf.title",
    subtitleKey: "toolPages.avifToPdf.subtitle",
    convertFunction: convertAvifToPdf,
    action: "avif_to_pdf",
    acceptType: ".avif",
  },
  // Image conversions
  "png-to-avif": {
    titleKey: "toolPages.pngToAvif.title",
    subtitleKey: "toolPages.pngToAvif.subtitle",
    convertFunction: convertPngToAvif,
    action: "png_to_avif",
    acceptType: ".png",
  },
  "jpg-to-avif": {
    titleKey: "toolPages.jpgToAvif.title",
    subtitleKey: "toolPages.jpgToAvif.subtitle",
    convertFunction: convertJpgToAvif,
    action: "jpg_to_avif",
    acceptType: ".jpg, .jpeg",
  },
  "avif-to-png": {
    titleKey: "toolPages.avifToPng.title",
    subtitleKey: "toolPages.avifToPng.subtitle",
    convertFunction: convertAvifToPng,
    action: "avif_to_png",
    acceptType: ".avif",
  },
  "avif-to-jpg": {
    titleKey: "toolPages.avifToJpg.title",
    subtitleKey: "toolPages.avifToJpg.subtitle",
    convertFunction: convertAvifToJpg,
    action: "avif_to_jpg",
    acceptType: ".avif",
  },
  // E-book conversions
  "epub-to-mobi": {
    titleKey: "toolPages.epubToMobi.title",
    subtitleKey: "toolPages.epubToMobi.subtitle",
    convertFunction: convertEpubToMobi,
    action: "epub_to_mobi",
    acceptType: ".epub",
  },
  "mobi-to-epub": {
    titleKey: "toolPages.mobiToEpub.title",
    subtitleKey: "toolPages.mobiToEpub.subtitle",
    convertFunction: convertMobiToEpub,
    action: "mobi_to_epub",
    acceptType: ".mobi",
  },
  // PDF tools
  "pdf-ocr": {
    titleKey: "toolPages.pdfOcr.title",
    subtitleKey: "toolPages.pdfOcr.subtitle",
    convertFunction: convertPdfOcr,
    action: "pdf_ocr",
  },
  "pdf-to-image": {
    titleKey: "toolPages.pdfToImage.title",
    subtitleKey: "toolPages.pdfToImage.subtitle",
    convertFunction: convertPdfToImage,
    action: "pdf_to_image",
  },
  "image-to-pdf": {
    titleKey: "toolPages.imageToPdf.title",
    subtitleKey: "toolPages.imageToPdf.subtitle",
    convertFunction: convertImageToPdf,
    action: "image_to_pdf",
    acceptType: ".jpg, .jpeg, .png, .gif, .bmp, .tiff, .webp",
  },
};

export const getConversionConfig = (
  toolKey: string
): ConversionToolConfig | null => {
  return conversionTools[toolKey] || null;
};
