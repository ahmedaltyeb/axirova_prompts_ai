import type { AIProviderAdapter, PromptAnalysisInput } from "../types";
import { analyze } from "../engine/analyze";
import { generatePromptSet } from "../engine/generate";
import { generatedPromptSetSchema } from "../engine/schema";
import { buildLLMInstructions, buildImageLLMInstructions } from "../engine/llm-instructions";

const GEMINI_URL = (model: string) =>
  `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;

export const geminiProvider: AIProviderAdapter = {
  key: "gemini",
  label: "Google Gemini",
  isAvailable: () => Boolean(process.env.GEMINI_API_KEY),
  async analyze(input: PromptAnalysisInput) {
    // Analysis stays deterministic and local so every provider shares the same
    // Arabic/Gulf-market detection; only prompt generation is delegated to the LLM.
    return analyze(input);
  },
  async generate(input, analysisResult) {
    if (!process.env.GEMINI_API_KEY) {
      return generatePromptSet(input, analysisResult);
    }

    const { system, user } = input.image
      ? buildImageLLMInstructions(input, analysisResult)
      : buildLLMInstructions(input, analysisResult);
    const model = process.env.GEMINI_MODEL || "gemini-flash-latest";

    const userParts = input.image
      ? [{ text: user }, { inlineData: { mimeType: input.image.mimeType, data: input.image.base64 } }]
      : [{ text: user }];

    try {
      const response = await fetch(`${GEMINI_URL(model)}?key=${process.env.GEMINI_API_KEY}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: system }] },
          contents: [{ role: "user", parts: userParts }],
          generationConfig: { responseMimeType: "application/json" },
        }),
      });

      if (!response.ok) throw new Error(`Gemini request failed: ${response.status}`);

      const data = await response.json();
      const content = data.candidates?.[0]?.content?.parts?.[0]?.text;
      const parsed = generatedPromptSetSchema.parse(JSON.parse(content));
      return parsed;
    } catch (error) {
      console.error("[geminiProvider] falling back to rule-based generation:", error);
      return generatePromptSet(input, analysisResult);
    }
  },
};
