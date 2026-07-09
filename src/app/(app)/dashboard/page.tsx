import Link from "next/link";
import { FileText, Plus, Grid3x3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { PromptListItem } from "@/components/dashboard/prompt-list-item";
import { EmptyState } from "@/components/shared/empty-state";
import { requireUser } from "@/lib/auth/get-current-user";
import { getDashboardStats, getRecentPrompts } from "@/lib/prompts/queries";
import { getDictionary, getLocale } from "@/lib/i18n/get-dictionary";

export default async function DashboardPage() {
  const user = await requireUser();
  const locale = await getLocale();
  const dictionary = await getDictionary(locale);

  const [stats, recentPrompts] = await Promise.all([
    getDashboardStats(user.id),
    getRecentPrompts(user.id),
  ]);

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            {dictionary.dashboard.welcome}
            {user.fullName ? `, ${user.fullName}` : ""}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">{dictionary.dashboard.subtitle}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" render={<Link href="/categories" />}>
            <Grid3x3 className="size-4" />
            {dictionary.dashboard.browseCategories}
          </Button>
          <Button render={<Link href="/workspace" />}>
            <Plus className="size-4" />
            {dictionary.dashboard.newPrompt}
          </Button>
        </div>
      </div>

      <StatsCards dictionary={dictionary} stats={stats} />

      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">{dictionary.dashboard.recentPrompts}</h2>
          {recentPrompts.length > 0 && (
            <Link href="/history" className="text-sm font-medium text-primary hover:underline">
              {dictionary.dashboard.viewAll}
            </Link>
          )}
        </div>

        {recentPrompts.length === 0 ? (
          <EmptyState
            icon={FileText}
            title={dictionary.dashboard.empty}
            action={
              <Button size="sm" render={<Link href="/workspace" />}>
                {dictionary.dashboard.newPrompt}
              </Button>
            }
          />
        ) : (
          <div className="space-y-3">
            {recentPrompts.map((prompt) => (
              <PromptListItem key={prompt.id} prompt={prompt} dictionary={dictionary} locale={locale} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
