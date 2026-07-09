import { Sparkles } from "lucide-react";
import type { Dictionary } from "@/lib/i18n/dictionaries/en";

export function Footer({ dictionary }: { dictionary: Dictionary }) {
  return (
    <footer className="border-t border-border/60">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-10 text-sm text-muted-foreground sm:flex-row sm:px-6">
        <div className="flex items-center gap-2 font-medium text-foreground">
          <span className="flex size-7 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Sparkles className="size-3.5" />
          </span>
          {dictionary.common.brandFull}
        </div>
        <p>{dictionary.landing.footer.tagline}</p>
        <p>
          © {new Date().getFullYear()} {dictionary.common.brand}. {dictionary.landing.footer.rights}
        </p>
      </div>
    </footer>
  );
}
