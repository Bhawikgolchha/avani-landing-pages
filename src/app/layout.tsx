import type { Metadata } from 'next';
import { Inter, Fraunces, Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const fraunces = Fraunces({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-fraunces',
  axes: ['opsz', 'SOFT'],
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jakarta',
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://avani-landing-pages.vercel.app'),
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
    url: 'https://avani-landing-pages.vercel.app',
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
      className={`${inter.variable} ${fraunces.variable} ${plusJakarta.variable} ${jetbrains.variable} scroll-smooth`}
    >
      <body className="min-h-screen bg-[#F9FAF7] text-[#163515] antialiased selection:bg-[#54683C] selection:text-white font-sans">
        {children}
      </body>
    </html>
  );
}
