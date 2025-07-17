"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UploadedFile, fileUploadManager } from '@/utils/fileUploadUtils';
import { usePathname } from 'next/navigation';

interface FileContextType {
  uploadedFile: UploadedFile | null;
  setUploadedFile: (file: UploadedFile | null) => void;
  uploadFile: (file: File) => Promise<UploadedFile>;
  clearFile: () => void;
  isLoading: boolean;
  progress: number;
  setNavigatingToEditor: (navigating: boolean) => void;
  // Multiple files support for merge operations
  uploadedFiles: UploadedFile[];
  setUploadedFiles: (files: UploadedFile[]) => void;
  uploadMultipleFiles: (files: File[]) => Promise<UploadedFile[]>;
  clearFiles: () => void;
}

const FileContext = createContext<FileContextType | undefined>(undefined);

export const useFileContext = () => {
  const context = useContext(FileContext);
  if (context === undefined) {
    throw new Error("useFileContext must be used within a FileProvider");
  }
  return context;
};

interface FileProviderProps {
  children: ReactNode;
}

export const FileProvider: React.FC<FileProviderProps> = ({ children }) => {
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isNavigatingToEditor, setIsNavigatingToEditor] = useState(false);
  const pathname = usePathname();

  const uploadFile = async (file: File): Promise<UploadedFile> => {
    setIsLoading(true);
    setProgress(0);

    try {
      const uploadedFile = await fileUploadManager.uploadFile(
        file,
        (progressPercent) => {
          setProgress(progressPercent);
        }
      );
      setUploadedFile(uploadedFile);
      setProgress(100);
      return uploadedFile;
    } catch (error) {
      console.error("Upload error:", error);
      setProgress(0);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const clearFile = () => {
    if (uploadedFile) {
      fileUploadManager.deleteFile(uploadedFile.id);
      setUploadedFile(null);
    }
  };

  const uploadMultipleFiles = async (
    files: File[]
  ): Promise<UploadedFile[]> => {
    setIsLoading(true);
    setProgress(0);

    try {
      const uploadPromises = files.map((file, index) =>
        fileUploadManager.uploadFile(file, (progressPercent) => {
          // Calculate overall progress across all files
          const overallProgress =
            (index * 100 + progressPercent) / files.length;
          setProgress(overallProgress);
        })
      );

      const uploadedFiles = await Promise.all(uploadPromises);
      setUploadedFiles(uploadedFiles);
      setProgress(100);
      return uploadedFiles;
    } catch (error) {
      console.error("Multiple files upload error:", error);
      setProgress(0);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const clearFiles = () => {
    uploadedFiles.forEach((file) => {
      fileUploadManager.deleteFile(file.id);
    });
    setUploadedFiles([]);
  };

  // Cleanup files when navigating away from editor - only if we're not going to editor
  useEffect(() => {
    // Don't cleanup if we're on editor page or if we just uploaded a file and are about to go to editor
    if (
      uploadedFile &&
      !pathname.includes("/editor") &&
      pathname !== "/" &&
      !isNavigatingToEditor
    ) {
      // Only cleanup if we're navigating away from editor and not to home
      fileUploadManager.deleteFile(uploadedFile.id);
      setUploadedFile(null);
    }

    // Reset navigation flag when we reach editor
    if (pathname.includes("/editor")) {
      setIsNavigatingToEditor(false);
    }
  }, [pathname, uploadedFile, isNavigatingToEditor]);

  const value: FileContextType = {
    uploadedFile,
    setUploadedFile,
    uploadFile,
    clearFile,
    isLoading,
    progress,
    setNavigatingToEditor: setIsNavigatingToEditor,
    uploadedFiles,
    setUploadedFiles,
    uploadMultipleFiles,
    clearFiles,
  };

  return <FileContext.Provider value={value}>{children}</FileContext.Provider>;
}; 