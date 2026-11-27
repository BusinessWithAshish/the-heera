"use client";

import Link from "next/link";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckIcon, CopyIcon, MailIcon } from "lucide-react";
import { Controller, useForm } from "react-hook-form";

import { CartLineRow } from "@/components/cart-drawer";
import { InstagramIcon } from "@/components/instagram-icon";
import { Ornament } from "@/components/section-heading";
import { Button, buttonVariants } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/toast";
import { site } from "@/config/site";
import { api, apiErrorMessage } from "@/lib/api";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/catalog";
import { checkoutSchema, type CheckoutDetails } from "@/lib/schemas";
import { cn } from "@/lib/utils";

const detailsSchema = checkoutSchema.omit({ items: true });

type OrderResult = {
  orderId: string;
  total: number;
  lines: { name: string; size: number | null; qty: number; lineTotal: number }[];
};

const fields = [
  { name: "name", label: "Full name", type: "text", autoComplete: "name", wide: true },
  { name: "phone", label: "Mobile number", type: "tel", autoComplete: "tel-national", wide: false },
  { name: "email", label: "Email", type: "email", autoComplete: "email", wide: false },
  { name: "address", label: "Address", type: "textarea", autoComplete: "street-address", wide: true },
  { name: "city", label: "City", type: "text", autoComplete: "address-level2", wide: false },
  { name: "state", label: "State", type: "text", autoComplete: "address-level1", wide: false },
  { name: "pincode", label: "Pincode", type: "text", autoComplete: "postal-code", wide: false },
] as const;

const button = "h-12 rounded-full text-[11px] tracking-[0.22em] uppercase";

function orderText(order: OrderResult, d: CheckoutDetails) {
  return [
    `New order ${order.orderId}`,
    "",
    ...order.lines.map((l) => `• ${l.name}${l.size ? `, size ${l.size}` : ""} × ${l.qty}: ${formatPrice(l.lineTotal)}`),
    `Total: ${formatPrice(order.total)}`,
    "",
    `${d.name}, ${d.phone}, ${d.email}`,
    `${d.address}, ${d.city}, ${d.state} ${d.pincode}`,
  ].join("\n");
}

