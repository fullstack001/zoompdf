import { renderSeoTags } from "@/utils/seo";

export default async function Head({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return renderSeoTags({
    title: "Admin Payments | PDFEzy",
    description: "Manage payments and subscriptions.",
    locale,
    path: "/admin/payments",
    noIndex: true,
  });
}
