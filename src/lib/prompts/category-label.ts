import type { Dictionary } from "@/lib/i18n/dictionaries/en";
import type { PromptCategoryKey } from "@prisma/client";

export function categoryLabel(dictionary: Dictionary, key: PromptCategoryKey | null | undefined) {
  if (!key) return null;
  return dictionary.categories.names[key];
}
