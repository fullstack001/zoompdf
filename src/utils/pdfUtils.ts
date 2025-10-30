/**
 * PDF utility functions
 */

// Import pdfjs-dist for client-side PDF parsing
import * as pdfjsLib from "pdfjs-dist";

// Configure worker - use local worker file from node_modules
if (typeof window !== "undefined") {
  // For Next.js, we need to use the worker from public directory
  pdfjsLib.GlobalWorkerOptions.workerSrc = `/pdf.worker.min.mjs`;
}

/**
 * Get the total number of pages in a PDF file
 * @param file - The PDF file to analyze
 * @returns Promise<number> - The total number of pages
 */
export const getPdfPageCount = async (file: File): Promise<number> => {
  try {
    // Create a URL for the file
    const fileUrl = URL.createObjectURL(file);

    // Load the PDF document
    const loadingTask = pdfjsLib.getDocument(fileUrl);
    const pdf = await loadingTask.promise;

    // Get the number of pages
    const numPages = pdf.numPages;

    // Clean up the object URL
    URL.revokeObjectURL(fileUrl);

    return numPages;
  } catch (error) {
    console.error("Error getting PDF page count:", error);
    throw new Error("Failed to get PDF page count");
  }
};

/**
 * Get PDF metadata
 * @param file - The PDF file to analyze
 * @returns Promise with PDF info including page count, metadata, etc.
 */
export const getPdfInfo = async (file: File) => {
  try {
    const fileUrl = URL.createObjectURL(file);
    const loadingTask = pdfjsLib.getDocument(fileUrl);
    const pdf = await loadingTask.promise;
    const metadata = await pdf.getMetadata();

    URL.revokeObjectURL(fileUrl);

    return {
      numPages: pdf.numPages,
      metadata: metadata.info,
      fingerprints: pdf.fingerprints,
    };
  } catch (error) {
    console.error("Error getting PDF info:", error);
    throw new Error("Failed to get PDF info");
  }
};

