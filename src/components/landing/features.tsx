import { Languages, Layers, Compass, Grid3x3, PenLine, History } from "lucide-react";
import type { Dictionary } from "@/lib/i18n/dictionaries/en";

const ICONS = [Languages, Layers, Compass, Grid3x3, PenLine, History];

export function Features({ dictionary }: { dictionary: Dictionary }) {
  return (
    <section id="features" className="border-t border-border/60 bg-secondary/30">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {dictionary.landing.features.title}
          </h2>
          <p className="mt-4 text-muted-foreground">{dictionary.landing.features.subtitle}</p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {dictionary.landing.features.items.map((item, index) => {
            const Icon = ICONS[index % ICONS.length];
            return (
              <div key={item.title} className="rounded-2xl border border-border bg-card p-6">
                <span className="flex size-10 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                  <Icon className="size-5" />
                </span>
                <h3 className="mt-4 text-lg font-semibold text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
