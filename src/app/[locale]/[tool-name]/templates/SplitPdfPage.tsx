"use client";
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import ToolsGrid from "@/components/landing/ToolsGrid";
import HowItWorks from "@/components/landing/HowItWorks";
import FeatureCTA from "@/components/landing/FeatureCTA";
import WhyUs from "@/components/landing/WhyUs";
import CoreValues from "@/components/landing/CoreValues";
import FAQ from "@/components/landing/FAQ";
import Footer from "@/components/Footer";
import FeatureItems from "@/components/common/FeatureItems";
import FileUploadSection from "@/components/common/FileUploadSection";
import ProgressModal from "@/components/common/ProgressModal";
import EmailModal from "@/components/common/EmailModal";
import { useTranslations } from "next-intl";
import { useLocalizedNavigation } from "@/utils/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setAction, setPendingFile } from "@/store/slices/flowSlice";
import { downloadFile, splitPdfWithRanges } from "@/utils/apiUtils";
import { setFileName } from "@/store/slices/flowSlice";
import { RootState } from "@/store/store";
import { getPdfPageCount } from "@/utils/pdfUtils";

export default function SplitPdfPage() {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<string[]>([]);
  const [isEmailModalVisible, setIsEmailModalVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [splitPages, setSplitPages] = useState<string>("");
  const [splitError, setSplitError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState<number | null>(null);
  const [loadingPageCount, setLoadingPageCount] = useState(false);

  const dispatch = useDispatch();
  const { navigate } = useLocalizedNavigation();
  const t = useTranslations();
  const auth = useSelector((state: RootState) => state.auth.isLoggedIn);
  const subscription = useSelector(
    (state: RootState) => state.user.subscription
  );
  const user = useSelector((state: RootState) => state.user);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSelectedFile(file);
    setSplitError(null);
    setTotalPages(null);

    // Get the total number of pages in the PDF
    if (file && file.type === "application/pdf") {
      setLoadingPageCount(true);
      try {
        const pageCount = await getPdfPageCount(file);
        setTotalPages(pageCount);
      } catch (error) {
        console.error("Error getting page count:", error);
        setSplitError("Failed to read PDF file. Please try another file.");
      } finally {
        setLoadingPageCount(false);
      }
    }
  };

  const handleSplit = async () => {
    if (!selectedFile) {
      setSplitError(t("common.chooseFile"));
      return;
    }

    if (!splitPages.trim()) {
      setSplitError("Please enter page ranges (e.g., 1-3, 5, 7-10)");
      return;
    }

    // Validate page ranges if we have the total page count
    if (totalPages !== null) {
      const ranges = splitPages
        .split(",")
        .map((r) => r.trim())
        .filter(Boolean);
      let isValid = true;
      let errorMsg = "";

      for (const range of ranges) {
        if (range.includes("-")) {
          const [start, end] = range
            .split("-")
            .map((p) => parseInt(p.trim(), 10));
          if (isNaN(start) || isNaN(end)) {
            isValid = false;
            errorMsg = `Invalid page range: ${range}`;
            break;
          }
          if (start < 1 || end > totalPages || start > end) {
            isValid = false;
            errorMsg = `Page range ${range} is invalid. Please use pages between 1 and ${totalPages}.`;
            break;
          }
        } else {
          const page = parseInt(range, 10);
          if (isNaN(page) || page < 1 || page > totalPages) {
            isValid = false;
            errorMsg = `Page ${range} is invalid. Please use pages between 1 and ${totalPages}.`;
            break;
          }
        }
      }

      if (!isValid) {
        setSplitError(errorMsg);
        return;
      }
    }

    // Store file and page ranges in Redux global state
    dispatch(
      setPendingFile({
        file: selectedFile,
        action: "split_pdf",
        splitPageRanges: splitPages,
      })
    );
    dispatch(setAction("split_pdf"));

    // Check authentication first
    if (!auth) {
      // Show email modal for non-authenticated users
      setIsEmailModalVisible(true);
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

    // User is authenticated and has valid subscription - proceed with split
    setIsLoading(true);
    setUploading(true);
    setProgress(0);
    setStatus([t("common.processing")]);
    setSplitError(null);

    try {
      const response = await splitPdfWithRanges(selectedFile, splitPages);
      const fileName =
        typeof response === "string" ? response : (response as any).file;
      if (!fileName) {
        throw new Error("Failed to get split file name");
      }

      dispatch(setFileName(fileName));
      setIsLoading(false);
      setUploading(false);
      setProgress(100);

      if (token) {
        try {
          await downloadFile(fileName, "split_pdf", token, user.id);
          navigate("/files");
        } catch (err) {
          console.error("Error downloading file:", err);
          setSplitError("Failed to download file. Please try again.");
        }
      }
    } catch (error) {
      console.error("Split failed:", error);
      setSplitError(
        error instanceof Error ? error.message : t("common.uploadFailed")
      );
      setIsLoading(false);
      setUploading(false);
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <main className="bg-gray-50">
      <Navbar />

      <section className="bg-[#edf0ff] text-center py-8 px-6 sm:py-12 sm:px-12 lg:px-24">
        <h1 className="text-4xl lg:text-5xl font-medium mb-6 pt-4 sm:pt-4">
          {t("toolPages.splitPdf.title")}
        </h1>
        <p className="mb-8 text-2xl lg:text-3xl font-light">
          {t("toolPages.splitPdf.subtitle")}
        </p>

        <FileUploadSection
          acceptType=".pdf"
          handleFileChange={handleFileChange}
        />

        {selectedFile && (
          <div className="mt-6 max-w-md mx-auto">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <h3 className="text-lg font-semibold mb-2">Split Options</h3>

              {/* PDF Information */}
              <div className="mb-4 p-3 bg-blue-50 rounded-md">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    Selected PDF:
                  </span>
                  <span className="text-sm text-gray-600 truncate ml-2 max-w-[200px]">
                    {selectedFile.name}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">
                    Total Pages:
                  </span>
                  <span className="text-sm font-semibold text-blue-600">
                    {loadingPageCount ? (
                      <span className="text-gray-500">Loading...</span>
                    ) : totalPages !== null ? (
                      <span>
                        {totalPages} {totalPages === 1 ? "page" : "pages"}
                      </span>
                    ) : (
                      <span className="text-gray-500">-</span>
                    )}
                  </span>
                </div>
              </div>

              {/* Split Range Input */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Page Ranges (e.g., 1-3, 5, 7-10)
                </label>
                <input
                  type="text"
                  value={splitPages}
                  onChange={(e) => setSplitPages(e.target.value)}
                  placeholder={totalPages ? `1-${totalPages}` : "1-3, 5, 7-10"}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={loadingPageCount}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Enter page ranges separated by commas. Use hyphens for ranges.
                </p>
              </div>

              {/* Split Button */}
              <button
                onClick={handleSplit}
                disabled={isLoading || !splitPages.trim() || loadingPageCount}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? t("common.processing") : "Split PDF"}
              </button>
            </div>
          </div>
        )}

        {splitError && (
          <div className="mt-4 text-red-500 text-center bg-red-50 p-3 rounded-lg max-w-md mx-auto">
            {splitError}
          </div>
        )}

        <FeatureItems />
        {uploading && <ProgressModal progress={progress} status={status} />}
      </section>

      {/* Email Modal */}
      <EmailModal
        isVisible={isEmailModalVisible}
        email={email}
        onEmailChange={setEmail}
        onClose={() => setIsEmailModalVisible(false)}
      />

      <HowItWorks />
      <ToolsGrid />
      <FeatureCTA />
      <WhyUs />
      <CoreValues />
      <FAQ />
      <Footer />
    </main>
  );
}
