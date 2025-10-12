/*
  Warnings:

  - You are about to alter the column `population` on the `Barangay` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - Added the required column `elevation` to the `Barangay` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Barangay" ADD COLUMN     "elevation" DECIMAL(65,30) NOT NULL,
ALTER COLUMN "population" SET DATA TYPE INTEGER;
