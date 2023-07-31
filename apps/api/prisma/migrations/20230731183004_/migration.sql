/*
  Warnings:

  - You are about to drop the column `price` on the `SaleTransaction` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `SaleTransaction` table. All the data in the column will be lost.
  - You are about to drop the column `purchasedPrice` on the `SaleTransaction` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `SaleTransaction` table. All the data in the column will be lost.
  - Added the required column `totalPrice` to the `SaleTransaction` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "SaleTransaction" DROP CONSTRAINT "SaleTransaction_productId_fkey";

-- AlterTable
ALTER TABLE "SaleTransaction" DROP COLUMN "price",
DROP COLUMN "productId",
DROP COLUMN "purchasedPrice",
DROP COLUMN "quantity",
ADD COLUMN     "totalPrice" DOUBLE PRECISION NOT NULL;

-- CreateTable
CREATE TABLE "SaleTransactionItem" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "subTotal" DOUBLE PRECISION NOT NULL,
    "saleTransactionId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SaleTransactionItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SaleTransactionItem" ADD CONSTRAINT "SaleTransactionItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SaleTransactionItem" ADD CONSTRAINT "SaleTransactionItem_saleTransactionId_fkey" FOREIGN KEY ("saleTransactionId") REFERENCES "SaleTransaction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
