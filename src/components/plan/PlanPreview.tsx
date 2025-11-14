"use client";
import Image from "next/image";
import { Check } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useState, useEffect, useRef } from "react";
import { getPdfThumbnail } from "@/utils/pdfUtils";
import {
  getWordThumbnail,
  getExcelThumbnail,
  getPowerPointThumbnail,
  getEpubThumbnail,
  getMobiThumbnail,
  getAvifThumbnail,
} from "@/utils/documentPreviewUtils";

// Helper function to extract target format from action
const getTargetFormat = (action: string | null): string => {
  if (!action) return "PDF";

  // Extract target format from action string (e.g., "pdf_to_word" -> "WORD", "word_to_pdf" -> "PDF")
  const parts = action.split("_to_");
  if (parts.length === 2) {
    const target = parts[1].toUpperCase();
    // Handle special cases
    if (target === "PNG" || target === "JPG" || target === "JPEG")
      return target;
    if (target === "WORD" || target === "DOC") return "WORD";
    if (target === "EXCEL" || target === "XLS") return "EXCEL";
    if (target === "PPTX" || target === "PPT") return "PPTX";
    if (target === "PDF") return "PDF";
    return target;
  }

  return "PDF";
};

// Helper function to check if file is an image
const isImageFile = (file: File): boolean => {
  const imageTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/gif",
    "image/webp",
    "image/bmp",
    "image/tiff",
  ];
  return imageTypes.includes(file.type.toLowerCase());
};

// Helper function to check if file is a PDF
const isPdfFile = (file: File): boolean => {
  return (
    file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf")
  );
};

// Helper function to check if file is a Word document
const isWordFile = (file: File): boolean => {
  const name = file.name.toLowerCase();
  return (
    file.type ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
    file.type === "application/msword" ||
    name.endsWith(".docx") ||
    name.endsWith(".doc")
  );
};

// Helper function to check if file is an Excel document
const isExcelFile = (file: File): boolean => {
  const name = file.name.toLowerCase();
  return (
    file.type ===
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
    file.type === "application/vnd.ms-excel" ||
    name.endsWith(".xlsx") ||
    name.endsWith(".xls")
  );
};

// Helper function to check if file is a PowerPoint document
const isPowerPointFile = (file: File): boolean => {
  const name = file.name.toLowerCase();
  return (
    file.type ===
      "application/vnd.openxmlformats-officedocument.presentationml.presentation" ||
    file.type === "application/vnd.ms-powerpoint" ||
    name.endsWith(".pptx") ||
    name.endsWith(".ppt")
  );
};

// Helper function to check if file is an EPUB
const isEpubFile = (file: File): boolean => {
  const name = file.name.toLowerCase();
  return file.type === "application/epub+zip" || name.endsWith(".epub");
};

// Helper function to check if file is a MOBI
const isMobiFile = (file: File): boolean => {
  const name = file.name.toLowerCase();
  return (
    file.type === "application/x-mobipocket-ebook" ||
    name.endsWith(".mobi") ||
    name.endsWith(".azw3")
  );
};

// Helper function to check if file is an AVIF image
const isAvifFile = (file: File): boolean => {
  return (
    file.type === "image/avif" || file.name.toLowerCase().endsWith(".avif")
  );
};

