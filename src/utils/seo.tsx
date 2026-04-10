import type { ToolSeoEntry } from "@/data/seoMetadata";
import type { Metadata } from "next";

type SeoConfig = {
  title: string;
  description: string;
  locale?: string;
  path?: string;
  /** Full admin / auth pages: hide from index and do not follow links. */
  noIndex?: boolean;
  /** Legal pages: hide from index but allow following links (per SEO guide). */
  noIndexFollow?: boolean;
};

const DEFAULT_OG_IMAGE_PATH = "/assets/images/logo.svg";

function normalizePath(path: string): string {
  if (!path || path === "/") return "";
  return path.startsWith("/") ? path : `/${path}`;
}

/** Next.js Metadata for a localized route (overrides root defaults). */
export function buildPageMetadata(
  locale: string,
  path: string,
  seo: ToolSeoEntry,
  options?: { noIndexFollow?: boolean }
): Metadata {
  const p = normalizePath(path);
  const relativeCanonical = `/${locale}${p}`;
  const baseUrl = (
    process.env.NEXT_PUBLIC_SITE_URL || "https://pdfezy.com"
  ).replace(/\/$/, "");
  const absoluteUrl = `${baseUrl}${relativeCanonical}`;
  const ogDesc = seo.ogDescription ?? seo.description;
  const twDesc = seo.twitterDescription ?? seo.description;
  const imageUrl = `${baseUrl}${DEFAULT_OG_IMAGE_PATH}`;

  return {
    title: { absolute: seo.title },
    description: seo.description,
    alternates: { canonical: relativeCanonical },
    robots: options?.noIndexFollow
      ? { index: false, follow: true }
      : { index: true, follow: true },
    openGraph: {
      title: seo.title,
      description: ogDesc,
      url: absoluteUrl,
      siteName: "PDFezy",
      type: "website",
      images: [{ url: imageUrl }],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: twDesc,
      images: [imageUrl],
    },
  };
}

export function renderSeoTags({
  title,
  description,
  locale,
  path = "",
  noIndex = false,
  noIndexFollow = false,
}: SeoConfig) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://pdfezy.com";
  const normalizedBase = baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const localePrefix = locale ? `/${locale}` : "";
  const canonical = `${normalizedBase}${localePrefix}${normalizedPath}`;
  const imageUrl = `${normalizedBase}${DEFAULT_OG_IMAGE_PATH}`;

  let robots: string;
  if (noIndex) {
    robots = "noindex, nofollow";
  } else if (noIndexFollow) {
    robots = "noindex, follow";
  } else {
    robots = "index, follow";
  }

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="PDFezy" />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={imageUrl} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      <link rel="canonical" href={canonical} />
      <meta name="robots" content={robots} />
    </>
  );
}
