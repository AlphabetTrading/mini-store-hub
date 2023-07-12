/*
  Warnings:

  - You are about to drop the column `activePriceId` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `address` on the `RetailShop` table. All the data in the column will be lost.
  - You are about to drop the column `address` on the `Warehouse` table. All the data in the column will be lost.
  - You are about to drop the `Goods` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RetailShopInventory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `WarehouseInventory` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[id,createdAt]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[addressId]` on the table `RetailShop` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[addressId]` on the table `UserProfile` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[addressId]` on the table `Warehouse` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Goods" DROP CONSTRAINT "Goods_goodsTransferId_fkey";

-- DropForeignKey
ALTER TABLE "Goods" DROP CONSTRAINT "Goods_productId_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_activePriceId_fkey";

-- DropForeignKey
ALTER TABLE "RetailShopInventory" DROP CONSTRAINT "RetailShopInventory_productId_fkey";

-- DropForeignKey
ALTER TABLE "RetailShopInventory" DROP CONSTRAINT "RetailShopInventory_retailShopId_fkey";

-- DropForeignKey
ALTER TABLE "RetailShopInventory" DROP CONSTRAINT "RetailShopInventory_warehouseId_fkey";

-- DropForeignKey
ALTER TABLE "WarehouseInventory" DROP CONSTRAINT "WarehouseInventory_productId_fkey";

-- DropForeignKey
ALTER TABLE "WarehouseInventory" DROP CONSTRAINT "WarehouseInventory_warehouseId_fkey";

-- DropIndex
DROP INDEX "Product_activePriceId_key";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "activePriceId";

-- AlterTable
ALTER TABLE "RetailShop" DROP COLUMN "address",
ADD COLUMN     "addressId" TEXT;

-- AlterTable
ALTER TABLE "UserProfile" ADD COLUMN     "addressId" TEXT;

-- AlterTable
ALTER TABLE "Warehouse" DROP COLUMN "address",
ADD COLUMN     "addressId" TEXT;

-- DropTable
DROP TABLE "Goods";

-- DropTable
DROP TABLE "RetailShopInventory";

-- DropTable
DROP TABLE "WarehouseInventory";

-- CreateTable
CREATE TABLE "Address" (
    "id" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "city" TEXT,
    "lng" DOUBLE PRECISION,
    "lat" DOUBLE PRECISION,
    "formattedAddress" TEXT,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StockItem" (
    "id" TEXT NOT NULL,
    "goodsTransferId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StockItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RetailShopStock" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "warehouseId" TEXT NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "retailShopId" TEXT,

    CONSTRAINT "RetailShopStock_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WarehouseStock" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "warehouseId" TEXT NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WarehouseStock_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Product_id_createdAt_key" ON "Product"("id", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "RetailShop_addressId_key" ON "RetailShop"("addressId");

-- CreateIndex
CREATE UNIQUE INDEX "UserProfile_addressId_key" ON "UserProfile"("addressId");

-- CreateIndex
CREATE UNIQUE INDEX "Warehouse_addressId_key" ON "Warehouse"("addressId");

-- AddForeignKey
ALTER TABLE "UserProfile" ADD CONSTRAINT "UserProfile_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PriceHistory" ADD CONSTRAINT "PriceHistory_productId_createdAt_fkey" FOREIGN KEY ("productId", "createdAt") REFERENCES "Product"("id", "createdAt") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RetailShop" ADD CONSTRAINT "RetailShop_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Warehouse" ADD CONSTRAINT "Warehouse_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StockItem" ADD CONSTRAINT "StockItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StockItem" ADD CONSTRAINT "StockItem_goodsTransferId_fkey" FOREIGN KEY ("goodsTransferId") REFERENCES "GoodsTransfer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RetailShopStock" ADD CONSTRAINT "RetailShopStock_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RetailShopStock" ADD CONSTRAINT "RetailShopStock_warehouseId_fkey" FOREIGN KEY ("warehouseId") REFERENCES "Warehouse"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RetailShopStock" ADD CONSTRAINT "RetailShopStock_retailShopId_fkey" FOREIGN KEY ("retailShopId") REFERENCES "RetailShop"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WarehouseStock" ADD CONSTRAINT "WarehouseStock_warehouseId_fkey" FOREIGN KEY ("warehouseId") REFERENCES "Warehouse"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WarehouseStock" ADD CONSTRAINT "WarehouseStock_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
