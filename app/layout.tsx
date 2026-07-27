import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vela | South Africa's shared event warehouse",
  description: "Find live event inventory, trusted suppliers and services across Gauteng—then book everything in one place.",
  openGraph: {
    title: "Vela | South Africa's shared event warehouse",
    description: "Live event inventory from trusted suppliers, all in one basket.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Vela event marketplace" }],
  },
  twitter: { card: "summary_large_image", images: ["/og.png"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en-ZA"><body>{children}</body></html>;
}
