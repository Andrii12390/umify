import type { Metadata } from 'next';

import { Inter } from 'next/font/google';

import { Toaster } from '@/components/ui/sonner';

import './globals.css';
import { AppProvider } from '@/providers';

const interSans = Inter({
  variable: '--font-inter-sans',
  subsets: ['latin'],
});

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000';

export const metadata: Metadata = {
  title: {
    template: '%s | Umify',
    default: 'Umify',
  },
  description:
    'Umify is a modern web application for creating UML diagrams. Build use case, class, and package diagrams with an intuitive editor. Export diagrams in multiple formats, switch themes, and sign in using social accounts.',
  keywords: [
    'umify',
    'uml',
    'uml diagrams',
    'uml tool',
    'diagram builder',
    'uml editor',
    'use case diagram',
    'class diagram',
    'package diagram',
    'reactflow uml',
    'uml generator',
    'diagram export',
    'dark mode uml',
    'nextjs uml app',
    'online uml tool',
  ],
  metadataBase: new URL(BASE_URL),
  openGraph: {
    title: 'Umify — Create UML Diagrams Online',
    description:
      'Umify lets you build UML use case, class, and package diagrams online. Enjoy real-time editing, export to PNG, SVG, JPG, PDF, theme switching, and social authentication.',
    url: BASE_URL,
    siteName: 'Umify',
    images: [
      {
        url: `${BASE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'Umify — UML Diagram Builder Preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Umify — UML Diagram Builder',
    description:
      'Create UML diagrams with Umify: a fast and intuitive editor for use case, class, and package diagrams. Export to PNG, SVG, JPG, PDF. Dark mode and social login included.',
    images: [`${BASE_URL}/og-image.png`],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
  },
};

function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${interSans.variable} antialiased`}>
        <AppProvider>
          {children}
          <Toaster />
        </AppProvider>
      </body>
    </html>
  );
}

export default RootLayout;
