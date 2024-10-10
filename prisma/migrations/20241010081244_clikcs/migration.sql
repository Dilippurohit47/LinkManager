/*
  Warnings:

  - Changed the type of `click` on the `Clicks` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Clicks" DROP COLUMN "click",
ADD COLUMN     "click" JSONB NOT NULL;
