import { renderSeoTags } from "@/utils/seo";

export default async function Head({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return renderSeoTags({
    title: "Terms of Service | PDFEzy",
    description: "Read PDFEzy terms for using the platform and services.",
    locale,
    path: "/terms-of-service",
  });
}
