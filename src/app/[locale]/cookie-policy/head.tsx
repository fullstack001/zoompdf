import { renderSeoTags } from "@/utils/seo";

export default async function Head({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return renderSeoTags({
    title: "Cookie Policy | PDFEzy",
    description: "Learn how PDFEzy uses cookies and tracking technologies.",
    locale,
    path: "/cookie-policy",
  });
}
