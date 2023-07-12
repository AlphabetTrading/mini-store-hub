/*
  Warnings:

  - A unique constraint covering the columns `[productId,productCreatedAt]` on the table `PriceHistory` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `productCreatedAt` to the `PriceHistory` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "PriceHistory" DROP CONSTRAINT "PriceHistory_productId_createdAt_fkey";

-- DropIndex
DROP INDEX "PriceHistory_productId_createdAt_key";

-- AlterTable
ALTER TABLE "PriceHistory" ADD COLUMN     "productCreatedAt" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "PriceHistory_productId_productCreatedAt_key" ON "PriceHistory"("productId", "productCreatedAt");

-- AddForeignKey
ALTER TABLE "PriceHistory" ADD CONSTRAINT "PriceHistory_productId_productCreatedAt_fkey" FOREIGN KEY ("productId", "productCreatedAt") REFERENCES "Product"("id", "createdAt") ON DELETE RESTRICT ON UPDATE CASCADE;
