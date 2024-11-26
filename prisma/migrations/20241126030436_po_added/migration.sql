-- CreateEnum
CREATE TYPE "PoStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED', 'CANCELLED', 'COMPLETED');

-- CreateTable
CREATE TABLE "PurchaseOrder" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "sawmill" TEXT NOT NULL,
    "po" TEXT NOT NULL,
    "grade" TEXT NOT NULL,
    "thikness" TEXT NOT NULL,
    "width" TEXT NOT NULL,
    "large" TEXT NOT NULL,
    "quantity" TEXT NOT NULL,
    "client" TEXT NOT NULL,
    "inspectionDate" TIMESTAMP(3) NOT NULL,
    "port" TEXT NOT NULL,
    "etd" TIMESTAMP(3) NOT NULL,
    "eta" TIMESTAMP(3) NOT NULL,
    "status" "PoStatus" NOT NULL,

    CONSTRAINT "PurchaseOrder_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PurchaseOrder" ADD CONSTRAINT "PurchaseOrder_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
