import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import '@/styles/globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Caretaker Harp King - Music Requests',
  description: 'Progressive Web App for Caretaker Harp King music requests and audience engagement',
  manifest: '/manifest.json',
  themeColor: '#3B82F6',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  icons: {
    icon: '/icon-192x192.png',
    apple: '/icon-192x192.png',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Caretaker Harp King',
  },
  formatDetection: {
    telephone: false,
  },
  other: {
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'apple-mobile-web-app-title': 'Caretaker Harp King',
    'application-name': 'Caretaker Harp King',
    'msapplication-TileColor': '#3B82F6',
    'msapplication-config': '/browserconfig.xml',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </head>
      <body className={`${inter.variable} ${poppins.variable} antialiased`}>
        <div id="root">
          {children}
        </div>
        <div id="modal-root" />
      </body>
    </html>
  );
}