"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Sparkles,
  History,
  Bookmark,
  Grid3x3,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useDictionary } from "@/lib/i18n/locale-provider";

export function SidebarNav({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const dictionary = useDictionary();

  const items = [
    { href: "/dashboard", label: dictionary.nav.dashboard, icon: LayoutDashboard },
    { href: "/workspace", label: dictionary.nav.newPrompt, icon: Sparkles },
    { href: "/history", label: dictionary.nav.history, icon: History },
    { href: "/saved", label: dictionary.nav.saved, icon: Bookmark },
    { href: "/categories", label: dictionary.nav.categories, icon: Grid3x3 },
    { href: "/settings", label: dictionary.nav.settings, icon: Settings },
  ];

  return (
    <nav className="flex flex-col gap-1">
      {items.map((item) => {
        const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              isActive
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
          >
            <Icon className="size-4" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
