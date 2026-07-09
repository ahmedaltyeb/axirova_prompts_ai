import { CategoryGrid } from "@/components/dashboard/category-grid";
import { requireUser } from "@/lib/auth/get-current-user";
import { getCategoriesWithCounts } from "@/lib/prompts/queries";
import { getDictionary, getLocale } from "@/lib/i18n/get-dictionary";

export default async function CategoriesPage() {
  const user = await requireUser();
  const locale = await getLocale();
  const dictionary = await getDictionary(locale);
  const categories = await getCategoriesWithCounts(user.id);

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">{dictionary.categories.title}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{dictionary.categories.subtitle}</p>
      </div>

      <CategoryGrid dictionary={dictionary} categories={categories} />
    </div>
  );
}
