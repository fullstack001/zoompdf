"use client";
import Navbar from "@/components/Navbar";
import FileUploadSection from "@/components/common/FileUploadSection";
import FeatureItems from "@/components/common/FeatureItems";
// import ProgressModal from "@/components/common/ProgressModal";
import ToolsGrid from "@/components/landing/ToolsGrid";
import HowItWorks from "@/components/landing/HowItWorks";
import FeatureCTA from "@/components/landing/FeatureCTA";
import WhyUs from "@/components/landing/WhyUs";
import CoreValues from "@/components/landing/CoreValues";
import FAQ from "@/components/landing/FAQ";
import Footer from "@/components/Footer";

export default function HomePage() {
  // const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    if (selectedFile) {
      window.alert(`File selected: ${selectedFile.name}`);
    } else {
      window.alert("No file selected.");
    }
  };

  return (
    <main className="bg-gray-50">
      <Navbar />
      <section className="bg-[#edf0ff] text-center py-8 px-6 sm:py-12 sm:px-12 lg:px-24">
        <h1 className="text-4xl lg:text-5xl font-medium mb-6 pt-4 sm:pt-4 ">
          PDF to Word Converter
        </h1>
        <p className="mb-8 text-2xl lg:text-3xl font-light">
          1M+ files processed monthly. Upload a file to get started!
        </p>
        <FileUploadSection handleFileChange={handleFileChange} />
        <FeatureItems />
        {/* {uploading && <ProgressModal progress={progress} status={status} />} */}
      </section>
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
