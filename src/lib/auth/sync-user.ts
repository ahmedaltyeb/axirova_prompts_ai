import type { User } from "@supabase/supabase-js";
import { prisma } from "@/lib/db/prisma";

export async function syncUser(user: User) {
  const fullName = (user.user_metadata?.full_name as string | undefined) ?? null;

  return prisma.user.upsert({
    where: { id: user.id },
    update: {
      email: user.email ?? "",
      ...(fullName ? { fullName } : {}),
    },
    create: {
      id: user.id,
      email: user.email ?? "",
      fullName,
      settings: { create: {} },
    },
  });
}
