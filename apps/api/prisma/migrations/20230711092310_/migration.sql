/*
  Warnings:

  - You are about to drop the column `productId` on the `GoodsTransfer` table. All the data in the column will be lost.
  - You are about to drop the column `warehouseId` on the `GoodsTransfer` table. All the data in the column will be lost.
  - You are about to drop the column `purchasedPrice` on the `WarehouseInventory` table. All the data in the column will be lost.
  - Added the required column `sourceWarehouseId` to the `GoodsTransfer` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TransferType" AS ENUM ('WarehouseToWarehouse', 'WarehouseToRetailShop');

-- DropForeignKey
ALTER TABLE "GoodsTransfer" DROP CONSTRAINT "GoodsTransfer_productId_fkey";

-- DropForeignKey
ALTER TABLE "GoodsTransfer" DROP CONSTRAINT "GoodsTransfer_warehouseId_fkey";

-- AlterTable
ALTER TABLE "GoodsTransfer" DROP COLUMN "productId",
DROP COLUMN "warehouseId",
ADD COLUMN     "destinationWarehouseId" TEXT,
ADD COLUMN     "sourceWarehouseId" TEXT NOT NULL,
ADD COLUMN     "transferType" "TransferType" NOT NULL DEFAULT 'WarehouseToWarehouse';

-- AlterTable
ALTER TABLE "UserProfile" ADD COLUMN     "idUrl" TEXT;

-- AlterTable
ALTER TABLE "WarehouseInventory" DROP COLUMN "purchasedPrice";

-- CreateTable
CREATE TABLE "Goods" (
    "id" TEXT NOT NULL,
    "goodsTransferId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Goods_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MonthlyTransaction" (
    "id" TEXT NOT NULL,
    "retailShopId" TEXT NOT NULL,
    "month" TEXT NOT NULL,
    "totalSales" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MonthlyTransaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AnnualTransaction" (
    "id" TEXT NOT NULL,
    "retailShopId" TEXT NOT NULL,
    "month" TEXT NOT NULL,
    "totalSales" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AnnualTransaction_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "GoodsTransfer" ADD CONSTRAINT "GoodsTransfer_sourceWarehouseId_fkey" FOREIGN KEY ("sourceWarehouseId") REFERENCES "Warehouse"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GoodsTransfer" ADD CONSTRAINT "GoodsTransfer_destinationWarehouseId_fkey" FOREIGN KEY ("destinationWarehouseId") REFERENCES "Warehouse"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Goods" ADD CONSTRAINT "Goods_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Goods" ADD CONSTRAINT "Goods_goodsTransferId_fkey" FOREIGN KEY ("goodsTransferId") REFERENCES "GoodsTransfer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MonthlyTransaction" ADD CONSTRAINT "MonthlyTransaction_retailShopId_fkey" FOREIGN KEY ("retailShopId") REFERENCES "RetailShop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnnualTransaction" ADD CONSTRAINT "AnnualTransaction_retailShopId_fkey" FOREIGN KEY ("retailShopId") REFERENCES "RetailShop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
