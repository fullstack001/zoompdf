import axios, { AxiosResponse, AxiosError } from "axios";

// Types and interfaces
export interface User {
  email: string;
  name?: string;
  _id: string;
  cardnumber?: string; // Add cardnumber property
  avatar?: string;
  isAdmin: boolean;
}

export interface Subscription {
  subscriptionId: string;
  plan: string;
  subscriptionType: string;
  subscribedDate: string;
  expiryDate: string;
}

export interface AuthResponse {
  token: string;
  user: User;
  subscription?: Subscription;
}

export interface FileData {
  fileName: string;
  action: string;
}

export interface SubscriptionData {
  email: string;
  plan: string;
  subscriptionId: string;
  subscriptionType: string;
}

// Base API configuration
const API_BASE_URL = "https://api.pdfezy.com/api";

// Create axios instance with base configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  // Support large file uploads (500MB)
  maxContentLength: 500 * 1024 * 1024, // 500MB in bytes
  maxBodyLength: 500 * 1024 * 1024, // 500MB in bytes
});

// Helper function to get auth token
const getAuthToken = (): string | null => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("authToken");
  }
  return null;
};

// Helper function to get auth headers
// const getAuthHeaders = (): Record<string, string> => {
//   const token = getAuthToken();
//   return {
//     'Content-Type': 'application/json',
//     ...(token && { Authorization: `Bearer ${token}` }),
//   };
// };

// Authentication API functions
export const loginUser = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  try {
    const response: AxiosResponse<AuthResponse> = await api.post(
      "/auth/login",
      {
        email,
        password,
      }
    );
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<{
      message?: string;
      error?: string;
      msg?: string;
    }>;
    const responseData = axiosError.response?.data;
    const statusCode = axiosError.response?.status;

    // Try to get error message from different possible fields (msg, message, error)
    let errorMessage =
      responseData?.msg ||
      responseData?.message ||
      responseData?.error ||
      axiosError.message ||
      "Login failed";

    // Add status code info to help with error parsing
    const errorWithStatus = new Error(errorMessage);
    (errorWithStatus as any).statusCode = statusCode;
    (errorWithStatus as any).responseData = responseData;
    throw errorWithStatus;
  }
};

export const registerEmail = async (
  email: string
): Promise<AuthResponse & { statusCode?: number }> => {
  try {
    const response: AxiosResponse<AuthResponse> = await api.post(
      "/auth/register-email",
      {
        email,
      }
    );
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<{
      msg?: string;
      message?: string;
      user?: User;
    }>;
    const status = axiosError.response?.status;

    if (status === 409) {
      // Email already exists with subscription - return user data
      return {
        token: "",
        user: {
          email,
          _id: "",
          name: "",
          cardnumber: "",
          avatar: "",
          isAdmin: false,
        },
        statusCode: 409,
      };
    } else if (status === 400) {
      // Bad request - email already exists without subscription - return user data
      if (axiosError.response?.data?.user) {
        return {
          token: "", // No token for existing users
          user: axiosError.response.data.user,
          statusCode: 400,
        };
      }
      const errorMessage = "400";
      throw new Error(errorMessage);
    } else {
      // Other errors
      const errorMessage =
        axiosError.response?.data?.msg ||
        axiosError.response?.data?.message ||
        "Registration failed";
      throw new Error(errorMessage);
    }
  }
};

export const forgotPassword = async (email: string): Promise<void> => {
  try {
    await api.post("/auth/forgot-password", { email });
  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string }>;
    const errorMessage =
      axiosError.response?.data?.message || "Failed to send reset email";
    throw new Error(errorMessage);
  }
};

export const resetPassword = async (
  token: string,
  password: string
): Promise<void> => {
  try {
    await api.post("/auth/reset-password", { token, password });
  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string }>;
    const errorMessage =
      axiosError.response?.data?.message || "Failed to reset password";
    throw new Error(errorMessage);
  }
};

