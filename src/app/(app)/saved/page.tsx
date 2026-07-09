import { Bookmark } from "lucide-react";
import { PromptListItem } from "@/components/dashboard/prompt-list-item";
import { EmptyState } from "@/components/shared/empty-state";
import { requireUser } from "@/lib/auth/get-current-user";
import { listPrompts } from "@/lib/prompts/queries";
import { getDictionary, getLocale } from "@/lib/i18n/get-dictionary";

export default async function SavedPage() {
  const user = await requireUser();
  const locale = await getLocale();
  const dictionary = await getDictionary(locale);

  const prompts = await listPrompts(user.id, { savedOnly: true });

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">{dictionary.saved.title}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{dictionary.saved.subtitle}</p>
      </div>

      {prompts.length === 0 ? (
        <EmptyState icon={Bookmark} title={dictionary.saved.empty} />
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
