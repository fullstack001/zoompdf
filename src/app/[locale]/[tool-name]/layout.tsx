import { getToolSeoMetadata } from "@/data/seoMetadata";
import { buildPageMetadata } from "@/utils/seo";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; "tool-name": string }>;
}): Promise<Metadata> {
  const { locale, "tool-name": toolName } = await params;
  const seo = getToolSeoMetadata(toolName);
  return buildPageMetadata(locale, `/${toolName}`, seo);
}

export default function ToolLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
