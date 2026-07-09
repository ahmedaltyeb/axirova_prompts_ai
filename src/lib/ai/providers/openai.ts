import type { AIProviderAdapter, PromptAnalysisInput } from "../types";
import { analyze } from "../engine/analyze";
import { generatePromptSet } from "../engine/generate";
import { generatedPromptSetSchema } from "../engine/schema";
import { buildLLMInstructions } from "../engine/llm-instructions";

const OPENAI_URL = "https://api.openai.com/v1/chat/completions";

export const openaiProvider: AIProviderAdapter = {
  key: "openai",
  label: "OpenAI",
  isAvailable: () => Boolean(process.env.OPENAI_API_KEY),
  async analyze(input: PromptAnalysisInput) {
    // Analysis stays deterministic and local so every provider shares the same
    // Arabic/Gulf-market detection; only prompt generation is delegated to the LLM.
    return analyze(input);
  },
  async generate(input, analysisResult) {
    if (!process.env.OPENAI_API_KEY) {
      return generatePromptSet(input, analysisResult);
    }

    const { system, user } = buildLLMInstructions(input, analysisResult);

    try {
      const response = await fetch(OPENAI_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: process.env.OPENAI_MODEL || "gpt-4o-mini",
          response_format: { type: "json_object" },
          messages: [
            { role: "system", content: system },
            { role: "user", content: user },
          ],
        }),
      });

      if (!response.ok) throw new Error(`OpenAI request failed: ${response.status}`);

      const data = await response.json();
      const content = data.choices?.[0]?.message?.content;
      const parsed = generatedPromptSetSchema.parse(JSON.parse(content));
      return parsed;
    } catch (error) {
      console.error("[openaiProvider] falling back to rule-based generation:", error);
      return generatePromptSet(input, analysisResult);
    }
  },
};
