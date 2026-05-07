import type { Metadata, Viewport } from 'next';
import './globals.css';
import { couple, wedding } from '@/lib/data';

const SITE_URL = 'https://gk100799.github.io/wedding-invitation';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: `${couple.groom.name} + ${couple.bride.name} · ${wedding.shortDate}`,
  description: `Save the date — ${wedding.date}, ${wedding.city}. ${wedding.hashtag}`,
  icons: {
    icon: [{ url: `${SITE_URL}/favicon.svg`, type: 'image/svg+xml' }],
    apple: `${SITE_URL}/favicon.svg`,
  },
  openGraph: {
    title: `${couple.groom.name} weds ${couple.bride.name}`,
    description: `${wedding.date} · ${wedding.city} · ${wedding.hashtag}`,
    type: 'website',
    url: SITE_URL,
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: `${couple.groom.name} & ${couple.bride.name} — ${wedding.date}, ${wedding.city}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${couple.groom.name} weds ${couple.bride.name}`,
    description: `${wedding.date} · ${wedding.city}`,
    images: [`${SITE_URL}/og-image.png`],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0a0708',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-IN">
      <body>{children}</body>
    </html>
  );
}
