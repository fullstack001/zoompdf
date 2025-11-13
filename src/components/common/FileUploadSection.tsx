"use client";
import React, { useState } from "react";
import { CirclePlus, Loader2 } from "lucide-react";
import UploadAnimationSVG from "./UploadAnimationSVG";

export default function FileUploadSection({
  acceptType,
  handleFileChange,
  isLoading,
}: {
  acceptType?: string;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isLoading?: boolean;
}) {
  return (
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
            onChange={handleFileChange}
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
                document.querySelector('input[type="file"]') as HTMLInputElement
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
          Size up to 100MB
        </p>
      </div>
    </div>
  );
}
