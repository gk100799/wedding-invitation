import type { Metadata, Viewport } from 'next';
import './globals.css';
import { couple, wedding } from '@/lib/data';

export const metadata: Metadata = {
  title: `${couple.groom.name} + ${couple.bride.name} · ${wedding.shortDate}`,
  description: `Save the date — ${wedding.date}, ${wedding.city}. ${wedding.hashtag}`,
  openGraph: {
    title: `${couple.groom.name} weds ${couple.bride.name}`,
    description: `${wedding.date} · ${wedding.city}`,
    type: 'website',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#0a0708',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
