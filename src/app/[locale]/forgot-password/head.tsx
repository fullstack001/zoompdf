import { renderSeoTags } from "@/utils/seo";

export default async function Head({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return renderSeoTags({
    title: "Forgot password | Pdfezy",
    description: "Request a secure link to reset your Pdfezy account password.",
    locale,
    path: "/forgot-password",
    noIndex: true,
  });
}
