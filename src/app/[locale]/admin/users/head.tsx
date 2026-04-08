import { renderSeoTags } from "@/utils/seo";

export default async function Head({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return renderSeoTags({
    title: "Admin Users | PDFEzy",
    description: "Manage PDFEzy users.",
    locale,
    path: "/admin/users",
    noIndex: true,
  });
}
