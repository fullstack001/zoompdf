import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setAction,
  setFileName,
  setPendingFile,
} from "../store/slices/flowSlice";
import { RootState } from "../store/store";
import { downloadFile, compressPdf } from "./apiUtils";
import { CompressionLevel } from "@/components/common/CompressionLevelModal";
import { useLocalizedNavigation } from "./navigation";

export const useCompressPdf = () => {
  const dispatch = useDispatch();
  const { navigate } = useLocalizedNavigation();
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<string[]>([]);
  const [isEmailModalVisible, setEmailModalVisible] = useState(false);
  const [isCompressionModalVisible, setIsCompressionModalVisible] =
    useState(false);
  const [email, setEmail] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const subscription = useSelector(
    (state: RootState) => state.user.subscription
  );
  const auth = useSelector((state: RootState) => state.auth.isLoggedIn);
  const user = useSelector((state: RootState) => state.user);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Store the file and show compression modal instead of uploading immediately
    setSelectedFile(file);
    setIsCompressionModalVisible(true);
  };

  const handleCompress = async (compressionLevel: CompressionLevel) => {
    if (!selectedFile) return;

    // Store the file in Redux global state with compression level
    dispatch(
      setPendingFile({
        file: selectedFile,
        action: "compress_pdf",
        compressionLevel: compressionLevel,
      })
    );
    dispatch(setAction("compress_pdf"));

    setIsCompressionModalVisible(false);

    // Check authentication first
    if (!auth) {
      // Show email modal - file is already stored in Redux
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

    // User is authenticated and has valid subscription - proceed with compression
    setUploading(true);
    setStatus(["Uploading file..."]);

    try {
      let fileName = "";
      // Simulate step-by-step progress updates
      let loaded = progress;
      const interval = setInterval(() => {
        loaded += 10;
        setProgress(Math.min(loaded, 90));
        if (loaded === 20) {
          setStatus(["Uploading file...", "Compressing the document..."]);
        } else if (loaded >= 40) {
          setStatus([
            "Uploading file...",
            "Compressing the document...",
            "Securing the document...",
          ]);
        } else if (loaded >= 70) {
          clearInterval(interval);
        }
      }, 300);
      fileName = await compressPdf(selectedFile, compressionLevel);
      dispatch(setFileName(fileName));
      setUploading(false);
      clearInterval(interval);
      setProgress(100);

      if (token) {
        try {
          await downloadFile(fileName, "compress_pdf", token, user.id);
          navigate("/files");
        } catch (err) {
          console.error("Error downloading file:", err);
          window.alert("Failed to download file.");
        }
      }
    } catch (error) {
      console.error("Error during file compression:", error);
      setUploading(false);
      alert("File compression failed. Please try again.");
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return {
    uploading,
    progress,
    status,
    isEmailModalVisible,
    isCompressionModalVisible,
    email,
    setEmail,
    setEmailModalVisible,
    setIsCompressionModalVisible,
    handleFileChange,
    handleCompress,
    selectedFile,
    formatFileSize,
  };
};
