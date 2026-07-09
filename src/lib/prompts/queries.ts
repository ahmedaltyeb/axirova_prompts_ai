import "server-only";
import { prisma } from "@/lib/db/prisma";
import type { PromptCategoryKey } from "@prisma/client";

export async function getDashboardStats(userId: string) {
  const startOfWeek = new Date();
  startOfWeek.setDate(startOfWeek.getDate() - 7);

  const [total, saved, thisWeek] = await Promise.all([
    prisma.prompt.count({ where: { userId } }),
    prisma.prompt.count({ where: { userId, isSaved: true } }),
    prisma.prompt.count({ where: { userId, createdAt: { gte: startOfWeek } } }),
  ]);

  return { total, saved, thisWeek };
}

export async function getRecentPrompts(userId: string, limit = 5) {
  return prisma.prompt.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: limit,
    include: { category: true },
  });
}

export async function getCategoriesWithCounts(userId: string) {
  const categories = await prisma.promptCategory.findMany({
    orderBy: { key: "asc" },
  });

  const counts = await prisma.prompt.groupBy({
    by: ["categoryId"],
    where: { userId, categoryId: { not: null } },
    _count: { _all: true },
  });

  const countMap = new Map(counts.map((c) => [c.categoryId, c._count._all]));

  return categories.map((category) => ({
    ...category,
    promptCount: countMap.get(category.id) ?? 0,
  }));
}

export async function listPrompts(
  userId: string,
  options: { savedOnly?: boolean; categoryKey?: PromptCategoryKey; search?: string } = {},
) {
  return prisma.prompt.findMany({
    where: {
      userId,
      ...(options.savedOnly ? { isSaved: true } : {}),
      ...(options.categoryKey ? { category: { key: options.categoryKey } } : {}),
      ...(options.search
        ? {
            OR: [
              { title: { contains: options.search, mode: "insensitive" } },
              { rawInput: { contains: options.search, mode: "insensitive" } },
            ],
          }
        : {}),
    },
    orderBy: { createdAt: "desc" },
    include: { category: true },
  });
}

export async function getPromptById(userId: string, id: string) {
  return prisma.prompt.findFirst({
    where: { id, userId },
    include: { category: true },
  });
}