// File management API functions
export const getFiles = async (): Promise<any[]> => {
  try {
    const token = getAuthToken();
    const response: AxiosResponse<any[]> = await api.get("/pdf/files", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch files", { cause: error });
  }
};

export const downloadFile = async (
  fileName: string,
  action: string,
  token: string,
  user: string
) => {
  try {
    // Validate fileName is a non-empty string
    if (!fileName || typeof fileName !== "string" || fileName.trim() === "") {
      throw new Error(`Invalid fileName provided: ${JSON.stringify(fileName)}`);
    }

    const response = await fetch(`https://api.pdfezy.com/api/pdf/download`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ fileName, action, user }),
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => "Unknown error");
      console.error(
        `Download failed with status ${response.status}:`,
        errorText
      );
      throw new Error(
        `Failed to download file: ${response.status} ${response.statusText}`
      );
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;

    // Remove _time from the filename
    const sanitizedFileName = fileName.replace(/_\d+/, "");
    a.download = sanitizedFileName;

    document.body.appendChild(a);
    a.click();
    a.remove();
  } catch (err) {
    console.error("Error downloading file:", err);
    const errorMessage =
      err instanceof Error ? err.message : "Failed to download file.";
    window.alert(errorMessage);
    throw err; // Re-throw to allow caller to handle
  }
};

export const uploadEditedPDF = async (
  pdfFile: File,
  onProgress?: (progress: number) => void
): Promise<any> => {
  const uploadStartTime = Date.now();

  try {
    console.log(
      "╔═══════════════════════════════════════════════════════════════╗"
    );
    console.log(
      "║              STARTING PDF UPLOAD (Edit Mode)                 ║"
    );
    console.log(
      "╚═══════════════════════════════════════════════════════════════╝"
    );
    console.log("[API UPLOAD] Upload initiated at:", new Date().toISOString());
    console.log("[API UPLOAD] File details:");
    console.log(`  ├─ Name: ${pdfFile.name}`);
    console.log(
      `  ├─ Size: ${(pdfFile.size / 1024 / 1024).toFixed(2)} MB (${
        pdfFile.size
      } bytes)`
    );
    console.log(`  ├─ Type: ${pdfFile.type}`);
    console.log(`  └─ Endpoint: /pdf/pdf_upload`);

    const formData = new FormData();
    formData.append("pdf", pdfFile);

    let lastProgressLog = 0;
    let lastLoaded = 0;
    let lastTime = Date.now();
    let uploadSpeed = 0;

    const response: AxiosResponse<any> = await api.post(
      "/pdf/pdf_upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const progress = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            const currentTime = Date.now();
            const timeDiff = currentTime - lastTime;

            // Calculate upload speed (bytes per second)
            if (timeDiff > 0) {
              uploadSpeed =
                ((progressEvent.loaded - lastLoaded) / timeDiff) * 1000;
              lastLoaded = progressEvent.loaded;
              lastTime = currentTime;
            }

            // Call progress callback
            if (onProgress) {
              onProgress(progress);
            }

            // Log progress every 1% or at completion
            if (progress >= lastProgressLog + 1 || progress === 100) {
              const uploadedMB = (progressEvent.loaded / 1024 / 1024).toFixed(
                2
              );
              const totalMB = (progressEvent.total / 1024 / 1024).toFixed(2);
              const speedMBps = (uploadSpeed / 1024 / 1024).toFixed(2);
              const elapsedTime = (
                (Date.now() - uploadStartTime) /
                1000
              ).toFixed(1);

              console.log(`[API UPLOAD] Upload progress: ${progress}%`);
              console.log(`  ├─ Uploaded: ${uploadedMB} MB / ${totalMB} MB`);
              console.log(`  ├─ Speed: ${speedMBps} MB/s`);
              console.log(`  └─ Elapsed: ${elapsedTime}s`);

              lastProgressLog = progress;
            }
          }
        },
      }
    );

    const totalTime = Date.now() - uploadStartTime;
    console.log(
      "╔═══════════════════════════════════════════════════════════════╗"
    );
    console.log(
      "║              PDF UPLOAD SUCCESSFUL (Edit Mode)               ║"
    );
    console.log(
      "╚═══════════════════════════════════════════════════════════════╝"
    );
    console.log("[API UPLOAD] Upload statistics:");
    console.log(`  ├─ Total time: ${(totalTime / 1000).toFixed(2)}s`);
    console.log(
      `  ├─ Average speed: ${(pdfFile.size / totalTime / 1024).toFixed(
        2
      )} KB/ms`
    );
    console.log(`  └─ Response:`, response.data);
    console.log(
      "═══════════════════════════════════════════════════════════════"
    );

    return response.data;
  } catch (error) {
    const totalTime = Date.now() - uploadStartTime;
    console.error(
      "╔═══════════════════════════════════════════════════════════════╗"
    );
    console.error(
      "║              PDF UPLOAD FAILED (Edit Mode)                   ║"
    );
    console.error(
      "╚═══════════════════════════════════════════════════════════════╝"
    );
    console.error(
      "[API UPLOAD ERROR] Time elapsed:",
      (totalTime / 1000).toFixed(2),
      "s"
    );
    console.error("[API UPLOAD ERROR] Details:", error);
    console.error(
      "═══════════════════════════════════════════════════════════════"
    );
    throw error;
  }
};

