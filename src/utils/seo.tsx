type SeoConfig = {
  title: string;
  description: string;
  locale?: string;
  path?: string;
  noIndex?: boolean;
};

export function renderSeoTags({
  title,
  description,
  locale,
  path = "",
  noIndex = false,
}: SeoConfig) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://pdfezy.com";
  const normalizedBase = baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const localePrefix = locale ? `/${locale}` : "";
  const canonical = `${normalizedBase}${localePrefix}${normalizedPath}`;

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonical} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <link rel="canonical" href={canonical} />
      <meta
        name="robots"
        content={noIndex ? "noindex, nofollow" : "index, follow"}
      />
    </>
  );
}
