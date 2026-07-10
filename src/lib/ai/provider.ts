import type { AIProviderAdapter } from "./types";
import { ruleBasedProvider } from "./providers/rule-based";
import { openaiProvider } from "./providers/openai";
import { anthropicProvider } from "./providers/anthropic";
import { geminiProvider } from "./providers/gemini";

const PROVIDERS: Record<string, AIProviderAdapter> = {
  "rule-based": ruleBasedProvider,
  openai: openaiProvider,
  anthropic: anthropicProvider,
  gemini: geminiProvider,
};

/** Picks the preferred provider if configured/available, otherwise falls back to the rule-based engine. */
export function getAIProvider(preferredKey?: string | null): AIProviderAdapter {
  const key = preferredKey || process.env.DEFAULT_AI_PROVIDER || "rule-based";
  const provider = PROVIDERS[key];
  if (provider && provider.isAvailable()) return provider;
  return ruleBasedProvider;
}

export function listProviders() {
  return Object.values(PROVIDERS).map((provider) => ({
    key: provider.key,
    label: provider.label,
    isAvailable: provider.isAvailable(),
  }));
}
