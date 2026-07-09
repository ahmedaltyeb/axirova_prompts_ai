import type { CategoryKey, SupportedLanguage } from "../types";

const TOOL_MAP: Record<CategoryKey, { tool: string; reasonAr: string; reasonEn: string }> = {
  MARKETING: {
    tool: "ChatGPT (GPT-4o) or Claude",
    reasonAr: "الأنسب لصياغة استراتيجيات ومحتوى تسويقي متماسك بأسلوب طبيعي وقابل للتخصيص.",
    reasonEn: "Best for cohesive marketing strategy and copy that's easy to iterate on.",
  },
  BUSINESS: {
    tool: "Claude (Opus)",
    reasonAr: "يتفوق في تحليل المستندات الطويلة وصياغة خطط العمل المنظمة بعمق منطقي.",
    reasonEn: "Excels at long-form, structured business documents with strong reasoning.",
  },
  CODING: {
    tool: "Claude or GitHub Copilot",
    reasonAr: "الأدق في كتابة وتفسير الكود والتعامل مع قواعد بيانات وواجهات برمجية معقدة.",
    reasonEn: "Strongest for accurate code generation, debugging, and complex codebases.",
  },
  DESIGN: {
    tool: "ChatGPT + Canva AI",
    reasonAr: "مناسب لصياغة موجز تصميم واضح يمكن تنفيذه مباشرة في أدوات التصميم.",
    reasonEn: "Great for producing a clear design brief you can hand directly to design tools.",
  },
  IMAGE_GENERATION: {
    tool: "Midjourney or DALL·E",
    reasonAr: "الأفضل لتوليد صور عالية الجودة بناءً على وصف تفصيلي للمشهد والأسلوب البصري.",
    reasonEn: "Best for high-quality image generation from a detailed visual description.",
  },
  VIDEO_GENERATION: {
    tool: "Runway or Sora",
    reasonAr: "الأنسب لتحويل الوصف النصي إلى مقاطع فيديو أو لقطات متحركة.",
    reasonEn: "Best suited for turning a text description into video or motion footage.",
  },
  WRITING: {
    tool: "ChatGPT or Claude",
    reasonAr: "يمنح أسلوب كتابة طبيعي ومتسق يمكن ضبط نبرته بسهولة.",
    reasonEn: "Delivers natural, consistent prose with easy tone control.",
  },
  RESEARCH: {
    tool: "Perplexity or Claude",
    reasonAr: "الأقوى في تجميع معلومات محدثة وموثقة بمصادر واضحة.",
    reasonEn: "Strongest for gathering current, well-sourced information.",
  },
  AUTOMATION: {
    tool: "ChatGPT (function calling) or Zapier AI",
    reasonAr: "الأنسب لتصميم سير عمل وتكاملات آلية بين الأدوات المختلفة.",
    reasonEn: "Best for designing automated workflows and tool integrations.",
  },
};

export function recommendTool(category: CategoryKey, language: SupportedLanguage) {
  const entry = TOOL_MAP[category];
  return {
    tool: entry.tool,
    reason: language === "ar" ? entry.reasonAr : entry.reasonEn,
  };
}
