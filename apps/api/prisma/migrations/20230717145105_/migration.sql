/*
  Warnings:

  - You are about to drop the column `notifications_token` on the `Notification` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[notifications_token]` on the table `NotificationToken` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `maxQuantity` to the `RetailShopStock` table without a default value. This is not possible if the table is not empty.
  - Added the required column `purchasedPrice` to the `SaleTransaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Notification" DROP COLUMN "notifications_token";

-- AlterTable
ALTER TABLE "RetailShopStock" ADD COLUMN     "maxQuantity" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "SaleTransaction" ADD COLUMN     "purchasedPrice" DOUBLE PRECISION NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "NotificationToken_notifications_token_key" ON "NotificationToken"("notifications_token");
