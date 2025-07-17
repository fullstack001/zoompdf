"use client";
import ConvertPage from "@/components/common/ConvertPage";
import { getConversionConfig } from "@/data/conversionConfig";

export default function WordToPdf() {
  const config = getConversionConfig("word-to-pdf");

  if (!config) {
    return <div>Configuration not found</div>;
  }

  return (
    <ConvertPage
      titleKey={config.titleKey}
      subtitleKey={config.subtitleKey}
      convertFunction={config.convertFunction}
      action={config.action}
      acceptType={config.acceptType}
    />
  );
}
