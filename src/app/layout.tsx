import type { Metadata } from 'next';
import { PT_Sans } from 'next/font/google';
import type { ReactNode } from 'react';
import '@/src/styles/global.css';

const ptSans = PT_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: 'normal',
  display: 'swap',
  variable: '--font-pt-sans',
});

export const metadata: Metadata = {
  title: 'S.P.F.A.',
  description: 'Spotify Playlist Filter Assistant',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={ptSans.className}>{children}</body>
    </html>
  );
}
