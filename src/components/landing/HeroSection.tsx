"use client";
import { useState } from "react";
import axios from "axios";
import FeatureItems from "@/components/common/FeatureItems";
import FileUploadSection from "@/components/common/FileUploadSection";
import ProgressModal from "@/components/common/ProgressModal";

export default function HeroSection({
  title,
  content,
  endpoint,
}: {
  title?: string;
  content?: string;
  endpoint: string;
}) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<string[]>([]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setStatus(["Uploading file..."]);

    const formData = new FormData();
    formData.append("files", file);

    try {
      await axios.post(`https://api.pdfezy.com${endpoint}`, formData, {
        timeout: 600000, // Set timeout to 60 seconds
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / (progressEvent.total || 1)
          );
          console.log(`Upload progress: ${percentCompleted}%`);
        },
      });

      // Simulate step-by-step progress updates
      let loaded = progress;
      const interval = setInterval(() => {
        loaded += 10; // Increment progress by 10%
        setProgress(Math.min(loaded, 90)); // Cap progress at 70%
        if (loaded === 20) {
          setStatus(["Uploading file...", "Converting the document..."]);
        } else if (loaded >= 40) {
          setStatus([
            "Uploading file...",
            "Converting the document...",
            "Securing the document...",
          ]);
        } else if (loaded >= 70) {
          clearInterval(interval);
        }
      }, 300); // Update every 300ms
    } catch (error) {
      console.error("Error during file upload:", error);
      setUploading(false);
      alert("File upload failed. Please try again.");
    } finally {
      // setTimeout(() => {
      //   router.push("/editor"); // Redirect to editor or another page
      // }, 1000);
    }
  };

  return (
    <section className="bg-[#edf0ff] text-center py-8 px-6 sm:py-12 sm:px-12 lg:px-24">
      <h1 className="text-4xl lg:text-5xl font-medium mb-6 pt-8 sm:pt-12 ">
        {title ? title : "Online PDF to Word Converter"}
      </h1>
      <p className="mb-8 text-2xl lg:text-3xl font-medium">
        {content ? content : "Change file formats in seconds"}
      </p>
      <FileUploadSection handleFileChange={handleFileChange} />

      <FeatureItems />
      {uploading && <ProgressModal progress={progress} status={status} />}
    </section>
  );
}
