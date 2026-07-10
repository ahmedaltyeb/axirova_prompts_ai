import type { AIProviderAdapter, PromptAnalysisInput } from "../types";
import { analyze } from "../engine/analyze";
import { generatePromptSet } from "../engine/generate";
import { generatedPromptSetSchema } from "../engine/schema";
import { buildLLMInstructions, buildImageLLMInstructions } from "../engine/llm-instructions";

const ANTHROPIC_URL = "https://api.anthropic.com/v1/messages";

function extractJson(text: string): unknown {
  const match = text.match(/\{[\s\S]*\}/);
  return JSON.parse(match ? match[0] : text);
}

export const anthropicProvider: AIProviderAdapter = {
  key: "anthropic",
  label: "Anthropic Claude",
  isAvailable: () => Boolean(process.env.ANTHROPIC_API_KEY),
  async analyze(input: PromptAnalysisInput) {
    return analyze(input);
  },
  async generate(input, analysisResult) {
    if (!process.env.ANTHROPIC_API_KEY) {
      return generatePromptSet(input, analysisResult);
    }

    const { system, user } = input.image
      ? buildImageLLMInstructions(input, analysisResult)
      : buildLLMInstructions(input, analysisResult);

    const userContent = input.image
      ? [
          {
            type: "image",
            source: { type: "base64", media_type: input.image.mimeType, data: input.image.base64 },
          },
          { type: "text", text: user },
        ]
      : user;

    try {
      const response = await fetch(ANTHROPIC_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.ANTHROPIC_API_KEY,
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify({
          model: process.env.ANTHROPIC_MODEL || "claude-sonnet-5",
          max_tokens: 2048,
          system,
          messages: [{ role: "user", content: userContent }],
        }),
      });

      if (!response.ok) throw new Error(`Anthropic request failed: ${response.status}`);

      const data = await response.json();
      const content = data.content?.[0]?.text ?? "";
      const parsed = generatedPromptSetSchema.parse(extractJson(content));
      return parsed;
    } catch (error) {
      console.error("[anthropicProvider] falling back to rule-based generation:", error);
      return generatePromptSet(input, analysisResult);
    }
  },
};
