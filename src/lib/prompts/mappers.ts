import type { Prompt, PromptCategory } from "@prisma/client";
import type { GeneratePromptState } from "./actions";
import type { CategoryKey } from "@/lib/ai/types";

export function promptToState(
  prompt: Prompt & { category: PromptCategory | null },
): Extract<GeneratePromptState, { status: "success" }> {
  return {
    status: "success",
    promptId: prompt.id,
    title: prompt.title,
    analysis: {
      language: prompt.language === "AR" ? "ar" : "en",
      detectedCategory: (prompt.category?.key as CategoryKey) ?? "BUSINESS",
      goal: prompt.goal ?? "",
      industry: prompt.industry ?? "",
      audience: prompt.audience ?? "",
      platform: prompt.platform ?? "",
      requiredOutput: prompt.requiredOutput ?? "",
      missingInfo: prompt.missingInfo,
      isGulfMarket: false,
      region: "",
      city: null,
    },
    result: {
      professionalPrompt: prompt.professionalPrompt,
      advancedPrompt: prompt.advancedPrompt,
      shortPrompt: prompt.shortPrompt,
      recommendedTool: prompt.recommendedTool ?? "",
      explanation: prompt.explanation ?? "",
      improvementSuggestions: prompt.improvementSuggestions,
    },
  };
}
