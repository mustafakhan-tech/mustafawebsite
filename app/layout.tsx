import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Tape from "@/components/Tape";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const display = localFont({
  src: "./fonts/BigShouldersDisplay.ttf",
  variable: "--font-display",
  weight: "100 900",
  display: "swap",
});
const serif = localFont({
  src: [
    { path: "./fonts/SourceSerif4.ttf", style: "normal" },
    { path: "./fonts/SourceSerif4-Italic.ttf", style: "italic" },
  ],
  variable: "--font-serif",
  weight: "200 900",
  display: "swap",
});

export const metadata: Metadata = {
  title: { default: "Mustafa Khan: sales, partnerships and go-to-market", template: "%s | Mustafa Khan" },
  description:
    "Mustafa Khan sells and builds go-to-market for startups. Founder of Nexus Partners, co-founder of Philo and Solus, based in Edmonton.",
};
export const viewport: Viewport = { themeColor: "#DADDDF" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${serif.variable}`}>
      <body>
        <Tape />
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-14 focus:top-2 focus:z-50 focus:bg-tape focus:px-3 focus:py-1">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
