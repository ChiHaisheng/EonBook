import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const ebGaramond = localFont({
  src: [
    {
      path: "../fonts/EBGaramond-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/EBGaramond-Medium.woff2",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-eb-garamond",
  display: "swap",
  preload: true,
  fallback: ["Georgia", "Times New Roman", "serif"],
});

const inter = localFont({
  src: "../fonts/Inter-Latin.woff2",
  weight: "300 700",
  style: "normal",
  variable: "--font-sans",
  display: "swap",
  preload: true,
  fallback: ["Arial", "sans-serif"],
});

export const metadata: Metadata = {
  title: "EonBook — Read without noise",
  description: "A beautiful, quiet home for your books. Free from feeds, recommendations, and advertisements. Designed for long-form reading, literature, and philosophy.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${ebGaramond.variable} ${inter.variable} h-full antialiased dark`}
      style={{ colorScheme: "dark" }}
    >
      <body className="bg-bg text-text-pri font-sans min-h-full flex flex-col selection:bg-accent-gold/20 selection:text-accent-gold">
        {children}
      </body>
    </html>
  );
}
