import '@/src/styles/global.css';

import { Red_Hat_Display } from 'next/font/google';
import type { ReactNode } from 'react';

const font = Red_Hat_Display({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: 'normal',
  display: 'swap',
  variable: '--font-red-hat-display',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={font.className}>{children}</body>
    </html>
  );
}
