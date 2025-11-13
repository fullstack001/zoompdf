"use client";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocalizedNavigation } from "@/utils/navigation";
import { login } from "../../../store/slices/authSlice";
import { setUser } from "../../../store/slices/userSlice";
import { loginUser, downloadFile } from "../../../utils/apiUtils";
import { RootState } from "../../../store/store";
import { processPendingFile } from "../../../utils/processPendingFile";
import { clearPendingFile } from "../../../store/slices/flowSlice";
import ProgressModal from "../../../components/common/ProgressModal";
import LoadingModal from "../../../components/common/LoadingModal";
import DownloadModal from "../../../components/common/DownloadModal";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { navigate } = useLocalizedNavigation();
  const flow = useSelector((state: RootState) => state.flow);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isConverting, setIsConverting] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { token, user, subscription } = await loginUser(email, password);

      // Dispatch actions to set user data and login state
      dispatch(
        setUser({
          email: user.email,
          name: user.name || "", // Ensure name is set, default to empty string if not provided
          cardnumber: user.cardnumber || "", // Add cardnumber property
          id: user._id || "", // Add id property
          avatar: user.avatar || "", // Add avatar property
          isAdmin: user.isAdmin || false, // Add isAdmin property
          subscription: subscription
            ? {
                subscriptionId: subscription.subscriptionId,
                plan: subscription.plan,
                subscriptionType: subscription.subscriptionType,
                subscribedDate: subscription.subscribedDate,
                expiryDate: subscription.expiryDate,
              }
            : null,
        })
      );
      dispatch(login());
      console.log(user);

      // Optionally, store the token in localStorage or cookies
      localStorage.setItem("authToken", token);
      localStorage.setItem("token", token); // Also store as 'token' for admin panel compatibility

      // Check if user is admin and redirect to admin panel
      if (user.isAdmin) {
        navigate("/admin");
        return;
      }

      if (subscription && new Date(subscription.expiryDate) > new Date()) {
        // Check for pending files first (merge/conversion/compression/split)
        if (flow.action) {
          if (flow.pendingFiles && flow.action === "merge_pdf") {
            // Handle merge with multiple files
            try {
              setIsUploading(true);
              setUploadStatus(["Uploading files..."]);
              setUploadProgress(0);

              await processPendingFile(
                null,
                flow.action,
                token,
                user._id,
                null,
                flow.pendingFiles,
                null,
                {
                  onUploadProgress: (progress) => {
                    setUploadProgress(progress);
                    if (progress >= 90) {
                      setUploadStatus([
                        "Uploading files...",
                        "Merging PDFs...",
                      ]);
                    }
                    if (progress >= 100) {
                      setUploadStatus([
                        "Uploading files...",
                        "Merging PDFs...",
                        "File processing...",
                      ]);
                    }
                  },
                  onConverting: () => {
                    setIsUploading(false);
                    setIsConverting(true);
                  },
                  onDownloadProgress: (progress) => {
                    setIsConverting(false);
                    setIsDownloading(true);
                    setDownloadProgress(progress);
                  },
                }
              );
              setIsDownloading(false);
              dispatch(clearPendingFile());
              navigate("/files");
              return;
            } catch (err) {
              console.error("Error processing pending files:", err);
              setIsUploading(false);
              setIsConverting(false);
              setIsDownloading(false);
              window.alert("Failed to process files. Please try again.");
              dispatch(clearPendingFile());
            }
          } else if (flow.pendingFile && flow.action) {
            // Handle single file operations (conversion/compression/split)
            try {
              setIsUploading(true);
              setUploadStatus(["Uploading file..."]);
              setUploadProgress(0);

              await processPendingFile(
                flow.pendingFile,
                flow.action,
                token,
                user._id,
                flow.compressionLevel,
                null,
                flow.splitPageRanges,
                {
                  onUploadProgress: (progress) => {
                    setUploadProgress(progress);

                    setUploadStatus(["Uploading file..."]);
                  },
                  onConverting: () => {
                    setIsUploading(false);
                    setIsConverting(true);
                  },
                  onDownloadProgress: (progress) => {
                    setIsConverting(false);
                    setIsDownloading(true);
                    setDownloadProgress(progress);
                  },
                }
              );
              setIsDownloading(false);
              dispatch(clearPendingFile());
              navigate("/files");
              return;
            } catch (err) {
              console.error("Error processing pending file:", err);
              setIsUploading(false);
              setIsConverting(false);
              setIsDownloading(false);
              window.alert("Failed to process file. Please try again.");
              dispatch(clearPendingFile());
            }
          }
        }

        // Check for edited PDF data (already converted)
        if (flow.fileName && flow.action) {
          try {
            await downloadFile(flow.fileName, flow.action, token, user._id);
            navigate("/files");
          } catch (err) {
            console.error("Error downloading file:", err);
            window.alert("Failed to download file.");
          }
        } else {
          navigate("/files"); // Redirect to files page if no flow data
        }
      } else {
        navigate("/plan"); // Redirect to register page if subscription is not valid
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold text-center mb-8">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Login
          </button>
        </form>
        <div className="mt-6 text-center">
          <span className="text-sm text-gray-600">
            Don't have an account?{" "}
            <button
              onClick={() => navigate("/register")}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Sign up
            </button>
          </span>
        </div>
      </div>

      {/* Upload/Convert/Download Modals */}
      {isUploading && (
        <ProgressModal progress={uploadProgress} status={uploadStatus} />
      )}
      {isConverting && (
        <LoadingModal
          title="Converting your file..."
          message="Please wait while we process your document"
        />
      )}
      <DownloadModal isVisible={isDownloading} progress={downloadProgress} />
    </div>
  );
}
