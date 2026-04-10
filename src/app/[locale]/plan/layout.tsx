import { planSeo } from "@/data/seoMetadata";
import { buildPageMetadata } from "@/utils/seo";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata(locale, "/plan", planSeo);
}

export default function PlanLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
