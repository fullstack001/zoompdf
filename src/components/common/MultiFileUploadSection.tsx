"use client";
import React, { useState, useRef } from "react";
import { CirclePlus, Trash2, GripVertical } from "lucide-react";
import { UploadedFile, MultiFileUploadSectionProps } from "./types";
import UploadAnimationSVG from "./UploadAnimationSVG";
import PDFIcon from "./PDFIcon";

export default function MultiFileUploadSection({
  acceptType = "application/pdf",
  maxFiles = 12,
  maxFileSize = 100,
  onFilesChange,
  actionButtonText = "PROCESS FILES",
  onActionButtonClick,
  actionButtonDisabled = false,
  dropText = "Drop PDF files here",
  uploadText = "Upload Your File",
}: MultiFileUploadSectionProps) {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    addFiles(selectedFiles);
  };

  const addFiles = (newFiles: File[]) => {
    const validFiles = newFiles.filter((file) => {
      if (file.size > maxFileSize * 1024 * 1024) {
        alert(
          `File ${file.name} is too large. Maximum size is ${maxFileSize}MB.`
        );
        return false;
      }
      return true;
    });

    const filesToAdd = validFiles.slice(0, maxFiles - files.length);

    const uploadedFiles: UploadedFile[] = filesToAdd.map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      name: file.name,
      size: file.size,
    }));

    const updatedFiles = [...files, ...uploadedFiles];
    setFiles(updatedFiles);
    onFilesChange(updatedFiles);

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeFile = (id: string) => {
    const updatedFiles = files.filter((file) => file.id !== id);
    setFiles(updatedFiles);
    onFilesChange(updatedFiles);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  // Drag and drop handlers
  const handleDragStart = (e: React.DragEvent, index: number) => {
    e.dataTransfer.setData("text/plain", index.toString());
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    setDragOverIndex(index);
  };

  const handleDragLeave = () => {
    setDragOverIndex(null);
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    const dragIndex = parseInt(e.dataTransfer.getData("text/plain"));

    if (dragIndex !== dropIndex) {
      const newFiles = [...files];
      const draggedFile = newFiles[dragIndex];
      newFiles.splice(dragIndex, 1);
      newFiles.splice(dropIndex, 0, draggedFile);
      setFiles(newFiles);
      onFilesChange(newFiles);
    }
    setDragOverIndex(null);
  };

  const handleAddMoreClick = () => {
    fileInputRef.current?.click();
  };

  // If no files uploaded, show initial upload interface
  if (files.length === 0) {
    return (
      <div className="bg-white shadow-lg rounded-2xl p-4 sm:p-6 md:p-6 w-full max-w-[90%] sm:max-w-[1142px] aspect-[1142/348] mx-auto hover:shadow-2xl transition-shadow duration-300">
        <div className="bg-white border-dashed border-2 border-gray-300 rounded-lg p-8 sm:p-8 md:p-8 w-full h-auto mx-auto group hover:border-gray-400">
          <div className="w-[154px] h-[105px] mx-auto cursor-pointer relative">
            <input
              ref={fileInputRef}
              type="file"
              accept={acceptType}
              multiple
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              onChange={handleFileChange}
            />
            <UploadAnimationSVG />
          </div>
          <div
            className="mt-8 sm:mt-4 md:mt-8 text-sm sm:text-base md:text-lg mx-auto text-center bg-primary-900 text-white w-fit py-3 px-8 rounded-lg cursor-pointer hover:bg-primary-800 transition-colors duration-300 uppercase"
            onClick={handleAddMoreClick}
          >
            <div className="flex items-center justify-center">
              <CirclePlus className="mr-4" size={14} />
              <div>{uploadText}</div>
              <CirclePlus className="ml-4" size={14} />
            </div>
          </div>
          <p className="text-sm sm:text-sm md:text-base text-gray-500 mt-4 sm:mt-4 md:mt-4">
            or drop your file here
          </p>
          <p className="text-[16px] sm:text-sm md:text-[12px] text-gray-400">
            Size up to {maxFileSize}MB
          </p>
        </div>
      </div>
    );
  }

  // Multi-file interface when files are uploaded
  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-[90%] sm:max-w-[1142px] mx-auto">
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8">
        {/* File Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
          {files.map((file, index) => (
            <div
              key={file.id}
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, index)}
              className={`bg-white border-2 rounded-lg p-4 cursor-move hover:border-blue-300 transition-all duration-200 ${
                dragOverIndex === index
                  ? "border-blue-400 bg-blue-50"
                  : "border-gray-200"
              }`}
            >
              {/* Delete button */}
              <div className="flex justify-between items-start mb-3">
                <div className="w-6 h-6 text-gray-400">
                  <GripVertical size={20} />
                </div>
                <button
                  onClick={() => removeFile(file.id)}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>

              {/* PDF Icon */}
              <div className="flex justify-center mb-3">
                <PDFIcon width={60} height={60} />
              </div>

              {/* File name */}
              <p
                className="text-sm text-gray-600 text-center font-medium truncate"
                title={file.name}
              >
                {file.name}
              </p>
              <p className="text-xs text-gray-400 text-center mt-1">
                {formatFileSize(file.size)}
              </p>
            </div>
          ))}

          {/* Add More Button */}
          {files.length < maxFiles && (
            <div
              onClick={handleAddMoreClick}
              className="border-2 border-dashed border-blue-300 rounded-lg p-4 cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 flex flex-col items-center justify-center min-h-[160px]"
            >
              <div className="text-blue-500 mb-2">
                <CirclePlus size={32} />
              </div>
              <p className="text-blue-600 font-medium text-sm">Add more</p>
            </div>
          )}
        </div>

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept={acceptType}
          multiple
          className="hidden"
          onChange={handleFileChange}
        />

        {/* Action Button */}
        <div className="text-center">
          <button
            onClick={onActionButtonClick}
            disabled={actionButtonDisabled || files.length === 0}
            className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200 uppercase flex items-center justify-center"
          >
            {actionButtonDisabled && files.length > 0 ? (
              <>
                <span className="inline-block animate-spin mr-2">⌛</span>
                Processing...
              </>
            ) : (
              actionButtonText
            )}
          </button>
        </div>

        {/* Info Text */}
        <div className="text-center mt-4">
          <p className="text-gray-600 text-sm">{dropText}</p>
          <p className="text-gray-400 text-xs mt-1">
            You can upload up to {maxFiles} files in{" "}
            {acceptType.includes("pdf") ? "PDF" : "files"}, each file size to{" "}
            {maxFileSize} MB.
          </p>
        </div>
      </div>
    </div>
  );
}
