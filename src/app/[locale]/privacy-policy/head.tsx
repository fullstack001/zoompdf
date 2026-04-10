import { privacyPolicySeo } from "@/data/seoMetadata";
import { renderSeoTags } from "@/utils/seo";

export default async function Head({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return renderSeoTags({
    title: privacyPolicySeo.title,
    description: privacyPolicySeo.description,
    locale,
    path: "/privacy-policy",
    noIndexFollow: true,
  });
}
