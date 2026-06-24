import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Imejination Studio House",
  description:
    "Commercial photography and videography for property, architecture, food, beverage, live events, and portraits.",
  icons: {
    icon: "/brand/imejination-stacked.png",
    shortcut: "/brand/imejination-stacked.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
