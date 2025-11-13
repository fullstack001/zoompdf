import { useState, useEffect, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setAction,
  setFileName,
  setPendingFile,
} from "../store/slices/flowSlice";
import { RootState } from "../store/store";
import { downloadFile, convertFile } from "./apiUtils";
import { useLocalizedNavigation } from "./navigation";

interface ConversionConfig {
  convertFunction: (file: File) => Promise<string>;
  action: string;
  acceptType?: string;
}

// Map action to endpoint (same as in processPendingFile)
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

export const useFileConversion = (config: ConversionConfig) => {
  const dispatch = useDispatch();
  const { navigate } = useLocalizedNavigation();
  const [uploading, setUploading] = useState(false);
  const [isConverting, setIsConverting] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [status, setStatus] = useState<string[]>([]);
  const [isEmailModalVisible, setEmailModalVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [pendingFile, setPendingFileLocal] = useState<File | null>(null);
  const hasProcessedPendingFile = useRef(false);

  const subscription = useSelector(
    (state: RootState) => state.user.subscription
  );
  const auth = useSelector((state: RootState) => state.auth.isLoggedIn);
  const user = useSelector((state: RootState) => state.user);

  const processConversion = useCallback(
    async (file: File) => {
      setUploading(true);
      setStatus(["Uploading file..."]);
      setEmailModalVisible(false);

      try {
        let fileName = "";
        let convertingTriggered = false;

        // Get endpoint from action
        const endpoint = actionToEndpoint[config.action];
        if (!endpoint) {
          throw new Error(`No endpoint found for action: ${config.action}`);
        }

        // Use actual API upload progress
        fileName = await convertFile(endpoint, file, (uploadProgress) => {
          setProgress(uploadProgress);

          setStatus(["Uploading file..."]);
        });

        // Ensure converting state is shown if it wasn't triggered during upload
        if (!convertingTriggered) {
          setUploading(false);
          setIsConverting(true);
        }

        dispatch(setFileName(fileName));
        dispatch(setAction(config.action));

        // Simulate download progress
        setIsConverting(false);
        setIsDownloading(true);
        for (let i = 0; i <= 100; i += 20) {
          setDownloadProgress(i);
          await new Promise((resolve) => setTimeout(resolve, 150));
        }

        const token = localStorage.getItem("authToken");
        if (token) {
          try {
            await downloadFile(fileName, config.action, token, user.id);
            setIsDownloading(false);
            navigate("/files");
          } catch (err) {
            console.error("Error downloading file:", err);
            setIsDownloading(false);
            window.alert("Failed to download file.");
          }
        } else {
          setIsDownloading(false);
        }
      } catch (error) {
        console.error("Error during file upload:", error);
        setUploading(false);
        setIsConverting(false);
        setIsDownloading(false);
        alert("File upload failed. Please try again.");
      } finally {
        setPendingFileLocal(null);
        hasProcessedPendingFile.current = false;
      }
    },
    [config.action, dispatch, navigate, user.id]
  );

  // Process pending file when auth and subscription are ready
  useEffect(() => {
    if (
      pendingFile &&
      auth &&
      subscription &&
      new Date(subscription.expiryDate) > new Date() &&
      !hasProcessedPendingFile.current &&
      !uploading
    ) {
      hasProcessedPendingFile.current = true;
      processConversion(pendingFile);
    }
  }, [pendingFile, auth, subscription, processConversion, uploading]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Store the file in local state and Redux global state
    setPendingFileLocal(file);
    dispatch(setPendingFile({ file, action: config.action }));
    dispatch(setAction(config.action));
    hasProcessedPendingFile.current = false;

    // Check authentication first
    if (!auth) {
      // Show email modal
      setEmailModalVisible(true);
      return;
    }

    // Check subscription status
    const token = localStorage.getItem("authToken");
    const hasValidSubscription =
      subscription && new Date(subscription.expiryDate) > new Date() && token;

    if (!hasValidSubscription) {
      // Navigate to plan page, but keep pending file in Redux for when they come back
      navigate("/plan");
      return;
    }

    // User is authenticated and has valid subscription - proceed with conversion
    processConversion(file);
  };

  return {
    uploading,
    isConverting,
    isDownloading,
    progress,
    downloadProgress,
    status,
    isEmailModalVisible,
    email,
    setEmail,
    setEmailModalVisible,
    handleFileChange,
    acceptType: config.acceptType,
  };
};
