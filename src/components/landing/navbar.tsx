import Link from "next/link";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/shared/language-switcher";
import type { Dictionary } from "@/lib/i18n/dictionaries/en";

export function Navbar({ dictionary }: { dictionary: Dictionary }) {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold text-foreground">
          <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Sparkles className="size-4" />
          </span>
          {dictionary.common.brand}
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-muted-foreground md:flex">
          <Link href="#features" className="hover:text-foreground">
            {dictionary.nav.features}
          </Link>
          <Link href="#how-it-works" className="hover:text-foreground">
            {dictionary.nav.howItWorks}
          </Link>
          <Link href="#pricing" className="hover:text-foreground">
            {dictionary.nav.pricing}
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <Button
            variant="ghost"
            size="sm"
            className="hidden sm:inline-flex"
            render={<Link href="/login" />}
          >
            {dictionary.common.signIn}
          </Button>
          <Button size="sm" render={<Link href="/signup" />}>
            {dictionary.common.getStarted}
          </Button>
        </div>
      </div>
    </header>
  );
}
