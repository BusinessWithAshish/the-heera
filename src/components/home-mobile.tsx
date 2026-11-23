// Home page sections shown on phones only (below the `md` width).
import { HandIcon, RefreshCwIcon, TruckIcon } from "lucide-react";

import { home } from "@/config/home";

const trustIcons = { truck: TruckIcon, refresh: RefreshCwIcon, hand: HandIcon } as const;

// The strip of three promises above the founder's message.
export function MobileTrust() {
  return (
    <section className="grid grid-cols-3 border-t px-3 py-6 md:hidden">
      {home.mobile.trust.map(({ icon, title, body }) => {
        const Icon = trustIcons[icon];
        return (
          <div key={title} className="flex flex-col items-center gap-1.5 text-center">
            <Icon className="size-5 text-foreground/80" strokeWidth={1.1} />
            <p className="text-[9px] tracking-[0.18em] uppercase">{title}</p>
            <p className="text-[10px] text-muted-foreground">{body}</p>
          </div>
        );
      })}
    </section>
  );
}
