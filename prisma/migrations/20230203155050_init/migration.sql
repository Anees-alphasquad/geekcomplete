/*
  Warnings:

  - You are about to drop the column `userId` on the `products` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_userId_fkey";

-- DropIndex
DROP INDEX "products_userId_key";

-- AlterTable
ALTER TABLE "products" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "productId" INTEGER;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE SET NULL ON UPDATE CASCADE;
