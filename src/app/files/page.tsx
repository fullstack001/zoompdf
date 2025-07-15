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
  console.log(originalFiles);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="flex flex-col lg:flex-row mx-auto mt-8 gap-6 px-4">
        <FileSidebar />
        <main className="flex-1">
          <FileListTable files={files} /> {/* Updated component */}
        </main>
      </div>
      <Footer />
    </div>
  );
}
