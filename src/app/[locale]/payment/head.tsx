import { renderSeoTags } from "@/utils/seo";

export default async function Head({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return renderSeoTags({
    title: "Payment | PDFEzy",
    description: "Complete your PDFEzy subscription payment securely.",
    locale,
    path: "/payment",
    noIndex: true,
  });
}
