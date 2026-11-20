import type { Metadata } from "next";
import Link from "next/link";

import { ProsePage } from "@/components/prose-page";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers about ordering, shipping, sizes and exchanges at Heera Luxe.",
};

const faqs = [
  {
    q: "How do I place an order?",
    a: (
      <>
        Message us on{" "}
        <a href={site.instagram.dm} target="_blank" rel="noreferrer" className="text-foreground underline underline-offset-4">
          Instagram
        </a>{" "}
        or email {site.email} with the name of the piece and your size. We&apos;ll confirm stock and payment details.
      </>
    ),
  },
  {
    q: "How long will my order take to arrive?",
    a: `Orders are dispatched within ${site.shipping.dispatchDays} business days and usually arrive in ${site.shipping.deliveryDays} business days, depending on where you are in India. You'll get a tracking number when it ships.`,
  },
  {
    q: "Is shipping free?",
    a: "Yes, shipping is free on every order within India.",
  },
  {
    q: "What sizes do your shoes come in?",
    a: "Our footwear is sized in Euro sizes. If you're between sizes or unsure, message us and we'll help you choose.",
  },
  {
    q: "Can I return or exchange my order?",
    a: (
      <>
        We don&apos;t offer returns right now. If the size isn&apos;t right, we&apos;ll exchange unused pieces within{" "}
        {site.exchangeDays} days of delivery, if your size is available. See the{" "}
        <Link href="/shipping-returns" className="text-foreground underline underline-offset-4">
          full policy
        </Link>
        .
      </>
    ),
  },
  {
    q: "What if I receive the wrong or a damaged piece?",
    a: "Message us within the exchange window with a photo and we'll make it right.",
  },
  {
    q: "Where are Heera pieces made?",
    a: "Everything is made in India, with each embellishment sewn on by hand by our artisans.",
  },
];

export default function FaqPage() {
  return (
    <ProsePage
      eyebrow="Help"
      title="Questions, answered"
      intro="Can't find what you're looking for? Message us on Instagram and we'll get back to you as soon as we can."
    >
      <Accordion className="border-t">
        {faqs.map((f) => (
          <AccordionItem key={f.q} value={f.q}>
            <AccordionTrigger className="py-5 font-heading text-xl">{f.q}</AccordionTrigger>
            <AccordionContent className="text-base text-muted-foreground">{f.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </ProsePage>
  );
}
