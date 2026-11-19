import { ContactForm } from "@/components/contact-form";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { site } from "@/config/site";

// Placeholder home page until the redesign lands. Proves the stack works end to end.
export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-xl flex-1 flex-col justify-center gap-8 px-4 py-16">
      <div className="space-y-3 text-center">
        <Badge variant="secondary">New site coming soon</Badge>
        <h1 className="font-heading text-4xl font-semibold tracking-tight">{site.name}</h1>
        <p className="text-muted-foreground">{site.description}</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Get in touch</CardTitle>
          <CardDescription>Questions about a pair or an order? Send us a note.</CardDescription>
        </CardHeader>
        <CardContent>
          <ContactForm />
        </CardContent>
      </Card>
    </main>
  );
}
