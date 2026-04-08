import { renderSeoTags } from "@/utils/seo";

function prettifyToolName(toolName: string) {
  return toolName
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export default async function Head({
  params,
}: {
  params: Promise<{ locale: string; "tool-name": string }>;
}) {
  const { locale, "tool-name": toolName } = await params;
  const prettyToolName = prettifyToolName(toolName);

  return renderSeoTags({
    title: `${prettyToolName} | PDFEzy`,
    description: `Use PDFEzy to ${prettyToolName.toLowerCase()} quickly and securely online.`,
    locale,
    path: `/${toolName}`,
  });
}
