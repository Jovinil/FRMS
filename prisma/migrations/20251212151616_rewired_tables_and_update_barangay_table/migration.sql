/*
  Warnings:

  - Added the required column `city` to the `Barangay` table without a default value. This is not possible if the table is not empty.
  - Added the required column `province` to the `Barangay` table without a default value. This is not possible if the table is not empty.
  - Added the required column `purok` to the `Barangay` table without a default value. This is not possible if the table is not empty.
  - Added the required column `barangayId` to the `FirstBarangayFormSubmission` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `FirstBarangayFormSubmission` table without a default value. This is not possible if the table is not empty.
  - Added the required column `barangayId` to the `FirstRdanaSubmission` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `FirstRdanaSubmission` table without a default value. This is not possible if the table is not empty.
  - Added the required column `barangayId` to the `SecondBarangayFormSubmission` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `SecondBarangayFormSubmission` table without a default value. This is not possible if the table is not empty.
  - Added the required column `barangayId` to the `ThirdBarangayFormSubmission` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `ThirdBarangayFormSubmission` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Barangay" ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "province" TEXT NOT NULL,
ADD COLUMN     "purok" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "FirstBarangayFormSubmission" ADD COLUMN     "barangayId" INTEGER NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "FirstRdanaSubmission" ADD COLUMN     "barangayId" INTEGER NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "SecondBarangayFormSubmission" ADD COLUMN     "barangayId" INTEGER NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "ThirdBarangayFormSubmission" ADD COLUMN     "barangayId" INTEGER NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "FirstBarangayFormSubmission" ADD CONSTRAINT "FirstBarangayFormSubmission_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FirstBarangayFormSubmission" ADD CONSTRAINT "FirstBarangayFormSubmission_barangayId_fkey" FOREIGN KEY ("barangayId") REFERENCES "Barangay"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SecondBarangayFormSubmission" ADD CONSTRAINT "SecondBarangayFormSubmission_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SecondBarangayFormSubmission" ADD CONSTRAINT "SecondBarangayFormSubmission_barangayId_fkey" FOREIGN KEY ("barangayId") REFERENCES "Barangay"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ThirdBarangayFormSubmission" ADD CONSTRAINT "ThirdBarangayFormSubmission_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ThirdBarangayFormSubmission" ADD CONSTRAINT "ThirdBarangayFormSubmission_barangayId_fkey" FOREIGN KEY ("barangayId") REFERENCES "Barangay"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FirstRdanaSubmission" ADD CONSTRAINT "FirstRdanaSubmission_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FirstRdanaSubmission" ADD CONSTRAINT "FirstRdanaSubmission_barangayId_fkey" FOREIGN KEY ("barangayId") REFERENCES "Barangay"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
