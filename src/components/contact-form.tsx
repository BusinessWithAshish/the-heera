"use client";

// Reference form: copy this pattern (react-hook-form + Zod + shadcn Field + Axios + toast) for every form.
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/toast";
import { api, apiErrorMessage } from "@/lib/api";
import { contactSchema, type ContactInput } from "@/lib/schemas";

export function ContactForm() {
  const form = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", phone: "", message: "" },
  });

  async function onSubmit(values: ContactInput) {
    try {
      await api.post("/contact", values);
      toast.add({ type: "success", title: "Thanks! We'll get back to you soon." });
      form.reset();
    } catch (error) {
      toast.add({ type: "error", title: apiErrorMessage(error) });
    }
  }

  const fields = [
    { name: "name", label: "Name", type: "text", autoComplete: "name" },
    { name: "email", label: "Email", type: "email", autoComplete: "email" },
    { name: "phone", label: "Phone (optional)", type: "tel", autoComplete: "tel" },
  ] as const;

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
      <FieldGroup>
        {fields.map((f) => (
          <Controller
            key={f.name}
            name={f.name}
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={f.name}>{f.label}</FieldLabel>
                <Input
                  {...field}
                  id={f.name}
                  type={f.type}
                  autoComplete={f.autoComplete}
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
        ))}
        <Controller
          name="message"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="message">Message</FieldLabel>
              <Textarea {...field} id="message" rows={4} aria-invalid={fieldState.invalid} />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? "Sending…" : "Send message"}
        </Button>
      </FieldGroup>
    </form>
  );
}
