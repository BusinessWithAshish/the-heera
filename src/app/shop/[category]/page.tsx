import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ShopView } from "@/components/shop-view";
import { categories, categoryKeys, footwear, isCategory } from "@/lib/catalog";

export function generateStaticParams() {
  return [...categoryKeys, "footwear"].map((category) => ({ category }));
}

export async function generateMetadata(props: PageProps<"/shop/[category]">): Promise<Metadata> {
  const { category } = await props.params;
  if (category === "footwear") return { title: footwear.title, description: footwear.blurb };
  if (!isCategory(category)) return {};
  return { title: categories[category].title, description: categories[category].blurb };
}

export default async function CategoryPage(props: PageProps<"/shop/[category]">) {
  const { category } = await props.params;
  if (category === "footwear") return <ShopView group={footwear} />;
  if (!isCategory(category)) notFound();
  return <ShopView category={category} />;
}
