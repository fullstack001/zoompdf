/**
 * Document preview utility functions
 * Generates previews/thumbnails for various document formats
 */

/**
 * Generate a preview thumbnail for Word documents
 * @param file - The Word document file (.doc, .docx)
 * @returns Promise<string> - Data URL of the thumbnail image
 */
export const getWordThumbnail = async (file: File): Promise<string> => {
  try {
    const arrayBuffer = await file.arrayBuffer();

    // Try to use mammoth.js to convert Word to HTML, then render to canvas
    try {
      // @ts-expect-error - mammoth is an optional dependency
      const mammoth = await import("mammoth");

      // Convert Word document to HTML
      const result = await mammoth.default.convertToHtml(
        { arrayBuffer },
        {
          styleMap: [
            "p[style-name='Heading 1'] => h1:fresh",
            "p[style-name='Heading 2'] => h2:fresh",
            "p[style-name='Heading 3'] => h3:fresh",
          ],
        }
      );

      // Create a temporary container to render HTML
      const container = document.createElement("div");
      container.style.position = "absolute";
      container.style.left = "-9999px";
      container.style.width = "816px"; // A4 width at 96 DPI
      container.style.padding = "96px"; // 1 inch margins
      container.style.backgroundColor = "#ffffff";
      container.style.fontFamily = "Times New Roman, serif";
      container.style.fontSize = "12pt";
      container.style.lineHeight = "1.5";
      container.style.color = "#000000";
      container.innerHTML = result.value;

      document.body.appendChild(container);

      // Use html2canvas to convert HTML to canvas
      try {
        // @ts-expect-error - html2canvas is an optional dependency
        const html2canvas = (await import("html2canvas")).default;

        const canvas = await html2canvas(container, {
          width: 816,
          height: Math.min(container.scrollHeight, 1056), // Limit to first page (A4 height)
          scale: 1,
          useCORS: true,
          backgroundColor: "#ffffff",
        });

        document.body.removeChild(container);

        // Return the canvas as data URL
        return canvas.toDataURL("image/png");
      } catch (html2canvasError) {
        document.body.removeChild(container);
        // If html2canvas is not available, fall back to rendering HTML directly
        throw html2canvasError;
      }
    } catch (mammothError) {
      // If mammoth is not available, try to extract content from docx directly
      console.log("Mammoth not available, trying direct docx parsing");

      // Try to parse docx as ZIP and extract document.xml
      try {
        // @ts-expect-error - jszip is an optional dependency
        const JSZip = (await import("jszip")).default;
        const zip = new JSZip();
        const docx = await zip.loadAsync(arrayBuffer);

        // Get the main document XML
        const documentXml = await docx
          .file("word/document.xml")
          ?.async("string");
        if (documentXml) {
          // Parse XML and extract text content
          const parser = new DOMParser();
          const xmlDoc = parser.parseFromString(documentXml, "text/xml");
          const textNodes = xmlDoc.getElementsByTagName("w:t");

          // Create canvas with extracted text
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          if (!ctx) {
            throw new Error("Failed to get canvas context");
          }

          canvas.width = 816;
          canvas.height = 1056;

          // Draw white background
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(0, 0, canvas.width, canvas.height);

          // Draw text content
          ctx.fillStyle = "#000000";
          ctx.font = "12pt Times New Roman";
          ctx.textBaseline = "top";

          let y = 96; // Start with 1 inch margin
          const lineHeight = 18;
          const margin = 96;
          const maxWidth = canvas.width - 2 * margin;
          const maxHeight = canvas.height - 2 * margin;

          for (
            let i = 0;
            i < Math.min(textNodes.length, 50) && y < maxHeight;
            i++
          ) {
            const text = textNodes[i].textContent || "";
            if (text.trim()) {
              // Simple word wrapping
              const words = text.split(" ");
              let line = "";

              for (const word of words) {
                const testLine = line + (line ? " " : "") + word;
                const metrics = ctx.measureText(testLine);

                if (metrics.width > maxWidth && line) {
                  ctx.fillText(line, margin, y);
                  y += lineHeight;
                  line = word;

                  if (y > maxHeight) break;
                } else {
                  line = testLine;
                }
              }

              if (line && y <= maxHeight) {
                ctx.fillText(line, margin, y);
                y += lineHeight;
              }
            }
          }

          return canvas.toDataURL("image/png");
        }
      } catch (zipError) {
        console.log("Direct docx parsing failed, using fallback");
      }
    }

    // Fallback: Create a simple canvas preview
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      throw new Error("Failed to get canvas context");
    }

    canvas.width = 816;
    canvas.height = 1056;

    // Draw white background
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw document border
    ctx.strokeStyle = "#cccccc";
    ctx.lineWidth = 1;
    ctx.strokeRect(0, 0, canvas.width, canvas.height);

    // Draw filename
    ctx.fillStyle = "#333333";
    ctx.font = "12pt Times New Roman";
    ctx.textBaseline = "top";
    ctx.fillText(file.name, 96, 96);

    return canvas.toDataURL("image/png");
  } catch (error) {
    console.error("Error generating Word thumbnail:", error);
    // Return a simple fallback preview
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      throw new Error("Failed to get canvas context");
    }
    canvas.width = 816;
    canvas.height = 1056;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#333333";
    ctx.font = "12pt Arial";
    ctx.fillText("Word Document Preview", 96, 96);
    ctx.fillText("File: " + file.name, 96, 120);
    return canvas.toDataURL("image/png");
  }
};

