import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import { Navbar } from "@/components/ui/navbar";
import { SiteFooter } from "@/components/ui/site-footer";
import "./globals.css";

const headingFont = Fraunces({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["600", "700"],
});

const bodyFont = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://realstate4u.com"),
  applicationName: "RealState4U",
  title: {
    default: "RealState4U",
    template: "%s | RealState4U",
  },
  description:
    "Cross-market property marketplace for Sweden queue rentals, EU buy-and-rent discovery, and Pakistan lead-first listings.",
  keywords: [
    "real estate marketplace",
    "Sweden queue housing",
    "EU property listings",
    "Pakistan real estate",
    "property leads",
  ],
  openGraph: {
    title: "RealState4U",
    description:
      "Search, publish, and convert property demand across Sweden, EU markets, and Pakistan.",
    url: "https://realstate4u.com",
    siteName: "RealState4U",
    type: "website",
    images: [
      {
        url: "/logo-web.png",
        width: 666,
        height: 231,
        alt: "RealState4U",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "RealState4U",
    description:
      "Cross-market property platform for Sweden, EU, and Pakistan.",
    images: ["/logo-web.png"],
  },
  icons: {
    icon: [{ url: "/icon.png", type: "image/png" }],
    apple: [{ url: "/apple-icon.png", type: "image/png" }],
    shortcut: ["/icon.png"],
  },
};

export const dynamic = "force-dynamic";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${headingFont.variable} ${bodyFont.variable} site-shell antialiased`}>
        <Navbar />
        <div className="site-main">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}
