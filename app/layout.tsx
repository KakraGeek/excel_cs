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
  description: "Passion to Excel - Providing high-quality education in a safe and happy learning environment that builds a foundation for life-long learning.",
  icons: {
    icon: '/icon.png',
    apple: '/apple-icon.png',
  },
  openGraph: {
    title: "Excel Community School",
    description: "Passion to Excel - Providing high-quality education in a safe and happy learning environment that builds a foundation for life-long learning.",
    url: "https://excels.edu.gh",
    siteName: "Excel Community School",
    images: [
      {
        url: "/brand/excelcs_logo.png",
        width: 1200,
        height: 630,
        alt: "Excel Community School Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Excel Community School",
    description: "Passion to Excel - Providing high-quality education in a safe and happy learning environment.",
    images: ["/brand/excelcs_logo.png"],
  },
  metadataBase: new URL(process.env.NEXTAUTH_URL || "https://excels.edu.gh"),
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
