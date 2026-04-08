import { renderSeoTags } from "@/utils/seo";

export default async function Head({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return renderSeoTags({
    title: "My Files | PDFEzy",
    description: "Access and manage your processed files in your PDFEzy account.",
    locale,
    path: "/files",
    noIndex: true,
  });
}
