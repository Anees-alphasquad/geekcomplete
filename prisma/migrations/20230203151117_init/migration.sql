-- AlterTable
ALTER TABLE "interactions" ADD COLUMN     "productId" INTEGER;

-- AddForeignKey
ALTER TABLE "interactions" ADD CONSTRAINT "interactions_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE SET NULL ON UPDATE CASCADE;
