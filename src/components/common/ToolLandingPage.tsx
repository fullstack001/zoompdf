"use client";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useLocalizedNavigation } from "@/utils/navigation";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import FileUploadSection from "@/components/common/FileUploadSection";
import FeatureItems from "@/components/common/FeatureItems";
import ToolsGrid from "@/components/landing/ToolsGrid";
import HowItWorks from "@/components/landing/HowItWorks";
import FeatureCTA from "@/components/landing/FeatureCTA";
import WhyUs from "@/components/landing/WhyUs";
import SecurityPriority from "@/components/landing/SecurityPriority";
import FormTemplates from "@/components/landing/FormTemplates";
import CustomerTestimonials from "@/components/landing/CustomerTestimonials";

import CoreValues from "@/components/landing/CoreValues";
import FAQ from "@/components/landing/FAQ";
import ToolsSection from "@/components/landing/ToolsSection";
import Footer from "@/components/Footer";
import { useTranslations } from "next-intl";

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
  const { navigate, currentLocale } = useLocalizedNavigation();
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState<string>("");
  const user = useSelector((state: RootState) => state.user);
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const t = useTranslations();

  // Custom upload function with progress tracking
  const uploadWithProgress = async (
    url: string,
    formData: FormData
  ): Promise<{ responseText: string; status: number; ok: boolean }> => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      // Track upload progress
      xhr.upload.addEventListener("progress", (event) => {
        if (event.lengthComputable) {
          const percentComplete = Math.round(
            (event.loaded / event.total) * 100
          );
          setUploadProgress(percentComplete);
          setUploadStatus(`Uploading... ${percentComplete}%`);
        }
      });

      // Handle successful upload
      xhr.addEventListener("load", () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          setUploadProgress(100);
          setUploadStatus("Upload completed!");
          resolve({
            responseText: xhr.responseText,
            status: xhr.status,
            ok: xhr.status >= 200 && xhr.status < 300,
          });
        } else {
          reject(new Error(`Upload failed with status: ${xhr.status}`));
        }
      });

      // Handle upload errors
      xhr.addEventListener("error", () => {
        reject(new Error("Upload failed"));
      });

      // Handle upload abort
      xhr.addEventListener("abort", () => {
        reject(new Error("Upload aborted"));
      });

      // Start the upload
      xhr.open("POST", url);
      xhr.send(formData);
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    if (selectedFile) {
      try {
        setUploadError(null);
        setIsLoading(true);
        setUploadProgress(0);
        setUploadStatus("Preparing file for upload...");

        console.log("Processing file:", selectedFile.name);

        // Check if it's a PDF file
        if (selectedFile.type === "application/pdf") {
          // Upload file to backend with progress tracking
          const formData = new FormData();
          formData.append("file", selectedFile);
          formData.append("action", action);
          formData.append("email", user.email);
          formData.append("isSign", isLoggedIn.toString());

          setUploadStatus("Uploading file...");

          const response = await uploadWithProgress(
            "https://api.pdfezy.com/api/pdf/edit-sign-upload",
            formData
          );

          // Parse the response
          const result = JSON.parse(response.responseText);
          console.log("File uploaded successfully:", result);

          // Small delay to show 100% completion
          await new Promise((resolve) => setTimeout(resolve, 500));

          // Store user state in localStorage before redirecting
          const userData = {
            id: user.id,
            name: user.name,
            email: user.email,
            cardnumber: user.cardnumber,
            avatar: user.avatar,
            isAdmin: user.isAdmin,
            subscription: user.subscription,
          };

          // Store current user state temporarily
          localStorage.setItem("tempUserData", JSON.stringify(userData));
          localStorage.setItem("tempAuthState", isLoggedIn.toString());

          // Store auth token if user is logged in
          const authToken = localStorage.getItem("authToken");
          if (authToken) {
            localStorage.setItem("tempAuthToken", authToken);
          }

          const editUrl = `https://edit.pdfezy.com?file=${result.processingId}`;
          window.location.href = editUrl;
        } else {
          // Show error for non-PDF files
          setUploadError("Please select a PDF file");
        }
      } catch (error) {
        console.error("File upload failed:", error);
        setUploadError(t("common.uploadFailed"));
      } finally {
        setIsLoading(false);
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
      <SecurityPriority />
      <FormTemplates />
      <CoreValues />
      <FAQ />
      <CustomerTestimonials />
      <ToolsSection />
      <Footer />
      {/* Loading Modal */}
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
              height={0}
              style={{ height: "auto" }}
              className="mx-auto mb-4"
            />
            <div className="text-gray-700 font-semibold mb-2">
              {uploadStatus}
            </div>
            <div className="text-2xl font-bold text-blue-600 mb-4">
              {uploadProgress}%
            </div>
            <div className="w-full h-3 rounded-full bg-gray-200 mb-2">
              <div
                className="h-3 bg-blue-500 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
            <div className="text-sm text-gray-500">
              {uploadProgress < 100
                ? "Please wait..."
                : "Redirecting to editor..."}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
