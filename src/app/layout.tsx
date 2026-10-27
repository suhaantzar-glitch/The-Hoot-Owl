import type { Metadata, Viewport } from "next";
import { Courier_Prime, Source_Serif_4 } from "next/font/google";
import localFont from "next/font/local";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { site } from "@/content/site";
import { barJsonLd, serializeJsonLd } from "@/lib/jsonld";
import "./globals.css";

// Big Shoulders' display cut (opsz 72) at one heavy weight: 14 KB, versus
// ~58 KB for the full variable font. Every sign on the site uses it.
const display = localFont({
  src: "../assets/fonts/BigShoulders-Display-ExtraBold-latin.woff2",
  weight: "700 900",
  variable: "--font-big-shoulders",
  display: "swap",
});

const mono = Courier_Prime({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-courier-prime",
  display: "swap",
});

// Static regular and bold are lighter than the full variable font.
const serif = Source_Serif_4({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-source-serif",
  display: "swap",
});

// Italics are only used for accents at one weight, so load just that
// instance instead of the whole variable italic.
const serifItalic = Source_Serif_4({
  subsets: ["latin"],
  style: "italic",
  weight: "400",
  variable: "--font-source-serif-italic",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} · Canton, N.Y. · Est. 1970`,
    template: `%s · ${site.name}, Canton N.Y.`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "Hoot Owl",
    "the Hoot",
    "Canton NY bar",
    "St. Lawrence University bar",
    "SLU",
    "SUNY Canton",
    "Lime Rickey",
    "college bar",
    "Canton New York",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_US",
    url: "/",
  },
  twitter: { card: "summary_large_image" },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#1f3a2e",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${mono.variable} ${serif.variable} ${serifItalic.variable}`}
    >
      <body className="flex min-h-dvh flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(barJsonLd()) }}
        />
        <SmoothScroll />
        <Header />
        <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
