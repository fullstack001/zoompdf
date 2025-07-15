"use client";
import ConvertPage from "@/components/common/ConvertPage";
import { getConversionConfig } from "@/data/conversionConfig";

export default function PdfToWord() {
  const config = getConversionConfig("pdf-to-word");
  
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
