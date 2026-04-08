import { renderSeoTags } from "@/utils/seo";

export default async function Head({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return renderSeoTags({
    title: "Privacy Policy | PDFEzy",
    description: "Read how PDFEzy collects, uses, and protects your data.",
    locale,
    path: "/privacy",
  });
}
