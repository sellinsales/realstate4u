import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import { Navbar } from "@/components/ui/navbar";
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
  title: {
    default: "RealState4U",
    template: "%s | RealState4U",
  },
  description:
    "RealState4U is a multi-vertical housing marketplace for Sweden, EU, and Pakistan with properties, queue housing, and lead capture.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${headingFont.variable} ${bodyFont.variable} site-shell antialiased`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