/**
 * Generate a preview thumbnail for Excel documents
 * @param file - The Excel file (.xls, .xlsx)
 * @returns Promise<string> - Data URL of the thumbnail image
 */
export const getExcelThumbnail = async (file: File): Promise<string> => {
  try {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      throw new Error("Failed to get canvas context");
    }

    canvas.width = 800;
    canvas.height = 600;

    // Draw spreadsheet-like preview
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw grid
    ctx.strokeStyle = "#e0e0e0";
    ctx.lineWidth = 1;
    const cellWidth = 100;
    const cellHeight = 30;
    const startX = 50;
    const startY = 50;

    for (let i = 0; i < 10; i++) {
      // Vertical lines
      ctx.beginPath();
      ctx.moveTo(startX + i * cellWidth, startY);
      ctx.lineTo(startX + i * cellWidth, startY + 10 * cellHeight);
      ctx.stroke();

      // Horizontal lines
      ctx.beginPath();
      ctx.moveTo(startX, startY + i * cellHeight);
      ctx.lineTo(startX + 9 * cellWidth, startY + i * cellHeight);
      ctx.stroke();
    }

    // Draw header row
    ctx.fillStyle = "#f0f0f0";
    ctx.fillRect(startX, startY, 9 * cellWidth, cellHeight);
    ctx.strokeStyle = "#cccccc";
    ctx.strokeRect(startX, startY, 9 * cellWidth, cellHeight);

    // Draw text
    ctx.fillStyle = "#333333";
    ctx.font = "bold 16px Arial";
    ctx.fillText("Excel Spreadsheet", startX + 10, startY + 20);
    ctx.font = "12px Arial";
    ctx.fillText("File: " + file.name, startX + 10, startY + 50);

    return canvas.toDataURL("image/png");
  } catch (error) {
    console.error("Error generating Excel thumbnail:", error);
    throw new Error("Failed to generate Excel thumbnail");
  }
};

/**
 * Generate a preview thumbnail for PowerPoint documents
 * @param file - The PowerPoint file (.ppt, .pptx)
 * @returns Promise<string> - Data URL of the thumbnail image
 */
export const getPowerPointThumbnail = async (file: File): Promise<string> => {
  try {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      throw new Error("Failed to get canvas context");
    }

    canvas.width = 800;
    canvas.height = 600;

    // Draw slide-like preview
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw slide border
    ctx.strokeStyle = "#cccccc";
    ctx.lineWidth = 3;
    ctx.strokeRect(50, 50, canvas.width - 100, canvas.height - 100);

    // Draw title area
    ctx.fillStyle = "#f8f8f8";
    ctx.fillRect(70, 70, canvas.width - 140, 80);
    ctx.strokeStyle = "#e0e0e0";
    ctx.strokeRect(70, 70, canvas.width - 140, 80);

    // Draw content
    ctx.fillStyle = "#333333";
    ctx.font = "bold 32px Arial";
    ctx.fillText("PowerPoint Slide", 100, 120);
    ctx.font = "16px Arial";
    ctx.fillText("File: " + file.name, 100, 200);

    return canvas.toDataURL("image/png");
  } catch (error) {
    console.error("Error generating PowerPoint thumbnail:", error);
    throw new Error("Failed to generate PowerPoint thumbnail");
  }
};

