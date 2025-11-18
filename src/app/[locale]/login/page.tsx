"use client";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocalizedNavigation } from "@/utils/navigation";
import { login } from "@/store/slices/authSlice";
import { setUser } from "@/store/slices/userSlice";
import { loginUser, downloadFile } from "@/utils/apiUtils";
import { RootState } from "@/store/store";
import { processPendingFile } from "@/utils/processPendingFile";
import { clearPendingFile } from "@/store/slices/flowSlice";
import ProgressModal from "@/components/common/ProgressModal";
import LoadingModal from "@/components/common/LoadingModal";
import DownloadModal from "@/components/common/DownloadModal";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();
  const { navigate } = useLocalizedNavigation();
  const flow = useSelector((state: RootState) => state.flow);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isConverting, setIsConverting] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);

  // Validation functions
  const validateEmail = (emailValue: string): string => {
    if (!emailValue.trim()) {
      return "Email is required";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailValue)) {
      return "Please enter a valid email address";
    }
    return "";
  };

  const validatePassword = (passwordValue: string): string => {
    if (!passwordValue) {
      return "Password is required";
    }
    if (passwordValue.length < 6) {
      return "Password must be at least 6 characters";
    }
    return "";
  };

  const clearErrors = () => {
    setError("");
    setEmailError("");
    setPasswordError("");
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    if (emailError) {
      setEmailError("");
    }
    if (error) {
      setError("");
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    if (passwordError) {
      setPasswordError("");
    }
    if (error) {
      setError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearErrors();
    setIsSubmitting(true);

    // Validate email
    const emailValidationError = validateEmail(email);
    if (emailValidationError) {
      setEmailError(emailValidationError);
      setIsSubmitting(false);
      return;
    }

    // Validate password
    const passwordValidationError = validatePassword(password);
    if (passwordValidationError) {
      setPasswordError(passwordValidationError);
      setIsSubmitting(false);
      return;
    }

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

      setIsSubmitting(false);

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
      console.error("Login error:", error);
      setIsSubmitting(false);

      // Handle different types of errors
      if (error instanceof Error) {
        const statusCode = (error as any).statusCode;
        const responseData = (error as any).responseData;

        // Get the actual error message from response data (msg, message, error) or fallback to error.message
        const apiErrorMessage =
          responseData?.msg ||
          responseData?.message ||
          responseData?.error ||
          error.message;
        const errorMessage = apiErrorMessage.toLowerCase();

        // Log detailed error info for debugging
        console.log("Error details:", {
          message: error.message,
          apiErrorMessage,
          statusCode,
          responseData,
        });

        // Check status code first for more accurate error detection
        if (statusCode === 401 || statusCode === 403) {
          // Unauthorized - usually means invalid credentials
          // Try to determine if it's email or password specific
          if (
            errorMessage.includes("password") ||
            errorMessage.includes("wrong password") ||
            errorMessage.includes("incorrect password") ||
            errorMessage.includes("invalid password")
          ) {
            setPasswordError(
              apiErrorMessage || "Invalid password. Please try again."
            );
          } else if (
            errorMessage.includes("email") ||
            errorMessage.includes("user") ||
            errorMessage.includes("account") ||
            errorMessage.includes("not found") ||
            errorMessage.includes("does not exist")
          ) {
            setEmailError(
              apiErrorMessage || "No account found with this email address."
            );
          } else {
            // Generic unauthorized - could be either
            setError(
              apiErrorMessage ||
                "Invalid email or password. Please check your credentials and try again."
            );
          }
        } else if (statusCode === 404) {
          setEmailError(
            apiErrorMessage || "No account found with this email address."
          );
        } else if (statusCode === 400) {
          // Bad request - might be validation error
          if (
            errorMessage.includes("password") ||
            errorMessage.includes("invalid password")
          ) {
            setPasswordError(
              apiErrorMessage || "Invalid password. Please try again."
            );
          } else if (errorMessage.includes("email")) {
            setEmailError(apiErrorMessage || "Invalid email address.");
          } else {
            setError(
              apiErrorMessage || "Invalid request. Please check your input."
            );
          }
        } else if (
          statusCode === 500 ||
          statusCode === 502 ||
          statusCode === 503
        ) {
          setError("Server error. Please try again later.");
        } else if (
          errorMessage.includes("network") ||
          errorMessage.includes("fetch") ||
          errorMessage.includes("timeout") ||
          errorMessage.includes("connection")
        ) {
          setError(
            "Network error. Please check your connection and try again."
          );
        } else {
          // Parse error message for specific keywords
          if (
            errorMessage.includes("invalid") ||
            errorMessage.includes("incorrect") ||
            errorMessage.includes("wrong")
          ) {
            if (errorMessage.includes("password")) {
              setPasswordError(
                apiErrorMessage || "Invalid password. Please try again."
              );
            } else if (
              errorMessage.includes("email") ||
              errorMessage.includes("user")
            ) {
              setEmailError(apiErrorMessage || "Invalid email address.");
            } else {
              setError(
                apiErrorMessage ||
                  "Invalid email or password. Please try again."
              );
            }
          } else if (
            errorMessage.includes("not found") ||
            errorMessage.includes("does not exist") ||
            errorMessage.includes("user not found")
          ) {
            setEmailError(
              apiErrorMessage || "No account found with this email address."
            );
          } else if (
            errorMessage.includes("login failed") ||
            errorMessage.includes("request failed")
          ) {
            // Generic login failed - use API message if available
            if (
              apiErrorMessage &&
              !apiErrorMessage.toLowerCase().includes("request failed")
            ) {
              setError(apiErrorMessage);
            } else {
              setError(
                "Invalid email or password. Please check your credentials and try again."
              );
            }
          } else {
            // Use the error message from the API if it's meaningful
            if (
              apiErrorMessage &&
              !apiErrorMessage.toLowerCase().includes("request failed")
            ) {
              setError(apiErrorMessage);
            } else {
              setError(
                "Login failed. Please check your credentials and try again."
              );
            }
          }
        }
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold text-center mb-8">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* General error message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              <p className="text-sm font-medium">{error}</p>
            </div>
          )}

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
              onChange={handleEmailChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                emailError
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                  : "border-gray-300"
              }`}
              placeholder="Enter your email"
            />
            {emailError && (
              <p className="mt-1 text-sm text-red-600">{emailError}</p>
            )}
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
              onChange={handlePasswordChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                passwordError
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                  : "border-gray-300"
              }`}
              placeholder="Enter your password"
            />
            {passwordError && (
              <p className="mt-1 text-sm text-red-600">{passwordError}</p>
            )}
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors ${
              isSubmitting
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            } text-white`}
          >
            {isSubmitting ? "Logging in..." : "Login"}
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
