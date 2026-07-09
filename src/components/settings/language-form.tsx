"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { updateLanguagePreferenceAction } from "@/lib/settings/actions";
import { useDictionary, useLocale } from "@/lib/i18n/locale-provider";
import type { Locale } from "@/lib/i18n/config";

export function LanguageForm() {
  const dictionary = useDictionary();
  const locale = useLocale();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function select(next: Locale) {
    if (next === locale) return;
    startTransition(async () => {
      await updateLanguagePreferenceAction(next);
      router.refresh();
    });
  }

  const options: { value: Locale; label: string }[] = [
    { value: "ar", label: dictionary.common.arabic },
    { value: "en", label: dictionary.common.english },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>{dictionary.settings.language.title}</CardTitle>
        <CardDescription>{dictionary.settings.language.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex gap-3">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            disabled={isPending}
            onClick={() => select(option.value)}
            className={cn(
              "flex flex-1 items-center justify-between rounded-lg border px-4 py-3 text-sm font-medium transition-colors",
              locale === option.value
                ? "border-primary bg-accent text-accent-foreground"
                : "border-border text-muted-foreground hover:bg-muted",
            )}
          >
            {option.label}
            {locale === option.value && <Check className="size-4 text-primary" />}
          </button>
        ))}
      </CardContent>
    </Card>
  );
}
