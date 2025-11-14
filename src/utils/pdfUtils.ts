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

/**
 * Generate a thumbnail image of the first page of a PDF
 * @param file - The PDF file
 * @param scale - Scale factor for rendering (default: 1.5)
 * @returns Promise<string> - Data URL of the thumbnail image
 */
export const getPdfThumbnail = async (
  file: File,
  scale: number = 1.5
): Promise<string> => {
  try {
    const fileUrl = URL.createObjectURL(file);
    const loadingTask = pdfjsLib.getDocument(fileUrl);
    const pdf = await loadingTask.promise;

    // Get the first page
    const page = await pdf.getPage(1);
    const viewport = page.getViewport({ scale });

    // Create a canvas to render the page
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    if (!context) {
      throw new Error("Failed to get canvas context");
    }

    canvas.height = viewport.height;
    canvas.width = viewport.width;

    // Render the page to the canvas
    await page.render({
      canvasContext: context,
      viewport: viewport,
    }).promise;

    // Convert canvas to data URL
    const dataUrl = canvas.toDataURL("image/png");

    // Clean up
    URL.revokeObjectURL(fileUrl);

    return dataUrl;
  } catch (error) {
    console.error("Error generating PDF thumbnail:", error);
    throw new Error("Failed to generate PDF thumbnail");
  }
};
