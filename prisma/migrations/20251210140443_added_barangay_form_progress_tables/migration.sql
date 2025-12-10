-- CreateTable
CREATE TABLE "BarangayFormProgress" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "latestFormNumber" INTEGER NOT NULL,
    "latestFormSubmissionId" TEXT,
    "latestFormSubmittedAt" TIMESTAMP(3),

    CONSTRAINT "BarangayFormProgress_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BarangayFormProgress_userId_key" ON "BarangayFormProgress"("userId");
