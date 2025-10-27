export interface ToolPageConfig {
  titleKey: string;
  subtitleKey: string;
  action: string;
  route: string;
}

export const toolPages: Record<string, ToolPageConfig> = {
  home: {
    titleKey: "toolPages.home.title",
    subtitleKey: "toolPages.home.subtitle",
    action: "edit_pdf",
    route: "/",
  },
  "sign-pdf": {
    titleKey: "toolPages.signPdf.title",
    subtitleKey: "toolPages.signPdf.subtitle",
    action: "sign_pdf",
    route: "/sign-pdf",
  },
  "compress-pdf": {
    titleKey: "toolPages.compressPdf.title",
    subtitleKey: "toolPages.compressPdf.subtitle",
    action: "compress_pdf",
    route: "/compress-pdf",
  },
  "merge-pdf": {
    titleKey: "toolPages.mergePdf.title",
    subtitleKey: "toolPages.mergePdf.subtitle",
    action: "merge_pdf",
    route: "/merge-pdf",
  },
  "split-pdf": {
    titleKey: "toolPages.splitPdf.title",
    subtitleKey: "toolPages.splitPdf.subtitle",
    action: "split_pdf",
    route: "/split-pdf",
  },
  "pdf-ocr": {
    titleKey: "toolPages.pdfOcr.title",
    subtitleKey: "toolPages.pdfOcr.subtitle",
    action: "pdf_ocr",
    route: "/pdf-ocr",
  },
  "pdf-to-image": {
    titleKey: "toolPages.pdfToImage.title",
    subtitleKey: "toolPages.pdfToImage.subtitle",
    action: "pdf_to_image",
    route: "/pdf-to-image",
  },
  "image-to-pdf": {
    titleKey: "toolPages.imageToPdf.title",
    subtitleKey: "toolPages.imageToPdf.subtitle",
    action: "image_to_pdf",
    route: "/image-to-pdf",
  },
  "pdf-to-doc": {
    titleKey: "toolPages.pdfToDoc.title",
    subtitleKey: "toolPages.pdfToDoc.subtitle",
    action: "pdf_to_doc",
    route: "/pdf-to-doc",
  },
};

export const getToolPageConfig = (toolKey: string): ToolPageConfig | null => {
  return toolPages[toolKey] || null;
};
