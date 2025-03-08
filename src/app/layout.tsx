"use client";
import "./globals.css";
import localFont from "next/font/local";
import { Toaster } from 'react-hot-toast';
import { ThirdwebProvider } from "thirdweb/react";
import { client } from "@/client";

// Load Digitalt font
const digitalt = localFont({
  src: './Digitalt.ttf',
  variable: '--font-digitalt',
  display: 'swap',
  preload: true,
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={digitalt.className}>
      <body suppressHydrationWarning={true} className={digitalt.className}>
        <ThirdwebProvider client={client}>
          {children}
          <Toaster position="top-center" />
        </ThirdwebProvider>
      </body>
    </html>
  );
}
