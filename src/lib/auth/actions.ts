"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { syncUser } from "./sync-user";

export type AuthActionState = { error?: string; message?: string } | undefined;

const loginSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(6),
});

const signupSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(6),
  fullName: z.string().trim().min(1),
});

export async function signInAction(
  _prevState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!parsed.success) return { error: "Please enter a valid email and password." };

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithPassword(parsed.data);
  if (error || !data.user) return { error: error?.message ?? "Sign in failed." };

  await syncUser(data.user);
  redirect("/dashboard");
}

export async function signUpAction(
  _prevState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const parsed = signupSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    fullName: formData.get("fullName"),
  });
  if (!parsed.success) return { error: "Please fill in all fields correctly (password min 6 characters)." };

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email: parsed.data.email,
    password: parsed.data.password,
    options: { data: { full_name: parsed.data.fullName } },
  });
  if (error) return { error: error.message };
  if (!data.user) return { error: "Sign up failed. Please try again." };

  await syncUser(data.user);

  if (!data.session) {
    return { message: "Account created. Check your email to confirm before signing in." };
  }

  redirect("/dashboard");
}

export async function signOutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}
