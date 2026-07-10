-- CreateEnum
CREATE TYPE "PromptImageMode" AS ENUM ('DESCRIBE', 'SIMILAR');

-- AlterTable
ALTER TABLE "prompts" ADD COLUMN     "imageMode" "PromptImageMode",
ADD COLUMN     "imageUrl" TEXT;
