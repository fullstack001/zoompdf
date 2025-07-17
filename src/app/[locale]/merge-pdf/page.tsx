"use client";
import { useState } from "react";
import { useLocalizedNavigation } from "@/utils/navigation";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import { useDispatch } from "react-redux";
import MultiFileUploadSection from "@/components/common/MultiFileUploadSection";
import { UploadedFile } from "@/components/common/types";
import FeatureItems from "@/components/common/FeatureItems";
import ToolsGrid from "@/components/landing/ToolsGrid";
import HowItWorks from "@/components/landing/HowItWorks";
import FeatureCTA from "@/components/landing/FeatureCTA";
import WhyUs from "@/components/landing/WhyUs";
import CoreValues from "@/components/landing/CoreValues";
import FAQ from "@/components/landing/FAQ";
import Footer from "@/components/Footer";
import { useTranslations } from "next-intl";
import { PDFDocument } from "pdf-lib";

import { setAction } from "../../../store/slices/flowSlice";
import { useFileContext } from "@/contexts/FileContext";

export default function MergePDFPage() {
  const dispatch = useDispatch();
  const { uploadFile, isLoading, progress, setNavigatingToEditor } =
    useFileContext();
  const { navigate } = useLocalizedNavigation();
  const [selectedFiles, setSelectedFiles] = useState<UploadedFile[]>([]);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isMerging, setIsMerging] = useState(false);
  const t = useTranslations();

  const handleFilesChange = (files: UploadedFile[]) => {
    setSelectedFiles(files);
  };

  const mergePDFs = async (files: File[]): Promise<File> => {
    const mergedPdf = await PDFDocument.create();

    for (const file of files) {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await PDFDocument.load(arrayBuffer);
      const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
      copiedPages.forEach((page) => mergedPdf.addPage(page));
    }

    const pdfBytes = await mergedPdf.save();
    const mergedFileName = `merged-${Date.now()}.pdf`;

    return new File([pdfBytes], mergedFileName, { type: "application/pdf" });
  };

  const handleMergeFiles = async () => {
    if (selectedFiles.length < 2) {
      setUploadError(t("mergePdf.minFilesError"));
      return;
    }

    try {
      setUploadError(null);
      setIsMerging(true);

      console.log(
        "Starting PDF merging:",
        selectedFiles.map((f) => f.name)
      );

      // Convert UploadedFile[] to File[] and merge PDFs
      const files = selectedFiles.map((uf) => uf.file);
      const mergedFile = await mergePDFs(files);

      console.log("PDFs merged successfully, uploading merged file");

      // Upload the single merged file
      await uploadFile(mergedFile);

      console.log("Merged file uploaded successfully, navigating to editor");
      dispatch(setAction("edit_pdf"));

      // Set flag to prevent file cleanup during navigation
      setNavigatingToEditor(true);
      navigate("/editor");
    } catch (error) {
      console.error("Merge or upload failed:", error);
      setUploadError(t("common.uploadFailed"));
    } finally {
      setIsMerging(false);
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
      {(isLoading || isMerging) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-xl w-full max-w-md p-8 text-center shadow-xl">
            <h3 className="text-xl font-bold mb-6">
              {isMerging
                ? t("mergePdf.mergingFiles")
                : t("mergePdf.processingFiles")}
            </h3>
            <Image
              src="/assets/images/processing.png"
              alt={t("common.processing")}
              width={160}
              height={0}
              style={{ height: "auto" }}
              className="mx-auto mb-4"
            />
            {!isMerging && (
              <>
                <div className="text-gray-700 font-semibold mb-2">
                  {progress}%
                </div>
                <div className="w-full h-2 rounded-full bg-gray-200">
                  <div
                    className="h-2 bg-blue-500 rounded-full transition-all duration-300 ease-out"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
