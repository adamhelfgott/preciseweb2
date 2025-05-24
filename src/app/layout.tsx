import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Precise.ai - Free proof service for the AI-orchestrated ad economy",
  description: "As DSPs commoditize and agents run campaigns, data verification becomes the differentiator. Mint proofs for free. Earn royalties automatically through Shapley value attribution.",
  keywords: "data verification, advertising technology, AI agents, DSP, Shapley value, data monetization",
  openGraph: {
    title: "Precise.ai - Free proof service for the AI-orchestrated ad economy",
    description: "Mint proofs for free. Earn royalties automatically through Shapley value attribution. No contracts, no upfront costs—just like Stripe for data.",
    type: "website",
    url: "https://precise.ai",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Precise.ai",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Precise.ai - Free proof service for the AI-orchestrated ad economy",
    description: "Mint proofs for free. Earn royalties automatically through Shapley value attribution.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        {children}
      </body>
    </html>
  );
}