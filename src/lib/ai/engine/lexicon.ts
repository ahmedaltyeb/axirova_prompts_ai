import type { CategoryKey } from "../types";

type KeywordSet = { ar: string[]; en: string[] };

/** Keywords used to detect which of the 9 categories a request belongs to. */
export const CATEGORY_KEYWORDS: Record<CategoryKey, KeywordSet> = {
  MARKETING: {
    ar: ["تسويق", "حملة", "إعلان", "إعلانات", "علامة تجارية", "براند", "سوشيال ميديا", "خطة تسويقية", "ترويج", "عروض"],
    en: ["marketing", "campaign", "advertis", "brand", "social media", "promotion", "marketing plan", "ads"],
  },
  BUSINESS: {
    ar: ["خطة عمل", "دراسة جدوى", "استراتيجية", "نموذج عمل", "أعمال", "شركة ناشئة", "استثمار", "ميزانية", "تحليل السوق"],
    en: ["business plan", "feasibility", "strategy", "business model", "startup", "investment", "budget", "market analysis"],
  },
  CODING: {
    ar: ["برمجة", "كود", "تطبيق", "موقع إلكتروني", "خوارزمية", "برنامج", "مطور", "دالة", "قاعدة بيانات", "API"],
    en: ["code", "coding", "app", "website", "algorithm", "developer", "function", "database", "api", "script", "bug"],
  },
  DESIGN: {
    ar: ["تصميم", "هوية بصرية", "شعار", "لوجو", "واجهة مستخدم", "UI", "UX", "بروشور", "قالب تصميم"],
    en: ["design", "logo", "visual identity", "ui", "ux", "brochure", "template", "mockup", "wireframe"],
  },
  IMAGE_GENERATION: {
    ar: ["توليد صورة", "صورة", "رسمة", "لوحة", "صور بالذكاء الاصطناعي", "فن رقمي", "خلفية"],
    en: ["generate an image", "image generation", "illustration", "artwork", "ai image", "picture", "render"],
  },
  VIDEO_GENERATION: {
    ar: ["فيديو", "مقطع فيديو", "إعلان مرئي", "ريلز", "توليد فيديو", "مونتاج"],
    en: ["video", "video generation", "reel", "clip", "animation", "footage"],
  },
  WRITING: {
    ar: ["مقال", "محتوى", "كتابة", "منشور", "تدوينة", "قصة", "نص", "سيرة ذاتية", "بريد إلكتروني"],
    en: ["article", "content", "writing", "blog post", "story", "copywriting", "resume", "email", "newsletter"],
  },
  RESEARCH: {
    ar: ["بحث", "دراسة", "تحليل بيانات", "استبيان", "تقرير", "مقارنة", "إحصائيات"],
    en: ["research", "study", "data analysis", "survey", "report", "comparison", "statistics"],
  },
  AUTOMATION: {
    ar: ["أتمتة", "أتمتة العمليات", "تكامل", "سير عمل", "روبوت", "مهام متكررة", "workflow"],
    en: ["automation", "automate", "integration", "workflow", "bot", "zapier", "repetitive tasks"],
  },
};

