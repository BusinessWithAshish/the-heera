import raw from "@/data/products.json";

export const categories = {
  heels: {
    label: "Heels",
    title: "Luxe heels",
    blurb: "Crystal straps, pearl toes and glass heels for the nights you want to be noticed.",
  },
  flats: {
    label: "Flats",
    title: "Embellished flats",
    blurb: "All the sparkle, none of the ache. Hand-studded flats for weddings, brunches and every day.",
  },
  platforms: {
    label: "Platforms",
    title: "Starliner platforms",
    blurb: "Chunky soles, rhinestone straps and cloud cushioning, so you get the height without the pain.",
  },
  bags: {
    label: "Bags",
    title: "Bling bags",
    blurb: "Pearl, crystal and beaded bags, made by hand to finish the look.",
  },
} as const;

export type Category = keyof typeof categories;
export const categoryKeys = Object.keys(categories) as Category[];

export type Product = {
  slug: string;
  name: string;
  category: Category;
  price: number;
  compareAtPrice: number | null;
  inStock: boolean;
  summary: string;
  details: { label: string; value: string }[];
  images: string[];
};

export const products = raw as Product[];

export function isCategory(value: string): value is Category {
  return value in categories;
}

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

// In-stock items first, keeping the original catalogue order otherwise.
export function byCategory(category?: Category) {
  const list = category ? products.filter((p) => p.category === category) : products;
  return [...list].sort((a, b) => Number(b.inStock) - Number(a.inStock));
}

export function related(product: Product, count = 4) {
  return byCategory(product.category)
    .filter((p) => p.slug !== product.slug && p.inStock)
    .slice(0, count);
}

// Hand-picked for the home page. Edit the slugs to change what's featured.
export const featuredSlugs = [
  "trophy-wife",
  "dazzel-pink-bag",
  "black-starliner-platform",
  "cluster-of-pearls-flats",
  "goldmine",
  "valentina-silver",
  "precious-pearls",
  "crescent-moon-silver-bag",
];

export const eveningSlugs = ["dew-drop", "into-the-night", "stardust-mini-bag", "call-me-princess"];

export function pick(slugs: string[]) {
  return slugs.map(getProduct).filter((p): p is Product => Boolean(p));
}

const inr = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });
export const formatPrice = (n: number) => inr.format(n);

export function discountPercent(p: Product) {
  return p.compareAtPrice ? Math.round((1 - p.price / p.compareAtPrice) * 100) : 0;
}
