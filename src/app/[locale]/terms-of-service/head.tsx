import { termsOfUseSeo } from "@/data/seoMetadata";
import { renderSeoTags } from "@/utils/seo";

export default async function Head({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return renderSeoTags({
    title: termsOfUseSeo.title,
    description: termsOfUseSeo.description,
    locale,
    path: "/terms-of-service",
    noIndexFollow: true,
  });
}
