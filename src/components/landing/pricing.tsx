import { Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Dictionary } from "@/lib/i18n/dictionaries/en";

export function Pricing({ dictionary }: { dictionary: Dictionary }) {
  return (
    <section id="pricing" className="border-t border-border/60 bg-secondary/30">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant="outline" className="mb-4">
            {dictionary.landing.pricing.badge}
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {dictionary.landing.pricing.title}
          </h2>
          <p className="mt-4 text-muted-foreground">{dictionary.landing.pricing.subtitle}</p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {dictionary.landing.pricing.plans.map((plan) => (
            <div
              key={plan.name}
              className={cn(
                "flex flex-col rounded-2xl border p-6",
                "highlighted" in plan && plan.highlighted
                  ? "border-primary bg-card shadow-lg shadow-primary/10"
                  : "border-border bg-card",
              )}
            >
              <h3 className="text-lg font-semibold text-foreground">{plan.name}</h3>
              <p className="mt-4 text-3xl font-bold text-foreground">{plan.price}</p>
              <p className="mt-2 text-sm text-muted-foreground">{plan.description}</p>
              <ul className="mt-6 flex-1 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-foreground">
                    <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button className="mt-8" variant={"highlighted" in plan && plan.highlighted ? "default" : "outline"} disabled>
                {dictionary.common.comingSoon}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
