import type { Metadata } from "next";
import Link from "next/link";

import { ProsePage, ProseSection } from "@/components/prose-page";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Shipping & exchanges",
  description: "Free shipping across India, dispatch in 1–2 days, and size exchanges.",
};

export default function ShippingReturnsPage() {
  return (
    <ProsePage
      eyebrow="Store policy"
      title="Shipping & exchanges"
      intro="Fair, clear and worry-free. Here's exactly what to expect once you order."
    >
      <ProseSection title="Shipping">
        <p>
          Shipping is free on every order within India. Orders are packed and dispatched within{" "}
          {site.shipping.dispatchDays} business days, and you&apos;ll get a tracking number as soon as yours ships.
        </p>
        <p>
          Delivery usually takes {site.shipping.deliveryDays} business days depending on your state. Every piece is
          packed with care so it reaches you in perfect condition.
        </p>
      </ProseSection>

      <ProseSection title="Exchanges">
        <p>We don&apos;t offer returns at the moment, but we&apos;re happy to help if the size isn&apos;t right.</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Size exchanges are accepted within {site.exchangeDays} days of delivery, if your size is in stock.</li>
          <li>The piece must be unused and in its original condition. We can&apos;t exchange worn items.</li>
          <li>Original shipping charges aren&apos;t refundable, and return shipping for an exchange is paid by you.</li>
          <li>Once we receive and check the piece, we send your replacement.</li>
        </ul>
        <p>
          To start an exchange, message us on{" "}
          <a href={site.instagram.dm} target="_blank" rel="noreferrer" className="text-foreground underline underline-offset-4">
            Instagram
          </a>{" "}
          or email{" "}
          <a href={`mailto:${site.email}`} className="text-foreground underline underline-offset-4">
            {site.email}
          </a>
          .
        </p>
      </ProseSection>

      <ProseSection title="Made in India">
        <p>
          Heera pieces are proudly made in India. Our artisans sew every embellishment by hand, so each one is built to
          last.
        </p>
      </ProseSection>

      <ProseSection title="Your privacy">
        <p>
          We only use your details to process and deliver your order. We never sell or share them, except with the
          partners who deliver your order.
        </p>
        <p>
          Questions? <Link href="/contact" className="text-foreground underline underline-offset-4">Get in touch</Link>.
        </p>
      </ProseSection>
    </ProsePage>
  );
}
