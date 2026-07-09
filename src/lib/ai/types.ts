export type SupportedLanguage = "ar" | "en";

export type CategoryKey =
  | "MARKETING"
  | "BUSINESS"
  | "CODING"
  | "DESIGN"
  | "IMAGE_GENERATION"
  | "VIDEO_GENERATION"
  | "WRITING"
  | "RESEARCH"
  | "AUTOMATION";

export interface PromptAnalysisInput {
  rawInput: string;
  language?: SupportedLanguage;
  categoryHint?: CategoryKey;
}

export interface PromptAnalysisResult {
  language: SupportedLanguage;
  detectedCategory: CategoryKey;
  goal: string;
  industry: string;
  audience: string;
  platform: string;
  requiredOutput: string;
  missingInfo: string[];
  isGulfMarket: boolean;
  region: string;
  city: string | null;
}

export interface GeneratedPromptSet {
  professionalPrompt: string;
  advancedPrompt: string;
  shortPrompt: string;
  recommendedTool: string;
  explanation: string;
  improvementSuggestions: string[];
}

export interface AIProviderAdapter {
  key: "rule-based" | "openai" | "anthropic";
  label: string;
  isAvailable(): boolean;
  analyze(input: PromptAnalysisInput): Promise<PromptAnalysisResult>;
  generate(
    input: PromptAnalysisInput,
    analysis: PromptAnalysisResult,
  ): Promise<GeneratedPromptSet>;
}
