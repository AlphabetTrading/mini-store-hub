/*
  Warnings:

  - You are about to drop the column `userProfileId` on the `User` table. All the data in the column will be lost.
  - Changed the type of `quantity` on the `ProductInventory` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_userProfileId_fkey";

-- DropIndex
DROP INDEX "User_userProfileId_key";

-- AlterTable
ALTER TABLE "ProductInventory" DROP COLUMN "quantity",
ADD COLUMN     "quantity" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "RetailShop" ADD COLUMN     "retailShopManagerId" TEXT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "userProfileId";

-- AlterTable
ALTER TABLE "UserProfile" ALTER COLUMN "photoUrl" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Warehouse" ADD COLUMN     "warehouseManagerId" TEXT;

-- AddForeignKey
ALTER TABLE "UserProfile" ADD CONSTRAINT "UserProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RetailShop" ADD CONSTRAINT "RetailShop_retailShopManagerId_fkey" FOREIGN KEY ("retailShopManagerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Warehouse" ADD CONSTRAINT "Warehouse_warehouseManagerId_fkey" FOREIGN KEY ("warehouseManagerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
