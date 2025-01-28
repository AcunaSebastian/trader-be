/*
  Warnings:

  - You are about to drop the `PurchaseOrder` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "PurchaseOrder" DROP CONSTRAINT "PurchaseOrder_userId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "password" TEXT NOT NULL,
ALTER COLUMN "name" SET NOT NULL;

-- DropTable
DROP TABLE "PurchaseOrder";

-- CreateTable
CREATE TABLE "countries" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "countries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sawmils" (
    "id" SERIAL NOT NULL,
    "uid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,

    CONSTRAINT "sawmils_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "clients" (
    "id" SERIAL NOT NULL,
    "uid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,

    CONSTRAINT "clients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PurchaseOrders" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "sawmillId" INTEGER NOT NULL,
    "clientId" INTEGER NOT NULL,
    "po" TEXT NOT NULL,
    "grade" TEXT NOT NULL,
    "thikness" TEXT NOT NULL,
    "width" TEXT NOT NULL,
    "large" TEXT NOT NULL,
    "quantity" TEXT NOT NULL,
    "port" TEXT NOT NULL,
    "etd" DATE,
    "eta" DATE,
    "status" "PoStatus" NOT NULL,

    CONSTRAINT "PurchaseOrders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "inspections" (
    "id" SERIAL NOT NULL,
    "sawmillId" INTEGER NOT NULL,
    "purchaseOrderId" INTEGER,
    "inspectionDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "inspections_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "countries_id_key" ON "countries"("id");

-- CreateIndex
CREATE UNIQUE INDEX "sawmils_uid_key" ON "sawmils"("uid");

-- CreateIndex
CREATE UNIQUE INDEX "clients_uid_key" ON "clients"("uid");

-- AddForeignKey
ALTER TABLE "PurchaseOrders" ADD CONSTRAINT "PurchaseOrders_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseOrders" ADD CONSTRAINT "PurchaseOrders_sawmillId_fkey" FOREIGN KEY ("sawmillId") REFERENCES "sawmils"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseOrders" ADD CONSTRAINT "PurchaseOrders_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inspections" ADD CONSTRAINT "inspections_sawmillId_fkey" FOREIGN KEY ("sawmillId") REFERENCES "sawmils"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inspections" ADD CONSTRAINT "inspections_purchaseOrderId_fkey" FOREIGN KEY ("purchaseOrderId") REFERENCES "PurchaseOrders"("id") ON DELETE SET NULL ON UPDATE CASCADE;
