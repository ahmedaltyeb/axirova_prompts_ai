"use client";

import { useState } from "react";
import { Menu, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { LanguageSwitcher } from "@/components/shared/language-switcher";
import { SidebarNav } from "./sidebar-nav";
import { UserMenu } from "./user-menu";
import { useLocale } from "@/lib/i18n/locale-provider";

export function Topbar({ fullName, email }: { fullName: string | null; email: string }) {
  const [open, setOpen] = useState(false);
  const locale = useLocale();

  return (
    <header className="flex h-16 items-center gap-3 border-b border-border px-4 sm:px-6">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger render={<Button variant="ghost" size="icon" className="md:hidden" />}>
          <Menu className="size-5" />
        </SheetTrigger>
        <SheetContent side={locale === "ar" ? "right" : "left"} className="w-64 p-0">
          <SheetHeader className="border-b border-border">
            <SheetTitle className="flex items-center gap-2">
              <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Sparkles className="size-4" />
              </span>
              Axirova
            </SheetTitle>
          </SheetHeader>
          <div className="p-4">
            <SidebarNav onNavigate={() => setOpen(false)} />
          </div>
        </SheetContent>
      </Sheet>

      <div className="flex-1" />
      <LanguageSwitcher />
      <UserMenu fullName={fullName} email={email} />
    </header>
  );
}
