"use client";
import ToolLandingPage from "@/components/common/ToolLandingPage";
import { getToolPageConfig } from "@/data/toolPages";

export default function SplitPDFPage() {
  const config = getToolPageConfig("split-pdf");
  console.log(config);

  if (!config) {
    return <div>Page not found</div>;
  }

  return (
    <ToolLandingPage
      titleKey={config.titleKey}
      subtitleKey={config.subtitleKey}
      action={config.action}
    />
  );
}
