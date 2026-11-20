import { z } from "zod";

// Zod schemas shared by forms (client) and route handlers (server).
export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name"),
  email: z.email("Please enter a valid email"),
  phone: z
    .string()
    .trim()
    .regex(/^[6-9]\d{9}$/, "Enter a 10-digit Indian mobile number")
    .optional()
    .or(z.literal("")),
  message: z.string().trim().min(10, "Tell us a little more (10+ characters)"),
});

export type ContactInput = z.infer<typeof contactSchema>;

// Checkout: the shopper's delivery details plus what's in their bag.
// Prices are never sent from the browser; the server works them out from products.json.
export const checkoutSchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name"),
  phone: z.string().trim().regex(/^[6-9]\d{9}$/, "Enter a 10-digit Indian mobile number"),
  email: z.email("Please enter a valid email"),
  address: z.string().trim().min(8, "Please enter your full address"),
  city: z.string().trim().min(2, "Please enter your city"),
  state: z.string().trim().min(2, "Please enter your state"),
  pincode: z.string().trim().regex(/^\d{6}$/, "Enter a 6-digit pincode"),
  items: z
    .array(
      z.object({
        slug: z.string().min(1),
        size: z.number().int().nullable(),
        qty: z.number().int().min(1).max(5),
      }),
    )
    .min(1, "Your bag is empty"),
});

export type CheckoutInput = z.infer<typeof checkoutSchema>;
export type CheckoutDetails = Omit<CheckoutInput, "items">;
