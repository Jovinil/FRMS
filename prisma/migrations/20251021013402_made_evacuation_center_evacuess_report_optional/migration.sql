-- DropForeignKey
ALTER TABLE "public"."EvacuationCenter" DROP CONSTRAINT "EvacuationCenter_evacueesReportId_fkey";

-- AlterTable
ALTER TABLE "EvacuationCenter" ALTER COLUMN "evacueesReportId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "EvacuationCenter" ADD CONSTRAINT "EvacuationCenter_evacueesReportId_fkey" FOREIGN KEY ("evacueesReportId") REFERENCES "EvacueesReport"("id") ON DELETE SET NULL ON UPDATE CASCADE;
