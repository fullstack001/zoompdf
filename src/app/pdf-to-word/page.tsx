"use client";
import Navbar from "@/components/Navbar";
import ToolsGrid from "@/components/landing/ToolsGrid";
import HowItWorks from "@/components/landing/HowItWorks";
import FeatureCTA from "@/components/landing/FeatureCTA";
import WhyUs from "@/components/landing/WhyUs";
import CoreValues from "@/components/landing/CoreValues";
import FAQ from "@/components/landing/FAQ";
import Footer from "@/components/Footer";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import FeatureItems from "@/components/common/FeatureItems";
import FileUploadSection from "@/components/common/FileUploadSection";
import ProgressModal from "@/components/common/ProgressModal";
import EmailModal from "@/components/common/EmailModal";
import { useDispatch, useSelector } from "react-redux";
import { setAction, setFileName } from "@/store/slices/flowSlice";
import { RootState } from "@/store/store"; // Import RootState for type safety
import { downloadFile } from "@/utils/apiUtils";

export default function PDfToWord() {
  const dispatch = useDispatch();
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<string[]>([]);
  const [isEmailModalVisible, setEmailModalVisible] = useState(false);
  const [email, setEmail] = useState("");
  const router = useRouter();
  const subscription = useSelector(
    (state: RootState) => state.user.subscription
  );
  const auth = useSelector((state: RootState) => state.auth.isLoggedIn); // Use RootState for type safety

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setStatus(["Uploading file..."]);

    const formData = new FormData();
    formData.append("files", file);

    try {
      let fileName = ""; // Variable to store the file name
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
      const response = await axios.post(
        `https://api.pdfezy.com/api/pdf/pdf_to_word`,
        formData,
        {
          timeout: 600000, // Set timeout to 60 seconds
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / (progressEvent.total || 1)
            );
            console.log(percentCompleted);
          },
        }
      );
      fileName = response.data; // Save the file name from response
      console.log(fileName);
      dispatch(setFileName(fileName)); // Save file name in global store
      dispatch(setAction("pdf_to_word")); // Save action in global store
      setUploading(false);
      if (!auth) {
        setEmailModalVisible(true); // Show email modal if not authenticated
      } else {
        const token = localStorage.getItem("authToken"); // Retrieve token from local storage
        // Get file name from Redux store

        if (
          subscription &&
          new Date(subscription.expiryDate) > new Date() &&
          token
        ) {
          try {
            await downloadFile(fileName, "pdf_to_word", token, router.push);
          } catch (err) {
            console.error("Error downloading file:", err);
            window.alert("Failed to download file.");
          }
        } else {
          router.push(`/plan`); // Redirect to register page if subscription is not valid
        }
      }
    } catch (error) {
      console.error("Error during file upload:", error);
      setUploading(false);
      alert("File upload failed. Please try again.");
    }
  };

  return (
    <main className="bg-gray-50">
      <Navbar />

      <section className="bg-[#edf0ff] text-center py-8 px-6 sm:py-12 sm:px-12 lg:px-24">
        <h1 className="text-4xl lg:text-5xl font-medium mb-6 pt-8 sm:pt-12 ">
          PDF to Word Converter
        </h1>
        <p className="mb-8 text-2xl lg:text-3xl font-medium">
          775K converted files and counting — let&apos;s keep it going!
        </p>
        <FileUploadSection handleFileChange={handleFileChange} />

        <FeatureItems />
        {uploading && <ProgressModal progress={progress} status={status} />}
      </section>

      {/* Email Modal */}
      <EmailModal
        isVisible={isEmailModalVisible}
        email={email}
        onEmailChange={setEmail}
        onClose={() => setEmailModalVisible(false)}
      />

      <HowItWorks />
      <ToolsGrid />
      <FeatureCTA />
      <WhyUs />
      <CoreValues />
      <FAQ />
      <Footer />
    </main>
  );
}
