/*
  Warnings:

  - You are about to drop the column `address` on the `EvacuationCenter` table. All the data in the column will be lost.
  - You are about to drop the column `barangayId` on the `EvacuationCenter` table. All the data in the column will be lost.
  - You are about to drop the column `evacueesReportId` on the `EvacuationCenter` table. All the data in the column will be lost.
  - You are about to drop the column `rapidReportId` on the `EvacuationCenterDetail` table. All the data in the column will be lost.
  - Added the required column `latitude` to the `EvacuationCenter` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitude` to the `EvacuationCenter` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."EvacuationCenter" DROP CONSTRAINT "EvacuationCenter_barangayId_fkey";

-- DropForeignKey
ALTER TABLE "public"."EvacuationCenter" DROP CONSTRAINT "EvacuationCenter_evacueesReportId_fkey";

-- DropForeignKey
ALTER TABLE "public"."EvacuationCenterDetail" DROP CONSTRAINT "EvacuationCenterDetail_rapidReportId_fkey";

-- AlterTable
ALTER TABLE "EvacuationCenter" DROP COLUMN "address",
DROP COLUMN "barangayId",
DROP COLUMN "evacueesReportId",
ADD COLUMN     "latitude" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "longitude" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "EvacuationCenterDetail" DROP COLUMN "rapidReportId";
