import type { Metadata } from 'next';
import { JetBrains_Mono, Instrument_Serif, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

const instrumentSerif = Instrument_Serif({
  variable: '--font-instrument-serif',
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: '--font-jakarta',
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Nikhil Raj — Portfolio',
  description: 'Full Stack Engineer & AI Application Developer. Final Year CS Student.',
  openGraph: {
    title: 'Nikhil Raj — Portfolio',
    description: 'Full Stack Engineer & AI Application Developer.',
    type: 'website',
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
