/*
  Warnings:

  - You are about to drop the column `ownerId` on the `Component` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Component` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Component" DROP CONSTRAINT "Component_ownerId_fkey";

-- AlterTable
ALTER TABLE "Component" DROP COLUMN "ownerId",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Component" ADD CONSTRAINT "Component_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
