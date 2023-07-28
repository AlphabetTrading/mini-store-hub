/*
  Warnings:

  - The values [WEIGHT] on the enum `UnitType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "UnitType_new" AS ENUM ('PIECES', 'KG', 'LITER', 'METER', 'METER_SQUARE', 'BOX', 'BAG', 'BOTTLE', 'OTHER');
ALTER TABLE "Product" ALTER COLUMN "unit" TYPE "UnitType_new" USING ("unit"::text::"UnitType_new");
ALTER TYPE "UnitType" RENAME TO "UnitType_old";
ALTER TYPE "UnitType_new" RENAME TO "UnitType";
DROP TYPE "UnitType_old";
COMMIT;

-- AlterTable
ALTER TABLE "Warehouse" ADD COLUMN     "isMain" BOOLEAN NOT NULL DEFAULT false;
