"use client";
import React, { useEffect, useState } from "react";
import { CirclePlus, Loader2, X } from "lucide-react";
import UploadAnimationSVG from "./UploadAnimationSVG";

const MAX_FILE_SIZE_MB = 100;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

export default function FileUploadSection({
  acceptType,
  handleFileChange,
  isLoading,
}: {
  acceptType?: string;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isLoading?: boolean;
}) {
  const [sizeError, setSizeError] = useState<string | null>(null);

  useEffect(() => {
    if (!sizeError) return;
    const timeoutId = window.setTimeout(() => setSizeError(null), 5000);
    return () => window.clearTimeout(timeoutId);
  }, [sizeError]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file && file.size > MAX_FILE_SIZE_BYTES) {
      setSizeError("The file size must not exceed 100 MB");
      // Reset the input so the same file can be selected again after user action.
      e.target.value = "";
      return;
    }

    handleFileChange(e);
  };

  return (
    <>
      {sizeError && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none px-4">
          <div className="pointer-events-auto relative -translate-y-6 w-[min(92vw,560px)] rounded-lg border border-gray-200 bg-white px-4 py-3 shadow-lg overflow-hidden">
            <div className="flex items-start gap-3">
              <span className="mt-1 text-red-500 text-xl leading-none">⛔</span>
              <div className="flex-1 text-center">
                <p className="text-2xl font-semibold text-gray-800">
                  Error message
                </p>
                <p className="text-lg text-gray-600">{sizeError}</p>
              </div>
              <button
                type="button"
                onClick={() => setSizeError(null)}
                className="text-gray-400 hover:text-gray-600"
                aria-label="Close error message"
              >
                <X size={18} />
              </button>
            </div>
            <div className="absolute bottom-0 left-0 h-1 w-full bg-gray-200">
              <div className="h-full w-full bg-red-500 origin-left animate-[toastTimeline_5s_linear_forwards]" />
            </div>
          </div>
        </div>
      )}
      <style jsx>{`
        @keyframes toastTimeline {
          from {
            transform: scaleX(1);
          }
          to {
            transform: scaleX(0);
          }
        }
      `}</style>
      <div className="bg-white shadow-lg rounded-2xl p-4 sm:p-6 md:p-6 w-full max-w-[90%] sm:max-w-[1142px] aspect-[1142/348] mx-auto hover:shadow-2xl transition-shadow duration-300">
        <div className="bg-white border-dashed border-2 border-gray-300 rounded-lg p-8 sm:p-8 md:p-8 w-full h-auto mx-auto group hover:border-gray-400 ">
          <label
            htmlFor="file-upload"
            className="w-[154px] h-[105px] mx-auto cursor-pointer relative block"
          >
            <span className="sr-only">Upload PDF file</span>
            <input
              id="file-upload"
              type="file"
              accept={acceptType ? acceptType : "application/pdf"}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              onChange={handleInputChange}
              aria-label="Upload PDF file"
            />
            <UploadAnimationSVG />
          </label>
          <div
            className={`mt-8 sm:mt-4 md:mt-8 text-sm sm:text-base md:text-lg mx-auto text-center bg-primary-900 text-white w-fit py-3 px-8 rounded-lg cursor-pointer hover:bg-primary-800 transition-colors duration-300 uppercase ${
              isLoading ? "opacity-60 cursor-not-allowed" : ""
            }`}
            onClick={() => {
              if (!isLoading) {
                (
                  document.querySelector(
                    'input[type="file"]',
                  ) as HTMLInputElement
                )?.click();
              }
            }}
          >
            <div className="flex items-center justify-center">
              {isLoading ? (
                <>
                  <Loader2 className="mr-4 animate-spin" size={14} />
                  <div>Uploading...</div>
                  <Loader2 className="ml-4 animate-spin" size={14} />
                </>
              ) : (
                <>
                  <CirclePlus className="mr-4" size={14} />
                  <div>Upload Your File</div>
                  <CirclePlus className="ml-4" size={14} />
                </>
              )}
            </div>
          </div>
          <p className="text-sm sm:text-sm md:text-base text-gray-500 mt-4 sm:mt-4 md:mt-4">
            or drop your file here
          </p>
          <p className="text-[16px] sm:text-sm md:text-[12px] text-gray-600 ">
            Limit the file upload to 100MB
          </p>
        </div>
      </div>
    </>
  );
}