/**
 * Generate a preview thumbnail for EPUB files
 * Attempts to extract cover image from EPUB
 * @param file - The EPUB file
 * @returns Promise<string> - Data URL of the thumbnail image
 */
export const getEpubThumbnail = async (file: File): Promise<string> => {
  try {
    // EPUB files are ZIP archives, try to extract cover image
    // Note: This requires jszip library. If not available, falls back to default preview
    try {
      // Dynamic import with type assertion for optional dependency
      // @ts-expect-error - jszip is an optional dependency
      const jszipModule = await import("jszip").catch(() => null);
      if (!jszipModule) {
        throw new Error("jszip not available");
      }
      const JSZip = jszipModule.default;
      const arrayBuffer = await file.arrayBuffer();
      const zip = new JSZip();
      const epub = await zip.loadAsync(arrayBuffer);

      // Look for cover image in common locations
      const coverPaths = [
        "OEBPS/Images/cover.jpg",
        "OEBPS/Images/cover.png",
        "Images/cover.jpg",
        "Images/cover.png",
        "cover.jpg",
        "cover.png",
      ];

      for (const path of coverPaths) {
        const coverFile = epub.file(path);
        if (coverFile) {
          const blob = await coverFile.async("blob");
          const url = URL.createObjectURL(blob);
          const img = await loadImage(url);
          URL.revokeObjectURL(url);

          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          if (!ctx) {
            throw new Error("Failed to get canvas context");
          }

          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0);

          return canvas.toDataURL("image/png");
        }
      }
    } catch (zipError) {
      // jszip not available or extraction failed, use default preview
      console.log("EPUB cover extraction not available, using default preview");
    }

    // If no cover found, create a default preview
    return createDefaultBookPreview(file.name, "EPUB");
  } catch (error) {
    console.error("Error generating EPUB thumbnail:", error);
    // Fallback to default preview
    return createDefaultBookPreview(file.name, "EPUB");
  }
};

/**
 * Generate a preview thumbnail for MOBI files
 * @param file - The MOBI file
 * @returns Promise<string> - Data URL of the thumbnail image
 */
export const getMobiThumbnail = async (file: File): Promise<string> => {
  try {
    // MOBI files are more complex, for now create a default preview
    // In a production app, you might want to use a backend service
    return createDefaultBookPreview(file.name, "MOBI");
  } catch (error) {
    console.error("Error generating MOBI thumbnail:", error);
    return createDefaultBookPreview(file.name, "MOBI");
  }
};

/**
 * Generate a preview thumbnail for AVIF images
 * @param file - The AVIF image file
 * @returns Promise<string> - Data URL of the thumbnail image
 */
export const getAvifThumbnail = async (file: File): Promise<string> => {
  try {
    // AVIF images can be loaded directly
    const url = URL.createObjectURL(file);
    const img = await loadImage(url);
    URL.revokeObjectURL(url);

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      throw new Error("Failed to get canvas context");
    }

    // Scale down if too large
    const maxWidth = 1200;
    const maxHeight = 1200;
    let { width, height } = img;

    if (width > maxWidth || height > maxHeight) {
      const ratio = Math.min(maxWidth / width, maxHeight / height);
      width = width * ratio;
      height = height * ratio;
    }

    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(img, 0, 0, width, height);

    return canvas.toDataURL("image/png");
  } catch (error) {
    console.error("Error generating AVIF thumbnail:", error);
    throw new Error("Failed to generate AVIF thumbnail");
  }
};

/**
 * Helper function to load an image from URL
 */
const loadImage = (url: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = url;
  });
};

/**
 * Create a default book preview when cover cannot be extracted
 */
const createDefaultBookPreview = (fileName: string, format: string): string => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("Failed to get canvas context");
  }

  canvas.width = 600;
  canvas.height = 800;

  // Draw book cover-like preview
  ctx.fillStyle = "#2c3e50";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw book spine effect
  ctx.fillStyle = "#34495e";
  ctx.fillRect(0, 0, 30, canvas.height);

  // Draw title
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 32px Arial";
  ctx.textAlign = "center";
  ctx.fillText(format, canvas.width / 2, canvas.height / 2 - 50);
  ctx.font = "18px Arial";
  ctx.fillText(fileName, canvas.width / 2, canvas.height / 2 + 20);

  return canvas.toDataURL("image/png");
};
