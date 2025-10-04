-- CreateTable
CREATE TABLE "public"."User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Barangay" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "population" BIGINT NOT NULL,
    "location" TEXT NOT NULL,
    "longitude" DECIMAL(65,30) NOT NULL,
    "latitude" DECIMAL(65,30) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Barangay_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."EvacuationCenter" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "capacity" INTEGER NOT NULL,
    "barangayId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EvacuationCenter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."GeneratedReport" (
    "id" SERIAL NOT NULL,
    "reportType" TEXT NOT NULL,
    "filePath" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GeneratedReport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."FLoodRiskMap" (
    "id" SERIAL NOT NULL,
    "riskLevel" TEXT NOT NULL,
    "filePath" TEXT NOT NULL,
    "barangayId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FLoodRiskMap_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."DanaReport" (
    "id" SERIAL NOT NULL,
    "status" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "barangayId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DanaReport_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."EvacuationCenter" ADD CONSTRAINT "EvacuationCenter_barangayId_fkey" FOREIGN KEY ("barangayId") REFERENCES "public"."Barangay"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."GeneratedReport" ADD CONSTRAINT "GeneratedReport_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."FLoodRiskMap" ADD CONSTRAINT "FLoodRiskMap_barangayId_fkey" FOREIGN KEY ("barangayId") REFERENCES "public"."Barangay"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."FLoodRiskMap" ADD CONSTRAINT "FLoodRiskMap_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."DanaReport" ADD CONSTRAINT "DanaReport_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."DanaReport" ADD CONSTRAINT "DanaReport_barangayId_fkey" FOREIGN KEY ("barangayId") REFERENCES "public"."Barangay"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
