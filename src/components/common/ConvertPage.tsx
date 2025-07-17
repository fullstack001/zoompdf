"use client";
import React from "react";
import Navbar from "@/components/Navbar";
import ToolsGrid from "@/components/landing/ToolsGrid";
import HowItWorks from "@/components/landing/HowItWorks";
import FeatureCTA from "@/components/landing/FeatureCTA";
import WhyUs from "@/components/landing/WhyUs";
import CoreValues from "@/components/landing/CoreValues";
import FAQ from "@/components/landing/FAQ";
import Footer from "@/components/Footer";
import FeatureItems from "@/components/common/FeatureItems";
import FileUploadSection from "@/components/common/FileUploadSection";
import ProgressModal from "@/components/common/ProgressModal";
import EmailModal from "@/components/common/EmailModal";
import { useFileConversion } from "@/utils/useFileConversion";
import { useTranslations } from "next-intl";

interface ConvertPageProps {
  titleKey: string;
  subtitleKey: string;
  convertFunction: (file: File) => Promise<string>;
  action: string;
  acceptType?: string;
}

export default function ConvertPage({
  titleKey,
  subtitleKey,
  convertFunction,
  action,
  acceptType,
}: ConvertPageProps) {
  const {
    uploading,
    progress,
    status,
    isEmailModalVisible,
    email,
    setEmail,
    setEmailModalVisible,
    handleFileChange,
  } = useFileConversion({
    convertFunction,
    action,
    acceptType,
  });

  const t = useTranslations();

  return (
    <main className="bg-gray-50">
      <Navbar />

      <section className="bg-[#edf0ff] text-center py-8 px-6 sm:py-12 sm:px-12 lg:px-24">
        <h1 className="text-4xl lg:text-5xl font-medium mb-6 pt-4 sm:pt-4">
          {t(titleKey)}
        </h1>
        <p className="mb-8 text-2xl lg:text-3xl font-light">{t(subtitleKey)}</p>
        <FileUploadSection
          acceptType={acceptType}
          handleFileChange={handleFileChange}
        />

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