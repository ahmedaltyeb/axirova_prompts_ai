import { Badge } from "@/components/ui/badge";
import type { Dictionary } from "@/lib/i18n/dictionaries/en";

export function AIToolsSupported({ dictionary }: { dictionary: Dictionary }) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {dictionary.landing.aiTools.title}
        </h2>
        <p className="mt-4 text-muted-foreground">{dictionary.landing.aiTools.subtitle}</p>
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
        {dictionary.landing.aiTools.tools.map((tool) => (
          <Badge key={tool} variant="secondary" className="rounded-full px-4 py-2 text-sm">
            {tool}
          </Badge>
        ))}
      </div>
    </section>
  );
}
