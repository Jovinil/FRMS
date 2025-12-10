-- CreateTable
CREATE TABLE "FirstBarangayFormSubmission" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "submittedAt" TIMESTAMP(3),
    "data" JSONB NOT NULL,

    CONSTRAINT "FirstBarangayFormSubmission_pkey" PRIMARY KEY ("id")
);
