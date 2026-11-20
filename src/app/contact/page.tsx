import type { Metadata } from "next";
import { MailIcon } from "lucide-react";

import { ContactForm } from "@/components/contact-form";
import { Eyebrow } from "@/components/section-heading";
import { InstagramIcon } from "@/components/instagram-icon";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Questions about a piece, your size or an order? Get in touch with Heera Luxe.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto grid max-w-6xl gap-14 px-4 pt-12 pb-24 sm:px-6 sm:pt-16 md:grid-cols-[1fr_1.1fr]">
      <div className="space-y-6">
        <Eyebrow>Contact</Eyebrow>
        <h1 className="text-5xl leading-tight sm:text-6xl">We&apos;d love to hear from you.</h1>
        <p className="text-lg text-muted-foreground">
          Sizing help, a restock, or a piece for a big day: send us a note. Instagram is the quickest way to reach us.
        </p>
        <ul className="space-y-4 pt-2">
          <li>
            <a href={site.instagram.dm} target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:text-gold">
              <span className="flex size-10 items-center justify-center border"><InstagramIcon className="size-4" /></span>
              <span>
                <span className="block text-xs tracking-[0.16em] text-muted-foreground uppercase">Instagram</span>
                {site.instagram.handle}
              </span>
            </a>
          </li>
          <li>
            <a href={`mailto:${site.email}`} className="flex items-center gap-3 hover:text-gold">
              <span className="flex size-10 items-center justify-center border"><MailIcon className="size-4" /></span>
              <span>
                <span className="block text-xs tracking-[0.16em] text-muted-foreground uppercase">Email</span>
                {site.email}
              </span>
            </a>
          </li>
        </ul>
      </div>
      <div className="border bg-card p-6 sm:p-8">
        <ContactForm />
      </div>
    </div>
  );
}
