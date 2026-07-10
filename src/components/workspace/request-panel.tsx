"use client";

import { useRef, useState } from "react";
import { ImagePlus, Loader2, Sparkles, X } from "lucide-react";
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
import { cn } from "@/lib/utils";
import { categoryLabel } from "@/lib/prompts/category-label";
import type { Dictionary } from "@/lib/i18n/dictionaries/en";
import type { PromptCategory } from "@prisma/client";
import type { ImageMode } from "@/lib/ai/types";

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
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageMode, setImageMode] = useState<ImageMode>("describe");
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) {
      setImagePreview(null);
      return;
    }
    setImagePreview(URL.createObjectURL(file));
  }

  function removeImage() {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  const hasImage = Boolean(imagePreview);

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
              required={!hasImage}
              minLength={hasImage ? undefined : 3}
              rows={hasImage ? 3 : 6}
              defaultValue={defaultInput}
              placeholder={
                hasImage
                  ? dictionary.workspace.requestPanel.imageCaptionPlaceholder
                  : dictionary.workspace.requestPanel.placeholder
              }
            />
          </div>

          <div className="space-y-2">
            <input
              ref={fileInputRef}
              type="file"
              name="image"
              accept="image/*"
              className="sr-only"
              onChange={handleFileChange}
            />

            {imagePreview ? (
              <div className="space-y-3">
                <div className="relative w-fit">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={imagePreview}
                    alt=""
                    className="h-32 w-32 rounded-lg border border-border object-cover"
                  />
                  <Button
                    type="button"
                    variant="secondary"
                    size="icon-sm"
                    className="absolute -end-2 -top-2 rounded-full"
                    onClick={removeImage}
                  >
                    <X className="size-3.5" />
                  </Button>
                </div>

                <div className="space-y-1.5">
                  <Label>{dictionary.workspace.requestPanel.imageModeLabel}</Label>
                  <div className="flex gap-2">
                    {(["describe", "similar"] as const).map((mode) => (
                      <button
                        key={mode}
                        type="button"
                        onClick={() => setImageMode(mode)}
                        className={cn(
                          "flex-1 rounded-lg border px-3 py-2 text-sm font-medium transition-colors",
                          imageMode === mode
                            ? "border-primary bg-accent text-accent-foreground"
                            : "border-border text-muted-foreground hover:bg-muted",
                        )}
                      >
                        {mode === "describe"
                          ? dictionary.workspace.requestPanel.imageModeDescribe
                          : dictionary.workspace.requestPanel.imageModeSimilar}
                      </button>
                    ))}
                  </div>
                  <input type="hidden" name="imageMode" value={imageMode} />
                </div>
              </div>
            ) : (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
              >
                <ImagePlus className="size-4" />
                {dictionary.workspace.requestPanel.attachImage}
              </Button>
            )}
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
