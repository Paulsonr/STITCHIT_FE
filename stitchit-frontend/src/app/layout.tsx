import '../styles/globals.css';
import { ReactNode } from 'react';
import Head from 'next/head';

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>StitchIT</title>
      </Head>
      <body className="bg-gray-100 text-gray-900">
        {children}
      </body>
    </html>
  );
}
