"use client";

import { useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import type PSPDFKitType from "pspdfkit";
import type { Instance } from "pspdfkit";
import { 
  convertPdfToWord, 
  convertPdfToPng, 
  convertPdfToJpg, 
  convertPdfToExcel, 
  convertPdfToPptx 
} from "@/utils/apiUtils";

import "../../app/globals.css"; // Ensure global styles are imported
import "../../styles/pspdfkit-custom.css"; // Import custom PSPDFKit styles

export interface PDFViewerRef {
  exportPDF: () => Promise<ArrayBuffer>;
  convertToFormat: (format: string, filename: string) => Promise<string>;
  getInstance: () => Instance | null;
}

interface PDFViewerProps {
  document?: string; // URL or path to the PDF document
}

const PDFViewer = forwardRef<PDFViewerRef, PDFViewerProps>((props, ref) => {
  const { document = "/test.pdf" } = props; // Default to test.pdf if no document provided
  const containerRef = useRef<HTMLDivElement | null>(null);
  const instanceRef = useRef<Instance | null>(null);

  useImperativeHandle(ref, () => ({
    exportPDF: async () => {
      if (instanceRef.current) {
        return await instanceRef.current.exportPDF();
      }
      throw new Error("PDF instance not available");
    },
    convertToFormat: async (format: string, filename: string) => {
      if (!instanceRef.current) {
        throw new Error("PDF instance not available");
      }

      // Export the current PDF as ArrayBuffer
      const pdfBuffer = await instanceRef.current.exportPDF();
      
      // Convert ArrayBuffer to File object
      const pdfBlob = new Blob([pdfBuffer], { type: "application/pdf" });
      const pdfFile = new File([pdfBlob], `${filename}.pdf`, { type: "application/pdf" });

      // Convert based on selected format
      switch (format.toLowerCase()) {
        case "word":
          return await convertPdfToWord(pdfFile);
        case "png":
          return await convertPdfToPng(pdfFile);
        case "jpg":
          return await convertPdfToJpg(pdfFile);
        case "excel":
          return await convertPdfToExcel(pdfFile);
        case "ppt":
          return await convertPdfToPptx(pdfFile);
        case "pdf":
          // For PDF, we return the filename directly since it's already a PDF
          return `${filename}.pdf`;
        default:
          throw new Error(`Unsupported format: ${format}`);
      }
    },
    getInstance: () => instanceRef.current,
  }));

  useEffect(() => {
    let instance: Instance | null = null;

    (async () => {
      const PSPDFKit = (await import(
        "pspdfkit"
      )) as unknown as typeof PSPDFKitType;

      if (containerRef.current) {
        PSPDFKit.unload(containerRef.current);
      }

      await PSPDFKit.load({
        container: containerRef.current as HTMLDivElement,
        document: document, // Use the document prop instead of hardcoded path
        baseUrl: `${window.location.origin}/pspdfkit-lib/`,
        // Note: Theme customization is better handled through CSS custom properties
        // as shown in globals.css for more reliable styling
        // toolbarItems: TOOLBAR_ITEMS.map((item) => ({
        //   type: item.type as any,
        //   className: `custom-icon-${item.type} text-red`,
        // })),
      }).then((inst) => {
        instance = inst;
        instanceRef.current = inst;
      });
    })();

    return () => {
      (async () => {
        const PSPDFKit = (await import(
          "pspdfkit"
        )) as unknown as typeof PSPDFKitType;
        if (instance && containerRef.current) {
          PSPDFKit.unload(containerRef.current);
        }
      })();
    };
  }, [document]); // Add document as dependency to reload when it changes

  return (
    <div className="w-full h-screen">
      <div ref={containerRef} className="w-full h-full" />
    </div>
  );
});

PDFViewer.displayName = "PDFViewer";

export default PDFViewer;
