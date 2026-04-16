"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { locales } from "@/i18n/config";

interface BreadcrumbsProps {
  navigate: (route: string) => void;
}

const UPPERCASE_TOKENS = new Set([
  "pdf",
  "png",
  "jpg",
  "jpeg",
  "svg",
  "txt",
  "html",
  "tiff",
  "webp",
  "avif",
  "eps",
  "dxf",
  "azw3",
  "doc",
  "pptx",
  "ppt",
  "ocr",
  "mobi",
  "epub",
]);

function formatSegmentLabel(segment: string): string {
  return segment
    .split("-")
    .filter(Boolean)
    .map((token) => {
      const lower = token.toLowerCase();
      if (UPPERCASE_TOKENS.has(lower)) return lower.toUpperCase();
      return lower.charAt(0).toUpperCase() + lower.slice(1);
    })
    .join(" ");
}

export default function Breadcrumbs({ navigate }: BreadcrumbsProps) {
  const pathname = usePathname();
  const t = useTranslations();

  const crumbs = useMemo(() => {
    const segments = pathname.split("/").filter(Boolean);
    const routeSegments =
      segments.length > 0 && locales.includes(segments[0] as any)
        ? segments.slice(1)
        : segments;

    if (routeSegments.length === 0) return [];

    return routeSegments.map((segment, index) => ({
      label: formatSegmentLabel(decodeURIComponent(segment)),
      path: `/${routeSegments.slice(0, index + 1).join("/")}`,
      isLast: index === routeSegments.length - 1,
    }));
  }, [pathname]);

  if (crumbs.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className="px-8 py-3">
      <ol className="flex flex-wrap items-center gap-2 text-[18px]">
        <li>
          <button
            type="button"
            onClick={() => navigate("/")}
            className="text-gray-600 hover:text-blue-600 transition-colors"
          >
            {t("navigation.home")}
          </button>
        </li>
        {crumbs.map((crumb) => (
          <li key={crumb.path} className="flex items-center gap-2">
            <span className="text-gray-400">›</span>
            {crumb.isLast ? (
              <span className="text-gray-700">{crumb.label}</span>
            ) : (
              <button
                type="button"
                onClick={() => navigate(crumb.path)}
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                {crumb.label}
              </button>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
