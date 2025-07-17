"use client";
import ConvertPage from "@/components/common/ConvertPage";
import { getConversionConfig } from "@/data/conversionConfig";
import { useTranslations } from "next-intl";

export default function PdfToWord() {
  const config = getConversionConfig("pdf-to-word");
  const t = useTranslations();

  if (!config) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-700 mb-4">
            {t("common.error")}
          </h1>
          <p className="text-gray-600">{t("common.configNotFound")}</p>
        </div>
      </div>
    );
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
