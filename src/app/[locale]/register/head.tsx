import { renderSeoTags } from "@/utils/seo";

export default async function Head({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return renderSeoTags({
    title: "Create Account | PDFEzy",
    description: "Create your PDFEzy account to process and download PDF files.",
    locale,
    path: "/register",
    noIndex: true,
  });
}
