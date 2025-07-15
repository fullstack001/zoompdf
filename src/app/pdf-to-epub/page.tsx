"use client";
import ConvertPage from "@/components/common/ConvertPage";
import { getConversionConfig } from "@/data/conversionConfig";

export default function PdfToEpub() {
  const config = getConversionConfig("pdf-to-epub");
  
  if (!config) {
    return <div>Configuration not found</div>;
  }

  return (
    <ConvertPage
      title={config.title}
      subtitle={config.subtitle}
      convertFunction={config.convertFunction}
      action={config.action}
      acceptType={config.acceptType}
    />
  );
}
