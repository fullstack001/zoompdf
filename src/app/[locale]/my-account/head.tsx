import { renderSeoTags } from "@/utils/seo";

export default async function Head({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return renderSeoTags({
    title: "My Account | PDFEzy",
    description: "Manage your profile, billing, and subscription settings on PDFEzy.",
    locale,
    path: "/my-account",
    noIndex: true,
  });
}
