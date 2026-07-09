"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { setLocaleAction } from "@/lib/i18n/actions";
import { useDictionary, useLocale } from "@/lib/i18n/locale-provider";
import type { Locale } from "@/lib/i18n/config";

export function LanguageSwitcher() {
  const locale = useLocale();
  const dictionary = useDictionary();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function switchTo(next: Locale) {
    if (next === locale) return;
    startTransition(async () => {
      await setLocaleAction(next);
      router.refresh();
    });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={<Button variant="ghost" size="sm" disabled={isPending} className="gap-2" />}
      >
        <Languages className="size-4" />
        {locale === "ar" ? dictionary.common.arabic : dictionary.common.english}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onSelect={() => switchTo("ar")}>
          {dictionary.common.arabic}
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => switchTo("en")}>
          {dictionary.common.english}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
