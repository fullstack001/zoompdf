import { planSeo } from "@/data/seoMetadata";
import { renderSeoTags } from "@/utils/seo";

export default async function Head({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return renderSeoTags({
    title: planSeo.title,
    description: planSeo.description,
    locale,
    path: "/plan",
  });
}
