-- CreateTable
CREATE TABLE "FirstRdanaSubmission" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "submittedAt" TIMESTAMP(3),
    "submittedByAuthId" TEXT,
    "profileMission" JSONB,
    "initialImpact" JSONB,
    "healthNutrition" JSONB,
    "accessibilityPower" JSONB,
    "communicationsEvac" JSONB,
    "foodWaterSanitation" JSONB,
    "lawOrderShelter" JSONB,
    "livelihoodEngagementOverall" JSONB,
    "protectionEducation" JSONB,
    "reliefSrr" JSONB,
    "submittedBy" JSONB,

    CONSTRAINT "FirstRdanaSubmission_pkey" PRIMARY KEY ("id")
);
