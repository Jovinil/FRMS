/*
  Warnings:

  - You are about to drop the `DanaReport` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `evacueesReportId` to the `EvacuationCenter` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `role` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('MDRRMO', 'BARANGAT_OFFICIAL', 'ADMIN');

-- DropForeignKey
ALTER TABLE "public"."DanaReport" DROP CONSTRAINT "DanaReport_barangayId_fkey";

-- DropForeignKey
ALTER TABLE "public"."DanaReport" DROP CONSTRAINT "DanaReport_userId_fkey";

-- AlterTable
ALTER TABLE "EvacuationCenter" ADD COLUMN     "evacueesReportId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "role",
ADD COLUMN     "role" "Role" NOT NULL;

-- DropTable
DROP TABLE "public"."DanaReport";

-- CreateTable
CREATE TABLE "DamageAssessmentNeedAnalysisReport" (
    "id" SERIAL NOT NULL,
    "status" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "barangayId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DamageAssessmentNeedAnalysisReport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RapidDamageAssessmentNeedAnalysisReport" (
    "id" SERIAL NOT NULL,
    "status" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "barangayId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RapidDamageAssessmentNeedAnalysisReport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DamageAssessmentReport" (
    "id" SERIAL NOT NULL,
    "disasterType" TEXT NOT NULL,
    "occurenceDate" TIMESTAMP(3) NOT NULL,
    "reportSource" TEXT NOT NULL,
    "reportDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DamageAssessmentReport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AreaAffected" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "reportId" INTEGER NOT NULL,

    CONSTRAINT "AreaAffected_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PopulationAffected" (
    "id" SERIAL NOT NULL,
    "families" INTEGER NOT NULL,
    "persons" INTEGER NOT NULL,
    "children" INTEGER NOT NULL,
    "reportId" INTEGER NOT NULL,

    CONSTRAINT "PopulationAffected_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PopulationDisplaced" (
    "id" SERIAL NOT NULL,
    "families" INTEGER NOT NULL,
    "persons" INTEGER NOT NULL,
    "infants" INTEGER NOT NULL,
    "children" INTEGER NOT NULL,
    "adolescents" INTEGER NOT NULL,
    "adults" INTEGER NOT NULL,
    "reportId" INTEGER NOT NULL,

    CONSTRAINT "PopulationDisplaced_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Casualties" (
    "id" SERIAL NOT NULL,
    "dead" INTEGER NOT NULL,
    "injured" INTEGER NOT NULL,
    "missing" INTEGER NOT NULL,
    "reportId" INTEGER NOT NULL,

    CONSTRAINT "Casualties_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DamagedProperty" (
    "id" SERIAL NOT NULL,
    "category" TEXT NOT NULL,
    "totally" INTEGER NOT NULL,
    "partially" INTEGER NOT NULL,
    "estCostTotally" DOUBLE PRECISION NOT NULL,
    "estCostPartially" DOUBLE PRECISION NOT NULL,
    "totalCost" DOUBLE PRECISION NOT NULL,
    "reportId" INTEGER NOT NULL,

    CONSTRAINT "DamagedProperty_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DamagedLifeline" (
    "id" SERIAL NOT NULL,
    "location" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "passable" BOOLEAN NOT NULL,
    "number" INTEGER NOT NULL,
    "cost" DOUBLE PRECISION NOT NULL,
    "reportId" INTEGER NOT NULL,

    CONSTRAINT "DamagedLifeline_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CommunicationFacility" (
    "id" SERIAL NOT NULL,
    "location" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "operational" BOOLEAN NOT NULL,
    "number" INTEGER NOT NULL,
    "cost" DOUBLE PRECISION NOT NULL,
    "reportId" INTEGER NOT NULL,

    CONSTRAINT "CommunicationFacility_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ElectricalFacility" (
    "id" SERIAL NOT NULL,
    "location" TEXT NOT NULL,
    "operational" BOOLEAN NOT NULL,
    "number" INTEGER NOT NULL,
    "cost" DOUBLE PRECISION NOT NULL,
    "reportId" INTEGER NOT NULL,

    CONSTRAINT "ElectricalFacility_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WaterFacility" (
    "id" SERIAL NOT NULL,
    "location" TEXT NOT NULL,
    "operational" BOOLEAN NOT NULL,
    "number" INTEGER NOT NULL,
    "cost" DOUBLE PRECISION NOT NULL,
    "reportId" INTEGER NOT NULL,

    CONSTRAINT "WaterFacility_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Crop" (
    "id" SERIAL NOT NULL,
    "cropType" TEXT NOT NULL,
    "areaDamaged" DOUBLE PRECISION NOT NULL,
    "lossesTons" DOUBLE PRECISION NOT NULL,
    "lossesValue" DOUBLE PRECISION NOT NULL,
    "reportId" INTEGER NOT NULL,

    CONSTRAINT "Crop_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Fisheries" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "lossesTons" DOUBLE PRECISION,
    "lossesValue" DOUBLE PRECISION NOT NULL,
    "reportId" INTEGER NOT NULL,

    CONSTRAINT "Fisheries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LiveStock" (
    "id" SERIAL NOT NULL,
    "animalType" TEXT NOT NULL,
    "heads" INTEGER NOT NULL,
    "pesoValue" DOUBLE PRECISION NOT NULL,
    "reportId" INTEGER NOT NULL,

    CONSTRAINT "LiveStock_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LocalAction" (
    "id" SERIAL NOT NULL,
    "respondersInvolved" TEXT NOT NULL,
    "assetsDeployed" TEXT NOT NULL,
    "affectedPopulationFamilies" INTEGER NOT NULL,
    "affectedPopulationPersons" INTEGER NOT NULL,
    "displacedPopulationFamilies" INTEGER NOT NULL,
    "displacedPopulationPersons" INTEGER NOT NULL,
    "displacedInfants" INTEGER NOT NULL,
    "displacedChildren" INTEGER NOT NULL,
    "displacedAdults" INTEGER NOT NULL,
    "extentOfAssistance" TEXT NOT NULL,
    "reportId" INTEGER NOT NULL,

    CONSTRAINT "LocalAction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EvacueesReport" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "barangay" TEXT NOT NULL,
    "typeOfDisaster" TEXT NOT NULL,
    "totalEvacCenters" INTEGER NOT NULL,
    "totalFamilies" INTEGER NOT NULL,
    "totalPerson" INTEGER NOT NULL,
    "preparedBy" TEXT NOT NULL,
    "notedBy" TEXT NOT NULL,
    "reportId" INTEGER NOT NULL,

    CONSTRAINT "EvacueesReport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RapidDamageAssessmentReport" (
    "id" SERIAL NOT NULL,
    "operation" TEXT NOT NULL,
    "eventype" TEXT NOT NULL,
    "eventDate" TIMESTAMP(3) NOT NULL,
    "region" TEXT NOT NULL,
    "province" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "barangay" TEXT NOT NULL,
    "sitioPurok" TEXT,
    "gpsCoords" TEXT,
    "reportDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RapidDamageAssessmentReport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LocalAuthority" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "age" INTEGER,
    "office" TEXT,
    "designation" TEXT,
    "phone" TEXT,
    "email" TEXT,
    "rapidReportId" INTEGER NOT NULL,

    CONSTRAINT "LocalAuthority_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Demographics" (
    "id" SERIAL NOT NULL,
    "affectedFamilies" INTEGER NOT NULL,
    "affectedPerson" INTEGER NOT NULL,
    "displacedFamiliesInsideEvacCenter" INTEGER NOT NULL,
    "displacedFamiliesOutsideEvacCenter" INTEGER NOT NULL,
    "displacedPersonsInsideEvacCenter" INTEGER NOT NULL,
    "displacedPersonOutsideEvacCenter" INTEGER NOT NULL,
    "affectedChildren0to2" INTEGER NOT NULL,
    "affectedChildren3to5" INTEGER NOT NULL,
    "affectedChildren6to12" INTEGER NOT NULL,
    "affectedChildren13to17" INTEGER NOT NULL,
    "pwd" INTEGER NOT NULL,
    "elderly" INTEGER NOT NULL,
    "missingMale" INTEGER NOT NULL,
    "missingFemale" INTEGER NOT NULL,
    "injuredMale" INTEGER NOT NULL,
    "injuredFemale" INTEGER NOT NULL,
    "deadMale" INTEGER NOT NULL,
    "deadFemale" INTEGER NOT NULL,
    "totalDead" INTEGER NOT NULL,
    "rapidReportId" INTEGER NOT NULL,

    CONSTRAINT "Demographics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Accessibility" (
    "id" SERIAL NOT NULL,
    "isAccessible" BOOLEAN NOT NULL,
    "transportModes" TEXT[],
    "damagedRoads" BOOLEAN NOT NULL,
    "needs" TEXT[],
    "rapidReportId" INTEGER NOT NULL,

    CONSTRAINT "Accessibility_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PowerAndElectricity" (
    "id" SERIAL NOT NULL,
    "status" TEXT NOT NULL,
    "daysFuelStock" INTEGER,
    "urgentNeed" TEXT[],
    "rapidReportId" INTEGER NOT NULL,

    CONSTRAINT "PowerAndElectricity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Communication" (
    "id" SERIAL NOT NULL,
    "telecomServices" TEXT[],
    "operationalServices" TEXT[],
    "alternativeComm" TEXT[],
    "urgentNeeds" TEXT[],
    "rapidReportId" INTEGER NOT NULL,

    CONSTRAINT "Communication_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EvacuationCenterDetail" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT,
    "gpsCoords" TEXT,
    "families" INTEGER NOT NULL,
    "persons" INTEGER NOT NULL,
    "rapidReportId" INTEGER NOT NULL,

    CONSTRAINT "EvacuationCenterDetail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sanitation" (
    "id" SERIAL NOT NULL,
    "facilities" TEXT[],
    "immidiateNeed" TEXT[],
    "rapidReportId" INTEGER NOT NULL,

    CONSTRAINT "Sanitation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Health" (
    "id" SERIAL NOT NULL,
    "hasAccess" BOOLEAN NOT NULL,
    "facilities" TEXT[],
    "mainConcerns" TEXT[],
    "levelOfSupplies" TEXT NOT NULL,
    "urgentNeed" TEXT[],
    "rapidReportId" INTEGER NOT NULL,

    CONSTRAINT "Health_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Nutrition" (
    "id" SERIAL NOT NULL,
    "breastfeedingInfo" BOOLEAN NOT NULL,
    "milkProductsDist" BOOLEAN NOT NULL,
    "interventions" TEXT[],
    "urgentNeeds" TEXT[],
    "rapidReportId" INTEGER NOT NULL,

    CONSTRAINT "Nutrition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Protection" (
    "id" SERIAL NOT NULL,
    "violenceReported" BOOLEAN NOT NULL,
    "vulnerableGroups" TEXT[],
    "protectionMechanisms" TEXT[],
    "urgentNeeds" TEXT[],
    "rapidReportId" INTEGER NOT NULL,

    CONSTRAINT "Protection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Education" (
    "id" SERIAL NOT NULL,
    "classroomsAsEvacCenter" INTEGER NOT NULL,
    "childrenInEvacCenter" INTEGER NOT NULL,
    "destroyedClassrooms" INTEGER NOT NULL,
    "damagedClassrooms" INTEGER NOT NULL,
    "urgentNeeds" TEXT[],
    "rapidReportId" INTEGER NOT NULL,

    CONSTRAINT "Education_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Livelihood" (
    "id" SERIAL NOT NULL,
    "mainSource" TEXT NOT NULL,
    "urgentNeeds" TEXT[],
    "rapidReportId" INTEGER NOT NULL,

    CONSTRAINT "Livelihood_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CommunityEngagement" (
    "id" SERIAL NOT NULL,
    "receivesInfo" BOOLEAN NOT NULL,
    "infoNeeds" TEXT[],
    "sources" TEXT[],
    "rapidReportId" INTEGER NOT NULL,

    CONSTRAINT "CommunityEngagement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OverallAssessment" (
    "id" SERIAL NOT NULL,
    "situation" TEXT NOT NULL,
    "risks" TEXT[],
    "rapidReportId" INTEGER NOT NULL,

    CONSTRAINT "OverallAssessment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PopulationAffected_reportId_key" ON "PopulationAffected"("reportId");

-- CreateIndex
CREATE UNIQUE INDEX "PopulationDisplaced_reportId_key" ON "PopulationDisplaced"("reportId");

-- CreateIndex
CREATE UNIQUE INDEX "Casualties_reportId_key" ON "Casualties"("reportId");

-- CreateIndex
CREATE UNIQUE INDEX "LocalAction_reportId_key" ON "LocalAction"("reportId");

-- CreateIndex
CREATE UNIQUE INDEX "EvacueesReport_reportId_key" ON "EvacueesReport"("reportId");

-- CreateIndex
CREATE UNIQUE INDEX "LocalAuthority_rapidReportId_key" ON "LocalAuthority"("rapidReportId");

-- CreateIndex
CREATE UNIQUE INDEX "Demographics_rapidReportId_key" ON "Demographics"("rapidReportId");

-- CreateIndex
CREATE UNIQUE INDEX "Accessibility_rapidReportId_key" ON "Accessibility"("rapidReportId");

-- CreateIndex
CREATE UNIQUE INDEX "PowerAndElectricity_rapidReportId_key" ON "PowerAndElectricity"("rapidReportId");

-- CreateIndex
CREATE UNIQUE INDEX "Communication_rapidReportId_key" ON "Communication"("rapidReportId");

-- CreateIndex
CREATE UNIQUE INDEX "Sanitation_rapidReportId_key" ON "Sanitation"("rapidReportId");

-- CreateIndex
CREATE UNIQUE INDEX "Health_rapidReportId_key" ON "Health"("rapidReportId");

-- CreateIndex
CREATE UNIQUE INDEX "Nutrition_rapidReportId_key" ON "Nutrition"("rapidReportId");

-- CreateIndex
CREATE UNIQUE INDEX "Protection_rapidReportId_key" ON "Protection"("rapidReportId");

-- CreateIndex
CREATE UNIQUE INDEX "Education_rapidReportId_key" ON "Education"("rapidReportId");

-- CreateIndex
CREATE UNIQUE INDEX "Livelihood_rapidReportId_key" ON "Livelihood"("rapidReportId");

-- CreateIndex
CREATE UNIQUE INDEX "CommunityEngagement_rapidReportId_key" ON "CommunityEngagement"("rapidReportId");

-- CreateIndex
CREATE UNIQUE INDEX "OverallAssessment_rapidReportId_key" ON "OverallAssessment"("rapidReportId");

-- AddForeignKey
ALTER TABLE "EvacuationCenter" ADD CONSTRAINT "EvacuationCenter_evacueesReportId_fkey" FOREIGN KEY ("evacueesReportId") REFERENCES "EvacueesReport"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DamageAssessmentNeedAnalysisReport" ADD CONSTRAINT "DamageAssessmentNeedAnalysisReport_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DamageAssessmentNeedAnalysisReport" ADD CONSTRAINT "DamageAssessmentNeedAnalysisReport_barangayId_fkey" FOREIGN KEY ("barangayId") REFERENCES "Barangay"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RapidDamageAssessmentNeedAnalysisReport" ADD CONSTRAINT "RapidDamageAssessmentNeedAnalysisReport_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RapidDamageAssessmentNeedAnalysisReport" ADD CONSTRAINT "RapidDamageAssessmentNeedAnalysisReport_barangayId_fkey" FOREIGN KEY ("barangayId") REFERENCES "Barangay"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AreaAffected" ADD CONSTRAINT "AreaAffected_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "DamageAssessmentReport"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PopulationAffected" ADD CONSTRAINT "PopulationAffected_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "DamageAssessmentReport"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PopulationDisplaced" ADD CONSTRAINT "PopulationDisplaced_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "DamageAssessmentReport"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Casualties" ADD CONSTRAINT "Casualties_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "DamageAssessmentReport"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DamagedProperty" ADD CONSTRAINT "DamagedProperty_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "DamageAssessmentReport"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DamagedLifeline" ADD CONSTRAINT "DamagedLifeline_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "DamageAssessmentReport"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommunicationFacility" ADD CONSTRAINT "CommunicationFacility_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "DamageAssessmentReport"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ElectricalFacility" ADD CONSTRAINT "ElectricalFacility_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "DamageAssessmentReport"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WaterFacility" ADD CONSTRAINT "WaterFacility_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "DamageAssessmentReport"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Crop" ADD CONSTRAINT "Crop_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "DamageAssessmentReport"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fisheries" ADD CONSTRAINT "Fisheries_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "DamageAssessmentReport"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LiveStock" ADD CONSTRAINT "LiveStock_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "DamageAssessmentReport"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LocalAction" ADD CONSTRAINT "LocalAction_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "DamageAssessmentReport"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EvacueesReport" ADD CONSTRAINT "EvacueesReport_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "DamageAssessmentReport"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LocalAuthority" ADD CONSTRAINT "LocalAuthority_rapidReportId_fkey" FOREIGN KEY ("rapidReportId") REFERENCES "RapidDamageAssessmentReport"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Demographics" ADD CONSTRAINT "Demographics_rapidReportId_fkey" FOREIGN KEY ("rapidReportId") REFERENCES "RapidDamageAssessmentReport"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Accessibility" ADD CONSTRAINT "Accessibility_rapidReportId_fkey" FOREIGN KEY ("rapidReportId") REFERENCES "RapidDamageAssessmentReport"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PowerAndElectricity" ADD CONSTRAINT "PowerAndElectricity_rapidReportId_fkey" FOREIGN KEY ("rapidReportId") REFERENCES "RapidDamageAssessmentReport"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Communication" ADD CONSTRAINT "Communication_rapidReportId_fkey" FOREIGN KEY ("rapidReportId") REFERENCES "RapidDamageAssessmentReport"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EvacuationCenterDetail" ADD CONSTRAINT "EvacuationCenterDetail_rapidReportId_fkey" FOREIGN KEY ("rapidReportId") REFERENCES "RapidDamageAssessmentReport"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sanitation" ADD CONSTRAINT "Sanitation_rapidReportId_fkey" FOREIGN KEY ("rapidReportId") REFERENCES "RapidDamageAssessmentReport"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Health" ADD CONSTRAINT "Health_rapidReportId_fkey" FOREIGN KEY ("rapidReportId") REFERENCES "RapidDamageAssessmentReport"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Nutrition" ADD CONSTRAINT "Nutrition_rapidReportId_fkey" FOREIGN KEY ("rapidReportId") REFERENCES "RapidDamageAssessmentReport"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Protection" ADD CONSTRAINT "Protection_rapidReportId_fkey" FOREIGN KEY ("rapidReportId") REFERENCES "RapidDamageAssessmentReport"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Education" ADD CONSTRAINT "Education_rapidReportId_fkey" FOREIGN KEY ("rapidReportId") REFERENCES "RapidDamageAssessmentReport"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Livelihood" ADD CONSTRAINT "Livelihood_rapidReportId_fkey" FOREIGN KEY ("rapidReportId") REFERENCES "RapidDamageAssessmentReport"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommunityEngagement" ADD CONSTRAINT "CommunityEngagement_rapidReportId_fkey" FOREIGN KEY ("rapidReportId") REFERENCES "RapidDamageAssessmentReport"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OverallAssessment" ADD CONSTRAINT "OverallAssessment_rapidReportId_fkey" FOREIGN KEY ("rapidReportId") REFERENCES "RapidDamageAssessmentReport"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
