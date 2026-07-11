import { PrismaClient, PromptCategoryKey } from "@prisma/client";

const prisma = new PrismaClient();

const categories: Array<{
  key: PromptCategoryKey;
  nameEn: string;
  nameAr: string;
  icon: string;
}> = [
  { key: "MARKETING", nameEn: "Marketing", nameAr: "التسويق", icon: "megaphone" },
  { key: "BUSINESS", nameEn: "Business", nameAr: "الأعمال", icon: "briefcase" },
  { key: "CODING", nameEn: "Coding", nameAr: "البرمجة", icon: "code" },
  { key: "DESIGN", nameEn: "Design", nameAr: "التصميم", icon: "palette" },
  { key: "IMAGE_GENERATION", nameEn: "Image Generation", nameAr: "توليد الصور", icon: "image" },
  { key: "VIDEO_GENERATION", nameEn: "Video Generation", nameAr: "توليد الفيديو", icon: "video" },
  { key: "WRITING", nameEn: "Writing", nameAr: "الكتابة", icon: "pen-line" },
  { key: "RESEARCH", nameEn: "Research", nameAr: "البحث", icon: "search" },
  { key: "AUTOMATION", nameEn: "Automation", nameAr: "الأتمتة", icon: "workflow" },
];

const providers = [
  {
    key: "rule-based",
    name: "Axirova Engine (Rule-Based)",
    isActive: true,
    models: ["axirova-v1"],
  },
  {
    key: "openai",
    name: "OpenAI",
    isActive: true,
    models: ["gpt-4o", "gpt-4o-mini"],
  },
  {
    key: "anthropic",
    name: "Anthropic Claude",
    isActive: true,
    models: ["claude-sonnet-5", "claude-opus-4-8"],
  },
  {
    key: "gemini",
    name: "Google Gemini",
    isActive: true,
    models: ["gemini-flash-latest", "gemini-pro-latest"],
  },
];

async function main() {
  for (const category of categories) {
    await prisma.promptCategory.upsert({
      where: { key: category.key },
      update: category,
      create: category,
    });
  }

  for (const provider of providers) {
    await prisma.aIProvider.upsert({
      where: { key: provider.key },
      update: provider,
      create: provider,
    });
  }

  console.log(`Seeded ${categories.length} categories and ${providers.length} AI providers.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
