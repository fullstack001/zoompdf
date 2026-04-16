import { Poppins } from "next/font/google";
import { homeSeo } from "@/data/seoMetadata";
import type { Metadata, Viewport } from "next";
import "./globals.css";
import GoogleTracking from "@/components/analytics/GoogleTracking";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://pdfezy.com"),
  title: homeSeo.title,
  description: homeSeo.description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: homeSeo.title,
    description: homeSeo.ogDescription ?? homeSeo.description,
    url: "/",
    siteName: "PDFezy",
    type: "website",
    images: [{ url: "/PDFezy_Social.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: homeSeo.title,
    description: homeSeo.twitterDescription ?? homeSeo.description,
    images: ["/PDFezy_Social.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1A56DB",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={poppins.variable} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <GoogleTracking />
        {children}
      </body>
    </html>
  );
}
