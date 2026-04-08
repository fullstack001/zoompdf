"use client";

import Script from "next/script";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;

const trackingIds = [GA_MEASUREMENT_ID, GOOGLE_ADS_ID].filter(
  (id): id is string => Boolean(id)
);

const hasTracking = trackingIds.length > 0;

export function trackEvent(
  eventName: string,
  params: Record<string, string | number | boolean> = {}
) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") {
    return;
  }

  window.gtag("event", eventName, params);
}

export function trackAdsConversion(
  conversionLabel: string,
  value?: number,
  currency = "USD"
) {
  if (!GOOGLE_ADS_ID) {
    return;
  }

  trackEvent("conversion", {
    send_to: `${GOOGLE_ADS_ID}/${conversionLabel}`,
    ...(typeof value === "number" ? { value, currency } : {}),
  });
}

export default function GoogleTracking() {
  if (!hasTracking) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${trackingIds[0]}`}
        strategy="afterInteractive"
      />
      <Script id="google-tracking-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          ${trackingIds.map((id) => `gtag('config', '${id}');`).join("\n")}
        `}
      </Script>
    </>
  );
}
