import type { Metadata } from "next";
import { prisma } from "@/lib/db/prisma";
import { requireUser } from "@/lib/auth/get-current-user";
import { WorkspaceClient } from "@/components/workspace/workspace-client";

export const metadata: Metadata = { title: "Workspace — Axirova" };

export default async function WorkspacePage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  await requireUser();
  const { category } = await searchParams;
  const categories = await prisma.promptCategory.findMany({ orderBy: { key: "asc" } });

  return <WorkspaceClient categories={categories} defaultCategory={category ?? "auto"} />;
}
