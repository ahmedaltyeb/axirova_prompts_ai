import { getDictionary, getLocale } from "@/lib/i18n/get-dictionary";
import { Navbar } from "@/components/landing/navbar";
import { Hero } from "@/components/landing/hero";
import { HowItWorks } from "@/components/landing/how-it-works";
import { Features } from "@/components/landing/features";
import { AIToolsSupported } from "@/components/landing/ai-tools";
import { Pricing } from "@/components/landing/pricing";
import { CTA } from "@/components/landing/cta";
import { Footer } from "@/components/landing/footer";

export default async function LandingPage() {
  const locale = await getLocale();
  const dictionary = await getDictionary(locale);

  return (
    <>
      <Navbar dictionary={dictionary} />
      <main>
        <Hero dictionary={dictionary} locale={locale} />
        <HowItWorks dictionary={dictionary} />
        <Features dictionary={dictionary} />
        <AIToolsSupported dictionary={dictionary} />
        <Pricing dictionary={dictionary} />
        <CTA dictionary={dictionary} />
      </main>
      <Footer dictionary={dictionary} />
    </>
  );
}
