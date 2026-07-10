"use client";

import { useActionState } from "react";
import { RequestPanel } from "./request-panel";
import { AnalysisPanel } from "./analysis-panel";
import { ResultPanel } from "./result-panel";
import { generatePromptAction, type GeneratePromptState } from "@/lib/prompts/actions";
import { useDictionary } from "@/lib/i18n/locale-provider";
import type { PromptCategory } from "@prisma/client";

export function WorkspaceClient({
  categories,
  initialState,
  defaultInput,
  defaultCategory,
  initialSaved,
}: {
  categories: PromptCategory[];
  initialState?: GeneratePromptState;
  defaultInput?: string;
  defaultCategory?: string;
  initialSaved?: boolean;
}) {
  const dictionary = useDictionary();
  const [state, formAction, isPending] = useActionState<GeneratePromptState, FormData>(
    generatePromptAction,
    initialState ?? { status: "idle" },
  );

  const analysis = state.status === "success" ? state.analysis : null;
  const result = state.status === "success" ? state.result : null;
  const promptId = state.status === "success" ? state.promptId : null;
  const imageUrl = state.status === "success" ? state.imageUrl : null;
  const error = state.status === "error" ? state.error : undefined;

  return (
    <div className="grid gap-6 lg:grid-cols-3 lg:items-start">
      <h1 className="sr-only">{dictionary.workspace.title}</h1>
      <RequestPanel
        dictionary={dictionary}
        categories={categories}
        formAction={formAction}
        isPending={isPending}
        defaultInput={defaultInput}
        defaultCategory={defaultCategory}
        error={error}
      />
      <AnalysisPanel dictionary={dictionary} analysis={analysis} isPending={isPending} />
      <ResultPanel
        result={result}
        isPending={isPending}
        promptId={promptId}
        initialSaved={initialSaved}
        imageUrl={imageUrl}
      />
    </div>
  );
}
