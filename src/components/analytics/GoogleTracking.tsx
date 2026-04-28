"use client";

import Script from "next/script";

declare global {
  interface Window {
    dataLayer: unknown[];
  }
}

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;
const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;

export function trackEvent(
  eventName: string,
  params: Record<string, string | number | boolean> = {}
) {
  if (typeof window === "undefined") {
    return;
  }

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: eventName,
    ...params,
  });
}

export function trackAdsConversion(
  conversionLabel: string,
  value?: number,
  currency = "USD"
) {
  if (!GOOGLE_ADS_ID) {
    return;
  }

  trackEvent("ads_conversion", {
    send_to: `${GOOGLE_ADS_ID}/${conversionLabel}`,
    ...(typeof value === "number" ? { value, currency } : {}),
  });
}

export default function GoogleTracking() {
  if (!GTM_ID) {
    return null;
  }

  return (
    <>
      <Script id="google-tag-manager-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${GTM_ID}');
        `}
      </Script>
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
          title="gtm"
        />
      </noscript>
    </>
  );
}
