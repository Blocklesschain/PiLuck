import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
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
  title: "PiLuck — The Community Luck Platform for Pioneers",
  description:
    "PiLuck is a transparent, fair, community-first Luck draw platform built for the Pi Network ecosystem. One Pi. One Ticket. Equal Opportunity.",
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
    title: "PiLuck — The Community Luck Platform for Pioneers",
    description:
      "One Pi. One Ticket. Equal Opportunity. A transparent community Luck draw platform for Pi Network users.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "PiLuck — The Community Luck Platform for Pioneers",
    description:
      "One Pi. One Ticket. Equal Opportunity. A transparent community Luck draw platform for Pi Network users.",
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
      <head>
        {/* Pi Network SDK — loaded from official CDN */}
        <script
          src="https://sdk.pinetwork.com/pi-sdk.js"
          async
        ></script>
      </head>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} font-sans bg-[#0a0a0f] text-white antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
