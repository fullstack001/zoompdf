import { termsOfUseSeo } from "@/data/seoMetadata";
import { buildPageMetadata } from "@/utils/seo";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata(locale, "/terms-of-service", termsOfUseSeo, {
    noIndexFollow: true,
  });
}

export default function TermsOfServiceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