export const deletePdfByFileName = async (fileName: string): Promise<void> => {
  try {
    const token = getAuthToken();
    if (!token) {
      throw new Error("Authentication token not found");
    }

    const response: AxiosResponse<void> = await api.delete(
      `/pdf/delete-by-filename/${fileName}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to delete PDF", { cause: error });
  }
};

// File conversion API functions
export const convertFile = async (
  endpoint: string,
  file: File,
  onUploadProgress?: (progress: number) => void,
  additionalData?: Record<string, any>
): Promise<string> => {
  const uploadStartTime = Date.now();

  try {
    console.log("=== STARTING FILE CONVERSION UPLOAD ===");
    console.log("[CONVERSION] Upload initiated at:", new Date().toISOString());
    console.log("[CONVERSION] File details:");
    console.log(`  - Name: ${file.name}`);
    console.log(
      `  - Size: ${(file.size / 1024 / 1024).toFixed(2)} MB (${
        file.size
      } bytes)`
    );
    console.log(`  - Type: ${file.type}`);
    console.log(`  - Endpoint: ${endpoint}`);

    if (additionalData) {
      console.log(`  - Additional data:`, additionalData);
    }

    const formData = new FormData();
    formData.append("files", file);

    // Add additional data if provided
    if (additionalData) {
      Object.entries(additionalData).forEach(([key, value]) => {
        formData.append(key, value);
      });
    }

    let lastProgressLog = 0;
    let lastLoaded = 0;
    let lastTime = Date.now();
    let uploadSpeed = 0;

    const response: AxiosResponse<string> = await api.post(endpoint, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: (progressEvent) => {
        if (progressEvent.total) {
          const progress = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          const currentTime = Date.now();
          const timeDiff = currentTime - lastTime;

          // Calculate upload speed (bytes per second)
          if (timeDiff > 0) {
            uploadSpeed =
              ((progressEvent.loaded - lastLoaded) / timeDiff) * 1000;
            lastLoaded = progressEvent.loaded;
            lastTime = currentTime;
          }

          // Call progress callback
          if (onUploadProgress) {
            onUploadProgress(progress);
          }

          // Log progress every 1% or at completion
          if (progress >= lastProgressLog + 1 || progress === 100) {
            const uploadedMB = (progressEvent.loaded / 1024 / 1024).toFixed(2);
            const totalMB = (progressEvent.total / 1024 / 1024).toFixed(2);
            const speedMBps = (uploadSpeed / 1024 / 1024).toFixed(2);
            const elapsedTime = ((Date.now() - uploadStartTime) / 1000).toFixed(
              1
            );

            console.log(`[CONVERSION] Upload progress: ${progress}%`);
            console.log(`  ├─ Uploaded: ${uploadedMB} MB / ${totalMB} MB`);
            console.log(`  ├─ Speed: ${speedMBps} MB/s`);
            console.log(`  └─ Elapsed: ${elapsedTime}s`);

            lastProgressLog = progress;
          }
        }
      },
    });

    const totalTime = Date.now() - uploadStartTime;
    console.log("=== FILE CONVERSION UPLOAD SUCCESSFUL ===");
    console.log("[CONVERSION] Upload statistics:");
    console.log(`  - Total time: ${(totalTime / 1000).toFixed(2)}s`);
    console.log(
      `  - Average speed: ${(file.size / totalTime / 1024).toFixed(2)} KB/ms`
    );
    console.log(`  - Response data:`, response.data);
    console.log("==========================================");

    return response.data;
  } catch (error) {
    const totalTime = Date.now() - uploadStartTime;
    console.error("FILE CONVERSION UPLOAD FAILED");
    console.error("[CONVERSION ERROR] Endpoint:", endpoint);
    console.error(
      "[CONVERSION ERROR] Time elapsed:",
      (totalTime / 1000).toFixed(2),
      "s"
    );
    console.error("[CONVERSION ERROR] Details:", error);

    // Extract meaningful error message
    const axiosError = error as any;
    let errorMessage = "File conversion failed";

    if (axiosError.response) {
      // Server responded with error status
      errorMessage = `Server error: ${axiosError.response.status} - ${
        axiosError.response.data?.error || axiosError.response.statusText
      }`;
    } else if (axiosError.request) {
      // Request was made but no response received
      errorMessage = "No response from server. Please check your connection.";
    } else if (axiosError.message) {
      // Error setting up request
      errorMessage = axiosError.message;
    }

    throw new Error(errorMessage, { cause: error });
  }
};

// Multi-file conversion upload (for merge, etc.)
export const convertMultipleFiles = async (
  endpoint: string,
  files: File[],
  onUploadProgress?: (progress: number) => void,
  additionalData?: Record<string, any>
): Promise<string> => {
  const uploadStartTime = Date.now();

  try {
    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));

    if (additionalData) {
      Object.entries(additionalData).forEach(([key, value]) => {
        formData.append(key, value);
      });
    }

    const response: AxiosResponse<string> = await api.post(endpoint, formData, {
      headers: { "Content-Type": "multipart/form-data" },
      onUploadProgress: (progressEvent) => {
        if (onUploadProgress && progressEvent.total) {
          const progress = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          onUploadProgress(progress);
        }
      },
    });

    return response.data as unknown as string;
  } catch (error) {
    const totalTime = Date.now() - uploadStartTime;
    console.error("[CONVERSION ERROR] Multi-file endpoint:", endpoint);
    console.error(
      "[CONVERSION ERROR] Time elapsed:",
      (totalTime / 1000).toFixed(2),
      "s"
    );
    console.error("[CONVERSION ERROR] Details:", error);
    throw new Error("Multi-file conversion failed", { cause: error });
  }
};

// Specific conversion functions
export const convertJpgToPdf = async (file: File): Promise<string> => {
  return convertFile("/pdf/jpg_to_pdf", file);
};

export const convertWordToPdf = async (file: File): Promise<string> => {
  return convertFile("/pdf/word_to_pdf", file);
};

export const convertPdfToWord = async (
  file: File,
  onUploadProgress?: (progress: number) => void
): Promise<string> => {
  return convertFile("/pdf/pdf_to_word", file, onUploadProgress);
};

export const convertPdfToPng = async (file: File): Promise<string> => {
  return convertFile("/pdf/pdf_to_png", file);
};

export const convertPngToPdf = async (file: File): Promise<string> => {
  return convertFile("/pdf/png_to_pdf", file);
};

export const convertPdfToPptx = async (file: File): Promise<string> => {
  return convertFile("/pdf/pdf_to_pptx", file);
};

export const convertPdfToJpg = async (file: File): Promise<string> => {
  return convertFile("/pdf/pdf_to_jpg", file);
};

export const convertPdfToExcel = async (file: File): Promise<string> => {
  return convertFile("/pdf/pdf_to_excel", file);
};

export const convertPdfToEpub = async (file: File): Promise<string> => {
  return convertFile("/pdf/pdf_to_epub", file);
};

export const convertEpubToPdf = async (file: File): Promise<string> => {
  return convertFile("/pdf/epub_to_pdf", file);
};

// Additional PDF conversion functions
export const convertPdfToTxt = async (file: File): Promise<string> => {
  return convertFile("/pdf/pdf_to_txt", file);
};

export const convertPdfToHtml = async (file: File): Promise<string> => {
  return convertFile("/pdf/pdf_to_html", file);
};

export const convertPdfToSvg = async (file: File): Promise<string> => {
  return convertFile("/pdf/pdf_to_svg", file);
};

export const convertPdfToTiff = async (file: File): Promise<string> => {
  return convertFile("/pdf/pdf_to_tiff", file);
};

export const convertPdfToWebp = async (file: File): Promise<string> => {
  return convertFile("/pdf/pdf_to_webp", file);
};

export const convertPdfToAvif = async (file: File): Promise<string> => {
  return convertFile("/pdf/pdf_to_avif", file);
};

export const convertPdfToEps = async (file: File): Promise<string> => {
  return convertFile("/pdf/pdf_to_eps", file);
};

export const convertPdfToDxf = async (file: File): Promise<string> => {
  return convertFile("/pdf/pdf_to_dxf", file);
};

export const convertPdfToAzw3 = async (file: File): Promise<string> => {
  return convertFile("/pdf/pdf_to_azw3", file);
};

export const convertPdfToMobi = async (file: File): Promise<string> => {
  return convertFile("/pdf/pdf_to_mobi", file);
};

export const convertPdfToDoc = async (file: File): Promise<string> => {
  return convertFile("/pdf/pdf_to_doc", file);
};

// Additional file to PDF conversion functions
export const convertExcelToPdf = async (file: File): Promise<string> => {
  return convertFile("/pdf/excel_to_pdf", file);
};

export const convertPptxToPdf = async (file: File): Promise<string> => {
  return convertFile("/pdf/pptx_to_pdf", file);
};

export const convertMobiToPdf = async (file: File): Promise<string> => {
  return convertFile("/pdf/mobi_to_pdf", file);
};

export const convertAvifToPdf = async (file: File): Promise<string> => {
  return convertFile("/pdf/avif_to_pdf", file);
};

// Image conversion functions
export const convertPngToAvif = async (file: File): Promise<string> => {
  return convertFile("/pdf/png_to_avif", file);
};

export const convertJpgToAvif = async (file: File): Promise<string> => {
  return convertFile("/pdf/jpg_to_avif", file);
};

export const convertAvifToPng = async (file: File): Promise<string> => {
  return convertFile("/pdf/avif_to_png", file);
};

export const convertAvifToJpg = async (file: File): Promise<string> => {
  return convertFile("/pdf/avif_to_jpg", file);
};

// E-book conversion functions
export const convertEpubToMobi = async (file: File): Promise<string> => {
  return convertFile("/pdf/epub_to_mobi", file);
};

export const convertMobiToEpub = async (file: File): Promise<string> => {
  return convertFile("/pdf/mobi_to_epub", file);
};

// PDF tools functions
export const convertPdfOcr = async (file: File): Promise<string> => {
  return convertFile("/pdf/pdf_ocr", file);
};

export const convertPdfToImage = async (file: File): Promise<string> => {
  return convertFile("/pdf/pdf_to_image", file);
};

export const convertImageToPdf = async (file: File): Promise<string> => {
  return convertFile("/pdf/image_to_pdf", file);
};

export const compressPdf = async (
  file: File,
  compressionLevel: number
): Promise<string> => {
  const response = await convertFile("/pdf/compress_pdf", file, undefined, {
    level: compressionLevel,
  });
  // Extract just the filename from the response object
  return (response as any).file;
};

// Merge PDFs (multi-file) via backend
export const mergePdfFiles = async (files: File[]): Promise<string> => {
  const response = await convertMultipleFiles("/pdf/merge_pdf", files);
  // Extract just the filename from the response object (similar to compressPdf)
  if (typeof response === "string") {
    return response;
  }
  // Handle object response with file property
  if (response && typeof response === "object" && (response as any).file) {
    return (response as any).file;
  }
  // Fallback: try to stringify if it's an object, otherwise return as-is
  throw new Error("Failed to extract filename from merge response");
};

// Split PDF via backend with page ranges
export const splitPdfWithRanges = async (
  file: File,
  pageRanges: string
): Promise<string> => {
  // Build items payload expected by backend: { merge_flag, pages: [[start,end], ...] }
  const ranges = pageRanges
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
  return convertFile("/pdf/pdf_split", file, undefined, { items });
};

// Subscription API functions
export const addSubscription = async (
  subscriptionData: SubscriptionData
): Promise<AuthResponse> => {
  try {
    const response: AxiosResponse<AuthResponse> = await api.post(
      "/subscription/add-subscription",
      subscriptionData
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to add subscription", { cause: error });
  }
};

export const createCheckoutSession = async (
  priceId: string
): Promise<{ url: string }> => {
  try {
    const response: AxiosResponse<{ url: string }> = await api.post(
      "/create-checkout-session",
      { priceId }
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to create checkout session", { cause: error });
  }
};

export const cancelSubscription = async (
  subscriptionId: string,
  email: string
): Promise<void> => {
  try {
    await api.post("/subscription/cancel-subscription", {
      subscriptionId,
      email,
    });
  } catch (error) {
    throw new Error("Failed to cancel subscription", { cause: error });
  }
};

export const createStripeSubscription = async (
  paymentMethodId: string,
  name: string,
  email: string,
  priceId: string
): Promise<{ subscriptionId: string; error?: any }> => {
  try {
    const response: AxiosResponse<{ subscriptionId: string; error?: any }> =
      await api.post("/subscription/create-stripe-subscription", {
        paymentMethodId,
        name,
        email,
        priceId,
      });
    return response.data;
  } catch (error) {
    throw new Error("Failed to create stripe subscription", { cause: error });
  }
};

export const getSavedPdfUrl = (base64Data: string): string => {
  return base64Data; // base64 data can be used directly as URL
};

export const base64ToBlob = (base64Data: string): Blob => {
  const byteCharacters = atob(base64Data.split(",")[1]);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  return new Blob([byteArray], { type: "application/pdf" });
};
