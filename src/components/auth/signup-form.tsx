"use client";

import { useActionState } from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { signUpAction } from "@/lib/auth/actions";
import { useDictionary } from "@/lib/i18n/locale-provider";

export function SignupForm() {
  const dictionary = useDictionary();
  const [state, formAction, isPending] = useActionState(signUpAction, undefined);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{dictionary.auth.signup.title}</CardTitle>
        <CardDescription>{dictionary.auth.signup.subtitle}</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">{dictionary.common.fullName}</Label>
            <Input id="fullName" name="fullName" type="text" autoComplete="name" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">{dictionary.common.email}</Label>
            <Input id="email" name="email" type="email" autoComplete="email" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">{dictionary.common.password}</Label>
            <Input id="password" name="password" type="password" autoComplete="new-password" required minLength={6} />
          </div>
          {state?.error && <p className="text-sm text-destructive">{state.error}</p>}
          {state?.message && <p className="text-sm text-primary">{state.message}</p>}
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending && <Loader2 className="size-4 animate-spin" />}
            {dictionary.auth.signup.submit}
          </Button>
        </form>
        <p className="mt-4 text-center text-sm text-muted-foreground">
          {dictionary.auth.signup.hasAccount}{" "}
          <Link href="/login" className="font-medium text-primary hover:underline">
            {dictionary.auth.signup.signIn}
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
