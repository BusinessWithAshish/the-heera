import type { MetadataRoute } from "next";

import { site } from "@/config/site";
import { categoryKeys, products } from "@/lib/catalog";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/shop", "/shipping-returns", "/faq", "/contact", ...categoryKeys.map((c) => `/shop/${c}`)];
  return [
    ...pages.map((p) => ({ url: `${site.url}${p}` })),
    ...products.map((p) => ({ url: `${site.url}/products/${p.slug}` })),
  ];
}
