"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Bookmark, Copy, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { toggleSavePromptAction } from "@/lib/prompts/actions";
import { useDictionary } from "@/lib/i18n/locale-provider";
import type { GeneratedPromptSet } from "@/lib/ai/types";

function CopyableBlock({ text, copyLabel }: { text: string; copyLabel: string }) {
  function copy() {
    navigator.clipboard.writeText(text);
    toast.success(copyLabel);
  }

  return (
    <div className="relative rounded-lg border border-border bg-muted/40 p-4">
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        className="absolute end-2 top-2"
        onClick={copy}
      >
        <Copy className="size-3.5" />
      </Button>
      <pre className="whitespace-pre-wrap pe-8 font-sans text-sm text-foreground">{text}</pre>
    </div>
  );
}

export function ResultPanel({
  result,
  isPending,
  promptId,
  initialSaved = false,
}: {
  result: GeneratedPromptSet | null;
  isPending: boolean;
  promptId: string | null;
  initialSaved?: boolean;
}) {
  const dictionary = useDictionary();
  const [isSaved, setIsSaved] = useState(initialSaved);
  const [isSaving, startSaving] = useTransition();

  function toggleSave() {
    if (!promptId) return;
    const next = !isSaved;
    setIsSaved(next);
    startSaving(async () => {
      await toggleSavePromptAction(promptId, next);
      toast.success(next ? dictionary.common.saved : dictionary.common.save);
    });
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{dictionary.workspace.resultPanel.title}</CardTitle>
        {result && promptId && (
          <Button variant="outline" size="sm" onClick={toggleSave} disabled={isSaving}>
            <Bookmark className={isSaved ? "size-4 fill-primary text-primary" : "size-4"} />
            {dictionary.workspace.resultPanel.savePrompt}
          </Button>
        )}
      </CardHeader>
      <CardContent>
        {isPending ? (
          <div className="space-y-3">
            <Skeleton className="h-8 w-40" />
            <Skeleton className="h-40 w-full" />
          </div>
        ) : !result ? (
          <p className="text-sm text-muted-foreground">{dictionary.workspace.resultPanel.empty}</p>
        ) : (
          <div className="space-y-6">
            <Tabs defaultValue="professional">
              <TabsList>
                <TabsTrigger value="professional">{dictionary.workspace.resultPanel.professional}</TabsTrigger>
                <TabsTrigger value="advanced">{dictionary.workspace.resultPanel.advanced}</TabsTrigger>
                <TabsTrigger value="short">{dictionary.workspace.resultPanel.short}</TabsTrigger>
              </TabsList>
              <TabsContent value="professional" className="mt-3">
                <CopyableBlock text={result.professionalPrompt} copyLabel={dictionary.common.copied} />
              </TabsContent>
              <TabsContent value="advanced" className="mt-3">
                <CopyableBlock text={result.advancedPrompt} copyLabel={dictionary.common.copied} />
              </TabsContent>
              <TabsContent value="short" className="mt-3">
                <CopyableBlock text={result.shortPrompt} copyLabel={dictionary.common.copied} />
              </TabsContent>
            </Tabs>

            <div>
              <p className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                <Wand2 className="size-3.5" />
                {dictionary.workspace.resultPanel.recommendedTool}
              </p>
              <p className="mt-1.5 text-sm text-foreground">{result.recommendedTool}</p>
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {dictionary.workspace.resultPanel.explanation}
              </p>
              <p className="mt-1.5 text-sm text-foreground">{result.explanation}</p>
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {dictionary.workspace.resultPanel.suggestions}
              </p>
              <ul className="mt-1.5 list-inside list-disc space-y-1 text-sm text-foreground">
                {result.improvementSuggestions.map((tip) => (
                  <li key={tip}>{tip}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
