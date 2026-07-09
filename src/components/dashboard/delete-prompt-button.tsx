"use client";

import { useTransition } from "react";
import { Loader2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { deletePromptAction } from "@/lib/prompts/actions";

export function DeletePromptButton({ promptId, confirmLabel }: { promptId: string; confirmLabel: string }) {
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    if (!window.confirm(confirmLabel)) return;
    startTransition(() => deletePromptAction(promptId));
  }

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon-sm"
      onClick={handleDelete}
      disabled={isPending}
      className="text-muted-foreground hover:text-destructive"
    >
      {isPending ? <Loader2 className="size-4 animate-spin" /> : <Trash2 className="size-4" />}
    </Button>
  );
}
