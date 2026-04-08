import { renderSeoTags } from "@/utils/seo";

export default async function Head({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return renderSeoTags({
    title: "Edit PDF Success | PDFEzy",
    description: "Your edited PDF is being prepared for download.",
    locale,
    path: "/success-edit",
    noIndex: true,
  });
}
