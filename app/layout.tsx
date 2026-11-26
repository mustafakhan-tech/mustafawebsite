import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import SoundButton from "@/components/SoundButton";

const sans = localFont({
  src: "./fonts/Archivo.woff2",
  variable: "--font-sans",
  weight: "100 900",
  declarations: [{ prop: "font-stretch", value: "62% 125%" }],
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
  metadataBase: new URL("https://www.mustafa-khan.com"),
  title: { default: "Mustafa Khan: sales, growth and go-to-market", template: "%s | Mustafa Khan" },
  description:
    "Mustafa Khan brings in revenue, users and partnerships. Founder of Nexus Partners ($800K+ in brand deals), co-founder and COO of Koba, growth and marketing for Philo.",
  openGraph: { images: ["/img/mustafa.jpg"] },
};
export const viewport: Viewport = { themeColor: "#100E0B" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable}`}>
      <body>
        <a href="#main" className="ui sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded focus:bg-ink focus:px-3 focus:py-1 focus:text-paper">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="pt-20">{children}</main>
        <SiteFooter />
        <SoundButton />
      </body>
    </html>
  );
}
