"use client"; // ✅ Add this line at the top

import dynamic from "next/dynamic";
import { useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import Topbar from "@/components/editor/Topbar";
import type { PDFViewerRef } from "@/components/pdfviewer/PDFViewer";
import { useFileContext } from "@/contexts/FileContext";
import { useLocalizedNavigation } from "@/utils/navigation";

// Dynamically import with SSR disabled
const PDFViewer = dynamic(
  () => import("@/components/pdfviewer/PDFViewer"), // Adjust the path as necessary
  {
    ssr: false,
  }
);

const Home: React.FC = () => {
  const pdfViewerRef = useRef<PDFViewerRef>(null);
  const { uploadedFile } = useFileContext();
  const { navigate } = useLocalizedNavigation();
  const t = useTranslations();
  const isMountedRef = useRef(true);

  console.log(uploadedFile);

  // Redirect to home if no file is uploaded
  useEffect(() => {
    if (!uploadedFile && isMountedRef.current) {
      console.log("No file uploaded, redirecting to home");
      navigate("/");
    }
  }, [uploadedFile, navigate]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      // Mark component as unmounted
      isMountedRef.current = false;
    };
  }, []);

  // Show loading or redirect if no file
  if (!uploadedFile) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">{t("common.loading")}</p>
        </div>
      </div>
    );
  }

  return (
    <main className="h-screen flex flex-col">
      <Topbar pdfViewerRef={pdfViewerRef} />
      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1">
          <PDFViewer ref={pdfViewerRef} document={uploadedFile.filePath} />
        </div>
      </div>
    </main>
  );
};

export default Home;
