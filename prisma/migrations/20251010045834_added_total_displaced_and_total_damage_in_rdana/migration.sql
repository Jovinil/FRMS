/*
  Warnings:

  - Added the required column `totalDamage` to the `RapidDamageAssessmentNeedAnalysisReport` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalDisplaced` to the `RapidDamageAssessmentNeedAnalysisReport` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RapidDamageAssessmentNeedAnalysisReport" ADD COLUMN     "totalDamage" INTEGER NOT NULL,
ADD COLUMN     "totalDisplaced" INTEGER NOT NULL;
