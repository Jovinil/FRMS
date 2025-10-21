/*
  Warnings:

  - You are about to drop the column `address` on the `EvacuationCenter` table. All the data in the column will be lost.
  - Added the required column `latitude` to the `EvacuationCenter` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitude` to the `EvacuationCenter` table without a default value. This is not possible if the table is not empty.
  - Added the required column `affectedFamilies` to the `RapidDamageAssessmentNeedAnalysisReport` table without a default value. This is not possible if the table is not empty.
  - Added the required column `infrastructureDamage` to the `RapidDamageAssessmentNeedAnalysisReport` table without a default value. This is not possible if the table is not empty.
  - Added the required column `priority` to the `RapidDamageAssessmentNeedAnalysisReport` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalCasualties` to the `RapidDamageAssessmentNeedAnalysisReport` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "EvacuationCenter" DROP COLUMN "address",
ADD COLUMN     "latitude" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "longitude" DECIMAL(65,30) NOT NULL;

-- AlterTable
ALTER TABLE "RapidDamageAssessmentNeedAnalysisReport" ADD COLUMN     "affectedFamilies" INTEGER NOT NULL,
ADD COLUMN     "immediateNeeds" TEXT[],
ADD COLUMN     "infrastructureDamage" INTEGER NOT NULL,
ADD COLUMN     "priority" TEXT NOT NULL,
ADD COLUMN     "totalCasualties" INTEGER NOT NULL;
