import { Target, Building2, Users, Radio, PackageCheck, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import type { Dictionary } from "@/lib/i18n/dictionaries/en";
import type { PromptAnalysisResult } from "@/lib/ai/types";

function Row({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-foreground">
        <Icon className="size-4" />
      </span>
      <div>
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</p>
        <p className="mt-0.5 text-sm text-foreground">{value}</p>
      </div>
    </div>
  );
}

export function AnalysisPanel({
  dictionary,
  analysis,
  isPending,
}: {
  dictionary: Dictionary;
  analysis: PromptAnalysisResult | null;
  isPending: boolean;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{dictionary.workspace.analysisPanel.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {isPending ? (
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-10 w-full" />
            ))}
          </div>
        ) : !analysis ? (
          <p className="text-sm text-muted-foreground">{dictionary.workspace.analysisPanel.empty}</p>
        ) : (
          <>
            <Row icon={Target} label={dictionary.workspace.analysisPanel.goal} value={analysis.goal} />
            <Row icon={Building2} label={dictionary.workspace.analysisPanel.industry} value={analysis.industry} />
            <Row icon={Users} label={dictionary.workspace.analysisPanel.audience} value={analysis.audience} />
            <Row icon={Radio} label={dictionary.workspace.analysisPanel.platform} value={analysis.platform} />
            <Row
              icon={PackageCheck}
              label={dictionary.workspace.analysisPanel.requiredOutput}
              value={analysis.requiredOutput}
            />
            {analysis.missingInfo.length > 0 && (
              <div className="flex items-start gap-3">
                <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                  <AlertCircle className="size-4" />
                </span>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    {dictionary.workspace.analysisPanel.missingInfo}
                  </p>
                  <div className="mt-1.5 flex flex-wrap gap-1.5">
                    {analysis.missingInfo.map((item) => (
                      <Badge key={item} variant="outline" className="font-normal">
                        {item}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
