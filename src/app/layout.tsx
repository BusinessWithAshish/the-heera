import type { Metadata, Viewport } from "next";
import { Allura, Geist_Mono, Jost, Montserrat } from "next/font/google";

import { CartDrawer } from "@/components/cart-drawer";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SmoothScroll } from "@/components/smooth-scroll";
import { SplashScreen, splashGateScript } from "@/components/splash-screen";
import { Toaster } from "@/components/ui/toast";
import { TooltipProvider } from "@/components/ui/tooltip";
import { site } from "@/config/site";
import { CartProvider } from "@/lib/cart";
import "lenis/dist/lenis.css";
import "./globals.css";

// Headings: Montserrat Regular, as the owner chose. (Safira March, the paid font the
// owner first liked, could replace it later: put the licensed files in src/app/fonts/
// and load them here with next/font/local under the same "--font-display" name.)
const display = Montserrat({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

const sans = Jost({
  variable: "--font-sans",
  subsets: ["latin"],
});

// Handwritten script, used sparingly (the "Soon" in the home banner).
const script = Allura({
  variable: "--font-script",
  subsets: ["latin"],
  weight: "400",
});

const mono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  openGraph: {
    title: site.title,
    description: site.description,
    url: site.url,
    siteName: site.name,
    locale: "en_IN",
    type: "website",
    images: ["/images/brand/bestseller.webp"],
  },
};

export const viewport: Viewport = {
  themeColor: "#141f36",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} ${script.variable} ${mono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* Decides before the first paint whether the opening screen shows (see splash-screen.tsx). */}
        <script dangerouslySetInnerHTML={{ __html: splashGateScript }} />
      </head>
      <body className="flex min-h-full flex-col">
        <SplashScreen />
        <SmoothScroll />
        <Toaster>
          <TooltipProvider>
            <CartProvider>
              <SiteHeader />
              <main className="flex-1">{children}</main>
              <SiteFooter />
              <CartDrawer />
            </CartProvider>
          </TooltipProvider>
        </Toaster>
      </body>
    </html>
  );
}
