import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  // Old Wix URLs keep working (Google links, Instagram bios, saved bookmarks).
  async redirects() {
    return [
      { source: "/product-page/:slug", destination: "/products/:slug", permanent: true },
      { source: "/shop-1", destination: "/shop/bags", permanent: true },
      { source: "/blank-3", destination: "/faq", permanent: true },
      { source: "/contact-us", destination: "/contact", permanent: true },
      { source: "/my-addresses", destination: "/contact", permanent: false },
    ];
  },
};

export default nextConfig;
