"use client";

import { useActionState } from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { signInAction } from "@/lib/auth/actions";
import { useDictionary } from "@/lib/i18n/locale-provider";
import { GoogleButton } from "./google-button";

export function LoginForm() {
  const dictionary = useDictionary();
  const [state, formAction, isPending] = useActionState(signInAction, undefined);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{dictionary.auth.login.title}</CardTitle>
        <CardDescription>{dictionary.auth.login.subtitle}</CardDescription>
      </CardHeader>
      <CardContent>
        <GoogleButton />

        <div className="my-4 flex items-center gap-3">
          <div className="h-px flex-1 bg-border" />
          <span className="text-xs text-muted-foreground">{dictionary.auth.orContinueWithEmail}</span>
          <div className="h-px flex-1 bg-border" />
        </div>

        <form action={formAction} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">{dictionary.common.email}</Label>
            <Input id="email" name="email" type="email" autoComplete="email" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">{dictionary.common.password}</Label>
            <Input id="password" name="password" type="password" autoComplete="current-password" required />
          </div>
          {state?.error && <p className="text-sm text-destructive">{state.error}</p>}
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending && <Loader2 className="size-4 animate-spin" />}
            {dictionary.auth.login.submit}
          </Button>
        </form>
        <p className="mt-4 text-center text-sm text-muted-foreground">
          {dictionary.auth.login.noAccount}{" "}
          <Link href="/signup" className="font-medium text-primary hover:underline">
            {dictionary.auth.login.createOne}
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
