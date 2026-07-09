import type { Dictionary } from "@/lib/i18n/dictionaries/en";

export function HowItWorks({ dictionary }: { dictionary: Dictionary }) {
  return (
    <section id="how-it-works" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {dictionary.landing.howItWorks.title}
        </h2>
        <p className="mt-4 text-muted-foreground">{dictionary.landing.howItWorks.subtitle}</p>
      </div>

      <ol className="mt-14 grid gap-8 sm:grid-cols-3">
        {dictionary.landing.howItWorks.steps.map((step, index) => (
          <li key={step.title} className="relative rounded-2xl border border-border bg-card p-6">
            <span className="flex size-10 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
              {index + 1}
            </span>
            <h3 className="mt-4 text-lg font-semibold text-foreground">{step.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{step.description}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
