import type { Metadata, Viewport } from "next";
import { Poppins, Playfair_Display } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  style: ["italic"],
  weight: ["500", "600"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Rsvp.ng — Every Event. Perfectly Shared.",
  description: "Create beautiful, animated event experiences for weddings, birthdays, and more.",
  appleWebApp: { capable: true, statusBarStyle: "default", title: "Rsvp.ng" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
  themeColor: "#F2F4F8",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${playfair.variable} font-sans antialiased`}>{children}</body>
    </html>
  );
}
