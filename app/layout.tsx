import type { Metadata } from 'next';
import { JetBrains_Mono, Instrument_Serif, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const instrumentSerif = Instrument_Serif({
  variable: '--font-instrument-serif',
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  display: 'swap',
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: '--font-jakarta',
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  display: 'swap',
});

const BASE_URL = 'https://nikhilraj.dev';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: 'Nikhil Raj — Fullstack Developer',
  description:
    'Fullstack developer specializing in React, Next.js, and TypeScript. 4 years, 30+ projects.',
  openGraph: {
    title: 'Nikhil Raj — Fullstack Developer',
    description:
      'Fullstack developer specializing in React, Next.js, and TypeScript. 4 years, 30+ projects.',
    type: 'website',
    url: BASE_URL,
    images: [{ url: '/og-image.svg', width: 1200, height: 630, alt: 'Nikhil Raj' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nikhil Raj — Fullstack Developer',
    description:
      'Fullstack developer specializing in React, Next.js, and TypeScript. 4 years, 30+ projects.',
    images: ['/og-image.svg'],
  },
  other: {
    'theme-color': '#09090b',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${jetbrainsMono.variable} ${instrumentSerif.variable} ${plusJakartaSans.variable} h-full`}
    >
      <body className="h-full overflow-hidden">{children}</body>
    </html>
  );
}
