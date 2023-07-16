/*
  Warnings:

  - A unique constraint covering the columns `[productId,retailShopId]` on the table `RetailShopStock` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[productId,warehouseId]` on the table `WarehouseStock` will be added. If there are existing duplicate values, this will fail.
  - Made the column `retailShopId` on table `RetailShopStock` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "RetailShopStock" DROP CONSTRAINT "RetailShopStock_retailShopId_fkey";

-- AlterTable
ALTER TABLE "RetailShopStock" ALTER COLUMN "retailShopId" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "Notification" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "notifications_token" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT false,
    "createdById" TEXT NOT NULL,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NotificationToken" (
    "id" TEXT NOT NULL,
    "device_type" TEXT NOT NULL,
    "notifications_token" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT false,
    "userId" TEXT NOT NULL,

    CONSTRAINT "NotificationToken_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "NotificationToken_userId_key" ON "NotificationToken"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "RetailShopStock_productId_retailShopId_key" ON "RetailShopStock"("productId", "retailShopId");

-- CreateIndex
CREATE UNIQUE INDEX "WarehouseStock_productId_warehouseId_key" ON "WarehouseStock"("productId", "warehouseId");

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NotificationToken" ADD CONSTRAINT "NotificationToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RetailShopStock" ADD CONSTRAINT "RetailShopStock_retailShopId_fkey" FOREIGN KEY ("retailShopId") REFERENCES "RetailShop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