/** Industry keywords -> a human-readable industry label per language. */
export const INDUSTRY_KEYWORDS: Array<{
  ar: string[];
  en: string[];
  labelAr: string;
  labelEn: string;
  impliedAudienceAr?: string;
  impliedAudienceEn?: string;
}> = [
  {
    ar: ["صيانة فلل", "صيانة فيلات"],
    en: ["villa maintenance"],
    labelAr: "صيانة وخدمات الفلل",
    labelEn: "Villa maintenance services",
    impliedAudienceAr: "أصحاب وملاك الفلل من الشريحة الراقية",
    impliedAudienceEn: "Premium villa owners and homeowners",
  },
  {
    ar: ["صيانة", "صيانة عقارات", "مقاولات"],
    en: ["maintenance", "facility maintenance", "contracting"],
    labelAr: "صيانة وخدمات عقارية",
    labelEn: "Property maintenance services",
  },
  {
    ar: ["عقار", "عقارات", "فلل", "شقق", "وسيط عقاري", "تطوير عقاري"],
    en: ["real estate", "villas", "apartments", "property", "realtor", "developer"],
    labelAr: "العقارات",
    labelEn: "Real estate",
  },
  {
    ar: ["مطعم", "مطاعم", "كافيه", "مقهى", "أغذية", "تموين"],
    en: ["restaurant", "cafe", "coffee shop", "food", "catering"],
    labelAr: "المطاعم والمقاهي",
    labelEn: "Restaurants & cafes",
  },
  {
    ar: ["تجارة إلكترونية", "متجر إلكتروني", "متجر", "بيع بالتجزئة"],
    en: ["e-commerce", "online store", "retail", "shop"],
    labelAr: "التجارة الإلكترونية والتجزئة",
    labelEn: "E-commerce & retail",
  },
  {
    ar: ["صحة", "عيادة", "مستشفى", "طبي", "تجميل", "لياقة"],
    en: ["health", "clinic", "hospital", "medical", "cosmetic", "fitness"],
    labelAr: "الرعاية الصحية واللياقة",
    labelEn: "Healthcare & fitness",
  },
  {
    ar: ["تعليم", "أكاديمية", "دورة تدريبية", "مدرسة", "جامعة"],
    en: ["education", "academy", "training course", "school", "university"],
    labelAr: "التعليم والتدريب",
    labelEn: "Education & training",
  },
  {
    ar: ["تقنية", "تكنولوجيا", "ستارت أب", "شركة برمجيات", "تطبيق تقني"],
    en: ["technology", "tech startup", "software company", "saas"],
    labelAr: "التقنية والبرمجيات",
    labelEn: "Technology & software",
  },
  {
    ar: ["لوجستيات", "شحن", "توصيل", "نقل"],
    en: ["logistics", "shipping", "delivery", "transportation"],
    labelAr: "اللوجستيات والنقل",
    labelEn: "Logistics & transportation",
  },
  {
    ar: ["ضيافة", "فندق", "منتجع", "سياحة"],
    en: ["hospitality", "hotel", "resort", "tourism"],
    labelAr: "الضيافة والسياحة",
    labelEn: "Hospitality & tourism",
  },
  {
    ar: ["أزياء", "موضة", "ملابس", "تجميل", "مستحضرات"],
    en: ["fashion", "clothing", "beauty", "cosmetics"],
    labelAr: "الأزياء والجمال",
    labelEn: "Fashion & beauty",
  },
  {
    ar: ["مالية", "بنك", "استثمار مالي", "تأمين", "محاسبة"],
    en: ["finance", "bank", "investment", "insurance", "accounting"],
    labelAr: "الخدمات المالية",
    labelEn: "Financial services",
  },
];

/** Audience keywords -> localized audience label. */
export const AUDIENCE_KEYWORDS: Array<{ ar: string[]; en: string[]; labelAr: string; labelEn: string }> = [
  {
    ar: ["أصحاب الفلل", "ملاك الفلل", "سكان الفلل"],
    en: ["villa owners", "homeowners"],
    labelAr: "أصحاب وملاك الفلل من الشريحة الراقية",
    labelEn: "Premium villa owners and homeowners",
  },
  {
    ar: ["أصحاب الأعمال", "رجال أعمال", "مديرين", "شركات"],
    en: ["business owners", "executives", "managers", "companies"],
    labelAr: "أصحاب الأعمال ومتخذو القرار",
    labelEn: "Business owners and decision-makers",
  },
  {
    ar: ["عائلات", "أسر"],
    en: ["families"],
    labelAr: "العائلات",
    labelEn: "Families",
  },
  {
    ar: ["شباب", "جيل زد", "طلاب"],
    en: ["youth", "gen z", "students"],
    labelAr: "الشباب والجيل الرقمي",
    labelEn: "Youth and digitally-native audiences",
  },
  {
    ar: ["مقيمين", "وافدين", "أجانب"],
    en: ["expats", "expatriates", "residents"],
    labelAr: "المقيمين والوافدين",
    labelEn: "Expatriates and residents",
  },
  {
    ar: ["عملاء جدد"],
    en: ["new customers"],
    labelAr: "العملاء الجدد",
    labelEn: "New customers",
  },
];

