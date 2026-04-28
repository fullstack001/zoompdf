import { renderSeoTags } from "@/utils/seo";

export default async function Head({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return renderSeoTags({
    title: "Payment Success | PDFEzy",
    description: "Payment completed successfully.",
    locale,
    path: "/success",
    noIndex: true,
  });
}
