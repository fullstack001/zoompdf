"use client";
import Image from "next/image";
import {
  CheckSquare,
  X,
} from "lucide-react";
import { useState, useEffect, RefObject } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setFileName } from "../../store/slices/flowSlice";
import { RootState } from "../../store/store";
import EmailModal from "../common/EmailModal";
import type { PDFViewerRef } from "../pdfviewer/PDFViewer";
import {
  uploadEditedPDF,
  convertPdfToPng,
  convertPdfToWord,
  convertPdfToJpg,
  convertPdfToExcel,
  convertPdfToPptx,
  deletePdfByFileName
} from "../../utils/apiUtils";
import SelectFormatModal from "./SelectFormatModal";
import ProgressModal from "./ProgressModal";
import { useTranslations } from "next-intl";
import { useLocalizedNavigation } from "@/utils/navigation";

interface TopbarProps {
  pdfViewerRef: RefObject<PDFViewerRef | null>;
}

export default function Topbar({ pdfViewerRef }: TopbarProps) {
  const dispatch = useDispatch();
  const router = useRouter();
  const originalFileName = useSelector((state: RootState) => state.flow.fileName);
  const action = useSelector((state: RootState) => state.flow.action);
  const [showModal, setShowModal] = useState(false);
  const [showProgress, setShowProgress] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [progress, setProgress] = useState(0);
  const [selected, setSelected] = useState("PDF");
  const [filename, setFilename] = useState(
    originalFileName?.split(".")[0] || "document"
  );
  const [email, setEmail] = useState("");
  const [saving, setSaving] = useState(false);
  const t = useTranslations();
  const { navigate } = useLocalizedNavigation();

  const getButtonText = () => {
    switch (action) {
      case "sign_pdf":
        return saving ? t("common.signing") : t("pdfViewer.sign");
      case "split_pdf":
        return saving ? t("common.splitting") : t("common.split");
      default:
        return saving ? t("common.saving") : t("common.done");
    }
  };

  useEffect(() => {
    if (showProgress) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setShowProgress(false);
            setTimeout(() => {
              setShowProgress(false);
              setShowEmailModal(true);
            }, 300);
            return 100;
          }
          return prev + 5;
        });
      }, 150);
    }
  }, [showProgress]);

  const handleDoneClick = async () => {
    if (!pdfViewerRef.current) {
      alert("PDF viewer not ready. Please wait a moment and try again.");
      return;
    }
    setShowModal(true);
  };

  const handleDownload = async () => {
    try {
      if (!pdfViewerRef.current) {
        alert("PDF viewer not ready. Please wait a moment and try again.");
        return;
      }

      setSaving(true);
      deletePdfByFileName(originalFileName);

      // Export the PDF from PSPDFKit
      const pdfBuffer = await pdfViewerRef.current.exportPDF();

      // Convert ArrayBuffer to Blob
      const pdfBlob = new Blob([pdfBuffer], { type: "application/pdf" });

      if (selected === "PDF") {
        // For PDF type: Upload to server
        try {
          const pdfFile = new File([pdfBlob], `${filename}_${Date.now()}.pdf`, {
            type: "application/pdf",
          });
          const response = await uploadEditedPDF(pdfFile);
          console.log("PDF uploaded successfully:", response);

          // Save filename to global state
          dispatch(setFileName(response));
        } catch (uploadError) {
          console.error("Error uploading PDF:", uploadError);
          alert("Failed to upload PDF to server. Please try again.");
          return;
        }
      } else {
        // For other types: Convert the file
        try {
          // Create a File object from the blob
          const pdfFile = new File([pdfBlob], `${filename}.pdf`, {
            type: "application/pdf",
          });

          let convertedFileName = "";

          // Convert based on selected type
          switch (selected) {
            case "PNG":
              convertedFileName = await convertPdfToPng(pdfFile);
              break;
            case "Word":
              convertedFileName = await convertPdfToWord(pdfFile);
              break;
            case "JPG":
              convertedFileName = await convertPdfToJpg(pdfFile);
              break;
            case "Excel":
              convertedFileName = await convertPdfToExcel(pdfFile);
              break;
            case "PPT":
              convertedFileName = await convertPdfToPptx(pdfFile);
              break;
            default:
              throw new Error(`Unsupported conversion type: ${selected}`);
          }

          // Save filename to global state
          dispatch(setFileName(convertedFileName));

          // Also save to edited PDF state for consistency
          const reader = new FileReader();
        } catch (conversionError) {
          console.error("Error converting file:", conversionError);
          alert(`Failed to convert PDF to ${selected}. Please try again.`);
          return;
        }
      }

      // Close modal and show email modal
      setShowModal(false);
      setShowProgress(true);
      setProgress(0);
    } catch (error) {
      console.error("Error downloading PDF:", error);
      alert("Failed to download PDF. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <header className="bg-white border-b px-6 py-3 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate("/")}>
            <Image
              src="/assets/images/logo.svg"
              alt="ZoomPDF"
              width={128}
              height={28}
            />
          </button>
        </div>

        <div className="flex items-center gap-6 text-sm text-gray-700">
          <button
            onClick={handleDoneClick}
            disabled={saving}
            className="flex items-center gap-2 border border-blue-600 text-blue-600 px-4 py-1.5 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <CheckSquare size={16} />
            {getButtonText()}
          </button>
        </div>
      </header>

      {showModal && !showProgress && !showEmailModal && (
        <SelectFormatModal
          isVisible={showModal}
          selected={selected}
          filename={filename}
          onClose={() => setShowModal(false)}
          onFormatSelect={(format) => setSelected(format)}
          onFilenameChange={(filename) => setFilename(filename)}
          onDownload={handleDownload}
          saving={saving}
        />
      )}

      {showProgress && (
        <ProgressModal isVisible={showProgress} progress={progress} />
      )}

      <EmailModal
        isVisible={showEmailModal}
        email={email}
        onEmailChange={setEmail}
        onClose={() => setShowEmailModal(false)}
      />
    </>
  );
}
