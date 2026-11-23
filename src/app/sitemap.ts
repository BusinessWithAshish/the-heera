import type { MetadataRoute } from "next";

import { site } from "@/config/site";
import { categoryKeys, editKeys, products } from "@/lib/catalog";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/shop", "/shop/footwear", "/shipping-returns", "/faq", "/contact", ...categoryKeys.map((c) => `/shop/${c}`), ...editKeys.map((e) => `/edits/${e}`)];
  return [
    ...pages.map((p) => ({ url: `${site.url}${p}` })),
    ...products.map((p) => ({ url: `${site.url}/products/${p.slug}` })),
  ];
}
