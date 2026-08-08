import type { Metadata } from 'next';
import { Cormorant_Garamond, Space_Grotesk, Inter, IBM_Plex_Mono } from 'next/font/google';
import './globals.css';
import { ExpeditionBackground } from '@/components/background/ExpeditionBackground';

const cormorantGaramond = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-cormorant-garamond',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-ibm-plex-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'HHGoa Builder Studio | Build Your Official Builder Identity',
  description: 'Generate an official Hacker House Goa Builder Pass or Expedition Team Pass for HHGoa 2026. Handcrafted editorial credentials for builders.',
  keywords: ['HHGoa 2026', 'Hacker House Goa', 'Builder Pass', 'Team Expedition Pass', 'HHGoa Builder Studio'],
  openGraph: {
    title: 'HHGoa Builder Studio | Build Your Official Builder Identity',
    description: 'Official Hacker House Goa Builder Pass & Expedition Team Pass generator.',
    type: 'website',
    siteName: 'HHGoa Builder Studio',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorantGaramond.variable} ${spaceGrotesk.variable} ${inter.variable} ${ibmPlexMono.variable} dark scroll-smooth`}>
      <body className="bg-hhgoa-bg text-hhgoa-light font-sans antialiased min-h-screen relative selection:bg-hhgoa-yellow selection:text-hhgoa-dark">
        <ExpeditionBackground />
        <div className="relative z-10 flex flex-col min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
