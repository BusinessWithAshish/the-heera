// One place for brand facts. Change these here, never hard-code them in pages.
export const site = {
  name: "The Heera",
  shortName: "Heera",
  title: "The Heera | Embellished Heels, Flats & Bags, Made in India",
  description:
    "Hand-embellished heels, flats, platforms and bags, made in India. Free shipping across India.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.theheera.in",
  email: "info@theheera.in",
  instagram: {
    handle: "@theheera.in",
    url: "https://www.instagram.com/theheera.in/",
    // Opens a DM with the shop. Orders go here until online checkout is added.
    dm: "https://ig.me/m/theheera.in",
  },
  shipping: {
    freeInIndia: true,
    dispatchDays: "1–2",
    deliveryDays: "3–7",
  },
  // OWNER TO CONFIRM: the old site had three different return rules. This copies
  // the formal Store Policy page (no returns, size exchange within 4 days).
  exchangeDays: 4,
} as const;

export const nav = [
  { label: "Heels", href: "/shop/heels" },
  { label: "Flats", href: "/shop/flats" },
  { label: "Platforms", href: "/shop/platforms" },
  { label: "Bags", href: "/shop/bags" },
] as const;

// The top menu on big screens. "Footwear" opens a small list.
export const mainNav = [
  { label: "New in", href: "/#new-in" },
  { label: "Bags", href: "/shop/bags" },
  {
    label: "Footwear",
    href: "/shop",
    children: [
      { label: "Heels", href: "/shop/heels" },
      { label: "Flats", href: "/shop/flats" },
      { label: "Platforms", href: "/shop/platforms" },
      { label: "Shop all", href: "/shop" },
    ],
  },
  { label: "Bestsellers", href: "/#bestsellers" },
] as const;

export const helpNav = [
  { label: "Shipping & exchanges", href: "/shipping-returns" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
] as const;
