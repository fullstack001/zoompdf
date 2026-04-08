import { Poppins } from "next/font/google";
import { Metadata } from "next";
import "./globals.css";
import GoogleTracking from "@/components/analytics/GoogleTracking";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://pdfezy.com"),
  title: {
    default: "PDFEzy - PDF Tools",
    template: "%s | PDFEzy",
  },
  description: "Convert, edit, compress, and manage your PDF files online",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "PDFEzy - PDF Tools",
    description: "Convert, edit, compress, and manage your PDF files online",
    url: "/",
    siteName: "PDFEzy",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PDFEzy - PDF Tools",
    description: "Convert, edit, compress, and manage your PDF files online",
  },
  robots: {
    index: true,
    follow: true,
  },
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
