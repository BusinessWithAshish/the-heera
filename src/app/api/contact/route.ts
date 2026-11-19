import { NextResponse } from "next/server";

import { contactSchema } from "@/lib/schemas";

// Validates with the same Zod schema as the form. Delivery (email/WhatsApp/CRM) is not wired yet.
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { message: parsed.error.issues[0]?.message ?? "Invalid details" },
      { status: 400 },
    );
  }
  console.info("contact form", parsed.data);
  return NextResponse.json({ ok: true });
}
