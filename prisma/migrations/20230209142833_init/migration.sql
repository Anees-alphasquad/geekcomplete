/*
  Warnings:

  - You are about to drop the column `googleAccessToken` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "googleAccessToken",
ADD COLUMN     "socialAccessToken" TEXT;
