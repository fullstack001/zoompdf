import { renderSeoTags } from "@/utils/seo";

export default async function Head({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return renderSeoTags({
    title: "Reset Password | PDFEzy",
    description: "Reset your PDFEzy account password securely.",
    locale,
    path: "/reset-password",
    noIndex: true,
  });
}
