import type { CategoryKey, GeneratedPromptSet, PromptAnalysisInput, PromptAnalysisResult } from "../types";
import { recommendTool } from "./recommend-tool";

const CATEGORY_LABELS: Record<CategoryKey, { ar: string; en: string }> = {
  MARKETING: { ar: "التسويق", en: "Marketing" },
  BUSINESS: { ar: "الأعمال", en: "Business" },
  CODING: { ar: "البرمجة", en: "Coding" },
  DESIGN: { ar: "التصميم", en: "Design" },
  IMAGE_GENERATION: { ar: "توليد الصور", en: "Image Generation" },
  VIDEO_GENERATION: { ar: "توليد الفيديو", en: "Video Generation" },
  WRITING: { ar: "الكتابة", en: "Writing" },
  RESEARCH: { ar: "البحث", en: "Research" },
  AUTOMATION: { ar: "الأتمتة", en: "Automation" },
};

const ROLE_BY_CATEGORY: Record<CategoryKey, { ar: string; en: string }> = {
  MARKETING: { ar: "استراتيجي تسويق رقمي خبير في أسواق الخليج", en: "an expert digital marketing strategist specialized in Gulf markets" },
  BUSINESS: { ar: "مستشار أعمال واستراتيجية بخبرة إقليمية", en: "a business and strategy consultant with regional expertise" },
  CODING: { ar: "مهندس برمجيات كبير", en: "a senior software engineer" },
  DESIGN: { ar: "مصمم هوية بصرية وتجربة مستخدم محترف", en: "a professional brand and UX designer" },
  IMAGE_GENERATION: { ar: "فنان بصري متخصص في التوجيه الفني لأدوات توليد الصور", en: "a visual artist specialized in art-directing AI image tools" },
  VIDEO_GENERATION: { ar: "مخرج ومنتج فيديو متخصص في المحتوى القصير", en: "a video director and producer specialized in short-form content" },
  WRITING: { ar: "كاتب محتوى محترف", en: "a professional content writer" },
  RESEARCH: { ar: "باحث ومحلل بيانات دقيق", en: "a meticulous researcher and data analyst" },
  AUTOMATION: { ar: "مهندس أتمتة عمليات الأعمال", en: "a business process automation engineer" },
};

function culturalNote(analysis: PromptAnalysisResult): string {
  if (!analysis.isGulfMarket) return "";
  const place = analysis.city ?? analysis.region;
  return analysis.language === "ar"
    ? `\n- راعِ سياق السوق الخليجي في ${place}: نبرة راقية وموثوقة، احترام العادات المحلية، التركيز على الجودة والخصوصية، وتفضيل التواصل عبر واتساب بزنس والقنوات المرئية عالية الجودة.`
    : `\n- Tailor this to the Gulf market context in ${place}: a premium, trustworthy tone, respect for local customs, an emphasis on quality and privacy, and a preference for WhatsApp Business and high-quality visual channels.`;
}

function buildProfessionalPrompt(input: PromptAnalysisInput, analysis: PromptAnalysisResult): string {
  const role = ROLE_BY_CATEGORY[analysis.detectedCategory][analysis.language];
  const category = CATEGORY_LABELS[analysis.detectedCategory][analysis.language];

  if (analysis.language === "ar") {
    return [
      `أنت ${role}.`,
      ``,
      `المهمة: ${analysis.goal}.`,
      `التصنيف: ${category}.`,
      `الجمهور المستهدف: ${analysis.audience}.`,
      `المنصة / القناة الرئيسية: ${analysis.platform}.`,
      `المخرجات المطلوبة: ${analysis.requiredOutput}.`,
      ``,
      `الطلب الأصلي من المستخدم: "${input.rawInput}"`,
      ``,
      `التعليمات:`,
      `- قدّم محتوى عملي وقابلاً للتنفيذ مباشرة، بأسلوب احترافي وواضح.`,
      `- نظّم الإجابة في أقسام مرقّمة أو عناوين فرعية.`,
      `- اربط كل توصية بسبب منطقي مختصر.${culturalNote(analysis)}`,
      `- إن كانت هناك معلومات ناقصة، اذكر افتراضًا معقولًا صراحةً بدلاً من ترك الفجوة.`,
    ].join("\n");
  }

  return [
    `You are ${role}.`,
    ``,
    `Task: ${analysis.goal}.`,
    `Category: ${category}.`,
    `Target audience: ${analysis.audience}.`,
    `Primary platform/channel: ${analysis.platform}.`,
    `Required output: ${analysis.requiredOutput}.`,
    ``,
    `Original user request: "${input.rawInput}"`,
    ``,
    `Instructions:`,
    `- Provide practical, directly actionable content in a clear, professional tone.`,
    `- Organize the answer into numbered sections or subheadings.`,
    `- Justify each recommendation with a brief rationale.${culturalNote(analysis)}`,
    `- If information is missing, state a reasonable assumption explicitly instead of leaving a gap.`,
  ].join("\n");
}

