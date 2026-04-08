import { renderSeoTags } from "@/utils/seo";

export default async function Head({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return renderSeoTags({
    title: "Sign PDF Success | PDFEzy",
    description: "Your signed PDF is being prepared for download.",
    locale,
    path: "/success-sign",
    noIndex: true,
  });
}
