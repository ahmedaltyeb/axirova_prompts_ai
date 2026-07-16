import type { PromptAnalysisInput, PromptAnalysisResult } from "../types";

/**
 * Shared system + user instructions given to external LLM providers (OpenAI/Anthropic).
 * The deterministic rule-based `analyze()` output is passed in as context so every
 * provider works from the same Arabic/Gulf-market-aware analysis.
 */
export function buildLLMInstructions(input: PromptAnalysisInput, analysis: PromptAnalysisResult) {
  const system =
    "You are the prompt-generation engine behind Axirova Prompt Architect AI, an Arabic-first prompt " +
    "engineering SaaS for Gulf-region creators, marketers, and business owners. Given a user's raw request " +
    "and a structured analysis of it, produce three prompt variants (Professional, Advanced, Short), a " +
    "recommended AI tool, a short explanation, and improvement suggestions. Respond ONLY with a single JSON " +
    "object matching this exact shape, no markdown fences, no commentary: " +
    '{"professionalPrompt": string, "advancedPrompt": string, "shortPrompt": string, "recommendedTool": string, ' +
    '"explanation": string, "improvementSuggestions": string[]}. ' +
    `Write every field in ${analysis.language === "ar" ? "Arabic" : "English"}. ` +
    "If the request targets a Gulf market, adapt tone and recommendations for that cultural and business context " +
    "instead of translating literally.";

  const user = JSON.stringify({
    rawInput: input.rawInput,
    language: analysis.language,
    category: analysis.detectedCategory,
    goal: analysis.goal,
    industry: analysis.industry,
    audience: analysis.audience,
    platform: analysis.platform,
    requiredOutput: analysis.requiredOutput,
    missingInfo: analysis.missingInfo,
    isGulfMarket: analysis.isGulfMarket,
    region: analysis.region,
    city: analysis.city,
  });

  return { system, user };
}

/**
 * Same JSON-contract system prompt as buildLLMInstructions, but for image-attached
 * requests. The image itself is sent separately as a provider-native vision content
 * part; this only builds the surrounding text instructions.
 *
 * The image is untyped reference context — a UI mockup, a logo, a code screenshot, an
 * error screenshot, packaging, a diagram, a mood board, anything. We never assume what
 * it's for. The user's own written request is the only signal for how to use it.
 */
export function buildImageLLMInstructions(input: PromptAnalysisInput, analysis: PromptAnalysisResult) {
  const language = analysis.language === "ar" ? "Arabic" : "English";

  const system =
    "You are the prompt-generation engine behind Axirova Prompt Architect AI, an Arabic-first prompt " +
    "engineering SaaS for Gulf-region creators, marketers, developers, and business owners. This is a prompt " +
    "ARCHITECT, not an image generator: your job is to write prompts, not to draw or describe art for its own sake. " +
    "The user attached an image as reference context — it could be a UI/website design, a logo, branding, " +
    "architecture, a code or error screenshot, product packaging, a character design, a diagram, a flowchart, " +
    "or anything else. Do NOT assume its purpose. Read the user's own written request (if any) to figure out " +
    "why they attached it and what they actually want a prompt for, then use the image only as supporting " +
    "context for that goal. If the user gave no text at all, infer the most useful, literal purpose directly " +
    "from what the image shows (e.g. a bug screenshot implies a debugging/coding prompt, a UI mockup implies a " +
    "design/build prompt) rather than defaulting to \"generate a similar image\". " +
    "Produce three prompt variants (Professional, Advanced, Short), a recommended AI tool that fits the actual " +
    "inferred task (not necessarily an image tool), a short explanation, and improvement suggestions. Respond " +
    "ONLY with a single JSON object matching this exact shape, no markdown fences, no commentary: " +
    '{"professionalPrompt": string, "advancedPrompt": string, "shortPrompt": string, "recommendedTool": string, ' +
    '"explanation": string, "improvementSuggestions": string[]}. ' +
    `Write every field in ${language}.`;

  const user = JSON.stringify({
    userRequest: input.rawInput || null,
    language: analysis.language,
    category: analysis.detectedCategory,
  });

  return { system, user };
}
