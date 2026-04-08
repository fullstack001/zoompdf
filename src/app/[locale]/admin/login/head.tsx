import { renderSeoTags } from "@/utils/seo";

export default async function Head({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return renderSeoTags({
    title: "Admin Login | PDFEzy",
    description: "Sign in to the PDFEzy admin area.",
    locale,
    path: "/admin/login",
    noIndex: true,
  });
}
