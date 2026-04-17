import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://accessibility-dev-toolkit.com"),
  title: "Accessibility Dev Toolkit | Screen Reader Testing for Developers",
  description:
    "Ship accessible interfaces faster with real-time screen reader simulation, ARIA validation, and audit reports.",
  openGraph: {
    title: "Accessibility Dev Toolkit",
    description: "Screen reader simulation and accessibility debugging utilities for modern product teams.",
    type: "website",
    url: "https://accessibility-dev-toolkit.com"
  },
  alternates: {
    canonical: "/"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Script src="https://app.lemonsqueezy.com/js/lemon.js" strategy="afterInteractive" />
        {children}
      </body>
    </html>
  );
}
