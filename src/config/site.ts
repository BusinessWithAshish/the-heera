// One place for brand facts. Change these here, never hard-code them in pages.
export const site = {
  name: "Heera Luxe",
  title: "Heera Luxe | Luxury Women's Heels & Bags",
  description:
    "Luxury women's heels and bags for every occasion, from Heera Luxe Footwear, India.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.theheera.in",
} as const;
