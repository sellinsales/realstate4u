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
    "RealState4U is a multi-vertical housing marketplace for Sweden, EU, and Pakistan with properties, queue housing, and lead capture.",
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
      "Housing marketplace for Sweden queue rentals, EU property discovery, and Pakistan lead-first listings.",
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
      "Cross-border housing marketplace for Sweden, EU, and Pakistan.",
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
