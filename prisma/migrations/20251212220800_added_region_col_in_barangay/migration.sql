/*
  Warnings:

  - Added the required column `region` to the `Barangay` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Barangay" ADD COLUMN     "region" TEXT NOT NULL;
