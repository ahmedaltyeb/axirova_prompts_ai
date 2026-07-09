import { z } from "zod";

export const generatedPromptSetSchema = z.object({
  professionalPrompt: z.string().min(1),
  advancedPrompt: z.string().min(1),
  shortPrompt: z.string().min(1),
  recommendedTool: z.string().min(1),
  explanation: z.string().min(1),
  improvementSuggestions: z.array(z.string()).min(1),
});
