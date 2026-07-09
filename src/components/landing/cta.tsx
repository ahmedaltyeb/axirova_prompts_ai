import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { Dictionary } from "@/lib/i18n/dictionaries/en";

export function CTA({ dictionary }: { dictionary: Dictionary }) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <div className="relative overflow-hidden rounded-3xl bg-primary px-8 py-16 text-center text-primary-foreground sm:py-20">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(255,255,255,0.15),_transparent_60%)]" />
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{dictionary.landing.cta.title}</h2>
        <p className="mx-auto mt-4 max-w-xl text-primary-foreground/80">{dictionary.landing.cta.subtitle}</p>
        <Button size="lg" variant="secondary" className="mt-8" render={<Link href="/signup" />}>
          {dictionary.landing.cta.button}
        </Button>
      </div>
    </section>
  );
}
