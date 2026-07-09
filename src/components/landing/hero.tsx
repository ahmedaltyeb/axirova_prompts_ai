import Link from "next/link";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Dictionary } from "@/lib/i18n/dictionaries/en";
import type { Locale } from "@/lib/i18n/config";

export function Hero({ dictionary, locale }: { dictionary: Dictionary; locale: Locale }) {
  const Arrow = locale === "ar" ? ArrowLeft : ArrowRight;

  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[560px] bg-[radial-gradient(circle_at_top,_var(--accent)_0%,_transparent_60%)] opacity-80" />
      <div className="mx-auto flex max-w-4xl flex-col items-center px-4 py-20 text-center sm:px-6 sm:py-28">
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-4 py-1.5 text-sm font-medium text-secondary-foreground">
          <Sparkles className="size-3.5 text-primary" />
          {dictionary.landing.hero.badge}
        </span>

        <h1 className="mt-6 text-balance text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
          {dictionary.landing.hero.title}
        </h1>

        <p className="mt-6 max-w-2xl text-pretty text-lg text-muted-foreground">
          {dictionary.landing.hero.subtitle}
        </p>

        <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row">
          <Button size="lg" render={<Link href="/signup" />}>
            {dictionary.landing.hero.ctaPrimary}
            <Arrow className="size-4" />
          </Button>
          <Button size="lg" variant="outline" render={<Link href="#how-it-works" />}>
            {dictionary.landing.hero.ctaSecondary}
          </Button>
        </div>

        <div className="mt-14 w-full max-w-2xl rounded-2xl border border-border bg-card p-4 text-start shadow-sm sm:p-6">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {dictionary.landing.hero.exampleLabel}
          </p>
          <p className="mt-2 rounded-lg bg-muted px-4 py-3 text-sm text-foreground sm:text-base">
            {dictionary.landing.hero.exampleInput}
          </p>
        </div>
      </div>
    </section>
  );
}
