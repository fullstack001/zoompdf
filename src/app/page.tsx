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
      <section className="bg-blue-50 text-center py-16 px-4">
        <h1 className="text-4xl font-bold mb-4">PDF to Word Converter</h1>
        <p className="mb-6">
          775K converted files and counting — let&apos;s keep it going!
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
