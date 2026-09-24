import type { Metadata } from 'next';
import { Cormorant_Garamond, DM_Sans } from 'next/font/google';
import './globals.css';

const cormorant = Cormorant_Garamond({
  variable: '--font-cormorant',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
});

const dmSans = DM_Sans({
  variable: '--font-dm-sans',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'MN Construction Services LLC | Building Dreams, Maintaining Excellence',
  description:
    'MN Construction Services LLC specializes in kitchen renovations, bathroom remodels, and home repairs. Licensed, insured, and serving the greater Seattle area since 2016.',
  keywords: [
    'home renovation',
    'kitchen remodel',
    'bathroom renovation',
    'Seattle contractor',
    'Greater Seattle contractor',
    'Eastside contractor',
    'home repairs',
    'licensed contractor',
  ],
  openGraph: {
    title: 'MN Construction Services LLC',
    description: 'Building Dreams, Maintaining Excellence — expert home renovations across the greater Seattle area since 2016.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
