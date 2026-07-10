import type { CategoryKey, PromptAnalysisInput, PromptAnalysisResult, SupportedLanguage } from "../types";
import {
  AR_UNICODE_RANGE,
  AUDIENCE_KEYWORDS,
  CATEGORY_KEYWORDS,
  GULF_LOCATIONS,
  INDUSTRY_KEYWORDS,
  PLATFORM_KEYWORDS,
} from "./lexicon";

function detectLanguage(text: string): SupportedLanguage {
  return AR_UNICODE_RANGE.test(text) ? "ar" : "en";
}

function countMatches(text: string, keywords: string[]): number {
  const lower = text.toLowerCase();
  return keywords.reduce((count, keyword) => (lower.includes(keyword.toLowerCase()) ? count + 1 : count), 0);
}

function detectCategory(text: string, hint?: CategoryKey, fallback: CategoryKey = "BUSINESS"): CategoryKey {
  if (hint) return hint;

  let best: { key: CategoryKey; score: number } = { key: fallback, score: 0 };
  for (const [key, sets] of Object.entries(CATEGORY_KEYWORDS) as [CategoryKey, { ar: string[]; en: string[] }][]) {
    const score = countMatches(text, [...sets.ar, ...sets.en]);
    if (score > best.score) best = { key, score };
  }
  return best.score > 0 ? best.key : fallback;
}

function detectIndustry(
  text: string,
  language: SupportedLanguage,
): { label: string; impliedAudience: string | null } | null {
  for (const entry of INDUSTRY_KEYWORDS) {
    if (countMatches(text, [...entry.ar, ...entry.en]) > 0) {
      const impliedAudience = language === "ar" ? entry.impliedAudienceAr : entry.impliedAudienceEn;
      return {
        label: language === "ar" ? entry.labelAr : entry.labelEn,
        impliedAudience: impliedAudience ?? null,
      };
    }
  }
  return null;
}

function detectAudience(text: string, language: SupportedLanguage): string | null {
  for (const entry of AUDIENCE_KEYWORDS) {
    if (countMatches(text, [...entry.ar, ...entry.en]) > 0) {
      return language === "ar" ? entry.labelAr : entry.labelEn;
    }
  }
  return null;
}

function detectPlatform(text: string, language: SupportedLanguage): string | null {
  for (const entry of PLATFORM_KEYWORDS) {
    if (countMatches(text, [...entry.ar, ...entry.en]) > 0) {
      return language === "ar" ? entry.labelAr : entry.labelEn;
    }
  }
  return null;
}

function detectGulfMarket(
  text: string,
  language: SupportedLanguage,
): { isGulfMarket: boolean; region: string; city: string | null } {
  for (const entry of GULF_LOCATIONS) {
    if (countMatches(text, [...entry.ar, ...entry.en]) > 0) {
      const region = language === "ar" ? entry.regionAr : entry.region;
      const city = language === "ar" ? entry.cityAr : entry.city;
      return { isGulfMarket: true, region, city: city || null };
    }
  }
  return { isGulfMarket: false, region: language === "ar" ? "عالمي" : "Global", city: null };
}

const REQUIRED_OUTPUT: Record<CategoryKey, { ar: string; en: string }> = {
  MARKETING: { ar: "خطة تسويقية متكاملة مع أفكار محتوى وقنوات توزيع", en: "A complete marketing plan with content ideas and distribution channels" },
  BUSINESS: { ar: "وثيقة استراتيجية أو خطة عمل منظمة", en: "A structured strategy document or business plan" },
  CODING: { ar: "كود عملي جاهز للتنفيذ مع شرح مختصر", en: "Working code with a brief explanation" },
  DESIGN: { ar: "موجز تصميم واضح مع اتجاه بصري", en: "A clear design brief with visual direction" },
  IMAGE_GENERATION: { ar: "وصف بصري تفصيلي لتوليد صورة", en: "A detailed visual description for image generation" },
  VIDEO_GENERATION: { ar: "سيناريو أو وصف مشاهد لتوليد فيديو", en: "A scene-by-scene script for video generation" },
  WRITING: { ar: "نص مكتوب جاهز للنشر", en: "Publish-ready written content" },
  RESEARCH: { ar: "تقرير بحثي منظم بنتائج ومصادر", en: "A structured research report with findings and sources" },
  AUTOMATION: { ar: "مخطط سير عمل آلي قابل للتنفيذ", en: "An actionable automated workflow blueprint" },
};

