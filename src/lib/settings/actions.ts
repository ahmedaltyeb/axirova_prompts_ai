"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { prisma } from "@/lib/db/prisma";
import { requireUser } from "@/lib/auth/get-current-user";
import { localeCookieName, type Locale } from "@/lib/i18n/config";

export type ProfileActionState = { error?: string; success?: boolean } | undefined;

const profileSchema = z.object({
  fullName: z.string().trim().min(1).max(100),
});

export async function updateProfileAction(
  _prevState: ProfileActionState,
  formData: FormData,
): Promise<ProfileActionState> {
  const user = await requireUser();
  const parsed = profileSchema.safeParse({ fullName: formData.get("fullName") });
  if (!parsed.success) return { error: "Please enter a valid name." };

  await prisma.user.update({
    where: { id: user.id },
    data: { fullName: parsed.data.fullName },
  });

  revalidatePath("/settings");
  return { success: true };
}

export async function updateLanguagePreferenceAction(language: Locale) {
  const user = await requireUser();

  await prisma.userSettings.upsert({
    where: { userId: user.id },
    update: { language: language === "ar" ? "AR" : "EN" },
    create: { userId: user.id, language: language === "ar" ? "AR" : "EN" },
  });

  const cookieStore = await cookies();
  cookieStore.set(localeCookieName, language, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });

  revalidatePath("/", "layout");
}

export async function updatePreferredProviderAction(providerKey: string) {
  const user = await requireUser();
  const provider = await prisma.aIProvider.findUnique({ where: { key: providerKey } });
  if (!provider) return;

  await prisma.userSettings.upsert({
    where: { userId: user.id },
    update: { preferredProviderId: provider.id },
    create: { userId: user.id, preferredProviderId: provider.id },
  });

  revalidatePath("/settings");
}
