/*
  Warnings:

  - You are about to drop the column `productId` on the `users` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_productId_fkey";

-- AlterTable
ALTER TABLE "products" ADD COLUMN     "userId" INTEGER;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "productId";

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
