/*
  Warnings:

  - A unique constraint covering the columns `[activePriceId]` on the table `Product` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "PriceHistory" DROP CONSTRAINT "PriceHistory_productId_productCreatedAt_fkey";

-- DropIndex
DROP INDEX "PriceHistory_productId_productCreatedAt_key";

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "activePriceId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Product_activePriceId_key" ON "Product"("activePriceId");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_activePriceId_fkey" FOREIGN KEY ("activePriceId") REFERENCES "PriceHistory"("id") ON DELETE SET NULL ON UPDATE CASCADE;
