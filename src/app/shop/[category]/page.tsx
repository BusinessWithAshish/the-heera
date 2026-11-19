import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ShopView } from "@/components/shop-view";
import { categories, categoryKeys, isCategory } from "@/lib/catalog";

export function generateStaticParams() {
  return categoryKeys.map((category) => ({ category }));
}

export async function generateMetadata(props: PageProps<"/shop/[category]">): Promise<Metadata> {
  const { category } = await props.params;
  if (!isCategory(category)) return {};
  return { title: categories[category].title, description: categories[category].blurb };
}

export default async function CategoryPage(props: PageProps<"/shop/[category]">) {
  const { category } = await props.params;
  if (!isCategory(category)) notFound();
  return <ShopView category={category} />;
}
