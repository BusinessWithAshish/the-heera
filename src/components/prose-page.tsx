import { Eyebrow } from "@/components/section-heading";

export function ProsePage({ eyebrow, title, intro, children }: { eyebrow: string; title: string; intro?: string; children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-3xl px-4 pt-12 pb-24 sm:px-6 sm:pt-16">
      <div className="mb-12 space-y-3">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="text-5xl leading-tight sm:text-6xl">{title}</h1>
        {intro && <p className="text-lg text-muted-foreground">{intro}</p>}
      </div>
      <div className="space-y-12">{children}</div>
    </div>
  );
}

export function ProseSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-3 border-t pt-8">
      <h2 className="text-3xl">{title}</h2>
      <div className="space-y-3 text-muted-foreground">{children}</div>
    </section>
  );
}