export function CheckoutView() {
  const { lines, subtotal, ready, clear } = useCart();
  const [placed, setPlaced] = useState<{ order: OrderResult; details: CheckoutDetails } | null>(null);
  const [copied, setCopied] = useState(false);

  const form = useForm<CheckoutDetails>({
    resolver: zodResolver(detailsSchema),
    defaultValues: { name: "", phone: "", email: "", address: "", city: "", state: "", pincode: "" },
  });

  async function onSubmit(details: CheckoutDetails) {
    try {
      const { data } = await api.post<OrderResult>("/checkout", {
        ...details,
        items: lines.map(({ slug, size, qty }) => ({ slug, size, qty })),
      });
      setPlaced({ order: data, details });
      clear();
      window.scrollTo({ top: 0 });
    } catch (error) {
      toast.add({ type: "error", title: apiErrorMessage(error) });
    }
  }

  if (placed) {
    const text = orderText(placed.order, placed.details);
    const mailto = `mailto:${site.email}?subject=${encodeURIComponent(`Order ${placed.order.orderId}`)}&body=${encodeURIComponent(text)}`;
    return (
      <div className="mx-auto max-w-xl space-y-8 px-4 py-16 text-center sm:py-24">
        <div className="space-y-4">
          <p className="text-[11px] tracking-[0.24em] text-gold uppercase">Order {placed.order.orderId}</p>
          <h1 className="text-4xl tracking-[0.1em] uppercase sm:text-5xl">Almost there</h1>
          <Ornament />
        </div>
        <p className="text-muted-foreground">
          Online payment is being set up. To confirm your order of{" "}
          <span className="text-foreground">{formatPrice(placed.order.total)}</span>, send it to us below and
          we&apos;ll reply with payment details. We dispatch in {site.shipping.dispatchDays} days.
        </p>
        <pre className="rounded-2xl border bg-card p-5 text-left font-sans text-xs leading-relaxed whitespace-pre-wrap">{text}</pre>
        <div className="grid gap-3 sm:grid-cols-2">
          <a href={mailto} className={cn(buttonVariants(), button, "gap-2")}>
            <MailIcon className="size-4" /> Send by email
          </a>
          <a
            href={site.instagram.dm}
            target="_blank"
            rel="noreferrer"
            onClick={() => navigator.clipboard?.writeText(text).catch(() => {})}
            className={cn(buttonVariants({ variant: "outline" }), button, "gap-2 bg-transparent")}
          >
            <InstagramIcon className="size-4" /> Send on Instagram
          </a>
        </div>
        <Button
          variant="ghost"
          className="gap-2 text-xs"
          onClick={() =>
            navigator.clipboard
              ?.writeText(text)
              .then(() => setCopied(true))
              .catch(() => toast.add({ type: "error", title: "Couldn't copy. Please select the text above." }))
          }
        >
          {copied ? <CheckIcon className="size-3.5" /> : <CopyIcon className="size-3.5" />}
          {copied ? "Copied" : "Copy order details"}
        </Button>
      </div>
    );
  }

  if (ready && lines.length === 0) {
    return (
      <div className="mx-auto max-w-xl space-y-6 px-4 py-24 text-center">
        <h1 className="text-4xl tracking-[0.1em] uppercase">Your bag is empty</h1>
        <Ornament />
        <Link href="/shop" className={cn(buttonVariants(), button, "px-10")}>
          Start shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 pt-10 pb-20 sm:px-6 sm:pt-14">
      <div className="mb-10 space-y-3 text-center">
        <h1 className="text-4xl tracking-[0.14em] uppercase sm:text-5xl">Checkout</h1>
        <Ornament />
      </div>

      <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
        <form onSubmit={form.handleSubmit(onSubmit)} noValidate className="order-2 lg:order-1">
          <h2 className="mb-6 font-sans text-[11px] tracking-[0.22em] uppercase">Delivery details</h2>
          <FieldGroup className="grid gap-5 sm:grid-cols-2">
            {fields.map((f) => (
              <Controller
                key={f.name}
                name={f.name}
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className={cn(f.wide && "sm:col-span-2")}>
                    <FieldLabel htmlFor={f.name}>{f.label}</FieldLabel>
                    {f.type === "textarea" ? (
                      <Textarea
                        {...field}
                        id={f.name}
                        rows={3}
                        autoComplete={f.autoComplete}
                        aria-invalid={fieldState.invalid}
                        className="rounded-xl bg-card"
                      />
                    ) : (
                      <Input
                        {...field}
                        id={f.name}
                        type={f.type}
                        inputMode={f.name === "phone" || f.name === "pincode" ? "numeric" : undefined}
                        autoComplete={f.autoComplete}
                        aria-invalid={fieldState.invalid}
                        className="h-11 rounded-xl bg-card"
                      />
                    )}
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
            ))}
          </FieldGroup>
          <Button
            type="submit"
            disabled={form.formState.isSubmitting || !ready}
            className={cn(button, "mt-8 w-full")}
          >
            {form.formState.isSubmitting ? "Placing order…" : `Place order · ${formatPrice(subtotal)}`}
          </Button>
          <p className="mt-3 text-center text-xs text-muted-foreground">
            Online payment is coming soon. For now we&apos;ll confirm your order and share payment details on
            Instagram or email.
          </p>
        </form>

        <aside className="order-1 self-start rounded-2xl border bg-card px-5 py-2 lg:order-2 lg:sticky lg:top-32">
          <h2 className="pt-4 font-sans text-[11px] tracking-[0.22em] uppercase">Your order</h2>
          <ul className="divide-y">
            {lines.map((line) => (
              <CartLineRow key={`${line.slug}-${line.size}`} line={line} />
            ))}
          </ul>
          <dl className="space-y-2 border-t py-5 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Subtotal</dt>
              <dd className="tabular-nums">{formatPrice(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Shipping</dt>
              <dd>{site.shipping.freeInIndia ? "Free" : "Calculated later"}</dd>
            </div>
            <div className="flex justify-between border-t pt-3 text-base">
              <dt className="tracking-[0.14em] uppercase">Total</dt>
              <dd className="tabular-nums">{formatPrice(subtotal)}</dd>
            </div>
          </dl>
        </aside>
      </div>
    </div>
  );
}
