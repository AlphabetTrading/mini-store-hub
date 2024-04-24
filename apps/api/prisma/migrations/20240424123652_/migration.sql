/*
  Warnings:

  - You are about to drop the column `ሙሉ አድራሻ` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the column `መግለጫ` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `የ እቃ ክፍል ስም` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `መልእክት` on the `Notification` table. All the data in the column will be lost.
  - You are about to drop the column `የ ርዕስ ስም` on the `Notification` table. All the data in the column will be lost.
  - You are about to drop the column `መግለጫ` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `የ እቃ ስም` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `የስራ ቦታ ስም` on the `RetailShop` table. All the data in the column will be lost.
  - You are about to drop the column `የ መጀመሪያ ስም` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `የ አባት ስም` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `የስራ ቦታ ስም` on the `Warehouse` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Address" DROP COLUMN "ሙሉ አድራሻ",
ADD COLUMN     "amharicFormattedAddress" TEXT;

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "መግለጫ",
DROP COLUMN "የ እቃ ክፍል ስም",
ADD COLUMN     "amharicDescription" TEXT,
ADD COLUMN     "amharicName" TEXT;

-- AlterTable
ALTER TABLE "Notification" DROP COLUMN "መልእክት",
DROP COLUMN "የ ርዕስ ስም",
ADD COLUMN     "amharicBody" TEXT,
ADD COLUMN     "amharicTitle" TEXT;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "መግለጫ",
DROP COLUMN "የ እቃ ስም",
ADD COLUMN     "amharicDescription" TEXT,
ADD COLUMN     "amharicName" TEXT;

-- AlterTable
ALTER TABLE "RetailShop" DROP COLUMN "የስራ ቦታ ስም",
ADD COLUMN     "amharicName" TEXT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "የ መጀመሪያ ስም",
DROP COLUMN "የ አባት ስም",
ADD COLUMN     "amharicFirstName" TEXT,
ADD COLUMN     "amharicLastName" TEXT;

-- AlterTable
ALTER TABLE "Warehouse" DROP COLUMN "የስራ ቦታ ስም",
ADD COLUMN     "amharicName" TEXT;
