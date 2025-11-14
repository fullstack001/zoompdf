import { useState, useEffect, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setAction,
  setFileName,
  setPendingFile,
} from "../store/slices/flowSlice";
import { RootState } from "../store/store";
import { processPendingFile } from "./processPendingFile";
import { useLocalizedNavigation } from "./navigation";

interface ConversionConfig {
  convertFunction: (file: File) => Promise<string>;
  action: string;
  acceptType?: string;
}

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

      const token = localStorage.getItem("authToken");
      if (!token) {
        setUploading(false);
        alert("Authentication token not found. Please log in again.");
        return;
      }

      try {
        const fileName = await processPendingFile(
          file,
          config.action,
          token,
          user.id,
          null, // compressionLevel
          null, // files (for merge)
          null, // splitPageRanges
          {
            onUploadProgress: (uploadProgress) => {
              setProgress(uploadProgress);
              setStatus(["Uploading file..."]);
            },
            onConverting: () => {
              setUploading(false);
              setIsConverting(true);
            },
            onDownloadProgress: (downloadProgress) => {
              setIsConverting(false);
              setIsDownloading(true);
              setDownloadProgress(downloadProgress);
            },
          }
        );

        if (fileName) {
          dispatch(setFileName(fileName));
          dispatch(setAction(config.action));
        }

        setIsDownloading(false);
        navigate("/files");
      } catch (error) {
        console.error("Error during file conversion:", error);
        setUploading(false);
        setIsConverting(false);
        setIsDownloading(false);
        alert("File conversion failed. Please try again.");
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
