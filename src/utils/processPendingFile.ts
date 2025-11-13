import {
  downloadFile,
  compressPdf,
  mergePdfFiles,
  splitPdfWithRanges,
  convertFile,
  convertMultipleFiles,
} from "./apiUtils";
import { conversionTools } from "@/data/conversionConfig";
import { CompressionLevel } from "@/components/common/CompressionLevelModal";

interface ProgressCallbacks {
  onUploadProgress?: (progress: number) => void;
  onConverting?: () => void;
  onDownloadProgress?: (progress: number) => void;
}

// Map action to endpoint
const actionToEndpoint: Record<string, string> = {
  pdf_to_word: "/pdf/pdf_to_word",
  pdf_to_png: "/pdf/pdf_to_png",
  pdf_to_jpg: "/pdf/pdf_to_jpg",
  pdf_to_epub: "/pdf/pdf_to_epub",
  pdf_to_excel: "/pdf/pdf_to_excel",
  pdf_to_pptx: "/pdf/pdf_to_pptx",
  word_to_pdf: "/pdf/word_to_pdf",
  jpg_to_pdf: "/pdf/jpg_to_pdf",
  png_to_pdf: "/pdf/png_to_pdf",
  epub_to_pdf: "/pdf/epub_to_pdf",
  pdf_to_txt: "/pdf/pdf_to_txt",
  pdf_to_html: "/pdf/pdf_to_html",
  pdf_to_svg: "/pdf/pdf_to_svg",
  pdf_to_tiff: "/pdf/pdf_to_tiff",
  pdf_to_webp: "/pdf/pdf_to_webp",
  pdf_to_avif: "/pdf/pdf_to_avif",
  pdf_to_eps: "/pdf/pdf_to_eps",
  pdf_to_dxf: "/pdf/pdf_to_dxf",
  pdf_to_azw3: "/pdf/pdf_to_azw3",
  pdf_to_mobi: "/pdf/pdf_to_mobi",
  pdf_to_doc: "/pdf/pdf_to_doc",
  excel_to_pdf: "/pdf/excel_to_pdf",
  pptx_to_pdf: "/pdf/pptx_to_pdf",
  mobi_to_pdf: "/pdf/mobi_to_pdf",
  avif_to_pdf: "/pdf/avif_to_pdf",
  png_to_avif: "/pdf/png_to_avif",
  jpg_to_avif: "/pdf/jpg_to_avif",
  avif_to_png: "/pdf/avif_to_png",
  avif_to_jpg: "/pdf/avif_to_jpg",
  epub_to_mobi: "/pdf/epub_to_mobi",
  mobi_to_epub: "/pdf/mobi_to_epub",
  pdf_ocr: "/pdf/pdf_ocr",
  pdf_to_image: "/pdf/pdf_to_image",
  image_to_pdf: "/pdf/image_to_pdf",
};

/**
 * Process pending file conversion or compression after user authentication and subscription
 */
export const processPendingFile = async (
  file: File | null,
  action: string,
  token: string,
  userId: string,
  compressionLevel?: number | null,
  files?: File[] | null,
  splitPageRanges?: string | null,
  callbacks?: ProgressCallbacks
): Promise<string | null> => {
  try {
    let fileName = "";

    let convertingTriggered = false;
    // Create a wrapper for upload progress that handles 100% completion
    const handleUploadProgress = (progress: number) => {
      if (callbacks?.onUploadProgress) {
        callbacks.onUploadProgress(progress);
      }
      // When upload reaches 100%, trigger converting state
      if (progress >= 100 && !convertingTriggered && callbacks?.onConverting) {
        convertingTriggered = true;
        // Small delay to ensure 100% is shown before switching to converting
        setTimeout(() => {
          callbacks.onConverting!();
        }, 500);
      }
    };

    // Handle merge_pdf with multiple files - use actual upload progress
    if (action === "merge_pdf" && files && files.length > 0) {
      fileName = await convertMultipleFiles(
        "/pdf/merge_pdf",
        files,
        handleUploadProgress
      );
    }
    // Handle split_pdf with page ranges - use actual upload progress
    else if (action === "split_pdf" && file && splitPageRanges) {
      const ranges = splitPageRanges
        .split(",")
        .map((r) => r.trim())
        .filter(Boolean);

      const pages: Array<[number, number]> = [];
      for (const r of ranges) {
        if (r.includes("-")) {
          const [s, e] = r.split("-").map((p) => parseInt(p.trim(), 10));
          const start = Math.max(1, isNaN(s) ? 1 : s);
          const end = Math.max(start, isNaN(e) ? start : e);
          pages.push([start, end]);
        } else {
          const n = parseInt(r, 10);
          const v = Math.max(1, isNaN(n) ? 1 : n);
          pages.push([v, v]);
        }
      }

      const items = JSON.stringify({ merge_flag: false, pages });
      fileName = await convertFile(
        "/pdf/pdf_split",
        file,
        handleUploadProgress,
        { items }
      );
    }
    // Handle compression separately - use actual upload progress
    else if (action === "compress_pdf" && file && compressionLevel) {
      fileName = await convertFile(
        "/pdf/compress_pdf",
        file,
        handleUploadProgress,
        { level: compressionLevel }
      );
      // Extract filename from response if needed
      fileName = (fileName as any).file || fileName;
    }
    // Handle regular conversions - use actual upload progress
    else if (file) {
      const endpoint = actionToEndpoint[action];
      if (!endpoint) {
        throw new Error(`No endpoint found for action: ${action}`);
      }
      fileName = await convertFile(endpoint, file, handleUploadProgress);
    } else {
      throw new Error("No file or files provided for processing");
    }

    // Ensure converting state is shown if it wasn't triggered during upload
    // (fallback for cases where progress might not reach exactly 100%)
    if (callbacks?.onConverting && !convertingTriggered) {
      callbacks.onConverting();
    }

    // Simulate download progress
    if (callbacks?.onDownloadProgress) {
      for (let i = 0; i <= 100; i += 20) {
        callbacks.onDownloadProgress(i);
        await new Promise((resolve) => setTimeout(resolve, 150));
      }
    }

    // Download the file
    await downloadFile(fileName, action, token, userId);
    return fileName;
  } catch (error) {
    console.error("Error processing pending file:", error);
    throw error;
  }
};
