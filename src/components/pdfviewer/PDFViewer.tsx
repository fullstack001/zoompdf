"use client";

import { useEffect, useRef } from "react";
import type PSPDFKitType from "pspdfkit";
import type { Instance } from "pspdfkit";

import "../../app/globals.css"; // Ensure global styles are imported

const TOOLBAR_ITEMS = [
  {
    type: "sidebar-thumbnails",
    icon: "sidebar-thumbnails.svg",
    label: "Thumbnails",
  },
  {
    type: "sidebar-document-outline",
    icon: "sidebar-outline.svg",
    label: "Outline",
  },
  {
    type: "sidebar-annotations",
    icon: "sidebar-annotations.svg",
    label: "Annotations",
  },
  { type: "zoom-out", icon: "zoom-out.svg", label: "Zoom Out" },
  { type: "zoom-in", icon: "zoom-in.svg", label: "Zoom In" },
  { type: "pan", icon: "pan.svg", label: "Pan" },
  { type: "text-highlighter", icon: "highlight.svg", label: "Highlight" },
  { type: "ink", icon: "ink.svg", label: "Draw" },
  { type: "line", icon: "line.svg", label: "Line" },
  { type: "arrow", icon: "arrow.svg", label: "Arrow" },
  { type: "rectangle", icon: "rectangle.svg", label: "Rectangle" },
  { type: "ellipse", icon: "ellipse.svg", label: "Ellipse" },
  { type: "polygon", icon: "polygon.svg", label: "Polygon" },
  { type: "signature", icon: "signature.svg", label: "Sign" },
  { type: "stamp", icon: "stamp.svg", label: "Stamp" },
  { type: "text", icon: "text.svg", label: "Text" },
  { type: "note", icon: "note.svg", label: "Note" },
  { type: "comment", icon: "comment.svg", label: "Comment" },
  { type: "ink-eraser", icon: "eraser.svg", label: "Eraser" },
  { type: "undo", icon: "undo.svg", label: "Undo" },
  { type: "redo", icon: "redo.svg", label: "Redo" },
  { type: "search", icon: "search.svg", label: "Search" },
  { type: "print", icon: "print.svg", label: "Print" },
  { type: "export-pdf", icon: "export.svg", label: "Export" },
  { type: "document-editor", icon: "edit.svg", label: "Edit" },
];

const PDFViewer: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

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
        document: "/test.pdf",
        baseUrl: `${window.location.origin}/pspdfkit-lib/`,
        toolbarItems: TOOLBAR_ITEMS.map((item) => ({
          type: item.type as any,
          className: `custom-icon-${item.type} text-red`,
        })),
      }).then((inst) => {
        instance = inst;
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
  }, []);

  return (
    <div className="w-full h-screen">
      <div ref={containerRef} className="w-full h-full" />
    </div>
  );
};

export default PDFViewer;
