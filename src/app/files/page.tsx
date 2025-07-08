"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FileSidebar from "@/components/files/FileSidebar";
import FileListTable from "@/components/files/FileListTable";

export default function FileListPage() {
  const [originalFiles, setOriginalFiles] = useState([]);
  const [files, setFiles] = useState([]);

  useEffect(() => {
    async function fetchFiles() {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(
          "https://api.pdfezy.com/api/pdf/files",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Fetched files:", response.data);
        setOriginalFiles(response.data);
        setFiles(response.data);
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
      <div className="flex max-w-7xl mx-auto mt-8 gap-6 px-4">
        <FileSidebar />
        <main className="flex-1">
          <FileListTable files={files} />
        </main>
      </div>
      <Footer />
    </div>
  );
}
