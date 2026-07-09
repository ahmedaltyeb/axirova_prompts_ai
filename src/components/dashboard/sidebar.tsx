import Link from "next/link";
import { Sparkles } from "lucide-react";
import { SidebarNav } from "./sidebar-nav";

export function Sidebar() {
  return (
    <aside className="hidden w-64 shrink-0 border-e border-border bg-sidebar md:flex md:flex-col">
      <div className="flex h-16 items-center gap-2 border-b border-border px-6 font-semibold text-sidebar-foreground">
        <Link href="/dashboard" className="flex items-center gap-2">
          <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Sparkles className="size-4" />
          </span>
          Axirova
        </Link>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        <SidebarNav />
      </div>
    </aside>
  );
}
