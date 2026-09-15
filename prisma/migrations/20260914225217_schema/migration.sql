/*
  Warnings:

  - You are about to drop the column `businessHours` on the `location` table. All the data in the column will be lost.
  - You are about to drop the column `resNos` on the `restaurant` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "location" DROP COLUMN "businessHours";

-- AlterTable
ALTER TABLE "organization" ADD COLUMN     "resNos" INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE "restaurant" DROP COLUMN "resNos";
