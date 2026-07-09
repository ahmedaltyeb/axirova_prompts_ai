import type { Metadata } from "next";
import { LoginForm } from "@/components/auth/login-form";

export const metadata: Metadata = { title: "Sign In — Axirova" };

export default function LoginPage() {
  return <LoginForm />;
}
