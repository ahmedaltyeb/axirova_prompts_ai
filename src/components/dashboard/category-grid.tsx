import Link from "next/link";
import {
  Megaphone,
  Briefcase,
  Code,
  Palette,
  Image as ImageIcon,
  Video,
  PenLine,
  Search,
  Workflow,
  Grid3x3,
  type LucideIcon,
} from "lucide-react";
import { categoryLabel } from "@/lib/prompts/category-label";
import type { Dictionary } from "@/lib/i18n/dictionaries/en";
import type { PromptCategory } from "@prisma/client";

const ICON_MAP: Record<string, LucideIcon> = {
  megaphone: Megaphone,
  briefcase: Briefcase,
  code: Code,
  palette: Palette,
  image: ImageIcon,
  video: Video,
  "pen-line": PenLine,
  search: Search,
  workflow: Workflow,
};

export function CategoryGrid({
  dictionary,
  categories,
}: {
  dictionary: Dictionary;
  categories: Array<PromptCategory & { promptCount: number }>;
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {categories.map((category) => {
        const Icon = ICON_MAP[category.icon ?? ""] ?? Grid3x3;
        return (
          <Link
            key={category.id}
            href={`/workspace?category=${category.key}`}
            className="rounded-2xl border border-border bg-card p-5 transition-colors hover:bg-muted/50"
          >
            <span className="flex size-10 items-center justify-center rounded-lg bg-accent text-accent-foreground">
              <Icon className="size-5" />
            </span>
            <h3 className="mt-4 font-semibold text-foreground">{categoryLabel(dictionary, category.key)}</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {category.promptCount} {dictionary.categories.promptCount}
            </p>
          </Link>
        );
      })}
    </div>
  );
}
