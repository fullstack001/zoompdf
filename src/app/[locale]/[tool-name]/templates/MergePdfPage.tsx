"use client";
import { useState } from "react";
import { useLocalizedNavigation } from "@/utils/navigation";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import MultiFileUploadSection from "@/components/common/MultiFileUploadSection";
import { UploadedFile } from "@/components/common/types";
import FeatureItems from "@/components/common/FeatureItems";
import EmailModal from "@/components/common/EmailModal";
import ToolsGrid from "@/components/landing/ToolsGrid";
import HowItWorks from "@/components/landing/HowItWorks";
import FeatureCTA from "@/components/landing/FeatureCTA";
import WhyUs from "@/components/landing/WhyUs";
import CoreValues from "@/components/landing/CoreValues";
import FAQ from "@/components/landing/FAQ";
import Footer from "@/components/Footer";
import { useTranslations } from "next-intl";
import { RootState } from "@/store/store";

import { setAction, setPendingFile } from "../../../../store/slices/flowSlice";
import { downloadFile, mergePdfFiles } from "@/utils/apiUtils";
import { setFileName } from "@/store/slices/flowSlice";

export default function MergePdfPage() {
  const dispatch = useDispatch();
  const [progress, setProgress] = useState(0);
  const { navigate } = useLocalizedNavigation();
  const [selectedFiles, setSelectedFiles] = useState<UploadedFile[]>([]);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isMerging, setIsMerging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailModalVisible, setIsEmailModalVisible] = useState(false);
  const [email, setEmail] = useState("");
  const t = useTranslations();
  const auth = useSelector((state: RootState) => state.auth.isLoggedIn);
  const subscription = useSelector(
    (state: RootState) => state.user.subscription
  );
  const user = useSelector((state: RootState) => state.user);

  const handleFilesChange = (files: UploadedFile[]) => {
    setSelectedFiles(files);
  };

  const handleMergeFiles = async () => {
    if (selectedFiles.length < 2) {
      setUploadError(t("mergePdf.minFilesError"));
      return;
    }

    const files = selectedFiles.map((uf) => uf.file);

    // Store files in Redux global state
    dispatch(
      setPendingFile({
        files,
        action: "merge_pdf",
      })
    );
    dispatch(setAction("merge_pdf"));

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
      // Navigate to plan page, but keep pending files in Redux for when they come back
      navigate("/plan");
      return;
    }

    // User is authenticated and has valid subscription - proceed with merge
    setIsLoading(true);
    setIsMerging(true);
    setUploadError(null);

    try {
      const response = await mergePdfFiles(files);
      const fileName =
        typeof response === "string" ? response : (response as any).file;
      if (!fileName) {
        throw new Error("Failed to get merged file name");
      }

      dispatch(setFileName(fileName));

      if (token) {
        try {
          await downloadFile(fileName, "merge_pdf", token, user.id);
          navigate("/files");
        } catch (err) {
          console.error("Error downloading file:", err);
          setUploadError("Failed to download file. Please try again.");
        }
      }
    } catch (error) {
      console.error("Merge failed:", error);
      setUploadError(t("common.uploadFailed"));
    } finally {
      setIsMerging(false);
      setIsLoading(false);
    }
  };

  return (
    <main className="bg-gray-50">
      <Navbar />
      <section className="bg-[#edf0ff] text-center py-8 px-6 sm:py-12 sm:px-12 lg:px-24">
        <h1 className="text-4xl lg:text-5xl font-medium mb-6 pt-4 sm:pt-4">
          {t("toolPages.mergePdf.title")}
        </h1>
        <p className="mb-8 text-2xl lg:text-3xl font-light">
          {t("toolPages.mergePdf.subtitle")}
        </p>
        <MultiFileUploadSection
          acceptType="application/pdf"
          maxFiles={12}
          maxFileSize={100}
          onFilesChange={handleFilesChange}
          actionButtonText={t("mergePdf.actionButton")}
          onActionButtonClick={handleMergeFiles}
          actionButtonDisabled={
            selectedFiles.length < 2 || isLoading || isMerging
          }
          dropText={t("mergePdf.dropText")}
          uploadText={t("mergePdf.uploadText")}
        />
        {uploadError && (
          <div className="mt-4 text-red-500 text-center bg-red-50 p-3 rounded-lg">
            {uploadError}
          </div>
        )}
        <FeatureItems />
      </section>
      <HowItWorks />
      <ToolsGrid />
      <FeatureCTA />
      <WhyUs />
      <CoreValues />
      <FAQ />
      <Footer />
      {/* Email Modal */}
      <EmailModal
        isVisible={isEmailModalVisible}
        email={email}
        onEmailChange={setEmail}
        onClose={() => setIsEmailModalVisible(false)}
      />
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-xl w-full max-w-md p-8 text-center shadow-xl">
            <h3 className="text-xl font-bold mb-6">
              {t("mergePdf.processingFiles")}
            </h3>
            <Image
              src="/assets/images/processing.png"
              alt={t("common.processing")}
              width={160}
              height={0}
              style={{ height: "auto" }}
              className="mx-auto mb-4"
            />
            <div className="text-gray-700 font-semibold mb-2">{progress}%</div>
            <div className="w-full h-2 rounded-full bg-gray-200">
              <div
                className="h-2 bg-blue-500 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
