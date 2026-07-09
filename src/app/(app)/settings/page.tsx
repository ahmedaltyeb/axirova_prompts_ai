import { ProfileForm } from "@/components/settings/profile-form";
import { LanguageForm } from "@/components/settings/language-form";
import { AIProviderForm } from "@/components/settings/ai-provider-form";
import { requireUser } from "@/lib/auth/get-current-user";
import { listProviders } from "@/lib/ai/provider";
import { getDictionary, getLocale } from "@/lib/i18n/get-dictionary";

export default async function SettingsPage() {
  const user = await requireUser();
  const locale = await getLocale();
  const dictionary = await getDictionary(locale);
  const providers = listProviders();
  const currentKey = user.settings?.preferredProvider?.key ?? "rule-based";

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">{dictionary.settings.title}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{dictionary.settings.subtitle}</p>
      </div>

      <ProfileForm fullName={user.fullName} email={user.email} />
      <LanguageForm />
      <AIProviderForm providers={providers} currentKey={currentKey} />
    </div>
  );
}
