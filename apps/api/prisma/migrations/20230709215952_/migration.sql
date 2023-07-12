/*
  Warnings:

  - You are about to drop the column `productInventoryId` on the `GoodsTransfer` table. All the data in the column will be lost.
  - You are about to drop the `ProductInventory` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `quantity` to the `GoodsTransfer` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "GoodsTransfer" DROP CONSTRAINT "GoodsTransfer_productInventoryId_fkey";

-- DropForeignKey
ALTER TABLE "ProductInventory" DROP CONSTRAINT "ProductInventory_productId_fkey";

-- DropForeignKey
ALTER TABLE "ProductInventory" DROP CONSTRAINT "ProductInventory_warehouseId_fkey";

-- AlterTable
ALTER TABLE "GoodsTransfer" DROP COLUMN "productInventoryId",
ADD COLUMN     "quantity" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "SaleTransaction" ALTER COLUMN "quantity" SET DATA TYPE DOUBLE PRECISION;

-- DropTable
DROP TABLE "ProductInventory";

-- CreateTable
CREATE TABLE "RetailShopInventory" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "warehouseId" TEXT NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "retailShopId" TEXT,

    CONSTRAINT "RetailShopInventory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WarehouseInventory" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "warehouseId" TEXT NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL,
    "purchasedPrice" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WarehouseInventory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DailyTransaction" (
    "id" TEXT NOT NULL,
    "retailShopId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "totalSales" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DailyTransaction_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RetailShopInventory" ADD CONSTRAINT "RetailShopInventory_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RetailShopInventory" ADD CONSTRAINT "RetailShopInventory_warehouseId_fkey" FOREIGN KEY ("warehouseId") REFERENCES "Warehouse"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RetailShopInventory" ADD CONSTRAINT "RetailShopInventory_retailShopId_fkey" FOREIGN KEY ("retailShopId") REFERENCES "RetailShop"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WarehouseInventory" ADD CONSTRAINT "WarehouseInventory_warehouseId_fkey" FOREIGN KEY ("warehouseId") REFERENCES "Warehouse"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WarehouseInventory" ADD CONSTRAINT "WarehouseInventory_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DailyTransaction" ADD CONSTRAINT "DailyTransaction_retailShopId_fkey" FOREIGN KEY ("retailShopId") REFERENCES "RetailShop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
