import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Precise - Infrastructure for the AI Data Economy",
  description: "The first platform that enables privacy-preserving data collaboration between advertisers and data controllers, powered by verifiable credentials and fair attribution.",
  keywords: "data collaboration, privacy-preserving, advertising infrastructure, verifiable credentials, Shapley value, data economy",
  openGraph: {
    title: "Precise - Infrastructure for the AI Data Economy",
    description: "The first platform that enables privacy-preserving data collaboration between advertisers and data controllers, powered by verifiable credentials and fair attribution.",
    type: "website",
    url: "https://precise.ai",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Precise - Infrastructure for the AI Data Economy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Precise - Infrastructure for the AI Data Economy",
    description: "Privacy-preserving data collaboration platform with verifiable credentials and fair attribution.",
    images: ["/og-image.png"],
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://precise.ai'),
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