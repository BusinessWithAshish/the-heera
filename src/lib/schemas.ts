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
