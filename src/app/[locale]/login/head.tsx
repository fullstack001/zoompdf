import { renderSeoTags } from "@/utils/seo";

export default async function Head({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return renderSeoTags({
    title: "Login | PDFEzy",
    description: "Sign in to your PDFEzy account to manage files and subscriptions.",
    locale,
    path: "/login",
    noIndex: true,
  });
}
