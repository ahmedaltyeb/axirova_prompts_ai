import { History as HistoryIcon, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { PromptListItem } from "@/components/dashboard/prompt-list-item";
import { EmptyState } from "@/components/shared/empty-state";
import { requireUser } from "@/lib/auth/get-current-user";
import { listPrompts } from "@/lib/prompts/queries";
import { categoryLabel } from "@/lib/prompts/category-label";
import { getDictionary, getLocale } from "@/lib/i18n/get-dictionary";
import { prisma } from "@/lib/db/prisma";
import type { PromptCategoryKey } from "@prisma/client";

export default async function HistoryPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string }>;
}) {
  const user = await requireUser();
  const locale = await getLocale();
  const dictionary = await getDictionary(locale);
  const { q, category } = await searchParams;

  const [prompts, categories] = await Promise.all([
    listPrompts(user.id, {
      search: q,
      categoryKey: category as PromptCategoryKey | undefined,
    }),
    prisma.promptCategory.findMany({ orderBy: { key: "asc" } }),
  ]);

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">{dictionary.history.title}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{dictionary.history.subtitle}</p>
      </div>

      <form className="flex flex-col gap-3 sm:flex-row" method="get">
        <div className="relative flex-1">
          <Search className="absolute start-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            name="q"
            defaultValue={q ?? ""}
            placeholder={dictionary.history.search}
            className="h-9 ps-8"
          />
        </div>
        <select
          name="category"
          defaultValue={category ?? ""}
          className="h-9 rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          <option value="">{dictionary.history.filterCategory}</option>
          {categories.map((c) => (
            <option key={c.id} value={c.key}>
              {categoryLabel(dictionary, c.key)}
            </option>
          ))}
        </select>
      </form>

      {prompts.length === 0 ? (
        <EmptyState icon={HistoryIcon} title={dictionary.history.empty} />
      ) : (
        <div className="space-y-3">
          {prompts.map((prompt) => (
            <PromptListItem key={prompt.id} prompt={prompt} dictionary={dictionary} locale={locale} showDelete />
          ))}
        </div>
      )}
    </div>
  );
}
