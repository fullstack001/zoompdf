"use client";
import ConvertPage from "@/components/common/ConvertPage";
import { getConversionConfig } from "@/data/conversionConfig";

export default function PngToPdf() {
  const config = getConversionConfig("png-to-pdf");
  
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
