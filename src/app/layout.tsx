import type { Metadata } from 'next';
import { DM_Sans, Newsreader } from 'next/font/google';
import './globals.css';

const dmSans = DM_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans-main',
});

const newsreader = Newsreader({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-serif-main',
  style: ['normal', 'italic'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.avaniyocc.org'),
  title: 'Avani — Bangalore Youth Environmental Organization | 100% Student-Led',
  description:
    'Avani is Bangalore’s youth-led climate collective uniting students across schools and universities to advocate for environmental restoration, lake revitalization, and circular living.',
  keywords: [
    'Avani',
    'Bangalore youth climate',
    'environmental organization',
    'student climate collective',
    'lake restoration Bangalore',
    'waste segregation India',
    'Avani YOCC',
  ],
  icons: {
    icon: '/assets/branding/avani_logo_circle.png',
    apple: '/assets/branding/avani_logo_square.png',
  },
  openGraph: {
    title: 'Avani — Earth In Our Hands',
    description:
      'Empowering Bangalore’s youth for environmental restoration and grassroots climate justice.',
    url: 'https://www.avaniyocc.org',
    siteName: 'Avani Youth Climate Collective',
    images: [
      {
        url: '/assets/branding/avani_logo_square.png',
        width: 1024,
        height: 1024,
        alt: 'Avani Official Olive Green Emblem',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${newsreader.variable} scroll-smooth`}
    >
      <body className="min-h-screen bg-[#F9FAF7] text-[#163515] antialiased selection:bg-[#54683C] selection:text-white font-sans">
        {children}
      </body>
    </html>
  );
}