function buildAdvancedPrompt(input: PromptAnalysisInput, analysis: PromptAnalysisResult, professionalPrompt: string): string {
  if (analysis.language === "ar") {
    return [
      professionalPrompt,
      ``,
      `متطلبات إضافية للنسخة المتقدمة:`,
      `- فكّر خطوة بخطوة قبل الإجابة: حلل الهدف، ثم الجمهور، ثم القيود، ثم ابنِ الحل.`,
      `- قدّم خيارين أو ثلاثة بدائل استراتيجية مع مقارنة سريعة بين إيجابياتها وسلبياتها.`,
      `- أضف قسمًا لمؤشرات الأداء (KPIs) المقترحة لقياس النجاح.`,
      `- أضف قسمًا للمخاطر المحتملة وكيفية التعامل معها.`,
      `- اختم بقائمة تحقق (Checklist) من 3-5 نقاط للتنفيذ الفوري.`,
      `- قبل تسليم الإجابة النهائية، راجعها للتأكد من توافقها مع الجمهور والمنصة المذكورين أعلاه.`,
    ].join("\n");
  }

  return [
    professionalPrompt,
    ``,
    `Additional requirements for the advanced version:`,
    `- Think step by step before answering: analyze the goal, then the audience, then constraints, then build the solution.`,
    `- Provide 2-3 alternative strategic options with a quick comparison of trade-offs.`,
    `- Add a section with suggested KPIs to measure success.`,
    `- Add a section covering likely risks and how to mitigate them.`,
    `- Close with a 3-5 item checklist for immediate execution.`,
    `- Before finalizing, review the answer against the stated audience and platform above.`,
  ].join("\n");
}

function buildShortPrompt(analysis: PromptAnalysisResult): string {
  if (analysis.language === "ar") {
    return `${analysis.goal}، موجّه إلى ${analysis.audience} عبر ${analysis.platform}. المخرج المطلوب: ${analysis.requiredOutput}.`;
  }
  return `${analysis.goal}, targeting ${analysis.audience} via ${analysis.platform}. Required output: ${analysis.requiredOutput}.`;
}

function buildExplanation(analysis: PromptAnalysisResult): string {
  const place = analysis.city ?? analysis.region;
  if (analysis.language === "ar") {
    return `تم بناء هذا الأمر حول ${analysis.industry} لأن الطلب يشير إليه مباشرة، مع استهداف ${analysis.audience}${
      analysis.isGulfMarket ? ` وتكييفه لسوق ${place} (نبرة راقية وموثوقة تناسب توقعات العملاء هناك)` : ""
    }. تمت صياغة التعليمات لتُنتج مخرجات قابلة للاستخدام فورًا بدلاً من إجابة عامة.`;
  }
  return `This prompt was built around ${analysis.industry} because the request points directly to it, targeting ${analysis.audience}${
    analysis.isGulfMarket ? ` and adapted for the ${place} market (a premium, trustworthy tone that matches local customer expectations)` : ""
  }. The instructions are phrased to produce immediately usable output rather than a generic answer.`;
}

function buildImprovementSuggestions(analysis: PromptAnalysisResult): string[] {
  const base =
    analysis.language === "ar"
      ? [`أضف التفاصيل التالية لتحسين دقة النتائج: ${analysis.missingInfo.join("، ")}.`]
      : [`Add the following details to improve result accuracy: ${analysis.missingInfo.join(", ")}.`];

  const tips =
    analysis.language === "ar"
      ? [
          "اذكر أمثلة لمنافسين أو مراجع تحبّ أسلوبها.",
          "حدد طول المخرج المطلوب (قصير / متوسط / مفصّل).",
        ]
      : [
          "Mention competitor examples or references whose style you like.",
          "Specify the desired output length (short / medium / detailed).",
        ];

  return [...base, ...tips];
}

export function generatePromptSet(
  input: PromptAnalysisInput,
  analysis: PromptAnalysisResult,
): GeneratedPromptSet {
  const professionalPrompt = buildProfessionalPrompt(input, analysis);
  const advancedPrompt = buildAdvancedPrompt(input, analysis, professionalPrompt);
  const shortPrompt = buildShortPrompt(analysis);
  const { tool, reason } = recommendTool(analysis.detectedCategory, analysis.language);

  return {
    professionalPrompt,
    advancedPrompt,
    shortPrompt,
    recommendedTool: `${tool} — ${reason}`,
    explanation: buildExplanation(analysis),
    improvementSuggestions: buildImprovementSuggestions(analysis),
  };
}
