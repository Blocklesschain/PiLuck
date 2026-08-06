import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: "PiLuck — World Jackpot Platform for Pioneers",
  description:
    "PiLuck is a transparent, fair, community-first Luck draw platform built for the Pi Network ecosystem. One base ticket per wallet, plus free streak credits. Equal Opportunity.",
  keywords: [
    "Pi Network",
    "PiLuck",
    "Luck draw",
    "lottery",
    "Pi coin",
    "community platform",
    "crypto lottery",
    "Pi ecosystem",
  ],
  openGraph: {
    title: "PiLuck — World Jackpot Platform for Pioneers",
    description:
      "One base ticket per wallet, free streak credits, and equal opportunity for Pi Network users.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "PiLuck — World Jackpot Platform for Pioneers",
    description:
      "One base ticket per wallet, free streak credits, and equal opportunity for Pi Network users.",
  },
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} font-sans bg-[#0a0a0f] text-white antialiased`}
      >
        {/* Pi Network SDK — loaded from the official CDN */}
        <Script
          src="https://sdk.minepi.com/pi-sdk.js"
          strategy="afterInteractive"
        />
        {children}
      </body>
    </html>
  );
}
