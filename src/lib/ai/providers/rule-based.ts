import type { AIProviderAdapter, PromptAnalysisInput } from "../types";
import { analyze } from "../engine/analyze";
import { generatePromptSet } from "../engine/generate";

export const ruleBasedProvider: AIProviderAdapter = {
  key: "rule-based",
  label: "Axirova Engine (Rule-Based)",
  isAvailable: () => true,
  async analyze(input: PromptAnalysisInput) {
    return analyze(input);
  },
  async generate(input, analysisResult) {
    return generatePromptSet(input, analysisResult);
  },
};
