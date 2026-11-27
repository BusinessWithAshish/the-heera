import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { TruckIcon } from "lucide-react";

import { AddToBag } from "@/components/add-to-bag";
import { PriceTag } from "@/components/price-tag";
import { ProductCard } from "@/components/product-card";
import { ProductGallery } from "@/components/product-gallery";
import { SectionHeading } from "@/components/section-heading";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { buttonVariants } from "@/components/ui/button";
import { site } from "@/config/site";
import { categories, getProduct, products, related } from "@/lib/catalog";
import { cn } from "@/lib/utils";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: PageProps<"/products/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const p = getProduct(slug);
  if (!p) return {};
  return {
    title: p.name,
    description: p.summary,
    openGraph: { images: p.images.slice(0, 1) },
  };
}

export default async function ProductPage(props: PageProps<"/products/[slug]">) {
  const { slug } = await props.params;
  const product = getProduct(slug);
  if (!product) notFound();

  const category = categories[product.category];
  const more = related(product);
  const isBag = product.category === "bags";
  const mailto = `mailto:${site.email}?subject=${encodeURIComponent(product.name)}&body=${encodeURIComponent(
    `Hi Heera Luxe team,\n\nI have a question about ${product.name}.\n\nThank you!`,
  )}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.summary,
    image: product.images.map((i) => `${site.url}${i}`),
    brand: { "@type": "Brand", name: site.name },
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      price: product.price,
      availability: product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      url: `${site.url}/products/${product.slug}`,
    },
  };

  return (
    <div className="mx-auto max-w-7xl px-4 pt-6 pb-20 sm:px-6 sm:pt-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink render={<Link href="/shop" />}>Shop</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink render={<Link href={`/shop/${product.category}`} />}>{category.label}</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{product.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="grid gap-8 md:grid-cols-[1.15fr_1fr] md:gap-14">
        <ProductGallery images={product.images} name={product.name} />

        <div className="space-y-7 md:sticky md:top-32 md:self-start">
          <div className="space-y-3">
            {!product.inStock && (
              <Badge variant="secondary" className="rounded-full tracking-wider uppercase">Sold out</Badge>
            )}
            <h1 className="text-4xl leading-tight sm:text-5xl">{product.name}</h1>
            <PriceTag product={product} showSaving className="text-lg" />
            <p className="text-xs text-muted-foreground">Free shipping across India</p>
          </div>

          <p className="text-muted-foreground">{product.summary}</p>

          <div className="space-y-3">
            {product.inStock ? (
              <>
                <AddToBag product={product} />
                <p className="text-xs text-muted-foreground">
                  Dispatched in {site.shipping.dispatchDays} days.{" "}
                  {isBag ? "Questions?" : "Not sure of your size?"}{" "}
                  <a href={site.instagram.dm} target="_blank" rel="noreferrer" className="underline underline-offset-4 hover:text-foreground">
                    Message us on Instagram
                  </a>{" "}
                  or <a href={mailto} className="underline underline-offset-4 hover:text-foreground">email us</a>.
                </p>
              </>
            ) : (
              <a
                href={site.instagram.dm}
                target="_blank"
                rel="noreferrer"
                className={cn(buttonVariants({ variant: "outline" }), "h-12 w-full rounded-full text-xs tracking-[0.18em] uppercase")}
              >
                Ask us about a restock
              </a>
            )}
          </div>

          <Accordion defaultValue={["details"]} className="border-t">
            {product.details.length > 0 && (
              <AccordionItem value="details">
                <AccordionTrigger className="py-4 text-xs tracking-[0.16em] uppercase">Product details</AccordionTrigger>
                <AccordionContent>
                  <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 text-sm">
                    {product.details.map((d) => (
                      <div key={d.label} className="contents">
                        <dt className="text-muted-foreground">{d.label}</dt>
                        <dd className="first-letter:uppercase">{d.value}</dd>
                      </div>
                    ))}
                  </dl>
                </AccordionContent>
              </AccordionItem>
            )}
            <AccordionItem value="shipping">
              <AccordionTrigger className="py-4 text-xs tracking-[0.16em] uppercase">Shipping & exchanges</AccordionTrigger>
              <AccordionContent className="space-y-2 text-sm text-muted-foreground">
                <p className="flex gap-2">
                  <TruckIcon className="mt-0.5 size-4 shrink-0" strokeWidth={1.5} />
                  Free shipping across India. Dispatched in {site.shipping.dispatchDays} business days, delivered in{" "}
                  {site.shipping.deliveryDays}.
                </p>
                <p>
                  Size issue? We exchange unused pieces within {site.exchangeDays} days of delivery, if your size is
                  available. <Link href="/shipping-returns" className="underline underline-offset-4">Full policy</Link>
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>

      {more.length > 0 && (
        <section className="mt-24">
          <SectionHeading title="You may also love" link={{ href: `/shop/${product.category}`, label: `All ${category.label.toLowerCase()}` }} />
          <div className="grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-5 lg:grid-cols-4">
            {more.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
