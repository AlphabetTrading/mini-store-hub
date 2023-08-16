/*
  Warnings:

  - A unique constraint covering the columns `[activePriceId]` on the table `RetailShopStock` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "PriceHistory" ADD COLUMN     "retailShopStockId" TEXT;

-- AlterTable
ALTER TABLE "RetailShopStock" ADD COLUMN     "activePriceId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "RetailShopStock_activePriceId_key" ON "RetailShopStock"("activePriceId");

-- AddForeignKey
ALTER TABLE "RetailShopStock" ADD CONSTRAINT "RetailShopStock_activePriceId_fkey" FOREIGN KEY ("activePriceId") REFERENCES "PriceHistory"("id") ON DELETE SET NULL ON UPDATE CASCADE;
