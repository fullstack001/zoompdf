import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ZoomPDF | Online PDF Tools',
  description: 'Convert and manage your PDFs in seconds.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}