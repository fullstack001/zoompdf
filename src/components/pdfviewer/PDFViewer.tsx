"use client";

import { useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import type PSPDFKitType from "pspdfkit";
import type { Instance } from "pspdfkit";

import "../../app/globals.css"; // Ensure global styles are imported

export interface PDFViewerRef {
  exportPDF: () => Promise<ArrayBuffer>;
  instance: Instance | null;
}

interface PDFViewerProps {
  document?: string;
  documents?: string[];
}

const PDFViewer = forwardRef<PDFViewerRef, PDFViewerProps>(
  ({ document, documents }, ref) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const instanceRef = useRef<Instance | null>(null);

    useImperativeHandle(ref, () => ({
      exportPDF: async () => {
        if (!instanceRef.current) {
          throw new Error("PDF instance not ready");
        }
        return await instanceRef.current.exportPDF();
      },
      instance: instanceRef.current,
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

        // Determine which document(s) to load
        const primaryDocument = document || (documents && documents[0]);
        if (!primaryDocument) {
          console.error("No document provided to PDFViewer");
          return;
        }

        await PSPDFKit.load({
          container: containerRef.current as HTMLDivElement,
          document: primaryDocument,
          baseUrl: `${window.location.origin}/pspdfkit-lib/`,
        }).then((inst) => {
          instance = inst;
          instanceRef.current = inst;

          // Log info about multiple documents for future merge functionality
          if (documents && documents.length > 1) {
            console.log(
              `Loaded ${documents.length} documents for merging:`,
              documents
            );
          }
        });
      })();

      return () => {
        (async () => {
          const PSPDFKit = (await import(
            "pspdfkit"
          )) as unknown as typeof PSPDFKitType;
          if (instance && containerRef.current) {
            PSPDFKit.unload(containerRef.current);
            instanceRef.current = null;
          }
        })();
      };
    }, [document, documents]);

    return (
      <div className="w-full h-full">
        <div ref={containerRef} className="w-full h-full" />
      </div>
    );
  }
);

PDFViewer.displayName = "PDFViewer";

export default PDFViewer;