const GOAL_VERB: Record<CategoryKey, { ar: string; en: string }> = {
  MARKETING: { ar: "وضع خطة تسويقية لـ", en: "build a marketing plan for" },
  BUSINESS: { ar: "بناء استراتيجية عمل لـ", en: "build a business strategy for" },
  CODING: { ar: "تطوير حل برمجي لـ", en: "develop a coding solution for" },
  DESIGN: { ar: "تصميم هوية أو واجهة لـ", en: "design an identity or interface for" },
  IMAGE_GENERATION: { ar: "توليد صورة تمثل", en: "generate an image representing" },
  VIDEO_GENERATION: { ar: "توليد فيديو يعرض", en: "generate a video showcasing" },
  WRITING: { ar: "كتابة محتوى حول", en: "write content about" },
  RESEARCH: { ar: "إجراء بحث حول", en: "conduct research on" },
  AUTOMATION: { ar: "أتمتة عملية لـ", en: "automate a process for" },
};

export function analyze(input: PromptAnalysisInput): PromptAnalysisResult {
  const language = input.language ?? detectLanguage(input.rawInput);
  const fallbackCategory: CategoryKey = input.image ? "IMAGE_GENERATION" : "BUSINESS";
  const detectedCategory = detectCategory(input.rawInput, input.categoryHint, fallbackCategory);

  const industryMatch = detectIndustry(input.rawInput, language);
  const audience = detectAudience(input.rawInput, language) ?? industryMatch?.impliedAudience ?? null;
  const platform = detectPlatform(input.rawInput, language);
  const { isGulfMarket, region, city } = detectGulfMarket(input.rawInput, language);

  const missingInfo: string[] = [];
  const missing = {
    ar: {
      audience: "الجمهور المستهدف بدقة (الفئة العمرية، الشريحة الاجتماعية)",
      platform: "المنصة أو القناة الرئيسية المطلوب التركيز عليها",
      budget: "الميزانية التقريبية المتاحة",
      tone: "نبرة العلامة التجارية المفضلة (رسمية، ودّية، فاخرة...)",
      timeline: "الجدول الزمني أو الموعد النهائي المطلوب",
    },
    en: {
      audience: "The precise target audience (age group, social segment)",
      platform: "The primary platform or channel to focus on",
      budget: "An approximate available budget",
      tone: "Preferred brand tone (formal, friendly, premium...)",
      timeline: "The desired timeline or deadline",
    },
  }[language];

  if (!audience) missingInfo.push(missing.audience);
  if (!platform) missingInfo.push(missing.platform);
  missingInfo.push(missing.budget);
  missingInfo.push(missing.tone);
  if (missingInfo.length < 4) missingInfo.push(missing.timeline);

  const industryLabel = industryMatch?.label ?? (language === "ar" ? "قطاع عام" : "general industry");
  const audienceLabel =
    audience ??
    (language === "ar" ? "جمهور عام يحتاج تحديدًا أدق" : "a general audience that needs sharper definition");
  const platformLabel = platform ?? (language === "ar" ? "متعدد القنوات" : "Multi-channel");

  const goalVerb = GOAL_VERB[detectedCategory][language];
  const goal =
    language === "ar"
      ? `${goalVerb} ${industryLabel}${isGulfMarket ? ` في ${city ?? region}` : ""}`
      : `${goalVerb} ${industryLabel}${isGulfMarket ? ` in ${city ?? region}` : ""}`;

  return {
    language,
    detectedCategory,
    goal,
    industry: industryLabel,
    audience: audienceLabel,
    platform: platformLabel,
    requiredOutput: REQUIRED_OUTPUT[detectedCategory][language],
    missingInfo: missingInfo.slice(0, 4),
    isGulfMarket,
    region,
    city,
  };
}
