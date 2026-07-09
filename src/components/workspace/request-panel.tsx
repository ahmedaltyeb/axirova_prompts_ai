"use client";

import { useState } from "react";
import { Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categoryLabel } from "@/lib/prompts/category-label";
import type { Dictionary } from "@/lib/i18n/dictionaries/en";
import type { PromptCategory } from "@prisma/client";

export function RequestPanel({
  dictionary,
  categories,
  formAction,
  isPending,
  defaultInput = "",
  defaultCategory = "auto",
  error,
}: {
  dictionary: Dictionary;
  categories: PromptCategory[];
  formAction: (formData: FormData) => void;
  isPending: boolean;
  defaultInput?: string;
  defaultCategory?: string;
  error?: string;
}) {
  const [category, setCategory] = useState(defaultCategory);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{dictionary.workspace.requestPanel.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
          <div className="space-y-2">
            <Textarea
              name="rawInput"
              required
              minLength={3}
              rows={6}
              defaultValue={defaultInput}
              placeholder={dictionary.workspace.requestPanel.placeholder}
            />
          </div>

          <div className="space-y-2">
            <Label>{dictionary.workspace.requestPanel.category}</Label>
            <Select
              name="categoryHint"
              value={category}
              onValueChange={(value) => setCategory(value ?? "auto")}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder={dictionary.workspace.requestPanel.categoryPlaceholder} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="auto">{dictionary.workspace.requestPanel.categoryPlaceholder}</SelectItem>
                {categories.map((c) => (
                  <SelectItem key={c.id} value={c.key}>
                    {categoryLabel(dictionary, c.key)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Sparkles className="size-4" />
            )}
            {isPending ? dictionary.workspace.requestPanel.generating : dictionary.workspace.requestPanel.generate}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
