import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProductCard } from "@/components/product-card";
import { Ornament } from "@/components/section-heading";
import { editKeys, edits, isEdit, pick } from "@/lib/catalog";

export function generateStaticParams() {
  return editKeys.map((edit) => ({ edit }));
}

export async function generateMetadata(props: PageProps<"/edits/[edit]">): Promise<Metadata> {
  const { edit } = await props.params;
  if (!isEdit(edit)) return {};
  return { title: edits[edit].title, description: edits[edit].blurb };
}

export default async function EditPage(props: PageProps<"/edits/[edit]">) {
  const { edit } = await props.params;
  if (!isEdit(edit)) notFound();
  const info = edits[edit];
  const list = pick(info.slugs);

  return (
    <div className="mx-auto max-w-7xl px-4 pt-12 pb-20 sm:px-6 sm:pt-16">
      <div className="mx-auto mb-12 max-w-xl space-y-4 text-center">
        <p className="text-[11px] tracking-[0.24em] text-gold uppercase">{list.length} pieces</p>
        <h1 className="text-4xl tracking-[0.14em] uppercase sm:text-5xl">{info.title}</h1>
        <Ornament />
        <p className="text-muted-foreground">{info.blurb}</p>
      </div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4">
        {list.map((p, i) => (
          <ProductCard key={p.slug} product={p} priority={i < 4} />
        ))}
      </div>
    </div>
  );
}
