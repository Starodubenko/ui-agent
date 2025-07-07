/*
  Warnings:

  - Added the required column `meta` to the `Test` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Test` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Test" ADD COLUMN     "meta" JSONB NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL;
