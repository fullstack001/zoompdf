"use client";
import React from "react";

export default function FileUploadSection({
  acceptType,
  handleFileChange,
}: {
  acceptType?: string;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="bg-white shadow-lg rounded-2xl p-4 sm:p-6 md:p-8 w-full max-w-[90%] sm:max-w-[1142px] aspect-[1142/348] mx-auto">
      <div
        onChange={handleFileChange}
        className="bg-white border-dashed border-2 border-gray-300 rounded-lg p-8 sm:p-12 md:p-16 w-full h-auto sm:h-full mx-auto"
      >
        <label className="mt-6 sm:mt-8 md:mt-12 cursor-pointer bg-primary-900 text-white rounded-full px-6 sm:px-8 md:px-9 py-4 sm:py-5 md:py-6 text-xl sm:text-2xl md:text-4xl shadow-lg">
          +
          <input
            type="file"
            accept={acceptType ? acceptType : "application/pdf"}
            className="hidden"
          />
        </label>
        <p className="mt-8 sm:mt-12 md:mt-16 text-sm sm:text-base md:text-lg">
          Drag & drop your file here
        </p>
        <p className="text-xs sm:text-sm md:text-base text-gray-500 mt-4 sm:mt-6 md:mt-8">
          Size up to 100MB
        </p>
      </div>
    </div>
  );
}
