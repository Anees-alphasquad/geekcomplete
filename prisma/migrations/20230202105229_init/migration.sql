-- AlterTable
ALTER TABLE "transactions" ADD COLUMN     "amount" INTEGER,
ADD COLUMN     "card" JSONB,
ADD COLUMN     "method" TEXT,
ADD COLUMN     "status" BOOLEAN DEFAULT false,
ADD COLUMN     "stripeSourceId" TEXT;
