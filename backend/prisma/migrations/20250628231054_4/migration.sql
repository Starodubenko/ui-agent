/*
  Warnings:

  - You are about to drop the `ComponentVersion` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ComponentVersion" DROP CONSTRAINT "ComponentVersion_componentId_fkey";

-- DropForeignKey
ALTER TABLE "Test" DROP CONSTRAINT "Test_componentVersionId_fkey";

-- DropTable
DROP TABLE "ComponentVersion";

-- CreateTable
CREATE TABLE "Version" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "componentId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "meta" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Version_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Version" ADD CONSTRAINT "Version_componentId_fkey" FOREIGN KEY ("componentId") REFERENCES "Component"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Test" ADD CONSTRAINT "Test_componentVersionId_fkey" FOREIGN KEY ("componentVersionId") REFERENCES "Version"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
