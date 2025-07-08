"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { login } from "@/store/slices/authSlice";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FileSidebar from "@/components/files/FileSidebar";
import FileListTable from "@/components/files/FileListTable";

export default function FileListPage() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(login());
  }, [dispatch]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="flex max-w-7xl mx-auto mt-8 gap-6 px-4">
        <FileSidebar />
        <main className="flex-1">
          <FileListTable />
        </main>
      </div>
      <Footer />
    </div>
  );
}
