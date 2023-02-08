/*
  Warnings:

  - You are about to drop the column `stripeSourceId` on the `transactions` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "transactions" DROP COLUMN "stripeSourceId",
ADD COLUMN     "checkoutSessionId" TEXT;
