-- CreateEnum
CREATE TYPE "PromptCategoryKey" AS ENUM ('MARKETING', 'BUSINESS', 'CODING', 'DESIGN', 'IMAGE_GENERATION', 'VIDEO_GENERATION', 'WRITING', 'RESEARCH', 'AUTOMATION');

-- CreateEnum
CREATE TYPE "PromptLanguage" AS ENUM ('AR', 'EN');

-- CreateEnum
CREATE TYPE "PromptHistoryAction" AS ENUM ('CREATED', 'EDITED', 'REGENERATED', 'SAVED', 'EXPORTED');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "fullName" TEXT,
    "avatarUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "prompt_categories" (
    "id" TEXT NOT NULL,
    "key" "PromptCategoryKey" NOT NULL,
    "nameEn" TEXT NOT NULL,
    "nameAr" TEXT NOT NULL,
    "icon" TEXT,

    CONSTRAINT "prompt_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "prompts" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "categoryId" TEXT,
    "title" TEXT NOT NULL,
    "rawInput" TEXT NOT NULL,
    "language" "PromptLanguage" NOT NULL,
    "goal" TEXT,
    "industry" TEXT,
    "audience" TEXT,
    "platform" TEXT,
    "requiredOutput" TEXT,
    "missingInfo" TEXT[],
    "professionalPrompt" TEXT NOT NULL,
    "advancedPrompt" TEXT NOT NULL,
    "shortPrompt" TEXT NOT NULL,
    "recommendedTool" TEXT,
    "explanation" TEXT,
    "improvementSuggestions" TEXT[],
    "aiProviderId" TEXT,
    "isSaved" BOOLEAN NOT NULL DEFAULT false,
    "isFavorite" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "prompts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "prompt_history" (
    "id" TEXT NOT NULL,
    "promptId" TEXT NOT NULL,
    "action" "PromptHistoryAction" NOT NULL,
    "snapshot" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "prompt_history_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ai_providers" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "models" TEXT[],

    CONSTRAINT "ai_providers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_settings" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "language" "PromptLanguage" NOT NULL DEFAULT 'AR',
    "theme" TEXT NOT NULL DEFAULT 'system',
    "region" TEXT NOT NULL DEFAULT 'gulf',
    "preferredProviderId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_settings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "prompt_categories_key_key" ON "prompt_categories"("key");

-- CreateIndex
CREATE INDEX "prompts_userId_idx" ON "prompts"("userId");

-- CreateIndex
CREATE INDEX "prompts_categoryId_idx" ON "prompts"("categoryId");

-- CreateIndex
CREATE INDEX "prompt_history_promptId_idx" ON "prompt_history"("promptId");

-- CreateIndex
CREATE UNIQUE INDEX "ai_providers_key_key" ON "ai_providers"("key");

-- CreateIndex
CREATE UNIQUE INDEX "user_settings_userId_key" ON "user_settings"("userId");

-- AddForeignKey
ALTER TABLE "prompts" ADD CONSTRAINT "prompts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "prompts" ADD CONSTRAINT "prompts_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "prompt_categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "prompts" ADD CONSTRAINT "prompts_aiProviderId_fkey" FOREIGN KEY ("aiProviderId") REFERENCES "ai_providers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "prompt_history" ADD CONSTRAINT "prompt_history_promptId_fkey" FOREIGN KEY ("promptId") REFERENCES "prompts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_settings" ADD CONSTRAINT "user_settings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_settings" ADD CONSTRAINT "user_settings_preferredProviderId_fkey" FOREIGN KEY ("preferredProviderId") REFERENCES "ai_providers"("id") ON DELETE SET NULL ON UPDATE CASCADE;
