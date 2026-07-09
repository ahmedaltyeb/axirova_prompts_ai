import { notFound } from "next/navigation";
import { prisma } from "@/lib/db/prisma";
import { requireUser } from "@/lib/auth/get-current-user";
import { getPromptById } from "@/lib/prompts/queries";
import { promptToState } from "@/lib/prompts/mappers";
import { WorkspaceClient } from "@/components/workspace/workspace-client";

export default async function WorkspacePromptPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await requireUser();
  const [prompt, categories] = await Promise.all([
    getPromptById(user.id, id),
    prisma.promptCategory.findMany({ orderBy: { key: "asc" } }),
  ]);

  if (!prompt) notFound();

  return (
    <WorkspaceClient
      categories={categories}
      initialState={promptToState(prompt)}
      defaultInput={prompt.rawInput}
      defaultCategory={prompt.category?.key ?? "auto"}
      initialSaved={prompt.isSaved}
    />
  );
}
