/*
  Warnings:

  - Added the required column `clerkId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "clerkId" TEXT NOT NULL,
ADD COLUMN     "password" TEXT;