export default function PlanPreview() {
  const action = useSelector((state: RootState) => state.flow.action);
  const pendingFile = useSelector((state: RootState) => state.flow.pendingFile);
  const targetFormat = getTargetFormat(action);
  const [previewSrc, setPreviewSrc] = useState<string>(
    "/assets/images/sample-pdf.png"
  );
  const objectUrlRef = useRef<string | null>(null);

  useEffect(() => {
    // Cleanup previous object URL if it exists
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    }

    const generatePreview = async () => {
      if (!pendingFile) {
        setPreviewSrc("/assets/images/sample-pdf.png");
        return;
      }

      try {
        if (isPdfFile(pendingFile)) {
          // Generate PDF thumbnail
          const thumbnail = await getPdfThumbnail(pendingFile, 1.5);
          setPreviewSrc(thumbnail);
        } else if (isWordFile(pendingFile)) {
          // Generate Word document thumbnail
          const thumbnail = await getWordThumbnail(pendingFile);
          setPreviewSrc(thumbnail);
        } else if (isExcelFile(pendingFile)) {
          // Generate Excel document thumbnail
          const thumbnail = await getExcelThumbnail(pendingFile);
          setPreviewSrc(thumbnail);
        } else if (isPowerPointFile(pendingFile)) {
          // Generate PowerPoint document thumbnail
          const thumbnail = await getPowerPointThumbnail(pendingFile);
          setPreviewSrc(thumbnail);
        } else if (isEpubFile(pendingFile)) {
          // Generate EPUB thumbnail
          const thumbnail = await getEpubThumbnail(pendingFile);
          setPreviewSrc(thumbnail);
        } else if (isMobiFile(pendingFile)) {
          // Generate MOBI thumbnail
          const thumbnail = await getMobiThumbnail(pendingFile);
          setPreviewSrc(thumbnail);
        } else if (isAvifFile(pendingFile)) {
          // Generate AVIF thumbnail
          const thumbnail = await getAvifThumbnail(pendingFile);
          setPreviewSrc(thumbnail);
        } else if (isImageFile(pendingFile)) {
          // Use object URL for other image files
          const url = URL.createObjectURL(pendingFile);
          objectUrlRef.current = url;
          setPreviewSrc(url);
        } else {
          // For other formats, use default image
          setPreviewSrc("/assets/images/sample-pdf.png");
        }
      } catch (error) {
        console.error("Error generating preview:", error);
        setPreviewSrc("/assets/images/sample-pdf.png");
      }
    };

    generatePreview();

    // Cleanup object URL on unmount or when file changes
    return () => {
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
        objectUrlRef.current = null;
      }
    };
  }, [pendingFile]);

  return (
    <div className="flex-1 bg-white w-full rounded-xl shadow-md overflow-hidden">
      {/* Banner */}
      <div className="bg-[#FFE3BB] flex items-center justify-center text-xs md:text-sm py-2">
        <div className="mr-2 rounded-full bg-red-600 text-white p-1">
          <Check size={10} className="md:w-3 md:h-3" />
        </div>
        Your document is ready!
      </div>

      <div className="bg-[#DBE1FF] px-4 md:px-6 py-4 md:py-6 relative flex items-center justify-center h-[300px] md:h-[600px]">
        <div className="absolute top-4 md:top-8 left-4 md:left-8 z-10 bg-red-600 text-white text-sm md:text-lg px-3 md:px-5 py-1 rounded font-bold shadow">
          {targetFormat}
        </div>
        {previewSrc.startsWith("data:") || previewSrc.startsWith("blob:") ? (
          // Use regular img tag for data URLs and blob URLs (from object URLs)
          <img
            src={previewSrc}
            alt="Document Preview"
            className="rounded-lg shadow-sm max-w-full max-h-full w-auto h-auto object-contain"
            style={{ maxHeight: "100%" }}
          />
        ) : (
          // Use Next.js Image component for static assets
          <Image
            src={previewSrc}
            alt="Document Preview"
            width={360}
            height={0}
            className="mx-auto rounded-lg shadow-sm max-w-full max-h-full w-auto h-auto object-contain"
            style={{ maxHeight: "100%", height: "auto" }}
          />
        )}
      </div>

      {/* Review rating */}
      <div className="bg-gray-50 py-3 text-center border-t border-gray-200">
        <p className="text-xs md:text-sm text-gray-800 font-medium">
          <span className="font-medium">Excellent</span>{" "}
          <span className="text-green-500 text-base md:text-lg">★★★★★</span>{" "}
          <span className="">based on 3,112 reviews</span>
        </p>
      </div>
    </div>
  );
}
