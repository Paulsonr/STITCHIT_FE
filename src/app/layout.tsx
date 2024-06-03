import "../styles/globals.css";
import { ReactNode } from "react";
import Head from "next/head";
import Navbar from "@/components/nav";

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
      <body>
        <main className="bg-gradient-to-b from-gray-50 to-gray-950">
          <Navbar
            isLoggedIn={false}
            // profileImageUrl={"/images/icons/logo-color.png"}
          />
          <div>{children}</div>
        </main>
      </body>
    </html>
  );
}
