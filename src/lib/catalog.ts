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

// Everything worn on the feet, shown together at /shop/footwear.
export const footwear = {
  title: "Footwear",
  blurb: "Heels, flats and platforms, embellished by hand. Pick your height, keep the sparkle.",
  keys: ["heels", "flats", "platforms"] as Category[],
};

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

// Most popular first. Every product list on the site follows this order (in-stock
// pieces before sold-out ones). Move a slug up to show it earlier. Pieces not listed
// here come after, in the order of products.json.
// OWNER TO CONFIRM: a first guess, not real sales data.
export const popularity = [
  "trophy-wife",
  "dazzel-pink-bag",
  "pearl-me-up-flap-bag",
  "black-starliner-platform",
  "goldmine",
  "cluster-of-pearls-flats",
  "stardust-mini-bag",
  "precious-pearls",
  "crescent-moon-silver-bag",
  "dew-drop",
  "valentina-silver",
  "sahara-double-strap-flats-nude",
  "call-me-princess",
  "dazzle-silver-bag",
  "crystal-clear",
  "into-the-night",
  "denim-starliner-platforms",
  "all-pearl-bag",
  "studded-black-flats",
  "big-bejewelled-double-strap-flats",
];

const rank = (slug: string) => {
  const i = popularity.indexOf(slug);
  return i === -1 ? popularity.length + products.findIndex((p) => p.slug === slug) : i;
};

export function sortByPopularity(list: Product[]) {
  return [...list].sort((a, b) => Number(b.inStock) - Number(a.inStock) || rank(a.slug) - rank(b.slug));
}

export function byCategory(category?: Category) {
  return sortByPopularity(category ? products.filter((p) => p.category === category) : products);
}

export function related(product: Product, count = 4) {
  return byCategory(product.category)
    .filter((p) => p.slug !== product.slug && p.inStock)
    .slice(0, count);
}

// Hand-picked for the home page. Edit the slugs to change what's shown.
// OWNER TO CONFIRM: these lists are a first guess, not real sales or arrival data.
export const newInSlugs = ["pearl-me-up-flap-bag", "stardust-mini-bag", "crescent-moon-silver-bag", "valentina-silver"];

export const bestsellerSlugs = [
  "trophy-wife",
  "dazzel-pink-bag",
  "black-starliner-platform",
  "goldmine",
  "cluster-of-pearls-flats",
  "precious-pearls",
];

// The pieces hanging on the 3D rail on the home page, in rail order (not re-sorted).
export const railSlugs = [
  "dazzel-pink-bag",
  "trophy-wife",
  "pearl-me-up-flap-bag",
  "goldmine",
  "crescent-moon-silver-bag",
  "crystal-clear",
  "stardust-mini-bag",
  "precious-pearls",
  "valentina-silver",
  "call-me-princess",
];

export function pickInOrder(slugs: readonly string[]) {
  return slugs.map(getProduct).filter((p): p is Product => Boolean(p));
}

export function pick(slugs: readonly string[]) {
  return sortByPopularity(slugs.map(getProduct).filter((p): p is Product => Boolean(p)));
}

// The two edits on the home page, each with its own page at /edits/<key>.
// OWNER TO CONFIRM which pieces belong in each.
export const edits = {
  crystal: {
    title: "The Crystal Edit",
    blurb: "Rhinestones, crystal straps and pieces that catch every light.",
    slugs: [
      "trophy-wife", "dew-drop", "call-me-princess", "goldmine", "crystal-clear", "unicorn-sea", "into-the-night",
      "dazzel-pink-bag", "dazzle-silver-bag", "stardust-mini-bag", "valentina-silver", "valentina-mini-bag-silver",
      "studded-bucket-bag-silver", "studded-bucket-bag-black", "black-starliner-platform", "peach-pink-starliner-platform",
      "denim-starliner-platforms", "big-bejewelled-double-strap-flats", "sahara-double-strap-flats-nude",
      "crystal-ocean-flats", "bejewelled-tan-flats",
    ],
  },
  beaded: {
    title: "The Beaded Edit",
    blurb: "Pearls and beads, strung and sewn by hand.",
    slugs: [
      "pearl-me-up-flap-bag", "all-pearl-bag", "crescent-moon-silver-bag", "cluster-of-pearls-flats", "precious-pearls",
      "tropical-paradise-flats",
    ],
  },
} as const;

export type EditKey = keyof typeof edits;
export const editKeys = Object.keys(edits) as EditKey[];
export const isEdit = (value: string): value is EditKey => value in edits;

const inr = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });
export const formatPrice = (n: number) => inr.format(n);

export function discountPercent(p: Product) {
  return p.compareAtPrice ? Math.round((1 - p.price / p.compareAtPrice) * 100) : 0;
}
