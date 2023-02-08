/*
  Warnings:

  - You are about to drop the column `stripeId` on the `products` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "products" DROP COLUMN "stripeId",
ADD COLUMN     "StripeSessionId" TEXT;
