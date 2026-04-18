import type { Metadata } from "next";
import { Manrope, Geist_Mono } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Thirsty Studios | The Hub for $uperstars",
  description: "The Hub for $uperstars",
  openGraph: {
    title: "Thirsty Studios | The Hub for $uperstars",
    description: "The Hub for $uperstars",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Thirsty Studios",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Thirsty Studios | The Hub for $uperstars",
    description: "The Hub for $uperstars",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
