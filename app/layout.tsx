import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The OnChain Studio",
  description: "A multi-awarded digital studio crafting immersive & interactive experiences for global brands since 2006.",
  icons: {
    icon: '/IMG_6276.PNG',
    shortcut: '/IMG_6276.PNG',
    apple: '/IMG_6276.PNG',
  },
  other: {
    // Preconnect to Cloudflare CDN for faster asset loading
    'link:preconnect': 'https://cdn.cloudflare.com',
    'link:dns-prefetch': 'https://cdn.cloudflare.com',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://cdn.cloudflare.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://cdn.cloudflare.com" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
