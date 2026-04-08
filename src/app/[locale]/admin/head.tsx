import { renderSeoTags } from "@/utils/seo";

export default async function Head({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return renderSeoTags({
    title: "Admin Dashboard | PDFEzy",
    description: "PDFEzy admin dashboard.",
    locale,
    path: "/admin",
    noIndex: true,
  });
}
