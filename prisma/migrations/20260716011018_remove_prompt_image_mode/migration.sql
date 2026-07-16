/*
  Warnings:

  - You are about to drop the column `imageMode` on the `prompts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "prompts" DROP COLUMN "imageMode";

-- DropEnum
DROP TYPE "PromptImageMode";
