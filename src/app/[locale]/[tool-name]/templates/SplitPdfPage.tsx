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
import { useDispatch } from "react-redux";
import { setAction } from "@/store/slices/flowSlice";
import { uploadEditedPDF } from "@/utils/apiUtils";
import { setFileName } from "@/store/slices/flowSlice";
import { PDFDocument } from "pdf-lib";

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

  const dispatch = useDispatch();
  const { navigate } = useLocalizedNavigation();
  const t = useTranslations();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSelectedFile(file);
    setSplitError(null);
  };

  const splitPDF = async (file: File, pageRanges: string): Promise<File[]> => {
    const arrayBuffer = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(arrayBuffer);
    const totalPages = pdfDoc.getPageCount();

    const ranges = pageRanges.split(",").map((range) => range.trim());
    const splitFiles: File[] = [];

    for (let i = 0; i < ranges.length; i++) {
      const range = ranges[i];
      let startPage: number, endPage: number;

      if (range.includes("-")) {
        const [start, end] = range.split("-").map((p) => parseInt(p.trim()));
        startPage = Math.max(1, start) - 1; // Convert to 0-based index
        endPage = Math.min(totalPages, end || totalPages) - 1; // Convert to 0-based index
      } else {
        const page = parseInt(range);
        startPage = Math.max(1, page) - 1; // Convert to 0-based index
        endPage = startPage;
      }

      if (startPage < 0 || startPage >= totalPages || endPage < startPage) {
        throw new Error(`Invalid page range: ${range}`);
      }

      const newPdf = await PDFDocument.create();
      const pages = await newPdf.copyPages(
        pdfDoc,
        Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i)
      );
      pages.forEach((page) => newPdf.addPage(page));

      const pdfBytes = await newPdf.save();
      const fileName = `split_${i + 1}_${file.name.replace(".pdf", "")}.pdf`;

      splitFiles.push(
        new File([new Uint8Array(pdfBytes)], fileName, {
          type: "application/pdf",
        })
      );
    }

    return splitFiles;
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

    setIsLoading(true);
    setUploading(true);
    setProgress(0);
    setStatus([t("common.processing")]);

    try {
      setSplitError(null);

      const splitFiles = await splitPDF(selectedFile, splitPages);

      if (splitFiles.length === 0) {
        throw new Error("No files were created");
      }

      // Upload the first split file and navigate to editor
      const response = await uploadEditedPDF(
        splitFiles[0],
        (progressPercent) => {
          setProgress(progressPercent);
        }
      );

      dispatch(setFileName(response));
      dispatch(setAction("edit_pdf"));
      navigate("/editor");
    } catch (error) {
      console.error("Split failed:", error);
      setSplitError(
        error instanceof Error ? error.message : t("common.uploadFailed")
      );
    } finally {
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
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Page Ranges (e.g., 1-3, 5, 7-10)
                </label>
                <input
                  type="text"
                  value={splitPages}
                  onChange={(e) => setSplitPages(e.target.value)}
                  placeholder="1-3, 5, 7-10"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Enter page ranges separated by commas. Use hyphens for ranges.
                </p>
              </div>
              <button
                onClick={handleSplit}
                disabled={isLoading || !splitPages.trim()}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
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
