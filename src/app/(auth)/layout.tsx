import Link from "next/link";
import { Sparkles } from "lucide-react";
import { LanguageSwitcher } from "@/components/shared/language-switcher";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background px-4 py-12">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_var(--accent)_0%,_transparent_55%)] opacity-70" />
      <div className="absolute top-6 inset-x-0 flex items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold text-foreground">
          <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Sparkles className="size-4" />
          </span>
          Axirova
        </Link>
        <LanguageSwitcher />
      </div>
      <div className="w-full max-w-md">{children}</div>
    </div>
  );
}
