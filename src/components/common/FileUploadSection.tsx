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
    <div className="bg-white shadow-lg rounded-lg p-4 max-w-3xl mx-auto">
      <div className="bg-white border-dashed border-2 border-gray-300 rounded-lg p-12 max-w-3xl mx-auto">
        <label className="cursor-pointer bg-primary-900 text-white rounded-full px-4 py-2 text-xl shadow-lg">
          +
          <input
            type="file"
            accept={acceptType ? acceptType : "application/pdf"}
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
        <p className="mt-2">Drag & drop your file here</p>
        <p className="text-sm text-gray-500 mt-2">Size up to 100MB</p>
      </div>
    </div>
  );
}
