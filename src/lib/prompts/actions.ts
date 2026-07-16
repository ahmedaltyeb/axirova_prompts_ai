"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db/prisma";
import { requireUser } from "@/lib/auth/get-current-user";
import { getAIProvider } from "@/lib/ai/provider";
import { uploadPromptImage } from "@/lib/supabase/storage";
import type { CategoryKey, GeneratedPromptSet, PromptAnalysisResult } from "@/lib/ai/types";

const MAX_IMAGE_BYTES = 5 * 1024 * 1024;

const generateSchema = z.object({
  rawInput: z.string().trim().max(2000),
  categoryHint: z.string().optional(),
});

export type GeneratePromptState =
  | { status: "idle" }
  | { status: "error"; error: string }
  | {
      status: "success";
      promptId: string;
      title: string;
      analysis: PromptAnalysisResult;
      result: GeneratedPromptSet;
      imageUrl: string | null;
    };

export async function generatePromptAction(
  _prevState: GeneratePromptState,
  formData: FormData,
): Promise<GeneratePromptState> {
  const user = await requireUser();

  const parsed = generateSchema.safeParse({
    rawInput: formData.get("rawInput") ?? "",
    categoryHint: formData.get("categoryHint") || undefined,
  });
  if (!parsed.success) {
    return { status: "error", error: "Please describe your request or attach an image." };
  }

  const imageFile = formData.get("image");
  const hasImage = imageFile instanceof File && imageFile.size > 0;

  if (!hasImage && parsed.data.rawInput.length < 3) {
    return { status: "error", error: "Please describe your request (at least 3 characters)." };
  }

  const categoryHint =
    parsed.data.categoryHint && parsed.data.categoryHint !== "auto"
      ? (parsed.data.categoryHint as CategoryKey)
      : undefined;

  const provider = getAIProvider(user.settings?.preferredProvider?.key);

  if (hasImage && provider.key === "rule-based") {
    return {
      status: "error",
      error:
        "Image analysis requires an AI provider with vision support. Pick OpenAI, Claude, or Gemini in Settings → AI Model Selection.",
    };
  }

  let imageBase64: string | undefined;
  let imageMimeType: string | undefined;
  let uploadedImageUrl: string | null = null;

  if (hasImage) {
    const file = imageFile as File;
    if (!file.type.startsWith("image/")) {
      return { status: "error", error: "The attached file must be an image." };
    }
    if (file.size > MAX_IMAGE_BYTES) {
      return { status: "error", error: "Image is too large — please attach one under 5MB." };
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    imageBase64 = buffer.toString("base64");
    imageMimeType = file.type;
    uploadedImageUrl = await uploadPromptImage(user.id, buffer, file.type);
  }

  const input = {
    rawInput: parsed.data.rawInput,
    categoryHint,
    image:
      hasImage && imageBase64 && imageMimeType
        ? { base64: imageBase64, mimeType: imageMimeType }
        : undefined,
  };

  const analysis = await provider.analyze(input);
  const result = await provider.generate(input, analysis);

  const [category, aiProviderRow] = await Promise.all([
    prisma.promptCategory.findUnique({ where: { key: analysis.detectedCategory } }),
    prisma.aIProvider.findUnique({ where: { key: provider.key } }),
  ]);

  const title = analysis.goal.length > 80 ? `${analysis.goal.slice(0, 77)}...` : analysis.goal;

  const prompt = await prisma.prompt.create({
    data: {
      userId: user.id,
      categoryId: category?.id,
      title,
      rawInput: parsed.data.rawInput,
      language: analysis.language === "ar" ? "AR" : "EN",
      imageUrl: uploadedImageUrl,
      goal: analysis.goal,
      industry: analysis.industry,
      audience: analysis.audience,
      platform: analysis.platform,
      requiredOutput: analysis.requiredOutput,
      missingInfo: analysis.missingInfo,
      professionalPrompt: result.professionalPrompt,
      advancedPrompt: result.advancedPrompt,
      shortPrompt: result.shortPrompt,
      recommendedTool: result.recommendedTool,
      explanation: result.explanation,
      improvementSuggestions: result.improvementSuggestions,
      aiProviderId: aiProviderRow?.id,
      history: {
        create: { action: "CREATED", snapshot: JSON.parse(JSON.stringify({ analysis, result })) },
      },
    },
  });

  revalidatePath("/dashboard");
  revalidatePath("/history");
  revalidatePath("/categories");

  return {
    status: "success",
    promptId: prompt.id,
    title: prompt.title,
    analysis,
    result,
    imageUrl: uploadedImageUrl,
  };
}

export async function toggleSavePromptAction(promptId: string, isSaved: boolean) {
  const user = await requireUser();
  const { count } = await prisma.prompt.updateMany({
    where: { id: promptId, userId: user.id },
    data: { isSaved },
  });
  if (count === 0) return;

  await prisma.promptHistory.create({
    data: { promptId, action: isSaved ? "SAVED" : "EDITED" },
  });

  revalidatePath("/saved");
  revalidatePath("/history");
  revalidatePath("/dashboard");
  revalidatePath(`/workspace/${promptId}`);
}

export async function deletePromptAction(promptId: string) {
  const user = await requireUser();
  await prisma.prompt.deleteMany({ where: { id: promptId, userId: user.id } });

  revalidatePath("/history");
  revalidatePath("/saved");
  revalidatePath("/dashboard");
}
