import { FileText, Bookmark, CalendarClock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Dictionary } from "@/lib/i18n/dictionaries/en";

export function StatsCards({
  dictionary,
  stats,
}: {
  dictionary: Dictionary;
  stats: { total: number; saved: number; thisWeek: number };
}) {
  const items = [
    { label: dictionary.dashboard.statTotal, value: stats.total, icon: FileText },
    { label: dictionary.dashboard.statSaved, value: stats.saved, icon: Bookmark },
    { label: dictionary.dashboard.statThisWeek, value: stats.thisWeek, icon: CalendarClock },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {items.map((item) => (
        <Card key={item.label}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{item.label}</CardTitle>
            <item.icon className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-foreground">{item.value}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
