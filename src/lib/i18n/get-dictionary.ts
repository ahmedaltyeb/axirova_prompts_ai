import "server-only";
import { cookies } from "next/headers";
import { defaultLocale, isLocale, localeCookieName, type Locale } from "./config";
import type { Dictionary } from "./dictionaries/en";

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  en: () => import("./dictionaries/en").then((mod) => mod.default as unknown as Dictionary),
  ar: () => import("./dictionaries/ar").then((mod) => mod.default),
};

export async function getLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  const value = cookieStore.get(localeCookieName)?.value;
  return isLocale(value) ? value : defaultLocale;
}

export async function getDictionary(locale?: Locale): Promise<Dictionary> {
  const resolvedLocale = locale ?? (await getLocale());
  return dictionaries[resolvedLocale]();
}
