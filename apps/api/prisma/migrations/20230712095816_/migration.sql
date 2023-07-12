/*
  Warnings:

  - You are about to drop the column `quantity` on the `GoodsTransfer` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Address" ALTER COLUMN "street" DROP NOT NULL;

-- AlterTable
ALTER TABLE "GoodsTransfer" DROP COLUMN "quantity";
