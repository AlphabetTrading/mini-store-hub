/*
  Warnings:

  - Added the required column `maxQuantity` to the `WarehouseStock` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "WarehouseStock" ADD COLUMN     "maxQuantity" DOUBLE PRECISION NOT NULL;
