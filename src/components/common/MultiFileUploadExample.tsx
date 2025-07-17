"use client";
import React, { useState } from "react";
import MultiFileUploadSection from "./MultiFileUploadSection";
import { UploadedFile } from "./types";

export default function MultiFileUploadExample() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFilesChange = (files: UploadedFile[]) => {
    setUploadedFiles(files);
    console.log("Files updated:", files.map(f => f.name));
  };

  const handleMergePDF = async () => {
    if (uploadedFiles.length < 2) {
      alert("Please upload at least 2 PDF files to merge.");
      return;
    }

    setIsProcessing(true);
    
    // Simulate PDF merging process
    try {
      console.log("Merging PDFs:", uploadedFiles.map(f => f.name));
      
      // Here you would typically call your PDF merging API
      // const response = await mergePDFs(uploadedFiles.map(f => f.file));
      
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      alert("PDFs merged successfully!");
      
      // Reset the files after successful merge
      setUploadedFiles([]);
      
    } catch (error) {
      console.error("Error merging PDFs:", error);
      alert("Error merging PDFs. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Merge PDF Files
          </h1>
          <p className="text-gray-600 text-lg">
            Upload multiple PDF files and merge them into a single document
          </p>
        </div>

        <MultiFileUploadSection
          acceptType="application/pdf"
          maxFiles={12}
          maxFileSize={100}
          onFilesChange={handleFilesChange}
          actionButtonText={isProcessing ? "MERGING..." : "MERGE PDF"}
          onActionButtonClick={handleMergePDF}
          actionButtonDisabled={isProcessing || uploadedFiles.length < 2}
          dropText="Drop PDF files here"
          uploadText="Upload PDF Files"
        />

        {/* Display current files count */}
        {uploadedFiles.length > 0 && (
          <div className="text-center mt-6">
            <p className="text-gray-600">
              {uploadedFiles.length} file{uploadedFiles.length !== 1 ? 's' : ''} uploaded
              {uploadedFiles.length >= 2 && (
                <span className="text-green-600 ml-2">✓ Ready to merge</span>
              )}
              {uploadedFiles.length === 1 && (
                <span className="text-orange-600 ml-2">⚠ Need at least 2 files</span>
              )}
            </p>
          </div>
        )}

        {/* Instructions */}
        <div className="max-w-2xl mx-auto mt-12 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">How to use:</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-600">
            <li>Click "Upload PDF Files" or drag and drop PDF files into the upload area</li>
            <li>Upload at least 2 PDF files (maximum 12 files, 100MB each)</li>
            <li>Drag and drop files to reorder them as needed</li>
            <li>Click "MERGE PDF" to combine all files into one document</li>
            <li>Remove unwanted files by clicking the trash icon</li>
          </ol>
        </div>
      </div>
    </div>
  );
} 