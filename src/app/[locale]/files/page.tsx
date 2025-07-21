"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FileSidebar from "@/components/files/FileSidebar";
import FileListTable from "@/components/files/FileListTable";
import { getFiles } from "@/utils/apiUtils";
// import FileListCards from "@/components/FileListCards"; // Updated path to match the correct location

export default function FileListPage() {
  const [originalFiles, setOriginalFiles] = useState<any[]>([]);
  const [files, setFiles] = useState<any[]>([]);
  const [selectedTool, setSelectedTool] = useState<string[] | null>([]);

  useEffect(() => {
    async function fetchFiles() {
      try {
        const files = await getFiles();
        console.log("Fetched files:", files);
        setOriginalFiles(files);
        setFiles(files);
      } catch (error) {
        console.error("Error fetching files:", error);
      }
    }
    fetchFiles();
  }, []);

  useEffect(() => {
    if (selectedTool && selectedTool.length > 0) {
      console.log(selectedTool);
      const filteredFiles = originalFiles.filter((file) =>
        selectedTool.includes(file.action)
      );
      setFiles(filteredFiles);
    } else {
      setFiles(originalFiles);
    }
  }, [selectedTool]);

  console.log(originalFiles);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="flex flex-col lg:flex-row mx-auto  gap-6 px-4">
        <FileSidebar setSelectedTool={setSelectedTool} />
        <main className="flex-1">
          <FileListTable files={files} /> {/* Updated component */}
        </main>
      </div>
      <Footer />
    </div>
  );
}