/** Platform keywords -> localized platform label. */
export const PLATFORM_KEYWORDS: Array<{ ar: string[]; en: string[]; labelAr: string; labelEn: string }> = [
  {
    ar: ["انستغرام", "إنستقرام"],
    en: ["instagram"],
    labelAr: "إنستغرام",
    labelEn: "Instagram",
  },
  {
    ar: ["تيك توك"],
    en: ["tiktok"],
    labelAr: "تيك توك",
    labelEn: "TikTok",
  },
  {
    ar: ["سناب شات", "سناب"],
    en: ["snapchat"],
    labelAr: "سناب شات",
    labelEn: "Snapchat",
  },
  {
    ar: ["لينكد إن", "لينكدإن"],
    en: ["linkedin"],
    labelAr: "لينكد إن",
    labelEn: "LinkedIn",
  },
  {
    ar: ["واتساب"],
    en: ["whatsapp"],
    labelAr: "واتساب بزنس",
    labelEn: "WhatsApp Business",
  },
  {
    ar: ["موقع إلكتروني", "الموقع"],
    en: ["website"],
    labelAr: "الموقع الإلكتروني",
    labelEn: "Website",
  },
  {
    ar: ["فيسبوك"],
    en: ["facebook"],
    labelAr: "فيسبوك",
    labelEn: "Facebook",
  },
  {
    ar: ["يوتيوب"],
    en: ["youtube"],
    labelAr: "يوتيوب",
    labelEn: "YouTube",
  },
];

/** Gulf country/city signals used to detect Gulf-market context. */
export const GULF_LOCATIONS: Array<{
  ar: string[];
  en: string[];
  city: string;
  cityAr: string;
  region: string;
  regionAr: string;
}> = [
  { ar: ["دبي"], en: ["dubai"], city: "Dubai", cityAr: "دبي", region: "United Arab Emirates", regionAr: "الإمارات" },
  { ar: ["أبوظبي", "أبو ظبي"], en: ["abu dhabi"], city: "Abu Dhabi", cityAr: "أبوظبي", region: "United Arab Emirates", regionAr: "الإمارات" },
  { ar: ["الشارقة"], en: ["sharjah"], city: "Sharjah", cityAr: "الشارقة", region: "United Arab Emirates", regionAr: "الإمارات" },
  { ar: ["الإمارات", "الامارات"], en: ["uae", "emirates"], city: "", cityAr: "", region: "United Arab Emirates", regionAr: "الإمارات" },
  { ar: ["الرياض"], en: ["riyadh"], city: "Riyadh", cityAr: "الرياض", region: "Saudi Arabia", regionAr: "السعودية" },
  { ar: ["جدة"], en: ["jeddah"], city: "Jeddah", cityAr: "جدة", region: "Saudi Arabia", regionAr: "السعودية" },
  { ar: ["الدمام"], en: ["dammam"], city: "Dammam", cityAr: "الدمام", region: "Saudi Arabia", regionAr: "السعودية" },
  { ar: ["السعودية"], en: ["saudi", "ksa"], city: "", cityAr: "", region: "Saudi Arabia", regionAr: "السعودية" },
  { ar: ["الدوحة"], en: ["doha"], city: "Doha", cityAr: "الدوحة", region: "Qatar", regionAr: "قطر" },
  { ar: ["قطر"], en: ["qatar"], city: "", cityAr: "", region: "Qatar", regionAr: "قطر" },
  { ar: ["الكويت"], en: ["kuwait"], city: "Kuwait City", cityAr: "الكويت", region: "Kuwait", regionAr: "الكويت" },
  { ar: ["المنامة"], en: ["manama"], city: "Manama", cityAr: "المنامة", region: "Bahrain", regionAr: "البحرين" },
  { ar: ["البحرين"], en: ["bahrain"], city: "", cityAr: "", region: "Bahrain", regionAr: "البحرين" },
  { ar: ["مسقط"], en: ["muscat"], city: "Muscat", cityAr: "مسقط", region: "Oman", regionAr: "عُمان" },
  { ar: ["عمان", "عُمان"], en: ["oman"], city: "", cityAr: "", region: "Oman", regionAr: "عُمان" },
  { ar: ["الخليج", "خليجي"], en: ["gulf", "gcc"], city: "", cityAr: "", region: "Gulf Cooperation Council", regionAr: "دول الخليج" },
];

export const AR_UNICODE_RANGE = /[؀-ۿ]/;
