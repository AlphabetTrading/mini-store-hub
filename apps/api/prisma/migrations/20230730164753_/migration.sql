/*
  Warnings:

  - You are about to drop the column `createdById` on the `Notification` table. All the data in the column will be lost.
  - You are about to drop the column `notifications_token` on the `NotificationToken` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[token]` on the table `NotificationToken` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `isRead` to the `Notification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `token` to the `NotificationToken` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "RecipientType" AS ENUM ('USER', 'RETAIL_SHOP', 'WAREHOUSE', 'ALL');

-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_createdById_fkey";

-- DropIndex
DROP INDEX "NotificationToken_notifications_token_key";

-- DropIndex
DROP INDEX "NotificationToken_userId_key";

-- AlterTable
ALTER TABLE "Notification" DROP COLUMN "createdById",
ADD COLUMN     "isRead" BOOLEAN NOT NULL,
ADD COLUMN     "recipientId" TEXT,
ADD COLUMN     "recipientType" "RecipientType" NOT NULL DEFAULT 'USER',
ADD COLUMN     "userId" TEXT;

-- AlterTable
ALTER TABLE "NotificationToken" DROP COLUMN "notifications_token",
ADD COLUMN     "token" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "NotificationRead" (
    "id" TEXT NOT NULL,
    "notificationId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "NotificationRead_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "NotificationRead_notificationId_userId_key" ON "NotificationRead"("notificationId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "NotificationToken_token_key" ON "NotificationToken"("token");

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NotificationRead" ADD CONSTRAINT "NotificationRead_notificationId_fkey" FOREIGN KEY ("notificationId") REFERENCES "Notification"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
