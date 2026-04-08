import { renderSeoTags } from "@/utils/seo";

export default async function Head({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return renderSeoTags({
    title: "PDFEzy - PDF Tools",
    description: "Convert, edit, compress, merge, split, and sign PDFs online.",
    locale,
    path: "",
  });
}
