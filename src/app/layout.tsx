import type { Metadata, Viewport } from "next";
import { Allura, Cormorant_Garamond, Geist_Mono, Jost } from "next/font/google";

import { CartDrawer } from "@/components/cart-drawer";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SplashScreen, splashGateScript } from "@/components/splash-screen";
import { Toaster } from "@/components/ui/toast";
import { TooltipProvider } from "@/components/ui/tooltip";
import { site } from "@/config/site";
import { CartProvider } from "@/lib/cart";
import "./globals.css";

const display = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
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
  themeColor: "#0b0a09",
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
