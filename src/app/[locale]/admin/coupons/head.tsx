import { renderSeoTags } from "@/utils/seo";

export default async function Head({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return renderSeoTags({
    title: "Admin Coupons | PDFEzy",
    description: "Manage discount coupons in admin.",
    locale,
    path: "/admin/coupons",
    noIndex: true,
  });
}
