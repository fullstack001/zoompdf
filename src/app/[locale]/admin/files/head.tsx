import { renderSeoTags } from "@/utils/seo";

export default async function Head({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return renderSeoTags({
    title: "Admin Files | PDFEzy",
    description: "Manage processed files in admin.",
    locale,
    path: "/admin/files",
    noIndex: true,
  });
}
