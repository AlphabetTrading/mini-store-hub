/*
  Warnings:

  - The primary key for the `Category` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `GoodsTransfer` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `PriceHistory` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Product` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `price` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `purchasedPrice` on the `Product` table. All the data in the column will be lost.
  - The primary key for the `ProductInventory` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `RetailShop` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `SaleTransaction` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Warehouse` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[productId,createdAt]` on the table `PriceHistory` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[activePriceId]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `description` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `purchasedPrice` to the `PriceHistory` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_parentId_fkey";

-- DropForeignKey
ALTER TABLE "GoodsTransfer" DROP CONSTRAINT "GoodsTransfer_productId_fkey";

-- DropForeignKey
ALTER TABLE "GoodsTransfer" DROP CONSTRAINT "GoodsTransfer_productInventoryId_fkey";

-- DropForeignKey
ALTER TABLE "GoodsTransfer" DROP CONSTRAINT "GoodsTransfer_retailShopId_fkey";

-- DropForeignKey
ALTER TABLE "GoodsTransfer" DROP CONSTRAINT "GoodsTransfer_warehouseId_fkey";

-- DropForeignKey
ALTER TABLE "PriceHistory" DROP CONSTRAINT "PriceHistory_productId_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "ProductInventory" DROP CONSTRAINT "ProductInventory_productId_fkey";

-- DropForeignKey
ALTER TABLE "ProductInventory" DROP CONSTRAINT "ProductInventory_warehouseId_fkey";

-- DropForeignKey
ALTER TABLE "SaleTransaction" DROP CONSTRAINT "SaleTransaction_productId_fkey";

-- DropForeignKey
ALTER TABLE "SaleTransaction" DROP CONSTRAINT "SaleTransaction_retailShopId_fkey";

-- AlterTable
ALTER TABLE "Category" DROP CONSTRAINT "Category_pkey",
ADD COLUMN     "description" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "parentId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Category_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Category_id_seq";

-- AlterTable
ALTER TABLE "GoodsTransfer" DROP CONSTRAINT "GoodsTransfer_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "retailShopId" SET DATA TYPE TEXT,
ALTER COLUMN "productInventoryId" SET DATA TYPE TEXT,
ALTER COLUMN "productId" SET DATA TYPE TEXT,
ALTER COLUMN "warehouseId" SET DATA TYPE TEXT,
ADD CONSTRAINT "GoodsTransfer_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "GoodsTransfer_id_seq";

-- AlterTable
ALTER TABLE "PriceHistory" DROP CONSTRAINT "PriceHistory_pkey",
ADD COLUMN     "purchasedPrice" DOUBLE PRECISION NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "productId" SET DATA TYPE TEXT,
ADD CONSTRAINT "PriceHistory_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "PriceHistory_id_seq";

-- AlterTable
ALTER TABLE "Product" DROP CONSTRAINT "Product_pkey",
DROP COLUMN "price",
DROP COLUMN "purchasedPrice",
ADD COLUMN     "activePriceId" TEXT,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "categoryId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Product_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Product_id_seq";

-- AlterTable
ALTER TABLE "ProductInventory" DROP CONSTRAINT "ProductInventory_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "productId" SET DATA TYPE TEXT,
ALTER COLUMN "warehouseId" SET DATA TYPE TEXT,
ALTER COLUMN "quantity" SET DATA TYPE TEXT,
ADD CONSTRAINT "ProductInventory_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "ProductInventory_id_seq";

-- AlterTable
ALTER TABLE "RetailShop" DROP CONSTRAINT "RetailShop_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "RetailShop_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "RetailShop_id_seq";

-- AlterTable
ALTER TABLE "SaleTransaction" DROP CONSTRAINT "SaleTransaction_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "productId" SET DATA TYPE TEXT,
ALTER COLUMN "retailShopId" SET DATA TYPE TEXT,
ADD CONSTRAINT "SaleTransaction_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "SaleTransaction_id_seq";

-- AlterTable
ALTER TABLE "Warehouse" DROP CONSTRAINT "Warehouse_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Warehouse_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Warehouse_id_seq";

-- CreateTable
CREATE TABLE "UserProfile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "photoUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserProfile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserProfile_userId_key" ON "UserProfile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "PriceHistory_productId_createdAt_key" ON "PriceHistory"("productId", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "Product_activePriceId_key" ON "Product"("activePriceId");

-- CreateIndex
CREATE INDEX "User_username_phone_idx" ON "User"("username", "phone");

-- AddForeignKey
ALTER TABLE "UserProfile" ADD CONSTRAINT "UserProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_activePriceId_fkey" FOREIGN KEY ("activePriceId") REFERENCES "PriceHistory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PriceHistory" ADD CONSTRAINT "PriceHistory_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GoodsTransfer" ADD CONSTRAINT "GoodsTransfer_retailShopId_fkey" FOREIGN KEY ("retailShopId") REFERENCES "RetailShop"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GoodsTransfer" ADD CONSTRAINT "GoodsTransfer_productInventoryId_fkey" FOREIGN KEY ("productInventoryId") REFERENCES "ProductInventory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GoodsTransfer" ADD CONSTRAINT "GoodsTransfer_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GoodsTransfer" ADD CONSTRAINT "GoodsTransfer_warehouseId_fkey" FOREIGN KEY ("warehouseId") REFERENCES "Warehouse"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SaleTransaction" ADD CONSTRAINT "SaleTransaction_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SaleTransaction" ADD CONSTRAINT "SaleTransaction_retailShopId_fkey" FOREIGN KEY ("retailShopId") REFERENCES "RetailShop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductInventory" ADD CONSTRAINT "ProductInventory_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductInventory" ADD CONSTRAINT "ProductInventory_warehouseId_fkey" FOREIGN KEY ("warehouseId") REFERENCES "Warehouse"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
