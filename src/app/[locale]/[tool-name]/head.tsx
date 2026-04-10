import { getToolSeoMetadata } from "@/data/seoMetadata";
import { renderSeoTags } from "@/utils/seo";

export default async function Head({
  params,
}: {
  params: Promise<{ locale: string; "tool-name": string }>;
}) {
  const { locale, "tool-name": toolName } = await params;
  const seo = getToolSeoMetadata(toolName);

  return renderSeoTags({
    title: seo.title,
    description: seo.description,
    locale,
    path: `/${toolName}`,
  });
}
