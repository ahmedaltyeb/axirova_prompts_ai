import type { Metadata } from "next";
import { Geist, Geist_Mono, Cairo } from "next/font/google";
import "./globals.css";
import { directionForLocale } from "@/lib/i18n/config";
import { getDictionary, getLocale } from "@/lib/i18n/get-dictionary";
import { LocaleProvider } from "@/lib/i18n/locale-provider";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cairo = Cairo({
  variable: "--font-sans-ar",
  subsets: ["arabic", "latin"],
});

export const metadata: Metadata = {
  title: "Axirova Prompt Architect AI",
  description:
    "Arabic-first AI prompt engineering platform — turn simple ideas into professional AI prompts for the Gulf market and beyond.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const dictionary = await getDictionary(locale);
  const dir = directionForLocale(locale);

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${geistSans.variable} ${geistMono.variable} ${cairo.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <LocaleProvider locale={locale} dictionary={dictionary}>
          {children}
          <Toaster position={dir === "rtl" ? "top-left" : "top-right"} />
        </LocaleProvider>
      </body>
    </html>
  );
}
