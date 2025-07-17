"use client"; // ✅ Add this line at the top

import dynamic from "next/dynamic";
import { useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import { useSelector } from "react-redux";
import Topbar from "@/components/editor/Topbar";
import type { PDFViewerRef } from "@/components/pdfviewer/PDFViewer";
import { useFileContext } from "@/contexts/FileContext";
import { useLocalizedNavigation } from "@/utils/navigation";
import { RootState } from "@/store/store";

// Dynamically import with SSR disabled
const PDFViewer = dynamic(
  () => import("@/components/pdfviewer/PDFViewer"), // Adjust the path as necessary
  {
    ssr: false,
  }
);

const Home: React.FC = () => {
  const pdfViewerRef = useRef<PDFViewerRef>(null);
  const { uploadedFile, uploadedFiles } = useFileContext();
  const { navigate } = useLocalizedNavigation();
  const t = useTranslations();
  const isMountedRef = useRef(true);
  const action = useSelector((state: RootState) => state.flow.action);

  console.log(uploadedFile, uploadedFiles);

  const isMergeMode = action === "merge_pdf" && uploadedFiles.length > 0;

  // Redirect to home if no file is uploaded (single or multiple)
  useEffect(() => {
    if (!uploadedFile && uploadedFiles.length === 0 && isMountedRef.current) {
      console.log("No files uploaded, redirecting to home");
      navigate("/");
    }
  }, [uploadedFile, uploadedFiles, navigate]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      // Mark component as unmounted
      isMountedRef.current = false;
    };
  }, []);

  console.log(uploadedFiles);

  // Show loading or redirect if no files
  if (!uploadedFile && uploadedFiles.length === 0) {
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
          {isMergeMode ? (
            <PDFViewer
              ref={pdfViewerRef}
              documents={uploadedFiles.map((file) => file.filePath)}
            />
          ) : uploadedFile ? (
            <PDFViewer ref={pdfViewerRef} document={uploadedFile.filePath} />
          ) : null}
        </div>
      </div>
    </main>
  );
};

export default Home;
