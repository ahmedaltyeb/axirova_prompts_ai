import Link from "next/link";
import { Bookmark, ChevronLeft, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { DeletePromptButton } from "./delete-prompt-button";
import { categoryLabel } from "@/lib/prompts/category-label";
import type { Dictionary } from "@/lib/i18n/dictionaries/en";
import type { Locale } from "@/lib/i18n/config";
import type { Prompt, PromptCategory } from "@prisma/client";

type PromptWithCategory = Prompt & { category: PromptCategory | null };

export function PromptListItem({
  prompt,
  dictionary,
  locale,
  showDelete = false,
}: {
  prompt: PromptWithCategory;
  dictionary: Dictionary;
  locale: Locale;
  showDelete?: boolean;
}) {
  const Chevron = locale === "ar" ? ChevronLeft : ChevronRight;
  const label = categoryLabel(dictionary, prompt.category?.key);

  return (
    <div className="flex items-center gap-2 rounded-xl border border-border bg-card p-4 transition-colors hover:bg-muted/50">
      {prompt.imageUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={prompt.imageUrl}
          alt=""
          className="size-12 shrink-0 rounded-lg border border-border object-cover"
        />
      )}
      <Link href={`/workspace/${prompt.id}`} className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="truncate font-medium text-foreground">{prompt.title}</p>
          {prompt.isSaved && <Bookmark className="size-3.5 shrink-0 fill-primary text-primary" />}
        </div>
        <p className="mt-1 truncate text-sm text-muted-foreground">{prompt.rawInput}</p>
        <div className="mt-2 flex items-center gap-2">
          {label && (
            <Badge variant="secondary" className="text-xs">
              {label}
            </Badge>
          )}
          <span className="text-xs text-muted-foreground">
            {new Intl.DateTimeFormat(locale === "ar" ? "ar" : "en", {
              dateStyle: "medium",
            }).format(prompt.createdAt)}
          </span>
        </div>
      </Link>
      {showDelete && <DeletePromptButton promptId={prompt.id} confirmLabel={dictionary.common.delete} />}
      <Link href={`/workspace/${prompt.id}`}>
        <Chevron className="size-4 shrink-0 text-muted-foreground" />
      </Link>
    </div>
  );
}
