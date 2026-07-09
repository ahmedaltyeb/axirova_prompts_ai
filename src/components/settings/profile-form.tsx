"use client";

import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { updateProfileAction } from "@/lib/settings/actions";
import { useDictionary } from "@/lib/i18n/locale-provider";

export function ProfileForm({ fullName, email }: { fullName: string | null; email: string }) {
  const dictionary = useDictionary();
  const [state, formAction, isPending] = useActionState(updateProfileAction, undefined);

  useEffect(() => {
    if (state?.success) toast.success(dictionary.common.saved);
  }, [state, dictionary.common.saved]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{dictionary.settings.profile.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">{dictionary.settings.profile.fullName}</Label>
            <Input id="fullName" name="fullName" defaultValue={fullName ?? ""} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">{dictionary.settings.profile.email}</Label>
            <Input id="email" value={email} disabled readOnly />
          </div>
          {state?.error && <p className="text-sm text-destructive">{state.error}</p>}
          <Button type="submit" disabled={isPending}>
            {isPending && <Loader2 className="size-4 animate-spin" />}
            {dictionary.settings.profile.save}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
