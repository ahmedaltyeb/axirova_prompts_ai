"use client";

import { useState, useTransition } from "react";
import { Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { updatePreferredProviderAction } from "@/lib/settings/actions";
import { useDictionary } from "@/lib/i18n/locale-provider";

type ProviderOption = { key: string; label: string; isAvailable: boolean };

export function AIProviderForm({
  providers,
  currentKey,
}: {
  providers: ProviderOption[];
  currentKey: string;
}) {
  const dictionary = useDictionary();
  const [selected, setSelected] = useState(currentKey);
  const [isPending, startTransition] = useTransition();

  function select(key: string, isAvailable: boolean) {
    if (!isAvailable || key === selected) return;
    setSelected(key);
    startTransition(() => updatePreferredProviderAction(key));
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{dictionary.settings.aiProvider.title}</CardTitle>
        <CardDescription>{dictionary.settings.aiProvider.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        {providers.map((provider) => (
          <button
            key={provider.key}
            type="button"
            disabled={!provider.isAvailable || isPending}
            onClick={() => select(provider.key, provider.isAvailable)}
            className={cn(
              "flex w-full items-center justify-between rounded-lg border px-4 py-3 text-start text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-60",
              selected === provider.key
                ? "border-primary bg-accent text-accent-foreground"
                : "border-border text-foreground hover:bg-muted",
            )}
          >
            <span>{provider.label}</span>
            <span className="flex items-center gap-2">
              {!provider.isAvailable && (
                <Badge variant="outline" className="font-normal">
                  {dictionary.settings.aiProvider.requiresKey}
                </Badge>
              )}
              {selected === provider.key && <Check className="size-4 text-primary" />}
            </span>
          </button>
        ))}
      </CardContent>
    </Card>
  );
}
