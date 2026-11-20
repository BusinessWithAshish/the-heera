import { NextResponse } from "next/server";

import { site } from "@/config/site";
import { getProduct } from "@/lib/catalog";
import { checkoutSchema } from "@/lib/schemas";

// Checks the order against the real catalogue and works out the total.
// PAYMENT GATEWAY GOES HERE: once one is chosen, create the payment order with
// `total` below and return what the browser needs to open the payment screen.
// Until then the order isn't saved anywhere; the shopper sends it to us instead.
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = checkoutSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ message: parsed.error.issues[0]?.message ?? "Please check your details" }, { status: 400 });
  }

  const { items, ...customer } = parsed.data;
  const lines = [];
  for (const item of items) {
    const product = getProduct(item.slug);
    if (!product) return NextResponse.json({ message: "One of the pieces in your bag no longer exists" }, { status: 400 });
    if (!product.inStock) return NextResponse.json({ message: `${product.name} is sold out` }, { status: 409 });
    const needsSize = product.category !== "bags";
    if (needsSize && !site.footwearSizes.some((s) => s === item.size)) {
      return NextResponse.json({ message: `Please pick a size for ${product.name}` }, { status: 400 });
    }
    lines.push({ name: product.name, size: needsSize ? item.size : null, qty: item.qty, price: product.price, lineTotal: product.price * item.qty });
  }

  const total = lines.reduce((n, l) => n + l.lineTotal, 0);
  const orderId = `HL-${Date.now().toString(36).toUpperCase()}`;
  console.info("checkout", { orderId, customer, lines, total });

  return NextResponse.json({ ok: true, orderId, lines, total, payment: "not_connected" as const });
}
