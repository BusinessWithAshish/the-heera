import type { Metadata } from "next";

import { ShopView } from "@/components/shop-view";

export const metadata: Metadata = {
  title: "Shop all",
  description: "Hand-embellished heels, flats, platforms and bags, made in India.",
};

export default function ShopPage() {
  return <ShopView />;
}
