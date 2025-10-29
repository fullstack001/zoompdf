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

export default function SignPdfPage() {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<string[]>([]);
  const [isEmailModalVisible, setIsEmailModalVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [signature, setSignature] = useState<string>("");
  const [signError, setSignError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const { navigate } = useLocalizedNavigation();
  const t = useTranslations();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSelectedFile(file);
    setSignError(null);
  };

  const handleSignatureChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSignature(e.target.value);
  };

  const signPDF = async (file: File, signatureText: string): Promise<File> => {
    // For now, we'll just return the original file
    // In a real implementation, you would add the signature to the PDF
    // This could involve using a PDF library like pdf-lib to add text annotations
    return file;
  };

  const handleSign = async () => {
    if (!selectedFile) {
      setSignError(t("common.chooseFile"));
      return;
    }

    if (!signature.trim()) {
      setSignError("Please enter your signature");
      return;
    }

    setIsLoading(true);
    setUploading(true);
    setProgress(0);
    setStatus([t("common.signing")]);

    try {
      setSignError(null);

      const signedFile = await signPDF(selectedFile, signature);

      const response = await uploadEditedPDF(signedFile, (progressPercent) => {
        setProgress(progressPercent);
      });

      dispatch(setFileName(response));
      dispatch(setAction("edit_pdf"));
      navigate("/editor");
    } catch (error) {
      console.error("Sign failed:", error);
      setSignError(
        error instanceof Error ? error.message : t("common.uploadFailed")
      );
    } finally {
      setIsLoading(false);
      setUploading(false);
    }
  };

  return (
    <main className="bg-gray-50">
      <Navbar />

      <section className="bg-[#edf0ff] text-center py-8 px-6 sm:py-12 sm:px-12 lg:px-24">
        <h1 className="text-4xl lg:text-5xl font-medium mb-6 pt-4 sm:pt-4">
          {t("toolPages.signPdf.title")}
        </h1>
        <p className="mb-8 text-2xl lg:text-3xl font-light">
          {t("toolPages.signPdf.subtitle")}
        </p>

        <FileUploadSection
          acceptType=".pdf"
          handleFileChange={handleFileChange}
        />

        {selectedFile && (
          <div className="mt-6 max-w-md mx-auto">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <h3 className="text-lg font-semibold mb-2">Add Signature</h3>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Signature Text
                </label>
                <textarea
                  value={signature}
                  onChange={handleSignatureChange}
                  placeholder="Enter your signature here..."
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-xs text-gray-500 mt-1">
                  This text will be added as a signature to your PDF.
                </p>
              </div>
              <button
                onClick={handleSign}
                disabled={isLoading || !signature.trim()}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isLoading ? t("common.signing") : "Sign PDF"}
              </button>
            </div>
          </div>
        )}

        {signError && (
          <div className="mt-4 text-red-500 text-center bg-red-50 p-3 rounded-lg max-w-md mx-auto">
            {signError}
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
