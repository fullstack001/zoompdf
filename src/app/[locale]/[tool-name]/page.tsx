"use client";
import ConvertPage from "@/components/common/ConvertPage";
import ToolLandingPage from "@/components/common/ToolLandingPage";
import { getConversionConfig } from "@/data/conversionConfig";
import { getToolPageConfig } from "@/data/toolPages";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import CompressPdfPage from "./templates/CompressPdfPage";
import MergePdfPage from "./templates/MergePdfPage";
import SplitPdfPage from "./templates/SplitPdfPage";
import SignPdfPage from "./templates/SignPdfPage";

export default function DynamicToolPage() {
  const params = useParams();
  const toolName = params["tool-name"] as string;
  const t = useTranslations();

  // Check if it's a conversion tool
  const conversionConfig = getConversionConfig(toolName);
  if (conversionConfig) {
    return (
      <ConvertPage
        titleKey={conversionConfig.titleKey}
        subtitleKey={conversionConfig.subtitleKey}
        convertFunction={conversionConfig.convertFunction}
        action={conversionConfig.action}
        acceptType={conversionConfig.acceptType}
      />
    );
  }

  // // Check if it's a tool landing page
  // const toolPageConfig = getToolPageConfig(toolName);
  // console.log(toolPageConfig);
  // if (toolPageConfig) {
  //   return (
  //     <ToolLandingPage
  //       titleKey={toolPageConfig.titleKey}
  //       subtitleKey={toolPageConfig.subtitleKey}
  //       action={toolPageConfig.action}
  //     />
  //   );
  // }

  // Handle special custom pages
  switch (toolName) {
    case "compress-pdf":
      return <CompressPdfPage />;
    case "merge-pdf":
      return <MergePdfPage />;
    case "split-pdf":
      return <SplitPdfPage />;
    case "sign-pdf":
      return <SignPdfPage />;
    default:
      // 404 - Tool not found
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-gray-700 mb-4">
              {t("common.error")}
            </h1>
            <p className="text-gray-600">{t("common.toolNotFound")}</p>
          </div>
        </div>
      );
  }
}
