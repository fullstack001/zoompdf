import { renderSeoTags } from "@/utils/seo";

export default async function Head({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return renderSeoTags({
    title: "Subscription Terms | PDFEzy",
    description: "Review PDFEzy subscription billing, renewal, and cancellation terms.",
    locale,
    path: "/subscription-terms",
  });
}
