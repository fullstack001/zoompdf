"use client";
import { useState } from "react";
import { useLocalizedNavigation } from "@/utils/navigation";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import { useDispatch } from "react-redux";
import FileUploadSection from "@/components/common/FileUploadSection";
import FeatureItems from "@/components/common/FeatureItems";
import ToolsGrid from "@/components/landing/ToolsGrid";
import HowItWorks from "@/components/landing/HowItWorks";
import FeatureCTA from "@/components/landing/FeatureCTA";
import WhyUs from "@/components/landing/WhyUs";
import CoreValues from "@/components/landing/CoreValues";
import FAQ from "@/components/landing/FAQ";
import Footer from "@/components/Footer";
import { useTranslations } from "next-intl";

import { setAction } from "../../store/slices/flowSlice";
import { useFileContext } from "@/contexts/FileContext";

interface ToolLandingPageProps {
  titleKey: string;
  subtitleKey: string;
  action: string;
}

export default function ToolLandingPage({
  titleKey,
  subtitleKey,
  action,
}: ToolLandingPageProps) {
  const dispatch = useDispatch();
  const { uploadFile, isLoading, progress, setNavigatingToEditor } =
    useFileContext();
  const { navigate } = useLocalizedNavigation();
  const [uploadError, setUploadError] = useState<string | null>(null);
  const t = useTranslations();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    if (selectedFile) {
      try {
        setUploadError(null);
        console.log("Starting file upload:", selectedFile.name);
        await uploadFile(selectedFile);
        console.log("File uploaded successfully, navigating to editor");
        dispatch(setAction(action));

        // Set flag to prevent file cleanup during navigation
        setNavigatingToEditor(true);
        navigate("/editor");
      } catch (error) {
        console.error("Upload failed:", error);
        setUploadError(t("common.uploadFailed"));
      }
    }
  };

  return (
    <main className="bg-gray-50">
      <Navbar />
      <section className="bg-[#edf0ff] text-center py-8 px-6 sm:py-12 sm:px-12 lg:px-24">
        <h1 className="text-4xl lg:text-5xl font-medium mb-6 pt-4 sm:pt-4 ">
          {t(titleKey)}
        </h1>
        <p className="mb-8 text-2xl lg:text-3xl font-light">{t(subtitleKey)}</p>
        <FileUploadSection handleFileChange={handleFileChange} />
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
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-xl w-full max-w-md p-8 text-center shadow-xl">
            <h3 className="text-xl font-bold mb-6">
              {t("common.processingFile")}
            </h3>
            <Image
              src="/assets/images/processing.png"
              alt={t("common.processing")}
              width={160}
              height={160}
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
