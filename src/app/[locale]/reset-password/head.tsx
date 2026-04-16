import { renderSeoTags } from "@/utils/seo";

export default async function Head({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return renderSeoTags({
    title: "Reset password | PDFezy",
    description: "Set a new password for your PDFezy account.",
    locale,
    path: "/reset-password",
    noIndex: true,
  });
}
