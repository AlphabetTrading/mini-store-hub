-- AlterTable
ALTER TABLE "Address" ADD COLUMN     "ሙሉ አድራሻ" TEXT;

-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "መግለጫ" TEXT,
ADD COLUMN     "የ እቃ ክፍል ስም" TEXT;

-- AlterTable
ALTER TABLE "Notification" ADD COLUMN     "መልእክት" TEXT,
ADD COLUMN     "የ ርዕስ ስም" TEXT;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "መግለጫ" TEXT;

-- AlterTable
ALTER TABLE "RetailShop" ADD COLUMN     "የስራ ቦታ ስም" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "የ መጀመሪያ ስም" TEXT,
ADD COLUMN     "የ አባት ስም" TEXT;

-- AlterTable
ALTER TABLE "Warehouse" ADD COLUMN     "የስራ ቦታ ስም" TEXT;
