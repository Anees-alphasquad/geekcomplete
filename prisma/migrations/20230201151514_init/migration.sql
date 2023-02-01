/*
  Warnings:

  - You are about to drop the column `messags` on the `chats` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "chats" DROP COLUMN "messags",
ADD COLUMN     "message" TEXT;
