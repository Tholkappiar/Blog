/*
  Warnings:

  - Made the column `post` on table `Post` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "post" SET NOT NULL,
ALTER COLUMN "post" SET DATA TYPE TEXT;
