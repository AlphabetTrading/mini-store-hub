/*
  Warnings:

  - You are about to drop the column `month` on the `AnnualTransaction` table. All the data in the column will be lost.
  - Added the required column `year` to the `AnnualTransaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AnnualTransaction" DROP COLUMN "month",
ADD COLUMN     "year" TEXT NOT NULL;
