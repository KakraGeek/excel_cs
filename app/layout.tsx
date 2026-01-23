import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import SkipLink from "@/components/layout/skip-link";
import { GA4Script } from "@/components/analytics/ga4-script";
import "./globals.css";

// Optimize font loading: use display=swap for better performance
// This ensures text is visible during font load (FOUT instead of FOIT)
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap", // Performance optimization: show fallback font immediately
  preload: true, // Preload critical fonts
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap", // Performance optimization: show fallback font immediately
  preload: false, // Only preload primary font
});

export const metadata: Metadata = {
  title: "Excel Community School",
  description: "Passion to Excel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <GA4Script />
        <SkipLink />
        {children}
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
