import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AppLayout from "@/components/shared/AppLayout";
import { Toaster } from "@/components/ui/sonner";
import Head from "next/head";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Invest now - Grow Your Wealth",
  description: "Discover the best investment opportunities. Grow your wealth with expert advice",
  keywords: "investment, finance, stocks, trading, wealth management",
  robots:"index, follow",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >

        <AppLayout page={children}/>
        <Toaster richColors  position="top-center"  theme="light"/>
      </body>
    </html>
  );
}
